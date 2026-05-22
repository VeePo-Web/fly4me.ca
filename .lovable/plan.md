
# Nav legibility v2 — visible without becoming chrome

The current nav crossfades from white over the hero to ink after scroll. The bones are right, but over bright video frames (Sabines especially) the wordmark and "Menu" lose contrast. The fix is **depth, not opacity** — give the marks weight and atmosphere without adding a plate.

## Five-part refinement

### 1. Type weight bump, only on the nav
- Current `t-nav` is 14px / 500. Over video that reads as a whisper.
- Promote nav text to **15px / 600** with `letter-spacing: -0.005em` — still quiet, but enough optical mass to hold against motion footage.
- Wordmark gets a hairline-thin uppercase tracking treatment as an alt: `FLY4MEDIA` at 13px / 600 / `letter-spacing: 0.14em`. This is the fantasy.co tell — uppercase wordmarks read as institutional, not casual. (I'll prototype both casings and we pick.)

### 2. Logo upgrade — give it physical weight
- Bump from `size-7 md:size-8` (28/32px) to **size-8 md:size-9** (32/36px). Still small, but no longer apologetic.
- Replace the single soft drop-shadow with a **two-layer shadow stack** while over video:
  - inner: `drop-shadow(0 0 1px rgba(0,0,0,0.5))` — anti-aliasing crispness
  - outer: `drop-shadow(0 2px 18px rgba(0,0,0,0.45))` — atmospheric lift
- Both fade to 0 as `--nav-progress` resolves. Result: the mark feels carved out of the footage instead of pasted on top.

### 3. Text legibility over video — the actual problem
This is what the current build is missing. White text at 95% opacity over a 6000K daylight aerial shot loses against highlights.

Three layered fixes, all subtle:

- **Per-character text-shadow** on `.nav-ink` while `--nav-progress < 0.5`:
  `text-shadow: 0 1px 12px rgba(0,0,0,0.55), 0 0 1px rgba(0,0,0,0.4)`. Fades out as you scroll. This is the single biggest legibility gain — invisible as an effect, decisive as a result.
- **Hero gradient scrim** intensifies slightly: from `from-black/25` to `from-black/35`, height grows from 96px to 128px, still pure gradient (no plate, no blur).
- **Optical white**: shift the over-hero color from pure `rgb(255 255 255 / 0.95)` to `rgb(250 248 244 / 0.98)` — a warmer cream-white that visually pops more against cool sky tones without feeling "designed."

### 4. The "Menu" hairlines — make them readable
- Currently 1px hairlines at 22px wide. Over video they vanish.
- Promote to **1.5px** (or 2px on hi-DPI via `transform: scaleY(1.5)` trick), widen to 24px, same hover shift.
- Add a 1px soft black halo to match the text-shadow vocabulary.

### 5. Anchor the nav at rest — invisible at speed
- Add a near-imperceptible **horizontal hairline at the bottom of the header**, only visible over hero media (opacity = `calc(1 - var(--nav-progress)) * 0.18`).
- 1px, `rgba(255,255,255,0.18)`. It catches the eye as a frame edge without ever reading as a divider.
- Removes itself entirely once you scroll past the hero (the normal `nav-surface-quiet` border line takes over).

## What I'm NOT doing

- No background plate on the header over the hero (would kill the cinematic feel)
- No backdrop-blur over the hero (the page is supposed to feel like one continuous frame)
- No size bumps on "Menu" — it's already proportionally correct, just needs the legibility layer
- No icon next to "Menu" — the two hairlines are the icon

## Files touched

- `src/components/fly4media/Header.tsx` — logo size bump, wordmark casing (TBD), hairline weight, hero hairline anchor
- `src/index.css` — add `.nav-ink-shadow` utility (text-shadow that fades with `--nav-progress`), tune `nav-mark-shadow` to two-layer, intensify scrim values, optional `.t-nav-strong` if we bump weight

## What I want you to pick

1. **Wordmark casing** — keep `Fly4MEdia` (current, friendlier) or shift to `FLY4MEDIA` with wide tracking (more fantasy.co institutional)?
2. **Hero hairline anchor** (item 5) — yes (gives the header a discreet frame edge over media) or no (keeps it completely floating)?

I'll prototype with the safer answers (keep current casing, add the hairline) if you don't want to think about it.
