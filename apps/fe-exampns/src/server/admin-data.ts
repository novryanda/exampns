import "server-only";

import { type ApiPaginatedResponse, type ApiSuccessResponse, serverApiFetch, toQueryString } from "@/server/api-client";

export interface AdminDashboardSummary {
  totalUsers: number;
  activeSubscribers: number;
  totalQuestions: number;
  pendingReviewQuestions: number;
  paymentPending: number;
  monthlyRevenue: number;
  recentImportBatches: Array<{
    batchId: string;
    fileName: string;
    status: string;
    totalDetected: number;
    validCount: number;
    invalidCount: number;
    createdAt: string;
  }>;
  recentTransactions: Array<{
    id: string;
    invoiceNumber: string;
    userName: string;
    userEmail: string;
    planName: string;
    amount: number;
    paymentMethod: string | null;
    status: string;
    createdAt: string;
    paidAt: string | null;
  }>;
}

export interface AdminUserItem {
  id: string;
  fullName: string;
  email: string;
  image?: string | null;
  status: "active" | "inactive" | "suspended";
  subscriptionStatus: "active" | "expired" | "trial";
  effectiveAccessLevel: "expired" | "trial" | "standard" | "premium";
  effectiveAccessSource: "none" | "override" | "trial_subscription" | "standard_subscription" | "premium_subscription";
  totalExams: number;
  lastActiveAt: string | null;
}

export interface AdminUserDetail {
  id: string;
  fullName: string;
  email: string;
  image?: string | null;
  phone: string | null;
  status: "active" | "inactive" | "suspended";
  effectiveAccessLevel: "expired" | "trial" | "standard" | "premium";
  effectiveAccessSource: "none" | "override" | "trial_subscription" | "standard_subscription" | "premium_subscription";
  subscription: {
    status: "active" | "expired" | "trial";
    tier: "trial" | "standard" | "premium";
    planName: string;
    endDate: string;
    tryoutUsed: number;
    tryoutLimit: number | null;
  } | null;
  accessOverrides: UserAccessOverrideItem[];
  examSummary: {
    totalExams: number;
    averageScore: number;
    lastExamAt: string | null;
  };
}

export interface UserAccessOverrideItem {
  id: string;
  tier: "standard" | "premium";
  startsAt: string;
  expiresAt: string;
  reason: string;
  revokedAt: string | null;
  grantedBy: string;
  revokedBy: string | null;
  createdAt?: string;
}

export interface SuperAdminAccountItem {
  id: string;
  fullName: string;
  email: string;
  image?: string | null;
  status: "active" | "inactive" | "suspended";
  lastLoginAt: string | null;
}

export interface AdminTransactionItem {
  id: string;
  invoiceNumber: string;
  userName: string;
  userEmail: string;
  planName: string;
  amount: number;
  paymentMethod: string | null;
  status: "pending" | "success" | "failed" | "expired" | "cancelled" | "refunded";
  createdAt: string;
  paidAt: string | null;
}

