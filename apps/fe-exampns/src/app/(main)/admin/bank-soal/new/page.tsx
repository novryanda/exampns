import { PageHeader, SectionCard } from "@/app/(main)/_components/page-shell";

import { QuestionEditorForm } from "../_components/question-editor-form";

export default function NewQuestionPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Tambah Soal" description="Lengkapi metadata wajib dan opsi jawaban sesuai jenis soal." />
      <SectionCard title="Form Soal" description="TWK/TIU memakai satu jawaban benar, TKP memakai bobot opsi 1-5.">
        <QuestionEditorForm redirectPath="/admin/bank-soal" />
      </SectionCard>
    </div>
  );
}
