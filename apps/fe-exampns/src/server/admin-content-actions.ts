"use server";

import "server-only";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

import { BACKEND_API_URL } from "@/lib/auth/config";
import {
  serverApiFetch,
  type ApiSuccessResponse,
} from "@/server/api-client";
import type { ResourceActionState } from "@/server/admin-action-state";

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

function buildQuestionPayload(formData: FormData) {
  const category = String(formData.get("category") ?? "TWK") as "TWK" | "TIU" | "TKP";
  const correctAnswer = String(formData.get("correctAnswer") ?? "A");

  return {
    questionText: String(formData.get("questionText") ?? "").trim(),
    category,
    subCategory: String(formData.get("subCategory") ?? "").trim(),
    topicTag: String(formData.get("topicTag") ?? "").trim(),
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

function revalidateAdminContentPaths() {
  const paths = [
    "/admin/dashboard",
    "/admin/bank-soal",
    "/admin/upload-pdf",
    "/admin/review-parsing",
    "/admin/tryout-drafts",
    "/admin/audit-aktivitas",
  ];

  for (const path of paths) {
    revalidatePath(path);
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
    await serverApiFetch<{ success: true; message?: string }>(
      `/api/v1/admin/parsed-questions/${parsedQuestionId}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          questionText: String(formData.get("questionText") ?? "").trim(),
          options: optionLabels.map((label) => ({
            label,
            text: String(formData.get(`optionText${label}`) ?? "").trim(),
          })),
          detectedAnswer: String(formData.get("detectedAnswer") ?? "A"),
          category: String(formData.get("category") ?? "TWK"),
          subCategory: String(formData.get("subCategory") ?? "").trim(),
          topicTag: String(formData.get("topicTag") ?? "").trim(),
          difficulty: String(formData.get("difficulty") ?? "medium"),
        }),
      },
    );

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
          reviewNotes: String(formData.get("reviewNotes") ?? "").trim(),
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
    const response = await serverApiFetch<ApiSuccessResponse<{ id: string; status: string }>>(
      "/api/v1/admin/tryout-drafts",
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(buildTryoutDraftPayload(formData)),
      },
    );

    revalidateAdminContentPaths();

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

export async function updateTryoutDraftAction(
  _previousState: ResourceActionState,
  formData: FormData,
): Promise<ResourceActionState> {
  try {
    const tryoutDraftId = String(formData.get("tryoutDraftId") ?? "");
    await serverApiFetch<{ success: true; message?: string }>(
      `/api/v1/admin/tryout-drafts/${tryoutDraftId}`,
      {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(buildTryoutDraftPayload(formData)),
      },
    );

    revalidateAdminContentPaths();

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

export async function duplicateTryoutDraftAction(tryoutDraftId: string) {
  await serverApiFetch<{ success: true; message?: string }>(
    `/api/v1/admin/tryout-drafts/${tryoutDraftId}/duplicate`,
    {
      method: "POST",
    },
  );
  revalidateAdminContentPaths();
}

export async function submitTryoutDraftAction(tryoutDraftId: string) {
  await serverApiFetch<{ success: true; message?: string }>(
    `/api/v1/admin/tryout-drafts/${tryoutDraftId}/submit`,
    {
      method: "POST",
    },
  );
  revalidateAdminContentPaths();
}
