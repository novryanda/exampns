import type { CurrentUserProfile } from "@/lib/auth/server-auth";

import { Mail, ShieldUser } from "lucide-react";

import { PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";

function getProfileCopy(role: CurrentUserProfile["role"]) {
  if (role === "SUPER_ADMIN") {
    return {
      title: "Profil",
      description: "Informasi akun super admin yang sedang aktif.",
      cardTitle: "Akun Super Admin",
      cardDescription: "Akses penuh ke konfigurasi sistem.",
    };
  }

  return {
    title: "Profil",
    description: "Informasi akun admin yang sedang aktif.",
    cardTitle: "Akun Admin",
    cardDescription: "Role admin content operations.",
  };
}

export function PrivilegedProfilePage({ profile }: { readonly profile: CurrentUserProfile }) {
  const copy = getProfileCopy(profile.role);

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title={copy.title} description={copy.description} />
      <SectionCard title={copy.cardTitle} description={copy.cardDescription}>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <ShieldUser className="size-4 text-slate-400" />
            <div>
              <p className="text-slate-500 text-sm">Nama</p>
              <p className="font-medium text-slate-950">{profile.name}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Mail className="size-4 text-slate-400" />
            <div>
              <p className="text-slate-500 text-sm">Email</p>
              <p className="font-medium text-slate-950">{profile.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <StatusBadge tone="brand">{profile.role}</StatusBadge>
            <StatusBadge tone={profile.status === "active" ? "success" : "warning"}>{profile.status}</StatusBadge>
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
