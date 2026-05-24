import { z } from 'zod';

const emptyToUndefined = (value: unknown) => {
  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();
  return trimmed.length === 0 ? undefined : trimmed;
};

export const createCheckoutSchema = z.object({
  subscriptionPlanId: z.string().uuid(),
  paymentMethod: z.preprocess(emptyToUndefined, z.string().min(2).max(50)),
});

export const listPaymentHistoryQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const paymentWebhookSchema = z.object({
  eventId: z.preprocess(emptyToUndefined, z.string().min(1).max(150).optional()),
  transactionId: z.preprocess(emptyToUndefined, z.string().min(1).max(150).optional()),
  invoiceNumber: z.preprocess(emptyToUndefined, z.string().min(1).max(100)),
  status: z.preprocess(emptyToUndefined, z.string().min(1).max(50)),
  paymentMethod: z.preprocess(emptyToUndefined, z.string().min(1).max(50).optional()),
  amount: z.coerce.number().nonnegative(),
  paidAt: z.preprocess(emptyToUndefined, z.string().datetime().optional()),
});
