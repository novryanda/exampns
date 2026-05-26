import { Bot, Clock3, ShieldCheck, TriangleAlert } from "lucide-react";

import { MetricCard, PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { getAiRecommendationSettings } from "@/server/admin-data";

import { AiRecommendationSettingsForm } from "./_components/settings-form";

const metricIcons = [Bot, ShieldCheck, Clock3, TriangleAlert] as const;
const metricTints = ["blue", "green", "amber", "red"] as const;

export default async function SuperAdminAiRecommendationSettingsPage() {
  const settings = await getAiRecommendationSettings();

  const metrics = [
    {
      title: "Provider",
      value: settings.providerName,
      delta: "",
      deltaLabel: "engine yang sedang aktif",
      direction: "neutral" as const,
    },
    {
      title: "Status",
      value: settings.status === "active" ? "Active" : "Degraded",
      delta: "",
      deltaLabel: settings.n8nConnected ? "n8n connected" : "n8n disconnected",
      direction: "neutral" as const,
    },
    {
      title: "AI Jobs Today",
      value: settings.aiJobsToday.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: `success rate ${settings.successRateToday}%`,
      direction: "neutral" as const,
    },
    {
      title: "Failed Jobs",
      value: settings.failedAiJobsToday.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: `timeout ${settings.timeoutSeconds} detik`,
      direction: "neutral" as const,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="AI Recommendation Settings"
        description="Konfigurasi recommendation engine, observability, dan rule presentasi hasil."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric, index) => {
          const Icon = metricIcons[index];
          return (
            <MetricCard
              key={metric.title}
              title={metric.title}
              value={metric.value}
              delta={metric.delta}
              deltaLabel={metric.deltaLabel}
              direction={metric.direction}
              icon={Icon}
              tint={metricTints[index]}
            />
          );
        })}
      </div>

      <SectionCard
        title="Connection Snapshot"
        description="Status runtime singkat untuk memantau integrasi AI."
        trailing={
          <StatusBadge tone={settings.status === "active" ? "success" : "warning"}>
            {settings.status === "active" ? "Active" : "Degraded"}
          </StatusBadge>
        }
      >
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-100 px-4 py-4">
            <p className="text-slate-400 text-sm">n8n Connection</p>
            <p className="mt-1 font-medium text-slate-950">{settings.n8nConnected ? "Connected" : "Disconnected"}</p>
          </div>
          <div className="rounded-2xl border border-slate-100 px-4 py-4">
            <p className="text-slate-400 text-sm">Last Updated</p>
            <p className="mt-1 font-medium text-slate-950">
              {settings.lastUpdatedAt
                ? new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(
                    new Date(settings.lastUpdatedAt),
                  )
                : "-"}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-100 px-4 py-4">
            <p className="text-slate-400 text-sm">Weak Area Limit</p>
            <p className="mt-1 font-medium text-slate-950">{settings.maxWeakAreas}</p>
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Konfigurasi" description="Simpan perubahan untuk memperbarui perilaku recommendation engine.">
        <AiRecommendationSettingsForm settings={settings} />
      </SectionCard>
    </div>
  );
}
