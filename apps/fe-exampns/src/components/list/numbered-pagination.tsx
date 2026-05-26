import Link from "next/link";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { buildListPageHref, getPaginationItems } from "@/lib/list-pagination";

export function NumberedPagination({
  basePath,
  page,
  totalPages,
  totalItems,
  filters,
}: {
  readonly basePath: string;
  readonly page: number;
  readonly totalPages: number;
  readonly totalItems: number;
  readonly filters: Record<string, string | undefined>;
}) {
  if (totalPages <= 1) {
    return (
      <p className="border-slate-100 border-t pt-4 text-slate-500 text-sm">
        Menampilkan {totalItems.toLocaleString("id-ID")} data
      </p>
    );
  }

  const items = getPaginationItems(page, totalPages);

  return (
    <div className="flex flex-col gap-3 border-slate-100 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-slate-500 text-sm">
        Halaman {page} dari {totalPages} ({totalItems.toLocaleString("id-ID")} data)
      </p>
      <Pagination className="mx-0 w-auto justify-end">
        <PaginationContent>
          <PaginationItem>
            {page > 1 ? (
              <PaginationPrevious
                href={buildListPageHref(basePath, page - 1, filters)}
                text="Prev"
              />
            ) : (
              <PaginationPrevious href="#" className="pointer-events-none opacity-50" text="Prev" />
            )}
          </PaginationItem>
          {items.map((item, index) =>
            item === null ? (
              <PaginationItem key={`ellipsis-${index}`}>
                <PaginationEllipsis />
              </PaginationItem>
            ) : (
              <PaginationItem key={item}>
                <PaginationLink
                  href={buildListPageHref(basePath, item, filters)}
                  isActive={item === page}
                  size="icon"
                >
                  {item}
                </PaginationLink>
              </PaginationItem>
            ),
          )}
          <PaginationItem>
            {page < totalPages ? (
              <PaginationNext href={buildListPageHref(basePath, page + 1, filters)} text="Next" />
            ) : (
              <PaginationNext href="#" className="pointer-events-none opacity-50" text="Next" />
            )}
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
