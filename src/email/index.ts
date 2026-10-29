// `@rello-platform/ui/email` — the shared transactional email shell. Pure
// TypeScript (no React, no DOM, no env), safe in Node, route handlers and
// Trigger.dev tasks. See render-email.ts.
export {
  renderRelloEmail,
  resolveRelloEmailColor,
  relloEmailLogoUrl,
  safeEmailUrl,
  escapeEmailHtml,
  RELLO_EMAIL_APP_NAMES,
  RELLO_EMAIL_LOGO_SLUGS,
  RELLO_EMAIL_LOGO_BASE_URL,
  RELLO_EMAIL_DEFAULT_BRAND_COLOR,
  RELLO_EMAIL_ADMIN_COLOR,
  type RelloEmailAudience,
  type RelloEmailBadgeTone,
  type RelloEmailLink,
  type RelloEmailButton,
  type RelloEmailCardRow,
  type RelloEmailSigner,
  type RelloEmailFooter,
  type RelloEmailInput,
  type RenderedRelloEmail,
} from "./render-email";
