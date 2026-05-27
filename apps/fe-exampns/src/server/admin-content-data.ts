import "server-only";

import {
  serverApiFetch,
  toQueryString,
  type ApiPaginatedResponse,
  type ApiSuccessResponse,
} from "@/server/api-client";

export interface AdminContentDashboardSummary {
  totalQuestions: number;
  activeQuestions: number;
  pendingParsedQuestions: number;
  draftTryouts: number;
  submittedReviewTryouts: number;
  failedPdfBatches: number;
  questionDistribution: Array<{
    category: "TWK" | "TIU" | "TKP";
    activeCount: number;
  }>;
  recentImportBatches: Array<{
    batchId: string;
    fileName: string;
    status: string;
    totalDetected: number;
    validCount: number;
    invalidCount: number;
    createdAt: string;
  }>;
  recentActivity: Array<{
    id: string;
    actorName: string;
    action: string;
    module: string;
    targetType: string | null;
    targetId: string | null;
    createdAt: string;
  }>;
}

export interface QuestionListItem {
  id: string;
  questionPreview: string;
  category: "TWK" | "TIU" | "TKP";
  subCategoryId: string;
  topicTagId: string;
  subCategory: string;
  topicTag: string;
  difficulty: "easy" | "medium" | "hard";
  status: "draft" | "pending_review" | "active" | "archived";
  sourceType: "manual" | "pdf_import";
  updatedAt: string;
}

export interface QuestionDetail {
  id: string;
  questionText: string;
  category: "TWK" | "TIU" | "TKP";
  subCategoryId: string;
  topicTagId: string;
  subCategory: string;
  topicTag: string;
  competencyArea: string | null;
  difficulty: "easy" | "medium" | "hard";
  sourceType: "manual" | "pdf_import";
  status: "draft" | "pending_review" | "active" | "archived";
  explanation: string | null;
  options: Array<{
    id: string;
    label: "A" | "B" | "C" | "D" | "E";
    text: string;
    isCorrect: boolean;
    tkpWeight: number | null;
  }>;
  tags: string[];
}

export interface PdfImportBatchItem {
  batchId: string;
  fileName: string;
  status: "processing" | "completed" | "partial_failed" | "failed";
  totalDetected: number;
  validCount: number;
  invalidCount: number;
  uploadedBy: string;
  createdAt: string;
  completedAt: string | null;
}

export interface ParsedQuestionListItem {
  id: string;
  batchId: string;
  questionPreview: string;
  category: "TWK" | "TIU" | "TKP" | null;
  topicTag: string | null;
  difficulty: "easy" | "medium" | "hard" | null;
  confidenceScore: number | null;
  status: "pending_review" | "approved" | "rejected" | "draft";
  createdAt: string;
}

export interface ParsedQuestionDetail {
  id: string;
  batchId: string;
  questionText: string;
  options: Array<{ label: "A" | "B" | "C" | "D" | "E"; text: string }>;
  detectedAnswer: "A" | "B" | "C" | "D" | "E" | null;
  category: "TWK" | "TIU" | "TKP" | null;
  subCategory: string | null;
  topicTag: string | null;
  resolvedSubCategoryId: string | null;
  resolvedTopicTagId: string | null;
  resolvedSubCategory: string | null;
  resolvedTopicTag: string | null;
  difficulty: "easy" | "medium" | "hard" | null;
  confidenceScore: number | null;
  status: "pending_review" | "approved" | "rejected" | "draft";
  rawAiOutput: unknown;
  reviewNotes: string | null;
  reviewedAt: string | null;
}

export interface QuestionMetadataOptionSubCategory {
  id: string;
  category: "TWK" | "TIU" | "TKP";
  name: string;
}

export interface QuestionMetadataOptionTopicTag {
  id: string;
  name: string;
  subCategoryId: string;
}

export interface QuestionMetadataOptions {
  subCategories: QuestionMetadataOptionSubCategory[];
  topicTags: QuestionMetadataOptionTopicTag[];
}

export interface QuestionSubCategoryItem {
  id: string;
  category: "TWK" | "TIU" | "TKP";
  name: string;
  slug: string;
  isActive: boolean;
  sortOrder: number;
  topicTagCount: number;
  questionCount: number;
}

export interface QuestionTopicTagItem {
  id: string;
  name: string;
  slug: string;
  isActive: boolean;
  sortOrder: number;
  subCategoryId: string;
  subCategory: string;
  category: "TWK" | "TIU" | "TKP";
  questionCount: number;
}

export interface AdminTryoutDraftItem {
  id: string;
  name: string;
  tryoutType: "generated" | "manual" | "hybrid" | "adaptive";
  accessType: "trial_only" | "paid_only" | "trial_and_paid" | "premium_only";
  status: "draft" | "review" | "published" | "archived";
  isPublic: boolean;
  isFeatured: boolean;
  totalQuestions: number;
  durationMinutes: number;
  updatedAt: string;
}

