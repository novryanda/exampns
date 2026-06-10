import { BadRequestException, Injectable } from '@nestjs/common';
import { QuestionStatus } from '../../generated/prisma/client.js';
import { PrismaService } from '../common/prisma.service.js';
import { ValidationService } from '../common/validation.service.js';
import {
  sanitizeQuestionOptionsForActiveExam,
  shuffle,
} from '../exam-engine/exam-engine.helpers.js';
import {
  signSampleSessionToken,
  verifySampleSessionToken,
} from './public-sample.helpers.js';
import {
  checkSampleAnswersSchema,
  type CheckSampleAnswersInput,
} from './public-sample.schemas.js';

const SAMPLE_QUESTION_COUNT = 5;

@Injectable()
export class PublicSampleService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly validationService: ValidationService,
  ) {}

  async getSampleQuestions() {
    const questions = await this.prisma.question.findMany({
      where: {
        status: QuestionStatus.active,
        deletedAt: null,
        categoryRef: {
          isActive: true,
        },
      },
      include: {
        categoryRef: {
          select: {
            code: true,
            name: true,
          },
        },
        options: {
          orderBy: { displayOrder: 'asc' },
        },
      },
    });

    if (questions.length === 0) {
      return {
        sessionToken: null,
        totalQuestions: 0,
        questions: [],
      };
    }

    const selected = shuffle(questions).slice(0, SAMPLE_QUESTION_COUNT);
    const sessionToken = signSampleSessionToken(selected.map((question) => question.id));

    return {
      sessionToken,
      totalQuestions: selected.length,
      questions: selected.map((question) => ({
        id: question.id,
        questionText: question.questionText,
        category: question.categoryRef.code,
        categoryName: question.categoryRef.name,
        options: sanitizeQuestionOptionsForActiveExam(
          question.options.map((option) => ({
            label: option.label,
            text: option.optionText,
          })),
        ),
      })),
    };
  }

  async checkSampleAnswers(input: CheckSampleAnswersInput) {
    const payload = this.validationService.validate(checkSampleAnswersSchema, input);
    const questionIds = verifySampleSessionToken(payload.sessionToken);

    if (!questionIds) {
      throw new BadRequestException({
        success: false,
        message: 'Sesi mini tryout tidak valid atau sudah kedaluwarsa',
      });
    }

    const answerMap = new Map(payload.answers.map((answer) => [answer.questionId, answer.selectedLabel]));
    const unexpectedQuestion = payload.answers.find((answer) => !questionIds.includes(answer.questionId));

    if (unexpectedQuestion) {
      throw new BadRequestException({
        success: false,
        message: 'Jawaban tidak sesuai dengan sesi mini tryout',
      });
    }

    const questions = await this.prisma.question.findMany({
      where: {
        id: { in: questionIds },
        status: QuestionStatus.active,
        deletedAt: null,
      },
      include: {
        options: {
          orderBy: { displayOrder: 'asc' },
        },
      },
    });

    const questionById = new Map(questions.map((question) => [question.id, question]));
    let correctCount = 0;

    const results = questionIds.map((questionId) => {
      const question = questionById.get(questionId);
      if (!question) {
        throw new BadRequestException({
          success: false,
          message: 'Soal tidak ditemukan',
        });
      }

      const selectedLabel = answerMap.get(questionId) ?? null;
      const correctOption = question.options.find((option) => option.isCorrect);
      const isCorrect = Boolean(selectedLabel && correctOption?.label === selectedLabel);

      if (isCorrect) {
        correctCount += 1;
      }

      return {
        questionId,
        selectedLabel,
        correctLabel: correctOption?.label ?? null,
        isCorrect,
        explanation: question.explanation,
      };
    });

    return {
      totalQuestions: questionIds.length,
      correctCount,
      scorePercent: Math.round((correctCount / questionIds.length) * 100),
      results,
    };
  }
}
