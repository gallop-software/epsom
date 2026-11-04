import { getCloudflareContext } from '@opennextjs/cloudflare'
import { DateTime } from 'luxon'
import { getSession } from '@/utils/auth'
import { siteEnv } from '@/utils/site-env'
import { flowTraceConfig } from '@/utils/flow-trace-config'
import { flowTraceSend, reportConversion } from '@/utils/flow-trace-jobs'
import { parsePayload, recordConversion } from '@/utils/flow-trace-store'
import { readJsonObject } from '@/utils/read-body'
import { isSameOrigin, visitorIp } from '@/utils/request-guard'
import { siteUrl } from '@/utils/server-env'
import { isBot } from '@/utils/user-agent'

export const dynamic = 'force-dynamic'

// A whole visit of up to 100 steps
const MAX_BYTES = 64 * 1024

// What Cloudflare knows of where the request came from. Not there in local
// development.
type Place = {
  country?: unknown
  region?: unknown
  regionCode?: unknown
  city?: unknown
}

const text = (value: unknown) => (typeof value === 'string' ? value : '')

function nothing(status = 204) {
  return new Response(null, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  })
}

/** A step on one of the site's private paths, which the browser never sends; refused here too. */
function onIgnoredPath(path: string): boolean {
  return flowTraceConfig.ignoredPaths.some(
    (prefix) => path === prefix || path.startsWith(`${prefix}/`)
  )
}

// Records a visit that has just converted, sent whole by
// src/hooks/flow-trace.tsx, and emails its report. It answers at once and
// works behind the visitor: tracing never makes anyone wait.
export async function POST(req: Request) {
  if (!isSameOrigin(req)) return nothing(403)

  // Sent as text/plain, which a beacon may send anywhere without a preflight
  const input = await readJsonObject(req, MAX_BYTES)
  if (input === 'too_large') return nothing(413)
  const visit = input && parsePayload(input)
  if (!visit) return nothing(400)
  if (
    visit.steps.some((step) => onIgnoredPath(step.p.split(/[?#]/)[0] ?? ''))
  ) {
    return nothing(400)
  }

  const userAgent = req.headers.get('user-agent') ?? ''
  if (isBot(userAgent)) return nothing()
  // The test address shares the live site's database, and would email reports
  if (new URL(req.url).host.startsWith('dev.')) return nothing()

  // One of us is not what FlowTrace is for; a signed-in client is traced like
  // anyone else, and named on the visit.
  if (req.headers.get('cookie')?.includes('better-auth.session_token')) {
    const session = await getSession(req.headers).catch(() => null)
    if (session?.user) return nothing()
  }

  const context = await getCloudflareContext({ async: true })
  const place = (context.cf ?? {}) as Place
  const db = (await siteEnv()).AUTH_DB
  const site = await siteUrl()
  const now = DateTime.now()
  context.ctx.waitUntil(
    (async () => {
      await recordConversion(db, visit, {
        siteHost: new URL(req.url).host,
        ip: visitorIp(req),
        country: text(place.country) || (req.headers.get('cf-ipcountry') ?? ''),
        region: text(place.regionCode) || text(place.region),
        city: text(place.city),
        userAgent,
        now: Math.floor(now.toSeconds()),
        userEmail: '',
      })
      await reportConversion(db, flowTraceSend, visit.s, now, site)
    })().catch((error) => console.error('FlowTrace visit not recorded:', error))
  )

  return nothing()
}
