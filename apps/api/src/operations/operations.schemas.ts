import { PaymentStatus, UserStatus } from '../../generated/prisma/client.js';
import { z } from 'zod';

const emptyToUndefined = (value: unknown) => {
  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();
  return trimmed.length === 0 ? undefined : trimmed;
};

export const adminUsersQuerySchema = z.object({
  search: z.preprocess(emptyToUndefined, z.string().max(255).optional()),
  subscriptionStatus: z.preprocess(
    emptyToUndefined,
    z.enum(['active', 'expired', 'trial']).optional(),
  ),
  status: z.preprocess(emptyToUndefined, z.nativeEnum(UserStatus).optional()),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const adminTransactionsQuerySchema = z.object({
  status: z.preprocess(emptyToUndefined, z.nativeEnum(PaymentStatus).optional()),
  paymentMethod: z.preprocess(emptyToUndefined, z.string().max(50).optional()),
  dateFrom: z.preprocess(emptyToUndefined, z.string().datetime().optional()),
  dateTo: z.preprocess(emptyToUndefined, z.string().datetime().optional()),
  search: z.preprocess(emptyToUndefined, z.string().max(255).optional()),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const createSubscriptionPlanSchema = z.object({
  name: z.string().min(3).max(100),
  description: z.preprocess(emptyToUndefined, z.string().max(500).nullable().optional()),
  durationDays: z.coerce.number().int().min(1).max(3650),
  price: z.coerce.number().nonnegative(),
  currency: z.preprocess(emptyToUndefined, z.string().min(3).max(10).default('IDR')),
  isActive: z.boolean().default(true),
});

export const updateSubscriptionPlanSchema = createSubscriptionPlanSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  { message: 'At least one field is required' },
);

export const updatePassingGradeSchema = z.object({
  name: z.string().min(3).max(100),
  twkMinScore: z.coerce.number().int().min(0).max(1000),
  tiuMinScore: z.coerce.number().int().min(0).max(1000),
  tkpMinScore: z.coerce.number().int().min(0).max(1000),
  totalMinScore: z.coerce.number().int().min(0).max(5000),
  effectiveFrom: z.string().datetime(),
});

export const updateTrialConfigSchema = z.object({
  freeTryoutCount: z.coerce.number().int().min(0).max(1000),
  trialDurationDays: z.coerce.number().int().min(1).max(365),
});

export const updateAiRecommendationSettingsSchema = z.object({
  enabled: z.boolean(),
  fallbackEnabled: z.boolean(),
  providerName: z.string().min(3).max(100),
  timeoutSeconds: z.coerce.number().int().min(5).max(300),
  weakAreaAccuracyThreshold: z.coerce.number().int().min(1).max(100),
  minimumQuestionsPerTopic: z.coerce.number().int().min(1).max(100),
  maxWeakAreas: z.coerce.number().int().min(1).max(20),
  priorityScoreFormula: z.string().min(3).max(255),
  showSummary: z.boolean(),
  showWeakAreas: z.boolean(),
  showNextTryoutStrategy: z.boolean(),
  enableResultPageBanner: z.boolean(),
  errorNotification: z.boolean(),
  retryFailedJob: z.boolean(),
  logLevel: z.enum(['debug', 'info', 'warn', 'error']),
});

export const manualSubscriptionActivationSchema = z.object({
  userId: z.string().uuid(),
  subscriptionPlanId: z.string().uuid(),
  durationDays: z.coerce.number().int().min(1).max(3650),
  reason: z.string().min(5).max(500),
});

export const auditLogsQuerySchema = z.object({
  actorUserId: z.preprocess(emptyToUndefined, z.string().uuid().optional()),
  module: z.preprocess(emptyToUndefined, z.string().max(100).optional()),
  action: z.preprocess(emptyToUndefined, z.string().max(100).optional()),
  dateFrom: z.preprocess(emptyToUndefined, z.string().datetime().optional()),
  dateTo: z.preprocess(emptyToUndefined, z.string().datetime().optional()),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const deactivateAdminSchema = z.object({
  reason: z.string().min(5).max(500),
});

export const createAdminSchema = z.object({
  fullName: z.string().min(3).max(150),
  email: z.string().email().max(255),
  phone: z.preprocess(emptyToUndefined, z.string().max(30).optional()),
});

export const createPlatformUserSchema = z.object({
  fullName: z.string().min(2).max(150),
  email: z.string().email().max(255),
  phone: z.preprocess(emptyToUndefined, z.string().max(30).optional()),
});

export const updatePlatformUserStatusSchema = z.object({
  status: z.nativeEnum(UserStatus),
});

export const deletePlatformUserSchema = z.object({
  reason: z.preprocess(emptyToUndefined, z.string().min(5).max(500).optional()),
});
