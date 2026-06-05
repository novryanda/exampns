import { notFound } from "next/navigation";

import { ResultWorkspace } from "@/app/(main)/app/_components/result-workspace";
import { PageHeader } from "@/app/(main)/_components/page-shell";
import { formatDateTimeId } from "@/lib/user-app/labels";
import {
  getExamAiRecommendation,
  getExamResultAnswers,
  getExamResultDetail,
  getExamResultRanking,
} from "@/server/user-dashboard-data";

export default async function ExamResultPage({
  params,
}: {
  readonly params: Promise<{ examResultId: string }>;
}) {
  const { examResultId } = await params;

  const [result, answers, recommendation, ranking] = await Promise.all([
    getExamResultDetail(examResultId).catch(() => notFound()),
    getExamResultAnswers(examResultId, { page: 1, limit: 20 }).catch(() => ({
      data: [],
      meta: { page: 1, limit: 20, totalItems: 0, totalPages: 1 },
    })),
    getExamAiRecommendation(examResultId),
    getExamResultRanking(examResultId).catch(() => ({
      tryoutName: "Tryout",
      totalParticipants: 0,
      topTen: [],
      currentUser: null,
    })),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Hasil Ujian"
        description={`${result.tryoutName} • ${formatDateTimeId(result.examDate)}`}
      />
      <ResultWorkspace
        result={result}
        initialAnswers={answers.data}
        initialAnswersMeta={answers.meta}
        initialRecommendation={recommendation}
        initialRanking={ranking}
      />
    </div>
  );
}
