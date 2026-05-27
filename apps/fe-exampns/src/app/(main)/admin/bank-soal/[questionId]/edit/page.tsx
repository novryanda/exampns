import { notFound } from "next/navigation";

import { PageHeader, SectionCard } from "@/app/(main)/_components/page-shell";
import { getAdminQuestionDetail, getAdminQuestionMetadataOptions } from "@/server/admin-content-data";

import { QuestionEditorForm } from "../../_components/question-editor-form";

export default async function EditQuestionPage({ params }: { readonly params: Promise<{ questionId: string }> }) {
  const { questionId } = await params;

  const [question, metadataOptions] = await Promise.all([
    getAdminQuestionDetail(questionId).catch(() => notFound()),
    getAdminQuestionMetadataOptions(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Edit Soal" description="Perubahan hanya berlaku untuk sesi ujian baru." />
      <SectionCard title="Form Soal" description={`ID soal: ${question.id}`}>
        <QuestionEditorForm question={question} metadataOptions={metadataOptions} redirectPath="/admin/bank-soal" />
      </SectionCard>
    </div>
  );
}
