import { BookOpen, Star, TrendingUp, Users } from "lucide-react";

import { cn } from "@/lib/utils";

import { STATS } from "./content";

const STAT_ICONS = [Users, BookOpen, Star, TrendingUp] as const;

export function LandingStatsBar() {
  return (
    <section className="bg-white px-4 pb-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div
          className={cn(
            "overflow-hidden rounded-3xl border border-[#bfdbfe]/60",
            "bg-gradient-to-b from-[#eef6ff] via-[#e8f2ff] to-[#dbeafe]",
            "px-4 py-6 shadow-[0_4px_24px_rgba(59,130,246,0.08)] sm:px-6 sm:py-8",
          )}
        >
          <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
            {STATS.map((stat, index) => {
              const Icon = STAT_ICONS[index];
              return (
                <div
                  key={stat.label}
                  className="flex items-center gap-3 rounded-2xl border border-[#e8eef5] bg-white/90 p-4 shadow-[0_4px_16px_rgba(15,23,42,0.04)] backdrop-blur-sm sm:gap-4 sm:p-5"
                >
                  <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#dbeafe] sm:size-12">
                    <Icon className="size-5 text-[#1d4ed8]" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-bold text-[#1d4ed8] text-xl leading-tight sm:text-2xl">
                      {stat.value}
                    </p>
                    <p className="mt-0.5 text-[#64748b] text-xs leading-snug sm:text-sm">
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
