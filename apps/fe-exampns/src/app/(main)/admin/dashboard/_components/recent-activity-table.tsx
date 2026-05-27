"use client";

import { useState, useTransition } from "react";

import { toast } from "sonner";

import { ServerPagination } from "@/components/server-pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type ClientPaginatedResponse, fetchAdminData } from "@/lib/admin-data-client";
import type { AuditActivityItem } from "@/server/admin-content-data";

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function toLabel(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

function buildPageHref(activityPage: number) {
  const searchParams = new URLSearchParams(window.location.search);

  if (activityPage > 1) {
    searchParams.set("activityPage", String(activityPage));
  } else {
    searchParams.delete("activityPage");
  }

  const query = searchParams.toString();
  return query ? `/admin/dashboard?${query}` : "/admin/dashboard";
}

async function fetchRecentActivity(page: number) {
  return fetchAdminData<ClientPaginatedResponse<AuditActivityItem[]>>("audit-logs/me", {
    page,
    limit: 20,
  });
}

export function RecentActivityTable({
  initialResponse,
  importPage,
}: {
  readonly initialResponse: ClientPaginatedResponse<AuditActivityItem[]>;
  readonly importPage: number;
}) {
  const [response, setResponse] = useState(initialResponse);
  const [isPending, startTransition] = useTransition();

  const loadPage = (page: number) => {
    startTransition(async () => {
      try {
        const nextResponse = await fetchRecentActivity(page);
        setResponse(nextResponse);
        window.history.replaceState(null, "", buildPageHref(page));
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Gagal memuat aktivitas admin.");
      }
    });
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Aksi</TableHead>
            <TableHead>Modul</TableHead>
            <TableHead>Target</TableHead>
            <TableHead>Waktu</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {response.data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="py-10 text-center text-slate-400">
                Belum ada aktivitas admin yang tercatat.
              </TableCell>
            </TableRow>
          ) : (
            response.data.map((item) => (
              <TableRow key={item.id} className={isPending ? "opacity-80" : undefined}>
                <TableCell className="font-medium text-slate-950">{toLabel(item.action)}</TableCell>
                <TableCell>{toLabel(item.module)}</TableCell>
                <TableCell>{item.targetType ? `${item.targetType}:${item.targetId ?? "-"}` : "-"}</TableCell>
                <TableCell>{formatDateTime(item.createdAt)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
      <ServerPagination
        page={response.meta.page}
        totalPages={response.meta.totalPages}
        params={{
          importPage: String(importPage),
          activityPage: String(response.meta.page),
        }}
        pageParam="activityPage"
        basePath="/admin/dashboard"
        onPageChange={loadPage}
      />
    </>
  );
}
