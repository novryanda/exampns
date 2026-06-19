import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowLeft, ArrowUpRight, Minus } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type TrendDirection = "up" | "down" | "neutral";

export function PageHeader({
  title,
  description,
  backHref,
  actions,
}: {
  readonly title: string;
  readonly description?: string;
  readonly backHref?: string;
  readonly actions?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
      <div className="space-y-1.5">
        {backHref ? (
          <Button asChild variant="outline" size="sm" className="w-fit">
            <Link href={backHref}>
              <ArrowLeft className="size-4" />
              Kembali
            </Link>
          </Button>
        ) : null}
        <h1 className="font-semibold text-3xl text-slate-950 tracking-tight">{title}</h1>
        {description ? <p className="max-w-3xl text-slate-500 text-sm">{description}</p> : null}
      </div>
      {actions ? <div className="flex flex-wrap items-center gap-2">{actions}</div> : null}
    </div>
  );
}

export function MetricCard({
  title,
  value,
  delta,
  deltaLabel,
  direction,
  icon: Icon,
  tint = "blue",
}: {
  readonly title: string;
  readonly value: string;
  readonly delta: string;
  readonly deltaLabel: string;
  readonly direction: TrendDirection;
  readonly icon: LucideIcon;
  readonly tint?: "blue" | "green" | "violet" | "amber" | "red";
}) {
  const tintClasses = {
    blue: "bg-blue-50 text-blue-600 ring-blue-100",
    green: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    violet: "bg-violet-50 text-violet-600 ring-violet-100",
    amber: "bg-amber-50 text-amber-600 ring-amber-100",
    red: "bg-rose-50 text-rose-600 ring-rose-100",
  };

  return (
    <Card className="border-slate-200/80 shadow-sm">
      <CardContent className="flex items-center gap-4 p-5">
        <div className={cn("flex size-12 items-center justify-center rounded-2xl ring-1", tintClasses[tint])}>
          <Icon className="size-5" />
        </div>
        <div className="space-y-1">
          <p className="text-slate-500 text-sm">{title}</p>
          <p className="font-semibold text-3xl text-slate-950 tracking-tight">{value}</p>
          <TrendText direction={direction} value={delta} label={deltaLabel} />
        </div>
      </CardContent>
    </Card>
  );
}

function TrendText({
  direction,
  value,
  label,
}: {
  readonly direction: TrendDirection;
  readonly value: string;
  readonly label: string;
}) {
  if (!value.trim()) {
    return <div className="text-slate-400 text-xs">{label}</div>;
  }

  const toneClass = direction === "up" ? "text-emerald-600" : direction === "down" ? "text-rose-600" : "text-slate-500";

  const Icon = direction === "up" ? ArrowUpRight : direction === "down" ? ArrowDownRight : Minus;

  return (
    <div className="flex items-center gap-1.5 text-xs">
      <span className={cn("inline-flex items-center gap-0.5 font-medium", toneClass)}>
        <Icon className="size-3.5" />
        {value}
      </span>
      <span className="text-slate-400">{label}</span>
    </div>
  );
}

export function StatusBadge({
  children,
  tone = "neutral",
  className,
}: {
  readonly children: React.ReactNode;
  readonly tone?: "success" | "warning" | "danger" | "info" | "neutral" | "brand";
  readonly className?: string;
}) {
  const tones = {
    success: "border-emerald-200 bg-emerald-50 text-emerald-700",
    warning: "border-amber-200 bg-amber-50 text-amber-700",
    danger: "border-rose-200 bg-rose-50 text-rose-700",
    info: "border-sky-200 bg-sky-50 text-sky-700",
    neutral: "border-slate-200 bg-slate-100 text-slate-700",
    brand: "border-blue-200 bg-blue-50 text-blue-700",
  };

  return (
    <Badge variant="outline" className={cn("rounded-full px-2.5 py-1 text-xs", tones[tone], className)}>
      {children}
    </Badge>
  );
}

export function SectionCard({
  title,
  description,
  icon: Icon,
  trailing,
  children,
  className,
  contentClassName,
}: {
  readonly title: string;
  readonly description?: string;
  readonly icon?: LucideIcon;
  readonly trailing?: React.ReactNode;
  readonly children: React.ReactNode;
  readonly className?: string;
  readonly contentClassName?: string;
}) {
  return (
    <Card className={cn("border-slate-200/80 shadow-sm", className)}>
      <CardHeader
        className={cn(
          "flex flex-row items-start justify-between gap-4",
          trailing ? "pb-2" : undefined,
        )}
      >
        <div className="flex min-w-0 items-start gap-3">
          {Icon ? (
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
              <Icon className="size-5" />
            </div>
          ) : null}
          <div className="min-w-0 space-y-1">
            <CardTitle className="text-slate-950 text-xl">{title}</CardTitle>
            {description ? <CardDescription>{description}</CardDescription> : null}
          </div>
        </div>
        {trailing}
      </CardHeader>
      <CardContent className={cn("min-w-0", contentClassName)}>{children}</CardContent>
    </Card>
  );
}

export function SmallActionButton({
  children,
  variant = "outline",
}: {
  readonly children: React.ReactNode;
  readonly variant?: "default" | "outline";
}) {
  return (
    <Button
      variant={variant}
      size="sm"
      className={cn(
        "rounded-xl px-4 shadow-none",
        variant === "default" ? "bg-blue-600 hover:bg-blue-700" : "border-slate-200 bg-white text-slate-700",
      )}
    >
      {children}
    </Button>
  );
}
