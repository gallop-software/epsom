import type { NextRequest } from 'next/server'
import { adminRoute, positiveInteger, reply } from '@/utils/admin-route'
import { siteEnv } from '@/utils/site-env'
import { periodOf, periodRange } from '@/utils/flow-trace-periods'
import { listVisits } from '@/utils/flow-trace-store'

export const dynamic = 'force-dynamic'

// One page of converted visits, newest first, for a period, an address or a
// search: the dashboard's Converted visits tab. It carries visitors' IP
// addresses, so it is for a super admin alone.
export async function GET(req: NextRequest) {
  return adminRoute(req, async () => {
    const query = req.nextUrl.searchParams
    const range = periodRange(periodOf(query.get('period'), 'all'))
    const visits = await listVisits((await siteEnv()).AUTH_DB, {
      page: Math.min(100000, positiveInteger(query.get('page') ?? '1') ?? 1),
      from: range.from,
      to: range.to,
      ip: (query.get('ip') ?? '').slice(0, 45),
      search: (query.get('search') ?? '').slice(0, 100),
    })
    return reply(visits)
  })
}
