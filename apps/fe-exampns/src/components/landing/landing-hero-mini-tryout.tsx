"use client";

import * as React from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface SampleQuestionOption {
  label: string;
  text: string;
}

interface SampleQuestion {
  id: string;
  questionText: string;
  category: string;
  categoryName: string;
  options: SampleQuestionOption[];
}

interface SampleQuestionsResponse {
  sessionToken: string;
  totalQuestions: number;
  questions: SampleQuestion[];
}

interface CheckResultItem {
  questionId: string;
  selectedLabel: string | null;
  correctLabel: string | null;
  isCorrect: boolean;
  explanation: string | null;
}

interface CheckResponse {
  totalQuestions: number;
  correctCount: number;
  scorePercent: number;
  results: CheckResultItem[];
}

async function readApiData<T>(response: Response): Promise<T> {
  const payload = (await response.json()) as { success: boolean; data?: T; message?: string };

  if (!response.ok || !payload.success || !payload.data) {
    throw new Error(payload.message ?? "Gagal memuat mini tryout");
  }

  return payload.data;
}

export function LandingHeroMiniTryout() {
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);
  const [sessionToken, setSessionToken] = React.useState<string | null>(null);
  const [questions, setQuestions] = React.useState<SampleQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [submitting, setSubmitting] = React.useState(false);
  const [result, setResult] = React.useState<CheckResponse | null>(null);

  const loadQuestions = React.useCallback(async () => {
    setLoading(true);
    setError(null);
    setResult(null);
    setAnswers({});
    setCurrentIndex(0);

    try {
      const response = await fetch("/api/public/sample-questions", { cache: "no-store" });
      const data = await readApiData<SampleQuestionsResponse>(response);
      setSessionToken(data.sessionToken);
      setQuestions(data.questions);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Gagal memuat soal");
      setQuestions([]);
      setSessionToken(null);
    } finally {
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    void loadQuestions();
  }, [loadQuestions]);

  const restartCurrentQuestions = () => {
    setResult(null);
    setError(null);
    setAnswers({});
    setCurrentIndex(0);
  };

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const isLastQuestion = currentIndex === totalQuestions - 1;
  const selectedLabel = currentQuestion ? answers[currentQuestion.id] : undefined;

  const handleSelectOption = (label: string) => {
    if (!currentQuestion || result) return;

    setAnswers((previous) => ({
      ...previous,
      [currentQuestion.id]: label,
    }));
  };

  const handleNext = async () => {
    if (!currentQuestion || !selectedLabel) return;

    if (!isLastQuestion) {
      setCurrentIndex((index) => index + 1);
      return;
    }

    if (!sessionToken) return;

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/public/sample-questions/check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionToken,
          answers: questions.map((question) => ({
            questionId: question.id,
            selectedLabel: answers[question.id],
          })),
        }),
      });

      const data = await readApiData<CheckResponse>(response);
      setResult(data);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Gagal memeriksa jawaban");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full min-h-[300px] items-center justify-center p-4 sm:min-h-[360px] sm:p-6">
        <p className="text-[#64748b] text-sm">Memuat soal...</p>
      </div>
    );
  }

  if (error && questions.length === 0) {
    return (
      <div className="flex h-full min-h-[300px] flex-col items-center justify-center gap-3 p-4 text-center sm:min-h-[360px] sm:p-6">
        <p className="text-[#64748b] text-sm">{error}</p>
        <Button type="button" size="sm" variant="outline" onClick={() => void loadQuestions()}>
          Coba lagi
        </Button>
      </div>
    );
  }

  if (result) {
    return (
      <div className="flex h-full flex-col p-3 sm:p-5">
        <div className="mb-3 text-center sm:mb-4">
          <p className="font-mono text-[#94a3b8] text-[11px]">// Hasil mini tryout</p>
          <h3 className="mt-1 font-bold text-[#0f172a] text-lg">Skor Anda</h3>
          <p className="mt-2 font-bold text-4xl text-[#1d4ed8]">{result.scorePercent}%</p>
          <p className="mt-1 text-[#64748b] text-sm">
            {result.correctCount} dari {result.totalQuestions} jawaban benar
          </p>
        </div>

        <div className="flex flex-1 flex-col gap-2 overflow-y-auto">
          {result.results.map((item, index) => {
            const question = questions.find((entry) => entry.id === item.questionId);
            return (
              <div
                key={item.questionId}
                className={cn(
                  "rounded-xl border px-3 py-2 text-sm",
                  item.isCorrect
                    ? "border-[#bbf7d0] bg-[#f0fdf4]"
                    : "border-[#fecaca] bg-[#fef2f2]",
                )}
              >
                <p className="font-medium text-[#0f172a]">
                  Soal {index + 1}: {item.isCorrect ? "Benar" : "Salah"}
                </p>
                {question ? (
                  <p className="mt-1 text-[#475569] text-xs leading-relaxed">{question.questionText}</p>
                ) : null}
                {!item.isCorrect && item.correctLabel ? (
                  <p className="mt-1 text-[#64748b] text-xs">Jawaban benar: {item.correctLabel}</p>
                ) : null}
              </div>
            );
          })}
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          <Button type="button" size="sm" variant="outline" onClick={restartCurrentQuestions}>
            Ulangi Soal Ini
          </Button>
          <Button asChild size="sm" className="bg-[#1d4ed8] hover:bg-[#1e40af]">
            <Link href="/auth/register">Mulai Simulasi Lengkap</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <div className="flex h-full flex-col p-3 sm:p-5">
      <div className="mb-2 flex items-center justify-between gap-1 border-[#e2e8f0] border-b pb-2 sm:mb-3 sm:gap-2 sm:pb-3">
        <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
          <span className="size-1.5 rounded-full bg-[#f87171] sm:size-2" />
          <span className="size-1.5 rounded-full bg-[#fbbf24] sm:size-2" />
          <span className="size-1.5 rounded-full bg-[#4ade80] sm:size-2" />
        </div>
        <span className="hidden font-mono text-[#94a3b8] text-[11px] min-[400px]:inline">
          skd-master.cbt
        </span>
        <span className="shrink-0 rounded-full bg-[#dcfce7] px-1.5 py-0.5 font-semibold text-[#16a34a] text-[9px] sm:px-2 sm:text-[10px]">
          LIVE · Gratis
        </span>
      </div>

      <h3 className="font-bold text-[#0f172a] text-base sm:text-lg">Mini Tryout Instan</h3>

      <div className="mt-3 flex items-center gap-3">
        <div className="flex flex-1 gap-1">
          {questions.map((question, index) => (
            <div
              key={question.id}
              className={cn(
                "h-1.5 flex-1 rounded-full",
                index <= currentIndex ? "bg-[#22d3ee]" : "bg-[#e2e8f0]",
              )}
            />
          ))}
        </div>
        <span className="font-semibold text-[#64748b] text-xs">
          {currentIndex + 1}/{totalQuestions}
        </span>
      </div>

      <span className="mt-4 inline-flex w-fit rounded-md bg-[#ede9fe] px-2 py-0.5 font-bold text-[#7c3aed] text-[11px] uppercase">
        {currentQuestion.category}
      </span>

      <p className="mt-2 font-semibold text-[#0f172a] text-xs leading-snug sm:mt-3 sm:text-sm">
        {currentQuestion.questionText}
      </p>

      <div className="mt-2 flex flex-1 flex-col gap-1.5 overflow-y-auto sm:mt-3 sm:gap-2">
        {currentQuestion.options.map((option) => (
          <button
            key={option.label}
            type="button"
            onClick={() => handleSelectOption(option.label)}
            className={cn(
              "rounded-lg border px-2.5 py-2 text-left text-xs transition-colors sm:rounded-xl sm:px-3 sm:py-2.5 sm:text-sm",
              selectedLabel === option.label
                ? "border-[#1d4ed8] bg-[#eff6ff] text-[#1e3a8a]"
                : "border-[#e2e8f0] bg-[#f8fafc] text-[#334155] hover:border-[#bfdbfe] hover:bg-[#eff6ff]",
            )}
          >
            <span className="font-semibold">{option.label}.</span> {option.text}
          </button>
        ))}
      </div>

      {error ? <p className="mt-2 text-[#dc2626] text-xs">{error}</p> : null}

      <div className="mt-3 flex items-center justify-between gap-2 sm:mt-4">
        <Button
          type="button"
          size="sm"
          variant="ghost"
          className="h-8 px-2 text-xs sm:h-9 sm:px-3 sm:text-sm"
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((index) => Math.max(0, index - 1))}
        >
          Sebelumnya
        </Button>
        <Button
          type="button"
          size="sm"
          className="h-8 bg-[#1d4ed8] px-3 text-xs hover:bg-[#1e40af] sm:h-9 sm:px-4 sm:text-sm"
          disabled={!selectedLabel || submitting}
          onClick={() => void handleNext()}
        >
          {submitting ? "Memeriksa..." : isLastQuestion ? "Lihat Hasil" : "Berikutnya"}
        </Button>
      </div>
    </div>
  );
}
