'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { captureReaderToken } from '@/utils/reader-token'

// Tells the site a page was viewed: once when the site is opened, and again
// for each page reached within it, the dashboard's pages included. /api/view
// counts it, or drops it for a super admin. Nothing is kept in
// the browser by this hook, and no cookie is set; the reader token it sends,
// when there is one, is FlowTrace's (src/hooks/flow-trace.md), kept from a
// click on a link in a campaign email.
export default function PageView() {
  const pathname = usePathname()
  // The path last told about, so a page is not counted twice when React runs
  // this effect again for the same page.
  const told = useRef<string | null>(null)

  useEffect(() => {
    if (told.current === pathname) return
    const first = told.current === null

    // A browser driven by a program, not a reader.
    if (navigator.webdriver) return

    const body: Record<string, unknown> = { path: pathname }
    // Kept from the landing URL here as well as by FlowTrace, whichever
    // hook runs first on the page they arrived at.
    const reader = captureReaderToken(window.location.search)
    if (reader) body.reader = reader
    // Where the visitor came from is only known on the page they arrived at,
    // and a reload or the back button is not arriving again.
    const navigation = performance.getEntriesByType('navigation')[0] as
      PerformanceNavigationTiming | undefined
    if (first && (navigation?.type ?? 'navigate') === 'navigate') {
      const query = new URLSearchParams(window.location.search)
      body.entry = true
      body.referrer = document.referrer
      body.utmSource = query.get('utm_source') ?? ''
      body.utmMedium = query.get('utm_medium') ?? ''
      body.utmCampaign = query.get('utm_campaign') ?? ''
    }

    const send = () => {
      told.current = pathname
      fetch('/api/view/', {
        method: 'POST',
        keepalive: true,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }).catch(() => {})
    }

    // A page loaded in a tab nobody is looking at has not been viewed yet.
    if (document.visibilityState === 'visible') {
      send()
      return
    }
    const onVisible = () => {
      if (document.visibilityState !== 'visible') return
      document.removeEventListener('visibilitychange', onVisible)
      send()
    }
    document.addEventListener('visibilitychange', onVisible)
    return () => document.removeEventListener('visibilitychange', onVisible)
  }, [pathname])

  return null
}
