"use client";

import { useEffect, useMemo, useState, useTransition } from "react";

import { Filter } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ItemCombobox } from "@/components/ui/item-combobox";
import { NativeSelect, NativeSelectOption } from "@/components/ui/native-select";
import { type ClientPaginatedResponse, fetchAdminData } from "@/lib/admin-data-client";
import type {
  QuestionMetadataOptions,
  QuestionMetadataSummary,
  QuestionSubCategoryItem,
  QuestionTopicTagItem,
} from "@/server/admin-content-data";

import { MetadataKpiCards } from "./metadata-kpi-cards";
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
  const [subCategories, topicTags, metadataOptionsResponse, summaryResponse] = await Promise.all([
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
    fetchAdminData<ClientSuccessResponse<QuestionMetadataSummary>>("question-metadata/summary", {
      category: filters.category,
    }),
  ]);

  return {
    subCategories,
    topicTags,
    metadataOptions: metadataOptionsResponse.data,
    summary: summaryResponse.data,
  };
}

export function MetadataSoalClient({
  initialCategory,
  initialSubCategoryId,
  initialSubCategories,
  initialTopicTags,
  initialMetadataOptions,
  initialSummary,
}: {
  readonly initialCategory?: string;
  readonly initialSubCategoryId?: string;
  readonly initialSubCategories: ClientPaginatedResponse<QuestionSubCategoryItem[]>;
  readonly initialTopicTags: ClientPaginatedResponse<QuestionTopicTagItem[]>;
  readonly initialMetadataOptions: QuestionMetadataOptions;
  readonly initialSummary: QuestionMetadataSummary;
}) {
  const [categoryValue, setCategoryValue] = useState(initialCategory ?? "all");
  const [subCategoryValue, setSubCategoryValue] = useState(initialSubCategoryId ?? "all");
  const [subCategoriesResponse, setSubCategoriesResponse] = useState(initialSubCategories);
  const [topicTagsResponse, setTopicTagsResponse] = useState(initialTopicTags);
  const [metadataOptions, setMetadataOptions] = useState(initialMetadataOptions);
  const [summary, setSummary] = useState(initialSummary);
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
    () => allSubCategories.filter((item) => categoryValue === "all" || item.category === categoryValue),
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
        setSummary(bundle.summary);
        setAppliedFilters(nextFilters);
        window.history.replaceState(null, "", buildMetadataHref(nextFilters));
      } catch (error) {
        toast.error(error instanceof Error ? error.message : "Gagal memuat metadata soal.");
      }
    });
  };

  return (
    <div className="flex min-w-0 w-full max-w-full flex-col gap-6">
      <div className="flex flex-wrap items-center gap-2 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm">
        <NativeSelect
          value={categoryValue}
          onChange={(event) => setCategoryValue(event.target.value)}
          className="w-44 rounded-xl border-slate-200 bg-white"
        >
          <NativeSelectOption value="all">Semua Kategori</NativeSelectOption>
          {metadataOptions.categories.map((category) => (
            <NativeSelectOption key={category.code} value={category.code}>
              {category.name}
            </NativeSelectOption>
          ))}
        </NativeSelect>
        <div className="w-72 min-w-[12rem] flex-1">
          <ItemCombobox
            id="metadata-sub-category-filter"
            value={subCategoryValue}
            onValueChange={setSubCategoryValue}
            placeholder="Cari sub-kategori..."
            emptyMessage="Sub-kategori tidak ditemukan."
            options={[
              { value: "all", label: "Semua Sub-kategori" },
              ...visibleSubCategories.map((item) => ({
                value: item.id,
                label: `${item.category} - ${item.name}`,
              })),
            ]}
          />
        </div>
        <Button
          type="button"
          className="rounded-xl bg-blue-600 hover:bg-blue-700"
          disabled={isPending}
          onClick={handleApply}
        >
          <Filter className="mr-2 size-4" />
          {isPending ? "Memuat..." : "Terapkan"}
        </Button>
      </div>

      <MetadataKpiCards summary={summary} />

      <MetadataManager
        categories={metadataOptions.categories}
        subCategories={subCategoriesResponse.data}
        allSubCategories={allSubCategories}
        topicTags={topicTagsResponse.data}
        subCategoryPage={subCategoriesResponse.meta.page}
        subCategoryTotalPages={subCategoriesResponse.meta.totalPages}
        subCategoryTotalItems={subCategoriesResponse.meta.totalItems}
        topicTagPage={topicTagsResponse.meta.page}
        topicTagTotalPages={topicTagsResponse.meta.totalPages}
        topicTagTotalItems={topicTagsResponse.meta.totalItems}
        paginationParams={{
          category: appliedFilters.category ?? undefined,
          subCategoryId: appliedFilters.subCategoryId ?? undefined,
          subCategoryPage: String(subCategoriesResponse.meta.page),
          topicTagPage: String(topicTagsResponse.meta.page),
        }}
      />
    </div>
  );
}
