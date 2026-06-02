import { QuestionCategory } from '../../generated/prisma/client.js';
import { z } from 'zod';

const emptyToUndefined = (value: unknown) => {
  if (typeof value !== 'string') {
    return value;
  }

  const trimmed = value.trim();
  return trimmed.length === 0 ? undefined : trimmed;
};

export const metadataOptionsQuerySchema = z.object({
  category: z.preprocess(emptyToUndefined, z.nativeEnum(QuestionCategory).optional()),
  subCategoryId: z.preprocess(emptyToUndefined, z.string().optional()),
});

export const metadataSummaryQuerySchema = z.object({
  category: z.preprocess(emptyToUndefined, z.nativeEnum(QuestionCategory).optional()),
});

export const listSubCategoriesQuerySchema = z.object({
  category: z.preprocess(emptyToUndefined, z.nativeEnum(QuestionCategory).optional()),
  search: z.preprocess(emptyToUndefined, z.string().trim().max(100).optional()),
  includeInactive: z.preprocess(
    (value) => (value === 'true' || value === true ? true : value === 'false' || value === false ? false : undefined),
    z.boolean().default(false),
  ),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const createSubCategorySchema = z.object({
  category: z.nativeEnum(QuestionCategory),
  name: z.string().trim().min(1).max(100),
  sortOrder: z.coerce.number().int().min(0).optional(),
});

export const updateSubCategorySchema = z
  .object({
    name: z.string().trim().min(1).max(100).optional(),
    sortOrder: z.coerce.number().int().min(0).optional(),
    isActive: z.boolean().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: 'At least one field must be provided',
  });

export const listTopicTagsQuerySchema = z.object({
  subCategoryId: z.preprocess(emptyToUndefined, z.string().optional()),
  category: z.preprocess(emptyToUndefined, z.nativeEnum(QuestionCategory).optional()),
  search: z.preprocess(emptyToUndefined, z.string().trim().max(100).optional()),
  includeInactive: z.preprocess(
    (value) => (value === 'true' || value === true ? true : value === 'false' || value === false ? false : undefined),
    z.boolean().default(false),
  ),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const listTopicTagQuestionsQuerySchema = z.object({
  search: z.preprocess(emptyToUndefined, z.string().trim().max(255).optional()),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
});

export const createTopicTagSchema = z.object({
  subCategoryId: z.string().min(1),
  name: z.string().trim().min(1).max(150),
  sortOrder: z.coerce.number().int().min(0).optional(),
});

export const updateTopicTagSchema = z
  .object({
    subCategoryId: z.string().min(1).optional(),
    name: z.string().trim().min(1).max(150).optional(),
    sortOrder: z.coerce.number().int().min(0).optional(),
    isActive: z.boolean().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: 'At least one field must be provided',
  });
