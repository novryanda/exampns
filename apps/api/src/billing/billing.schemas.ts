import { z } from 'zod';

const emptyToUndefined = (value: unknown) => {
  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();
  return trimmed.length === 0 ? undefined : trimmed;
};

export const checkoutPaymentMethods = [
  'QRIS',
  'VA_BCA',
  'VA_BNI',
  'VA_BRI',
  'VA_MANDIRI',
  'GOPAY',
  'SHOPEEPAY',
] as const;

export const createCheckoutSchema = z.object({
  subscriptionPlanId: z.string().uuid(),
  paymentMethod: z.enum(checkoutPaymentMethods),
});

export const listPaymentHistoryQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const paymentWebhookSchema = z.object({
  transaction_time: z.preprocess(emptyToUndefined, z.string().optional()),
  transaction_status: z.preprocess(emptyToUndefined, z.string()),
  transaction_id: z.preprocess(emptyToUndefined, z.string().optional()),
  status_message: z.preprocess(emptyToUndefined, z.string().optional()),
  status_code: z.preprocess(emptyToUndefined, z.string()),
  signature_key: z.preprocess(emptyToUndefined, z.string()),
  payment_type: z.preprocess(emptyToUndefined, z.string().optional()),
  order_id: z.preprocess(emptyToUndefined, z.string()),
  merchant_id: z.preprocess(emptyToUndefined, z.string().optional()),
  gross_amount: z.preprocess(emptyToUndefined, z.string()),
  fraud_status: z.preprocess(emptyToUndefined, z.string().optional()),
  currency: z.preprocess(emptyToUndefined, z.string().optional()),
}).passthrough();
