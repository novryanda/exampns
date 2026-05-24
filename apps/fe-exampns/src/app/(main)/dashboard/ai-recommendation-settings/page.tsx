import { AlertCircle, Bot, Clock3, FileWarning, ShieldCheck } from "lucide-react";

import { PageHeader, SectionCard, StatusBadge } from "@/components/examcpns-admin/ui";
import { cn } from "@/lib/utils";
import { getAiRecommendationSettings } from "@/server/admin-data";

import { AiRecommendationSettingsForm } from "./settings-form";

function formatDateTime(value: string | null) {
  if (!value) {
    return "Belum pernah diperbarui";
  }

  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default async function AiRecommendationSettingsPage() {
  const settings = await getAiRecommendationSettings();

  const summaryItems = [
    {
      label: "Status Saat Ini",
      value: settings.status === "active" ? "Active" : "Degraded",
      icon: ShieldCheck,
      tone: settings.status === "active" ? "success" : "warning",
    },
    {
      label: "Terakhir Diperbarui",
      value: formatDateTime(settings.lastUpdatedAt),
      subtext: "disimpan dari konfigurasi backend",
      icon: Clock3,
      tone: "info",
    },
    {
      label: "AI Jobs (Hari Ini)",
      value: settings.aiJobsToday.toLocaleString("id-ID"),
      subtext: `${settings.failedAiJobsToday.toLocaleString("id-ID")} job gagal hari ini`,
      icon: Bot,
      tone: "brand",
    },
    {
      label: "Success Rate (Hari Ini)",
      value: `${settings.successRateToday}%`,
      subtext: settings.n8nConnected ? "terhubung ke workflow N8N" : "N8N belum terhubung",
      icon: ShieldCheck,
      tone: settings.n8nConnected ? "success" : "warning",
    },
  ] as const;

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="AI Recommendation Settings"
        description="Kelola konfigurasi sistem rekomendasi AI setelah tryout selesai dikerjakan pengguna."
      />

      <div className="grid gap-4 2xl:grid-cols-[1.45fr_0.85fr]">
        <div className="flex flex-col gap-4">
          <SectionCard
            title="1. General Settings"
            description="Konfigurasi provider dan perilaku dasar AI recommendation."
          >
            <AiRecommendationSettingsForm settings={settings} />
          </SectionCard>

          <SectionCard
            title="2. Recommendation Logic"
            description="Aturan area lemah dan prioritas rekomendasi."
          >
            <p className="text-slate-400 text-xs">
              Rumus prioritas dan ambang kelemahan ini akan dipakai backend sebelum payload dikirim ke workflow N8N.
            </p>
          </SectionCard>

          <SectionCard
            title="3. Output Experience"
            description="Bagian hasil tryout yang ditampilkan ke pengguna dikendalikan langsung dari backend."
          >
            <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
              {[
                { label: "Summary", enabled: settings.showSummary },
                { label: "Weak Areas", enabled: settings.showWeakAreas },
                { label: "Next Tryout Strategy", enabled: settings.showNextTryoutStrategy },
                { label: "Result Page Banner", enabled: settings.enableResultPageBanner },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-100 px-4 py-4">
                  <p className="font-medium text-slate-950 text-sm">{item.label}</p>
                  <p className="mt-2 text-slate-500 text-sm">
                    {item.enabled ? "Ditampilkan ke pengguna" : "Disembunyikan dari halaman hasil"}
                  </p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="flex flex-col gap-4">
          <SectionCard title="Ringkasan Sistem AI" description="Status operasional rekomendasi AI hari ini.">
            <div className="space-y-3">
              {summaryItems.map((item) => {
                const Icon = item.icon;
                const toneClass =
                  item.tone === "success"
                    ? "bg-emerald-50 text-emerald-600"
                    : item.tone === "brand"
                      ? "bg-blue-50 text-blue-600"
                      : item.tone === "warning"
                        ? "bg-amber-50 text-amber-600"
                        : "bg-slate-100 text-slate-600";

                return (
                  <div key={item.label} className="flex items-start gap-3 rounded-2xl border border-slate-100 px-4 py-4">
                    <div className={cn("flex size-10 items-center justify-center rounded-2xl", toneClass)}>
                      <Icon className="size-5" />
                    </div>
                    <div>
                      <p className="text-slate-500 text-sm">{item.label}</p>
                      <p className="mt-1 font-medium text-slate-950">{item.value}</p>
                      {"subtext" in item && item.subtext ? <p className="mt-1 text-slate-400 text-xs">{item.subtext}</p> : null}
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard>

          <SectionCard title="Catatan Operasional" description="Batasan dan konteks penggunaan AI recommendation.">
            <div className="space-y-3 rounded-2xl border border-sky-100 bg-sky-50/70 p-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="mt-0.5 size-4 text-sky-600" />
                <p className="text-slate-600 text-sm">
                  Rekomendasi AI hanya ditampilkan setelah ujian selesai di halaman hasil tryout.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <FileWarning className="mt-0.5 size-4 text-sky-600" />
                <p className="text-slate-600 text-sm">Tidak tersedia fitur chatbot atau asisten AI percakapan.</p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Tentang Rekomendasi AI" description="Tujuan dan perilaku sistem saat ini.">
            <p className="text-slate-500 text-sm leading-6">
              Sistem AI akan menganalisis hasil ujian untuk mengidentifikasi area lemah dan memberikan rekomendasi
              strategi agar pengguna dapat meningkatkan skor di tryout berikutnya.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <StatusBadge tone={settings.status === "active" ? "success" : "warning"}>
                {settings.status === "active" ? "Active" : "Degraded"}
              </StatusBadge>
              <StatusBadge tone={settings.n8nConnected ? "brand" : "neutral"}>
                {settings.n8nConnected ? "N8N Connected" : "N8N Offline"}
              </StatusBadge>
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}
