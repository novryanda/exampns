"use server";

import "server-only";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { BACKEND_API_URL } from "@/lib/auth/config";
import type { ResourceActionState } from "@/server/admin-action-state";
import { type ApiSuccessResponse, serverApiFetch } from "@/server/api-client";

const optionLabels = ["A", "B", "C", "D", "E"] as const;

function parseBoolean(value: FormDataEntryValue | null) {
  return value === "on" || value === "true" || value === "1";
}

function parseNumber(value: FormDataEntryValue | null, fallback = 0) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function optionalString(value: FormDataEntryValue | null) {
  const text = String(value ?? "").trim();
  return text.length > 0 ? text : undefined;
}

function buildParsedQuestionUpdatePayload(formData: FormData) {
  const category = String(formData.get("category") ?? "TWK");

  return {
    questionText: String(formData.get("questionText") ?? "").trim(),
    options: optionLabels.map((label) => ({
      label,
      text: String(formData.get(`optionText${label}`) ?? "").trim(),
      ...(category === "TKP" ? { tkpWeight: parseNumber(formData.get(`optionWeight${label}`), 1) } : {}),
    })),
    detectedAnswer: category === "TKP" ? null : String(formData.get("detectedAnswer") ?? "A"),
    category,
    resolvedSubCategoryId: String(formData.get("resolvedSubCategoryId") ?? "").trim() || undefined,
    resolvedTopicTagId: String(formData.get("resolvedTopicTagId") ?? "").trim() || undefined,
    difficulty: String(formData.get("difficulty") ?? "medium"),
  };
}

function buildQuestionPayload(formData: FormData) {
  const category = String(formData.get("category") ?? "TWK") as "TWK" | "TIU" | "TKP";
  const correctAnswer = String(formData.get("correctAnswer") ?? "A");

  return {
    questionText: String(formData.get("questionText") ?? "").trim(),
    category,
    subCategoryId: String(formData.get("subCategoryId") ?? "").trim(),
    topicTagId: String(formData.get("topicTagId") ?? "").trim(),
    competencyArea: optionalString(formData.get("competencyArea")) ?? "",
    difficulty: String(formData.get("difficulty") ?? "medium"),
    status: String(formData.get("status") ?? "draft"),
    explanation: optionalString(formData.get("explanation")) ?? "",
    options: optionLabels.map((label) => ({
      label,
      text: String(formData.get(`optionText${label}`) ?? "").trim(),
      ...(category === "TKP"
        ? { tkpWeight: parseNumber(formData.get(`optionWeight${label}`), 1) }
        : { isCorrect: correctAnswer === label }),
    })),
  };
}

function buildTryoutDraftPayload(formData: FormData) {
  return {
    name: String(formData.get("name") ?? "").trim(),
    description: optionalString(formData.get("description")) ?? "",
    tryoutType: String(formData.get("tryoutType") ?? "generated"),
    accessType: String(formData.get("accessType") ?? "trial_and_paid"),
    status: String(formData.get("status") ?? "draft"),
    isFeatured: parseBoolean(formData.get("isFeatured")),
    isPublic: false,
    sortOrder: parseNumber(formData.get("sortOrder"), 0),
    durationMinutes: parseNumber(formData.get("durationMinutes"), 100),
    totalQuestions: parseNumber(formData.get("totalQuestions"), 110),
    showResultImmediately: parseBoolean(formData.get("showResultImmediately")),
    showAnswerReview: parseBoolean(formData.get("showAnswerReview")),
  };
}

function resolveTryoutBuilderScope(formData: FormData) {
  return String(formData.get("scope") ?? "admin") === "super-admin" ? "super-admin" : "admin";
}

function getTryoutApiBasePath(scope: "admin" | "super-admin") {
  return scope === "super-admin" ? "/api/v1/super-admin/tryout-catalogs" : "/api/v1/admin/tryout-drafts";
}

