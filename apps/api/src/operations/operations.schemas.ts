import { questionAnswerModeSchema, questionCategoryCodeSchema } from '../common/question-category.js';
import { PaymentStatus, SubscriptionTier, UserStatus } from '../../generated/prisma/client.js';
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
    z.enum(['active', 'expired', 'trial', 'standard', 'premium']).optional(),
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
  tier: z.nativeEnum(SubscriptionTier),
  durationDays: z.coerce.number().int().min(1).max(3650),
  price: z.coerce.number().nonnegative(),
  currency: z.preprocess(emptyToUndefined, z.string().min(3).max(10).default('IDR')),
  isActive: z.boolean().default(true),
  features: z.array(z.string()).default([]),
  isPopular: z.boolean().default(false),
  showOnLandingPage: z.boolean().default(false),
  trialTryoutLimit: z.coerce.number().int().min(0).max(1000).nullable().optional(),
  trialDayLimit: z.coerce.number().int().min(1).max(365).nullable().optional(),
});

export const updateSubscriptionPlanSchema = createSubscriptionPlanSchema.partial().refine(
  (value) => Object.keys(value).length > 0,
  { message: 'At least one field is required' },
);

export const updatePassingGradeSchema = z.object({
  name: z.string().min(3).max(100),
  categoryMinimums: z.array(
    z.object({
      categoryCode: questionCategoryCodeSchema,
      minScore: z.coerce.number().int().min(0).max(1000),
    }),
  ),
  totalMinScore: z.coerce.number().int().min(0).max(5000),
  effectiveFrom: z.string().datetime(),
});

export const createQuestionCategoryConfigSchema = z.object({
  code: questionCategoryCodeSchema,
  name: z.string().trim().min(1).max(100),
  answerMode: questionAnswerModeSchema,
  sortOrder: z.coerce.number().int().min(0).optional(),
});

export const updateQuestionCategoryConfigSchema = z
  .object({
    name: z.string().trim().min(1).max(100).optional(),
    answerMode: questionAnswerModeSchema.optional(),
    sortOrder: z.coerce.number().int().min(0).optional(),
    isActive: z.boolean().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: 'At least one field is required',
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

export const createUserAccessOverrideSchema = z.object({
  userId: z.string().uuid(),
  subscriptionPlanId: z.string().uuid(),
  reason: z.string().min(5).max(500),
});

export const revokeUserAccessOverrideSchema = z.object({
  reason: z.preprocess(emptyToUndefined, z.string().min(5).max(500).optional()),
});

export const auditLogsQuerySchema = z.object({
  actorUserId: z.preprocess(emptyToUndefined, z.string().uuid().optional()),
  module: z.preprocess(emptyToUndefined, z.string().max(100).optional()),
  action: z.preprocess(emptyToUndefined, z.string().max(100).optional()),
  period: z.preprocess(
    emptyToUndefined,
    z.enum(['today', '7d', '30d', 'this_month']).optional(),
  ),
  dateFrom: z.preprocess(emptyToUndefined, z.string().datetime().optional()),
  dateTo: z.preprocess(emptyToUndefined, z.string().datetime().optional()),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const adminAccountsQuerySchema = z.object({
  search: z.preprocess(emptyToUndefined, z.string().max(255).optional()),
  status: z.preprocess(emptyToUndefined, z.nativeEnum(UserStatus).optional()),
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
