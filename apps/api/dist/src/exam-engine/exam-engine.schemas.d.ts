import { z } from 'zod';
export declare const startExamSchema: z.ZodObject<{
    tryoutCatalogId: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
    examConfigId: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const autosaveAnswerSchema: z.ZodObject<{
    selectedLabel: z.ZodOptional<z.ZodNullable<z.ZodEnum<{
        A: "A";
        B: "B";
        C: "C";
        D: "D";
        E: "E";
    }>>>;
    isFlagged: z.ZodOptional<z.ZodBoolean>;
}, z.core.$strip>;
export declare const flagQuestionSchema: z.ZodObject<{
    isFlagged: z.ZodBoolean;
}, z.core.$strip>;
export declare const submitExamSchema: z.ZodObject<{
    submitType: z.ZodDefault<z.ZodEnum<{
        manual: "manual";
        auto: "auto";
    }>>;
}, z.core.$strip>;
export declare const integrityEventSchema: z.ZodObject<{
    eventType: z.ZodEnum<{
        readonly tab_switch: "tab_switch";
        readonly fullscreen_exit: "fullscreen_exit";
        readonly reconnect: "reconnect";
        readonly warning_shown: "warning_shown";
    }>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.core.$strip>;
export declare const listResultAnswersQuerySchema: z.ZodObject<{
    category: z.ZodPreprocess<z.ZodOptional<z.ZodEnum<{
        readonly TWK: "TWK";
        readonly TIU: "TIU";
        readonly TKP: "TKP";
    }>>>;
    correctness: z.ZodPreprocess<z.ZodOptional<z.ZodEnum<{
        correct: "correct";
        wrong: "wrong";
        empty: "empty";
    }>>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export declare const examHistoryQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    status: z.ZodPreprocess<z.ZodOptional<z.ZodEnum<{
        passed: "passed";
        not_passed: "not_passed";
    }>>>;
    dateFrom: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
    dateTo: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
}, z.core.$strip>;
export declare const regenerateAiRecommendationSchema: z.ZodObject<{
    reason: z.ZodPreprocess<z.ZodString>;
}, z.core.$strip>;
