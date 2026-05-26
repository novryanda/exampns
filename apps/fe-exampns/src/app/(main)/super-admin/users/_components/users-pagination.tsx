import Link from "next/link";

import { Button } from "@/components/ui/button";

function buildPageHref(
  page: number,
  filters: { search?: string; status?: string; subscriptionStatus?: string },
  basePath: string,
) {
  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  if (filters.status && filters.status !== "all") params.set("status", filters.status);
  if (filters.subscriptionStatus && filters.subscriptionStatus !== "all") {
    params.set("subscriptionStatus", filters.subscriptionStatus);
  }
  if (page > 1) params.set("page", String(page));
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function UsersPagination({
  page,
  totalPages,
  filters,
  basePath = "/dashboard/users",
}: {
  readonly page: number;
  readonly totalPages: number;
  readonly filters: { search?: string; status?: string; subscriptionStatus?: string };
  readonly basePath?: string;
}) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-between border-slate-100 border-t pt-4">
      <p className="text-slate-500 text-sm">
        Halaman {page} dari {totalPages}
      </p>
      <div className="flex gap-2">
        <Button variant="outline" className="rounded-xl" disabled={page <= 1} asChild={page > 1}>
          {page > 1 ? (
            <Link href={buildPageHref(page - 1, filters, basePath)}>Sebelumnya</Link>
          ) : (
            <span>Sebelumnya</span>
          )}
        </Button>
        <Button variant="outline" className="rounded-xl" disabled={page >= totalPages} asChild={page < totalPages}>
          {page < totalPages ? (
            <Link href={buildPageHref(page + 1, filters, basePath)}>Berikutnya</Link>
          ) : (
            <span>Berikutnya</span>
          )}
        </Button>
      </div>
    </div>
  );
}
