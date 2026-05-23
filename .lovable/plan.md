# Intro v6 — "Aperture" (fantasy.co register)

A complete teardown of v5. Strip the intro to its absolute minimum: one mark, one line of type, one quiet curtain lift. No brackets, no counter, no ring pulse, no light sweep, no fog, no grain, no aperture shutter — all gone. The reference is fantasy.co's site loaders: black field, generous silence, one motion, one moment, then gone. Total runtime ~3.8s.

## The brief (for the animation designer)

> Design a single-frame loader for the Fly4MEdia home hero. Black field. Centered. Three things happen in sequence, slowly, with the confidence of a studio that doesn't need to perform:
>
> 1. A thin 1px white hairline draws from the center outward to 96px wide. 900ms.
> 2. **Perspective changes everything.** fades in beneath the line — set in Inter Regular, sentence case, ~13–14px, tracked +120, white at 65% opacity. Letters resolve as a single block (opacity only — no stagger, no blur, no slide). 700ms.
> 3. Everything holds for 900ms. The viewer reads it. Nothing moves.
> 4. The entire intro layer fades to transparent over 700ms, revealing the home hero already present underneath. No shutter, no aperture, no zoom. Just a clean cross-dissolve.
>
> The mark above the hairline is the drone glyph at 28×28px (smaller than v5 — it's a punctuation mark, not the subject). It eases in at 0ms over 500ms, opacity 0 → 0.9, no scale, no rotation. The hairline starts drawing once the mark is at full opacity.
>
> Easings: `cubic-bezier(0.65, 0, 0.35, 1)` on the hairline and the fade-out; `cubic-bezier(0.4, 0, 0.2, 1)` on the mark and the text. Tempo: slow but not sleepy — every beat finishes cleanly before the next begins.

## Total timeline (~3800ms)

```text
0     →  500    mark fade in           (opacity 0 → 0.9)
500   →  1400   hairline draws         (scaleX 0 → 1, 96px wide)
1400  →  2100   slogan fades in        (opacity 0 → 0.65)
2100  →  3000   HOLD                   (everything still)
3000  →  3700   intro layer fades out  (opacity 1 → 0)
3700           hero is fully visible
```

Hero handoff: the hero starts its own subtle reveal at `2800ms` (200ms before the intro begins fading) so the cross-dissolve overlaps cleanly — no flash of black between intro and hero.

## What this removes (intentional)

- Viewfinder brackets (corner Ls)
- 00/100 frame counter
- Mark ring pulse
- Stack-breath scale animation
- Light sweep
- Drifting fog gradient
- Film grain overlay
- Center vignette
- Letter-by-letter cascade with letter-spacing animation
- Wordmark + descriptor reveal ("Fly4MEdia / A cinematic perspective studio")
- Slogan-softens transition (slogan never softens — it just fades with the layer)
- Vertical aperture shutter exit
- Seam flare
- Stack-zoom dissolve

The Fly4MEdia wordmark and descriptor no longer appear in the intro. Reasoning: the header already shows the brand the moment the curtain lifts; restating it here is theater the brand doesn't need. The intro becomes purely **a promise** ("Perspective changes everything.") and a **handoff**.

## Implementation

- **`src/components/fly4media/Intro.tsx`** — rewrite. Two state phases (`enter`, `exit`). JSX is just: black backdrop, centered column with `<img>` mark, hairline `<span>`, slogan `<p>`. Drop the `Brackets` subcomponent, the counter rAF, the `runId` state, the suspend/brand/dissolve phases, the aperture panels, the seam flare, the fog, the grain, the vignette. Keep: replay listener (logo click), session key (bump to `f4m:intro:v6`), reduced-motion gate, `?nointro` escape, `INTRO_HERO_REVEAL_AT_MS = 2800`, body scroll lock during the intro.
- **`src/index.css`** — delete every `.intro-*` keyframe and class except `intro-fade-out`. Add three new ones: `intro-mark-in` (opacity only), `intro-hairline-draw` (scaleX from 0 to 1, transform-origin center), `intro-text-in` (opacity 0 → 0.65). Remove the `.intro-fog`, `.intro-sweep`, `.intro-bracket*`, `.intro-counter*`, `.intro-ring*`, `.intro-stack-*`, `.intro-aperture-*`, `.intro-seam-flare`, `.intro-clip-wipe`, `.intro-slogan-soften`, `.intro-letter*`, `.intro-veil-out`, `.intro-skip*` definitions.
- **Hero handoff** — verify `Hero.tsx` listens to `f4m:intro:exit` or reads `INTRO_HERO_REVEAL_AT_MS` to time its own opening reveal; if it currently expects 6720ms, adjust to align with the new 2800ms.

## Files

- `src/components/fly4media/Intro.tsx` *(full rewrite, ~80 lines)*
- `src/index.css` *(delete v5 intro block, replace with 3 tiny keyframes)*
- `src/components/fly4media/Hero.tsx` *(verify timing only — likely a one-line constant change)*

## Notes

- Logo-click-to-replay still works (REPLAY_KEY path, replay event listener).
- Session key bumps to `f4m:intro:v6` so every visitor sees the new intro once.
- Mobile: identical timing. The mark and hairline are already small enough that no responsive adjustments are needed.
- No new dependencies. Pure CSS keyframes + minimal JS timeline.
