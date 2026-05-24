import {
  ImportBatchStatus,
  ParsedQuestionStatus,
  QuestionCategory,
  QuestionDifficulty,
  QuestionStatus,
} from '../../generated/prisma/client.js';
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
});

export const uploadPdfMetadataSchema = z.object({
  categoryHint: z.preprocess(
    emptyToUndefined,
    z.enum(['TWK', 'TIU', 'TKP', 'auto']).optional(),
  ),
});

export const listPdfImportBatchesQuerySchema = z.object({
  status: z.preprocess(emptyToUndefined, z.nativeEnum(ImportBatchStatus).optional()),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(20),
});

export const updateParsedQuestionSchema = z.object({
  questionText: z.string().trim().min(1),
  options: z.array(optionSchema).length(5),
  detectedAnswer: z.enum(['A', 'B', 'C', 'D', 'E']).optional(),
  category: z.nativeEnum(QuestionCategory),
  subCategory: z.string().trim().min(1).max(100),
  topicTag: z.string().trim().min(1).max(150),
  difficulty: z.nativeEnum(QuestionDifficulty),
});

export const approveParsedQuestionSchema = z.object({
  status: z.nativeEnum(QuestionStatus).default(QuestionStatus.active),
  reviewNotes: z.string().trim().min(3).max(500),
});

export const rejectParsedQuestionSchema = z.object({
  reviewNotes: z.string().trim().min(3).max(500),
});

export type UploadPdfMetadataInput = z.infer<typeof uploadPdfMetadataSchema>;
export type UpdateParsedQuestionInput = z.infer<typeof updateParsedQuestionSchema>;
