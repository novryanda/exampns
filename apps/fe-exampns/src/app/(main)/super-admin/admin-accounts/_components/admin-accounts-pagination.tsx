import { NumberedPagination } from "@/components/list/numbered-pagination";

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
      basePath="/super-admin/admin-accounts"
      page={page}
      totalPages={totalPages}
      totalItems={totalItems}
      filters={filters}
    />
  );
}
