"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { useEffect, useCallback } from "react";
import {
  Bold,
  Italic,
  UnderlineIcon,
  Strikethrough,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  Quote,
  Code,
  Code2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Minus,
  Undo2,
  Redo2,
  Link2,
  Link2Off,
} from "lucide-react";

// ─── Toolbar button ─────────────────────────────────────────────────────────

function ToolbarButton({
  onClick,
  isActive,
  title,
  disabled,
  children,
}: {
  onClick: () => void;
  isActive?: boolean;
  title: string;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      title={title}
      disabled={disabled}
      onClick={onClick}
      className={[
        "flex h-7 w-7 items-center justify-center rounded-md text-sm transition-colors",
        "hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed",
        isActive
          ? "bg-slate-900 text-white hover:bg-slate-800"
          : "text-slate-600",
      ].join(" ")}
    >
      {children}
    </button>
  );
}

// ─── Separator ───────────────────────────────────────────────────────────────

function ToolbarSep() {
  return <div className="mx-0.5 h-5 w-px bg-slate-200" />;
}

// ─── Toolbar ────────────────────────────────────────────────────────────────

function Toolbar({ editor }: { editor: Editor }) {
  const setLink = useCallback(() => {
    const prev = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("URL tautan:", prev ?? "https://");
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
  }, [editor]);

  return (
    <div className="flex flex-wrap items-center gap-0.5 rounded-t-xl border border-slate-200 bg-slate-50 px-2 py-1.5">
      {/* History */}
      <ToolbarButton
        title="Undo"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
      >
        <Undo2 className="size-3.5" />
      </ToolbarButton>
      <ToolbarButton
        title="Redo"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
      >
        <Redo2 className="size-3.5" />
      </ToolbarButton>

      <ToolbarSep />

      {/* Headings */}
      <ToolbarButton
        title="Judul 1"
        isActive={editor.isActive("heading", { level: 1 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
      >
        <Heading1 className="size-3.5" />
      </ToolbarButton>
      <ToolbarButton
        title="Judul 2"
        isActive={editor.isActive("heading", { level: 2 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
      >
        <Heading2 className="size-3.5" />
      </ToolbarButton>
      <ToolbarButton
        title="Judul 3"
        isActive={editor.isActive("heading", { level: 3 })}
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
      >
        <Heading3 className="size-3.5" />
      </ToolbarButton>

      <ToolbarSep />

      {/* Inline marks */}
      <ToolbarButton
        title="Tebal (Ctrl+B)"
        isActive={editor.isActive("bold")}
        onClick={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold className="size-3.5" />
      </ToolbarButton>
      <ToolbarButton
        title="Miring (Ctrl+I)"
        isActive={editor.isActive("italic")}
        onClick={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic className="size-3.5" />
      </ToolbarButton>
      <ToolbarButton
        title="Garis Bawah (Ctrl+U)"
        isActive={editor.isActive("underline")}
        onClick={() => editor.chain().focus().toggleUnderline().run()}
      >
        <UnderlineIcon className="size-3.5" />
      </ToolbarButton>
      <ToolbarButton
        title="Coret"
        isActive={editor.isActive("strike")}
        onClick={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough className="size-3.5" />
      </ToolbarButton>
      <ToolbarButton
        title="Kode Inline"
        isActive={editor.isActive("code")}
        onClick={() => editor.chain().focus().toggleCode().run()}
      >
        <Code className="size-3.5" />
      </ToolbarButton>

      <ToolbarSep />

      {/* Lists */}
      <ToolbarButton
        title="Daftar Poin"
        isActive={editor.isActive("bulletList")}
        onClick={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List className="size-3.5" />
      </ToolbarButton>
      <ToolbarButton
        title="Daftar Bernomor"
        isActive={editor.isActive("orderedList")}
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered className="size-3.5" />
      </ToolbarButton>
      <ToolbarButton
        title="Blockquote"
        isActive={editor.isActive("blockquote")}
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <Quote className="size-3.5" />
      </ToolbarButton>
      <ToolbarButton
        title="Blok Kode"
        isActive={editor.isActive("codeBlock")}
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <Code2 className="size-3.5" />
      </ToolbarButton>

      <ToolbarSep />

      {/* Alignment */}
      <ToolbarButton
        title="Rata Kiri"
        isActive={editor.isActive({ textAlign: "left" })}
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
      >
        <AlignLeft className="size-3.5" />
      </ToolbarButton>
      <ToolbarButton
        title="Rata Tengah"
        isActive={editor.isActive({ textAlign: "center" })}
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
      >
        <AlignCenter className="size-3.5" />
      </ToolbarButton>
      <ToolbarButton
        title="Rata Kanan"
        isActive={editor.isActive({ textAlign: "right" })}
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
      >
        <AlignRight className="size-3.5" />
      </ToolbarButton>
      <ToolbarButton
        title="Rata Penuh"
        isActive={editor.isActive({ textAlign: "justify" })}
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
      >
        <AlignJustify className="size-3.5" />
      </ToolbarButton>

      <ToolbarSep />

      {/* Link */}
      <ToolbarButton
        title="Sisipkan Tautan"
        isActive={editor.isActive("link")}
        onClick={setLink}
      >
        <Link2 className="size-3.5" />
      </ToolbarButton>
      <ToolbarButton
        title="Hapus Tautan"
        disabled={!editor.isActive("link")}
        onClick={() => editor.chain().focus().unsetLink().run()}
      >
        <Link2Off className="size-3.5" />
      </ToolbarButton>

      <ToolbarSep />

      {/* Horizontal rule */}
      <ToolbarButton
        title="Garis Pemisah"
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
      >
        <Minus className="size-3.5" />
      </ToolbarButton>
    </div>
  );
}

// ─── Main editor component ──────────────────────────────────────────────────

export interface RichTextEditorProps {
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
  minHeight?: number;
  className?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Tulis konten materi di sini...",
  minHeight = 280,
  className = "",
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Disable the heading from StarterKit since we include it separately
        heading: { levels: [1, 2, 3] },
      }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: { class: "text-blue-600 underline hover:text-blue-500" },
      }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class: [
          "prose prose-slate max-w-none focus:outline-none",
          "prose-headings:font-semibold prose-headings:text-slate-900",
          "prose-p:text-slate-700 prose-p:leading-relaxed",
          "prose-a:text-blue-600 hover:prose-a:text-blue-500",
          "prose-code:bg-slate-100 prose-code:rounded prose-code:px-1 prose-code:text-sm",
          "prose-pre:bg-slate-900 prose-pre:text-slate-100 prose-pre:rounded-xl",
          "prose-blockquote:border-l-blue-400 prose-blockquote:text-slate-600",
          "px-4 py-3",
        ].join(" "),
        style: `min-height: ${minHeight}px`,
      },
    },
    onUpdate({ editor }) {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  // Sync external value changes (e.g. form reset)
  useEffect(() => {
    if (!editor) return;
    const currentHtml = editor.getHTML();
    if (currentHtml !== value) {
      editor.commands.setContent(value, { emitUpdate: false });
    }
  }, [editor, value]);

  if (!editor) return null;

  return (
    <div
      className={[
        "overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm",
        "focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500",
        "transition-shadow",
        className,
      ].join(" ")}
    >
      <Toolbar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
}
