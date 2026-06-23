"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

export function UserCertificateActions({ certId }: { certId: string }) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm("Apakah Anda yakin ingin menghapus sertifikat pengguna ini? Pengguna tidak akan bisa mengaksesnya lagi.")) return;

    setIsDeleting(true);
    try {
      const res = await fetch(`/api/admin-data/learning-materials/user-certificates/${certId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Gagal menghapus sertifikat");

      toast.success("Sertifikat pengguna berhasil dihapus");
      router.refresh();
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus sertifikat pengguna");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button 
      variant="destructive" 
      size="sm" 
      onClick={handleDelete} 
      disabled={isDeleting} 
      className="rounded-lg"
    >
      <Trash2 className="mr-2 size-4" />
      Hapus
    </Button>
  );
}
