"use client";

import { useEffect, useRef, useState } from "react";

import { useRouter } from "next/navigation";

import { Camera, Loader2, Trash2, Upload } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAsyncFormSubmit } from "@/hooks/use-async-form-submit";
import { getInitials } from "@/lib/utils";
import { initialAdminActionState } from "@/server/admin-action-state";
import { removeProfileAvatarAction } from "@/server/profile-actions";

const MAX_AVATAR_BYTES = 2 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;

export function ProfilePhotoUpload({
  name,
  imageUrl,
}: {
  readonly name: string;
  readonly imageUrl: string | null;
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(imageUrl);
  const { isSubmitting: isUploading, run: runUpload } = useAsyncFormSubmit();
  const { isSubmitting: isRemoving, run: runRemove } = useAsyncFormSubmit();

  useEffect(() => {
    setPreviewUrl(imageUrl);
  }, [imageUrl]);

  const uploadFile = (file: File) => {
    void runUpload(async () => {
      if (file.size > MAX_AVATAR_BYTES) {
        toast.error("Ukuran foto maksimal 2 MB.");
        setPreviewUrl(imageUrl);
        return;
      }

      if (!ALLOWED_TYPES.includes(file.type as (typeof ALLOWED_TYPES)[number])) {
        toast.error("Format foto harus JPEG, PNG, atau WebP.");
        setPreviewUrl(imageUrl);
        return;
      }

      const body = new FormData();
      body.append("file", file);

      const response = await fetch("/api/me/avatar", {
        method: "POST",
        body,
        credentials: "include",
      });

      if (!response.ok) {
        let message = "Gagal mengunggah foto profil.";
        try {
          const payload = (await response.json()) as { message?: string };
          if (payload.message) {
            message = payload.message;
          }
        } catch {
          // keep default
        }
        toast.error(message);
        setPreviewUrl(imageUrl);
        return;
      }

      toast.success("Foto profil berhasil diunggah.");
      router.refresh();
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setPreviewUrl(URL.createObjectURL(file));
    uploadFile(file);
    event.target.value = "";
  };

  const handleRemove = () => {
    void runRemove(async () => {
      const result = await removeProfileAvatarAction(initialAdminActionState);

      if (result.status === "success") {
        toast.success(result.message);
        setPreviewUrl(null);
        router.refresh();
        return;
      }

      if (result.status === "error") {
        toast.error(result.message);
      }
    });
  };

  const isBusy = isUploading || isRemoving;

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
      <div className="relative w-fit shrink-0">
        <Avatar className="size-24 rounded-2xl bg-blue-50 ring-2 ring-slate-100">
          <AvatarImage src={previewUrl ?? undefined} alt={name} className="object-cover" />
          <AvatarFallback className="rounded-2xl bg-blue-50 text-lg text-blue-700">{getInitials(name)}</AvatarFallback>
        </Avatar>
        <button
          type="button"
          className="absolute right-0 bottom-0 flex size-8 items-center justify-center rounded-full border-2 border-white bg-blue-600 text-white shadow-sm"
          disabled={isBusy}
          onClick={() => fileInputRef.current?.click()}
          aria-label="Unggah foto profil"
        >
          <Camera className="size-3.5" />
        </button>
      </div>

      <div className="space-y-2">
        <p className="font-medium text-slate-950 text-sm">Foto profil</p>
        <p className="max-w-md text-slate-500 text-xs leading-relaxed">
          JPG, PNG, atau WebP. Maksimal 2 MB. Foto ditampilkan di sidebar dan menu akun.
        </p>
        <div className="flex flex-wrap items-center gap-2">
          <input
            ref={fileInputRef}
            type="file"
            name="file"
            accept="image/jpeg,image/png,image/webp"
            className="sr-only"
            onChange={handleFileChange}
            disabled={isBusy}
          />
          <Button
            type="button"
            size="sm"
            variant="outline"
            className="rounded-xl border-blue-200 bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700"
            disabled={isBusy}
            onClick={() => fileInputRef.current?.click()}
          >
            {isUploading ? <Loader2 className="size-4 animate-spin" /> : <Upload className="size-4" />}
            {isUploading ? "Mengunggah…" : "Unggah foto"}
          </Button>
          {previewUrl ? (
            <Button
              type="button"
              size="sm"
              variant="outline"
              className="rounded-xl text-rose-600 hover:text-rose-700"
              disabled={isBusy}
              onClick={handleRemove}
            >
              {isRemoving ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
              Hapus foto
            </Button>
          ) : null}
        </div>
      </div>
    </div>
  );
}
