import { getAdminTryoutDrafts } from "@/server/admin-content-data";
import { TryoutDraftsManager } from "./_components/tryout-drafts-manager";

function readParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

export default async function TryoutDraftsPage({
  searchParams,
}: {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const search = readParam(params.search);
  const status = readParam(params.status);
  const type = readParam(params.tryoutType);

  const drafts = await getAdminTryoutDrafts({
    search: search || undefined,
    status: status && status !== "all" ? status : undefined,
    tryoutType: type && type !== "all" ? type : undefined,
    limit: 20,
  });

  return (
    <TryoutDraftsManager
      initialResponse={drafts}
      initialFilters={{
        search: search || undefined,
        status: status || undefined,
        tryoutType: type || undefined,
      }}
    />
  );
}
