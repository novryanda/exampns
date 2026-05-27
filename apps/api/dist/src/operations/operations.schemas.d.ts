import { z } from 'zod';
export declare const adminUsersQuerySchema: z.ZodObject<{
    search: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
    subscriptionStatus: z.ZodPreprocess<z.ZodOptional<z.ZodEnum<{
        active: "active";
        expired: "expired";
        trial: "trial";
    }>>>;
    status: z.ZodPreprocess<z.ZodOptional<z.ZodEnum<{
        readonly active: "active";
        readonly inactive: "inactive";
        readonly suspended: "suspended";
    }>>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export declare const adminTransactionsQuerySchema: z.ZodObject<{
    status: z.ZodPreprocess<z.ZodOptional<z.ZodEnum<{
        readonly pending: "pending";
        readonly success: "success";
        readonly failed: "failed";
        readonly expired: "expired";
        readonly cancelled: "cancelled";
        readonly refunded: "refunded";
    }>>>;
    paymentMethod: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
    dateFrom: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
    dateTo: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
    search: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export declare const createSubscriptionPlanSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodPreprocess<z.ZodOptional<z.ZodNullable<z.ZodString>>>;
    durationDays: z.ZodCoercedNumber<unknown>;
    price: z.ZodCoercedNumber<unknown>;
    currency: z.ZodPreprocess<z.ZodDefault<z.ZodString>>;
    isActive: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export declare const updateSubscriptionPlanSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodPreprocess<z.ZodOptional<z.ZodNullable<z.ZodString>>>>;
    durationDays: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    price: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    currency: z.ZodOptional<z.ZodPreprocess<z.ZodDefault<z.ZodString>>>;
    isActive: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, z.core.$strip>;
export declare const updatePassingGradeSchema: z.ZodObject<{
    name: z.ZodString;
    twkMinScore: z.ZodCoercedNumber<unknown>;
    tiuMinScore: z.ZodCoercedNumber<unknown>;
    tkpMinScore: z.ZodCoercedNumber<unknown>;
    totalMinScore: z.ZodCoercedNumber<unknown>;
    effectiveFrom: z.ZodString;
}, z.core.$strip>;
export declare const updateTrialConfigSchema: z.ZodObject<{
    freeTryoutCount: z.ZodCoercedNumber<unknown>;
    trialDurationDays: z.ZodCoercedNumber<unknown>;
}, z.core.$strip>;
export declare const updateAiRecommendationSettingsSchema: z.ZodObject<{
    enabled: z.ZodBoolean;
    fallbackEnabled: z.ZodBoolean;
    providerName: z.ZodString;
    timeoutSeconds: z.ZodCoercedNumber<unknown>;
    weakAreaAccuracyThreshold: z.ZodCoercedNumber<unknown>;
    minimumQuestionsPerTopic: z.ZodCoercedNumber<unknown>;
    maxWeakAreas: z.ZodCoercedNumber<unknown>;
    priorityScoreFormula: z.ZodString;
    showSummary: z.ZodBoolean;
    showWeakAreas: z.ZodBoolean;
    showNextTryoutStrategy: z.ZodBoolean;
    enableResultPageBanner: z.ZodBoolean;
    errorNotification: z.ZodBoolean;
    retryFailedJob: z.ZodBoolean;
    logLevel: z.ZodEnum<{
        info: "info";
        warn: "warn";
        error: "error";
        debug: "debug";
    }>;
}, z.core.$strip>;
export declare const manualSubscriptionActivationSchema: z.ZodObject<{
    userId: z.ZodString;
    subscriptionPlanId: z.ZodString;
    durationDays: z.ZodCoercedNumber<unknown>;
    reason: z.ZodString;
}, z.core.$strip>;
export declare const auditLogsQuerySchema: z.ZodObject<{
    actorUserId: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
    module: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
    action: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
    period: z.ZodPreprocess<z.ZodOptional<z.ZodEnum<{
        today: "today";
        "7d": "7d";
        "30d": "30d";
        this_month: "this_month";
    }>>>;
    dateFrom: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
    dateTo: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export declare const deactivateAdminSchema: z.ZodObject<{
    reason: z.ZodString;
}, z.core.$strip>;
export declare const createAdminSchema: z.ZodObject<{
    fullName: z.ZodString;
    email: z.ZodString;
    phone: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const createPlatformUserSchema: z.ZodObject<{
    fullName: z.ZodString;
    email: z.ZodString;
    phone: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const updatePlatformUserStatusSchema: z.ZodObject<{
    status: z.ZodEnum<{
        readonly active: "active";
        readonly inactive: "inactive";
        readonly suspended: "suspended";
    }>;
}, z.core.$strip>;
export declare const deletePlatformUserSchema: z.ZodObject<{
    reason: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
