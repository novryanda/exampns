import { cache } from "react";

import { SectionCard } from "@/components/examcpns-admin/ui";
import { getSuperAdminAccounts } from "@/server/admin-data";

const getAdminOverviewCounts = cache(async () => {
  const [allAdmins, activeAdmins, inactiveAdmins] = await Promise.all([
    getSuperAdminAccounts({ limit: 1 }),
    getSuperAdminAccounts({ status: "active", limit: 1 }),
    getSuperAdminAccounts({ status: "inactive", limit: 1 }),
  ]);

  return {
    total: allAdmins.meta.totalItems,
    active: activeAdmins.meta.totalItems,
    inactive: inactiveAdmins.meta.totalItems,
  };
});

export async function AdminAccountsMetricsSection() {
  const counts = await getAdminOverviewCounts();

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <SectionCard title="Total Admin" description="Semua akun role ADMIN">
        <p className="font-semibold text-3xl text-slate-950">
          {counts.total.toLocaleString("id-ID")}
        </p>
      </SectionCard>
      <SectionCard title="Active" description="Admin yang dapat login">
        <p className="font-semibold text-3xl text-emerald-600">
          {counts.active.toLocaleString("id-ID")}
        </p>
      </SectionCard>
      <SectionCard title="Inactive" description="Admin dinonaktifkan">
        <p className="font-semibold text-3xl text-amber-600">
          {counts.inactive.toLocaleString("id-ID")}
        </p>
      </SectionCard>
    </div>
  );
}
