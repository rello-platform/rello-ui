// src/lib/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/lead-team/catalog.ts
var DEFAULT_TEAM_COPY = {
  LOAN_OFFICER: {
    title: "{firstName}, your loan officer",
    shortTitle: "Your loan officer",
    bio: "{firstName} specializes in helping people just like you get mortgage-ready. When it\u2019s time to pull the trigger on pre-approval, {firstName} will make the process painless."
  },
  REAL_ESTATE_AGENT: {
    title: "{firstName}, your amazing real estate agent",
    shortTitle: "Your real estate agent",
    bio: "{firstName} will be with you from day one \u2014 helping you explore neighborhoods, understand the market, and find the perfect home when you\u2019re ready."
  },
  MANAGING_BROKER: {
    title: "{firstName}, your managing broker",
    shortTitle: "Your managing broker",
    bio: "{firstName} oversees your team and is here to make sure your home-buying experience runs smoothly from start to finish."
  },
  SMART_ASSISTANT: {
    title: "Milo, your smart assistant",
    shortTitle: "Smart assistant",
    bio: "He\u2019s small, blue, and weirdly passionate about helping you get into a home. Milo never sleeps, never forgets, and somehow makes budgeting feel less painful. We\u2019d promote him but he\u2019s already running the place."
  }
};
function getTeamCopy(role, override) {
  const def = DEFAULT_TEAM_COPY[role];
  const o = override?.[role];
  if (!o) return def;
  return {
    title: o.title ?? def.title,
    shortTitle: o.shortTitle ?? def.shortTitle,
    bio: o.bio ?? def.bio
  };
}
var AGENT_ROLE_TO_TEAM_ROLE = {
  AGENT: "REAL_ESTATE_AGENT",
  MLO: "LOAN_OFFICER",
  BROKER: "MANAGING_BROKER"
};
function agentRoleToTeamRole(role) {
  return AGENT_ROLE_TO_TEAM_ROLE[role];
}
function formatCopy(template, firstName, lastName) {
  return template.replace(/\{firstName\}/g, firstName).replace(/\{lastName\}/g, lastName);
}

// src/components/pipeline-thermometer/stages.ts
var STAGES = ["cold", "warming", "engaged", "qualified", "hot"];
var STAGE_LABELS = {
  cold: "Cold",
  warming: "Warming",
  engaged: "Engaged",
  qualified: "Qualified",
  hot: "Hot"
};
var STAGE_COLORS = {
  cold: "var(--cold)",
  warming: "var(--warming)",
  engaged: "var(--engaged)",
  qualified: "var(--qualified)",
  hot: "var(--hot)"
};

// src/components/address-autocomplete/slug.ts
function slugify(text) {
  return text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}
function buildLocationTagSlug(address) {
  if (address.city && address.state) {
    return `location:${slugify(address.city)}-${address.state.toLowerCase()}`;
  }
  if (address.zip) {
    return `location:${address.zip}`;
  }
  return `location:${slugify(address.formattedAddress)}`;
}
export {
  DEFAULT_TEAM_COPY,
  STAGES,
  STAGE_COLORS,
  STAGE_LABELS,
  agentRoleToTeamRole,
  buildLocationTagSlug,
  cn,
  formatCopy,
  getTeamCopy
};
//# sourceMappingURL=index.js.map