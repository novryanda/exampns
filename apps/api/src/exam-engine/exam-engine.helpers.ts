import {
  AccessType,
  AIRecommendationStatus,
  Prisma,
  PriorityLevel,
  QuestionAnswerMode,
  QuestionDifficulty,
  RandomizationMode,
  ReasonCode,
  TrendType,
  TryoutType,
  UserRole,
} from '../../generated/prisma/client.js';
import type { EffectiveAccessLevel } from '../common/access-control.helpers.js';

export interface QuestionSnapshotOption {
  label: string;
  text: string;
  isCorrect?: boolean;
  optionWeight?: number | null;
}

export interface QuestionSnapshotPayload {
  id: string;
  questionText: string;
  category: string;
  categoryName: string;
  answerMode: QuestionAnswerMode;
  subCategory: string;
  topicTag: string;
  competencyArea?: string | null;
  difficulty: QuestionDifficulty;
  explanation?: string | null;
}

export interface BreakdownItem {
  category: string;
  categoryName: string;
  answerMode: QuestionAnswerMode;
  subCategory: string;
  topicTag: string;
  difficulty: QuestionDifficulty;
  totalQuestions: number;
  correctAnswers: number;
  wrongAnswers: number;
  emptyAnswers: number;
  accuracy: number;
  wrongAnswerRate: number;
  dominantDifficulty: QuestionDifficulty;
  scoreImpact: number;
  totalAwardedScore: number;
  totalPossibleScore: number;
}

export interface BreakdownRow {
  category: string;
  categoryName: string;
  answerMode: QuestionAnswerMode;
  subCategory: string;
  topicTag: string;
  difficulty: QuestionDifficulty;
  isCorrect: boolean | null;
  selectedLabel: string | null;
  scoreAwarded: number;
  maxScore: number;
}

export interface WeakAreaItem extends BreakdownItem {
  priorityOrder: number;
  priorityLevel: PriorityLevel;
  priorityScore: number;
  reasonCode: ReasonCode;
  reasonCodes: ReasonCode[];
  trend: TrendType;
}

export interface RecommendationNarrative {
  summary: string;
  overallAssessment: string;
  nextTryoutStrategy: string;
}

export interface RecommendationCategoryScore {
  categoryCode: string;
  categoryName: string;
  score: number;
  minScore: number;
  passed: boolean;
}

export interface RecommendationPayload {
  examResultId: string;
  score: {
    total: number;
    categories: RecommendationCategoryScore[];
  };
  passingStatus: {
    totalPassed: boolean;
    overallPassed: boolean;
    categories: RecommendationCategoryScore[];
  };
  weakAreas: Array<{
    priority: number;
    priorityLevel: PriorityLevel;
    priorityScore: number;
    category: string;
    categoryName: string;
    subCategory: string;
    topicTag: string;
    difficulty: QuestionDifficulty;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    emptyAnswers: number;
    accuracy: number;
    wrongAnswerRate: number;
    dominantDifficulty: QuestionDifficulty;
    scoreImpact: number;
    reasonCodes: ReasonCode[];
    trend: TrendType;
  }>;
  breakdown: BreakdownItem[];
  instruction: {
    language: 'id';
    outputFormat: 'json';
    maxRecommendations: number;
    doNotInventTopics: true;
    doNotActAsChatbot: true;
    doNotGuaranteePassing: true;
  };
}

export interface RecommendationItemNarrativeInput {
  category?: string;
  subCategory?: string;
  topicTag?: string;
  reason?: string;
  suggestedFocus?: string[] | string | null;
}

export interface AIResponseShape {
  summary?: unknown;
  overallAssessment?: unknown;
  recommendations?: unknown;
  nextTryoutStrategy?: unknown;
}

export interface PublicAiRecommendationItem {
  priorityOrder: number;
  priorityLevel: PriorityLevel;
  priorityScore: number;
  category: string;
  subCategory: string;
  topicTag: string;
  reasonCode: ReasonCode;
  reasonCodes: unknown;
  trend: TrendType;
  reason: string;
  suggestedFocus: unknown;
  accuracy: number | null;
  wrongAnswerRate: number | null;
  totalQuestions: number | null;
  correctAnswers: number | null;
  wrongAnswers: number | null;
  emptyAnswers: number | null;
  dominantDifficulty?: QuestionDifficulty;
  scoreImpact?: number;
}

export const shuffle = <T>(items: T[]) => {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
};

