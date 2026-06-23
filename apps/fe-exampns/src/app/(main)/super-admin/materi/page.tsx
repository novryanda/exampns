import { PageHeader } from "@/app/(main)/_components/page-shell";
import { MaterialList } from "@/app/(main)/admin/materi/_components/material-list";
import { getSuperAdminLearningMaterials } from "@/server/admin-content-data";

export default async function SuperAdminMateriPage() {
  const materials = await getSuperAdminLearningMaterials();

  return (
    <div className="flex w-full min-w-0 max-w-full flex-col gap-6">
      <PageHeader
        title="Materi Pembelajaran"
        description="Pantau materi pembelajaran. Pengelolaan materi, modul, publish, dan arsip dilakukan oleh admin konten."
      />
      <MaterialList
        initialMaterials={materials}
        readOnly
        basePath="/super-admin/materi"
      />
    </div>
  );
}
