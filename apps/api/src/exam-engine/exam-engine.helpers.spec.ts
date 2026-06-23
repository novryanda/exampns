import { QuestionAnswerMode, ReasonCode } from '../../generated/prisma/client.js';
import {
  buildBreakdown,
  buildFallbackRecommendationItems,
  buildWeakAreaItems,
  computeAccuracy,
  formatAiRecommendationForResponse,
  processingAiRecommendationResponse,
} from './exam-engine.helpers.js';
import { Prisma } from '../../generated/prisma/client.js';

const QuestionCategory = {
  TWK: 'TWK',
  TIU: 'TIU',
  TKP: 'TKP',
} as const;

describe('ExamEngine helpers', () => {
  it('computes accuracy correctly', () => {
    expect(computeAccuracy(2, 8)).toBe(25);
  });

  it('builds breakdown counts for correct, wrong, and empty answers', () => {
    const breakdown = buildBreakdown([
      {
        category: QuestionCategory.TWK,
        answerMode: QuestionAnswerMode.single_correct,
        subCategory: 'A',
        topicTag: 'B',
        difficulty: 'medium',
        isCorrect: true,
        selectedLabel: 'A',
        scoreAwarded: 5,
        maxScore: 5,
      },
      {
        category: QuestionCategory.TWK,
        answerMode: QuestionAnswerMode.single_correct,
        subCategory: 'A',
        topicTag: 'B',
        difficulty: 'medium',
        isCorrect: false,
        selectedLabel: 'B',
        scoreAwarded: 0,
        maxScore: 5,
      },
      {
        category: QuestionCategory.TWK,
        answerMode: QuestionAnswerMode.single_correct,
        subCategory: 'A',
        topicTag: 'B',
        difficulty: 'medium',
        isCorrect: null,
        selectedLabel: null,
        scoreAwarded: 0,
        maxScore: 5,
      },
    ]);

    expect(breakdown[0]).toMatchObject({
      totalQuestions: 3,
      correctAnswers: 1,
      wrongAnswers: 1,
      emptyAnswers: 1,
      accuracy: 33,
      wrongAnswerRate: 67,
      scoreImpact: 10,
    });
  });

  it('builds weak areas and fallback recommendation items ordered by priority', () => {
    const weakAreas = buildWeakAreaItems(
      [
        {
          category: QuestionCategory.TWK,
          answerMode: QuestionAnswerMode.single_correct,
          subCategory: 'Tata Negara',
          topicTag: 'UUD',
          difficulty: 'medium',
          totalQuestions: 8,
          correctAnswers: 2,
          wrongAnswers: 6,
          emptyAnswers: 0,
          accuracy: 25,
          wrongAnswerRate: 75,
          dominantDifficulty: 'medium',
          scoreImpact: 30,
          totalAwardedScore: 10,
          totalPossibleScore: 40,
        },
      ],
      {
        [QuestionCategory.TWK]: false,
        [QuestionCategory.TIU]: true,
        [QuestionCategory.TKP]: true,
      },
    );
    const items = buildFallbackRecommendationItems(weakAreas);

    expect(items[0]).toMatchObject({
      priorityOrder: 1,
      reasonCode: ReasonCode.LOW_ACCURACY_AND_CATEGORY_NOT_PASSED,
      topicTag: 'UUD',
    });
  });

  it('uses weighted accuracy for TKP breakdown', () => {
    const breakdown = buildBreakdown([
      {
        category: QuestionCategory.TKP,
        answerMode: QuestionAnswerMode.weighted_options,
        subCategory: 'Pelayanan',
        topicTag: 'Empati',
        difficulty: 'easy',
        isCorrect: null,
        selectedLabel: 'A',
        scoreAwarded: 3,
        maxScore: 5,
      },
      {
        category: QuestionCategory.TKP,
        answerMode: QuestionAnswerMode.weighted_options,
        subCategory: 'Pelayanan',
        topicTag: 'Empati',
        difficulty: 'easy',
        isCorrect: null,
        selectedLabel: 'B',
        scoreAwarded: 5,
        maxScore: 5,
      },
    ]);

    expect(breakdown[0]).toMatchObject({
      accuracy: 80,
      correctAnswers: 1,
      wrongAnswers: 1,
      scoreImpact: 2,
    });
  });

  it('formats AI recommendation response with number fields', () => {
    const formatted = formatAiRecommendationForResponse({
      id: 'rec-1',
      status: 'completed',
      isFallback: false,
      summary: 'summary',
      overallAssessment: 'assessment',
      nextTryoutStrategy: 'strategy',
      generatedAt: new Date('2026-05-17T00:00:00.000Z'),
      items: [
        {
          priorityOrder: 1,
          priorityLevel: 'HIGH',
          priorityScore: new Prisma.Decimal(91),
          category: QuestionCategory.TWK,
          answerMode: QuestionAnswerMode.single_correct,
          subCategory: 'Tata Negara',
          topicTag: 'UUD',
          reasonCode: ReasonCode.LOW_ACCURACY,
          reasonCodes: [ReasonCode.LOW_ACCURACY],
          trend: 'declining',
          reason: 'reason',
          suggestedFocus: ['focus'],
          accuracy: new Prisma.Decimal(25),
          wrongAnswerRate: new Prisma.Decimal(75),
          totalQuestions: 8,
          correctAnswers: 2,
          wrongAnswers: 6,
          emptyAnswers: 0,
          dominantDifficulty: 'medium',
          scoreImpact: 30,
        },
      ],
    });

    expect(formatted.items[0]).toMatchObject({
      priorityScore: 91,
      accuracy: 25,
      wrongAnswerRate: 75,
      dominantDifficulty: 'medium',
      scoreImpact: 30,
    });
  });

  it('returns processing contract shape', () => {
    expect(processingAiRecommendationResponse()).toEqual({
      status: 'processing',
    });
  });
});
