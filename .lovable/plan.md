# /about — precision formatting pass

Same surgical contract as `/work` and `/services`. The About hero is already at the brand benchmark, so the work is below the fold: the Philosophy letter, the Process list, and the Capabilities block all gate their two-column compositions at `md:` (768) — at tablet portrait that produces pinched 22%/70% and 33%/67% splits that don't respect the editorial aesthetic. Promote everything to `lg:`, normalize tokens, cap measures.

4 files. No redesign, no new sections, no copy changes, no design-token changes.

---

## Changes

### 1. About hero — `src/pages/About.tsx`
Tiny touch only — the hero is the reference standard.
- Headline `max-w-5xl` → `max-w-4xl` so "We believe perspective / changes everything." holds the same controlled measure as `/work` and `/services` heroes on 1440+.

### 2. Philosophy letter — `src/pages/About.tsx` (`<Philosophy />`)
- Outer grid `md:grid-cols-12 gap-10` → `lg:grid-cols-12 gap-10 lg:gap-16` (gate to laptop, widen the gutter on desktop).
- Portrait column `md:col-span-3` → `lg:col-span-3`.
- Copy column `md:col-span-9 max-w-3xl` → `lg:col-span-9 max-w-3xl`.
- Portrait wrapper `max-w-[280px]` → `max-w-[280px] lg:max-w-[320px]` (a hair more presence at desktop without dominating).
- Portrait image: swap raw `aspect-[3/4] bg-secondary` markup to `media-frame` + `media-img` for hover language consistency with the rest of the site.
- Lead paragraph `t-headline-2` — add `max-w-[24ch]` at tablet stacked so the manifesto sentence doesn't run full width when it stacks above the lede paragraphs. (Removed at `lg:` where the column already constrains it.)

Result on tablet portrait (768–1023): portrait sits at top at full ~280px width with caption, then the manifesto headline + two lede paragraphs flow underneath in a controlled measure column. No more 22% portrait.

### 3. Process list — `src/components/fly4media/ProcessList.tsx`
- Header grid `md:grid-cols-12 ... mb-16 md:mb-24` → `lg:grid-cols-12 ... mb-16 lg:mb-24`.
- Header eyebrow `md:col-span-3` → `lg:col-span-3`. Headline `md:col-span-9` → `lg:col-span-9`.
- Row grid: still 12-col base, but promote the inner split: `col-span-2 md:col-span-1` → `col-span-2 lg:col-span-1` (number), `col-span-10 md:col-span-4` → `col-span-10 lg:col-span-4` (title), `col-span-12 md:col-span-7` → `col-span-12 lg:col-span-7` (desc).
- Row padding `py-8 md:py-10` → `py-8 lg:py-10`.

Result on tablet portrait: each step is number+title on row 1, full-width body copy on row 2 — generous and readable. No more `t-headline-3` pinched into a 230px column.

### 4. Capabilities — `src/components/fly4media/Capabilities.tsx`
- Outer grid `md:grid-cols-12 gap-10` → `lg:grid-cols-12 gap-10 lg:gap-16`.
- Heading column `md:col-span-4` → `lg:col-span-4`.
- List column `md:col-span-8 md:pl-10` → `lg:col-span-8 lg:pl-10`.
- Eyebrow `mb-6` → `mb-6 lg:mb-8`.
- Heading: add `max-w-md` so on `lg` and up the headline holds a manifesto measure instead of stretching to fit the 4-col cell.

Result on tablet portrait: full-width heading with editorial measure, then the 6-item list in a clean 2-column sub-grid below at full width — much more breathing room than the current 33/67 with 2-col list squeezed into the right side.

---

## Files touched (4)

1. `src/pages/About.tsx` — hero measure, Philosophy gating + portrait polish.
2. `src/components/fly4media/ProcessList.tsx` — `lg:` gating throughout.
3. `src/components/fly4media/Capabilities.tsx` — `lg:` gating, gutter, heading measure.
4. (CTA untouched — already refined.)

No changes to `index.css`, `PageShell`, copy, data, or design tokens.

---

## Verification before claiming done

- 1920×1080 — confirm hero measure, Philosophy gutter, Capabilities heading measure.
- 1280×720 — confirm 12-col splits compose with new gutters.
- 1024×768 (tablet landscape) — confirm `lg:` columns engage cleanly at exactly 1024.
- 820×1180 (tablet portrait) — confirm Philosophy stacks (portrait first, then letter), Process rows have full-width body, Capabilities heading + list stack with full breathing room.
