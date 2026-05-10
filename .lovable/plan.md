# Home page — precision formatting pass

The hero already breathes correctly (viewport-locked, fluid type, optical pacing). The issue across the rest of the page is **horizontal restraint** and **measure control on large displays**. On 1440 → 1920+, content currently stretches edge-to-edge inside `.container-x`, so headlines run wider than they should, services rows feel laterally stretched, and the page reads as "wider" rather than "more spacious." That's the single biggest gap between the hero and everything below it.

This pass is surgical: 7 files, no redesign, no new sections, no new dependencies. Same DOM, same tokens — refined containment and rhythm.

---

## The five changes that do 80% of the work

### 1. Add a true global content ceiling
The hero is allowed to be edge-to-edge because it's a cinematic plate. Every other section should sit inside a controlled editorial canvas. I'll add a max-width to `.container-x` so 1920px feels luxurious, not stretched.

- `.container-x` → keep current padding (`px-6 md:px-10 lg:px-16`), add `max-w-[1680px] mx-auto`.
- Result: at 1920, sections gain ~120px of architectural side margin automatically. At 1440 and below, no visible change.

### 2. Headline measure control — kill the run-on display lines
- **`BrandStatement`** is the worst offender: `t-headline-1` runs the full 9-column track. At 1600+ it wraps as a long stretched paragraph. Cap it with `max-w-[20ch] lg:max-w-[22ch]` and apply `wrap-editorial` with intentional `<br />` after "what it's worth." so the statement composes in two deliberate lines.
- **`Services` headline** ("Tools for shifting / perception.") already uses `wrap-editorial` — leave alone.
- **`FeaturedWork` headline** ("Proof, / not portfolio.") — leave alone, already restrained.
- **`CTA` headline** — tighten `max-w-5xl` → `max-w-4xl` so the line break feels designed rather than incidental.

### 3. Section rhythm — normalize to tokens, vary by intent
Current rhythm is mostly correct. Two normalizations:
- `CaseStudyTeaser` uses bespoke `py-24 md:py-40`. Switch to `py-section-lg` (already a fluid token, matches the cinematic moment).
- `BrandStatement` stays `py-section-lg` (philosophical pause between Featured Work and Services — correct).
- `FeaturedWork`, `Services` stay `py-section`.
- `Divider` stays cinematic full-bleed (60vh / 85vh).
- `CTA` stays `py-section-lg`.

Result: the rhythm reads as `cinematic → editorial → pause → editorial → cinematic → editorial → pause`. Same intentional pacing as a film cut.

### 4. Tablet (768–1023) — gate the 12-col splits at `lg`, not `md`
Current grids flip to 12-col at `md:` (768px). On tablet portrait that means the 3/6/3 eyebrow/heading/link split pinches the heading to ~45% of available width — feels cramped. Fix by promoting the 12-col split to `lg:` (1024px) for all three section heads (`FeaturedWork`, `Services`), and let tablet portrait stack the eyebrow → heading → link with stronger vertical rhythm.

- `FeaturedWork` heading grid: `md:grid-cols-12` → `lg:grid-cols-12` (and `md:col-span-*` → `lg:col-span-*`).
- `Services` heading grid: same change.
- `Services` row grid stays `md:grid-cols-12` (the row layout works at 768).
- Tablet portrait result: heading gets full width with confident vertical pacing; tablet landscape (1024+) keeps the editorial 3-column split.

### 5. Cardwork polish — the small ones that compound
- **`FeaturedWork` cards**: `media-meta mt-5` → `mt-6 lg:mt-8`. The current 5-unit gap is too tight under a cinematic 4:5 plate.
- **`FeaturedWork` cards**: confirm `gap-y-20 md:gap-y-32` stays — that vertical gap between staggered cards is correct.
- **`CaseStudyTeaser` metadata**: `mt-10` → `mt-8 lg:mt-12` (tighter on tablet, more breath on desktop).
- **`CaseStudyTeaser` headline**: add `text-balance max-w-3xl` so a long project title doesn't run wide on 1920.
- **`Services` rows**: `py-7 md:py-8` → `py-7 md:py-8 lg:py-10` so each row breathes more on desktop.
- **`CTA` button block**: `mt-14` → `mt-12 lg:mt-16`.

---

## Files touched (7)

1. `src/index.css` — add `max-w-[1680px] mx-auto` to `.container-x`. (1 line edit.)
2. `src/components/fly4media/BrandStatement.tsx` — measure-cap the headline, add intentional `<br />`, keep `py-section-lg`.
3. `src/components/fly4media/FeaturedWork.tsx` — promote heading grid to `lg:grid-cols-12`, bump card meta gap.
4. `src/components/fly4media/Services.tsx` — promote heading grid to `lg:grid-cols-12`, bump row padding at `lg`.
5. `src/components/fly4media/CaseStudyTeaser.tsx` — switch to `py-section-lg`, tighten meta gap, balance headline.
6. `src/components/fly4media/CTA.tsx` — `max-w-5xl` → `max-w-4xl`, tune `mt-14` → `mt-12 lg:mt-16`.
7. (No change needed to `Divider`, `Hero`, `Footer`, `Header` for this pass — hero is the benchmark, header/footer are out of scope.)

---

## Verification before I claim it's done

After edits I will:
1. View the home page at 1920×1080 — confirm side margins, headline wrap on BrandStatement, card stagger.
2. View at 1280×720 (laptop) — confirm nothing collapsed.
3. View at 820×1180 (tablet portrait) — confirm heading grids stack instead of pinching.
4. View at 1024×768 (tablet landscape) — confirm 12-col splits engage cleanly.

---

## What I'm explicitly *not* touching

- Hero (benchmark, untouched).
- Header, Footer, ContactModal, floating button, Intro veil, Cursor, scroll-velocity system.
- Mobile (<768) — out of scope for this pass per the brief.
- Other pages (`/work`, `/work/:slug`, `/services`, `/about`) — separate passes when you say go.
- Any visual style: colors, type roles, fonts, animation, the design system itself. This is layout discipline only.
