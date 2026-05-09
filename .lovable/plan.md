## Goal

Evolve the current single-page Fly4MEdia into a five-route editorial site that feels like "Apple designed a luxury aerial cinematography studio." Keep the monochrome, oversized-typography, huge-whitespace language already established. Stills now, with a `<HeroMedia>` component that drops in `<video>` later without redesign.

## Routes & file structure

```text
/                    Home          src/pages/Index.tsx          (refresh in place)
/work                Case Studies  src/pages/Work.tsx           (new)
/work/:slug          Case Study    src/pages/CaseStudy.tsx      (new, dynamic)
/services            Services      src/pages/Services.tsx       (new)
/about               About         src/pages/About.tsx          (new)
*                    NotFound                                    (keep)

src/components/fly4media/
  Header.tsx              update: real <Link> nav, route-aware
  Footer.tsx              update: <Link> nav
  ContactModal.tsx        keep
  Hero.tsx → HeroMedia.tsx new generic hero (image | future video)
  FeaturedWork.tsx        update: links to /work/:slug
  About.tsx               keep on home as teaser, full version on /about
  Services.tsx            keep on home, expanded version on /services
  CTA.tsx, Footer.tsx, useReveal.ts  keep
  CaseStudyCard.tsx       new (used on /work)
  CaseStudyHero.tsx       new
  CaseStudyMeta.tsx       new (client / location / services / year)
  CaseStudyGallery.tsx    new (alternating editorial layouts)
  NextProject.tsx         new (footer "Next →" between studies)
  ProcessList.tsx         new (01–04 process steps for /about)
  Capabilities.tsx        new (equipment / credentials block)
  ServiceFeature.tsx      new (large heading + image, used on /services)

src/data/projects.ts      curated metadata for all case studies
```

## Curated case studies (4)

Single source of truth in `src/data/projects.ts`, used by the home grid, /work grid, and dynamic /work/:slug pages. Slug, hero image, gallery images, story copy, metadata.

```text
01  canmore-heights      Real Estate     Canmore, AB        2025
02  northern-roads       Tourism         Icefields Pkwy     2025
03  above-the-lake       Lifestyle       Lake Minnewanka    2024
04  field-and-frequency  Industrial      Southern Alberta   2024
```

Each gets: 1 hero image (16:9), 3 gallery images (mixed ratios), tagline, story (~80 words), client/location/services/year, one outcome line.

## Page-by-page composition

**Home** — Hero · Featured Work (4, asymmetric, links to case study) · Brand Statement (new full-bleed section) · Services preview (5 items, links to /services) · Full-bleed cinematic divider (new) · Featured Case Study teaser (new, links to /work/canmore-heights) · CTA · Footer.

**Work (/work)** — Minimal hero ("Selected Work / 2024–2025") · Editorial 2-column asymmetric grid of all 4 projects, oversized imagery, hover scale, metadata under each · CTA · Footer.

**Case Study (/work/:slug)** — Full-viewport hero with title overlay · Meta strip (Client · Location · Services · Year) · Story (editorial 2-col, large pull quote) · Gallery (alternating full-bleed and offset layouts) · Outcome line · "Next Project →" linking to next slug in array · Footer.

**Services (/services)** — Hero ("Cinematic aerial content for modern brands.") · 7 services as `ServiceFeature` blocks (large heading + 1-line description + supporting cinematic image, alternating left/right) · Horizontal cinematic image strip · CTA · Footer.

**About (/about)** — Minimal hero ("We believe perspective changes everything.") · Philosophy editorial text · Process list (01 Discovery → 04 Delivery) · Capabilities (cinema drones, FPV, licensed Transport Canada operations, Alberta-based, worldwide) · Final CTA · Footer.

## Header / nav behavior

- Real React Router `<Link>` for Work, Services, About; Contact still opens modal.
- Active-route subtle underline (1px, foreground/40).
- On home, "Work" anchor scrolls to `#work`; on other routes navigates to `/work`. Logic: if `pathname === "/"` and target is in-page, smooth scroll; else `navigate()`.
- Scroll behavior: route changes scroll to top (small `<ScrollToTop>` helper inside `<BrowserRouter>`).

