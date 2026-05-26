import Link from "next/link";

import { PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { getAdminParsedQuestions } from "@/server/admin-content-data";

function readParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

function toLabel(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
    .join(" ");
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
    <div className="flex flex-col gap-6">
      <PageHeader title="Review Parsing" description="Review hasil parsing sebelum soal masuk ke bank soal aktif." />

      <div className="flex gap-2">
        {[
          ["pending_review", "Pending Review"],
          ["approved", "Approved"],
          ["rejected", "Rejected"],
        ].map(([value, label]) => {
          const href = new URLSearchParams();
          href.set("status", value);
          if (batchId) href.set("batchId", batchId);
          if (search) href.set("search", search);
          if (category) href.set("category", category);
          return (
            <Link
              key={value}
              href={`/admin/review-parsing?${href.toString()}`}
              className={`rounded-full px-4 py-2 text-sm ${
                status === value ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-700"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </div>

      <form className="flex flex-wrap items-center gap-2">
        <Input
          name="search"
          defaultValue={search}
          placeholder="Cari parsed question"
          className="min-w-72 rounded-xl border-slate-200"
        />
        <Input
          name="batchId"
          defaultValue={batchId}
          placeholder="Filter batch ID"
          className="min-w-56 rounded-xl border-slate-200"
        />
        <Select name="category" defaultValue={category || "all"}>
          <SelectTrigger className="w-40 rounded-xl border-slate-200 bg-white">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Category</SelectItem>
            <SelectItem value="TWK">TWK</SelectItem>
            <SelectItem value="TIU">TIU</SelectItem>
            <SelectItem value="TKP">TKP</SelectItem>
          </SelectContent>
        </Select>
        <input type="hidden" name="status" value={status} />
        <button type="submit" className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm">
          Terapkan
        </button>
      </form>

      <SectionCard title="Queue Parsing" description={`Menampilkan ${parsedQuestions.data.length} item hasil parsing.`}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question Preview</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>TopicTag</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Confidence</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {parsedQuestions.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="py-10 text-center text-slate-400">
                  Tidak ada parsed question untuk filter ini.
                </TableCell>
              </TableRow>
            ) : (
              parsedQuestions.data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="min-w-80 whitespace-normal font-medium text-slate-950">
                    {item.questionPreview}
                  </TableCell>
                  <TableCell>{item.category ?? "-"}</TableCell>
                  <TableCell>{item.topicTag ?? "-"}</TableCell>
                  <TableCell>{item.difficulty ? toLabel(item.difficulty) : "-"}</TableCell>
                  <TableCell>{item.confidenceScore === null ? "-" : `${item.confidenceScore}%`}</TableCell>
                  <TableCell>
                    <StatusBadge
                      tone={item.status === "approved" ? "success" : item.status === "rejected" ? "danger" : "warning"}
                    >
                      {toLabel(item.status)}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>
                    <Link className="text-blue-600 text-sm hover:underline" href={`/admin/review-parsing/${item.id}`}>
                      Review
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </SectionCard>
    </div>
  );
}
