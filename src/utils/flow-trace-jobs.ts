import { DateTime } from 'luxon'
import { flowTraceConfig } from '@/utils/flow-trace-config'
import { renderDigestEmail, renderVisitEmail } from '@/utils/flow-trace-email'
import { adminEmails } from '@/utils/flow-trace-recipients'
import {
  claimDigest,
  countReports,
  logReport,
  markReported,
  readEmailModes,
  readSummary,
  readUnsent,
  readVisitReport,
  releaseDigest,
} from '@/utils/flow-trace-store'
import type { FtEmailMode } from '@/utils/flow-trace-types'
import { sendEmail } from '@/utils/send-email'

// FlowTrace's reports. Each conversion is reported the moment it happens, by
// reportConversion, called from /api/flow-trace. The scheduled work, run
// every ten minutes by the cron in worker-entry.ts through
// POST /api/flowtrace/jobs:
//  1. sending again any report that failed to go out;
//  2. the daily and weekly summaries, once each, at the digest hour.
// Who is emailed is in src/utils/flow-trace-recipients.ts;
// their choice is in ft_email_settings, and the default in
// src/utils/flow-trace-config.ts.

export type FlowTraceEmail = { subject: string; html: string; text: string }

/** Sends one email; true when it went out. */
export type SendEmail = (
  message: FlowTraceEmail & { to: string }
) => Promise<boolean>

/**
 * The site's own mailer as FlowTrace's `send`. `required` is what turns a
 * failure into a thrown error, and so into the `false` the retry queue needs:
 * without it a report that never went out would count as sent.
 */
export const flowTraceSend: SendEmail = async ({ to, subject, html, text }) => {
  try {
    await sendEmail({ to, subject, bodyHtml: html, text, required: true })
    return true
  } catch {
    return false
  }
}

async function recipients(
  db: D1Database,
  mode: FtEmailMode
): Promise<string[]> {
  const modes = await readEmailModes(db, await adminEmails(db))
  return [...modes]
    .filter(([, chosen]) => chosen === mode)
    .map(([email]) => email)
}

/** Sends one report to each person; true when at least one went out. */
async function sendToEach(
  send: SendEmail,
  to: string[],
  email: FlowTraceEmail
): Promise<boolean> {
  const sent = await Promise.all(
    to.map((address) => send({ to: address, ...email }))
  )
  return sent.some(Boolean)
}

/**
 * Reports a visit that has just converted, to each "instant" person, and
 * marks it reported. Called from /api/flow-trace once the visit is written.
 * True when it went out; a failed send is left for the scheduled job.
 * `site` is the site's own address, which the report's links are built on.
 */
export async function reportConversion(
  db: D1Database,
  send: SendEmail,
  visitId: string,
  now: DateTime,
  site: string
): Promise<boolean> {
  const stamp = Math.floor(now.toSeconds())
  const to = await recipients(db, 'instant')
  // With no one to tell, the visit is marked all the same: turning instant
  // reports on later should not send a backlog.
  if (!to.length) {
    await markReported(db, visitId, stamp)
    return false
  }
  const report = await readVisitReport(db, visitId)
  if (!report) return false

  // Past the hourly limits the visit is kept and marked, but not emailed: it
  // is on the dashboard and in the summaries.
  const sent = await countReports(db, stamp - 3600, report.visit.ip)
  if (
    sent.all >= flowTraceConfig.reportsPerHour ||
    sent.fromAddress >= flowTraceConfig.reportsPerAddressPerHour
  ) {
    await markReported(db, visitId, stamp)
    return false
  }

  if (!(await sendToEach(send, to, renderVisitEmail(report, site)))) {
    return false
  }
  await logReport(db, visitId, report.visit.ip, stamp)
  await markReported(db, visitId, stamp)
  return true
}

/** Sends the reports that failed to go out when their visit converted. */
export async function retryUnsentReports(
  db: D1Database,
  send: SendEmail,
  now: DateTime,
  site: string
): Promise<number> {
  // Not the ones the endpoint may be sending this minute, nor any so old
  // that the report would only be news of something long gone
  const before = Math.floor(now.minus({ minutes: 1 }).toSeconds())
  const since = Math.floor(
    now.minus({ hours: flowTraceConfig.retryHours }).toSeconds()
  )
  let sent = 0
  for (const visit of await readUnsent(db, since, before)) {
    if (await reportConversion(db, send, visit.id, now, site)) sent++
  }
  return sent
}

export async function sendDigests(
  db: D1Database,
  send: SendEmail,
  now: DateTime,
  site: string
) {
  const local = now.setZone(flowTraceConfig.zone)
  if (local.hour < flowTraceConfig.digestHour) return
  const today = local.startOf('day')
  const stamp = Math.floor(now.toSeconds())
  const period = today.minus({ days: 1 }).toISODate()!

  const digests: { kind: 'daily' | 'weekly'; days: number }[] = [
    { kind: 'daily', days: 1 },
  ]
  if (local.weekday === flowTraceConfig.digestWeekday) {
    digests.push({ kind: 'weekly', days: 7 })
  }

  for (const { kind, days } of digests) {
    const to = await recipients(db, kind)
    if (!to.length) continue
    if (!(await claimDigest(db, kind, period, stamp))) continue
    // Not one went out, or it could not be read: the next run tries again
    try {
      const summary = await readSummary(
        db,
        Math.floor(today.minus({ days }).toSeconds()),
        Math.floor(today.toSeconds())
      )
      const email = renderDigestEmail(summary, kind, site)
      if (!(await sendToEach(send, to, email))) {
        await releaseDigest(db, kind, period)
      }
    } catch (error) {
      await releaseDigest(db, kind, period)
      console.error(`FlowTrace ${kind} summary not sent:`, error)
    }
  }
}

export async function runFlowTraceJobs(input: {
  db: D1Database
  send: SendEmail
  site: string
  now?: DateTime
}) {
  const now = input.now ?? DateTime.now()
  // Each runs whether or not the other worked
  let resent = 0
  try {
    resent = await retryUnsentReports(input.db, input.send, now, input.site)
  } catch (error) {
    console.error('FlowTrace reports not resent:', error)
  }
  try {
    await sendDigests(input.db, input.send, now, input.site)
  } catch (error) {
    console.error('FlowTrace summaries not sent:', error)
  }
  return { resent }
}
