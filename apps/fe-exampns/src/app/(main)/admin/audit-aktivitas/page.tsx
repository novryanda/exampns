import { PageHeader, SectionCard } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ServerPagination } from "@/components/server-pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAdminAuditActivity } from "@/server/admin-content-data";

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

function readParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

function readPageParam(value: string | string[] | undefined) {
  const text = readParam(value);
  const parsed = Number(text);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

function toStartOfDayIso(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const date = new Date(`${value}T00:00:00`);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

function toEndOfDayIso(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const date = new Date(`${value}T23:59:59.999`);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

export default async function AdminAuditActivityPage({
  searchParams,
}: {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const page = readPageParam(params.page);
  const dateFrom = readParam(params.dateFrom);
  const dateTo = readParam(params.dateTo);

  const auditLogs = await getAdminAuditActivity({
    dateFrom: toStartOfDayIso(dateFrom),
    dateTo: toEndOfDayIso(dateTo),
    page,
    limit: 50,
  });

  return (
    <div className="flex min-w-0 w-full max-w-full flex-col gap-6">
      <PageHeader
        title="Audit Aktivitas"
        description="Riwayat aktivitas operasional konten dari akun admin yang sedang login."
      />
      <form className="flex flex-wrap items-center gap-2">
        <Input
          type="date"
          name="dateFrom"
          defaultValue={dateFrom}
          max={dateTo || undefined}
          className="w-44 rounded-xl border-slate-200 bg-white"
        />
        <Input
          type="date"
          name="dateTo"
          defaultValue={dateTo}
          min={dateFrom || undefined}
          className="w-44 rounded-xl border-slate-200 bg-white"
        />
        <Button type="submit" variant="outline" className="rounded-xl border-slate-200 bg-white">
          Terapkan
        </Button>
      </form>
      <SectionCard
        title="Riwayat Aktivitas"
        description={`Menampilkan ${auditLogs.data.length} dari ${auditLogs.meta.totalItems.toLocaleString("id-ID")} aktivitas.`}
      >
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
            {auditLogs.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-slate-400">
                  Belum ada aktivitas yang tercatat.
                </TableCell>
              </TableRow>
            ) : (
              auditLogs.data.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium text-slate-950">{toLabel(log.action)}</TableCell>
                  <TableCell>{toLabel(log.module)}</TableCell>
                  <TableCell>{log.targetType ? `${log.targetType}:${log.targetId ?? "-"}` : "-"}</TableCell>
                  <TableCell>{formatDateTime(log.createdAt)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
        <ServerPagination
          page={auditLogs.meta.page}
          totalPages={auditLogs.meta.totalPages}
          params={{
            page: String(page),
            dateFrom: dateFrom || undefined,
            dateTo: dateTo || undefined,
          }}
          basePath="/admin/audit-aktivitas"
        />
      </SectionCard>
    </div>
  );
}
