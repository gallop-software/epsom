'use client'

import { useEffect, useState } from 'react'
import { clsx } from 'clsx'
import {
  Badge,
  Select,
  actionRowClass,
  cellClass,
  inputClass,
  plural,
  quietButtonClass,
  tableClass,
  tableScrollClass,
} from '@/components/analytics/parts'
import { countryName, flagOf } from '@/components/analytics/places'
import { Span } from '@/components/span'
import {
  conversionLabel,
  deviceOf,
  formatDuration,
  formatWhen,
  sourceOf,
} from '@/utils/flow-trace-format'
import { PERIOD_LABELS } from '@/utils/flow-trace-periods'
import { VIEW_PERIODS, type ViewPeriod } from '@/utils/page-view-types'
import type { FtVisit } from '@/utils/flow-trace-types'

// FlowTrace's lists of converted visits in the dashboard, in the look and
// with the controls of the page-view analytics (medicine-opera's): a period
// dropdown, a search for an address or a page, one address at a time.

/** The period to show, as the analytics' dropdown. */
export function PeriodSelect({
  value,
  onChange,
}: {
  value: ViewPeriod
  onChange: (period: ViewPeriod) => void
}) {
  return (
    <Select
      value={value}
      onChange={(event) => onChange(event.target.value as ViewPeriod)}
      aria-label="Period"
      className="max-w-52"
    >
      {VIEW_PERIODS.map((key) => (
        <option
          key={key}
          value={key}
        >
          {PERIOD_LABELS[key]}
        </option>
      ))}
    </Select>
  )
}

/** Finds an IP address or a page, once the typing has stopped. */
export function VisitSearch({
  onSearch,
  ip,
  onClearIp,
  status,
}: {
  onSearch: (search: string) => void
  ip: string
  onClearIp: () => void
  status: string
}) {
  const [typed, setTyped] = useState('')

  useEffect(() => {
    const timer = setTimeout(() => onSearch(typed.trim()), 300)
    return () => clearTimeout(timer)
  }, [typed, onSearch])

  return (
    <div className={actionRowClass}>
      <input
        type="search"
        value={typed}
        onChange={(event) => setTyped(event.target.value)}
        placeholder="Find an IP address or a page"
        aria-label="Find an IP address or a page"
        className={clsx(inputClass, 'sm:max-w-xs')}
      />
      {ip && (
        <button
          type="button"
          className={quietButtonClass}
          onClick={onClearIp}
        >
          Only {ip} · show everyone
        </button>
      )}
      <Span
        fontSize="text-xs"
        color="text-contrast-light"
        role="status"
        aria-live="polite"
      >
        {status}
      </Span>
    </div>
  )
}

/**
 * Converted visits as a table, newest first. Each opens its report; an
 * address, where `onIp` is given, narrows the list to it.
 */
export function VisitTable({
  visits,
  onOpen,
  onIp,
  empty = 'No converted visits to show.',
}: {
  visits: FtVisit[]
  onOpen: (id: string) => void
  onIp?: ((ip: string) => void) | undefined
  empty?: string
}) {
  const open = (visit: FtVisit, children: React.ReactNode, className = '') => (
    <button
      type="button"
      onClick={() => onOpen(visit.id)}
      className={clsx('cursor-pointer text-left hover:underline', className)}
    >
      {children}
    </button>
  )
  return (
    <div className={tableScrollClass}>
      <table className={tableClass}>
        <thead className="sticky top-0 bg-body2">
          <tr>
            {[
              'Time',
              'What they did',
              'Came from',
              'Place',
              'Visit',
              'Browser',
              'IP address',
            ].map((heading) => (
              <th
                key={heading}
                scope="col"
                className={cellClass}
              >
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-contrast/10">
          {visits.map((visit) => (
            <tr key={visit.id}>
              <td className={clsx(cellClass, 'whitespace-nowrap')}>
                {open(visit, formatWhen(visit.startedAt), 'font-semibold')}
              </td>
              <td className={cellClass}>
                {open(
                  visit,
                  <>
                    <Badge tone="good">
                      {conversionLabel(visit.firstConversion)}
                    </Badge>
                    {visit.conversions > 1 && (
                      <Span
                        fontSize="text-xs"
                        color="text-contrast-light"
                        className="ml-2"
                      >
                        +{visit.conversions - 1} more
                      </Span>
                    )}
                  </>
                )}
              </td>
              <td className={cellClass}>
                {sourceOf(visit)}
                {visit.readerEmail && (
                  <Span
                    fontSize="text-xs"
                    color="text-contrast-light"
                    className="block"
                    title="This browser once clicked a link in an email to this address"
                  >
                    {visit.readerEmail}
                  </Span>
                )}
              </td>
              <td className={cellClass}>
                {visit.country && (
                  <Span
                    aria-hidden="true"
                    className="mr-2"
                  >
                    {flagOf(visit.country)}
                  </Span>
                )}
                {[visit.city, visit.region, countryName(visit.country)]
                  .filter(Boolean)
                  .join(', ') || '—'}
              </td>
              <td className={cellClass}>
                {plural(visit.pageviews, 'page')} ·{' '}
                {formatDuration(visit.engagedMs)}
                {visit.visitNumber > 1 && ` · visit ${visit.visitNumber}`}
              </td>
              <td className={cellClass}>{deviceOf(visit)}</td>
              <td className={cellClass}>
                {visit.ip && onIp ? (
                  <button
                    type="button"
                    onClick={() => onIp(visit.ip)}
                    title="Show every converted visit from this address"
                    className="cursor-pointer font-semibold tabular-nums hover:underline"
                  >
                    {visit.ip}
                  </button>
                ) : (
                  visit.ip || '—'
                )}
              </td>
            </tr>
          ))}
          {!visits.length && (
            <tr>
              <td
                className={cellClass}
                colSpan={7}
              >
                {empty}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}
