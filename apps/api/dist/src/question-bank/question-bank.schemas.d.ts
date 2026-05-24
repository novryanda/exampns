import { z } from 'zod';
declare const optionSchema: z.ZodObject<{
    label: z.ZodEnum<{
        A: "A";
        B: "B";
        C: "C";
        D: "D";
        E: "E";
    }>;
    text: z.ZodString;
    isCorrect: z.ZodOptional<z.ZodBoolean>;
    tkpWeight: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const createQuestionSchema: z.ZodObject<{
    questionText: z.ZodString;
    category: z.ZodEnum<{
        readonly TWK: "TWK";
        readonly TIU: "TIU";
        readonly TKP: "TKP";
    }>;
    subCategory: z.ZodString;
    topicTag: z.ZodString;
    competencyArea: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
    difficulty: z.ZodEnum<{
        readonly easy: "easy";
        readonly medium: "medium";
        readonly hard: "hard";
    }>;
    status: z.ZodEnum<{
        readonly draft: "draft";
        readonly pending_review: "pending_review";
        readonly active: "active";
        readonly archived: "archived";
    }>;
    explanation: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
    options: z.ZodArray<z.ZodObject<{
        label: z.ZodEnum<{
            A: "A";
            B: "B";
            C: "C";
            D: "D";
            E: "E";
        }>;
        text: z.ZodString;
        isCorrect: z.ZodOptional<z.ZodBoolean>;
        tkpWeight: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>;
    tags: z.ZodOptional<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export declare const updateQuestionSchema: z.ZodObject<{
    questionText: z.ZodOptional<z.ZodString>;
    category: z.ZodOptional<z.ZodEnum<{
        readonly TWK: "TWK";
        readonly TIU: "TIU";
        readonly TKP: "TKP";
    }>>;
    subCategory: z.ZodOptional<z.ZodString>;
    topicTag: z.ZodOptional<z.ZodString>;
    competencyArea: z.ZodOptional<z.ZodPreprocess<z.ZodOptional<z.ZodString>>>;
    difficulty: z.ZodOptional<z.ZodEnum<{
        readonly easy: "easy";
        readonly medium: "medium";
        readonly hard: "hard";
    }>>;
    status: z.ZodOptional<z.ZodEnum<{
        readonly draft: "draft";
        readonly pending_review: "pending_review";
        readonly active: "active";
        readonly archived: "archived";
    }>>;
    explanation: z.ZodOptional<z.ZodPreprocess<z.ZodOptional<z.ZodString>>>;
    options: z.ZodOptional<z.ZodArray<z.ZodObject<{
        label: z.ZodEnum<{
            A: "A";
            B: "B";
            C: "C";
            D: "D";
            E: "E";
        }>;
        text: z.ZodString;
        isCorrect: z.ZodOptional<z.ZodBoolean>;
        tkpWeight: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>>;
    tags: z.ZodOptional<z.ZodOptional<z.ZodArray<z.ZodString>>>;
}, z.core.$strip>;
export declare const listQuestionsQuerySchema: z.ZodObject<{
    search: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
    category: z.ZodPreprocess<z.ZodOptional<z.ZodEnum<{
        readonly TWK: "TWK";
        readonly TIU: "TIU";
        readonly TKP: "TKP";
    }>>>;
    subCategory: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
    topicTag: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
    difficulty: z.ZodPreprocess<z.ZodOptional<z.ZodEnum<{
        readonly easy: "easy";
        readonly medium: "medium";
        readonly hard: "hard";
    }>>>;
    status: z.ZodPreprocess<z.ZodOptional<z.ZodEnum<{
        readonly draft: "draft";
        readonly pending_review: "pending_review";
        readonly active: "active";
        readonly archived: "archived";
    }>>>;
    sourceType: z.ZodPreprocess<z.ZodOptional<z.ZodEnum<{
        readonly manual: "manual";
        readonly pdf_import: "pdf_import";
    }>>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export type CreateQuestionInput = z.infer<typeof createQuestionSchema>;
export type UpdateQuestionInput = z.infer<typeof updateQuestionSchema>;
export type ListQuestionsQuery = z.infer<typeof listQuestionsQuerySchema>;
export type QuestionOptionInput = z.infer<typeof optionSchema>;
export {};
