import Link from "next/link";
import { Plus } from "lucide-react";

import { PageHeader } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import { getAdminLearningMaterials } from "@/server/admin-content-data";
import { MaterialList } from "./_components/material-list";

export default async function AdminMateriPage() {
  const materials = await getAdminLearningMaterials();

  return (
    <div className="flex min-w-0 w-full max-w-full flex-col gap-6">
      <PageHeader
        title="Materi Pembelajaran"
        description="Kelola materi pembelajaran, video, teks, PDF, dan latihan soal untuk user."
        actions={
          <Button asChild className="rounded-xl bg-blue-600 hover:bg-blue-700">
            <Link href="/admin/materi/create">
              <Plus className="mr-2 size-4" />
              Buat Materi Baru
            </Link>
          </Button>
        }
      />
      <MaterialList initialMaterials={materials} />
    </div>
  );
}
