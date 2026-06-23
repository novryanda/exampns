ALTER TYPE "UserRole" ADD VALUE IF NOT EXISTS 'PARTNER';

CREATE TYPE "PartnerStatus" AS ENUM ('active', 'inactive', 'suspended');
CREATE TYPE "ReferralValueType" AS ENUM ('percentage', 'fixed');
CREATE TYPE "PartnerLedgerEntryType" AS ENUM ('commission_earned', 'commission_reversal', 'withdrawal_debit');
CREATE TYPE "PartnerWithdrawalStatus" AS ENUM ('pending', 'approved', 'rejected');

ALTER TABLE "payment_transactions"
ADD COLUMN "original_amount" DECIMAL(12,2),
ADD COLUMN "discount_amount" DECIMAL(12,2) NOT NULL DEFAULT 0,
ADD COLUMN "referral_code_id" TEXT,
ADD COLUMN "referral_code_snapshot" VARCHAR(50),
ADD COLUMN "referral_discount_type" "ReferralValueType",
ADD COLUMN "referral_discount_value" DECIMAL(12,2),
ADD COLUMN "referral_commission_type" "ReferralValueType",
ADD COLUMN "referral_commission_value" DECIMAL(12,2),
ADD COLUMN "referral_commission_amount" DECIMAL(12,2);

CREATE TABLE "partner_profiles" (
  "id" TEXT NOT NULL,
  "user_id" TEXT NOT NULL,
  "display_name" VARCHAR(150) NOT NULL,
  "status" "PartnerStatus" NOT NULL DEFAULT 'active',
  "notes" TEXT,
  "created_by" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "partner_profiles_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "partner_referral_codes" (
  "id" TEXT NOT NULL,
  "partner_profile_id" TEXT NOT NULL,
  "code" VARCHAR(50) NOT NULL,
  "is_active" BOOLEAN NOT NULL DEFAULT true,
  "discount_type" "ReferralValueType" NOT NULL,
  "discount_value" DECIMAL(12,2) NOT NULL,
  "commission_type" "ReferralValueType" NOT NULL,
  "commission_value" DECIMAL(12,2) NOT NULL,
  "created_by" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "partner_referral_codes_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "partner_bank_accounts" (
  "id" TEXT NOT NULL,
  "partner_profile_id" TEXT NOT NULL,
  "bank_name" VARCHAR(100) NOT NULL,
  "account_number" VARCHAR(80) NOT NULL,
  "account_holder_name" VARCHAR(150) NOT NULL,
  "is_primary" BOOLEAN NOT NULL DEFAULT true,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "partner_bank_accounts_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "partner_ledger_entries" (
  "id" TEXT NOT NULL,
  "partner_profile_id" TEXT NOT NULL,
  "payment_transaction_id" TEXT,
  "withdrawal_request_id" TEXT,
  "entry_type" "PartnerLedgerEntryType" NOT NULL,
  "amount" DECIMAL(12,2) NOT NULL,
  "description" VARCHAR(255) NOT NULL,
  "metadata" JSONB,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT "partner_ledger_entries_pkey" PRIMARY KEY ("id")
);

CREATE TABLE "partner_withdrawal_requests" (
  "id" TEXT NOT NULL,
  "partner_profile_id" TEXT NOT NULL,
  "amount" DECIMAL(12,2) NOT NULL,
  "status" "PartnerWithdrawalStatus" NOT NULL DEFAULT 'pending',
  "bank_name_snapshot" VARCHAR(100) NOT NULL,
  "account_number_snapshot" VARCHAR(80) NOT NULL,
  "account_holder_name_snapshot" VARCHAR(150) NOT NULL,
  "requested_note" TEXT,
  "reviewed_by" TEXT,
  "reviewed_at" TIMESTAMP(3),
  "review_note" TEXT,
  "transfer_proof_url" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "partner_withdrawal_requests_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "partner_profiles_user_id_key" ON "partner_profiles"("user_id");
CREATE INDEX "idx_partner_profiles_status" ON "partner_profiles"("status", "created_at");

CREATE UNIQUE INDEX "partner_referral_codes_code_key" ON "partner_referral_codes"("code");
CREATE INDEX "idx_partner_referral_codes_partner_active" ON "partner_referral_codes"("partner_profile_id", "is_active");

CREATE INDEX "idx_partner_bank_accounts_primary" ON "partner_bank_accounts"("partner_profile_id", "is_primary");

CREATE UNIQUE INDEX "uq_partner_ledger_payment_entry_type" ON "partner_ledger_entries"("payment_transaction_id", "entry_type");
CREATE UNIQUE INDEX "uq_partner_ledger_withdrawal_entry_type" ON "partner_ledger_entries"("withdrawal_request_id", "entry_type");
CREATE INDEX "idx_partner_ledger_partner_created" ON "partner_ledger_entries"("partner_profile_id", "created_at");

CREATE INDEX "idx_partner_withdrawals_partner_status" ON "partner_withdrawal_requests"("partner_profile_id", "status", "created_at");
CREATE INDEX "idx_partner_withdrawals_status" ON "partner_withdrawal_requests"("status", "created_at");

CREATE INDEX "idx_payment_referral_status" ON "payment_transactions"("referral_code_id", "status");

ALTER TABLE "partner_profiles"
ADD CONSTRAINT "partner_profiles_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "users"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "partner_profiles"
ADD CONSTRAINT "partner_profiles_created_by_fkey"
FOREIGN KEY ("created_by") REFERENCES "users"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "partner_referral_codes"
ADD CONSTRAINT "partner_referral_codes_partner_profile_id_fkey"
FOREIGN KEY ("partner_profile_id") REFERENCES "partner_profiles"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "partner_referral_codes"
ADD CONSTRAINT "partner_referral_codes_created_by_fkey"
FOREIGN KEY ("created_by") REFERENCES "users"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "partner_bank_accounts"
ADD CONSTRAINT "partner_bank_accounts_partner_profile_id_fkey"
FOREIGN KEY ("partner_profile_id") REFERENCES "partner_profiles"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "partner_ledger_entries"
ADD CONSTRAINT "partner_ledger_entries_partner_profile_id_fkey"
FOREIGN KEY ("partner_profile_id") REFERENCES "partner_profiles"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "partner_ledger_entries"
ADD CONSTRAINT "partner_ledger_entries_payment_transaction_id_fkey"
FOREIGN KEY ("payment_transaction_id") REFERENCES "payment_transactions"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "partner_ledger_entries"
ADD CONSTRAINT "partner_ledger_entries_withdrawal_request_id_fkey"
FOREIGN KEY ("withdrawal_request_id") REFERENCES "partner_withdrawal_requests"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "partner_withdrawal_requests"
ADD CONSTRAINT "partner_withdrawal_requests_partner_profile_id_fkey"
FOREIGN KEY ("partner_profile_id") REFERENCES "partner_profiles"("id")
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "partner_withdrawal_requests"
ADD CONSTRAINT "partner_withdrawal_requests_reviewed_by_fkey"
FOREIGN KEY ("reviewed_by") REFERENCES "users"("id")
ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "payment_transactions"
ADD CONSTRAINT "payment_transactions_referral_code_id_fkey"
FOREIGN KEY ("referral_code_id") REFERENCES "partner_referral_codes"("id")
ON DELETE SET NULL ON UPDATE CASCADE;
