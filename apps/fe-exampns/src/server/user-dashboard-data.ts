import "server-only";

import { SERVER_BACKEND_API_URL } from "@/lib/api/backend-url";
import {
  type ApiPaginatedResponse,
  type ApiSuccessResponse,
  serverApiFetch,
  toQueryString,
} from "@/server/api-client";

export interface CategoryScoreSummary {
  categoryCode: string;
  categoryName: string;
  score: number;
  minScore: number;
  passed: boolean;
}

export interface UserDashboardSummary {
  greetingName: string;
  accessStatus: {
    type: "trial" | "standard" | "premium" | "expired";
    source: string;
    status: string;
    tryoutRemaining: number | null;
    daysRemaining: number;
    endDate: string | null;
    tier: "trial" | "standard" | "premium" | null;
  };
  lastResult: {
    examResultId: string;
    examDate: string;
    totalScore: number;
    categoryScores: CategoryScoreSummary[];
    overallPassed: boolean;
  } | null;
  latestRecommendation: {
    summary: string | null;
    priorityTopic: string | null;
  } | null;
  weakAreas: Array<{
    category: string;
    subCategory: string;
    topicTag: string;
    accuracy: number | null;
  }>;
  recentExams: Array<{
    examResultId: string;
    examSessionId: string;
    tryoutName: string;
    examDate: string;
    totalScore: number;
    categoryScores: Array<{
      categoryCode: string;
      categoryName: string;
      score: number;
    }>;
    overallPassed: boolean;
  }>;
}

export interface TryoutCompositionItem {
  categoryCode: string;
  categoryName: string;
  questionCount: number;
}

export interface QuestionCategoryItem {
  id: string;
  code: string;
  name: string;
  answerMode: "single_correct" | "weighted_options";
  sortOrder: number;
}

export interface UserTryoutCatalogItem {
  id: string;
  name: string;
  description: string | null;
  tryoutType: "generated" | "manual" | "hybrid" | "adaptive";
  accessType: "trial_only" | "paid_only" | "trial_and_paid" | "premium_only";
  isFeatured: boolean;
  durationMinutes: number;
  totalQuestions: number;
  showResultImmediately: boolean;
  showAnswerReview: boolean;
  publishedAt: string | null;
  composition: TryoutCompositionItem[];
  compositionLabel: string | null;
  canStart: boolean;
  lockedReason: string | null;
}

export interface ActiveExamSummary {
  hasActiveExam: boolean;
  examSessionId?: string;
  expiresAt?: string;
  answeredCount?: number;
  totalQuestions?: number;
}

export interface ExamHistoryItem {
  examResultId: string;
  examSessionId: string;
  tryoutName: string;
  examDate: string;
  totalScore: number;
  categoryScores: CategoryScoreSummary[];
  overallPassed: boolean;
  weakestTopic: string | null;
}

export interface ExamResultDetail {
  examResultId: string;
  examSessionId: string;
  tryoutName: string;
  examDate: string;
  score: {
    total: number;
    categories: CategoryScoreSummary[];
  };
  passingGrade: {
    totalMinScore: number;
    categoryMinimums: Array<{
      categoryCode: string;
      categoryName: string;
      minScore: number;
    }>;
  };
  passingStatus: {
    totalPassed: boolean;
    overallPassed: boolean;
    categories: Array<{
      categoryCode: string;
      categoryName: string;
      passed: boolean;
    }>;
  };
  breakdown: Array<{
    category: string;
    categoryName: string;
    subCategory: string;
    topicTag: string;
    difficulty: string;
    totalQuestions: number;
    correctAnswers: number;
    wrongAnswers: number;
    accuracy: number;
  }>;
  aiRecommendationStatus: string;
}

export interface ExamResultAnswerItem {
  number: number;
  category: string;
  categoryName: string;
  subCategory: string;
  topicTag: string;
  difficulty: string;
  questionText: string;
  options: Array<{ label: string; text: string }>;
  selectedLabel: string | null;
  correctLabel: string | null;
  isCorrect: boolean | null;
  scoreAwarded: number;
  explanation: string | null;
}

