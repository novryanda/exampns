"use client";

import dynamic from "next/dynamic";

export const CertificateEditorLoader = dynamic(
  () => import("./certificate-editor").then((mod) => mod.CertificateEditor),
  { 
    ssr: false, 
    loading: () => <div className="p-12 text-center text-slate-500">Memuat Editor...</div> 
  }
);
