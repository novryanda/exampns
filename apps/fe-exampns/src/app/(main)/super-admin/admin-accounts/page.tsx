import { Suspense } from "react";

import { AdminAccountsFilters } from "./_components/admin-accounts-filters";
import { AdminAccountsTableSection } from "./_components/admin-accounts-table-section";

type AdminAccountsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function readParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }
  return value ?? "";
}

export default async function AdminAccountsPage({ searchParams }: AdminAccountsPageProps) {
  const params = await searchParams;
  const search = readParam(params.search).trim();
  const status = readParam(params.status);
  const page = Math.max(1, Number(readParam(params.page)) || 1);

  const listParams = {
    search: search || undefined,
    status: status && status !== "all" ? status : undefined,
    page,
    limit: 20,
  };

  const filterState = { search, status };
  const tableKey = `${search}|${status}|${page}`;

  return (
    <>
      <AdminAccountsFilters />
      <Suspense
        key={tableKey}
        fallback={<div className="min-h-96 animate-pulse rounded-2xl bg-slate-100" />}
      >
        <AdminAccountsTableSection listParams={listParams} filterState={filterState} />
      </Suspense>
    </>
  );
}
