import { useState, useEffect, useCallback } from "react";
import type { TokenState } from "../types/tokens";

export function useTokens() {
  const [tokens, setTokens] = useState<TokenState | null>(null);
  const [original, setOriginal] = useState<TokenState | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/tokens")
      .then((res) => res.json())
      .then((data) => {
        setTokens(data.tokens);
        setOriginal(structuredClone(data.tokens));
        // Load any non-default Google Fonts on startup
        if (data.tokens?.fontFamily) {
          const fonts = data.tokens.fontFamily as Record<string, string>;
          const loaded = new Set<string>();
          Object.values(fonts).forEach((fontName) => {
            if (fontName && !loaded.has(fontName)) {
              loaded.add(fontName);
              const encoded = fontName.replace(/ /g, "+");
              const link = document.createElement("link");
              link.rel = "stylesheet";
              link.href = `https://fonts.googleapis.com/css2?family=${encoded}:wght@400;500;600;700&display=swap`;
              document.head.appendChild(link);
            }
          });
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const updateToken = useCallback((path: string, value: string | number) => {
    setTokens((prev) => {
      if (!prev) return prev;
      const next = structuredClone(prev);
      const keys = path.split(".");
      let target: Record<string, unknown> = next as unknown as Record<string, unknown>;
      for (let i = 0; i < keys.length - 1; i++) {
        target = target[keys[i]] as Record<string, unknown>;
      }
      target[keys[keys.length - 1]] = value;

      // Auto-compute light variants for colors with 15% opacity
      if (path.endsWith(".primary") && path.startsWith("brand")) {
        (next.brand as Record<string, unknown>).primaryLight = hexToRgba(value as string, 0.15);
      }
      if (path.endsWith(".accent") && path.startsWith("brand")) {
        (next.brand as Record<string, unknown>).accentLight = hexToRgba(value as string, 0.15);
      }
      const lightMap: Record<string, string> = {
        "pipeline.hot": "pipeline.hotLight",
        "pipeline.qualified": "pipeline.qualifiedLight",
        "pipeline.engaged": "pipeline.engagedLight",
        "pipeline.warming": "pipeline.warmingLight",
        "pipeline.cold": "pipeline.coldLight",
        "status.success": "status.successLight",
        "status.warning": "status.warningLight",
        "status.error": "status.errorLight",
        "status.info": "status.infoLight",
      };
      if (lightMap[path]) {
        const lightKeys = lightMap[path].split(".");
        let lt: Record<string, unknown> = next as unknown as Record<string, unknown>;
        for (let i = 0; i < lightKeys.length - 1; i++) lt = lt[lightKeys[i]] as Record<string, unknown>;
        lt[lightKeys[lightKeys.length - 1]] = hexToRgba(value as string, 0.15);
      }

      return next;
    });
  }, []);

  const resetTokens = useCallback(() => {
    if (original) setTokens(structuredClone(original));
  }, [original]);

  const isDirty = tokens && original ? JSON.stringify(tokens) !== JSON.stringify(original) : false;

  const submitTokens = useCallback(async (message?: string) => {
    if (!tokens) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/tokens/commit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tokens, message }),
      });
      const data = await res.json();
      if (data.success) {
        setOriginal(structuredClone(tokens));
      }
      return data;
    } finally {
      setSubmitting(false);
    }
  }, [tokens]);

  return { tokens, loading, error, updateToken, resetTokens, isDirty, submitTokens, submitting };
}

function hexToRgba(hex: string, alpha: number): string {
  const clean = hex.replace("#", "");
  const r = parseInt(clean.substring(0, 2), 16);
  const g = parseInt(clean.substring(2, 4), 16);
  const b = parseInt(clean.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
