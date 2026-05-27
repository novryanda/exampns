"use client";

import { useActionState, useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";

import { useRouter } from "next/navigation";

import { Ban, CheckCircle2, Pencil } from "lucide-react";
import { toast } from "sonner";

import { StatusBadge } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { ServerPagination } from "@/components/server-pagination";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type ClientPaginatedResponse, fetchAdminData } from "@/lib/admin-data-client";
import { initialResourceActionState } from "@/server/admin-action-state";
import {
  createQuestionSubCategoryAction,
  createQuestionTopicTagAction,
  toggleQuestionSubCategoryStatusAction,
  toggleQuestionTopicTagStatusAction,
  updateQuestionSubCategoryAction,
  updateQuestionTopicTagAction,
} from "@/server/admin-content-actions";
import type { QuestionSubCategoryItem, QuestionTopicTagItem } from "@/server/admin-content-data";

function useResourceToast(state: { status: string; message: string }, onSuccess?: () => void) {
  const lastHandledStateRef = useRef(state);

  useEffect(() => {
    if (lastHandledStateRef.current === state) {
      return;
    }

    lastHandledStateRef.current = state;

    if (state.status === "success") {
      toast.success(state.message);
      onSuccess?.();
      return;
    }

    if (state.status === "error") {
      toast.error(state.message);
    }
  }, [onSuccess, state]);
}

function MetadataStatusBadge({ isActive }: { readonly isActive: boolean }) {
  return <StatusBadge tone={isActive ? "success" : "warning"}>{isActive ? "Aktif" : "Nonaktif"}</StatusBadge>;
}

function SubCategoryStatusButton({
  item,
  onStatusChanged,
}: {
  readonly item: QuestionSubCategoryItem;
  readonly onStatusChanged?: (isActive: boolean) => void;
}) {
  const router = useRouter();
  const handleSuccess = useCallback(() => {
    onStatusChanged?.(!item.isActive);
    router.refresh();
  }, [item.isActive, onStatusChanged, router]);
  const [state, formAction, isPending] = useActionState(
    toggleQuestionSubCategoryStatusAction,
    initialResourceActionState,
  );
  useResourceToast(state, handleSuccess);

  const nextActiveState = !item.isActive;

  return (
    <form action={formAction}>
      <input type="hidden" name="subCategoryId" value={item.id} />
      <input type="hidden" name="isActive" value={String(nextActiveState)} />
      <Button
        type="submit"
        variant="outline"
        size="sm"
        className={
          nextActiveState
            ? "rounded-lg border-emerald-200 text-emerald-600 hover:bg-emerald-50"
            : "rounded-lg border-rose-200 text-rose-600 hover:bg-rose-50"
        }
        disabled={isPending}
      >
        {nextActiveState ? <CheckCircle2 className="mr-1 size-4" /> : <Ban className="mr-1 size-4" />}
        {isPending ? "Memproses..." : nextActiveState ? "Aktifkan" : "Nonaktifkan"}
      </Button>
    </form>
  );
}

function TopicTagStatusButton({
  item,
  onStatusChanged,
}: {
  readonly item: QuestionTopicTagItem;
  readonly onStatusChanged?: (isActive: boolean) => void;
}) {
  const router = useRouter();
  const handleSuccess = useCallback(() => {
    onStatusChanged?.(!item.isActive);
    router.refresh();
  }, [item.isActive, onStatusChanged, router]);
  const [state, formAction, isPending] = useActionState(toggleQuestionTopicTagStatusAction, initialResourceActionState);
  useResourceToast(state, handleSuccess);

  const nextActiveState = !item.isActive;

  return (
    <form action={formAction}>
      <input type="hidden" name="topicTagId" value={item.id} />
      <input type="hidden" name="isActive" value={String(nextActiveState)} />
      <Button
        type="submit"
        variant="outline"
        size="sm"
        className={
          nextActiveState
            ? "rounded-lg border-emerald-200 text-emerald-600 hover:bg-emerald-50"
            : "rounded-lg border-rose-200 text-rose-600 hover:bg-rose-50"
        }
        disabled={isPending}
      >
        {nextActiveState ? <CheckCircle2 className="mr-1 size-4" /> : <Ban className="mr-1 size-4" />}
        {isPending ? "Memproses..." : nextActiveState ? "Aktifkan" : "Nonaktifkan"}
      </Button>
    </form>
  );
}

