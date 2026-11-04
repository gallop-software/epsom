// FlowTrace's shapes, shared by the browser (src/hooks/flow-trace.tsx), the
// endpoint, the dashboard and the emails. Nothing here runs on its own.

/** A step of a visit: a page seen, or a conversion. */
export const FT_EVENT_TYPES = [
  'pageview',
  'call',
  'email',
  'text',
  'form',
  'click',
] as const
export type FtEventType = (typeof FT_EVENT_TYPES)[number]

/** The events that make a visit worth a report. */
export const FT_CONVERSIONS = [
  'call',
  'email',
  'text',
  'form',
  'click',
] as const
export type FtConversion = (typeof FT_CONVERSIONS)[number]

/** Which emails a person gets: none, one per converting visit, or a summary. */
export const FT_EMAIL_MODES = ['off', 'instant', 'daily', 'weekly'] as const
export type FtEmailMode = (typeof FT_EMAIL_MODES)[number]

export type FtUtm = Partial<
  Record<'source' | 'medium' | 'campaign' | 'term' | 'content', string>
>

/** One step of the journey as the browser keeps it. `at` is its own clock. */
export type FtStep = {
  t: FtEventType
  /** Path with its query */
  p: string
  /** Page title */
  ti?: string
  /** Milliseconds, the browser's clock */
  at: number
  /** For a page: how long it was in front of them */
  ms?: number
  /** For a conversion: what was clicked or sent */
  l?: string
  href?: string
}

/**
 * What the browser sends when a visit converts: the whole journey so far.
 * Sent again, whole, on each later conversion in the same visit.
 */
export type FtPayload = {
  /** Visitor id, kept in the browser */
  v: string
  /** Visit id */
  s: string
  /** The visitor's how-manyth visit, as the browser counts */
  n: number
  /** When the browser first visited (ms, its clock) */
  fs: number
  /** Time on the site over all visits, this one included */
  tt: number
  /** document.referrer on arrival */
  r?: string
  u?: FtUtm
  /** The browser's clock when it sent this, to line the steps up */
  now: number
  steps: FtStep[]
  /** The reader token the browser carries: the mailing whose link it once arrived through */
  rd?: string
}

export type FtVisit = {
  id: string
  visitorId: string
  visitNumber: number
  startedAt: number
  lastAt: number
  entryPath: string
  referrer: string
  utmSource: string
  utmMedium: string
  utmCampaign: string
  utmTerm: string
  utmContent: string
  country: string
  region: string
  city: string
  device: string
  browser: string
  os: string
  ip: string
  pageviews: number
  engagedMs: number
  conversions: number
  firstConversion: string
  reportedAt: number | null
  /** When the visitor first came to the site, as their browser says */
  firstSeen: number | null
  /** Their time on the site across all visits, this one included */
  visitorEngagedMs: number
  /** The mailing (its trackingId) whose emailed link this browser once arrived through */
  reader: string
  /** Who that mailing went to, when the mailing is known */
  readerEmail: string
  /** Who was signed in, when a client was */
  userEmail: string
}

export type FtEvent = {
  id: number
  at: number
  type: FtEventType
  path: string
  title: string
  label: string
  href: string
  engagedMs: number
}

/** A visit with everything that happened on it and the visitor's history. */
export type FtVisitReport = {
  visit: FtVisit
  events: FtEvent[]
  /** The visitor's other converted visits, newest first */
  otherVisits: FtVisit[]
}

/** A line of a list, as the analytics lists show it (ViewList). */
export type FtListRow = {
  key: string
  label: string
  views: number
  href?: string
  country?: string
}

/** How many converted visits, and how many of each conversion. */
export type FtCounts = {
  converted: number
  conversions: Record<FtConversion, number>
}

/** The converted visits in a stretch of time: the dashboard's and the summaries'. */
export type FtSummary = FtCounts & {
  from: number
  to: number
  sources: FtListRow[]
  /** The pages seen on those visits */
  pages: FtListRow[]
  countries: FtListRow[]
  regions: FtListRow[]
  cities: FtListRow[]
  devices: FtListRow[]
  convertedVisits: FtVisit[]
}

export type FtVisitPage = {
  rows: FtVisit[]
  total: number
  page: number
  pages: number
}
