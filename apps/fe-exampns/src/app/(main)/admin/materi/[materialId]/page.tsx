import { notFound } from "next/navigation";
import { BookOpen } from "lucide-react";

import { PageHeader } from "@/app/(main)/_components/page-shell";
import { getAdminLearningMaterialDetail, getAdminQuestionMetadataOptions } from "@/server/admin-content-data";
import { getSubscriptionPlans } from "@/server/user-dashboard-data";
import { MaterialForm } from "../_components/material-form";
import { ModuleManager } from "../_components/module-manager";
import { MaterialActions } from "../_components/material-actions";

export default async function AdminMateriDetailPage({
  params,
}: {
  params: Promise<{ materialId: string }>;
}) {
  const { materialId } = await params;

  let material;
  const [metadataOptions, subscriptionPlans] = await Promise.all([
    getAdminQuestionMetadataOptions(),
    getSubscriptionPlans(),
  ]);
  
  try {
    material = await getAdminLearningMaterialDetail(materialId);
  } catch (error) {
    notFound();
  }

  return (
    <div className="flex min-w-0 w-full max-w-full flex-col gap-6">
      <PageHeader
        title="Kelola Materi Pembelajaran"
        description="Edit detail materi dan kelola modul silabus di bawah ini."
        backHref="/admin/materi"
        actions={<MaterialActions materialId={material.id} status={material.status} />}
      />
      
      <div className="grid gap-6 lg:grid-cols-2 items-start">
        <div className="flex flex-col gap-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <BookOpen className="size-5" />
              Detail Materi
            </h2>
            <MaterialForm
              categories={metadataOptions.categories}
              subscriptionPlans={subscriptionPlans}
              initialData={material}
            />
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <ModuleManager materialId={material.id} initialModules={material.modules} />
          </div>
        </div>
      </div>
    </div>
  );
}
