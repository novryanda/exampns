import "server-only";

import { type ApiPaginatedResponse, type ApiSuccessResponse, serverApiFetch, toQueryString } from "@/server/api-client";

export interface QuestionCategorySummary {
  id?: string;
  code: string;
  name: string;
  answerMode: "single_correct" | "weighted_options";
  isActive: boolean;
  sortOrder: number;
}

export interface AdminContentDashboardSummary {
  totalQuestions: number;
  activeQuestions: number;
  pendingParsedQuestions: number;
  draftTryouts: number;
  submittedReviewTryouts: number;
  failedPdfBatches: number;
  questionDistribution: Array<{
    category: string;
    categoryName?: string;
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

export interface QuestionBankDistributionItem {
  key: string;
  count: number;
  percentage: number;
}

export interface QuestionBankOverview {
  totalQuestions: number;
  activeQuestions: number;
  inactiveQuestions: number;
  totalSubCategories: number;
  totalTopicTags: number;
  categoryDistribution: QuestionBankDistributionItem[];
  statusDistribution: QuestionBankDistributionItem[];
  statusPeriod: "7d" | "all";
  difficultyDistribution: QuestionBankDistributionItem[];
  topTopicTags: Array<{
    id: string;
    name: string;
    category: string;
    subCategory: string;
    questionCount: number;
  }>;
}

export interface QuestionListItem {
  id: string;
  questionPreview: string;
  category: string;
  categoryName?: string;
  answerMode?: "single_correct" | "weighted_options";
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
  category: string;
  categoryName?: string;
  answerMode?: "single_correct" | "weighted_options";
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
    optionWeight: number | null;
    tkpWeight?: number | null;
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
  category: string | null;
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
  options: Array<{
    label: "A" | "B" | "C" | "D" | "E";
    text: string;
    optionWeight?: number | null;
    tkpWeight?: number | null;
  }>;
  detectedAnswer: "A" | "B" | "C" | "D" | "E" | null;
  category: string | null;
  answerMode?: "single_correct" | "weighted_options";
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
  category: string;
  name: string;
}

export interface QuestionMetadataOptionTopicTag {
  id: string;
  name: string;
  subCategoryId: string;
}

export interface QuestionMetadataOptions {
  categories: QuestionCategorySummary[];
  subCategories: QuestionMetadataOptionSubCategory[];
  topicTags: QuestionMetadataOptionTopicTag[];
}

export interface QuestionMetadataSummary {
  totalSubCategories: number;
  activeSubCategories: number;
  inactiveSubCategories: number;
  totalTopicTags: number;
  activeTopicTags: number;
  inactiveTopicTags: number;
}

export interface QuestionSubCategoryItem {
  id: string;
  category: string;
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
  category: string;
  questionCount: number;
}

export interface QuestionTopicTagQuestionItem {
  id: string;
  questionPreview: string;
  category: string;
  subCategoryId: string;
  topicTagId: string;
  subCategory: string;
  topicTag: string;
  difficulty: "easy" | "medium" | "hard";
  status: "draft" | "pending_review" | "active" | "archived";
  sourceType: "manual" | "pdf_import";
  updatedAt: string;
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
  generationRule: AdminTryoutGenerationRule | null;
  workingManualQuestionSetSummary: AdminWorkingManualQuestionSet | null;
  builderStatus: AdminTryoutBuilderStatus;
}

export interface HybridRuleConfig {
  manualPlacement: "prepend";
}

export interface AdaptiveRuleConfig {
  strategy: "latest_ai_recommendation";
  fallbackStrategy: "generation_rule";
  maxWeakAreas: number;
  perWeakAreaQuestionCap: number;
  includeTrendBoost: boolean;
}

export interface AdminTryoutGenerationSection {
  id?: string;
  category: string;
  questionCount: number;
  difficultyDistributionJson: Partial<Record<"easy" | "medium" | "hard", number>> | null;
  topicDistributionJson: Array<{ topicTag: string; questionCount: number }> | null;
  sortOrder: number;
}

export interface AdminTryoutGenerationRule {
  id: string;
  randomizationMode:
    | "random_by_category"
    | "random_by_category_and_difficulty"
    | "random_by_topic_distribution"
    | "manual_question_set"
    | "hybrid_manual_and_random"
    | "adaptive_weak_area";
  questionOrderMode: "category_order" | "mixed_random" | "manual_order";
  avoidRecentQuestions: boolean;
  avoidRecentExamCount: number;
  rulesJson: HybridRuleConfig | AdaptiveRuleConfig | Record<string, unknown> | null;
  sections: AdminTryoutGenerationSection[];
}

export interface AdminWorkingManualQuestionSet {
  id: string;
  name: string;
  description: string | null;
  status: "draft" | "review" | "approved" | "archived";
  questionIds: string[];
  itemCount: number;
  updatedAt: string;
  items: Array<{
    order: number;
    question: {
      id: string;
      questionPreview: string;
      category: string;
      categoryName?: string;
      subCategory: string;
      topicTag: string;
      difficulty: "easy" | "medium" | "hard";
      status: "draft" | "pending_review" | "active" | "archived";
    };
  }>;
}

export interface AdminTryoutBuilderStatus {
  isStructurallyValid: boolean;
  missingParts: string[];
  modeSpecificWarnings: string[];
}

export interface AdminTryoutAvailabilityCheck {
  isReady: boolean;
  issues: string[];
  checks: Record<string, unknown>;
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

export async function getAdminQuestionBankOverview(params?: { statusPeriod?: "7d" | "all" }) {
  const response = await serverApiFetch<ApiSuccessResponse<QuestionBankOverview>>(
    `/api/v1/admin/questions/overview${toQueryString({
      statusPeriod: params?.statusPeriod,
    })}`,
  );
  return response.data;
}

export async function getAdminQuestionDetail(questionId: string) {
  const response = await serverApiFetch<ApiSuccessResponse<QuestionDetail>>(`/api/v1/admin/questions/${questionId}`);
  return {
    ...response.data,
    options: response.data.options.map((option) => ({
      ...option,
      tkpWeight: option.optionWeight,
    })),
  };
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
  return {
    ...response.data,
    options: response.data.options.map((option) => ({
      ...option,
      tkpWeight: option.optionWeight,
    })),
  };
}

export async function getAdminQuestionMetadataOptions(params?: { category?: string; subCategoryId?: string }) {
  const response = await serverApiFetch<ApiSuccessResponse<QuestionMetadataOptions>>(
    `/api/v1/admin/question-metadata/options${toQueryString({
      category: params?.category,
      subCategoryId: params?.subCategoryId,
    })}`,
  );
  return response.data;
}

export async function getSuperAdminQuestionCategories() {
  const response = await serverApiFetch<ApiSuccessResponse<QuestionCategorySummary[]>>(
    "/api/v1/super-admin/question-categories",
  );
  return response.data;
}

export async function getAdminQuestionMetadataSummary(params?: { category?: string }) {
  const response = await serverApiFetch<ApiSuccessResponse<QuestionMetadataSummary>>(
    `/api/v1/admin/question-metadata/summary${toQueryString({
      category: params?.category,
    })}`,
  );
  return response.data;
}

export async function getAdminQuestionSubCategories(params?: {
  category?: string;
  search?: string;
  includeInactive?: boolean;
  page?: number;
  limit?: number;
}) {
  const response = await serverApiFetch<ApiPaginatedResponse<QuestionSubCategoryItem[]>>(
    `/api/v1/admin/question-metadata/sub-categories${toQueryString({
      category: params?.category,
      search: params?.search,
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
  search?: string;
  includeInactive?: boolean;
  page?: number;
  limit?: number;
}) {
  const response = await serverApiFetch<ApiPaginatedResponse<QuestionTopicTagItem[]>>(
    `/api/v1/admin/question-metadata/topic-tags${toQueryString({
      category: params?.category,
      subCategoryId: params?.subCategoryId,
      search: params?.search,
      includeInactive: params?.includeInactive,
      page: params?.page,
      limit: params?.limit,
    })}`,
  );
  return response;
}

export async function getAdminTopicTagQuestions(
  topicTagId: string,
  params?: {
    search?: string;
    page?: number;
    limit?: number;
  },
) {
  const response = await serverApiFetch<ApiPaginatedResponse<QuestionTopicTagQuestionItem[]>>(
    `/api/v1/admin/question-metadata/topic-tags/${topicTagId}/questions${toQueryString({
      search: params?.search,
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
  return await getTryoutBuilderDetail("admin", tryoutDraftId);
}

export async function getTryoutBuilderDetail(scope: "admin" | "super-admin", tryoutId: string) {
  const basePath = scope === "super-admin" ? "/api/v1/super-admin/tryout-catalogs" : "/api/v1/admin/tryout-drafts";
  const response = await serverApiFetch<ApiSuccessResponse<AdminTryoutDraftDetail>>(`${basePath}/${tryoutId}`);
  return response.data;
}

export async function getAdminTryoutDraftGenerationRule(tryoutDraftId: string) {
  return await getTryoutBuilderGenerationRule("admin", tryoutDraftId);
}

export async function getTryoutBuilderGenerationRule(scope: "admin" | "super-admin", tryoutId: string) {
  const basePath = scope === "super-admin" ? "/api/v1/super-admin/tryout-catalogs" : "/api/v1/admin/tryout-drafts";
  const response = await serverApiFetch<ApiSuccessResponse<AdminTryoutGenerationRule | null>>(
    `${basePath}/${tryoutId}/generation-rule`,
  );
  return response.data;
}

export async function getAdminTryoutDraftManualQuestionSet(tryoutDraftId: string) {
  return await getTryoutBuilderManualQuestionSet("admin", tryoutDraftId);
}

export async function getTryoutBuilderManualQuestionSet(scope: "admin" | "super-admin", tryoutId: string) {
  const basePath = scope === "super-admin" ? "/api/v1/super-admin/tryout-catalogs" : "/api/v1/admin/tryout-drafts";
  const response = await serverApiFetch<ApiSuccessResponse<AdminWorkingManualQuestionSet | null>>(
    `${basePath}/${tryoutId}/manual-question-set`,
  );
  return response.data;
}

export async function getAdminTryoutDraftAvailabilityCheck(tryoutDraftId: string) {
  return await getTryoutBuilderAvailabilityCheck("admin", tryoutDraftId);
}

export async function getTryoutBuilderAvailabilityCheck(scope: "admin" | "super-admin", tryoutId: string) {
  const basePath = scope === "super-admin" ? "/api/v1/super-admin/tryout-catalogs" : "/api/v1/admin/tryout-drafts";
  const response = await serverApiFetch<ApiSuccessResponse<AdminTryoutAvailabilityCheck>>(
    `${basePath}/${tryoutId}/availability-check`,
  );
  return response.data;
}

export async function getAdminAuditActivity(params?: Record<string, string | number | undefined>) {
  return await serverApiFetch<ApiPaginatedResponse<AuditActivityItem[]>>(
    `/api/v1/admin/audit-logs/me${toQueryString(params ?? {})}`,
  );
}
