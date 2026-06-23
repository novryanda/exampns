"use client";

import { RotateCcw, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useListFiltersUrl } from "@/hooks/use-list-filters-url";

export function PartnerWithdrawalFilters() {
  const { applyFilters, isPending, searchInput, setSearchInput, statusFromUrl } =
    useListFiltersUrl("/super-admin/withdrawals");

  return (
    <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-[minmax(0,1fr)_180px_auto]">
      <div className="relative">
        <Search className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 size-4 text-slate-400" />
        <Input
          type="search"
          aria-label="Cari pencairan mitra"
          className="rounded-xl border-slate-200 pl-9"
          placeholder="Cari mitra, email, rekening, atau catatan..."
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
        />
      </div>

      <Select
        value={statusFromUrl}
        onValueChange={(value) => applyFilters({ status: value === "all" ? undefined : value })}
      >
        <SelectTrigger className="h-11 w-full rounded-xl border-slate-200 px-3">
          <SelectValue placeholder="Semua status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua status</SelectItem>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="approved">Approved</SelectItem>
          <SelectItem value="rejected">Rejected</SelectItem>
        </SelectContent>
      </Select>

      <Button
        type="button"
        variant="outline"
        className="h-11 rounded-xl"
        disabled={isPending}
        onClick={() => {
          setSearchInput("");
          applyFilters({ search: undefined, status: undefined });
        }}
      >
        <RotateCcw className="size-4" />
        Reset
      </Button>
    </div>
  );
}