export const sanitizeQuestionOptionsForActiveExam = (
  options: QuestionSnapshotOption[],
) =>
  options.map((option) => ({
    label: option.label,
    text: option.text,
  }));

export const resolveTryoutCatalogId = (payload: { tryoutCatalogId?: string; examConfigId?: string }) =>
  payload.tryoutCatalogId ?? payload.examConfigId!;

export const ensureUserCanAccessTryout = (
  accessType: AccessType,
  accessLevel: EffectiveAccessLevel,
) => {
  switch (accessType) {
    case AccessType.trial_only:
      return accessLevel === 'trial';
    case AccessType.paid_only:
      return accessLevel === 'standard' || accessLevel === 'premium';
    case AccessType.premium_only:
      return accessLevel === 'premium';
    case AccessType.trial_and_paid:
      return accessLevel !== 'expired';
    default:
      return false;
  }
};

export const computeAccuracy = (correctAnswers: number, totalQuestions: number) =>
  totalQuestions === 0 ? 0 : Math.round((correctAnswers / totalQuestions) * 100);

export const buildBreakdown = (
  rows: BreakdownRow[],
): BreakdownItem[] => {
  const map = new Map<string, BreakdownItem>();

  for (const row of rows) {
    const key = [
      row.category,
      row.subCategory,
      row.topicTag,
      row.difficulty,
    ].join('::');

    const current =
      map.get(key) ??
      {
        category: row.category,
        categoryName: row.categoryName,
        answerMode: row.answerMode,
        subCategory: row.subCategory,
        topicTag: row.topicTag,
        difficulty: row.difficulty,
        totalQuestions: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
        emptyAnswers: 0,
        accuracy: 0,
        wrongAnswerRate: 0,
        dominantDifficulty: row.difficulty,
        scoreImpact: 0,
        totalAwardedScore: 0,
        totalPossibleScore: 0,
      };

    current.totalQuestions += 1;
    current.totalAwardedScore += row.scoreAwarded;
    current.totalPossibleScore += row.maxScore;
    current.scoreImpact += Math.max(0, row.maxScore - row.scoreAwarded);

    if (row.selectedLabel === null) {
      current.emptyAnswers += 1;
    } else if (
      row.answerMode === QuestionAnswerMode.weighted_options
        ? row.scoreAwarded >= row.maxScore
        : row.isCorrect === true
    ) {
      current.correctAnswers += 1;
    } else {
      current.wrongAnswers += 1;
    }

    map.set(key, current);
  }

  return [...map.values()].map((item) => ({
    ...item,
    accuracy:
      item.answerMode === QuestionAnswerMode.weighted_options
        ? item.totalPossibleScore === 0
          ? 0
          : Math.round((item.totalAwardedScore / item.totalPossibleScore) * 100)
        : computeAccuracy(item.correctAnswers, item.totalQuestions),
    wrongAnswerRate:
      item.totalQuestions === 0
        ? 0
        : Math.round(((item.wrongAnswers + item.emptyAnswers) / item.totalQuestions) * 100),
  }));
};

export const isPrivilegedRole = (role?: UserRole) =>
  role === UserRole.ADMIN || role === UserRole.SUPER_ADMIN;

export const priorityLevelFromScore = (score: number) => {
  if (score >= 75) {
    return PriorityLevel.HIGH;
  }

  if (score >= 50) {
    return PriorityLevel.MEDIUM;
  }

  return PriorityLevel.LOW;
};

const difficultyScoreWeight = (difficulty: QuestionDifficulty) => {
  switch (difficulty) {
    case QuestionDifficulty.easy:
      return 100;
    case QuestionDifficulty.medium:
      return 75;
    case QuestionDifficulty.hard:
      return 45;
    default:
      return 50;
  }
};

const trendScoreWeight = (trend: TrendType) => {
  switch (trend) {
    case TrendType.declining:
      return 100;
    case TrendType.new_weak_area:
      return 70;
    case TrendType.stagnant:
      return 45;
    case TrendType.improving:
      return 15;
    case TrendType.no_history:
    default:
      return 0;
  }
};

const topicKeyOf = (item: {
  category: string;
  subCategory: string;
  topicTag: string;
  difficulty: QuestionDifficulty;
}) => [item.category, item.subCategory, item.topicTag, item.difficulty].join('::');

