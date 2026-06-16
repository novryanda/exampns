"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import { AlertCircle, CheckCircle2, Flag, Loader2, Maximize } from "lucide-react";
import { toast } from "sonner";

import { SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import { ExamIntegrityWarning } from "@/app/(main)/app/_components/exam-integrity-warning";
import { useExamIntegrityGuard } from "@/hooks/use-exam-integrity-guard";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import type { ExamSessionDetail } from "@/server/user-dashboard-data";

type ActiveExamDetail = Extract<ExamSessionDetail, { status: "in_progress" }>;
type ExamQuestion = ActiveExamDetail["questions"][number];

function QuestionNavLegendItem({
  label,
  swatchClassName,
}: {
  readonly label: string;
  readonly swatchClassName: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 text-slate-600 text-[11px] leading-tight">
      <span className={cn("size-3.5 shrink-0 rounded border", swatchClassName)} />
      {label}
    </span>
  );
}

function questionNavButtonClass(question: ExamQuestion, index: number, currentIndex: number) {
  const isCurrent = index === currentIndex;
  const isAnswered = question.selectedLabel !== null;

  return cn(
    "h-10 rounded-xl border font-medium text-sm transition-colors",
    isCurrent &&
      "border-blue-600 bg-blue-600 text-white shadow-sm hover:border-blue-700 hover:bg-blue-700",
    !isCurrent &&
      isAnswered &&
      "border-emerald-400 bg-emerald-50 text-emerald-800 hover:border-emerald-500 hover:bg-emerald-100 active:bg-emerald-200",
    !isCurrent &&
      !isAnswered &&
      question.isFlagged &&
      "border-amber-400 bg-amber-50 text-amber-800 hover:border-amber-500 hover:bg-amber-100 active:bg-amber-200",
    !isCurrent &&
      !isAnswered &&
      !question.isFlagged &&
      "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 active:bg-slate-100",
  );
}

function formatSeconds(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const seconds = Math.max(0, totalSeconds % 60)
    .toString()
    .padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function ExamWorkspace({
  initialDetail,
  tryoutName,
}: {
  readonly initialDetail: ExamSessionDetail;
  readonly tryoutName?: string;
}) {
  const router = useRouter();
  const [detail, setDetail] = useState<ExamSessionDetail>(initialDetail);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showUnansweredDialog, setShowUnansweredDialog] = useState(false);
  const [savingQuestionId, setSavingQuestionId] = useState<string | null>(null);
  const [timerRemaining, setTimerRemaining] = useState(
    "timerRemainingSeconds" in initialDetail ? initialDetail.timerRemainingSeconds : 0,
  );
  const [isFullscreen, setIsFullscreen] = useState(false);
  const questionListRef = useRef<HTMLDivElement>(null);

  const isSubmitted = "score" in detail;
  const activeDetail = (!isSubmitted ? detail : null) as ActiveExamDetail | null;
  const currentQuestion = activeDetail?.questions[currentIndex] ?? null;
  const examSessionId = activeDetail?.examSessionId ?? "";

  useEffect(() => {
    if (isSubmitted && "examResultId" in detail) {
      router.replace(`/app/result/${detail.examResultId}`);
    }
  }, [detail, isSubmitted, router]);

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

  const unansweredCount = activeDetail ? activeDetail.questions.length - answeredCount : 0;

  const unansweredQuestions = useMemo(() => {
    if (!activeDetail) {
      return [];
    }

    return activeDetail.questions.filter((question) => question.selectedLabel === null);
  }, [activeDetail]);

  const handleCollectClick = useCallback(() => {
    if (unansweredCount > 0) {
      setShowUnansweredDialog(true);
      return;
    }

    setShowSubmitDialog(true);
  }, [unansweredCount]);

  const jumpToQuestion = useCallback((questionIndex: number) => {
    setCurrentIndex(questionIndex);
    setShowUnansweredDialog(false);
  }, []);

  useEffect(() => {
    const container = questionListRef.current;
    if (!container) {
      return;
    }

    const activeButton = container.querySelector<HTMLButtonElement>('button[aria-current="true"]');
    activeButton?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [currentIndex]);

  const submitExam = useCallback(
    async (submitType: "manual" | "auto" = "manual") => {
      if (!activeDetail) {
        return;
      }

      setIsSubmitting(true);
      try {
        const response = await fetch(`/api/exams/${activeDetail.examSessionId}/submit`, {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ submitType }),
        });

        const payload = (await response.json()) as {
          message?: string;
          code?: string;
          data?: { examResultId?: string };
        };

        if (!response.ok || !payload.data?.examResultId) {
          if (payload.code === "EXAM_INCOMPLETE_ANSWERS") {
            setShowSubmitDialog(false);
            setShowUnansweredDialog(true);
          }

          throw new Error(payload.message ?? "Gagal mengumpulkan ujian.");
        }

        if (submitType === "auto") {
          toast.info("Ujian dikumpulkan otomatis karena terlalu sering meninggalkan halaman.");
        } else {
          toast.success("Ujian berhasil dikumpulkan.");
        }
        router.push(`/app/result/${payload.data.examResultId}`);
        router.refresh();
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Gagal mengumpulkan ujian.");
      } finally {
        setIsSubmitting(false);
        setShowSubmitDialog(false);
      }
    },
    [activeDetail, router],
  );

  // Callback khusus untuk auto-submit dari integrity guard
  const autoSubmitExam = useCallback(async () => {
    await submitExam("auto");
  }, [submitExam]);

  // ── Exam Integrity Guard ────────────────────────────────────────────────────
  const {
    violationCount,
    showWarning: showIntegrityWarning,
    dismissWarning: dismissIntegrityWarning,
    isAutoSubmitting,
    requestFullscreen,
  } = useExamIntegrityGuard({
    examSessionId,
    isActive: Boolean(activeDetail) && !isSubmitting,
    onAutoSubmit: autoSubmitExam,
    initialViolationCount:
      "tabSwitchCount" in initialDetail ? initialDetail.tabSwitchCount : 0,
  });

  // Pantau status fullscreen untuk menampilkan tombol "Masuk Fullscreen"
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFsChange);
    return () => document.removeEventListener("fullscreenchange", handleFsChange);
  }, []);

  useEffect(() => {
    if (!activeDetail || timerRemaining > 0 || isSubmitting) {
      return;
    }

    if (unansweredCount > 0) {
      setShowUnansweredDialog(true);
      toast.error("Waktu habis. Lengkapi semua soal sebelum mengumpulkan ujian.");
      return;
    }

    void submitExam("auto");
  }, [activeDetail, isSubmitting, submitExam, timerRemaining, unansweredCount]);

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
    <>
      {/* Overlay peringatan exam browser — muncul di atas seluruh UI */}
      {showIntegrityWarning || isAutoSubmitting ? (
        <ExamIntegrityWarning
          violationCount={violationCount}
          onDismiss={dismissIntegrityWarning}
          isAutoSubmitting={isAutoSubmitting}
        />
      ) : null}

      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
        <div>
          <div className="text-slate-500 text-xs uppercase tracking-wide">Tryout</div>
          <div className="font-semibold text-slate-950">{tryoutName ?? "Sesi Tryout"}</div>
        </div>
        <div className="flex items-center gap-3">
          {/* Tombol kembali ke fullscreen jika user sudah keluar */}
          {!isFullscreen && activeDetail ? (
            <button
              type="button"
              onClick={requestFullscreen}
              className="flex items-center gap-1.5 rounded-xl border border-amber-300 bg-amber-50 px-3 py-1.5 text-amber-700 text-xs font-medium transition-colors hover:bg-amber-100"
            >
              <Maximize className="size-3.5" />
              Layar Penuh
            </button>
          ) : null}
          <div className="text-right">
            <div className="text-slate-500 text-xs uppercase tracking-wide">Autosaved</div>
            <div className="font-semibold text-emerald-600 text-sm">Aktif</div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <aside className="w-full shrink-0 lg:sticky lg:top-6 lg:w-72">
          <SectionCard title="Navigasi Soal" description="Pilih nomor soal dari panel kiri.">
            <div className="mb-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <div>
                <div className="text-slate-500 text-xs uppercase tracking-wide">Sisa waktu</div>
                <div className="font-semibold text-2xl text-slate-950">{formatSeconds(timerRemaining)}</div>
              </div>
              <StatusBadge tone={timerRemaining < 300 ? "warning" : "brand"}>
                {answeredCount}/{activeDetail.questions.length} terjawab
              </StatusBadge>
            </div>

            <div className="mb-3 flex flex-wrap gap-x-4 gap-y-2">
              <QuestionNavLegendItem label="Aktif" swatchClassName="border-blue-600 bg-blue-600" />
              <QuestionNavLegendItem label="Terjawab" swatchClassName="border-emerald-400 bg-emerald-50" />
              <QuestionNavLegendItem label="Tandai" swatchClassName="border-amber-400 bg-amber-50" />
            </div>

            <div
              ref={questionListRef}
              className="grid max-h-[min(70vh,560px)] grid-cols-5 gap-2 overflow-y-auto overscroll-y-contain pr-1"
            >
              {activeDetail.questions.map((question, index) => (
                <button
                  key={question.examSessionQuestionId}
                  type="button"
                  aria-current={index === currentIndex ? "true" : undefined}
                  aria-label={`Soal ${question.number}${question.selectedLabel ? ", sudah dijawab" : ""}${question.isFlagged ? ", ditandai" : ""}`}
                  className={questionNavButtonClass(question, index, currentIndex)}
                  onClick={() => setCurrentIndex(index)}
                >
                  {question.number}
                </button>
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
                onClick={() =>
                  setCurrentIndex((current) => Math.min(activeDetail.questions.length - 1, current + 1))
                }
                disabled={currentIndex === activeDetail.questions.length - 1}
              >
                Berikutnya
              </Button>
            </div>
          </SectionCard>
        </aside>

        <main className="flex min-w-0 flex-1 justify-center">
          <div className="w-full max-w-3xl">
            <SectionCard
              title={`Soal ${currentQuestion.number} dari ${activeDetail.questions.length}`}
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
                        className={cn(
                          "flex items-start gap-3 rounded-2xl border px-4 py-3 text-left transition-colors",
                          checked
                            ? "border-blue-300 bg-blue-50 text-blue-900 shadow-sm hover:border-blue-400 hover:bg-blue-100 active:bg-blue-100"
                            : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 active:bg-slate-100",
                        )}
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

                <div className="flex flex-wrap justify-between gap-2">
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
                    onClick={() =>
                      setCurrentIndex((current) => Math.min(activeDetail.questions.length - 1, current + 1))
                    }
                    disabled={currentIndex === activeDetail.questions.length - 1}
                  >
                    Berikutnya
                  </Button>
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
                    onClick={handleCollectClick}
                    disabled={isSubmitting || isAutoSubmitting}
                  >
                    Kumpulkan Ujian
                  </Button>
                </div>
              </div>
            </SectionCard>
          </div>
        </main>
      </div>

      <Dialog open={showUnansweredDialog} onOpenChange={setShowUnansweredDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Soal Belum Terisi</DialogTitle>
            <DialogDescription>
              Semua soal wajib diisi sebelum ujian dapat dikumpulkan. Anda masih memiliki{" "}
              {unansweredCount} soal yang belum dijawab.
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-64 overflow-y-auto rounded-2xl border border-amber-200 bg-amber-50/60 p-3">
            <div className="mb-2 font-medium text-amber-900 text-xs uppercase tracking-wide">
              Daftar soal kosong
            </div>
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
              {unansweredQuestions.map((question) => {
                const questionIndex = activeDetail.questions.findIndex(
                  (item) => item.examSessionQuestionId === question.examSessionQuestionId,
                );

                return (
                  <button
                    key={question.examSessionQuestionId}
                    type="button"
                    className="h-10 rounded-xl border border-amber-400 bg-white font-medium text-amber-900 text-sm transition-colors hover:border-amber-500 hover:bg-amber-100 active:bg-amber-200"
                    onClick={() => jumpToQuestion(questionIndex)}
                  >
                    {question.number}
                  </button>
                );
              })}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" onClick={() => setShowUnansweredDialog(false)}>
              Kembali ke Ujian
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kumpulkan Ujian?</DialogTitle>
            <DialogDescription>
              Semua soal sudah terisi. Setelah dikumpulkan, jawaban tidak dapat diubah lagi.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowSubmitDialog(false)}>
              Batal
            </Button>
            <Button type="button" onClick={() => void submitExam()} disabled={isSubmitting}>
              {isSubmitting ? "Mengumpulkan..." : "Kumpulkan Ujian"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
