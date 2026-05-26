## The bug

When a `<br/>` is collapsed (hidden or made inline) by one of the wrap helpers, JSX has already stripped the surrounding indentation whitespace, so the two text runs render with no separator.

Affected helpers in `src/index.css`:

```css
.wrap-editorial > br { display: inline; }                 /* always inline → strips space */
.wrap-editorial-mobile-off > br { display: none; }        /* mobile collapse → strips space */
.wrap-art > br { display: inline; }                        /* mobile default */
```

Screenshot confirms the symptom on `BrandStatement` mobile:
- "How something is seen[BR]decides what it's worth." → "seendecides"
- "The difference between[BR]being shown and being remembered." → "betweenbeing"

The same risk exists on every `<br/>` written across multiple JSX lines inside any of these three helpers.

## Fix (single CSS change, no JSX edits)

Update the three rules so a collapsed `<br>` still injects a real space character via a generated `::before`. This fixes every site at once with zero copy/layout changes.

`src/index.css` around lines 338–346:

```css
/* Editorial wrapping helpers — art-directed line breaks on desktop,
   balanced wrap on mobile. When a <br> is collapsed to inline, JSX has
   already trimmed surrounding whitespace, so we inject a real space via
   ::before to prevent adjacent words from concatenating. */
.wrap-editorial > br { display: inline; }
.wrap-editorial > br::before { content: "\00a0"; }

@media (max-width: 640px) {
  .wrap-editorial-mobile-off > br { display: inline; }
  .wrap-editorial-mobile-off > br::before { content: "\00a0"; }
}

.wrap-art > br { display: inline; }
.wrap-art > br::before { content: "\00a0"; }
@media (min-width: 768px) {
  .wrap-art > br { display: block; }
  .wrap-art > br::before { content: none; }
}
```

Notes:
- `\00a0` (non-breaking space) is chosen so the word pair stays together if the line wraps — matches the editorial intent better than a regular space.
- Switching `wrap-editorial-mobile-off` from `display: none` to `display: inline` is necessary so the `::before` actually renders. The `<br>` itself produces no visual break when `display: inline`, so the mobile layout is unchanged except for the inserted space.
- Desktop `.wrap-art > br { display: block }` reverts to a real line break and suppresses the inserted space with `content: none`.

## Audit pass (no changes — just verification after the fix)

After the CSS edit, sweep these files for `<br />` inside the three helpers to confirm each pair now reads with a space on mobile and a break on desktop. No JSX edits needed.

- `src/components/fly4media/BrandStatement.tsx` (the screenshot case)
- `src/components/fly4media/Hero.tsx`
- `src/components/fly4media/FeaturedWork.tsx`
- `src/components/fly4media/CTA.tsx`
- `src/components/fly4media/CaseStudyPerspective.tsx`
- `src/components/fly4media/CaseStudyTakeaway.tsx`
- `src/components/fly4media/CaseStudyNarrative.tsx`
- `src/components/fly4media/PricingPackages.tsx`
- `src/components/fly4media/PricingGuarantee.tsx`
- `src/components/fly4media/PricingFAQ.tsx`
- `src/components/fly4media/ProcessList.tsx`
- `src/components/fly4media/Services.tsx`
- `src/pages/Work.tsx`, `Services.tsx`, `Pricing.tsx`, `CaseStudy.tsx`, `About.tsx`, `AreaPage.tsx`, `AreasWeServe.tsx`

If any spot uses a literal `\n` newline + `<br/>` pattern not inside one of the helpers (plain `<br/>`), it's already a hard line break and isn't affected.

## QA checklist (mobile, 390px)

- `/` → BrandStatement: "How something is seen decides what it's worth." reads as one line with a space.
- `/` → BrandStatement: "The difference between being shown and being remembered." reads with a space.
- `/` Hero headline still wraps the same (uses real `<br/>`, no helper collapse).
- `/work` title "Perspective, / in motion." still breaks because `t-display-2` + `wrap-editorial-mobile-off` — verify the comma still ends the first line and "in motion." starts the second on desktop, and reads as "Perspective, in motion." on mobile.
- All case-study perspective/takeaway lines render with proper spacing.

## What we are NOT doing

- No JSX/copy edits.
- No new components.
- No layout, typography, or spacing changes beyond the inserted nbsp.
- Not touching `Hero.tsx`'s headline (uses `wrap-editorial` with real `<br/>` between words on separate lines — the nbsp keeps them readable if a future device ever collapses them).
