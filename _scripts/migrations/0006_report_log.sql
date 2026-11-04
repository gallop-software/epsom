-- Every FlowTrace report that went out. The hourly limits count this, not
-- ft_visits.reported_at: that is cleared when a visit is posted again, so the
-- same visit could otherwise be reported without limit, and it is also set on
-- a visit that was held back, which would let one address use up the limit.
CREATE TABLE "ft_report_log" (
  "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
  "at" INTEGER NOT NULL,
  "ip" TEXT NOT NULL DEFAULT '',
  "visit_id" TEXT NOT NULL
);
CREATE INDEX "ft_report_log_at_idx" ON "ft_report_log" ("at");
