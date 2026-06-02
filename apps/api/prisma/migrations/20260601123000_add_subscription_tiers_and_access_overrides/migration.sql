CREATE TYPE "SubscriptionTier" AS ENUM ('trial', 'standard', 'premium');

ALTER TABLE "subscription_plans"
ADD COLUMN "tier" "SubscriptionTier" NOT NULL DEFAULT 'standard';

ALTER TABLE "user_subscriptions"
ADD COLUMN "tier_snapshot" "SubscriptionTier" NOT NULL DEFAULT 'standard';

UPDATE "subscription_plans"
SET "tier" = CASE
  WHEN "is_trial" = true THEN 'trial'::"SubscriptionTier"
  ELSE 'standard'::"SubscriptionTier"
END;

UPDATE "user_subscriptions"
SET "tier_snapshot" = CASE
  WHEN "is_trial" = true THEN 'trial'::"SubscriptionTier"
  ELSE 'standard'::"SubscriptionTier"
END;

CREATE TABLE "user_access_overrides" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "tier" "SubscriptionTier" NOT NULL,
    "starts_at" TIMESTAMP(3) NOT NULL,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "granted_by" TEXT NOT NULL,
    "revoked_at" TIMESTAMP(3),
    "revoked_by" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_access_overrides_pkey" PRIMARY KEY ("id")
);

CREATE INDEX "subscription_plans_is_active_tier_idx" ON "subscription_plans"("is_active", "tier");
CREATE INDEX "idx_subscription_user_tier_status" ON "user_subscriptions"("user_id", "tier_snapshot", "status");
CREATE INDEX "idx_user_access_overrides_user_active" ON "user_access_overrides"("user_id", "revoked_at", "expires_at");
CREATE INDEX "idx_user_access_overrides_granted_by" ON "user_access_overrides"("granted_by", "created_at");
CREATE INDEX "idx_user_access_overrides_tier_expires" ON "user_access_overrides"("tier", "expires_at");

ALTER TABLE "user_access_overrides" ADD CONSTRAINT "user_access_overrides_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "user_access_overrides" ADD CONSTRAINT "user_access_overrides_granted_by_fkey" FOREIGN KEY ("granted_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "user_access_overrides" ADD CONSTRAINT "user_access_overrides_revoked_by_fkey" FOREIGN KEY ("revoked_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
