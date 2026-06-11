import { describe, it, expect, beforeEach, afterEach } from "vitest";
import type { Request } from "express";
import { buildCorsOptionsDelegate, getAllowedOrigins, isSameOrigin } from "./cors-config.js";

function mockReq(opts: { origin?: string; host?: string; protocol?: string }): Request {
  return {
    headers: { origin: opts.origin, host: opts.host },
    protocol: opts.protocol ?? "https",
  } as unknown as Request;
}

function runDelegate(req: Request): Promise<{ err: Error | null; allowed: boolean }> {
  const delegate = buildCorsOptionsDelegate();
  return new Promise((resolve) => {
    delegate(req, (err, options) => {
      resolve({
        err: (err as Error) ?? null,
        allowed: !err && Boolean(options && (options as { origin?: unknown }).origin),
      });
    });
  });
}

const PROD_HOST = "rello-ui-production.up.railway.app";

describe("isSameOrigin", () => {
  it("matches when Origin equals the request's own proto://host", () => {
    const req = mockReq({ host: PROD_HOST, protocol: "https" });
    expect(isSameOrigin(req, `https://${PROD_HOST}`)).toBe(true);
  });

  it("is case-insensitive on host", () => {
    const req = mockReq({ host: PROD_HOST, protocol: "https" });
    expect(isSameOrigin(req, `https://${PROD_HOST.toUpperCase()}`)).toBe(true);
  });

  it("rejects a different host", () => {
    const req = mockReq({ host: PROD_HOST, protocol: "https" });
    expect(isSameOrigin(req, "https://evil.example.com")).toBe(false);
  });

  it("rejects a protocol mismatch (http page cannot claim https origin parity)", () => {
    const req = mockReq({ host: PROD_HOST, protocol: "https" });
    expect(isSameOrigin(req, `http://${PROD_HOST}`)).toBe(false);
  });

  it("rejects when Host header is absent", () => {
    const req = mockReq({ protocol: "https" });
    expect(isSameOrigin(req, `https://${PROD_HOST}`)).toBe(false);
  });
});

describe("buildCorsOptionsDelegate", () => {
  const savedEnv = { ...process.env };
  beforeEach(() => {
    process.env.NODE_ENV = "production";
    delete process.env.CONFIGURATOR_ALLOWED_ORIGINS;
  });
  afterEach(() => {
    process.env.NODE_ENV = savedEnv.NODE_ENV;
    process.env.CONFIGURATOR_ALLOWED_ORIGINS = savedEnv.CONFIGURATOR_ALLOWED_ORIGINS;
    if (savedEnv.CONFIGURATOR_ALLOWED_ORIGINS === undefined) {
      delete process.env.CONFIGURATOR_ALLOWED_ORIGINS;
    }
  });

  it("REGRESSION 2026-06-11: allows the deployed SPA's own module-script request (same-origin Origin header, empty allowlist)", async () => {
    // <script type="module" crossorigin> sends Origin even same-origin; this
    // exact shape 403'd the prod bundle and blanked the page.
    const req = mockReq({ origin: `https://${PROD_HOST}`, host: PROD_HOST, protocol: "https" });
    const { err, allowed } = await runDelegate(req);
    expect(err).toBeNull();
    expect(allowed).toBe(true);
  });

  it("allows requests with no Origin header (curl, server-to-server)", async () => {
    const req = mockReq({ host: PROD_HOST, protocol: "https" });
    const { err, allowed } = await runDelegate(req);
    expect(err).toBeNull();
    expect(allowed).toBe(true);
  });

  it("allows an origin from CONFIGURATOR_ALLOWED_ORIGINS", async () => {
    process.env.CONFIGURATOR_ALLOWED_ORIGINS = "https://ops.example.com";
    const req = mockReq({ origin: "https://ops.example.com", host: PROD_HOST, protocol: "https" });
    const { err, allowed } = await runDelegate(req);
    expect(err).toBeNull();
    expect(allowed).toBe(true);
  });

  it("rejects a cross-origin request not on the allowlist (PKG-H1 retained)", async () => {
    const req = mockReq({ origin: "https://evil.example.com", host: PROD_HOST, protocol: "https" });
    const { err, allowed } = await runDelegate(req);
    expect(err).toBeInstanceOf(Error);
    expect(err?.message).toMatch(/not allowed by Configurator CORS policy/);
    expect(allowed).toBe(false);
  });

  it("production allowlist excludes localhost dev defaults", () => {
    expect(getAllowedOrigins()).toEqual([]);
  });
});
