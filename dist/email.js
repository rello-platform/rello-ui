// tokens/app-overrides.json
var app_overrides_default = {
  description: "Per-app color overrides. Each app inherits the default design tokens unless overridden here. Set a value to null to inherit the default.",
  defaults: {
    primary: "#3B5998",
    accent: "#C9785D",
    pageBackground: "#FAFBFC",
    cardBackground: "#FFFFFF",
    cardBorder: "#D1D5DB",
    primaryText: "#2D3339",
    secondaryText: "#646F77",
    tertiaryText: "#98A1AA",
    heroCardBackground: "#2D3339",
    heroCardBorder: "#434B52",
    heroCardTitle: "#FFFFFF",
    rowBackground: "#FFFFFF",
    rowBorder: "#D1D5DB",
    heroCardBodyText: "#C8CED3",
    appTitleColor: "#2D3339",
    appSubtitleColor: "#646F77"
  },
  apps: {
    rello: {
      name: "Rello",
      accent: "#FDBA74",
      pageBackground: "#FAF8F5",
      cardBackground: "#FFFFFF",
      cardBorder: "#E7E5E4",
      primaryText: "#1C1917",
      secondaryText: "#57534E",
      tertiaryText: "#A8A29E",
      heroCardBackground: "#292524",
      heroCardBorder: "#292524",
      heroCardTitle: "#FFFFFF",
      rowBackground: "#F5F0EB",
      rowBorder: "#E7E5E4",
      notes: "Back-office CRM \u2014 uses default brand colors",
      heroCardBodyText: "#9A9895",
      appTitleColor: "#1C1917",
      appSubtitleColor: "#57534E"
    },
    "the-drumbeat": {
      name: "The Drumbeat",
      primary: "#D4506A",
      accent: "#EDA5B4",
      pageBackground: "#FBF9FA",
      cardBackground: "#FFFFFF",
      cardBorder: "#EAE3E6",
      primaryText: "#2D1620",
      secondaryText: "#6E5460",
      tertiaryText: "#ADA2A7",
      heroCardBackground: "#2D1620",
      heroCardBorder: "#2D1620",
      heroCardTitle: "#FFFFFF",
      rowBackground: "#F6F2F4",
      rowBorder: "#EAE3E6",
      notes: "Daily action dashboard",
      heroCardBodyText: "#ADA2A7",
      appTitleColor: "#2D1620",
      appSubtitleColor: "#6E5460"
    },
    conversations: {
      name: "Conversations",
      primary: "#0D9488",
      accent: "#5EEAD4",
      pageBackground: "#F8FBFA",
      cardBackground: "#FFFFFF",
      cardBorder: "#E0EAE7",
      primaryText: "#142726",
      secondaryText: "#4F6461",
      tertiaryText: "#97ABA7",
      heroCardBackground: "#F8FBFA",
      heroCardBorder: "#F8FBFA",
      heroCardTitle: "#0D9488",
      rowBackground: "#F0F6F4",
      rowBorder: "#E0EAE7",
      notes: "Phone, SMS, email communication hub",
      heroCardBodyText: "#4F6461",
      appTitleColor: "#142726",
      appSubtitleColor: "#4F6461"
    },
    "home-ready": {
      name: "Home Ready",
      primary: "#0270D2",
      accent: "#C9785E",
      pageBackground: "#F7F9FB",
      cardBackground: "#FFFFFF",
      cardBorder: "#E1E7ED",
      primaryText: "#0F2137",
      secondaryText: "#5A6A7A",
      tertiaryText: "#9AA7B4",
      heroCardBackground: "#F7F9FB",
      heroCardBorder: "#F7F9FB",
      heroCardTitle: "#0270D2",
      rowBackground: "#EFF4F9",
      rowBorder: "#E1E7ED",
      notes: "Consumer-facing buyer qualification \u2014 homeready.app",
      heroCardBodyText: "#5A6A7A",
      appTitleColor: "#0F2137",
      appSubtitleColor: "#5A6A7A"
    },
    "the-homestretch": {
      name: "The HomeStretch",
      primary: "#0070D2",
      accent: "#36B37E",
      pageBackground: "#F8FAFB",
      cardBackground: "#FFFFFF",
      cardBorder: "#E2E8EE",
      primaryText: "#112240",
      secondaryText: "#546B81",
      tertiaryText: "#96A5B4",
      heroCardBackground: "#F8FAFB",
      heroCardBorder: "#F8FAFB",
      heroCardTitle: "#0070D2",
      rowBackground: "#F0F5FA",
      rowBorder: "#E2E8EE",
      notes: "Consumer-facing education & closing \u2014 thehomestretch.ai",
      heroCardBodyText: "#546B81",
      appTitleColor: "#112240",
      appSubtitleColor: "#546B81"
    },
    "open-house-hub": {
      name: "Open House Hub",
      primary: "#0D9488",
      accent: "#5EEAD4",
      pageBackground: "#F8FBFA",
      cardBackground: "#FFFFFF",
      cardBorder: "#E0EAE7",
      primaryText: "#142726",
      secondaryText: "#4F6461",
      tertiaryText: "#97ABA7",
      heroCardBackground: "#F8FBFA",
      heroCardBorder: "#F8FBFA",
      heroCardTitle: "#0D9488",
      rowBackground: "#F0F6F4",
      rowBorder: "#E0EAE7",
      notes: "Open house lead capture \u2014 openhousehub.app",
      heroCardBodyText: "#97ABA7",
      appTitleColor: "#142726",
      appSubtitleColor: "#4F6461"
    },
    "pathfinder-pro": {
      name: "PathfinderPro",
      primary: "#1E3A5F",
      accent: "#3B82F6",
      pageBackground: "#F8FAFB",
      cardBackground: "#FFFFFF",
      cardBorder: "#E5E7EB",
      primaryText: "#111827",
      secondaryText: "#6B7280",
      tertiaryText: "#9CA3AF",
      heroCardBackground: "#1E3A5F",
      heroCardBorder: "#152E4D",
      heroCardTitle: "#FFFFFF",
      heroCardBodyText: "#BFDBFE",
      rowBackground: "#F9FAFB",
      rowBorder: "#E5E7EB",
      notes: "MLO power-user pre-qual workspace \u2014 Deep Navy + Bright Blue financial-precision palette",
      appTitleColor: "#1E3A5F",
      appSubtitleColor: "#6B7280"
    },
    "newsletter-studio": {
      name: "Newsletter Studio",
      primary: "#6366F1",
      accent: "#A78BFA",
      pageBackground: "#F9F8FC",
      cardBackground: "#E6E4ED",
      cardBorder: "#E6E4ED",
      primaryText: "#1E1B3A",
      secondaryText: "#5E5A72",
      tertiaryText: "#A09DAE",
      heroCardBackground: "#F9F8FC",
      heroCardBorder: "#F9F8FC",
      heroCardTitle: "#6366F1",
      rowBackground: "#F3F2F8",
      rowBorder: "#E6E4ED",
      notes: "Email newsletter builder \u2014 newsletterstudio.app",
      heroCardBodyText: "#A78BFA",
      appTitleColor: "#1E1B3A",
      appSubtitleColor: "#5E5A72"
    },
    "market-intel": {
      name: "Market Intel",
      primary: "#CA775C",
      accent: "#E4B5A4",
      pageBackground: "#FAF9F7",
      cardBackground: "#FFFFFF",
      cardBorder: "#E8E3DF",
      primaryText: "#2C1E1A",
      secondaryText: "#6B5750",
      tertiaryText: "#A89E98",
      heroCardBackground: "#FAF9F7",
      heroCardBorder: "#FAF9F7",
      heroCardTitle: "#2C1E1A",
      rowBackground: "#F5F1EE",
      rowBorder: "#E8E3DF",
      notes: "Market data & neighborhood insights \u2014 market-intel.app",
      heroCardBodyText: "#6B5750",
      appTitleColor: "#2C1E1A",
      appSubtitleColor: "#6B5750"
    },
    "harvest-home": {
      name: "Harvest Home",
      primary: "#B8860B",
      accent: "#D4A84B",
      pageBackground: "#FAFAF7",
      cardBackground: "#FFFFFF",
      cardBorder: "#E8E4DA",
      primaryText: "#2A2110",
      secondaryText: "#6B5F4B",
      tertiaryText: "#A69E8E",
      heroCardBackground: "#2A2110",
      heroCardBorder: "#2A2110",
      heroCardTitle: "#FFFFFF",
      rowBackground: "#F5F3ED",
      rowBorder: "#E8E4DA",
      notes: "Lead discovery & enrichment",
      heroCardBodyText: "#A69E8E",
      appTitleColor: "#2A2110",
      appSubtitleColor: "#6B5F4B"
    },
    "the-home-scout": {
      name: "The Home Scout",
      primary: "#2D6A4F",
      accent: "#D4A84B",
      pageBackground: "#FAFAF8",
      cardBackground: "#FFFFFF",
      cardBorder: "#E2E0DA",
      primaryText: "#1A2E24",
      secondaryText: "#546B5F",
      tertiaryText: "#96A89E",
      heroCardBackground: "#1A2E24",
      heroCardBorder: "#1A2E24",
      heroCardTitle: "#FFFFFF",
      rowBackground: "#F3F5F2",
      rowBorder: "#E2E0DA",
      notes: "Consumer-facing tool library & lead capture \u2014 thehomescout.app",
      heroCardBodyText: "#96A89E",
      appTitleColor: "#1A2E24",
      appSubtitleColor: "#546B5F"
    }
  }
};

