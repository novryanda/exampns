"use client";

import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, XAxis, YAxis } from "recharts";

import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { formatCurrency } from "@/lib/utils";

export function SubscribersBarChart({
  data,
}: {
  readonly data: ReadonlyArray<{ label: string; subscribers: number }>;
}) {
  return (
    <ChartContainer
      className="h-72 w-full"
      config={{
        subscribers: {
          label: "Active Subscribers",
          color: "#2563eb",
        },
      }}
    >
      <BarChart data={data} margin={{ left: 4, right: 8, top: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={10} />
        <YAxis tickLine={false} axisLine={false} width={44} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
        <Bar dataKey="subscribers" radius={[12, 12, 0, 0]} fill="var(--color-subscribers)" />
      </BarChart>
    </ChartContainer>
  );
}

export function RevenueLineChart({ data }: { readonly data: ReadonlyArray<{ label: string; revenue: number }> }) {
  return (
    <ChartContainer
      className="h-72 w-full"
      config={{
        revenue: {
          label: "Revenue (Rp)",
          color: "#2563eb",
        },
      }}
    >
      <LineChart data={data} margin={{ left: 4, right: 8, top: 12 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={10} />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={48}
          tickFormatter={(value) => `${Math.round(value / 1000000)}M`}
        />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              indicator="dot"
              formatter={(value) => (
                <span className="font-medium text-slate-950">
                  {formatCurrency(Number(value), { currency: "IDR", locale: "id-ID", noDecimals: true })}
                </span>
              )}
            />
          }
        />
        <Line
          dataKey="revenue"
          type="monotone"
          stroke="var(--color-revenue)"
          strokeWidth={3}
          dot={{ fill: "#2563eb", r: 4 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ChartContainer>
  );
}

export function DistributionDonutChart({
  data,
}: {
  readonly data: ReadonlyArray<{ name: string; value: number; fill: string }>;
}) {
  return (
    <ChartContainer
      className="aspect-auto h-72 max-h-72 w-full max-w-full min-h-0"
      config={Object.fromEntries(data.map((item) => [item.name, { label: item.name, color: item.fill }]))}
    >
      <PieChart>
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent
              hideLabel
              formatter={(value, name) => (
                <div className="flex min-w-32 items-center justify-between gap-4">
                  <span className="text-slate-500">{String(name)}</span>
                  <span className="font-medium text-slate-950">{Number(value).toLocaleString("id-ID")}</span>
                </div>
              )}
            />
          }
        />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={65}
          outerRadius={96}
          paddingAngle={2}
          strokeWidth={0}
        >
          {data.map((segment) => (
            <Cell key={segment.name} fill={segment.fill} />
          ))}
        </Pie>
        <ChartLegend verticalAlign="bottom" content={<ChartLegendContent className="flex flex-wrap gap-3 pt-4" />} />
      </PieChart>
    </ChartContainer>
  );
}

export function UsersGrowthLineChart({ data }: { readonly data: ReadonlyArray<{ label: string; users: number }> }) {
  return (
    <ChartContainer
      className="h-56 w-full"
      config={{
        users: {
          label: "Users",
          color: "#2563eb",
        },
      }}
    >
      <LineChart data={data} margin={{ left: 4, right: 8, top: 8 }}>
        <CartesianGrid vertical={false} />
        <XAxis dataKey="label" tickLine={false} axisLine={false} tickMargin={10} />
        <YAxis tickLine={false} axisLine={false} width={42} tickFormatter={(value) => `${Math.round(value / 1000)}K`} />
        <ChartTooltip cursor={false} content={<ChartTooltipContent indicator="dot" />} />
        <Line
          dataKey="users"
          type="monotone"
          stroke="var(--color-users)"
          strokeWidth={3}
          dot={{ fill: "#2563eb", r: 3.5 }}
          activeDot={{ r: 5 }}
        />
      </LineChart>
    </ChartContainer>
  );
}
