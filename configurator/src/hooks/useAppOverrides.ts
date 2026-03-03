import { useState, useEffect, useCallback, useMemo } from "react";

export const COLOR_FIELDS = [
  { key: "primary", label: "Primary Brand" },
  { key: "accent", label: "Accent Brand" },
  { key: "appTitleColor", label: "App Title Color" },
  { key: "appSubtitleColor", label: "App Subtitle Color" },
  { key: "pageBackground", label: "Page Background" },
  { key: "cardBackground", label: "Card Background" },
  { key: "cardBorder", label: "Card Border" },
  { key: "primaryText", label: "Primary Text" },
  { key: "secondaryText", label: "Secondary Text" },
  { key: "tertiaryText", label: "Tertiary (Ghost) Text" },
  { key: "heroCardBackground", label: "Hero Card Background" },
  { key: "heroCardBorder", label: "Hero Card Border" },
  { key: "heroCardTitle", label: "Hero Card Title" },
  { key: "heroCardBodyText", label: "Hero Card Body Text" },
  { key: "rowBackground", label: "Row Background" },
  { key: "rowBorder", label: "Row Border" },
] as const;

export type ColorFieldKey = typeof COLOR_FIELDS[number]["key"];

export interface AppOverride {
  name: string;
  notes: string;
  [key: string]: string | null;
}

export interface AppOverridesState {
  description: string;
  defaults: Record<string, string>;
  apps: Record<string, AppOverride>;
}

export function useAppOverrides() {
  const [overrides, setOverrides] = useState<AppOverridesState | null>(null);
  const [original, setOriginal] = useState<AppOverridesState | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/app-overrides")
      .then((res) => res.json())
      .then((data) => {
        setOverrides(data);
        setOriginal(structuredClone(data));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateApp = useCallback((appId: string, field: string, value: string | null) => {
    setOverrides((prev) => {
      if (!prev || !prev.apps[appId]) return prev;
      return {
        ...prev,
        apps: {
          ...prev.apps,
          [appId]: { ...prev.apps[appId], [field]: value },
        },
      };
    });
  }, []);

  const isDirty = useMemo(
    () => (overrides && original ? JSON.stringify(overrides) !== JSON.stringify(original) : false),
    [overrides, original],
  );

  const submitOverrides = useCallback(async (message?: string) => {
    if (!overrides) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/app-overrides/commit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ overrides, message }),
      });
      const data = await res.json();
      if (data.success) {
        setOriginal(structuredClone(overrides));
      }
      return data;
    } finally {
      setSubmitting(false);
    }
  }, [overrides]);

  const makeDefault = useCallback(() => {
    setOverrides((prev) => {
      if (!prev) return prev;
      const newDefaults = { ...prev.defaults };
      const newApps: Record<string, AppOverride> = {};
      // Promote every custom override into defaults, then clear overrides
      for (const [appId, app] of Object.entries(prev.apps)) {
        for (const f of COLOR_FIELDS) {
          const val = app[f.key];
          if (val != null) {
            newDefaults[f.key] = val;
          }
        }
        // Clear all color overrides, keep name/notes
        const cleaned: AppOverride = { name: app.name, notes: app.notes };
        for (const f of COLOR_FIELDS) {
          cleaned[f.key] = null;
        }
        newApps[appId] = cleaned;
      }
      return { ...prev, defaults: newDefaults, apps: newApps };
    });
  }, []);

  const resetToDefault = useCallback(() => {
    if (original) setOverrides(structuredClone(original));
  }, [original]);

  const hasCustomOverrides = useMemo(() => {
    if (!overrides) return false;
    return Object.values(overrides.apps).some(app =>
      COLOR_FIELDS.some(f => app[f.key] != null),
    );
  }, [overrides]);

  return { overrides, loading, updateApp, isDirty, submitOverrides, submitting, resetToDefault, makeDefault, hasCustomOverrides };
}
