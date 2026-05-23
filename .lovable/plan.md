
# Intro animation — fantasy.co / Calemwood-grade rebuild

## What we have now

Five phases (dark → slogan → hold → brand → dissolve), 6.2s total. Center-out letter cascade, hairline rule, brand stack rise, stack-zoom + blur exit. It's competent but generic — it feels like a typography demo, not a *cinematic threshold*.

## What Calemwood is doing right (that we should steal in our register)

1. **Architectural framing** — corner L-brackets snap in like camera viewfinder marks. The screen feels *composed*, not just decorated.
2. **The logo enters before the wordmark** — drone mark scales/settles, then the type wipes in beside it. Hierarchy is explicit.
3. **A "suspend" beat** — progress hits 100%, everything inhales, the rule fills, ring pulse expands. The frame *breathes* before it parts.
4. **Curtain-part exit** — two halves slide opposite directions on a dramatic ease with a shimmer seam at the parting line. The reveal is *theatrical*, not a fade.
5. **One micro-counter** — `00–100%` in monospace. Tiny but reads as "the studio is loading something deliberate", not "a website is rendering".
6. **Orchestrated easing** — every motion uses one of three named eases. Nothing is default-tween.

Calemwood is industrial-luxe; we're editorial-cinema. We don't copy the copper accents, the brackets-as-machinery, or the progress bar as a *progress bar*. We translate.

## The rebuild — Fly4MEdia "Threshold" intro

Six beats, ~6.6s, all CSS keyframes + JS timeline (no Framer Motion — performance memory line). Skippable as before.

### Beat 1 — Anchor (0–520ms)

Pure black. Grain + warm pulse (current). Add: the **drone mark** (`fly4media-mark.png`) fades in dead-center at 28% scale, rotated `-6deg`, opacity 0 → 0.85. Easing `--ease-out-expo`. This is the "lens cap off" moment — one object, no copy.

### Beat 2 — Frame (520–1100ms)

**Viewfinder brackets** snap in at the four corners — four `28px` L-brackets, 1px white at 25% opacity, staggered 0/60/120/180ms with `--ease-spring`. Mark rotates to `0deg` and scales `0.28 → 0.32` in the same 580ms. The composition is now *framed* — the eye reads "we're composing a shot".

### Beat 3 — Slogan cascade (1100–2500ms)

Keep the center-out letter cascade (it's strong). Two refinements:
- Cascade now reads under the mark, not centered on its own — vertical stack: `[brackets · mark · slogan · counter]`.
- Each letter rises from `translateY(14px) blur(8px) opacity 0` → `0 / 0 / 1` over 700ms with `--ease-out-quart` (currently no blur; the blur-release is what gives fantasy.co text its weight).
- A tiny **`00 → 100`** counter (Inter 500, 11px, white/40, tabular-nums) ticks under the slogan starting at `T+1500ms`, completing at `T+2400ms`. Not a progress bar — a *frame counter*. Disappears at the suspend.

### Beat 4 — Suspend (2500–3400ms)

Everything stops. The hairline rule **draws itself** from center outward (`scaleX 0 → 1`, transform-origin center, 900ms `--ease-emphasized`) — replaces the current static `mt-14 h-px`. Brackets nudge outward by 4px (the frame *opens*). Counter fades. A single light-sweep passes left→right across the slogan only (gradient mask, 1.1s).

This is the breath. The current "hold" phase has nothing happening — Calemwood's suspend is what makes the exit feel earned.

### Beat 5 — Brand mark (3400–4700ms)

Slogan softens to `opacity 0.45` and shrinks `0.96` (current does this — keep). The hairline reframes wider (current `is-wide` — keep). Below the rule, **wordmark wipes in via clip-path** instead of the current fade-rise:
```
clipPath: inset(0 0 100% 0) → inset(0 0 0% 0)
opacity: 0 → 1
duration: 720ms, ease --ease-out-quart, delay 200ms
```
Descriptor "A cinematic perspective studio" wipes in the same way at delay 480ms. Clip-path wipes are the single biggest visual upgrade — they read as *typography revealing itself*, not fading in.

### Beat 6 — Curtain part (4700–6200ms)

The current `stack-zoom + blur + opacity` is fine but too soft. Replace with **camera shutter** — Calemwood's curtain idea, our register:

- The entire stack (brackets + mark + type) zooms `1.00 → 1.06` and blurs `0 → 8px` over 1200ms (`--ease-emphasized`). Current behavior, slightly intensified.
- Simultaneously, **two black panels** slide outward — top half `translateY(0) → translateY(-100%)`, bottom half `translateY(0) → translateY(100%)` — over 1100ms with `--ease-emphasized` starting at T+200ms into the dissolve. NOT left/right curtains (too literal/Calemwood). Vertical = aperture opening = camera language.
- A **1px white hairline** at the horizontal seam scales `scaleX 0 → 3` while fading `opacity 1 → 0` over 800ms (`--ease-out-expo`) as the panels part. This is the lens-flare moment.
- Hero behind takes over (current `f4m:intro:exit` event 200ms before unmount — keep).

### Easing register (used throughout)

All four eases already exist in `index.css`:
- `--ease-out-quart` — letter cascade, type wipes, brackets snap
- `--ease-spring` — bracket settle (the only spring use — selective)
- `--ease-emphasized` — hairline draw, aperture part, stack dissolve
- `--ease-out-expo` — mark entrance, seam flare

No raw `ease`/`ease-out`. Nothing default.

### Sound (optional, opt-in)

Calemwood is silent. Fantasy.co intros sometimes layer a single low whoosh on the exit. Out of scope for this pass — flag for future if you want it.

## File changes

- `src/components/fly4media/Intro.tsx` — restructure the JSX (add mark + corner brackets + counter), rewrite the phase timeline (beats 1/2 are new, beat 6 swaps curtain+seam in), add inline `--reveal-i` style for bracket stagger.
- `src/index.css` — add keyframes for: `intro-mark-in`, `intro-bracket-in`, `intro-letter` (update to include blur), `intro-rule-draw`, `intro-counter-tick`, `intro-clip-wipe`, `intro-aperture-top`, `intro-aperture-bottom`, `intro-seam-flare`. Probably ~80 lines of CSS.
- No new dependencies. No Framer Motion. Mark asset already imported as `@/assets/fly4media-mark.png`.

## Performance / accessibility (preserved)

- `prefers-reduced-motion` → skip entirely (current).
- `sessionStorage` flag → plays once per session (current — but we should bump key to `f4m:intro:v4` so returning users see the new intro once).
- `Esc` / `Enter` / Skip button → instant exit (current).
- Hero handoff event still fires 200ms before unmount (current).

## Open questions

1. **Counter — keep or cut?** It's a tasteful addition (`00 → 100`) and reinforces "deliberate composition", but it could also feel like a webdev cliché. Keep, cut, or replace with a static `01 / 01` shot-slate?
2. **Curtain direction** — vertical aperture (recommended, camera-shutter language) or horizontal letterbox (top + bottom panels closing onto a 2.39:1 strip, then opening — even more cinema, but adds ~400ms). Pick vertical-aperture by default unless you want the letterbox?
3. **Session bump** — should v4 replay for every existing visitor (recommended so they see the new intro once), or keep v3 key so only fresh sessions get it?
