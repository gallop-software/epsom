'use client'

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import { state, useSnapshot, type DashboardView } from '@/state'
import { DEMO_ENABLED, startDemo } from '@/hooks/use-demo'
import { hasAdminMark } from '@/utils/admin-mark'

// Sign-in and the dashboard, as modals over whatever page is open (as
// medicine-opera mounts its login dialog). Their code is fetched only when
// one opens, so a visitor's pages carry this alone.
const LoginDialog = dynamic(
  () =>
    import('@/components/login-dialog').then((module) => module.LoginDialog),
  { ssr: false }
)
const DashboardDialog = dynamic(
  () =>
    import('@/components/admin-box').then((module) => module.DashboardDialog),
  { ssr: false }
)

const TABS: DashboardView['tab'][] = [
  'flowtrace',
  'visits',
  'analytics',
  'settings',
]

/**
 * What a link asks for: `?login`, `?dashboard` (or `?dashboard=visits`…),
 * `?visit=<id>` from a report email, and `?error=` from a sign-in link that
 * did not work. The old /login and /dashboard addresses redirect to these.
 */
function askedFor(): {
  login: boolean
  view: DashboardView | null
  error: string
} {
  const params = new URLSearchParams(window.location.search)
  const visit = params.get('visit')
  const tab = params.get('dashboard')
  const view: DashboardView | null = visit
    ? { tab: 'visits', visit: visit.slice(0, 64) }
    : tab !== null
      ? { tab: TABS.find((key) => key === tab) ?? 'flowtrace' }
      : null
  return { login: params.has('login'), view, error: params.get('error') ?? '' }
}

export function AdminDialogs() {
  const snap = useSnapshot(state)

  useEffect(() => {
    state.signedIn = hasAdminMark()
    const { login, view, error } = askedFor()
    // A demo test report's link: the demo opens, then FlowTrace. Someone signed
    // in gets the real one, and where the demo is off this does nothing more.
    const demoAsked = new URLSearchParams(window.location.search).has('demo')
    if (!login && !view && !demoAsked) return

    // The address goes back to the page itself
    const url = new URL(window.location.href)
    for (const key of ['login', 'dashboard', 'visit', 'error', 'demo']) {
      url.searchParams.delete(key)
    }
    window.history.replaceState(window.history.state, '', url)

    if (demoAsked) {
      if (state.signedIn) state.dashboard = { tab: 'flowtrace' }
      else if (DEMO_ENABLED) {
        startDemo()
        state.dashboard = { tab: 'flowtrace' }
      }
      return
    }

    // A link asking for the dashboard opens it whether or not this browser
    // is marked: a sign-in link signs in on the server and comes back here
    // with no mark yet. The dashboard asks the server first; signed in, it
    // sets the mark, and signed out it gives way to sign-in, which returns
    // to it.
    if (view && !error) {
      state.dashboard = view
    } else if (state.signedIn && !error) {
      state.dashboard = { tab: 'flowtrace' }
    } else {
      state.loginNext = view
      state.loginError = error
      state.loginOpen = true
    }
  }, [])

  return (
    <>
      {snap.loginOpen && <LoginDialog />}
      {snap.dashboard && <DashboardDialog />}
    </>
  )
}
