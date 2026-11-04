-- Page views, counted by the site itself and shown on the dashboard's
-- Analytics box and the admin toolbar. Written and read by
-- src/utils/page-views.ts. The same tables as medicine-opera's
-- (by way of epikelectricsolutions.com).

-- Daily counts, kept forever. One row for each thing counted on each day:
--   kind 'total'     key ''                            the whole site
--   kind 'path'      key '/services/commercial'        one page
--   kind 'referrer'  key 'google.com'                  the site a visit came from
--   kind 'campaign'  key 'newsletter / email / spring' utm source / medium / campaign
--   kind 'country'   key 'US'
-- The day is the site's own (America/Chicago), as 2026-10-06. Visitors are
-- the different people a day's views came from, told apart by IP address,
-- counted for the whole site and for each page; the other kinds leave it 0.
CREATE TABLE "page_views" (
    "kind" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "day" TEXT NOT NULL,
    "views" INTEGER NOT NULL DEFAULT 0,
    "visits" INTEGER NOT NULL DEFAULT 0,
    "visitors" INTEGER NOT NULL DEFAULT 0,

    PRIMARY KEY ("kind", "key", "day")
);

CREATE INDEX "page_views_day_idx" ON "page_views"("kind", "day");

-- One row for each page view, with where it came from and the visitor's
-- address. Kept forever. Only ever returned by the routes under /api/analytics.
CREATE TABLE "page_view_log" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "at" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "is_visit" INTEGER NOT NULL DEFAULT 0,
    "referrer" TEXT NOT NULL DEFAULT '',
    "utm_source" TEXT NOT NULL DEFAULT '',
    "utm_medium" TEXT NOT NULL DEFAULT '',
    "utm_campaign" TEXT NOT NULL DEFAULT '',
    "country" TEXT NOT NULL DEFAULT '',
    "region" TEXT NOT NULL DEFAULT '',
    "city" TEXT NOT NULL DEFAULT '',
    "device" TEXT NOT NULL DEFAULT '',
    "browser" TEXT NOT NULL DEFAULT '',
    "os" TEXT NOT NULL DEFAULT '',
    "ip" TEXT NOT NULL DEFAULT ''
);

CREATE INDEX "page_view_log_at_idx" ON "page_view_log"("at");

CREATE INDEX "page_view_log_ip_idx" ON "page_view_log"("ip", "at");
