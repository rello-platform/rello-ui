import { describe, expect, it } from "vitest";
import { resolveRelloEmailBrand, type RelloEmailBrandLevelInput } from "./index";

/**
 * THE BRAND RULE (KA amended 121, 2026-10-30), one rule for every app. Kelly:
 * "an agent can have different name and logos from the tenant? For example an
 * RE agent may be inside the tenant account of an MLO. When that is the case,
 * the RE AGents sends are branded iwth their business and logo info."
 */

const MLO_TENANT: RelloEmailBrandLevelInput = {
  name: "Sansom Mortgage",
  logoUrl: "https://cdn.example.com/mlo-logo.png",
  primary: "#0f766e",
};

function rule(business: RelloEmailBrandLevelInput | null | undefined, tenant: RelloEmailBrandLevelInput | null | undefined = MLO_TENANT) {
  return resolveRelloEmailBrand({ agentName: "Mike Jones", business, tenant });
}

describe("agent level wins as a whole", () => {
  it("an RE agent with their own business uses their name, logo and color", () => {
    expect(rule({ name: "Mike Realty", logoUrl: "https://cdn.example.com/mike.png", primary: "#7c3aed" })).toEqual({
      name: "Mike Realty",
      logoUrl: "https://cdn.example.com/mike.png",
      primary: "#7c3aed",
      level: "agent",
    });
  });

  it("no agent color: null, never the tenant's", () => {
    const b = rule({ name: "Mike Realty", logoUrl: "https://cdn.example.com/mike.png" });
    expect(b.primary).toBeNull();
    expect(b.level).toBe("agent");
  });

  it("no agent logo: null, never the tenant's", () => {
    const b = rule({ name: "Mike Realty" });
    expect(b.logoUrl).toBeNull();
    expect(b.name).toBe("Mike Realty");
  });

  it("an own logo with no business name is named by the agent, never the tenant", () => {
    expect(rule({ logoUrl: "https://cdn.example.com/mike.png" })).toEqual({
      name: "Mike Jones",
      logoUrl: "https://cdn.example.com/mike.png",
      primary: null,
      level: "agent",
    });
  });

  it("a logo that is the tenant's own, with no business name, is not an own brand", () => {
    expect(rule({ logoUrl: ` ${MLO_TENANT.logoUrl} ` }).level).toBe("tenant");
  });

  it("trims a business name with a trailing space", () => {
    expect(rule({ name: "Summit Homes " }).name).toBe("Summit Homes");
    expect(rule({ name: "  Summit   Homes " }).name).toBe("Summit Homes");
  });

  it("an agent business with no tenant known is still the agent's", () => {
    expect(rule({ name: "Mike Realty" }, null)).toMatchObject({ name: "Mike Realty", level: "agent" });
  });
});

describe("otherwise tenant level", () => {
  it("no agent business: the tenant's name, logo and color", () => {
    for (const business of [null, undefined, {}, { name: "   ", logoUrl: " " }]) {
      expect(rule(business), JSON.stringify(business)).toEqual({ ...MLO_TENANT, level: "tenant" });
    }
  });

  it("the same business as the tenant renders as the tenant, even with its own logo and color", () => {
    for (const name of ["Sansom Mortgage", "sansom  MORTGAGE ", "Sansom", "Sansom Mortgage, LLC", "Sansom Mortgage Group"]) {
      expect(rule({ name, logoUrl: "https://cdn.example.com/x.png", primary: "#000000" }), name).toEqual({ ...MLO_TENANT, level: "tenant" });
    }
  });

  it("production's real pair: 'ClearPath Utah' inside 'ClearPath Utah Mortgage' is the tenant", () => {
    const tenant = { name: "ClearPath Utah Mortgage", logoUrl: "https://cdn.example.com/cp.png", primary: "#123456" };
    expect(rule({ name: "ClearPath Utah " }, tenant)).toEqual({ ...tenant, level: "tenant" });
  });

  it("a shared word that is not the leading run of words is a different business", () => {
    for (const name of ["Mortgage Sansom", "Sansom Realty", "Mortgage", "Sans", "Sansom Mortgagee"]) {
      expect(rule({ name }), name).toMatchObject({ name, level: "agent" });
    }
  });

  it("the measured RE agents stay agent level", () => {
    for (const name of ["Family Realty", "Michelle Realty", "Mike Realty", "Rick Realty", "Sally Realty"]) {
      expect(rule({ name }), name).toMatchObject({ name, level: "agent" });
    }
    expect(rule({ name: "Timberline Timber" }, { name: "Big Star Mortgage" })).toMatchObject({ name: "Timberline Timber", level: "agent" });
  });
});

describe("nothing is gated", () => {
  it("a tenant with nothing set falls to the agent's own name, no logo, no color", () => {
    expect(rule(null, {})).toEqual({ name: "Mike Jones", logoUrl: null, primary: null, level: "tenant" });
    expect(rule(null, null)).toEqual({ name: "Mike Jones", logoUrl: null, primary: null, level: "tenant" });
  });

  it("nobody at all: an empty name, which the shell shows as nothing", () => {
    expect(resolveRelloEmailBrand({})).toEqual({ name: "", logoUrl: null, primary: null, level: "tenant" });
  });

  it("wrong types read as absent", () => {
    const bad = { name: 7, logoUrl: {}, primary: [] } as unknown as RelloEmailBrandLevelInput;
    expect(rule(bad, bad)).toEqual({ name: "Mike Jones", logoUrl: null, primary: null, level: "tenant" });
  });
});
