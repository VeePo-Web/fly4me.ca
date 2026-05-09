## Goal

Eliminate the last raw Tailwind typography classes (`text-sm`, `text-lg`, `text-3xl`, `text-[15px]`, `tracking-tight`, `tracking-wide`, `leading-relaxed`, `font-medium`) still scattered across components and modals, and route every text node through a single `.t-*` role from the typography system.

## Audit findings

After grep across `src/pages` and `src/components/fly4media` (excluding shadcn `ui/`), the remaining offenders are:

- `Header.tsx` — wordmark (`text-[15px] md:text-base font-medium tracking-tight`); mobile nav links (`text-3xl font-medium tracking-tight`, ×2)
- `Footer.tsx` — wordmark (`text-base font-medium tracking-tight`)
- `Hero.tsx:53` — right column line (`text-right leading-relaxed`)
- `FeaturedWork.tsx:32` — "View all work" link (`text-sm font-medium`)
- `PageShell.tsx:35` — floating CTA button (`text-xs md:text-sm`)
- `CaseStudyMeta.tsx:20` — meta value (`t-body font-medium tracking-tight` — duplicates already on `.t-body`)
- `ContactModal.tsx` — meta spans `tracking-wide` (×2), success/error `text-lg leading-relaxed` + `text-sm leading-relaxed`, textarea + input (`text-base md:text-lg [leading-relaxed]`)

Pages (`Index`, `Work`, `About`, `Services`, `CaseStudy`, `NotFound`) came back clean.

## Refactor mapping

| Location | Current | New role |
|---|---|---|
| Header wordmark | `text-[15px] md:text-base font-medium tracking-tight` | `t-nav` (or new `.t-wordmark` if we want a touch heavier — see Q1) |
| Header mobile nav links | `text-3xl font-medium tracking-tight` | `t-headline-2` |
| Footer wordmark | `text-base font-medium tracking-tight` | same as Header wordmark |
| Hero right line | `text-right leading-relaxed` | `t-body text-right` (drop `leading-relaxed`; `.t-body` already sets `--lh-prose`) |
| FeaturedWork link | `text-sm font-medium` | `t-button` |
| PageShell floating CTA | `text-xs md:text-sm` | drop — `.btn-primary` defines its own type; rely on it |
| CaseStudyMeta value | `t-body font-medium tracking-tight` | `t-body` (strip dupes) |
| ContactModal meta spans | `tracking-wide` | `t-meta` |
| ContactModal success `<p>` | `text-lg leading-relaxed` | `t-lede` |
| ContactModal helper `<p>` | `text-sm text-muted-foreground leading-relaxed` | `t-meta text-muted-foreground` |
| ContactModal textarea | `text-base md:text-lg leading-relaxed` | add `t-lede` (keep layout/border classes) |
| ContactModal input | `text-base md:text-lg` | add `t-lede` |

No new `.t-*` classes are required unless Q1 says otherwise — the existing scale covers every case.

## Out of scope

- No copy edits, no layout shifts, no color/spacing tokens beyond removing now-redundant `tracking-*`/`leading-*`/`font-*` props.
- No shadcn `ui/` files (those follow their own component contract).
- No changes to `index.css` tokens.

## Verification

- Re-run the same `rg` sweep — expect zero matches in `src/pages` + `src/components/fly4media`.
- Visual sanity check on `/`, `/work`, `/work/:slug`, `/services`, `/about`, and the contact modal at mobile (390px) + desktop widths.
