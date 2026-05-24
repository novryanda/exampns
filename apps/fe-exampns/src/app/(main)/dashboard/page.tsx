import Link from "next/link";

import {
  Bot,
  BookOpenCheck,
  Clock3,
  CreditCard,
  DollarSign,
  FileSearch,
  ShieldCheck,
  Users,
} from "lucide-react";

import { MetricCard, PageHeader, SectionCard, StatusBadge } from "@/components/examcpns-admin/ui";
import { Card, CardContent } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatCurrency } from "@/lib/utils";
import {
  getAdminDashboardSummary,
  getAiRecommendationSettings,
  getPassingGradeConfig,
  getTrialConfig,
} from "@/server/admin-data";

const metricIcons = [Users, ShieldCheck, BookOpenCheck, FileSearch, Clock3, DollarSign] as const;
const metricTints = ["blue", "green", "blue", "amber", "amber", "violet"] as const;

function formatDateTime(value: string | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function toTitleCase(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
}

export default async function Page() {
  const [summary, aiSettings, passingGrade, trialConfig] = await Promise.all([
    getAdminDashboardSummary(),
    getAiRecommendationSettings(),
    getPassingGradeConfig(),
    getTrialConfig(),
  ]);

  const metrics = [
    {
      title: "Total Users",
      value: summary.totalUsers.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "akun pengguna terdaftar",
      direction: "neutral" as const,
    },
    {
      title: "Active Subscribers",
      value: summary.activeSubscribers.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "subscription aktif saat ini",
      direction: "neutral" as const,
    },
    {
      title: "Total Soal",
      value: summary.totalQuestions.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "bank soal aktif",
      direction: "neutral" as const,
    },
    {
      title: "Pending Review",
      value: summary.pendingReviewQuestions.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "soal menunggu review",
      direction: "neutral" as const,
    },
    {
      title: "Pending Payment",
      value: summary.paymentPending.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "transaksi belum dibayar",
      direction: "neutral" as const,
    },
    {
      title: "Monthly Revenue",
      value: formatCurrency(summary.monthlyRevenue, {
        currency: "IDR",
        locale: "id-ID",
        noDecimals: true,
      }),
      delta: "",
      deltaLabel: "pendapatan bulan berjalan",
      direction: "neutral" as const,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Dashboard"
        description="Ringkasan operasional platform ExamCPNS berdasarkan data backend terbaru."
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

      <div className="grid gap-4 2xl:grid-cols-[1.15fr_0.85fr]">
        <SectionCard
          title="Recent PDF Import Batches"
          description="Status terbaru dari proses parsing PDF yang sedang atau sudah berjalan."
          trailing={
            <Link className="text-blue-600 text-sm hover:underline" href="/dashboard/review-parsing">
              Review parsing
            </Link>
          }
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>File</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Terdeteksi</TableHead>
                <TableHead>Valid</TableHead>
                <TableHead>Invalid</TableHead>
                <TableHead>Dibuat</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summary.recentImportBatches.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-slate-400">
                    Belum ada batch import PDF.
                  </TableCell>
                </TableRow>
              ) : (
                summary.recentImportBatches.map((batch) => (
                  <TableRow key={batch.batchId}>
                    <TableCell className="max-w-64 whitespace-normal font-medium text-slate-950">
                      {batch.fileName}
                    </TableCell>
                    <TableCell>
                      <StatusBadge
                        tone={
                          batch.status === "completed"
                            ? "success"
                            : batch.status === "failed"
                              ? "danger"
                              : "warning"
                        }
                      >
                        {toTitleCase(batch.status)}
                      </StatusBadge>
                    </TableCell>
                    <TableCell>{batch.totalDetected}</TableCell>
                    <TableCell>{batch.validCount}</TableCell>
                    <TableCell>{batch.invalidCount}</TableCell>
                    <TableCell>{formatDateTime(batch.createdAt)}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </SectionCard>

        <SectionCard title="System Snapshot" description="Konfigurasi inti yang sedang aktif di backend.">
          <div className="grid gap-4 md:grid-cols-2">
            <Card className="border-slate-200/80 shadow-none">
              <CardContent className="space-y-2 p-5">
                <p className="text-slate-500 text-sm">Passing Grade</p>
                <p className="font-semibold text-2xl text-slate-950">{passingGrade.totalMinScore}</p>
                <p className="text-slate-500 text-sm">
                  TWK {passingGrade.twkMinScore} · TIU {passingGrade.tiuMinScore} · TKP {passingGrade.tkpMinScore}
                </p>
              </CardContent>
            </Card>
            <Card className="border-slate-200/80 shadow-none">
              <CardContent className="space-y-2 p-5">
                <p className="text-slate-500 text-sm">Trial Configuration</p>
                <p className="font-semibold text-2xl text-slate-950">{trialConfig.freeTryoutCount} tryout</p>
                <p className="text-slate-500 text-sm">Durasi {trialConfig.trialDurationDays} hari</p>
              </CardContent>
            </Card>
            <Card className="border-slate-200/80 shadow-none md:col-span-2">
              <CardContent className="space-y-4 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-slate-500 text-sm">AI Recommendation</p>
                    <p className="mt-1 font-semibold text-xl text-slate-950">{aiSettings.providerName}</p>
                  </div>
                  <StatusBadge tone={aiSettings.status === "active" ? "success" : "warning"}>
                    {aiSettings.status === "active" ? "Active" : "Degraded"}
                  </StatusBadge>
                </div>
                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-100 px-4 py-3">
                    <p className="text-slate-400 text-sm">AI Jobs Hari Ini</p>
                    <p className="mt-1 font-medium text-slate-950">{aiSettings.aiJobsToday}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-100 px-4 py-3">
                    <p className="text-slate-400 text-sm">Success Rate</p>
                    <p className="mt-1 font-medium text-slate-950">{aiSettings.successRateToday}%</p>
                  </div>
                  <div className="rounded-2xl border border-slate-100 px-4 py-3">
                    <p className="text-slate-400 text-sm">Timeout</p>
                    <p className="mt-1 font-medium text-slate-950">{aiSettings.timeoutSeconds} detik</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </SectionCard>
      </div>

      <div className="grid gap-4 2xl:grid-cols-[1.2fr_0.8fr]">
        <SectionCard
          title="Recent Transactions"
          description="Transaksi terakhir yang tercatat oleh backend billing."
          trailing={
            <Link className="text-blue-600 text-sm hover:underline" href="/dashboard/transactions">
              Lihat semua
            </Link>
          }
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>User</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summary.recentTransactions.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-10 text-center text-slate-400">
                    Belum ada transaksi.
                  </TableCell>
                </TableRow>
              ) : (
                summary.recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell className="font-medium text-slate-950">{transaction.invoiceNumber}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div>{transaction.userName}</div>
                        <div className="text-slate-400 text-xs">{transaction.userEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.planName}</TableCell>
                    <TableCell>
                      {formatCurrency(transaction.amount, {
                        currency: "IDR",
                        locale: "id-ID",
                        noDecimals: true,
                      })}
                    </TableCell>
                    <TableCell>
                      <StatusBadge
                        tone={
                          transaction.status === "success"
                            ? "success"
                            : transaction.status === "pending"
                              ? "warning"
                              : "danger"
                        }
                      >
                        {toTitleCase(transaction.status)}
                      </StatusBadge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </SectionCard>

        <SectionCard title="Operational Notes" description="Catatan singkat dari status sistem yang aktif.">
          <div className="space-y-3">
            <div className="rounded-2xl border border-slate-100 px-4 py-4">
              <div className="flex items-start gap-3">
                <div className="flex size-9 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Bot className="size-4" />
                </div>
                <div>
                  <p className="font-medium text-slate-950 text-sm">AI Recommendation</p>
                  <p className="mt-1 text-slate-500 text-sm">
                    {aiSettings.enabled
                      ? `Workflow AI aktif dengan fallback ${
                          aiSettings.fallbackEnabled ? "menyala" : "mati"
                        }.`
                      : "Workflow AI sedang nonaktif."}
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-100 px-4 py-4">
              <div className="flex items-start gap-3">
                <div className="flex size-9 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                  <ShieldCheck className="size-4" />
                </div>
                <div>
                  <p className="font-medium text-slate-950 text-sm">Passing Grade</p>
                  <p className="mt-1 text-slate-500 text-sm">
                    Konfigurasi aktif mulai {formatDateTime(passingGrade.effectiveFrom)} dengan total minimum{" "}
                    {passingGrade.totalMinScore}.
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-slate-100 px-4 py-4">
              <div className="flex items-start gap-3">
                <div className="flex size-9 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
                  <CreditCard className="size-4" />
                </div>
                <div>
                  <p className="font-medium text-slate-950 text-sm">Pending Payments</p>
                  <p className="mt-1 text-slate-500 text-sm">
                    Saat ini ada {summary.paymentPending} transaksi pending yang perlu dimonitor.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </SectionCard>
      </div>
    </div>
  );
}
