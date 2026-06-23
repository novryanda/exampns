"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as fabric from 'fabric';
import jsPDF from 'jspdf';
import localforage from 'localforage';
import { 
  Upload, 
  Image as ImageIcon, 
  Type, 
  Download, 
  Trash2, 
  Award,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  ArrowLeft
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Button } from "@/components/ui/button";
import styles from './editor.module.css';

const FONT_OPTIONS = [
  'Inter', 'Roboto', 'Open Sans', 'Montserrat', 'Poppins', 'Lato', 'Nunito',
  'Raleway', 'Ubuntu', 'Rubik', 'Work Sans', 'Quicksand', 'Karla'
];

export function CertificateEditor({
  templateId,
  initialData
}: {
  templateId?: string;
  initialData?: any;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fabricRef = useRef<fabric.Canvas | null>(null);
  const [hasBaseImage, setHasBaseImage] = useState(false);
  const [selectedObject, setSelectedObject] = useState<fabric.Object | null>(null);
  const [displayScale, setDisplayScale] = useState(1);
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 800, height: 600 });

  // Text properties state
  const [textColor, setTextColor] = useState('#000000');
  const [fontSize, setFontSize] = useState(40);
  const [fontFamily, setFontFamily] = useState('Inter');
  const [fontWeight, setFontWeight] = useState('normal');
  const [fontStyle, setFontStyle] = useState('normal');
  const [underline, setUnderline] = useState(false);

  const router = useRouter();

  const displayScaleRef = useRef(1);
  useEffect(() => {
    displayScaleRef.current = displayScale;
  }, [displayScale]);

  const saveState = useCallback(async () => {
    if (!fabricRef.current) return;
    const canvas = fabricRef.current;
    try {
      const json = canvas.toJSON(['name', 'selectable', 'evented', 'cornerColor', 'cornerStrokeColor', 'borderColor', 'transparentCorners']);
      await localforage.setItem('canvasState', json);
      await localforage.setItem('displayScale', displayScaleRef.current);
      await localforage.setItem('canvasDimensions', { width: canvas.width, height: canvas.height });
      const hasBase = canvas.getObjects().some((obj: any) => obj.name === 'base-image');
      await localforage.setItem('hasBaseImage', hasBase);
    } catch (e) {
      console.error("Auto-save failed", e);
    }
  }, []);

  useEffect(() => {
    try {
      if (canvasRef.current && !fabricRef.current) {
        const canvas = new fabric.Canvas(canvasRef.current, {
          width: 800,
          height: 600,
          backgroundColor: '#ffffff',
          preserveObjectStacking: true,
        });

        fabricRef.current = canvas;
        canvas.fireRightClick = true;
        canvas.stopContextMenu = true;

        const loadState = async () => {
          try {
            let savedJson = null;
            let savedScale = 1;
            let savedDims = { width: 800, height: 600 };

            if (templateId && initialData) {
              savedJson = typeof initialData.dataJson === 'string' ? JSON.parse(initialData.dataJson) : initialData.dataJson;
              savedDims = initialData.canvasDimsJson || { width: 800, height: 600 };
              savedScale = Number(initialData.displayScale) || 1;
            } else {
              savedJson = await localforage.getItem('canvasState');
              savedScale = await localforage.getItem('displayScale') as number || 1;
              savedDims = await localforage.getItem('canvasDimensions') as { width: number, height: number } || { width: 800, height: 600 };
            }
            
            if (savedJson) {
              setCanvasDimensions(savedDims);
              setDisplayScale(savedScale);
              displayScaleRef.current = savedScale;
              
              canvas.setDimensions({ 
                width: savedDims.width * savedScale, 
                height: savedDims.height * savedScale 
              });
              canvas.setZoom(savedScale);
              
              try {
                const jsonObj = typeof savedJson === 'string' ? JSON.parse(savedJson) : savedJson;
                await canvas.loadFromJSON(savedJson);
                
                const loadedObjects = canvas.getObjects();
                let hasBase = false;

                if (jsonObj && jsonObj.objects) {
                  loadedObjects.forEach((obj: any, index: number) => {
                    const savedObj = jsonObj.objects[index];
                    if (savedObj) {
                      if (savedObj.name) obj.set('name', savedObj.name);
                      if (savedObj.selectable !== undefined) obj.set('selectable', savedObj.selectable);
                      if (savedObj.evented !== undefined) obj.set('evented', savedObj.evented);
                    }
                    
                    if (obj.name === 'base-image') {
                      hasBase = true;
                    } else if (!obj.name && obj.type === 'image' && index === 0) {
                      // Fallback: If it's the first object and it's an image, assume it's the base-image
                      obj.set('name', 'base-image');
                      hasBase = true;
                    }
                  });
                }
                
                setHasBaseImage(hasBase);
              } catch (err: any) {
                console.error("Failed to load JSON:", err);
              }
              
              canvas.getObjects().forEach((obj: any) => {
                if (obj.type === 'line' && obj.strokeDashArray) {
                  canvas.remove(obj);
                }
              });
              
              canvas.renderAll();
            }
          } catch (e: any) {
            console.error('Error loading state:', e);
          }
        };
        loadState();

        const updateTextControls = (obj: fabric.Object | undefined) => {
          if (obj && obj.type === 'i-text') {
            const textObj = obj as fabric.IText;
            setTextColor(textObj.fill as string || '#000000');
            setFontSize(textObj.fontSize || 40);
            setFontFamily(textObj.fontFamily || 'Inter');
            setFontWeight((textObj.fontWeight === 'bold' || textObj.fontWeight === 700) ? 'bold' : 'normal');
            setFontStyle(textObj.fontStyle === 'italic' ? 'italic' : 'normal');
            setUnderline(!!textObj.underline);
          }
        };

        canvas.on('selection:created', () => {
          const active = canvas.getActiveObject();
          if (active && active.type === 'activeSelection') active.set('subTargetCheck', true);
          setSelectedObject(active || null);
          updateTextControls(active || undefined);
        });
        canvas.on('selection:updated', () => {
          const active = canvas.getActiveObject();
          if (active && active.type === 'activeSelection') active.set('subTargetCheck', true);
          setSelectedObject(active || null);
          updateTextControls(active || undefined);
        });
        canvas.on('selection:cleared', () => {
          setSelectedObject(null);
        });
        
        canvas.on('object:modified', saveState);
      }
    } catch (err: any) {
      console.error('Initialization error: ' + err.message);
    }
  }, [saveState, templateId, initialData]);

  // Keydown listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === 'Delete' || e.key === 'Backspace') {
        handleDeleteObject();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleBaseImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !fabricRef.current) return;

    const reader = new FileReader();
    reader.onload = (f) => {
      try {
        const data = f.target?.result as string;
        const imgElement = new Image();
        imgElement.onload = () => {
          const img = new fabric.FabricImage(imgElement);
          const canvas = fabricRef.current!;
          
          const availableWidth = window.innerWidth - 400;
          const availableHeight = window.innerHeight - 200;
          let dScale = 1;
          
          if (img.width! > availableWidth || img.height! > availableHeight) {
            dScale = Math.min(availableWidth / img.width!, availableHeight / img.height!);
          }
          
          const newDims = { width: img.width! * dScale, height: img.height! * dScale };
          canvas.setDimensions(newDims);
          setCanvasDimensions({ width: img.width!, height: img.height! });
          canvas.setZoom(dScale);
          setDisplayScale(dScale);
          
          img.set({
            name: 'base-image',
            originX: 'center',
            originY: 'center',
            left: img.width! / 2,
            top: img.height! / 2,
            selectable: true,
            evented: true,
          });
          canvas.add(img);
          canvas.sendObjectToBack(img);
          canvas.setActiveObject(img);
          canvas.renderAll();
          setHasBaseImage(true);
          saveState();
        };
        imgElement.src = data;
      } catch (err: any) {
        alert('Error uploading image: ' + err.message);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !fabricRef.current) return;

    const reader = new FileReader();
    reader.onload = (f) => {
      try {
        const data = f.target?.result as string;
        const imgElement = new Image();
        imgElement.onload = () => {
          const img = new fabric.FabricImage(imgElement);
          const canvas = fabricRef.current!;
          
          // Scale down if it's too big, typical for logos
          let dScale = 1;
          const unzoomedWidth = canvas.width! / displayScaleRef.current;
          const unzoomedHeight = canvas.height! / displayScaleRef.current;
          
          if (img.width! > unzoomedWidth / 3) {
            dScale = (unzoomedWidth / 3) / img.width!;
          }
          
          img.set({
            name: 'static-logo',
            originX: 'center',
            originY: 'center',
            left: unzoomedWidth / 2,
            top: unzoomedHeight / 2,
            scaleX: dScale,
            scaleY: dScale,
            selectable: true,
            evented: true,
          });
          
          canvas.add(img);
          canvas.setActiveObject(img);
          canvas.renderAll();
          saveState();
        };
        imgElement.src = data;
      } catch (err: any) {
        alert('Error uploading logo: ' + err.message);
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  const handleAddText = () => {
    if (!fabricRef.current) return;
    const canvas = fabricRef.current;
    const unzoomedWidth = canvas.width! / displayScaleRef.current;
    const unzoomedHeight = canvas.height! / displayScaleRef.current;

    const text = new fabric.IText('Double click to edit', {
      originX: 'center',
      originY: 'center',
      left: unzoomedWidth / 2,
      top: unzoomedHeight / 2,
      fontFamily,
      fill: textColor,
      fontSize,
      fontWeight: 'normal',
      fontStyle: 'normal',
      underline: false,
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
    saveState();
  };

  const handleAddPlaceholderName = () => {
    if (!fabricRef.current) return;
    const canvas = fabricRef.current;
    const unzoomedWidth = canvas.width! / displayScaleRef.current;
    const unzoomedHeight = canvas.height! / displayScaleRef.current;

    const text = new fabric.IText('[NAMA PESERTA]', {
      originX: 'center',
      originY: 'center',
      left: unzoomedWidth / 2,
      top: unzoomedHeight / 2,
      fontFamily: 'Inter',
      fontSize: 60,
      fill: '#000000',
      fontWeight: 'bold',
      name: 'participant-name',
    });
    canvas.add(text);
    canvas.setActiveObject(text);
    canvas.renderAll();
    saveState();
  };

  const handleTextChange = (key: string, value: any) => {
    if (!fabricRef.current || !selectedObject || selectedObject.type !== 'i-text') return;
    const canvas = fabricRef.current;
    selectedObject.set(key as keyof fabric.Object, value);
    canvas.renderAll();

    if (key === 'fill') setTextColor(value);
    if (key === 'fontSize') setFontSize(Number(value));
    if (key === 'fontFamily') setFontFamily(value);
    if (key === 'fontWeight') setFontWeight(value);
    if (key === 'fontStyle') setFontStyle(value);
    if (key === 'underline') setUnderline(value);
    saveState();
  };

  const handleDeleteObject = () => {
    if (!fabricRef.current) return;
    const canvas = fabricRef.current;
    const activeObjects = canvas.getActiveObjects();
    if (activeObjects.length) {
      activeObjects.forEach((obj: any) => canvas.remove(obj));
      canvas.discardActiveObject();
      canvas.renderAll();
      const hasBase = canvas.getObjects().some((obj: any) => obj.name === 'base-image');
      setHasBaseImage(hasBase);
      saveState();
    }
  };

  const handleSaveAsTemplate = async () => {
    if (!fabricRef.current) return;
    let templateName = initialData?.name || "My Template";
    const namePrompt = prompt("Enter template name:", templateName);
    if (!namePrompt) return;

    const json = fabricRef.current.toJSON(['name', 'selectable', 'evented', 'cornerColor', 'cornerStrokeColor', 'borderColor', 'transparentCorners']);
    
    try {
      const payload = {
        name: namePrompt,
        dataJson: json,
        canvasDimsJson: canvasDimensions,
        displayScale: displayScaleRef.current
      };

      const url = templateId ? `/api/admin-data/certificate-templates/${templateId}` : '/api/admin-data/certificate-templates';
      const method = templateId ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      
      if (!res.ok) throw new Error("Failed to save");
      alert('Template saved successfully!');
      router.push('/admin/certificates');
    } catch (e) {
      console.error('Failed to save template:', e);
      alert('Failed to save template.');
    }
  };

  return (
    <div className={styles.appContainer}>
      <header className={styles.topNavbar}>
        <div className={styles.topNavbarLeft}>
          <button onClick={() => router.push('/admin/certificates')} className={styles.btnIcon}>
            <ArrowLeft size={20} />
          </button>
          <div className={styles.templateInfo}>
            <h2>{templateId ? 'Editing Template' : 'New Template'}</h2>
            <p>Editor</p>
          </div>
        </div>
        <div className={styles.topNavbarRight}>
          <Button onClick={handleSaveAsTemplate} className="bg-blue-600 hover:bg-blue-700">
            <Award size={16} className="mr-2" /> Simpan Template
          </Button>
        </div>
      </header>

      <div className={styles.editorMain}>
        <aside className={styles.sidebarCanva}>
          <div className={styles.sidebarSection}>
            {!hasBaseImage ? (
              <label className={styles.uploadBaseBtn}>
                <Upload size={24} />
                <span>Upload Base Certificate</span>
                <input type="file" accept="image/*" onChange={handleBaseImageUpload} style={{ display: 'none' }} />
              </label>
            ) : (
              <div className={styles.baseActiveInfo}>
                <ImageIcon size={20} />
                <span>Base Image Active</span>
                <span style={{ fontSize: '0.7rem', color: '#16a34a' }}>(Delete to change)</span>
              </div>
            )}
          </div>

          <div className={styles.sidebarDivider} />

          <div className={styles.toolsGrid}>
            <button className={styles.toolBtn} onClick={handleAddText} disabled={!hasBaseImage} style={{ opacity: !hasBaseImage ? 0.5 : 1, cursor: !hasBaseImage ? 'not-allowed' : 'pointer' }}>
              <Type size={24} />
              <span>Add Text</span>
            </button>
            <button className={styles.toolBtn} onClick={handleAddPlaceholderName} disabled={!hasBaseImage} style={{ opacity: !hasBaseImage ? 0.5 : 1, cursor: !hasBaseImage ? 'not-allowed' : 'pointer' }}>
              <Award size={24} />
              <span>Name Placeholder</span>
            </button>
            <label className={styles.toolBtn} style={{ opacity: !hasBaseImage ? 0.5 : 1, cursor: !hasBaseImage ? 'not-allowed' : 'pointer' }}>
              <ImageIcon size={24} />
              <span>Add Image/Logo</span>
              <input type="file" accept="image/*" onChange={handleLogoUpload} disabled={!hasBaseImage} style={{ display: 'none' }} />
            </label>
          </div>

          <div className={styles.sidebarDivider} />

          {selectedObject && (
            <div className={styles.sidebarSection}>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Object Settings</h3>
              
              {selectedObject.type === 'i-text' && (
                <div className="flex flex-col gap-4">
                  <div className="flex gap-2">
                    <Button variant={fontWeight === 'bold' ? 'default' : 'outline'} size="sm" onClick={() => handleTextChange('fontWeight', fontWeight === 'bold' ? 'normal' : 'bold')}>
                      <Bold size={16} />
                    </Button>
                    <Button variant={fontStyle === 'italic' ? 'default' : 'outline'} size="sm" onClick={() => handleTextChange('fontStyle', fontStyle === 'italic' ? 'normal' : 'italic')}>
                      <Italic size={16} />
                    </Button>
                    <Button variant={underline ? 'default' : 'outline'} size="sm" onClick={() => handleTextChange('underline', !underline)}>
                      <UnderlineIcon size={16} />
                    </Button>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700">Font Family</label>
                    <select className={styles.inputField} value={fontFamily} onChange={(e) => handleTextChange('fontFamily', e.target.value)}>
                      {FONT_OPTIONS.map(font => <option key={font} value={font}>{font}</option>)}
                    </select>
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700">Font Size ({fontSize}px)</label>
                    <input type="range" min="10" max="200" value={fontSize} onChange={(e) => handleTextChange('fontSize', Number(e.target.value))} className="w-full" />
                  </div>
                  
                  <div className="flex flex-col gap-2">
                    <label className="text-sm font-medium text-slate-700">Color</label>
                    <input type="color" className={styles.colorPicker} value={textColor} onChange={(e) => handleTextChange('fill', e.target.value)} />
                  </div>
                </div>
              )}
              
              <Button variant="destructive" className="w-full mt-6" onClick={handleDeleteObject}>
                <Trash2 size={16} className="mr-2" /> Delete Object
              </Button>
            </div>
          )}
        </aside>

        <main className={styles.workspace}>
          <div className={styles.canvasWrapper}>
            {!hasBaseImage && (
              <div className={styles.emptyState} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 1, pointerEvents: 'none' }}>
                <Upload size={48} />
                <p>Upload a base certificate image to start designing.</p>
              </div>
            )}
            <div>
              <canvas ref={canvasRef} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
