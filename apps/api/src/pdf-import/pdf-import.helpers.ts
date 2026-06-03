import { BadRequestException } from '@nestjs/common';
import {
  ParsedQuestionStatus,
  QuestionAnswerMode,
  type Prisma,
} from '../../generated/prisma/client.js';

export interface UploadedPdfFile {
  originalname: string;
  mimetype: string;
  size: number;
  buffer: Buffer;
}

export interface ParsedQuestionOptionPayload {
  label: 'A' | 'B' | 'C' | 'D' | 'E';
  text: string;
  optionWeight?: number | null;
}

export interface ParsedQuestionCallbackPayload {
  questionText: string;
  options: ParsedQuestionOptionPayload[];
  detectedAnswer?: string | null;
  categoryCode?: string | null;
  subCategory?: string | null;
  topicTag?: string | null;
  difficulty?: 'easy' | 'medium' | 'hard' | null;
  confidenceScore?: number | null;
  rawAiOutput?: unknown;
  status?: ParsedQuestionStatus;
}

export const buildQuestionPreview = (text: string) => {
  const compact = text.replace(/\s+/g, ' ').trim();
  return compact.length <= 120 ? compact : `${compact.slice(0, 117)}...`;
};

export const assertPdfFile = (file: UploadedPdfFile | undefined | null, maxSizeBytes: number) => {
  if (!file) {
    throw new BadRequestException({
      code: 'INVALID_FILE_TYPE',
      message: 'File PDF wajib diunggah',
    });
  }

  const lowerName = file.originalname.toLowerCase();
  const isPdf = file.mimetype === 'application/pdf' || lowerName.endsWith('.pdf');
  if (!isPdf) {
    throw new BadRequestException({
      code: 'INVALID_FILE_TYPE',
      message: 'File harus berformat PDF',
    });
  }

  if (file.size > maxSizeBytes) {
    throw new BadRequestException({
      code: 'FILE_TOO_LARGE',
      message: 'Ukuran file melebihi batas maksimum',
    });
  }
};

export const toInputJson = (value: unknown): Prisma.InputJsonValue =>
  value as Prisma.InputJsonValue;

export const toQuestionOptionCreateMany = (
  questionId: string,
  answerMode: QuestionAnswerMode,
  options: ParsedQuestionOptionPayload[],
  detectedAnswer?: string,
) =>
  options.map((option, index) => ({
    questionId,
    label: option.label,
    optionText: option.text,
    isCorrect:
      answerMode === QuestionAnswerMode.weighted_options ? false : option.label === detectedAnswer,
    optionWeight:
      answerMode === QuestionAnswerMode.weighted_options ? option.optionWeight ?? null : null,
    displayOrder: index + 1,
  }));

export const deriveParsedQuestionStatusCounters = (
  parsedQuestions: Array<{ status: ParsedQuestionStatus }>,
) => ({
  totalDetected: parsedQuestions.length,
  validCount: parsedQuestions.filter((item) => item.status === ParsedQuestionStatus.approved).length,
  invalidCount: parsedQuestions.filter((item) => item.status === ParsedQuestionStatus.rejected).length,
});

export const getApiPublicBase = () =>
  (process.env.PUBLIC_API_URL ?? process.env.BETTER_AUTH_URL ?? 'http://localhost:3001')
    .replace(/\/$/, '')
    .replace(/\/api\/auth$/, '');
