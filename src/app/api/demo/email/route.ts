import { DateTime } from 'luxon'
import { NextResponse, type NextRequest } from 'next/server'
import blogData from '@/data/_blog.json'
import {
  REPORTS_PER_DAY,
  REPORTS_PER_VISITOR,
  firstTime,
  forget,
  hashInbox,
  hashVisitor,
  inboxOf,
  isEmail,
  refund,
  spend,
} from '@/utils/demo-guard'
import { renderVisitEmail } from '@/utils/flow-trace-email'
import { flowTraceSend } from '@/utils/flow-trace-jobs'
import type { FtEvent, FtVisit, FtVisitReport } from '@/utils/flow-trace-types'
import { readJsonObject } from '@/utils/read-body'
import { isSameOrigin, visitorIp } from '@/utils/request-guard'
import { siteUrl } from '@/utils/server-env'

export const dynamic = 'force-dynamic'

function answer(body: Record<string, unknown>, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: { 'Cache-Control': 'no-store' },
  })
}

// A report on a made-up visit: someone who came from a search, read the latest
// post and a service page, and called. Nothing in it is a real visitor's.
function sampleReport(): FtVisitReport {
  const posts = blogData as { slug: string; metadata?: { title?: string } }[]
  const post = posts[0]
  const postPath = post ? `/${post.slug}/` : '/gallery/'
  const postTitle = post?.metadata?.title ?? 'Finished Floors Gallery'
  const now = Math.floor(DateTime.now().toSeconds())
  const start = now - 14 * 60
  const step = (
    id: number,
    after: number,
    type: FtEvent['type'],
    path: string,
    title: string,
    engagedMs = 0,
    label = '',
    href = ''
  ): FtEvent => ({
    id,
    at: start + after,
    type,
    path,
    title,
    label,
    href,
    engagedMs,
  })
  const events = [
    step(1, 0, 'pageview', '/', 'Bedrock Flooring', 41000),
    step(2, 45, 'pageview', postPath, postTitle, 384000),
    step(
      3,
      440,
      'pageview',
      '/residential-concrete-flooring/',
      'Home and Garage Concrete Floors in Red Mesa',
      62000
    ),
    step(4, 510, 'pageview', '/contact/', 'Contact', 95000),
    step(
      5,
      612,
      'call',
      '/contact/',
      'Contact',
      0,
      '5555550142',
      'tel:5555550142'
    ),
  ]
  const visit: FtVisit = {
    id: 'sample',
    visitorId: 'sample',
    visitNumber: 3,
    startedAt: start,
    lastAt: start + 612,
    entryPath: '/',
    referrer: 'google.com',
    utmSource: '',
    utmMedium: '',
    utmCampaign: '',
    utmTerm: '',
    utmContent: '',
    country: 'US',
    region: 'Texas',
    city: 'Red Mesa',
    device: 'mobile',
    browser: 'Safari',
    os: 'iOS',
    // From the range set aside for examples, so it is nobody's.
    ip: '203.0.113.42',
    pageviews: 4,
    engagedMs: 582000,
    conversions: 1,
    firstConversion: 'call',
    reportedAt: now,
    firstSeen: now - 9 * 86400,
    visitorEngagedMs: 1310000,
    reader: '',
    readerEmail: '',
    userEmail: '',
  }
  return { visit, events, otherVisits: [] }
}

// Its links open the demo's FlowTrace: the visit exists only in this email, and
// the reader is not signed in (src/components/admin-dialogs.tsx).
const toDemo = (body: string) =>
  body.replace(/\?(visit|dashboard)=[A-Za-z0-9%_-]*/g, '?demo=flowtrace')

const ALL_USED =
  'The demo has sent all its emails for today. Try again tomorrow.'

// The toolbar demo's test report, for anyone, as on Winx: once per inbox ever,
// five a day per visitor, forty a day in all. Nothing here reads anything
// private, and the only thing a visitor sends is the address: none of their
// words can go out under the site's name.
export async function POST(req: NextRequest) {
  // Only on a site that turns the demo on (src/hooks/use-demo.tsx).
  if (process.env.NEXT_PUBLIC_ADMIN_DEMO !== 'true') {
    return answer({ message: 'Not found' }, 404)
  }
  if (!isSameOrigin(req)) return answer({ message: 'Not from this site' }, 403)

  const input = await readJsonObject(req, 4 * 1024)
  if (input === null || input === 'too_large') {
    return answer({ message: 'The request could not be read.' }, 400)
  }
  if (input.action !== 'flowtrace-test') {
    return answer({ message: 'Unknown action' }, 400)
  }
  const to = String(input.email ?? '').trim()
  if (!isEmail(to)) {
    return answer({ message: 'Enter an email address to send it to.' }, 400)
  }

  try {
    const inbox = await hashInbox(inboxOf(to))
    const visitor = await hashVisitor(visitorIp(req))
    if (!(await spend(visitor, REPORTS_PER_VISITOR))) {
      return answer(
        {
          message:
            'The demo sends five test reports a day. Try again tomorrow.',
        },
        429
      )
    }
    if (!(await firstTime(inbox))) {
      // Nothing sent, so it is not one of their five.
      await refund(visitor)
      return answer(
        { message: 'That address has already had its test report.' },
        429
      )
    }
    if (!(await spend('all', REPORTS_PER_DAY))) {
      await refund(visitor)
      await forget(inbox)
      return answer({ message: ALL_USED }, 429)
    }

    const email = renderVisitEmail(sampleReport(), await siteUrl())
    const sent = await flowTraceSend({
      to,
      subject: `[Demo] ${email.subject}`,
      html: toDemo(email.html),
      text: toDemo(email.text),
    })
    if (!sent) {
      // Not sent, so the address and the visitor may try again.
      await forget(inbox)
      await refund(visitor)
      await refund('all')
      return answer(
        { message: 'The report could not be sent. Try again later.' },
        502
      )
    }
    return answer({ result: 'sent', sentTo: to })
  } catch (error) {
    console.error('A demo FlowTrace report failed:', error)
    return answer({ message: 'Something went wrong.' }, 500)
  }
}
