import { notFound, redirect } from "next/navigation";

import { ExamWorkspace } from "@/app/(main)/app/_components/exam-workspace";
import { PageHeader } from "@/app/(main)/_components/page-shell";
import { requireServerCurrentUserProfile } from "@/lib/auth/server-auth";
import { getExamSessionDetail } from "@/server/user-dashboard-data";

export default async function ExamRoomPage({
  params,
}: {
  readonly params: Promise<{ examSessionId: string }>;
}) {
  const profile = await requireServerCurrentUserProfile();
  if (profile.role !== "USER") {
    redirect(
      profile.role === "ADMIN"
        ? "/admin/dashboard"
        : profile.role === "PARTNER"
          ? "/mitra/dashboard"
          : "/super-admin/dashboard",
    );
  }

  const { examSessionId } = await params;
  const detail = await getExamSessionDetail(examSessionId).catch(() => notFound());

  if (detail.status !== "in_progress") {
    redirect(`/app/result/${detail.examResultId}`);
  }

  return (
    <div className="mx-auto flex min-h-dvh max-w-7xl flex-col gap-6 bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title="Sesi Tryout Berjalan"
        description="Jawaban disimpan otomatis. Pastikan koneksi stabil sampai ujian selesai."
      />
      <ExamWorkspace initialDetail={detail} tryoutName={detail.tryoutName} />
    </div>
  );
}
