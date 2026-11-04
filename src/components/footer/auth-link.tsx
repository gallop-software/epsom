'use client'

import { state, useSnapshot } from '@/state'
import { setAdminMark } from '@/utils/admin-mark'

// The same colour as the credit link beside it, at rest and on hover
const linkClass = 'underline'

/**
 * Login for visitors, which opens the sign-in modal; Log out once the
 * browser is marked as signed in. The page is the same for everyone, so it
 * is a link to /login until the browser has looked (and without scripts).
 * Signing out is one request to better-auth, so the sign-in library is not
 * sent with every page.
 */
export function FooterAuthLink() {
  const { signedIn } = useSnapshot(state)

  if (!signedIn) {
    return (
      <a
        className={linkClass}
        href="/login/"
        rel="nofollow"
        onClick={(event) => {
          event.preventDefault()
          state.loginOpen = true
        }}
      >
        Login
      </a>
    )
  }

  return (
    <button
      type="button"
      className={`${linkClass} cursor-pointer`}
      onClick={async () => {
        const response = await fetch('/api/auth/sign-out/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: '{}',
        }).catch(() => null)
        // Still signed in: the link stays, so it can be pressed again
        if (!response?.ok) return
        setAdminMark(false)
        state.dashboard = null
      }}
    >
      Log out
    </button>
  )
}
