## Cinematic Intro Sequence — Fly4MEdia

A bespoke 2-second studio-identity moment that plays only on first visit to `/`, then dissolves into the live homepage. CSS-only, GPU-only, scroll locked briefly, fully bypassable.

### Behavior rules

- **Fires once per session** — sessionStorage flag `f4m:intro:v1`. Reload during the same tab session = no replay.
- **Only on the homepage `/`** — never on internal routes, never after `?nointro`, never with `prefers-reduced-motion`.
- **Total duration: ~1.9s** from mount to interactive. Hero is rendered behind from t=0 — it's already painted before the intro veil lifts (no perceived load).
- **Skippable** — click, keypress, or scroll attempt finishes immediately (200ms graceful exit).
- **Scroll lock** only while veil is visible (~1.7s); restored before the dissolve completes.

### Timing (refined storyboard)

```
0.00s  Black veil paints over hero (hero already mounted underneath)
0.10s  Drone mark fades in: opacity 0→1, scale 0.92→1, blur 6px→0
0.45s  Mark settles. Hairline expands horizontally from center (1px → 80px)
0.55s  Light sweep crosses mark (linear-gradient mask, 700ms)
0.70s  "Fly4MEdia" wordmark reveals: tracking 0.4em→0.18em, opacity 0→1, y +6px→0
1.05s  Eyebrow "Aerial Cinematography · Alberta" fades in below
1.40s  Veil begins dissolve: opacity 1→0 over 500ms with ease-out-soft
1.40s  Logo cluster scales 1→0.96 + opacity 1→0 (continuity, not a hard cut)
1.55s  Hero h1 begins its existing fade-up (already in Hero.tsx)
1.90s  Veil unmounted, scroll restored, focus returns
```

The hero is fully rendered the entire time — when the veil lifts the page is "already there." This is the magic: not a loading screen, an invitation.

### Visual treatment

- **Background**: solid `hsl(var(--foreground))` (#121212-ish), with two subtle layers:
  - Vignette: `radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.55) 100%)`
  - Drifting fog: single full-bleed `<div>` with a soft radial gradient, 40s `translate3d` keyframe drifting -3% to +3% on x — nearly subconscious, GPU-only.
  - Film grain: same CSS dot-pattern technique already used in ContactModal, `mix-blend-overlay` at 5%.
- **No imagery, no canvas, no particles.** Pure CSS.
- **Logo**: existing `fly4media-mark.png` at ~64px, white tint via `filter: invert(1) brightness(2)` is brittle — instead just render it on the dark veil as-is (mark is already monochrome) and apply `filter: drop-shadow(0 0 24px rgba(255,255,255,0.08))` for the soft glow.
- **Wordmark**: "Fly4MEdia" in Inter 500, 18px desktop / 16px mobile, `letter-spacing` animates from 0.4em → 0.18em (tracking-in, the editorial signature move).
- **Hairline**: 1px white line at 18% opacity, expands from a 1px point to 80px wide using `transform: scaleX()` (GPU).
- **Light sweep**: a 30%-wide linear-gradient strip (`transparent → white/12% → transparent`) that translates across the logo block once, 700ms, masked to the logo cluster.

### Architecture

**New files**
- `src/components/fly4media/Intro.tsx` — the veil. Self-contained, ~120 lines. Reads/writes sessionStorage, listens to ESC/click/wheel/touchstart/keydown to skip. Mounted unconditionally; immediately returns null on session-replay or non-`/` route or reduced-motion. Uses `useEffect` to add `overflow:hidden` to body for ~1.7s, then removes.
- Keyframes added to `tailwind.config.ts`: `intro-mark-in`, `intro-word-in`, `intro-eyebrow-in`, `intro-hairline`, `intro-sweep`, `intro-fog`, `intro-veil-out`. All use `cubic-bezier(0.22, 1, 0.36, 1)` for the soft cinematic easing; the wordmark gets a touch of restrained spring `cubic-bezier(0.34, 1.2, 0.64, 1)`.

**Edited files**
- `src/pages/Index.tsx` — render `<Intro />` as the last sibling so it z-indexes above hero on first paint.
- `src/index.css` — add `.intro-*` utility classes and the reduced-motion guard already covers it.

**Not touched**: Hero, Header, Footer, Services, FeaturedWork, ContactModal, useReveal, App routing.

### Skip / accessibility

- ESC, click, wheel, touchstart, keydown → triggers `finish()` which transitions opacity to 0 over 200ms and unmounts.
- `aria-hidden="true"` on the veil; focus is moved to `<main>` after unmount.
- `prefers-reduced-motion: reduce` → component returns null entirely. Hero shows immediately.
- Mobile (`(max-width: 640px)`) — fog layer hidden, sweep duration 500ms instead of 700ms; everything else identical.

### Performance budget

- Zero new dependencies. Zero new images. ~4 KB of TSX + ~1 KB of CSS.
- Hero LCP unchanged: hero `<img>` mounts at t=0 underneath the veil. The veil is opaque during the intro, so the LCP image likely won't be measured against the veil paint — acceptable trade-off for the intentional pacing. (If Lighthouse shows regression we can lower veil opacity to 98% so LCP fires earlier; flagged but not built in.)
- All animations: `transform`, `opacity`, `filter` only. `will-change` set only on the veil and removed after exit.

### Acceptance

- First visit to `/` in a session: intro plays once, ~1.9s total, then site is fully interactive.
- Navigating to `/work` and back: no intro replay.
- Reload tab: no replay (session). New tab / new browser session: replays once.
- ESC or any input: intro exits gracefully in 200ms.
- Reduced motion: no intro at all.
- No layout shift, no scroll jump, no dropped interactivity.

### Out of scope

- Sound design (visual-only this pass).
- Replaying intro on logo click (user spec wasn't asking for it).
- Per-page intros for `/work`, `/services`, `/about` — homepage only.
- Replacing the existing hero animation — Intro hands off, hero animates as it does today.