function CreateSubCategoryForm() {
  const router = useRouter();
  const handleSuccess = useCallback(() => {
    router.refresh();
  }, [router]);
  const [state, formAction, isPending] = useActionState(createQuestionSubCategoryAction, initialResourceActionState);
  useResourceToast(state, handleSuccess);

  return (
    <form action={formAction} className="grid gap-3 rounded-2xl border border-slate-100 p-4 md:grid-cols-[140px_1fr_auto]">
      <NativeSelect name="category" className="w-full rounded-xl border-slate-200 bg-white" defaultValue="TWK">
        <NativeSelectOption value="TWK">TWK</NativeSelectOption>
        <NativeSelectOption value="TIU">TIU</NativeSelectOption>
        <NativeSelectOption value="TKP">TKP</NativeSelectOption>
      </NativeSelect>
      <Input name="name" placeholder="Nama sub-kategori" className="rounded-xl border-slate-200" required />
      <Button type="submit" className="rounded-xl bg-blue-600 hover:bg-blue-700" disabled={isPending}>
        {isPending ? "Menyimpan..." : "Tambah"}
      </Button>
    </form>
  );
}

function EditSubCategoryDialog({ item }: { readonly item: QuestionSubCategoryItem }) {
  const router = useRouter();
  const handleSuccess = useCallback(() => {
    router.refresh();
  }, [router]);
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(updateQuestionSubCategoryAction, initialResourceActionState);
  useResourceToast(state, handleSuccess);

  useEffect(() => {
    if (state.status === "success") {
      setOpen(false);
    }
  }, [state.status]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-lg">
          <Pencil className="mr-1 size-4" />
          Ubah
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ubah sub-kategori</DialogTitle>
          <DialogDescription>Ubah nama sub-kategori tanpa mengubah data lain di tabel utama.</DialogDescription>
        </DialogHeader>
        <form action={formAction} className="grid gap-4">
          <input type="hidden" name="subCategoryId" value={item.id} />
          <div className="grid gap-2">
            <Label htmlFor={`sub-category-name-${item.id}`}>Nama</Label>
            <Input
              id={`sub-category-name-${item.id}`}
              name="name"
              defaultValue={item.name}
              className="rounded-xl border-slate-200"
              required
            />
          </div>
          <div className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2">
            <div>
              <p className="font-medium text-sm text-slate-900">Kategori</p>
              <p className="text-sm text-slate-500">{item.category}</p>
            </div>
            <MetadataStatusBadge isActive={item.isActive} />
          </div>
          <Button type="submit" className="rounded-xl bg-blue-600 hover:bg-blue-700" disabled={isPending}>
            {isPending ? "Menyimpan..." : "Simpan perubahan"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function CreateTopicTagForm({
  subCategories,
}: {
  readonly subCategories: QuestionSubCategoryItem[];
}) {
  const router = useRouter();
  const handleSuccess = useCallback(() => {
    router.refresh();
  }, [router]);
  const [state, formAction, isPending] = useActionState(createQuestionTopicTagAction, initialResourceActionState);
  useResourceToast(state, handleSuccess);

  return (
    <form
      action={formAction}
      className="grid gap-3 rounded-2xl border border-slate-100 p-4 md:grid-cols-[220px_1fr_auto]"
    >
      <NativeSelect
        name="subCategoryId"
        className="w-full rounded-xl border-slate-200 bg-white"
        defaultValue={subCategories[0]?.id ?? ""}
        required
      >
        {subCategories.length === 0 ? <NativeSelectOption value="">Belum ada sub-kategori</NativeSelectOption> : null}
        {subCategories.map((item) => (
          <NativeSelectOption key={item.id} value={item.id}>
            {item.category} - {item.name}
          </NativeSelectOption>
        ))}
      </NativeSelect>
      <Input name="name" placeholder="Nama topik tag" className="rounded-xl border-slate-200" required />
      <Button type="submit" className="rounded-xl bg-blue-600 hover:bg-blue-700" disabled={isPending}>
        {isPending ? "Menyimpan..." : "Tambah"}
      </Button>
    </form>
  );
}

function EditTopicTagDialog({
  item,
  subCategories,
}: {
  readonly item: QuestionTopicTagItem;
  readonly subCategories: QuestionSubCategoryItem[];
}) {
  const router = useRouter();
  const handleSuccess = useCallback(() => {
    router.refresh();
  }, [router]);
  const [open, setOpen] = useState(false);
  const [state, formAction, isPending] = useActionState(updateQuestionTopicTagAction, initialResourceActionState);
  useResourceToast(state, handleSuccess);

  useEffect(() => {
    if (state.status === "success") {
      setOpen(false);
    }
  }, [state.status]);

  const editableSubCategories = subCategories.filter((subCategory) => subCategory.isActive || subCategory.id === item.subCategoryId);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="rounded-lg">
          <Pencil className="mr-1 size-4" />
          Ubah
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Ubah topik tag</DialogTitle>
          <DialogDescription>Perbarui topik tag tanpa mengubah tampilan tabel utama.</DialogDescription>
        </DialogHeader>
        <form action={formAction} className="grid gap-4">
          <input type="hidden" name="topicTagId" value={item.id} />
          <div className="grid gap-2">
            <Label htmlFor={`topic-tag-sub-category-${item.id}`}>Sub-kategori</Label>
            <NativeSelect
              id={`topic-tag-sub-category-${item.id}`}
              name="subCategoryId"
              defaultValue={item.subCategoryId}
              className="w-full rounded-xl border-slate-200 bg-white"
              required
            >
              {editableSubCategories.map((subCategory) => (
                <NativeSelectOption key={subCategory.id} value={subCategory.id}>
                  {subCategory.category} - {subCategory.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`topic-tag-name-${item.id}`}>Nama</Label>
            <Input id={`topic-tag-name-${item.id}`} name="name" defaultValue={item.name} className="rounded-xl border-slate-200" required />
          </div>
          <div className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2">
            <div>
              <p className="font-medium text-sm text-slate-900">Status saat ini</p>
              <p className="text-sm text-slate-500">{item.category} - {item.subCategory}</p>
            </div>
            <MetadataStatusBadge isActive={item.isActive} />
          </div>
          <Button type="submit" className="rounded-xl bg-blue-600 hover:bg-blue-700" disabled={isPending}>
            {isPending ? "Menyimpan..." : "Simpan perubahan"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function SubCategoryRow({
  item,
  onStatusChanged,
}: {
  readonly item: QuestionSubCategoryItem;
  readonly onStatusChanged?: (itemId: string, isActive: boolean) => void;
}) {
  return (
    <TableRow>
      <TableCell>{item.category}</TableCell>
      <TableCell>
        <div className="space-y-2">
          <div className="font-medium text-slate-950">{item.name}</div>
          <MetadataStatusBadge isActive={item.isActive} />
        </div>
      </TableCell>
      <TableCell>{item.topicTagCount}</TableCell>
      <TableCell>{item.questionCount}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <EditSubCategoryDialog item={item} />
          <SubCategoryStatusButton
            item={item}
            onStatusChanged={(isActive) => onStatusChanged?.(item.id, isActive)}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}

function TopicTagRow({
  item,
  subCategories,
  onStatusChanged,
}: {
  readonly item: QuestionTopicTagItem;
  readonly subCategories: QuestionSubCategoryItem[];
  readonly onStatusChanged?: (itemId: string, isActive: boolean) => void;
}) {
  return (
    <TableRow>
      <TableCell>{item.category}</TableCell>
      <TableCell>{item.subCategory}</TableCell>
      <TableCell>
        <div className="space-y-2">
          <div className="font-medium text-slate-950">{item.name}</div>
          <MetadataStatusBadge isActive={item.isActive} />
        </div>
      </TableCell>
      <TableCell>{item.questionCount}</TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <EditTopicTagDialog item={item} subCategories={subCategories} />
          <TopicTagStatusButton
            item={item}
            onStatusChanged={(isActive) => onStatusChanged?.(item.id, isActive)}
          />
        </div>
      </TableCell>
    </TableRow>
  );
}

export function MetadataManager({
  subCategories,
  allSubCategories,
  topicTags,
  subCategoryPage,
  subCategoryTotalPages,
  topicTagPage,
  topicTagTotalPages,
  paginationParams,
}: {
  readonly subCategories: QuestionSubCategoryItem[];
  readonly allSubCategories: QuestionSubCategoryItem[];
  readonly topicTags: QuestionTopicTagItem[];
  readonly subCategoryPage: number;
  readonly subCategoryTotalPages: number;
  readonly topicTagPage: number;
  readonly topicTagTotalPages: number;
  readonly paginationParams: Record<string, string | undefined>;
}) {
  const [subCategoryRows, setSubCategoryRows] = useState(subCategories);
  const [topicTagRows, setTopicTagRows] = useState(topicTags);
  const [allKnownSubCategories, setAllKnownSubCategories] = useState(allSubCategories);
  const [subCategoryPageState, setSubCategoryPageState] = useState(subCategoryPage);
  const [subCategoryTotalPagesState, setSubCategoryTotalPagesState] = useState(subCategoryTotalPages);
  const [topicTagPageState, setTopicTagPageState] = useState(topicTagPage);
  const [topicTagTotalPagesState, setTopicTagTotalPagesState] = useState(topicTagTotalPages);
  const [, startTransition] = useTransition();

  useEffect(() => {
    setSubCategoryRows(subCategories);
  }, [subCategories]);

  useEffect(() => {
    setTopicTagRows(topicTags);
  }, [topicTags]);

  useEffect(() => {
    setAllKnownSubCategories(allSubCategories);
  }, [allSubCategories]);

  useEffect(() => {
    setSubCategoryPageState(subCategoryPage);
    setSubCategoryTotalPagesState(subCategoryTotalPages);
  }, [subCategoryPage, subCategoryTotalPages]);

  useEffect(() => {
    setTopicTagPageState(topicTagPage);
    setTopicTagTotalPagesState(topicTagTotalPages);
  }, [topicTagPage, topicTagTotalPages]);

  const metadataFilters = useMemo(
    () => ({
      category:
        paginationParams.category && paginationParams.category !== "all" ? paginationParams.category : undefined,
      subCategoryId:
        paginationParams.subCategoryId && paginationParams.subCategoryId !== "all"
          ? paginationParams.subCategoryId
          : undefined,
    }),
    [paginationParams.category, paginationParams.subCategoryId],
  );

  const mergeSubCategories = (items: QuestionSubCategoryItem[]) => {
    setAllKnownSubCategories((current) => {
      const map = new Map(current.map((item) => [item.id, item]));

      for (const item of items) {
        map.set(item.id, item);
      }

      return [...map.values()].sort((left, right) => left.name.localeCompare(right.name, "id-ID"));
    });
  };

  const mergeTopicTagSubCategoryRefs = (items: QuestionTopicTagItem[]) => {
    setAllKnownSubCategories((current) => {
      const map = new Map(current.map((item) => [item.id, item]));

      for (const item of items) {
        if (!map.has(item.subCategoryId)) {
          map.set(item.subCategoryId, {
            id: item.subCategoryId,
            category: item.category,
            name: item.subCategory,
            slug: "",
            isActive: false,
            sortOrder: 0,
            topicTagCount: 0,
            questionCount: 0,
          });
        }
      }

      return [...map.values()].sort((left, right) => left.name.localeCompare(right.name, "id-ID"));
    });
  };

  const buildPageHref = (nextSubCategoryPage: number, nextTopicTagPage: number) => {
    const searchParams = new URLSearchParams();

    for (const [key, value] of Object.entries(paginationParams)) {
      if (!value || key === "subCategoryPage" || key === "topicTagPage") {
        continue;
      }

      searchParams.set(key, value);
    }

    if (nextSubCategoryPage > 1) {
      searchParams.set("subCategoryPage", String(nextSubCategoryPage));
    }

    if (nextTopicTagPage > 1) {
      searchParams.set("topicTagPage", String(nextTopicTagPage));
    }

    const query = searchParams.toString();
    return query ? `/admin/metadata-soal?${query}` : "/admin/metadata-soal";
  };

  const loadSubCategoryPage = (page: number) => {
    startTransition(async () => {
      try {
        const response = await fetchAdminData<ClientPaginatedResponse<QuestionSubCategoryItem[]>>(
          "question-metadata/sub-categories",
          {
            category: metadataFilters.category,
            includeInactive: true,
            page,
            limit: 10,
          },
        );

        setSubCategoryRows(response.data);
        setSubCategoryPageState(response.meta.page);
        setSubCategoryTotalPagesState(response.meta.totalPages);
        mergeSubCategories(response.data);
        window.history.replaceState(null, "", buildPageHref(response.meta.page, topicTagPageState));
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Gagal memuat sub-kategori.");
      }
    });
  };

  const loadTopicTagPage = (page: number) => {
    startTransition(async () => {
      try {
        const response = await fetchAdminData<ClientPaginatedResponse<QuestionTopicTagItem[]>>(
          "question-metadata/topic-tags",
          {
            category: metadataFilters.category,
            subCategoryId: metadataFilters.subCategoryId,
            includeInactive: true,
            page,
            limit: 10,
          },
        );

        setTopicTagRows(response.data);
        setTopicTagPageState(response.meta.page);
        setTopicTagTotalPagesState(response.meta.totalPages);
        mergeTopicTagSubCategoryRefs(response.data);
        window.history.replaceState(null, "", buildPageHref(subCategoryPageState, response.meta.page));
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Gagal memuat topik tag.");
      }
    });
  };

  const handleSubCategoryStatusChanged = (itemId: string, isActive: boolean) => {
    setSubCategoryRows((current) =>
      current.map((item) => (item.id === itemId ? { ...item, isActive } : item)),
    );
    setAllKnownSubCategories((current) =>
      current.map((item) => (item.id === itemId ? { ...item, isActive } : item)),
    );
  };

  const handleTopicTagStatusChanged = (itemId: string, isActive: boolean) => {
    setTopicTagRows((current) =>
      current.map((item) => (item.id === itemId ? { ...item, isActive } : item)),
    );
  };

  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <div className="space-y-1">
          <Label>Tambah Sub-kategori</Label>
          <p className="text-sm text-slate-500">Tambahkan area materi baru per kategori.</p>
        </div>
        <CreateSubCategoryForm />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kategori</TableHead>
            <TableHead>Sub-kategori</TableHead>
            <TableHead>Topik Tag</TableHead>
            <TableHead>Soal</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subCategoryRows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="py-10 text-center text-slate-400">
                Belum ada sub-kategori pada filter ini.
              </TableCell>
            </TableRow>
          ) : (
            subCategoryRows.map((item) => (
              <SubCategoryRow
                key={item.id}
                item={item}
                onStatusChanged={handleSubCategoryStatusChanged}
              />
            ))
          )}
        </TableBody>
      </Table>
      <ServerPagination
        page={subCategoryPageState}
        totalPages={subCategoryTotalPagesState}
        params={paginationParams}
        pageParam="subCategoryPage"
        basePath="/admin/metadata-soal"
        onPageChange={loadSubCategoryPage}
      />

      <div className="grid gap-3">
        <div className="space-y-1">
          <Label>Tambah Topik Tag</Label>
          <p className="text-sm text-slate-500">Topik tag selalu berada di bawah satu sub-kategori aktif.</p>
        </div>
        <CreateTopicTagForm subCategories={allKnownSubCategories.filter((item) => item.isActive)} />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Kategori</TableHead>
            <TableHead>Sub-kategori</TableHead>
            <TableHead>Topik Tag</TableHead>
            <TableHead>Soal</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {topicTagRows.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="py-10 text-center text-slate-400">
                Belum ada topik tag pada filter ini.
              </TableCell>
            </TableRow>
          ) : (
            topicTagRows.map((item) => (
              <TopicTagRow
                key={item.id}
                item={item}
                subCategories={allKnownSubCategories}
                onStatusChanged={handleTopicTagStatusChanged}
              />
            ))
          )}
        </TableBody>
      </Table>
      <ServerPagination
        page={topicTagPageState}
        totalPages={topicTagTotalPagesState}
        params={paginationParams}
        pageParam="topicTagPage"
        basePath="/admin/metadata-soal"
        onPageChange={loadTopicTagPage}
      />
    </div>
  );
}
