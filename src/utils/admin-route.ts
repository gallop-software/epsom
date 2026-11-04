import { NextResponse } from 'next/server'
import { superAdmin, type Caller } from '@/utils/api-session'

// What the analytics and FlowTrace routes have in common: the check, the
// answer's form, and what a failure looks like. The check is `superAdmin` in
// api-session.ts, so an address taken off the list is refused at once. Answers
// are never cached.

const NO_STORE = { 'Cache-Control': 'no-store' }

export function reply(
  body: unknown,
  status = 200,
  headers: Record<string, string> = {}
) {
  return NextResponse.json(body, {
    status,
    headers: { ...NO_STORE, ...headers },
  })
}

/** A refusal in the site's shape: `{ error }`, as every other route answers. */
export function problem(message: string, status = 400) {
  return reply({ error: message }, status)
}

/** Runs `work` for a super admin, or answers 401 (nobody) or 403 (not one). */
export async function adminRoute(
  req: Request,
  work: (caller: Caller) => Promise<NextResponse>
): Promise<Response> {
  const { session, refusal } = await superAdmin(req)
  if (refusal) return refusal
  try {
    return await work(session)
  } catch (error) {
    console.error('Admin route failed:', error)
    return problem('Something went wrong.', 500)
  }
}

export function positiveInteger(value: unknown): number | null {
  const number = typeof value === 'string' ? Number(value) : value
  return typeof number === 'number' && Number.isInteger(number) && number > 0
    ? number
    : null
}
