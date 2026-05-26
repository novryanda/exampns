import { KeyRound, ShieldCheck, UserRound } from "lucide-react";

import { PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { requirePrivilegedProfile } from "@/lib/auth/server-auth";

import { ChangePasswordForm } from "./_components/change-password-form";
import { ProfileForm } from "./_components/profile-form";
import { ProfilePhotoUpload } from "./_components/profile-photo-upload";

function formatRole(role: string) {
  if (role === "SUPER_ADMIN") return "Super Admin";
  if (role === "ADMIN") return "Admin";
  return "User";
}

function formatDateTime(value: string | null) {
  if (!value) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function toStatusTone(status: string) {
  if (status === "active") return "success" as const;
  if (status === "suspended") return "danger" as const;
  return "warning" as const;
}

export default async function PrivilegedProfileRoute() {
  const profile = await requirePrivilegedProfile();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Profile"
        description="Kelola informasi akun admin dan keamanan password sesuai kebijakan autentikasi ExamCPNS."
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-1">
        <SectionCard
          title="Ringkasan akun"
          description="Data identitas dari sesi login aktif."
        >
          <dl className="space-y-4 text-sm">
            <div className="flex items-start gap-3">
              <UserRound className="mt-0.5 size-4 text-slate-400" />
              <div>
                <dt className="text-slate-500">Peran</dt>
                <dd className="font-medium text-slate-950">{formatRole(profile.role)}</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 size-4 text-slate-400" />
              <div>
                <dt className="text-slate-500">Status akun</dt>
                <dd className="mt-1">
                  <StatusBadge tone={toStatusTone(profile.status)}>{profile.status}</StatusBadge>
                </dd>
              </div>
            </div>
            <div>
              <dt className="text-slate-500">Email terverifikasi</dt>
              <dd className="mt-1 font-medium text-slate-950">
                {profile.emailVerified ? "Ya" : "Belum"}
              </dd>
            </div>
            <div>
              <dt className="text-slate-500">Login terakhir</dt>
              <dd className="font-medium text-slate-950">{formatDateTime(profile.lastLoginAt)}</dd>
            </div>
            <div>
              <dt className="text-slate-500">Terdaftar sejak</dt>
              <dd className="font-medium text-slate-950">{formatDateTime(profile.createdAt)}</dd>
            </div>
          </dl>
        </SectionCard>
        </div>

        <div className="flex flex-col gap-4 lg:col-span-2">
          <SectionCard title="Profil" description="Perbarui foto, nama, dan nomor telepon akun Anda.">
            <div className="flex flex-col gap-6">
              <ProfilePhotoUpload name={profile.name} imageUrl={profile.image} />
              <ProfileForm profile={profile} />
            </div>
          </SectionCard>

          <SectionCard
            title="Ubah password"
            description="Password baru minimal 8 karakter. Sesi lain akan dicabut setelah password diubah."
          >
            <div className="mb-4 flex items-start gap-2 rounded-2xl border border-amber-100 bg-amber-50/80 px-4 py-3 text-amber-900 text-sm">
              <KeyRound className="mt-0.5 size-4 shrink-0" />
              <p>Gunakan password yang kuat dan unik. Anda perlu memasukkan password saat ini untuk konfirmasi.</p>
            </div>
            <ChangePasswordForm />
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
