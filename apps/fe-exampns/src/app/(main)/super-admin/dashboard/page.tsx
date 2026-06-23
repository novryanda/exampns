import Link from "next/link";

import { BookCopy, BookOpen, Bot, Settings2, ShieldUser, Users, WalletCards } from "lucide-react";

import { MetricCard, PageHeader, SectionCard } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import {
  getAdminUsers,
  getAiRecommendationSettings,
  getSuperAdminAccounts,
  getTryoutCatalogs,
} from "@/server/admin-data";

const metricIcons = [Users, ShieldUser, BookCopy, Bot] as const;
const metricTints = ["blue", "green", "violet", "amber"] as const;

export default async function SuperAdminDashboardPage() {
  const [users, admins, tryouts, aiSettings] = await Promise.all([
    getAdminUsers({ limit: 1 }),
    getSuperAdminAccounts({ limit: 1 }),
    getTryoutCatalogs({ limit: 1 }),
    getAiRecommendationSettings(),
  ]);

  const metrics = [
    {
      title: "Users",
      value: users.meta.totalItems.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "akun user di platform",
      direction: "neutral" as const,
    },
    {
      title: "Admin Accounts",
      value: admins.meta.totalItems.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "akun admin aktif dan nonaktif",
      direction: "neutral" as const,
    },
    {
      title: "Tryout Catalog",
      value: tryouts.meta.totalItems.toLocaleString("id-ID"),
      delta: "",
      deltaLabel: "draft, published, archived",
      direction: "neutral" as const,
    },
    {
      title: "AI Status",
      value: aiSettings.status === "active" ? "Active" : "Degraded",
      delta: "",
      deltaLabel: aiSettings.providerName,
      direction: "neutral" as const,
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Super Admin Dashboard"
        description="Akses utama untuk monitoring platform, katalog tryout, akun admin, dan konfigurasi sistem."
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

      <SectionCard title="Quick Access" description="Shortcut ke area super admin yang paling sering dipakai.">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            {
              title: "Users",
              href: "/super-admin/users",
              icon: Users,
              description: "Kelola akun user platform",
            },
            {
              title: "Admin Accounts",
              href: "/super-admin/admin-accounts",
              icon: ShieldUser,
              description: "Buat atau nonaktifkan admin",
            },
            {
              title: "Tryout Catalog",
              href: "/super-admin/tryout-catalog",
              icon: BookCopy,
              description: "Pantau katalog tryout",
            },
            {
              title: "Materi Pembelajaran",
              href: "/super-admin/materi",
              icon: BookOpen,
              description: "Pantau materi dan modul",
            },
            {
              title: "Question Categories",
              href: "/super-admin/question-categories",
              icon: Settings2,
              description: "Atur kategori global dan mode penilaian",
            },
            {
              title: "AI Settings",
              href: "/super-admin/ai-recommendation-settings",
              icon: WalletCards,
              description: "Atur recommendation engine",
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.href} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Icon className="size-5" />
                </div>
                <h3 className="font-semibold text-slate-950">{item.title}</h3>
                <p className="mt-2 text-slate-500 text-sm">{item.description}</p>
                <Button asChild className="mt-4 rounded-xl bg-blue-600 hover:bg-blue-700">
                  <Link href={item.href}>Buka</Link>
                </Button>
              </div>
            );
          })}
        </div>
      </SectionCard>
    </div>
  );
}
