# Intro v7 — cinematic correctness + Victorious-grade perf

## Audit findings

1. **Timing collapses the hold beat.** Word-2 ends at 2950ms, fade starts at 3000ms — only 50ms of stillness. The "rack → breathe → fade" rhythm never lands.
2. **LCP = the intro mark, not the hero.** A 28×28 PNG becomes the Largest Contentful Paint because the hero is hidden until ~2.8s. Two causes:
   - `fly4media-mark.png` is a raster file requiring a network round-trip.
   - The hero image isn't preloaded during the 2.8s of dead intro time.
3. **`filter: blur(4px)` + `will-change: filter`** is the most expensive op in the sequence; drops frames on mid-range Android.
4. **Black flash before hydration.** Intro mounts client-side, so first paint is white → jumps to black.
5. **No prefetch during dead window** — 3s of user attention with no network demand, wasted.
6. **Two scroll locks** (`body.style.overflow` + `.intro-active` class).
7. **Final opacities mismatched** (0.65 vs 0.55) — reads as weaker, not deeper.
8. **`will-change` never retired** — compositor layers stay alive forever.

## Changes

### Re-timed sequence (real hold beat)

```text
0     →  500    mark fade in
500   → 1300    hairline draws (800ms)
1300  → 1850    word-1 fades in
1850  → 2500    word-2 rack focus (blur 2px → 0 by 60%)
2500  → 3100    HOLD — 600ms of stillness
3100  → 3700    layer crossfade out
Hero reveal at 2900ms
```

### `src/components/fly4media/Intro.tsx`
- Update `T_HAIRLINE / T_TEXT / T_HOLD_END / T_FADE` + `INTRO_HERO_REVEAL_AT_MS` to match the table above.
- Replace `<img src={mark}>` with an **inline SVG** of the wordmark glyph (zero network on first paint).
- Drop the `body.style.overflow` mutation; keep only the `.intro-active` class lock.
- After timers are queued, inject `<link rel="prefetch">` for `/work`, `/services`, `/about` chunks and `new Image().src = <first case-study cover>` — guarded by `navigator.connection.saveData` / `effectiveType !== '2g'`.
- On finish, set `will-change: auto` on intro elements to retire compositor layers.
- Bump `SESSION_KEY` to `f4m:intro:v8` so returning users see the corrected sequence once.
- Fix the header comment to match real timings.

### `src/index.css`
- Update animation delays/durations to the new timeline.
- Word-2 rack: `blur(2px)` → `blur(0)` finished by 60% of the keyframe; remove `filter` from `will-change`.
- Unify word-1 + word-2 final opacity at `0.65`.
- Add `animation-fill-mode: forwards` cleanup pattern.

### `index.html`
- Inline `<style>` in `<head>` that paints `#root` black with a centered placeholder slot, so the intro shell is visible before JS executes.
- `<link rel="preload" as="image" href="<hero-poster>" fetchpriority="high">` — use the actual hero poster path from `Hero.tsx`.

## Verification
- Lighthouse mobile cold load on `/` → LCP element should be the hero image, target LCP < 2.5s on Fast 3G.
- DevTools Performance recording of intro → no long tasks > 50ms; blur layer released by 2500ms.
- Visual check: a clearly visible stillness beat before the fade.

## Files touched
- `src/components/fly4media/Intro.tsx`
- `src/index.css`
- `index.html`

No new dependencies. No layout changes. No copy changes.
