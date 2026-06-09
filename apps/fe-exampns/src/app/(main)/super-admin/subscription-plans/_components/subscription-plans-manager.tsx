"use client";

import { useMemo, useState } from "react";

import { Plus, Search } from "lucide-react";

import { SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getPaginationItems } from "@/lib/list-pagination";
import { cn, formatCurrency } from "@/lib/utils";
import type { SubscriptionPlanItem } from "@/server/admin-data";

import {
  createEmptyPlanDraft,
  planToDraft,
  SubscriptionPlanFormSheet,
  type PlanFormDraft,
} from "./subscription-plan-form-sheet";
import { SubscriptionPlanRowActions } from "./subscription-plan-row-actions";
import { SubscriptionPlansInfoBanner } from "./subscription-plans-info-banner";
import { SubscriptionPlansKpiCards } from "./subscription-plans-kpi-cards";

const PAGE_SIZE = 10;

const tierOptions = [
  { value: "all", label: "Semua Tier" },
  { value: "trial", label: "Trial" },
  { value: "standard", label: "Standard" },
  { value: "premium", label: "Premium" },
] as const;

const statusOptions = [
  { value: "all", label: "Semua Status" },
  { value: "active", label: "Aktif" },
  { value: "inactive", label: "Nonaktif" },
] as const;

