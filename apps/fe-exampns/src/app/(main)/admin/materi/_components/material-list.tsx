"use client";

import Link from "next/link";

import { format } from "date-fns";
import { id } from "date-fns/locale";
import { Edit, Eye, Lock } from "lucide-react";

import { StatusBadge } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import type { AdminLearningMaterialItem } from "@/server/admin-content-data";

export function MaterialList({
  initialMaterials,
  readOnly = false,
  basePath = "/admin/materi",
}: {
  readonly initialMaterials: AdminLearningMaterialItem[];
  readonly readOnly?: boolean;
  readonly basePath?: string;
}) {
  const ActionIcon = readOnly ? Eye : Edit;

  return (
    <div className="rounded-3xl border border-slate-200 bg-white">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="border-slate-200 border-b bg-slate-50">
            <tr>
              <th className="px-6 py-4 font-medium text-slate-500">Materi Pembelajaran</th>
              <th className="px-6 py-4 font-medium text-slate-500">Kategori</th>
              <th className="px-6 py-4 font-medium text-slate-500">Akses</th>
              <th className="px-6 py-4 font-medium text-slate-500">Modul</th>
              <th className="px-6 py-4 font-medium text-slate-500">Status</th>
              <th className="px-6 py-4 font-medium text-slate-500">Diperbarui</th>
              <th className="px-6 py-4 font-medium text-slate-500">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {initialMaterials.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-slate-500">
                  Belum ada materi pembelajaran yang dibuat.
                </td>
              </tr>
            ) : (
              initialMaterials.map((material) => (
                <tr key={material.id} className="transition-colors hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="font-medium text-slate-900">{material.title}</div>
                    <div className="mt-1 max-w-[250px] truncate text-slate-500 text-xs">
                      {material.description || "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge tone="brand">{material.categoryRef.code}</StatusBadge>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-600">
                      {material.requiredSubscriptionPlan?.tier !== "trial" ? <Lock className="size-3" /> : null}
                      <span>
                        {material.requiredSubscriptionPlan
                          ? `${material.requiredSubscriptionPlan.name} (${material.requiredSubscriptionPlan.tier})`
                          : "Belum dipilih"}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-slate-600">
                    {material._count.modules} modul
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge
                      tone={
                        material.status === "published"
                          ? "success"
                          : material.status === "draft"
                            ? "neutral"
                            : "warning"
                      }
                    >
                      {material.status}
                    </StatusBadge>
                  </td>
                  <td className="px-6 py-4 text-slate-500 text-xs">
                    {format(new Date(material.updatedAt), "d MMM yyyy", { locale: id })}
                  </td>
                  <td className="px-6 py-4">
                    <Button variant="outline" size="sm" asChild className="rounded-lg">
                      <Link href={`${basePath}/${material.id}`}>
                        <ActionIcon className="mr-2 size-4" />
                        {readOnly ? "Lihat" : "Kelola"}
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
