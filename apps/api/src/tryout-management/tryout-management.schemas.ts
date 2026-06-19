import {
  AccessType,
  ManualQuestionSetStatus,
  QuestionDifficulty,
  QuestionStatus,
  QuestionType,
  QuestionOrderMode,
  RandomizationMode,
  TryoutStatus,
  TryoutType,
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

const jsonLiteralSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
type JsonValue = z.infer<typeof jsonLiteralSchema> | { [key: string]: JsonValue } | JsonValue[];
const jsonSchema: z.ZodType<JsonValue> = z.lazy(() =>
  z.union([jsonLiteralSchema, z.array(jsonSchema), z.record(z.string(), jsonSchema)]),
);

const difficultyDistributionSchema = z
  .record(z.enum([QuestionDifficulty.easy, QuestionDifficulty.medium, QuestionDifficulty.hard]), z.number().int().min(0))
  .optional();

const topicDistributionItemSchema = z.object({
  topicTag: z.string().trim().min(1).max(150),
  questionCount: z.number().int().min(1),
});

const tryoutRuleSectionSchema = z.object({
  categoryCode: questionCategoryCodeSchema,
  questionCount: z.number().int().min(1),
  difficultyDistribution: difficultyDistributionSchema,
  topicDistribution: z.array(topicDistributionItemSchema).optional(),
  sortOrder: z.number().int().min(0).optional(),
});

export const listTryoutCatalogsQuerySchema = z.object({
  search: z.preprocess(emptyToUndefined, z.string().trim().optional()),
  tryoutType: z.preprocess(emptyToUndefined, z.nativeEnum(TryoutType).optional()),
  accessType: z.preprocess(emptyToUndefined, z.nativeEnum(AccessType).optional()),
  requiredSubscriptionPlanId: z.preprocess(emptyToUndefined, z.string().uuid().optional()),
  status: z.preprocess(emptyToUndefined, z.nativeEnum(TryoutStatus).optional()),
  isPublic: z.preprocess(
    (value) => (value === 'true' ? true : value === 'false' ? false : value),
    z.boolean().optional(),
  ),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const createTryoutCatalogSchema = z.object({
  name: z.string().trim().min(1).max(150),
  description: z.preprocess(emptyToUndefined, z.string().trim().optional()),
  tryoutType: z.nativeEnum(TryoutType),
  status: z.nativeEnum(TryoutStatus),
  requiredSubscriptionPlanId: z.preprocess(emptyToUndefined, z.string().uuid().optional()),
  isPublic: z.boolean().default(false),
  isFeatured: z.boolean().default(false),
  sortOrder: z.number().int().min(0).default(0),
  durationMinutes: z.number().int().min(1),
  totalQuestions: z.number().int().min(1),
  passingGradeConfigId: z.preprocess(emptyToUndefined, z.string().uuid().optional()),
  showResultImmediately: z.boolean().default(true),
  showAnswerReview: z.boolean().default(true),
});

export const updateTryoutCatalogSchema = createTryoutCatalogSchema
  .partial()
  .refine((value) => Object.keys(value).length > 0, {
    message: 'At least one field must be provided',
  });

export const generationRuleSchema = z.object({
  randomizationMode: z.nativeEnum(RandomizationMode),
  questionOrderMode: z.nativeEnum(QuestionOrderMode),
  avoidRecentQuestions: z.boolean().default(false),
  avoidRecentExamCount: z.number().int().min(0).default(0),
  rulesJson: jsonSchema.optional(),
  sections: z.array(tryoutRuleSectionSchema).min(1),
});

export const manualQuestionSetSchema = z.object({
  name: z.string().trim().min(1).max(150),
  description: z.preprocess(emptyToUndefined, z.string().trim().optional()),
  status: z.nativeEnum(ManualQuestionSetStatus),
  questionIds: z.array(z.string().uuid()).min(1),
});

export const updateManualQuestionSetSchema = manualQuestionSetSchema
  .partial()
  .extend({
    questionIds: z.array(z.string().uuid()).min(1).optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: 'At least one field must be provided',
  });

export type ListTryoutCatalogsQuery = z.infer<typeof listTryoutCatalogsQuerySchema>;
export type CreateTryoutCatalogInput = z.infer<typeof createTryoutCatalogSchema>;
export type UpdateTryoutCatalogInput = z.infer<typeof updateTryoutCatalogSchema>;
export type GenerationRuleInput = z.infer<typeof generationRuleSchema>;
export type ManualQuestionSetInput = z.infer<typeof manualQuestionSetSchema>;
export type UpdateManualQuestionSetInput = z.infer<typeof updateManualQuestionSetSchema>;
