"use client";

import { Suspense } from "react";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useListFiltersUrl } from "@/hooks/use-list-filters-url";

function AdminAccountsFiltersInner() {
  const { searchInput, setSearchInput, statusFromUrl, applyFilters } =
    useListFiltersUrl("/super-admin/admin-accounts");

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative min-w-80 flex-1">
        <Search className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 size-4 text-slate-400" />
        <Input
          className="rounded-xl border-slate-200 pl-9"
          placeholder="Cari nama atau email admin..."
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          aria-label="Cari admin"
        />
      </div>
      <Select value={statusFromUrl} onValueChange={(value) => applyFilters({ status: value })}>
        <SelectTrigger className="w-44 rounded-xl border-slate-200 bg-white">
          <SelectValue placeholder="Semua Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Status</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
          <SelectItem value="suspended">Suspended</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function AdminAccountsFilters() {
  return (
    <Suspense fallback={<div className="h-10 min-w-80 animate-pulse rounded-xl bg-slate-100" />}>
      <AdminAccountsFiltersInner />
    </Suspense>
  );
}
