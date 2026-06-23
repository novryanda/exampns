import Link from "next/link";

import { Activity, BookCopy, FileSearch, Files, ShieldAlert, Upload } from "lucide-react";

import { MetricCard, PageHeader, SectionCard } from "@/app/(main)/_components/page-shell";
import {
  getAdminAuditActivity,
  getAdminContentDashboardSummary,
  getAdminPdfImportBatches,
} from "@/server/admin-content-data";

import { QuestionDistributionCard } from "./_components/question-distribution-card";
import { RecentActivityTable } from "./_components/recent-activity-table";
import { RecentImportBatchesTable } from "./_components/recent-import-batches-table";

const metricIcons = [Files, BookCopy, FileSearch, Upload, ShieldAlert, Activity] as const;
const metricTints = ["blue", "green", "amber", "violet", "red", "blue"] as const;

function readParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

function readPageParam(value: string | string[] | undefined) {
  const text = readParam(value);
  const parsed = Number(text);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

export default async function AdminDashboardPage({
  searchParams,
}: {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const importPage = readPageParam(params.importPage);
  const activityPage = readPageParam(params.activityPage);

  const [summary, recentImportBatches, recentActivity] = await Promise.all([
    getAdminContentDashboardSummary(),
    getAdminPdfImportBatches({
      page: importPage,
      limit: 20,
    }),
    getAdminAuditActivity({
      page: activityPage,
      limit: 20,
    }),
  ]);

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
      title: "Menunggu Parsing",
      value: summary.pendingParsedQuestions.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "menunggu review admin",
      direction: "neutral" as const,
    },
    {
      title: "Draft Tryout",
      value: summary.draftTryouts.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "belum dipublish",
      direction: "neutral" as const,
    },
    {
      title: "Published Tryout",
      value: summary.submittedReviewTryouts.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "siap digunakan user",
      direction: "neutral" as const,
    },
    {
      title: "PDF Gagal",
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
        description="Ringkasan operasional konten untuk bank soal, parsing PDF, dan draft tryout."
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
        <SectionCard
          title="Distribusi Soal"
          description="Distribusi soal aktif per kategori."
          className="overflow-hidden"
          contentClassName="pt-2"
        >
          <QuestionDistributionCard distribution={summary.questionDistribution} />
        </SectionCard>

        <SectionCard
          title="Batch Parsing Terbaru"
          description="Batch upload PDF terbaru beserta status parsingnya."
          trailing={
            <Link className="text-blue-600 text-sm hover:underline" href="/admin/upload-pdf">
              Buka halaman upload
            </Link>
          }
        >
          <RecentImportBatchesTable initialResponse={recentImportBatches} activityPage={recentActivity.meta.page} />
        </SectionCard>
      </div>

      <SectionCard
        title="Aktivitas Terbaru"
        description="Aktivitas operasional konten dari akun admin yang sedang login."
        trailing={
          <Link className="text-blue-600 text-sm hover:underline" href="/admin/audit-aktivitas">
            Lihat semua
          </Link>
        }
      >
        <RecentActivityTable initialResponse={recentActivity} importPage={recentImportBatches.meta.page} />
      </SectionCard>
    </div>
  );
}
