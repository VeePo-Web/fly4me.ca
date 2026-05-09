## Typography system — editorial cinematic

Today the site uses good editorial typography ad-hoc per component (large `text-7xl` headlines, `tracking-[-0.04em]`, `text-[11px] uppercase tracking-[0.25em]` eyebrows, etc.). The values are right but they're scattered as raw Tailwind utilities. This plan formalizes them into a single named system (tokens → utilities → applied), so every screen breathes from the same source.

No new fonts. Inter stays — it's the right grotesk for this brief and already loaded.

### 1. Type tokens (`src/index.css`)

Add a fluid type scale via `clamp()` as CSS custom properties under `:root`. All headline sizes scale with the viewport between mobile and large desktop — no rigid breakpoints.

```text
--fs-display-1   clamp(48px,  10.5vw, 144px)   // hero on / and case-study heroes
--fs-display-2   clamp(40px,   8vw,   112px)   // page H1s (Work / Services / About)
--fs-headline-1  clamp(32px,   5.6vw,  80px)   // CTA heading
--fs-headline-2  clamp(28px,   4vw,    56px)   // section H2s, brand statement
--fs-headline-3  clamp(22px,   2.4vw,  32px)   // service row titles
--fs-lede        clamp(17px,   1.4vw,  22px)   // hero sub-copy, page lede
--fs-body        16px                          // (md: 17px via utility)
--fs-meta        13px                          // muted body / outcome lines
--fs-eyebrow     11px                          // uppercase eyebrows
--fs-micro       10px                          // case-study meta labels

--lh-tight       0.98     // display-1
--lh-snug        1.05     // display-2 / headline-1
--lh-normal      1.15     // headline-2 / headline-3
--lh-prose       1.6      // body / lede
--lh-eyebrow     1.2

--track-display  -0.045em // tightens at large sizes (optical density)
--track-headline -0.035em
--track-tight    -0.02em
--track-base     -0.011em // body baseline (already on body)
--track-eyebrow   0.28em  // tweak from 0.25em — slightly more air
--track-micro     0.32em  // tightest-text-on-tiniest-size needs the most air
```

### 2. Type utility classes (`src/index.css` `@layer components`)

One class per role. Components apply one class instead of stringing 5 utilities together. Each class encodes size + line-height + tracking + weight as a unit — so the *system* changes when the token changes, not 40 components.

```text
.t-display-1    -> hero anchor (Hero, CaseStudyHero)
.t-display-2    -> page H1 (Work, Services, About)
.t-headline-1   -> CTA section
.t-headline-2   -> in-page H2 (Services strip head, BrandStatement, Capabilities)
.t-headline-3   -> service row titles, project card titles
.t-lede         -> hero/page sub-copy
.t-body         -> default paragraph (rare; body inherits)
.t-meta         -> small muted body (footer, secondary captions)
.t-eyebrow      -> ALL uppercase tracked eyebrows
.t-micro        -> tiny labels (case-study meta, footer copyright)
.t-nav          -> nav links (medium weight, slight tracking, .link-underline ready)
.t-button       -> button label (already inside .btn-primary, exposed for ghost-only)
```

Notes:
- `.t-display-*` and `.t-headline-*` set `text-wrap: balance` by default. `.t-lede` sets `text-wrap: pretty`. This kills awkward orphan wraps without per-component overrides.
- `.t-eyebrow` and `.t-micro` set `font-feature-settings: "tnum"` for tabular consistency on numbered eyebrows (`01 — Real Estate · 2025`).
- All sizes use `font-weight: 500` for headlines, `400` for body — no new weights pulled from Inter.
- Hero classes get `font-feature-settings: "ss01", "ss03", "cv11"` (already on body) plus optical correction: a touch tighter via `--track-display`.

### 3. Vertical rhythm tokens

Add four spacing variables for section pacing — used in component spacing rather than the current ad-hoc `py-24 md:py-40` etc.

```text
--space-section-sm   clamp(64px,  10vw, 128px)   // tight sections
--space-section      clamp(96px,  14vw, 192px)   // standard
--space-section-lg   clamp(128px, 18vw, 256px)   // hero CTA, BrandStatement
```

Expose as Tailwind utilities (`py-section`, `py-section-lg`, etc.) by mapping in the spacing scale via `tailwind.config.ts`.