export interface ExamResultRanking {
  tryoutName: string;
  totalParticipants: number;
  topTen: Array<{
    rank: number;
    displayName: string;
    totalScore: number;
    overallPassed: boolean;
    isCurrentUser: boolean;
  }>;
  currentUser: {
    rank: number;
    displayName: string;
    totalScore: number;
    overallPassed: boolean;
    isInTopTen: boolean;
  } | null;
}

export interface AiRecommendationDetail {
  id: string;
  status: string;
  isFallback: boolean;
  summary: string | null;
  overallAssessment: string | null;
  nextTryoutStrategy: string | null;
  generatedAt: string | null;
  items: Array<{
    priorityOrder: number;
    priorityLevel: string;
    category: string;
    subCategory: string;
    topicTag: string;
    reason: string;
    suggestedFocus: string | string[] | null;
    accuracy: number | null;
    wrongAnswerRate: number | null;
    totalQuestions: number | null;
  }>;
}

export interface SubscriptionPlanItem {
  id: string;
  name: string;
  description: string | null;
  durationDays: number;
  price: number;
  currency: string;
  isTrial: boolean;
  isActive: boolean;
}

export interface MySubscription {
  status: string | null;
  isTrial: boolean;
  planName: string | null;
  startDate: string | null;
  endDate: string | null;
  tryoutLimit: number | null;
  tryoutUsed: number;
  tryoutRemaining: number | null;
  daysRemaining: number;
}

export interface PaymentHistoryItem {
  id: string;
  invoiceNumber: string;
  planName: string;
  amount: number;
  paymentMethod: string | null;
  status: string;
  createdAt: string;
  paymentUrl: string | null;
}

export interface PaymentStatusDetail {
  id: string;
  invoiceNumber: string;
  planName: string;
  amount: number;
  currency: string;
  paymentMethod: string | null;
  status: string;
  paidAt: string | null;
  expiredAt: string | null;
  paymentUrl: string | null;
  subscriptionActivated: boolean;
}

export type ExamSessionDetail =
  | {
      examSessionId: string;
      tryoutName?: string;
      status: "in_progress";
      startedAt: string;
      expiresAt: string;
      timerRemainingSeconds: number;
      /** Jumlah pelanggaran yang tersimpan di DB — tidak akan reset saat refresh */
      tabSwitchCount: number;
      questions: Array<{
        examSessionQuestionId: string;
        number: number;
        category: string;
        categoryName?: string;
        subCategory: string;
        topicTag: string;
        difficulty: "easy" | "medium" | "hard";
        questionText: string;
        options: Array<{ label: "A" | "B" | "C" | "D" | "E"; text: string }>;
        selectedLabel: "A" | "B" | "C" | "D" | "E" | null;
        isFlagged: boolean;
      }>;
      summary: {
        answeredCount: number;
        unansweredCount: number;
        flaggedCount: number;
      };
    }
  | {
      examSessionId: string;
      examResultId: string;
      status: "submitted" | "auto_submitted";
      score: {
        total: number;
        categories: CategoryScoreSummary[];
      };
      passingStatus: {
        totalPassed: boolean;
        overallPassed: boolean;
        categories: Array<{
          categoryCode: string;
          categoryName: string;
          passed: boolean;
        }>;
      };
      aiRecommendationStatus: string;
    };

export async function getUserDashboardSummary() {
  const response = await serverApiFetch<ApiSuccessResponse<UserDashboardSummary>>("/api/v1/dashboard/summary");
  return response.data;
}

export async function getAccessibleTryouts() {
  const response = await serverApiFetch<ApiSuccessResponse<UserTryoutCatalogItem[]>>("/api/v1/dashboard/tryouts");
  return response.data;
}

export async function getQuestionCategories() {
  try {
    const response = await serverApiFetch<ApiSuccessResponse<QuestionCategoryItem[]>>(
      "/api/v1/dashboard/question-categories",
    );
    return response.data;
  } catch {
    return [
      { id: "TWK", code: "TWK", name: "TWK", answerMode: "single_correct", sortOrder: 0 },
      { id: "TIU", code: "TIU", name: "TIU", answerMode: "single_correct", sortOrder: 1 },
      { id: "TKP", code: "TKP", name: "TKP", answerMode: "weighted_options", sortOrder: 2 },
    ] satisfies QuestionCategoryItem[];
  }
}

