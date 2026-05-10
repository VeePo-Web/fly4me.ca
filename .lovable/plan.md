# /services — precision formatting pass

The Services page is structured well (intro → 8 alternating ServiceFeature blocks → cinematic strip → CTA). The same two issues from home and `/work` apply: large-desktop measure isn't capped (already partly handled by the global `1680px` ceiling on `.container-x`), and the alternating two-column layout engages at `md:` (768), so tablet portrait shows a cramped 50/50 split. This pass normalizes both, plus tightens the rhythm tokens.

Same surgical contract: 2 files, no redesign, no new sections.

---

## Changes

### 1. Intro section — `src/pages/Services.tsx`
- `pt-36 md:pt-48` → `pt-36 md:pt-48 lg:pt-56` (matches the `/work` intro rhythm).
- Eyebrow `mb-6` → `mb-6 lg:mb-8`.
- Headline `max-w-5xl` → `max-w-4xl` so "Not deliverables. / Tools for shifting perception." holds a controlled measure on 1440+ instead of running wide.
- Lede `mt-10 max-w-xl` → `mt-10 lg:mt-12 max-w-xl` (a touch more breath on desktop between display and lede).

### 2. Service feature blocks — `src/components/fly4media/ServiceFeature.tsx`
This is the structural fix. Currently every alternating row activates at `md:` and uses bespoke `py-16 md:py-28` padding. Promote the two-column composition to `lg:` and use the section tokens.

- Outer article: `py-16 md:py-28` → `py-section-sm lg:py-section` (token consistency, slightly more breath on desktop).
- Inner grid: `md:grid-cols-12 gap-10 md:gap-16` → `lg:grid-cols-12 gap-12 lg:gap-20` (wider gutter between image and copy at desktop sizes — feels more editorial, less template).
- Reverse swap: `md:[&>*:first-child]:order-last` → `lg:[&>*:first-child]:order-last` (matches the breakpoint where columns engage).
- Image cell: `md:col-span-6` → `lg:col-span-6`.
- Image frame: `aspect-[4/5] md:aspect-[5/6]` → `aspect-[4/5] lg:aspect-[5/6]`. Also swap the wrapper from raw `overflow-hidden bg-secondary` to `media-frame`, and drop `w-full h-full object-cover` on the `<img>` in favor of `media-img` so hover behavior matches the rest of the site (FeaturedWork, Work index).
- Copy cell: `md:col-span-6` → `lg:col-span-6`.
- Eyebrow `mb-5` → `mb-4 lg:mb-5` (tighter optical link to the number).
- Title `t-headline-1 mb-6` → `t-headline-1 mb-6 max-w-[16ch]` so an 8-row sequence of titles holds a consistent silhouette on desktop instead of some titles running 1-line and others 2-line wildly.
- Lede `t-lede text-muted-foreground max-w-md` → `t-lede text-muted-foreground max-w-md lg:max-w-lg` for a slightly more comfortable measure on 1440+.

Result on tablet portrait (768–1023): each row stacks to a single column — large 4:5 image plate, then number / large title / lede stacked beneath with full-width measure. No more pinched 50/50. At `lg` and up the alternating editorial layout engages with a wider central gutter.

### 3. Cinematic strip — `src/pages/Services.tsx`
- Section padding `py-20 md:py-32` → `py-section` (token consistency; the strip stays intentionally full-bleed — that's part of its cinematic role).
- No other changes — full-bleed is correct.

### 4. CTA
Untouched (already refined in the home pass).

---

## Files touched (2)

1. `src/pages/Services.tsx` — intro measure, lede rhythm, strip padding.
2. `src/components/fly4media/ServiceFeature.tsx` — `lg:` gating, gutter, media-frame adoption, title measure.

No changes to `index.css`, `PageShell`, `CTA`, or any data file.

---

## Verification before claiming done

- 1920×1080 — confirm intro measure, alternating gutter, image silhouettes consistent across all 8 rows.
- 1280×720 — confirm 6/6 split still composes with the wider gutter.
- 1024×768 (tablet landscape) — confirm `lg:` columns engage cleanly at exactly 1024.
- 820×1180 (tablet portrait) — confirm rows stack to single column with full-width image and copy.
