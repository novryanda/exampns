import { QuestionCategory, QuestionDifficulty, QuestionStatus, SourceType, } from '../../generated/prisma/client.js';
import { z } from 'zod';
const labels = ['A', 'B', 'C', 'D', 'E'];
const emptyToUndefined = (value) => {
    if (typeof value !== 'string') {
        return value;
    }
    const trimmed = value.trim();
    return trimmed.length === 0 ? undefined : trimmed;
};
const optionSchema = z.object({
    label: z.enum(labels),
    text: z.string().trim().min(1),
    isCorrect: z.boolean().optional(),
    tkpWeight: z.number().int().min(1).max(5).optional(),
});
export const createQuestionSchema = z.object({
    questionText: z.string().trim().min(1),
    category: z.nativeEnum(QuestionCategory),
    subCategoryId: z.string().trim().min(1),
    topicTagId: z.string().trim().min(1),
    competencyArea: z.preprocess(emptyToUndefined, z.string().trim().max(150).optional()),
    difficulty: z.nativeEnum(QuestionDifficulty),
    status: z.nativeEnum(QuestionStatus),
    explanation: z.preprocess(emptyToUndefined, z.string().trim().optional()),
    options: z.array(optionSchema).length(5),
    tags: z.array(z.string().trim().min(1).max(100)).max(20).optional(),
});
export const updateQuestionSchema = createQuestionSchema
    .partial()
    .refine((value) => Object.keys(value).length > 0, {
    message: 'At least one field must be provided',
});
export const listQuestionsQuerySchema = z.object({
    search: z.preprocess(emptyToUndefined, z.string().trim().optional()),
    category: z.preprocess(emptyToUndefined, z.nativeEnum(QuestionCategory).optional()),
    subCategory: z.preprocess(emptyToUndefined, z.string().trim().max(100).optional()),
    topicTag: z.preprocess(emptyToUndefined, z.string().trim().max(150).optional()),
    difficulty: z.preprocess(emptyToUndefined, z.nativeEnum(QuestionDifficulty).optional()),
    status: z.preprocess(emptyToUndefined, z.nativeEnum(QuestionStatus).optional()),
    sourceType: z.preprocess(emptyToUndefined, z.nativeEnum(SourceType).optional()),
    page: z.coerce.number().int().min(1).default(1),
    limit: z.coerce.number().int().min(1).max(100).default(20),
});
//# sourceMappingURL=question-bank.schemas.js.map