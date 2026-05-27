"use client";

import { useEffect, useMemo, useState, useTransition } from "react";

import { toast } from "sonner";

import { SectionCard } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { type ClientPaginatedResponse, fetchAdminData } from "@/lib/admin-data-client";
import type {
  QuestionMetadataOptions,
  QuestionSubCategoryItem,
  QuestionTopicTagItem,
} from "@/server/admin-content-data";

import { MetadataManager } from "./metadata-manager";

interface ClientSuccessResponse<T> {
  success: true;
  data: T;
  message?: string;
}

function buildAllSubCategories(
  subCategories: QuestionSubCategoryItem[],
  topicTags: QuestionTopicTagItem[],
  metadataOptions: QuestionMetadataOptions,
) {
  const filterSubCategories = [
    ...subCategories,
    ...topicTags
      .filter((item) => !subCategories.some((subCategory) => subCategory.id === item.subCategoryId))
      .map((item) => ({
        id: item.subCategoryId,
        category: item.category,
        name: item.subCategory,
        slug: "",
        isActive: false,
        sortOrder: 0,
        topicTagCount: 0,
        questionCount: 0,
      })),
  ];

  return [
    ...metadataOptions.subCategories.map((item) => ({
      id: item.id,
      category: item.category,
      name: item.name,
      slug: "",
      isActive: true,
      sortOrder: 0,
      topicTagCount: 0,
      questionCount: 0,
    })),
    ...filterSubCategories.filter((item) => !metadataOptions.subCategories.some((option) => option.id === item.id)),
  ];
}

function buildMetadataHref(filters: { category?: string; subCategoryId?: string }) {
  const searchParams = new URLSearchParams();

  if (filters.category) {
    searchParams.set("category", filters.category);
  }

  if (filters.subCategoryId) {
    searchParams.set("subCategoryId", filters.subCategoryId);
  }

  const query = searchParams.toString();
  return query ? `/admin/metadata-soal?${query}` : "/admin/metadata-soal";
}

async function fetchMetadataBundle(filters: { category?: string; subCategoryId?: string }) {
  const [subCategories, topicTags, metadataOptionsResponse] = await Promise.all([
    fetchAdminData<ClientPaginatedResponse<QuestionSubCategoryItem[]>>("question-metadata/sub-categories", {
      category: filters.category,
      includeInactive: true,
      page: 1,
      limit: 10,
    }),
    fetchAdminData<ClientPaginatedResponse<QuestionTopicTagItem[]>>("question-metadata/topic-tags", {
      category: filters.category,
      subCategoryId: filters.subCategoryId,
      includeInactive: true,
      page: 1,
      limit: 10,
    }),
    fetchAdminData<ClientSuccessResponse<QuestionMetadataOptions>>("question-metadata/options", {
      category: filters.category,
    }),
  ]);

  return {
    subCategories,
    topicTags,
    metadataOptions: metadataOptionsResponse.data,
  };
}

export function MetadataSoalClient({
  initialCategory,
  initialSubCategoryId,
  initialSubCategories,
  initialTopicTags,
  initialMetadataOptions,
}: {
  readonly initialCategory?: string;
  readonly initialSubCategoryId?: string;
  readonly initialSubCategories: ClientPaginatedResponse<QuestionSubCategoryItem[]>;
  readonly initialTopicTags: ClientPaginatedResponse<QuestionTopicTagItem[]>;
  readonly initialMetadataOptions: QuestionMetadataOptions;
}) {
  const [categoryValue, setCategoryValue] = useState(initialCategory ?? "all");
  const [subCategoryValue, setSubCategoryValue] = useState(initialSubCategoryId ?? "all");
  const [subCategoriesResponse, setSubCategoriesResponse] = useState(initialSubCategories);
  const [topicTagsResponse, setTopicTagsResponse] = useState(initialTopicTags);
  const [metadataOptions, setMetadataOptions] = useState(initialMetadataOptions);
  const [appliedFilters, setAppliedFilters] = useState({
    category: initialCategory,
    subCategoryId: initialSubCategoryId,
  });
  const [isPending, startTransition] = useTransition();

  const allSubCategories = useMemo(
    () => buildAllSubCategories(subCategoriesResponse.data, topicTagsResponse.data, metadataOptions),
    [metadataOptions, subCategoriesResponse.data, topicTagsResponse.data],
  );

  const visibleSubCategories = useMemo(
    () =>
      allSubCategories.filter((item) => categoryValue === "all" || item.category === categoryValue),
    [allSubCategories, categoryValue],
  );

  useEffect(() => {
    if (subCategoryValue === "all") {
      return;
    }

    const exists = visibleSubCategories.some((item) => item.id === subCategoryValue);
    if (!exists) {
      setSubCategoryValue("all");
    }
  }, [subCategoryValue, visibleSubCategories]);

  const handleApply = () => {
    const nextFilters = {
      category: categoryValue !== "all" ? categoryValue : undefined,
      subCategoryId: subCategoryValue !== "all" ? subCategoryValue : undefined,
    };

    startTransition(async () => {
      try {
        const bundle = await fetchMetadataBundle(nextFilters);
        setSubCategoriesResponse(bundle.subCategories);
        setTopicTagsResponse(bundle.topicTags);
        setMetadataOptions(bundle.metadataOptions);
        setAppliedFilters(nextFilters);
        window.history.replaceState(null, "", buildMetadataHref(nextFilters));
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Gagal memuat metadata soal.");
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2">
        <NativeSelect
          value={categoryValue}
          onChange={(event) => setCategoryValue(event.target.value)}
          className="w-44 rounded-xl border-slate-200 bg-white"
        >
          <NativeSelectOption value="all">Semua Kategori</NativeSelectOption>
          <NativeSelectOption value="TWK">TWK</NativeSelectOption>
          <NativeSelectOption value="TIU">TIU</NativeSelectOption>
          <NativeSelectOption value="TKP">TKP</NativeSelectOption>
        </NativeSelect>
        <NativeSelect
          value={subCategoryValue}
          onChange={(event) => setSubCategoryValue(event.target.value)}
          className="w-64 rounded-xl border-slate-200 bg-white"
        >
          <NativeSelectOption value="all">Semua Sub-kategori</NativeSelectOption>
          {visibleSubCategories.map((item) => (
            <NativeSelectOption key={item.id} value={item.id}>
              {item.category} - {item.name}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        <Button
          type="button"
          variant="outline"
          className="rounded-xl border-slate-200 bg-white"
          disabled={isPending}
          onClick={handleApply}
        >
          {isPending ? "Memuat..." : "Terapkan"}
        </Button>
      </div>

      <SectionCard
        title="Master Metadata"
        description={`${subCategoriesResponse.meta.totalItems.toLocaleString("id-ID")} sub-kategori dan ${topicTagsResponse.meta.totalItems.toLocaleString("id-ID")} topik tag pada hasil filter saat ini.`}
      >
        <MetadataManager
          subCategories={subCategoriesResponse.data}
          allSubCategories={allSubCategories}
          topicTags={topicTagsResponse.data}
          subCategoryPage={subCategoriesResponse.meta.page}
          subCategoryTotalPages={subCategoriesResponse.meta.totalPages}
          topicTagPage={topicTagsResponse.meta.page}
          topicTagTotalPages={topicTagsResponse.meta.totalPages}
          paginationParams={{
            category: appliedFilters.category ?? undefined,
            subCategoryId: appliedFilters.subCategoryId ?? undefined,
            subCategoryPage: String(subCategoriesResponse.meta.page),
            topicTagPage: String(topicTagsResponse.meta.page),
          }}
        />
      </SectionCard>
    </div>
  );
}
