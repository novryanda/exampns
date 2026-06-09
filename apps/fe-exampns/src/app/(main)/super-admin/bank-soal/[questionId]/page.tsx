import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { QuestionDetailView } from "@/app/(main)/admin/bank-soal/_components/question-detail-view";
import { SectionCard } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import { getAdminQuestionDetail } from "@/server/admin-content-data";

export default async function SuperAdminQuestionDetailPage({
  params,
}: {
  readonly params: Promise<{ questionId: string }>;
}) {
  const { questionId } = await params;
  const question = await getAdminQuestionDetail(questionId).catch(() => notFound());

  return (
    <div className="flex min-w-0 w-full max-w-full flex-col gap-6">
      <div className="space-y-4">
        <Button
          asChild
          variant="ghost"
          className="-ml-2 h-auto w-fit rounded-xl px-2 text-slate-600 hover:text-slate-950"
        >
          <Link href="/super-admin/bank-soal">
            <ArrowLeft className="mr-2 size-4" />
            Kembali ke Bank Soal
          </Link>
        </Button>
        <div className="space-y-1.5">
          <h1 className="font-semibold text-3xl text-slate-950 tracking-tight">Detail Soal</h1>
          <p className="text-slate-500 text-sm">Mode tampilan saja. Perubahan soal dilakukan oleh admin konten.</p>
        </div>
      </div>

      <SectionCard title="Informasi Soal" description={`ID soal: ${question.id}`}>
        <QuestionDetailView question={question} />
      </SectionCard>
    </div>
  );
}
