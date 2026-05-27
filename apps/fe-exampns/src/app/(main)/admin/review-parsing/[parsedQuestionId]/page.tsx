import { notFound } from "next/navigation";

import { PageHeader } from "@/app/(main)/_components/page-shell";
import { getAdminParsedQuestionDetail, getAdminQuestionMetadataOptions } from "@/server/admin-content-data";

import { ParsedQuestionReviewForm } from "../_components/parsed-question-review-form";

export default async function ParsedQuestionDetailPage({
  params,
}: {
  readonly params: Promise<{ parsedQuestionId: string }>;
}) {
  const { parsedQuestionId } = await params;

  const [parsedQuestion, metadataOptions] = await Promise.all([
    getAdminParsedQuestionDetail(parsedQuestionId).catch(() => notFound()),
    getAdminQuestionMetadataOptions(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Tinjau Hasil Parsing"
        description="Lengkapi metadata wajib, lalu setujui atau tolak hasil parsing ini."
      />
      <ParsedQuestionReviewForm
        parsedQuestion={parsedQuestion}
        metadataOptions={metadataOptions}
        redirectPath="/admin/review-parsing"
      />
    </div>
  );
}
