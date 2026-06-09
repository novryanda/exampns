"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Loader2 } from "lucide-react";

import { SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { AiRecommendationContent } from "@/app/(main)/app/_components/ai-recommendation-content";
import { AnswerReviewCard } from "@/app/(main)/app/_components/answer-review-card";
import { ResultRankingPanel } from "@/app/(main)/app/_components/result-ranking-panel";
import { ServerPagination } from "@/components/server-pagination";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { formatDateTimeId } from "@/lib/user-app/labels";
import type {
  AiRecommendationDetail,
  ExamResultAnswerItem,
  ExamResultDetail,
  ExamResultRanking,
} from "@/server/user-dashboard-data";

const ANSWERS_PER_PAGE = 20;

type AnswersPaginationMeta = {
  page: number;
  limit: number;
  totalItems: number;
  totalPages: number;
};

export function ResultWorkspace({
  result,
  initialAnswers,
  initialAnswersMeta,
  initialRecommendation,
  initialRanking,
}: {
  readonly result: ExamResultDetail;
  readonly initialAnswers: ExamResultAnswerItem[];
  readonly initialAnswersMeta: AnswersPaginationMeta;
  readonly initialRecommendation: AiRecommendationDetail | null;
  readonly initialRanking: ExamResultRanking;
}) {
  const [answers, setAnswers] = useState(initialAnswers);
  const [answersMeta, setAnswersMeta] = useState(initialAnswersMeta);
  const [answersPage, setAnswersPage] = useState(initialAnswersMeta.page);
  const [recommendation, setRecommendation] = useState(initialRecommendation);
  const [correctnessFilter, setCorrectnessFilter] = useState<"all" | "correct" | "wrong" | "empty">("all");
  const [isLoadingAnswers, setIsLoadingAnswers] = useState(false);
  const [isPollingAi, setIsPollingAi] = useState(result.aiRecommendationStatus === "processing");
  const skipInitialAnswersFetch = useRef(true);

  const loadAnswers = useCallback(
    async (page: number, correctness?: "correct" | "wrong" | "empty") => {
      setIsLoadingAnswers(true);
      try {
        const query = new URLSearchParams({
          page: String(page),
          limit: String(ANSWERS_PER_PAGE),
        });
        if (correctness) {
          query.set("correctness", correctness);
        }

        const response = await fetch(`/api/user/results/${result.examResultId}/answers?${query.toString()}`);
        const payload = (await response.json()) as {
          data?: ExamResultAnswerItem[];
          meta?: AnswersPaginationMeta;
        };

        if (response.ok && payload.data) {
          setAnswers(payload.data);
          if (payload.meta) {
            setAnswersMeta(payload.meta);
            setAnswersPage(payload.meta.page);
          }
        }
      } finally {
        setIsLoadingAnswers(false);
      }
    },
    [result.examResultId],
  );

  const pollRecommendation = useCallback(async () => {
    const response = await fetch(`/api/user/results/${result.examResultId}/ai-recommendation`);
    if (response.status === 202) {
      return null;
    }

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as { data?: AiRecommendationDetail };
    return payload.data ?? null;
  }, [result.examResultId]);

  useEffect(() => {
    if (!isPollingAi) {
      return;
    }

    const intervalId = window.setInterval(() => {
      void (async () => {
        const next = await pollRecommendation();
        if (next && next.status !== "processing") {
          setRecommendation(next);
          setIsPollingAi(false);
        }
      })();
    }, 3000);

    return () => window.clearInterval(intervalId);
  }, [isPollingAi, pollRecommendation]);

  useEffect(() => {
    if (
      skipInitialAnswersFetch.current &&
      answersPage === initialAnswersMeta.page &&
      correctnessFilter === "all"
    ) {
      skipInitialAnswersFetch.current = false;
      return;
    }

    void loadAnswers(answersPage, correctnessFilter === "all" ? undefined : correctnessFilter);
  }, [answersPage, correctnessFilter, initialAnswersMeta.page, loadAnswers]);

  const handleCorrectnessFilterChange = (filter: "all" | "correct" | "wrong" | "empty") => {
    setCorrectnessFilter(filter);
    setAnswersPage(1);
  };

  const answerRangeStart =
    answersMeta.totalItems === 0 ? 0 : (answersMeta.page - 1) * answersMeta.limit + 1;
  const answerRangeEnd = Math.min(answersMeta.page * answersMeta.limit, answersMeta.totalItems);

  return (
    <div className="flex flex-col gap-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {result.score.categories.map((categoryScore) => {
          const passing = result.passingStatus.categories.find(
            (item) => item.categoryCode === categoryScore.categoryCode,
          );

          return (
            <div key={categoryScore.categoryCode} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="text-slate-500 text-sm">{categoryScore.categoryName}</div>
              <div className="font-semibold text-3xl text-slate-950">{categoryScore.score}</div>
              <div className="mt-2 text-slate-500 text-xs">Minimum {categoryScore.minScore}</div>
              <StatusBadge tone={passing?.passed ? "success" : "warning"} className="mt-3">
                {passing?.passed ? "Lulus" : "Belum lulus"}
              </StatusBadge>
            </div>
          );
        })}
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="text-slate-500 text-sm">Total</div>
          <div className="font-semibold text-3xl text-slate-950">{result.score.total}</div>
          <StatusBadge tone={result.passingStatus.overallPassed ? "success" : "warning"} className="mt-3">
            {result.passingStatus.overallPassed ? "Lulus Passing Grade" : "Belum Lulus"}
          </StatusBadge>
        </div>
      </div>

      <Tabs defaultValue="ringkasan" className="gap-6">
        <TabsList variant="line" className="h-auto w-full justify-start rounded-none border-slate-200 border-b bg-transparent p-0">
          <TabsTrigger value="ringkasan" className="rounded-none px-4 py-2">
            Ringkasan
          </TabsTrigger>
          <TabsTrigger value="perangkingan" className="rounded-none px-4 py-2">
            Perangkingan
          </TabsTrigger>
        </TabsList>

        <TabsContent value="ringkasan" className="flex flex-col gap-6">
      <SectionCard title="Passing Grade Breakdown" description="Perbandingan skor dengan batas minimum tiap kategori.">
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kategori</TableHead>
                <TableHead>Skor</TableHead>
                <TableHead>Minimum</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.score.categories.map((categoryScore) => (
                <TableRow key={categoryScore.categoryCode}>
                  <TableCell>{categoryScore.categoryName}</TableCell>
                  <TableCell>{categoryScore.score}</TableCell>
                  <TableCell>{categoryScore.minScore}</TableCell>
                  <TableCell>
                    <StatusBadge tone={categoryScore.passed ? "success" : "warning"}>
                      {categoryScore.passed ? "Lulus" : "Belum lulus"}
                    </StatusBadge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SectionCard>

      <SectionCard title="Category Performance" description="Akurasi per topik berdasarkan hasil ujian.">
        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kategori</TableHead>
                <TableHead>Sub Kategori</TableHead>
                <TableHead>Topik</TableHead>
                <TableHead>Tingkat</TableHead>
                <TableHead>Benar</TableHead>
                <TableHead>Salah</TableHead>
                <TableHead>Akurasi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.breakdown.map((item) => (
                <TableRow
                  key={`${item.category}-${item.subCategory}-${item.topicTag}-${item.difficulty}`}
                >
                  <TableCell>{item.category}</TableCell>
                  <TableCell>{item.subCategory}</TableCell>
                  <TableCell>{item.topicTag}</TableCell>
                  <TableCell className="capitalize">{item.difficulty}</TableCell>
                  <TableCell>{item.correctAnswers}</TableCell>
                  <TableCell>{item.wrongAnswers}</TableCell>
                  <TableCell>{item.accuracy}%</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </SectionCard>

      <div id="rekomendasi">
      <SectionCard
        title="AI Recommendation"
        description="Rekomendasi belajar berdasarkan pola kesalahan Anda."
      >
        <AiRecommendationContent recommendation={recommendation} isPolling={isPollingAi} />
      </SectionCard>
      </div>

      <SectionCard
        title="Answer Review"
        description={`Tinjau jawaban benar, salah, dan kosong. ${ANSWERS_PER_PAGE} soal per halaman.`}
      >
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {(["all", "correct", "wrong", "empty"] as const).map((filter) => (
              <Button
                key={filter}
                type="button"
                size="sm"
                variant={correctnessFilter === filter ? "default" : "outline"}
                className="rounded-xl"
                onClick={() => handleCorrectnessFilterChange(filter)}
              >
                {filter === "all" ? "Semua" : filter === "correct" ? "Benar" : filter === "wrong" ? "Salah" : "Kosong"}
              </Button>
            ))}
          </div>
          <p className="text-slate-500 text-sm">
            {answersMeta.totalItems === 0
              ? "Tidak ada jawaban"
              : `Menampilkan ${answerRangeStart}-${answerRangeEnd} dari ${answersMeta.totalItems} soal`}
          </p>
        </div>
        {isLoadingAnswers ? (
          <div className="flex items-center gap-2 text-slate-500 text-sm">
            <Loader2 className="size-4 animate-spin" />
            Memuat review jawaban...
          </div>
        ) : answers.length === 0 ? (
          <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-slate-500 text-sm">
            Tidak ada jawaban untuk filter ini.
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {answers.map((answer, index) => (
              <AnswerReviewCard key={`answer-${answer.number}-${index}`} answer={answer} />
            ))}
          </div>
        )}
        <ServerPagination
          page={answersMeta.page}
          totalPages={answersMeta.totalPages}
          params={{}}
          basePath={`/app/result/${result.examResultId}`}
          onPageChange={setAnswersPage}
          className="mt-4"
        />
      </SectionCard>
        </TabsContent>

        <TabsContent value="perangkingan">
          <ResultRankingPanel ranking={initialRanking} />
        </TabsContent>
      </Tabs>

      <p className="text-slate-500 text-xs">
        Hasil ujian: {result.tryoutName} • {formatDateTimeId(result.examDate)}
      </p>
    </div>
  );
}
