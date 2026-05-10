# Hero — One‑Screen, Every Device

The current hero uses `min-h-[100dvh]` with fixed top padding (`pt-32 md:pt-40`), `justify-between`, and a `t-display-1` headline that scales only on viewport **width** (`clamp(48px, 9.4vw, 112px)`). On a short laptop (≈928×672) the headline alone consumes ~270px, plus eyebrow + lede + CTAs + the bottom meta row exceed available height — content overflows and the page feels janky.

## Goal

The hero **always** fits exactly one viewport, top to bottom, on phone, tablet, laptop and 4K — without scroll, without the bottom meta row colliding with the CTAs, and without the headline truncating.

## Approach

Three coordinated moves, all CSS/markup only — no business logic.

### 1. Viewport unit that respects mobile chrome

Switch the section from `min-h-[100dvh]` to a true lock:

```text
h-[100svh]          → guarantees one screen on iOS/Android (no URL-bar jump)
md:h-[100dvh]       → desktop uses dynamic vh
max-h-[100dvh]      → never taller than the window
```

Add `overflow-hidden` (already there) so video crop stays clean.

### 2. Headline that scales on the *shorter* axis

The root cause of the laptop jank is a width-only clamp. Replace the headline's font-size driver so it shrinks when the **window is short**, not just narrow:

```text
font-size: clamp(40px, min(8.2vw, 11vh), 104px);
line-height: 1.02;
```

Apply via a new utility on the hero headline only (don't touch the global `--fs-display-1` token — other pages depend on it). Pair with `letter-spacing` already on `t-display-1`.

Lede + eyebrow get a parallel, lighter clamp:

```text
eyebrow: clamp(10px, 1.1vh, 12px)
lede:    clamp(15px, 1.6vh, 20px)
gap-lede shrinks: clamp(14px, 2.2vh, 32px)
```

### 3. Layout that breathes with the viewport

Replace the fixed top/bottom paddings with a vertical rhythm tied to viewport height, and turn the bottom meta row into a true footer that never overlaps:

```text
<section h-[100svh] overflow-hidden>
  HeroMedia + gradient (unchanged)

  <div class="container-x relative h-full
              pt-[max(96px,12vh)] pb-[max(20px,4vh)]
              flex flex-col">
    <div class="flex-1 min-h-0 flex flex-col justify-center max-w-3xl">
      eyebrow
      h1   ← new fluid clamp
      lede ← shrinks on short screens
      CTA row (mt: clamp(20px, 3vh, 40px))
    </div>

    <div class="hidden md:flex justify-between t-micro shrink-0">
      Fly4MEdia / 2026   ·   Alberta, Canada / Available worldwide
    </div>
  </div>
</section>
```

Key mechanics:

- `h-full` + `flex-col` + `flex-1 min-h-0` on the content block → headline+lede+CTAs vertically center in the available space, meta row pinned to the bottom edge
- Top padding is the larger of the header height (96px) or 12vh — preserves breathing room on tall screens, tightens on short ones
- `min-h-0` on the centering block prevents flex-overflow on short laptops
- Mobile keeps a single column without the meta row (already hidden via `md:flex`)

### Files touched

1. `src/components/fly4media/Hero.tsx` — restructure container, swap classes per above. Headline gets a new utility class (e.g. `hero-display`) instead of `t-display-1`.
2. `src/index.css` — add `.hero-display` utility (the `min(vw, vh)` clamp) plus the eyebrow/lede viewport-height clamps. No global token changes.

## Out of scope

- Changing copy
- Touching `HeroMedia` (video pipeline already correct)
- Other pages' display sizing
- Removing the meta row (it just stops overlapping)

## Verification

- Resize from 320×568 up through 928×672, 1280×720, 1440×900, 1920×1080 — headline, lede, CTAs and meta row all visible, no scroll inside the hero
- iOS Safari (URL bar visible vs. hidden) — no layout shift thanks to `svh`
- Reduced-motion + Save-Data still get poster-only hero
- No console warnings introduced
