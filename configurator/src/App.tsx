import { useState } from "react";
import { useTokens } from "./hooks/useTokens";
import { useSpecs } from "./hooks/useSpecs";
import { usePreview } from "./hooks/usePreview";
import { ColorGroupEditor } from "./components/editors/ColorGroupEditor";
import { SpacingEditor } from "./components/editors/SpacingEditor";
import { RadiusEditor } from "./components/editors/RadiusEditor";
import { FontFamilyEditor } from "./components/editors/FontFamilyEditor";
import { SpecSection } from "./components/editors/SpecEditor";
import { ComponentShowcase } from "./components/preview/ComponentShowcase";
import { DemoRouter } from "./components/preview/demos/DemoRouter";

type Tab = "tokens" | "specs";

export function App() {
  const { tokens, loading, error, updateToken, resetTokens, isDirty: tokensDirty, submitTokens, submitting: tokensSubmitting } = useTokens();
  const { specs, loading: specsLoading, updateSpec, isDirty: specsDirty, submitSpecs, submitting: specsSubmitting } = useSpecs();
  const previewStyle = usePreview(tokens);
  const [tab, setTab] = useState<Tab>("tokens");
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitResult, setSubmitResult] = useState<{ success: boolean; sha?: string } | null>(null);

  const isDirty = tab === "tokens" ? tokensDirty : specsDirty;
  const submitting = tab === "tokens" ? tokensSubmitting : specsSubmitting;

  if (loading || specsLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="size-8 border-2 border-[var(--neutral-300)] border-t-[var(--brand-primary)] rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-[var(--neutral-500)]">Loading design system...</p>
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
    const msg = submitMessage || undefined;
    const result = tab === "tokens"
      ? await submitTokens(msg)
      : await submitSpecs(msg);
    setSubmitResult(result);
    setSubmitMessage("");
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-[var(--neutral-200)] px-6 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-6">
          <div>
            <h1 className="font-heading text-lg font-semibold text-[var(--neutral-900)]">@rello/ui Configurator</h1>
            <p className="text-xs text-[var(--neutral-500)]">Design tokens & component specs</p>
          </div>
          {/* Tabs */}
          <div className="flex items-center gap-1 bg-[var(--neutral-100)] rounded-lg p-0.5">
            <button
              onClick={() => setTab("tokens")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${tab === "tokens" ? "bg-white text-[var(--neutral-900)] font-medium shadow-xs" : "text-[var(--neutral-500)] hover:text-[var(--neutral-700)]"}`}
            >
              Design Tokens
            </button>
            <button
              onClick={() => setTab("specs")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${tab === "specs" ? "bg-white text-[var(--neutral-900)] font-medium shadow-xs" : "text-[var(--neutral-500)] hover:text-[var(--neutral-700)]"}`}
            >
              Component Specs
              {specsDirty && <span className="ml-1.5 size-1.5 inline-block rounded-full bg-[var(--warning)]" />}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-3">
          {isDirty && (
            <span className="text-xs text-[var(--warning)] font-medium">Unsaved changes</span>
          )}
          {tab === "tokens" && (
            <button
              onClick={resetTokens}
              disabled={!tokensDirty}
              className="px-3 py-1.5 text-sm rounded-md border border-[var(--neutral-200)] text-[var(--neutral-600)] hover:bg-[var(--neutral-50)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              Reset
            </button>
          )}
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

      {/* Main layout — both panels scroll independently */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="w-96 bg-white border-r border-[var(--neutral-200)] overflow-y-auto flex-shrink-0 h-[calc(100vh-52px)]" style={{ position: "sticky", top: 52 }}>
          <div className="p-4 flex flex-col gap-6">
            {/* Commit message */}
            {isDirty && (
              <div>
                <label className="block text-xs font-medium text-[var(--neutral-600)] mb-1">Commit message (optional)</label>
                <input
                  value={submitMessage}
                  onChange={(e) => setSubmitMessage(e.target.value)}
                  placeholder={tab === "tokens" ? "Update brand colors" : "Define drawer behavior specs"}
                  className="w-full px-2 py-1.5 text-sm border border-[var(--neutral-200)] rounded-md outline-none focus:border-[var(--brand-primary)]"
                />
              </div>
            )}

            {tab === "tokens" && (
              <>
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
              </>
            )}

            {tab === "specs" && specs && (
              <SpecSection specs={specs.components} onUpdate={updateSpec} selectedId={selectedComponent} onSelect={setSelectedComponent} />
            )}
          </div>
        </aside>

        {/* Preview panel — scrolls independently */}
        <main className="flex-1 overflow-y-auto p-6 h-[calc(100vh-52px)]">
          {tab === "tokens" ? (
            <div style={previewStyle} className="bg-[var(--background)] rounded-xl shadow-lg min-h-full">
              <ComponentShowcase />
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg min-h-full p-8">
              <DemoRouter
                componentId={selectedComponent}
                spec={selectedComponent && specs?.components[selectedComponent] ? specs.components[selectedComponent] : null}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
