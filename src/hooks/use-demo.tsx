'use client'

import { useCallback, useEffect } from 'react'
import { state, useSnapshot } from '@/state'

// The admin toolbar's demo, for a visitor who is not signed in. It is
// remembered in this browser only and changes nothing on the server: every
// number and list the toolbar shows while it is on is made up in the browser
// (src/utils/demo-api.ts), and the one thing it can really do is email a report
// on a made-up visit. A real sign-in always wins, and ends the demo.

// Off unless the site turns it on: a site built from this template shows its
// visitors nothing of the demo, not even the button. Only the template's own
// showcase sets NEXT_PUBLIC_ADMIN_DEMO=true.
export const DEMO_ENABLED = process.env.NEXT_PUBLIC_ADMIN_DEMO === 'true'

const KEY = 'epsom-admin-demo'

let read = false

function remember(on: boolean) {
  try {
    if (on) localStorage.setItem(KEY, '1')
    else localStorage.removeItem(KEY)
  } catch {
    // Private windows may refuse; the demo then lasts for this page.
  }
}

function recall(): boolean {
  try {
    return localStorage.getItem(KEY) === '1'
  } catch {
    return false
  }
}

/** Turns the demo on, from the button or from a test report's link. */
export function startDemo() {
  if (!DEMO_ENABLED) return
  state.demo = true
  remember(true)
}

export function useDemo() {
  const { demo, signedIn } = useSnapshot(state)

  useEffect(() => {
    if (read || !DEMO_ENABLED) return
    read = true
    if (recall()) state.demo = true
  }, [])

  const start = useCallback(() => {
    startDemo()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  const end = useCallback(() => {
    state.demo = false
    state.dashboard = null
    remember(false)
  }, [])

  // Someone signed in sees the real toolbar, never the demo, and their browser
  // forgets it, so a demo tried before signing in is not shown again.
  useEffect(() => {
    if (signedIn && demo) end()
  }, [signedIn, demo, end])

  return {
    enabled: DEMO_ENABLED && !signedIn,
    demo: DEMO_ENABLED && demo && !signedIn,
    start,
    end,
  }
}
