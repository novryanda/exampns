"use client";

import { useEffect, useState, useTransition } from "react";

import Link from "next/link";

import { toast } from "sonner";

import { PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type ClientPaginatedResponse, fetchAdminData } from "@/lib/admin-data-client";
import type { ParsedQuestionListItem } from "@/server/admin-content-data";

function toLabel(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function buildFilterHref(filters: {
  status?: string;
  batchId?: string;
  search?: string;
  category?: string;
}) {
  const searchParams = new URLSearchParams();

  if (filters.status) {
    searchParams.set("status", filters.status);
  }

  if (filters.batchId) {
    searchParams.set("batchId", filters.batchId);
  }

  if (filters.search) {
    searchParams.set("search", filters.search);
  }

  if (filters.category) {
    searchParams.set("category", filters.category);
  }

  const query = searchParams.toString();
  return query ? `/admin/review-parsing?${query}` : "/admin/review-parsing";
}

async function fetchParsedQuestions(params: {
  status?: string;
  batchId?: string;
  search?: string;
  category?: string;
}) {
  return fetchAdminData<ClientPaginatedResponse<ParsedQuestionListItem[]>>("parsed-questions", {
    status: params.status,
    batchId: params.batchId,
    search: params.search,
    category: params.category,
    limit: 25,
  });
}

export function ReviewParsingManager({
  initialResponse,
  initialFilters,
}: {
  readonly initialResponse: ClientPaginatedResponse<ParsedQuestionListItem[]>;
  readonly initialFilters: {
    status?: string;
    batchId?: string;
    search?: string;
    category?: string;
  };
}) {
  const [response, setResponse] = useState(initialResponse);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);
  const [statusInput, setStatusInput] = useState(initialFilters.status ?? "pending_review");
  const [batchIdInput, setBatchIdInput] = useState(initialFilters.batchId ?? "");
  const [searchInput, setSearchInput] = useState(initialFilters.search ?? "");
  const [categoryInput, setCategoryInput] = useState(initialFilters.category ?? "all");
  const [isPending, startTransition] = useTransition();

  const applyFilters = (nextFilters: {
    status?: string;
    batchId?: string;
    search?: string;
    category?: string;
  }) => {
    startTransition(async () => {
      try {
        const nextResponse = await fetchParsedQuestions(nextFilters);
        setAppliedFilters(nextFilters);
        setResponse(nextResponse);
        window.history.replaceState(null, "", buildFilterHref(nextFilters));
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Gagal memuat hasil parsing.");
      }
    });
  };

  const handleApply = () => {
    applyFilters({
      status: statusInput || "pending_review",
      batchId: batchIdInput.trim() || undefined,
      search: searchInput.trim() || undefined,
      category: categoryInput !== "all" ? categoryInput : undefined,
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
        status: appliedFilters.status || "pending_review",
        batchId: appliedFilters.batchId,
        search: normalizedSearch,
        category: appliedFilters.category,
      });
    }, 450);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [appliedFilters.batchId, appliedFilters.category, appliedFilters.search, appliedFilters.status, searchInput]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Tinjau Parsing" description="Tinjau hasil parsing sebelum soal masuk ke bank soal aktif." />

      <div className="flex gap-2">
        {[
          ["pending_review", "Menunggu Review"],
          ["approved", "Disetujui"],
          ["rejected", "Ditolak"],
        ].map(([value, label]) => (
          <button
            key={value}
            type="button"
            onClick={() => {
              setStatusInput(value);
              applyFilters({
                status: value,
                batchId: batchIdInput.trim() || undefined,
                search: searchInput.trim() || undefined,
                category: categoryInput !== "all" ? categoryInput : undefined,
              });
            }}
            className={`rounded-full px-4 py-2 text-sm ${
              statusInput === value ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

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
          placeholder="Cari hasil parsing"
          className="min-w-72 rounded-xl border-slate-200"
        />
        <Input
          value={batchIdInput}
          onChange={(event) => setBatchIdInput(event.target.value)}
          placeholder="Filter ID batch"
          className="min-w-56 rounded-xl border-slate-200"
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
        <Button type="submit" variant="outline" className="rounded-xl border-slate-200 bg-white" disabled={isPending}>
          {isPending ? "Memuat..." : "Terapkan"}
        </Button>
      </form>

      <SectionCard
        title="Antrean Parsing"
        description={`Menampilkan ${response.data.length} dari ${response.meta.totalItems.toLocaleString("id-ID")} item hasil parsing.`}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Preview Soal</TableHead>
              <TableHead>Kategori</TableHead>
              <TableHead>Topik Tag</TableHead>
              <TableHead>Kesulitan</TableHead>
              <TableHead>Keyakinan</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {response.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-slate-400">
                  Tidak ada hasil parsing untuk filter ini.
                </TableCell>
              </TableRow>
            ) : (
              response.data.map((item) => (
                <TableRow key={item.id} className={isPending ? "opacity-80 transition-opacity" : undefined}>
                  <TableCell className="min-w-80 whitespace-normal font-medium text-slate-950">
                    {item.questionPreview}
                  </TableCell>
                  <TableCell>{item.category ?? "-"}</TableCell>
                  <TableCell>{item.topicTag ?? "-"}</TableCell>
                  <TableCell>{item.difficulty ? toLabel(item.difficulty) : "-"}</TableCell>
                  <TableCell>{item.confidenceScore === null ? "-" : `${item.confidenceScore}%`}</TableCell>
                  <TableCell>
                    <StatusBadge
                      tone={item.status === "approved" ? "success" : item.status === "rejected" ? "danger" : "warning"}
                    >
                      {toLabel(item.status)}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <Link className="text-blue-600 text-sm hover:underline" href={`/admin/review-parsing/${item.id}`}>
                      Tinjau
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </SectionCard>
    </div>
  );
}