function getTryoutListPath(scope: "admin" | "super-admin") {
  return scope === "super-admin" ? "/super-admin/tryout-catalog" : "/admin/tryout-drafts";
}

function getTryoutEditPath(scope: "admin" | "super-admin", tryoutId: string) {
  return scope === "super-admin"
    ? `/super-admin/tryout-catalog/${tryoutId}/edit`
    : `/admin/tryout-drafts/${tryoutId}/edit`;
}

function parseJsonField<T>(value: FormDataEntryValue | null, fallback: T): T {
  const text = String(value ?? "").trim();
  if (!text) {
    return fallback;
  }

  try {
    return JSON.parse(text) as T;
  } catch {
    return fallback;
  }
}

function buildTryoutGenerationRulePayload(formData: FormData) {
  const randomizationMode = String(formData.get("randomizationMode") ?? "random_by_category");
  const rawSections = parseJsonField<
    Array<{
      category: "TWK" | "TIU" | "TKP";
      questionCount: number;
      difficultyDistribution?: Partial<Record<"easy" | "medium" | "hard", number>>;
      topicDistribution?: Array<{ topicTag: string; questionCount: number }>;
      sortOrder?: number;
    }>
  >(formData.get("sectionsJson"), []);
  const sections = rawSections.map((section) => {
    const topicDistribution = section.topicDistribution?.filter((item) => item.questionCount > 0) ?? [];
    const difficultyDistribution =
      section.difficultyDistribution && Object.values(section.difficultyDistribution).some((value) => (value ?? 0) > 0)
        ? section.difficultyDistribution
        : undefined;

    if (randomizationMode === "random_by_category") {
      return {
        category: section.category,
        questionCount: section.questionCount,
        sortOrder: section.sortOrder,
      };
    }

    if (randomizationMode === "random_by_topic_distribution") {
      return {
        category: section.category,
        questionCount: section.questionCount,
        topicDistribution,
        sortOrder: section.sortOrder,
      };
    }

    return {
      category: section.category,
      questionCount: section.questionCount,
      ...(difficultyDistribution ? { difficultyDistribution } : {}),
      ...(topicDistribution.length > 0 ? { topicDistribution } : {}),
      sortOrder: section.sortOrder,
    };
  });

  const tryoutType = String(formData.get("tryoutType") ?? "generated");
  const baseRulesJson = parseJsonField<Record<string, unknown>>(formData.get("rulesJson"), {});

  const rulesJson =
    tryoutType === "hybrid"
      ? {
          manualPlacement: "prepend",
          ...baseRulesJson,
        }
      : tryoutType === "adaptive"
        ? {
            strategy: "latest_ai_recommendation",
            fallbackStrategy: "generation_rule",
            maxWeakAreas: parseNumber(formData.get("maxWeakAreas"), 3),
            perWeakAreaQuestionCap: parseNumber(formData.get("perWeakAreaQuestionCap"), 5),
            includeTrendBoost: parseBoolean(formData.get("includeTrendBoost")),
            ...baseRulesJson,
          }
        : Object.keys(baseRulesJson).length > 0
          ? baseRulesJson
          : undefined;

  return {
    randomizationMode,
    questionOrderMode: String(formData.get("questionOrderMode") ?? "mixed_random"),
    avoidRecentQuestions: parseBoolean(formData.get("avoidRecentQuestions")),
    avoidRecentExamCount: parseNumber(formData.get("avoidRecentExamCount"), 0),
    ...(rulesJson ? { rulesJson } : {}),
    sections,
  };
}

function buildManualQuestionSetPayload(formData: FormData) {
  const questionIds = parseJsonField<string[]>(formData.get("questionIdsJson"), []).filter(Boolean);

  return {
    name: String(formData.get("name") ?? "").trim(),
    description: optionalString(formData.get("description")) ?? "",
    status: String(formData.get("status") ?? "draft"),
    questionIds,
  };
}

