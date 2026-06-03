"use client";

import { useActionState, useCallback, useEffect, useMemo, useState, useTransition } from "react";

import { useRouter } from "next/navigation";

import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  Database,
  ListChecks,
  Search,
  Send,
  Settings2,
} from "lucide-react";
import { toast } from "sonner";

import { SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { type ClientPaginatedResponse, fetchAdminData } from "@/lib/admin-data-client";
import { initialResourceActionState } from "@/server/admin-action-state";
import {
  archiveTryoutCatalogAction,
  publishTryoutCatalogAction,
  saveTryoutDraftGenerationRuleAction,
  saveTryoutDraftManualQuestionSetAction,
  submitTryoutDraftForReviewAction,
} from "@/server/admin-content-actions";
import type {
  AdminTryoutAvailabilityCheck,
  AdminTryoutDraftDetail,
  QuestionListItem,
  QuestionCategorySummary,
  QuestionMetadataOptions,
} from "@/server/admin-content-data";

import { TryoutDraftForm } from "./tryout-draft-form";

type BuilderStep = "info" | "strategi" | "bank-soal" | "validasi" | "submit";

type StrategySection = {
  category: string;
  questionCount: number;
  easy: number;
  medium: number;
  hard: number;
  topicDistributionText: string;
  sortOrder: number;
};

type ManualQuestionItem = {
  id: string;
  questionPreview: string;
  category: string;
  subCategory: string;
  topicTag: string;
  difficulty: "easy" | "medium" | "hard";
  status: "draft" | "pending_review" | "active" | "archived";
};

function parseTopicDistribution(text: string) {
  return text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [topicTag, countText] = line.split(":").map((part) => part.trim());
      return {
        topicTag,
        questionCount: Number(countText),
      };
    })
    .filter((item) => item.topicTag && Number.isFinite(item.questionCount) && item.questionCount > 0);
}

function formatTopicDistribution(value: Array<{ topicTag: string; questionCount: number }> | null | undefined) {
  return (value ?? []).map((item) => `${item.topicTag}: ${item.questionCount}`).join("\n");
}

function distributeByWeights(total: number, weights: number[]) {
  const exact = weights.map((weight) => (total * weight) / 100);
  const base = exact.map((value) => Math.floor(value));
  let remainder = total - base.reduce((sum, value) => sum + value, 0);

  const ranking = exact
    .map((value, index) => ({ index, fraction: value - Math.floor(value) }))
    .sort((left, right) => right.fraction - left.fraction);

  for (const item of ranking) {
    if (remainder <= 0) {
      break;
    }

    base[item.index] += 1;
    remainder -= 1;
  }

  return base;
}

function buildDefaultSections(totalQuestions: number, categories: QuestionCategorySummary[]): StrategySection[] {
  if (categories.length === 0) {
    return [];
  }

  const distributedCounts = distributeByWeights(
    totalQuestions,
    categories.map(() => 100 / categories.length),
  );
  const toDifficulty = (count: number) => {
    const [easy, medium, hard] = distributeByWeights(count, [30, 50, 20]);
    return { easy, medium, hard };
  };

  return categories.map((category, index) => {
    const questionCount = distributedCounts[index] ?? 0;
    return {
      category: category.code,
      questionCount,
      sortOrder: index,
      topicDistributionText: "",
      ...toDifficulty(questionCount),
    };
  });
}

function toStrategySections(draft: AdminTryoutDraftDetail, categories: QuestionCategorySummary[]): StrategySection[] {
  if (!draft.generationRule || draft.generationRule.sections.length === 0) {
    return buildDefaultSections(draft.totalQuestions, categories);
  }

  return draft.generationRule.sections.map((section, index) => ({
    category: section.category,
    questionCount: section.questionCount,
    easy: section.difficultyDistributionJson?.easy ?? 0,
    medium: section.difficultyDistributionJson?.medium ?? 0,
    hard: section.difficultyDistributionJson?.hard ?? 0,
    topicDistributionText: formatTopicDistribution(section.topicDistributionJson),
    sortOrder: section.sortOrder ?? index,
  }));
}

function getDefaultRandomizationMode(draft: AdminTryoutDraftDetail) {
  if (draft.generationRule?.randomizationMode) {
    return draft.generationRule.randomizationMode;
  }

  switch (draft.tryoutType) {
    case "hybrid":
      return "hybrid_manual_and_random";
    case "adaptive":
      return "adaptive_weak_area";
    case "manual":
      return "manual_question_set";
    default:
      return "random_by_category_and_difficulty";
  }
}

const stepItems: Array<{ id: BuilderStep; label: string; icon: typeof Settings2 }> = [
  { id: "info", label: "Info", icon: Settings2 },
  { id: "strategi", label: "Strategi", icon: ListChecks },
  { id: "bank-soal", label: "Bank Soal", icon: Database },
  { id: "validasi", label: "Validasi", icon: CheckCircle2 },
  { id: "submit", label: "Finalisasi", icon: Send },
];

