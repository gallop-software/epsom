import { superAdmin } from '@/utils/api-session'
import { siteEnv } from '@/utils/site-env'
import { flowTraceSend, runFlowTraceJobs } from '@/utils/flow-trace-jobs'
import { serverEnv, siteUrl } from '@/utils/server-env'
import { safeEqual } from '@/utils/webcrypto'

export const dynamic = 'force-dynamic'

/**
 * `POST /api/flowtrace/jobs`: FlowTrace's scheduled work. Sends again any visit
 * report that failed to go out in the last day, and the daily and weekly
 * summaries once each at the digest hour (`src/utils/flow-trace-jobs.ts`).
 * Answers `{ resent }`.
 *
 * The Worker's cron calls this every ten minutes with `Authorization: Bearer
 * <CRON_SECRET>` (`worker-entry.ts`),
 * because a scheduled handler has no request context of its own and cannot
 * reach the database or the mailer. A super admin can call it too.
 */
export async function POST(req: Request) {
  if (!(await fromCron(req))) {
    const { refusal } = await superAdmin(req)
    if (refusal) return refusal
  }
  const { resent } = await runFlowTraceJobs({
    db: (await siteEnv()).AUTH_DB,
    send: flowTraceSend,
    site: await siteUrl(),
  })
  if (resent) console.info(`[flowtrace] resent ${resent}`)
  return Response.json({ resent }, { headers: { 'Cache-Control': 'no-store' } })
}

async function fromCron(req: Request): Promise<boolean> {
  const secret = await serverEnv('CRON_SECRET')
  const bearer = /^Bearer\s+(\S+)$/i.exec(
    req.headers.get('authorization') ?? ''
  )?.[1]
  return Boolean(secret && bearer && safeEqual(bearer, secret))
}
