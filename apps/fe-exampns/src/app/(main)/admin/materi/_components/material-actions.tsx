"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, Archive } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MaterialActions({
  materialId,
  status,
}: {
  readonly materialId: string;
  readonly status: string;
}) {
  const router = useRouter();
  const [isPublishing, setIsPublishing] = useState(false);
  const [isArchiving, setIsArchiving] = useState(false);

  const handlePublish = async () => {
    if (!confirm("Publikasikan materi ini agar bisa diakses oleh user? (Pastikan minimal ada 1 modul)")) return;
    setIsPublishing(true);
    try {
      const res = await fetch(`/api/admin-data/learning-materials/${materialId}/publish`, {
        method: "POST",
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Gagal mempublikasikan materi");
      }
      alert("Materi berhasil dipublikasikan!");
      router.refresh();
    } catch (error: any) {
      alert(error.message || "Terjadi kesalahan");
    } finally {
      setIsPublishing(false);
    }
  };

  const handleArchive = async () => {
    if (!confirm("Arsipkan materi ini? Materi tidak akan bisa diakses user lagi.")) return;
    setIsArchiving(true);
    try {
      const res = await fetch(`/api/admin-data/learning-materials/${materialId}/archive`, {
        method: "POST",
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Gagal mengarsipkan materi");
      }
      alert("Materi berhasil diarsipkan!");
      router.refresh();
    } catch (error: any) {
      alert(error.message || "Terjadi kesalahan");
    } finally {
      setIsArchiving(false);
    }
  };

  if (status === "published") {
    return (
      <Button
        variant="outline"
        size="sm"
        className="rounded-xl border-amber-200 bg-amber-50 text-amber-700 hover:bg-amber-100 hover:text-amber-800"
        onClick={handleArchive}
        disabled={isArchiving}
      >
        <Archive className="mr-2 size-4" />
        {isArchiving ? "Memproses..." : "Arsipkan"}
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      className="rounded-xl border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 hover:text-emerald-800"
      onClick={handlePublish}
      disabled={isPublishing}
    >
      <Globe className="mr-2 size-4" />
      {isPublishing ? "Memproses..." : "Publikasikan"}
    </Button>
  );
}
