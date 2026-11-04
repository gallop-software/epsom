'use client'

import { useCallback, useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { clsx } from 'clsx'
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from '@headlessui/react'
import arrowLeft20Solid from '@iconify/icons-heroicons/arrow-left-20-solid'
import xMarkIcon from '@iconify/icons-heroicons/x-mark'
import rotateCwIcon from '@iconify/icons-lucide/rotate-cw'
import { AnalyticsTabs } from '@/components/analytics'
import {
  panelClass,
  tabClass,
  tabListClass,
} from '@/components/analytics/parts'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Icon } from '@/components/icon'
import { SessionExpired, analyticsCall } from '@/components/analytics/call'
import { state, useSnapshot, type DashboardView } from '@/state'
import { setAdminMark } from '@/utils/admin-mark'
import { FlowTraceTab } from './flowtrace-tab'
import { SettingsTab } from './settings-tab'
import { VisitView } from './visit-view'
import { VisitsTab } from './visits-tab'

const TABS: { key: DashboardView['tab']; name: string }[] = [
  { key: 'flowtrace', name: 'Overview' },
  { key: 'visits', name: 'Converted visits' },
  { key: 'settings', name: 'Email settings' },
]

// The squares beside the title and the tabs: Close and Refresh
const squareClass =
  'inline-flex h-7 w-7 cursor-pointer items-center justify-center text-contrast/60 transition-colors hover:text-contrast'

/** Reads what is showing again: the same square and colours as Close. */
function RefreshButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Refresh"
      title="Read the numbers again"
      className={clsx(squareClass, 'absolute right-0 top-1 bg-body')}
    >
      {/* The admin toolbar's refresh icon, at its size */}
      <Icon
        icon={rotateCwIcon}
        className="h-5 w-5"
      />
    </button>
  )
}

/** Back from a visit's report to the list it was opened from. */
function BackButton({
  onClick,
  className,
}: {
  onClick: () => void
  className: string
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        'inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-contrast-light hover:text-contrast',
        className
      )}
    >
      <Icon
        icon={arrowLeft20Solid}
        className="h-4 w-4"
      />
      Back
    </button>
  )
}

// A box over whatever page it was opened from, showing one of two things. FlowTrace: an overview, the
// converted visits and each one's report, and the email settings.
// Analytics, opened from the toolbar's Site and This page numbers: the
// page views. (The site's navbar has the account menu and Sign out, so the
// box has no profile.) Opened anywhere through state.dashboard; everything it
// shows is read from routes that answer only a super admin.
export function DashboardDialog() {
  const snap = useSnapshot(state)
  const view = snap.dashboard
  const pathname = usePathname()
  // Goes up each time Refresh is pressed, and what is showing reads again
  const [refreshed, setRefreshed] = useState(0)

  // The session ended: the box gives way to the site's sign-in dialog
  const expire = useCallback(() => {
    const was = state.dashboard
    setAdminMark(false)
    state.dashboard = null
    state.loginNext = was ? { ...was } : null
    state.loginOpen = true
  }, [])

  // Proves the session and marks this browser, so the toolbar and footer know.
  // A sign-in link signs in on the server and comes back here with no mark yet.
  // The demo has no session to prove, and must never mark the browser.
  useEffect(() => {
    if (snap.demo) return
    let stale = false
    analyticsCall<object | null>('/api/auth/get-session/')
      .then((signed) => {
        if (stale) return
        if (signed) setAdminMark(true)
        else expire()
      })
      .catch((error: unknown) => {
        if (!stale && error instanceof SessionExpired) expire()
      })
    return () => {
      stale = true
    }
  }, [expire, snap.demo])

  if (!view) return null
  const close = () => {
    state.dashboard = null
  }
  const go = (next: DashboardView) => {
    state.dashboard = next
  }
  const analytics = view.tab === 'analytics'
  const refresh = () => setRefreshed((count) => count + 1)
  const openVisit = (id: string) => go({ tab: view.tab, visit: id })
  const tabIndex = Math.max(
    0,
    TABS.findIndex((tab) => tab.key === view.tab)
  )

  return (
    <Dialog
      open
      onClose={close}
      // Above the site's header (z-99) and the admin bar (z-100)
      className="admin-theme relative z-110 bg-transparent"
    >
      <div
        className="fixed inset-0 bg-overlay/30"
        aria-hidden="true"
      />
      <div className="fixed inset-0 flex items-center justify-center p-2 sm:p-4">
        <DialogPanel className={panelClass}>
          <div className="mb-3 flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
            <DialogTitle as="div">
              <Heading
                as="h3"
                margin="mb-0"
                color="text-contrast"
              >
                {analytics ? 'Analytics' : 'FlowTrace'}
              </Heading>
            </DialogTitle>
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className={squareClass}
            >
              <Icon
                icon={xMarkIcon}
                className="w-5 h-5"
              />
            </button>
          </div>

          {snap.demo && (
            <Paragraph
              margin="mb-3"
              fontSize="text-xs"
              color="text-contrast"
              className="rounded bg-body-dark px-3 py-2"
            >
              <strong>Demo.</strong> Every visit and number here is made up, in
              your browser, from the site&rsquo;s real pages. Nothing is saved.
            </Paragraph>
          )}

          {analytics && !view.visit ? (
            <div className="relative flex min-h-0 flex-1 flex-col">
              <RefreshButton onClick={refresh} />
              {/* This page is always there: the page the box is open over.
                  It opens on it from the toolbar's This page number. */}
              <AnalyticsTabs
                path={view.path ?? pathname}
                initialTab={view.path ? 'page' : 'site'}
                onExpired={expire}
                refreshed={refreshed}
              />
            </div>
          ) : (
            <TabGroup
              selectedIndex={tabIndex}
              onChange={(index) => go({ tab: TABS[index]?.key ?? 'flowtrace' })}
              className="flex min-h-0 flex-1 flex-col"
            >
              <div className="relative shrink-0">
                {/* Room at the end for Back and Refresh, so the last tab
                    can scroll out from under them on a narrow screen */}
                <TabList
                  className={clsx(tabListClass, view.visit ? 'pr-24' : 'pr-9')}
                >
                  {TABS.map((tab) => (
                    <Tab
                      key={tab.key}
                      className={tabClass}
                    >
                      {tab.name}
                    </Tab>
                  ))}
                </TabList>
                {/* A report's way back sits in the tab row, beside Refresh */}
                {view.visit && (
                  <BackButton
                    onClick={() => go({ tab: view.tab })}
                    className="absolute right-9 top-1 h-7 bg-body pl-2"
                  />
                )}
                <RefreshButton onClick={refresh} />
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto pr-1">
                {view.visit ? (
                  <VisitView
                    key={view.visit}
                    id={view.visit}
                    onOpenVisit={openVisit}
                    onExpired={expire}
                    refreshed={refreshed}
                  />
                ) : (
                  <TabPanels>
                    <TabPanel className="outline-none">
                      <FlowTraceTab
                        onOpenVisit={openVisit}
                        onSeeAll={() => go({ tab: 'visits' })}
                        onExpired={expire}
                        refreshed={refreshed}
                      />
                    </TabPanel>
                    <TabPanel className="outline-none">
                      <VisitsTab
                        onOpenVisit={openVisit}
                        onExpired={expire}
                        refreshed={refreshed}
                      />
                    </TabPanel>
                    <TabPanel className="outline-none">
                      <SettingsTab
                        onExpired={expire}
                        refreshed={refreshed}
                      />
                    </TabPanel>
                  </TabPanels>
                )}
              </div>
            </TabGroup>
          )}
        </DialogPanel>
      </div>
    </Dialog>
  )
}