### 4. Editorial wrapping helpers

Two short utilities so manual `<br />` line breaks remain art-directed without becoming brittle on mobile:

- `.wrap-stack > br { display: inline; }` (default)
- `.wrap-stack-mobile-off > br { display: none; }` on `<sm` — drop forced breaks where they cause awkward 1-word lines on 320px screens, e.g. on the longer service-page H1.
- Combined with `text-balance` on `.t-display-*`, gives art-directed lines on desktop and balanced wraps on mobile.

### 5. Apply across the site

Sweep through components — replace the manual size/tracking/leading combos with the new classes. No structural change, just substitution. Files touched:

- `src/components/fly4media/Hero.tsx` — H1 → `.t-display-1`, lede → `.t-lede`, eyebrow → `.t-eyebrow`.
- `src/components/fly4media/CaseStudyHero.tsx` — H1 → `.t-display-1`, tagline → `.t-lede`.
- `src/components/fly4media/CTA.tsx` — heading → `.t-headline-1`, eyebrow → `.t-eyebrow`.
- `src/components/fly4media/BrandStatement.tsx` — statement → `.t-headline-2`, eyebrow → `.t-eyebrow`.
- `src/components/fly4media/Services.tsx` — H2 → `.t-headline-2`, row title → `.t-headline-3`, row desc → `.t-body`, eyebrows → `.t-eyebrow`, row number → `.t-micro`.
- `src/components/fly4media/Capabilities.tsx` — H2 → `.t-headline-2`, items → `.t-body`, eyebrows.
- `src/components/fly4media/ServiceFeature.tsx` — H3 → `.t-headline-2` (this one is page-level, so headline-2 not 3), desc → `.t-lede`, number → `.t-eyebrow`.
- `src/components/fly4media/CaseStudyStory.tsx` — Perspective Shift beat → `.t-headline-2`, other beats → `.t-lede`, labels → `.t-micro`.
- `src/components/fly4media/CaseStudyMeta.tsx` — labels → `.t-micro`, values → existing tracking.
- `src/components/fly4media/FeaturedWork.tsx`, `NextProject.tsx` — project titles → `.t-headline-3`, meta → `.t-eyebrow`.
- `src/components/fly4media/Footer.tsx` — section labels → `.t-eyebrow`, copyright row → `.t-micro`.
- `src/components/fly4media/Header.tsx` — nav links → `.t-nav`.
- `src/components/fly4media/ContactModal.tsx` — title → `.t-headline-1`, h3 → `.t-headline-2`, eyebrows → `.t-eyebrow`, field labels → `.t-micro`.
- `src/pages/Work.tsx`, `Services.tsx`, `About.tsx` — H1 → `.t-display-2`, eyebrows + ledes mapped.

Where `<br />` currently forces hero wrapping, keep them but rely on `text-balance` + `.wrap-stack-mobile-off` for the longer service-page H1.

### 6. Performance & loading

- Keep Inter only. Trim font weights pulled from Google Fonts to `400; 500` only (currently `300;400;500;600`). Reduces font payload by ~50%.
- Add `font-display: swap` (already implicit with Google CSS); add `<link rel="preload" as="font" type="font/woff2" crossorigin>` for the 500 weight only — the LCP weight on the hero.

### 7. Memory

Save a `mem://design/typography.md` recording the token names, scale rationale, and the rule "always use `.t-*` classes; never raw `text-7xl` etc. for editorial hierarchy." Add a one-liner to Core memory.

### Files

Edit: `src/index.css`, `tailwind.config.ts`, `index.html`,  
`src/components/fly4media/{Hero,CaseStudyHero,CTA,BrandStatement,Services,Capabilities,ServiceFeature,CaseStudyStory,CaseStudyMeta,FeaturedWork,NextProject,Footer,Header,ContactModal}.tsx`,  
`src/pages/{Work,Services,About}.tsx`.

Create: `mem://design/typography.md` + update `mem://index.md`.

### Out of scope

- New typeface (Inter stays).
- Dark mode tokens.
- Animation/motion changes — the existing `.reveal` and `animate-fade-up` keep working untouched.
- Any layout structure changes; only typographic and section-spacing classes swap.
