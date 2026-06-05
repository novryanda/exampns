import { CalendarDays, Clock3, KeyRound, Lock, MailCheck, ShieldCheck, UserRound } from "lucide-react";

import { PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { AccountSummaryRow } from "@/app/(main)/(privileged)/profil/_components/account-summary-row";
import { ChangePasswordForm } from "@/app/(main)/(privileged)/profil/_components/change-password-form";
import { ProfileForm } from "@/app/(main)/(privileged)/profil/_components/profile-form";
import { ProfilePhotoUpload } from "@/app/(main)/(privileged)/profil/_components/profile-photo-upload";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { requireServerCurrentUserProfile } from "@/lib/auth/server-auth";
import { getInitials } from "@/lib/utils";

function formatDateTime(value: string | null) {
  if (!value) return "-";

  const date = new Date(value);
  const datePart = new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
  const timePart = new Intl.DateTimeFormat("id-ID", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  })
    .format(date)
    .replace(":", ".");

  return `${datePart}, ${timePart}`;
}

function toStatusTone(status: string) {
  if (status === "active") return "success" as const;
  if (status === "suspended") return "danger" as const;
  return "warning" as const;
}

export default async function UserProfilePage() {
  const profile = await requireServerCurrentUserProfile();
  const statusText =
    profile.status === "active" ? "Active" : profile.status === "suspended" ? "Suspended" : "Pending";

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Profil" description="Kelola informasi akun peserta dan keamanan password Anda." />

      <div className="grid gap-4 xl:grid-cols-12">
        <div className="xl:col-span-4">
          <SectionCard
            icon={UserRound}
            title="Ringkasan akun"
            description="Data identitas dari sesi login aktif."
            className="h-full"
          >
            <div className="space-y-6">
              <div className="rounded-2xl border border-slate-100 bg-linear-to-b from-blue-50/80 to-slate-50/50 px-4 py-6 text-center">
                <div className="relative mx-auto mb-4 w-fit">
                  <Avatar className="size-24 bg-blue-100 ring-4 ring-white">
                    <AvatarImage src={profile.image ?? undefined} alt={profile.name} className="object-cover" />
                    <AvatarFallback className="bg-blue-100 text-2xl text-blue-700">
                      {getInitials(profile.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="absolute right-0 bottom-0 flex size-7 items-center justify-center rounded-full border-2 border-white bg-emerald-500 text-white">
                    <ShieldCheck className="size-4" />
                  </span>
                </div>
                <p className="font-semibold text-lg text-slate-950">{profile.name}</p>
                <StatusBadge tone="brand" className="mt-2 gap-1 px-3">
                  <UserRound className="size-3" />
                  Peserta
                </StatusBadge>
              </div>

              <div className="border-t border-slate-100 pt-1">
                <dl className="space-y-5">
                  <AccountSummaryRow
                    icon={ShieldCheck}
                    iconClassName="bg-emerald-50 text-emerald-600 ring-emerald-100"
                    label="Status akun"
                    hint="Status akun peserta Anda."
                  >
                    <StatusBadge tone={toStatusTone(profile.status)}>{statusText}</StatusBadge>
                  </AccountSummaryRow>

                  <AccountSummaryRow
                    icon={MailCheck}
                    iconClassName="bg-blue-50 text-blue-600 ring-blue-100"
                    label="Email terverifikasi"
                    hint={profile.emailVerified ? "Ya, email telah diverifikasi." : "Email belum diverifikasi."}
                  >
                    <StatusBadge tone={profile.emailVerified ? "success" : "warning"}>
                      {profile.emailVerified ? "Terverifikasi" : "Belum verifikasi"}
                    </StatusBadge>
                  </AccountSummaryRow>

                  <AccountSummaryRow
                    icon={Clock3}
                    iconClassName="bg-indigo-50 text-indigo-600 ring-indigo-100"
                    label="Login terakhir"
                    hint="Waktu saat terakhir Anda masuk."
                  >
                    <p className="font-medium text-slate-950 text-sm">{formatDateTime(profile.lastLoginAt)}</p>
                  </AccountSummaryRow>

                  <AccountSummaryRow
                    icon={CalendarDays}
                    iconClassName="bg-amber-50 text-amber-600 ring-amber-100"
                    label="Terdaftar sejak"
                    hint="Tanggal pembuatan akun."
                  >
                    <p className="font-medium text-slate-950 text-sm">{formatDateTime(profile.createdAt)}</p>
                  </AccountSummaryRow>
                </dl>
              </div>
            </div>
          </SectionCard>
        </div>

        <div className="flex flex-col gap-4 xl:col-span-8">
          <SectionCard
            icon={UserRound}
            title="Informasi Profil"
            description="Perbarui foto, nama, dan nomor telepon akun Anda."
          >
            <div className="flex flex-col gap-6">
              <ProfilePhotoUpload name={profile.name} imageUrl={profile.image} />
              <ProfileForm profile={profile} />
            </div>
          </SectionCard>

          <SectionCard
            icon={Lock}
            title="Keamanan Password"
            description="Password baru minimal 8 karakter. Sesi lain akan dicabut setelah password diubah."
          >
            <div className="mb-5 flex items-start gap-2.5 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-amber-900 text-sm">
              <KeyRound className="mt-0.5 size-4 shrink-0 text-amber-600" />
              <p>
                Gunakan password yang kuat dan unik. Anda perlu memasukkan password saat ini untuk konfirmasi.
              </p>
            </div>
            <ChangePasswordForm />
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