export async function getActiveExamSummary() {
  const response = await serverApiFetch<ApiSuccessResponse<ActiveExamSummary>>("/api/v1/exams/active");
  return response.data;
}

export async function getExamSessionDetail(examSessionId: string) {
  const response = await serverApiFetch<ApiSuccessResponse<ExamSessionDetail>>(`/api/v1/exams/${examSessionId}`);
  return response.data;
}

export async function getExamHistory(params?: {
  page?: number;
  limit?: number;
  status?: "passed" | "not_passed";
}) {
  try {
    return await serverApiFetch<ApiPaginatedResponse<ExamHistoryItem[]>>(
      `/api/v1/exams/history${toQueryString({
        page: params?.page ?? 1,
        limit: params?.limit ?? 10,
        status: params?.status,
      })}`,
    );
  } catch {
    return {
      success: true as const,
      data: [],
      meta: {
        page: params?.page ?? 1,
        limit: params?.limit ?? 10,
        totalItems: 0,
        totalPages: 0,
      },
    };
  }
}

export async function getExamResultDetail(examResultId: string) {
  const response = await serverApiFetch<ApiSuccessResponse<ExamResultDetail>>(
    `/api/v1/results/${examResultId}`,
  );
  return response.data;
}

export async function getExamResultAnswers(
  examResultId: string,
  params?: {
    page?: number;
    limit?: number;
    category?: string;
    correctness?: "correct" | "wrong" | "empty";
  },
) {
  const response = await serverApiFetch<ApiPaginatedResponse<ExamResultAnswerItem[]>>(
    `/api/v1/results/${examResultId}/answers${toQueryString({
      page: params?.page ?? 1,
      limit: params?.limit ?? 20,
      category: params?.category,
      correctness: params?.correctness,
    })}`,
  );
  return response;
}

export async function getExamResultRanking(examResultId: string) {
  const response = await serverApiFetch<ApiSuccessResponse<ExamResultRanking>>(
    `/api/v1/results/${examResultId}/ranking`,
  );
  return response.data;
}

export async function getExamAiRecommendation(examResultId: string) {
  const requestHeaders = await import("next/headers").then((mod) => mod.headers());
  const cookie = requestHeaders.get("cookie");
  const response = await fetch(`${SERVER_BACKEND_API_URL}/api/v1/results/${examResultId}/ai-recommendation`, {
    method: "GET",
    headers: cookie ? { cookie } : undefined,
    cache: "no-store",
  });

  if (response.status === 202) {
    return null;
  }

  if (!response.ok) {
    return null;
  }

  const payload = (await response.json()) as ApiSuccessResponse<AiRecommendationDetail>;
  return payload.data;
}

export async function getSubscriptionPlans() {
  const response = await serverApiFetch<ApiSuccessResponse<SubscriptionPlanItem[]>>("/api/v1/subscription-plans");
  return response.data;
}

export async function getMySubscription() {
  const response = await serverApiFetch<ApiSuccessResponse<MySubscription>>("/api/v1/subscriptions/me");
  return response.data;
}

export async function getPaymentStatus(paymentTransactionId: string) {
  const response = await serverApiFetch<ApiSuccessResponse<PaymentStatusDetail>>(
    `/api/v1/payments/${paymentTransactionId}`,
  );
  return response.data;
}

export async function getMyPaymentHistory(params?: { page?: number; limit?: number }) {
  try {
    return await serverApiFetch<ApiPaginatedResponse<PaymentHistoryItem[]>>(
      `/api/v1/payments/me${toQueryString({
        page: params?.page ?? 1,
        limit: params?.limit ?? 10,
      })}`,
    );
  } catch {
    return {
      success: true as const,
      data: [],
      meta: {
        page: params?.page ?? 1,
        limit: params?.limit ?? 10,
        totalItems: 0,
        totalPages: 0,
      },
    };
  }
}
