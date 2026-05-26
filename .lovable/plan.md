## Goal

On the `/work` route, mobile only, anchor the page header ("Perspective, in motion." + count line) to the bottom of the first viewport — same gravity as the Hero. Right now the H1 sits at the top of the page and gets covered/passed by the first video card as the user scrolls.

## Scope

- File: `src/pages/Work.tsx` only.
- Mobile only (< `md`). Desktop layout untouched.
- Visual/layout only. No copy changes, no new components, no data changes.

## Design intent

Mirror the Hero's mobile composition:

- Header occupies a full `100svh` band on mobile, content anchored to the bottom (`justify-end`), generous safe-area-aware bottom padding.
- Title (`Perspective, / in motion.`) sits low; the `5 projects · 2024–2026` meta line sits directly above or below it with the same rhythm as the Hero CTAs.
- As the user scrolls, cards rise up from below and pass the title — same "video plays behind anchored type" feel as the hero, just static (no video here).
- Optional tiny upward parallax on the title (-8px over 0–80px scroll) to match the hero lede, mobile only, respects `prefers-reduced-motion`. Keep this lightweight — single rAF, ref-based style mutation, no re-renders.

## Layout change (mobile)

Current header section:

```text
<section pt-36 pb-section-sm>
  H1
  meta
</section>
<section> cards </section>
```

New header section (mobile):

```text
<section h-[100svh] flex flex-col justify-end
         pb-[max(28px,calc(env(safe-area-inset-bottom)+20px))]>
  meta (eyebrow position)
  H1
</section>
<section> cards </section>  ← unchanged, scrolls up from below
```

Desktop keeps the current `pt-36 md:pt-48 lg:pt-56 pb-section-sm` block — no full-viewport hijack on wider screens.

## Technical notes

- Use Tailwind responsive utilities to swap height + flex direction at `md`:
  - Container: `min-h-[100svh] md:min-h-0 flex flex-col justify-end md:block pt-0 md:pt-48 lg:pt-56 pb-[max(28px,calc(env(safe-area-inset-bottom)+20px))] md:pb-section-sm`
- Keep existing `animate-fade-up` delays; they already feel right.
- Parallax effect (optional, mobile only): `useRef` on the header `<div>`, `useEffect` gated by `matchMedia("(hover: none)")` and `!prefers-reduced-motion`, scroll listener `{ passive: true }`, single rAF, write `translate3d(0, -8px*p, 0)` where `p = clamp(scrollY/80, 0, 1)`. Same pattern as `Hero.tsx` lines 59–83.
- Z-index: no overlap concern — cards live in a sibling section that scrolls normally over the document flow; the header doesn't need `position: sticky`. The "stays on screen like the hero" feel comes from the first paint being anchored bottom + the parallax nudge as scroll begins. The cards then take over the viewport naturally.

## What we are NOT doing

- Not making the title `position: sticky` over the cards (would conflict with card readability and create a desktop regression).
- Not changing any card layout, aspect ratios, or copy.
- Not touching `Hero.tsx`, `FeaturedWork.tsx`, or any case-study pages.
- Not adding a video to the work page header.
