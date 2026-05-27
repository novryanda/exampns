"use client";

import { useEffect, useMemo, useState, useTransition } from "react";

import Link from "next/link";

import { CheckCircle2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { StatusBadge } from "@/app/(main)/_components/page-shell";
import { ServerPagination } from "@/components/server-pagination";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type ClientPaginatedResponse, fetchAdminData } from "@/lib/admin-data-client";
import { toggleQuestionStatusAction } from "@/server/admin-content-actions";
import type { QuestionListItem } from "@/server/admin-content-data";

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function toDifficultyLabel(value: QuestionListItem["difficulty"]) {
  const labels = {
    easy: "Mudah",
    medium: "Sedang",
    hard: "Sulit",
  } as const;

  return labels[value];
}

function toStatusLabel(value: QuestionListItem["status"]) {
  const labels = {
    draft: "Draft",
    pending_review: "Menunggu Review",
    active: "Aktif",
    archived: "Diarsipkan",
  } as const;

  return labels[value];
}

function toSourceLabel(value: QuestionListItem["sourceType"]) {
  const labels = {
    manual: "Manual",
    pdf_import: "Impor PDF",
  } as const;

  return labels[value];
}

function buildPageHref(
  basePath: string,
  params: Record<string, string | undefined>,
  pageParam: string,
  page: number,
) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (!value || key === pageParam) {
      continue;
    }

    searchParams.set(key, value);
  }

  if (page > 1) {
    searchParams.set(pageParam, String(page));
  }

  const query = searchParams.toString();
  return query ? `${basePath}?${query}` : basePath;
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

export function QuestionsTable({
  initialResponse,
  filters,
  onResponseChange,
}: {
  readonly initialResponse: ClientPaginatedResponse<QuestionListItem[]>;
  readonly filters: {
    search?: string;
    category?: string;
    difficulty?: string;
    status?: string;
  };
  readonly onResponseChange?: (response: ClientPaginatedResponse<QuestionListItem[]>) => void;
}) {
  const [response, setResponse] = useState(initialResponse);
  const [pendingQuestionId, setPendingQuestionId] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const paginationParams = useMemo(
    () => ({
      search: filters.search,
      category: filters.category,
      difficulty: filters.difficulty,
      status: filters.status,
    }),
    [filters.category, filters.difficulty, filters.search, filters.status],
  );

  useEffect(() => {
    setResponse(initialResponse);
  }, [initialResponse]);

  useEffect(() => {
    onResponseChange?.(response);
  }, [onResponseChange, response]);

  const updateHistory = (page: number) => {
    const nextUrl = buildPageHref("/admin/bank-soal", paginationParams, "page", page);
    window.history.replaceState(null, "", nextUrl);
  };

  const loadPage = (page: number) => {
    startTransition(async () => {
      try {
        const nextResponse = await fetchQuestions({
          ...filters,
          page,
        });
        setResponse(nextResponse);
        updateHistory(page);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Gagal memuat daftar soal.");
      }
    });
  };

  const handleStatusToggle = (questionId: string, nextStatus: "active" | "archived") => {
    setPendingQuestionId(questionId);
    startTransition(async () => {
      try {
        await toggleQuestionStatusAction(questionId, nextStatus);
        const nextResponse = await fetchQuestions({
          ...filters,
          page: response.meta.page,
        });
        setResponse(nextResponse);
        toast.success(nextStatus === "active" ? "Soal berhasil diaktifkan." : "Soal berhasil diarsipkan.");
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Gagal memperbarui status soal.");
      } finally {
        setPendingQuestionId(null);
      }
    });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Preview Soal</TableHead>
            <TableHead>Kategori</TableHead>
            <TableHead>Sub-kategori</TableHead>
            <TableHead>Topik Tag</TableHead>
            <TableHead>Kesulitan</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Sumber</TableHead>
            <TableHead>Diperbarui</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {response.data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="py-10 text-center text-slate-400">
                Belum ada soal yang cocok dengan filter.
              </TableCell>
            </TableRow>
          ) : (
            response.data.map((question) => {
              const nextStatus = question.status === "archived" ? "active" : "archived";
              const buttonPending = isPending && pendingQuestionId === question.id;

              return (
                <TableRow key={question.id} className={isPending ? "opacity-80 transition-opacity" : undefined}>
                  <TableCell className="min-w-80 whitespace-normal font-medium text-slate-950">
                    {question.questionPreview}
                  </TableCell>
                  <TableCell>{question.category}</TableCell>
                  <TableCell>{question.subCategory}</TableCell>
                  <TableCell>{question.topicTag}</TableCell>
                  <TableCell>{toDifficultyLabel(question.difficulty)}</TableCell>
                  <TableCell>
                    <StatusBadge
                      tone={
                        question.status === "active"
                          ? "success"
                          : question.status === "archived"
                            ? "warning"
                            : "neutral"
                      }
                    >
                      {toStatusLabel(question.status)}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>{toSourceLabel(question.sourceType)}</TableCell>
                  <TableCell>{formatDateTime(question.updatedAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="rounded-lg" asChild>
                        <Link href={`/admin/bank-soal/${question.id}/edit`}>
                          <Pencil className="mr-1 size-4" />
                          Ubah
                        </Link>
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        disabled={buttonPending}
                        onClick={() => handleStatusToggle(question.id, nextStatus)}
                        className={
                          nextStatus === "active"
                            ? "rounded-lg border-emerald-200 text-emerald-600"
                            : "rounded-lg border-rose-200 text-rose-600"
                        }
                      >
                        {nextStatus === "active" ? (
                          <CheckCircle2 className="mr-1 size-4" />
                        ) : (
                          <Trash2 className="mr-1 size-4" />
                        )}
                        {buttonPending ? "Memproses..." : nextStatus === "active" ? "Aktifkan" : "Arsipkan"}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          )}
        </TableBody>
      </Table>
      <ServerPagination
        page={response.meta.page}
        totalPages={response.meta.totalPages}
        params={paginationParams}
        basePath="/admin/bank-soal"
        onPageChange={loadPage}
      />
    </>
  );
}
