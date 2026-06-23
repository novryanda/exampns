import { PageHeader } from "@/app/(main)/_components/page-shell";
import { getAdminCertificateTemplates } from "@/server/admin-content-data";
import { Button } from "@/components/ui/button";
import { Plus, Award, Edit } from "lucide-react";
import { TemplateActions } from "./_components/template-actions";
import Link from "next/link";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export default async function AdminCertificatesPage() {
  const templates = await getAdminCertificateTemplates();

  return (
    <div className="flex min-w-0 w-full max-w-full flex-col gap-6">
      <PageHeader
        title="Template Sertifikat"
        description="Kelola template sertifikat kelulusan materi."
        actions={
          <div className="flex gap-2">
            <Button asChild variant="outline" className="rounded-xl">
              <Link href="/admin/certificates/users">
                Sertifikat User
              </Link>
            </Button>
            <Button asChild className="rounded-xl bg-blue-600 hover:bg-blue-700">
              <Link href="/admin/certificates/create">
                <Plus className="mr-2 size-4" />
                Buat Template Baru
              </Link>
            </Button>
          </div>
        }
      />

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        {templates.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-slate-500">
            <Award className="mb-4 size-12 text-slate-300" />
            <h3 className="text-lg font-medium text-slate-900">Belum ada template</h3>
            <p className="mt-1 text-sm">Buat template pertama Anda untuk mulai memberikan sertifikat ke murid.</p>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {templates.map((tmpl) => (
              <div key={tmpl.id} className="flex flex-col rounded-2xl border border-slate-200 bg-slate-50 p-4 transition-colors hover:bg-slate-100">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-blue-100 text-blue-600">
                    <Award className="size-5" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900">{tmpl.name}</h4>
                    <p className="text-xs text-slate-500">
                      Dibuat pada {format(new Date(tmpl.createdAt), "d MMM yyyy", { locale: id })}
                    </p>
                  </div>
                </div>
                
                <div className="mb-4 text-sm text-slate-600">
                  Digunakan pada <strong>{tmpl._count.materials}</strong> materi
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100">
                  <TemplateActions templateId={tmpl.id} isUsed={tmpl._count.materials > 0} />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
