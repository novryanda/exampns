import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft, BookOpenCheck, Mail, Phone, UserRound } from "lucide-react";

import { MetricCard, PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import { requirePrivilegedProfile } from "@/lib/auth/server-auth";
import { getAdminUserDetail } from "@/server/admin-data";

import { UserDetailActions } from "../_components/user-detail-actions";
import { UserDetailPhoto } from "../_components/user-detail-photo";

function formatDateTime(value: string | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "long",
    timeStyle: "short",
  }).format(new Date(value));
}

function toLabel(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function toStatusBadgeTone(status: string) {
  if (status === "active") return "success";
  if (status === "trial" || status === "inactive") return "warning";
  if (status === "suspended" || status === "expired") return "danger";
  return "neutral";
}

type UserDetailPageProps = {
  params: Promise<{ userId: string }>;
};

export default async function UserDetailPage({ params }: UserDetailPageProps) {
  const profile = await requirePrivilegedProfile();
  const isSuperAdmin = profile.role === "SUPER_ADMIN";
  const { userId } = await params;

  const user = await getAdminUserDetail(userId).catch(() => notFound());

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title={user.fullName}
        description="Detail monitoring pengguna - profil, subscription, dan ringkasan ujian."
        actions={
          <div className="flex flex-wrap items-center gap-2">
            {isSuperAdmin ? <UserDetailActions user={user} /> : null}
            <Button variant="outline" className="rounded-xl border-slate-200 bg-white" asChild>
              <Link href="/super-admin/users">
                <ArrowLeft className="mr-2 size-4" />
                Kembali ke daftar
              </Link>
            </Button>
          </div>
        }
      />

      <div className="grid gap-4 md:grid-cols-3">
        <MetricCard
          title="Total Ujian"
          value={String(user.examSummary.totalExams)}
          delta=""
          deltaLabel="ujian selesai"
          direction="neutral"
          icon={BookOpenCheck}
          tint="blue"
        />
        <MetricCard
          title="Rata-rata Skor"
          value={String(user.examSummary.averageScore)}
          delta=""
          deltaLabel="dari semua ujian"
          direction="neutral"
          icon={UserRound}
          tint="violet"
        />
        <MetricCard
          title="Ujian Terakhir"
          value={user.examSummary.lastExamAt ? "Ada" : "-"}
          delta=""
          deltaLabel={formatDateTime(user.examSummary.lastExamAt)}
          direction="neutral"
          icon={BookOpenCheck}
          tint="green"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <SectionCard title="Profil" description="Data akun pengguna">
          <div className="mb-6">
            <p className="mb-3 font-medium text-slate-700 text-sm">Foto profil</p>
            <UserDetailPhoto name={user.fullName} imageUrl={user.image} />
          </div>
          <dl className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <UserRound className="mt-0.5 size-4 text-slate-400" />
              <div>
                <dt className="text-slate-500">Nama</dt>
                <dd className="font-medium text-slate-950">{user.fullName}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 size-4 text-slate-400" />
              <div>
                <dt className="text-slate-500">Email</dt>
                <dd className="font-medium text-slate-950">{user.email}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 text-slate-400" />
              <div>
                <dt className="text-slate-500">Telepon</dt>
                <dd className="font-medium text-slate-950">{user.phone ?? "-"}</dd>
              </div>
            </div>
            <div>
              <dt className="text-slate-500">Status akun</dt>
              <dd className="mt-1">
                <StatusBadge tone={toStatusBadgeTone(user.status)}>{toLabel(user.status)}</StatusBadge>
              </dd>
            </div>
          </dl>
        </SectionCard>

        <SectionCard title="Subscription" description="Paket aktif terbaru">
          {user.subscription ? (
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Status</dt>
                <dd>
                  <StatusBadge tone={toStatusBadgeTone(user.subscription.status)}>
                    {toLabel(user.subscription.status)}
                  </StatusBadge>
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Berlaku hingga</dt>
                <dd className="font-medium text-slate-950">{formatDateTime(user.subscription.endDate)}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-slate-500">Tryout digunakan</dt>
                <dd className="font-medium text-slate-950">
                  {user.subscription.tryoutUsed} / {user.subscription.tryoutLimit}
                </dd>
              </div>
            </dl>
          ) : (
            <p className="text-slate-500 text-sm">Belum ada subscription aktif.</p>
          )}
        </SectionCard>
      </div>
    </div>
  );
}
