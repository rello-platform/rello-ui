// src/lib/cn.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
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
  badgeVariants,
  buildLocationTagSlug,
  buttonVariants,
  cn,
  formatCopy,
  getTeamCopy
};
//# sourceMappingURL=index.js.map