import {
  ImportBatchStatus,
  ParsedQuestionStatus,
  QuestionDifficulty,
  QuestionStatus,
} from '../../generated/prisma/client.js';
import { questionCategoryCodeSchema } from '../common/question-category.js';
import { z } from 'zod';

const emptyToUndefined = (value: unknown) => {
  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();
  return trimmed.length === 0 ? undefined : trimmed;
};

const optionSchema = z.object({
  label: z.enum(['A', 'B', 'C', 'D', 'E']),
  text: z.string().trim().min(1),
  optionWeight: z.number().int().min(1).max(5).nullable().optional(),
});

const parsedQuestionCallbackSchema = z.object({
  questionText: z.string().trim().min(1),
  options: z.array(optionSchema).length(5),
  detectedAnswer: z.enum(['A', 'B', 'C', 'D', 'E']).nullable().optional(),
  categoryCode: questionCategoryCodeSchema.nullable().optional(),
  subCategory: z.preprocess(emptyToUndefined, z.string().trim().max(255).nullable().optional()),
  topicTag: z.preprocess(emptyToUndefined, z.string().trim().max(255).nullable().optional()),
  difficulty: z.nativeEnum(QuestionDifficulty).nullable().optional(),
  confidenceScore: z.number().finite().nullable().optional(),
  rawAiOutput: z.unknown().optional(),
  status: z.nativeEnum(ParsedQuestionStatus).optional(),
});

export const uploadPdfMetadataSchema = z.object({
  categoryHint: z.preprocess(
    emptyToUndefined,
    z.union([questionCategoryCodeSchema, z.literal('auto')]).optional(),
  ),
});

export const listPdfImportBatchesQuerySchema = z.object({
  status: z.preprocess(emptyToUndefined, z.nativeEnum(ImportBatchStatus).optional()),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export const listParsedQuestionsQuerySchema = z.object({
  batchId: z.preprocess(emptyToUndefined, z.string().uuid().optional()),
  status: z.preprocess(emptyToUndefined, z.nativeEnum(ParsedQuestionStatus).optional()),
  category: z.preprocess(emptyToUndefined, questionCategoryCodeSchema.optional()),
  search: z.preprocess(emptyToUndefined, z.string().trim().max(255).optional()),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const updateParsedQuestionSchema = z.object({
  questionText: z.string().trim().min(1),
  options: z.array(optionSchema).length(5),
  detectedAnswer: z.enum(['A', 'B', 'C', 'D', 'E']).nullable().optional(),
  categoryCode: questionCategoryCodeSchema,
  resolvedSubCategoryId: z.preprocess(emptyToUndefined, z.string().trim().min(1).optional()),
  resolvedTopicTagId: z.preprocess(emptyToUndefined, z.string().trim().min(1).optional()),
  difficulty: z.nativeEnum(QuestionDifficulty),
});

export const approveParsedQuestionSchema = z.object({
  status: z.nativeEnum(QuestionStatus).default(QuestionStatus.active),
  reviewNotes: z.string().trim().min(3).max(500),
});

export const bulkApproveParsedQuestionsSchema = z.object({
  parsedQuestionIds: z.array(z.string().uuid()).min(1).max(100),
  status: z.nativeEnum(QuestionStatus).default(QuestionStatus.active),
  reviewNotes: z
    .preprocess(
      emptyToUndefined,
      z.string().trim().min(3).max(500).default('Bulk approve dari antrean parsing.'),
    )
    .default('Bulk approve dari antrean parsing.'),
});

export const rejectParsedQuestionSchema = z.object({
  reviewNotes: z.string().trim().min(3).max(500),
});

export const pdfImportCallbackSchema = z
  .object({
    batchId: z.string().uuid(),
    success: z.boolean().default(true),
    parsedQuestions: z.array(parsedQuestionCallbackSchema).optional(),
    errorMessage: z.preprocess(emptyToUndefined, z.string().trim().max(2000).optional()),
  })
  .superRefine((value, ctx) => {
    if (value.success && !value.parsedQuestions) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['parsedQuestions'],
        message: 'parsedQuestions wajib diisi saat success=true',
      });
    }

    if (!value.success && !value.errorMessage) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['errorMessage'],
        message: 'errorMessage wajib diisi saat success=false',
      });
    }
  });

export type UploadPdfMetadataInput = z.infer<typeof uploadPdfMetadataSchema>;
export type UpdateParsedQuestionInput = z.infer<typeof updateParsedQuestionSchema>;
export type ListParsedQuestionsQuery = z.infer<typeof listParsedQuestionsQuerySchema>;
export type PdfImportCallbackInput = z.infer<typeof pdfImportCallbackSchema>;
export type ApproveParsedQuestionInput = z.infer<typeof approveParsedQuestionSchema>;
export type BulkApproveParsedQuestionsInput = z.infer<typeof bulkApproveParsedQuestionsSchema>;
