import { PageHeader, SectionCard } from "@/app/(main)/_components/page-shell";
import { TryoutDraftForm } from "@/app/(main)/admin/tryout-drafts/_components/tryout-draft-form";

export default async function SuperAdminNewTryoutPage() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Buat Tryout Baru"
        description="Super admin membuat draft tryout pada builder yang sama, lalu dapat lanjut review atau publish."
      />
      <SectionCard title="Form Draft" description="Setelah dibuat, Anda akan diarahkan ke builder detail.">
        <TryoutDraftForm
          scope="super-admin"
          redirectPath="/super-admin/tryout-catalog"
          createRedirectBasePath="/super-admin/tryout-catalog"
        />
      </SectionCard>
    </div>
  );
}
