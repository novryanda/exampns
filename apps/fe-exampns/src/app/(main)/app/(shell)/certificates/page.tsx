import { PageHeader } from "@/app/(main)/_components/page-shell";
import { serverApiFetch, ApiSuccessResponse } from "@/server/api-client";
import { Award, Download } from "lucide-react";
import { CertificateCard } from "./_components/certificate-card";

export default async function UserCertificatesPage() {
  let certificates: any[] = [];
  try {
    const response = await serverApiFetch<ApiSuccessResponse<any[]>>("/api/v1/user/certificates");
    certificates = response.data;
  } catch (error) {
    console.error("Failed to fetch certificates", error);
  }

  return (
    <div className="flex min-w-0 w-full max-w-full flex-col gap-6 p-4">
      <PageHeader
        title="Sertifikat Saya"
        description="Koleksi sertifikat kelulusan materi yang telah Anda dapatkan."
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {certificates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
            <Award className="mb-4 size-16 text-slate-300" />
            <h3 className="text-xl font-medium text-slate-900">Belum ada sertifikat</h3>
            <p className="mt-2 max-w-md text-sm">
              Anda belum menyelesaikan materi yang memiliki sertifikat. Terus belajar dan selesaikan seluruh modul materi untuk mendapatkan sertifikat kelulusan!
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {certificates.map((cert) => (
              <CertificateCard key={cert.id} certificate={cert} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
