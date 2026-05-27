import { PageHeader, SectionCard } from "@/app/(main)/_components/page-shell";
import { getAdminQuestionMetadataOptions } from "@/server/admin-content-data";

import { QuestionEditorForm } from "../_components/question-editor-form";

export default async function NewQuestionPage() {
  const metadataOptions = await getAdminQuestionMetadataOptions();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Tambah Soal" description="Lengkapi metadata wajib dan opsi jawaban sesuai jenis soal." />
      <SectionCard title="Form Soal" description="TWK/TIU memakai satu jawaban benar, TKP memakai nilai opsi 1-5.">
        <QuestionEditorForm metadataOptions={metadataOptions} redirectPath="/admin/bank-soal" />
      </SectionCard>
    </div>
  );
}
