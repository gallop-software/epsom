-- The toolbar demo's test reports (src/app/api/demo/email). Only keyed hashes
-- are kept, never an email or IP address.

-- The inboxes that have had a report: one row each, so each gets one, ever.
CREATE TABLE "demo_sends" (
    "kind" TEXT NOT NULL,
    "address_hash" TEXT NOT NULL,
    "created_at" INTEGER NOT NULL,
    PRIMARY KEY ("kind", "address_hash")
);

-- What has been spent in the last day: by one visitor, or by everyone ('all').
CREATE TABLE "demo_attempts" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kind" TEXT NOT NULL,
    "ip_hash" TEXT NOT NULL,
    "created_at" INTEGER NOT NULL
);

CREATE INDEX "demo_attempts_idx" ON "demo_attempts" ("kind", "ip_hash", "created_at");
