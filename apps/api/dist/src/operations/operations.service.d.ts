import { PaymentStatus, SubscriptionStatus, UserStatus } from '../../generated/prisma/client.js';
import type { AuthenticatedUser } from '../auth/auth.types.js';
import { PrismaService } from '../common/prisma.service.js';
import { ValidationService } from '../common/validation.service.js';
export declare class OperationsService {
    private readonly prisma;
    private readonly validationService;
    constructor(prisma: PrismaService, validationService: ValidationService);
    getUserDashboardSummary(actor: AuthenticatedUser): Promise<{
        greetingName: string;
        accessStatus: {
            type: string;
            status: SubscriptionStatus;
            tryoutRemaining: number | null;
            daysRemaining: number;
            endDate: Date;
        } | {
            type: string;
            status: string;
            tryoutRemaining: null;
            daysRemaining: number;
            endDate: null;
        };
        lastResult: {
            examResultId: string;
            examDate: Date;
            twkScore: number;
            tiuScore: number;
            tkpScore: number;
            totalScore: number;
            overallPassed: boolean;
        } | null;
        latestRecommendation: {
            summary: string | null;
            priorityTopic: string;
        } | null;
        weakAreas: {
            category: import("../../generated/prisma/enums.js").QuestionCategory;
            subCategory: string;
            topicTag: string;
            accuracy: number | null;
        }[];
        recentExams: {
            examResultId: string;
            examDate: Date;
            totalScore: number;
            overallPassed: boolean;
        }[];
    }>;
    getAdminDashboardSummary(): Promise<{
        totalUsers: number;
        activeSubscribers: number;
        totalQuestions: number;
        pendingReviewQuestions: number;
        paymentPending: number;
        monthlyRevenue: number;
        recentImportBatches: {
            batchId: string;
            fileName: string;
            status: import("../../generated/prisma/enums.js").ImportBatchStatus;
            totalDetected: number;
            validCount: number;
            invalidCount: number;
            createdAt: Date;
        }[];
        recentTransactions: {
            id: string;
            invoiceNumber: string;
            userName: string;
            userEmail: string;
            planName: string;
            amount: number;
            paymentMethod: string | null;
            status: PaymentStatus;
            createdAt: Date;
            paidAt: Date | null;
        }[];
    }>;
    listUsersForMonitoring(rawQuery: unknown): Promise<{
        data: {
            id: string;
            fullName: string;
            email: string;
            status: UserStatus;
            subscriptionStatus: string;
            totalExams: number;
            lastActiveAt: Date | null;
        }[];
        meta: {
            page: number;
            limit: number;
            totalItems: number;
            totalPages: number;
        };
    }>;
    getUserDetailForAdmin(userId: string): Promise<{
        id: string;
        fullName: string;
        email: string;
        phone: string | null;
        status: UserStatus;
        subscription: {
            status: string;
            endDate: Date;
            tryoutUsed: number;
            tryoutLimit: number | null;
        } | null;
        examSummary: {
            totalExams: number;
            averageScore: number;
            lastExamAt: Date;
        };
    }>;
    createPlatformUser(rawBody: unknown, actor: AuthenticatedUser): Promise<{
        id: string;
        email: string;
        role: "USER";
        status: "inactive";
    }>;
    updatePlatformUserStatus(userId: string, rawBody: unknown, actor: AuthenticatedUser): Promise<{
        id: string;
        status: "active" | "inactive" | "suspended";
    }>;
    deletePlatformUser(userId: string, rawBody: unknown, actor: AuthenticatedUser): Promise<void>;
    listTransactionsForMonitoring(rawQuery: unknown): Promise<{
        data: {
            id: string;
            invoiceNumber: string;
            userName: string;
            userEmail: string;
            planName: string;
            amount: number;
            paymentMethod: string | null;
            status: PaymentStatus;
            createdAt: Date;
            paidAt: Date | null;
        }[];
        meta: {
            page: number;
            limit: number;
            totalItems: number;
            totalPages: number;
        };
    }>;
    listAdmins(): Promise<{
        id: string;
        fullName: string;
        email: string;
        status: UserStatus;
        lastLoginAt: Date | null;
    }[]>;
    createAdmin(rawBody: unknown, actor: AuthenticatedUser): Promise<{
        id: string;
        email: string;
        role: "ADMIN";
        status: "inactive";
    }>;
    deactivateAdmin(adminId: string, rawBody: unknown, actor: AuthenticatedUser): Promise<void>;
    createSubscriptionPlan(rawBody: unknown, actor: AuthenticatedUser): Promise<{
        id: string;
    }>;
    updateSubscriptionPlan(planId: string, rawBody: unknown, actor: AuthenticatedUser): Promise<void>;
    getPassingGrade(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        twkMinScore: number;
        tiuMinScore: number;
        tkpMinScore: number;
        totalMinScore: number;
        effectiveFrom: Date;
    }>;
    updatePassingGrade(rawBody: unknown, actor: AuthenticatedUser): Promise<void>;
    getTrialConfig(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        freeTryoutCount: number;
        trialDurationDays: number;
        isActive: boolean;
    }>;
    updateTrialConfig(rawBody: unknown, actor: AuthenticatedUser): Promise<void>;
    getAiRecommendationSettings(): Promise<{
        enabled: boolean;
        fallbackEnabled: boolean;
        providerName: string;
        timeoutSeconds: number;
        weakAreaAccuracyThreshold: number;
        minimumQuestionsPerTopic: number;
        maxWeakAreas: number;
        priorityScoreFormula: string;
        showSummary: boolean;
        showWeakAreas: boolean;
        showNextTryoutStrategy: boolean;
        enableResultPageBanner: boolean;
        errorNotification: boolean;
        retryFailedJob: boolean;
        logLevel: string;
        status: string;
        n8nConnected: boolean;
        lastUpdatedAt: Date | null;
        aiJobsToday: number;
        failedAiJobsToday: number;
        successRateToday: number;
    }>;
    updateAiRecommendationSettings(rawBody: unknown, actor: AuthenticatedUser): Promise<void>;
    manualSubscriptionActivation(rawBody: unknown, actor: AuthenticatedUser): Promise<{
        userSubscriptionId: string;
        status: SubscriptionStatus;
        endDate: Date;
    }>;
    getAuditLogs(rawQuery: unknown): Promise<{
        data: {
            id: string;
            actorUserId: string | null;
            actorName: string | null;
            actorRole: string;
            action: string;
            module: string;
            targetType: string | null;
            targetId: string | null;
            metadata: import("@prisma/client/runtime/client").JsonValue;
            createdAt: Date;
        }[];
        meta: {
            page: number;
            limit: number;
            totalItems: number;
            totalPages: number;
        };
    }>;
    private deriveSubscriptionStatus;
    private createAuditLog;
    private getFrontendUrl;
    private sendSetPasswordLink;
    private toInternalAuthHeaders;
    private generateTemporaryPassword;
}
