'use client'

import { useState } from 'react'
import checkBadge20Solid from '@iconify/icons-heroicons/check-badge-20-solid'
import cursorArrowRays20Solid from '@iconify/icons-heroicons/cursor-arrow-rays-20-solid'
import envelope20Solid from '@iconify/icons-heroicons/envelope-20-solid'
import paperAirplane20Solid from '@iconify/icons-heroicons/paper-airplane-20-solid'
import devicePhoneMobile20Solid from '@iconify/icons-heroicons/device-phone-mobile-20-solid'
import phone20Solid from '@iconify/icons-heroicons/phone-20-solid'
import { quietButtonClass } from '@/components/analytics/parts'
import { countryName } from '@/components/analytics/places'
import { nameReferrers } from '@/components/analytics/referrers'
import { Tile } from '@/components/analytics/tile'
import { ViewList } from '@/components/analytics/view-list'
import { PeriodSelect, VisitTable } from '@/components/flow-trace-visits'
import { Grid } from '@/components/grid'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'
import { PERIOD_LABELS } from '@/utils/flow-trace-periods'
import type { FtCounts, FtSummary } from '@/utils/flow-trace-types'
import type { ViewPeriod } from '@/utils/page-view-types'
import { useRead } from './use-read'

type Answer = { summary: FtSummary; before: FtCounts | null }

// FlowTrace's numbers for a period, in the analytics' tiles and lists
// (medicine-opera's): the converted visits, each kind of conversion against
// the period before, and where those visitors came from, were and read.
export function FlowTraceTab({
  onOpenVisit,
  onSeeAll,
  onExpired,
  refreshed,
}: {
  onOpenVisit: (id: string) => void
  onSeeAll: () => void
  onExpired: () => void
  refreshed: number
}) {
  const [period, setPeriod] = useState<ViewPeriod>('30d')
  const read = useRead<Answer>(
    `/api/flowtrace/summary?period=${period}`,
    onExpired,
    refreshed
  )
  const summary = read.value?.summary
  const before = read.value?.before
  const span = PERIOD_LABELS[period].toLowerCase()

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-3">
        <PeriodSelect
          value={period}
          onChange={setPeriod}
        />
        <Span
          fontSize="text-xs"
          color="text-contrast-light"
          role="status"
          aria-live="polite"
        >
          {read.waiting ? 'Reading…' : ''}
        </Span>
      </div>

      {read.problem && (
        <Paragraph
          margin="mb-0"
          fontSize="text-xs"
          color="text-accent"
        >
          {read.problem}
        </Paragraph>
      )}

      {summary && (
        <>
          <Grid
            cols="grid-cols-2 sm:grid-cols-4"
            gap="gap-2"
          >
            <Tile
              icon={checkBadge20Solid}
              label="Converted visits"
              value={summary.converted}
              note={span}
              before={before?.converted}
            />
            <Tile
              icon={phone20Solid}
              label="Phone calls"
              value={summary.conversions.call}
              note={span}
              before={before?.conversions.call}
            />
            <Tile
              icon={devicePhoneMobile20Solid}
              label="Text messages"
              value={summary.conversions.text}
              note={span}
              before={before?.conversions.text}
            />
            <Tile
              icon={envelope20Solid}
              label="Email links"
              value={summary.conversions.email}
              note={span}
              before={before?.conversions.email}
            />
            <Tile
              icon={paperAirplane20Solid}
              label="Forms sent"
              value={summary.conversions.form}
              note={span}
              before={before?.conversions.form}
            />
            <Tile
              icon={cursorArrowRays20Solid}
              label="Tracked clicks"
              value={summary.conversions.click}
              note={span}
              before={before?.conversions.click}
            />
          </Grid>

          <section className="flex flex-col gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <Heading
                as="h4"
                styleAs="h5"
                color="text-contrast"
                fontSize="text-base"
                margin="mb-0"
              >
                Converted visits
              </Heading>
              <button
                type="button"
                className={quietButtonClass}
                onClick={onSeeAll}
              >
                See them all
              </button>
            </div>
            <VisitTable
              visits={summary.convertedVisits}
              onOpen={onOpenVisit}
              empty="No calls, emails or forms in this period yet."
            />
          </section>

          <Grid
            cols="grid-cols-1 lg:grid-cols-2"
            gap="gap-4"
          >
            <ViewList
              title="Where they came from"
              counted="Visits"
              tabs={[
                {
                  name: 'Came from',
                  rows: nameReferrers(summary.sources),
                  empty: 'No converted visits in this period.',
                },
              ]}
            />
            <ViewList
              title="Locations"
              counted="Visits"
              tabs={[
                {
                  name: 'Countries',
                  rows: summary.countries.map((row) => ({
                    ...row,
                    label: countryName(row.key),
                  })),
                  empty: 'No countries were recorded.',
                },
                {
                  name: 'Regions',
                  rows: summary.regions,
                  empty: 'No regions were recorded.',
                },
                {
                  name: 'Cities',
                  rows: summary.cities,
                  empty: 'No cities were recorded.',
                },
              ]}
            />
            <ViewList
              title="Pages they viewed"
              counted="Views"
              tabs={[
                {
                  name: 'Pages',
                  rows: summary.pages,
                  empty: 'No converted visits in this period.',
                },
              ]}
            />
            <ViewList
              title="Browsers and devices"
              counted="Visits"
              tabs={[
                {
                  name: 'Browser',
                  rows: summary.devices,
                  empty: 'No converted visits in this period.',
                },
              ]}
            />
          </Grid>
        </>
      )}
    </div>
  )
}
