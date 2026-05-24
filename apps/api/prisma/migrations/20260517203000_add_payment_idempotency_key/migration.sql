-- AlterTable
ALTER TABLE "payment_transactions" ADD COLUMN "idempotency_key" VARCHAR(120);

-- CreateIndex
CREATE UNIQUE INDEX "payment_transactions_idempotency_key_key" ON "payment_transactions"("idempotency_key");

-- CreateIndex
CREATE INDEX "idx_payment_idempotency" ON "payment_transactions"("idempotency_key");
