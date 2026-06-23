import { CertificateEditorLoader } from "../../_components/editor-loader";
import { serverApiFetch, ApiSuccessResponse } from "@/server/api-client";
import { notFound } from "next/navigation";

export default async function EditCertificatePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  let template;
  try {
    const response = await serverApiFetch<ApiSuccessResponse<any>>(`/api/v1/admin/certificate-templates/${id}`);
    template = response.data;
  } catch (error) {
    notFound();
  }

  return (
    <div className="w-full h-full p-4">
      <CertificateEditorLoader templateId={id} initialData={template} />
    </div>
  );
}
