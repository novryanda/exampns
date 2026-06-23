import { CreatePartnerForm } from "@/app/(main)/super-admin/partners/_components/partner-admin-forms";
import { PageHeader, SectionCard } from "@/app/(main)/_components/page-shell";

export default function CreatePartnerPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Tambah Mitra"
        description="Buat akun mitra baru dan langsung generate kode referral pertamanya."
        backHref="/super-admin/partners"
      />

      <SectionCard
        title="Form Mitra"
        description="Lengkapi identitas mitra dan aturan referral pertamanya."
      >
        <CreatePartnerForm />
      </SectionCard>
    </div>
  );
}
