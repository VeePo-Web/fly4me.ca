# Branded Fly4MEdia email templates

Right now the contact form sends one functional but unstyled HTML email to Toby. After this change, every contact submission will fire **two** branded emails — one to the submitter (a calm, editorial confirmation) and one to Toby (a fast-scan internal brief). Both share a single design system that mirrors the site: white background, near-black type, Inter/system sans, oversized restrained headlines, generous whitespace, hairline rules, and the slogan **"Perspective Changes Everything"** as the footer signature.

Same architectural pattern the reference projects use: a single `_shared/email-templates.ts` module owning brand constants + composable HTML pieces, then `send-contact` just composes content and sends.

---

## Files

### 1. `supabase/functions/_shared/email-templates.ts` *(new)*

Single source of truth. Exports:

- `BRAND` — colors (`bg #ffffff`, `fg #0a0a0a`, `muted #6b6b6b`, `border #ececec`), `name: "Fly4MEdia"`, `slogan: "Perspective Changes Everything."`, `email`, `phone`, `phoneTel`, `website`, `fontStack` (Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif).
- `escapeHtml(str)` — XSS-safe escaping.
- `nl2br(str)` — preserves project-description line breaks.
- `emailWrapper(content, preheaderText)` — full DOCTYPE wrapper, hidden preheader, outer table on `#ffffff`, 600px max-width container, 48px outer padding, MSO-friendly.
- `emailHeader({ eyebrow })` — small uppercase wordmark `FLY4MEDIA` in tracked-out caps (top-left, no logo image, keeps it pure-typographic like the site) + an eyebrow line (e.g., `New enquiry` or `Thanks for reaching out`).
- `displayHeading(text)` — large 32–36px, weight 500, tight tracking, near-black.
- `bodyText(text)` — 15px, line-height 1.65, `#3a3a3a`.
- `metaRow(label, value, opts?)` — labelled detail row used for Email/Phone (uppercase 11px label, 14px value, hairline border-bottom).
- `quoteBlock(text)` — used in Toby's email for the project description: small "Project" eyebrow + preserved-newline body inside a 24px-padded block with a 1px top rule.
- `divider()` — 1px hairline `#ececec` with 32px vertical room.
- `ctaButton(label, href)` — outlined button (1px `#0a0a0a` border, 14px tracked uppercase label) — used in the submitter email to link back to `/work`.
- `emailFooter()` — closes every email with the slogan as a centered, lightly-tracked statement, then a small line of contact details (email + phone) and the year. Renders the slogan in the same display weight used on-site so it reads as the brand sign-off, not a tagline.

All values inline-styled. No external CSS, no `<style>` blocks beyond the MSO conditional. Background is white only — no dark variants.

### 2. `supabase/functions/send-contact/index.ts` *(refactor)*

Keep the existing validation, insert, CORS, error handling, and the `onboarding@resend.dev` sender (per memory — root domain isn't verified in Resend yet). Changes:

- Import from `../_shared/email-templates.ts`.
- Build **two** HTML payloads via the shared composers:
  - **Internal notification → `tobyrennick@gmail.com`**
    - Subject: `New enquiry — {name}`
    - Eyebrow: `New enquiry`
    - Heading: `{name} wants to start a project.`
    - Meta rows: Email (mailto), Phone (tel, only if provided)
    - `quoteBlock` with the project description
    - `reply_to: email` so Toby hits Reply and lands in the submitter's inbox
  - **Submitter confirmation → `email`**
    - Subject: `We've got your note — Fly4MEdia`
    - Eyebrow: `Thanks for reaching out`
    - Heading: `Your note landed with us, {firstName}.`
    - Two short body paragraphs, in the studio voice:
      1. Acknowledges the message arrived; says Toby will personally read it and reply within one business day.
      2. Frames the wait as part of the craft — "We're probably out waiting for the right light. We'll be back at a screen soon." Closes by inviting them to browse recent work.
    - `ctaButton("See recent work", "https://fly4me.ca/work")`
    - `reply_to: "tobyrennick@gmail.com"` so any reply routes to Toby
- Send both via `Promise.allSettled` so one failure doesn't block the other; log failures, still return `{ ok: true }` to the client (insert already succeeded).
- Preheader text on each email (hidden inbox-preview line) — internal: "New enquiry from {name}"; submitter: "Toby will reply personally within one business day."

### 3. No client-side changes

The contact modal already POSTs name/email/phone/project. No schema changes, no migrations, no new secrets — `RESEND_API_KEY` is already configured.

---

## Visual direction (so it actually looks like Fly4MEdia)

- **Type lockup**: wordmark `FLY4MEDIA` in 11px tracked uppercase (`letter-spacing: 0.32em`) sitting alone at the top-left of the canvas — same restraint as the site header.
- **Heading**: 32–36px, weight 500, tracking `-0.02em`, color `#0a0a0a`. One line of breathing room below it.
- **Body**: 15px / 1.65 line-height, `#3a3a3a`. Muted detail labels at 11px uppercase, `letter-spacing: 0.18em`, color `#8a8a8a`.
- **Rules**: 1px `#ececec`. Used to separate the meta block, the project quote, and the footer.
- **Footer slogan**: centered, 16px, weight 500, tracking `-0.01em`, near-black — followed by a single 11px tracked line: `Fly4MEdia · Alberta, Canada · tobyrennick@gmail.com · 403 818 9686 · © {year}`.
- **No logo image, no gradients, no colored buttons.** Pure typographic system. Renders identically in Gmail/Outlook/Apple Mail.

---

## What I will *not* do

- No new edge functions, no Lovable Email infra setup, no domain swap. We continue with the existing Resend path (already wired, sender stays `onboarding@resend.dev` until `fly4me.ca` is verified — which is a separate decision for you).
- No DB schema changes.
- No design changes anywhere on the site itself.

---

## Open question (non-blocking — I'll proceed with sensible defaults if you don't answer)

The submitter email currently routes replies to `tobyrennick@gmail.com`. If you'd rather replies bounce back to a no-reply address until the Resend domain is verified, say so. Otherwise I'll keep the routing above.
