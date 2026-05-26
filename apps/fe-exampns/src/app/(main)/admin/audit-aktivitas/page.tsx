import { PageHeader, SectionCard } from "@/app/(main)/_components/page-shell";
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

export default async function AdminAuditActivityPage() {
  const auditLogs = await getAdminAuditActivity({ limit: 50 });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Audit Aktivitas"
        description="Riwayat aktivitas content operations akun admin yang sedang login."
      />
      <SectionCard title="Riwayat Aktivitas" description="Menampilkan 50 aktivitas terbaru.">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Aksi</TableHead>
              <TableHead>Module</TableHead>
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
      </SectionCard>
    </div>
  );
}
