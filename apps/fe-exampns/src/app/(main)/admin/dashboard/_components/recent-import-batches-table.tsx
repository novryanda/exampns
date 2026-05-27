"use client";

import { useState, useTransition } from "react";

import { toast } from "sonner";

import { StatusBadge } from "@/app/(main)/_components/page-shell";
import { ServerPagination } from "@/components/server-pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type ClientPaginatedResponse, fetchAdminData } from "@/lib/admin-data-client";
import type { PdfImportBatchItem } from "@/server/admin-content-data";

function toLabel(value: string) {
  const labels: Record<string, string> = {
    processing: "Diproses",
    completed: "Selesai",
    partial_failed: "Sebagian Gagal",
    failed: "Gagal",
  };

  return labels[value] ?? value;
}

function buildPageHref(importPage: number) {
  const searchParams = new URLSearchParams(window.location.search);

  if (importPage > 1) {
    searchParams.set("importPage", String(importPage));
  } else {
    searchParams.delete("importPage");
  }

  const query = searchParams.toString();
  return query ? `/admin/dashboard?${query}` : "/admin/dashboard";
}

async function fetchImportBatches(page: number) {
  return fetchAdminData<ClientPaginatedResponse<PdfImportBatchItem[]>>("pdf-imports", {
    page,
    limit: 20,
  });
}

export function RecentImportBatchesTable({
  initialResponse,
  activityPage,
}: {
  readonly initialResponse: ClientPaginatedResponse<PdfImportBatchItem[]>;
  readonly activityPage: number;
}) {
  const [response, setResponse] = useState(initialResponse);
  const [isPending, startTransition] = useTransition();

  const loadPage = (page: number) => {
    startTransition(async () => {
      try {
        const nextResponse = await fetchImportBatches(page);
        setResponse(nextResponse);
        window.history.replaceState(null, "", buildPageHref(page));
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Gagal memuat batch PDF.");
      }
    });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nama File</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Valid</TableHead>
            <TableHead>Invalid</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {response.data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="py-10 text-center text-slate-400">
                Belum ada batch PDF terbaru.
              </TableCell>
            </TableRow>
          ) : (
            response.data.map((batch) => (
              <TableRow key={batch.batchId} className={isPending ? "opacity-80" : undefined}>
                <TableCell className="max-w-72 whitespace-normal font-medium text-slate-950">{batch.fileName}</TableCell>
                <TableCell>
                  <StatusBadge
                    tone={
                      batch.status === "completed"
                        ? "success"
                        : batch.status === "processing"
                          ? "warning"
                          : "danger"
                    }
                  >
                    {toLabel(batch.status)}
                  </StatusBadge>
                </TableCell>
                <TableCell>{batch.totalDetected}</TableCell>
                <TableCell>{batch.validCount}</TableCell>
                <TableCell>{batch.invalidCount}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <ServerPagination
        page={response.meta.page}
        totalPages={response.meta.totalPages}
        params={{
          importPage: String(response.meta.page),
          activityPage: String(activityPage),
        }}
        pageParam="importPage"
        basePath="/admin/dashboard"
        onPageChange={loadPage}
      />
    </>
  );
}
