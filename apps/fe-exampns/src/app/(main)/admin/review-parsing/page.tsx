import { getAdminParsedQuestions } from "@/server/admin-content-data";
import { ReviewParsingManager } from "./_components/review-parsing-manager";

function readParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

export default async function ReviewParsingPage({
  searchParams,
}: {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const status = readParam(params.status) || "pending_review";
  const batchId = readParam(params.batchId);
  const search = readParam(params.search);
  const category = readParam(params.category);

  const parsedQuestions = await getAdminParsedQuestions({
    status: status === "all" ? undefined : status,
    batchId: batchId || undefined,
    search: search || undefined,
    category: category && category !== "all" ? category : undefined,
    limit: 25,
  });

  return (
    <ReviewParsingManager
      initialResponse={parsedQuestions}
      initialFilters={{
        status,
        batchId: batchId || undefined,
        search: search || undefined,
        category: category || undefined,
      }}
    />
  );
}
