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

      <div className="grid gap-4 2xl:grid-cols-[1.55fr_0.75fr]">
        <div className="flex flex-col gap-4">{children}</div>
        <UsersChartSection />
      </div>
    </div>
  );
}
