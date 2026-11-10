/**
 * Byte-equality check (v2.39.0): every outcome v2.38.0 knew (the confirm step,
 * started, already-used and error) renders exactly the dialog HTML the v2.38.0
 * build rendered. v2.39.0 only ADDS the "unknown" outcome. The expected HTML is
 * generated from the 19f04a9 dist/client.js by
 * __fixtures__/generate-v2.38.0-snapshot.test.tsx, through the same driver.
 */
import { describe, it, expect, vi, afterEach } from "vitest";
import type * as React from "react";
import { TrialStartModal } from "./TrialStartModal";
import { MODAL_CORPUS, driveModal } from "./__fixtures__/drive-modal";
import snapshot from "./__fixtures__/modal-v2.38.0.json";

const expected = new Map(snapshot.cases.map((c) => [c.name, c.html]));

afterEach(() => {
  vi.restoreAllMocks();
});

describe("TrialStartModal renders every v2.38.0 outcome exactly as v2.38.0 did", () => {
  it("covers every corpus case in the snapshot", () => {
    expect(snapshot.generatedFrom).toContain("19f04a9de2a51b4d7d08a6cfb0e2cea5fa3c78e9");
    expect(MODAL_CORPUS.map((c) => c.name)).toEqual(snapshot.cases.map((c) => c.name));
    expect(MODAL_CORPUS.length).toBeGreaterThanOrEqual(16);
  });

  it.each(MODAL_CORPUS.map((c) => [c.name, c] as const))("%s", async (name, c) => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    const html = await driveModal(TrialStartModal as unknown as React.ComponentType<Record<string, unknown>>, c);
    expect(html).toBe(expected.get(name));
  });
});
