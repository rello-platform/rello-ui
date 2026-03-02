import { useState, useEffect, useCallback } from "react";

export interface ComponentSpec {
  name: string;
  category: string;
  description: string;
  behavior: string;
  appearance: string;
  doUse: string;
  dontUse: string;
}

export interface SpecsState {
  components: Record<string, ComponentSpec>;
}

export function useSpecs() {
  const [specs, setSpecs] = useState<SpecsState | null>(null);
  const [original, setOriginal] = useState<SpecsState | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetch("/api/specs")
      .then((res) => res.json())
      .then((data) => {
        setSpecs(data);
        setOriginal(structuredClone(data));
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const updateSpec = useCallback((componentId: string, field: keyof ComponentSpec, value: string) => {
    setSpecs((prev) => {
      if (!prev) return prev;
      const next = structuredClone(prev);
      if (next.components[componentId]) {
        next.components[componentId][field] = value;
      }
      return next;
    });
  }, []);

  const isDirty = specs && original ? JSON.stringify(specs) !== JSON.stringify(original) : false;

  const submitSpecs = useCallback(async (message?: string) => {
    if (!specs) return;
    setSubmitting(true);
    try {
      const res = await fetch("/api/specs/commit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ specs, message }),
      });
      const data = await res.json();
      if (data.success) {
        setOriginal(structuredClone(specs));
      }
      return data;
    } finally {
      setSubmitting(false);
    }
  }, [specs]);

  return { specs, loading, updateSpec, isDirty, submitSpecs, submitting };
}
