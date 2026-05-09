## Interaction & Motion System for Fly4MEdia

Goal: layer a cohesive, restrained, "Apple-meets-fantasy.co" interaction language across the existing site without bloating the bundle, adding heavy libraries, or rebuilding components. CSS-first, GPU-only, motion-safe gated.

### 1. Foundations (`src/index.css` + `tailwind.config.ts`)

Add reusable design tokens so every component speaks the same motion language:

- **Easings**: `--ease-smooth` (have), add `--ease-spring: cubic-bezier(0.34, 1.4, 0.64, 1)` (restrained spring), `--ease-out-soft: cubic-bezier(0.22, 1, 0.36, 1)`.
- **Durations**: `--dur-fast: 180ms`, `--dur-base: 300ms`, `--dur-slow: 600ms`.
- **Elevation**: `--shadow-rest: 0 1px 2px rgb(0 0 0 / 0.04)`, `--shadow-lift: 0 18px 40px -18px rgb(0 0 0 / 0.25)`.
- Wrap *all* motion in `@media (prefers-reduced-motion: reduce) { * { transition-duration: 0.01ms !important; animation: none !important; } }`.

### 2. Button system (new `src/components/fly4media/Button.tsx`)

Two variants. Replaces ad-hoc button classes inside `Hero`, `CTA`, `ContactModal`, `Header` floating button, `NextProject`, etc.

- **Primary** (`bg-foreground text-background`):
  - rest → hover: `translateY(-2px)`, `box-shadow` rest→lift, 280ms `--ease-out-soft`.
  - active: `translateY(0) scale(0.985)` over 90ms — tactile press.
  - rounded `rounded-full` for pill, `rounded-sm` for editorial — prop-driven.
- **Ghost / Secondary**: text + arrow.
  - underline draws left→right (`::after` width 0→100%) over 400ms.
  - arrow translates `+4px x` on hover.
  - text shifts `-1px y` (subliminal lift).
- Loading state: text + animated dots (already in modal), reused.

### 3. Link & arrow micro-interactions (utility classes in `index.css`)

- `.link-underline` — animated underline using `background-size 0% → 100%` on `linear-gradient` (no layout shift, GPU only).
- `.link-arrow` — pairs with `↗`; arrow translates `+4px,-4px` on parent hover; 280ms.
- Apply to footer links, header nav, "View all work", case study cards, breadcrumbs.

### 4. Image / card hover system (extend existing `.img-zoom`)

- Project thumbnails (`FeaturedWork`, `Work` grid, `CaseStudyTeaser`):
  - Image: `scale(1) → scale(1.035)` over 800ms `--ease-out-soft` (already partially in place — refine timing).
  - Container: `translateY(0 → -3px)` on hover.
  - Caption metadata (year/category): currently visible — add a thin underline reveal on the project title only.
  - Soft contrast bump: `filter: contrast(1.04) brightness(1.02)` on hover, 600ms.
- All transforms on `transform`/`filter`/`opacity` only — zero layout work.

### 5. Header behavior (`Header.tsx`)

- Sticky header reads scroll position via single `requestAnimationFrame` listener (no library):
  - At top: transparent background, full padding (`py-6`).
  - After 24px scrolled: `bg-background/70 backdrop-blur-md border-b border-border/60`, `py-4`.
  - Transition: 300ms `--ease-out-soft` on `padding`, `background-color`, `backdrop-filter`.
- Nav links: `.link-underline` treatment.
- Mobile menu (currently absent — confirm; if present, restyle): fullscreen overlay with staggered link reveal (each link `translateY(12px) → 0, opacity 0 → 1`, 60ms stagger, 400ms each).

### 6. Page transitions (lightweight, no router replacement)

- Keep React Router as-is — *no* fade-the-whole-page pattern.
- New tiny hook `usePageEnter()` triggers a one-shot `.page-enter` class on `<main>` for 500ms after each route change: children below fold reveal via existing `useReveal`; the page header (h1) gets a `fade-up` 400ms `--ease-out-soft`.
- `ScrollToTop` already in place — keep.
- Net effect: navigation feels instant, content "settles in" softly. No blocking, no fades on the whole viewport.

### 7. Scroll reveal refinement (`useReveal.ts`)

- Already a single shared IntersectionObserver — keep architecture.
- Tighten defaults: `threshold: 0.12`, `rootMargin: "0px 0px -8% 0px"`.
- New optional `delay` prop to enable elegant stagger inside grids (FeaturedWork tiles: 0ms, 80ms, 160ms, 240ms).
- Disable entirely under `prefers-reduced-motion`.

### 8. Cursor (desktop only, opt-in)

- Subtle custom cursor as an additive layer, NOT a replacement (native cursor still visible — we only add a 24px ring that follows with light lerp).
- New `src/components/fly4media/Cursor.tsx`:
  - Pointer-events: none, fixed, mix-blend-difference for monochrome inversion.
  - `requestAnimationFrame` lerp at 0.18 — buttery, ~1 frame lag.
  - Scales `1 → 1.6` over hovered `[data-cursor="hover"]` elements (apply to buttons, links, image cards) — no JS hover binding per element; pure CSS via `:has()` fallback to a single `mousemove` lookup.
  - Hidden on touch devices (`(hover: none)` media query).
  - <2KB gzipped, single component, mounted in `App.tsx`.
  - Respects `prefers-reduced-motion` (disabled).

### 9. Form interactions (already strong — small additions)

- Text inputs get the `.link-underline`-style focus draw (already added in modal). Apply same treatment to any future inline forms.
- Add `transition: color 200ms` on label tone shift when field is filled.

### 10. Performance guardrails

- No new dependencies. No Framer Motion. No GSAP.
- All motion: `transform`, `opacity`, `filter`, `backdrop-filter` only.
- `will-change` only on hover-active elements (set via `:hover { will-change: transform }`, removed on rest).
- Cursor + scroll header listeners use a single shared `rAF` loop (one `requestAnimationFrame` per frame, not per listener).
- Lazy-loaded images keep explicit `width`/`height` (already done).

### Files touched

- **Edit**: `src/index.css` — tokens, utilities, reduced-motion guard.
- **Edit**: `tailwind.config.ts` — easing tokens, shadow tokens.
- **New**: `src/components/fly4media/Button.tsx` — unified primary/ghost.
- **New**: `src/components/fly4media/Cursor.tsx` — additive ring cursor.
- **New**: `src/hooks/usePageEnter.ts` — route-change subtle reveal.
- **Edit**: `Header.tsx` — scroll-condense + blur behavior, link underlines.
- **Edit**: `Hero.tsx`, `CTA.tsx`, `NextProject.tsx`, `FeaturedWork.tsx`, `Footer.tsx` — swap ad-hoc buttons/links for new `Button` + `.link-*` utilities.
- **Edit**: `useReveal.ts` — optional delay, tighter threshold.
- **Edit**: `App.tsx` — mount `<Cursor />` once.

### Out of scope

- Replacing React Router with view transitions API (browser support still limited — revisit later).
- Smooth-scroll library (Lenis) — native + reveal is enough.
- Heavy parallax — one or two restrained 6–10% translate effects only on hero divider, no library.

### Acceptance

- Every button across the site uses one of two variants with consistent press/hover physics.
- Header condenses + blurs after 24px scroll, smoothly.
- Project tiles share a single hover language (lift + zoom + contrast bump + title underline).
- Custom cursor appears on desktop only, never lags, disappears with reduced-motion.
- No new npm packages; bundle delta < 4KB gzipped.
- Lighthouse Performance stays ≥ 95 mobile on `/`.
- All animations honor `prefers-reduced-motion`.
