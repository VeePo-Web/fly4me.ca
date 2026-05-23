# Intro v7 — "Focal Pull" (fantasy.co register)

Same skeleton as v6 (mark → hairline → slogan → hold → crossfade), but the slogan itself becomes the moment. Two words, two planes, one lens rack. Total runtime stays ~3.8s.

## The move

The slogan is split into two spans on a single line:

> **Perspective** · **changes everything.**

They arrive on different focal planes:

1. **"Perspective"** fades in flat, already at depth 0. Opacity 0 → 0.65, no scale, no blur. 600ms. It lands like the first thing the camera was focused on.
2. **200ms beat of stillness.** The viewer registers the word as the subject.
3. **"changes everything."** racks in from behind. Starts at `scale(1.04)`, `blur(4px)`, `opacity(0)`. Resolves to `scale(1)`, `blur(0)`, `opacity(0.55)` over 750ms with `cubic-bezier(0.2, 0.7, 0.2, 1)` (a soft focus-pull curve — slow start, decisive settle). It feels like the lens just found a second subject behind the first.
4. Both words hold together for 900ms.
5. Intro layer crossfades out over 700ms. Hero already revealing underneath.

The first word is set at the same weight as before (white at 65%). The second word resolves slightly dimmer (white at 55%) — the depth cue. The eye reads "Perspective" as foreground, "changes everything." as the plane behind it. The full sentence is legible the entire time after 1750ms.

Spacing: a single space between the two spans, no manual gap. The line never reflows — the second span animates in place, so the layout is committed from the moment the first word lands (we reserve the width with a hidden ghost copy, see Technical below).

## Total timeline (~3800ms)

```text
0     →  500    mark fade in              (opacity 0 → 0.9)
500   →  1400   hairline draws            (scaleX 0 → 1, 96px wide)
1400  →  2000   "Perspective" fades in    (opacity 0 → 0.65, flat)
2000  →  2200   beat                       (still — let it land)
2200  →  2950   "changes everything."     (scale 1.04 → 1, blur 4px → 0, opacity 0 → 0.55)
2950  →  3000   micro-settle
3000  →  3700   intro layer fades out     (opacity 1 → 0)
```

Hero handoff stays at **2800ms** — the rack-focus is still resolving when the hero starts opening underneath, which sells the depth illusion (the intro feels like a foreground plane being defocused away as a deeper plane resolves).

## What stays from v6

- Mark fade-in, hairline draw, hold, crossfade-out
- All easings on those existing beats
- `INTRO_HERO_REVEAL_AT_MS = 2800`, body scroll lock, `?nointro` escape, reduced-motion gate, logo-click replay
- Session key bumps to `f4m:intro:v7`
- No brackets, counter, sweep, fog, grain, aperture, seam, stack-zoom

## Why this works for the brand

The slogan is "Perspective changes everything." The animation literally performs a perspective change — a focal-plane shift — on the sentence that says it. The motion *is* the meaning. fantasy.co-quality moves earn their existence by being the idea, not decorating it.

## Technical

- **`src/components/fly4media/Intro.tsx`** — split the `<p>` into:
  ```tsx
  <p className="intro-text relative ...">
    <span className="intro-word-1">Perspective</span>{" "}
    <span className="intro-word-2 inline-block">changes everything.</span>
  </p>
  ```
  Both spans start at `opacity: 0` via the keyframes. Use `will-change: transform, filter, opacity` on `.intro-word-2` only (don't pay the cost on word 1, it's a pure opacity fade). The `<p>` reserves width naturally because both spans render in the layout pass — they just start transparent. No ghost copy needed; CSS animations don't pull elements from the flow.

- **`src/index.css`** — replace `intro-text-in` with two keyframes:
  ```css
  @keyframes intro-word-1-in {
    from { opacity: 0; }
    to   { opacity: 0.65; }
  }
  @keyframes intro-word-2-rack {
    from { opacity: 0; transform: scale(1.04); filter: blur(4px); }
    to   { opacity: 0.55; transform: scale(1); filter: blur(0); }
  }
  .intro-word-1 {
    opacity: 0;
    animation: intro-word-1-in 600ms cubic-bezier(0.4, 0, 0.2, 1) 1400ms forwards;
  }
  .intro-word-2 {
    opacity: 0;
    transform-origin: center;
    animation: intro-word-2-rack 750ms cubic-bezier(0.2, 0.7, 0.2, 1) 2200ms forwards;
  }
  ```
  Keep `intro-mark-in`, `intro-hairline-draw`, `intro-layer-out` exactly as they are. Delete `intro-text-in`.

- **`Intro.tsx` constants** — `T_TEXT` (1400) stays as the start of word 1. Add `T_WORD2 = 2200` for documentation; no new timers needed (CSS handles it). `T_HOLD_END = 3000` and `T_TOTAL = 3700` unchanged.

- **`src/components/fly4media/Hero.tsx`** — no change. Still listens to `f4m:intro:exit` at 2800ms.

## Files

- `src/components/fly4media/Intro.tsx` *(split slogan into two spans, bump session key)*
- `src/index.css` *(replace `intro-text-in` with `intro-word-1-in` + `intro-word-2-rack`)*

## Notes

- Reduced-motion: the existing gate skips the intro entirely, so the rack-focus never runs for users who opted out. No additional handling needed.
- Mobile: identical. The blur radius (4px) and scale delta (1.04) are sub-perceptible at any sensible viewport, but they read as depth — they don't need to be large to work.
- Performance: one element transforms + blurs for 750ms. GPU-cheap. No paint thrash because `filter: blur()` on a 13px text span is trivial.
