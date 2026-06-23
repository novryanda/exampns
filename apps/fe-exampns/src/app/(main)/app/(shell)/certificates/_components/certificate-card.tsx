"use client";

import { useState, useEffect } from "react";
import { Award, Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { id } from "date-fns/locale";
import * as fabric from 'fabric';
import jsPDF from 'jspdf';
import { useSession } from "@/lib/auth/auth-client";

export function CertificateCard({ certificate }: { certificate: any }) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const { data: session } = useSession();
  const userName = session?.user?.name || "Peserta";

  // Generate preview on mount
  useEffect(() => {
    let isMounted = true;

    const generatePreview = async () => {
      try {
        const template = certificate.template;
        if (!template || !template.dataJson) return;

        const canvasEl = document.createElement('canvas');
        const savedDims = typeof template.canvasDimsJson === 'string' 
          ? JSON.parse(template.canvasDimsJson) 
          : (template.canvasDimsJson || { width: 800, height: 600 });
        
        const displayScale = Number(template.displayScale) || 1;

        const canvas = new fabric.Canvas(canvasEl, {
          width: savedDims.width * displayScale,
          height: savedDims.height * displayScale,
        });

        const savedJson = typeof template.dataJson === 'string' 
          ? JSON.parse(template.dataJson) 
          : template.dataJson;

        await canvas.loadFromJSON(savedJson);

        const loadedObjects = canvas.getObjects();
        
        // Restore name properties mapping
        if (savedJson && savedJson.objects) {
          loadedObjects.forEach((obj: any, index: number) => {
            const savedObj = savedJson.objects[index];
            if (savedObj && savedObj.name) {
              obj.set('name', savedObj.name);
            }
          });
        }

        // Replace participant name
        loadedObjects.forEach((obj: any) => {
          if (
            obj.name === 'participant-name' || 
            (obj.type === 'i-text' && obj.text === '[NAMA PESERTA]')
          ) {
            obj.set('text', userName);
          }
        });

        canvas.setZoom(displayScale);
        canvas.renderAll();

        // For preview, we can use a smaller multiplier to save memory/bandwidth
        const previewMultiplier = (1 / displayScale) * 0.3; // 30% resolution
        const dataUrl = canvas.toDataURL({
          format: 'jpeg',
          quality: 0.8,
          multiplier: previewMultiplier,
        });

        if (isMounted) {
          setPreviewUrl(dataUrl);
        }
        canvas.dispose();
      } catch (error) {
        console.error("Error generating certificate preview", error);
      }
    };

    generatePreview();

    return () => {
      isMounted = false;
    };
  }, [certificate, userName]);

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const template = certificate.template;
      if (!template || !template.dataJson) {
        alert("Template data not found!");
        return;
      }

      const canvasEl = document.createElement('canvas');
      const savedDims = typeof template.canvasDimsJson === 'string' 
        ? JSON.parse(template.canvasDimsJson) 
        : (template.canvasDimsJson || { width: 800, height: 600 });
      
      const displayScale = Number(template.displayScale) || 1;

      const canvas = new fabric.Canvas(canvasEl, {
        width: savedDims.width * displayScale,
        height: savedDims.height * displayScale,
      });

      const savedJson = typeof template.dataJson === 'string' 
        ? JSON.parse(template.dataJson) 
        : template.dataJson;

      await canvas.loadFromJSON(savedJson);

      const loadedObjects = canvas.getObjects();
      if (savedJson && savedJson.objects) {
        loadedObjects.forEach((obj: any, index: number) => {
          const savedObj = savedJson.objects[index];
          if (savedObj && savedObj.name) {
            obj.set('name', savedObj.name);
          }
        });
      }

      loadedObjects.forEach((obj: any) => {
        if (
          obj.name === 'participant-name' || 
          (obj.type === 'i-text' && obj.text === '[NAMA PESERTA]')
        ) {
          obj.set('text', userName);
        }
      });

      canvas.setZoom(displayScale);
      canvas.renderAll();

      const exportMultiplier = 1 / displayScale;
      const dataUrl = canvas.toDataURL({
        format: 'jpeg',
        quality: 1,
        multiplier: exportMultiplier,
      });

      const originalWidth = canvas.width! * exportMultiplier;
      const originalHeight = canvas.height! * exportMultiplier;
      
      const orientation = originalWidth > originalHeight ? 'l' : 'p';
      const pxToMm = 0.264583;
      const pdfWidth = originalWidth * pxToMm;
      const pdfHeight = originalHeight * pxToMm;

      const pdf = new jsPDF({
        orientation: orientation,
        unit: 'mm',
        format: [pdfWidth, pdfHeight]
      });

      pdf.addImage(dataUrl, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Sertifikat_${certificate.material.title}.pdf`);

      canvas.dispose();
    } catch (error) {
      console.error("Error generating PDF", error);
      alert("Gagal membuat PDF sertifikat.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm transition-colors hover:border-slate-300 overflow-hidden">
      <div className="relative aspect-[4/3] w-full bg-slate-100 flex items-center justify-center border-b border-slate-100">
        {previewUrl ? (
          <img 
            src={previewUrl} 
            alt={`Sertifikat ${certificate.material.title}`} 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <Loader2 className="size-8 animate-spin" />
            <span className="text-xs font-medium">Menyiapkan Pratinjau...</span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="mb-4">
          <h4 className="font-semibold text-slate-900 line-clamp-2" title={certificate.material.title}>
            {certificate.material.title}
          </h4>
          <p className="mt-1 text-xs text-slate-500">
            Lulus pada: {format(new Date(certificate.issuedAt), "d MMMM yyyy", { locale: id })}
          </p>
        </div>
        
        <div className="mt-auto pt-4 border-t border-slate-100">
          <Button 
            onClick={handleDownload} 
            disabled={isDownloading || !previewUrl} 
            className="w-full rounded-xl bg-blue-600 hover:bg-blue-700"
          >
            {isDownloading ? (
              <Loader2 className="mr-2 size-4 animate-spin" />
            ) : (
              <Download className="mr-2 size-4" />
            )}
            {isDownloading ? "Memproses..." : "Download PDF"}
          </Button>
        </div>
      </div>
    </div>
  );
}
