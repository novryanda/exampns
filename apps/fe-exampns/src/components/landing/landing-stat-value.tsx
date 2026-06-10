"use client";

import { NumberTicker } from "@/components/ui/number-ticker";
import { cn } from "@/lib/utils";

interface LandingStatValueProps {
  readonly value: number;
  readonly suffix?: string;
  readonly locale?: string;
  readonly delay?: number;
  readonly className?: string;
}

export function LandingStatValue({
  value,
  suffix = "",
  locale,
  delay = 0,
  className,
}: LandingStatValueProps) {
  return (
    <p className={cn("font-bold text-[#1d4ed8] text-lg leading-tight sm:text-2xl", className)}>
      <NumberTicker
        value={value}
        delay={delay}
        locale={locale}
        className="text-inherit tracking-normal tabular-nums"
      />
      {suffix}
    </p>
  );
}