function revalidateAdminContentPaths() {
  const paths = [
    "/admin/dashboard",
    "/admin/bank-soal",
    "/admin/upload-pdf",
    "/admin/review-parsing",
    "/admin/tryout-drafts",
    "/admin/audit-aktivitas",
    "/admin/metadata-soal",
  ];

  for (const path of paths) {
    revalidatePath(path);
  }
}

function revalidateTryoutBuilderPaths(scope: "admin" | "super-admin", tryoutId?: string) {
  revalidateAdminContentPaths();
  revalidatePath(getTryoutListPath(scope));
  if (tryoutId) {
    revalidatePath(getTryoutEditPath(scope, tryoutId));
  }
}

export async function createQuestionAction(
  _previousState: ResourceActionState,
  formData: FormData,
): Promise<ResourceActionState> {
  try {
    const response = await serverApiFetch<ApiSuccessResponse<{ id: string; status: string }>>(
      "/api/v1/admin/questions",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(buildQuestionPayload(formData)),
      },
    );

    revalidateAdminContentPaths();

    return {
      status: "success",
      message: response.message ?? "Soal berhasil dibuat.",
      resourceId: response.data.id,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Gagal membuat soal.",
    };
  }
}

export async function updateQuestionAction(
  _previousState: ResourceActionState,
  formData: FormData,
): Promise<ResourceActionState> {
  try {
    const questionId = String(formData.get("questionId") ?? "");
    await serverApiFetch<{ success: true; message?: string }>(`/api/v1/admin/questions/${questionId}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(buildQuestionPayload(formData)),
    });

    revalidateAdminContentPaths();
    revalidatePath(`/admin/bank-soal/${questionId}/edit`);

    return {
      status: "success",
      message: "Soal berhasil diperbarui.",
      resourceId: questionId,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Gagal memperbarui soal.",
    };
  }
}

export async function archiveQuestionAction(questionId: string) {
  await serverApiFetch<{ success: true; message?: string }>(`/api/v1/admin/questions/${questionId}`, {
    method: "DELETE",
  });
  revalidateAdminContentPaths();
}

export async function toggleQuestionStatusAction(questionId: string, nextStatus: "active" | "archived") {
  await serverApiFetch<{ success: true; message?: string }>(`/api/v1/admin/questions/${questionId}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      status: nextStatus,
    }),
  });
  revalidateAdminContentPaths();
  revalidatePath(`/admin/bank-soal/${questionId}/edit`);
}

export async function uploadPdfAction(
  _previousState: ResourceActionState,
  formData: FormData,
): Promise<ResourceActionState> {
  try {
    const requestHeaders = await headers();
    const cookie = requestHeaders.get("cookie") ?? "";
    const response = await fetch(`${BACKEND_API_URL}/api/v1/admin/pdf-imports`, {
      method: "POST",
      headers: cookie ? { cookie } : undefined,
      body: formData,
      cache: "no-store",
    });

    if (!response.ok) {
      const payload = (await response.json().catch(() => null)) as { message?: string } | null;
      throw new Error(payload?.message ?? "Gagal mengunggah PDF.");
    }

    const payload = (await response.json()) as ApiSuccessResponse<{ batchId: string }>;
    revalidateAdminContentPaths();

    return {
      status: "success",
      message: payload.message ?? "PDF diterima dan sedang diproses.",
      resourceId: payload.data.batchId,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Gagal mengunggah PDF.",
    };
  }
}

