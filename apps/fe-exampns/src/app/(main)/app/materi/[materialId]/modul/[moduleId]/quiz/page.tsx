"use client";

import { useCallback, useEffect, useMemo, useRef, useState, Suspense } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { AlertCircle, CheckCircle2, Flag, Loader2, Award, XCircle } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

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

function questionNavButtonClass(isCurrent: boolean, isAnswered: boolean, isFlagged: boolean, isCorrect?: boolean, isWrong?: boolean) {
  if (isCorrect) {
    return cn(
      "h-10 rounded-xl border font-medium text-sm transition-colors",
      isCurrent ? "border-emerald-700 bg-emerald-600 text-white shadow-sm" : "border-emerald-500 bg-emerald-100 text-emerald-900"
    );
  }
  if (isWrong) {
    return cn(
      "h-10 rounded-xl border font-medium text-sm transition-colors",
      isCurrent ? "border-red-700 bg-red-600 text-white shadow-sm" : "border-red-500 bg-red-100 text-red-900"
    );
  }
  return cn(
    "h-10 rounded-xl border font-medium text-sm transition-colors",
    isCurrent &&
      "border-blue-600 bg-blue-600 text-white shadow-sm hover:border-blue-700 hover:bg-blue-700",
    !isCurrent &&
      isAnswered &&
      "border-emerald-400 bg-emerald-50 text-emerald-800 hover:border-emerald-500 hover:bg-emerald-100 active:bg-emerald-200",
    !isCurrent &&
      !isAnswered &&
      isFlagged &&
      "border-amber-400 bg-amber-50 text-amber-800 hover:border-amber-500 hover:bg-amber-100 active:bg-amber-200",
    !isCurrent &&
      !isAnswered &&
      !isFlagged &&
      "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 active:bg-slate-100",
  );
}

