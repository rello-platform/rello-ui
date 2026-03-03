import { useState, useEffect, useCallback } from "react";

export interface AppOverride {
  name: string;
  primary: string | null;
  accent: string | null;
  notes: string;
}

export interface AppOverridesState {
  description: string;
  defaults: { primary: string; accent: string };
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

  const updateApp = useCallback((appId: string, field: "primary" | "accent" | "notes", value: string | null) => {
    setOverrides((prev) => {
      if (!prev) return prev;
      const next = structuredClone(prev);
      if (next.apps[appId]) {
        next.apps[appId][field] = value;
      }
      return next;
    });
  }, []);

  const isDirty = overrides && original ? JSON.stringify(overrides) !== JSON.stringify(original) : false;

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

  const resetToDefault = useCallback(() => {
    if (original) setOverrides(structuredClone(original));
  }, [original]);

  return { overrides, loading, updateApp, isDirty, submitOverrides, submitting, resetToDefault };
}
