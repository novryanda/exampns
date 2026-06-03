"use client";

import { useActionState, useCallback, useEffect, useMemo, useRef, useState, useTransition } from "react";

import { useRouter } from "next/navigation";

import { Ban, CheckCircle2, Pencil, Plus, Search } from "lucide-react";
import { toast } from "sonner";

import { SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ItemCombobox } from "@/components/ui/item-combobox";
import { Label } from "@/components/ui/label";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
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
import type {
  QuestionCategorySummary,
  QuestionSubCategoryItem,
  QuestionTopicTagItem,
} from "@/server/admin-content-data";

import { MetadataTablePagination } from "./metadata-table-pagination";
import { TopicTagQuestionsSheet } from "./topic-tag-questions-sheet";

const PAGE_LIMIT = 10;

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

function CreateSubCategoryDialog({ categories }: { readonly categories: QuestionCategorySummary[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleSuccess = useCallback(() => {
    router.refresh();
  }, [router]);
  const [state, formAction, isPending] = useActionState(createQuestionSubCategoryAction, initialResourceActionState);
  useResourceToast(state, handleSuccess);

  useEffect(() => {
    if (state.status === "success") {
      setOpen(false);
    }
  }, [state.status]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="rounded-xl bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-1 size-4" />
          Tambah Sub-kategori
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tambah sub-kategori</DialogTitle>
          <DialogDescription>Buat area materi baru di dalam kategori yang aktif.</DialogDescription>
        </DialogHeader>
        <form action={formAction} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="create-sub-category-category">Kategori</Label>
            <NativeSelect
              id="create-sub-category-category"
              name="category"
              className="w-full rounded-xl border-slate-200 bg-white"
              defaultValue={categories[0]?.code ?? ""}
            >
              {categories.map((category) => (
                <NativeSelectOption key={category.code} value={category.code}>
                  {category.name}
                </NativeSelectOption>
              ))}
            </NativeSelect>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="create-sub-category-name">Nama sub-kategori</Label>
            <Input
              id="create-sub-category-name"
              name="name"
              placeholder="Contoh: Kebangsaan"
              className="rounded-xl border-slate-200"
              required
            />
          </div>
          <Button type="submit" className="rounded-xl bg-blue-600 hover:bg-blue-700" disabled={isPending}>
            {isPending ? "Menyimpan..." : "Simpan sub-kategori"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
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
              <p className="font-medium text-slate-900 text-sm">Kategori</p>
              <p className="text-slate-500 text-sm">{item.category}</p>
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

function CreateTopicTagDialog({ subCategories }: { readonly subCategories: QuestionSubCategoryItem[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleSuccess = useCallback(() => {
    router.refresh();
  }, [router]);
  const [state, formAction, isPending] = useActionState(createQuestionTopicTagAction, initialResourceActionState);
  const [subCategoryId, setSubCategoryId] = useState(subCategories[0]?.id ?? "");
  useResourceToast(state, handleSuccess);

  useEffect(() => {
    if (state.status === "success") {
      setOpen(false);
    }
  }, [state.status]);

  useEffect(() => {
    if (subCategories.some((item) => item.id === subCategoryId)) {
      return;
    }

    setSubCategoryId(subCategories[0]?.id ?? "");
  }, [subCategories, subCategoryId]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="rounded-xl bg-blue-600 hover:bg-blue-700" disabled={subCategories.length === 0}>
          <Plus className="mr-1 size-4" />
          Tambah Topik Tag
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Tambah topik tag</DialogTitle>
          <DialogDescription>Topik tag selalu berada di bawah satu sub-kategori aktif.</DialogDescription>
        </DialogHeader>
        <form action={formAction} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="create-topic-tag-sub-category">Sub-kategori</Label>
            <ItemCombobox
              id="create-topic-tag-sub-category"
              name="subCategoryId"
              value={subCategoryId}
              onValueChange={setSubCategoryId}
              placeholder="Cari sub-kategori..."
              emptyMessage="Sub-kategori tidak ditemukan."
              disabled={subCategories.length === 0}
              required
              options={subCategories.map((item) => ({
                value: item.id,
                label: `${item.category} - ${item.name}`,
              }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="create-topic-tag-name">Nama topik tag</Label>
            <Input
              id="create-topic-tag-name"
              name="name"
              placeholder="Contoh: Etika Kebangsaan, Media Sosial"
              className="rounded-xl border-slate-200"
              required
            />
          </div>
          <Button
            type="submit"
            className="rounded-xl bg-blue-600 hover:bg-blue-700"
            disabled={isPending || subCategories.length === 0}
          >
            {isPending ? "Menyimpan..." : "Simpan topik tag"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
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

  const editableSubCategories = subCategories.filter(
    (subCategory) => subCategory.isActive || subCategory.id === item.subCategoryId,
  );
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(item.subCategoryId);

  useEffect(() => {
    if (editableSubCategories.some((subCategory) => subCategory.id === selectedSubCategoryId)) {
      return;
    }

    setSelectedSubCategoryId(item.subCategoryId);
  }, [editableSubCategories, item.subCategoryId, selectedSubCategoryId]);

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
            <ItemCombobox
              id={`topic-tag-sub-category-${item.id}`}
              name="subCategoryId"
              value={selectedSubCategoryId}
              onValueChange={setSelectedSubCategoryId}
              placeholder="Cari sub-kategori..."
              emptyMessage="Sub-kategori tidak ditemukan."
              required
              options={editableSubCategories.map((subCategory) => ({
                value: subCategory.id,
                label: `${subCategory.category} - ${subCategory.name}`,
              }))}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor={`topic-tag-name-${item.id}`}>Nama</Label>
            <Input
              id={`topic-tag-name-${item.id}`}
              name="name"
              defaultValue={item.name}
              className="rounded-xl border-slate-200"
              required
            />
          </div>
          <div className="flex items-center justify-between rounded-xl border border-slate-200 px-3 py-2">
            <div>
              <p className="font-medium text-slate-900 text-sm">Status saat ini</p>
              <p className="text-slate-500 text-sm">
                {item.category} - {item.subCategory}
              </p>
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
      <TableCell className="font-medium text-slate-700">{item.category}</TableCell>
      <TableCell className="font-medium text-slate-950">{item.name}</TableCell>
      <TableCell>{item.topicTagCount}</TableCell>
      <TableCell>{item.questionCount}</TableCell>
      <TableCell>
        <MetadataStatusBadge isActive={item.isActive} />
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <EditSubCategoryDialog item={item} />
          <SubCategoryStatusButton item={item} onStatusChanged={(isActive) => onStatusChanged?.(item.id, isActive)} />
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
      <TableCell className="text-slate-700">{item.subCategory}</TableCell>
      <TableCell className="font-medium text-slate-950">{item.name}</TableCell>
      <TableCell>{item.questionCount}</TableCell>
      <TableCell>
        <MetadataStatusBadge isActive={item.isActive} />
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          <TopicTagQuestionsSheet item={item} />
          <EditTopicTagDialog item={item} subCategories={subCategories} />
          <TopicTagStatusButton item={item} onStatusChanged={(isActive) => onStatusChanged?.(item.id, isActive)} />
        </div>
      </TableCell>
    </TableRow>
  );
}

export function MetadataManager({
  categories,
  subCategories,
  allSubCategories,
  topicTags,
  subCategoryPage,
  subCategoryTotalPages,
  subCategoryTotalItems,
  topicTagPage,
  topicTagTotalPages,
  topicTagTotalItems,
  paginationParams,
}: {
  readonly categories: QuestionCategorySummary[];
  readonly subCategories: QuestionSubCategoryItem[];
  readonly allSubCategories: QuestionSubCategoryItem[];
  readonly topicTags: QuestionTopicTagItem[];
  readonly subCategoryPage: number;
  readonly subCategoryTotalPages: number;
  readonly subCategoryTotalItems: number;
  readonly topicTagPage: number;
  readonly topicTagTotalPages: number;
  readonly topicTagTotalItems: number;
  readonly paginationParams: Record<string, string | undefined>;
}) {
  const [subCategoryRows, setSubCategoryRows] = useState(subCategories);
  const [topicTagRows, setTopicTagRows] = useState(topicTags);
  const [allKnownSubCategories, setAllKnownSubCategories] = useState(allSubCategories);
  const [subCategoryPageState, setSubCategoryPageState] = useState(subCategoryPage);
  const [subCategoryTotalPagesState, setSubCategoryTotalPagesState] = useState(subCategoryTotalPages);
  const [subCategoryTotalItemsState, setSubCategoryTotalItemsState] = useState(subCategoryTotalItems);
  const [topicTagPageState, setTopicTagPageState] = useState(topicTagPage);
  const [topicTagTotalPagesState, setTopicTagTotalPagesState] = useState(topicTagTotalPages);
  const [topicTagTotalItemsState, setTopicTagTotalItemsState] = useState(topicTagTotalItems);
  const [subCategoryTableCategory, setSubCategoryTableCategory] = useState(paginationParams.category ?? "all");
  const [subCategorySearchInput, setSubCategorySearchInput] = useState("");
  const [appliedSubCategorySearch, setAppliedSubCategorySearch] = useState<string | undefined>(undefined);
  const [topicTagSubCategoryFilter, setTopicTagSubCategoryFilter] = useState(paginationParams.subCategoryId ?? "all");
  const [topicTagSearchInput, setTopicTagSearchInput] = useState("");
  const [appliedTopicTagSearch, setAppliedTopicTagSearch] = useState<string | undefined>(undefined);
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
    setSubCategoryTotalItemsState(subCategoryTotalItems);
  }, [subCategoryPage, subCategoryTotalItems, subCategoryTotalPages]);

  useEffect(() => {
    setTopicTagPageState(topicTagPage);
    setTopicTagTotalPagesState(topicTagTotalPages);
    setTopicTagTotalItemsState(topicTagTotalItems);
  }, [topicTagPage, topicTagTotalItems, topicTagTotalPages]);

  useEffect(() => {
    setSubCategoryTableCategory(paginationParams.category ?? "all");
    setTopicTagSubCategoryFilter(paginationParams.subCategoryId ?? "all");
  }, [paginationParams.category, paginationParams.subCategoryId]);

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

  const resolveSubCategoryCategory = (tableCategory = subCategoryTableCategory) =>
    tableCategory !== "all" ? tableCategory : metadataFilters.category;

  const resolveTopicTagSubCategoryId = (tableSubCategoryId = topicTagSubCategoryFilter) =>
    tableSubCategoryId !== "all" ? tableSubCategoryId : metadataFilters.subCategoryId;

  const loadSubCategoryPage = (
    page: number,
    search = appliedSubCategorySearch,
    tableCategory = subCategoryTableCategory,
  ) => {
    startTransition(async () => {
      try {
        const response = await fetchAdminData<ClientPaginatedResponse<QuestionSubCategoryItem[]>>(
          "question-metadata/sub-categories",
          {
            category: resolveSubCategoryCategory(tableCategory),
            search,
            includeInactive: true,
            page,
            limit: PAGE_LIMIT,
          },
        );

        setSubCategoryRows(response.data);
        setSubCategoryPageState(response.meta.page);
        setSubCategoryTotalPagesState(response.meta.totalPages);
        setSubCategoryTotalItemsState(response.meta.totalItems);
        mergeSubCategories(response.data);
        window.history.replaceState(null, "", buildPageHref(response.meta.page, topicTagPageState));
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Gagal memuat sub-kategori.");
      }
    });
  };

  const loadTopicTagPage = (
    page: number,
    search = appliedTopicTagSearch,
    tableSubCategoryId = topicTagSubCategoryFilter,
  ) => {
    startTransition(async () => {
      try {
        const response = await fetchAdminData<ClientPaginatedResponse<QuestionTopicTagItem[]>>(
          "question-metadata/topic-tags",
          {
            category: metadataFilters.category,
            subCategoryId: resolveTopicTagSubCategoryId(tableSubCategoryId),
            search,
            includeInactive: true,
            page,
            limit: PAGE_LIMIT,
          },
        );

        setTopicTagRows(response.data);
        setTopicTagPageState(response.meta.page);
        setTopicTagTotalPagesState(response.meta.totalPages);
        setTopicTagTotalItemsState(response.meta.totalItems);
        mergeTopicTagSubCategoryRefs(response.data);
        window.history.replaceState(null, "", buildPageHref(subCategoryPageState, response.meta.page));
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Gagal memuat topik tag.");
      }
    });
  };

  useEffect(() => {
    const normalizedSearch = subCategorySearchInput.trim() || undefined;
    if (normalizedSearch === appliedSubCategorySearch) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setAppliedSubCategorySearch(normalizedSearch);
      loadSubCategoryPage(1, normalizedSearch);
    }, 350);

    return () => {
      window.clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- debounced search reload
  }, [appliedSubCategorySearch, subCategorySearchInput]);

  useEffect(() => {
    const normalizedSearch = topicTagSearchInput.trim() || undefined;
    if (normalizedSearch === appliedTopicTagSearch) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setAppliedTopicTagSearch(normalizedSearch);
      loadTopicTagPage(1, normalizedSearch);
    }, 350);

    return () => {
      window.clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- debounced search reload
  }, [appliedTopicTagSearch, topicTagSearchInput]);

  const handleSubCategoryStatusChanged = (itemId: string, isActive: boolean) => {
    setSubCategoryRows((current) => current.map((item) => (item.id === itemId ? { ...item, isActive } : item)));
    setAllKnownSubCategories((current) => current.map((item) => (item.id === itemId ? { ...item, isActive } : item)));
  };

  const handleTopicTagStatusChanged = (itemId: string, isActive: boolean) => {
    setTopicTagRows((current) => current.map((item) => (item.id === itemId ? { ...item, isActive } : item)));
  };

  const activeSubCategories = allKnownSubCategories.filter((item) => item.isActive);

  return (
    <div className="grid gap-6">
      <SectionCard
        title="Master Metadata (Sub-kategori)"
        description="Kelola sub-kategori per kategori yang tersedia."
        trailing={<CreateSubCategoryDialog categories={categories} />}
        contentClassName="space-y-4"
      >
        <div className="flex flex-wrap items-center gap-2">
          <NativeSelect
            value={subCategoryTableCategory}
            onChange={(event) => {
              const nextCategory = event.target.value;
              setSubCategoryTableCategory(nextCategory);
              loadSubCategoryPage(1, appliedSubCategorySearch, nextCategory);
            }}
            className="w-36 rounded-xl border-slate-200 bg-white"
          >
            <NativeSelectOption value="all">Semua</NativeSelectOption>
            {categories.map((category) => (
              <NativeSelectOption key={category.code} value={category.code}>
                {category.name}
              </NativeSelectOption>
            ))}
          </NativeSelect>
          <div className="relative min-w-[14rem] flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={subCategorySearchInput}
              onChange={(event) => setSubCategorySearchInput(event.target.value)}
              placeholder="Cari sub-kategori..."
              className="rounded-xl border-slate-200 bg-white pl-9"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Kategori</TableHead>
                <TableHead>Sub-kategori</TableHead>
                <TableHead>Topik Tag</TableHead>
                <TableHead>Soal</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {subCategoryRows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="py-10 text-center text-slate-400">
                    Belum ada sub-kategori pada filter ini.
                  </TableCell>
                </TableRow>
              ) : (
                subCategoryRows.map((item) => (
                  <SubCategoryRow key={item.id} item={item} onStatusChanged={handleSubCategoryStatusChanged} />
                ))
              )}
            </TableBody>
          </Table>
        </div>

        <MetadataTablePagination
          page={subCategoryPageState}
          limit={PAGE_LIMIT}
          totalItems={subCategoryTotalItemsState}
          totalPages={subCategoryTotalPagesState}
          unitLabel="sub-kategori"
          params={paginationParams}
          pageParam="subCategoryPage"
          basePath="/admin/metadata-soal"
          onPageChange={(page) => loadSubCategoryPage(page)}
        />
      </SectionCard>

      <SectionCard
        title="Topik Tag"
        description="Kelola label topik di bawah sub-kategori untuk klasifikasi soal."
        trailing={<CreateTopicTagDialog subCategories={activeSubCategories} />}
        contentClassName="space-y-4"
      >
        <div className="flex flex-wrap items-center gap-2">
          <div className="w-full min-w-[14rem] sm:w-72">
            <ItemCombobox
              id="metadata-topic-tag-sub-category-filter"
              value={topicTagSubCategoryFilter}
              onValueChange={(value) => {
                setTopicTagSubCategoryFilter(value);
                loadTopicTagPage(1, appliedTopicTagSearch, value);
              }}
              placeholder="Pilih sub-kategori..."
              emptyMessage="Sub-kategori tidak ditemukan."
              options={[
                { value: "all", label: "Semua Sub-kategori" },
                ...activeSubCategories.map((item) => ({
                  value: item.id,
                  label: `${item.category} - ${item.name}`,
                })),
              ]}
            />
          </div>
          <div className="relative min-w-[14rem] flex-1">
            <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={topicTagSearchInput}
              onChange={(event) => setTopicTagSearchInput(event.target.value)}
              placeholder="Cari topik tag..."
              className="rounded-xl border-slate-200 bg-white pl-9"
            />
          </div>
        </div>

        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sub-kategori</TableHead>
                <TableHead>Topik Tag</TableHead>
                <TableHead>Soal</TableHead>
                <TableHead>Status</TableHead>
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
        </div>

        <MetadataTablePagination
          page={topicTagPageState}
          limit={PAGE_LIMIT}
          totalItems={topicTagTotalItemsState}
          totalPages={topicTagTotalPagesState}
          unitLabel="topik tag"
          params={paginationParams}
          pageParam="topicTagPage"
          basePath="/admin/metadata-soal"
          onPageChange={(page) => loadTopicTagPage(page)}
        />
      </SectionCard>
    </div>
  );
}
