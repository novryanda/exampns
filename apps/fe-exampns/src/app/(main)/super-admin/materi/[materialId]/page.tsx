import { notFound } from "next/navigation";
import { BookOpen, FileOutput, FileText, HelpCircle, Video } from "lucide-react";

import { PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { getSuperAdminLearningMaterialDetail } from "@/server/admin-content-data";

interface LearningMaterialModuleSummary {
  id: string;
  title: string;
  moduleType: string;
  durationMinutes: number | null;
}

function formatDate(value: string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
  }).format(new Date(value));
}

function getModuleIcon(type: string) {
  switch (type) {
    case "video":
      return Video;
    case "pdf":
      return FileOutput;
    case "quiz":
      return HelpCircle;
    default:
      return FileText;
  }
}

function statusTone(status: string) {
  if (status === "published") return "success" as const;
  if (status === "archived") return "warning" as const;
  return "neutral" as const;
}

export default async function SuperAdminMateriDetailPage({
  params,
}: {
  readonly params: Promise<{ materialId: string }>;
}) {
  const { materialId } = await params;

  let material;
  try {
    material = await getSuperAdminLearningMaterialDetail(materialId);
  } catch {
    notFound();
  }

  return (
    <div className="flex w-full min-w-0 max-w-full flex-col gap-6">
      <PageHeader
        title="Detail Materi Pembelajaran"
        description="Tampilan baca-saja untuk monitoring konten materi pembelajaran."
        backHref="/super-admin/materi"
      />

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_420px]">
        <SectionCard title="Informasi Materi" description="Metadata utama dan akses materi.">
          <div className="grid gap-5 text-sm">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <BookOpen className="size-5 text-blue-600" />
                <h2 className="font-semibold text-slate-950 text-xl">{material.title}</h2>
              </div>
              <p className="text-slate-600">{material.description || "-"}</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-slate-400 text-xs">Kategori</p>
                <p className="mt-1 font-medium text-slate-900">{material.categoryRef.name}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs">Akses</p>
                <p className="mt-1 font-medium text-slate-900">
                  {material.requiredSubscriptionPlan
                    ? `${material.requiredSubscriptionPlan.name} (${material.requiredSubscriptionPlan.tier})`
                    : "Belum dipilih"}
                </p>
              </div>
              <div>
                <p className="text-slate-400 text-xs">Status</p>
                <div className="mt-1">
                  <StatusBadge tone={statusTone(material.status)}>{material.status}</StatusBadge>
                </div>
              </div>
              <div>
                <p className="text-slate-400 text-xs">Dibuat Oleh</p>
                <p className="mt-1 font-medium text-slate-900">{material.createdByUser.name}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs">Published At</p>
                <p className="mt-1 font-medium text-slate-900">{formatDate(material.publishedAt)}</p>
              </div>
              <div>
                <p className="text-slate-400 text-xs">Updated At</p>
                <p className="mt-1 font-medium text-slate-900">{formatDate(material.updatedAt)}</p>
              </div>
            </div>
          </div>
        </SectionCard>

        <SectionCard title="Ringkasan" description="Jumlah modul dan urutan konten.">
          <div className="grid gap-4">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-slate-500 text-sm">Total Modul</p>
              <p className="mt-1 font-semibold text-3xl text-slate-950">{material.modules.length}</p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-slate-500 text-sm">Sort Order</p>
              <p className="mt-1 font-semibold text-3xl text-slate-950">{material.sortOrder}</p>
            </div>
          </div>
        </SectionCard>
      </div>

      <SectionCard title="Daftar Modul" description="Urutan modul yang akan dilihat user.">
        <div className="grid gap-3">
          {material.modules.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 border-dashed bg-slate-50 py-10 text-center text-slate-500">
              Belum ada modul.
            </div>
          ) : (
            (material.modules as LearningMaterialModuleSummary[]).map((module, index) => {
              const Icon = getModuleIcon(module.moduleType);
              return (
                <div
                  key={module.id}
                  className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex size-9 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="truncate font-medium text-slate-950">{module.title}</p>
                      <p className="text-slate-500 text-xs">
                        Modul {index + 1} | {module.moduleType}
                        {module.durationMinutes ? ` | ${module.durationMinutes} menit` : ""}
                      </p>
                    </div>
                  </div>
                  <StatusBadge tone="neutral">{module.moduleType}</StatusBadge>
                </div>
              );
            })
          )}
        </div>
      </SectionCard>
    </div>
  );
}
