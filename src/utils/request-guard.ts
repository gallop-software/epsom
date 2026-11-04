// Where a request to a public route came from: whether a page of this site
// sent it, and the visitor's address. Medicine-opera's comment-guard.ts,
// the parts the page-view and FlowTrace routes use.

// --- Origin ---

// True when a browser sent the request from a page of this site. It stops
// another site from posting through a visitor's browser. It does not stop a
// script, which can send any header it likes: the token and the limits are
// for that.
export function isSameOrigin(req: Request): boolean {
  const fetchSite = req.headers.get('sec-fetch-site')
  if (fetchSite && fetchSite !== 'same-origin') return false

  const origin = req.headers.get('origin')
  if (!origin || origin === 'null') return false

  let originHost: string
  try {
    const url = new URL(origin)
    if (url.protocol !== 'https:' && url.protocol !== 'http:') return false
    originHost = url.host.toLowerCase()
  } catch {
    return false
  }

  const allowed = new Set<string>()
  const host = req.headers.get('host')
  if (host) allowed.add(host.toLowerCase())

  const production = process.env.NEXT_PUBLIC_PRODUCTION_URL
  if (production) {
    try {
      allowed.add(new URL(production).host.toLowerCase())
    } catch {
      // Not an address: only the Host header counts.
    }
  }

  return allowed.has(originHost)
}

// --- Address ---

// Cloudflare sets CF-Connecting-IP itself, so a visitor cannot choose it.
// X-Forwarded-For can be sent by anyone, and is only read where there is no
// Cloudflare in front: local development.
export function visitorIp(req: Request): string {
  const cf = req.headers.get('cf-connecting-ip')?.trim()
  if (cf) return cf

  if (process.env.NODE_ENV !== 'production') {
    const forwarded = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
    return forwarded || '127.0.0.1'
  }

  return ''
}
