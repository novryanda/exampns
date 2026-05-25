import type { ReactNode } from "react";

import { requireSuperAdminProfile } from "@/lib/auth/server-auth";

import { AdminAccountsHeader } from "./_components/admin-accounts-header";
import { AdminAccountsMetricsSection } from "./_components/admin-accounts-metrics-section";

export default async function AdminAccountsLayout({ children }: { readonly children: ReactNode }) {
  await requireSuperAdminProfile();

  return (
    <div className="flex flex-col gap-6">
      <AdminAccountsHeader />
      <AdminAccountsMetricsSection />
      {children}
    </div>
  );
}
