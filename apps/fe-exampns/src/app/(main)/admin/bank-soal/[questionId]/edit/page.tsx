import { notFound } from "next/navigation";

import { PageHeader, SectionCard } from "@/app/(main)/_components/page-shell";
import { getAdminQuestionDetail } from "@/server/admin-content-data";

import { QuestionEditorForm } from "../../_components/question-editor-form";

export default async function EditQuestionPage({ params }: { readonly params: Promise<{ questionId: string }> }) {
  const { questionId } = await params;

  const question = await getAdminQuestionDetail(questionId).catch(() => notFound());

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Edit Soal" description="Perubahan hanya berlaku untuk sesi ujian baru." />
      <SectionCard title="Form Soal" description={`ID soal: ${question.id}`}>
        <QuestionEditorForm question={question} redirectPath="/admin/bank-soal" />
      </SectionCard>
    </div>
  );
}
