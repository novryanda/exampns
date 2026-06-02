import { PageHeader, SectionCard } from "@/app/(main)/_components/page-shell";
import {
  getAdminQuestionMetadataOptions,
  getAdminQuestionMetadataSummary,
  getAdminQuestionSubCategories,
  getAdminQuestionTopicTags,
} from "@/server/admin-content-data";

import { MetadataGuideDialog } from "./_components/metadata-guide-dialog";
import { MetadataSoalClient } from "./_components/metadata-soal-client";

function readParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

function readPageParam(value: string | string[] | undefined) {
  const text = readParam(value);
  const parsed = Number(text);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

export default async function MetadataSoalPage({
  searchParams,
}: {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const category = readParam(params.category);
  const subCategoryId = readParam(params.subCategoryId);
  const subCategoryPage = readPageParam(params.subCategoryPage);
  const topicTagPage = readPageParam(params.topicTagPage);
  const categoryFilter = category && category !== "all" ? category : undefined;
  const subCategoryFilter = subCategoryId && subCategoryId !== "all" ? subCategoryId : undefined;

  const [subCategories, topicTags, metadataOptions, summary] = await Promise.all([
    getAdminQuestionSubCategories({
      category: categoryFilter,
      includeInactive: true,
      page: subCategoryPage,
      limit: 10,
    }),
    getAdminQuestionTopicTags({
      category: categoryFilter,
      subCategoryId: subCategoryFilter,
      includeInactive: true,
      page: topicTagPage,
      limit: 10,
    }),
    getAdminQuestionMetadataOptions({
      category: categoryFilter,
    }),
    getAdminQuestionMetadataSummary({
      category: categoryFilter,
    }),
  ]);

  return (
    <div className="flex min-w-0 w-full max-w-full flex-col gap-6">
      <PageHeader
        title="Metadata Soal"
        description="Kelola master sub-kategori dan topik tag untuk dipakai di bank soal dan tinjau parsing."
        actions={<MetadataGuideDialog />}
      />

      <MetadataSoalClient
        initialCategory={categoryFilter}
        initialSubCategoryId={subCategoryFilter}
        initialSubCategories={subCategories}
        initialTopicTags={topicTags}
        initialMetadataOptions={metadataOptions}
        initialSummary={summary}
      />
    </div>
  );
}
