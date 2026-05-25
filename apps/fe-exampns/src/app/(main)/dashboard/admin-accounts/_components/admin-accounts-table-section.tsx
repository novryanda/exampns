import { getSuperAdminAccounts } from "@/server/admin-data";

import { AdminAccountsTable } from "./admin-accounts-table";

export async function AdminAccountsTableSection({
  listParams,
  filterState,
}: {
  readonly listParams: {
    search?: string;
    status?: string;
    page: number;
    limit: number;
  };
  readonly filterState: { search?: string; status?: string };
}) {
  const adminsList = await getSuperAdminAccounts(listParams);

  return (
    <AdminAccountsTable
      admins={adminsList.data}
      page={adminsList.meta.page}
      totalPages={adminsList.meta.totalPages}
      totalItems={adminsList.meta.totalItems}
      filters={filterState}
    />
  );
}
