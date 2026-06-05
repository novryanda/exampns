import { TryoutCatalog } from "@/app/(main)/app/_components/tryout-catalog";
import { PageHeader, SectionCard } from "@/app/(main)/_components/page-shell";
import { getAccessibleTryouts, getActiveExamSummary, getQuestionCategories } from "@/server/user-dashboard-data";

export default async function TryoutPage() {
  const [tryouts, categories, activeExam] = await Promise.all([
    getAccessibleTryouts(),
    getQuestionCategories(),
    getActiveExamSummary(),
  ]);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Tryout Tersedia"
        description="Pilih tryout yang tersedia. Soal akan disiapkan otomatis sesuai aturan tryout."
      />
      <SectionCard
        title="Katalog Tryout"
        description="Tryout dipublish admin. Filter kategori mengikuti konfigurasi Question Categories."
      >
        <TryoutCatalog
          tryouts={tryouts}
          categories={categories}
          hasActiveExam={activeExam.hasActiveExam}
        />
      </SectionCard>
    </div>
  );
}
