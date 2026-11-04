import type { NextRequest } from 'next/server'
import { adminRoute, problem, reply } from '@/utils/admin-route'
import { siteEnv } from '@/utils/site-env'
import { readVisitReport } from '@/utils/flow-trace-store'

export const dynamic = 'force-dynamic'

// One visit's report: the page each FlowTrace email links to, shown in the
// dashboard. For a super admin alone.
export async function GET(req: NextRequest) {
  return adminRoute(req, async () => {
    const id = (req.nextUrl.searchParams.get('id') ?? '').slice(0, 64)
    const report = await readVisitReport((await siteEnv()).AUTH_DB, id)
    if (!report) return problem('This visit is no longer available.', 404)
    return reply(report)
  })
}
