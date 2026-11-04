import { getSession } from '@/utils/auth'

/**
 * Who is calling a route. Everyone who can sign in is on AUTH_ALLOWED_EMAILS and
 * sees everything: this site has no roles. A page being gated is a courtesy;
 * this is the check that protects the data.
 */
export interface Caller {
  user: { id: string; name: string; email: string }
}

type Answer =
  | { session: Caller; refusal?: undefined }
  | { session?: undefined; refusal: Response }

/** Someone signed in, or the answer to send instead. */
export async function superAdmin(req: Request): Promise<Answer> {
  const session = await getSession(req.headers)
  if (!session?.user?.id) {
    return {
      refusal: Response.json({ error: 'Sign in first.' }, { status: 401 }),
    }
  }
  return { session: { user: session.user } }
}
