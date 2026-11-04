import { clsx } from 'clsx'
import phoneIcon from '@iconify/icons-lucide/phone'
import mailIcon from '@iconify/icons-lucide/mail'
import smartphoneIcon from '@iconify/icons-lucide/smartphone'
import sendIcon from '@iconify/icons-lucide/send'
import mousePointerClickIcon from '@iconify/icons-lucide/mouse-pointer-click'
import fileTextIcon from '@iconify/icons-lucide/file-text'
import { Grid } from '@/components/grid'
import { Heading } from '@/components/heading'
import { Icon } from '@/components/icon'
import { List, Li } from '@/components/list'
import { Paragraph } from '@/components/paragraph'
import { Span } from '@/components/span'
import { VisitTable } from '@/components/flow-trace-visits'
import {
  conversionLabel,
  deviceOf,
  formatClock,
  formatDuration,
  formatWhen,
  placeOf,
  sourceOf,
  visitHeadline,
  visitLength,
  visitOrdinal,
} from '@/utils/flow-trace-format'
import type { FtEventType, FtVisitReport } from '@/utils/flow-trace-types'

const EVENT_ICONS: Record<FtEventType, { body: string }> = {
  pageview: fileTextIcon,
  call: phoneIcon,
  email: mailIcon,
  text: smartphoneIcon,
  form: sendIcon,
  click: mousePointerClickIcon,
}

function Fact({ label, value }: { label: string; value: string }) {
  if (!value) return null
  return (
    <div>
      <Paragraph
        fontSize="text-sm"
        color="text-contrast-light"
        margin="mb-0"
      >
        {label}
      </Paragraph>
      <Paragraph
        fontSize="text-base"
        margin="mb-0"
        className="break-words"
      >
        {value}
      </Paragraph>
    </div>
  )
}

/** One visit: the facts about it, then every step in order. */
export function VisitReport({
  report,
  onOpenVisit,
}: {
  report: FtVisitReport
  onOpenVisit: (id: string) => void
}) {
  const { visit, events, otherVisits } = report
  const campaign = [visit.utmCampaign, visit.utmTerm, visit.utmContent]
    .filter(Boolean)
    .join(' / ')

  return (
    <div className="space-y-10">
      <header>
        <Paragraph
          fontSize="text-sm"
          color="text-contrast-light"
          margin="mb-1"
        >
          {formatWhen(visit.startedAt)}
        </Paragraph>
        <Heading
          as="h1"
          color="text-contrast"
          styleAs="h2"
          fontSize="text-2xl sm:text-3xl"
          margin="mb-0"
        >
          {visitHeadline(visit)}
        </Heading>
      </header>

      <Grid
        cols="grid-cols-2 lg:grid-cols-4"
        gap="gap-x-6 gap-y-5"
        className="rounded-2xl bg-body-light p-6 ring-1 ring-contrast/10"
      >
        <Fact
          label="Came from"
          value={sourceOf(visit)}
        />
        <Fact
          label="Campaign"
          value={campaign}
        />
        <Fact
          label="Where"
          value={placeOf(visit)}
        />
        <Fact
          label="Device"
          value={deviceOf(visit)}
        />
        <Fact
          label="Time reading"
          value={`${formatDuration(visit.engagedMs)} over ${visitLength(visit)}`}
        />
        <Fact
          label="Pages"
          value={String(visit.pageviews)}
        />
        <Fact
          label="Visit"
          value={
            visit.visitNumber > 1
              ? `${visitOrdinal(visit.visitNumber)}${visit.firstSeen ? ` · first seen ${formatWhen(visit.firstSeen)}` : ''}`
              : 'First visit'
          }
        />
        <Fact
          label="Across all visits"
          value={
            visit.visitNumber > 1 ? formatDuration(visit.visitorEngagedMs) : ''
          }
        />
        <Fact
          label="IP address"
          value={visit.ip}
        />
        <Fact
          label="Email reader"
          value={visit.readerEmail}
        />
        <Fact
          label="Signed-in client"
          value={visit.userEmail}
        />
      </Grid>

      <section>
        <Heading
          as="h2"
          styleAs="h4"
          color="text-contrast"
          fontSize="text-xl"
          margin="mb-4"
        >
          What they did
        </Heading>
        <List
          bullets={false}
          margin="mb-0"
          className="ml-3.5 border-l-2 border-contrast/10 [&_a]:no-underline"
        >
          {events.map((event) => {
            const isPage = event.type === 'pageview'
            return (
              <Li
                key={event.id}
                className="relative py-3 pl-8"
              >
                <span
                  className={clsx(
                    'absolute -left-[13px] top-3 flex h-6 w-6 items-center justify-center rounded-full',
                    isPage
                      ? 'bg-body2 text-contrast-light ring-1 ring-contrast/20'
                      : 'bg-accent text-accent-contrast'
                  )}
                >
                  <Icon
                    icon={EVENT_ICONS[event.type]}
                    className="h-3.5 w-3.5"
                  />
                </span>
                <Paragraph
                  fontSize="text-sm"
                  color="text-contrast-light"
                  margin="mb-0"
                >
                  {formatClock(event.at)}
                  {isPage && event.engagedMs > 0 && (
                    <> · {formatDuration(event.engagedMs)} on the page</>
                  )}
                </Paragraph>
                {isPage ? (
                  <Paragraph
                    fontSize="text-base"
                    margin="mb-0"
                  >
                    <a
                      href={event.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="no-underline! hover:text-accent"
                    >
                      {event.title || event.path}
                    </a>{' '}
                    <Span
                      fontSize="text-sm"
                      color="text-contrast-light"
                    >
                      {event.path}
                    </Span>
                  </Paragraph>
                ) : (
                  <Paragraph
                    fontSize="text-base"
                    margin="mb-0"
                    color="text-accent"
                    fontWeight="font-semibold"
                  >
                    {conversionLabel(event.type)}
                    {event.label && (
                      <Span color="text-contrast">: {event.label}</Span>
                    )}
                  </Paragraph>
                )}
              </Li>
            )
          })}
        </List>
      </section>

      {otherVisits.length > 0 && (
        <section>
          <Heading
            as="h2"
            styleAs="h4"
            color="text-contrast"
            fontSize="text-xl"
            margin="mb-4"
          >
            Their other converted visits
          </Heading>
          <VisitTable
            visits={otherVisits}
            onOpen={onOpenVisit}
          />
        </section>
      )}
    </div>
  )
}
