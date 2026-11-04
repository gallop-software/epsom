-- FlowTrace: each visit to the site that converted, what was done on it, and
-- who is emailed about it. Written by /api/flow-trace
-- (src/utils/flow-trace-store.ts), read by the admin box on the marketing
-- pages, and reported by the ten-minute cron in worker-entry.ts, which calls
-- /api/flowtrace/jobs. Ported from epikelectricsolutions.com (its 0002 and
-- 0003 together).

-- One visit: from arriving until 30 minutes pass with nothing done. Times are
-- Unix seconds. `id` and `visitor_id` are made by the visitor's browser. Only
-- visits that converted are kept: the browser holds the journey and sends it
-- with the conversion.
create table ft_visits (
  id text not null primary key,
  visitor_id text not null,
  -- The visitor's how-manyth visit this is
  visit_number integer not null default 1,
  started_at integer not null,
  last_at integer not null,
  entry_path text not null,
  -- The site they came from, as a host name; '' when they came from nowhere
  referrer text not null default '',
  utm_source text not null default '',
  utm_medium text not null default '',
  utm_campaign text not null default '',
  utm_term text not null default '',
  utm_content text not null default '',
  country text not null default '',
  region text not null default '',
  city text not null default '',
  device text not null default '',
  browser text not null default '',
  os text not null default '',
  ip text not null default '',
  pageviews integer not null default 0,
  -- Time the page was in front of them, summed over the visit
  engaged_ms integer not null default 0,
  conversions integer not null default 0,
  -- What the first conversion was: call, email, chat or click
  first_conversion text not null default '',
  -- When the visit's report went out (or was found to have no one to go to)
  reported_at integer,
  -- When this browser first visited the site (Unix seconds)
  first_seen integer,
  -- Time on the site across all of this browser's visits, this one included
  visitor_engaged_ms integer not null default 0
);

create index ft_visits_started_idx on ft_visits (started_at);
create index ft_visits_visitor_idx on ft_visits (visitor_id, started_at);
create index ft_visits_unreported_idx on ft_visits (reported_at, conversions, last_at);

-- What happened on a visit, in order: pageview, call, email, chat, click.
create table ft_events (
  id integer primary key autoincrement,
  visit_id text not null references ft_visits (id) on delete cascade,
  at integer not null,
  type text not null,
  path text not null,
  title text not null default '',
  -- What was clicked or sent: a link's text, a phone number, a chat's first line
  label text not null default '',
  href text not null default '',
  -- For a pageview, the time the page was in front of them
  engaged_ms integer not null default 0
);

create index ft_events_visit_idx on ft_events (visit_id, at);

-- Which FlowTrace emails each person is sent: off, instant (a report for each
-- visit that converts), daily or weekly (a summary). Keyed by address, so a
-- super admin who has never chosen still gets the default.
create table ft_email_settings (
  email text not null primary key,
  mode text not null,
  updated_at integer not null
);

-- The summaries sent, so each goes once: kind is daily or weekly, period the
-- day it covers up to (2026-10-13).
create table ft_digests (
  kind text not null,
  period text not null,
  sent_at integer not null,
  primary key (kind, period)
);
