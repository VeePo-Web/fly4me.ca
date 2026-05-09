## Goal

The token system from the previous pass is solid. This pass is the *optical refinement layer* — the difference between "good system" and "obsessively crafted." Three buckets:

1. **Optical tuning** of the existing `.t-*` scale (sizes, line-heights, tracking, OpenType features).
2. **Editorial wrapping & rhythm primitives** (measure caps, hanging punctuation, art-directed line-break helper, intentional contrast utilities).
3. **Sweep** of the last components still using raw `text-7xl tracking-[-0.04em]` so the system is the only source of typographic truth.

No new font family. Inter stays — the goal is to make Inter feel *like* SF Pro Display through optical features and spacing, not a swap.

---

## 1. Optical scale refinement (`src/index.css` `:root`)

The current scale jumps slightly too fast at the top and is a touch tight in the middle. Recalibrate to a gentler musical curve, give `display-1` more cinematic top-end, and add two missing roles: `--fs-display-0` (single-page hero anchor) and `--fs-quote` (editorial pull-quote between case-study beats).

```text
--fs-display-0:  clamp(56px, 11vw, 144px)   // intro, About hero verbatim slogan
--fs-display-1:  clamp(48px,  9.4vw, 112px) // hero
--fs-display-2:  clamp(42px,  7.4vw,  92px)
--fs-headline-1: clamp(36px,  5.8vw,  84px) // was 96 — too close to display-2
--fs-headline-2: clamp(28px,  3.4vw,  52px)
--fs-headline-3: clamp(22px,  1.9vw,  30px)
--fs-quote:      clamp(22px,  2.4vw,  36px) // perspective-shift beat
--fs-lede:       clamp(17px,  1.3vw,  21px) // was capped at 19 — too small at desktop
--fs-body:       16px
--fs-meta:       13px
--fs-eyebrow:    11px
--fs-micro:      10px
```

### Line-heights — looser at small sizes, tighter at huge sizes

```text
--lh-cinema:  0.94   // display-0 only — true title-card density
--lh-tight:   0.98
--lh-snug:    1.04
--lh-normal:  1.18   // was 1.15 — slightly more air for headline-2
--lh-prose:   1.62   // was 1.6 — more comfortable on Inter
--lh-eyebrow: 1.25
--lh-quote:   1.28
```

### Tracking — restraint pass

Inter renders heavy at large sizes; tighten display tracking a hair, loosen body slightly to counter Inter's tight default rhythm.

```text
--track-cinema:    -0.05em   // display-0
--track-display:   -0.042em  // was -0.045
--track-headline:  -0.032em  // was -0.035
--track-tight:     -0.018em
--track-base:      -0.008em  // was -0.011 — Inter body reads better looser
--track-prose:      0
--track-eyebrow:    0.26em   // was 0.28 — slight tighten for elegance
--track-micro:      0.30em
```

## 2. OpenType + rendering refinement (`@layer base`)

Body already enables `cv11/ss01/ss03`. Add per-role features so headlines pick up Inter's display variants and tabular numbers stay isolated to metadata.

- `body`: keep `"cv11", "ss01", "ss03"` + add `"calt", "kern"`.
- `.t-display-*` and `.t-headline-*`: add `font-feature-settings: "ss01", "ss02", "cv11", "case", "kern"; font-variant-numeric: lining-nums proportional-nums;` and `font-optical-sizing: auto`.
- `.t-eyebrow`, `.t-micro`, `.t-meta`: add `font-variant-numeric: tabular-nums`.
- `.t-body`, `.t-lede`: `font-variant-numeric: oldstyle-nums proportional-nums` for editorial feel.
- Add `text-rendering: geometricPrecision` only on display classes (more stable kerning at huge sizes than `optimizeLegibility`).

## 3. Optical alignment & hanging primitives

New tiny utilities that solve real luxury-typography problems:

```css
.optical-hang   { hanging-punctuation: first last; }   /* hangs quotes/periods past margin */
.optical-lift   { transform: translateY(-0.04em); }    /* nudges all-caps eyebrows onto baseline */
.optical-indent { text-indent: -0.05em; }              /* compensates large W/V/A left bearing */
.measure-tight  { max-width: 26ch; }                   /* headline column */
.measure        { max-width: 38ch; }                   /* lede / sub-headline */
.measure-wide   { max-width: 62ch; }                   /* body prose */
.text-edge      { margin-left: -0.04em; }              /* visual flush-left correction */
```

Apply `.optical-lift` automatically inside `.t-eyebrow` / `.t-micro` (built into the class). Apply `.optical-hang` to `.t-body` / `.t-lede`.

## 4. Editorial wrapping system

The existing `.wrap-editorial > br { display: inline }` works but is binary. Add a true art-directed primitive:

```css
.wrap-art br { display: inline; }
@media (min-width: 768px) {
  .wrap-art br { display: block; content: ""; }
}
.no-orphan { display: inline-block; }   /* wrap last 2 words to prevent widows */
```

Convention: components keep `<br />` for art-directed lines on desktop and let mobile wrap naturally with `text-wrap: balance`. The last two words of any `t-headline-*` paragraph can be wrapped in `<span class="no-orphan">…</span>` to kill widows.

## 5. New role classes

Add to the `.t-*` system:

