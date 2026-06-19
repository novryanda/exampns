"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { QuestionCategorySummary } from "@/server/admin-content-data";
import type { SubscriptionPlanItem } from "@/server/user-dashboard-data";

export function MaterialForm({
  categories,
  subscriptionPlans,
  initialData,
}: {
  readonly categories: QuestionCategorySummary[];
  readonly subscriptionPlans: SubscriptionPlanItem[];
  readonly initialData?: any;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    description: initialData?.description || "",
    categoryId: initialData?.categoryId || categories[0]?.id || "",
    requiredSubscriptionPlanId:
      initialData?.requiredSubscriptionPlanId || subscriptionPlans[0]?.id || "",
    coverImageUrl: initialData?.coverImageUrl || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = initialData 
        ? `/api/admin-data/learning-materials/${initialData.id}`
        : "/api/admin-data/learning-materials";
        
      const method = initialData ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Gagal menyimpan materi");

      const data = await res.json();
      
      router.refresh();
      if (!initialData) {
        router.push(`/admin/materi/${data.data.id}`);
      } else {
        // If updating, maybe just stay on page or show success
      }
    } catch (error) {
      console.error(error);
      alert("Gagal menyimpan materi");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="grid gap-3">
        <Label htmlFor="title">Judul Materi</Label>
        <Input
          id="title"
          required
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Misal: Panduan Lengkap TWK Nasionalisme"
        />
      </div>

      <div className="grid gap-3">
        <Label htmlFor="description">Deskripsi Singkat</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Jelaskan secara singkat apa yang akan dipelajari..."
          rows={3}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="grid gap-3">
          <Label htmlFor="categoryId">Kategori SKD</Label>
          <Select
            value={formData.categoryId}
            onValueChange={(val) => setFormData({ ...formData, categoryId: val })}
          >
            <SelectTrigger id="categoryId">
              <SelectValue placeholder="Pilih Kategori" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c.id} value={c.id!}>
                  {c.name} ({c.code})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-3">
          <Label htmlFor="requiredSubscriptionPlanId">Akses Subscription Plan</Label>
          <Select
            value={formData.requiredSubscriptionPlanId}
            onValueChange={(val) => setFormData({ ...formData, requiredSubscriptionPlanId: val })}
          >
            <SelectTrigger id="requiredSubscriptionPlanId">
              <SelectValue placeholder="Pilih Akses" />
            </SelectTrigger>
            <SelectContent>
              {subscriptionPlans.map((plan) => (
                <SelectItem key={plan.id} value={plan.id}>
                  {plan.name} ({plan.tier})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-3">
        <Label htmlFor="coverImageUrl">URL Cover Image (Opsional)</Label>
        <Input
          id="coverImageUrl"
          type="url"
          value={formData.coverImageUrl}
          onChange={(e) => setFormData({ ...formData, coverImageUrl: e.target.value })}
          placeholder="https://example.com/image.jpg"
        />
      </div>

      <div className="flex justify-end border-t border-slate-100 pt-6">
        <Button type="submit" disabled={isSubmitting} className="rounded-xl bg-blue-600 hover:bg-blue-700">
          <Save className="mr-2 size-4" />
          {isSubmitting ? "Menyimpan..." : "Simpan Materi"}
        </Button>
      </div>
    </form>
  );
}
