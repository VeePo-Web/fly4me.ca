# Hero mobile — bottom-third composition + scroll-parallax lede

Scope: `src/components/fly4media/Hero.tsx` only. Mobile (`<md`) behavior only. Desktop is untouched.

## Target composition (mobile, top → bottom)

```text
┌──────────────────────────────┐
│                              │  ← upper 2/3: pure drone footage,
│                              │     vignette breathes, no copy
│                              │
│                              │
├──────────────────────────────┤
│  Your competitors            │  ← bottom third opens with headline
│  look ordinary               │
│  from up here.               │
│                              │
│  ─── (hairline)              │  ← lede group, floats up 8px on scroll 0→80
│  What if perspective         │
│  changed everything.         │
│                              │
│  ┌────────────────────────┐  │  ← primary CTA, full width
│  │     View our work  ↗  │  │
│  └────────────────────────┘  │
│       Start a project        │  ← quiet secondary, centered
│  ────── safe-area ──────     │
└──────────────────────────────┘
```

Headline opens the bottom third. CTAs hug the bottom. The lede + hairline live between them and respond to scroll.

## Changes

### 1. Anchor the entire content stack to the bottom (mobile only)

Inner content column:

- Change `flex flex-col` → `flex flex-col justify-end md:justify-center`.
- The inner `<div>` that wraps headline + lede + CTAs: drop `flex-1 min-h-0 flex flex-col justify-center` and replace with `flex flex-col` (no flex-grow on mobile) so the group naturally sits at the bottom of the column. Keep `md:flex-1 md:min-h-0 md:justify-center` for desktop parity.
- Width constraint `max-w-2xl lg:max-w-[52rem]` stays.
- Keep `max-h-[100dvh]` on the section and `hero-pb` + the safe-area `pb-[max(28px,calc(env(safe-area-inset-bottom)+20px))]` we already added.

Net effect on mobile: headline + lede + CTAs become a single bottom-anchored stack; everything above is video.

### 2. Headline sits at the top of that bottom-anchored stack

- Headline stays as-is — no copy change, same `hero-display`, same per-word reveal class, same hover/focus handlers (still no-ops on touch via `noHover`).
- Because the stack is bottom-anchored, the headline naturally lands in the **bottom third** of the viewport on phones (375×667 → headline top ~y=440; 390×844 → ~y=560). The taller the phone, the more breathing room above — that's correct.
- Verify on the three target sizes (375×667, 390×844, 414×896) — adjust by tightening `hero-gap-lede` / `hero-gap-cta` only if anything clips. No CSS edits expected.

### 3. Scroll-revealed lede (Idea #1)

Auto-cascade already lands at ~900ms on touch. Add a tiny upward parallax on top of it, bound to scroll position 0–80px:

- Add a `ledeRef` on the existing lede `<div>` (the `hero-gap-lede` wrapper).
- New `useEffect` (mobile only — guarded by the existing `noHover` state):
    - Single `scroll` listener, passive, throttled with `requestAnimationFrame` (project rule: no Framer Motion, single observer pattern; mirror `useScrollVelocity` style).
    - Compute `p = clamp(window.scrollY / 80, 0, 1)`.
    - Set `ledeRef.current.style.transform = translate3d(0, ${-8 * p}px, 0)`.
    - Apply via direct style mutation (not React state) to avoid re-renders. Use `transition: transform 240ms cubic-bezier(0.22, 1, 0.36, 1)` set once in JSX `style` so the float feels eased, not snappy.
    - Cleanup: cancel rAF, remove listener.
- Why bound to `noHover` only: desktop already gets a hover-driven reveal; parallax would fight cursor intent. Mobile-only.
- Why 8px / 80px: matches the lede's existing 14px translate vocabulary — small enough to feel like air, big enough to register on a 390×844 retina screen. Same `cubic-bezier(0.22, 1, 0.36, 1)` as the rest of the hero.
- `prefers-reduced-motion: reduce`: skip the listener entirely; lede sits at rest.

### 4. CTAs — already correct, one tweak

The previous pass made `View our work` full-width and stacked `Start a project` underneath. Keep all of that. One refinement:

- Remove `hero-gap-cta` on mobile and replace with a fixed `mt-7 md:hero-gap-cta` so the CTA block hugs the lede consistently regardless of viewport height (current `clamp(20px, 3vh, 40px)` opens too much on tall phones where every pixel of footage counts).
- Result on mobile: ~28px between lede and the full-width primary button. Desktop unchanged.

### 5. Vignette tweak (mobile only) — readability insurance

With the headline now in the bottom third, ensure the existing `.hero-vignette` darkens the bottom enough that white type stays legible over any drone frame:

- Read `.hero-vignette` first. If the bottom darkening on mobile is weak, add a single mobile-only class `md:hidden` overlay `<div>` with `bg-gradient-to-t from-black/55 via-black/20 to-transparent` covering the bottom 55% of the section (`absolute inset-x-0 bottom-0 h-[55%] z-[5]` — sits between video and content z-20).
- Skip this if the vignette already handles it (check during implementation; this is a contingent step, not a guaranteed edit).

## Files

- `src/components/fly4media/Hero.tsx` — only file touched. ~20 lines changed + one new `useEffect` for parallax + one `ref`.
- No new components, no new packages, no CSS file edits (the contingent gradient overlay would be inline Tailwind only).

## Verification

- 375×667, 390×844, 414×896, 360×800: headline opens the bottom third, lede + hairline sit between headline and CTAs, primary CTA full-width pinned to bottom with safe-area buffer.
- Begin scrolling on mobile: lede + hairline drift up 8px smoothly over the first 80px of scroll, then settle. No re-renders (verified by React DevTools profiler if needed).
- iPad portrait (768×1024): inherits desktop layout — vertically centered, hover-gated lede, inline CTAs.
- Desktop (≥1024): zero visual change.
- Reduced motion on mobile: lede appears immediately at rest, no parallax.
- Intro cold-load: lede + parallax still wait for the intro veil dissolve (revealDelay propagates to the auto-reveal timer; parallax listener attaches regardless but produces 0 translate at scrollY=0).

## Explicitly NOT changing

- Copy: headline, lede, CTA labels — all verbatim.
- Italic on "perspective changed everything.", `t-*` token usage, monochrome palette.
- Desktop hover-to-reveal, scroll indicator, GPS quote bar.
- Video sources, intro choreography, vignette layer's existing behavior.