- `.t-display-0` — for the slogan moment in `Intro` veil and `About` hero. Uses `--fs-display-0`, `--lh-cinema`, `--track-cinema`.
- `.t-quote` — for the *Perspective Shift* beat in `CaseStudyStory`. Uses `--fs-quote`, `--lh-quote`, `--track-tight`, font-weight 400 (lighter to read as editorial pull-quote, not a heading).
- `.t-caption` — for image captions (currently inline-styled). 12px, `--lh-eyebrow`, `--track-base`, `text-muted-foreground` baseline, `font-feature-settings: "tnum"`.
- `.t-button` — codify button typography (14px, weight 500, tracking 0.005em, optical centering via `line-height: 1`). Apply inside `.btn-primary` / `.btn-ghost`.
- `.t-link` — inline links inside body prose (current weight + underline-offset 4px + decoration-thickness 1px + decoration-color `currentColor / 0.4`).

## 6. Vertical rhythm — pair tokens

Spacing between *adjacent* type roles is currently ad-hoc. Add token-driven gaps:

```text
--gap-eyebrow-to-headline: clamp(14px, 1.4vw, 22px)
--gap-headline-to-lede:    clamp(18px, 1.8vw, 28px)
--gap-lede-to-body:        clamp(20px, 2vw,   32px)
--gap-section-meta:        clamp(36px, 4vw,   64px)
```

Exposed as `.gap-eyebrow`, `.gap-headline`, `.gap-lede`, `.gap-meta` margin-top utilities. Replace hand-tuned `mb-3 md:mb-5` etc. across editorial components.

## 7. Font loading polish (`index.html`)

Inter only, weights 400 + 500 — already correct. Add:

- `<link rel="preload" as="font" type="font/woff2" crossorigin href="..."/>` for the woff2 of Inter 500 latin subset (the LCP weight on hero).
- Append `&text=…` is overkill; instead add `&display=swap` (already present) and a small inline `font-display: swap; font-feature-settings: "cv11","ss01","ss03","kern","calt"; font-optical-sizing: auto;` `@font-face` override for Inter so the OS fallback (system-ui) inherits the same metrics.
- Add `size-adjust` matching to a fallback stack so FOUT shifts are imperceptible:

```css
@font-face {
  font-family: "InterFallback";
  src: local("Inter Variable"), local("Inter"), local("system-ui");
  size-adjust: 100.4%;
  ascent-override: 90%;
  descent-override: 22%;
  line-gap-override: 0%;
}
body { font-family: "Inter", "InterFallback", system-ui, -apple-system, sans-serif; }
```

This is the trick Apple/Vercel use to make swap invisible.

## 8. Component sweep — make `.t-*` the only source of truth

Replace remaining raw size/tracking combos:

- `src/pages/CaseStudy.tsx` line 43 → `t-eyebrow`; line 46 → `t-headline-3 measure max-w-2xl`.
- `src/pages/NotFound.tsx` lines 15/18/26 → `t-eyebrow`, `t-display-1`, `btn-primary`.
- `src/pages/Index.tsx` line 35 → use `<PageShell>` floating button instead of bespoke.
- `src/components/fly4media/Services.tsx` line 31 → wrap text in `t-nav` and use `link-underline` + `link-arrow` instead of inline `text-sm font-medium`.
- `Intro.tsx` slogan line → `.t-display-0` (currently using inline letter-spacing animation; keep animation, swap base class).
- `About.tsx` hero → `.t-display-0` for the verbatim slogan moment.
- `CaseStudyStory.tsx` Perspective Shift block → `.t-quote`.
- All gallery captions → `.t-caption`.

## 9. Hierarchy contrast pass (visual only — no copy changes)

Where the editorial system currently stacks similar sizes, apply *dramatic contrast* per the brief:

- Section headers: keep `eyebrow` as `t-micro` (10px) when paired with `t-display-2` (huge) → max contrast.
- Featured Work card meta: `t-micro` (10px) + `t-headline-3` (28-32px) — already close, verify.
- Footer: `t-micro` labels + `t-headline-2` brand statement.

This is a verification + small adjustment pass through `Hero`, `BrandStatement`, `Capabilities`, `Footer`, `FeaturedWork`, `CaseStudyHero`, `CaseStudyMeta`.

## 10. Reveal pacing for typography (light)

The reveal system already staggers. Add one motion-tied typography touch:

```css
.t-reveal-track {
  animation: t-track-settle 1100ms var(--ease-out-soft) both;
}
@keyframes t-track-settle {
  from { letter-spacing: 0.04em; opacity: 0; }
  to   { letter-spacing: var(--track-display); opacity: 1; }
}
```

Apply only to the very first display headline on each route (Hero, Work index, About, Services). Subliminal "type composing itself" effect — under 1.1s, no looping.

## 11. Documentation

Update `mem://design/typography.md` with the refined scale, the new `t-display-0` / `t-quote` / `t-caption` / `t-button` classes, optical primitives (`optical-hang`, `optical-lift`, `measure-*`), wrapping rules, and the gap tokens.

## Out of scope

- No font-family swap (Inter stays).
- No copy edits.
- No layout changes beyond replacing raw classes with tokens.
- No new Tailwind config breakpoints.
- No motion library.
- shadcn UI primitives (unused on editorial pages) untouched.
