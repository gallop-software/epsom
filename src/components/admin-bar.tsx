'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import documentText20Solid from '@iconify/icons-heroicons/document-text-20-solid'
import globeAlt20Solid from '@iconify/icons-heroicons/globe-alt-20-solid'
import routeIcon from '@iconify/icons-lucide/route'
import rotateCwIcon from '@iconify/icons-lucide/rotate-cw'
import xIcon from '@iconify/icons-lucide/x'
import { clsx } from 'clsx'
import { Icon } from '@/components/icon'
import { Span } from '@/components/span'
import { SessionExpired, analyticsCall } from '@/components/analytics/call'
import { state } from '@/state'
import { setAdminMark } from '@/utils/admin-mark'
import type { LiveCounts } from '@/utils/page-view-types'

type IconData = { body: string; width?: number; height?: number }

// How long the refresh icon turns for at the least, in milliseconds.
const SPIN_AT_LEAST = 600

// WordPress's admin bar, in look and size: 46px tall on a phone, 32px from md
// up, 13px text, dark grey with light text, and an item that turns blue as
// the pointer crosses it. The colours and font are .admin-bar-theme in
// tailwind.css, which also holds the height as --admin-bar and moves the
// page down by it to make room. On a phone the whole bar scrolls sideways as
// one row; from md up it fits, the buttons on the left and the numbers on
// the right.
const barClass =
  'fixed inset-x-0 top-0 z-100 flex h-(--admin-bar) items-stretch overflow-x-auto scrollbar-hide admin-bar-theme bg-body! md:overflow-visible'
// An item: `group`, so its icon and text follow the hover colour together
const toolClass =
  'group inline-flex h-(--admin-bar) shrink-0 cursor-pointer items-center gap-1.5 px-2 text-contrast transition-colors outline-none hover:bg-body-light hover:text-accent focus-visible:bg-body-light focus-visible:text-accent disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent disabled:hover:text-contrast'
const barText = 'text-sm'
// The text in an item, in the item's colour: light, blue once hovered
const textColor =
  'text-contrast group-hover:text-accent group-focus-visible:text-accent'
// An icon: WordPress's grey at rest, blue with the text once hovered
const iconClass =
  'h-5 w-5 shrink-0 text-contrast-light transition-colors group-hover:text-accent group-focus-visible:text-accent'

interface ToolProps {
  icon: IconData
  // The word beside the icon, from md up.
  label: string
  // The full name, for screen readers.
  tip: string
  onClick?: () => void
}

// One control of the bar.
function Tool({ icon, label, tip, onClick }: ToolProps) {
  const inside = (
    <>
      <Icon
        className={iconClass}
        icon={icon}
      />
      <Span
        color={textColor}
        fontSize={barText}
        lineHeight="leading-none"
        className="hidden md:inline"
      >
        {label}
      </Span>
    </>
  )
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={tip}
      className={toolClass}
    >
      {inside}
    </button>
  )
}

interface StatProps {
  icon: IconData
  // "Site" or "This page", for the tooltip, and what the bar shows beside
  // the icon ("Site · today", "This page").
  name: string
  label: string
  // What the number covers, for the tooltip: "today" or "all time".
  period: string
  // The number and what it counts. Null while it is being read.
  value: number | null
  unit: 'views' | 'visitors'
  // Set while the number is being read, or could not be.
  waiting: boolean
  problem: string
  onClick: () => void
}

// One number over `period`: the site's visitors today, or the page's views
// in its whole life. Pressing it opens the analytics on the matching tab.
function Stat({
  icon,
  name,
  label,
  period,
  value,
  unit,
  waiting,
  problem,
  onClick,
}: StatProps) {
  const number = value === null ? '—' : value.toLocaleString()
  // "1 visitor", "2 visitors"
  const counted = value === 1 ? unit.replace(/s$/, '') : unit
  const tip = problem
    ? `${name}: ${problem}`
    : value === null
      ? `${name}, ${period}: reading…`
      : `${name}, ${period}: ${number} ${counted}`
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={tip}
      className={toolClass}
    >
      <Icon
        className={iconClass}
        icon={icon}
      />
      <Span
        color={textColor}
        fontSize={barText}
        lineHeight="leading-none"
        className="hidden md:inline"
      >
        {label}
      </Span>
      <Span
        color={textColor}
        fontSize={barText}
        lineHeight="leading-none"
        className={clsx('tabular-nums', waiting && 'opacity-60')}
      >
        {number} {counted}
      </Span>
    </button>
  )
}

