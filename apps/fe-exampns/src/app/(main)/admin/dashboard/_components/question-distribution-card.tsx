"use client";

import { useEffect, useMemo, useState } from "react";

import type { LucideIcon } from "lucide-react";
import { BrainCircuit, FileText, Info, PieChartIcon, UserRound } from "lucide-react";
import { Cell, Pie, PieChart } from "recharts";

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { cn } from "@/lib/utils";

const categoryMeta = {
  TWK: {
    label: "TWK",
    description: "Tes Wawasan Kebangsaan",
    color: "#2F6FED",
    badgeClassName: "border-blue-100 bg-blue-50 text-blue-600",
    cardClassName: "border-blue-100 bg-blue-50/35 shadow-[inset_4px_0_0_0_#2F6FED]",
    iconClassName: "bg-blue-50 text-blue-600 ring-blue-100",
    icon: FileText,
  },
  TIU: {
    label: "TIU",
    description: "Tes Intelegensia Umum",
    color: "#A9B4C7",
    badgeClassName: "border-slate-100 bg-slate-100 text-slate-600",
    cardClassName: "border-slate-200 bg-white shadow-[inset_4px_0_0_0_#A9B4C7]",
    iconClassName: "bg-slate-50 text-slate-500 ring-slate-100",
    icon: BrainCircuit,
  },
  TKP: {
    label: "TKP",
    description: "Tes Karakteristik Pribadi",
    color: "#22C55E",
    badgeClassName: "border-emerald-100 bg-emerald-50 text-emerald-600",
    cardClassName: "border-emerald-100 bg-emerald-50/30 shadow-[inset_4px_0_0_0_#22C55E]",
    iconClassName: "bg-emerald-50 text-emerald-600 ring-emerald-100",
    icon: UserRound,
  },
} as const;

type DistributionItem = {
  category: keyof typeof categoryMeta;
  activeCount: number;
};

type NormalizedDistributionItem = DistributionItem & {
  label: string;
  description: string;
  color: string;
  badgeClassName: string;
  cardClassName: string;
  iconClassName: string;
  icon: LucideIcon;
  percentage: number;
  chartValue: number;
};

function formatPercentage(value: number) {
  return `${value.toFixed(1)}%`;
}

function renderSliceLabel({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  payload,
}: {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  payload?: { percentage: number };
}) {
  if (
    typeof cx !== "number" ||
    typeof cy !== "number" ||
    typeof midAngle !== "number" ||
    typeof innerRadius !== "number" ||
    typeof outerRadius !== "number" ||
    !payload
  ) {
    return null;
  }

  const percentage = payload.percentage;
  const radians = Math.PI / 180;
  const isTinySlice = percentage < 2;
  const radius = isTinySlice ? outerRadius + 18 : innerRadius + (outerRadius - innerRadius) * 0.65;
  const x = cx + radius * Math.cos(-midAngle * radians);
  const y = cy + radius * Math.sin(-midAngle * radians);

  return (
    <text
      x={x}
      y={y}
      textAnchor="middle"
      dominantBaseline="central"
      className={cn(
        "font-semibold tracking-tight",
        isTinySlice ? "fill-slate-500 text-[10px]" : "fill-white text-[11px]",
      )}
    >
      {formatPercentage(percentage)}
    </text>
  );
}

function SummaryStat({
  icon: Icon,
  iconClassName,
  label,
  value,
}: {
  readonly icon: LucideIcon;
  readonly iconClassName: string;
  readonly label: string;
  readonly value: string;
}) {
  return (
    <div className="flex items-center gap-2.5 px-3 py-2.5 sm:px-4 sm:py-3">
      <div className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl ring-1", iconClassName)}>
        <Icon className="size-4" />
      </div>
      <div className="min-w-0">
        <p className="text-slate-500 text-xs">{label}</p>
        <p className="truncate font-semibold text-base text-slate-950 leading-snug tracking-tight sm:text-lg">{value}</p>
      </div>
    </div>
  );
}

