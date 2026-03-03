import type { AssetFile } from "../../hooks/useAssets";

const APP_LABELS: Record<string, string> = {
  rello: "Rello",
  "home-ready": "Home Ready",
  "home-stretch": "Home Stretch",
  "market-intel": "Market Intel",
  "the-oven": "The Oven",
  "newsletter-studio": "Newsletter Studio",
  "neighborhood-intel": "Neighborhood Intel",
  "open-house-hub": "Open House Hub",
  "listing-leads": "Listing Leads",
};

interface BrandAssetsViewerProps {
  files: AssetFile[];
  selectedAsset: AssetFile | null;
  onSelect: (file: AssetFile | null) => void;
}

export function BrandAssetsViewer({ files, selectedAsset, onSelect }: BrandAssetsViewerProps) {
  const logos = files.filter((f) => f.category === "logos");
  const milo = files.filter((f) => f.category === "milo");

  // Group logos by subcategory (app name)
  const logoGroups: Record<string, AssetFile[]> = {};
  logos.forEach((f) => {
    const key = f.subcategory || "other";
    if (!logoGroups[key]) logoGroups[key] = [];
    logoGroups[key].push(f);
  });

  return (
    <div className="flex flex-col gap-4">
      <div className="border-b border-[var(--neutral-200)] pb-2">
        <h3 className="text-sm font-semibold text-[var(--neutral-800)]">Brand Assets</h3>
        <p className="text-[10px] text-[var(--neutral-400)]">
          Logos and Milo images stored in the repo. Click to preview.
        </p>
      </div>

      {/* Milo */}
      <div>
        <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-1.5">Milo Smart Assistant</p>
        <div className="space-y-1">
          {milo.length === 0 && <p className="text-[10px] text-[var(--neutral-400)]">No Milo assets found</p>}
          {milo.map((f) => (
            <button
              key={f.path}
              onClick={() => onSelect(selectedAsset?.path === f.path ? null : f)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${selectedAsset?.path === f.path ? "bg-[var(--brand-primary-light)] border border-[var(--brand-primary)]/20" : "bg-white border border-[var(--neutral-200)] hover:bg-[var(--neutral-50)]"}`}
            >
              {f.isImage && (
                <img src={f.rawUrl} alt={f.fileName} className="size-8 rounded object-contain bg-[var(--neutral-50)]" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-[var(--neutral-700)] truncate">{f.fileName}</p>
                <p className="text-[9px] text-[var(--neutral-400)]">{f.ext.toUpperCase()}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Logos by app */}
      {Object.entries(logoGroups).sort().map(([appKey, appFiles]) => (
        <div key={appKey}>
          <p className="text-[10px] font-medium text-[var(--neutral-500)] uppercase tracking-wider mb-1.5">
            {APP_LABELS[appKey] || appKey}
          </p>
          {appFiles.length === 0 ? (
            <p className="text-[10px] text-[var(--neutral-400)] px-3 py-2 bg-[var(--neutral-50)] rounded-lg">No assets yet</p>
          ) : (
            <div className="space-y-1">
              {appFiles.map((f) => (
                <button
                  key={f.path}
                  onClick={() => onSelect(selectedAsset?.path === f.path ? null : f)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-left transition-colors ${selectedAsset?.path === f.path ? "bg-[var(--brand-primary-light)] border border-[var(--brand-primary)]/20" : "bg-white border border-[var(--neutral-200)] hover:bg-[var(--neutral-50)]"}`}
                >
                  {f.isImage && (
                    <img src={f.rawUrl} alt={f.fileName} className="size-8 rounded object-contain bg-[var(--neutral-50)]" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-[var(--neutral-700)] truncate">{f.fileName}</p>
                    <p className="text-[9px] text-[var(--neutral-400)]">{f.ext.toUpperCase()}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Summary */}
      <div className="bg-[var(--neutral-50)] rounded-lg p-3 text-center">
        <p className="text-[10px] text-[var(--neutral-400)]">{files.length} assets total</p>
      </div>
    </div>
  );
}
