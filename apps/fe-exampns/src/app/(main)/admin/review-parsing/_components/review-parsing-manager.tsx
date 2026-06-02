"use client";

import { useActionState, useEffect, useEffectEvent, useMemo, useState, useTransition } from "react";

import Link from "next/link";

import { toast } from "sonner";

import { PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { ServerPagination } from "@/components/server-pagination";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { type ClientPaginatedResponse, fetchAdminData } from "@/lib/admin-data-client";
import { initialResourceActionState } from "@/server/admin-action-state";
import { bulkApproveParsedQuestionsAction } from "@/server/admin-content-actions";
import type { ParsedQuestionListItem } from "@/server/admin-content-data";

function toLabel(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function toDifficultyLabel(value: ParsedQuestionListItem["difficulty"]) {
  if (value === "easy") return "Mudah";
  if (value === "medium") return "Sedang";
  if (value === "hard") return "Sulit";
  return "-";
}

function buildFilterHref(filters: {
  status?: string;
  batchId?: string;
  search?: string;
  category?: string;
  page?: number;
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

  if (filters.page && filters.page > 1) {
    searchParams.set("page", String(filters.page));
  }

  const query = searchParams.toString();
  return query ? `/admin/review-parsing?${query}` : "/admin/review-parsing";
}

async function fetchParsedQuestions(params: {
  status?: string;
  batchId?: string;
  search?: string;
  category?: string;
  page?: number;
}) {
  return fetchAdminData<ClientPaginatedResponse<ParsedQuestionListItem[]>>("parsed-questions", {
    status: params.status,
    batchId: params.batchId,
    search: params.search,
    category: params.category,
    page: params.page,
    limit: 20,
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
    page?: number;
  };
}) {
  const [response, setResponse] = useState(initialResponse);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);
  const [statusInput, setStatusInput] = useState(initialFilters.status ?? "pending_review");
  const [batchIdInput, setBatchIdInput] = useState(initialFilters.batchId ?? "");
  const [searchInput, setSearchInput] = useState(initialFilters.search ?? "");
  const [categoryInput, setCategoryInput] = useState(initialFilters.category ?? "all");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();
  const [bulkApproveState, bulkApproveAction, isBulkApproving] = useActionState(
    bulkApproveParsedQuestionsAction,
    initialResourceActionState,
  );

  const selectableIds = useMemo(
    () => response.data.filter((item) => item.status === "pending_review").map((item) => item.id),
    [response.data],
  );
  const selectedCount = selectedIds.length;
  const allSelectableSelected = selectableIds.length > 0 && selectableIds.every((id) => selectedIds.includes(id));
  const someSelectableSelected = !allSelectableSelected && selectableIds.some((id) => selectedIds.includes(id));

  const applyFilters = useEffectEvent(
    (nextFilters: { status?: string; batchId?: string; search?: string; category?: string; page?: number }) => {
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
    },
  );

  const refreshCurrentPage = useEffectEvent(() => {
    applyFilters({
      status: appliedFilters.status || "pending_review",
      batchId: appliedFilters.batchId,
      search: appliedFilters.search,
      category: appliedFilters.category,
      page: appliedFilters.page ?? response.meta.page,
    });
  });

  const handleApply = () => {
    applyFilters({
      status: statusInput || "pending_review",
      batchId: batchIdInput.trim() || undefined,
      search: searchInput.trim() || undefined,
      category: categoryInput !== "all" ? categoryInput : undefined,
      page: 1,
    });
  };

  useEffect(() => {
    const normalizedSearch = searchInput.trim() || undefined;
    const normalizedAppliedSearch = appliedFilters.search?.trim() || undefined;

    if (normalizedSearch === normalizedAppliedSearch) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      startTransition(async () => {
        try {
          const nextFilters = {
            status: appliedFilters.status || "pending_review",
            batchId: appliedFilters.batchId,
            search: normalizedSearch,
            category: appliedFilters.category,
            page: 1,
          };
          const nextResponse = await fetchParsedQuestions(nextFilters);
          setAppliedFilters(nextFilters);
          setResponse(nextResponse);
          window.history.replaceState(null, "", buildFilterHref(nextFilters));
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Gagal memuat hasil parsing.");
        }
      });
    }, 450);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [appliedFilters.batchId, appliedFilters.category, appliedFilters.search, appliedFilters.status, searchInput]);

  useEffect(() => {
    setSelectedIds((current) => current.filter((id) => selectableIds.includes(id)));
  }, [selectableIds]);

  useEffect(() => {
    if (bulkApproveState.status === "success") {
      toast.success(bulkApproveState.message);
      setSelectedIds([]);
      refreshCurrentPage();
      return;
    }

    if (bulkApproveState.status === "error") {
      toast.error(bulkApproveState.message);
    }
  }, [bulkApproveState]);

  const toggleSelected = (parsedQuestionId: string, checked: boolean) => {
    setSelectedIds((current) => {
      if (checked) {
        return current.includes(parsedQuestionId) ? current : [...current, parsedQuestionId];
      }

      return current.filter((item) => item !== parsedQuestionId);
    });
  };

  return (
    <div className="flex min-w-0 w-full max-w-full flex-col gap-6">
      <PageHeader title="Tinjau Parsing" description="Tinjau hasil parsing sebelum soal masuk ke bank soal aktif." />

      <div className="flex flex-wrap gap-2">
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
                page: 1,
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

      <SectionCard
        title="Filter Review"
        description="Persempit antrean berdasarkan batch, kategori, atau kata kunci tertentu."
      >
        <form
          className="grid gap-3 lg:grid-cols-[1.35fr_1fr_220px_auto]"
          onSubmit={(event) => {
            event.preventDefault();
            handleApply();
          }}
        >
          <Input
            value={searchInput}
            onChange={(event) => setSearchInput(event.target.value)}
            placeholder="Cari hasil parsing"
            className="rounded-xl border-slate-200"
          />
          <Input
            value={batchIdInput}
            onChange={(event) => setBatchIdInput(event.target.value)}
            placeholder="Filter ID batch"
            className="rounded-xl border-slate-200"
          />
          <Select value={categoryInput} onValueChange={setCategoryInput}>
            <SelectTrigger className="w-full rounded-xl border-slate-200 bg-white">
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
      </SectionCard>

      <SectionCard
        title="Antrean Parsing"
        description={`Menampilkan ${response.data.length} dari ${response.meta.totalItems.toLocaleString("id-ID")} item hasil parsing.`}
      >
        <form
          action={bulkApproveAction}
          className="mb-5 space-y-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4"
        >
          {selectedIds.map((id) => (
            <input key={id} type="hidden" name="parsedQuestionIds" value={id} />
          ))}
          <input type="hidden" name="approvedStatus" value="active" />
          <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-1">
              <p className="font-medium text-slate-950">
                {selectedCount > 0
                  ? `${selectedCount} hasil parsing dipilih`
                  : "Pilih hasil parsing yang siap langsung disetujui"}
              </p>
              <p className="text-slate-500 text-sm">
                Checkbox hanya aktif untuk item yang masih berstatus menunggu review.
              </p>
            </div>
            <Button type="submit" disabled={selectedCount === 0 || isBulkApproving || isPending}>
              {isBulkApproving ? "Menyetujui..." : "Setujui Terpilih"}
            </Button>
          </div>
          <Textarea
            name="bulkReviewNotes"
            defaultValue="Bulk approve dari antrean parsing."
            placeholder="Catatan review untuk semua item terpilih"
            className="min-h-24 rounded-xl border-slate-200 bg-white"
          />
        </form>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={allSelectableSelected ? true : someSelectableSelected ? "indeterminate" : false}
                  onCheckedChange={(checked) => {
                    setSelectedIds(checked === true ? selectableIds : []);
                  }}
                  aria-label="Pilih semua hasil parsing di halaman ini"
                  disabled={selectableIds.length === 0 || isPending || isBulkApproving}
                />
              </TableHead>
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
                <TableCell colSpan={8} className="py-10 text-center text-slate-400">
                  Tidak ada hasil parsing untuk filter ini.
                </TableCell>
              </TableRow>
            ) : (
              response.data.map((item) => (
                <TableRow key={item.id} className={isPending ? "opacity-80 transition-opacity" : undefined}>
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.includes(item.id)}
                      onCheckedChange={(checked) => {
                        toggleSelected(item.id, checked === true);
                      }}
                      aria-label={`Pilih hasil parsing ${item.id}`}
                      disabled={item.status !== "pending_review" || isPending || isBulkApproving}
                    />
                  </TableCell>
                  <TableCell className="min-w-80 whitespace-normal">
                    <div className="max-w-4xl">
                      <p className="font-medium text-slate-950 leading-7">{item.questionPreview}</p>
                      <p className="mt-1 text-slate-500 text-xs">
                        Batch: <span className="font-mono">{item.batchId}</span>
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{item.category ?? "-"}</TableCell>
                  <TableCell>{item.topicTag ?? "-"}</TableCell>
                  <TableCell>{toDifficultyLabel(item.difficulty)}</TableCell>
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
        <ServerPagination
          page={response.meta.page}
          totalPages={response.meta.totalPages}
          basePath="/admin/review-parsing"
          params={{
            status: appliedFilters.status,
            batchId: appliedFilters.batchId,
            search: appliedFilters.search,
            category: appliedFilters.category,
          }}
          onPageChange={(page) => {
            applyFilters({
              status: appliedFilters.status || "pending_review",
              batchId: appliedFilters.batchId,
              search: appliedFilters.search,
              category: appliedFilters.category,
              page,
            });
          }}
        />
      </SectionCard>
    </div>
  );
}
