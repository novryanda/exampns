import Link from "next/link";

import { Copy, Pencil, Plus, Send } from "lucide-react";

import { PageHeader, SectionCard, StatusBadge } from "@/app/(main)/_components/page-shell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { duplicateTryoutDraftAction, submitTryoutDraftAction } from "@/server/admin-content-actions";
import { getAdminTryoutDrafts } from "@/server/admin-content-data";

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

export default async function TryoutDraftsPage({
  searchParams,
}: {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const search = readParam(params.search);
  const status = readParam(params.status);
  const type = readParam(params.tryoutType);

  const drafts = await getAdminTryoutDrafts({
    search: search || undefined,
    status: status && status !== "all" ? status : undefined,
    tryoutType: type && type !== "all" ? type : undefined,
    limit: 20,
  });

  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Tryout Drafts"
        description="Buat draft sebelum dipublish oleh super admin."
        actions={
          <Button asChild className="rounded-xl bg-blue-600 hover:bg-blue-700">
            <Link href="/admin/tryout-drafts/new">
              <Plus className="mr-2 size-4" />
              Buat Draft
            </Link>
          </Button>
        }
      />

      <form className="flex flex-wrap items-center gap-2">
        <Input
          name="search"
          defaultValue={search}
          placeholder="Cari nama draft"
          className="min-w-72 rounded-xl border-slate-200"
        />
        <Select name="tryoutType" defaultValue={type || "all"}>
          <SelectTrigger className="w-40 rounded-xl border-slate-200 bg-white">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Type</SelectItem>
            <SelectItem value="generated">Generated</SelectItem>
            <SelectItem value="manual">Manual</SelectItem>
            <SelectItem value="hybrid">Hybrid</SelectItem>
          </SelectContent>
        </Select>
        <Select name="status" defaultValue={status || "all"}>
          <SelectTrigger className="w-40 rounded-xl border-slate-200 bg-white">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="review">Review</SelectItem>
          </SelectContent>
        </Select>
        <Button type="submit" variant="outline" className="rounded-xl border-slate-200 bg-white">
          Terapkan
        </Button>
      </form>

      <SectionCard title="Daftar Draft" description={`Menampilkan ${drafts.data.length} draft tryout.`}>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Access</TableHead>
              <TableHead>Questions</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Updated At</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {drafts.data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="py-10 text-center text-slate-400">
                  Belum ada tryout draft.
                </TableCell>
              </TableRow>
            ) : (
              drafts.data.map((draft) => (
                <TableRow key={draft.id}>
                  <TableCell className="font-medium text-slate-950">{draft.name}</TableCell>
                  <TableCell>{toLabel(draft.tryoutType)}</TableCell>
                  <TableCell>{toLabel(draft.accessType)}</TableCell>
                  <TableCell>{draft.totalQuestions}</TableCell>
                  <TableCell>{draft.durationMinutes} menit</TableCell>
                  <TableCell>
                    <StatusBadge tone={draft.status === "review" ? "warning" : "neutral"}>
                      {toLabel(draft.status)}
                    </StatusBadge>
                  </TableCell>
                  <TableCell>{formatDateTime(draft.updatedAt)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" className="rounded-lg" asChild>
                        <Link href={`/admin/tryout-drafts/${draft.id}/edit`}>
                          <Pencil className="mr-1 size-4" />
                          Edit
                        </Link>
                      </Button>
                      <form action={duplicateTryoutDraftAction.bind(null, draft.id)}>
                        <Button variant="outline" size="sm" className="rounded-lg">
                          <Copy className="mr-1 size-4" />
                          Duplicate
                        </Button>
                      </form>
                      {draft.status === "draft" ? (
                        <form action={submitTryoutDraftAction.bind(null, draft.id)}>
                          <Button size="sm" className="rounded-lg bg-blue-600 hover:bg-blue-700">
                            <Send className="mr-1 size-4" />
                            Submit
                          </Button>
                        </form>
                      ) : null}
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