function toLabel(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function toneForTier(tier: string) {
  if (tier === "premium") return "success";
  if (tier === "standard") return "brand";
  return "warning";
}

function formatDuration(days: number) {
  return `${days} hari`;
}

function formatPrice(plan: SubscriptionPlanItem) {
  if (plan.tier === "trial" || plan.price <= 0) {
    return "Gratis";
  }

  return formatCurrency(plan.price, { currency: plan.currency, locale: "id-ID", noDecimals: true });
}

export function SubscriptionPlansManager({ plans }: { readonly plans: SubscriptionPlanItem[] }) {
  const [search, setSearch] = useState("");
  const [tierFilter, setTierFilter] = useState<(typeof tierOptions)[number]["value"]>("all");
  const [statusFilter, setStatusFilter] = useState<(typeof statusOptions)[number]["value"]>("all");
  const [page, setPage] = useState(1);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [sheetMode, setSheetMode] = useState<"create" | "edit">("create");
  const [formDraft, setFormDraft] = useState<PlanFormDraft>(createEmptyPlanDraft());

  const filteredPlans = useMemo(() => {
    const query = search.trim().toLowerCase();

    return plans.filter((plan) => {
      const matchesSearch =
        !query ||
        plan.name.toLowerCase().includes(query) ||
        (plan.description ?? "").toLowerCase().includes(query);

      const matchesTier = tierFilter === "all" || plan.tier === tierFilter;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" ? plan.isActive : !plan.isActive);

      return matchesSearch && matchesTier && matchesStatus;
    });
  }, [plans, search, tierFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredPlans.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);

  const paginatedPlans = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return filteredPlans.slice(start, start + PAGE_SIZE);
  }, [filteredPlans, currentPage]);

  const rangeStart = filteredPlans.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1;
  const rangeEnd = Math.min(currentPage * PAGE_SIZE, filteredPlans.length);

  const openCreateSheet = () => {
    setSheetMode("create");
    setFormDraft(createEmptyPlanDraft());
    setSheetOpen(true);
  };

  const openEditSheet = (plan: SubscriptionPlanItem) => {
    setSheetMode("edit");
    setFormDraft(planToDraft(plan));
    setSheetOpen(true);
  };

  const openDuplicateSheet = (plan: SubscriptionPlanItem) => {
    setSheetMode("create");
    setFormDraft(planToDraft(plan, true));
    setSheetOpen(true);
  };

  const handleFilterChange = <T extends string>(setter: (value: T) => void, value: T) => {
    setter(value);
    setPage(1);
  };

  const paginationItems = getPaginationItems(currentPage, totalPages);

  return (
    <div className="flex flex-col gap-6">
      <SubscriptionPlansKpiCards plans={plans} />

      <SectionCard
        className="min-w-0"
        contentClassName="min-w-0 space-y-4"
        title="Daftar Plan"
        description="Kelola paket subscription dan hak akses pengguna dengan mudah."
      >
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-1 flex-col gap-3 sm:flex-row sm:flex-wrap">
            <div className="relative min-w-[220px] flex-1 sm:max-w-xs">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setPage(1);
                }}
                placeholder="Search plan..."
                className="rounded-xl border-slate-200 pl-9"
              />
            </div>
            <Select
              value={tierFilter}
              onValueChange={(value) =>
                handleFilterChange(setTierFilter, value as (typeof tierOptions)[number]["value"])
              }
            >
              <SelectTrigger className="w-full rounded-xl border-slate-200 bg-white sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {tierOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={statusFilter}
              onValueChange={(value) =>
                handleFilterChange(setStatusFilter, value as (typeof statusOptions)[number]["value"])
              }
            >
              <SelectTrigger className="w-full rounded-xl border-slate-200 bg-white sm:w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statusOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button className="rounded-xl bg-blue-600 hover:bg-blue-700" onClick={openCreateSheet}>
            <Plus className="size-4" />
            Buat Plan Baru
          </Button>
        </div>

        <Table className="min-w-[760px]">
          <TableHeader>
            <TableRow>
              <TableHead>Nama Plan</TableHead>
              <TableHead>Tier</TableHead>
              <TableHead>Durasi</TableHead>
              <TableHead>Harga</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedPlans.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-slate-400">
                  Tidak ada plan yang cocok dengan filter.
                </TableCell>
              </TableRow>
            ) : (
              paginatedPlans.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell className="max-w-[18rem]">
                    <div className="font-medium text-slate-950">{plan.name}</div>
                    <div className="truncate text-slate-500 text-sm">{plan.description ?? "Tanpa deskripsi"}</div>
                  </TableCell>
                  <TableCell>
                    <StatusBadge tone={toneForTier(plan.tier)}>{toLabel(plan.tier)}</StatusBadge>
                  </TableCell>
                  <TableCell className="text-slate-700">{formatDuration(plan.durationDays)}</TableCell>
                  <TableCell className="font-medium text-slate-900">{formatPrice(plan)}</TableCell>
                  <TableCell>
                    <span className="inline-flex items-center gap-2 text-sm">
                      <span
                        className={cn("size-2 rounded-full", plan.isActive ? "bg-emerald-500" : "bg-slate-300")}
                      />
                      <span className={plan.isActive ? "text-emerald-700" : "text-slate-500"}>
                        {plan.isActive ? "Aktif" : "Nonaktif"}
                      </span>
                    </span>
                  </TableCell>
                  <TableCell>
                    <SubscriptionPlanRowActions
                      plan={plan}
                      onEdit={openEditSheet}
                      onDuplicate={openDuplicateSheet}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <div className="flex flex-col gap-3 border-slate-100 border-t pt-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-slate-500 text-sm">
            {filteredPlans.length === 0
              ? "Menampilkan 0 plan"
              : `Menampilkan ${rangeStart} - ${rangeEnd} dari ${filteredPlans.length} plan`}
          </p>
          {totalPages > 1 ? (
            <Pagination className="mx-0 w-auto justify-end">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    text="Prev"
                    className={currentPage <= 1 ? "pointer-events-none opacity-50" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      if (currentPage > 1) {
                        setPage(currentPage - 1);
                      }
                    }}
                  />
                </PaginationItem>
                {paginationItems.map((item, index) =>
                  item === null ? (
                    <PaginationItem key={`ellipsis-${index}`}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={item}>
                      <PaginationLink
                        href="#"
                        isActive={item === currentPage}
                        size="icon"
                        onClick={(event) => {
                          event.preventDefault();
                          setPage(item);
                        }}
                      >
                        {item}
                      </PaginationLink>
                    </PaginationItem>
                  ),
                )}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    text="Next"
                    className={currentPage >= totalPages ? "pointer-events-none opacity-50" : undefined}
                    onClick={(event) => {
                      event.preventDefault();
                      if (currentPage < totalPages) {
                        setPage(currentPage + 1);
                      }
                    }}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          ) : null}
        </div>
      </SectionCard>

      <SubscriptionPlansInfoBanner />

      <SubscriptionPlanFormSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        draft={formDraft}
        mode={sheetMode}
      />
    </div>
  );
}
