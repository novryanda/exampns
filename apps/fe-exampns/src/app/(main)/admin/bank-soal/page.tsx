import Link from "next/link";

import { Pencil, Plus, Trash2 } from "lucide-react";

import { PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { archiveQuestionAction } from "@/server/admin-content-actions";
import { getAdminQuestions } from "@/server/admin-content-data";

function readParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? (value[0] ?? "") : (value ?? "");
}

function formatDateTime(value: string) {
  return new Intl.DateTimeFormat("id-ID", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

function toLabel(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function BankSoalPage({
  searchParams,
}: {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const search = readParam(params.search);
  const category = readParam(params.category);
  const difficulty = readParam(params.difficulty);
  const status = readParam(params.status);

  const questions = await getAdminQuestions({
    search: search || undefined,
    category: category && category !== "all" ? category : undefined,
    difficulty: difficulty && difficulty !== "all" ? difficulty : undefined,
    status: status && status !== "all" ? status : undefined,
    page: 1,
    limit: 25,
  });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Bank Soal"
        description="Kelola soal TWK, TIU, dan TKP yang digunakan untuk tryout."
        actions={
          <Button asChild className="rounded-xl bg-blue-600 hover:bg-blue-700">
            <Link href="/admin/bank-soal/new">
              <Plus className="mr-2 size-4" />
              Tambah Soal
            </Link>
          </Button>
        }
      />

      <form className="flex flex-wrap items-center gap-2">
        <Input
          name="search"
          defaultValue={search}
          placeholder="Cari soal atau topic tag"
          className="min-w-72 rounded-xl border-slate-200"
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
        <Select name="difficulty" defaultValue={difficulty || "all"}>
          <SelectTrigger className="w-40 rounded-xl border-slate-200 bg-white">
            <SelectValue placeholder="Difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Difficulty</SelectItem>
            <SelectItem value="easy">Easy</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="hard">Hard</SelectItem>
          </SelectContent>
        </Select>
        <Select name="status" defaultValue={status || "all"}>
          <SelectTrigger className="w-40 rounded-xl border-slate-200 bg-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit" variant="outline" className="rounded-xl border-slate-200 bg-white">
          Terapkan
        </Button>
      </form>

      <SectionCard
        title="Daftar Soal"
        description={`Menampilkan ${questions.data.length} dari ${questions.meta.totalItems.toLocaleString("id-ID")} soal`}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Question Preview</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>SubCategory</TableHead>
              <TableHead>TopicTag</TableHead>
              <TableHead>Difficulty</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Source</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questions.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="py-10 text-center text-slate-400">
                  Belum ada soal yang cocok dengan filter.
                </TableCell>
              </TableRow>
            ) : (
              questions.data.map((question) => (
                <TableRow key={question.id}>
                  <TableCell className="min-w-80 whitespace-normal font-medium text-slate-950">
                    {question.questionPreview}
                  </TableCell>
                  <TableCell>{question.category}</TableCell>
                  <TableCell>{question.subCategory}</TableCell>
                  <TableCell>{question.topicTag}</TableCell>
                  <TableCell>{toLabel(question.difficulty)}</TableCell>
                  <TableCell>
                    <StatusBadge tone={question.status === "active" ? "success" : "warning"}>
                      {toLabel(question.status)}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>{toLabel(question.sourceType)}</TableCell>
                  <TableCell>{formatDateTime(question.updatedAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="rounded-lg" asChild>
                        <Link href={`/admin/bank-soal/${question.id}/edit`}>
                          <Pencil className="mr-1 size-4" />
                          Edit
                        </Link>
                      </Button>
                      <form action={archiveQuestionAction.bind(null, question.id)}>
                        <Button variant="outline" size="sm" className="rounded-lg border-rose-200 text-rose-600">
                          <Trash2 className="mr-1 size-4" />
                          Archive
                        </Button>
                      </form>
                    </div>
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
