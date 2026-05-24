"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useTransition } from "react";

import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export function UsersFilters({
  search,
  status,
  subscriptionStatus,
}: {
  readonly search: string;
  readonly status: string;
  readonly subscriptionStatus: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const applyFilters = (updates: Record<string, string | undefined>) => {
    const params = new URLSearchParams(searchParams.toString());

    for (const [key, value] of Object.entries(updates)) {
      if (!value || value === "all") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    }

    params.delete("page");

    startTransition(() => {
      const query = params.toString();
      router.push(query ? `/dashboard/users?${query}` : "/dashboard/users");
    });
  };

  return (
    <form
      className="flex flex-wrap items-center gap-2"
      onSubmit={(event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        applyFilters({
          search: String(formData.get("search") ?? "").trim() || undefined,
          status: String(formData.get("status") ?? "all"),
          subscriptionStatus: String(formData.get("subscriptionStatus") ?? "all"),
        });
      }}
    >
      <div className="relative min-w-80 flex-1">
        <Search className="-translate-y-1/2 pointer-events-none absolute top-1/2 left-3 size-4 text-slate-400" />
        <Input
          name="search"
          className="rounded-xl border-slate-200 pl-9"
          placeholder="Cari nama atau email pengguna..."
          defaultValue={search}
          disabled={isPending}
        />
      </div>
      <Select
        name="status"
        defaultValue={status || "all"}
        onValueChange={(value) => applyFilters({ status: value })}
        disabled={isPending}
      >
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
        name="subscriptionStatus"
        defaultValue={subscriptionStatus || "all"}
        onValueChange={(value) => applyFilters({ subscriptionStatus: value })}
        disabled={isPending}
      >
        <SelectTrigger className="w-52 rounded-xl border-slate-200 bg-white">
          <SelectValue placeholder="Semua Subscription" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Semua Subscription</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="trial">Trial</SelectItem>
          <SelectItem value="expired">Expired</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit" variant="outline" className="rounded-xl border-slate-200 bg-white" disabled={isPending}>
        Terapkan
      </Button>
    </form>
  );
}
