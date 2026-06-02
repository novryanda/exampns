import type { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

export function AccountSummaryRow({
  icon: Icon,
  iconClassName,
  label,
  children,
  hint,
}: {
  readonly icon: LucideIcon;
  readonly iconClassName: string;
  readonly label: string;
  readonly children: React.ReactNode;
  readonly hint?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <span
        className={cn(
          "mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-xl ring-1",
          iconClassName,
        )}
      >
        <Icon className="size-4" />
      </span>
      <div className="min-w-0">
        <p className="text-slate-500 text-sm">{label}</p>
        <div className="mt-1">{children}</div>
        {hint ? <p className="mt-1 text-slate-400 text-xs">{hint}</p> : null}
      </div>
    </div>
  );
}
