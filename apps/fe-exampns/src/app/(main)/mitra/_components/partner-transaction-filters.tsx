"use client";

import { useEffect, useState, useTransition } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CalendarRange, RotateCcw, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SEARCH_DEBOUNCE_MS = 300;

export function PartnerTransactionFilters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const searchFromUrl = searchParams.get("search") ?? "";
  const fromDateFromUrl = searchParams.get("fromDate") ?? "";
  const toDateFromUrl = searchParams.get("toDate") ?? "";

  const [searchInput, setSearchInput] = useState(searchFromUrl);

  useEffect(() => {
    setSearchInput(searchFromUrl);
  }, [searchFromUrl]);

  function replaceFilters(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (!value) {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }

    params.delete("page");
    const query = params.toString();
    const href = query ? `${pathname}?${query}` : pathname;

    startTransition(() => {
      router.replace(href, { scroll: false });
    });
  }

  useEffect(() => {
    const trimmed = searchInput.trim();
    if (trimmed === searchFromUrl.trim()) {
      return;
    }

    const timer = window.setTimeout(() => {
      replaceFilters({ search: trimmed || undefined });
    }, SEARCH_DEBOUNCE_MS);

    return () => window.clearTimeout(timer);
  }, [searchInput, searchFromUrl]);

  return (
    <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[minmax(0,1fr)_180px_180px_auto]">
      <div className="relative">
        <Search className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 size-4 text-slate-400" />
        <Input
          aria-label="Cari transaksi referral"
          className="rounded-xl border-slate-200 pl-9"
          placeholder="Cari invoice, user, plan, atau kode referral..."
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
      </div>
      <div className="relative">
        <CalendarRange className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 size-4 text-slate-400" />
        <Input
          type="date"
          className="rounded-xl border-slate-200 pl-9"
          value={fromDateFromUrl}
          onChange={(event) => replaceFilters({ fromDate: event.target.value || undefined })}
        />
      </div>
      <div className="relative">
        <CalendarRange className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 size-4 text-slate-400" />
        <Input
          type="date"
          className="rounded-xl border-slate-200 pl-9"
          value={toDateFromUrl}
          onChange={(event) => replaceFilters({ toDate: event.target.value || undefined })}
        />
      </div>
      <Button
        type="button"
        variant="outline"
        className="rounded-xl"
        disabled={isPending}
        onClick={() => {
          setSearchInput("");
          replaceFilters({ search: undefined, fromDate: undefined, toDate: undefined });
        }}
      >
        <RotateCcw className="size-4" />
        Reset
      </Button>
    </div>
  );
}