// The toolbar someone signed in gets across the top of every page, or a visitor
// trying the demo (`onExitDemo`, with made-up numbers). On the left, FlowTrace; on the
// right, the site's visitors today and the page's views in its whole life,
// read once each time a page loads. They open Analytics. The gate
// (admin-bar-gate.tsx) decides whether to mount the bar from the browser's mark;
// every route it calls checks the session again, and a refusal takes the bar
// down until the session is read again.
export function AdminBar({ onExitDemo }: { onExitDemo?: () => void }) {
  const pathname = usePathname()

  // The numbers on the right. `read` says which page and which press they
  // were read for; until it matches `wanted`, they are on their way.
  const [refreshed, setRefreshed] = useState(0)
  const [counts, setCounts] = useState<{
    read: string
    value: LiveCounts
  } | null>(null)
  // Why the last read failed, if it did, and which read it was.
  const [countsProblem, setCountsProblem] = useState<{
    read: string
    message: string
  } | null>(null)

  const shown = true
  const wanted = `${pathname}|${refreshed}`

  // The session ended: the bar goes, and the box with it
  const expire = useCallback(() => {
    setAdminMark(false)
    // With a box open, sign-in takes its place and returns to it
    if (state.dashboard) {
      state.loginNext = { ...state.dashboard }
      state.dashboard = null
      state.loginOpen = true
    }
  }, [])

  // The page makes room for the bar (tailwind.css) once <html> says there is
  // someone signed in looking.
  useEffect(() => {
    if (!shown) return
    document.documentElement.dataset.adminBar = ''
    return () => {
      delete document.documentElement.dataset.adminBar
    }
  }, [shown])

  useEffect(() => {
    if (!shown) return
    let stale = false
    let timer: ReturnType<typeof setTimeout> | undefined
    const started = performance.now()
    const query = new URLSearchParams({ path: pathname })
    // A press of the refresh button spins its icon for long enough to be
    // seen, even when the answer is back at once.
    const settle = (done: () => void) => {
      if (stale) return
      const remaining =
        refreshed > 0 ? SPIN_AT_LEAST - (performance.now() - started) : 0
      timer = setTimeout(done, Math.max(0, remaining))
    }
    analyticsCall<LiveCounts>(`/api/analytics/live?${query}`)
      .then((value) => {
        settle(() => {
          setCounts({ read: wanted, value })
          setCountsProblem(null)
        })
      })
      .catch((error: unknown) => {
        if (stale) return
        // Signed out elsewhere, or the session ran out: no more bar.
        if (error instanceof SessionExpired) {
          expire()
          return
        }
        const message =
          (error as Error).message || 'The numbers could not be read.'
        // Shown as a dash on the bar; the reason is here.
        console.error(`Admin toolbar: ${message}`)
        settle(() => setCountsProblem({ read: wanted, message }))
      })
    return () => {
      stale = true
      clearTimeout(timer)
    }
  }, [shown, pathname, wanted, refreshed, expire])

  if (!shown) return null

  const live = counts?.value ?? null
  const countsWaiting =
    counts?.read !== wanted && countsProblem?.read !== wanted
  const spinning = refreshed > 0 && countsWaiting
  const problem = countsProblem?.read === wanted ? countsProblem.message : ''
  // Kept from the last read while a new one is on its way, but not across
  // pages.
  const pageCount =
    live && counts?.read.startsWith(`${pathname}|`) ? live.page : null

  return (
    <>
      <div
        className={barClass}
        role="toolbar"
        aria-label="Admin toolbar"
      >
        <div className="flex min-w-0 flex-1 items-stretch">
          {onExitDemo && (
            <Span
              color="text-contrast-dark"
              fontSize="text-[11px]"
              fontWeight="font-semibold"
              lineHeight="leading-none"
              className="mx-2 inline-flex shrink-0 items-center self-center rounded-full bg-accent-dark px-2.5 py-1 tracking-wider uppercase"
            >
              Demo
            </Span>
          )}
          <Tool
            icon={routeIcon}
            label="FlowTrace"
            tip="Open FlowTrace"
            onClick={() => {
              state.dashboard = { tab: 'flowtrace' }
            }}
          />
        </div>
        <div className="flex shrink-0 items-stretch">
          <Stat
            icon={globeAlt20Solid}
            name="Site"
            label="Site · today"
            period="today"
            value={live?.site.visitors ?? null}
            unit="visitors"
            waiting={countsWaiting}
            problem={problem}
            onClick={() => {
              state.dashboard = { tab: 'analytics' }
            }}
          />
          {pageCount && (
            <Stat
              icon={documentText20Solid}
              name="This page"
              label="This page"
              period="all time"
              value={pageCount.views}
              unit="views"
              waiting={countsWaiting}
              problem={problem}
              onClick={() => {
                state.dashboard = { tab: 'analytics', path: pathname }
              }}
            />
          )}
          <button
            type="button"
            onClick={() => setRefreshed((count) => count + 1)}
            disabled={countsWaiting}
            aria-label="Read the numbers again"
            className={clsx(toolClass, 'disabled:opacity-100')}
          >
            <Icon
              className={clsx(iconClass, spinning && 'animate-spin')}
              icon={rotateCwIcon}
            />
          </button>
          {onExitDemo && (
            <Tool
              icon={xIcon}
              label="Exit demo"
              tip="Exit the toolbar demo"
              onClick={onExitDemo}
            />
          )}
        </div>
      </div>
    </>
  )
}
