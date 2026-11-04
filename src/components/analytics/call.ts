// One call to a route under /api/analytics or /api/flowtrace. A 401 means
// the session ended; a 403 that the account is no longer a super admin.
// Either way the admin UI has no business being open. Refusals come as
// `{ error }`, the shape every route of this site answers with.

// In the toolbar's demo every call is answered in the browser from made-up data
// (src/utils/demo-api.ts), and no real route is asked anything.

import { DEMO_ENABLED } from '@/hooks/use-demo'
import { state } from '@/state'

export class SessionExpired extends Error {}

function inDemo(): boolean {
  return DEMO_ENABLED && state.demo && !state.signedIn
}

type Answer = { error?: string; message?: string }

function refused(status: number, json: Answer): Error {
  if (status === 401 || status === 403) return new SessionExpired()
  return new Error(
    json.error || json.message || `The server answered ${status}.`
  )
}

export async function analyticsCall<T>(url: string): Promise<T> {
  if (inDemo()) {
    const { demoCall } = await import('@/utils/demo-api')
    return demoCall<T>(url)
  }
  const response = await fetch(url, { cache: 'no-store' })
  const json = (await response.json().catch(() => ({}))) as Answer
  if (response.ok) return json as T
  throw refused(response.status, json)
}

/** The same for a change: a JSON body sent with POST. */
export async function analyticsPost<T>(url: string, body: unknown): Promise<T> {
  if (inDemo()) {
    const { demoPost } = await import('@/utils/demo-api')
    return demoPost<T>(url, body)
  }
  const response = await fetch(url, {
    method: 'POST',
    cache: 'no-store',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const json = (await response.json().catch(() => ({}))) as Answer
  if (response.ok) return json as T
  throw refused(response.status, json)
}
