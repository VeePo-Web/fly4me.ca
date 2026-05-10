# /work — precision formatting pass

The Work page has the right bones (editorial intro → asymmetric project grid → CTA). The page-level issues match the home page: at 1440 → 1920 the headline runs too wide, and at 768 → 1023 (tablet portrait) the 12-column asymmetric grid puts feature cards side-by-side at ~50% width — they read cramped, not editorial. The `.container-x` ceiling I just added will already handle the lateral stretch on large displays; this pass tightens the rest.

Same surgical contract as home: 1 file, no redesign, no new sections, same DOM, no design-system changes.

---

## Changes

### 1. Intro section — title rhythm and measure
- `pt-36 md:pt-48` → `pt-36 md:pt-48 lg:pt-56` so the title has more breath above on large desktop (it's the page's anchor moment).
- Headline `max-w-5xl` → `max-w-4xl`. With the existing `wrap-editorial` the line break ("Perspective, / in motion.") then composes against a controlled measure on every screen above 1280.
- Eyebrow `mb-6` → `mb-6 lg:mb-8` for a touch more space before the display headline at desktop.
- Keep `pb-section-sm` as the gap to the grid (correct token).

### 2. Project grid — gate asymmetry to `lg:`, breathe more between rows
The asymmetric `LAYOUTS` array currently engages at `md:` (768). On tablet portrait the 7/5 stagger compresses the cards. Promote to `lg:`:

- `LAYOUTS` array updated to `lg:col-span-*` / `lg:col-start-*` / `lg:mt-32`.
- Outer grid `md:grid-cols-12` → `lg:grid-cols-12`.
- Vertical gap `gap-y-24 md:gap-y-40` → `gap-y-24 lg:gap-y-40` (matches the breakpoint that activates the stagger).
- Section bottom `pb-32 md:pb-48` → `pb-section` (token consistency with the rest of the site; the value lands close to current).

Result: tablet portrait becomes a single elegant column of full-width 4:5 plates with generous vertical rhythm. Tablet landscape and up engage the cinematic asymmetric editorial gallery.

### 3. Card polish — match the FeaturedWork hover language
The Work cards currently use `img-zoom` while FeaturedWork uses `media-frame` + `media-img`. Both work, but the visual language should match. Switch to `media-frame` + `media-img` so hover behavior, framing, and crop are identical between the home Featured Work block and the full Work index. Add `link-underline` to the project title, matching FeaturedWork.

- `<div className="overflow-hidden bg-secondary aspect-[4/5]">` → `<div className="media-frame aspect-[4/5]">`
- `<img ... className="img-zoom w-full h-full object-cover" />` → `<img ... className="media-img" />`
- `<h2 className="t-headline-3">{title}</h2>` → `<h2 className="t-headline-3"><span className="link-underline">{title}</span></h2>`
- Add `<span className="link-arrow">` wrapper around the `↗` so it inherits the same micro-motion as FeaturedWork (parent already has `group`).
- Add `data-cursor="hover"` for cursor parity with FeaturedWork cards.

### 4. Eyebrow tightening
Card eyebrow `mb-2` → `mb-1.5` to match FeaturedWork (the only spacing inconsistency between the two card components).

---

## Files touched (1)

1. `src/pages/Work.tsx` — all of the above.

No changes to `PageShell`, `CTA`, `Header`, `Footer`, `data/projects`, or `index.css` (the home pass already added the `1680px` content ceiling on `.container-x`, which Work inherits automatically).

---

## Verification before claiming done

- 1920×1080 — confirm side margins, headline measure, asymmetric stagger.
- 1280×720 — confirm asymmetric grid still composes.
- 1024×768 (tablet landscape) — confirm `lg:` stagger engages cleanly at exactly 1024.
- 820×1180 (tablet portrait) — confirm grid stacks to single column with strong vertical rhythm.

---

## What I'm explicitly *not* touching

- Project data, image crops, slugs, copy.
- Card aspect ratio (4:5 stays — it's the right cinematic vertical for this brand).
- The shared CTA component (already refined in the home pass).
- Case study detail pages (`/work/:slug`) — separate pass when you say go.
