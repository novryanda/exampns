import { requireSuperAdminProfile } from "@/lib/auth/server-auth";
import { getSuperAdminAccounts } from "@/server/admin-data";

import { AdminAccountsPanel } from "./_components/admin-accounts-panel";

export default async function AdminAccountsPage() {
  await requireSuperAdminProfile();
  const admins = await getSuperAdminAccounts();

  return <AdminAccountsPanel admins={admins} />;
}
