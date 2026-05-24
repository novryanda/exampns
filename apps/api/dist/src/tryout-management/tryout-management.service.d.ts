import { ManualQuestionSetStatus, QuestionStatus, RandomizationMode, TryoutStatus, TryoutType } from '../../generated/prisma/client.js';
import type { AuthenticatedUser } from '../auth/auth.types.js';
import { PrismaService } from '../common/prisma.service.js';
import { ValidationService } from '../common/validation.service.js';
export declare class TryoutManagementService {
    private readonly prisma;
    private readonly validationService;
    constructor(prisma: PrismaService, validationService: ValidationService);
    listTryoutCatalogs(rawQuery: unknown): Promise<{
        data: {
            id: string;
            status: TryoutStatus;
            updatedAt: Date;
            name: string;
            isPublic: boolean;
            totalQuestions: number;
            tryoutType: TryoutType;
            accessType: import("../../generated/prisma/enums.js").AccessType;
            isFeatured: boolean;
            durationMinutes: number;
        }[];
        meta: {
            page: number;
            limit: number;
            totalItems: number;
            totalPages: number;
        };
    }>;
    createTryoutCatalog(rawBody: unknown, actor: AuthenticatedUser): Promise<{
        id: string;
        status: TryoutStatus;
    }>;
    getTryoutCatalogDetail(tryoutCatalogId: string): Promise<{
        manualQuestionSets: {
            id: string;
            name: string;
            status: ManualQuestionSetStatus;
            itemCount: number;
            updatedAt: Date;
        }[];
        id: string;
        status: TryoutStatus;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isPublic: boolean;
        totalQuestions: number;
        passingGradeConfigId: string | null;
        tryoutType: TryoutType;
        accessType: import("../../generated/prisma/enums.js").AccessType;
        isFeatured: boolean;
        sortOrder: number;
        durationMinutes: number;
        showResultImmediately: boolean;
        showAnswerReview: boolean;
        approvedBy: string | null;
        publishedAt: Date | null;
        archivedAt: Date | null;
        generationRule: {
            id: string;
            randomizationMode: RandomizationMode;
            questionOrderMode: import("../../generated/prisma/enums.js").QuestionOrderMode;
            avoidRecentQuestions: boolean;
            avoidRecentExamCount: number;
            rulesJson: import("@prisma/client/runtime/client").JsonValue;
            sections: {
                id: string;
                category: import("../../generated/prisma/enums.js").QuestionCategory;
                sortOrder: number;
                questionCount: number;
                difficultyDistributionJson: import("@prisma/client/runtime/client").JsonValue;
                topicDistributionJson: import("@prisma/client/runtime/client").JsonValue;
            }[];
        } | null;
    }>;
    updateTryoutCatalog(tryoutCatalogId: string, rawBody: unknown): Promise<void>;
    duplicateTryoutCatalog(tryoutCatalogId: string, actor: AuthenticatedUser): Promise<{
        id: string;
        status: TryoutStatus;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        isPublic: boolean;
        totalQuestions: number;
        passingGradeConfigId: string | null;
        tryoutType: TryoutType;
        accessType: import("../../generated/prisma/enums.js").AccessType;
        isFeatured: boolean;
        sortOrder: number;
        durationMinutes: number;
        showResultImmediately: boolean;
        showAnswerReview: boolean;
        createdBy: string;
        approvedBy: string | null;
        publishedAt: Date | null;
        archivedAt: Date | null;
    }>;
    publishTryoutCatalog(tryoutCatalogId: string, actor: AuthenticatedUser): Promise<void>;
    archiveTryoutCatalog(tryoutCatalogId: string): Promise<void>;
    getGenerationRule(tryoutCatalogId: string): Promise<{
        sections: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            category: import("../../generated/prisma/enums.js").QuestionCategory;
            sortOrder: number;
            tryoutGenerationRuleId: string;
            questionCount: number;
            difficultyDistributionJson: import("@prisma/client/runtime/client").JsonValue | null;
            topicDistributionJson: import("@prisma/client/runtime/client").JsonValue | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tryoutCatalogId: string;
        randomizationMode: RandomizationMode;
        questionOrderMode: import("../../generated/prisma/enums.js").QuestionOrderMode;
        avoidRecentQuestions: boolean;
        avoidRecentExamCount: number;
        rulesJson: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    upsertGenerationRule(tryoutCatalogId: string, rawBody: unknown): Promise<{
        sections: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            category: import("../../generated/prisma/enums.js").QuestionCategory;
            sortOrder: number;
            tryoutGenerationRuleId: string;
            questionCount: number;
            difficultyDistributionJson: import("@prisma/client/runtime/client").JsonValue | null;
            topicDistributionJson: import("@prisma/client/runtime/client").JsonValue | null;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        tryoutCatalogId: string;
        randomizationMode: RandomizationMode;
        questionOrderMode: import("../../generated/prisma/enums.js").QuestionOrderMode;
        avoidRecentQuestions: boolean;
        avoidRecentExamCount: number;
        rulesJson: import("@prisma/client/runtime/client").JsonValue | null;
    }>;
    listManualQuestionSets(tryoutCatalogId: string): Promise<{
        id: string;
        status: ManualQuestionSetStatus;
        updatedAt: Date;
        _count: {
            items: number;
        };
        name: string;
    }[]>;
    createManualQuestionSet(tryoutCatalogId: string, rawBody: unknown, actor: AuthenticatedUser): Promise<{
        id: string;
        status: ManualQuestionSetStatus;
    }>;
    getManualQuestionSet(tryoutCatalogId: string, manualQuestionSetId: string): Promise<{
        questionIds: string[];
        items: {
            order: number;
            question: {
                id: string;
                questionPreview: string;
                category: import("../../generated/prisma/enums.js").QuestionCategory;
                subCategory: string;
                topicTag: string;
                difficulty: import("../../generated/prisma/enums.js").QuestionDifficulty;
                status: QuestionStatus;
            };
        }[];
        id: string;
        status: ManualQuestionSetStatus;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        description: string | null;
        tryoutCatalogId: string;
    }>;
    updateManualQuestionSet(tryoutCatalogId: string, manualQuestionSetId: string, rawBody: unknown, actor: AuthenticatedUser): Promise<void>;
    archiveManualQuestionSet(tryoutCatalogId: string, manualQuestionSetId: string): Promise<void>;
    runAvailabilityCheck(tryoutCatalogId: string): Promise<{
        isReady: boolean;
        issues: string[];
        checks: Record<string, unknown>;
    }>;
    private ensureTryoutCatalogExists;
    private ensurePassingGradeExists;
    private assertQuestionsReadyForManualSet;
    private toNullableJsonValue;
}
