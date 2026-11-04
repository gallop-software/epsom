import { proxy, useSnapshot, subscribe } from 'valtio'

/**
 * What the admin box shows: a FlowTrace tab, a visit's report, or the
 * analytics (one page's, with a path).
 */
export type DashboardView = {
  tab: 'flowtrace' | 'visits' | 'analytics' | 'settings'
  visit?: string | undefined
  path?: string | undefined
}

const state = proxy({
  offsetTop: 0,
  windowHeight: 0,
  lastOffsetTop: 0,
  isScrolling: false,
  dialogOpen: false,
  scrollingDirection: 'down',
  lastScrollingDirection: 'down',
  lockScrollDirection: false,
  // Id of the video allowed to play: one at a time (see use-active-video).
  activeVideoId: null as string | null,
  // Sign-in and the dashboard are modals, opened from anywhere:
  // src/components/admin-dialogs.tsx
  loginOpen: false,
  // Where to go once signed in, when the dashboard was asked for first
  loginNext: null as DashboardView | null,
  loginError: '',
  dashboard: null as DashboardView | null,
  // This browser is marked as signed in (src/utils/admin-mark.ts)
  signedIn: false,
  // The toolbar's demo is on, for a visitor (src/hooks/use-demo.tsx)
  demo: false,
})

export { state, useSnapshot, subscribe, proxy }
