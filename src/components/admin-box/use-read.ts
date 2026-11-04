'use client'

import { useEffect, useState } from 'react'
import { SessionExpired, analyticsCall } from '@/components/analytics/call'

/**
 * Reads a dashboard route, as the analytics tabs do: what was read and what
 * it was read for, so a slow answer to an older question never shows.
 * `waiting` is true until the answer to the latest one is in. A new
 * `refreshed` reads the same address again (the dashboard's Refresh).
 */
export function useRead<T>(
  address: string | null,
  onExpired: () => void,
  refreshed = 0
) {
  // What a read is for: the address, and which press of Refresh
  const url = address === null ? null : `${address}#${refreshed}`
  const [read, setRead] = useState<{ url: string; value: T } | null>(null)
  const [problem, setProblem] = useState<{
    url: string
    message: string
  } | null>(null)

  useEffect(() => {
    if (!url) return
    let stale = false
    analyticsCall<T>(url.slice(0, url.lastIndexOf('#')))
      .then((value) => {
        if (!stale) setRead({ url, value })
      })
      .catch((error: unknown) => {
        if (stale) return
        if (error instanceof SessionExpired) onExpired()
        else
          setProblem({
            url,
            message: (error as Error).message || 'Something went wrong.',
          })
      })
    return () => {
      stale = true
    }
  }, [url, onExpired])

  return {
    value: read?.value ?? null,
    waiting: read?.url !== url && problem?.url !== url,
    problem: problem?.url === url ? problem.message : '',
  }
}
