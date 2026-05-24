"use server";

import "server-only";

import { revalidatePath } from "next/cache";

import { serverApiFetch } from "@/server/api-client";

export interface AdminActionState {
  status: "idle" | "success" | "error";
  message: string;
}

export const initialAdminActionState: AdminActionState = {
  status: "idle",
  message: "",
};

export interface CreateTryoutActionState extends AdminActionState {
  createdId?: string;
}

export const initialCreateTryoutActionState: CreateTryoutActionState = {
  status: "idle",
  message: "",
};

function parseBoolean(value: FormDataEntryValue | null) {
  return value === "on" || value === "true" || value === "1";
}

function parseNumber(value: FormDataEntryValue | null, fallback: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function distributeByWeights(total: number, weights: number[]) {
  const exactValues = weights.map((weight) => (total * weight) / 100);
  const baseValues = exactValues.map((value) => Math.floor(value));
  let remainder = total - baseValues.reduce((sum, value) => sum + value, 0);

  const rankedIndexes = exactValues
    .map((value, index) => ({
      index,
      fraction: value - Math.floor(value),
    }))
    .sort((left, right) => right.fraction - left.fraction);

  for (const item of rankedIndexes) {
    if (remainder <= 0) {
      break;
    }

    baseValues[item.index] += 1;
    remainder -= 1;
  }

  return baseValues;
}

function buildDefaultGenerationSections(totalQuestions: number) {
  const [twkCount, tiuCount, tkpCount] = distributeByWeights(totalQuestions, [27.27, 40.91, 31.82]);

  const buildDifficultyDistribution = (questionCount: number) => {
    const [easy, medium, hard] = distributeByWeights(questionCount, [30, 50, 20]);
    return { easy, medium, hard };
  };

  const buildTopicDistribution = (
    questionCount: number,
    topics: Array<{ topicTag: string; weight: number }>,
  ) => {
    const counts = distributeByWeights(
      questionCount,
      topics.map((topic) => topic.weight),
    );

    return topics.map((topic, index) => ({
      topicTag: topic.topicTag,
      questionCount: counts[index],
    }));
  };

  return [
    {
      category: "TWK",
      questionCount: twkCount,
      difficultyDistribution: buildDifficultyDistribution(twkCount),
      topicDistribution: buildTopicDistribution(twkCount, [
        { topicTag: "Pancasila", weight: 33.33 },
        { topicTag: "UUD 1945", weight: 33.33 },
        { topicTag: "NKRI", weight: 16.67 },
        { topicTag: "Bhinneka Tunggal Ika", weight: 16.67 },
      ]),
      sortOrder: 0,
    },
    {
      category: "TIU",
      questionCount: tiuCount,
      difficultyDistribution: buildDifficultyDistribution(tiuCount),
      topicDistribution: buildTopicDistribution(tiuCount, [
        { topicTag: "Kemampuan Verbal", weight: 33.33 },
        { topicTag: "Kemampuan Numerik", weight: 33.33 },
        { topicTag: "Kemampuan Penalaran", weight: 33.33 },
      ]),
      sortOrder: 1,
    },
    {
      category: "TKP",
      questionCount: tkpCount,
      difficultyDistribution: buildDifficultyDistribution(tkpCount),
      topicDistribution: buildTopicDistribution(tkpCount, [
        { topicTag: "Pelayanan Publik", weight: 28.57 },
        { topicTag: "Jejaring Kerja", weight: 20 },
        { topicTag: "Sosial Budaya", weight: 20 },
        { topicTag: "Teknologi Informasi", weight: 17.14 },
        { topicTag: "Profesionalisme", weight: 14.29 },
      ]),
      sortOrder: 2,
    },
  ];
}

export async function updateAiRecommendationSettingsAction(
  _previousState: AdminActionState,
  formData: FormData,
): Promise<AdminActionState> {
  try {
    await serverApiFetch<{ success: true; message: string }>("/api/v1/super-admin/ai-recommendation-settings", {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        enabled: parseBoolean(formData.get("enabled")),
        fallbackEnabled: parseBoolean(formData.get("fallbackEnabled")),
        providerName: String(formData.get("providerName") ?? ""),
        timeoutSeconds: parseNumber(formData.get("timeoutSeconds"), 30),
        weakAreaAccuracyThreshold: parseNumber(formData.get("weakAreaAccuracyThreshold"), 60),
        minimumQuestionsPerTopic: parseNumber(formData.get("minimumQuestionsPerTopic"), 5),
        maxWeakAreas: parseNumber(formData.get("maxWeakAreas"), 5),
        priorityScoreFormula: String(formData.get("priorityScoreFormula") ?? ""),
        showSummary: parseBoolean(formData.get("showSummary")),
        showWeakAreas: parseBoolean(formData.get("showWeakAreas")),
        showNextTryoutStrategy: parseBoolean(formData.get("showNextTryoutStrategy")),
        enableResultPageBanner: parseBoolean(formData.get("enableResultPageBanner")),
        errorNotification: parseBoolean(formData.get("errorNotification")),
        retryFailedJob: parseBoolean(formData.get("retryFailedJob")),
        logLevel: String(formData.get("logLevel") ?? "info"),
      }),
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/ai-recommendation-settings");

    return {
      status: "success",
      message: "Konfigurasi AI recommendation berhasil diperbarui.",
    };
  } catch (error) {
    return {
      status: "error",
      message:
        error instanceof Error
          ? error.message
          : "Gagal memperbarui konfigurasi AI recommendation.",
    };
  }
}

export async function createTryoutCatalogAction(
  _previousState: CreateTryoutActionState,
  formData: FormData,
): Promise<CreateTryoutActionState> {
  try {
    const tryoutType = String(formData.get("tryoutType") ?? "generated");
    const totalQuestions = parseNumber(formData.get("totalQuestions"), 110);
    const randomizationMode =
      tryoutType === "hybrid"
        ? "hybrid_manual_and_random"
        : String(formData.get("randomizationMode") ?? "random_by_category_and_difficulty");

    const createResponse = await serverApiFetch<{
      success: true;
      data: { id: string; status: string };
      message?: string;
    }>("/api/v1/super-admin/tryout-catalogs", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        name: String(formData.get("name") ?? ""),
        description: String(formData.get("description") ?? ""),
        tryoutType,
        accessType: String(formData.get("accessType") ?? "trial_and_paid"),
        status: String(formData.get("status") ?? "draft"),
        isPublic: parseBoolean(formData.get("isPublic")),
        isFeatured: parseBoolean(formData.get("isFeatured")),
        sortOrder: parseNumber(formData.get("sortOrder"), 0),
        durationMinutes: parseNumber(formData.get("durationMinutes"), 100),
        totalQuestions,
        passingGradeConfigId: String(formData.get("passingGradeConfigId") ?? ""),
        showResultImmediately: parseBoolean(formData.get("showResultImmediately")),
        showAnswerReview: parseBoolean(formData.get("showAnswerReview")),
      }),
    });

    if (tryoutType !== "manual") {
      await serverApiFetch<{ success: true; message?: string }>(
        `/api/v1/super-admin/tryout-catalogs/${createResponse.data.id}/generation-rule`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({
            randomizationMode,
            questionOrderMode: String(formData.get("questionOrderMode") ?? "mixed_random"),
            avoidRecentQuestions: parseBoolean(formData.get("avoidRecentQuestions")),
            avoidRecentExamCount: parseNumber(formData.get("avoidRecentExamCount"), 5),
            rulesJson: {
              createdFrom: "frontend-wizard",
            },
            sections: buildDefaultGenerationSections(totalQuestions),
          }),
        },
      );
    }

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/tryout-catalog");

    return {
      status: "success",
      message: "Tryout draft berhasil dibuat.",
      createdId: createResponse.data.id,
    };
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Gagal membuat tryout draft.",
    };
  }
}
