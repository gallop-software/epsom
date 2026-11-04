-- Which email readers visit the site (no mailing tables on this site).
ALTER TABLE "page_view_log" ADD COLUMN "reader" TEXT NOT NULL DEFAULT '';
CREATE INDEX "page_view_log_reader_idx" ON "page_view_log" ("reader", "at");

ALTER TABLE "ft_visits" ADD COLUMN "reader" TEXT NOT NULL DEFAULT '';
CREATE INDEX "ft_visits_reader_idx" ON "ft_visits" ("reader", "started_at");
