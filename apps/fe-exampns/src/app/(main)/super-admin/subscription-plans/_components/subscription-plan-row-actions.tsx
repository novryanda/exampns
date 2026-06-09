"use client";

import { Copy, MoreHorizontal, Pencil } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { SubscriptionPlanItem } from "@/server/admin-data";

export function SubscriptionPlanRowActions({
  plan,
  onEdit,
  onDuplicate,
}: {
  readonly plan: SubscriptionPlanItem;
  readonly onEdit: (plan: SubscriptionPlanItem) => void;
  readonly onDuplicate: (plan: SubscriptionPlanItem) => void;
}) {
  return (
    <div className="flex justify-end gap-1">
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="size-8 rounded-lg text-slate-500 hover:text-slate-900"
        onClick={() => onEdit(plan)}
        aria-label={`Edit ${plan.name}`}
        title="Edit plan"
      >
        <Pencil className="size-4" />
      </Button>
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="size-8 rounded-lg text-slate-500 hover:text-slate-900"
        onClick={() => onDuplicate(plan)}
        aria-label={`Duplikat ${plan.name}`}
        title="Duplikat plan"
      >
        <Copy className="size-4" />
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="size-8 rounded-lg text-slate-500 hover:text-slate-900"
            aria-label={`Aksi lainnya untuk ${plan.name}`}
            title="Aksi lainnya"
          >
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-44">
          <DropdownMenuItem onClick={() => onEdit(plan)}>Edit plan</DropdownMenuItem>
          <DropdownMenuItem onClick={() => onDuplicate(plan)}>Duplikat plan</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
