"use client";

import { useEffect, useState, useTransition } from "react";

import { toast } from "sonner";

import { SectionCard } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type ClientPaginatedResponse, fetchAdminData } from "@/lib/admin-data-client";
import type { QuestionListItem } from "@/server/admin-content-data";

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
  difficulty?: string;
  status?: string;
  page: number;
}) {
  return fetchAdminData<ClientPaginatedResponse<QuestionListItem[]>>("questions", {
    search: params.search,
    category: params.category,
    difficulty: params.difficulty,
    status: params.status,
    page: params.page,
    limit: 50,
  });
}

export function BankSoalManager({
  initialResponse,
  initialFilters,
}: {
  readonly initialResponse: ClientPaginatedResponse<QuestionListItem[]>;
  readonly initialFilters: {
    search?: string;
    category?: string;
    difficulty?: string;
    status?: string;
  };
}) {
  const [response, setResponse] = useState(initialResponse);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);
  const [searchInput, setSearchInput] = useState(initialFilters.search ?? "");
  const [categoryInput, setCategoryInput] = useState(initialFilters.category ?? "all");
  const [difficultyInput, setDifficultyInput] = useState(initialFilters.difficulty ?? "all");
  const [statusInput, setStatusInput] = useState(initialFilters.status ?? "all");
  const [isPending, startTransition] = useTransition();

  const applyFilters = (nextFilters: {
    search?: string;
    category?: string;
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
      difficulty: normalizeFilterValue(difficultyInput),
      status: normalizeFilterValue(statusInput),
    });
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
        difficulty: appliedFilters.difficulty,
        status: appliedFilters.status,
      });
    }, 450);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [
    appliedFilters.category,
    appliedFilters.difficulty,
    appliedFilters.search,
    appliedFilters.status,
    searchInput,
  ]);

  return (
    <div className="flex flex-col gap-6">
      <form
        className="flex flex-wrap items-center gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          handleApply();
        }}
      >
        <Input
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          placeholder="Cari soal, sub-kategori, topik tag, atau area kompetensi"
          className="min-w-72 rounded-xl border-slate-200"
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
        <Button
          type="submit"
          variant="outline"
          className="rounded-xl border-slate-200 bg-white"
          disabled={isPending}
        >
          {isPending ? "Memuat..." : "Terapkan"}
        </Button>
      </form>

      <SectionCard
        title="Daftar Soal"
        description={`Menampilkan ${response.data.length} dari ${response.meta.totalItems.toLocaleString("id-ID")} soal`}
      >
        <QuestionsTable initialResponse={response} filters={appliedFilters} onResponseChange={setResponse} />
      </SectionCard>
    </div>
  );
}
