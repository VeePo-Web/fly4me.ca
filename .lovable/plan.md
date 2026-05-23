# Intro v5 — "Suspend"

Bring the intro to Calemwood-grade by stretching the timeline, removing blur, killing the Skip affordance, and giving the sequence the calm "time-stands-still" beat its current pacing skips over.

## Direction

The current intro reads frantic: ~6.2s total but every beat overlaps with blur and motion, so nothing breathes. Calemwood works because it adds a **suspend** phase where everything is on screen, perfectly still, lit by a single hairline drawing across — *then* it parts. We adopt the same shape, in monochrome.

## What changes (UX)

1. **No Skip button.** Remove the button entirely. Remove the Escape/Enter skip handlers too — the intro is part of the brand, not a wait.
2. **Slower, calmer timeline (~8.6s total, up from 6.2s).** Each beat gets room.
   ```text
   0.00 → 0.80   anchor      drone mark fades in dead-center, -4deg → 0deg
   0.80 → 1.60   frame       L-brackets snap in (staggered 80ms), settle
   1.60 → 3.40   slogan      center-out letter cascade, NO BLUR — opacity+rise only
   3.40 → 5.40   suspend     everything holds. hairline draws center-out.
                             counter ticks 00→100. soft ring pulse around mark.
                             whole stack scales 1.000 → 1.012 ("breath").
   5.40 → 7.00   brand       slogan dims to 35%, rule reframes wide,
                             wordmark + descriptor clip-wipe in
   7.00 → 8.60   dissolve    stack scales 1.00 → 1.04 (no blur),
                             aperture parts, 1px seam flares across
   ```
3. **Kill the blur.** Replace every `blur()` filter with pure opacity + 6–10px translateY. Blur on cheap displays smears and reads "loading screen", not "cinema". Specifically:
   - `intro-letter-in`: drop `filter: blur(8px) → 0`; keep `opacity 0 → 1` + `translateY(14px → 0)` over **1100ms** (was 900) with `cubic-bezier(0.16, 1, 0.3, 1)`.
   - `intro-stack-zoom`: remove the `blur(0 → 8px)` keyframe; keep only `scale(1 → 1.04)` over 1500ms.
4. **Smoother letter cascade.** Increase per-letter stagger from `32ms → 48ms` and lengthen each letter's duration from 900ms → 1100ms. Center-out distribution stays; perceived rhythm becomes a wave instead of a flicker.
5. **True suspend beat.** Add a `T_SUSPEND` phase (2000ms) between current `hold` and `brand`:
   - Hairline draws from center outward over 1400ms (already exists, slow it from 900 → 1400).
   - A new **mark ring pulse**: a 1px white/20 ring around the drone mark scales `0.6 → 1.4` and fades `0.35 → 0` over 1600ms (one pulse, not a loop).
   - Whole stack does a 0.012-scale breath (`scale(1) → scale(1.012) → scale(1)`) over the full 2000ms with `cubic-bezier(0.45, 0, 0.55, 1)` — Calemwood's "time stands still" trick at half the amplitude.
   - Counter finishes its tick at the *start* of suspend (so it lands and stays at `100`) instead of mid-cascade.
6. **Counter polish.** Hold `100 / 100` for the full suspend phase, then fade to 0 opacity at brand-start (300ms). Currently it pops off immediately after `slogan`.
7. **Bracket settle.** After the snap-in, brackets get a 1400ms nudge outward by 6px (currently 4px, instant) with `cubic-bezier(0.7, 0, 0.3, 1)` during suspend — adds the same "frame expanding" feel Calemwood gets from corner scale 1 → 1.08.
8. **Wordmark reveal.** Keep clip-path wipe but slow `intro-clip-wipe` from 720ms → 1000ms and stagger wordmark (200ms delay) and descriptor (520ms delay).
9. **Aperture exit.** Slow `intro-aperture-top/bottom` from 1100ms → 1400ms, easing `cubic-bezier(0.83, 0, 0.17, 1)` (Calemwood's `EASE_DRAMATIC`). Seam-flare scales `0 → 3` over 900ms instead of 850ms — same shape, slightly more glide.
10. **Hero handoff.** `INTRO_HERO_REVEAL_AT_MS` updates to match the new `T_DISSOLVE_START - HERO_HANDOFF_LEAD` (lead increases to 280ms so the hero pixels start their own reveal slightly before the curtain fully parts — eliminates the "stutter" between intro end and hero start).
11. **Session key bumps to `f4m:intro:v5`** so the new sequence plays once for everyone — replay-via-logo path (already shipped) continues to work.

## Files

- `src/components/fly4media/Intro.tsx` — add `suspend` to `Phase`, recompute T_* constants, add ring-pulse element, add stack-breath class, drop Skip button + Escape/Enter handlers, retarget counter window.
- `src/index.css` — update keyframe durations/easings listed above; add `@keyframes intro-ring-pulse` + `.intro-mark-ring`; add `@keyframes intro-stack-breath` + `.intro-stack-breath`; remove `blur()` from `intro-letter-in` and `intro-stack-zoom`.

## Notes

- No new libraries — still pure CSS keyframes + JS phase orchestrator, no Framer Motion.
- Reduced-motion path stays as-is (intro never mounts).
- The `?nointro` query param stays as a developer escape hatch.
