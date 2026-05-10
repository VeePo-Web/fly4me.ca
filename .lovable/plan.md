# /contact modal — precision formatting pass

The Contact modal is the only "page" left. The split engages at `md:` (768), which forces a cramped 50/50 between 768–1023 — a narrow brand panel running `t-headline-1` and a narrow form panel running `t-headline-2` plus four stacked fields. This is exactly the same pinch we already fixed on `/work`, `/services`, and `/about`. The fix is identical: **promote the entire split from `md:` to `lg:` (1024)** and let tablet inherit the polished single-column treatment that already exists for mobile, with calmer padding and rhythm.

No copy changes, no logic changes, no design-token changes, no submit-flow changes. One file.

---

## Changes — `src/components/fly4media/ContactModal.tsx`

### 1. Layout gating: md → lg (everywhere)
- `md:grid-cols-2` → `lg:grid-cols-2`.
- Brand `<aside>` strip mode → desktop split: `md:h-auto md:min-h-screen md:max-h-none` → `lg:h-auto lg:min-h-screen lg:max-h-none`. Strip cap `h-[34vh] min-h-[220px] max-h-[280px]` stays for <1024.
- Right `<section>` `md:min-h-screen` → `lg:min-h-screen`.
- Brand-panel inner stack `md:p-14 lg:p-20 md:min-h-screen` → `p-8 lg:p-16 xl:p-20 lg:min-h-screen`.
- Mobile-only X button `md:hidden` → `lg:hidden`.
- Desktop X button `hidden md:block ... md:top-8 md:right-8` → `hidden lg:block lg:top-8 lg:right-8`.
- Brand top "Fly4MEdia" eyebrow `hidden md:flex` → `hidden lg:flex`.
- Brand lede paragraph `hidden md:block` → `hidden lg:block`.
- Brand contact footer `hidden md:flex` → `hidden lg:flex`.
- Mobile-footer contact line `md:hidden` → `lg:hidden`.
- All inner spacing tokens that toggle at `md:` (`mb-3 md:mb-8`, `mb-4 md:mb-5`, `mb-8 md:mb-14`, `py-10 md:py-20`, `px-6 md:px-14 lg:px-20`, `mb-2 md:mb-3` on field labels) re-gated to `lg:`.

### 2. Tablet posture (768–1023, now stacked)
- Image strip cap stays at `max-h-[280px]` so it reads as a cinematic banner, not a hero.
- Form column gets generous padding: `px-8 py-14` (matches rest-of-site editorial gutters), so on tablet portrait the form has the same calm rhythm as the `/services` and `/about` stacked sections.
- Brand contact info (email/phone/Alberta) appears once — in the mobile-footer line under the form on <1024, in the brand footer on ≥1024. No duplication.

### 3. Desktop polish (≥1024)
- Brand panel padding `p-8 lg:p-16 xl:p-20` — at 1920 we get a generous 80px gutter, at 1024 a tighter 64px; replaces the current `p-14 lg:p-20` jump.
- Brand h2 (`t-headline-1`) gets `max-w-[14ch]` so the line breaks like "Let's create / something worth / looking up at." instead of stretching to the column edge.
- Form h3 (`t-headline-2`) gets `max-w-[18ch]` for the same reason.
- Form max-width stays `max-w-xl` and stays centered in the right column — already correct.

### 4. Field hygiene
- Label spacing `mb-2 md:mb-3` → `mb-2 lg:mb-3`.
- Form vertical rhythm (`space-y-9`) untouched — reads correctly at all sizes.

---

## What does NOT change

- Submit flow, validation, success/error states.
- Animations (`animate-modal-overlay-in`, `animate-modal-panel-in`, `motion-safe:animate-kenburns`, field underline).
- Image asset, ken-burns wash, grain overlay, gradient.
- Copy.
- The `Field` component contract.
- `index.css`, `PageShell`, design tokens.

---

## Verification before claiming done

- 1920×1080 — brand h2 wraps over 3 lines, form headline wraps over 2, generous gutters both sides.
- 1280×720 — split engages cleanly at exactly 1024+, no overlap with X button.
- 1024×768 (tablet landscape) — split engages, both columns breathe.
- 820×1180 (tablet portrait) — strip banner on top (cap 280px), form below with `px-8 py-14`, mobile-footer contact line visible at bottom.
