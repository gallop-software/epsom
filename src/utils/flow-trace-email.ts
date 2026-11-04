import {
  renderDigestEmailHtml,
  renderVisitReportEmailHtml,
} from '@/utils/email-template'
import {
  conversionLabel,
  deviceOf,
  formatClock,
  formatDuration,
  formatWhen,
  placeOf,
  siteTime,
  sourceName,
  sourceOf,
  visitHeadline,
  visitLength,
  visitOrdinal,
} from '@/utils/flow-trace-format'
import type {
  FtSummary,
  FtVisit,
  FtVisitReport,
} from '@/utils/flow-trace-types'

// The FlowTrace emails: a report on one visit that converted, and the daily
// and weekly summaries. Each one links to the site, where the admin bar's
// FlowTrace button opens the box: the box takes no links of its own. The HTML is built by the two FlowTrace renderers in
// src/utils/email-template.ts, as every email of this site is; this file only
// turns a report into their plain-text inputs. `site` is the site's own
// address with no trailing slash (siteUrl() in server-env.ts), passed in so
// the cron's route and the endpoint hand over the same one.

type Email = { subject: string; html: string; text: string }

const SITE_NAME = 'Bedrock Flooring'

// The subject holds only what a visitor cannot choose: the kind of
// conversion and where Cloudflare places them. Where they came from (a
// referrer or a campaign tag, anyone can send those) is in the body, escaped.
function subjectOf(visit: FtVisit): string {
  return [
    visit.firstConversion ? conversionLabel(visit.firstConversion) : 'Visit',
    placeOf(visit),
  ].join(' · ')
}

/** Opens one visit's report; signed out, it asks for sign-in and comes back. */
const visitLink = (site: string, id: string) =>
  `${site}/?visit=${encodeURIComponent(id)}`
/** Opens FlowTrace, in the same way. */
const flowTraceLink = (site: string) => `${site}/?dashboard=flowtrace`

const settingsNote =
  'You get this because FlowTrace emails are on for you. Change which you get under Email settings in FlowTrace.'

/** The report on one visit: who, from where, and every step they took. */
export function renderVisitEmail(report: FtVisitReport, site: string): Email {
  const { visit } = report
  // Most recent first: what they did last, often the call or the form, on top
  const events = [...report.events].reverse()
  const campaign = [visit.utmCampaign, visit.utmTerm, visit.utmContent]
    .filter(Boolean)
    .join(' / ')

  const facts = [
    { label: 'When', value: formatWhen(visit.startedAt) },
    { label: 'Came from', value: sourceOf(visit) },
    { label: 'Campaign', value: campaign },
    { label: 'Where', value: placeOf(visit) },
    { label: 'Device', value: deviceOf(visit) },
    {
      label: 'Visit',
      value:
        visit.visitNumber > 1
          ? `${visitOrdinal(visit.visitNumber)}${visit.firstSeen ? ` · first seen ${formatWhen(visit.firstSeen)}` : ''}`
          : 'First visit',
    },
    {
      label: 'Time on site',
      value: `${formatDuration(visit.engagedMs)} reading, over ${visitLength(visit)}`,
    },
    {
      label: 'Across all visits',
      value:
        visit.visitNumber > 1 ? formatDuration(visit.visitorEngagedMs) : '',
    },
    { label: 'IP address', value: visit.ip },
    { label: 'Email reader', value: visit.readerEmail },
    { label: 'Signed-in client', value: visit.userEmail },
  ]

  const steps = events.map((event) => {
    const isPage = event.type === 'pageview'
    return isPage
      ? {
          time: formatClock(event.at),
          title: event.title || event.path,
          note: `${event.path}${event.engagedMs ? ` · ${formatDuration(event.engagedMs)}` : ''}`,
          href: `${site}${event.path}`,
        }
      : {
          time: formatClock(event.at),
          title: `${conversionLabel(event.type)}${event.label ? `: ${event.label}` : ''}`,
          highlight: true,
        }
  })

  const headline = visitHeadline(visit)
  const html = renderVisitReportEmailHtml({
    label: 'FlowTrace',
    headline,
    facts,
    steps,
    button: { text: 'Open FlowTrace', href: visitLink(site, visit.id) },
    note: settingsNote,
    siteUrl: site,
  })

  const text = [
    `FlowTrace: ${headline}`,
    '',
    `When: ${formatWhen(visit.startedAt)}`,
    `Came from: ${sourceOf(visit)}`,
    `Where: ${placeOf(visit)}`,
    `Device: ${deviceOf(visit)}`,
    ...(visit.readerEmail ? [`Email reader: ${visit.readerEmail}`] : []),
    ...(visit.userEmail ? [`Signed-in client: ${visit.userEmail}`] : []),
    '',
    ...events.map(
      (event) =>
        `${formatClock(event.at)}  ${
          event.type === 'pageview'
            ? event.path
            : `${conversionLabel(event.type)}${event.label ? `: ${event.label}` : ''}`
        }`
    ),
    '',
    `FlowTrace: ${visitLink(site, visit.id)}`,
    '',
    settingsNote,
  ].join('\n')

  return { subject: `FlowTrace: ${subjectOf(visit)}`, html, text }
}

