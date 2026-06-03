import Link from "next/link";
import { redirect } from "next/navigation";

import { Brain, Clock3, FileCheck2, PlayCircle, Sparkles } from "lucide-react";

import { MetricCard, PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import { requireServerCurrentUserProfile } from "@/lib/auth/server-auth";
import { getAccessibleTryouts, getActiveExamSummary, getUserDashboardSummary } from "@/server/user-dashboard-data";

import { StartTryoutButton } from "./_components/start-tryout-button";

const accessLabels = {
  trial: "Trial Aktif",
  standard: "Berbayar Aktif",
  premium: "Premium Aktif",
  expired: "Belum Aktif",
} as const;

const accessTones = {
  trial: "warning",
  standard: "success",
  premium: "brand",
  expired: "neutral",
} as const;

function accessLabel(value: "trial" | "standard" | "premium" | "expired") {
  return accessLabels[value];
}

function accessTone(value: "trial" | "standard" | "premium" | "expired") {
  return accessTones[value];
}

function tryoutTypeLabel(value: string) {
  switch (value) {
    case "generated":
      return "Otomatis";
    case "manual":
      return "Manual";
    case "hybrid":
      return "Hybrid";
    case "adaptive":
      return "Adaptive";
    default:
      return value;
  }
}

export default async function UserDashboardPage() {
  const profile = await requireServerCurrentUserProfile();
  if (profile.role !== "USER") {
    redirect(profile.role === "ADMIN" ? "/admin/dashboard" : "/super-admin/dashboard");
  }

  const [summary, activeExam, tryouts] = await Promise.all([
    getUserDashboardSummary(),
    getActiveExamSummary(),
    getAccessibleTryouts(),
  ]);

  return (
    <main className="min-h-dvh bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          title={`Halo, ${summary.greetingName}`}
          description="Pilih tryout yang tersedia, lanjutkan sesi aktif, dan pantau progress belajar Anda dari satu dashboard."
          actions={
            activeExam.hasActiveExam && activeExam.examSessionId ? (
              <Button asChild className="rounded-xl bg-blue-600 hover:bg-blue-700">
                <Link href={`/dashboard/exams/${activeExam.examSessionId}`}>
                  <PlayCircle className="mr-2 size-4" />
                  Lanjutkan Ujian Aktif
                </Link>
              </Button>
            ) : null
          }
        />

        <div className="grid gap-4 lg:grid-cols-4">
          <MetricCard
            title="Status Akses"
            value={accessLabel(summary.accessStatus.type)}
            delta={summary.accessStatus.daysRemaining > 0 ? `${summary.accessStatus.daysRemaining} hari` : "-"}
            deltaLabel="sisa masa aktif"
            direction="neutral"
            icon={Sparkles}
            tint="blue"
          />
          <MetricCard
            title="Sisa Tryout"
            value={
              summary.accessStatus.tryoutRemaining === null
                ? "Unlimited"
                : summary.accessStatus.tryoutRemaining.toLocaleString("id-ID")
            }
            delta={summary.accessStatus.source}
            deltaLabel="sumber akses"
            direction="neutral"
            icon={FileCheck2}
            tint="green"
          />
          <MetricCard
            title="Nilai Terakhir"
            value={summary.lastResult ? summary.lastResult.totalScore.toLocaleString("id-ID") : "-"}
            delta={
              summary.lastResult ? (summary.lastResult.overallPassed ? "Lulus" : "Belum lulus") : "Belum ada hasil"
            }
            deltaLabel="hasil terakhir"
            direction={summary.lastResult?.overallPassed ? "up" : "neutral"}
            icon={Brain}
            tint="violet"
          />
          <MetricCard
            title="Sesi Aktif"
            value={activeExam.hasActiveExam ? `${activeExam.answeredCount}/${activeExam.totalQuestions}` : "0"}
            delta={activeExam.hasActiveExam ? "sedang berjalan" : "tidak ada"}
            deltaLabel="status ujian"
            direction={activeExam.hasActiveExam ? "up" : "neutral"}
            icon={Clock3}
            tint="amber"
          />
        </div>

        <SectionCard
          title="Ringkasan Belajar"
          description="Status akses, weak area, dan hasil terbaru dirangkum untuk membantu memilih tryout berikutnya."
        >
          <div className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
            <div className="space-y-3">
              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <div className="mb-2 flex items-center gap-2">
                  <span className="font-medium text-slate-950">Status Subscription</span>
                  <StatusBadge tone={accessTone(summary.accessStatus.type)}>
                    {accessLabel(summary.accessStatus.type)}
                  </StatusBadge>
                </div>
                <p className="text-slate-600 text-sm">
                  Source akses saat ini: <span className="font-medium">{summary.accessStatus.source}</span>
                </p>
                <p className="mt-2 text-slate-600 text-sm">
                  Berakhir:{" "}
                  {summary.accessStatus.endDate
                    ? new Date(summary.accessStatus.endDate).toLocaleString("id-ID")
                    : "Tidak ada"}
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-4">
                <h3 className="font-medium text-slate-950">Prioritas AI Terbaru</h3>
                <p className="mt-2 text-slate-600 text-sm">
                  {summary.latestRecommendation?.summary ??
                    "Rekomendasi AI akan muncul setelah Anda menyelesaikan tryout."}
                </p>
              </div>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-4">
              <h3 className="font-medium text-slate-950">Weak Areas</h3>
              <div className="mt-3 grid gap-3">
                {summary.weakAreas.length === 0 ? (
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500 text-sm">
                    Belum ada weak area yang terdeteksi.
                  </div>
                ) : (
                  summary.weakAreas.map((item) => (
                    <div
                      key={`${item.category}-${item.topicTag}`}
                      className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3"
                    >
                      <div className="font-medium text-slate-950">
                        {item.category} • {item.topicTag}
                      </div>
                      <div className="text-slate-600 text-sm">{item.subCategory}</div>
                      <div className="mt-1 text-slate-500 text-xs">
                        Akurasi: {item.accuracy === null ? "Belum ada data" : `${item.accuracy}%`}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard
          title="Tryout Tersedia"
          description="Semua tryout yang sudah dipublish muncul di sini. Jika akses Anda belum sesuai, kartu akan menampilkan alasannya."
        >
          <div className="grid gap-4 lg:grid-cols-2">
            {tryouts.length === 0 ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-slate-500 text-sm">
                Belum ada tryout publish yang tersedia.
              </div>
            ) : (
              tryouts.map((tryout) => (
                <article key={tryout.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                  <div className="flex flex-wrap items-center gap-2">
                    {tryout.isFeatured ? <StatusBadge tone="brand">Unggulan</StatusBadge> : null}
                    <StatusBadge tone={tryout.canStart ? "success" : "warning"}>
                      {tryoutTypeLabel(tryout.tryoutType)}
                    </StatusBadge>
                    <StatusBadge tone="neutral">{tryout.totalQuestions} soal</StatusBadge>
                    <StatusBadge tone="neutral">{tryout.durationMinutes} menit</StatusBadge>
                  </div>
                  <h3 className="mt-4 font-semibold text-slate-950 text-xl">{tryout.name}</h3>
                  <p className="mt-2 min-h-12 text-slate-600 text-sm">
                    {tryout.description || "Tryout ini belum memiliki deskripsi tambahan."}
                  </p>
                  <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                    <div className="text-slate-500 text-xs">
                      {tryout.lockedReason ? `Akses: ${tryout.lockedReason}` : "Akses Anda cocok untuk tryout ini."}
                    </div>
                    <StartTryoutButton
                      tryoutCatalogId={tryout.id}
                      canStart={tryout.canStart}
                      lockedReason={tryout.lockedReason}
                      hasActiveExam={activeExam.hasActiveExam}
                    />
                  </div>
                </article>
              ))
            )}
          </div>
        </SectionCard>
      </div>
    </main>
  );
}
