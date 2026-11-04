import { getAuth } from '@/utils/auth'

// Better Auth's endpoints: sending and checking sign-in codes and links,
// reading the session, signing out. See src/utils/auth.ts.

export const dynamic = 'force-dynamic'

export async function GET(req: Request) {
  return (await getAuth()).handler(req)
}

export async function POST(req: Request) {
  return (await getAuth()).handler(req)
}
