import { notFound } from "next/navigation";

import { PageHeader } from "@/app/(main)/_components/page-shell";
import { getLearningMaterialDetail, getLearningMaterialModuleContent } from "@/server/user-dashboard-data";
import { MaterialSyllabus } from "@/app/(main)/app/_components/material-syllabus";
import { ModuleContentViewer } from "@/app/(main)/app/_components/module-content-viewer";

export default async function MateriModulPage({
  params,
}: {
  params: Promise<{ materialId: string; moduleId: string }>;
}) {
  const { materialId, moduleId } = await params;

  let material;
  let moduleDetail;
  try {
    [material, moduleDetail] = await Promise.all([
      getLearningMaterialDetail(materialId),
      getLearningMaterialModuleContent(materialId, moduleId),
    ]);
  } catch (error) {
    notFound();
  }

  const moduleFromMaterial = material.modules.find((m: any) => m.id === moduleId);
  if (moduleFromMaterial) {
    moduleDetail.isCompleted = moduleFromMaterial.isCompleted;
    moduleDetail._count = moduleFromMaterial._count;
  }

  // Find next and prev module ids
  const currentIndex = material.modules.findIndex((m) => m.id === moduleId);
  const prevModuleId = currentIndex > 0 ? material.modules[currentIndex - 1]?.id : undefined;
  const nextModuleId = currentIndex < material.modules.length - 1 ? material.modules[currentIndex + 1]?.id : undefined;

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.20))]">
      <div className="flex-none pb-4">
        <PageHeader
          title={material.title}
          description={`${material.progressPercent}% Selesai • ${material.completedModules}/${material.totalModules} Modul`}
        />
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100">
          <div 
            className="h-full bg-blue-600 transition-all duration-500"
            style={{ width: `${material.progressPercent}%` }}
          />
        </div>
      </div>

      <div className="flex flex-1 min-h-0 gap-6">
        <aside className="w-80 flex-none overflow-y-auto pr-2">
          <MaterialSyllabus material={material} />
        </aside>

        <main className="flex-1 overflow-hidden relative">
          <ModuleContentViewer 
            materialId={material.id} 
            module={moduleDetail} 
            prevModuleId={prevModuleId}
            nextModuleId={nextModuleId}
          />
        </main>
      </div>
    </div>
  );
}
