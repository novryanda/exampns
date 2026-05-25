import { cache } from "react";

import { Ban, ShieldCheck, UserRound, Users2 } from "lucide-react";

import { DistributionDonutChart } from "@/components/examcpns-admin/charts";
import { MetricCard, SectionCard } from "@/components/examcpns-admin/ui";
import { getAdminUsers } from "@/server/admin-data";

const getUsersOverviewCounts = cache(async () => {
  const [allUsers, activeUsers, trialUsers, suspendedUsers] = await Promise.all([
    getAdminUsers({ limit: 1 }),
    getAdminUsers({ status: "active", limit: 1 }),
    getAdminUsers({ subscriptionStatus: "trial", limit: 1 }),
    getAdminUsers({ status: "suspended", limit: 1 }),
  ]);

  return {
    total: allUsers.meta.totalItems,
    active: activeUsers.meta.totalItems,
    trial: trialUsers.meta.totalItems,
    suspended: suspendedUsers.meta.totalItems,
  };
});

const statIcons = [Users2, ShieldCheck, UserRound, Ban] as const;
const statTints = ["blue", "green", "violet", "red"] as const;

export async function UsersMetricsSection() {
  const counts = await getUsersOverviewCounts();

  const metrics = [
    {
      title: "Total Users",
      value: counts.total.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "akun user di platform",
      direction: "neutral" as const,
    },
    {
      title: "Active",
      value: counts.active.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "status akun aktif",
      direction: "neutral" as const,
    },
    {
      title: "Trial Users",
      value: counts.trial.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "subscription trial aktif",
      direction: "neutral" as const,
    },
    {
      title: "Suspended",
      value: counts.suspended.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "akun sedang ditangguhkan",
      direction: "neutral" as const,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {metrics.map((item, index) => {
        const Icon = statIcons[index];
        return (
          <MetricCard
            key={item.title}
            title={item.title}
            value={item.value}
            delta={item.delta}
            deltaLabel={item.deltaLabel}
            direction={item.direction}
            icon={Icon}
            tint={statTints[index]}
          />
        );
      })}
    </div>
  );
}

export async function UsersChartSection() {
  const counts = await getUsersOverviewCounts();

  const subscriptionDistribution = [
    { name: "Active", value: counts.active, fill: "#23b26d" },
    { name: "Trial", value: counts.trial, fill: "#f59e0b" },
    {
      name: "Expired / Inactive",
      value: Math.max(0, counts.total - counts.active - counts.trial - counts.suspended),
      fill: "#94a3b8",
    },
    { name: "Suspended", value: counts.suspended, fill: "#ef4444" },
  ];

  return (
    <SectionCard title="Subscription Composition" description="Distribusi status subscription user">
      <DistributionDonutChart data={subscriptionDistribution} />
    </SectionCard>
  );
}