## HeroMedia component (video-ready)

```tsx
<HeroMedia
  image={hero}
  video={undefined}        // future: <video src="..." poster={hero} ... />
  alt="..."
  align="left"
/>
```
Renders `<img>` today; when `video` prop is provided, swaps in `<video autoPlay muted loop playsInline poster={image}>`. No layout changes required when real footage arrives.

## Imagery to generate (standard tier)

- 1 home full-bleed cinematic divider (16:9, foggy mountain pass)
- 1 services hero supporting image (3:2)
- 7 service-feature images (square/3:4 mix)
- 12 case-study gallery images (4 projects × 3 each, mixed ratios)
- 1 about hero image (3:2, drone pilot silhouette / mountain)

Total ~22 images, all monochrome-friendly, lazy-loaded with explicit width/height to keep CLS at 0.

## Cleanup (delete orphaned worship code)

```text
DELETE
  src/pages/{Contact,DayDetails,FAQ,Faith,Support,Testimony,Vision,VolunteerSignup}.tsx
  src/pages/day-details/  src/pages/faith/  src/pages/support/  src/pages/vision/
  src/components/{BackLink,BentoCard,ChurchPartnerInline,ContactPanel,
    ContactPanelTrigger,DayDetailsNav,EditorialCard,EditorialImage,
    FaithNav,Footer,GlassTexture,Header,ImageInterstitial,LogoMark,
    NavLink,PageShell,PageTransition,PullQuote,ScriptureWhisper,
    ScrollProgress,ScrollReveal,SectionBleed,SectionDivider,SectionNumber,
    SmoothScrollProvider,SubPage,SupportNav,TextReveal,VeilIntro,
    VisionNav,VolunteerForm}.tsx
  src/components/footer/  src/components/icons/  src/components/sections/
  src/components/ui/{editorial-container,subpage-header,typography,section}.tsx
  src/contexts/ContactPanelContext.tsx
  src/data/{christian-design-philosophy,church-profiles,faq-data,
    persona,persona-registry,questionnaire,scripture-map,
    ux-conversion-map,ux-personas,wireframe}.ts
  src/lib/send-email.ts
  supabase/functions/send-email/  supabase/functions/_shared/email-templates.ts
  public/favicon.svg  (replace with new neutral favicon)
  src/App.css  (unused)
  README.md sections referencing worship project
KEEP
  src/components/ui/* (shadcn primitives — used by Toaster/Tooltip)
  src/integrations/supabase/* (auto-generated)
  src/hooks/use-mobile.tsx, use-toast.ts
```

Update `mem://index.md`: replace worship Core rules with Fly4MEdia rules (monochrome, Inter, oversized type, video-ready hero, contact-modal-only, Alberta-based).

## Performance & a11y guardrails

- Inter loaded via `<link>` in `index.html` with `display=swap`, only weights 300/400/500/600.
- Hero image: `fetchPriority="high"`, all others `loading="lazy"`, every `<img>` has explicit `width`/`height`.
- Reveal animations gated behind `prefers-reduced-motion`.
- One `IntersectionObserver` hook (`useReveal`) reused everywhere — no Framer Motion added.
- Semantic HTML: `<main>`, `<article>` per case study, `<nav aria-label>`, focus-visible rings on interactive elements.
- Modal: focus trap on open, restore focus on close, Escape to dismiss (Escape already wired).
- Skip-to-content link, color contrast verified (foreground #121212 on #fff = 18.7:1).

## Out of scope (this pass)

- Real video files (architecture is ready; drop-in later).
- CMS / database for case studies (static `projects.ts` is enough and ships instantly).
- Blog / journal page.
- i18n.

## Acceptance

- Five routes render, link cleanly, scroll-to-top on navigation.
- Each case study reachable from home grid and /work; "Next Project" cycles through all four.
- Lighthouse mobile ≥ 95 Performance / 100 Accessibility on /.
- Zero orphaned imports; `bun run build` clean.
- Contact modal reachable from every page via header, floating button, and final CTA.
