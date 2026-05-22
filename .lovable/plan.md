## Why the current intro doesn't feel premium

The veil at `src/components/fly4media/Intro.tsx` runs the entire show in **2050ms**:

```
0ms    veil appears
300ms  slogan animates in (800ms)
1300ms light sweep starts
1500ms hairline + brand + descriptor (all within 280ms of each other)
2050ms veil fades out
```

Three problems:
1. **No breathing room.** The slogan appears, the brand stack lands on top of it almost immediately, then the whole thing leaves. There's no moment where the viewer *sits* with the slogan.
2. **Everything animates the same way.** Every element uses `--ease-out-soft` over ~600–800ms. There's no contrast between a quiet hold and an emphatic reveal — so nothing feels emphatic.
3. **Any input skips it** (`keydown, wheel, touchstart, click`). A premium intro is a directed moment, not something the visitor accidentally dismisses on first scroll.

Studios like fantasy.co and the Worship VeilIntro reference earn their feel from **distinct phases separated by silence**, slower easing curves, and a deliberate hand-off into the page underneath.

---

## The new sequence (~6.2s total)

Five named phases, each with its own intent and easing. Total runtime is long enough to feel ceremonial but short enough to never frustrate.

```
Phase          Start    Duration  What happens
────────────────────────────────────────────────────────────────────
1 dark         0ms      650ms     Pure black. Grain + warm radial pulse fades up.
2 slogan-in    650ms    1400ms    "Perspective Changes Everything."
                                  Letter-by-letter blur-to-sharp stagger.
                                  Hairline below it draws in last.
3 hold         2050ms   1200ms    Slogan sits perfectly still. Grain drifts.
                                  Light sweep crosses once, very slowly.
4 brand-in     3250ms   1600ms    Slogan softens to 30% opacity (doesn't leave).
                                  Hairline reframes from short → wide.
                                  "Fly4MEdia" rises with optical blur clearing.
                                  Descriptor types in beneath it.
5 dissolve     4850ms   1350ms    Entire stack scales 1.00 → 1.04, blurs 0 → 6px,
                                  veil opacity 1 → 0 with cubic-bezier(0.7,0,0.3,1).
                                  Hero underneath simultaneously gets a .hero-handoff
                                  class that fades its content from 0 → 1.
                                  ────────────────────
Total: 6200ms
```

Key feel changes vs. today:
- **The slogan is the hero of phase 1.** It gets its own 1.4s reveal + a 1.2s hold where nothing else moves. Currently it competes with the brand stack 1.2s later.
- **Brand reveal doesn't replace the slogan** — slogan stays visible at low opacity, so the two concepts feel like a single composed frame instead of a slide change.
- **Dissolve, not fade.** Today the veil opacity drops in 550ms over a static stack. The new exit zooms + blurs the stack as the veil clears, so it feels like the camera pulls into the hero rather than the curtain dropping.

---

## Slogan letter-by-letter reveal

Replace the single `.intro-word` span with letter spans wrapped per word (preserving word-break behavior). Each letter animates:

```
opacity:        0 → 1
transform:      translateY(14px) → 0
filter:         blur(8px) → blur(0)
letter-spacing: 0.18em → 0.02em (settles)
```

Stagger 28ms per letter, easing `cubic-bezier(0.2, 0.7, 0.2, 1)` (calm exponential out). Total slogan reveal = ~1.4s for ~33 chars. This is the single move that makes it read as "designed" instead of "generated."

A 12px hairline underneath the slogan draws in left-to-right `scaleX(0) → scaleX(1)` over 700ms, starting at the 80% point of the letter cascade, so it feels like an underline being struck after the phrase lands.

---

## Easing & timing principles applied

| Move                  | Easing                          | Why                                                        |
| --------------------- | ------------------------------- | ---------------------------------------------------------- |
| Letter cascade        | `cubic-bezier(0.2, 0.7, 0.2, 1)`| Slow start, quick settle — feels like ink drying           |
| Slogan hold           | (no motion)                     | Stillness is the move                                      |
| Brand rise            | `cubic-bezier(0.16, 1, 0.3, 1)` | Existing `--ease-out-soft`, gentle deceleration             |
| Hairline reframe      | `cubic-bezier(0.7, 0, 0.3, 1)`  | Symmetric in/out — feels mechanical, premium                |
| Veil dissolve         | `cubic-bezier(0.7, 0, 0.3, 1)`  | Same curve so dissolve feels like the same hand            |
| Stack zoom on exit    | `cubic-bezier(0.16, 1, 0.3, 1)` | Eases out into the hero                                    |

No bouncy springs anywhere. Premium cinema doesn't bounce.

---

## Interaction & accessibility rules

- **Skip controls become explicit.** Remove `wheel`, `touchstart`, `click` from skip events. Only `Escape` and `Enter` skip. (`keydown` on any key was too aggressive.) Plus a tiny **"Skip"** label fades in bottom-right at 1500ms, `t-micro` opacity 35%, clickable.
- **`prefers-reduced-motion`** still bypasses the whole thing immediately (unchanged).
- **`sessionStorage` key** bumps from `f4m:intro:v2` → `f4m:intro:v3` so returning users get the new intro once.
- **Body scroll lock** stays in place for full duration (already correct).
- **First paint** of the hero underneath happens *during* phase 5 — we add a `.hero-handoff` class that the Hero component listens for (via a custom event `f4m:intro:exit`) so its own headline reveal starts ~200ms into the dissolve, not after it.

---

## Files that will change

1. **`src/components/fly4media/Intro.tsx`** — full rewrite of phase logic. New constants: `PHASE_DARK = 650`, `PHASE_SLOGAN = 1400`, `PHASE_HOLD = 1200`, `PHASE_BRAND = 1600`, `PHASE_DISSOLVE = 1350`. New letter-splitting helper for the slogan. New skip-key handler (`Escape`/`Enter` only). Dispatches `f4m:intro:exit` 200ms before veil unmounts.
2. **`src/index.css`** (intro block at line 755) — add `.intro-letter`, `.intro-letter--delay-N` (or use inline `animationDelay` per letter from JSX). Add `.intro-hairline-wide` (reframed width). Add `.intro-stack-zoom` keyframes. Tune existing `.intro-veil-out` to 1350ms with the dissolve curve. Add `.intro-slogan-soften` (slogan opacity drop during phase 4).
3. **`src/components/fly4media/Hero.tsx`** — listen for `f4m:intro:exit` and apply a brief class (or trigger the existing `t-reveal-track` headline animation) so the hero composition lands *during* the dissolve, not after a beat of black.

No other components are affected. No new dependencies. Same Framer-less, CSS-only approach the rest of the site uses.

---

## What I'm NOT changing
- The slogan copy ("Perspective Changes Everything.")
- The brand mark, descriptor, fonts, color
- The skip-once-per-session behavior
- The reduced-motion bypass
- Anything outside the Intro / Hero handshake

---

## Open question

Do you want the **slogan letters** to animate **left → right** (a "reading" cascade, more traditional/editorial) or **center-out** (more symmetric/ceremonial, what fantasy.co would lean toward)? I'll default to **center-out** unless you say otherwise — it pairs better with the symmetric hairline strike and the radial vignette.
