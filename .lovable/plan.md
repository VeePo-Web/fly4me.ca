## Goal

Tighten the existing interaction layer into a single, token-driven luxury motion system. Most primitives already exist (`.btn-primary`, `.link-underline`, `.link-arrow`, `.cursor-ring`, `.reveal`, `.img-zoom`, `Header` scroll state). This pass refines tuning, fills gaps (compression, spatial hover, scroll-reactive navbar, staggered reveals, form focus, scroll-velocity awareness), and removes inconsistencies — without adding Framer Motion or any new dependency.

Stays inside CSS variables + transform/opacity. Honors existing `prefers-reduced-motion` guard.

---

## 1. Motion token system (`src/index.css`)

Replace the ad-hoc easing/duration tokens with a tuned, named scale. Keep names already in use; add the missing ones.

```text
--ease-out-soft   cubic-bezier(0.22, 1, 0.36, 1)   // primary expressive ease (current)
--ease-out-quart  cubic-bezier(0.25, 1, 0.32, 1)   // navbar / large surfaces
--ease-emphasized cubic-bezier(0.2, 0, 0, 1)       // entrance accents
--ease-spring     cubic-bezier(0.34, 1.25, 0.64, 1) // softened (was 1.4 — too bouncy)
--ease-press      cubic-bezier(0.4, 0, 0.2, 1)     // click compression in
--ease-release    cubic-bezier(0.16, 1.2, 0.32, 1) // tactile rebound out

--dur-instant 90ms
--dur-fast    180ms
--dur-base    260ms
--dur-soft    420ms
--dur-slow    640ms
--dur-cine    900ms

--lift-1     -2px
--lift-2     -4px
--press      0.985
--scale-hover 1.02
```

All component transitions reference these tokens — no inline `cubic-bezier(...)` strings in JSX (sweep `Header.tsx` etc.).

## 2. Button physics — compression + lift

Refine `.btn-primary` / `.btn-ghost`:

- Hover: `translateY(var(--lift-1))` + soft shadow refinement, `--dur-base` `--ease-out-soft`.
- Active (press): `translateY(0) scale(var(--press))`, `--dur-instant` `--ease-press`.
- Release uses `--ease-release` to give the subtle tactile rebound (split via `:not(:active)` transition).
- Add `:focus-visible` ring using foreground color at low opacity (no jarring blue outline).
- Add `.btn-quiet` (text-only inline action, used in modal & footer) sharing the same press physics.

Apply same compression to mobile menu hamburger and modal close.

## 3. Image hover choreography

Upgrade `.img-zoom` into a small composable system used by `FeaturedWork`, `CaseStudyTeaser`, `CaseStudyGallery`:

- `.media-frame` — wraps image, masks overflow, sets `transform: translateZ(0)`.
- `.media-img` — `scale(1)` → `scale(1.035)` on group hover, `--dur-cine` `--ease-out-soft`, plus `filter: contrast(1.04) brightness(1.02)`.
- `.media-meta` — caption row that softly emerges: `opacity .55 → 1` and `translateY(4px → 0)`, `--dur-soft`.
- `.media-frame::after` — 1px inner hairline that fades in on hover (perceived depth, no layout cost).

No giant zooms, no overlays, no parallax JS — pure CSS group-hover.

## 4. Cursor — restraint pass

Current cursor is solid; tune behavior:

- Reduce hover scale from 56px → 44px (less attention-grabbing).
- Add `is-press` state (scales to 22px) bound to `mousedown`/`mouseup` for tactile feedback.
- Add subtle magnetic pull on `[data-magnetic]` elements: on mousemove within 80px, translate the element toward the cursor by max 6px (pure transform, rAF-throttled in `Cursor.tsx`). Apply `data-magnetic` to primary buttons only.
- Keep mix-blend-difference and the `(hover: none)` opt-out.

## 5. Navbar — adaptive scroll response

Extend `Header.tsx` scroll handler from binary (`scrolled > 24`) to a smoothed progress value (0→1 over first 120px) used to drive:

- Background alpha: `bg-background/0 → /80`.
- Backdrop blur: `0px → 14px`.
- Hairline border opacity.
- Logo + nav scale: `1 → 0.97` (very subtle compression).

