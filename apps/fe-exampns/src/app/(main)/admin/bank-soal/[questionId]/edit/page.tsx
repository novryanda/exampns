import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { SectionCard } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import { getAdminQuestionDetail, getAdminQuestionMetadataOptions } from "@/server/admin-content-data";

import { QuestionEditorForm } from "../../_components/question-editor-form";

export default async function EditQuestionPage({ params }: { readonly params: Promise<{ questionId: string }> }) {
  const { questionId } = await params;

  const [question, metadataOptions] = await Promise.all([
    getAdminQuestionDetail(questionId).catch(() => notFound()),
    getAdminQuestionMetadataOptions(),
  ]);

  return (
    <div className="flex min-w-0 w-full max-w-full flex-col gap-6">
      <div className="space-y-4">
        <Button
          asChild
          variant="ghost"
          className="-ml-2 h-auto w-fit rounded-xl px-2 text-slate-600 hover:text-slate-950"
        >
          <Link href="/admin/bank-soal">
            <ArrowLeft className="mr-2 size-4" />
            Kembali
          </Link>
        </Button>
        <div className="space-y-1.5">
          <h1 className="font-semibold text-3xl text-slate-950 tracking-tight">Edit Soal</h1>
          <p className="text-slate-500 text-sm">Perubahan hanya berlaku untuk sesi ujian baru.</p>
        </div>
      </div>

      <SectionCard title="Form Soal" description={`ID soal: ${question.id}`}>
        <QuestionEditorForm question={question} metadataOptions={metadataOptions} redirectPath="/admin/bank-soal" />
      </SectionCard>
    </div>
  );
}
