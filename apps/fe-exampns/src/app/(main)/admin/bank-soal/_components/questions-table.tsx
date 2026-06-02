"use client";

import { useEffect, useMemo, useState, useTransition } from "react";

import Link from "next/link";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type Table,
  type VisibilityState,
} from "@tanstack/react-table";
import { CheckCircle2, EyeOff, Pencil, Settings2, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { ServerPagination } from "@/components/server-pagination";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { type ClientPaginatedResponse, fetchAdminData } from "@/lib/admin-data-client";
import { toggleQuestionStatusAction } from "@/server/admin-content-actions";
import type { QuestionListItem } from "@/server/admin-content-data";

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

const initialColumnVisibility: VisibilityState = {};

const columnWidthClassById: Record<string, string> = {
  questionPreview: "min-w-[440px] w-[600px]",
  difficulty: "min-w-[120px] w-[120px]",
  status: "min-w-[140px] w-[140px]",
  sourceType: "min-w-[130px] w-[130px]",
  actions: "min-w-[170px] w-[170px]",
};

const centeredColumnIds = new Set(["difficulty", "status", "sourceType", "actions"]);

function QuestionsColumnVisibilityMenu({
  table,
  onReset,
}: {
  readonly table: Table<QuestionListItem>;
  readonly onReset: () => void;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="shrink-0 rounded-xl border-slate-200 bg-white">
          <Settings2 className="mr-2 size-4" />
          Tampilan Kolom
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>Atur Kolom</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {table
          .getAllColumns()
          .filter((column) => column.getCanHide())
          .map((column) => (
            <DropdownMenuCheckboxItem
              key={column.id}
              checked={column.getIsVisible()}
              onCheckedChange={(value) => column.toggleVisibility(Boolean(value))}
              className="capitalize"
            >
              {column.id === "questionPreview"
                ? "Soal"
                : column.id === "sourceType"
                  ? "Sumber"
                  : column.id === "difficulty"
                    ? "Kesulitan"
                    : column.id === "status"
                      ? "Status"
                      : column.id}
            </DropdownMenuCheckboxItem>
          ))}
        <DropdownMenuSeparator />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="mt-1 w-full justify-start rounded-md px-2 text-slate-600"
          onClick={onReset}
        >
          <EyeOff className="mr-2 size-4" />
          Reset Tampilan
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
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
    subCategoryId?: string;
    difficulty?: string;
    status?: string;
  };
  readonly onResponseChange?: (response: ClientPaginatedResponse<QuestionListItem[]>) => void;
}) {
  const [response, setResponse] = useState(initialResponse);
  const [pendingQuestionId, setPendingQuestionId] = useState<string | null>(null);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>(initialColumnVisibility);
  const [isPending, startTransition] = useTransition();

  const paginationParams = useMemo(
    () => ({
      search: filters.search,
      category: filters.category,
      subCategoryId: filters.subCategoryId,
      difficulty: filters.difficulty,
      status: filters.status,
    }),
    [filters.category, filters.difficulty, filters.search, filters.status, filters.subCategoryId],
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

  const columns = useMemo<ColumnDef<QuestionListItem>[]>(
    () => [
      {
        accessorKey: "questionPreview",
        id: "questionPreview",
        enableHiding: false,
        header: "Soal",
        cell: ({ row }) => (
          <div className="space-y-2">
            <p
              className="line-clamp-2 whitespace-normal wrap-break-word font-medium text-slate-950 leading-6"
              title={row.original.questionPreview}
            >
              {row.original.questionPreview}
            </p>
            <div className="flex flex-wrap gap-1.5 text-[11px]">
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 font-medium text-slate-600">
                {row.original.category}
              </span>
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-slate-600">
                {row.original.subCategory}
              </span>
              <span className="inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-2 py-0.5 text-slate-600">
                {row.original.topicTag}
              </span>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "difficulty",
        header: "Kesulitan",
        cell: ({ row }) => <span className="whitespace-nowrap">{toDifficultyLabel(row.original.difficulty)}</span>,
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <StatusBadge
            tone={
              row.original.status === "active"
                ? "success"
                : row.original.status === "archived"
                  ? "warning"
                  : "neutral"
            }
          >
            {toStatusLabel(row.original.status)}
          </StatusBadge>
        ),
      },
      {
        accessorKey: "sourceType",
        header: "Sumber",
        cell: ({ row }) => <span className="whitespace-nowrap">{toSourceLabel(row.original.sourceType)}</span>,
      },
      {
        id: "actions",
        enableHiding: false,
        header: "Aksi",
        cell: ({ row }) => {
          const question = row.original;
          const nextStatus = question.status === "archived" ? "active" : "archived";
          const buttonPending = isPending && pendingQuestionId === question.id;

          return (
            <div className="flex items-center justify-center gap-2">
              <Button variant="outline" size="sm" className="rounded-lg" asChild>
                <Link href={`/admin/bank-soal/${question.id}/edit`}>
                  <Pencil className="size-4" />
                  Edit
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
                    ? "rounded-lg border-emerald-200 px-2 text-emerald-600"
                    : "rounded-lg border-rose-200 px-2 text-rose-600"
                }
                aria-label={nextStatus === "active" ? "Aktifkan soal" : "Arsipkan soal"}
                title={nextStatus === "active" ? "Aktifkan" : "Arsipkan"}
              >
                {nextStatus === "active" ? (
                  <CheckCircle2 className="size-4" />
                ) : (
                  <Trash2 className="size-4" />
                )}
                {buttonPending ? "Memproses..." : nextStatus === "active" ? "Aktifkan" : "Arsipkan"}
              </Button>
            </div>
          );
        },
      },
    ],
    [handleStatusToggle, isPending, pendingQuestionId],
  );

  const table = useReactTable({
    data: response.data,
    columns,
    state: {
      columnVisibility,
    },
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
  });

  const listStart = response.meta.totalItems === 0 ? 0 : (response.meta.page - 1) * response.meta.limit + 1;
  const listEnd = Math.min(response.meta.page * response.meta.limit, response.meta.totalItems);
  const listDescription =
    response.meta.totalItems === 0
      ? "Menampilkan 0 soal"
      : `Menampilkan ${listStart}-${listEnd} dari ${response.meta.totalItems.toLocaleString("id-ID")} soal`;

  return (
    <SectionCard
      className="min-w-0 gap-2"
      contentClassName="pt-0"
      title="Daftar Soal"
      description={listDescription}
      trailing={
        <QuestionsColumnVisibilityMenu
          table={table}
          onReset={() => setColumnVisibility(initialColumnVisibility)}
        />
      }
    >
      <div className="min-w-0 w-full max-w-full overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[980px] caption-bottom text-sm">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={cn(
                      "h-12 align-middle",
                      columnWidthClassById[header.column.id],
                      centeredColumnIds.has(header.column.id) ? "text-center" : "text-left",
                    )}
                  >
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className={isPending ? "opacity-80 transition-opacity" : undefined}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className={cn(
                        "whitespace-normal",
                        columnWidthClassById[cell.column.id],
                        centeredColumnIds.has(cell.column.id) ? "align-middle text-center" : "align-top",
                      )}
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={table.getVisibleLeafColumns().length} className="py-10 text-center text-slate-400">
                  Belum ada soal yang cocok dengan filter.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </table>
      </div>

      <ServerPagination
        page={response.meta.page}
        totalPages={response.meta.totalPages}
        params={paginationParams}
        basePath="/admin/bank-soal"
        onPageChange={loadPage}
      />
    </SectionCard>
  );
}