export async function updateParsedQuestionAction(
  _previousState: ResourceActionState,
  formData: FormData,
): Promise<ResourceActionState> {
  try {
    const parsedQuestionId = String(formData.get("parsedQuestionId") ?? "");
    await serverApiFetch<{ success: true; message?: string }>(`/api/v1/admin/parsed-questions/${parsedQuestionId}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(buildParsedQuestionUpdatePayload(formData)),
    });

    revalidateAdminContentPaths();

    return {
      status: "success",
      message: "Parsed question berhasil diperbarui.",
      resourceId: parsedQuestionId,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Gagal memperbarui parsed question.",
    };
  }
}

export async function approveParsedQuestionAction(
  _previousState: ResourceActionState,
  formData: FormData,
): Promise<ResourceActionState> {
  try {
    const parsedQuestionId = String(formData.get("parsedQuestionId") ?? "");
    await serverApiFetch<{ success: true; message?: string }>(
      `/api/v1/admin/parsed-questions/${parsedQuestionId}/approve`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          reviewNotes: String(formData.get("reviewNotes") ?? "").trim(),
          status: String(formData.get("approvedStatus") ?? "active"),
        }),
      },
    );

    revalidateAdminContentPaths();

    return {
      status: "success",
      message: "Parsed question berhasil di-approve.",
      resourceId: parsedQuestionId,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Gagal approve parsed question.",
    };
  }
}

export async function bulkApproveParsedQuestionsAction(
  _previousState: ResourceActionState,
  formData: FormData,
): Promise<ResourceActionState> {
  try {
    const parsedQuestionIds = formData
      .getAll("parsedQuestionIds")
      .map((value) => String(value).trim())
      .filter(Boolean);

    if (parsedQuestionIds.length === 0) {
      return {
        status: "error",
        message: "Pilih minimal satu hasil parsing untuk disetujui.",
      };
    }

    const response = await serverApiFetch<
      ApiSuccessResponse<{
        totalRequested: number;
        approvedCount: number;
        failedCount: number;
        approvedItems: Array<{ parsedQuestionId: string; questionId: string }>;
        failedItems: Array<{ parsedQuestionId: string; reason: string }>;
      }>
    >("/api/v1/admin/parsed-questions/bulk-approve", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        parsedQuestionIds,
        reviewNotes: String(formData.get("bulkReviewNotes") ?? "").trim(),
        status: String(formData.get("approvedStatus") ?? "active"),
      }),
    });

    revalidateAdminContentPaths();

    if (response.data.approvedCount === 0) {
      const firstFailure = response.data.failedItems[0]?.reason ?? "Tidak ada item yang berhasil disetujui.";
      return {
        status: "error",
        message: firstFailure,
      };
    }

    return {
      status: "success",
      message: response.message ?? `${response.data.approvedCount} parsed question berhasil disetujui.`,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Gagal bulk approve parsed question.",
    };
  }
}

export async function saveAndApproveParsedQuestionAction(
  _previousState: ResourceActionState,
  formData: FormData,
): Promise<ResourceActionState> {
  try {
    const parsedQuestionId = String(formData.get("parsedQuestionId") ?? "");

    await serverApiFetch<{ success: true; message?: string }>(`/api/v1/admin/parsed-questions/${parsedQuestionId}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(buildParsedQuestionUpdatePayload(formData)),
    });

    await serverApiFetch<{ success: true; message?: string }>(
      `/api/v1/admin/parsed-questions/${parsedQuestionId}/approve`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          reviewNotes: String(formData.get("reviewNotes") ?? "").trim(),
          status: String(formData.get("approvedStatus") ?? "active"),
        }),
      },
    );

    revalidateAdminContentPaths();

    return {
      status: "success",
      message: "Parsed question berhasil disimpan dan di-approve.",
      resourceId: parsedQuestionId,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Gagal menyimpan lalu approve parsed question.",
    };
  }
}

export async function rejectParsedQuestionAction(
  _previousState: ResourceActionState,
  formData: FormData,
): Promise<ResourceActionState> {
  try {
    const parsedQuestionId = String(formData.get("parsedQuestionId") ?? "");
    await serverApiFetch<{ success: true; message?: string }>(
      `/api/v1/admin/parsed-questions/${parsedQuestionId}/reject`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          reviewNotes: String(formData.get("rejectReviewNotes") ?? formData.get("reviewNotes") ?? "").trim(),
        }),
      },
    );

    revalidateAdminContentPaths();

    return {
      status: "success",
      message: "Parsed question berhasil ditolak.",
      resourceId: parsedQuestionId,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Gagal menolak parsed question.",
    };
  }
}

