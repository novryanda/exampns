import { BookOpen, Star, TrendingUp, Users } from "lucide-react";

import { cn } from "@/lib/utils";

import { STATS } from "./content";
import { LandingStatValue } from "./landing-stat-value";

const STAT_ICONS = [Users, BookOpen, Star, TrendingUp] as const;

export function LandingStatsBar() {
  return (
    <section className="bg-white px-4 pt-6 pb-10 sm:px-6 sm:pt-10 sm:pb-14 lg:px-8 lg:pt-14">
      <div className="mx-auto max-w-6xl">
        <div
          className={cn(
            "overflow-hidden rounded-2xl border border-[#93c5fd]/80 sm:rounded-3xl",
            "bg-gradient-to-b from-[#dbeafe] via-[#bfdbfe] to-[#93c5fd]",
            "px-3 py-5 shadow-[0_4px_24px_rgba(37,99,235,0.15)] sm:px-8 sm:py-10",
          )}
        >
          <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:gap-4 lg:grid-cols-4 lg:gap-6">
            {STATS.map((stat, index) => {
              const Icon = STAT_ICONS[index];
              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 rounded-xl border border-[#e8eef5] bg-white/90 p-3 shadow-[0_4px_16px_rgba(15,23,42,0.04)] backdrop-blur-sm sm:gap-4 sm:rounded-2xl sm:p-5"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#dbeafe] sm:size-12">
                    <Icon className="size-4 text-[#1d4ed8] sm:size-5" />
                  </div>
                  <div className="min-w-0">
                    <LandingStatValue
                      value={stat.value}
                      suffix={stat.suffix}
                      locale={"locale" in stat ? stat.locale : undefined}
                      delay={index * 0.15}
                    />
                    <p className="mt-0.5 text-[#64748b] text-[11px] leading-snug sm:text-sm">
                      {stat.label}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
