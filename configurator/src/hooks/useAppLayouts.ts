import { useState, useEffect, useCallback } from "react";

export interface NavItem {
  icon: string;
  label: string;
}

export interface NavGroup {
  label: string | null;
  items: NavItem[];
}

export interface AppLayout {
  name: string;
  subtitle: string;
  highlightText: string;
  sidebarGroups: NavGroup[];
  heroStyle: "transparent" | "dark";
  rightCard: boolean;
  rightCardTitle: string;
  rightCardContent: string;
}

export interface AppLayoutsState {
  description: string;
  shellSpec: Record<string, string>;
  apps: Record<string, AppLayout>;
}

export function useAppLayouts() {
  const [layouts, setLayouts] = useState<AppLayoutsState | null>(null);
  const [original, setOriginal] = useState<AppLayoutsState | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/app-layouts")
      .then((res) => res.json())
      .then((data) => { setLayouts(data); setOriginal(structuredClone(data)); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const updateLayout = useCallback((appId: string, field: string, value: unknown) => {
    setLayouts((prev) => {
      if (!prev) return prev;
      const next = structuredClone(prev);
      if (next.apps[appId]) {
        (next.apps[appId] as Record<string, unknown>)[field] = value;
      }
      return next;
    });
  }, []);

  const isDirty = layouts && original ? JSON.stringify(layouts) !== JSON.stringify(original) : false;

  const submitLayouts = useCallback(async (message?: string) => {
    if (!layouts) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/app-layouts/commit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ layouts, message }) });
      const data = await res.json();
      if (data.success) setOriginal(structuredClone(layouts));
      return data;
    } finally { setSubmitting(false); }
  }, [layouts]);

  const updateShellSpec = useCallback((field: string, value: string) => {
    setLayouts((prev) => {
      if (!prev) return prev;
      return { ...prev, shellSpec: { ...prev.shellSpec, [field]: value } };
    });
  }, []);

  const resetToDefault = useCallback(() => { if (original) setLayouts(structuredClone(original)); }, [original]);

  return { layouts, loading, updateLayout, updateShellSpec, isDirty, submitLayouts, submitting, resetToDefault };
}
