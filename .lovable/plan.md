# Hero — mobile refinement (fantasy.co register)

Scope: `src/components/fly4media/Hero.tsx` only. No copy changes. No desktop changes. Same vocabulary, mobile-only behavior and layout fixes.

## Problem statement

Two mobile failures on the current hero (≤768px):

1. **CTAs sit too high and too quiet.** `flex-wrap` lets "View our work" + "Start a project" share a line on phones, but they're floating in the middle of the frame with no anchor and no priority. The arrow button is the brand's primary verb on the homepage — on mobile it should be unmissable, full-width, and pinned near the bottom thumb zone. The text-only "Start a project" reads as decoration next to it.

2. **"What if perspective changed everything." is invisible on mobile.** The lede is gated entirely behind `onMouseEnter` / `onFocus`. Phones have no hover, and `tabIndex={-1}` means it never receives focus either. The most important brand line on the site never renders for ~60% of traffic. We are throwing away the slogan echo.

Everything else (headline, video, vignette, intro-sync) is correct on mobile and stays.

## What changes

### 1. Show the lede automatically on mobile (no hover required)

Treat the lede as a **timed reveal** on touch devices, not a hover affordance:

- Detect "no hover" once on mount via `window.matchMedia('(hover: none)')` and store in a `noHover` state. (Avoids SSR mismatch by initialising in `useEffect`.)
- When `noHover === true`, force `ledeOpen = true` after a delay timed to land **after** the headline cascade completes — `d(900)` for the open, so the order on a phone reads: headline resolves → hairline draws → "What if perspective changed everything." cascades in word-by-word → CTAs.
- The existing per-word blur-to-sharp + hairline scaleX animations already do the work. We're just flipping `ledeOpen` from `false → true` automatically instead of from hover.
- Desktop behavior unchanged: still hover/focus gated.
- Reduced motion: respect `prefers-reduced-motion: reduce` — set `ledeOpen=true` immediately, skip the staged delay.
- Remove `pointer-events-none` + `aria-hidden` gating only when `noHover` is true so screen readers can read the line on touch devices (it's content now, not an Easter egg).

### 2. Mobile CTAs — primary anchored, secondary supportive

Two layout regions for the CTA block:

**Desktop (`md:` and up): unchanged.** Keep the inline row with hover-to-reveal.

**Mobile (`<md`): replace the inline row with a stacked, bottom-anchored block.**

- Push the CTA group to the bottom of the hero on mobile by changing the inner flex column to `justify-end md:justify-center` on `<md`, with the headline + lede group keeping `mt-auto` headroom. (No `flex-1 min-h-0` change — still single section, no overflow.)
- Primary CTA: "View our work" becomes a **full-width** `LinkButton` on mobile (`w-full md:w-auto`). It's the only button with visual weight.
- Secondary CTA: "Start a project" stays a quiet text button, centered under the primary with `mt-4 md:mt-0`. Same `t-button` class. No background, no border — keeps the editorial restraint.
- Stack vertically on mobile: `flex-col md:flex-row`, `gap-4 md:gap-8`, `items-stretch md:items-center`.
- Drop `flex-wrap` — no longer needed once we stack.
- Remove the mobile hover handlers' role for the lede (handled by section 1) but keep `onFocus`/`onBlur` so keyboard users on hybrid devices still get the desktop reveal.

### 3. Breathing room adjustments (mobile-only, no token edits)

- The bottom-anchored CTA needs a slightly larger `hero-pb` buffer on mobile so the primary button doesn't kiss the safe-area. Add a Tailwind utility on the inner container: `pb-[max(28px,calc(env(safe-area-inset-bottom)+20px))] md:pb-0` (compounds with existing `hero-pb`). No CSS file edit.
- The lede's `hero-gap-lede` (clamp 14–32px) is already correct; no change.

## Files

- `src/components/fly4media/Hero.tsx` — only. ~25 lines touched. No new imports, no new CSS, no token changes, no new components.

## Verification

- 375×667 (iPhone SE), 390×844, 414×896, 360×800: headline → hairline → "What if perspective changed everything." cascades automatically ~900ms after headline; primary CTA full-width near bottom; secondary "Start a project" centered beneath.
- 768×1024 (iPad portrait): inherits desktop hover behavior (matches `(hover: hover)`).
- 1280×720 and up: completely unchanged — hover still gates the lede, CTAs inline.
- `prefers-reduced-motion: reduce` on a phone: lede appears immediately, no cascade delay.
- Cold reload with intro: lede still waits for the intro veil to dissolve (revealDelay propagates).
- Tab key on desktop: focusing "View our work" still reveals the lede.

## Explicitly NOT changing

- Copy: headline, lede, button labels — all unchanged.
- Visual style: monochrome, Inter, italic "perspective changed everything.", hairline, vignette — unchanged.
- Video layer, `HeroMedia`, intro choreography, scroll indicator, GPS quote bar.
- Desktop layout at any breakpoint ≥768px.