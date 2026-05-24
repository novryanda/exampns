import { AccessType, AIRecommendationStatus, Prisma, PriorityLevel, QuestionCategory, QuestionDifficulty, RandomizationMode, ReasonCode, TrendType, TryoutType, UserRole } from '../../generated/prisma/client.js';
export interface QuestionSnapshotOption {
    label: string;
    text: string;
    isCorrect?: boolean;
    tkpWeight?: number | null;
}
export interface QuestionSnapshotPayload {
    id: string;
    questionText: string;
    category: QuestionCategory;
    subCategory: string;
    topicTag: string;
    competencyArea?: string | null;
    difficulty: QuestionDifficulty;
    explanation?: string | null;
}
export interface BreakdownItem {
    category: QuestionCategory;
    subCategory: string;
    topicTag: string;
    difficulty: QuestionDifficulty;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    emptyAnswers: number;
    accuracy: number;
    wrongAnswerRate: number;
    dominantDifficulty: QuestionDifficulty;
    scoreImpact: number;
    totalAwardedScore: number;
    totalPossibleScore: number;
}
export interface BreakdownRow {
    category: QuestionCategory;
    subCategory: string;
    topicTag: string;
    difficulty: QuestionDifficulty;
    isCorrect: boolean | null;
    selectedLabel: string | null;
    scoreAwarded: number;
    maxScore: number;
}
export interface WeakAreaItem extends BreakdownItem {
    priorityOrder: number;
    priorityLevel: PriorityLevel;
    priorityScore: number;
    reasonCode: ReasonCode;
    reasonCodes: ReasonCode[];
    trend: TrendType;
}
export interface RecommendationNarrative {
    summary: string;
    overallAssessment: string;
    nextTryoutStrategy: string;
}
export interface RecommendationPayload {
    examResultId: string;
    score: {
        twk: number;
        tiu: number;
        tkp: number;
        total: number;
    };
    passingStatus: {
        twkPassed: boolean;
        tiuPassed: boolean;
        tkpPassed: boolean;
        totalPassed: boolean;
        overallPassed: boolean;
    };
    weakAreas: Array<{
        priority: number;
        priorityLevel: PriorityLevel;
        priorityScore: number;
        category: QuestionCategory;
        subCategory: string;
        topicTag: string;
        difficulty: QuestionDifficulty;
        totalQuestions: number;
        correctAnswers: number;
        wrongAnswers: number;
        emptyAnswers: number;
        accuracy: number;
        wrongAnswerRate: number;
        dominantDifficulty: QuestionDifficulty;
        scoreImpact: number;
        reasonCodes: ReasonCode[];
        trend: TrendType;
    }>;
    breakdown: BreakdownItem[];
    instruction: {
        language: 'id';
        outputFormat: 'json';
        maxRecommendations: number;
        doNotInventTopics: true;
        doNotActAsChatbot: true;
        doNotGuaranteePassing: true;
    };
}
export interface RecommendationItemNarrativeInput {
    category?: string;
    subCategory?: string;
    topicTag?: string;
    reason?: string;
    suggestedFocus?: string[] | string | null;
}
export interface AIResponseShape {
    summary?: unknown;
    overallAssessment?: unknown;
    recommendations?: unknown;
    nextTryoutStrategy?: unknown;
}
export interface PublicAiRecommendationItem {
    priorityOrder: number;
    priorityLevel: PriorityLevel;
    priorityScore: number;
    category: QuestionCategory;
    subCategory: string;
    topicTag: string;
    reasonCode: ReasonCode;
    reasonCodes: unknown;
    trend: TrendType;
    reason: string;
    suggestedFocus: unknown;
    accuracy: number | null;
    wrongAnswerRate: number | null;
    totalQuestions: number | null;
    correctAnswers: number | null;
    wrongAnswers: number | null;
    emptyAnswers: number | null;
    dominantDifficulty?: QuestionDifficulty;
    scoreImpact?: number;
}
export declare const shuffle: <T>(items: T[]) => T[];
export declare const sanitizeQuestionOptionsForActiveExam: (options: QuestionSnapshotOption[]) => {
    label: string;
    text: string;
}[];
export declare const resolveTryoutCatalogId: (payload: {
    tryoutCatalogId?: string;
    examConfigId?: string;
}) => string;
export declare const ensureUserCanAccessTryout: (accessType: AccessType, subscription: {
    isTrial: boolean;
} | null) => boolean;
export declare const computeAccuracy: (correctAnswers: number, totalQuestions: number) => number;
export declare const buildBreakdown: (rows: BreakdownRow[]) => BreakdownItem[];
export declare const isPrivilegedRole: (role?: UserRole) => role is "SUPER_ADMIN" | "ADMIN";
export declare const priorityLevelFromScore: (score: number) => "HIGH" | "MEDIUM" | "LOW";
export declare const buildWeakAreaItems: (breakdown: BreakdownItem[], categoryPassing: Record<QuestionCategory, boolean>, historyBreakdowns?: BreakdownItem[][]) => {
    priorityOrder: number;
    priorityLevel: "HIGH" | "MEDIUM" | "LOW";
    priorityScore: number;
    trend: "improving" | "declining" | "stagnant" | "new_weak_area" | "no_history";
    reasonCodes: ReasonCode[];
    reasonCode: ReasonCode;
    category: QuestionCategory;
    subCategory: string;
    topicTag: string;
    difficulty: QuestionDifficulty;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    emptyAnswers: number;
    accuracy: number;
    wrongAnswerRate: number;
    dominantDifficulty: QuestionDifficulty;
    scoreImpact: number;
    totalAwardedScore: number;
    totalPossibleScore: number;
}[];
export declare const buildFallbackRecommendationItems: (weakAreas: WeakAreaItem[]) => {
    priorityOrder: number;
    priorityLevel: PriorityLevel;
    priorityScore: import("@prisma/client-runtime-utils").Decimal;
    category: QuestionCategory;
    subCategory: string;
    topicTag: string;
    reasonCode: ReasonCode;
    reasonCodes: ReasonCode[];
    trend: TrendType;
    reason: string;
    suggestedFocus: string[];
    accuracy: import("@prisma/client-runtime-utils").Decimal;
    wrongAnswerRate: import("@prisma/client-runtime-utils").Decimal;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    emptyAnswers: number;
    dominantDifficulty: QuestionDifficulty;
    scoreImpact: number;
}[];
export declare const buildRecommendationNarrative: (weakAreas: WeakAreaItem[], overallPassed: boolean) => RecommendationNarrative;
export declare const buildRecommendationPayload: (params: {
    examResultId: string;
    score: RecommendationPayload["score"];
    passingStatus: RecommendationPayload["passingStatus"];
    breakdown: BreakdownItem[];
    weakAreas: WeakAreaItem[];
}) => RecommendationPayload;
export declare const normalizeAiResponse: (value: unknown) => {
    summary: string;
    overallAssessment: string;
    nextTryoutStrategy: string;
    recommendations: RecommendationItemNarrativeInput[];
} | null;
export declare const mergeRecommendationNarratives: (weakAreas: WeakAreaItem[], recommendations: RecommendationItemNarrativeInput[]) => {
    reason: string;
    suggestedFocus: string[];
    priorityOrder: number;
    priorityLevel: PriorityLevel;
    priorityScore: import("@prisma/client-runtime-utils").Decimal;
    category: QuestionCategory;
    subCategory: string;
    topicTag: string;
    reasonCode: ReasonCode;
    reasonCodes: ReasonCode[];
    trend: TrendType;
    accuracy: import("@prisma/client-runtime-utils").Decimal;
    wrongAnswerRate: import("@prisma/client-runtime-utils").Decimal;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    emptyAnswers: number;
    dominantDifficulty: QuestionDifficulty;
    scoreImpact: number;
}[];
export declare const buildFallbackRecommendationRecord: (params: {
    weakAreas: WeakAreaItem[];
    overallPassed: boolean;
    rawRequestPayload: RecommendationPayload;
    errorMessage?: string | null;
    rawAiResponse?: unknown;
}) => {
    status: "fallback";
    isFallback: boolean;
    summary: string;
    overallAssessment: string;
    nextTryoutStrategy: string;
    rawRequestPayload: import("@prisma/client/runtime/client").InputJsonValue;
    rawAiResponse: import("@prisma/client-runtime-utils").JsonNullClass | import("@prisma/client/runtime/client").InputJsonValue | undefined;
    errorMessage: string | null;
    generatedAt: Date;
    items: {
        priorityOrder: number;
        priorityLevel: PriorityLevel;
        priorityScore: import("@prisma/client-runtime-utils").Decimal;
        category: QuestionCategory;
        subCategory: string;
        topicTag: string;
        reasonCode: ReasonCode;
        reasonCodes: ReasonCode[];
        trend: TrendType;
        reason: string;
        suggestedFocus: string[];
        accuracy: import("@prisma/client-runtime-utils").Decimal;
        wrongAnswerRate: import("@prisma/client-runtime-utils").Decimal;
        totalQuestions: number;
        correctAnswers: number;
        wrongAnswers: number;
        emptyAnswers: number;
        dominantDifficulty: QuestionDifficulty;
        scoreImpact: number;
    }[];
};
export declare const formatResultBreakdownForResponse: (breakdown: Array<{
    category: QuestionCategory;
    subCategory: string;
    topicTag: string;
    difficulty: QuestionDifficulty;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    accuracy: number;
}>) => {
    category: QuestionCategory;
    subCategory: string;
    topicTag: string;
    difficulty: QuestionDifficulty;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    accuracy: number;
}[];
export declare const formatAiRecommendationItemForResponse: (item: {
    priorityOrder: number;
    priorityLevel: PriorityLevel;
    priorityScore: Prisma.Decimal;
    category: QuestionCategory;
    subCategory: string;
    topicTag: string;
    reasonCode: ReasonCode;
    reasonCodes: Prisma.JsonValue;
    trend: TrendType;
    reason: string;
    suggestedFocus: Prisma.JsonValue;
    accuracy: Prisma.Decimal | null;
    wrongAnswerRate: Prisma.Decimal | null;
    totalQuestions: number | null;
    correctAnswers: number | null;
    wrongAnswers: number | null;
    emptyAnswers: number | null;
    dominantDifficulty: QuestionDifficulty | null;
    scoreImpact: number | null;
}) => PublicAiRecommendationItem;
export declare const formatAiRecommendationForResponse: (recommendation: {
    id: string;
    status: AIRecommendationStatus;
    isFallback: boolean;
    summary: string | null;
    overallAssessment: string | null;
    nextTryoutStrategy: string | null;
    generatedAt: Date | null;
    items: Array<{
        priorityOrder: number;
        priorityLevel: PriorityLevel;
        priorityScore: Prisma.Decimal;
        category: QuestionCategory;
        subCategory: string;
        topicTag: string;
        reasonCode: ReasonCode;
        reasonCodes: Prisma.JsonValue;
        trend: TrendType;
        reason: string;
        suggestedFocus: Prisma.JsonValue;
        accuracy: Prisma.Decimal | null;
        wrongAnswerRate: Prisma.Decimal | null;
        totalQuestions: number | null;
        correctAnswers: number | null;
        wrongAnswers: number | null;
        emptyAnswers: number | null;
        dominantDifficulty: QuestionDifficulty | null;
        scoreImpact: number | null;
    }>;
}) => {
    id: string;
    status: AIRecommendationStatus;
    isFallback: boolean;
    summary: string | null;
    overallAssessment: string | null;
    nextTryoutStrategy: string | null;
    items: PublicAiRecommendationItem[];
    generatedAt: Date | null;
};
export declare const processingAiRecommendationResponse: () => {
    status: "processing";
};
export declare const tryoutUsesManualSet: (tryoutType: TryoutType, randomizationMode: RandomizationMode) => boolean;
export declare const toInputJson: (value: unknown) => Prisma.InputJsonValue;
export declare const toNullableInputJson: (value: unknown) => import("@prisma/client-runtime-utils").JsonNullClass | import("@prisma/client/runtime/client").InputJsonValue | undefined;
