"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { CheckCircle2, Circle, FileText, PlayCircle, FileQuestion, File, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import type { UserLearningMaterialDetail, UserMaterialModule } from "@/server/user-dashboard-data";

function getModuleIcon(type: UserMaterialModule["moduleType"]) {
  switch (type) {
    case "video":
      return PlayCircle;
    case "text":
      return FileText;
    case "pdf":
      return File;
    case "quiz":
      return FileQuestion;
  }
}

function getModuleLabel(type: UserMaterialModule["moduleType"]) {
  switch (type) {
    case "video":
      return "Video";
    case "text":
      return "Materi Teks";
    case "pdf":
      return "Dokumen PDF";
    case "quiz":
      return "Latihan Soal";
  }
}

export function MaterialSyllabus({
  material,
}: {
  readonly material: UserLearningMaterialDetail;
}) {
  const params = useParams();
  const pathname = usePathname();
  const currentModuleId = params.moduleId as string | undefined;

  return (
    <div className="rounded-3xl border border-slate-300 bg-slate-100 p-5 flex flex-col gap-2 shadow-sm">
      <div className="mb-2 px-1 text-sm font-semibold text-slate-900 uppercase tracking-wider">
        Silabus Pembelajaran
      </div>
      
      {material.modules.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 p-4 text-center text-slate-500 text-sm">
          Belum ada modul.
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          {material.modules.map((module, index) => {
            const Icon = getModuleIcon(module.moduleType);
            const isActive = currentModuleId === module.id;
            
            // Lock logic: quiz is locked if previous module exists and is not completed
            const isLocked = !module.isCompleted && module.moduleType === "quiz" && index > 0 && !material.modules[index - 1].isCompleted;
            
            const content = (
              <>
                {isActive && (
                  <div className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-blue-600" />
                )}
                
                <div className={cn(
                  "mt-0.5 flex-none",
                  isLocked ? "text-slate-400" : module.isCompleted ? "text-green-600" : "text-slate-300 group-hover:text-slate-400"
                )}>
                  {isLocked ? (
                    <Lock className="size-5" />
                  ) : module.isCompleted ? (
                    <CheckCircle2 className="size-5" />
                  ) : (
                    <Circle className="size-5" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className={cn(
                    "font-medium text-sm leading-tight mb-1",
                    isLocked ? "text-slate-500" : isActive ? "text-blue-900" : "text-slate-900"
                  )}>
                    {index + 1}. {module.title}
                  </div>
                  <div className={cn(
                    "flex items-center gap-2 text-xs",
                    isLocked ? "text-slate-400" : "text-slate-500"
                  )}>
                    <Icon className="size-3.5" />
                    <span>{getModuleLabel(module.moduleType)}</span>
                    {module.durationMinutes ? (
                      <>
                        <span>•</span>
                        <span>{module.durationMinutes} mnt</span>
                      </>
                    ) : null}
                    {module.moduleType === "quiz" && (
                      <>
                        <span>•</span>
                        <span>{module._count?.quizQuestions || 0} soal</span>
                      </>
                    )}
                  </div>
                </div>
              </>
            );

            if (isLocked) {
              return (
                <div
                  key={module.id}
                  className={cn(
                    "group relative flex items-start gap-3 rounded-2xl p-3 transition-all",
                    isActive 
                      ? "bg-white shadow-sm ring-1 ring-slate-200" 
                      : "bg-transparent",
                    "cursor-not-allowed opacity-80"
                  )}
                  title="Selesaikan materi sebelumnya untuk membuka"
                >
                  {content}
                </div>
              );
            }

            return (
              <Link
                key={module.id}
                href={`/app/materi/${material.id}/modul/${module.id}`}
                className={cn(
                  "group relative flex items-start gap-3 rounded-2xl p-3 transition-all",
                  isActive 
                    ? "bg-white shadow-sm text-blue-900 ring-1 ring-slate-200" 
                    : "hover:bg-white/60 text-slate-700",
                )}
              >
                {content}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