Implementation: rAF-throttled scroll listener writes a single CSS custom property `--nav-progress` on `<header>`; CSS interpolates via `calc()`. No re-render storm.

Add scroll-direction awareness: when scrolling down past 240px, translate header `-100%`; on scroll up, return to 0. `--dur-soft` `--ease-out-quart`.

## 6. Scroll velocity awareness (light)

A single shared module `src/components/fly4media/useScrollVelocity.ts`:

- Tracks scroll delta per frame, exposes `--scroll-vel` CSS var on `<html>` (clamped 0–1).
- Used by `.media-img` to add `filter: blur(calc(var(--scroll-vel) * 0.6px))` during fast scroll, settling instantly. Subliminal — never noticed consciously.

Mounted once in `PageShell`. Disabled under reduced motion.

## 7. Reveal choreography — staggered, directed

Keep `useReveal` + `.reveal` mechanism. Add variants:

- `.reveal-up` (current default), `.reveal-fade`, `.reveal-rise-lg` (24px for large headlines).
- `data-stagger="N"` on parent: children get `transition-delay: calc(var(--i) * 70ms)` via small CSS rule, where `--i` is set inline by index. Used on `Services` list, `Capabilities`, `FeaturedWork`, mobile menu.
- Threshold raised slightly (`0.18`) and `rootMargin` tuned so reveals fire when the section is meaningfully on-screen.

No JS scroll-tied progress; observers only.

## 8. Form interactions (`ContactModal.tsx`)

Inputs already have a clean shell. Add:

- `.field` wrapper with `position: relative`.
- Underline element (`span.field-underline`) — `scaleX(0)` → `scaleX(1)` on `:focus-within`, transform-origin left, `--dur-soft` `--ease-out-soft`.
- Label micro-shift on focus (`translateY(-1px)` + opacity .6 → 1).
- Submit button uses full button compression system; success state fades in over 320ms with hairline check mark (no toast spam).
- Error state: 1px border tint + 4px shake using transform keyframe (capped at 1 cycle).

## 9. Page enter polish

`.page-enter > *` keyframe stays. Add `.page-enter-stagger > *` that uses `nth-child` delays up to 6 children, so route changes feel composed rather than uniform.

`PageShell` applies one or the other based on a prop (default: stagger).

## 10. Mobile interaction parity

- Replace any `:hover`-only affordance with `:active` equivalent (compression on tap).
- Add `touch-action: manipulation` to all buttons/links (kill 300ms tap delay).
- Mobile menu items: stagger via `--i` (already inline-styled — switch to the shared system).
- Ensure scroll velocity hook is no-op on reduced motion + low-end heuristic (`navigator.hardwareConcurrency < 4` → skip blur).

## 11. Component sweep (apply tokens + classes)

- `Header.tsx` — adopt `--nav-progress`, drop inline `cubic-bezier(...)`.
- `Button.tsx` — add `data-magnetic` on primary, `:focus-visible` ring.
- `FeaturedWork.tsx`, `CaseStudyTeaser.tsx`, `CaseStudyGallery.tsx`, `NextProject.tsx` — wrap media in `.media-frame` + `.media-img` + `.media-meta`.
- `Services.tsx`, `Capabilities.tsx`, `ProcessList.tsx` — `data-stagger`.
- `ContactModal.tsx` — `.field` + underline + button compression.
- `PageShell.tsx` — mount `useScrollVelocity`, apply `.page-enter-stagger`.
- `Cursor.tsx` — add press state + magnetic loop.

No copy changes, no layout changes, no new dependencies.

## 12. Performance contract

- Only `transform`, `opacity`, `filter` (cheap), `background-color`, `backdrop-filter` animated.
- Single rAF loop in `Cursor.tsx`, single in `useScrollVelocity`, single in `Header.tsx` scroll handler.
- No `box-shadow` animation on large surfaces (use `::after` opacity for shadow lift on media tiles).
- All heavy effects gated by `prefers-reduced-motion` and `(hover: none)` where appropriate.

## Out of scope

- No Framer Motion / GSAP / Lenis.
- No new typefaces, colors, or layout changes.
- No copy edits.
- No new pages or routes.
- No video autoplay changes.