export function TryoutDraftBuilder({
  draft,
  metadataOptions,
  scope = "admin",
}: {
  readonly draft: AdminTryoutDraftDetail;
  readonly metadataOptions: QuestionMetadataOptions;
  readonly scope?: "admin" | "super-admin";
}) {
  const router = useRouter();
  const listPath = scope === "super-admin" ? "/super-admin/tryout-catalog" : "/admin/tryout-drafts";
  const editPath =
    scope === "super-admin" ? `/super-admin/tryout-catalog/${draft.id}/edit` : `/admin/tryout-drafts/${draft.id}/edit`;
  const builderSteps = scope === "super-admin" ? stepItems.filter((item) => item.id !== "validasi") : stepItems;
  const [activeStep, setActiveStep] = useState<BuilderStep>("info");
  const [randomizationMode, setRandomizationMode] = useState(getDefaultRandomizationMode(draft));
  const [questionOrderMode, setQuestionOrderMode] = useState(draft.generationRule?.questionOrderMode ?? "mixed_random");
  const [avoidRecentQuestions, setAvoidRecentQuestions] = useState(draft.generationRule?.avoidRecentQuestions ?? false);
  const [avoidRecentExamCount, setAvoidRecentExamCount] = useState(draft.generationRule?.avoidRecentExamCount ?? 0);
  const [maxWeakAreas, setMaxWeakAreas] = useState(
    typeof draft.generationRule?.rulesJson === "object" &&
      draft.generationRule?.rulesJson &&
      "maxWeakAreas" in draft.generationRule.rulesJson
      ? Number(draft.generationRule.rulesJson.maxWeakAreas)
      : 3,
  );
  const [perWeakAreaQuestionCap, setPerWeakAreaQuestionCap] = useState(
    typeof draft.generationRule?.rulesJson === "object" &&
      draft.generationRule?.rulesJson &&
      "perWeakAreaQuestionCap" in draft.generationRule.rulesJson
      ? Number(draft.generationRule.rulesJson.perWeakAreaQuestionCap)
      : 5,
  );
  const [includeTrendBoost, setIncludeTrendBoost] = useState(
    typeof draft.generationRule?.rulesJson === "object" &&
      draft.generationRule?.rulesJson &&
      "includeTrendBoost" in draft.generationRule.rulesJson
      ? Boolean(draft.generationRule.rulesJson.includeTrendBoost)
      : true,
  );
  const [sections, setSections] = useState<StrategySection[]>(() => toStrategySections(draft, metadataOptions.categories));
  const [manualSetName, setManualSetName] = useState(
    draft.workingManualQuestionSetSummary?.name ?? `Manual Set ${draft.name}`,
  );
  const [manualSetDescription, setManualSetDescription] = useState(
    draft.workingManualQuestionSetSummary?.description ?? "",
  );
  const [manualSetStatus, setManualSetStatus] = useState<"draft" | "review" | "approved">(() => {
    if (draft.workingManualQuestionSetSummary?.status === "approved") {
      return "approved";
    }

    if (draft.workingManualQuestionSetSummary?.status === "review") {
      return "review";
    }

    return "draft";
  });
  const [selectedQuestions, setSelectedQuestions] = useState<ManualQuestionItem[]>(
    draft.workingManualQuestionSetSummary?.items.map((item) => ({
      id: item.question.id,
      questionPreview: item.question.questionPreview,
      category: item.question.category,
      subCategory: item.question.subCategory,
      topicTag: item.question.topicTag,
      difficulty: item.question.difficulty,
      status: item.question.status,
    })) ?? [],
  );
  const [questionResponse, setQuestionResponse] = useState<ClientPaginatedResponse<QuestionListItem[]> | null>(null);
  const [availability, setAvailability] = useState<AdminTryoutAvailabilityCheck | null>(null);
  const [questionSearch, setQuestionSearch] = useState("");
  const [questionCategory, setQuestionCategory] = useState<string>("all");
  const [questionDifficulty, setQuestionDifficulty] = useState<"all" | "easy" | "medium" | "hard">("all");
  const [questionSubCategoryId, setQuestionSubCategoryId] = useState("all");
  const [questionTopicTagId, setQuestionTopicTagId] = useState("all");
  const [isQuestionsPending, startQuestionsTransition] = useTransition();
  const [isAvailabilityPending, startAvailabilityTransition] = useTransition();

  const [strategyState, strategyAction] = useActionState(
    saveTryoutDraftGenerationRuleAction,
    initialResourceActionState,
  );
  const [manualState, manualAction] = useActionState(
    saveTryoutDraftManualQuestionSetAction,
    initialResourceActionState,
  );
  const [submitState, submitAction] = useActionState(submitTryoutDraftForReviewAction, initialResourceActionState);
  const [publishState, publishAction] = useActionState(publishTryoutCatalogAction, initialResourceActionState);
  const [archiveState, archiveAction] = useActionState(archiveTryoutCatalogAction, initialResourceActionState);

  const selectedQuestionIds = useMemo(() => selectedQuestions.map((item) => item.id), [selectedQuestions]);
  const selectedCounts = useMemo(() => {
    return selectedQuestions.reduce<Record<string, number>>((acc, item) => {
      acc[item.category] = (acc[item.category] ?? 0) + 1;
      return acc;
    }, {});
  }, [selectedQuestions]);

  const availableSubCategories = metadataOptions.subCategories.filter((item) =>
    questionCategory === "all" ? true : item.category === questionCategory,
  );
  const availableTopicTags = metadataOptions.topicTags.filter((item) => {
    if (questionSubCategoryId !== "all") {
      return item.subCategoryId === questionSubCategoryId;
    }

    if (questionCategory === "all") {
      return true;
    }

    const subCategory = metadataOptions.subCategories.find((entry) => entry.id === item.subCategoryId);
    return subCategory?.category === questionCategory;
  });

  useEffect(() => {
    if (strategyState.status === "success") {
      toast.success(strategyState.message);
      router.refresh();
    } else if (strategyState.status === "error") {
      toast.error(strategyState.message);
    }
  }, [router, strategyState]);

  useEffect(() => {
    if (manualState.status === "success") {
      toast.success(manualState.message);
      router.refresh();
    } else if (manualState.status === "error") {
      toast.error(manualState.message);
    }
  }, [manualState, router]);

  useEffect(() => {
    if (submitState.status === "success") {
      toast.success(submitState.message);
      router.push(listPath);
      router.refresh();
    } else if (submitState.status === "error") {
      toast.error(submitState.message);
    }
  }, [listPath, router, submitState]);

  useEffect(() => {
    if (publishState.status === "success") {
      toast.success(publishState.message);
      router.push(listPath);
      router.refresh();
    } else if (publishState.status === "error") {
      toast.error(publishState.message);
    }
  }, [listPath, publishState, router]);

  useEffect(() => {
    if (archiveState.status === "success") {
      toast.success(archiveState.message);
      router.push(listPath);
      router.refresh();
    } else if (archiveState.status === "error") {
      toast.error(archiveState.message);
    }
  }, [archiveState, listPath, router]);

  useEffect(() => {
    if (draft.tryoutType === "hybrid") {
      setRandomizationMode("hybrid_manual_and_random");
      return;
    }

    if (draft.tryoutType === "adaptive") {
      setRandomizationMode("adaptive_weak_area");
      return;
    }

    if (draft.tryoutType === "manual") {
      setRandomizationMode("manual_question_set");
    }
  }, [draft.tryoutType]);

  useEffect(() => {
    if (scope === "super-admin" && activeStep === "validasi") {
      setActiveStep("submit");
    }
  }, [activeStep, scope]);

  const refreshQuestions = () => {
    startQuestionsTransition(async () => {
      try {
        const response = await fetchAdminData<ClientPaginatedResponse<QuestionListItem[]>>(
          "questions",
          {
            search: questionSearch.trim() || undefined,
            category: questionCategory !== "all" ? questionCategory : undefined,
            difficulty: questionDifficulty !== "all" ? questionDifficulty : undefined,
            status: "active",
            subCategoryId: questionSubCategoryId !== "all" ? questionSubCategoryId : undefined,
            topicTagId: questionTopicTagId !== "all" ? questionTopicTagId : undefined,
            limit: 20,
          },
          { scope: "admin" },
        );
        setQuestionResponse(response);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Gagal memuat bank soal.");
      }
    });
  };

  const refreshAvailability = useCallback(() => {
    startAvailabilityTransition(async () => {
      try {
        const response = await fetchAdminData<{ success: true; data: AdminTryoutAvailabilityCheck }>(
          `${scope === "super-admin" ? "tryout-catalogs" : "tryout-drafts"}/${draft.id}/availability-check`,
          undefined,
          { scope },
        );
        setAvailability(response.data);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Gagal memuat availability check.");
      }
    });
  }, [draft.id, scope]);

  useEffect(() => {
    if (activeStep === "validasi" || activeStep === "submit") {
      refreshAvailability();
    }
  }, [activeStep, refreshAvailability]);

  const addQuestion = (question: QuestionListItem) => {
    setSelectedQuestions((current) => {
      if (current.some((item) => item.id === question.id)) {
        return current;
      }

      return [
        ...current,
        {
          id: question.id,
          questionPreview: question.questionPreview,
          category: question.category,
          subCategory: question.subCategory,
          topicTag: question.topicTag,
          difficulty: question.difficulty,
          status: question.status,
        },
      ];
    });
  };

  const removeQuestion = (questionId: string) => {
    setSelectedQuestions((current) => current.filter((item) => item.id !== questionId));
  };

  const moveQuestion = (questionId: string, direction: -1 | 1) => {
    setSelectedQuestions((current) => {
      const index = current.findIndex((item) => item.id === questionId);
      if (index < 0) {
        return current;
      }

      const nextIndex = index + direction;
      if (nextIndex < 0 || nextIndex >= current.length) {
        return current;
      }

      const nextItems = [...current];
      const [item] = nextItems.splice(index, 1);
      nextItems.splice(nextIndex, 0, item);
      return nextItems;
    });
  };

  const updateSection = (
    category: StrategySection["category"],
    field: keyof StrategySection,
    value: string | number,
  ) => {
    setSections((current) =>
      current.map((section) =>
        section.category === category
          ? {
              ...section,
              [field]: typeof value === "number" ? value : field === "topicDistributionText" ? value : Number(value),
            }
          : section,
      ),
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap gap-2">
        {builderSteps.map((step) => {
          const Icon = step.icon;
          const isActive = activeStep === step.id;
          return (
            <Button
              key={step.id}
              type="button"
              variant={isActive ? "default" : "outline"}
              className={isActive ? "rounded-xl bg-blue-600 hover:bg-blue-700" : "rounded-xl border-slate-200 bg-white"}
              onClick={() => setActiveStep(step.id)}
            >
              <Icon className="mr-2 size-4" />
              {step.label}
            </Button>
          );
        })}
      </div>

      {activeStep === "info" ? (
        <SectionCard
          title={scope === "super-admin" ? "Info Tryout" : "Info Draft"}
          description={
            scope === "super-admin"
              ? "Perbarui metadata utama tryout sebelum finalisasi publish."
              : "Perbarui metadata utama draft sebelum menyusun strategi dan bank soal."
          }
        >
          <TryoutDraftForm draft={draft} scope={scope} redirectPath={editPath} createRedirectBasePath={listPath} />
        </SectionCard>
      ) : null}

      {activeStep === "strategi" ? (
        <SectionCard
          title="Strategi Tryout"
          description="Atur generation rule untuk generated, hybrid, atau adaptive. Draft manual tidak membutuhkan generation rule."
        >
          {draft.tryoutType === "manual" ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-600 text-sm">
              Draft manual memakai bank soal yang dipilih pada step berikutnya. Tidak ada generation rule yang wajib
              disimpan.
            </div>
          ) : (
            <form action={strategyAction} className="grid gap-6">
              <input type="hidden" name="tryoutDraftId" value={draft.id} />
              <input type="hidden" name="scope" value={scope} />
              <input type="hidden" name="tryoutType" value={draft.tryoutType} />
              <input
                type="hidden"
                name="sectionsJson"
                value={JSON.stringify(
                  sections.map((section) => ({
                    categoryCode: section.category,
                    questionCount: section.questionCount,
                    difficultyDistribution: {
                      easy: section.easy,
                      medium: section.medium,
                      hard: section.hard,
                    },
                    topicDistribution: parseTopicDistribution(section.topicDistributionText),
                    sortOrder: section.sortOrder,
                  })),
                )}
              />

              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <div className="grid gap-2">
                  <Label htmlFor="randomizationMode">Randomization Mode</Label>
                  <Select
                    name="randomizationMode"
                    value={randomizationMode}
                    onValueChange={(value) => setRandomizationMode(value as typeof randomizationMode)}
                  >
                    <SelectTrigger id="randomizationMode" className="rounded-xl border-slate-200 bg-white">
                      <SelectValue placeholder="Pilih mode" />
                    </SelectTrigger>
                    <SelectContent>
                      {draft.tryoutType === "generated" ? (
                        <>
                          <SelectItem value="random_by_category">By Category</SelectItem>
                          <SelectItem value="random_by_category_and_difficulty">By Category + Difficulty</SelectItem>
                          <SelectItem value="random_by_topic_distribution">By Topic Distribution</SelectItem>
                        </>
                      ) : null}
                      {draft.tryoutType === "hybrid" ? (
                        <SelectItem value="hybrid_manual_and_random">Hybrid Manual + Random</SelectItem>
                      ) : null}
                      {draft.tryoutType === "adaptive" ? (
                        <SelectItem value="adaptive_weak_area">Adaptive Weak Area</SelectItem>
                      ) : null}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="questionOrderMode">Question Order Mode</Label>
                  <Select
                    name="questionOrderMode"
                    value={questionOrderMode}
                    onValueChange={(value) => setQuestionOrderMode(value as typeof questionOrderMode)}
                  >
                    <SelectTrigger id="questionOrderMode" className="rounded-xl border-slate-200 bg-white">
                      <SelectValue placeholder="Pilih urutan" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="mixed_random">Mixed Random</SelectItem>
                      <SelectItem value="category_order">Category Order</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="avoidRecentExamCount">Avoid Recent Exam Count</Label>
                  <Input
                    id="avoidRecentExamCount"
                    name="avoidRecentExamCount"
                    type="number"
                    min={0}
                    value={avoidRecentExamCount}
                    onChange={(event) => setAvoidRecentExamCount(Number(event.target.value) || 0)}
                    className="rounded-xl border-slate-200"
                  />
                </div>
                <div className="flex items-end">
                  <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-slate-700 text-sm">
                    <input
                      name="avoidRecentQuestions"
                      type="checkbox"
                      checked={avoidRecentQuestions}
                      onChange={(event) => setAvoidRecentQuestions(event.target.checked)}
                    />
                    Hindari soal dari exam terbaru
                  </label>
                </div>
              </div>

              {draft.tryoutType === "adaptive" ? (
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="grid gap-2">
                    <Label htmlFor="maxWeakAreas">Max Weak Areas</Label>
                    <Input
                      id="maxWeakAreas"
                      name="maxWeakAreas"
                      type="number"
                      min={1}
                      value={maxWeakAreas}
                      onChange={(event) => setMaxWeakAreas(Number(event.target.value) || 1)}
                      className="rounded-xl border-slate-200"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="perWeakAreaQuestionCap">Cap per Weak Area</Label>
                    <Input
                      id="perWeakAreaQuestionCap"
                      name="perWeakAreaQuestionCap"
                      type="number"
                      min={1}
                      value={perWeakAreaQuestionCap}
                      onChange={(event) => setPerWeakAreaQuestionCap(Number(event.target.value) || 1)}
                      className="rounded-xl border-slate-200"
                    />
                  </div>
                  <div className="flex items-end">
                    <label className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-slate-700 text-sm">
                      <input
                        name="includeTrendBoost"
                        type="checkbox"
                        checked={includeTrendBoost}
                        onChange={(event) => setIncludeTrendBoost(event.target.checked)}
                      />
                      Aktifkan trend boost
                    </label>
                  </div>
                </div>
              ) : null}

              <div className="grid gap-4">
                {sections.map((section) => (
                  <div key={section.category} className="rounded-2xl border border-slate-200 p-4">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-slate-950">{section.category}</h3>
                        <p className="text-slate-500 text-sm">
                          Atur target kategori, distribusi difficulty, dan optional topic target.
                        </p>
                      </div>
                      <StatusBadge tone="neutral">{section.questionCount} soal</StatusBadge>
                    </div>
                    <div className="grid gap-4 md:grid-cols-4">
                      <div className="grid gap-2">
                        <Label htmlFor={`${section.category}-count`}>Question Count</Label>
                        <Input
                          id={`${section.category}-count`}
                          type="number"
                          min={0}
                          value={section.questionCount}
                          onChange={(event) => updateSection(section.category, "questionCount", event.target.value)}
                          className="rounded-xl border-slate-200"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`${section.category}-easy`}>Easy</Label>
                        <Input
                          id={`${section.category}-easy`}
                          type="number"
                          min={0}
                          value={section.easy}
                          onChange={(event) => updateSection(section.category, "easy", event.target.value)}
                          className="rounded-xl border-slate-200"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`${section.category}-medium`}>Medium</Label>
                        <Input
                          id={`${section.category}-medium`}
                          type="number"
                          min={0}
                          value={section.medium}
                          onChange={(event) => updateSection(section.category, "medium", event.target.value)}
                          className="rounded-xl border-slate-200"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor={`${section.category}-hard`}>Hard</Label>
                        <Input
                          id={`${section.category}-hard`}
                          type="number"
                          min={0}
                          value={section.hard}
                          onChange={(event) => updateSection(section.category, "hard", event.target.value)}
                          className="rounded-xl border-slate-200"
                        />
                      </div>
                    </div>
                    <div className="mt-4 grid gap-2">
                      <Label htmlFor={`${section.category}-topics`}>Topic Distribution</Label>
                      <Textarea
                        id={`${section.category}-topics`}
                        value={section.topicDistributionText}
                        onChange={(event) =>
                          updateSection(section.category, "topicDistributionText", event.target.value)
                        }
                        className="min-h-28 rounded-xl border-slate-200"
                        placeholder="Format: Topic: jumlah, satu baris per topik"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-600 text-sm">
                <span>
                  Total target section: {sections.reduce((sum, section) => sum + section.questionCount, 0)} soal
                </span>
                <Button type="submit" className="rounded-xl bg-blue-600 hover:bg-blue-700">
                  Simpan Strategi
                </Button>
              </div>
            </form>
          )}
        </SectionCard>
      ) : null}

      {activeStep === "bank-soal" ? (
        <SectionCard
          title="Bank Soal"
          description="Pilih soal aktif dari bank soal untuk draft manual atau hybrid, lalu atur urutannya."
        >
          {draft.tryoutType === "generated" || draft.tryoutType === "adaptive" ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-600 text-sm">
              Mode {draft.tryoutType} tidak membutuhkan manual question set sebagai sumber utama. Step ini hanya relevan
              untuk manual atau hybrid.
            </div>
          ) : (
            <div className="grid gap-6">
              <div className="grid gap-4 rounded-2xl border border-slate-200 p-4">
                <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                  <Input
                    value={questionSearch}
                    onChange={(event) => setQuestionSearch(event.target.value)}
                    placeholder="Cari isi soal atau topik"
                    className="rounded-xl border-slate-200"
                  />
                  <Select
                    value={questionCategory}
                    onValueChange={setQuestionCategory}
                  >
                    <SelectTrigger className="rounded-xl border-slate-200 bg-white">
                      <SelectValue placeholder="Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Kategori</SelectItem>
                      {metadataOptions.categories.map((item) => (
                        <SelectItem key={item.code} value={item.code}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={questionSubCategoryId}
                    onValueChange={(value) => {
                      setQuestionSubCategoryId(value);
                      if (value === "all") {
                        setQuestionTopicTagId("all");
                      }
                    }}
                  >
                    <SelectTrigger className="rounded-xl border-slate-200 bg-white">
                      <SelectValue placeholder="Sub-kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Sub-kategori</SelectItem>
                      {availableSubCategories.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={questionTopicTagId} onValueChange={setQuestionTopicTagId}>
                    <SelectTrigger className="rounded-xl border-slate-200 bg-white">
                      <SelectValue placeholder="Topik" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Topik</SelectItem>
                      {availableTopicTags.map((item) => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={questionDifficulty}
                    onValueChange={(value) => setQuestionDifficulty(value as typeof questionDifficulty)}
                  >
                    <SelectTrigger className="rounded-xl border-slate-200 bg-white">
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Semua Difficulty</SelectItem>
                      <SelectItem value="easy">Easy</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="hard">Hard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex justify-end">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-xl border-slate-200 bg-white"
                    onClick={refreshQuestions}
                  >
                    <Search className="mr-2 size-4" />
                    {isQuestionsPending ? "Memuat..." : "Cari Soal"}
                  </Button>
                </div>
              </div>

              <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
                <SectionCard
                  title="Hasil Pencarian"
                  description={
                    questionResponse
                      ? `${questionResponse.meta.totalItems.toLocaleString("id-ID")} soal aktif ditemukan.`
                      : "Klik cari soal untuk memuat bank soal aktif."
                  }
                >
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Soal</TableHead>
                        <TableHead>Kategori</TableHead>
                        <TableHead>Topik</TableHead>
                        <TableHead>Difficulty</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {!questionResponse ? (
                        <TableRow>
                          <TableCell colSpan={5} className="py-10 text-center text-slate-400">
                            Bank soal belum dimuat.
                          </TableCell>
                        </TableRow>
                      ) : questionResponse.data.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="py-10 text-center text-slate-400">
                            Tidak ada soal aktif yang cocok.
                          </TableCell>
                        </TableRow>
                      ) : (
                        questionResponse.data.map((question) => {
                          const alreadySelected = selectedQuestionIds.includes(question.id);
                          return (
                            <TableRow key={question.id}>
                              <TableCell className="max-w-xl">
                                <div className="font-medium text-slate-950">{question.questionPreview}</div>
                                <div className="text-slate-500 text-xs">{question.subCategory}</div>
                              </TableCell>
                              <TableCell>{question.category}</TableCell>
                              <TableCell>{question.topicTag}</TableCell>
                              <TableCell>{question.difficulty}</TableCell>
                              <TableCell className="text-right">
                                <Button
                                  type="button"
                                  variant="outline"
                                  size="sm"
                                  className="rounded-lg"
                                  disabled={alreadySelected}
                                  onClick={() => addQuestion(question)}
                                >
                                  {alreadySelected ? "Dipilih" : "Tambah"}
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })
                      )}
                    </TableBody>
                  </Table>
                </SectionCard>

                <SectionCard
                  title="Manual Question Set"
                  description={`Tersusun ${selectedQuestions.length} soal. ${metadataOptions.categories
                    .map((item) => `${item.name} ${selectedCounts[item.code] ?? 0}`)
                    .join(", ")}.`}
                >
                  <form action={manualAction} className="grid gap-4">
                    <input type="hidden" name="tryoutDraftId" value={draft.id} />
                    <input type="hidden" name="scope" value={scope} />
                    <input type="hidden" name="questionIdsJson" value={JSON.stringify(selectedQuestionIds)} />

                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="grid gap-2">
                        <Label htmlFor="manualSetName">Nama Set</Label>
                        <Input
                          id="manualSetName"
                          name="name"
                          value={manualSetName}
                          onChange={(event) => setManualSetName(event.target.value)}
                          className="rounded-xl border-slate-200"
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="manualSetStatus">Status Set</Label>
                        <Select
                          value={manualSetStatus}
                          onValueChange={(value) => setManualSetStatus(value as "draft" | "review" | "approved")}
                        >
                          <SelectTrigger id="manualSetStatus" className="rounded-xl border-slate-200 bg-white">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="draft">Draft</SelectItem>
                            <SelectItem value="review">Review</SelectItem>
                            {scope === "super-admin" ? <SelectItem value="approved">Approved</SelectItem> : null}
                          </SelectContent>
                        </Select>
                        <input type="hidden" name="status" value={manualSetStatus} />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="manualSetDescription">Deskripsi Set</Label>
                      <Textarea
                        id="manualSetDescription"
                        name="description"
                        value={manualSetDescription}
                        onChange={(event) => setManualSetDescription(event.target.value)}
                        className="min-h-24 rounded-xl border-slate-200"
                      />
                    </div>

                    <div className="rounded-2xl border border-slate-200">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>#</TableHead>
                            <TableHead>Soal</TableHead>
                            <TableHead>Kategori</TableHead>
                            <TableHead>Difficulty</TableHead>
                            <TableHead className="text-right">Urutan</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {selectedQuestions.length === 0 ? (
                            <TableRow>
                              <TableCell colSpan={5} className="py-10 text-center text-slate-400">
                                Belum ada soal yang dipilih.
                              </TableCell>
                            </TableRow>
                          ) : (
                            selectedQuestions.map((question, index) => (
                              <TableRow key={question.id}>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>
                                  <div className="font-medium text-slate-950">{question.questionPreview}</div>
                                  <div className="text-slate-500 text-xs">{question.topicTag}</div>
                                </TableCell>
                                <TableCell>{question.category}</TableCell>
                                <TableCell>{question.difficulty}</TableCell>
                                <TableCell className="text-right">
                                  <div className="flex justify-end gap-2">
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="icon"
                                      className="size-8 rounded-lg"
                                      onClick={() => moveQuestion(question.id, -1)}
                                    >
                                      <ArrowUp className="size-4" />
                                    </Button>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="icon"
                                      className="size-8 rounded-lg"
                                      onClick={() => moveQuestion(question.id, 1)}
                                    >
                                      <ArrowDown className="size-4" />
                                    </Button>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      size="sm"
                                      className="rounded-lg"
                                      onClick={() => removeQuestion(question.id)}
                                    >
                                      Hapus
                                    </Button>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))
                          )}
                        </TableBody>
                      </Table>
                    </div>

                    <div className="flex justify-end">
                      <Button type="submit" className="rounded-xl bg-blue-600 hover:bg-blue-700">
                        Simpan Manual Set
                      </Button>
                    </div>
                  </form>
                </SectionCard>
              </div>
            </div>
          )}
        </SectionCard>
      ) : null}

      {scope !== "super-admin" && activeStep === "validasi" ? (
        <SectionCard
          title="Validasi Draft"
          description="Cek kelengkapan struktur draft untuk review dan lihat kesiapan publish/start dari availability check."
        >
          <div className="grid gap-6 xl:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-4">
              <div className="mb-3 flex items-center gap-2">
                {draft.builderStatus.isStructurallyValid ? (
                  <CheckCircle2 className="size-5 text-emerald-600" />
                ) : (
                  <AlertCircle className="size-5 text-amber-600" />
                )}
                <h3 className="font-medium text-slate-950">Builder Status</h3>
              </div>
              <p className="text-slate-600 text-sm">
                {draft.builderStatus.isStructurallyValid
                  ? "Struktur minimum draft sudah terpenuhi untuk diajukan."
                  : "Masih ada bagian yang harus dilengkapi sebelum draft bisa diajukan."}
              </p>
              <div className="mt-4 grid gap-2 text-sm">
                {draft.builderStatus.missingParts.length === 0 ? (
                  <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-emerald-700">
                    Tidak ada missing parts.
                  </div>
                ) : (
                  draft.builderStatus.missingParts.map((item) => (
                    <div key={item} className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 text-amber-700">
                      {item}
                    </div>
                  ))
                )}
                {draft.builderStatus.modeSpecificWarnings.map((item) => (
                  <div key={item} className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <div className="mb-3 flex items-center justify-between">
                <div>
                  <h3 className="font-medium text-slate-950">Availability Check</h3>
                  <p className="text-slate-600 text-sm">
                    Gunakan ini untuk melihat apakah draft sudah siap publish/start.
                  </p>
                </div>
                <Button
                  type="button"
                  variant="outline"
                  className="rounded-xl border-slate-200 bg-white"
                  onClick={refreshAvailability}
                >
                  {isAvailabilityPending ? "Memuat..." : "Refresh Check"}
                </Button>
              </div>
              {!availability ? (
                <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-4 text-slate-500 text-sm">
                  Availability check belum dijalankan.
                </div>
              ) : (
                <div className="grid gap-3 text-sm">
                  <div
                    className={`rounded-xl px-3 py-2 ${availability.isReady ? "border border-emerald-100 bg-emerald-50 text-emerald-700" : "border border-amber-100 bg-amber-50 text-amber-700"}`}
                  >
                    {availability.isReady ? "Draft siap untuk publish/start." : "Draft belum siap untuk publish/start."}
                  </div>
                  {availability.issues.length === 0 ? (
                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
                      Tidak ada issue yang terdeteksi.
                    </div>
                  ) : (
                    availability.issues.map((issue) => (
                      <div
                        key={issue}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600"
                      >
                        {issue}
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          </div>
        </SectionCard>
      ) : null}

      {activeStep === "submit" ? (
        <SectionCard
          title={scope === "super-admin" ? "Finalisasi Tryout" : "Ajukan Review"}
          description={
            scope === "super-admin"
              ? "Super admin dapat langsung mempublish atau mengarsipkan tryout dari builder yang sama."
              : "Admin hanya bisa mengirim draft ke status review. Publish final tetap dilakukan super admin."
          }
        >
          <div className="grid gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-slate-600 text-sm">
              <p>
                Status draft saat ini: <span className="font-medium text-slate-950">{draft.status}</span>
              </p>
              <p className="mt-2">Jumlah soal manual terpilih: {selectedQuestions.length}</p>
              <p className="mt-2">
                Total target section: {sections.reduce((sum, section) => sum + section.questionCount, 0)}
              </p>
            </div>
            {scope === "super-admin" ? (
              <div className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 p-4">
                  <div className="mb-3 flex items-center gap-2">
                    {draft.builderStatus.isStructurallyValid ? (
                      <CheckCircle2 className="size-5 text-emerald-600" />
                    ) : (
                      <AlertCircle className="size-5 text-amber-600" />
                    )}
                    <h3 className="font-medium text-slate-950">Kelengkapan Builder</h3>
                  </div>
                  <p className="text-slate-600 text-sm">
                    {draft.builderStatus.isStructurallyValid
                      ? "Struktur minimum tryout sudah lengkap."
                      : "Masih ada bagian wajib yang perlu dilengkapi sebelum tryout bisa dipublish."}
                  </p>
                  <div className="mt-4 grid gap-2 text-sm">
                    {draft.builderStatus.missingParts.length === 0 ? (
                      <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-3 py-2 text-emerald-700">
                        Tidak ada missing parts.
                      </div>
                    ) : (
                      draft.builderStatus.missingParts.map((item) => (
                        <div
                          key={item}
                          className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 text-amber-700"
                        >
                          {item}
                        </div>
                      ))
                    )}
                    {draft.builderStatus.modeSpecificWarnings.map((item) => (
                      <div
                        key={item}
                        className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600"
                      >
                        {item}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-slate-200 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-slate-950">Kesiapan Publish</h3>
                      <p className="text-slate-600 text-sm">Blokir publish ditampilkan langsung di finalisasi.</p>
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      className="rounded-xl border-slate-200 bg-white"
                      onClick={refreshAvailability}
                    >
                      {isAvailabilityPending ? "Memuat..." : "Refresh Check"}
                    </Button>
                  </div>
                  {!availability ? (
                    <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-4 text-slate-500 text-sm">
                      Mengecek availability tryout...
                    </div>
                  ) : (
                    <div className="grid gap-3 text-sm">
                      <div
                        className={`rounded-xl px-3 py-2 ${availability.isReady ? "border border-emerald-100 bg-emerald-50 text-emerald-700" : "border border-amber-100 bg-amber-50 text-amber-700"}`}
                      >
                        {availability.isReady ? "Tryout siap dipublish." : "Tryout belum siap dipublish."}
                      </div>
                      {!availability.isReady ? (
                        <div className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-2 text-amber-700">
                          Publish terkunci sampai semua issue bank soal aktif dan
                          distribusi section di bawah ini terpenuhi.
                        </div>
                      ) : null}
                      {availability.issues.length === 0 ? (
                        <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600">
                          Tidak ada issue yang terdeteksi.
                        </div>
                      ) : (
                        availability.issues.map((issue) => (
                          <div
                            key={issue}
                            className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-slate-600"
                          >
                            {issue}
                          </div>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>
            ) : null}
            {!draft.builderStatus.isStructurallyValid ? (
              <div className="rounded-2xl border border-amber-100 bg-amber-50 p-4 text-amber-700 text-sm">
                Draft belum bisa diajukan karena masih ada bagian wajib yang belum lengkap. Lengkapi step Strategi atau
                Bank Soal terlebih dulu.
              </div>
            ) : null}
            <div className="flex flex-wrap justify-end gap-2">
              {scope === "super-admin" ? (
                <>
                  <form action={archiveAction}>
                    <input type="hidden" name="tryoutDraftId" value={draft.id} />
                    <Button type="submit" variant="outline" className="rounded-xl border-slate-200 bg-white">
                      Arsipkan
                    </Button>
                  </form>
                  <form action={publishAction}>
                    <input type="hidden" name="tryoutDraftId" value={draft.id} />
                    <Button
                      type="submit"
                      className="rounded-xl bg-emerald-600 hover:bg-emerald-700"
                      disabled={
                        !draft.builderStatus.isStructurallyValid || !availability?.isReady || isAvailabilityPending
                      }
                    >
                      Publish
                    </Button>
                  </form>
                </>
              ) : null}
              {scope !== "super-admin" ? (
                <form action={submitAction}>
                  <input type="hidden" name="tryoutDraftId" value={draft.id} />
                  <input type="hidden" name="scope" value={scope} />
                  <Button
                    type="submit"
                    className="rounded-xl bg-blue-600 hover:bg-blue-700"
                    disabled={!draft.builderStatus.isStructurallyValid}
                  >
                    <Send className="mr-2 size-4" />
                    Kirim ke Review
                  </Button>
                </form>
              ) : null}
            </div>
          </div>
        </SectionCard>
      ) : null}
    </div>
  );
}