export async function createTryoutDraftAction(
  _previousState: ResourceActionState,
  formData: FormData,
): Promise<ResourceActionState> {
  try {
    const scope = resolveTryoutBuilderScope(formData);
    const response = await serverApiFetch<ApiSuccessResponse<{ id: string; status: string }>>(
      getTryoutApiBasePath(scope),
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(buildTryoutDraftPayload(formData)),
      },
    );

    revalidateTryoutBuilderPaths(scope, response.data.id);

    return {
      status: "success",
      message: response.message ?? "Tryout draft berhasil dibuat.",
      resourceId: response.data.id,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Gagal membuat tryout draft.",
    };
  }
}

export async function saveTryoutDraftGenerationRuleAction(
  _previousState: ResourceActionState,
  formData: FormData,
): Promise<ResourceActionState> {
  try {
    const scope = resolveTryoutBuilderScope(formData);
    const tryoutDraftId = String(formData.get("tryoutDraftId") ?? "");
    await serverApiFetch<{ success: true; message?: string }>(
      `${getTryoutApiBasePath(scope)}/${tryoutDraftId}/generation-rule`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(buildTryoutGenerationRulePayload(formData)),
      },
    );

    revalidateTryoutBuilderPaths(scope, tryoutDraftId);

    return {
      status: "success",
      message: "Strategi tryout berhasil disimpan.",
      resourceId: tryoutDraftId,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Gagal menyimpan strategi tryout.",
    };
  }
}

export async function saveTryoutDraftManualQuestionSetAction(
  _previousState: ResourceActionState,
  formData: FormData,
): Promise<ResourceActionState> {
  try {
    const scope = resolveTryoutBuilderScope(formData);
    const tryoutDraftId = String(formData.get("tryoutDraftId") ?? "");
    const payload = buildManualQuestionSetPayload(formData);
    const endpoint = `${getTryoutApiBasePath(scope)}/${tryoutDraftId}/manual-question-set`;
    await serverApiFetch<{ success: true; message?: string }>(endpoint, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });

    revalidateTryoutBuilderPaths(scope, tryoutDraftId);

    return {
      status: "success",
      message: "Manual question set draft berhasil disimpan.",
      resourceId: tryoutDraftId,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Gagal menyimpan manual question set draft.",
    };
  }
}

export async function submitTryoutDraftForReviewAction(
  _previousState: ResourceActionState,
  formData: FormData,
): Promise<ResourceActionState> {
  try {
    const scope = resolveTryoutBuilderScope(formData);
    const tryoutDraftId = String(formData.get("tryoutDraftId") ?? "");
    await serverApiFetch<{ success: true; message?: string }>(
      `${getTryoutApiBasePath(scope)}/${tryoutDraftId}/submit`,
      {
        method: "POST",
      },
    );

    revalidateTryoutBuilderPaths(scope, tryoutDraftId);

    return {
      status: "success",
      message: "Tryout draft berhasil dikirim untuk review.",
      resourceId: tryoutDraftId,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Gagal mengirim tryout draft untuk review.",
    };
  }
}

