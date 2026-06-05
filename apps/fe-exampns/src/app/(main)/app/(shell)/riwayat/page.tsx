import { ExamHistoryTable } from "@/app/(main)/app/_components/exam-history-table";
import { PageHeader, SectionCard } from "@/app/(main)/_components/page-shell";
import { getExamHistory } from "@/server/user-dashboard-data";

export default async function RiwayatPage() {
  const history = await getExamHistory({ page: 1, limit: 20 });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Riwayat Tryout"
        description="Daftar hasil ujian Anda beserta skor dan status kelulusan."
      />
      <SectionCard
        title="Riwayat Ujian"
        description={`Menampilkan ${history.data.length} dari ${history.meta.totalItems} riwayat.`}
      >
        <ExamHistoryTable items={history.data} />
      </SectionCard>
    </div>
  );
}
