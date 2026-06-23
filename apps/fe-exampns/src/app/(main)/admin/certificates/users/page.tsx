import { PageHeader } from "@/app/(main)/_components/page-shell";
import { getAdminUserCertificates } from "@/server/admin-content-data";
import { format } from "date-fns";
import { id as localeId } from "date-fns/locale";
import { Award, User } from "lucide-react";
import { UserCertificateActions } from "./_components/user-certificate-actions";

export default async function AdminUserCertificatesPage() {
  const userCertificates = await getAdminUserCertificates();

  return (
    <div className="flex min-w-0 w-full max-w-full flex-col gap-6">
      <PageHeader
        title="Sertifikat Pengguna"
        description="Kelola sertifikat yang telah diklaim oleh pengguna."
        backHref="/admin/certificates"
      />

      <div className="rounded-3xl border border-slate-200 bg-white shadow-sm overflow-hidden">
        {userCertificates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
            <Award className="mb-4 size-12 text-slate-300" />
            <h3 className="text-lg font-medium text-slate-900">Belum ada sertifikat pengguna</h3>
            <p className="mt-1 text-sm">Belum ada pengguna yang berhasil mengklaim sertifikat materi.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">Pengguna</th>
                  <th className="px-6 py-4 font-semibold">Materi</th>
                  <th className="px-6 py-4 font-semibold">Template</th>
                  <th className="px-6 py-4 font-semibold">Tanggal Diklaim</th>
                  <th className="px-6 py-4 font-semibold text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {userCertificates.map((cert) => (
                  <tr key={cert.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-8 items-center justify-center rounded-full bg-slate-100 text-slate-600">
                          <User className="size-4" />
                        </div>
                        <div>
                          <div className="font-medium text-slate-900">{cert.user.name}</div>
                          <div className="text-xs text-slate-500">{cert.user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900 line-clamp-1 max-w-[250px]" title={cert.material.title}>
                        {cert.material.title}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <Award className="size-4 text-blue-500" />
                        {cert.template.name}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-slate-500">
                      {format(new Date(cert.issuedAt), "d MMM yyyy, HH:mm", { locale: localeId })}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <UserCertificateActions certId={cert.id} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
