ALTER TABLE "user_access_overrides"
ADD COLUMN "subscription_plan_id" TEXT;

WITH ranked_plans AS (
  SELECT
    uao."id" AS override_id,
    sp."id" AS subscription_plan_id,
    ROW_NUMBER() OVER (
      PARTITION BY uao."id"
      ORDER BY
        CASE WHEN sp."is_active" THEN 0 ELSE 1 END,
        sp."created_at" DESC
    ) AS plan_rank
  FROM "user_access_overrides" uao
  JOIN "subscription_plans" sp
    ON sp."tier" = uao."tier"
)
UPDATE "user_access_overrides" uao
SET "subscription_plan_id" = ranked_plans.subscription_plan_id
FROM ranked_plans
WHERE ranked_plans.override_id = uao."id"
  AND ranked_plans.plan_rank = 1;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM "user_access_overrides"
    WHERE "subscription_plan_id" IS NULL
  ) THEN
    RAISE EXCEPTION 'Cannot migrate user_access_overrides because some rows do not match a subscription plan';
  END IF;
END $$;

ALTER TABLE "user_access_overrides"
ALTER COLUMN "subscription_plan_id" SET NOT NULL;

ALTER TABLE "user_access_overrides"
ADD CONSTRAINT "user_access_overrides_subscription_plan_id_fkey"
FOREIGN KEY ("subscription_plan_id") REFERENCES "subscription_plans"("id")
ON DELETE RESTRICT ON UPDATE CASCADE;

DROP INDEX "idx_user_access_overrides_user_active";
DROP INDEX "idx_user_access_overrides_tier_expires";

CREATE INDEX "idx_user_access_overrides_user_active"
ON "user_access_overrides"("user_id", "revoked_at");

CREATE INDEX "idx_user_access_overrides_plan_active"
ON "user_access_overrides"("subscription_plan_id", "revoked_at");

ALTER TABLE "user_access_overrides"
DROP COLUMN "tier",
DROP COLUMN "starts_at",
DROP COLUMN "expires_at";
