export function buildListPageHref(
  basePath: string,
  page: number,
  filters: Record<string, string | undefined>,
) {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(filters)) {
    if (value && value !== "all") {
      params.set(key, value);
    }
  }

  if (page > 1) {
    params.set("page", String(page));
  }

  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

/** Returns page numbers and null for ellipsis gaps. */
export function getPaginationItems(current: number, total: number): Array<number | null> {
  if (total <= 1) {
    return [];
  }

  if (total <= 7) {
    return Array.from({ length: total }, (_, index) => index + 1);
  }

  const pages = new Set<number>([1, total, current, current - 1, current + 1]);
  const sorted = [...pages].filter((page) => page >= 1 && page <= total).sort((a, b) => a - b);
  const items: Array<number | null> = [];

  for (let index = 0; index < sorted.length; index += 1) {
    const page = sorted[index];
    const previous = sorted[index - 1];
    if (index > 0 && previous !== undefined && page - previous > 1) {
      items.push(null);
    }
    items.push(page);
  }

  return items;
}
