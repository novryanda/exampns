import { ExamIntegrityEventType } from '../../generated/prisma/client.js';
import { questionCategoryCodeSchema } from '../common/question-category.js';
import { z } from 'zod';

const emptyToUndefined = (value: unknown) => {
  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();
  return trimmed.length === 0 ? undefined : trimmed;
};

export const startExamSchema = z
  .object({
    tryoutCatalogId: z.preprocess(emptyToUndefined, z.string().uuid().optional()),
    examConfigId: z.preprocess(emptyToUndefined, z.string().uuid().optional()),
  })
  .refine((value) => Boolean(value.tryoutCatalogId || value.examConfigId), {
    message: 'tryoutCatalogId is required',
  });

export const autosaveAnswerSchema = z.object({
  selectedLabel: z.enum(['A', 'B', 'C', 'D', 'E']).nullable().optional(),
  isFlagged: z.boolean().optional(),
});

export const flagQuestionSchema = z.object({
  isFlagged: z.boolean(),
});

export const submitExamSchema = z.object({
  submitType: z.enum(['manual', 'auto']).default('manual'),
});

export const integrityEventSchema = z.object({
  eventType: z.nativeEnum(ExamIntegrityEventType),
  metadata: z.record(z.string(), z.unknown()).optional(),
});

export const listResultAnswersQuerySchema = z.object({
  category: z.preprocess(emptyToUndefined, questionCategoryCodeSchema.optional()),
  correctness: z.preprocess(
    emptyToUndefined,
    z.enum(['correct', 'wrong', 'empty']).optional(),
  ),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const examHistoryQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  status: z.preprocess(emptyToUndefined, z.enum(['passed', 'not_passed']).optional()),
  dateFrom: z.preprocess(emptyToUndefined, z.string().datetime().optional()),
  dateTo: z.preprocess(emptyToUndefined, z.string().datetime().optional()),
});

export const regenerateAiRecommendationSchema = z.object({
  reason: z.preprocess(emptyToUndefined, z.string().min(3).max(255)),
});
