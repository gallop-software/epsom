-- Signed-in clients are counted, with who they are.
--
-- Until now every signed-in account was left out of the page views and FlowTrace. Now only
-- super admins are: a client's views on the marketing pages and in their dashboard are
-- counted, and `user_email` on the row says whose they were. Empty on a visitor's row.

ALTER TABLE "page_view_log" ADD COLUMN "user_email" TEXT NOT NULL DEFAULT '';
CREATE INDEX "page_view_log_user_idx" ON "page_view_log" ("user_email", "at");

ALTER TABLE "ft_visits" ADD COLUMN "user_email" TEXT NOT NULL DEFAULT '';
