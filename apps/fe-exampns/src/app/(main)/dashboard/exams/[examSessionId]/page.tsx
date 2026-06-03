import { notFound, redirect } from "next/navigation";

import { PageHeader } from "@/app/(main)/_components/page-shell";
import { requireServerCurrentUserProfile } from "@/lib/auth/server-auth";
import { getExamSessionDetail } from "@/server/user-dashboard-data";

import { ExamWorkspace } from "../../_components/exam-workspace";

export default async function UserExamPage({
  params,
}: {
  readonly params: Promise<{ examSessionId: string }>;
}) {
  const profile = await requireServerCurrentUserProfile();
  if (profile.role !== "USER") {
    redirect(profile.role === "ADMIN" ? "/admin/dashboard" : "/super-admin/dashboard");
  }

  const { examSessionId } = await params;
  const detail = await getExamSessionDetail(examSessionId).catch(() => notFound());

  return (
    <main className="min-h-dvh bg-slate-50">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-4 py-8 sm:px-6 lg:px-8">
        <PageHeader
          title={"score" in detail ? "Hasil Tryout" : "Sesi Tryout Berjalan"}
          description={
            "score" in detail
              ? "Nilai tryout dan status kelulusan Anda ditampilkan di bawah."
              : "Jawaban disimpan otomatis. Pastikan koneksi stabil sampai ujian selesai."
          }
        />
        <ExamWorkspace initialDetail={detail} />
      </div>
    </main>
  );
}
