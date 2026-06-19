-- Add plan-based access columns
ALTER TABLE "tryout_catalogs"
ADD COLUMN "required_subscription_plan_id" TEXT;

ALTER TABLE "materials"
ADD COLUMN "required_subscription_plan_id" TEXT;

-- Backfill material plan access from legacy required_tier
UPDATE "materials" AS m
SET "required_subscription_plan_id" = COALESCE(
  (
    SELECT sp."id"
    FROM "subscription_plans" AS sp
    WHERE sp."tier" = m."required_tier"
      AND sp."is_active" = true
    ORDER BY sp."created_at" ASC
    LIMIT 1
  ),
  (
    SELECT sp."id"
    FROM "subscription_plans" AS sp
    WHERE sp."tier" = m."required_tier"
    ORDER BY sp."created_at" ASC
    LIMIT 1
  )
)
WHERE m."required_subscription_plan_id" IS NULL;

-- Backfill tryout plan access from legacy access_type
UPDATE "tryout_catalogs" AS tc
SET "required_subscription_plan_id" = CASE
  WHEN tc."access_type" = 'premium_only' THEN COALESCE(
    (
      SELECT sp."id"
      FROM "subscription_plans" AS sp
      WHERE sp."tier" = 'premium'
        AND sp."is_active" = true
      ORDER BY sp."created_at" ASC
      LIMIT 1
    ),
    (
      SELECT sp."id"
      FROM "subscription_plans" AS sp
      WHERE sp."tier" = 'premium'
      ORDER BY sp."created_at" ASC
      LIMIT 1
    )
  )
  WHEN tc."access_type" = 'paid_only' THEN COALESCE(
    (
      SELECT sp."id"
      FROM "subscription_plans" AS sp
      WHERE sp."tier" = 'standard'
        AND sp."is_active" = true
      ORDER BY sp."created_at" ASC
      LIMIT 1
    ),
    (
      SELECT sp."id"
      FROM "subscription_plans" AS sp
      WHERE sp."tier" = 'standard'
      ORDER BY sp."created_at" ASC
      LIMIT 1
    )
  )
  ELSE COALESCE(
    (
      SELECT sp."id"
      FROM "subscription_plans" AS sp
      WHERE sp."tier" = 'trial'
        AND sp."is_active" = true
      ORDER BY sp."created_at" ASC
      LIMIT 1
    ),
    (
      SELECT sp."id"
      FROM "subscription_plans" AS sp
      WHERE sp."tier" = 'trial'
      ORDER BY sp."created_at" ASC
      LIMIT 1
    )
  )
END
WHERE tc."required_subscription_plan_id" IS NULL;

-- Add indexes
CREATE INDEX "idx_tryout_catalogs_required_plan"
ON "tryout_catalogs"("status", "is_public", "required_subscription_plan_id");

CREATE INDEX "idx_materials_required_plan"
ON "materials"("status", "required_subscription_plan_id", "sort_order");

-- Add foreign keys
ALTER TABLE "tryout_catalogs"
ADD CONSTRAINT "tryout_catalogs_required_subscription_plan_id_fkey"
FOREIGN KEY ("required_subscription_plan_id") REFERENCES "subscription_plans"("id")
ON DELETE SET NULL
ON UPDATE CASCADE;

ALTER TABLE "materials"
ADD CONSTRAINT "materials_required_subscription_plan_id_fkey"
FOREIGN KEY ("required_subscription_plan_id") REFERENCES "subscription_plans"("id")
ON DELETE SET NULL
ON UPDATE CASCADE;