// src/email/render-email.ts
var RELLO_EMAIL_LOGO_BASE_URL = "https://hellorello.app/email/logos";
var RELLO_EMAIL_APP_NAMES = {
  arive: "ARIVE",
  rello: "Rello",
  "harvest-home": "Harvest Home",
  "home-ready": "Home Ready",
  "home-stretch": "The Home Stretch",
  "home-scout": "Home Scout",
  "market-intel": "Market Intel",
  "newsletter-studio": "Newsletter Studio",
  "the-oven": "The Oven",
  "the-drumbeat": "The Drumbeat",
  "open-house-hub": "Open House Hub",
  "pathfinder-pro": "PathfinderPro",
  "prequal-pro": "PreQual Pro",
  "milo-engine": "Milo",
  "content-engine": "Content Engine",
  "property-engine": "Property Engine",
  "journey-engine": "Journey",
  "report-engine": "Report Engine",
  "drumbeat-video-engine": "Drumbeat Video"
};
var RELLO_EMAIL_LOGO_SLUGS = /* @__PURE__ */ new Set([
  "rello",
  "home-ready",
  "home-stretch",
  "harvest-home",
  "market-intel",
  "newsletter-studio",
  "the-drumbeat",
  "prequal-pro"
]);
function relloEmailLogoUrl(app) {
  return RELLO_EMAIL_LOGO_SLUGS.has(app) ? `${RELLO_EMAIL_LOGO_BASE_URL}/${app}.png` : null;
}
var FONT = "-apple-system,'Segoe UI',Helvetica,Arial,sans-serif";
function escapeEmailHtml(value) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function line(value) {
  return typeof value === "string" ? value.replace(/[\r\n]+/g, " ").replace(/\s+/g, " ").trim() : "";
}
function block(value) {
  return typeof value === "string" ? value.replace(/\r\n?/g, "\n").trim() : "";
}
var URL_FORBIDDEN_CHARS = /[\s\u0000-\u001f\u007f-\u009f\u2028\u2029]/;
function safeEmailUrl(value) {
  if (typeof value !== "string") return null;
  const raw = value.trim();
  if (!raw || URL_FORBIDDEN_CHARS.test(raw)) return null;
  try {
    const url = new URL(raw);
    return url.protocol === "https:" || url.protocol === "http:" ? raw : null;
  } catch {
    return null;
  }
}
var RELLO_EMAIL_TOKEN_KEY_FOR_SLUG = {
  "home-stretch": "the-homestretch",
  "home-scout": "the-home-scout"
};
var MALFORMED_TOKEN_FALLBACK = "#475569";
var CARD_VALUE_TEXT = "#111827";
var WHITE = "#ffffff";
function validHex(value) {
  if (typeof value !== "string") return null;
  const hex = value.trim().toLowerCase();
  return /^#[0-9a-f]{6}$/.test(hex) ? hex : null;
}
function brandHex(value) {
  if (typeof value !== "string") return null;
  const hex = value.trim().toLowerCase();
  if (/^#[0-9a-f]{3}$/.test(hex)) return `#${hex[1]}${hex[1]}${hex[2]}${hex[2]}${hex[3]}${hex[3]}`;
  return validHex(hex);
}
function brandLogoUrl(value) {
  if (typeof value !== "string") return null;
  const raw = value.trim();
  if (!raw || URL_FORBIDDEN_CHARS.test(raw)) return null;
  try {
    const url = new URL(raw);
    if (url.protocol !== "https:" || url.username || url.password) return null;
    return /\.(png|jpe?g|gif)$/i.test(url.pathname) ? raw : null;
  } catch {
    return null;
  }
}
function tokenColor(key, field) {
  const tokens = app_overrides_default;
  const apps = tokens.apps && typeof tokens.apps === "object" ? tokens.apps : {};
  const block2 = hasOwn(apps, key) ? apps[key] : null;
  const fromApp = block2 && typeof block2 === "object" && hasOwn(block2, field) ? validHex(block2[field]) : null;
  if (fromApp) return fromApp;
  const defaults = tokens.defaults && typeof tokens.defaults === "object" ? tokens.defaults : {};
  return (hasOwn(defaults, field) ? validHex(defaults[field]) : null) ?? MALFORMED_TOKEN_FALLBACK;
}
function channel(hex, i) {
  const c = parseInt(hex.slice(i, i + 2), 16) / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}
function luminance(hex) {
  return 0.2126 * channel(hex, 1) + 0.7152 * channel(hex, 3) + 0.0722 * channel(hex, 5);
}
function relloEmailContrast(a, b) {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}
function mix(hex, toward, t) {
  let out = "#";
  for (const i of [1, 3, 5]) {
    const a = parseInt(hex.slice(i, i + 2), 16);
    const b = parseInt(toward.slice(i, i + 2), 16);
    out += Math.round(a + (b - a) * t).toString(16).padStart(2, "0");
  }
  return out;
}
function darkenUntil(color, against, min) {
  for (let step = 0; step <= 50; step++) {
    const c = step === 0 ? color : mix(color, "#000000", step / 50);
    if (against.every((bg) => relloEmailContrast(c, bg) >= min)) return c;
  }
  return "#000000";
}
function resolveRelloEmailPalette(audience, app) {
  const slug = audience !== "admin" && isKnownApp(app) ? app : "rello";
  const key = RELLO_EMAIL_TOKEN_KEY_FOR_SLUG[slug] ?? slug;
  const primaryToken = tokenColor(key, "primary");
  const accent = tokenColor(key, "accent");
  const rowBackground = tokenColor(key, "rowBackground");
  const cardBackground = relloEmailContrast(CARD_VALUE_TEXT, rowBackground) >= 7 ? rowBackground : WHITE;
  const primary = darkenUntil(primaryToken, [WHITE], 3);
  const badgeBackground = mix(accent, WHITE, 0.82);
  const avatarBackground = mix(primary, WHITE, 0.85);
  return {
    primary,
    link: darkenUntil(primaryToken, [WHITE], 4.5),
    badgeBackground,
    badgeText: darkenUntil(accent, [badgeBackground], 4.5),
    secondaryText: darkenUntil(tokenColor(key, "secondaryText"), [WHITE, cardBackground], 4.5),
    cardBackground,
    cardBorder: tokenColor(key, "cardBorder"),
    avatarBackground,
    avatarText: darkenUntil(primary, [avatarBackground], 4.5)
  };
}
function brandPalette(audience, primary) {
  const neutral = resolveRelloEmailPalette(audience, "rello");
  const hex = brandHex(primary);
  if (!hex) return neutral;
  const band = darkenUntil(hex, [WHITE], 3);
  const avatarBackground = mix(band, WHITE, 0.85);
  return {
    ...neutral,
    primary: band,
    link: darkenUntil(hex, [WHITE], 4.5),
    avatarBackground,
    avatarText: darkenUntil(band, [avatarBackground], 4.5)
  };
}
function brandFact(value) {
  return typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";
}
function nameWords(name) {
  return name.toLowerCase().split(/[^\p{L}\p{N}]+/u).filter(Boolean);
}
function sameBusiness(a, b) {
  const [x, y] = [nameWords(a), nameWords(b)];
  const [short, long] = x.length <= y.length ? [x, y] : [y, x];
  return short.length > 0 && short.every((word, i) => word === long[i]);
}
function resolveRelloEmailBrand(args) {
  const agentName = brandFact(args.agentName);
  const businessName = brandFact(args.business?.name);
  const businessLogo = brandFact(args.business?.logoUrl);
  const tenantName = brandFact(args.tenant?.name);
  const tenantLogo = brandFact(args.tenant?.logoUrl);
  const ownName = businessName !== "" && !sameBusiness(businessName, tenantName);
  const ownLogo = businessName === "" && businessLogo !== "" && businessLogo !== tenantLogo;
  if (ownName || ownLogo) {
    return {
      name: businessName || agentName,
      logoUrl: businessLogo || null,
      primary: brandFact(args.business?.primary) || null,
      level: "agent"
    };
  }
  return {
    name: tenantName || agentName,
    logoUrl: tenantLogo || null,
    primary: brandFact(args.tenant?.primary) || null,
    level: "tenant"
  };
}
function initialsOf(name) {
  return name.split(" ").filter(Boolean).slice(0, 2).map((w) => w.charAt(0).toUpperCase()).join("");
}
function hasOwn(map, key) {
  return typeof key === "string" && Object.prototype.hasOwnProperty.call(map, key);
}
function isKnownApp(app) {
  return hasOwn(RELLO_EMAIL_APP_NAMES, app);
}
function appName(app) {
  return isKnownApp(app) ? RELLO_EMAIL_APP_NAMES[app] : "Rello";
}
function renderRelloEmail(input) {
  const e = escapeEmailHtml;
  const audience = input.audience === "pro" || input.audience === "admin" ? input.audience : "consumer";
  const brand = audience !== "admin" && input.brand && typeof input.brand === "object" ? input.brand : null;
  const app = brand ? "Rello" : appName(input.app);
  const company = line(input.companyName);
  const pal = brand ? brandPalette(audience, brand.primary) : resolveRelloEmailPalette(audience, input.app);
  const color = pal.primary;
  const logoSlug = audience !== "admin" && isKnownApp(input.app) ? input.app : "rello";
  const logoUrl = brand ? brandLogoUrl(brand.logoUrl) : relloEmailLogoUrl(logoSlug);
  const logoAlt = brand ? line(brand.name) : appName(logoSlug);
  const subject = line(input.subject);
  const preheader = line(input.preheader);
  const headline = line(input.headline);
  const detail = line(input.detail);
  const kicker = line(input.kicker) || (audience === "admin" ? `${app} \xB7 Platform alert` : company ? audience === "consumer" ? `${app} \xB7 from ${company}` : `${app} \xB7 ${company}` : app);
  const badgeLabel = line(input.badge?.label);
  const paragraphs = (input.paragraphs ?? []).map(block).filter(Boolean);
  const cardTitle = line(input.card?.title);
  const cardRows = (input.card?.rows ?? []).map((r) => ({ label: line(r?.label), value: block(r?.value) })).filter((r) => r.label && r.value);
  const buttonUrl = safeEmailUrl(input.button?.url);
  const buttonLabel = line(input.button?.label);
  const button = buttonUrl && buttonLabel ? { url: buttonUrl, label: buttonLabel, note: line(input.button?.note) } : null;
  const secondaryUrl = safeEmailUrl(input.secondaryLink?.url);
  const secondaryLabel = line(input.secondaryLink?.label);
  const secondary = secondaryUrl && secondaryLabel ? { url: secondaryUrl, label: secondaryLabel } : null;
  const moreLinks = (input.moreLinks ?? []).map((l) => ({ url: safeEmailUrl(l?.url), label: line(l?.label) })).filter((l) => l.url !== null && l.label !== "");
  const showFallback = button !== null && input.showLinkFallback !== false;
  const signerName = line(input.signer?.name);
  const signer = signerName ? {
    name: signerName,
    title: line(input.signer?.title),
    nmls: line(input.signer?.nmls),
    phone: line(input.signer?.phone),
    initials: line(input.signer?.initials).slice(0, 3) || initialsOf(signerName),
    replyLine: line(input.signer?.replyLine)
  } : null;
  const signerMeta = signer ? [signer.title, signer.nmls ? `NMLS #${signer.nmls}` : ""].filter(Boolean).join(" \xB7 ") : "";
  const f = input.footer ?? {};
  const footerCompany = line(f.companyName);
  const footerNmls = line(f.companyNmls);
  const footerAddress = line(f.address);
  const footerReason = line(f.reason) || (audience === "admin" ? "Sent to platform admins only." : "");
  const prefUrl = safeEmailUrl(f.preferenceLink?.url);
  const prefLabel = line(f.preferenceLink?.label);
  const pref = prefUrl && prefLabel ? { url: prefUrl, label: prefLabel } : null;
  const footerLine1 = [footerCompany, footerNmls ? `Company NMLS #${footerNmls}` : ""].filter(Boolean).join(" \xB7 ");
  const footerLine2 = [footerAddress, f.equalHousing === true ? "Equal Housing Opportunity" : ""].filter(Boolean).join(" \xB7 ");
  const rows = [];
  rows.push(
    `<tr><td align="center" bgcolor="${color}" style="background:${color};padding:30px 32px 26px;color:#ffffff;border-radius:10px 10px 0 0;">` + (brand ? logoUrl ? (
      // A brand logo's shape is unknown: a width attribute only (no height), so
      // Outlook scales it in proportion; the style caps it at 200×64 elsewhere.
      // A distorted logo is worse than a large one (KA ruling, prompt 110).
      `<img src="${e(logoUrl)}" width="200" alt="${e(logoAlt)}" style="display:block;margin:0 auto 12px;max-width:200px;max-height:64px;height:auto;border:0;outline:none;text-decoration:none;">`
    ) : logoAlt ? `<div style="font-size:22px;font-weight:700;color:#ffffff;margin:0 0 10px;">${e(logoAlt)}</div>` : "" : logoUrl ? `<img src="${e(logoUrl)}" width="96" height="96" alt="${e(logoAlt)}" style="display:block;margin:0 auto 12px;width:96px;height:96px;border:0;outline:none;text-decoration:none;">` : `<div style="font-size:22px;font-weight:700;color:#ffffff;margin:0 0 10px;">${e(logoAlt)}</div>`) + `<div style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#ffffff;">${e(kicker)}</div>` + (headline ? `<div style="font-size:25px;font-weight:700;margin-top:10px;line-height:1.25;color:#ffffff;">${e(headline)}</div>` : "") + `</td></tr>`
  );
  if (badgeLabel || detail) {
    rows.push(
      `<tr><td style="padding:24px 32px 0;">` + (badgeLabel ? `<span style="display:inline-block;background:${pal.badgeBackground};color:${pal.badgeText};font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:4px 10px;border-radius:999px;">${e(badgeLabel)}</span>` : "") + (detail ? `<div style="font-size:14px;color:${pal.secondaryText};margin-top:${badgeLabel ? "8px" : "0"};">${e(detail)}</div>` : "") + `</td></tr>`
    );
  }
  if (paragraphs.length > 0) {
    rows.push(
      `<tr><td style="padding:24px 32px 4px;font-size:16px;line-height:1.6;color:#1f2937;">` + paragraphs.map(
        (p, i) => `<p style="margin:0 0 ${i === paragraphs.length - 1 ? "0" : "12px"};">${e(p).replace(/\n/g, "<br>")}</p>`
      ).join("") + `</td></tr>`
    );
  }
  if (cardRows.length > 0) {
    rows.push(
      `<tr><td style="padding:18px 32px 4px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${pal.cardBackground};border:1px solid ${pal.cardBorder};border-radius:8px;font-size:14px;line-height:1.5;">` + (cardTitle ? `<tr><td colspan="2" style="padding:14px 18px 2px;font-weight:700;color:${CARD_VALUE_TEXT};">${e(cardTitle)}</td></tr>` : "") + cardRows.map((r, i) => {
        const top = i === 0 ? cardTitle ? "8px" : "14px" : "4px";
        const bottom = i === cardRows.length - 1 ? "14px" : "4px";
        return `<tr><td valign="top" style="padding:${top} 18px ${bottom};color:${pal.secondaryText};width:130px;">${e(r.label)}</td><td valign="top" style="padding:${top} 18px ${bottom};color:${CARD_VALUE_TEXT};">${e(r.value).replace(/\n/g, "<br>")}</td></tr>`;
      }).join("") + `</table></td></tr>`
    );
  }
  if (button || secondary || moreLinks.length > 0) {
    rows.push(
      `<tr><td align="center" style="padding:24px 32px 6px;">` + (button ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;"><tr><td align="center" bgcolor="${color}" style="background:${color};border-radius:8px;"><a href="${e(button.url)}" style="display:inline-block;background:${color};color:#ffffff;text-decoration:none;font-weight:600;font-size:16px;line-height:20px;padding:14px 32px;border-radius:8px;">${e(button.label)}</a></td></tr></table>` : "") + (secondary ? `<div style="margin-top:${button ? "12px" : "0"};font-size:15px;"><a href="${e(secondary.url)}" style="color:${pal.link};font-weight:600;text-decoration:none;">${e(secondary.label)}</a></div>` : "") + moreLinks.map(
        (l, i) => `<div style="margin-top:${button || secondary || i > 0 ? "12px" : "0"};font-size:15px;"><a href="${e(l.url)}" style="color:${pal.link};font-weight:600;text-decoration:none;">${e(l.label)}</a></div>`
      ).join("") + (button && button.note ? `<div style="font-size:13px;color:${pal.secondaryText};margin-top:10px;">${e(button.note)}</div>` : "") + `</td></tr>`
    );
  }
  if (showFallback && button) {
    rows.push(
      `<tr><td style="padding:16px 32px 4px;font-size:13px;line-height:1.6;color:${pal.secondaryText};">Button not working? Copy this link into your browser:<br><a href="${e(button.url)}" style="color:${pal.link};word-break:break-all;">${e(button.url)}</a></td></tr>`
    );
  }
  if (signer) {
    rows.push(
      `<tr><td style="padding:20px 32px 22px;font-size:15px;line-height:1.6;color:#1f2937;">` + (signer.replyLine ? `<p style="margin:0 0 12px;">${e(signer.replyLine)}</p>` : "") + `<table role="presentation" cellpadding="0" cellspacing="0"><tr><td width="52" valign="top"><div style="width:40px;height:40px;border-radius:20px;background:${pal.avatarBackground};text-align:center;line-height:40px;font-size:14px;font-weight:700;color:${pal.avatarText};">${e(signer.initials)}</div></td><td valign="top" style="font-size:14px;line-height:1.5;"><b>${e(signer.name)}</b>` + (signerMeta ? `<br><span style="color:${pal.secondaryText};">${e(signerMeta)}</span>` : "") + (signer.phone ? `<br><span style="color:${pal.secondaryText};">${e(signer.phone)}</span>` : "") + `</td></tr></table></td></tr>`
    );
  }
  const footerParts = [
    footerLine1 ? e(footerLine1) : "",
    footerLine2 ? e(footerLine2) : "",
    footerReason ? e(footerReason) : "",
    pref ? `<a href="${e(pref.url)}" style="color:${pal.secondaryText};">${e(pref.label)}</a>` : ""
  ].filter(Boolean);
  if (footerParts.length > 0) {
    rows.push(
      `<tr><td style="border-top:1px solid #e5e7eb;padding:16px 32px;text-align:center;font-size:12px;color:${pal.secondaryText};line-height:1.6;">` + footerParts.join("<br>") + `</td></tr>`
    );
  }
  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="x-apple-disable-message-reformatting"><title>${e(subject)}</title></head><body style="margin:0;padding:24px 12px;background:#eef1f5;font-family:${FONT};color:#1f2937;">` + (preheader ? `<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;font-size:1px;line-height:1px;color:#eef1f5;opacity:0;">${e(preheader)}</div>` : "") + `<!--[if mso]><table role="presentation" width="600" align="center" cellpadding="0" cellspacing="0"><tr><td><![endif]--><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border-radius:10px;font-family:${FONT};">` + rows.join("") + `</table><!--[if mso]></td></tr></table><![endif]--></body></html>`;
  const t = [];
  const push = (...ls) => t.push(...ls);
  push(kicker);
  if (headline) push("", headline);
  if (badgeLabel || detail) push("", ...[badgeLabel, detail].filter(Boolean));
  for (const p of paragraphs) push("", p);
  if (cardRows.length > 0) {
    push("");
    if (cardTitle) push(cardTitle);
    for (const r of cardRows) push(`${r.label}: ${r.value.replace(/\n/g, ", ")}`);
  }
  if (button) {
    push("", `${button.label}:`, button.url);
    if (button.note) push(button.note);
  }
  if (secondary) push("", `${secondary.label}: ${secondary.url}`);
  for (const l of moreLinks) push("", `${l.label}: ${l.url}`);
  if (signer) {
    push("");
    if (signer.replyLine) push(signer.replyLine, "");
    push(signer.name);
    if (signerMeta) push(signerMeta);
    if (signer.phone) push(signer.phone);
  }
  const footerText = [footerLine1, footerLine2, footerReason, pref ? `${pref.label}: ${pref.url}` : ""].filter(Boolean);
  if (footerText.length > 0) push("", "\u2014", ...footerText);
  const text = t.join("\n").replace(/\n{3,}/g, "\n\n").trim();
  return { subject, preheader, html, text: `${text}
` };
}
export {
  RELLO_EMAIL_APP_NAMES,
  RELLO_EMAIL_LOGO_BASE_URL,
  RELLO_EMAIL_LOGO_SLUGS,
  RELLO_EMAIL_TOKEN_KEY_FOR_SLUG,
  escapeEmailHtml,
  relloEmailContrast,
  relloEmailLogoUrl,
  renderRelloEmail,
  resolveRelloEmailBrand,
  resolveRelloEmailPalette,
  safeEmailUrl
};
//# sourceMappingURL=email.js.map