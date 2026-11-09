// src/lib/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/lib/alpha-tint.ts
function hexAlphaToPercent(byte) {
  if (!Number.isFinite(byte)) return 0;
  const clamped = Math.min(255, Math.max(0, byte));
  return clamped / 255 * 100;
}
function alphaTint(color, percent) {
  const pct = Number.isFinite(percent) ? Math.min(100, Math.max(0, percent)) : 0;
  const rounded = Math.round(pct * 1e4) / 1e4;
  return `color-mix(in srgb, ${color} ${rounded}%, transparent)`;
}

// src/components/button/variants.ts
import { cva } from "class-variance-authority";
var buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2",
  {
    variants: {
      variant: {
        primary: "bg-[var(--brand-primary)] text-white hover:opacity-90",
        secondary: "bg-[var(--neutral-100)] text-[var(--neutral-700)] hover:bg-[var(--neutral-200)]",
        accent: "bg-[var(--brand-accent)] text-white hover:opacity-90",
        ghost: "bg-transparent text-[var(--neutral-500)] hover:bg-[var(--neutral-100)] hover:text-[var(--neutral-700)]",
        danger: "bg-[var(--error)] text-white hover:opacity-90",
        outline: "border border-[var(--neutral-200)] bg-white text-[var(--neutral-700)] hover:bg-[var(--neutral-50)]",
        link: "text-[var(--brand-primary)] underline-offset-4 hover:underline"
      },
      size: {
        xs: "h-7 px-2 text-xs gap-1",
        sm: "h-8 px-3 text-xs gap-1.5",
        md: "h-9 px-4 text-sm gap-2",
        lg: "h-10 px-5 text-base gap-2",
        xl: "h-12 px-6 text-base gap-2.5",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

// src/components/badge/variants.ts
import { cva as cva2 } from "class-variance-authority";
var badgeVariants = cva2(
  "inline-flex items-center gap-1 font-medium rounded-full whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-[var(--neutral-100)] text-[var(--neutral-600)]",
        primary: "bg-[var(--brand-primary-light)] text-[var(--brand-primary)]",
        accent: "bg-[var(--brand-accent-light)] text-[var(--brand-accent)]",
        success: "bg-[var(--success-light)] text-[var(--success)]",
        warning: "bg-[var(--warning-light)] text-[var(--warning)]",
        error: "bg-[var(--error-light)] text-[var(--error)]",
        info: "bg-[var(--info-light)] text-[var(--info)]",
        hot: "bg-[var(--hot-light)] text-[var(--hot)]",
        qualified: "bg-[var(--qualified-light)] text-[var(--qualified)]",
        engaged: "bg-[var(--engaged-light)] text-[var(--engaged)]",
        warming: "bg-[var(--warming-light)] text-[var(--warming)]",
        cold: "bg-[var(--cold-light)] text-[var(--cold)]",
        // Pipeline stage variants
        LEAD: "bg-[#EFF6FF] text-[#3B82F6]",
        NURTURING: "bg-[#FFFBEB] text-[#F59E0B]",
        APPLICATION: "bg-[#F5F3FF] text-[#8B5CF6]",
        PROCESSING: "bg-[#EEF2FF] text-[#6366F1]",
        CLOSED_WON: "bg-[#ECFDF5] text-[#10B981]",
        CLOSED_LOST: "bg-[#F9FAFB] text-[#6B7280]"
      },
      size: {
        xs: "px-1.5 py-0.5 text-[10px]",
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-1 text-xs",
        lg: "px-3 py-1 text-sm"
      }
    },
    defaultVariants: { variant: "default", size: "md" }
  }
);

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

