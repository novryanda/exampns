import { NumberedPagination } from "@/components/examcpns-admin/numbered-pagination";

export function AdminAccountsPagination({
  page,
  totalPages,
  totalItems,
  filters,
}: {
  readonly page: number;
  readonly totalPages: number;
  readonly totalItems: number;
  readonly filters: { search?: string; status?: string };
}) {
  return (
    <NumberedPagination
      basePath="/dashboard/admin-accounts"
      page={page}
      totalPages={totalPages}
      totalItems={totalItems}
      filters={filters}
    />
  );
}