export async function updateTryoutDraftAction(
  _previousState: ResourceActionState,
  formData: FormData,
): Promise<ResourceActionState> {
  try {
    const scope = resolveTryoutBuilderScope(formData);
    const tryoutDraftId = String(formData.get("tryoutDraftId") ?? "");
    await serverApiFetch<{ success: true; message?: string }>(`${getTryoutApiBasePath(scope)}/${tryoutDraftId}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(buildTryoutDraftPayload(formData)),
    });

    revalidateTryoutBuilderPaths(scope, tryoutDraftId);

    return {
      status: "success",
      message: "Tryout draft berhasil diperbarui.",
      resourceId: tryoutDraftId,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Gagal memperbarui tryout draft.",
    };
  }
}

export async function publishTryoutCatalogAction(
  _previousState: ResourceActionState,
  formData: FormData,
): Promise<ResourceActionState> {
  try {
    const tryoutDraftId = String(formData.get("tryoutDraftId") ?? "");
    await serverApiFetch<{ success: true; message?: string }>(
      `/api/v1/super-admin/tryout-catalogs/${tryoutDraftId}/publish`,
      {
        method: "POST",
      },
    );

    revalidateTryoutBuilderPaths("super-admin", tryoutDraftId);

    return {
      status: "success",
      message: "Tryout berhasil dipublish.",
      resourceId: tryoutDraftId,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Gagal publish tryout.",
    };
  }
}

export async function archiveTryoutCatalogAction(
  _previousState: ResourceActionState,
  formData: FormData,
): Promise<ResourceActionState> {
  try {
    const tryoutDraftId = String(formData.get("tryoutDraftId") ?? "");
    await serverApiFetch<{ success: true; message?: string }>(
      `/api/v1/super-admin/tryout-catalogs/${tryoutDraftId}/archive`,
      {
        method: "POST",
      },
    );

    revalidateTryoutBuilderPaths("super-admin", tryoutDraftId);

    return {
      status: "success",
      message: "Tryout berhasil diarsipkan.",
      resourceId: tryoutDraftId,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Gagal mengarsipkan tryout.",
    };
  }
}

export async function duplicateTryoutDraftAction(tryoutDraftId: string) {
  await serverApiFetch<{ success: true; message?: string }>(`/api/v1/admin/tryout-drafts/${tryoutDraftId}/duplicate`, {
    method: "POST",
  });
  revalidateAdminContentPaths();
}

export async function submitTryoutDraftAction(tryoutDraftId: string) {
  await serverApiFetch<{ success: true; message?: string }>(`/api/v1/admin/tryout-drafts/${tryoutDraftId}/submit`, {
    method: "POST",
  });
  revalidateAdminContentPaths();
}

export async function archiveTryoutDraftAction(tryoutDraftId: string) {
  await serverApiFetch<{ success: true; message?: string }>(`/api/v1/admin/tryout-drafts/${tryoutDraftId}/archive`, {
    method: "POST",
  });
  revalidateAdminContentPaths();
}

export async function createQuestionSubCategoryAction(
  _previousState: ResourceActionState,
  formData: FormData,
): Promise<ResourceActionState> {
  try {
    const response = await serverApiFetch<ApiSuccessResponse<{ id: string }>>(
      "/api/v1/admin/question-metadata/sub-categories",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          category: String(formData.get("category") ?? "TWK"),
          name: String(formData.get("name") ?? "").trim(),
        }),
      },
    );

    revalidateAdminContentPaths();

    return {
      status: "success",
      message: "Sub-kategori berhasil dibuat.",
      resourceId: response.data.id,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Gagal membuat sub-kategori.",
    };
  }
}

export async function updateQuestionSubCategoryAction(
  _previousState: ResourceActionState,
  formData: FormData,
): Promise<ResourceActionState> {
  try {
    const subCategoryId = String(formData.get("subCategoryId") ?? "");
    const isActive = formData.get("isActive");
    const sortOrder = formData.get("sortOrder");
    await serverApiFetch<ApiSuccessResponse<{ id: string }>>(
      `/api/v1/admin/question-metadata/sub-categories/${subCategoryId}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name: String(formData.get("name") ?? "").trim(),
          ...(sortOrder !== null ? { sortOrder: parseNumber(sortOrder, 0) } : {}),
          ...(isActive !== null ? { isActive: parseBoolean(isActive) } : {}),
        }),
      },
    );

    revalidateAdminContentPaths();

    return {
      status: "success",
      message: "Sub-kategori berhasil diperbarui.",
      resourceId: subCategoryId,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Gagal memperbarui sub-kategori.",
    };
  }
}

