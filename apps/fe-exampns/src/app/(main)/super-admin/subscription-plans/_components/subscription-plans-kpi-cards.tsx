"use client";

import { CheckCircle2, CreditCard, Layers3, Sparkles } from "lucide-react";

import { MetricCard } from "@/app/(main)/_components/page-shell";
import type { SubscriptionPlanItem } from "@/server/admin-data";

function computeOverview(plans: SubscriptionPlanItem[]) {
  const trialPlans = plans.filter((plan) => plan.tier === "trial").length;
  const activePlans = plans.filter((plan) => plan.isActive).length;
  const paidPlans = plans.filter((plan) => plan.tier !== "trial").length;

  return {
    total: plans.length,
    trial: trialPlans,
    active: activePlans,
    paid: paidPlans,
  };
}

export function SubscriptionPlansKpiCards({ plans }: { readonly plans: SubscriptionPlanItem[] }) {
  const overview = computeOverview(plans);

  const cards = [
    {
      title: "Total Plan",
      value: overview.total.toLocaleString("id-ID"),
      deltaLabel: "semua paket subscription",
      icon: Layers3,
      tint: "blue" as const,
    },
    {
      title: "Trial Plan",
      value: overview.trial.toLocaleString("id-ID"),
      deltaLabel: "paket trial tersedia",
      icon: Sparkles,
      tint: "amber" as const,
    },
    {
      title: "Plan Aktif",
      value: overview.active.toLocaleString("id-ID"),
      deltaLabel: "dapat dipilih user",
      icon: CheckCircle2,
      tint: "green" as const,
    },
    {
      title: "Total Plan Berbayar",
      value: overview.paid.toLocaleString("id-ID"),
      deltaLabel: "standard & premium",
      icon: CreditCard,
      tint: "violet" as const,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((item) => (
        <MetricCard
          key={item.title}
          title={item.title}
          value={item.value}
          delta=""
          deltaLabel={item.deltaLabel}
          direction="neutral"
          icon={item.icon}
          tint={item.tint}
        />
      ))}
    </div>
  );
}