export interface AdminTryoutDraftDetail {
  id: string;
  name: string;
  description: string | null;
  tryoutType: "generated" | "manual" | "hybrid" | "adaptive";
  accessType: "trial_only" | "paid_only" | "trial_and_paid" | "premium_only";
  status: "draft" | "review" | "published" | "archived";
  isFeatured: boolean;
  sortOrder: number;
  durationMinutes: number;
  totalQuestions: number;
  showResultImmediately: boolean;
  showAnswerReview: boolean;
}

export interface AuditActivityItem {
  id: string;
  actorUserId: string | null;
  actorName: string | null;
  actorRole: string;
  action: string;
  module: string;
  targetType: string | null;
  targetId: string | null;
  metadata: unknown;
  createdAt: string;
}

export async function getAdminContentDashboardSummary() {
  const response = await serverApiFetch<ApiSuccessResponse<AdminContentDashboardSummary>>(
    "/api/v1/admin/dashboard/summary",
  );
  return response.data;
}

export async function getAdminQuestions(params?: Record<string, string | number | undefined>) {
  return await serverApiFetch<ApiPaginatedResponse<QuestionListItem[]>>(
    `/api/v1/admin/questions${toQueryString(params ?? {})}`,
  );
}

export async function getAdminQuestionDetail(questionId: string) {
  const response = await serverApiFetch<ApiSuccessResponse<QuestionDetail>>(
    `/api/v1/admin/questions/${questionId}`,
  );
  return response.data;
}

export async function getAdminPdfImportBatches(params?: Record<string, string | number | undefined>) {
  return await serverApiFetch<ApiPaginatedResponse<PdfImportBatchItem[]>>(
    `/api/v1/admin/pdf-imports${toQueryString(params ?? {})}`,
  );
}

export async function getAdminParsedQuestions(params?: Record<string, string | number | undefined>) {
  return await serverApiFetch<ApiPaginatedResponse<ParsedQuestionListItem[]>>(
    `/api/v1/admin/parsed-questions${toQueryString(params ?? {})}`,
  );
}

export async function getAdminParsedQuestionDetail(parsedQuestionId: string) {
  const response = await serverApiFetch<ApiSuccessResponse<ParsedQuestionDetail>>(
    `/api/v1/admin/parsed-questions/${parsedQuestionId}`,
  );
  return response.data;
}

export async function getAdminQuestionMetadataOptions(params?: {
  category?: string;
  subCategoryId?: string;
}) {
  const response = await serverApiFetch<ApiSuccessResponse<QuestionMetadataOptions>>(
    `/api/v1/admin/question-metadata/options${toQueryString({
      category: params?.category,
      subCategoryId: params?.subCategoryId,
    })}`,
  );
  return response.data;
}

export async function getAdminQuestionSubCategories(params?: {
  category?: string;
  includeInactive?: boolean;
  page?: number;
  limit?: number;
}) {
  const response = await serverApiFetch<ApiPaginatedResponse<QuestionSubCategoryItem[]>>(
    `/api/v1/admin/question-metadata/sub-categories${toQueryString({
      category: params?.category,
      includeInactive: params?.includeInactive,
      page: params?.page,
      limit: params?.limit,
    })}`,
  );
  return response;
}

export async function getAdminQuestionTopicTags(params?: {
  category?: string;
  subCategoryId?: string;
  includeInactive?: boolean;
  page?: number;
  limit?: number;
}) {
  const response = await serverApiFetch<ApiPaginatedResponse<QuestionTopicTagItem[]>>(
    `/api/v1/admin/question-metadata/topic-tags${toQueryString({
      category: params?.category,
      subCategoryId: params?.subCategoryId,
      includeInactive: params?.includeInactive,
      page: params?.page,
      limit: params?.limit,
    })}`,
  );
  return response;
}

export async function getAdminTryoutDrafts(params?: Record<string, string | number | undefined>) {
  return await serverApiFetch<ApiPaginatedResponse<AdminTryoutDraftItem[]>>(
    `/api/v1/admin/tryout-drafts${toQueryString(params ?? {})}`,
  );
}

export async function getAdminTryoutDraftDetail(tryoutDraftId: string) {
  const response = await serverApiFetch<ApiSuccessResponse<AdminTryoutDraftDetail>>(
    `/api/v1/admin/tryout-drafts/${tryoutDraftId}`,
  );
  return response.data;
}

export async function getAdminAuditActivity(params?: Record<string, string | number | undefined>) {
  return await serverApiFetch<ApiPaginatedResponse<AuditActivityItem[]>>(
    `/api/v1/admin/audit-logs/me${toQueryString(params ?? {})}`,
  );
}
