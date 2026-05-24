import { z } from 'zod';
declare const jsonLiteralSchema: z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>;
type JsonValue = z.infer<typeof jsonLiteralSchema> | {
    [key: string]: JsonValue;
} | JsonValue[];
export declare const listTryoutCatalogsQuerySchema: z.ZodObject<{
    search: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
    tryoutType: z.ZodPreprocess<z.ZodOptional<z.ZodEnum<{
        readonly generated: "generated";
        readonly manual: "manual";
        readonly hybrid: "hybrid";
        readonly adaptive: "adaptive";
    }>>>;
    accessType: z.ZodPreprocess<z.ZodOptional<z.ZodEnum<{
        readonly trial_only: "trial_only";
        readonly paid_only: "paid_only";
        readonly trial_and_paid: "trial_and_paid";
        readonly premium_only: "premium_only";
    }>>>;
    status: z.ZodPreprocess<z.ZodOptional<z.ZodEnum<{
        readonly draft: "draft";
        readonly review: "review";
        readonly published: "published";
        readonly archived: "archived";
    }>>>;
    isPublic: z.ZodPreprocess<z.ZodOptional<z.ZodBoolean>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export declare const createTryoutCatalogSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
    tryoutType: z.ZodEnum<{
        readonly generated: "generated";
        readonly manual: "manual";
        readonly hybrid: "hybrid";
        readonly adaptive: "adaptive";
    }>;
    accessType: z.ZodEnum<{
        readonly trial_only: "trial_only";
        readonly paid_only: "paid_only";
        readonly trial_and_paid: "trial_and_paid";
        readonly premium_only: "premium_only";
    }>;
    status: z.ZodEnum<{
        readonly draft: "draft";
        readonly review: "review";
        readonly published: "published";
        readonly archived: "archived";
    }>;
    isPublic: z.ZodDefault<z.ZodBoolean>;
    isFeatured: z.ZodDefault<z.ZodBoolean>;
    sortOrder: z.ZodDefault<z.ZodNumber>;
    durationMinutes: z.ZodNumber;
    totalQuestions: z.ZodNumber;
    passingGradeConfigId: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
    showResultImmediately: z.ZodDefault<z.ZodBoolean>;
    showAnswerReview: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export declare const updateTryoutCatalogSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodPreprocess<z.ZodOptional<z.ZodString>>>;
    tryoutType: z.ZodOptional<z.ZodEnum<{
        readonly generated: "generated";
        readonly manual: "manual";
        readonly hybrid: "hybrid";
        readonly adaptive: "adaptive";
    }>>;
    accessType: z.ZodOptional<z.ZodEnum<{
        readonly trial_only: "trial_only";
        readonly paid_only: "paid_only";
        readonly trial_and_paid: "trial_and_paid";
        readonly premium_only: "premium_only";
    }>>;
    status: z.ZodOptional<z.ZodEnum<{
        readonly draft: "draft";
        readonly review: "review";
        readonly published: "published";
        readonly archived: "archived";
    }>>;
    isPublic: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    isFeatured: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    sortOrder: z.ZodOptional<z.ZodDefault<z.ZodNumber>>;
    durationMinutes: z.ZodOptional<z.ZodNumber>;
    totalQuestions: z.ZodOptional<z.ZodNumber>;
    passingGradeConfigId: z.ZodOptional<z.ZodPreprocess<z.ZodOptional<z.ZodString>>>;
    showResultImmediately: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    showAnswerReview: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
}, z.core.$strip>;
export declare const generationRuleSchema: z.ZodObject<{
    randomizationMode: z.ZodEnum<{
        readonly random_by_category: "random_by_category";
        readonly random_by_category_and_difficulty: "random_by_category_and_difficulty";
        readonly random_by_topic_distribution: "random_by_topic_distribution";
        readonly manual_question_set: "manual_question_set";
        readonly hybrid_manual_and_random: "hybrid_manual_and_random";
        readonly adaptive_weak_area: "adaptive_weak_area";
    }>;
    questionOrderMode: z.ZodEnum<{
        readonly category_order: "category_order";
        readonly mixed_random: "mixed_random";
        readonly manual_order: "manual_order";
    }>;
    avoidRecentQuestions: z.ZodDefault<z.ZodBoolean>;
    avoidRecentExamCount: z.ZodDefault<z.ZodNumber>;
    rulesJson: z.ZodOptional<z.ZodType<JsonValue, unknown, z.core.$ZodTypeInternals<JsonValue, unknown>>>;
    sections: z.ZodArray<z.ZodObject<{
        category: z.ZodEnum<{
            readonly TWK: "TWK";
            readonly TIU: "TIU";
            readonly TKP: "TKP";
        }>;
        questionCount: z.ZodNumber;
        difficultyDistribution: z.ZodOptional<z.ZodRecord<z.ZodEnum<{
            easy: "easy";
            medium: "medium";
            hard: "hard";
        }>, z.ZodNumber>>;
        topicDistribution: z.ZodOptional<z.ZodArray<z.ZodObject<{
            topicTag: z.ZodString;
            questionCount: z.ZodNumber;
        }, z.core.$strip>>>;
        sortOrder: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const manualQuestionSetSchema: z.ZodObject<{
    name: z.ZodString;
    description: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
    status: z.ZodEnum<{
        readonly draft: "draft";
        readonly review: "review";
        readonly approved: "approved";
        readonly archived: "archived";
    }>;
    questionIds: z.ZodArray<z.ZodString>;
}, z.core.$strip>;
export declare const updateManualQuestionSetSchema: z.ZodObject<{
    name: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodPreprocess<z.ZodOptional<z.ZodString>>>;
    status: z.ZodOptional<z.ZodEnum<{
        readonly draft: "draft";
        readonly review: "review";
        readonly approved: "approved";
        readonly archived: "archived";
    }>>;
    questionIds: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export type ListTryoutCatalogsQuery = z.infer<typeof listTryoutCatalogsQuerySchema>;
export type CreateTryoutCatalogInput = z.infer<typeof createTryoutCatalogSchema>;
export type UpdateTryoutCatalogInput = z.infer<typeof updateTryoutCatalogSchema>;
export type GenerationRuleInput = z.infer<typeof generationRuleSchema>;
export type ManualQuestionSetInput = z.infer<typeof manualQuestionSetSchema>;
export type UpdateManualQuestionSetInput = z.infer<typeof updateManualQuestionSetSchema>;
export {};
