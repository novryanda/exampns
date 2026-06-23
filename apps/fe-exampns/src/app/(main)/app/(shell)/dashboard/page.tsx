import Link from "next/link";
import { redirect } from "next/navigation";

import { Brain, Clock3, FileCheck2, PlayCircle, Sparkles } from "lucide-react";

import { ExamHistoryTable } from "@/app/(main)/app/_components/exam-history-table";
import { MetricCard, PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import { formatAccessStatusLabel, formatDateTimeId } from "@/lib/user-app/labels";
import { requireServerCurrentUserProfile } from "@/lib/auth/server-auth";
import { getActiveExamSummary, getUserDashboardSummary } from "@/server/user-dashboard-data";

export default async function UserDashboardPage() {
  const profile = await requireServerCurrentUserProfile();
  if (profile.role !== "USER") {
    redirect(
      profile.role === "ADMIN"
        ? "/admin/dashboard"
        : profile.role === "PARTNER"
          ? "/mitra/dashboard"
          : "/super-admin/dashboard",
    );
  }

  const [summary, activeExam] = await Promise.all([getUserDashboardSummary(), getActiveExamSummary()]);
  const accessExpired = summary.accessStatus.type === "expired";

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={`Selamat datang kembali, ${summary.greetingName}`}
        description="Ringkasan akses, skor terakhir, rekomendasi AI, dan riwayat tryout Anda."
        actions={
          activeExam.hasActiveExam && activeExam.examSessionId ? (
            <Button asChild className="rounded-xl bg-blue-600 hover:bg-blue-700">
              <Link href={`/app/exam/${activeExam.examSessionId}`}>
                <PlayCircle className="mr-2 size-4" />
                Lanjutkan Ujian Aktif
              </Link>
            </Button>
          ) : accessExpired ? (
            <Button asChild className="rounded-xl bg-amber-600 hover:bg-amber-700">
              <Link href="/app/langganan">Berlangganan</Link>
            </Button>
          ) : (
            <Button asChild className="rounded-xl bg-blue-600 hover:bg-blue-700">
              <Link href="/app/tryout">Mulai Tryout</Link>
            </Button>
          )
        }
      />

      {accessExpired ? (
        <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-4 text-amber-900 text-sm">
          Akses tryout Anda sudah habis. Silakan pilih paket langganan untuk melanjutkan latihan.
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-4">
        <MetricCard
          title="Status Akses"
          value={formatAccessStatusLabel(summary.accessStatus.type)}
          delta={
            summary.accessStatus.tryoutRemaining === null
              ? "Unlimited"
              : `${summary.accessStatus.tryoutRemaining} tersisa`
          }
          deltaLabel={`${summary.accessStatus.daysRemaining} hari aktif`}
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

      {summary.lastResult ? (
        <SectionCard title="Ringkasan Ujian Terakhir" description="Breakdown skor TWK, TIU, TKP, dan total.">
          <div className="grid gap-3 md:grid-cols-4">
            {summary.lastResult.categoryScores.map((item) => (
              <div key={item.categoryCode} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-slate-500 text-sm">{item.categoryName}</div>
                <div className="font-semibold text-2xl text-slate-950">{item.score}</div>
                <StatusBadge tone={item.passed ? "success" : "warning"} className="mt-2">
                  {item.passed ? "Lulus" : "Belum lulus"}
                </StatusBadge>
              </div>
            ))}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="text-slate-500 text-sm">Total</div>
              <div className="font-semibold text-2xl text-slate-950">{summary.lastResult.totalScore}</div>
              <p className="mt-2 text-slate-500 text-xs">{formatDateTimeId(summary.lastResult.examDate)}</p>
            </div>
          </div>
        </SectionCard>
      ) : (
        <SectionCard title="Belum Ada Ujian" description="Mulai tryout pertama untuk melihat skor dan rekomendasi AI.">
          <Button asChild className="rounded-xl bg-blue-600 hover:bg-blue-700">
            <Link href="/app/tryout">Mulai Tryout Pertama</Link>
          </Button>
        </SectionCard>
      )}

      <SectionCard
        title="AI Recommendation Preview"
        description="Fokus belajar berdasarkan hasil tryout terakhir."
      >
        {summary.latestRecommendation?.summary ? (
          <div className="space-y-3">
            <p className="text-slate-700 leading-7">{summary.latestRecommendation.summary}</p>
            {summary.latestRecommendation.priorityTopic ? (
              <p className="font-medium text-slate-950 text-sm">
                Fokus utama: {summary.latestRecommendation.priorityTopic}
              </p>
            ) : null}
            {summary.lastResult ? (
              <Button asChild variant="outline" className="rounded-xl">
                <Link href={`/app/result/${summary.lastResult.examResultId}#rekomendasi`}>Lihat Rekomendasi</Link>
              </Button>
            ) : null}
          </div>
        ) : (
          <p className="text-slate-500 text-sm">Rekomendasi AI akan muncul setelah Anda menyelesaikan tryout.</p>
        )}
      </SectionCard>

      <SectionCard title="Recent Exam History" description="Riwayat singkat ujian terbaru Anda.">
        <ExamHistoryTable items={summary.recentExams} />
      </SectionCard>

      {summary.weakAreas.length > 0 ? (
        <SectionCard title="Weak Areas" description="Area materi yang perlu diperkuat.">
          <div className="grid gap-3">
            {summary.weakAreas.map((item) => (
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
            ))}
          </div>
        </SectionCard>
      ) : null}
    </div>
  );
}
