'use client'

import { useState } from 'react'
import { clsx } from 'clsx'
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react'
import { OverviewTab } from './overview-tab'
import { tabClass, tabListClass } from './parts'
import { VisitsTab, type VisitFilter } from './visits-tab'

interface AnalyticsTabsProps {
  // The page the numbers were asked for from, when the site counts its
  // views: its path, such as /services/commercial.
  path?: string
  // The tab to open on. 'page' needs a path.
  initialTab?: 'site' | 'page'
  // The session ended: whoever shows the tabs decides what happens.
  onExpired: () => void
  // Goes up each time the box's Refresh is pressed, and the tab on screen
  // reads again: views arrive while it is open.
  refreshed: number
}

// How many people read the site, what they read and where they came from,
// counted by the site itself (ported from medicine-opera's Analytics box).
// Site and Visits anywhere; This page as well when opened from a page. Shown
// in the Analytics box the toolbar's Site and This page numbers open. The
// tabs stay put while what is under them scrolls.
export function AnalyticsTabs({
  path,
  initialTab,
  onExpired,
  refreshed,
}: AnalyticsTabsProps) {
  const tabs = path ? ['Site', 'This page', 'Visits'] : ['Site', 'Visits']
  const visitsTab = tabs.length - 1
  const [tab, setTab] = useState(initialTab === 'page' && path ? 1 : 0)
  const [filter, setFilter] = useState<VisitFilter>({ ip: '', path: '' })

  return (
    <TabGroup
      selectedIndex={tab}
      onChange={setTab}
      className="flex min-h-0 flex-1 flex-col"
    >
      {/* pr-9: room for the box's Refresh, which sits over the row's end */}
      <TabList className={clsx(tabListClass, 'shrink-0 pr-9')}>
        {tabs.map((name) => (
          <Tab
            key={name}
            className={tabClass}
          >
            {name}
          </Tab>
        ))}
      </TabList>

      <TabPanels className="min-h-0 flex-1 overflow-y-auto pr-1">
        <TabPanel className="outline-none">
          <OverviewTab
            refreshed={refreshed}
            onExpired={onExpired}
          />
        </TabPanel>

        {path && (
          <TabPanel className="outline-none">
            <OverviewTab
              path={path}
              refreshed={refreshed}
              onSeeVisits={() => {
                setFilter({ ip: '', path })
                setTab(visitsTab)
              }}
              onExpired={onExpired}
            />
          </TabPanel>
        )}

        <TabPanel className="outline-none">
          <VisitsTab
            filter={filter}
            onFilter={setFilter}
            refreshed={refreshed}
            onExpired={onExpired}
          />
        </TabPanel>
      </TabPanels>
    </TabGroup>
  )
}
