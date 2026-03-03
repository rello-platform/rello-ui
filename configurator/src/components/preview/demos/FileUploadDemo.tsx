import { useState } from "react";

interface UploadFile { name: string; size: string; progress: number; done: boolean; }

export function FileUploadDemo() {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [dragging, setDragging] = useState(false);

  const addFile = () => {
    const names = ["pre-approval-letter.pdf", "listing-photos.zip", "contract-v2.docx", "inspection-report.pdf"];
    const f: UploadFile = { name: names[files.length % names.length], size: `${(Math.random() * 5 + 1).toFixed(1)} MB`, progress: 0, done: false };
    setFiles(prev => [...prev, f]);
    const idx = files.length;
    let progress = 0;
    const timer = setInterval(() => {
      progress += Math.random() * 30 + 10;
      if (progress >= 100) {
        progress = 100;
        clearInterval(timer);
        setFiles(prev => prev.map((ff, i) => i === idx ? { ...ff, progress: 100, done: true } : ff));
      } else {
        setFiles(prev => prev.map((ff, i) => i === idx ? { ...ff, progress } : ff));
      }
    }, 300);
  };

  return (
    <div className="bg-[var(--neutral-50)] rounded-xl overflow-hidden border border-[var(--neutral-200)]">
      <div className="p-4 border-b border-[var(--neutral-100)]">
        <span className="text-sm font-medium text-[var(--neutral-700)]">File Upload — Click zone or drag files</span>
      </div>
      <div className="p-4">
        {/* Drop zone */}
        <div
          onClick={addFile}
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(e) => { e.preventDefault(); setDragging(false); addFile(); }}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${dragging ? "border-[var(--brand-primary)] bg-[var(--brand-primary-light)]" : "border-[var(--neutral-300)] hover:border-[var(--neutral-400)]"}`}
        >
          <svg className="mx-auto mb-2" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke={dragging ? "var(--brand-primary)" : "var(--neutral-400)"} strokeWidth="1.5"><path d="M12 16V8m0 0l3 3m-3-3l-3 3" /><path d="M20 16.586V19a2 2 0 01-2 2H6a2 2 0 01-2-2v-2.414" /><rect x="2" y="3" width="20" height="14" rx="2" /></svg>
          <p className="text-sm text-[var(--neutral-600)]">Drag files here or <span className="text-[var(--brand-primary)] font-medium">click to browse</span></p>
          <p className="text-xs text-[var(--neutral-400)] mt-1">PDF, DOCX, JPG, PNG up to 10MB</p>
        </div>
        {/* File list */}
        {files.length > 0 && (
          <div className="mt-3 space-y-2">
            {files.map((f, i) => (
              <div key={i} className="flex items-center gap-3 bg-white rounded-lg border border-[var(--neutral-100)] p-3" style={{ animation: "stagger-in 200ms ease-out both" }}>
                <style>{`@keyframes stagger-in { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: translateY(0); } }`}</style>
                <div className="size-8 rounded-lg bg-[var(--neutral-100)] flex items-center justify-center text-[10px] font-bold text-[var(--neutral-500)]">
                  {f.name.split(".").pop()?.toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[var(--foreground)] truncate">{f.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 h-1.5 bg-[var(--neutral-100)] rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-300" style={{ width: `${f.progress}%`, backgroundColor: f.done ? "var(--success)" : "var(--brand-primary)" }} />
                    </div>
                    <span className="text-[10px] text-[var(--neutral-400)] w-12 text-right">{f.done ? f.size : `${Math.round(f.progress)}%`}</span>
                  </div>
                </div>
                <button onClick={() => setFiles(prev => prev.filter((_, j) => j !== i))} className="text-[var(--neutral-400)] hover:text-[var(--error)] text-sm">&times;</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
