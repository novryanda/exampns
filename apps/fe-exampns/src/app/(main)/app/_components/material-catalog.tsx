"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Lock, PlayCircle, ShieldAlert } from "lucide-react";

import { StatusBadge } from "@/app/(main)/_components/page-shell";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import type { QuestionCategoryItem } from "@/server/user-dashboard-data";
import type { UserLearningMaterialItem } from "@/server/user-dashboard-data";
import { useEffect } from "react";
function matchesCategoryFilter(material: UserLearningMaterialItem, categoryCode: string) {
  if (categoryCode === "all") return true;
  return material.categoryRef.code === categoryCode;
}

export function MaterialCatalog({
  categories,
}: {
  readonly categories: QuestionCategoryItem[];
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [materials, setMaterials] = useState<UserLearningMaterialItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchMaterials() {
      try {
        const res = await fetch("/api/user/learning-materials");
        if (!res.ok) throw new Error("Failed to fetch materials");
        const data = await res.json();
        setMaterials(data.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchMaterials();
  }, []);

  const filteredMaterials = useMemo(
    () => materials.filter((m) => matchesCategoryFilter(m, selectedCategory)),
    [selectedCategory, materials],
  );

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <label htmlFor="material-category-filter" className="font-medium text-slate-700 text-sm">
          Kategori Materi
        </label>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger
            id="material-category-filter"
            className="w-full max-w-xs rounded-xl border-slate-200 bg-white"
          >
            <SelectValue placeholder="Pilih kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Kategori</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category.id} value={category.code}>
                {category.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center p-12 text-slate-500">Memuat materi...</div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {filteredMaterials.length === 0 ? (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-8 text-center text-slate-500 text-sm lg:col-span-full">
              Tidak ada materi untuk kategori yang dipilih.
            </div>
          ) : (
            filteredMaterials.map((material) => (
              <article
                key={material.id}
                className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md"
              >
                {/* Cover Image Placeholder */}
                <div className="relative aspect-[16/9] w-full bg-slate-100">
                  {material.coverImageUrl ? (
                    <img
                      src={material.coverImageUrl}
                      alt={material.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-blue-50 text-blue-300">
                      <PlayCircle className="size-12 opacity-50" />
                    </div>
                  )}
                  {!material.isAccessible && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm">
                      <div className="flex items-center gap-2 rounded-full bg-slate-900/80 px-4 py-2 font-medium text-white text-sm">
                        <Lock className="size-4" />
                        Terkunci (Paket {material.requiredTier})
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-5">
                  <div className="flex flex-wrap items-center gap-2">
                    <StatusBadge tone="brand">{material.categoryRef.code}</StatusBadge>
                    <StatusBadge tone={material.requiredTier === "trial" ? "success" : "warning"}>
                      {material.requiredTier === "trial" ? "Gratis" : "Premium"}
                    </StatusBadge>
                  </div>
                  
                  <h3 className="mt-4 font-semibold text-slate-950 text-xl line-clamp-2">
                    {material.title}
                  </h3>
                  
                  <p className="mt-2 flex-1 text-slate-600 text-sm line-clamp-3">
                    {material.description || "Tidak ada deskripsi."}
                  </p>
                  
                  <div className="mt-4 flex items-center justify-between border-slate-100 border-t pt-4">
                    <div className="text-slate-500 text-sm font-medium">
                      {material._count.modules} Modul Pembelajaran
                    </div>
                    {material.isAccessible ? (
                      <Button asChild size="sm" className="rounded-xl">
                        <Link href={`/app/materi/${material.id}`}>Pelajari</Link>
                      </Button>
                    ) : (
                      <Button asChild size="sm" variant="secondary" className="rounded-xl">
                        <Link href="/app/langganan">Upgrade</Link>
                      </Button>
                    )}
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      )}
    </div>
  );
}
