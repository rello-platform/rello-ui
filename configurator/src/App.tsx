import { useState } from "react";
import { useTokens } from "./hooks/useTokens";
import { useSpecs } from "./hooks/useSpecs";
import { usePreview } from "./hooks/usePreview";
import { ColorGroupEditor } from "./components/editors/ColorGroupEditor";
import { SpacingEditor } from "./components/editors/SpacingEditor";
import { RadiusEditor } from "./components/editors/RadiusEditor";
import { FontFamilyEditor } from "./components/editors/FontFamilyEditor";
import { SpecSection } from "./components/editors/SpecEditor";
import { AppOverridesEditor } from "./components/editors/AppOverridesEditor";
import { ComponentShowcase } from "./components/preview/ComponentShowcase";
import { DemoRouter } from "./components/preview/demos/DemoRouter";
import { useAppOverrides, COLOR_FIELDS } from "./hooks/useAppOverrides";

type Tab = "tokens" | "specs" | "apps";

export function App() {
  const { tokens, loading, error, updateToken, resetTokens, isDirty: tokensDirty, submitTokens, submitting: tokensSubmitting } = useTokens();
  const { specs, loading: specsLoading, updateSpec, updateParam, isDirty: specsDirty, submitSpecs, submitting: specsSubmitting, makeDefault: specsMakeDefault, resetToDefault: specsResetToDefault } = useSpecs();
  const { overrides, loading: overridesLoading, updateApp, isDirty: overridesDirty, submitOverrides, submitting: overridesSubmitting, resetToDefault: overridesResetToDefault } = useAppOverrides();
  const previewStyle = usePreview(tokens);
  const [tab, setTab] = useState<Tab>("tokens");
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [submitMessage, setSubmitMessage] = useState("");
  const [submitResult, setSubmitResult] = useState<{ success: boolean; sha?: string; action?: string } | null>(null);
  // Preview state: when true, the preview shows current edits. When false, shows the "default" (last saved state)
  const [previewing, setPreviewing] = useState(false);

  const isDirty = tab === "tokens" ? tokensDirty : tab === "specs" ? specsDirty : overridesDirty;
  const submitting = tab === "tokens" ? tokensSubmitting : tab === "specs" ? specsSubmitting : overridesSubmitting;

  if (loading || specsLoading || overridesLoading) {
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

  const handlePreview = () => {
    setPreviewing(true);
  };

  const handleSubmit = async () => {
    const msg = submitMessage || undefined;
    const result = tab === "tokens"
      ? await submitTokens(msg)
      : tab === "specs"
      ? await submitSpecs(msg)
      : await submitOverrides(msg);
    setSubmitResult({ ...result, action: "committed" });
    setSubmitMessage("");
    setPreviewing(false);
  };

  const handleResetToDefault = () => {
    if (tab === "tokens") {
      resetTokens();
    } else if (tab === "specs") {
      specsResetToDefault();
    } else {
      overridesResetToDefault();
    }
    setPreviewing(false);
    setSubmitResult({ success: true, action: "reset" });
  };

  const handleMakeDefault = () => {
    if (tab === "specs") {
      specsMakeDefault();
    }
    // For tokens, "make default" means the current state becomes the baseline
    // without committing to GitHub — just locks in locally
    setPreviewing(false);
    setSubmitResult({ success: true, action: "locked" });
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
            <button
              onClick={() => setTab("apps")}
              className={`px-3 py-1 text-sm rounded-md transition-colors ${tab === "apps" ? "bg-white text-[var(--neutral-900)] font-medium shadow-xs" : "text-[var(--neutral-500)] hover:text-[var(--neutral-700)]"}`}
            >
              App Colors
              {overridesDirty && <span className="ml-1.5 size-1.5 inline-block rounded-full bg-[var(--warning)]" />}
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isDirty && (
            <span className="text-xs text-[var(--warning)] font-medium mr-1">Unsaved changes</span>
          )}
          {/* Preview button — updates the demo panel without committing */}
          <button
            onClick={handlePreview}
            disabled={!isDirty}
            className="px-3 py-1.5 text-sm rounded-md border border-[var(--brand-primary)] text-[var(--brand-primary)] hover:bg-[var(--brand-primary-light)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Preview
          </button>
          {/* Submit — commits to GitHub */}
          <button
            onClick={handleSubmit}
            disabled={!isDirty || submitting}
            className="px-4 py-1.5 text-sm rounded-md bg-[var(--brand-primary)] text-white font-medium hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            {submitting ? "Committing..." : "Submit Changes"}
          </button>
        </div>
      </header>

      {/* Result banner */}
      {submitResult?.success && (
        <div className={`border-b px-6 py-2 flex items-center justify-between ${
          submitResult.action === "committed" ? "bg-[var(--success-light)] border-[var(--success)]" :
          submitResult.action === "reset" ? "bg-[var(--info-light)] border-[var(--info)]" :
          "bg-[var(--brand-primary-light)] border-[var(--brand-primary)]"
        }`}>
          <p className={`text-sm font-medium ${
            submitResult.action === "committed" ? "text-[var(--success)]" :
            submitResult.action === "reset" ? "text-[var(--info)]" :
            "text-[var(--brand-primary)]"
          }`}>
            {submitResult.action === "committed" && `Changes committed successfully! (SHA: ${submitResult.sha?.slice(0, 7)})`}
            {submitResult.action === "reset" && "Reset to last saved defaults"}
            {submitResult.action === "locked" && "Current state locked as new default"}
          </p>
          <button onClick={() => setSubmitResult(null)} className="text-sm opacity-60 hover:opacity-100">&times;</button>
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
              <SpecSection specs={specs.components} onUpdate={updateSpec} onUpdateParam={updateParam} selectedId={selectedComponent} onSelect={setSelectedComponent} />
            )}

            {tab === "apps" && overrides && (
              <AppOverridesEditor defaults={overrides.defaults} apps={overrides.apps} onUpdate={updateApp} />
            )}
          </div>
        </aside>

        {/* Preview panel — scrolls independently */}
        <main className="flex-1 overflow-y-auto p-6 h-[calc(100vh-52px)]">
          {/* Preview panel header with Reset / Make Default buttons */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              {previewing && (
                <span className="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs rounded-full bg-[var(--brand-primary-light)] text-[var(--brand-primary)] font-medium">
                  <span className="size-1.5 rounded-full bg-[var(--brand-primary)] animate-pulse" />
                  Previewing changes
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {/* Reset to Default — reverts to last committed state */}
              <button
                onClick={handleResetToDefault}
                disabled={!isDirty && !previewing}
                className="px-3 py-1.5 text-xs rounded-md border border-[var(--neutral-200)] text-[var(--neutral-600)] hover:bg-[var(--neutral-50)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Reset to Default
              </button>
              {/* Make Default — locks current edits as the new baseline */}
              <button
                onClick={handleMakeDefault}
                disabled={!isDirty}
                className="px-3 py-1.5 text-xs rounded-md border border-[var(--success)] text-[var(--success)] hover:bg-[var(--success-light)] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Make Default
              </button>
            </div>
          </div>

          {tab === "tokens" ? (
            <div style={previewStyle} className="bg-[var(--background)] rounded-xl shadow-lg min-h-full">
              <ComponentShowcase />
            </div>
          ) : tab === "specs" ? (
            <div className="bg-white rounded-xl shadow-lg min-h-full p-8">
              <DemoRouter
                componentId={selectedComponent}
                spec={selectedComponent && specs?.components[selectedComponent] ? specs.components[selectedComponent] : null}
              />
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-lg min-h-full p-8">
              <h2 className="text-xl font-semibold text-[var(--foreground)] mb-2" style={{ fontFamily: "var(--font-heading)" }}>App Color Preview</h2>
              <p className="text-sm text-[var(--neutral-500)] mb-6">Each app mockup uses its own color overrides. Apps with no overrides use the default palette.</p>
              {overrides && (
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(overrides.apps).map(([appId, app]) => {
                    const d = overrides.defaults;
                    const v = (k: string) => (app[k] as string | null) ?? d[k];
                    const primary = v("primary");
                    const accent = v("accent");
                    const pageBg = v("pageBackground");
                    const cardBg = v("cardBackground");
                    const cardBorder = v("cardBorder");
                    const textPrimary = v("primaryText");
                    const textSecondary = v("secondaryText");
                    const textTertiary = v("tertiaryText");
                    const heroBg = v("heroCardBackground");
                    const heroBorder = v("heroCardBorder");
                    const heroTitle = v("heroCardTitle");
                    const rowBg = v("rowBackground");
                    const rowBorder = v("rowBorder");
                    const customCount = COLOR_FIELDS.filter(f => app[f.key] !== null && app[f.key] !== undefined).length;
                    return (
                      <div key={appId} className="rounded-xl overflow-hidden" style={{ border: `1px solid ${cardBorder}` }}>
                        {/* Hero / spotlight card */}
                        <div className="px-4 py-3 flex items-center justify-between" style={{ backgroundColor: heroBg, borderBottom: `1px solid ${heroBorder}` }}>
                          <div>
                            <span className="text-sm font-bold" style={{ color: heroTitle }}>{app.name}</span>
                            <p className="text-[9px]" style={{ color: heroTitle, opacity: 0.6 }}>Hero Card Title</p>
                          </div>
                          <div className="size-6 rounded-full" style={{ backgroundColor: heroTitle, opacity: 0.15 }} />
                        </div>
                        {/* Page body */}
                        <div className="p-3" style={{ backgroundColor: pageBg }}>
                          {/* Regular card */}
                          <div className="rounded-lg p-3 mb-2" style={{ backgroundColor: cardBg, border: `1px solid ${cardBorder}` }}>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="size-7 rounded-lg flex items-center justify-center" style={{ backgroundColor: primary + "1A" }}>
                                <div className="size-3.5 rounded" style={{ backgroundColor: primary, opacity: 0.5 }} />
                              </div>
                              <div>
                                <p className="text-[10px] font-semibold" style={{ color: textPrimary }}>Card Title</p>
                                <p className="text-[8px]" style={{ color: textSecondary }}>Secondary text here</p>
                              </div>
                            </div>
                            <p className="text-[8px] mb-2" style={{ color: textTertiary }}>Tertiary / ghost text for hints and labels</p>
                            <div className="flex gap-1.5">
                              <button className="px-2 py-0.5 text-[8px] font-medium text-white rounded" style={{ backgroundColor: primary }}>Primary</button>
                              <button className="px-2 py-0.5 text-[8px] font-medium text-white rounded" style={{ backgroundColor: accent }}>Accent</button>
                              <a className="px-2 py-0.5 text-[8px] font-medium" style={{ color: primary }}>Link</a>
                            </div>
                          </div>
                          {/* Row items */}
                          <div className="rounded-lg overflow-hidden mb-2" style={{ border: `1px solid ${rowBorder}` }}>
                            {["Sarah Johnson", "Mike Chen", "Emily Davis"].map((name, i) => (
                              <div key={name} className="flex items-center justify-between px-3 py-1.5" style={{ backgroundColor: rowBg, borderTop: i > 0 ? `1px solid ${rowBorder}` : "none" }}>
                                <span className="text-[9px] font-medium" style={{ color: textPrimary }}>{name}</span>
                                <span className="text-[7px]" style={{ color: textTertiary }}>Score: {92 - i * 14}</span>
                              </div>
                            ))}
                          </div>
                          {/* Stat pills */}
                          <div className="flex gap-1.5">
                            <div className="flex-1 rounded p-1.5" style={{ backgroundColor: primary + "1A" }}>
                              <p className="text-[9px] font-bold" style={{ color: primary }}>47</p>
                              <p className="text-[7px]" style={{ color: textTertiary }}>Active</p>
                            </div>
                            <div className="flex-1 rounded p-1.5" style={{ backgroundColor: accent + "1A" }}>
                              <p className="text-[9px] font-bold" style={{ color: accent }}>12</p>
                              <p className="text-[7px]" style={{ color: textTertiary }}>New</p>
                            </div>
                          </div>
                        </div>
                        {/* Footer */}
                        <div className="px-3 py-1.5 text-center" style={{ borderTop: `1px solid ${cardBorder}`, backgroundColor: cardBg }}>
                          <span className="text-[8px]" style={{ color: textTertiary }}>
                            {customCount > 0 ? `${customCount} custom colors` : "Using defaults"}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
