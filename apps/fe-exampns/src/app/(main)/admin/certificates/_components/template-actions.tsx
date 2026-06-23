"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Edit, Trash2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function TemplateActions({ templateId, isUsed }: { templateId: string; isUsed: boolean }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (isUsed) {
      toast.error("Template tidak dapat dihapus karena masih digunakan pada materi.");
      return;
    }

    if (!confirm("Apakah Anda yakin ingin menghapus template ini?")) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin-data/certificate-templates/${templateId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal menghapus template");

      toast.success("Template berhasil dihapus");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus template");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="flex gap-2 justify-end">
      <Button variant="destructive" size="sm" onClick={handleDelete} disabled={isDeleting || isUsed} className="rounded-lg">
        <Trash2 className="mr-2 size-4" />
        Hapus
      </Button>
      <Button variant="outline" size="sm" asChild className="rounded-lg">
        <Link href={`/admin/certificates/${templateId}/edit`}>
          <Edit className="mr-2 size-4" />
          Edit Template
        </Link>
      </Button>
    </div>
  );
}
