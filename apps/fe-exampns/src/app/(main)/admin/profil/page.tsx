import { Mail, ShieldUser } from "lucide-react";

import { PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { requireAdminProfile } from "@/lib/auth/server-auth";

export default async function AdminProfilePage() {
  const profile = await requireAdminProfile();

  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Profil" description="Informasi akun admin yang sedang aktif." />
      <SectionCard title="Akun Admin" description="Role admin content operations.">
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
