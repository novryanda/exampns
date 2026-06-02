"use client";

import { useCallback, useEffect, useState, useTransition } from "react";

import Link from "next/link";

import { Copy, Pencil, Plus, Send, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import { ConfirmActionDialog } from "@/components/ui/confirm-action-dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type ClientPaginatedResponse, fetchAdminData } from "@/lib/admin-data-client";
import {
  archiveTryoutDraftAction,
  duplicateTryoutDraftAction,
  submitTryoutDraftAction,
} from "@/server/admin-content-actions";
import type { AdminTryoutDraftItem } from "@/server/admin-content-data";

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function toLabel(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function buildFilterHref(filters: { search?: string; status?: string; tryoutType?: string }) {
  const searchParams = new URLSearchParams();

  if (filters.search) {
    searchParams.set("search", filters.search);
  }

  if (filters.status) {
    searchParams.set("status", filters.status);
  }

  if (filters.tryoutType) {
    searchParams.set("tryoutType", filters.tryoutType);
  }

  const query = searchParams.toString();
  return query ? `/admin/tryout-drafts?${query}` : "/admin/tryout-drafts";
}

async function fetchDrafts(params: { search?: string; status?: string; tryoutType?: string }) {
  return fetchAdminData<ClientPaginatedResponse<AdminTryoutDraftItem[]>>("tryout-drafts", {
    search: params.search,
    status: params.status,
    tryoutType: params.tryoutType,
    limit: 20,
  });
}

export function TryoutDraftsManager({
  initialResponse,
  initialFilters,
}: {
  readonly initialResponse: ClientPaginatedResponse<AdminTryoutDraftItem[]>;
  readonly initialFilters: {
    search?: string;
    status?: string;
    tryoutType?: string;
  };
}) {
  const [response, setResponse] = useState(initialResponse);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);
  const [searchInput, setSearchInput] = useState(initialFilters.search ?? "");
  const [statusInput, setStatusInput] = useState(initialFilters.status ?? "all");
  const [typeInput, setTypeInput] = useState(initialFilters.tryoutType ?? "all");
  const [isPending, startTransition] = useTransition();

  const applyFilters = useCallback((nextFilters: { search?: string; status?: string; tryoutType?: string }) => {
    startTransition(async () => {
      try {
        const nextResponse = await fetchDrafts(nextFilters);
        setAppliedFilters(nextFilters);
        setResponse(nextResponse);
        window.history.replaceState(null, "", buildFilterHref(nextFilters));
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Gagal memuat draft tryout.");
      }
    });
  }, []);

  const handleApply = () => {
    applyFilters({
      search: searchInput.trim() || undefined,
      status: statusInput !== "all" ? statusInput : undefined,
      tryoutType: typeInput !== "all" ? typeInput : undefined,
    });
  };

  const handleDelete = async (draft: AdminTryoutDraftItem) => {
    await new Promise<void>((resolve, reject) => {
      startTransition(async () => {
        try {
          await archiveTryoutDraftAction(draft.id);
          setResponse((current) => ({
            success: true,
            data: current.data.filter((item) => item.id !== draft.id),
            meta: {
              ...current.meta,
              totalItems: Math.max(0, current.meta.totalItems - 1),
            },
          }));
          toast.success("Tryout draft berhasil dihapus dari daftar draft.");
          resolve();
        } catch (error) {
          toast.error(error instanceof Error ? error.message : "Gagal menghapus draft tryout.");
          reject(error);
        }
      });
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
        status: appliedFilters.status,
        tryoutType: appliedFilters.tryoutType,
      });
    }, 450);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [appliedFilters.search, appliedFilters.status, appliedFilters.tryoutType, applyFilters, searchInput]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Draft Tryout"
        description="Buat draft sebelum diterbitkan oleh super admin."
        actions={
          <Button asChild className="rounded-xl bg-blue-600 hover:bg-blue-700">
            <Link href="/admin/tryout-drafts/new">
              <Plus className="mr-2 size-4" />
              Buat Draft
            </Link>
          </Button>
        }
      />

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
          placeholder="Cari nama draft"
          className="min-w-72 rounded-xl border-slate-200"
        />
        <Select value={typeInput} onValueChange={setTypeInput}>
          <SelectTrigger className="w-40 rounded-xl border-slate-200 bg-white">
            <SelectValue placeholder="Tipe" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Tipe</SelectItem>
            <SelectItem value="generated">Otomatis</SelectItem>
            <SelectItem value="manual">Manual</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
            <SelectItem value="adaptive">Adaptive</SelectItem>
          </SelectContent>
        </Select>
        <Select value={statusInput} onValueChange={setStatusInput}>
          <SelectTrigger className="w-40 rounded-xl border-slate-200 bg-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="review">Review</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit" variant="outline" className="rounded-xl border-slate-200 bg-white" disabled={isPending}>
          {isPending ? "Memuat..." : "Terapkan"}
        </Button>
      </form>

      <SectionCard
        title="Daftar Draft"
        description={`Menampilkan ${response.data.length} dari ${response.meta.totalItems.toLocaleString("id-ID")} draft tryout.`}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nama</TableHead>
              <TableHead>Tipe</TableHead>
              <TableHead>Akses</TableHead>
              <TableHead>Jumlah Soal</TableHead>
              <TableHead>Durasi</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Diperbarui</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {response.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center text-slate-400">
                  Belum ada draft tryout.
                </TableCell>
              </TableRow>
            ) : (
              response.data.map((draft) => (
                <TableRow key={draft.id} className={isPending ? "opacity-80 transition-opacity" : undefined}>
                  <TableCell className="font-medium text-slate-950">{draft.name}</TableCell>
                  <TableCell>{toLabel(draft.tryoutType)}</TableCell>
                  <TableCell>{toLabel(draft.accessType)}</TableCell>
                  <TableCell>{draft.totalQuestions}</TableCell>
                  <TableCell>{draft.durationMinutes} menit</TableCell>
                  <TableCell>
                    <StatusBadge tone={draft.status === "review" ? "warning" : "neutral"}>
                      {toLabel(draft.status)}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>{formatDateTime(draft.updatedAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="rounded-lg" asChild>
                        <Link href={`/admin/tryout-drafts/${draft.id}/edit`}>
                          <Pencil className="mr-1 size-4" />
                          Builder
                        </Link>
                      </Button>
                      <form action={duplicateTryoutDraftAction.bind(null, draft.id)}>
                        <Button variant="outline" size="sm" className="rounded-lg">
                          <Copy className="mr-1 size-4" />
                          Duplikasi
                        </Button>
                      </form>
                      {draft.status === "draft" ? (
                        <form action={submitTryoutDraftAction.bind(null, draft.id)}>
                          <Button size="sm" className="rounded-lg bg-blue-600 hover:bg-blue-700">
                            <Send className="mr-1 size-4" />
                            Ajukan
                          </Button>
                        </form>
                      ) : null}
                      <ConfirmActionDialog
                        title="Hapus draft tryout?"
                        description={`Draft "${draft.name}" akan diarsipkan dan tidak tampil lagi di daftar draft admin.`}
                        confirmLabel="Ya, hapus draft"
                        onConfirm={() => handleDelete(draft)}
                      >
                        <Button type="button" size="sm" variant="destructive" className="rounded-lg">
                          <Trash2 className="mr-1 size-4" />
                          Hapus
                        </Button>
                      </ConfirmActionDialog>
                    </div>
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
