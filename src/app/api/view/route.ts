import { NextResponse, type NextRequest } from 'next/server'
import { getCloudflareContext } from '@opennextjs/cloudflare'
import { getSession } from '@/utils/auth'
import { recordPageView } from '@/utils/page-views'
import { readJsonObject } from '@/utils/read-body'
import { isSameOrigin, visitorIp } from '@/utils/request-guard'
import { isBot } from '@/utils/user-agent'

export const dynamic = 'force-dynamic'

const MAX_BYTES = 2048

function text(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

// What Cloudflare knows of where the request came from. Not there in local
// development.
type Place = { country?: unknown; region?: unknown; city?: unknown }

// Counts a page view. Sent by src/hooks/page-view.tsx from every page, the
// dashboard's included. It answers at once and counts behind the visitor: a
// view never makes anyone wait, and one that cannot be counted is dropped.
// A super admin is left out; a signed-in client is counted, with their email
// on the row, so what clients do is seen. (Epik's route left everyone signed
// in out.)
export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) return new NextResponse(null, { status: 403 })

  const input = await readJsonObject(req, MAX_BYTES)
  if (input === 'too_large') return new NextResponse(null, { status: 413 })
  if (input === null) return new NextResponse(null, { status: 400 })

  const counted = new NextResponse(null, {
    status: 204,
    headers: { 'Cache-Control': 'no-store' },
  })

  const userAgent = req.headers.get('user-agent') ?? ''
  if (isBot(userAgent)) return counted
  // The test address shares the live site's database
  if (new URL(req.url).host.startsWith('dev.')) return counted

  // Only a request carrying a session cookie is asked who it is. One of us is
  // not what the numbers are for; a client is, by name.
  if (req.headers.get('cookie')?.includes('better-auth.session_token')) {
    const session = await getSession(req.headers).catch(() => null)
    if (session?.user) return counted
  }

  const context = await getCloudflareContext({ async: true })
  const place = (context.cf ?? {}) as Place

  context.ctx.waitUntil(
    recordPageView({
      path: text(input.path),
      entry: input.entry === true,
      referrer: text(input.referrer),
      utmSource: text(input.utmSource),
      utmMedium: text(input.utmMedium),
      utmCampaign: text(input.utmCampaign),
      siteHost: req.headers.get('host') ?? '',
      country: text(place.country) || (req.headers.get('cf-ipcountry') ?? ''),
      region: text(place.region),
      city: text(place.city),
      userAgent,
      ip: visitorIp(req),
      reader: text(input.reader),
      userEmail: '',
    }).catch((error) => {
      console.error('Page view not counted:', error)
    })
  )

  return counted
}
