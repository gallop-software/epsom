# Flow Trace

FlowTrace reports each visit that converts (a call, an email, a form, a tracked click): where the visitor came from, every page they saw, how long each page was in front of them, and what they did. The visit is kept in the visitor's browser while they read; when they convert, the whole visit is sent at once, stored in the site's D1 database, and emailed to the team. Visits that never convert never leave the browser. The visits are kept and shown in FlowTrace (the admin bar's FlowTrace button).

**File:** `src/hooks/flow-trace.tsx` (browser)
**File:** `src/app/api/flow-trace/route.ts` (endpoint)
**File:** `src/utils/flow-trace-*.ts` (config, store, emails, scheduled jobs)

## Usage

Mounted once, in `src/app/layout.tsx`:

```tsx
import FlowTrace from '@/hooks/flow-trace'

<FlowTrace />
```

It watches the path only (as medicine-opera's page-view hook does), so it adds nothing to the server-rendered page.

## What is recorded

| Step | When |
|---|---|
| `pageview` | Each route change, including client-side navigation, with the time the page was visible |
| `call` | A click on a `tel:` link |
| `email` | A click on a `mailto:` link |
| `text` | A click on an `sms:` link |
| `click` | A click on an element with `.ft-tracking` or `data-ft="Label"` |
| `form` | `trackConversion('form', subject)`, called by the form when it has been sent |

Pages are only kept in the browser. Each conversion sends the visit, whole.

Track anything else from code:

```tsx
import { trackConversion } from '@/hooks/flow-trace'

trackConversion('click', 'Downloaded the brochure')
```

Or mark an element; `data-ft` names it in reports, otherwise its text is used:

```tsx
<a href="/brochure.pdf" data-ft="Brochure download">Download</a>
```

## How a visit is kept

All in `localStorage`:

- `ft_visitor`: the visitor id, and `ft_first`, when it was made.
- `ft_visits` and `ft_total_ms`: how many visits, and the time on the site over all of them.
- `ft_visit`: the visit under way: its id, referrer and campaign, and its steps (at most `maxSteps`; the oldest pages go first, conversions stay).
- `ft_reader`: the reader token, when the browser once arrived through a link in a campaign email. The click redirect (`/api/track/click`) puts the mailing's tracking id in the landing URL as `wpm=`; `src/utils/reader-token.ts` keeps it, and both this hook (`rd` in the payload) and the page-view hook (`reader`) send it with everything after, so the reader is known on every later visit, from wherever they come. A later campaign's link replaces it. The server stores it on the visit and, when the visitor id is already known, on the visitor's earlier visits; who it is comes from joining `mailing` when a visit is read (`readerEmail`).

A new visit starts after `visitIdleMinutes` with nothing done, or when the visitor arrives from another site or with `utm_` parameters. A page that stays in front of the visitor counts as activity, so a long read and then a call is one visit; a reload or the back button on the page they arrived at is not a new arrival. Where storage is blocked, the visit is kept in memory for as long as the page is open.

The same link pressed again within 5 seconds is one conversion. Paths, titles and labels are cut to what the server keeps before sending.

The visit goes out by `sendBeacon` as `text/plain`, so it is not lost when a phone link opens the dialer. Paths in `ignoredPaths` (`/admin`, `/brands`, `/account`, `/login-error`, `/api`) are never traced, and the hook is mounted only in the marketing layouts (`MarketingExtras`), never in the dashboard's.

## What the server adds

`/api/flow-trace` accepts only same-origin requests of at most 64 KB holding a conversion, with every path a path on this site, drops bots and signed-in users, and adds the country, region and city from Cloudflare's request data, the device, browser and system from the user agent, and the IP address. The reader token is kept only when it has the shape of one (a UUID). The visitor's clock may be wrong, so step times are laid back from the server's time of arrival. It answers at once, then stores the visit and emails the report.

## Configuration

All in `src/utils/flow-trace-config.ts`: the time zone, visit idle time, the most steps kept, the summary hour and weekday, the default email setting, the ignored paths, and the names of the conversions.

## Dependencies

- `next/navigation` for route changes
- `luxon` for time
