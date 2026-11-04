import type { FtConversion, FtEmailMode } from '@/utils/flow-trace-types'

// FlowTrace's settings for this site. Another site copies the FlowTrace files
// and changes only these.
export const flowTraceConfig = {
  /** The business's clock: days, digests and times in reports */
  zone: 'America/Chicago',
  /** A visit ends after this long with nothing done */
  visitIdleMinutes: 30,
  /** The most steps of a visit the browser keeps; the oldest go first */
  maxSteps: 100,
  /** Daily and weekly summaries go out at this hour, on the site's clock */
  digestHour: 8,
  /** Weekly summaries go out on this day (1 is Monday) */
  digestWeekday: 1,
  /**
   * At most this many instant reports an hour in all, and from any one IP
   * address: the endpoint is public, so a script could otherwise fill the
   * team's inboxes. Visits past the limit are still kept and shown on the
   * dashboard and in the summaries.
   */
  reportsPerHour: 30,
  reportsPerAddressPerHour: 5,
  /** A report that fails to send is tried again for this long */
  retryHours: 24,
  /** What a person gets until they choose in the dashboard */
  defaultEmailMode: 'instant' as FtEmailMode,
  /** Paths that are never traced: the signed-in dashboard and the API */
  ignoredPaths: ['/block', '/login', '/dashboard', '/api'],
  conversionLabels: {
    call: 'Phone call',
    email: 'Email link',
    text: 'Text message',
    form: 'Form sent',
    click: 'Tracked click',
  } satisfies Record<FtConversion, string>,
}
