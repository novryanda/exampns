import { Suspense } from "react";

import { requirePrivilegedProfile } from "@/lib/auth/server-auth";

import { UsersFilters } from "./_components/users-filters";
import { UsersTableSection } from "./_components/users-table-section";

type UsersPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

function readParam(value: string | string[] | undefined) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }
  return value ?? "";
}

export default async function UsersPage({ searchParams }: UsersPageProps) {
  const profile = await requirePrivilegedProfile();
  const isSuperAdmin = profile.role === "SUPER_ADMIN";

  const params = await searchParams;
  const search = readParam(params.search).trim();
  const status = readParam(params.status);
  const subscriptionStatus = readParam(params.subscriptionStatus);
  const page = Math.max(1, Number(readParam(params.page)) || 1);

  const listParams = {
    search: search || undefined,
    status: status && status !== "all" ? status : undefined,
    subscriptionStatus:
      subscriptionStatus && subscriptionStatus !== "all" ? subscriptionStatus : undefined,
    page,
    limit: 10,
  };

  const filterState = { search, status, subscriptionStatus };
  const tableKey = `${search}|${status}|${subscriptionStatus}|${page}`;

  return (
    <>
      <UsersFilters />
      <Suspense
        key={tableKey}
        fallback={<div className="min-h-96 animate-pulse rounded-2xl bg-slate-100" />}
      >
        <UsersTableSection
          isSuperAdmin={isSuperAdmin}
          listParams={listParams}
          filterState={filterState}
        />
      </Suspense>
    </>
  );
}