const detectTrend = (
  item: BreakdownItem,
  historyBreakdowns: BreakdownItem[][],
) => {
  const history = historyBreakdowns
    .map((breakdown) => breakdown.find((candidate) => topicKeyOf(candidate) === topicKeyOf(item)))
    .filter((candidate): candidate is BreakdownItem => candidate !== undefined);

  if (history.length === 0) {
    return historyBreakdowns.length > 0 ? TrendType.new_weak_area : TrendType.no_history;
  }

  const averageHistoricalAccuracy = Math.round(
    history.reduce((sum, current) => sum + current.accuracy, 0) / history.length,
  );
  const delta = item.accuracy - averageHistoricalAccuracy;

  if (delta >= 10) {
    return TrendType.improving;
  }

  if (delta <= -10) {
    return TrendType.declining;
  }

  return TrendType.stagnant;
};

const buildReasonCodes = (
  item: BreakdownItem,
  categoryPassing: Record<string, boolean>,
  trend: TrendType,
  historyBreakdowns: BreakdownItem[][],
) => {
  const reasonCodes: ReasonCode[] = [ReasonCode.LOW_ACCURACY];

  if (!categoryPassing[item.category]) {
    reasonCodes.push(ReasonCode.LOW_ACCURACY_AND_CATEGORY_NOT_PASSED);
  }

  if (trend === TrendType.declining) {
    reasonCodes.push(ReasonCode.DECLINING_TREND);
  }

  if (trend === TrendType.new_weak_area) {
    reasonCodes.push(ReasonCode.NEW_WEAK_AREA);
  }

  const hasPreviousWeakHistory = historyBreakdowns.some((breakdown) => {
    const historicalItem = breakdown.find((candidate) => topicKeyOf(candidate) === topicKeyOf(item));
    return historicalItem ? historicalItem.accuracy < 70 : false;
  });
  if (hasPreviousWeakHistory) {
    reasonCodes.push(ReasonCode.REPEATED_WEAKNESS);
  }

  if (
    item.accuracy < 70 &&
    (item.difficulty === QuestionDifficulty.easy || item.difficulty === QuestionDifficulty.medium)
  ) {
    reasonCodes.push(ReasonCode.EASY_MEDIUM_FAILURE);
  }

  if (item.scoreImpact >= 10) {
    reasonCodes.push(ReasonCode.HIGH_SCORE_IMPACT);
  }

  return [...new Set(reasonCodes)];
};

const selectPrimaryReasonCode = (reasonCodes: ReasonCode[]) => {
  if (reasonCodes.includes(ReasonCode.LOW_ACCURACY_AND_CATEGORY_NOT_PASSED)) {
    return ReasonCode.LOW_ACCURACY_AND_CATEGORY_NOT_PASSED;
  }

  return reasonCodes[0] ?? ReasonCode.LOW_ACCURACY;
};

export const buildWeakAreaItems = (
  breakdown: BreakdownItem[],
  categoryPassing: Record<string, boolean>,
  historyBreakdowns: BreakdownItem[][] = [],
) => {
  return [...breakdown]
    .filter((item) => item.accuracy < 70 && item.totalQuestions >= 3)
    .map((item) => {
      const trend = detectTrend(item, historyBreakdowns);
      const questionWeightScore = Math.min(100, item.totalQuestions * 20);
      const passingGradeImpactScore = categoryPassing[item.category] ? 0 : 100;
      const difficultyWeightScore = difficultyScoreWeight(item.difficulty);
      const historyTrendScore = trendScoreWeight(trend);
      const priorityScore = Math.round(
        item.wrongAnswerRate * 0.4 +
          questionWeightScore * 0.2 +
          passingGradeImpactScore * 0.25 +
          difficultyWeightScore * 0.1 +
          historyTrendScore * 0.05,
      );
      const reasonCodes = buildReasonCodes(item, categoryPassing, trend, historyBreakdowns);

      return {
        ...item,
        priorityScore,
        trend,
        reasonCodes,
        reasonCode: selectPrimaryReasonCode(reasonCodes),
      };
    })
    .sort((left, right) => {
      if (right.priorityScore !== left.priorityScore) {
        return right.priorityScore - left.priorityScore;
      }

      if (right.scoreImpact !== left.scoreImpact) {
        return right.scoreImpact - left.scoreImpact;
      }

      return left.accuracy - right.accuracy;
    })
    .slice(0, 5)
    .map((item, index) => ({
      ...item,
      priorityOrder: index + 1,
      priorityLevel: priorityLevelFromScore(item.priorityScore),
    }));
};

