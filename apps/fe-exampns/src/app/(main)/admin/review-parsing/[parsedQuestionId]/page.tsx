import { notFound } from "next/navigation";

import { PageHeader } from "@/app/(main)/_components/page-shell";
import { getAdminParsedQuestionDetail } from "@/server/admin-content-data";

import { ParsedQuestionReviewForm } from "../_components/parsed-question-review-form";

export default async function ParsedQuestionDetailPage({
  params,
}: {
  readonly params: Promise<{ parsedQuestionId: string }>;
}) {
  const { parsedQuestionId } = await params;

  const parsedQuestion = await getAdminParsedQuestionDetail(parsedQuestionId).catch(() => notFound());

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Parsed Question Review"
        description="Lengkapi metadata wajib, lalu approve atau reject hasil parsing ini."
      />
      <ParsedQuestionReviewForm parsedQuestion={parsedQuestion} redirectPath="/admin/review-parsing" />
    </div>
  );
}
