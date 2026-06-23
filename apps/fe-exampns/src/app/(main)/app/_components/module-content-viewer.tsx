"use client";

import { useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Info, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import type { UserModuleContentDetail } from "@/server/user-dashboard-data";

export function ModuleContentViewer({
  materialId,
  module,
  nextModuleId,
  prevModuleId,
  isLocked,
}: {
  readonly materialId: string;
  readonly module: UserModuleContentDetail;
  readonly nextModuleId?: string;
  readonly prevModuleId?: string;
  readonly isLocked?: boolean;
}) {
  const router = useRouter();
  const [isMarking, setIsMarking] = useState(false);

  const handleMarkComplete = async () => {
    setIsMarking(true);
    try {
      const res = await fetch(`/api/user/learning-materials/${materialId}/modules/${module.id}/complete`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      
      if (data?.data?.certificateIssued) {
        toast.success("Selamat! Anda telah menyelesaikan materi dan mendapatkan Sertifikat Kelulusan!", { duration: 5000 });
      }
      // Refresh router to update progress in syllabus
      router.refresh();
      
      // Auto-navigate to next module if available
      if (nextModuleId) {
        router.push(`/app/materi/${materialId}/modul/${nextModuleId}`);
      }
    } catch (error) {
      console.error("Failed to mark complete", error);
    } finally {
      setIsMarking(false);
    }
  };

  const getEmbedUrl = (url: string) => {
    if (!url) return url;
    try {
      const urlObj = new URL(url);
      if (urlObj.hostname.includes("youtube.com") || urlObj.hostname.includes("youtu.be")) {
        if (urlObj.hostname.includes("youtu.be")) {
          const videoId = urlObj.pathname.slice(1);
          return `https://www.youtube.com/embed/${videoId}`;
        }
        if (urlObj.pathname === "/watch") {
          const videoId = urlObj.searchParams.get("v");
          if (videoId) return `https://www.youtube.com/embed/${videoId}`;
        }
      }
      return url;
    } catch (e) {
      return url;
    }
  };

  const getPdfProxyUrl = (url: string) => {
    if (!url) return url;
    try {
      // If it's a backend upload URL, convert it to a relative frontend proxy URL to avoid localhost CORS/iframe issues
      if (url.includes("/api/v1/uploads/")) {
        const urlObj = new URL(url);
        return `/api${urlObj.pathname.split("/api/v1")[1]}`; // e.g. /api/uploads/materials/...
      }
      return url;
    } catch {
      return url;
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-6 lg:p-10">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 lg:p-8 mb-8 shadow-sm">
            <h1 className="text-3xl font-bold text-slate-900 mb-4">{module.title}</h1>
            
            {module.description && (
              <p className={`text-slate-700 text-lg leading-relaxed ${(module.moduleType === "video" && module.videoUrl) || (module.moduleType === "pdf" && module.pdfUrl) || (module.moduleType === "text" && module.content) ? "mb-6" : ""}`}>
                {module.description}
              </p>
            )}

            {module.moduleType === "text" && module.content && (
              <div 
                className="prose prose-slate max-w-none prose-headings:font-semibold prose-a:text-blue-600 hover:prose-a:text-blue-500 mt-4"
                dangerouslySetInnerHTML={{ __html: module.content }}
              />
            )}

            {module.moduleType === "video" && module.videoUrl && (
              <div className="aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-900 shadow-inner mb-8">
                <iframe
                  src={getEmbedUrl(module.videoUrl)}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            )}

            {module.moduleType === "pdf" && module.pdfUrl && (
              <div className="flex flex-col gap-4 mb-8">
                <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-inner">
                  <iframe
                    src={
                      module.pdfUrl.toLowerCase().endsWith(".doc") || module.pdfUrl.toLowerCase().endsWith(".docx")
                        ? `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(module.pdfUrl)}`
                        : `${getPdfProxyUrl(module.pdfUrl)}#toolbar=0`
                    }
                    className="h-full w-full border-0"
                  />
                </div>
                <div className="text-right">
                  <a 
                    href={module.pdfUrl.toLowerCase().endsWith(".doc") || module.pdfUrl.toLowerCase().endsWith(".docx") ? module.pdfUrl : getPdfProxyUrl(module.pdfUrl)} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1"
                  >
                    Buka / Unduh Dokumen
                  </a>
                </div>
              </div>
            )}
          </div>

          {module.moduleType !== "text" && module.content && (
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 lg:p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-slate-700">
                <Info className="size-5" />
                <h4 className="font-semibold text-lg">Ringkasan</h4>
              </div>
              <div 
                className="prose prose-slate max-w-none prose-headings:font-semibold prose-a:text-blue-600 hover:prose-a:text-blue-500"
                dangerouslySetInnerHTML={{ __html: module.content }}
              />
            </div>
          )}

          {module.moduleType === "quiz" && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 text-center">
              <h3 className="text-xl font-medium text-slate-900 mb-2">Latihan Soal</h3>
              <p className="text-slate-600 mb-6">
                Modul ini berisi {module._count?.manualQuestions || 0} soal latihan untuk menguji pemahamanmu.
              </p>
              
              {isLocked ? (
                <div className="mx-auto flex max-w-sm flex-col items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-amber-800">
                  <div className="rounded-full bg-amber-100 p-3">
                    <Lock className="size-6 text-amber-600" />
                  </div>
                  <h4 className="font-semibold text-amber-900">Modul Terkunci</h4>
                  <p className="text-sm">
                    Harap selesaikan materi sebelumnya untuk membuka latihan soal ini.
                  </p>
                </div>
              ) : !module.isCompleted ? (
                <Button 
                  size="lg" 
                  className="rounded-xl bg-blue-600 hover:bg-blue-700"
                  onClick={() => router.push(`/app/materi/${materialId}/modul/${module.id}/quiz`)}
                >
                  Mulai Latihan
                </Button>
              ) : (
                <div className="flex justify-center gap-4">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="rounded-xl border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 hover:text-blue-800"
                    onClick={() => router.push(`/app/materi/${materialId}/modul/${module.id}/quiz`)}
                  >
                    Mulai Ulang Latihan
                  </Button>
                  <Button 
                    size="lg" 
                    className="rounded-xl bg-blue-600 hover:bg-blue-700"
                    onClick={() => router.push(`/app/materi/${materialId}/modul/${module.id}/quiz?mode=review`)}
                  >
                    Review Hasil Ujian
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <div className="flex-none p-6 lg:px-10 pb-10">
        <div className="mx-auto flex max-w-4xl items-center justify-between">
          <div>
            {prevModuleId && (
              <Button
                variant="outline"
                className="rounded-xl bg-white"
                onClick={() => router.push(`/app/materi/${materialId}/modul/${prevModuleId}`)}
              >
                <ChevronLeft className="mr-2 size-4" />
                Modul Sebelumnya
              </Button>
            )}
          </div>

          <div className="flex gap-3">
            {!module.isCompleted && module.moduleType !== "quiz" && (
              <Button
                onClick={handleMarkComplete}
                disabled={isMarking}
                className="rounded-xl bg-green-600 hover:bg-green-700 text-white"
              >
                <CheckCircle2 className="mr-2 size-4" />
                {isMarking ? "Menyimpan..." : "Tandai Selesai"}
              </Button>
            )}

            {nextModuleId && (
              <Button
                className="rounded-xl bg-blue-600 hover:bg-blue-700"
                onClick={() => router.push(`/app/materi/${materialId}/modul/${nextModuleId}`)}
              >
                Modul Selanjutnya
                <ChevronRight className="ml-2 size-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
