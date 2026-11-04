// Whether this browser has someone signed in, so the admin toolbar and the
// footer know without every visitor asking the server. Kept in state.signedIn
// as well, so what shows it changes at once. Set on signing in and when the
// dashboard reads its numbers,
// cleared on signing out or when the server says the session has ended. It
// only decides whether to ask: every route checks the session itself.

import { state } from '@/state'

const KEY = 'admin_bar'

export function hasAdminMark(): boolean {
  try {
    return window.localStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

export function setAdminMark(on: boolean) {
  state.signedIn = on
  try {
    if (on) window.localStorage.setItem(KEY, '1')
    else window.localStorage.removeItem(KEY)
  } catch {
    // Storage blocked: no toolbar
  }
}