// src/components/rello-upsell-nudge/copy.ts
var TOKEN = /\{\{\s*([A-Za-z0-9_]+)\s*\}\}/g;
function usableValue(name, values) {
  const raw = name === "monthlyPrice" ? values.monthlyPrice : name === "roiCopy" ? values.roiCopy : void 0;
  if (typeof raw !== "string") return null;
  const trimmed = raw.trim();
  if (trimmed === "") return null;
  if (name === "monthlyPrice" && !/[1-9]/.test(trimmed)) return null;
  return trimmed;
}
function splitSentences(template) {
  const pieces = [];
  const re = /([\s\S]*?)(?:([.!?]+)(\s+|$)|(\n\s*)|$)/g;
  let match;
  while ((match = re.exec(template)) !== null) {
    const [whole, body = "", stop = "", stopSep = "", lineSep = ""] = match;
    if (whole === "") break;
    pieces.push({ text: body + stop, sep: stop ? stopSep : lineSep });
    if (re.lastIndex >= template.length) break;
  }
  return pieces;
}
function newlineCount(s) {
  return (s.match(/\n/g) ?? []).length;
}
function renderUpsellCopy(template, values = {}) {
  if (typeof template !== "string") return "";
  if (!template.includes("{{") && !template.includes("}}")) return template;
  const pieces = splitSentences(template);
  const kept = [];
  let pendingSep = "";
  for (const piece of pieces) {
    let missing = false;
    const rendered = piece.text.replace(TOKEN, (_match, name) => {
      const value = usableValue(name, values);
      if (value === null) {
        missing = true;
        return "";
      }
      return value;
    });
    const leftover = missing ? false : /\{\{|\}\}/.test(rendered);
    if (missing || leftover) {
      if (kept.length > 0 && newlineCount(piece.sep) > newlineCount(pendingSep)) pendingSep = piece.sep;
      continue;
    }
    if (kept.length > 0) kept[kept.length - 1].sep = pendingSep;
    kept.push({ text: rendered, sep: piece.sep });
    pendingSep = piece.sep;
  }
  return kept.map((p, i) => i < kept.length - 1 ? p.text + p.sep : p.text).join("").trim();
}

// src/components/rello-upsell-nudge/events.ts
var UPSELL_EVENTS = ["shown", "engaged", "dismissed", "clicked", "converted"];
var UPSELL_ENGAGED_DWELL_MS = 3e3;

// src/components/trial-countdown-banner/remaining.ts
var MINUTE_MS = 6e4;
var HOUR_MS = 60 * MINUTE_MS;
var DAY_MS = 24 * HOUR_MS;
var TRIAL_URGENT_WINDOW_MS = 48 * HOUR_MS;
function parseTrialEndsAt(trialEndsAt) {
  let ms;
  if (trialEndsAt instanceof Date) ms = trialEndsAt.getTime();
  else if (typeof trialEndsAt === "number") ms = trialEndsAt;
  else if (typeof trialEndsAt === "string" && trialEndsAt.trim() !== "") ms = Date.parse(trialEndsAt);
  else return null;
  return Number.isFinite(ms) ? ms : null;
}
function getTrialTimeRemaining(trialEndsAt, now = Date.now()) {
  const end = parseTrialEndsAt(trialEndsAt);
  if (end === null || !Number.isFinite(now)) return null;
  const msRemaining = end - now;
  if (msRemaining <= 0) return null;
  const isUrgent = msRemaining <= TRIAL_URGENT_WINDOW_MS;
  if (msRemaining >= DAY_MS) return { unit: "days", value: Math.ceil(msRemaining / DAY_MS), msRemaining, isUrgent };
  if (msRemaining >= HOUR_MS) return { unit: "hours", value: Math.ceil(msRemaining / HOUR_MS), msRemaining, isUrgent };
  return { unit: "minutes", value: Math.ceil(msRemaining / MINUTE_MS), msRemaining, isUrgent };
}
var UNIT_SINGULAR = { days: "day", hours: "hour", minutes: "minute" };
function formatTrialTimeRemaining(remaining) {
  return `${remaining.value} ${remaining.value === 1 ? UNIT_SINGULAR[remaining.unit] : remaining.unit}`;
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
  TRIAL_URGENT_WINDOW_MS,
  UPSELL_ENGAGED_DWELL_MS,
  UPSELL_EVENTS,
  agentRoleToTeamRole,
  alphaTint,
  badgeVariants,
  buildLocationTagSlug,
  buttonVariants,
  cn,
  formatCopy,
  formatTrialTimeRemaining,
  getTeamCopy,
  getTrialTimeRemaining,
  hexAlphaToPercent,
  parseTrialEndsAt,
  renderUpsellCopy
};
//# sourceMappingURL=index.js.map