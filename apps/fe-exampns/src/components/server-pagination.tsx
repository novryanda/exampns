"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { cn } from "@/lib/utils";

function buildPageHref(
  basePath: string,
  params: Record<string, string | undefined>,
  pageParam: string,
  page: number,
) {
  const searchParams = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (!value) {
      continue;
    }

    if (key === pageParam) {
      continue;
    }

    searchParams.set(key, value);
  }

  if (page > 1) {
    searchParams.set(pageParam, String(page));
  }

  const query = searchParams.toString();
  return query ? `${basePath}?${query}` : basePath;
}

function buildPageItems(page: number, totalPages: number) {
  const pages = new Set<number>([1, totalPages, page - 1, page, page + 1]);
  const filtered = [...pages].filter((item) => item >= 1 && item <= totalPages).sort((left, right) => left - right);

  const items: Array<number | "ellipsis"> = [];

  for (const current of filtered) {
    const previous = items[items.length - 1];

    if (typeof previous === "number" && current - previous > 1) {
      items.push("ellipsis");
    }

    items.push(current);
  }

  return items;
}

export function ServerPagination({
  page,
  totalPages,
  params,
  pageParam = "page",
  basePath,
  onPageChange,
  showPageSummary = true,
  className,
}: {
  readonly page: number;
  readonly totalPages: number;
  readonly params: Record<string, string | undefined>;
  readonly pageParam?: string;
  readonly basePath: string;
  readonly onPageChange?: (page: number) => void;
  readonly showPageSummary?: boolean;
  readonly className?: string;
}) {
  if (totalPages <= 1) {
    return null;
  }

  const items = buildPageItems(page, totalPages);
  const previousHref = buildPageHref(basePath, params, pageParam, page - 1);
  const nextHref = buildPageHref(basePath, params, pageParam, page + 1);
  const handlePageClick = (event: React.MouseEvent, nextPage: number) => {
    if (!onPageChange || nextPage < 1 || nextPage > totalPages || nextPage === page) {
      return;
    }

    event.preventDefault();
    onPageChange(nextPage);
  };

  return (
    <div
      className={cn(
        "flex flex-col gap-3 border-slate-100 border-t pt-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      {showPageSummary ? (
        <p className="text-sm text-slate-500">
          Halaman {page} dari {totalPages}
        </p>
      ) : (
        <div className="hidden sm:block" />
      )}
      <Pagination className="mx-0 w-auto justify-start sm:justify-end">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href={page > 1 ? previousHref : "#"}
              text="Sebelumnya"
              className={page <= 1 ? "pointer-events-none opacity-50" : undefined}
              onClick={(event) => handlePageClick(event, page - 1)}
            />
          </PaginationItem>

          {items.map((item, index) => (
            <PaginationItem key={`${item}-${index}`}>
              {item === "ellipsis" ? (
                <PaginationEllipsis />
              ) : (
                <PaginationLink
                  href={buildPageHref(basePath, params, pageParam, item)}
                  isActive={item === page}
                  onClick={(event) => handlePageClick(event, item)}
                >
                  {item}
                </PaginationLink>
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href={page < totalPages ? nextHref : "#"}
              text="Berikutnya"
              className={page >= totalPages ? "pointer-events-none opacity-50" : undefined}
              onClick={(event) => handlePageClick(event, page + 1)}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
