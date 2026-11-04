'use client'

import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import squares2x2Icon from '@iconify/icons-heroicons/squares-2x2'
import { Icon } from '@/components/icon'
import { useDemo } from '@/hooks/use-demo'
import { state, useSnapshot } from '@/state'

// The toolbar's code is fetched only for a browser marked as signed in, or one
// running the demo, so a visitor's pages carry this check alone. The mark is
// read once the page loads (src/components/admin-dialogs.tsx) and changes on
// signing in or out. Block previews stay bare: they are embedded elsewhere.
const AdminBar = dynamic(
  () => import('@/components/admin-bar').then((module) => module.AdminBar),
  { ssr: false }
)

export function AdminBarGate() {
  const { signedIn } = useSnapshot(state)
  const { enabled, demo, start, end } = useDemo()
  const pathname = usePathname()
  // The button waits until the mark has been read, so someone signed in never
  // sees it flash.
  const [looked, setLooked] = useState(false)
  useEffect(() => setLooked(true), [])

  if (pathname.startsWith('/block')) return null
  // Keyed apart, so made-up numbers never stay on the bar after signing in.
  if (signedIn) return <AdminBar key="signed-in" />
  if (demo) {
    return (
      <AdminBar
        key="demo"
        onExitDemo={end}
      />
    )
  }
  if (!enabled || !looked) return null
  return (
    <button
      type="button"
      onClick={start}
      className="fixed right-3 bottom-3 z-98 inline-flex cursor-pointer items-center gap-2 rounded-full bg-accent px-4 py-2.5 text-sm font-normal text-accent-contrast shadow-lg transition-colors hover:bg-accent-dark max-lg:bottom-15"
    >
      <Icon
        className="h-4 w-4 shrink-0"
        icon={squares2x2Icon}
      />
      Try the admin toolbar
    </button>
  )
}
