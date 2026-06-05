import Link from "next/link";

import { PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import { formatDateTimeId } from "@/lib/user-app/labels";
import { getExamHistory, getUserDashboardSummary } from "@/server/user-dashboard-data";

export default async function HasilUjianPage() {
  const [summary, history] = await Promise.all([
    getUserDashboardSummary(),
    getExamHistory({ page: 1, limit: 5 }),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Hasil Ujian"
        description="Lihat hasil tryout terbaru beserta skor dan rekomendasi AI."
      />

      {summary.lastResult ? (
        <SectionCard title="Hasil Terbaru" description="Ringkasan ujian terakhir yang telah diselesaikan.">
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
          <div className="mt-4 flex flex-wrap gap-2">
            <Button asChild className="rounded-xl bg-blue-600 hover:bg-blue-700">
              <Link href={`/app/result/${summary.lastResult.examResultId}`}>Lihat Hasil Lengkap</Link>
            </Button>
            <Button asChild variant="outline" className="rounded-xl">
              <Link href={`/app/result/${summary.lastResult.examResultId}#rekomendasi`}>Lihat Rekomendasi AI</Link>
            </Button>
          </div>
        </SectionCard>
      ) : (
        <SectionCard title="Belum Ada Hasil" description="Selesaikan tryout pertama untuk melihat halaman hasil ujian.">
          <Button asChild className="rounded-xl bg-blue-600 hover:bg-blue-700">
            <Link href="/app/tryout">Mulai Tryout</Link>
          </Button>
        </SectionCard>
      )}

      <SectionCard title="Hasil Ujian Terbaru" description="Akses cepat ke hasil tryout yang sudah diselesaikan.">
        <div className="space-y-3">
          {history.data.length === 0 ? (
            <p className="text-slate-500 text-sm">Belum ada hasil ujian.</p>
          ) : (
            history.data.map((item) => (
              <div
                key={item.examResultId}
                className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3"
              >
                <div>
                  <p className="font-medium text-slate-950">{item.tryoutName}</p>
                  <p className="text-slate-500 text-sm">
                    {formatDateTimeId(item.examDate)} • Total {item.totalScore}
                  </p>
                </div>
                <Button asChild size="sm" className="rounded-xl">
                  <Link href={`/app/result/${item.examResultId}`}>Lihat Hasil</Link>
                </Button>
              </div>
            ))
          )}
        </div>
      </SectionCard>
    </div>
  );
}
