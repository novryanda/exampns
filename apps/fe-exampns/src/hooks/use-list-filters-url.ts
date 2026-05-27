"use client";

import { useCallback, useEffect, useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const SEARCH_DEBOUNCE_MS = 300;

export function useListFiltersUrl(basePath: string) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const searchFromUrl = searchParams.get("search") ?? "";
  const statusFromUrl = searchParams.get("status") ?? "all";
  const subscriptionStatusFromUrl = searchParams.get("subscriptionStatus") ?? "all";

  const [searchInput, setSearchInput] = useState(searchFromUrl);

  useEffect(() => {
    const active = document.activeElement;
    if (active instanceof HTMLInputElement && active.type === "search") {
      return;
    }
    if (active instanceof HTMLInputElement && active.getAttribute("aria-label")?.includes("Cari")) {
      return;
    }
    setSearchInput(searchFromUrl);
  }, [searchFromUrl]);

  const applyFilters = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());

      for (const [key, value] of Object.entries(updates)) {
        if (!value || value === "all") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }

      params.delete("page");

      const query = params.toString();
      const href = query ? `${basePath}?${query}` : basePath;

      startTransition(() => {
        router.replace(href, { scroll: false });
      });
    },
    [basePath, router, searchParams],
  );

  useEffect(() => {
    const trimmed = searchInput.trim();
    if (trimmed === searchFromUrl.trim()) {
      return;
    }

    const timer = window.setTimeout(() => {
      applyFilters({ search: trimmed || undefined });
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [searchInput, searchFromUrl, applyFilters]);

  return {
    isPending,
    searchInput,
    setSearchInput,
    statusFromUrl,
    subscriptionStatusFromUrl,
    applyFilters,
  };
}
