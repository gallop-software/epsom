'use client'

import { useCallback, useState } from 'react'
import { Pager, plural } from '@/components/analytics/parts'
import { Paragraph } from '@/components/paragraph'
import {
  PeriodSelect,
  VisitSearch,
  VisitTable,
} from '@/components/flow-trace-visits'
import type { FtVisitPage } from '@/utils/flow-trace-types'
import type { ViewPeriod } from '@/utils/page-view-types'
import { useRead } from './use-read'

// Every converted visit, newest first, as the analytics' visit log
// (medicine-opera's): a period, a search for an address or a page, one
// address at a time, and pages of 50.
export function VisitsTab({
  onOpenVisit,
  onExpired,
  refreshed,
}: {
  onOpenVisit: (id: string) => void
  onExpired: () => void
  refreshed: number
}) {
  const [period, setPeriod] = useState<ViewPeriod>('all')
  const [search, setSearch] = useState('')
  const [ip, setIp] = useState('')
  const [page, setPage] = useState(1)
  const query = new URLSearchParams({ period, page: String(page) })
  if (ip) query.set('ip', ip)
  if (search) query.set('search', search)
  const read = useRead<FtVisitPage>(
    `/api/flowtrace/visits?${query}`,
    onExpired,
    refreshed
  )
  const visits = read.value

  // A new question starts at the first page
  const onSearch = useCallback((value: string) => {
    setSearch(value)
    setPage(1)
  }, [])

  return (
    <div className="flex flex-col gap-3">
      <PeriodSelect
        value={period}
        onChange={(value) => {
          setPeriod(value)
          setPage(1)
        }}
      />
      <VisitSearch
        onSearch={onSearch}
        ip={ip}
        onClearIp={() => {
          setIp('')
          setPage(1)
        }}
        status={
          read.waiting || !visits
            ? 'Reading…'
            : plural(visits.total, 'converted visit')
        }
      />
      {read.problem && (
        <Paragraph
          margin="mb-0"
          fontSize="text-xs"
          color="text-accent"
        >
          {read.problem}
        </Paragraph>
      )}
      <VisitTable
        visits={visits?.rows ?? []}
        onOpen={onOpenVisit}
        onIp={(value) => {
          setIp(value)
          setPage(1)
        }}
        empty={visits ? 'No converted visits to show.' : 'Reading…'}
      />
      {visits && (
        <Pager
          page={visits.page}
          pages={visits.pages}
          onPage={setPage}
        />
      )}
    </div>
  )
}