export interface TryoutCatalogItem {
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

export interface AiRecommendationSettings {
  enabled: boolean;
  fallbackEnabled: boolean;
  providerName: string;
  timeoutSeconds: number;
  weakAreaAccuracyThreshold: number;
  minimumQuestionsPerTopic: number;
  maxWeakAreas: number;
  priorityScoreFormula: string;
  showSummary: boolean;
  showWeakAreas: boolean;
  showNextTryoutStrategy: boolean;
  enableResultPageBanner: boolean;
  errorNotification: boolean;
  retryFailedJob: boolean;
  logLevel: "debug" | "info" | "warn" | "error";
  status: "active" | "degraded";
  n8nConnected: boolean;
  lastUpdatedAt: string | null;
  aiJobsToday: number;
  failedAiJobsToday: number;
  successRateToday: number;
}

export interface PassingGradeConfig {
  id: string;
  name: string;
  twkMinScore: number;
  tiuMinScore: number;
  tkpMinScore: number;
  totalMinScore: number;
  isActive: boolean;
  effectiveFrom: string;
}

export interface TrialConfig {
  id: string;
  name: string;
  freeTryoutCount: number;
  trialDurationDays: number;
  isActive: boolean;
}

export interface SubscriptionPlanItem {
  id: string;
  name: string;
  description: string | null;
  tier: "trial" | "standard" | "premium";
  durationDays: number;
  price: number;
  currency: string;
  isActive: boolean;
  isTrial: boolean;
  trialTryoutLimit: number | null;
  trialDayLimit: number | null;
  features: string[];
  isPopular: boolean;
  showOnLandingPage: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function getAdminDashboardSummary() {
  const response = await serverApiFetch<ApiSuccessResponse<AdminDashboardSummary>>("/api/v1/admin/dashboard/summary");
  return response.data;
}

export async function getAdminUsers(params?: {
  search?: string;
  status?: string;
  subscriptionStatus?: string;
  page?: number;
  limit?: number;
}) {
  const response = await serverApiFetch<ApiPaginatedResponse<AdminUserItem[]>>(
    `/api/v1/admin/users${toQueryString({
      search: params?.search,
      status: params?.status,
      subscriptionStatus: params?.subscriptionStatus,
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
    })}`,
  );

  return response;
}

export async function getAdminUserDetail(userId: string) {
  const response = await serverApiFetch<ApiSuccessResponse<AdminUserDetail>>(`/api/v1/admin/users/${userId}`);
  return response.data;
}

export async function getSuperAdminAccounts(params?: {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  const response = await serverApiFetch<ApiPaginatedResponse<SuperAdminAccountItem[]>>(
    `/api/v1/super-admin/admins${toQueryString({
      search: params?.search,
      status: params?.status,
      page: params?.page ?? 1,
      limit: params?.limit ?? 20,
    })}`,
  );
  return response;
}

export async function getAdminTransactions(params?: {
  search?: string;
  status?: string;
  paymentMethod?: string;
  page?: number;
  limit?: number;
}) {
  const response = await serverApiFetch<ApiPaginatedResponse<AdminTransactionItem[]>>(
    `/api/v1/admin/transactions${toQueryString({
      search: params?.search,
      status: params?.status,
      paymentMethod: params?.paymentMethod,
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
    })}`,
  );

  return response;
}

export async function getTryoutCatalogs(params?: {
  search?: string;
  tryoutType?: string;
  accessType?: string;
  status?: string;
  page?: number;
  limit?: number;
}) {
  const response = await serverApiFetch<ApiPaginatedResponse<TryoutCatalogItem[]>>(
    `/api/v1/super-admin/tryout-catalogs${toQueryString({
      search: params?.search,
      tryoutType: params?.tryoutType,
      accessType: params?.accessType,
      status: params?.status,
      page: params?.page ?? 1,
      limit: params?.limit ?? 10,
    })}`,
  );

  return response;
}

export async function getAiRecommendationSettings() {
  const response = await serverApiFetch<ApiSuccessResponse<AiRecommendationSettings>>(
    "/api/v1/super-admin/ai-recommendation-settings",
  );
  return response.data;
}

export async function getPassingGradeConfig() {
  const response = await serverApiFetch<ApiSuccessResponse<PassingGradeConfig>>("/api/v1/super-admin/passing-grade");
  return response.data;
}

export async function getTrialConfig() {
  const response = await serverApiFetch<ApiSuccessResponse<TrialConfig>>("/api/v1/super-admin/trial-config");
  return response.data;
}

export async function getSubscriptionPlans() {
  const response = await serverApiFetch<ApiSuccessResponse<SubscriptionPlanItem[]>>(
    "/api/v1/super-admin/subscription-plans",
  );
  return response.data;
}

export async function getUserAccessOverrides(userId: string) {
  const response = await serverApiFetch<ApiSuccessResponse<UserAccessOverrideItem[]>>(
    `/api/v1/super-admin/users/${userId}/access-overrides`,
  );
  return response.data;
}
