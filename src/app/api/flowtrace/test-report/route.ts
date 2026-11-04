import type { NextRequest } from 'next/server'
import { adminRoute, problem, reply } from '@/utils/admin-route'
import { siteEnv } from '@/utils/site-env'
import { renderVisitEmail } from '@/utils/flow-trace-email'
import { flowTraceSend } from '@/utils/flow-trace-jobs'
import { latestVisitId, readVisitReport } from '@/utils/flow-trace-store'
import { isSameOrigin } from '@/utils/request-guard'
import { siteUrl } from '@/utils/server-env'

export const dynamic = 'force-dynamic'

// Emails the signed-in super admin the report on the latest visit, as a test.
export async function POST(req: NextRequest) {
  if (!isSameOrigin(req)) return problem('Not allowed.', 403)
  return adminRoute(req, async (caller) => {
    const db = (await siteEnv()).AUTH_DB
    const id = await latestVisitId(db)
    const report = id ? await readVisitReport(db, id) : null
    if (!report) return reply({ result: 'none' })
    const email = renderVisitEmail(report, await siteUrl())
    const sent = await flowTraceSend({
      to: caller.user.email,
      ...email,
      subject: `[Test] ${email.subject}`,
    })
    return reply({ result: sent ? 'sent' : 'failed' })
  })
}