function UserQuizPageInner() {
  const params = useParams<{ materialId: string; moduleId: string }>();
  const router = useRouter();
  const searchParams = useSearchParams();
  const isReviewMode = searchParams.get("mode") === "review";
  
  const materialId = params.materialId;
  const moduleId = params.moduleId;

  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [moduleData, setModuleData] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({}); // questionId -> option.label
  const [flagged, setFlagged] = useState<Record<string, boolean>>({}); // questionId -> isFlagged
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  
  const [showSubmitDialog, setShowSubmitDialog] = useState(false);
  const [showUnansweredDialog, setShowUnansweredDialog] = useState(false);
  const questionListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchModule() {
      try {
        const res = await fetch(`/api/user/learning-materials/${materialId}/modules/${moduleId}`);
        if (!res.ok) throw new Error("Gagal memuat modul");
        const { data } = await res.json();
        setModuleData(data);
        
        // Fetch material to check if locked
        const materialRes = await fetch(`/api/user/learning-materials/${materialId}`);
        if (materialRes.ok) {
          const { data: material } = await materialRes.json();
          const moduleIndex = material.modules.findIndex((m: any) => m.id === moduleId);
          if (moduleIndex > 0) {
            const currentModule = material.modules[moduleIndex];
            const prevModule = material.modules[moduleIndex - 1];
            if (!currentModule.isCompleted && !prevModule.isCompleted && !isReviewMode) {
              toast.error("Harap selesaikan materi sebelumnya untuk mengakses latihan soal ini.");
              router.push(`/app/materi/${materialId}/modul/${moduleId}`);
              return;
            }
          }
        }

        const qList = data.manualQuestions
          ?.sort((a: any, b: any) => a.questionOrder - b.questionOrder)
          || [];
        setQuestions(qList);

        if (isReviewMode) {
          const savedAnswers = localStorage.getItem(`quiz_answers_${moduleId}`);
          if (savedAnswers) {
            try {
              const parsed = JSON.parse(savedAnswers);
              setAnswers(parsed);
              
              let correctCount = 0;
              qList.forEach((q: any) => {
                const selected = parsed[q.id];
                const correctOption = q.options.find((opt: any) => opt.isCorrect);
                if (correctOption && selected === correctOption.label) {
                  correctCount++;
                }
              });
              const calculatedScore = qList.length > 0 ? Math.round((correctCount / qList.length) * 100) : 0;
              setScore(calculatedScore);
            } catch (e) {
              console.error("Failed to parse saved answers", e);
            }
          }
        }

      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchModule();
  }, [materialId, moduleId, isReviewMode]);

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;

  const answeredCount = Object.keys(answers).length;
  const unansweredCount = totalQuestions - answeredCount;
  const unansweredQuestions = questions.filter(q => !answers[q.id]);

  useEffect(() => {
    const container = questionListRef.current;
    if (!container) return;
    const activeButton = container.querySelector<HTMLButtonElement>('button[aria-current="true"]');
    activeButton?.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }, [currentIndex]);

  const handleSelectOption = (questionId: string, label: string) => {
    if (submitted || isReviewMode) return;
    setAnswers((prev) => ({ ...prev, [questionId]: label }));
  };

  const toggleFlag = (questionId: string) => {
    if (submitted || isReviewMode) return;
    setFlagged((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

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

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      let correctCount = 0;
      questions.forEach((q) => {
        const selected = answers[q.id];
        const correctOption = q.options.find((opt: any) => opt.isCorrect);
        if (correctOption && selected === correctOption.label) {
          correctCount++;
        }
      });
      
      const calculatedScore = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
      setScore(calculatedScore);
      setSubmitted(true);

      localStorage.setItem(`quiz_answers_${moduleId}`, JSON.stringify(answers));

      const res = await fetch(`/api/user/learning-materials/${materialId}/modules/${moduleId}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ quizScore: calculatedScore }),
      });
      const data = await res.json();
      
      if (data?.data?.certificateIssued) {
        toast.success("Selamat! Anda telah menyelesaikan materi dan mendapatkan Sertifikat Kelulusan!", { duration: 5000 });
      } else if (data?.data?.progress?.completedAt === null) {
        toast.error(`Nilai Anda ${calculatedScore}. Semangat! Coba lagi untuk mencapai nilai kelulusan.`, { duration: 4000 });
      } else {
        toast.success("Latihan soal berhasil diselesaikan!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Terjadi kesalahan saat menyimpan hasil latihan.");
    } finally {
      setIsSubmitting(false);
      setShowSubmitDialog(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <Loader2 className="size-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (questions.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <p className="text-slate-500 mb-4">Modul ini belum memiliki soal latihan.</p>
          <Button onClick={() => router.push(`/app/materi/${materialId}`)}>Kembali ke Materi</Button>
        </div>
      </div>
    );
  }

  if (submitted && !isReviewMode) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="mx-auto max-w-2xl mt-12 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm text-center">
          <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-blue-100 mb-6">
            <Award className="size-10 text-blue-600" />
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Latihan Selesai!</h2>
          <p className="text-slate-500 mb-8">Kamu telah menyelesaikan latihan soal untuk modul ini.</p>
          
          <div className="inline-flex flex-col items-center justify-center rounded-2xl border-2 border-slate-100 bg-slate-50 p-6 mb-8 w-full max-w-xs">
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider mb-2">Nilai Kamu</span>
            <span className="text-6xl font-black text-blue-600">{score}</span>
          </div>

          <div className="flex justify-center gap-4">
            <Button
              variant="outline"
              size="lg"
              className="rounded-xl"
              onClick={() => {
                setSubmitted(false);
                setAnswers({});
                setFlagged({});
                setCurrentIndex(0);
                setScore(null);
                localStorage.removeItem(`quiz_answers_${moduleId}`);
              }}
            >
              Kerjakan Ulang
            </Button>
            <Button
              size="lg"
              className="rounded-xl bg-blue-600 hover:bg-blue-700"
              onClick={() => router.push(`/app/materi/${materialId}`)}
            >
              Lanjut ke Materi Lainnya
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-7xl flex-col gap-6 bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => router.push(`/app/materi/${materialId}/modul/${moduleId}`)}
            className="rounded-full shrink-0"
          >
            Kembali
          </Button>
          <div>
            <div className="text-slate-500 text-xs uppercase tracking-wide">
              {isReviewMode ? "Review Hasil Ujian" : "Modul Latihan"}
            </div>
            <div className="font-semibold text-slate-950">{moduleData?.title ?? "Latihan Soal"}</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-slate-500 text-xs uppercase tracking-wide">
              {isReviewMode ? "Skor Akhir" : "Status"}
            </div>
            <div className={cn("font-semibold text-sm", isReviewMode ? "text-blue-600" : "text-emerald-600")}>
              {isReviewMode ? `${score ?? 0} / 100` : "Berjalan"}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
        <aside className="w-full shrink-0 lg:sticky lg:top-6 lg:w-72">
          <SectionCard title="Navigasi Soal" description="Pilih nomor soal dari panel kiri.">
            <div className="mb-4 flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <StatusBadge tone="brand">
                {answeredCount}/{totalQuestions} terjawab
              </StatusBadge>
            </div>

            <div className="mb-3 flex flex-wrap gap-x-4 gap-y-2">
              {isReviewMode ? (
                <>
                  <QuestionNavLegendItem label="Benar" swatchClassName="border-emerald-500 bg-emerald-100" />
                  <QuestionNavLegendItem label="Salah" swatchClassName="border-red-500 bg-red-100" />
                  <QuestionNavLegendItem label="Kosong" swatchClassName="border-slate-200 bg-slate-50" />
                </>
              ) : (
                <>
                  <QuestionNavLegendItem label="Aktif" swatchClassName="border-blue-600 bg-blue-600" />
                  <QuestionNavLegendItem label="Terjawab" swatchClassName="border-emerald-400 bg-emerald-50" />
                  <QuestionNavLegendItem label="Tandai" swatchClassName="border-amber-400 bg-amber-50" />
                </>
              )}
            </div>

            <div
              ref={questionListRef}
              className="grid max-h-[min(70vh,560px)] grid-cols-5 gap-2 overflow-y-auto overscroll-y-contain pr-1"
            >
              {questions.map((question, index) => {
                const isCurrent = index === currentIndex;
                const isAnswered = !!answers[question.id];
                const isFlagged = !!flagged[question.id];
                
                let isCorrect = false;
                let isWrong = false;
                
                if (isReviewMode) {
                  const correctOption = question.options.find((opt: any) => opt.isCorrect);
                  const selectedLabel = answers[question.id];
                  if (selectedLabel) {
                    if (correctOption && selectedLabel === correctOption.label) {
                      isCorrect = true;
                    } else {
                      isWrong = true;
                    }
                  }
                }

                return (
                  <button
                    key={question.id}
                    type="button"
                    aria-current={isCurrent ? "true" : undefined}
                    aria-label={`Soal ${index + 1}${isAnswered ? ", sudah dijawab" : ""}${isFlagged ? ", ditandai" : ""}`}
                    className={questionNavButtonClass(isCurrent, isAnswered, isFlagged, isCorrect, isWrong)}
                    onClick={() => setCurrentIndex(index)}
                  >
                    {index + 1}
                  </button>
                );
              })}
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
                  setCurrentIndex((current) => Math.min(totalQuestions - 1, current + 1))
                }
                disabled={currentIndex === totalQuestions - 1}
              >
                Berikutnya
              </Button>
            </div>
          </SectionCard>
        </aside>

        <main className="flex min-w-0 flex-1 justify-center">
          <div className="w-full max-w-3xl">
            <SectionCard
              title={`Soal ${currentIndex + 1} dari ${totalQuestions}`}
              description="Pilih jawaban yang paling tepat."
              trailing={
                !isReviewMode && (
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      variant={flagged[currentQuestion?.id] ? "destructive" : "outline"}
                      className="rounded-xl"
                      onClick={() => toggleFlag(currentQuestion?.id)}
                    >
                      <Flag className="mr-2 size-4" />
                      {flagged[currentQuestion?.id] ? "Hapus Tanda" : "Tandai"}
                    </Button>
                  </div>
                )
              }
            >
              <div className="space-y-6">
                <div 
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-5 text-slate-800 leading-7 prose prose-slate max-w-none"
                  dangerouslySetInnerHTML={{ __html: currentQuestion?.questionText }}
                />

                <div className="grid gap-3">
                  {currentQuestion?.options.map((option: any) => {
                    const checked = answers[currentQuestion.id] === option.label;
                    const isReviewCorrect = isReviewMode && option.isCorrect;
                    const isReviewWrong = isReviewMode && checked && !option.isCorrect;

                    return (
                      <button
                        key={option.id}
                        type="button"
                        className={cn(
                          "flex items-start gap-3 rounded-2xl border px-4 py-3 text-left transition-colors",
                          isReviewCorrect
                            ? "border-emerald-500 bg-emerald-50 text-emerald-900 shadow-sm"
                            : isReviewWrong
                              ? "border-red-500 bg-red-50 text-red-900 shadow-sm"
                              : checked
                                ? "border-blue-300 bg-blue-50 text-blue-900 shadow-sm hover:border-blue-400 hover:bg-blue-100 active:bg-blue-100"
                                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50 active:bg-slate-100",
                        )}
                        onClick={() => handleSelectOption(currentQuestion.id, checked ? "" : option.label)}
                        disabled={isReviewMode}
                      >
                        <div className="mt-0.5 font-semibold">{option.label}.</div>
                        <div 
                          className="flex-1 prose prose-sm max-w-none"
                          dangerouslySetInnerHTML={{ __html: option.optionText }}
                        />
                        {checked && !isReviewMode ? <CheckCircle2 className="mt-0.5 size-4 text-blue-600" /> : null}
                        {isReviewCorrect ? <CheckCircle2 className="mt-0.5 size-4 text-emerald-600" /> : null}
                        {isReviewWrong ? <XCircle className="mt-0.5 size-4 text-red-600" /> : null}
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
                      setCurrentIndex((current) => Math.min(totalQuestions - 1, current + 1))
                    }
                    disabled={currentIndex === totalQuestions - 1}
                  >
                    Berikutnya
                  </Button>
                </div>

                {!isReviewMode && (
                  <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                    <div className="flex items-center gap-2 text-slate-500 text-sm">
                      <AlertCircle className="size-4" />
                      Pilih kumpulkan setelah semua soal terjawab.
                    </div>
                    <Button
                      type="button"
                      className="rounded-xl bg-emerald-600 hover:bg-emerald-700"
                      onClick={handleCollectClick}
                      disabled={isSubmitting}
                    >
                      Kumpulkan Latihan
                    </Button>
                  </div>
                )}
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
              Disarankan untuk menjawab semua soal sebelum mengumpulkan latihan. Anda masih memiliki{" "}
              {unansweredCount} soal yang belum dijawab.
            </DialogDescription>
          </DialogHeader>

          <div className="max-h-64 overflow-y-auto rounded-2xl border border-amber-200 bg-amber-50/60 p-3">
            <div className="mb-2 font-medium text-amber-900 text-xs uppercase tracking-wide">
              Daftar soal kosong
            </div>
            <div className="grid grid-cols-5 gap-2 sm:grid-cols-6">
              {unansweredQuestions.map((q) => {
                const qIndex = questions.findIndex(item => item.id === q.id);
                return (
                  <button
                    key={q.id}
                    type="button"
                    className="h-10 rounded-xl border border-amber-400 bg-white font-medium text-amber-900 text-sm transition-colors hover:border-amber-500 hover:bg-amber-100 active:bg-amber-200"
                    onClick={() => jumpToQuestion(qIndex)}
                  >
                    {qIndex + 1}
                  </button>
                );
              })}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => void handleSubmit()}>
              Kumpulkan Saja
            </Button>
            <Button type="button" onClick={() => setShowUnansweredDialog(false)}>
              Kembali ke Latihan
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={showSubmitDialog} onOpenChange={setShowSubmitDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Kumpulkan Latihan?</DialogTitle>
            <DialogDescription>
              Semua soal sudah terisi. Setelah dikumpulkan, hasil skormu akan langsung dihitung.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setShowSubmitDialog(false)}>
              Batal
            </Button>
            <Button type="button" onClick={() => void handleSubmit()} disabled={isSubmitting}>
              {isSubmitting ? "Mengumpulkan..." : "Kumpulkan Latihan"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default function UserQuizPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center bg-slate-50"><Loader2 className="size-8 animate-spin text-blue-500" /></div>}>
      <UserQuizPageInner />
    </Suspense>
  );
}
