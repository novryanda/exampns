"use client";

import { Suspense } from "react";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useListFiltersUrl } from "@/hooks/use-list-filters-url";

function UsersFiltersInner() {
  const {
    searchInput,
    setSearchInput,
    statusFromUrl,
    subscriptionStatusFromUrl,
    applyFilters,
  } = useListFiltersUrl("/super-admin/users");

  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="relative min-w-0 w-full flex-1 sm:min-w-[12rem]">
        <Search className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 size-4 text-slate-400" />
        <Input
          className="rounded-xl border-slate-200 pl-9"
          placeholder="Cari nama atau email pengguna..."
          value={searchInput}
          onChange={(event) => setSearchInput(event.target.value)}
          aria-label="Cari pengguna"
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
      <Select
        value={subscriptionStatusFromUrl}
        onValueChange={(value) => applyFilters({ subscriptionStatus: value })}
      >
        <SelectTrigger className="w-52 rounded-xl border-slate-200 bg-white">
          <SelectValue placeholder="Semua Subscription" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Subscription</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="trial">Trial</SelectItem>
          <SelectItem value="standard">Standard</SelectItem>
          <SelectItem value="premium">Premium</SelectItem>
          <SelectItem value="expired">Expired</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}

export function UsersFilters() {
  return (
    <Suspense fallback={<div className="h-10 min-w-80 animate-pulse rounded-xl bg-slate-100" />}>
      <UsersFiltersInner />
    </Suspense>
  );
}
