"use client";

import { useState } from "react";
import { Expand } from "lucide-react";

import { UserListAvatar } from "@/components/examcpns-admin/user-list-avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function UserDetailPhoto({
  name,
  imageUrl,
}: {
  readonly name: string;
  readonly imageUrl: string | null;
}) {
  const [open, setOpen] = useState(false);

  if (!imageUrl) {
    return (
      <div className="flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50/60 px-6 py-5">
        <UserListAvatar name={name} imageUrl={null} size="lg" />
        <p className="text-center text-slate-500 text-sm">Belum ada foto profil</p>
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50/60 px-6 py-5">
        <DialogTrigger asChild>
          <button
            type="button"
            className="group relative rounded-2xl outline-none ring-offset-2 transition hover:opacity-95 focus-visible:ring-2 focus-visible:ring-blue-500"
            aria-label={`Lihat foto profil ${name}`}
          >
            <UserListAvatar name={name} imageUrl={imageUrl} size="lg" />
            <span className="absolute inset-0 flex items-center justify-center rounded-2xl bg-slate-950/0 transition group-hover:bg-slate-950/25">
              <Expand className="size-6 text-white opacity-0 transition group-hover:opacity-100" />
            </span>
          </button>
        </DialogTrigger>
        <DialogTrigger asChild>
          <Button type="button" variant="outline" size="sm" className="rounded-xl">
            <Expand className="mr-2 size-4" />
            Lihat foto
          </Button>
        </DialogTrigger>
      </div>
      <DialogContent className="max-w-md gap-0 overflow-hidden p-0 sm:max-w-lg">
        <DialogHeader className="border-slate-100 border-b px-4 py-3">
          <DialogTitle className="text-base">Foto profil — {name}</DialogTitle>
        </DialogHeader>
        <div className="bg-slate-50 p-2">
          <img
            src={imageUrl}
            alt={`Foto profil ${name}`}
            className="max-h-[70vh] w-full rounded-lg object-contain"
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
