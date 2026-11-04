/**
 * The pure rules behind knowing which email readers visit the site. No database, no
 * request: tested by `reader-rules.test.mjs` (`npm test`).
 *
 * A **reader token** is a mailing's `trackingId` (a UUID made in `campaign-send.ts`). The
 * click route puts it in the landing URL as `wpm=`, the browser keeps it in localStorage,
 * and the page-view and FlowTrace hooks send it with everything after, so one click
 * identifies that browser for good.
 */

/** The query parameter the click redirect adds to a link into the site. */
export const READER_PARAM = 'wpm'

/** The localStorage key the browser keeps the token under. */
export const READER_KEY = 'ft_reader'

const UUID = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

/** A reader token as `campaign-send.ts` makes them, and nothing else. */
export function isReaderToken(value: unknown): value is string {
  return typeof value === 'string' && UUID.test(value)
}

// Opens fetched by the mail provider rather than the reader's machine. Gmail and Yahoo say
// so in the user agent. Apple Mail's privacy relay sends an ordinary Safari user agent and
// is only known by the network the request came from, which is why the organisation is
// checked as well. Mail security scanners (Proofpoint, Mimecast, Barracuda) open every
// link before the reader sees it, so they count as proxies too.
const PROXY_AGENTS =
  /GoogleImageProxy|YahooMailProxy|Yahoo Ad monitoring|MSOffice|Outlook-iOS|ms-office|Barracuda|Proofpoint|Mimecast/i
const PROXY_ORGS =
  /\bgoogle\b|\bapple\b|\bicloud\b|\byahoo\b|\bmicrosoft\b|\boutlook\b|\bproofpoint\b|\bmimecast\b|\bbarracuda\b/i

/**
 * Whether an open or click came through a mail provider's proxy or a security scanner,
 * from its user agent and the organisation Cloudflare names for its network.
 */
export function isMailProxy(userAgent: string, org: string): boolean {
  return PROXY_AGENTS.test(userAgent) || PROXY_ORGS.test(org)
}

export type ReaderIds = {
  trackingId: string
  campaignId: string | null
  mailingId: string | null
}

function bareHost(host: string): string {
  return host.toLowerCase().replace(/^www\./, '')
}

/**
 * A click's destination with the reader token and campaign tags added when it leads into
 * the site, or unchanged when it leads anywhere else. A tag already in the link (an email
 * written with its own `utm_source`) is kept as written. `siteHosts` are the site's own
 * hosts, with or without `www.`, with or without a port.
 */
export function taggedTarget(
  target: string,
  ids: ReaderIds,
  siteHosts: string[]
): string {
  let url: URL
  try {
    url = new URL(target)
  } catch {
    return target
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return target
  const own = new Set(siteHosts.map((h) => bareHost(h.split(':')[0] ?? '')))
  if (!own.has(bareHost(url.hostname))) return target

  const params = url.searchParams
  const add = (key: string, value: string | null) => {
    if (value && !params.has(key)) params.set(key, value)
  }
  add(READER_PARAM, ids.trackingId)
  add('utm_source', 'email')
  add('utm_medium', 'email')
  add('utm_campaign', ids.campaignId)
  add('utm_content', ids.mailingId)
  return url.toString()
}
