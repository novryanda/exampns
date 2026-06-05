"use client";

import { useCallback, useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";

import { AlertCircle, CheckCircle2, Flag, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import type { ExamSessionDetail } from "@/server/user-dashboard-data";

type ActiveExamDetail = Extract<ExamSessionDetail, { status: "in_progress" }>;
type SubmittedExamDetail = Extract<ExamSessionDetail, { score: unknown }>;

function formatSeconds(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.max(0, totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function ExamWorkspace({ initialDetail }: { readonly initialDetail: ExamSessionDetail }) {
  const router = useRouter();
  const [detail, setDetail] = useState<ExamSessionDetail>(initialDetail);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [savingQuestionId, setSavingQuestionId] = useState<string | null>(null);
  const [timerRemaining, setTimerRemaining] = useState(
    "timerRemainingSeconds" in initialDetail ? initialDetail.timerRemainingSeconds : 0,
  );

  const isSubmitted = "score" in detail;
  const activeDetail = (!isSubmitted ? detail : null) as ActiveExamDetail | null;
  const submittedDetail = (isSubmitted ? detail : null) as SubmittedExamDetail | null;
  const currentQuestion = activeDetail?.questions[currentIndex] ?? null;

  useEffect(() => {
    if (!activeDetail) {
      return;
    }

    setTimerRemaining(activeDetail.timerRemainingSeconds);
  }, [activeDetail]);

  useEffect(() => {
    if (!activeDetail || timerRemaining <= 0) {
      return;
    }

    const timerId = window.setInterval(() => {
      setTimerRemaining((current) => Math.max(0, current - 1));
    }, 1000);

    return () => window.clearInterval(timerId);
  }, [activeDetail, timerRemaining]);

  const answeredCount = useMemo(() => {
    if (!activeDetail) {
      return 0;
    }

    return activeDetail.questions.filter((question) => question.selectedLabel !== null).length;
  }, [activeDetail]);

  const submitExam = useCallback(async () => {
    if (!activeDetail) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/exams/${activeDetail.examSessionId}/submit`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ submitType: "manual" }),
      });

      const payload = (await response.json()) as {
        message?: string;
        data?: SubmittedExamDetail;
      };

      if (!response.ok || !payload.data) {
        throw new Error(payload.message ?? "Gagal mengumpulkan ujian.");
      }

      setDetail(payload.data);
      toast.success("Ujian berhasil dikumpulkan.");
      router.refresh();
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal mengumpulkan ujian.");
    } finally {
      setIsSubmitting(false);
    }
  }, [activeDetail, router]);

  useEffect(() => {
    if (activeDetail && timerRemaining === 0 && !isSubmitting) {
      void submitExam();
    }
  }, [activeDetail, isSubmitting, submitExam, timerRemaining]);

  async function saveAnswer(questionId: string, selectedLabel: "A" | "B" | "C" | "D" | "E" | null) {
    if (!activeDetail) {
      return;
    }

    setSavingQuestionId(questionId);
    try {
      const response = await fetch(`/api/exams/${activeDetail.examSessionId}/answers/${questionId}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ selectedLabel }),
      });

      const payload = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(payload.message ?? "Gagal menyimpan jawaban.");
      }

      setDetail((current) => {
        if (!("questions" in current)) {
          return current;
        }

        return {
          ...current,
          questions: current.questions.map((question) =>
            question.examSessionQuestionId === questionId ? { ...question, selectedLabel } : question,
          ),
          summary: {
            ...current.summary,
            answeredCount: current.questions.filter((question) =>
              question.examSessionQuestionId === questionId ? selectedLabel !== null : question.selectedLabel !== null,
            ).length,
            unansweredCount:
              current.questions.length -
              current.questions.filter((question) =>
                question.examSessionQuestionId === questionId
                  ? selectedLabel !== null
                  : question.selectedLabel !== null,
              ).length,
          },
        };
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal menyimpan jawaban.");
    } finally {
      setSavingQuestionId(null);
    }
  }

  async function toggleFlag(questionId: string, nextFlagged: boolean) {
    if (!activeDetail) {
      return;
    }

    setSavingQuestionId(questionId);
    try {
      const response = await fetch(`/api/exams/${activeDetail.examSessionId}/questions/${questionId}/flag`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ isFlagged: nextFlagged }),
      });

      const payload = (await response.json()) as { message?: string };
      if (!response.ok) {
        throw new Error(payload.message ?? "Gagal memperbarui tanda soal.");
      }

      setDetail((current) => {
        if (!("questions" in current)) {
          return current;
        }

        return {
          ...current,
          questions: current.questions.map((question) =>
            question.examSessionQuestionId === questionId ? { ...question, isFlagged: nextFlagged } : question,
          ),
          summary: {
            ...current.summary,
            flaggedCount: current.questions.filter((question) =>
              question.examSessionQuestionId === questionId ? nextFlagged : question.isFlagged,
            ).length,
          },
        };
      });
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Gagal memperbarui tanda soal.");
    } finally {
      setSavingQuestionId(null);
    }
  }

  if (submittedDetail) {
    return (
      <SectionCard
        title="Hasil Tryout"
        description="Nilai sudah tersedia. Anda bisa kembali ke dashboard untuk melihat tryout lainnya."
      >
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {submittedDetail.score.categories.map((categoryScore) => {
            const categoryPassing = submittedDetail.passingStatus.categories.find(
              (item) => item.categoryCode === categoryScore.categoryCode,
            );

            return (
              <div key={categoryScore.categoryCode} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="text-slate-500 text-sm">{categoryScore.categoryName}</div>
                <div className="font-semibold text-3xl text-slate-950">{categoryScore.score}</div>
                <div className="mt-2 text-slate-500 text-xs">Minimum {categoryScore.minScore}</div>
                <StatusBadge tone={categoryPassing?.passed ? "success" : "warning"} className="mt-3">
                  {categoryPassing?.passed ? "Lulus kategori" : "Belum lulus kategori"}
                </StatusBadge>
              </div>
            );
          })}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="text-slate-500 text-sm">Total</div>
            <div className="font-semibold text-3xl text-slate-950">{submittedDetail.score.total}</div>
          </div>
        </div>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <StatusBadge tone={submittedDetail.passingStatus.overallPassed ? "success" : "warning"}>
            {submittedDetail.passingStatus.overallPassed ? "Lulus Passing Grade" : "Belum Lulus Passing Grade"}
          </StatusBadge>
          <StatusBadge tone="info">AI Recommendation: {submittedDetail.aiRecommendationStatus}</StatusBadge>
        </div>
      </SectionCard>
    );
  }

  if (!activeDetail || !currentQuestion) {
    return (
      <SectionCard title="Tryout tidak ditemukan" description="Sesi ujian ini tidak tersedia atau sudah berakhir.">
        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-6 text-slate-500 text-sm">
          Muat ulang halaman atau kembali ke dashboard untuk memilih tryout lain.
        </div>
      </SectionCard>
    );
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.32fr,0.68fr]">
      <SectionCard title="Navigasi Soal" description="Pilih soal dari daftar atau lanjutkan satu per satu.">
        <div className="mb-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
          <div>
            <div className="text-slate-500 text-xs uppercase tracking-wide">Sisa waktu</div>
            <div className="font-semibold text-2xl text-slate-950">{formatSeconds(timerRemaining)}</div>
          </div>
          <StatusBadge tone={timerRemaining < 300 ? "warning" : "brand"}>
            {answeredCount}/{activeDetail.questions.length} terjawab
          </StatusBadge>
        </div>
        <div className="grid max-h-[60vh] grid-cols-5 gap-2 overflow-auto">
          {activeDetail.questions.map((question, index) => (
            <Button
              key={question.examSessionQuestionId}
              type="button"
              variant={index === currentIndex ? "default" : "outline"}
              className={
                index === currentIndex
                  ? "rounded-xl bg-blue-600 hover:bg-blue-700"
                  : "rounded-xl border-slate-200 bg-white"
              }
              onClick={() => setCurrentIndex(index)}
            >
              {question.number}
            </Button>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap justify-between gap-2">
          <Button
            type="button"
            variant="outline"
            className="rounded-xl border-slate-200 bg-white"
            onClick={() => setCurrentIndex((current) => Math.max(0, current - 1))}
            disabled={currentIndex === 0}
          >
            Sebelumnya
          </Button>
          <Button
            type="button"
            variant="outline"
            className="rounded-xl border-slate-200 bg-white"
            onClick={() => setCurrentIndex((current) => Math.min(activeDetail.questions.length - 1, current + 1))}
            disabled={currentIndex === activeDetail.questions.length - 1}
          >
            Berikutnya
          </Button>
        </div>
      </SectionCard>

      <SectionCard
        title={`Soal ${currentQuestion.number}`}
        description={`${currentQuestion.category} • ${currentQuestion.subCategory} • ${currentQuestion.topicTag}`}
        trailing={
          <div className="flex items-center gap-2">
            <StatusBadge tone="neutral">{currentQuestion.difficulty}</StatusBadge>
            <Button
              type="button"
              variant={currentQuestion.isFlagged ? "destructive" : "outline"}
              className="rounded-xl"
              onClick={() => toggleFlag(currentQuestion.examSessionQuestionId, !currentQuestion.isFlagged)}
              disabled={savingQuestionId === currentQuestion.examSessionQuestionId}
            >
              <Flag className="mr-2 size-4" />
              {currentQuestion.isFlagged ? "Hapus Tanda" : "Tandai"}
            </Button>
          </div>
        }
      >
        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-slate-800 leading-7">
            {currentQuestion.questionText}
          </div>

          <div className="grid gap-3">
            {currentQuestion.options.map((option) => {
              const checked = currentQuestion.selectedLabel === option.label;
              return (
                <button
                  key={option.label}
                  type="button"
                  className={`flex items-start gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                    checked
                      ? "border-blue-200 bg-blue-50 text-blue-900"
                      : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                  }`}
                  onClick={() =>
                    void saveAnswer(
                      currentQuestion.examSessionQuestionId,
                      currentQuestion.selectedLabel === option.label ? null : option.label,
                    )
                  }
                  disabled={savingQuestionId === currentQuestion.examSessionQuestionId}
                >
                  <div className="mt-0.5 font-semibold">{option.label}.</div>
                  <div className="flex-1">{option.text}</div>
                  {checked ? <CheckCircle2 className="mt-0.5 size-4 text-blue-600" /> : null}
                </button>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4">
            <div className="flex items-center gap-2 text-slate-500 text-sm">
              {savingQuestionId === currentQuestion.examSessionQuestionId ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  Menyimpan jawaban...
                </>
              ) : (
                <>
                  <AlertCircle className="size-4" />
                  Jawaban tersimpan otomatis saat Anda memilih opsi.
                </>
              )}
            </div>
            <Button
              type="button"
              className="rounded-xl bg-emerald-600 hover:bg-emerald-700"
              onClick={submitExam}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Mengumpulkan..." : "Kumpulkan Ujian"}
            </Button>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
