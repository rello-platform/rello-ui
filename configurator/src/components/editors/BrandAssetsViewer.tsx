import { useRef, useState } from "react";
import type { AssetFile } from "../../hooks/useAssets";

const APP_FOLDERS: Array<{ key: string; label: string; folder: string }> = [
  { key: "milo", label: "Milo Smart Assistant", folder: "milo" },
  { key: "rello", label: "Rello", folder: "logos/rello" },
  { key: "the-drumbeat", label: "The Drumbeat", folder: "logos/the-drumbeat" },
  { key: "conversations", label: "Conversations", folder: "logos/conversations" },
  { key: "home-ready", label: "Home Ready", folder: "logos/home-ready" },
  { key: "home-stretch", label: "Home Stretch", folder: "logos/home-stretch" },
  { key: "open-house-hub", label: "Open House Hub", folder: "logos/open-house-hub" },
  { key: "newsletter-studio", label: "Newsletter Studio", folder: "logos/newsletter-studio" },
  { key: "market-intel", label: "Market Intel", folder: "logos/market-intel" },
  { key: "harvest-home", label: "Harvest Home", folder: "logos/harvest-home" },
];

interface BrandAssetsViewerProps {
  files: AssetFile[];
  selectedAsset: AssetFile | null;
  onSelect: (file: AssetFile | null) => void;
  onRefresh: () => void;
}

function UploadButton({ folder, onUploaded }: { folder: string; onUploaded: () => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    setUploading(true);
    try {
      const buffer = await file.arrayBuffer();
      const base64 = btoa(String.fromCharCode(...new Uint8Array(buffer)));
      const res = await fetch("/api/assets/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ folder, fileName: file.name, content: base64 }),
      });
      const data = await res.json();
      if (data.success) onUploaded();
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <>
      <input ref={inputRef} type="file" accept=".svg,.png,.webp,.jpg,.jpeg" className="hidden" onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])} />
      <button onClick={() => inputRef.current?.click()} disabled={uploading} className="px-2 py-0.5 text-[9px] font-medium rounded bg-[var(--brand-primary-light)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary)] hover:text-white transition-colors disabled:opacity-50">
        {uploading ? "Uploading..." : "+ Add"}
      </button>
    </>
  );
}

export function BrandAssetsViewer({ files, selectedAsset, onSelect, onRefresh }: BrandAssetsViewerProps) {
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (path: string) => {
    if (!confirm(`Delete ${path.split("/").pop()}?`)) return;
    setDeleting(path);
    try {
      const res = await fetch("/api/assets/delete", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ path }) });
      const data = await res.json();
      if (data.success) { onSelect(null); onRefresh(); }
    } finally { setDeleting(null); }
  };

  const getFilesForFolder = (folder: string) => {
    if (folder === "milo") return files.filter((f) => f.category === "milo" && f.fileName !== ".gitkeep");
    const sub = folder.replace("logos/", "");
    return files.filter((f) => f.category === "logos" && f.subcategory === sub && f.fileName !== ".gitkeep");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="border-b border-[var(--neutral-200)] pb-2">
        <h3 className="text-sm font-semibold text-[var(--neutral-800)]">Brand Assets</h3>
        <p className="text-[10px] text-[var(--neutral-400)]">Logos and images. Accepts SVG, PNG, WebP.</p>
      </div>

      {APP_FOLDERS.map(({ key, label, folder }) => {
        const appFiles = getFilesForFolder(folder);
        return (
          <div key={key}>
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider">{label}</p>
              <UploadButton folder={folder} onUploaded={onRefresh} />
            </div>
            {appFiles.length === 0 ? (
              <p className="text-[10px] text-[var(--neutral-400)] px-3 py-2 bg-[var(--neutral-50)] rounded-lg text-center">No assets yet</p>
            ) : (
              <div className="space-y-1">
                {appFiles.map((f) => {
                  const isSelected = selectedAsset?.path === f.path;
                  return (
                    <div
                      key={f.path}
                      className={`group flex items-center gap-2 px-3 py-2 rounded-lg transition-colors cursor-pointer ${isSelected ? "bg-[var(--brand-primary-light)] border border-[var(--brand-primary)]/20" : "bg-white border border-[var(--neutral-200)] hover:bg-[var(--neutral-50)]"}`}
                      onClick={() => onSelect(isSelected ? null : f)}
                    >
                      {f.isImage && <img src={f.rawUrl} alt={f.fileName} className="size-8 rounded object-contain bg-[var(--neutral-50)]" />}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-[var(--neutral-700)] truncate">{f.fileName}</p>
                        <p className="text-[9px] text-[var(--neutral-400)]">{f.ext.toUpperCase()}</p>
                      </div>
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(f.path); }}
                        disabled={deleting === f.path}
                        className={`size-6 rounded flex items-center justify-center text-[var(--neutral-400)] hover:text-[var(--error)] hover:bg-[var(--error-light)] transition-all ${isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`}
                        title="Delete"
                      >
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}

      <div className="bg-[var(--neutral-50)] rounded-lg p-3 text-center">
        <p className="text-[10px] text-[var(--neutral-400)]">{files.filter(f => f.fileName !== ".gitkeep").length} assets total</p>
      </div>
    </div>
  );
}
