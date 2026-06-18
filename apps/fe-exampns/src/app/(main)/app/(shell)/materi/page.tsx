import { BookOpen } from "lucide-react";

import { PageHeader, SectionCard } from "@/app/(main)/_components/page-shell";
import { MaterialCatalog } from "@/app/(main)/app/_components/material-catalog";
import { getQuestionCategories } from "@/server/user-dashboard-data";

export default async function MateriPage() {
  const categories = await getQuestionCategories();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Materi Pembelajaran"
        description="Pelajari materi SKD CPNS melalui video, teks, dan latihan soal. Selesaikan silabus untuk menguasai setiap topik."
      />
      <SectionCard
        title="Katalog Materi"
        description="Pilih materi yang ingin kamu pelajari. Filter berdasarkan kategori soal."
      >
        <MaterialCatalog categories={categories} />
      </SectionCard>
    </div>
  );
}