const fallbackReasonText = (item: WeakAreaItem) => {
  if (item.reasonCodes.includes(ReasonCode.LOW_ACCURACY_AND_CATEGORY_NOT_PASSED)) {
    return `Akurasi ${item.category} pada topik ${item.topicTag} rendah dan kategori ini belum melewati passing grade.`;
  }

  if (item.reasonCodes.includes(ReasonCode.DECLINING_TREND)) {
    return `Performa pada topik ${item.topicTag} menurun dibanding tryout sebelumnya.`;
  }

  if (item.reasonCodes.includes(ReasonCode.NEW_WEAK_AREA)) {
    return `Topik ${item.topicTag} muncul sebagai area lemah baru yang perlu segera dipantau.`;
  }

  return `Topik ${item.topicTag} memiliki akurasi ${item.accuracy}% dan perlu diprioritaskan sebelum tryout berikutnya.`;
};

const fallbackSuggestedFocus = (item: WeakAreaItem) => {
  const focuses = [
    `Ulangi materi inti ${item.topicTag} pada subkategori ${item.subCategory}.`,
    `Kerjakan latihan ${item.category} bertingkat ${item.difficulty} untuk memperbaiki akurasi.`,
  ];

  if (item.scoreImpact >= 10) {
    focuses.push('Prioritaskan topik ini lebih dulu karena dampaknya besar ke skor total.');
  }

  return focuses;
};

export const buildFallbackRecommendationItems = (
  weakAreas: WeakAreaItem[],
) =>
  weakAreas.map((item) => ({
    priorityOrder: item.priorityOrder,
    priorityLevel: item.priorityLevel,
    priorityScore: new Prisma.Decimal(item.priorityScore),
    category: item.category,
    subCategory: item.subCategory,
    topicTag: item.topicTag,
    reasonCode: item.reasonCode,
    reasonCodes: item.reasonCodes,
    trend: item.trend,
    reason: fallbackReasonText(item),
    suggestedFocus: fallbackSuggestedFocus(item),
    accuracy: new Prisma.Decimal(item.accuracy),
    wrongAnswerRate: new Prisma.Decimal(item.wrongAnswerRate),
    totalQuestions: item.totalQuestions,
    correctAnswers: item.correctAnswers,
    wrongAnswers: item.wrongAnswers,
    emptyAnswers: item.emptyAnswers,
    dominantDifficulty: item.dominantDifficulty,
    scoreImpact: item.scoreImpact,
  }));

export const buildRecommendationNarrative = (
  weakAreas: WeakAreaItem[],
  overallPassed: boolean,
): RecommendationNarrative => {
  if (weakAreas.length === 0) {
    return {
      summary: overallPassed
        ? 'Performa Anda relatif stabil dan tidak ada area lemah dominan pada hasil ini.'
        : 'Tidak ada weak area dominan yang memenuhi ambang prioritas, tetapi passing grade total tetap perlu dikejar.',
      overallAssessment: overallPassed
        ? 'Fokus utama adalah menjaga konsistensi dan memperluas latihan lintas kategori.'
        : 'Skor keseluruhan belum aman, jadi strategi belajar perlu diarahkan pada pemerataan performa kategori.',
      nextTryoutStrategy:
        'Gunakan tryout berikutnya untuk memvalidasi kestabilan skor dan menjaga pemerataan antar kategori.',
    };
  }

  const primaryWeakArea = weakAreas[0];

  return {
    summary: `Sistem menemukan ${weakAreas.length} area prioritas, dengan fokus utama pada ${primaryWeakArea.topicTag}.`,
    overallAssessment: overallPassed
      ? 'Anda sudah lolos passing grade, tetapi masih ada titik lemah yang bisa menurunkan konsistensi hasil.'
      : 'Beberapa area lemah masih cukup berdampak terhadap peluang lulus pada tryout berikutnya.',
    nextTryoutStrategy:
      'Perbaiki area prioritas secara berurutan, mulai dari topik dengan skor prioritas tertinggi sebelum mengambil tryout baru.',
  };
};