export async function archiveQuestionSubCategoryAction(subCategoryId: string) {
  await serverApiFetch<{ success: true; message?: string }>(
    `/api/v1/admin/question-metadata/sub-categories/${subCategoryId}`,
    {
      method: "DELETE",
    },
  );
  revalidateAdminContentPaths();
}

export async function toggleQuestionSubCategoryStatusAction(
  _previousState: ResourceActionState,
  formData: FormData,
): Promise<ResourceActionState> {
  try {
    const subCategoryId = String(formData.get("subCategoryId") ?? "");
    const nextActiveState = parseBoolean(formData.get("isActive"));

    await serverApiFetch<ApiSuccessResponse<{ id: string }>>(
      `/api/v1/admin/question-metadata/sub-categories/${subCategoryId}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          isActive: nextActiveState,
        }),
      },
    );

    revalidateAdminContentPaths();

    return {
      status: "success",
      message: nextActiveState ? "Sub-kategori berhasil diaktifkan." : "Sub-kategori berhasil dinonaktifkan.",
      resourceId: subCategoryId,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Gagal mengubah status sub-kategori.",
    };
  }
}

export async function createQuestionTopicTagAction(
  _previousState: ResourceActionState,
  formData: FormData,
): Promise<ResourceActionState> {
  try {
    const response = await serverApiFetch<ApiSuccessResponse<{ id: string }>>(
      "/api/v1/admin/question-metadata/topic-tags",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          subCategoryId: String(formData.get("subCategoryId") ?? "").trim(),
          name: String(formData.get("name") ?? "").trim(),
        }),
      },
    );

    revalidateAdminContentPaths();

    return {
      status: "success",
      message: "Topic tag berhasil dibuat.",
      resourceId: response.data.id,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Gagal membuat topik tag.",
    };
  }
}

export async function updateQuestionTopicTagAction(
  _previousState: ResourceActionState,
  formData: FormData,
): Promise<ResourceActionState> {
  try {
    const topicTagId = String(formData.get("topicTagId") ?? "");
    const isActive = formData.get("isActive");
    const sortOrder = formData.get("sortOrder");
    await serverApiFetch<ApiSuccessResponse<{ id: string }>>(
      `/api/v1/admin/question-metadata/topic-tags/${topicTagId}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          subCategoryId: String(formData.get("subCategoryId") ?? "").trim(),
          name: String(formData.get("name") ?? "").trim(),
          ...(sortOrder !== null ? { sortOrder: parseNumber(sortOrder, 0) } : {}),
          ...(isActive !== null ? { isActive: parseBoolean(isActive) } : {}),
        }),
      },
    );

    revalidateAdminContentPaths();

    return {
      status: "success",
      message: "Topic tag berhasil diperbarui.",
      resourceId: topicTagId,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Gagal memperbarui topik tag.",
    };
  }
}

export async function archiveQuestionTopicTagAction(topicTagId: string) {
  await serverApiFetch<{ success: true; message?: string }>(
    `/api/v1/admin/question-metadata/topic-tags/${topicTagId}`,
    {
      method: "DELETE",
    },
  );
  revalidateAdminContentPaths();
}

export async function toggleQuestionTopicTagStatusAction(
  _previousState: ResourceActionState,
  formData: FormData,
): Promise<ResourceActionState> {
  try {
    const topicTagId = String(formData.get("topicTagId") ?? "");
    const nextActiveState = parseBoolean(formData.get("isActive"));

    await serverApiFetch<ApiSuccessResponse<{ id: string }>>(
      `/api/v1/admin/question-metadata/topic-tags/${topicTagId}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          isActive: nextActiveState,
        }),
      },
    );

    revalidateAdminContentPaths();

    return {
      status: "success",
      message: nextActiveState ? "Topic tag berhasil diaktifkan." : "Topic tag berhasil dinonaktifkan.",
      resourceId: topicTagId,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Gagal mengubah status topik tag.",
    };
  }
}
