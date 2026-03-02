import { useState } from "react";
import { useTokens } from "./hooks/useTokens";
import { usePreview } from "./hooks/usePreview";
import { ColorGroupEditor } from "./components/editors/ColorGroupEditor";
import { SpacingEditor } from "./components/editors/SpacingEditor";
import { RadiusEditor } from "./components/editors/RadiusEditor";
import { FontFamilyEditor } from "./components/editors/FontFamilyEditor";
import { ComponentShowcase } from "./components/preview/ComponentShowcase";

export function App() {
  const { tokens, loading, error, updateToken, resetTokens, isDirty, submitTokens, submitting } = useTokens();
  const previewStyle = usePreview(tokens);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitResult, setSubmitResult] = useState<{ success: boolean; sha?: string } | null>(null);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="size-8 border-2 border-[var(--neutral-300)] border-t-[var(--brand-primary)] rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-[var(--neutral-500)]">Loading design tokens...</p>
        </div>
      </div>
    );
  }

  if (error || !tokens) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg shadow-md p-6 max-w-md text-center">
          <p className="text-[var(--error)] font-medium mb-2">Failed to load tokens</p>
          <p className="text-sm text-[var(--neutral-500)]">{error || "Unknown error"}</p>
          <p className="text-xs text-[var(--neutral-400)] mt-3">Make sure GITHUB_TOKEN is set and the server is running.</p>
        </div>
      </div>
    );
  }

  const handleSubmit = async () => {
    const result = await submitTokens(submitMessage || undefined);
    setSubmitResult(result);
    setSubmitMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[var(--neutral-200)] px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h1 className="font-heading text-lg font-semibold text-[var(--neutral-900)]">@rello/ui Configurator</h1>
          <p className="text-xs text-[var(--neutral-500)]">Edit design tokens with live preview</p>
        </div>
        <div className="flex items-center gap-3">
          {isDirty && (
            <span className="text-xs text-[var(--warning)] font-medium">Unsaved changes</span>
          )}
          <button
            onClick={resetTokens}
            disabled={!isDirty}
            className="px-3 py-1.5 text-sm rounded-md border border-[var(--neutral-200)] text-[var(--neutral-600)] hover:bg-[var(--neutral-50)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleSubmit}
            disabled={!isDirty || submitting}
            className="px-4 py-1.5 text-sm rounded-md bg-[var(--brand-primary)] text-white font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? "Committing..." : "Submit Changes"}
          </button>
        </div>
      </header>

      {/* Success banner */}
      {submitResult?.success && (
        <div className="bg-[var(--success-light)] border-b border-[var(--success)] px-6 py-2 flex items-center justify-between">
          <p className="text-sm text-[var(--success)] font-medium">
            Changes committed successfully! (SHA: {submitResult.sha?.slice(0, 7)})
          </p>
          <button onClick={() => setSubmitResult(null)} className="text-[var(--success)] text-sm hover:opacity-70">Dismiss</button>
        </div>
      )}

      {/* Main layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar — editors */}
        <aside className="w-80 bg-white border-r border-[var(--neutral-200)] overflow-y-auto flex-shrink-0">
          <div className="p-4 flex flex-col gap-6">
            {/* Commit message */}
            {isDirty && (
              <div>
                <label className="block text-xs font-medium text-[var(--neutral-600)] mb-1">Commit message (optional)</label>
                <input
                  value={submitMessage}
                  onChange={(e) => setSubmitMessage(e.target.value)}
                  placeholder="Update brand colors"
                  className="w-full px-2 py-1.5 text-sm border border-[var(--neutral-200)] rounded-md outline-none focus:border-[var(--brand-primary)]"
                />
              </div>
            )}

            <ColorGroupEditor
              title="Brand Colors"
              description="Customizable per tenant"
              colors={[
                { label: "Primary", path: "brand.primary", value: tokens.brand.primary },
                { label: "Accent", path: "brand.accent", value: tokens.brand.accent },
              ]}
              onUpdate={updateToken}
            />

            <ColorGroupEditor
              title="Pipeline Stages"
              description="Universal lead status colors"
              colors={[
                { label: "Hot", path: "pipeline.hot", value: tokens.pipeline.hot },
                { label: "Qualified", path: "pipeline.qualified", value: tokens.pipeline.qualified },
                { label: "Engaged", path: "pipeline.engaged", value: tokens.pipeline.engaged },
                { label: "Warming", path: "pipeline.warming", value: tokens.pipeline.warming },
                { label: "Cold", path: "pipeline.cold", value: tokens.pipeline.cold },
              ]}
              onUpdate={updateToken}
            />

            <ColorGroupEditor
              title="Status Colors"
              description="Feedback and alerts"
              colors={[
                { label: "Success", path: "status.success", value: tokens.status.success },
                { label: "Warning", path: "status.warning", value: tokens.status.warning },
                { label: "Error", path: "status.error", value: tokens.status.error },
                { label: "Info", path: "status.info", value: tokens.status.info },
              ]}
              onUpdate={updateToken}
            />

            <ColorGroupEditor
              title="Neutrals"
              description="Grayscale palette"
              colors={
                (["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"] as const).map((n) => ({
                  label: n,
                  path: `neutral.${n}`,
                  value: tokens.neutral[n],
                }))
              }
              onUpdate={updateToken}
            />

            <SpacingEditor
              title="Spacing"
              values={tokens.spacing}
              onUpdate={updateToken}
              prefix="spacing"
            />

            <RadiusEditor
              title="Border Radius"
              values={tokens.radius}
              onUpdate={updateToken}
            />

            <FontFamilyEditor
              title="Font Families"
              fonts={tokens.fontFamily}
              onUpdate={updateToken}
            />
          </div>
        </aside>

        {/* Preview panel */}
        <main className="flex-1 overflow-y-auto p-6">
          <div style={previewStyle} className="bg-[var(--background)] rounded-xl shadow-lg min-h-full">
            <ComponentShowcase />
          </div>
        </main>
      </div>
    </div>
  );
}
