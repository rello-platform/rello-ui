// `@rello-platform/ui/email` — the shared transactional email shell. Pure
// TypeScript (no React, no DOM, no env), safe in Node, route handlers and
// Trigger.dev tasks. See render-email.ts.
export {
  renderRelloEmail,
  resolveRelloEmailPalette,
  relloEmailContrast,
  relloEmailLogoUrl,
  safeEmailUrl,
  escapeEmailHtml,
  RELLO_EMAIL_APP_NAMES,
  RELLO_EMAIL_LOGO_SLUGS,
  RELLO_EMAIL_LOGO_BASE_URL,
  RELLO_EMAIL_TOKEN_KEY_FOR_SLUG,
  type RelloEmailAudience,
  type RelloEmailPalette,
  type RelloEmailBadgeTone,
  type RelloEmailLink,
  type RelloEmailButton,
  type RelloEmailCardRow,
  type RelloEmailSigner,
  type RelloEmailFooter,
  type RelloEmailInput,
  type RenderedRelloEmail,
} from "./render-email";
