import { notFound } from "next/navigation";
import { BookOpen } from "lucide-react";

import { PageHeader } from "@/app/(main)/_components/page-shell";
import { getLearningMaterialDetail } from "@/server/user-dashboard-data";
import { MaterialSyllabus } from "@/app/(main)/app/_components/material-syllabus";

export default async function MateriDetailPage({
  params,
}: {
  params: Promise<{ materialId: string }>;
}) {
  const { materialId } = await params;
  
  let material;
  try {
    material = await getLearningMaterialDetail(materialId);
  } catch (error) {
    notFound();
  }

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

        <main className="flex-1 overflow-y-auto rounded-3xl border border-slate-200 bg-white shadow-sm relative">
          <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-500 p-8 text-center">
            <BookOpen className="size-16 mb-4 opacity-20" />
            <h3 className="text-xl font-medium text-slate-700 mb-2">Mulai Belajar</h3>
            <p>Pilih modul dari silabus di sebelah kiri untuk mulai membaca materi atau menonton video pembahasan.</p>
          </div>
        </main>
      </div>
    </div>
  );
}
