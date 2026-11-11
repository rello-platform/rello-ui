# Changelog

All notable changes to `@rello-platform/ui` are documented here.

This project adheres to [SemVer](https://semver.org/) and the change-class
guidance in `CLAUDE.md` § Publishing convention.

## v2.40.0 — 2026-11-10

**Changed: consumer email names the sender in its header and says "Powered by Rello" in its footer**

Kelly, 2026-11-10, asked whether "Rello" should come out of the header of consumer
email: "yes it should be branded for the MLO sending it but the footer could mention
rello as a small marketing piece". This replaces the earlier "Rello · from <company>"
consumer kicker. Pro and admin mail are unchanged, byte for byte.

- **Consumer default kicker** (only when `kicker` is not given; a given kicker still
  wins, written as given):
  - a company is known (`companyName`): `From <company>`;
  - no company, under a `brand`: `From <brand>` (the brand's name as the text part's
    first line prints it: C0/C1 controls removed). A brand with no name gets no kicker
    at all, so the header and text never fall back to "Rello";
  - no company, no brand: the app's name, as at v2.39.0.
  - TE-1340: the company in the consumer kicker gets the same rule as the brand's
    name: C0/C1 controls removed, then whitespace collapsed and trimmed (one helper,
    `plainName`, now serves both). A company that is all controls counts as no
    company and falls through to the brand, then the app's name. Pro and admin keep
    the company as given, byte for byte (342 renders checked against v2.39.0).
  - TE-1341: consumer mail under a brand prints one sender name, the same cleaned string
    in the HTML header (name text or logo alt) and as the plain-text part's first line:
    `plainName` of the brand, else of the company, else of the signer; nothing usable
    names nobody (a brand never shows the app's name). Before, the HTML kept the brand's
    raw name, C0/C1 controls and all, while the kicker and text were clean. Never held.
    Pro and admin unchanged: 342 of 342 renders, plus 152 with control or nameless
    brands and companies, byte-identical to v2.39.0.
- **Consumer footer**: a last line, `Powered by Rello`, linked to
  `https://hellorello.app` (new export `RELLO_EMAIL_POWERED_BY_URL`), in the same small
  muted footer color as the other footer lines. The plain-text part ends with
  `Powered by Rello (hellorello.app)`. Consumer mail with no other footer facts now has a
  footer row holding just that line.
- **Opt-out**: `footer.poweredBy?: boolean` on `RelloEmailFooter`. Default on; `false`
  leaves the line out (HTML and text); any other value keeps it. Pro and admin mail never
  carry the line, whatever it says.
- **Pro and admin**: every byte of the HTML and text is as at v2.39.0 (and v2.38.0:
  v2.39.0 changed nothing under `src/email/`). A new fixture
  (`src/email/fixtures/v2.38.0-before-consumer-kicker.json`, captured from 19f04a9 and
  re-checked against 9c054e7, v2.39.0) pins 342 pro and admin renders across every slug,
  plus 38 consumer renders with the old kicker passed and `poweredBy: false`, which match
  exactly: the kicker and the one footer line are the only consumer changes. The older
  v2.32.0 and v2.33.0 consumer hash pins now render through `asBeforeV240` (src/test) for
  the same reason; their pro and admin pins are untouched.
- Callers that pass their own consumer kicker keep it. A caller whose own kicker says
  "Rello · from …" needs to drop it to get the new default.

Consumers pick this up on their next pin bump to `#v2.40.0` (published after audit).

## v2.39.0 — 2026-11-10

**Added: an "unknown" outcome for `<TrialStartModal>` (Platform KA 875, GD-541)**

A spoke whose trial-start request may or may not have started the trial (the
response was lost or timed out, a gateway 5xx, Rello answered
`rello_state_unknown`) had only `{ status: "error" }` to return, and the modal
prefixes every error with "We couldn't start your trial." and offers Try again,
which calls `onConfirm` again. Seen live in Harvest Home: the trial started, the
response was lost, the modal said it failed, and Try again sent a second start.

- **`TrialStartResult` gains `{ status: "unknown"; message?: string }`**
  (`TrialStartUnknown`, exported from the root entry and the client entry).
- The modal renders it as "We couldn't confirm whether your trial started."
  plus the message (default "Check your plan to see whether it did."), in
  neutral text with `role="alert"`. It never says "couldn't start".
- Its action is **"Check my plan"**, which calls `onConfirm` again under the
  same one-in-flight guard. The spoke reads the tenant's plan first on that
  call and posts a new start only when the plan says the tenant is definitely
  not entitled (the platform's send rule: after an unknown outcome, read the
  provider's record before any retry). The modal itself still never calls Rello.
- Closing and reopening keeps the unknown state, so the next action is still
  "Check my plan", never a fresh "Start trial". An error still starts fresh.
- **Every v2.38.0 outcome renders byte for byte as before.** A test drives a
  16-case corpus (confirm step, started, already-used, error, an unreadable
  result) through the v2.38.0 build at 19f04a9 and through the current source
  and requires equal dialog HTML.

## v2.38.0 — 2026-11-08

**Added: the RELLO UPSELL Phase 3 components, a 5th upsell event and price/ROI tokens**

The eight standalone apps will show an Upgrade nav item, a trial countdown and a
trial-start modal, and the existing upsell nudge gains the `engaged` event and
`{{monthlyPrice}}` / `{{roiCopy}}` copy. Everything is additive: no export was
removed or renamed and no existing prop changed meaning. On 2026-11-08 no app
mounts any of these (0 of 8 standalone spokes; 0 of 12 consumers import
`RelloUpsellNudge`). RELLO UPSELL Phase 4 changes that.

- **`<RelloUpsellNudge>`** (client)
  - `onEngaged` is the 5th event. It fires at most once per mount: after 3 s of
    continuous hover, after 3 s of keyboard focus inside the nudge (the keyboard
    counterpart of hover), or on the first expand of the new optional detail
    panel (`details`, `detailsLabel`, default "How it works"; `aria-expanded`
    and `aria-controls`, 44 px target). Its timer is cleared on unmount.
  - `monthlyPrice` and `roiCopy` fill `{{monthlyPrice}}` / `{{roiCopy}}` in
    `headline`, `body` and `ctaLabel`. Prices are never typed in this package;
    the spoke passes the values from Rello's config. When a value is missing,
    blank, or (for the price) has no non-zero digit, the sentence that uses it
    is omitted. The nudge still renders, and the copy never shows "$0", an
    empty "/mo" or a raw `{{token}}` (any unfilled token, e.g. `{{leadName}}`,
    omits its sentence too).
  - **Copy without `{{` is unchanged, per field.** A headline, body or CTA
    label with no `{{` renders exactly as at v2.37.1. Literal or unbalanced
    braces stay as written (`"Literal }} text"`), an empty headline or body
    keeps its element, and an explicit `ctaLabel=""` stays empty. A test
    renders a fixed corpus (the v2.37.1 stories plus audit cases) and requires
    HTML byte-equal to the v2.37.1 build at 2d5e639. Only a field that contains
    `{{` is templated, and only there can a sentence be omitted for a leftover
    brace. A templated headline or body that substitution empties is left out,
    and a templated CTA label it empties falls back to "Upgrade to Rello".
  - **Only the sentence holding the token is omitted.** A sentence ends at
    `.`, `!`, `?` or `…` (runs such as "..." count as one end), optionally
    followed by closing quotes or brackets (`" ” ’ ' ) ]`), and then whitespace
    or the end. A newline also ends one, and paragraph breaks survive. So
    `Before. "Price {{monthlyPrice}}/mo." After.` with no price gives
    `Before. After.`. A full stop with no space after it ("$1.99",
    "rello.com") does not split a sentence.
  - Fixed: a caller's `onKeyDown` used to replace the nudge's Escape-to-dismiss
    handler, because the props spread came after it. Caller `onKeyDown`,
    `onMouseEnter`, `onMouseLeave`, `onFocus` and `onBlur` are now composed with
    the nudge's own (both run); the same spread would otherwise have disabled
    `engaged`. No caller passes any of them today.
- **`<TrialCountdownBanner>`** (client): a full-width strip for the top of the
  agent/MLO chrome. It reads `trialEndsAt` (Date, ISO string or epoch ms) and
  shows days, then hours in the last 24 h, then minutes in the last hour. It
  renders nothing with no trial, an unreadable date or an ended trial, and
  disappears by itself when the trial ends. The last 48 h add a warning icon,
  an error-tinted accent and `data-urgent="true"`, so colour is not the only
  signal. The text is in `role="status"` / `aria-live="polite"`. Optional CTA
  (`ctaHref` link or `onCtaClick` button, 44 px). `onShown` fires once per
  mount. The 30 s clock is cleared on unmount and stops when the trial ends.
- **`<TrialStartModal>`** (client): confirm-to-start, transport-agnostic. It
  never calls Rello; the spoke's `onConfirm(): Promise<TrialStartResult>` calls
  `POST /api/v1/billing/trial-start` and maps the answer. States: confirm,
  pending (disabled, `aria-busy`), started (end date, optional `successAction`
  deep link), already used (409: the existing end date and the required
  `upgradeHref` link), and error with "Try again" (`role="alert"`; a rejection,
  a throw or an unreadable result is an error, never a success). A ref guard
  calls `onConfirm` once even when two confirms land before React re-renders,
  and releases on error so retry works. Radix dialog: `role="dialog"`,
  `aria-modal`, `aria-label`, Escape and outside click close, focus trapped and
  returned to the element that opened it (Radix alone drops it on `<body>` when
  there is no `Dialog.Trigger`). An outcome that lands after unmount sets no
  state but still reaches `onResult`, because the trial did start.
- **`<UpgradeMenuItem>`** (client): the always-on primary-nav "Upgrade" link
  (`next/link`). It renders nothing when `isEntitled` or `isEmbed` is true (both
  required). `onShown` (once per mount), `onClick`, `active` → `aria-current`,
  44 px target.
- **Root entry (server-safe):** `renderUpsellCopy` + `UpsellCopyValues`,
  `UPSELL_EVENTS` + `UpsellEvent` + `UPSELL_ENGAGED_DWELL_MS`,
  `getTrialTimeRemaining`, `parseTrialEndsAt`, `formatTrialTimeRemaining`,
  `TRIAL_URGENT_WINDOW_MS` and their types, and the `TrialStartResult` types.
- **Token:** `--brand-primary-foreground` (default `#FFFFFF`), the text colour on
  a `--brand-primary` fill. A tenant with a light brand colour overrides it.

No flag. Every colour is a token with a fallback.

## v2.37.1 — 2026-11-07

**Fixed: web addresses in caller text stay whole, so mail clients link them (TE-1189, TE-1187)**

v2.36.0 (TE-1043) put a `<wbr>` every 10 characters into any run of 40 or more
unbroken characters in caller text, and a web address is such a run. Gmail web then
linked a fragment: out of `consumerfi<wbr>nance.gov/…` only `nance.gov/`, a different
website, and out of `https://ww<wbr>w.consumer…` only `https://ww` (three real
sends, read in Gmail on 2026-11-07). That release's own note said whether a URL over the
threshold is still auto-linked was not tested.

- An address in a run that TE-1043 would have chunked is now emitted whole, escaped as
  one piece, with no `<wbr>` inside it, in
  `<span style="overflow-wrap:anywhere;word-break:break-word;">`. That rule lets a phone
  break the address only where a line must. Measured in headless Chromium:
  - At 375 px, a 90-character https address as a card value is 454 px wide without the
    rule and 375 px with it.
  - At 320 px, `….realestate/…` as a card value is 566 px without it.
  - A 90-character IDN address and the `.realestate` path, in body text and as a card
    value, fit at 320 and 375 px. They fit with the full rule, and with only the
    `word-break:break-word` that Gmail keeps.
- What counts as an address:
  - **After a scheme or `www.`:** `http://`, `https://` or `www.` followed by a letter
    or digit in any script. The address then runs on through every character up to
    whitespace, `<`, `>`, `"` or a control character, Unicode letters, marks and numbers
    included, so an IDN host or path such as `https://bücher.de/…` stays one piece
    (TE-1261).
  - **Email addresses:** `local@host`.
  - **Bare host with no scheme:** two or more dotted labels, in any script, whose last
    label is 2-63 letters in any script, or a punycode `xn--` label. "Last" means last
    (TE-1262): the host takes in every following `.label` before its ending is judged, so
    `a.b.c.123` is not cut back to `a.b.c`. A full stop followed by a space, `/` or the
    end of the run still ends the host. It counts with or
    without a `:port` or `/path`. There is no list of endings any more (TE-1260):
    `….realestate/…`, `….xyz/…`, `xn--bcher-kva.de/…` and `bücher.de/…` are addresses.
  - **Where it can start:** at the start of a run, or after a character that is not a
    letter, mark or digit in any script, nor one of `. _ % + @ / \ -`.
  - **Trailing punctuation:** trailing `. , ; : ! ? ' " *`, any quotation mark, any
    non-ASCII full stop, comma or closing bracket, and an unmatched `)`, `]` or `}` are
    not part of the address. They stay where the caller wrote them.
- Not addresses, so they keep TE-1043's `<wbr>` exactly as before:
  - a run with no dot, such as `tel:+1801…`;
  - a dotted run whose last label is numeric, or mixes letters and digits: `v2.37.0`,
    `10.0.0.1/…`, `ref-2026.07a…`, and (TE-1262) `mortgage.application.processing.123…`
    or `….reference2026`. These are byte-equal to v2.37.0; no prefix of them is spanned;
  - letters glued in front of a scheme (`Visithttps://…`);
  - a Windows path;
  - `ftp:` and other schemes, whose host follows a `/`;
  - an address the caller broke with a line break: each line is its own run, as before.

  A long run with no address keeps TE-1043's `<wbr>` exactly as before.
- Whole or nothing (TE-1262): a run that holds an address goes into the span in full, so
  no part of a 40+ run is left outside it unbroken. Inside the span each address is one
  piece with no `<wbr>`. Text glued to the address keeps TE-1043's `<wbr>` only when it
  is itself 40 or more characters, else the span's CSS breaks it.
  - Before this, the span held the address alone. Text glued to it was left outside, with
    no `<wbr>` when under 40 characters.
  - On RELLO-E43's `buildCriticalDriftEmail` metadata card, AUDIT 30's
    `mortgage.application.processing.123456789012345678901` made the email 382 px wide at
    320 and 375 px. It now fits, with the full CSS and with Gmail's.
  - An address followed by 39 `)` made a card 396 px wide; that now fits too.
  - `MortgageApplicationReferenceNumber.Ph.D.` was spanned only up to `.Ph`. Its last
    label `D` is a single letter, so it is no address, and it is byte-equal to v2.37.0.
- Accepted side effect (KA ruling, 2026-11-07): a long dotted file name ending in
  letters, such as `averyveryverylongreportname-final-version.pdf`, now counts as a bare
  host. It is kept whole inside the span rather than split by `<wbr>`. The span's CSS
  still keeps it inside a phone screen.
- A run in a script the browser breaks by itself (Thai, Han, Hangul and others, TE-1060)
  is still left whole with no span, as at v2.36.0, even when it holds an address.
- TE-1187: a signer name with an unbroken piece of 16 or more characters is wrapped in
  the same span. A piece ends at a space or after a hyphen. On v2.37.0, 16 "W"
  overflow a 320 px screen and 20 overflow 375 px; a 36-character unbroken name made the
  email 391 px wide at 375 px, and now fits. Ordinary names are unchanged.
- Visible text, the plain-text part, the subject, every href, src and alt, and every
  render with no address are byte-equal to v2.37.0. Across a 65,934-render corpus, every
  slot, audience and brand shape was compared against the v2.37.0 dist, with 0 failures.
  The corpus includes AUDIT 30's inputs and shapes, and its 591 edge inputs.
- One v2.36.0 test (`long-run-break.test.ts`, "the test is per run") used a long URL as
  its example of a run that is still chunked. It now uses a long id, because a URL no
  longer is.

No new export, prop or type. Consumers pick this up on their next pin bump.

## v2.37.0 — 2026-11-06

**Changed: under a brand, the plain-text part opens with the brand's name (TE-1207)**

`renderRelloEmail` already drew the sender's brand in the HTML header (the business's
logo, or its name as header text). The plain-text part never named it: it began with the
kicker, so a text-only reader of mail sent for an agent or business saw an app word and
no business. Kelly's rule (2026-10-30, 2026-11-06): client mail carries the agent's
business; the app name may appear small, never as the main branding.

- When a brand is passed on consumer or pro mail and it has a name, the text part's first
  line is that name, the same one the header prints (the logo's alt text, or the header
  text): whitespace and line breaks collapsed, nothing else changed. The kicker follows on
  line 2 exactly as before, and every line after it is as it was.
- A brand with no name names nobody, in the header and now in the text: the text opens
  with the kicker as at v2.36.0.
- TE-1222: the text name line drops every C0 and C1 control character (U+0000-U+001F,
  U+007F-U+009F) after the flattening, then collapses and trims; a name that is only
  controls names nobody. The HTML header is unchanged and still prints the name as it was.
- With no brand (absent, undefined or null) and on admin mail, which ignores a brand, every
  byte of the text and the HTML is as at v2.36.0. The HTML never changes, branded or not.
- No new export, prop or type. Callers need no change. A caller that already writes the
  business name into its own kicker (Home Scout, Newsletter Studio, PreQual Pro) will now
  see it on line 1 and again in the kicker; that is the ruled shape.

Consumers pick this up on their next pin bump to `#v2.37.0` (published after audit).

## v2.36.0 — 2026-11-03

**Fixed: a very long unbroken run no longer stretches an email**

An auto-layout table sizes itself to the widest thing it cannot break. A caller's
900-character unbroken string (a URL, an id, a pasted blob) made a 600 px email
thousands of pixels wide on every audience; measured in headless Chromium before
this change, 900 ASCII characters in one slot gave a document 5,563 to 12,303 px
wide (TE-1043; The-Home-Scout's `breakLongRuns` workaround, TE-1050, split emoji).

- `renderRelloEmail` gives a very long run a place to break. A run is what lies
  between two characters a browser can already wrap a line at: ASCII space, tab,
  CR, LF, U+0085, U+1680, U+2000-U+2006, U+2008-U+200B, U+2028, U+2029, U+205F
  and U+3000 (so a sentence spaced with U+2003 is ordinary prose, TE-1052; the
  list was measured in Chromium with Latin words around each character). A
  run of 40 or more characters (counted as user-perceived characters) that holds
  no Thai, Lao, Khmer, Myanmar, Han, Hiragana, Katakana or Hangul gets a
  `<wbr>` between chunks of 10, in every slot that holds caller text: kicker, headline,
  badge, detail, paragraphs, card title / label / value, button label and note,
  secondary and further link labels, signer reply line, name, title and phone,
  the three footer lines, the preference link, and the brand name shown as
  header text. `<wbr>` is an element, not a character: no text is added and the
  visible text equals the input.
- Each chunk is escaped on its own after the split, so a boundary never falls
  inside an entity (`&amp;`); the split is on `Intl.Segmenter` graphemes, so an
  emoji, a flag or a family emoji is never cut. Where `Intl.Segmenter` is missing
  the text is escaped and left whole, as before.
- **Ordinary mail is byte-identical to v2.35.0**: nothing is added to any email
  with no run of 40 or more unbroken characters, so the v2.32.0 / v2.33.0 render
  hashes pass unmodified. No CSS is added, so no table is re-laid-out (a
  `overflow-wrap:anywhere` style on the cells did re-lay-out them and broke
  ordinary words on a phone, TE-1051, and added 9,315 bytes to a 100-row digest).
  Plain-text parts, hrefs, the button URL and every other attribute are untouched.
- Characters a browser cannot wrap at (no-break space U+00A0, figure space
  U+2007, narrow no-break space U+202F, word joiner U+2060, U+FEFF, the joiners,
  form feed and vertical tab) do not end a run: 45 characters of words joined by
  them are one unbroken run and get the `<wbr>`.
- **Text in a script a browser breaks by itself is left whole** (TE-1060). Thai,
  Lao, Khmer and Myanmar have no spaces between words and the browser finds the
  boundaries from a dictionary; Han, Hiragana, Katakana and Hangul break between
  nearly any two characters. A run holding any character of those eight scripts
  renders exactly as at v2.35.0, byte for byte: a `<wbr>` every 10 characters
  would cut words the browser keeps whole (Thai "ข้อมูล" became "ข้" / "อมูล").
  A long URL pasted straight against such text with no space is part of the same
  run and stays unbroken, as at v2.35.0 (never worse than before); with a space
  between them it is its own run and still gets the `<wbr>`.
- A token of 24 to 39 characters is below the threshold and renders as before:
  on a narrow phone it can still be as wide as it was at v2.35.0.
- Left alone on purpose: the fallback link (already `word-break:break-all`), the
  hidden preheader, the `<title>`, the signer's initials (cut to 3 characters),
  and every attribute.
- Not proved here: no mail client was opened. How Gmail, Outlook and Apple Mail
  treat `<wbr>`, and whether an address or URL over the threshold is still
  auto-linked, is not tested.

## v2.35.0 — 2026-10-30

**Added: PreQual Pro's email colors, and `./email` for CommonJS apps**

- `tokens/app-overrides.json` gains a `prequal-pro` block from PreQual Pro's own
  brand (primary #4060DE). Its consumer and pro mail used `defaults` until now. Its
  logo was already hosted at `https://hellorello.app/email/logos/prequal-pro.png`.
- `@rello-platform/ui/email` gains a `require` condition (`dist/email.cjs`). PreQual
  Pro is CommonJS Express with synchronous email builders. `dist/email.js` is
  unchanged apart from the new tokens.
- Renders for every other app are byte-identical to v2.34.0, and PreQual Pro's
  admin html and text parts are too. The hash baselines name that one exception
  (`hasNewTokens`).

## v2.34.0 — 2026-10-29

**Added: consumer and pro email can carry the sender's brand (`brand` input)**

`renderRelloEmail` takes an optional `brand: { name, logoUrl?, primary? }`
(`RelloEmailBrand`). On `consumer` and `pro` mail it replaces the sending app's logo,
name and colors with the agent's or tenant's. KA ruling 2026-10-29 (prompt 097), on
Kelly's report: *"Home Scout CTA emails should NOT have home scout branding. They need
to have the branding of the tenant or agent."* Widened to `pro` by KA amended 121
(2026-10-30), Kelly: *"Open House Hub, like Home Scout should not tout itself as an app
but instead feature the tenant or agent."*

- Header: the brand logo when `logoUrl` is a clean https URL whose path ends .png,
  .jpg, .jpeg or .gif (no credentials, whitespace or control characters), drawn with
  a `width="200"` attribute only (no height, so Outlook scales it in proportion) and
  `alt` = the brand name; CSS caps it at 200×64 (`max-width`, `max-height`,
  `height:auto`). Otherwise the brand name is the header text; an empty name shows
  nothing.
- The app's name and hosted logo appear nowhere: not in the header, logo, alt text or
  default kicker. A given `kicker` is written as given; the default kicker reads
  "Rello · from <company>" (or "Rello").
- Header band, button, links and signer initials use `brand.primary` when it is a
  `#rgb`/`#rrggbb` hex, darkened until white text on it reaches 3:1 and links 4.5:1.
  Otherwise the neutral default (the `defaults` tokens, as Rello reads them), never the
  sending app's color. Badge, detail text and card use the neutral default as well, so
  no app color shows under a brand.
- Nothing is gated: a brand with no usable logo, color or name still renders the whole
  email.
- `admin` mail ignores `brand`.
- `resolveRelloEmailBrand({ agentName, business, tenant })` is the one brand rule every
  app uses (KA amended 121): the agent's business wins as a whole, with a missing logo
  or color left missing, never taken from the tenant; otherwise the tenant. A business
  whose name is the leading words of the tenant's (or the reverse) is the tenant.
- Without `brand` (absent, undefined or null) every render is byte-identical to v2.33.0:
  `src/email/consumer-brand.test.ts` hashes every platform slug × {consumer, pro,
  admin} against `src/email/fixtures/v2.33.0-no-brand-<audience>.json` (written at
  b320298d), compares one full home-scout render per audience character for character,
  and re-checks the v2.32.0 logo-cut baseline.
- `moreLinks`: optional text links after `secondaryLink`, in the HTML and the text part,
  for an email with more than two choices (Open House Hub's showing feedback).
- New exports: `resolveRelloEmailBrand` and types `RelloEmailBrand`,
  `RelloEmailBrandLevelInput`, `ResolvedRelloEmailBrand`. No component, token or CSS
  change.

## v2.33.0 — 2026-10-29

**Changed: `pro` email draws the sending app's logo**

`renderRelloEmail` with `audience: "pro"` now draws the sending app's logo
(`relloEmailLogoUrl(app)`), as `consumer` already did. Only `admin` mail keeps
the Rello logo and palette. KA ruling 2026-10-29, on Kelly's report about Market
Intel's agent-facing emails: *"those dont include the Market intel logo or are the
correct colors for the app in rello ui."* Every app's email carries that app's logo,
whoever receives it. This also changes Harvest Home and The Drumbeat, whose emails are
`pro`.

- An app with no hosted logo (`pathfinder-pro`, `the-oven`, the engines…) shows its
  name as text in the header on `pro` mail, as on `consumer` mail. An unknown app
  still falls back to Rello.
- Nothing else in the output changes. `src/email/logo-by-audience.test.ts` renders
  every platform slug × {consumer, pro, admin}. With the header logo cut out, each
  render hashes the same as at v2.32.0 (`src/email/fixtures/v2.32.0-logo-baseline.json`),
  and the text part is identical.
- No export, type or signature change. No component, token or CSS change.

## v2.32.0 — 2026-10-28

**New: `@rello-platform/ui/email` — the shared transactional email shell**

A new pure-TypeScript subpath entry (`dist/email.js`, no `"use client"` banner, no
React/DOM/env) with one renderer, `renderRelloEmail(input) → { subject, preheader,
html, text }`, for the Rello-family transactional emails (sign-in links, invites,
notices, alerts). Layout is Kelly's "option A" (2026-10-28): the app logo, 96 px and
centered on the app's color, the kicker "<App> · from <Company>", the headline, then
body paragraphs, an optional info card, one button (+ the full link under it), an
optional secondary link, the signer and the footer. Three audiences: `consumer` (the
app's logo, the app's colors), `pro` (Rello logo, the app's colors) and `admin`
(Rello logo, Rello's colors).

- Every text value is HTML-escaped inside the renderer; button/link URLs must be
  absolute http(s) with no whitespace, control character or U+2028/U+2029 inside,
  or the button/link is dropped (so the plain-text part cannot gain a second link
  line); empty fields are omitted.
- App-slug and badge-tone lookups read own keys only, so an inherited name such as
  `constructor` or `__proto__` falls back like any unknown value.
- Colors are each app's own rello-ui colors (Kelly 2026-10-29: "I don't like the
  black. Each app has its own colors in Rello ui that should match."), read at render
  time from `tokens/app-overrides.json` — `apps.<key>.<field>`, else
  `defaults.<field>`; no hex is copied into the renderer. Header band and button =
  `primary`; badge = a tint of `accent`; detail line, card labels, notes and footer =
  `secondaryText`; info card = `rowBackground` + `cardBorder`. Slugs whose JSON key
  differs are mapped explicitly (`RELLO_EMAIL_TOKEN_KEY_FOR_SLUG`): `home-stretch` →
  `the-homestretch`, `home-scout` → `the-home-scout`; a slug with no block
  (`prequal-pro`, `the-oven`, the engines) gets `defaults`; the `conversations` block is
  not a platform slug and is unused. Admin mail uses Rello's colors (no more
  `#111827`). Readability is enforced in the renderer: white header text ≥ 3:1 (a
  primary under that is darkened — none is today), links, badge, secondary text and
  signer initials ≥ 4.5:1 (links are darkened for the-drumbeat, open-house-hub,
  newsletter-studio, market-intel and harvest-home). `resolveRelloEmailPalette()` and
  `relloEmailContrast()` are exported.
- **Removed before release (no consumer uses `/email` yet):** the `brandColor` input
  (the tenant color no longer drives the header or button), `resolveRelloEmailColor()`,
  `RELLO_EMAIL_DEFAULT_BRAND_COLOR` and `RELLO_EMAIL_ADMIN_COLOR`. `badge.tone` is still
  accepted but no longer picks a color (deprecated); the label carries the meaning.
- App names come from a `Record<PlatformSlug, string>`, so a new slug in
  `@rello-platform/slugs` fails the typecheck until it is named. Logos are PNGs at
  `https://hellorello.app/email/logos/<slug>.png` (served by Rello); apps without one
  get the app name as text.
- It renders only: no sending, no consent logic, no compliance footer rules.

Also: `@rello-platform/slugs` v0.7.0 → v0.8.0 (adds `prequal-pro`).

## v2.28.0 — 2026-06-24

**Fix: `UnderlineTabBar` — overflowing tab rows were silently clipped at desktop widths (no scroll affordance)**

The two scroll-edge fade gradients were classed `sm:hidden` — they only rendered
below the `sm` breakpoint (<640px). The scroll container is `overflow-x-auto
no-scrollbar`, so at desktop widths (≥640px) an overflowing tab row had ZERO visual
affordance: no fade, no scrollbar, no arrow. Tabs hidden off the right edge (e.g.
Closings' "Trust / Escrow" sub-tab clipped at ~1073px) were reachable by scroll/keyboard
but undiscoverable.

Fix (presentation-only, additive — no public API change): the component now detects
its own scroll state via a `ref` on the scroll container + a `scroll` listener and a
`ResizeObserver` (cleaned up on unmount), computing `canScrollLeft` / `canScrollRight`.
Edge fade gradients now render at ALL breakpoints, gated on the scroll-state booleans
instead of `sm:hidden`. Clickable scroll-chevron buttons (left/right, `aria-label`
"Scroll tabs left/right", 44px min touch target, focus-visible outline) appear on
whichever side has hidden tabs and scroll by ~one tab-width per click. The existing
ArrowLeft/Right/Home/End roving-tabindex keyboard nav is unchanged. `UnderlineTab` /
`UnderlineTabBarProps` are byte-for-byte identical — minor (additive behavior), not major.

Added `UnderlineTabBar.test.tsx` (6 tests asserting the affordance appears on overflow,
hides when the row fits, appears on both edges mid-scroll, scrolls on chevron click,
updates on scroll, and keyboard nav still cycles) + an `Overflow` Storybook story.

## v2.20.1 — 2026-06-22

**Fix: "Five Before 9" (`before-9`) dashboard illustration rendered washed-out / broken on light cards**

The `before-9` entry in `DASHBOARD_ILLUSTRATIONS` was the only illustration flagged
`dark: true`. The dark branch in `CardIllustration` renders the icon white (`#fff`)
inside a near-invisible white-tinted container (`rgba(255,255,255,0.06)`) — correct
only on a dark card surface. Every Rello dashboard hero-card surface is LIGHT
(`var(--hero-card-background, var(--card-background))`), so on `/mlo` the Dawn
illustration showed as a faded/ghosted ("broken") graphic while its siblings
(`conversations`, `market-intel`, `neighborhood-intel` — all light) rendered crisp
accent-colored icons in accent-tinted tiles.

Fix: drop the `dark: true` flag from `before-9` so it renders the accent (`#D4943A`)
Dawn icon in an accent-tinted container, consistent with every other dashboard card.
The `DawnIcon` SVG and `RadialBurst` pattern were already valid vectors — the defect
was purely in the dark-mode rendering branch being applied on a light surface.
(Finding 13B / smoke BUG-09.) No API/export surface change; patch-level.

## v2.15.0 — 2026-05-28

**UnderlineTabBar — canonical hoist (RELLO II T4)**

Hoisted Rello CRM's `UnderlineTabBar` primitive into `@rello-platform/ui/client` per
RELLO II CONSOLIDATED-GATED-LOCKS-260526 Block D #3. Rello had 12 in-app consumers
(leads pipeline, settings hubs, conversations, today, team, daily-plan, brand-white-label,
PageHeader composite, HubTabBar wrapper) all importing from a single source file —
hoisting makes the primitive available to every other spoke + future RELLO II surfaces
without copy-paste.

```ts
import { UnderlineTabBar, type UnderlineTab } from "@rello-platform/ui/client";
```

Surface:

- **Button mode** (`onChange` driven) — caller wires URL state (`router.replace`) and/or
  analytics side-effects.
- **Link mode** (per-tab `href`) — tab renders as `<Link href={href} scroll={false}>` so
  middle-click + right-click + cmd-click open in a new tab natively. `onChange` still
  fires via the Link's `onClick` so analytics side-effects survive the migration.
- Bold-on-active (icon stroke + label weight heavier on active tab), `border-b-2`
  brand-primary on active, horizontal-scroll overflow with mobile fade gradient at scroll
  edges, ArrowLeft/Right/Home/End keyboard nav, 44px minimum touch targets, design-token
  fallbacks throughout (`var(--brand-primary, #2563eb)`, `var(--neutral-200, #e5e7eb)`, …).
- Optional `count` badge (rendered only when `> 0`), optional `hidden` / `disabled` per
  tab, optional `replace` (paired with `href` → `router.replace` semantics for tab
  surfaces that don't want each tab visit to push a history entry).
- WAI-ARIA tabs pattern (`role="tablist"` + `role="tab"` + `aria-selected` +
  `aria-controls={"tabpanel-" + id}`); `ariaLabel` required.

**Consumer note:** zero behavior change relative to the in-repo Rello copy this hoist
replaces. Mechanical refactor. The Rello pin bump to `#v2.15.0` lands in the same wave;
all 12 import sites swap from `@/components/ui/UnderlineTabBar` to
`@rello-platform/ui/client` and the local copy is deleted.

## v2.13.0 — 2026-05-21

**DashboardShell nav items migrate from `<button>` to `<Link>` for right-click "Open in new tab/window"**

Sidebar + mobile nav items now render as Next.js `<Link href={item.href}>` when `href` is present, instead of `<button onClick={...}>`. Right-click "Open in new tab/window", middle-click, Cmd-click, and Cmd-Shift-click all work browser-native — the multi-window MLO / RE-agent workflow no longer requires copy-pasting URLs.

```ts
// Type contract — href stays optional (backwards-compatible)
interface DashboardNavItem {
  icon: React.ReactNode;
  label: string;
  href?: string;                 // when present → renders <Link>
  onClick?: () => void;
  ariaLabel?: string;
  variant?: "primary" | "accent" | "danger";
}
```

When `href` is absent, the item renders as a `<button>` and `onNavClick(item)` is the only handler — preserves the variant action-button pattern (`variant: "danger"` "Sign out", etc.).

**`onNavClick` semantics change:** Previously consumers passed `onNavClick={(item) => router.push(item.href)}` to do navigation. The `<Link>` now handles navigation itself. `onNavClick` still fires from the `<Link>` `onClick` handler (no `preventDefault`) and should be used for analytics-side-effects only. Consumers that currently use it for `router.push` should drop the push call — keeping it produces a benign double-navigation but is wasted work.

**Peer dependency:** `next` is added as an optional peer dependency (`>=14.0.0`). All Rello-ecosystem consumers are Next.js apps; non-Next consumers that import `DashboardShell` will fail at module-resolve time. `next/link` is marked external in the build so the consumer's own Next.js install provides it.

**Plus:** ~22 `var(--token)` sites in `DashboardShell.tsx` gained hex fallbacks per `~/.claude/CLAUDE.md` Design-system invariant — every CSS var now degrades gracefully when its token is missing.

**Migration:** Spokes that always pass `href` on every nav item need no code changes — bump `@rello-platform/ui` to `2.13.0` and right-click works. Spokes that omit `href` on some nav items (action buttons) continue to render those as `<button>` unchanged. Coordinated per-spoke sweep tracked in `RELLO II SPEC-RIGHT-CLICK-NAVIGATION-FULL-BUILD.md` Wave 2.

## v2.12.0 — 2026-05-19

**DashboardShell.footerCustom is now collapse-aware (render-prop form)**

`footerCustom` accepts a function in addition to a ReactNode:

```ts
footerCustom?:
  | React.ReactNode
  | ((state: { collapsed: boolean }) => React.ReactNode);
```

When passed as a function, the Sidebar invokes it with `{ collapsed: !hovered }` so consumers can swap shapes between the 60px collapsed icon-rail and the 190px hovered/expanded pill. MobileNav always invokes the function with `collapsed: false` (the slide panel is always full-width at 280px).

**Why:** Drumbeat is the only spoke with a collapsible icon-rail. The v2.11.0 raw-ReactNode form forced consumers to either render a full-width pill that wrapped text inside the 60px rail, or reach into rello-ui DOM internals via a `ResizeObserver` hack to derive collapsed state. The render-prop variant is the clean structural fix.

**Consumer note:** Backwards-compatible — passing a `ReactNode` continues to work unchanged. Migrate to the function form only when you need shape-swap on collapse (currently Drumbeat). New Storybook story `WithFooterCustomCollapseAware` demonstrates the icon-square ⇄ full-pill swap.

## v2.11.0 — 2026-05-18

**DashboardShell.footerCustom slot (raw-element rendering)**

Adds `footerCustom?: React.ReactNode` to `DashboardShell` for downstream apps that need to render footer-action elements outside the `variant` system (hardcoded brand colors, bespoke shapes). The slot renders unchanged at the very bottom of the sidebar — caller owns all styling.

Use case: cross-app "Return to Rello" pill, locked to HR's `#c05621` warm-orange visual. The existing nav-item `variant` props (`primary` / `accent` / `danger`) bind to per-app brand CSS variables, so they can't express the platform-wide visual lock; `footerCustom` lets the consumer pass a raw `<button>` with hardcoded color.

**Consumer note:** Additive — existing apps unaffected. New Storybook story `WithFooterCustomReturnToRello` demonstrates the canonical shape.

## v2.10.0 — 2026-05-17

**DashboardCardIllustration default is now viewport-responsive**

- Default size (when prop omitted): `clamp(48px, calc(40px + 3vw), 88px)`
  - 320px viewport → ~49px
  - 1024px viewport → ~71px
  - 1440px+ viewport → 88px (capped)
- Explicit `size={N}` (number) callers unaffected — explicit always wins.

**New prop on CardIllustration:** `sizeOverride?: string` — CSS-expression dimension override (used by DashboardCardIllustration to inject the clamp). Track + App variants unchanged.

**Why:** Fixed-pixel illustration sizes don't adapt to screen width. Kelly UX lock 2026-05-17: large on desktop, smaller on mobile. The clamp range matches the canonical pre-v2.9.0 88px on wide desktops while shrinking gracefully.

**Consumer note:** Rello cards passing explicit `size={56}` continue rendering at 56px. Paired Rello-side dispatch removes those explicit values so they inherit the responsive default.

## v2.9.0 — 2026-05-17

**Tuned — DashboardCardIllustration defaults (smaller + lighter)**

- `DashboardCardIllustration` defaults updated to match the canonical Rello dashboard chrome:
  - `size` default 88 → 56
  - `iconSize` default 48 → 28
  - `bgOpacity` default 0.14 → 0.08
- Cards passing explicit values continue to render at those values — explicit always wins.
- CardIllustration (the underlying primitive) defaults unchanged; only the Dashboard variant.
- TrackCardIllustration + AppCardIllustration unaffected.

**Why:** Rello dashboard cards that don't pass explicit size/iconSize/bgOpacity rendered larger + denser than the canonical lock established by the Hero cards + Welcome modal tiles (all use 56/28/0.08). Tuning the defaults normalizes the un-touched refit cards automatically without per-card edits.

**Consumer note:** No code change required at consumer side beyond pin bump. Cards that omit the props pick up the new defaults; cards that pass explicit values are unaffected.

## v2.8.1 — 2026-05-16

**Fix — `CardIllustration` icon centering**

- `src/components/card-illustration/CardIllustration.tsx` — wrap Layer 3
  icon in `<div className="relative flex items-center justify-center">`
  instead of `<div className="relative">`. The wrapper now flex-centers
  the SVG within itself, neutralizing the line-box descender that SVG's
  default `display: inline` introduces. Without this, the icon sat at the
  top of the wrapper (above the descender space), making it visually
  shift up by a few pixels inside the 88px bounding box.

**Why:** Visible-UI bug reported by Kelly 2026-05-16 against The Oven
dashboard after the v2.8.0 chrome refit landed — illustrations were
clearly not centered in their tinted-tile bounding boxes. Affects every
consumer of `CardIllustration`, `DashboardCardIllustration`,
`TrackCardIllustration`, and `AppCardIllustration` (all share the same
underlying primitive).

**Consumer note:** Patch-only fix, no API changes. Spokes on v2.8.0
(Rello, The Oven as of 2026-05-16) should bump pin to v2.8.1.

## v2.8.0 — 2026-05-15

**Additions — Dashboard Illustration Expansion (22 new icons + 22 new entries)**

- `src/icons/dashboard-icons.tsx` — 22 new icon function exports, in-style with the existing 4 (DawnIcon / SignalIcon / PulseIcon / AtlasIcon). 48×48 viewBox, 5-layer composition, single-accent theming. New icons: `MyPipelineIcon`, `ActionsIcon`, `BrainIcon`, `FlowIcon`, `DocsIcon`, `RateAlertIcon`, `PreQualIcon`, `LoanVolumeIcon`, `ClosingIcon`, `HRAssessmentsIcon`, `HSProgressIcon`, `OpenHouseIcon`, `MailboxIcon`, `FollowupIcon`, `AppGridIcon`, `FunnelIcon`, `TrophyIcon`, `TeamPipelineIcon`, `LeadPoolIcon`, `RoutingIcon`, `TeamActivityIcon`, `TeamDawnIcon`.
- `src/icons/index.ts` — 22 new names added to the dashboard-icons re-export.
- `src/components/card-illustration/dashboard-illustrations.tsx` — 22 new entries in `DASHBOARD_ILLUSTRATIONS`: `my-pipeline`, `actions`, `brain`, `flow`, `docs`, `rate-alert`, `pre-qual`, `loan-volume`, `closing`, `hr-assessments`, `hs-progress`, `open-house`, `mailbox`, `followup`, `app-grid`, `funnel`, `trophy`, `team-pipeline`, `lead-pool`, `routing`, `team-activity`, `team-dawn`. Each entry: codename (in "The X" pattern) + section + accent hex + pattern (cycled across the existing 6 primitives) + icon ref + optional `dark` flag.
- Cohesion: no consecutive entry shares pattern + accent-hue family. `team-dawn` is the sibling-variant of `before-9` for the Team Before 9 surface; same horizon-and-sun motif, distinguishable via smaller sun + two-figure silhouettes.

**Why:** Resolves `DISCOVERED-DASHBOARD-CARD-CHROME-DRIFT-2026-05-15.md`. Honors Kelly's stated unique-illustration-per-card visual contract. Additive surface only — no breaking changes.

**Consumer note:** All 22 new illustration keys are available immediately after pin bump. Rello consumer refit ships in a paired PR (see `BUILD-|-FEATURE-ADDS/DASHBOARD-CARD-CHROME-AND-VISUAL-INTEREST/` build spec).

## v2.4.0 — 2026-05-10

### Added — DRUMBEAT RELLO-UPSELL Phase 4 PR-1

- **`RelloUpsellNudge`** (`@rello-platform/ui/client`) — ghost-styled, never-modal,
  dismissible upgrade-to-Rello nudge primitive. Six-seam upgrade pattern shipped by
  `SPEC-DRUM-RELLO-UPSELL` §Component primitive decision. Props per §Desired State:
  `seam`, `headline`, `body`, `ctaLabel?`, `onClick`, `onDismiss`, `icon?`. No business
  logic — consumer wires entitlement read, embedded-mode suppression, telemetry, and
  session-scoped dismiss persistence at the Drumbeat-side `<RelloUpsellSeam>` wrapper.
  Sibling spokes (HH / SCOUT / OHH / PFP / NS / CO-MARKETING) adopt the same primitive
  per `feedback-per-app-rebuilds-inherit-platform-admin-rebuild-precedent`.

### Notes

- Component ships through `src/client.ts` only (carries `"use client"` semantics).
- Prop interface co-located in `src/components/rello-upsell-nudge/index.ts` per Rule E.
- ARIA: `role="region"`, `aria-label="Rello upgrade option"`; dismiss button
  `aria-label="Dismiss upgrade nudge"`; Escape-key dismisses while focus is inside.
- 44px-minimum touch target on both CTA and dismiss × controls.
- Composes existing `Button` primitive — no new third-party deps.

## v2.3.0 — 2026-05-09

### Added — DRUMBEAT Wave 0 hoisted shared primitives

- **`SessionRetryBanner`** (`@rello-platform/ui/client`) — session/network retry banner with
  parameterized headline + retry label. Hoisted from `~/The-Drumbeat/src/components/AppLayout.tsx`
  per `DISCOVERED-PLATFORM-TOAST-RETRY-PATTERN-HOIST-RELLO-UI-2026-05-08`.
- **`ErrorBanner`** (`@rello-platform/ui/client`) — two-mode error banner: retry-mode
  (when `onRetry` provided) + reason-mode (when `reason` provided + no `onRetry`). Covers
  Rello campaigns + lead-conversion canonical patterns.
- **`WizardShell`** (`@rello-platform/ui/client`) — multi-step wizard container composing
  `SegmentedProgress` + `Badge` + `Button`. Pure container; consumer holds form state +
  validation + autosave debounce.
- **`MultiFeedbackWidget`** (`@rello-platform/ui/client`) — N-option feedback widget with
  optional per-option correction-text gate. Extends the `WasThisHelpful` pattern.
- **`VoiceCorpusInput`** (`@rello-platform/ui/client`) — paste-or-upload writing-samples
  multi-entry input with min/max gating, word-count badges, and `.txt` upload support.

### Notes

- All five components ship through `src/client.ts` only (carry `"use client"` semantics).
- Prop interfaces co-located in each component's `index.ts` per Rule E type-discipline.
- Composes existing primitives (`Button`, `Badge`, `SegmentedProgress`, `Textarea`) — no
  new third-party deps.

## v2.2.0 — 2026-05-09

- DashboardShell a11y — aria-label sweep + 44px touch targets. `DashboardNavItem.ariaLabel?`
  added (additive, optional). Mobile hamburger sized to 44×44px. Active nav button gets
  `aria-current="page"`. Closes axe button-name violations on collapsed-sidebar icon-only
  buttons surfaced by RCAL Phase 5 /calendar live smoke 2026-05-09.

## v2.1.0 — 2026-04-?? (pre-CHANGELOG)

- `DialButton` extracted from softphone-aware dial flow
  (`DISCOVERED-PLATFORM-DIAL-BUTTON-EXTRACTION-20260507`).

## v2.0.x — 2026-04-?? (pre-CHANGELOG)

- Two-entry split (`src/index.ts` server-safe, `src/client.ts` client-only) per
  `DISCOVERED-RELLO-UI-RUNTIME-IMPORT-FAILURE-ON-RAILWAY-041726`.
