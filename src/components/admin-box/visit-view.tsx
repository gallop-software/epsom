'use client'

import { VisitReport } from '@/components/flow-trace-visit-report'
import { Heading } from '@/components/heading'
import { Paragraph } from '@/components/paragraph'
import type { FtVisitReport } from '@/utils/flow-trace-types'
import { useRead } from './use-read'

// One visit's report inside the dashboard: what each FlowTrace email links
// to. A visit that has since been deleted says so.
export function VisitView({
  id,
  onOpenVisit,
  onExpired,
  refreshed,
}: {
  id: string
  onOpenVisit: (id: string) => void
  onExpired: () => void
  refreshed: number
}) {
  const read = useRead<FtVisitReport>(
    `/api/flowtrace/visit?id=${encodeURIComponent(id)}`,
    onExpired,
    refreshed
  )

  if (read.value && !read.waiting) {
    return (
      <VisitReport
        report={read.value}
        onOpenVisit={onOpenVisit}
      />
    )
  }
  if (read.problem) {
    return (
      <section className="rounded-md border border-contrast/15 p-5">
        <Heading
          as="h4"
          styleAs="h5"
          color="text-contrast"
          fontSize="text-base"
          margin="mb-1"
        >
          This visit is no longer available
        </Heading>
        <Paragraph
          fontSize="text-sm"
          color="text-contrast-light"
          margin="mb-0"
        >
          It may have been removed. Every converted visit still kept is under
          Converted visits.
        </Paragraph>
      </section>
    )
  }
  return (
    <Paragraph
      margin="mb-0"
      fontSize="text-xs"
      color="text-contrast-light"
    >
      Reading…
    </Paragraph>
  )
}
