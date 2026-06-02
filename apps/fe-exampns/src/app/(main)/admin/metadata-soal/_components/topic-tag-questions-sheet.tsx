"use client";

import { useEffect, useEffectEvent, useState, useTransition } from "react";

import Link from "next/link";

import { Eye, FileText, LoaderCircle, Search } from "lucide-react";
import { toast } from "sonner";

import { StatusBadge } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { type ClientPaginatedResponse, fetchAdminData } from "@/lib/admin-data-client";
import type { QuestionTopicTagItem, QuestionTopicTagQuestionItem } from "@/server/admin-content-data";

function toDifficultyLabel(value: QuestionTopicTagQuestionItem["difficulty"]) {
  if (value === "easy") return "Mudah";
  if (value === "medium") return "Sedang";
  return "Sulit";
}

function toStatusLabel(value: QuestionTopicTagQuestionItem["status"]) {
  if (value === "active") return "Aktif";
  if (value === "pending_review") return "Menunggu Review";
  if (value === "archived") return "Diarsipkan";
  return "Draft";
}

function toStatusTone(value: QuestionTopicTagQuestionItem["status"]) {
  if (value === "active") return "success" as const;
  if (value === "pending_review") return "warning" as const;
  if (value === "archived") return "danger" as const;
  return "neutral" as const;
}

const dateTimeFormatter = new Intl.DateTimeFormat("id-ID", {
  dateStyle: "medium",
  timeStyle: "short",
});

async function fetchTopicTagQuestions(topicTagId: string, params: { search?: string; page?: number; limit?: number }) {
  return fetchAdminData<ClientPaginatedResponse<QuestionTopicTagQuestionItem[]>>(
    `question-metadata/topic-tags/${topicTagId}/questions`,
    {
      search: params.search,
      page: params.page,
      limit: params.limit,
    },
  );
}

export function TopicTagQuestionsSheet({ item }: { readonly item: QuestionTopicTagItem }) {
  const [open, setOpen] = useState(false);
  const [response, setResponse] = useState<ClientPaginatedResponse<QuestionTopicTagQuestionItem[]> | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [appliedSearch, setAppliedSearch] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const loadQuestions = useEffectEvent((params?: { search?: string; page?: number }) => {
    startTransition(async () => {
      try {
        const nextResponse = await fetchTopicTagQuestions(item.id, {
          search: params?.search,
          page: params?.page ?? 1,
          limit: 10,
        });
        setResponse(nextResponse);
        setAppliedSearch(params?.search);
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Gagal memuat daftar soal topik tag.");
      }
    });
  });

  const handleOpenChange = (nextOpen: boolean) => {
    setOpen(nextOpen);

    if (!nextOpen) {
      setResponse(null);
      setSearchInput("");
      setAppliedSearch(undefined);
    }
  };

  useEffect(() => {
    if (!open || response) {
      return;
    }

    loadQuestions({ search: searchInput.trim() || undefined, page: 1 });
  }, [open, response, searchInput]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const normalizedSearch = searchInput.trim() || undefined;
    if (normalizedSearch === appliedSearch) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      loadQuestions({ search: normalizedSearch, page: 1 });
    }, 350);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [appliedSearch, open, searchInput]);

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-lg">
          <Eye className="mr-1 size-4" />
          Detail
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="border-slate-200 bg-white p-0 data-[side=right]:w-full data-[side=right]:max-w-full data-[side=right]:border-l sm:data-[side=right]:w-[480px] sm:data-[side=right]:max-w-[480px]"
      >
        <SheetHeader className="gap-2 border-slate-200 border-b px-5 py-4">
          <div className="pr-10">
            <SheetTitle>Daftar Soal Topik Tag</SheetTitle>
            <SheetDescription className="mt-1">
              {item.name} di {item.category} / {item.subCategory}
            </SheetDescription>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
            <div className="relative">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder="Cari isi soal, penjelasan, atau tag"
                className="rounded-xl border-slate-200 bg-white pl-9"
              />
            </div>
          </div>
        </SheetHeader>

        <div className="flex min-h-0 flex-1 flex-col">
          <div className="flex items-center justify-between border-slate-100 border-b px-5 py-3 text-slate-500 text-sm">
            <span>
              {response ? `${response.meta.totalItems.toLocaleString("id-ID")} soal ditemukan` : "Memuat soal"}
            </span>
            <span>{item.questionCount.toLocaleString("id-ID")} total soal di tag ini</span>
          </div>

          <div className="min-h-0 flex-1 overflow-y-auto px-5 py-4">
            {!response && isPending ? (
              <div className="flex h-full min-h-48 items-center justify-center text-slate-500">
                <LoaderCircle className="mr-2 size-4 animate-spin" />
                Memuat daftar soal...
              </div>
            ) : response && response.data.length === 0 ? (
              <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-slate-200 border-dashed bg-slate-50 px-6 text-center">
                <FileText className="mb-3 size-8 text-slate-300" />
                <p className="font-medium text-slate-900">Belum ada soal yang cocok</p>
                <p className="mt-1 text-slate-500 text-sm">Coba ubah kata kunci pencarian atau cek topik tag lain.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {response?.data.map((question) => (
                  <article key={question.id} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-xs">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <StatusBadge tone={toStatusTone(question.status)}>{toStatusLabel(question.status)}</StatusBadge>
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-600 text-xs">
                        {question.category}
                      </span>
                      <span className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-slate-600 text-xs">
                        {toDifficultyLabel(question.difficulty)}
                      </span>
                    </div>

                    <p className="font-medium text-slate-950 text-sm leading-6">{question.questionPreview}</p>

                    <div className="mt-3 grid gap-1 text-slate-500 text-xs">
                      <p>
                        Sub-kategori: <span className="text-slate-700">{question.subCategory}</span>
                      </p>
                      <p>
                        Diperbarui:{" "}
                        <span className="text-slate-700">{dateTimeFormatter.format(new Date(question.updatedAt))}</span>
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="font-mono text-[11px] text-slate-400">{question.id}</span>
                      <Link
                        href={`/admin/bank-soal/${question.id}/edit`}
                        className="text-blue-600 text-sm hover:underline"
                      >
                        Buka soal
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>

          <div className="flex items-center justify-between border-slate-200 border-t px-5 py-4">
            <div className="text-slate-500 text-sm">
              {response ? `Halaman ${response.meta.page} dari ${response.meta.totalPages}` : "Halaman -"}
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-lg"
                disabled={!response || response.meta.page <= 1 || isPending}
                onClick={() => loadQuestions({ search: appliedSearch, page: (response?.meta.page ?? 1) - 1 })}
              >
                Sebelumnya
              </Button>
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-lg"
                disabled={!response || response.meta.page >= response.meta.totalPages || isPending}
                onClick={() => loadQuestions({ search: appliedSearch, page: (response?.meta.page ?? 1) + 1 })}
              >
                Berikutnya
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