/** The daily or weekly summary. */
export function renderDigestEmail(
  summary: FtSummary,
  kind: 'daily' | 'weekly',
  site: string
): Email {
  const first = siteTime(summary.from)
  const last = siteTime(summary.to - 1)
  const period =
    kind === 'daily'
      ? first.toFormat('cccc, LLL d')
      : `${first.toFormat('LLL d')} – ${last.toFormat('LLL d')}`
  const title = `${kind === 'daily' ? 'Daily' : 'Weekly'} summary: ${period}`

  const tiles = [
    { label: 'Converted visits', value: String(summary.converted) },
    { label: 'Calls', value: String(summary.conversions.call) },
    { label: 'Texts', value: String(summary.conversions.text) },
    { label: 'Emails', value: String(summary.conversions.email) },
    { label: 'Forms', value: String(summary.conversions.form) },
  ]

  const shown = summary.convertedVisits.length
  const visits = summary.convertedVisits.map((visit) => ({
    text: visitHeadline(visit),
    note: `${formatWhen(visit.startedAt)} · ${visit.pageviews} page${visit.pageviews === 1 ? '' : 's'} · ${deviceOf(visit)}`,
  }))
  if (summary.converted > shown) {
    visits.push({
      text: `The latest ${shown} of ${summary.converted}. Every one is in FlowTrace.`,
      note: '',
    })
  }

  const html = renderDigestEmailHtml({
    label: `FlowTrace · ${SITE_NAME}`,
    headline: title,
    tiles,
    sections: [
      {
        title: 'Visits that converted',
        rows: visits,
        empty: 'None this time.',
      },
      {
        title: 'Where they came from',
        rows: summary.sources.map((row) => ({
          text: sourceName(row.label),
          value: String(row.views),
        })),
      },
      {
        title: 'Pages they viewed',
        rows: summary.pages.map((row) => ({
          text: row.label,
          value: String(row.views),
        })),
      },
    ],
    button: { text: 'Open FlowTrace', href: flowTraceLink(site) },
    note: settingsNote,
    siteUrl: site,
  })

  const text = [
    `FlowTrace ${title}`,
    '',
    `Converted visits: ${summary.converted}  Calls: ${summary.conversions.call}  Texts: ${summary.conversions.text}  Emails: ${summary.conversions.email}  Forms: ${summary.conversions.form}`,
    '',
    ...summary.convertedVisits.map((visit) => visitHeadline(visit)),
    '',
    `FlowTrace: ${flowTraceLink(site)}`,
    settingsNote,
  ].join('\n')

  return {
    subject: `FlowTrace ${title} · ${summary.converted} converted visit${summary.converted === 1 ? '' : 's'}`,
    html,
    text,
  }
}
