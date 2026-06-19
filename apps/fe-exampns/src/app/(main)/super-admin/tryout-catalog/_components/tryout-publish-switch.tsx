"use client";

import { useState, useTransition } from "react";

import { toast } from "sonner";

import { Switch } from "@/components/ui/switch";
import { setTryoutCatalogPublishStateAction } from "@/server/admin-content-actions";

export function TryoutPublishSwitch({
  tryoutId,
  initialChecked,
  disabled = false,
}: {
  readonly tryoutId: string;
  readonly initialChecked: boolean;
  readonly disabled?: boolean;
}) {
  const [checked, setChecked] = useState(initialChecked);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center justify-end gap-3">
      <span className="text-slate-500 text-xs">{checked ? "Published" : "Archived"}</span>
      <Switch
        checked={checked}
        disabled={disabled || isPending}
        onCheckedChange={(nextChecked) => {
          const previousChecked = checked;
          setChecked(nextChecked);

          startTransition(async () => {
            try {
              await setTryoutCatalogPublishStateAction(tryoutId, nextChecked);
              toast.success(nextChecked ? "Tryout dipublish." : "Tryout diarsipkan.");
            } catch (error) {
              setChecked(previousChecked);
              toast.error(error instanceof Error ? error.message : "Gagal mengubah status tryout.");
            }
          });
        }}
      />
    </div>
  );
}