export const buildRecommendationPayload = (params: {
  examResultId: string;
  score: RecommendationPayload['score'];
  passingStatus: RecommendationPayload['passingStatus'];
  breakdown: BreakdownItem[];
  weakAreas: WeakAreaItem[];
}): RecommendationPayload => ({
  examResultId: params.examResultId,
  score: params.score,
  passingStatus: params.passingStatus,
  weakAreas: params.weakAreas.map((item) => ({
    priority: item.priorityOrder,
    priorityLevel: item.priorityLevel,
    priorityScore: item.priorityScore,
    category: item.category,
    categoryName: item.categoryName,
    subCategory: item.subCategory,
    topicTag: item.topicTag,
    difficulty: item.difficulty,
    totalQuestions: item.totalQuestions,
    correctAnswers: item.correctAnswers,
    wrongAnswers: item.wrongAnswers,
    emptyAnswers: item.emptyAnswers,
    accuracy: item.accuracy,
    wrongAnswerRate: item.wrongAnswerRate,
    dominantDifficulty: item.dominantDifficulty,
    scoreImpact: item.scoreImpact,
    reasonCodes: item.reasonCodes,
    trend: item.trend,
  })),
  breakdown: params.breakdown,
  instruction: {
    language: 'id',
    outputFormat: 'json',
    maxRecommendations: 5,
    doNotInventTopics: true,
    doNotActAsChatbot: true,
    doNotGuaranteePassing: true,
  },
});

const isRecommendationNarrativeInputArray = (
  value: unknown,
): value is RecommendationItemNarrativeInput[] =>
  Array.isArray(value) &&
  value.every(
    (item) =>
      typeof item === 'object' &&
      item !== null &&
      (!('category' in item) || typeof item.category === 'string') &&
      (!('subCategory' in item) || typeof item.subCategory === 'string') &&
      (!('topicTag' in item) || typeof item.topicTag === 'string') &&
      (!('reason' in item) || typeof item.reason === 'string') &&
      (!('suggestedFocus' in item) ||
        Array.isArray(item.suggestedFocus) ||
        typeof item.suggestedFocus === 'string' ||
        item.suggestedFocus === null),
  );

export const normalizeAiResponse = (value: unknown) => {
  if (typeof value !== 'object' || value === null) {
    return null;
  }

  const response = value as AIResponseShape;
  if (
    typeof response.summary !== 'string' ||
    typeof response.overallAssessment !== 'string' ||
    typeof response.nextTryoutStrategy !== 'string' ||
    !isRecommendationNarrativeInputArray(response.recommendations)
  ) {
    return null;
  }

  return {
    summary: response.summary,
    overallAssessment: response.overallAssessment,
    nextTryoutStrategy: response.nextTryoutStrategy,
    recommendations: response.recommendations,
  };
};

export const mergeRecommendationNarratives = (
  weakAreas: WeakAreaItem[],
  recommendations: RecommendationItemNarrativeInput[],
) =>
  weakAreas.map((item) => {
    const matched = recommendations.find(
      (candidate) =>
        candidate.category === item.category &&
        candidate.subCategory === item.subCategory &&
        candidate.topicTag === item.topicTag,
    );

    const fallback = buildFallbackRecommendationItems([item])[0];
    const suggestedFocus = Array.isArray(matched?.suggestedFocus)
      ? matched.suggestedFocus
      : typeof matched?.suggestedFocus === 'string'
        ? [matched.suggestedFocus]
        : fallback.suggestedFocus;

    return {
      ...fallback,
      reason: matched?.reason?.trim() || fallback.reason,
      suggestedFocus,
    };
  });

export const buildFallbackRecommendationRecord = (params: {
  weakAreas: WeakAreaItem[];
  overallPassed: boolean;
  rawRequestPayload: RecommendationPayload;
  errorMessage?: string | null;
  rawAiResponse?: unknown;
}) => {
  const narrative = buildRecommendationNarrative(params.weakAreas, params.overallPassed);

  return {
    status: AIRecommendationStatus.fallback,
    isFallback: true,
    summary: narrative.summary,
    overallAssessment: narrative.overallAssessment,
    nextTryoutStrategy: narrative.nextTryoutStrategy,
    rawRequestPayload: toInputJson(params.rawRequestPayload),
    rawAiResponse: toNullableInputJson(params.rawAiResponse ?? null),
    errorMessage: params.errorMessage ?? null,
    generatedAt: new Date(),
    items: buildFallbackRecommendationItems(params.weakAreas),
  };
};

