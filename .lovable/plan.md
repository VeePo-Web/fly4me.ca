# Menu Overlay — single-pager, no scroll, all viewports

Scope: `src/components/fly4media/MenuOverlay.tsx` only. No routing, no animation vocabulary changes.

## What changes

1. **Strip the filler copy.** Remove from the right rail:
   - The "Studio" block ("Fly4MEdia — a cinematic perspective studio." + the `N 51.04° W 114.07° — Alberta, Canada` coordinates line).
   - The bottom `MMXXVI — Made carefully in Alberta` line.
   Keep only the **Contact** block (email + phone) under a single `Contact` eyebrow. That is the only thing the menu actually needs to carry.

2. **Lock the overlay to viewport height, no scroll.**
   - Root container: `h-[100svh]` (small-viewport height — accounts for mobile browser chrome) instead of relying on `h-full`.
   - Add `overflow-hidden` to the content wrapper so nothing can ever spill.
   - Remove the `pt-16 lg:pt-16` top padding on the body grid; the top bar already reserves `h-16 md:h-20`. Reduce `pb-12 lg:pb-16` to `pb-8 lg:pb-10`.

3. **Right-size the link list so 5 links always fit.**
   Current `t-display-2` (~clamp 56–96px) + `gap-2 lg:gap-4` overflows on short laptops (≤720px tall) and landscape phones. Switch to fluid sizing driven by viewport height:
   - Link type scale: `text-[clamp(2.25rem,9vh,5.5rem)] leading-[0.95] tracking-[-0.03em]` (replaces `t-display-2` on the link span only — keeps the brand class system clean by being a local override, since this is a height-constrained surface).
   - Vertical rhythm: `gap-1 sm:gap-2 lg:gap-3`.
   - Result: 5 links + their leading always stay under ~55svh, leaving room for the right rail / contact block.

4. **Layout balance for the trimmed rail.**
   - Desktop (`lg:`): keep 12-col grid but shift to `lg:col-span-9` links / `lg:col-span-3` rail (rail is lighter now).
   - Mobile/tablet: stack as today, but reduce gap from `gap-12` to `gap-8`, and align the Contact block to the bottom with `mt-auto` so it never pushes the links off-screen.

5. **Safe-area + iOS.** Add `pb-[max(2rem,env(safe-area-inset-bottom))]` to the body grid so the contact block clears the home indicator without adding scroll.

## Files

- `src/components/fly4media/MenuOverlay.tsx` — copy strip + layout/height changes only. No new imports, no new components, no CSS file changes.

## Verification (post-build)

- 375×667 (iPhone SE), 390×844, 414×896, 768×1024, 820×1180, 1024×768 landscape, 1280×720, 1536×864, 1920×1080: open menu → no scrollbar appears, all 5 links + Contact visible, nothing clipped.
- Animation cascade (per-word blur-to-sharp, 90ms stagger) preserved.
- Active-route marker still renders.

## Explicitly NOT changing

- Veil / grain / vignette layers and timings.
- Header trigger, Esc handling, body-scroll lock.
- Typography tokens elsewhere in the app.
