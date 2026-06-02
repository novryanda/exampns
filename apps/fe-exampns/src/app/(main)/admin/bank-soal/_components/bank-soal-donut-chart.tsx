"use client";

import { useMemo } from "react";

import { Cell, Pie, PieChart } from "recharts";

import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { cn } from "@/lib/utils";

export type DonutSegment = {
  key: string;
  label: string;
  count: number;
  percentage: number;
  color: string;
};

export function BankSoalDonutChart({
  segments,
  centerLabel,
  centerValue,
  className,
}: {
  readonly segments: DonutSegment[];
  readonly centerLabel: string;
  readonly centerValue: string;
  readonly className?: string;
}) {
  const total = useMemo(() => segments.reduce((sum, item) => sum + item.count, 0), [segments]);

  const chartData = useMemo(
    () =>
      segments.map((item) => ({
        ...item,
        chartValue: item.count > 0 ? item.count : 0.0001,
      })),
    [segments],
  );

  const chartConfig = useMemo(
    () =>
      Object.fromEntries(
        chartData.map((item) => [
          item.key,
          {
            label: item.label,
            color: item.color,
          },
        ]),
      ) satisfies ChartConfig,
    [chartData],
  );

  return (
    <div className={cn("space-y-4", className)}>
      <ChartContainer className="mx-auto aspect-square h-[220px] w-full max-w-[240px]" config={chartConfig}>
        <PieChart margin={{ top: 8, right: 8, bottom: 8, left: 8 }}>
          <ChartTooltip
            cursor={false}
            content={
              <ChartTooltipContent
                hideLabel
                formatter={(value, name, item) => {
                  const payload = item.payload as DonutSegment & { fill: string };
                  return (
                    <div className="space-y-1">
                      <p className="font-medium text-slate-950">{String(name)}</p>
                      <p className="text-slate-500 text-xs">
                        {Number(value).toLocaleString("id-ID")} ({payload.percentage.toFixed(1)}%)
                      </p>
                    </div>
                  );
                }}
              />
            }
          />
          <Pie
            data={chartData}
            dataKey="chartValue"
            nameKey="label"
            innerRadius="58%"
            outerRadius="82%"
            paddingAngle={2}
            stroke="#ffffff"
            strokeWidth={2}
          >
            {chartData.map((item) => (
              <Cell key={item.key} fill={item.color} />
            ))}
          </Pie>
          <text x="50%" y="46%" textAnchor="middle" className="fill-slate-500 text-[10px]">
            {centerLabel}
          </text>
          <text x="50%" y="54%" textAnchor="middle" className="fill-slate-950 font-semibold text-[16px]">
            {centerValue}
          </text>
        </PieChart>
      </ChartContainer>

      <div className="space-y-2">
        {segments.map((item) => (
          <div key={item.key} className="flex items-center justify-between gap-3 text-sm">
            <div className="flex min-w-0 items-center gap-2">
              <span className="size-2.5 shrink-0 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="truncate text-slate-700">{item.label}</span>
            </div>
            <div className="shrink-0 text-right tabular-nums">
              <span className="font-medium text-slate-950">{item.count.toLocaleString("id-ID")}</span>
              <span className="ml-2 text-slate-500">{item.percentage.toFixed(1)}%</span>
            </div>
          </div>
        ))}
        {total === 0 ? <p className="text-center text-slate-400 text-sm">Belum ada data soal.</p> : null}
      </div>
    </div>
  );
}
