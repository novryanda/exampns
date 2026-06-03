import type { ReactNode } from "react";

import { requirePrivilegedProfile } from "@/lib/auth/server-auth";

import { UsersChartSection, UsersMetricsSection } from "./_components/users-overview-section";
import { UsersManagementHeader } from "./_components/users-management-header";

export default async function UsersListLayout({ children }: { readonly children: ReactNode }) {
  const profile = await requirePrivilegedProfile();
  const isSuperAdmin = profile.role === "SUPER_ADMIN";

  return (
    <div className="flex flex-col gap-6">
      <UsersManagementHeader isSuperAdmin={isSuperAdmin} />
      <UsersMetricsSection />

      <div className="grid gap-4 xl:grid-cols-1 2xl:grid-cols-[minmax(0,1fr)_min(100%,320px)] 2xl:items-start">
        <div className="flex min-w-0 flex-col gap-4">{children}</div>
        <div className="min-w-0 2xl:sticky 2xl:top-20">
          <UsersChartSection />
        </div>
      </div>
    </div>
  );
}
