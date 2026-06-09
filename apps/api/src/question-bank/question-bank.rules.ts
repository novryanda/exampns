import {
  BadRequestException,
  ConflictException,
} from '@nestjs/common';
import type { QuestionAnswerMode } from '../../generated/prisma/client.js';
import type { QuestionOptionInput } from './question-bank.schemas.js';

const expectedLabels = ['A', 'B', 'C', 'D', 'E'] as const;

const assertUniqueLabels = (options: QuestionOptionInput[]) => {
  const labels = options.map((option) => option.label);
  const uniqueLabels = new Set(labels);

  if (uniqueLabels.size !== options.length) {
    throw new ConflictException('Question options must use unique labels');
  }

  const missingLabels = expectedLabels.filter((label) => !uniqueLabels.has(label));
  if (missingLabels.length > 0) {
    throw new BadRequestException('Question options must include labels A, B, C, D, and E');
  }
};

export const assertQuestionOptionRules = (
  answerMode: QuestionAnswerMode,
  options: QuestionOptionInput[],
) => {
  if (options.length !== 5) {
    throw new BadRequestException('Question must have exactly 5 options');
  }

  assertUniqueLabels(options);

  if (answerMode === 'weighted_options') {
    for (const option of options) {
      if (option.optionWeight === undefined) {
        throw new BadRequestException('Weighted-option questions must include optionWeight for every option');
      }

      if (option.isCorrect === true) {
        throw new BadRequestException('Weighted-option questions must not use isCorrect');
      }
    }

    return;
  }

  const correctOptions = options.filter((option) => option.isCorrect === true);

  if (correctOptions.length !== 1) {
    throw new BadRequestException('Single-correct questions must have exactly one correct option');
  }

  for (const option of options) {
    if (option.optionWeight !== undefined) {
      throw new BadRequestException('Single-correct questions must not include optionWeight');
    }
  }
};

export const normalizeTags = (tags?: string[]) => {
  if (!tags) {
    return undefined;
  }

  return [...new Set(tags.map((tag) => tag.trim()).filter(Boolean))];
};

export const resolveQuestionDisplayTags = (storedTags: string[], topicTagName: string) => {
  const normalized = [...new Set(storedTags.map((tag) => tag.trim()).filter(Boolean))];
  if (normalized.length > 0) {
    return normalized;
  }

  const fallback = topicTagName.trim();
  return fallback ? [fallback] : [];
};

export const resolveQuestionTagsForWrite = (payloadTags: string[] | undefined, topicTagName: string) => {
  const normalized = normalizeTags(payloadTags) ?? [];
  if (normalized.length > 0) {
    return normalized;
  }

  const fallback = topicTagName.trim();
  return fallback ? [fallback] : [];
};
