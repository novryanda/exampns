import { z } from 'zod';
export declare const uploadPdfMetadataSchema: z.ZodObject<{
    categoryHint: z.ZodPreprocess<z.ZodOptional<z.ZodEnum<{
        TWK: "TWK";
        TIU: "TIU";
        TKP: "TKP";
        auto: "auto";
    }>>>;
}, z.core.$strip>;
export declare const listPdfImportBatchesQuerySchema: z.ZodObject<{
    status: z.ZodPreprocess<z.ZodOptional<z.ZodEnum<{
        readonly processing: "processing";
        readonly completed: "completed";
        readonly partial_failed: "partial_failed";
        readonly failed: "failed";
    }>>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export declare const listParsedQuestionsQuerySchema: z.ZodObject<{
    batchId: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
    status: z.ZodPreprocess<z.ZodOptional<z.ZodEnum<{
        readonly pending_review: "pending_review";
        readonly approved: "approved";
        readonly rejected: "rejected";
        readonly draft: "draft";
    }>>>;
    category: z.ZodPreprocess<z.ZodOptional<z.ZodEnum<{
        readonly TWK: "TWK";
        readonly TIU: "TIU";
        readonly TKP: "TKP";
    }>>>;
    search: z.ZodPreprocess<z.ZodOptional<z.ZodString>>;
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export declare const updateParsedQuestionSchema: z.ZodObject<{
    questionText: z.ZodString;
    options: z.ZodArray<z.ZodObject<{
        label: z.ZodEnum<{
            A: "A";
            B: "B";
            C: "C";
            D: "D";
            E: "E";
        }>;
        text: z.ZodString;
    }, z.core.$strip>>;
    detectedAnswer: z.ZodOptional<z.ZodEnum<{
        A: "A";
        B: "B";
        C: "C";
        D: "D";
        E: "E";
    }>>;
    category: z.ZodEnum<{
        readonly TWK: "TWK";
        readonly TIU: "TIU";
        readonly TKP: "TKP";
    }>;
    subCategory: z.ZodString;
    topicTag: z.ZodString;
    difficulty: z.ZodEnum<{
        readonly easy: "easy";
        readonly medium: "medium";
        readonly hard: "hard";
    }>;
}, z.core.$strip>;
export declare const approveParsedQuestionSchema: z.ZodObject<{
    status: z.ZodDefault<z.ZodEnum<{
        readonly draft: "draft";
        readonly pending_review: "pending_review";
        readonly active: "active";
        readonly archived: "archived";
    }>>;
    reviewNotes: z.ZodString;
}, z.core.$strip>;
export declare const rejectParsedQuestionSchema: z.ZodObject<{
    reviewNotes: z.ZodString;
}, z.core.$strip>;
export type UploadPdfMetadataInput = z.infer<typeof uploadPdfMetadataSchema>;
export type UpdateParsedQuestionInput = z.infer<typeof updateParsedQuestionSchema>;
export type ListParsedQuestionsQuery = z.infer<typeof listParsedQuestionsQuerySchema>;
