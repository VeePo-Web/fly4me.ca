# Cinematic Intro v2 — Apple-Level Reveal

The current `Intro` component already nails the atmosphere (vignette, fog drift, grain, sweep) but the sequence is inverted from the brief: the eyebrow "Fly4MEdia" appears at the top before the slogan, there's no proper brand stack, no cinematic pause, and the brand never settles below the thesis. We restage the reveal into a true 4-phase sequence under the 2.2s ceiling.

## Sequence (total ~2150ms)

```
0ms     Black + vignette paints instantly (no flash, no FOUC)
0–300   Atmospheric layers fade in: fog drift + grain + faint radial glow
300–1100 Slogan reveal — "Perspective Changes Everything."
        Soft upward fade, tracking settles 0.40em → 0.16em, blur 6px → 0
1100–1500 Cinematic pause (slogan held, faint sweep crosses behind)
1500–2050 Brand stack rises beneath slogan:
          • slim hairline (scaleX 0 → 1)
          • Fly4MEdia wordmark (fade + 6px lift)
          • "A cinematic perspective studio" descriptor (delayed 120ms)
          • single restrained light-sweep across the wordmark
2050–2150 Hairline contracts, veil dissolves (550ms opacity-only fade)
          Homepage Hero is already painted underneath → continuity
```

Skip on first user input (already implemented). Honors `prefers-reduced-motion`. Runs once per session via `sessionStorage`. Home route only.

## Layout

Centered column, generous vertical rhythm:

```text
                  Perspective Changes Everything.        ← t-headline-1, max 22ch

                          —— hairline ——

                            Fly4MEdia                    ← t-headline-3
                  A cinematic perspective studio         ← t-micro, white/55
```

Eyebrow at top is removed — the brand becomes the resolution beat, not the opener. Slogan upgraded from `t-headline-2` → `t-headline-1` for the launch-card scale called for in the brief.

## Motion language

- Single shared easing: `var(--ease-out-soft)` (already in tokens) — no Framer Motion
- All transforms GPU-only (translate, scale, opacity, filter:blur, letter-spacing)
- `will-change: opacity, transform` on animated nodes only
- Veil out is opacity-only 550ms → no layout shift, Hero paints through
- Body scroll locked during intro, restored on dissolve

## Files touched

1. `src/components/fly4media/Intro.tsx` — restructure DOM (slogan first, brand stack after, descriptor added), retime via new class names, total HOLD raised to ~2050ms
2. `src/index.css` (intro section, lines 658–697) — add `intro-brand`, `intro-descriptor`, `intro-hairline-out` keyframes; retime existing `intro-word`, `intro-hairline`, `intro-sweep`, drop `intro-eyebrow` (no longer used)

## Out of scope

- Logo morph into navbar position (called "optional advanced behavior" in brief — adds complexity for marginal gain; can land in a follow-up)
- Drone SVG icon (no asset exists yet; wordmark-only stack is more restrained anyway)
- Replacing CSS with Framer Motion or canvas

## Verification

- Watch full sequence at desktop 1440 + mobile 390
- Confirm total length ~2.1s, no jank, slogan held visibly before brand reveal
- Refresh same tab → intro skipped (sessionStorage)
- Add `?nointro` query → intro skipped
- DevTools throttle to 4× CPU → still 60fps (CSS only)
