// @vitest-environment node
/**
 * Property check (GD-11): for a fixed corpus of v2.37.1 caller props with no
 * "{{" in any field, the current <RelloUpsellNudge> renders exactly the HTML
 * the v2.37.1 build rendered. The expected HTML is generated from the
 * 2d5e639 dist/client.js by __fixtures__/generate-v2.37.1-snapshot.test.tsx.
 */
import { describe, it, expect } from "vitest";
import * as React from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Sparks } from "iconoir-react";
import { RelloUpsellNudge, type RelloUpsellNudgeProps } from "./RelloUpsellNudge";
import corpus from "./__fixtures__/legacy-corpus.json";
import snapshot from "./__fixtures__/nudge-v2.37.1.json";

const expected = new Map(snapshot.cases.map((c) => [c.name, c.html]));

describe("RelloUpsellNudge renders v2.37.1 copy exactly as v2.37.1 did", () => {
  it("covers every corpus case in the snapshot", () => {
    expect(snapshot.generatedFrom).toContain("2d5e63951f0493fef2b654fddc2e68a0354ab5ee");
    expect(corpus.cases.map((c) => c.name)).toEqual(snapshot.cases.map((c) => c.name));
    expect(corpus.cases.length).toBeGreaterThanOrEqual(14);
  });

  it.each(corpus.cases.map((c) => [c.name, c.props] as const))("%s", (name, props) => {
    const { icon, ...rest } = props as Record<string, unknown>;
    const html = renderToStaticMarkup(
      <RelloUpsellNudge
        {...(rest as unknown as RelloUpsellNudgeProps)}
        icon={icon === "sparks" ? <Sparks width={20} height={20} /> : undefined}
        onClick={() => {}}
        onDismiss={() => {}}
      />,
    );
    expect(html).toBe(expected.get(name));
  });
});
