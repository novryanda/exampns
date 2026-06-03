import { z } from 'zod';

export const questionCategoryCodeSchema = z
  .string()
  .trim()
  .min(1)
  .max(50)
  .regex(/^[A-Za-z0-9_-]+$/, 'Category code may only contain letters, numbers, underscores, or hyphens');

export const questionAnswerModeSchema = z.enum(['single_correct', 'weighted_options']);

export type QuestionCategoryCode = z.infer<typeof questionCategoryCodeSchema>;
export type QuestionAnswerModeValue = z.infer<typeof questionAnswerModeSchema>;

export const normalizeQuestionCategoryCode = (value: string) =>
  value
    .trim()
    .replace(/\s+/g, '_')
    .toUpperCase();
