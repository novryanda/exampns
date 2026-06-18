"use client";

import { useState, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Plus,
  GripVertical,
  Trash2,
  FileText,
  Video,
  FileOutput,
  HelpCircle,
  BookOpen,
  Loader2,
  CheckCircle2,
  ExternalLink,
  Edit3,
} from "lucide-react";

import {
  DndContext,
  closestCenter,
  PointerSensor,
  KeyboardSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  DragOverlay,
  type DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis, restrictToWindowEdges } from "@dnd-kit/modifiers";
import { CSS } from "@dnd-kit/utilities";

import { Button } from "@/components/ui/button";

// ─── Types ─────────────────────────────────────────────────────────────────

interface Module {
  id: string;
  title: string;
  moduleType: string;
  durationMinutes?: number | null;
  sortOrder: number;
}

// ─── Icon helper ───────────────────────────────────────────────────────────

function getIconForType(type: string) {
  switch (type) {
    case "video":
      return <Video className="size-4 text-blue-500" />;
    case "pdf":
      return <FileOutput className="size-4 text-red-500" />;
    case "text":
      return <FileText className="size-4 text-slate-500" />;
    case "quiz":
      return <HelpCircle className="size-4 text-orange-500" />;
    default:
      return <FileText className="size-4" />;
  }
}

// ─── Sortable row ──────────────────────────────────────────────────────────

function SortableModuleRow({
  module,
  index,
  materialId,
  onDelete,
  isDragging: isOverlayShown,
}: {
  module: Module;
  index: number;
  materialId: string;
  onDelete: (id: string) => void;
  isDragging: boolean;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: module.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.4 : 1,
    zIndex: isDragging ? 10 : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm group select-none"
    >
      <div className="flex items-center gap-3">
        {/* Drag handle */}
        <button
          type="button"
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing touch-none p-1 rounded text-slate-300 hover:text-slate-500 hover:bg-slate-100 transition-colors focus:outline-none"
          aria-label="Drag to reorder"
        >
          <GripVertical className="size-5" />
        </button>

        {/* Icon */}
        <div className="flex size-8 items-center justify-center rounded-lg bg-slate-100">
          {getIconForType(module.moduleType)}
        </div>

        {/* Info */}
        <div>
          <p className="font-medium text-slate-900 text-sm">{module.title}</p>
          <p className="text-xs text-slate-500">
            Modul {index + 1} &bull; {module.moduleType.toUpperCase()}
            {module.durationMinutes ? ` • ${module.durationMinutes} menit` : ""}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-400 hover:bg-blue-50 hover:text-blue-600"
          onClick={() => window.open(`/admin/materi/${materialId}/modules/${module.id}/edit`, "_blank", "noopener,noreferrer")}
          title="Edit Modul"
        >
          <Edit3 className="size-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="text-slate-400 hover:bg-red-50 hover:text-red-600"
          onClick={() => onDelete(module.id)}
          title="Hapus Modul"
        >
          <Trash2 className="size-4" />
        </Button>
      </div>
    </div>
  );
}

// ─── Drag overlay card ─────────────────────────────────────────────────────

function ModuleDragOverlayCard({ module }: { module: Module }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-blue-300 bg-white p-4 shadow-xl ring-2 ring-blue-200 cursor-grabbing">
      <div className="p-1 rounded text-blue-400">
        <GripVertical className="size-5" />
      </div>
      <div className="flex size-8 items-center justify-center rounded-lg bg-slate-100">
        {getIconForType(module.moduleType)}
      </div>
      <div>
        <p className="font-medium text-slate-900 text-sm">{module.title}</p>
        <p className="text-xs text-slate-500">{module.moduleType.toUpperCase()}</p>
      </div>
    </div>
  );
}
// ─── Main component ────────────────────────────────────────────────────────

