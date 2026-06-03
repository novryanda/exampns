import Link from "next/link";

import { Plus } from "lucide-react";

import { PageHeader } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import {
  getAdminQuestionBankOverview,
  getAdminQuestionMetadataOptions,
  getAdminQuestions,
} from "@/server/admin-content-data";

import { BankSoalManager } from "./_components/bank-soal-manager";

function readParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

function readPageParam(value: string | string[] | undefined) {
  const text = readParam(value);
  const parsed = Number(text);
  return Number.isInteger(parsed) && parsed > 0 ? parsed : 1;
}

export default async function BankSoalPage({
  searchParams,
}: {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const search = readParam(params.search);
  const category = readParam(params.category);
  const subCategoryId = readParam(params.subCategoryId);
  const difficulty = readParam(params.difficulty);
  const status = readParam(params.status);
  const page = readPageParam(params.page);

  const [questions, overview, metadataOptions] = await Promise.all([
    getAdminQuestions({
      search: search || undefined,
      category: category && category !== "all" ? category : undefined,
      subCategoryId: subCategoryId && subCategoryId !== "all" ? subCategoryId : undefined,
      difficulty: difficulty && difficulty !== "all" ? difficulty : undefined,
      status: status && status !== "all" ? status : undefined,
      page,
      limit: 20,
    }),
    getAdminQuestionBankOverview(),
    getAdminQuestionMetadataOptions(),
  ]);

  return (
    <div className="flex min-w-0 w-full max-w-full flex-col gap-6">
      <PageHeader
        title="Bank Soal"
        description="Kelola soal per kategori yang digunakan untuk tryout."
        actions={
          <Button asChild className="rounded-xl bg-blue-600 hover:bg-blue-700">
            <Link href="/admin/bank-soal/new">
              <Plus className="mr-2 size-4" />
              Tambah Soal
            </Link>
          </Button>
        }
      />

      <BankSoalManager
        initialResponse={questions}
        initialOverview={overview}
        initialMetadataOptions={metadataOptions}
        initialFilters={{
          search: search || undefined,
          category: category || undefined,
          subCategoryId: subCategoryId || undefined,
          difficulty: difficulty || undefined,
          status: status || undefined,
        }}
      />
    </div>
  );
}
