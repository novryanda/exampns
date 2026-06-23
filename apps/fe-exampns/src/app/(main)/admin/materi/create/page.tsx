import { PageHeader } from "@/app/(main)/_components/page-shell";
import { getAdminQuestionMetadataOptions, getAdminCertificateTemplates } from "@/server/admin-content-data";
import { getSubscriptionPlans } from "@/server/user-dashboard-data";
import { MaterialForm } from "../_components/material-form";

export default async function AdminMateriCreatePage() {
  const [metadataOptions, subscriptionPlans, certificateTemplates] = await Promise.all([
    getAdminQuestionMetadataOptions(),
    getSubscriptionPlans(),
    getAdminCertificateTemplates(),
  ]);

  return (
    <div className="flex min-w-0 w-full max-w-full flex-col gap-6">
      <PageHeader
        title="Buat Materi Baru"
        description="Tambahkan materi pembelajaran baru. Setelah dibuat, Anda bisa menambahkan modul silabus."
        backHref="/admin/materi"
      />
      
      <div className="mx-auto w-full max-w-2xl">
        <MaterialForm categories={metadataOptions.categories} subscriptionPlans={subscriptionPlans} certificateTemplates={certificateTemplates} />
      </div>
    </div>
  );
}