export function ModuleManager({
  materialId,
  initialModules = [],
}: {
  readonly materialId: string;
  readonly initialModules?: any[];
}) {
  const router = useRouter();
  const [modules, setModules] = useState<Module[]>(initialModules);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [reorderState, setReorderState] = useState<"idle" | "saving" | "saved">("idle");
  const reorderTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ─── DnD sensors ───────────────────────────────────────────────────────

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const activeModule = activeId ? modules.find((m) => m.id === activeId) ?? null : null;

  // ─── Reorder persistence ────────────────────────────────────────────────

  const persistOrder = useCallback(
    async (ordered: Module[]) => {
      setReorderState("saving");
      if (reorderTimerRef.current) clearTimeout(reorderTimerRef.current);

      try {
        const res = await fetch(
          `/api/admin-data/learning-materials/${materialId}/modules/reorder`,
          {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ moduleIds: ordered.map((m) => m.id) }),
          },
        );
        if (!res.ok) throw new Error("Gagal menyimpan urutan");
        setReorderState("saved");
        reorderTimerRef.current = setTimeout(() => setReorderState("idle"), 2000);
      } catch (err) {
        console.error(err);
        setReorderState("idle");
      }
    },
    [materialId],
  );

  // ─── DnD handlers ──────────────────────────────────────────────────────

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(String(event.active.id));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    setModules((prev) => {
      const oldIndex = prev.findIndex((m) => m.id === active.id);
      const newIndex = prev.findIndex((m) => m.id === over.id);
      const reordered = arrayMove(prev, oldIndex, newIndex);
      void persistOrder(reordered);
      return reordered;
    });
  };

  // ─── Delete module ──────────────────────────────────────────────────────

  const handleDelete = async (moduleId: string) => {
    if (!confirm("Hapus modul ini?")) return;

    try {
      const res = await fetch(
        `/api/admin-data/learning-materials/${materialId}/modules/${moduleId}`,
        { method: "DELETE" },
      );

      if (!res.ok) throw new Error("Gagal menghapus modul");

      setModules((prev) => prev.filter((m) => m.id !== moduleId));
      router.refresh();
    } catch (error) {
      console.error(error);
      alert("Gagal menghapus modul");
    }
  };

  // ─── Render ─────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col gap-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-3">
          <h3 className="font-medium text-slate-900">Daftar Modul</h3>

          {/* Reorder status badge */}
          {reorderState === "saving" && (
            <span className="flex items-center gap-1 text-xs text-slate-500">
              <Loader2 className="size-3 animate-spin" />
              Menyimpan urutan...
            </span>
          )}
          {reorderState === "saved" && (
            <span className="flex items-center gap-1 text-xs text-emerald-600">
              <CheckCircle2 className="size-3" />
              Urutan tersimpan
            </span>
          )}
        </div>

        <Button
            size="sm"
            className="rounded-xl bg-blue-600 hover:bg-blue-700 gap-1.5"
            onClick={() =>
              window.open(
                `/admin/materi/${materialId}/modules/create`,
                "_blank",
                "noopener,noreferrer",
              )
            }
          >
            <Plus className="size-4" />
            Tambah Modul
            <ExternalLink className="size-3 opacity-70" />
          </Button>
      </div>

      {/* Module list */}
      {modules.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-12 text-center">
          <BookOpen className="mb-2 size-8 text-slate-300" />
          <p className="text-sm font-medium text-slate-900">Belum ada modul</p>
          <p className="text-sm text-slate-500">Tambahkan modul video, teks, atau PDF.</p>
        </div>
      ) : (
        <>
          {/* Drag hint */}
          <p className="text-xs text-slate-400 flex items-center gap-1">
            <GripVertical className="size-3" />
            Tahan dan seret baris modul untuk mengubah urutannya
          </p>

          <DndContext
            id="module-manager-dnd"
            sensors={sensors}
            collisionDetection={closestCenter}
            modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={modules.map((m) => m.id)}
              strategy={verticalListSortingStrategy}
            >
              <div className="flex flex-col gap-2">
                {modules.map((m, idx) => (
                  <SortableModuleRow
                    key={m.id}
                    module={m}
                    index={idx}
                    materialId={materialId}
                    onDelete={handleDelete}
                    isDragging={activeId !== null}
                  />
                ))}
              </div>
            </SortableContext>

            {/* Floating drag preview */}
            <DragOverlay>
              {activeModule ? (
                <ModuleDragOverlayCard module={activeModule} />
              ) : null}
            </DragOverlay>
          </DndContext>
        </>
      )}
    </div>
  );
}
