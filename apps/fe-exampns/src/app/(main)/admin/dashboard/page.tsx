import Link from "next/link";

import { Activity, BookCopy, FileSearch, Files, ShieldAlert, Upload } from "lucide-react";

import { MetricCard, PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAdminContentDashboardSummary } from "@/server/admin-content-data";

const metricIcons = [Files, BookCopy, FileSearch, Upload, ShieldAlert, Activity] as const;
const metricTints = ["blue", "green", "amber", "violet", "red", "blue"] as const;

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

export default async function AdminDashboardPage() {
  const summary = await getAdminContentDashboardSummary();

  const metrics = [
    {
      title: "Total Soal",
      value: summary.totalQuestions.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "semua soal aktif dan draft",
      direction: "neutral" as const,
    },
    {
      title: "Soal Aktif",
      value: summary.activeQuestions.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "siap dipakai di ujian baru",
      direction: "neutral" as const,
    },
    {
      title: "Pending Parsing",
      value: summary.pendingParsedQuestions.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "menunggu review admin",
      direction: "neutral" as const,
    },
    {
      title: "Draft Tryout",
      value: summary.draftTryouts.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "belum diajukan untuk review",
      direction: "neutral" as const,
    },
    {
      title: "Submitted Review",
      value: summary.submittedReviewTryouts.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "sedang menunggu finalisasi",
      direction: "neutral" as const,
    },
    {
      title: "PDF Fail",
      value: summary.failedPdfBatches.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "batch gagal atau parsial gagal",
      direction: "neutral" as const,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Dashboard"
        description="Ringkasan content operations untuk bank soal, parsing PDF, dan tryout drafts."
      />

      <div className="grid gap-4 md:grid-cols-2 2xl:grid-cols-6">
        {metrics.map((metric, index) => {
          const Icon = metricIcons[index];
          return (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              delta={metric.delta}
              deltaLabel={metric.deltaLabel}
              direction={metric.direction}
              icon={Icon}
              tint={metricTints[index]}
            />
          );
        })}
      </div>

      <div className="grid gap-4 2xl:grid-cols-[0.9fr_1.1fr]">
        <SectionCard title="Question Distribution" description="Distribusi soal aktif per kategori.">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kategori</TableHead>
                <TableHead>Soal Aktif</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summary.questionDistribution.map((item) => (
                <TableRow key={item.category}>
                  <TableCell className="font-medium text-slate-950">{item.category}</TableCell>
                  <TableCell>{item.activeCount.toLocaleString("id-ID")}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </SectionCard>

        <SectionCard
          title="Recent Parsing Batches"
          description="Batch upload PDF terbaru beserta status parsingnya."
          trailing={
            <Link className="text-blue-600 text-sm hover:underline" href="/admin/upload-pdf">
              Buka upload
            </Link>
          }
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Valid</TableHead>
                <TableHead>Invalid</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summary.recentImportBatches.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-slate-400">
                    Belum ada batch PDF terbaru.
                  </TableCell>
                </TableRow>
              ) : (
                summary.recentImportBatches.map((batch) => (
                  <TableRow key={batch.batchId}>
                    <TableCell className="max-w-72 whitespace-normal font-medium text-slate-950">
                      {batch.fileName}
                    </TableCell>
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
        </SectionCard>
      </div>

      <SectionCard
        title="Recent Activity"
        description="Aktivitas content operations akun admin yang sedang login."
        trailing={
          <Link className="text-blue-600 text-sm hover:underline" href="/admin/audit-aktivitas">
            Lihat semua
          </Link>
        }
      >
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
            {summary.recentActivity.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="py-10 text-center text-slate-400">
                  Belum ada aktivitas admin yang tercatat.
                </TableCell>
              </TableRow>
            ) : (
              summary.recentActivity.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium text-slate-950">{toLabel(item.action)}</TableCell>
                  <TableCell>{toLabel(item.module)}</TableCell>
                  <TableCell>{item.targetType ? `${item.targetType}:${item.targetId ?? "-"}` : "-"}</TableCell>
                  <TableCell>{formatDateTime(item.createdAt)}</TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </SectionCard>
    </div>
  );
}
