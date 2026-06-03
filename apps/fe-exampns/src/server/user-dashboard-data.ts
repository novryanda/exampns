import "server-only";

import { type ApiSuccessResponse, serverApiFetch } from "@/server/api-client";

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
    examDate: string;
    totalScore: number;
    overallPassed: boolean;
  }>;
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

export type ExamSessionDetail =
  | {
      examSessionId: string;
      status: "in_progress";
      startedAt: string;
      expiresAt: string;
      timerRemainingSeconds: number;
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

export async function getActiveExamSummary() {
  const response = await serverApiFetch<ApiSuccessResponse<ActiveExamSummary>>("/api/v1/exams/active");
  return response.data;
}

export async function getExamSessionDetail(examSessionId: string) {
  const response = await serverApiFetch<ApiSuccessResponse<ExamSessionDetail>>(`/api/v1/exams/${examSessionId}`);
  return response.data;
}
