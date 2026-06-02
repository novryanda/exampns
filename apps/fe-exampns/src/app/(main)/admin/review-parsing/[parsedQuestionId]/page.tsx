import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { PageHeader } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
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
      <div className="space-y-4">
        <Button
          asChild
          variant="ghost"
          className="-ml-2 h-auto w-fit rounded-xl px-2 text-slate-600 hover:text-slate-950"
        >
          <Link href="/admin/review-parsing">
            <ArrowLeft className="mr-2 size-4" />
            Kembali
          </Link>
        </Button>
        <PageHeader
          title="Tinjau Hasil Parsing"
          description="Lengkapi metadata wajib, lalu setujui atau tolak hasil parsing ini."
        />
      </div>
      <ParsedQuestionReviewForm
        parsedQuestion={parsedQuestion}
        metadataOptions={metadataOptions}
        redirectPath="/admin/review-parsing"
      />
    </div>
  );
}