export function QuestionDistributionCard({ distribution }: { readonly distribution: ReadonlyArray<DistributionItem> }) {
  const totalActiveQuestions = useMemo(
    () => distribution.reduce((sum, item) => sum + item.activeCount, 0),
    [distribution],
  );

  const normalizedData = useMemo<NormalizedDistributionItem[]>(
    () =>
      distribution.map((item) => {
        const meta = categoryMeta[item.category];
        const percentage = totalActiveQuestions > 0 ? (item.activeCount / totalActiveQuestions) * 100 : 0;

        return {
          ...item,
          ...meta,
          percentage,
          chartValue: item.activeCount > 0 ? item.activeCount : 0.0001,
        };
      }),
    [distribution, totalActiveQuestions],
  );

  const chartConfig = useMemo(
    () =>
      Object.fromEntries(
        normalizedData.map((item) => [
          item.category,
          {
            label: item.label,
            color: item.color,
          },
        ]),
      ) satisfies ChartConfig,
    [normalizedData],
  );

  const initialActiveCategory = useMemo(
    () =>
      normalizedData.reduce<keyof typeof categoryMeta>((selected, current) => {
        const selectedValue = normalizedData.find((item) => item.category === selected)?.activeCount ?? -1;
        return current.activeCount > selectedValue ? current.category : selected;
      }, normalizedData[0]?.category ?? "TWK"),
    [normalizedData],
  );
  const [activeCategory, setActiveCategory] = useState<keyof typeof categoryMeta>(initialActiveCategory);

  useEffect(() => {
    if (!normalizedData.some((item) => item.category === activeCategory)) {
      setActiveCategory(initialActiveCategory);
    }
  }, [activeCategory, initialActiveCategory, normalizedData]);

  const activeCategoriesCount = normalizedData.filter((item) => item.activeCount > 0).length;
  const topCategory = normalizedData.reduce(
    (selected, current) => (current.percentage > selected.percentage ? current : selected),
    normalizedData[0],
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] xl:gap-5 xl:items-start">
        <div className="rounded-2xl border border-slate-100 bg-[radial-gradient(circle_at_top,rgba(47,111,237,0.08),transparent_44%),linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] p-4 shadow-[0_24px_70px_-52px_rgba(37,99,235,0.38)]">
          <div className="rounded-xl border border-slate-100 bg-[linear-gradient(180deg,rgba(255,255,255,0.86)_0%,rgba(244,248,255,0.94)_100%)] px-4 py-5 sm:px-6 sm:py-6">
            <ChartContainer className="mx-auto aspect-square h-[220px] w-full max-w-[240px] sm:h-[250px] sm:max-w-[270px]" config={chartConfig}>
              <PieChart margin={{ top: 12, right: 12, bottom: 12, left: 12 }}>
                <ChartTooltip
                  cursor={false}
                  content={
                    <ChartTooltipContent
                      hideLabel
                      className="rounded-[22px] border-slate-200 bg-white px-4 py-3 shadow-[0_24px_60px_-35px_rgba(15,23,42,0.28)]"
                      formatter={(value, name, item) => {
                        const payload = item.payload as {
                          description: string;
                          percentage: number;
                          fill: string;
                        };

                        return (
                          <div className="min-w-56 space-y-3">
                            <div className="flex items-start gap-3">
                              <span className="mt-1 size-4 rounded-full" style={{ backgroundColor: payload.fill }} />
                              <div className="min-w-0">
                                <p className="font-semibold text-slate-950 text-xl leading-none">{String(name)}</p>
                                <p className="mt-1.5 text-slate-500 text-sm">{payload.description}</p>
                              </div>
                            </div>
                            <div className="grid gap-2 border-slate-100 border-t pt-3 text-sm">
                              <div className="flex items-center justify-between gap-4">
                                <span className="text-slate-500">Jumlah Soal</span>
                                <span className="font-semibold text-slate-950">
                                  {Number(value).toLocaleString("id-ID")}
                                </span>
                              </div>
                              <div className="flex items-center justify-between gap-4">
                                <span className="text-slate-500">Persentase</span>
                                <span className="font-semibold text-slate-950">
                                  {formatPercentage(payload.percentage)}
                                </span>
                              </div>
                            </div>
                          </div>
                        );
                      }}
                    />
                  }
                />
                <Pie
                  data={normalizedData}
                  dataKey="chartValue"
                  nameKey="label"
                  innerRadius="48%"
                  outerRadius="78%"
                  cornerRadius={6}
                  paddingAngle={3}
                  stroke="#ffffff"
                  strokeWidth={2}
                  labelLine={false}
                  label={renderSliceLabel}
                  onMouseEnter={(_, index) => {
                    const hovered = normalizedData[index];
                    if (hovered) {
                      setActiveCategory(hovered.category);
                    }
                  }}
                >
                  {normalizedData.map((item) => (
                    <Cell
                      key={item.category}
                      fill={item.color}
                      stroke={item.category === activeCategory ? "#ffffff" : item.color}
                      strokeWidth={item.category === activeCategory ? 4 : 2}
                      fillOpacity={item.category === activeCategory ? 1 : 0.96}
                      style={{
                        filter:
                          item.category === activeCategory
                            ? "drop-shadow(0 10px 22px rgba(47,111,237,0.16))"
                            : "drop-shadow(0 5px 12px rgba(15,23,42,0.07))",
                      }}
                    />
                  ))}
                </Pie>
                <circle cx="50%" cy="50%" r="38%" fill="white" stroke="#E2E8F0" strokeWidth="1.5" />
                <text
                  x="50%"
                  y="44%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-slate-500 text-[10px]"
                >
                  Total Soal Aktif
                </text>
                <text
                  x="50%"
                  y="52%"
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="fill-slate-950 font-semibold text-[18px]"
                >
                  {totalActiveQuestions.toLocaleString("id-ID")}
                </text>
                <line
                  x1="47%"
                  x2="53%"
                  y1="58%"
                  y2="58%"
                  stroke="#2F6FED"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </PieChart>
            </ChartContainer>
          </div>
        </div>

        <div className="space-y-2">
          <div className="grid grid-cols-[minmax(0,1fr)_72px_80px] items-center gap-2 px-1 text-slate-500 text-xs sm:grid-cols-[minmax(0,1fr)_88px_96px] sm:gap-3">
            <span>Kategori</span>
            <span className="text-center">Jumlah Soal</span>
            <span className="text-center">Persentase</span>
          </div>

          <div className="space-y-2">
            {normalizedData.map((item) => {
              const Icon = item.icon;
              const isActive = item.category === activeCategory;

              return (
                <button
                  key={item.category}
                  type="button"
                  onMouseEnter={() => setActiveCategory(item.category)}
                  onFocus={() => setActiveCategory(item.category)}
                  className={cn(
                    "grid w-full grid-cols-[minmax(0,1fr)_72px_80px] items-center gap-2 rounded-2xl border px-3 py-2.5 text-left transition sm:grid-cols-[minmax(0,1fr)_88px_96px] sm:gap-3 sm:px-3.5 sm:py-3",
                    item.cardClassName,
                    isActive && "shadow-[0_12px_28px_-24px_rgba(15,23,42,0.32)]",
                  )}
                >
                  <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
                    <div
                      className={cn(
                        "flex size-10 shrink-0 items-center justify-center rounded-xl ring-1 sm:size-11",
                        item.iconClassName,
                      )}
                    >
                      <Icon className="size-4 sm:size-[18px]" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-950 text-sm leading-none">{item.label}</p>
                      <p className="mt-1 truncate text-slate-500 text-xs leading-snug">{item.description}</p>
                    </div>
                  </div>
                  <div className="text-center">
                    <span className="font-semibold text-slate-950 text-sm tabular-nums sm:text-base">
                      {item.activeCount.toLocaleString("id-ID")}
                    </span>
                  </div>
                  <div className="flex justify-center">
                    <span
                      className={cn(
                        "inline-flex min-w-[68px] items-center justify-center rounded-lg border px-2 py-1 font-semibold text-xs tabular-nums sm:min-w-[76px] sm:px-2.5 sm:py-1 sm:text-sm",
                        item.badgeClassName,
                      )}
                    >
                      {formatPercentage(item.percentage)}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-100 bg-[linear-gradient(180deg,#ffffff_0%,#f8fbff_100%)] shadow-[0_18px_54px_-46px_rgba(37,99,235,0.28)]">
        <div className="grid divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <SummaryStat
            icon={FileText}
            iconClassName="bg-blue-50 text-blue-600 ring-blue-100"
            label="Total Soal Aktif"
            value={totalActiveQuestions.toLocaleString("id-ID")}
          />
          <SummaryStat
            icon={UserRound}
            iconClassName="bg-emerald-50 text-emerald-600 ring-emerald-100"
            label="Kategori Aktif"
            value={`${activeCategoriesCount} dari ${normalizedData.length}`}
          />
          <SummaryStat
            icon={PieChartIcon}
            iconClassName="bg-violet-50 text-violet-600 ring-violet-100"
            label="Persentase Terbesar"
            value={`${topCategory.label} (${formatPercentage(topCategory.percentage)})`}
          />
        </div>
      </div>

      <div className="border-slate-200 border-t pt-3">
        <div className="flex items-center justify-center gap-1.5 text-slate-500 text-xs">
          <Info className="size-4" />
          <span>Data dihitung dari soal yang berstatus aktif.</span>
        </div>
      </div>
    </div>
  );
}
