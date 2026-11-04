import type { NextRequest } from 'next/server'
import { adminRoute, reply } from '@/utils/admin-route'
import { siteEnv } from '@/utils/site-env'
import { periodOf, periodRange } from '@/utils/flow-trace-periods'
import { readCounts, readSummary } from '@/utils/flow-trace-store'

export const dynamic = 'force-dynamic'

// FlowTrace's numbers for a period and the period before: the dashboard's
// FlowTrace tab. For a super admin alone.
export async function GET(req: NextRequest) {
  return adminRoute(req, async () => {
    const period = periodOf(req.nextUrl.searchParams.get('period'), '30d')
    const range = periodRange(period)
    const db = (await siteEnv()).AUTH_DB
    const [summary, before] = await Promise.all([
      readSummary(db, range.from, range.to),
      range.previous
        ? readCounts(db, range.previous.from, range.previous.to)
        : null,
    ])
    return reply({ period, summary, before })
  })
}
