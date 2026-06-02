"use client";

import { useEffect, useState, useTransition } from "react";

import { Filter } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ItemCombobox } from "@/components/ui/item-combobox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type ClientPaginatedResponse, fetchAdminData } from "@/lib/admin-data-client";
import type { QuestionBankOverview, QuestionListItem, QuestionMetadataOptions } from "@/server/admin-content-data";

import { BankSoalKpiCards } from "./bank-soal-kpi-cards";
import { BankSoalOverviewPanel } from "./bank-soal-overview-panel";
import { QuestionsTable } from "./questions-table";

const difficultyOptions = [
  { value: "all", label: "Semua Kesulitan" },
  { value: "easy", label: "Mudah" },
  { value: "medium", label: "Sedang" },
  { value: "hard", label: "Sulit" },
] as const;

const statusOptions = [
  { value: "all", label: "Semua Status" },
  { value: "draft", label: "Draft" },
  { value: "active", label: "Aktif" },
  { value: "archived", label: "Diarsipkan" },
] as const;

function normalizeFilterValue(value: string) {
  return value && value !== "all" ? value : undefined;
}

function buildFilterHref(filters: {
  search?: string;
  category?: string;
  subCategoryId?: string;
  difficulty?: string;
  status?: string;
}) {
  const searchParams = new URLSearchParams();

  if (filters.search) {
    searchParams.set("search", filters.search);
  }

  if (filters.category) {
    searchParams.set("category", filters.category);
  }

  if (filters.subCategoryId) {
    searchParams.set("subCategoryId", filters.subCategoryId);
  }

  if (filters.difficulty) {
    searchParams.set("difficulty", filters.difficulty);
  }

  if (filters.status) {
    searchParams.set("status", filters.status);
  }

  const query = searchParams.toString();
  return query ? `/admin/bank-soal?${query}` : "/admin/bank-soal";
}

async function fetchQuestions(params: {
  search?: string;
  category?: string;
  subCategoryId?: string;
  difficulty?: string;
  status?: string;
  page: number;
}) {
  return fetchAdminData<ClientPaginatedResponse<QuestionListItem[]>>("questions", {
    search: params.search,
    category: params.category,
    subCategoryId: params.subCategoryId,
    difficulty: params.difficulty,
    status: params.status,
    page: params.page,
    limit: 20,
  });
}