export const formatResultBreakdownForResponse = (
  breakdown: Array<{
    category: string;
    categoryName: string;
    answerMode: QuestionAnswerMode;
    subCategory: string;
    topicTag: string;
    difficulty: QuestionDifficulty;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    accuracy: number;
  }>,
) =>
  breakdown.map((item) => ({
    category: item.category,
    categoryName: item.categoryName,
    answerMode: item.answerMode,
    subCategory: item.subCategory,
    topicTag: item.topicTag,
    difficulty: item.difficulty,
    totalQuestions: item.totalQuestions,
    correctAnswers: item.correctAnswers,
    wrongAnswers: item.wrongAnswers,
    accuracy: item.accuracy,
  }));

export const formatAiRecommendationItemForResponse = (item: {
  priorityOrder: number;
  priorityLevel: PriorityLevel;
  priorityScore: Prisma.Decimal;
  category: string;
  subCategory: string;
  topicTag: string;
  reasonCode: ReasonCode;
  reasonCodes: Prisma.JsonValue;
  trend: TrendType;
  reason: string;
  suggestedFocus: Prisma.JsonValue;
  accuracy: Prisma.Decimal | null;
  wrongAnswerRate: Prisma.Decimal | null;
  totalQuestions: number | null;
  correctAnswers: number | null;
  wrongAnswers: number | null;
  emptyAnswers: number | null;
  dominantDifficulty: QuestionDifficulty | null;
  scoreImpact: number | null;
}): PublicAiRecommendationItem => ({
  priorityOrder: item.priorityOrder,
  priorityLevel: item.priorityLevel,
  priorityScore: Number(item.priorityScore),
  category: item.category,
  subCategory: item.subCategory,
  topicTag: item.topicTag,
  reasonCode: item.reasonCode,
  reasonCodes: item.reasonCodes,
  trend: item.trend,
  reason: item.reason,
  suggestedFocus: item.suggestedFocus,
  accuracy: item.accuracy === null ? null : Number(item.accuracy),
  wrongAnswerRate: item.wrongAnswerRate === null ? null : Number(item.wrongAnswerRate),
  totalQuestions: item.totalQuestions,
  correctAnswers: item.correctAnswers,
  wrongAnswers: item.wrongAnswers,
  emptyAnswers: item.emptyAnswers,
  ...(item.dominantDifficulty ? { dominantDifficulty: item.dominantDifficulty } : {}),
  ...(item.scoreImpact !== null ? { scoreImpact: item.scoreImpact } : {}),
});

export const formatAiRecommendationForResponse = (recommendation: {
  id: string;
  status: AIRecommendationStatus;
  isFallback: boolean;
  summary: string | null;
  overallAssessment: string | null;
  nextTryoutStrategy: string | null;
  generatedAt: Date | null;
  items: Array<{
    priorityOrder: number;
    priorityLevel: PriorityLevel;
    priorityScore: Prisma.Decimal;
    category: string;
    subCategory: string;
    topicTag: string;
    reasonCode: ReasonCode;
    reasonCodes: Prisma.JsonValue;
    trend: TrendType;
    reason: string;
    suggestedFocus: Prisma.JsonValue;
    accuracy: Prisma.Decimal | null;
    wrongAnswerRate: Prisma.Decimal | null;
    totalQuestions: number | null;
    correctAnswers: number | null;
    wrongAnswers: number | null;
    emptyAnswers: number | null;
    dominantDifficulty: QuestionDifficulty | null;
    scoreImpact: number | null;
  }>;
}) => ({
  id: recommendation.id,
  status: recommendation.status,
  isFallback: recommendation.isFallback,
  summary: recommendation.summary,
  overallAssessment: recommendation.overallAssessment,
  nextTryoutStrategy: recommendation.nextTryoutStrategy,
  items: recommendation.items.map(formatAiRecommendationItemForResponse),
  generatedAt: recommendation.generatedAt,
});

export const processingAiRecommendationResponse = () => ({
  status: AIRecommendationStatus.processing,
});

export const tryoutUsesManualSet = (tryoutType: TryoutType, randomizationMode: RandomizationMode) =>
  tryoutType === TryoutType.manual ||
  randomizationMode === RandomizationMode.manual_question_set ||
  randomizationMode === RandomizationMode.hybrid_manual_and_random;

export const toInputJson = (value: unknown): Prisma.InputJsonValue =>
  value as Prisma.InputJsonValue;

export const toNullableInputJson = (value: unknown) =>
  value === undefined ? undefined : value === null ? Prisma.JsonNull : (value as Prisma.InputJsonValue);
