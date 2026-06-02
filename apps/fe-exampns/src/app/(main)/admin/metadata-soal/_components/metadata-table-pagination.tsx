"use client";

import { ServerPagination } from "@/components/server-pagination";

function formatRangeLabel(page: number, limit: number, totalItems: number, unitLabel: string) {
  if (totalItems <= 0) {
    return `Menampilkan 0 ${unitLabel}`;
  }

  const start = (page - 1) * limit + 1;
  const end = Math.min(page * limit, totalItems);
  return `Menampilkan ${start}-${end} dari ${totalItems.toLocaleString("id-ID")} ${unitLabel}`;
}

export function MetadataTablePagination({
  page,
  limit,
  totalItems,
  totalPages,
  unitLabel,
  params,
  pageParam,
  basePath,
  onPageChange,
}: {
  readonly page: number;
  readonly limit: number;
  readonly totalItems: number;
  readonly totalPages: number;
  readonly unitLabel: string;
  readonly params: Record<string, string | undefined>;
  readonly pageParam: string;
  readonly basePath: string;
  readonly onPageChange?: (page: number) => void;
}) {
  return (
    <div className="flex flex-col gap-3 border-slate-100 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-slate-500 text-sm">{formatRangeLabel(page, limit, totalItems, unitLabel)}</p>
      {totalPages > 1 ? (
        <ServerPagination
          page={page}
          totalPages={totalPages}
          params={params}
          pageParam={pageParam}
          basePath={basePath}
          onPageChange={onPageChange}
          showPageSummary={false}
          className="border-0 pt-0"
        />
      ) : null}
    </div>
  );
}