export function BankSoalManager({
  initialResponse,
  initialOverview,
  initialMetadataOptions,
  initialFilters,
}: {
  readonly initialResponse: ClientPaginatedResponse<QuestionListItem[]>;
  readonly initialOverview: QuestionBankOverview;
  readonly initialMetadataOptions: QuestionMetadataOptions;
  readonly initialFilters: {
    search?: string;
    category?: string;
    subCategoryId?: string;
    difficulty?: string;
    status?: string;
  };
}) {
  const [response, setResponse] = useState(initialResponse);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);
  const [searchInput, setSearchInput] = useState(initialFilters.search ?? "");
  const [categoryInput, setCategoryInput] = useState(initialFilters.category ?? "all");
  const [subCategoryInput, setSubCategoryInput] = useState(initialFilters.subCategoryId ?? "all");
  const [difficultyInput, setDifficultyInput] = useState(initialFilters.difficulty ?? "all");
  const [statusInput, setStatusInput] = useState(initialFilters.status ?? "all");
  const [isPending, startTransition] = useTransition();

  const visibleSubCategories = initialMetadataOptions.subCategories.filter(
    (item) => categoryInput === "all" || item.category === categoryInput,
  );

  useEffect(() => {
    if (subCategoryInput === "all") {
      return;
    }

    const exists = visibleSubCategories.some((item) => item.id === subCategoryInput);
    if (!exists) {
      setSubCategoryInput("all");
    }
  }, [subCategoryInput, visibleSubCategories]);

  const applyFilters = (nextFilters: {
    search?: string;
    category?: string;
    subCategoryId?: string;
    difficulty?: string;
    status?: string;
  }) => {
    startTransition(async () => {
      try {
        const nextResponse = await fetchQuestions({
          ...nextFilters,
          page: 1,
        });
        setAppliedFilters(nextFilters);
        setResponse(nextResponse);
        window.history.replaceState(null, "", buildFilterHref(nextFilters));
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Gagal memuat soal.");
      }
    });
  };

  const handleApply = () => {
    applyFilters({
      search: searchInput.trim() || undefined,
      category: normalizeFilterValue(categoryInput),
      subCategoryId: normalizeFilterValue(subCategoryInput),
      difficulty: normalizeFilterValue(difficultyInput),
      status: normalizeFilterValue(statusInput),
    });
  };

  const handleReset = () => {
    setSearchInput("");
    setCategoryInput("all");
    setSubCategoryInput("all");
    setDifficultyInput("all");
    setStatusInput("all");
    applyFilters({});
  };

  useEffect(() => {
    const normalizedSearch = searchInput.trim() || undefined;
    const normalizedAppliedSearch = appliedFilters.search?.trim() || undefined;

    if (normalizedSearch === normalizedAppliedSearch) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      applyFilters({
        search: normalizedSearch,
        category: appliedFilters.category,
        subCategoryId: appliedFilters.subCategoryId,
        difficulty: appliedFilters.difficulty,
        status: appliedFilters.status,
      });
    }, 450);

    return () => {
      window.clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- debounced search
  }, [
    appliedFilters.category,
    appliedFilters.difficulty,
    appliedFilters.search,
    appliedFilters.status,
    appliedFilters.subCategoryId,
    searchInput,
  ]);

  return (
    <div className="flex min-w-0 w-full max-w-full flex-col gap-6">
      <form
        className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm"
        onSubmit={(event) => {
          event.preventDefault();
          handleApply();
        }}
      >
        <Input
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Cari soal, sub-kategori atau topik tag"
          className="min-w-[14rem] flex-1 rounded-xl border-slate-200"
        />
        <Select value={categoryInput} onValueChange={setCategoryInput}>
          <SelectTrigger className="w-40 rounded-xl border-slate-200 bg-white">
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kategori</SelectItem>
            <SelectItem value="TWK">TWK</SelectItem>
            <SelectItem value="TIU">TIU</SelectItem>
            <SelectItem value="TKP">TKP</SelectItem>
          </SelectContent>
        </Select>
        <div className="w-56 min-w-[12rem]">
          <ItemCombobox
            id="bank-soal-sub-category-filter"
            value={subCategoryInput}
            onValueChange={setSubCategoryInput}
            placeholder="Semua Sub-kategori"
            emptyMessage="Sub-kategori tidak ditemukan."
            options={[
              { value: "all", label: "Semua Sub-kategori" },
              ...visibleSubCategories.map((item) => ({
                value: item.id,
                label: `${item.category} - ${item.name}`,
              })),
            ]}
          />
        </div>
        <Select value={difficultyInput} onValueChange={setDifficultyInput}>
          <SelectTrigger className="w-40 rounded-xl border-slate-200 bg-white">
            <SelectValue placeholder="Kesulitan" />
          </SelectTrigger>
          <SelectContent>
            {difficultyOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={statusInput} onValueChange={setStatusInput}>
          <SelectTrigger className="w-40 rounded-xl border-slate-200 bg-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statusOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button type="submit" className="rounded-xl bg-blue-600 hover:bg-blue-700" disabled={isPending}>
          <Filter className="mr-2 size-4" />
          {isPending ? "Memuat..." : "Terapkan"}
        </Button>
        <Button type="button" variant="ghost" className="rounded-xl text-slate-600" disabled={isPending} onClick={handleReset}>
          Reset
        </Button>
      </form>

      <BankSoalKpiCards overview={initialOverview} />

      <BankSoalOverviewPanel initialOverview={initialOverview} />

      <QuestionsTable initialResponse={response} filters={appliedFilters} onResponseChange={setResponse} />
    </div>
  );
}
