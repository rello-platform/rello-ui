// src/email/render-email.ts
var RELLO_EMAIL_DEFAULT_BRAND_COLOR = "#1a365d";
var RELLO_EMAIL_ADMIN_COLOR = "#111827";
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
var BADGE_COLORS = {
  hot: { bg: "#fdecea", fg: "#b42318" },
  info: { bg: "#e8f0fb", fg: "#1d4ed8" },
  success: { bg: "#e7f6ec", fg: "#067647" },
  warning: { bg: "#fef4e6", fg: "#b54708" },
  neutral: { bg: "#f2f4f7", fg: "#344054" }
};
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
function channel(hex, i) {
  const c = parseInt(hex.slice(i, i + 2), 16) / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
}
function whiteContrast(hex) {
  const l = 0.2126 * channel(hex, 1) + 0.7152 * channel(hex, 3) + 0.0722 * channel(hex, 5);
  return 1.05 / (l + 0.05);
}
function resolveRelloEmailColor(audience, brandColor) {
  if (audience === "admin") return RELLO_EMAIL_ADMIN_COLOR;
  if (typeof brandColor !== "string") return RELLO_EMAIL_DEFAULT_BRAND_COLOR;
  const hex = brandColor.trim().toLowerCase();
  if (!/^#[0-9a-f]{6}$/.test(hex)) return RELLO_EMAIL_DEFAULT_BRAND_COLOR;
  return whiteContrast(hex) >= 3 ? hex : RELLO_EMAIL_DEFAULT_BRAND_COLOR;
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
  const app = appName(input.app);
  const company = line(input.companyName);
  const color = resolveRelloEmailColor(audience, input.brandColor);
  const logoSlug = audience === "consumer" && isKnownApp(input.app) ? input.app : "rello";
  const logoUrl = relloEmailLogoUrl(logoSlug);
  const logoAlt = appName(logoSlug);
  const subject = line(input.subject);
  const preheader = line(input.preheader);
  const headline = line(input.headline);
  const detail = line(input.detail);
  const kicker = line(input.kicker) || (audience === "admin" ? `${app} \xB7 Platform alert` : company ? audience === "consumer" ? `${app} \xB7 from ${company}` : `${app} \xB7 ${company}` : app);
  const badgeLabel = line(input.badge?.label);
  const toneKey = input.badge?.tone;
  const badgeTone = hasOwn(BADGE_COLORS, toneKey) ? BADGE_COLORS[toneKey] : BADGE_COLORS.neutral;
  const paragraphs = (input.paragraphs ?? []).map(block).filter(Boolean);
  const cardTitle = line(input.card?.title);
  const cardRows = (input.card?.rows ?? []).map((r) => ({ label: line(r?.label), value: block(r?.value) })).filter((r) => r.label && r.value);
  const buttonUrl = safeEmailUrl(input.button?.url);
  const buttonLabel = line(input.button?.label);
  const button = buttonUrl && buttonLabel ? { url: buttonUrl, label: buttonLabel, note: line(input.button?.note) } : null;
  const secondaryUrl = safeEmailUrl(input.secondaryLink?.url);
  const secondaryLabel = line(input.secondaryLink?.label);
  const secondary = secondaryUrl && secondaryLabel ? { url: secondaryUrl, label: secondaryLabel } : null;
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
    `<tr><td align="center" bgcolor="${color}" style="background:${color};padding:30px 32px 26px;color:#ffffff;border-radius:10px 10px 0 0;">` + (logoUrl ? `<img src="${e(logoUrl)}" width="96" height="96" alt="${e(logoAlt)}" style="display:block;margin:0 auto 12px;width:96px;height:96px;border:0;outline:none;text-decoration:none;">` : `<div style="font-size:22px;font-weight:700;color:#ffffff;margin:0 0 10px;">${e(logoAlt)}</div>`) + `<div style="font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:#ffffff;opacity:.85;">${e(kicker)}</div>` + (headline ? `<div style="font-size:25px;font-weight:700;margin-top:10px;line-height:1.25;color:#ffffff;">${e(headline)}</div>` : "") + `</td></tr>`
  );
  if (badgeLabel || detail) {
    rows.push(
      `<tr><td style="padding:24px 32px 0;">` + (badgeLabel ? `<span style="display:inline-block;background:${badgeTone.bg};color:${badgeTone.fg};font-size:12px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;padding:4px 10px;border-radius:999px;">${e(badgeLabel)}</span>` : "") + (detail ? `<div style="font-size:14px;color:#6b7280;margin-top:${badgeLabel ? "8px" : "0"};">${e(detail)}</div>` : "") + `</td></tr>`
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
      `<tr><td style="padding:18px 32px 4px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f3f6fa;border-radius:8px;font-size:14px;line-height:1.5;">` + (cardTitle ? `<tr><td colspan="2" style="padding:14px 18px 2px;font-weight:700;color:#111827;">${e(cardTitle)}</td></tr>` : "") + cardRows.map((r, i) => {
        const top = i === 0 ? cardTitle ? "8px" : "14px" : "4px";
        const bottom = i === cardRows.length - 1 ? "14px" : "4px";
        return `<tr><td valign="top" style="padding:${top} 18px ${bottom};color:#6b7280;width:130px;">${e(r.label)}</td><td valign="top" style="padding:${top} 18px ${bottom};color:#111827;">${e(r.value).replace(/\n/g, "<br>")}</td></tr>`;
      }).join("") + `</table></td></tr>`
    );
  }
  if (button || secondary) {
    rows.push(
      `<tr><td align="center" style="padding:24px 32px 6px;">` + (button ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto;"><tr><td align="center" bgcolor="${color}" style="background:${color};border-radius:8px;"><a href="${e(button.url)}" style="display:inline-block;background:${color};color:#ffffff;text-decoration:none;font-weight:600;font-size:16px;line-height:20px;padding:14px 32px;border-radius:8px;">${e(button.label)}</a></td></tr></table>` : "") + (secondary ? `<div style="margin-top:${button ? "12px" : "0"};font-size:15px;"><a href="${e(secondary.url)}" style="color:${color};font-weight:600;text-decoration:none;">${e(secondary.label)}</a></div>` : "") + (button && button.note ? `<div style="font-size:13px;color:#6b7280;margin-top:10px;">${e(button.note)}</div>` : "") + `</td></tr>`
    );
  }
  if (showFallback && button) {
    rows.push(
      `<tr><td style="padding:16px 32px 4px;font-size:13px;line-height:1.6;color:#4b5563;">Button not working? Copy this link into your browser:<br><a href="${e(button.url)}" style="color:${color};word-break:break-all;">${e(button.url)}</a></td></tr>`
    );
  }
  if (signer) {
    rows.push(
      `<tr><td style="padding:20px 32px 22px;font-size:15px;line-height:1.6;color:#1f2937;">` + (signer.replyLine ? `<p style="margin:0 0 12px;">${e(signer.replyLine)}</p>` : "") + `<table role="presentation" cellpadding="0" cellspacing="0"><tr><td width="52" valign="top"><div style="width:40px;height:40px;border-radius:20px;background:#dbe4f0;text-align:center;line-height:40px;font-size:14px;font-weight:700;color:${color};">${e(signer.initials)}</div></td><td valign="top" style="font-size:14px;line-height:1.5;"><b>${e(signer.name)}</b>` + (signerMeta ? `<br><span style="color:#4b5563;">${e(signerMeta)}</span>` : "") + (signer.phone ? `<br><span style="color:#4b5563;">${e(signer.phone)}</span>` : "") + `</td></tr></table></td></tr>`
    );
  }
  const footerParts = [
    footerLine1 ? e(footerLine1) : "",
    footerLine2 ? e(footerLine2) : "",
    footerReason ? e(footerReason) : "",
    pref ? `<a href="${e(pref.url)}" style="color:#6b7280;">${e(pref.label)}</a>` : ""
  ].filter(Boolean);
  if (footerParts.length > 0) {
    rows.push(
      `<tr><td style="border-top:1px solid #e5e7eb;padding:16px 32px;text-align:center;font-size:12px;color:#6b7280;line-height:1.6;">` + footerParts.join("<br>") + `</td></tr>`
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
  RELLO_EMAIL_ADMIN_COLOR,
  RELLO_EMAIL_APP_NAMES,
  RELLO_EMAIL_DEFAULT_BRAND_COLOR,
  RELLO_EMAIL_LOGO_BASE_URL,
  RELLO_EMAIL_LOGO_SLUGS,
  escapeEmailHtml,
  relloEmailLogoUrl,
  renderRelloEmail,
  resolveRelloEmailColor,
  safeEmailUrl
};
//# sourceMappingURL=email.js.map