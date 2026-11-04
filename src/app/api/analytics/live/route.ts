import type { NextRequest } from 'next/server'
import { adminRoute, reply } from '@/utils/admin-route'
import { readLiveCounts } from '@/utils/page-views'

export const dynamic = 'force-dynamic'

// The numbers on the admin toolbar: today for the site and, with `path`, all
// time for the page the toolbar is on. Read once per page load. For a super
// admin alone.
export async function GET(req: NextRequest) {
  return adminRoute(req, async () => {
    const counts = await readLiveCounts({
      path: (req.nextUrl.searchParams.get('path') ?? '').slice(0, 600),
    })
    return reply(counts)
  })
}
