## "Perspective Changes Everything" — brand integration

The slogan becomes the invisible spine of the experience. We won't repeat it everywhere; we'll let it echo through copy, structure, and one signature visual moment. Edits are surgical — copy, micro-structure, and the intro — no new dependencies, no redesign.

### 1. Intro — the first whisper

`src/components/fly4media/Intro.tsx`

- Replace the current wordmark+drone composition with a two-beat title-card sequence:
  - Beat A (0.0–1.1s): hairline + tiny eyebrow `Fly4MEdia` fades up.
  - Beat B (1.1–1.7s): single line `Perspective changes everything.` reveals (existing word-in keyframe, tracking expand 0.32em → 0.16em).
- Veil dissolves at 1.9s, unchanged.
- This is the only place the full slogan appears verbatim on the homepage. Sets the lens for everything that follows.

### 2. Hero — restraint, then resonance

`src/components/fly4media/Hero.tsx`

- Eyebrow above H1: `A cinematic perspective studio.`
- H1 stays large but rewritten with the brand cadence:
  - `We make brands,` / `places, and stories` / `worth looking up at.`
- Sub-copy: `Aerial cinematography for the brands and destinations that understand presentation is positioning.`
- CTAs unchanged (`View our work` / `Start a project`). No literal slogan repeat — the hero earns the slogan rather than restates it.

### 3. Brand statement — the philosophy beat

`src/components/fly4media/BrandStatement.tsx`

- Eyebrow: `Studio — Philosophy`
- Statement (replaces the current "editor / cinematographer" line):
  - `How something is seen changes how it is valued. We build the perspective that changes the perception.`
- Same 3 / 9 grid, same scale.

### 4. Services (homepage row) — perception, not deliverables

`src/components/fly4media/Services.tsx`

- Section eyebrow stays `What we do`.
- Heading: `Tools for shifting perception.`
- Rewrite the 5 row descriptions to read as perception transformations, not deliverables. Examples:
  - 01 Aerial Cinematography — `Cinematic perspectives that elevate how a brand is experienced.`
  - 02 FPV Drone Filming — `Immersive movement that turns a moment into a memory.`
  - 03 Aerial Photography — `Single frames that reposition a place in a viewer's mind.`
  - 04 Real Estate Media — `Visual storytelling that turns properties into destinations.`
  - 05 Tourism & Lifestyle — `Films that translate a landscape into longing.`

### 5. Services page — same shift, longer form

`src/pages/Services.tsx` + `src/components/fly4media/ServiceFeature.tsx` (copy only)

- H1: `Cinematic perspective,` / `engineered to be felt.`
- Lede: `Every engagement begins with the same question: what should this be perceived as?`
- Rewrite each of the 8 service descriptions in the same perception-first voice (see service-page copy file in plan #9 for full list).

### 6. Case studies — Challenge / Perspective Shift / Cinematic Execution / Emotional Impact

`src/data/projects.ts` + `src/components/fly4media/CaseStudyStory.tsx`

- Extend `Project` type with three optional fields: `challenge`, `perspectiveShift`, `impact`. `story` becomes the cinematic-execution paragraph.
- `CaseStudyStory` becomes a four-beat editorial layout:
  ```text
  Eyebrow: The Project
  ── Challenge          [single sentence]
  ── Perspective Shift  [the lens we chose — the heart of each case study]
  ── Cinematic Execution[existing story prose]
  ── Emotional Impact   [outcome reframed in feeling, not metrics first]
  ```
- Backfill the four existing projects with concise copy in the new voice. Keep `outcome` for the meta sidebar.

### 7. About — the philosophical core

`src/pages/About.tsx`

- Hero H1 stays `We believe perspective` / `changes everything.` (this is the only page where the slogan appears literally in body — it's the thesis page).
- Rewrite Philosophy block as three short paragraphs:
  - 1. Perception precedes value.
  - 2. Restraint is the loudest creative choice.
  - 3. Altitude as a discipline — Alberta as the teacher.
- Closing `CTA` heading swaps to `Built for brands that understand presentation is positioning.`

### 8. Contact modal — beginning a collaboration

`src/components/fly4media/ContactModal.tsx`

- Brand panel title: `Let's create something worth looking up at.` (replaces "Let's create something cinematic.")
- Eyebrow inside form: `Begin a collaboration` (replaces "Start a project").
- H3: `Tell us what deserves a new perspective.`
- Submit label: `Begin the conversation`. Success state: `In motion.`
- The floating button + nav button text remains "Start a project" for product clarity.

### 9. Site-wide CTAs and footer

- `CTA` default heading rewrites to:
  - `Some stories deserve` / `to be seen from above.`
- Footer tagline (right-bottom): `Cinematic perspective studio · Alberta` (replaces "Cinematic Aerial Cinematography").
- Footer studio descriptor: `A cinematic perspective studio. We help brands, places, and stories be seen — and remembered.`

### 10. Page titles & meta

- `index.html` `<title>` and `<meta name="description">`:
  - Title: `Fly4MEdia — Perspective Changes Everything.`
  - Description: `A cinematic perspective studio. Aerial films and stills that change how brands, places, and stories are experienced.`
- Per-page `document.title`:
  - About: `About — Perspective Changes Everything · Fly4MEdia`
  - Services: `Services — Tools for shifting perception · Fly4MEdia`
  - Work: `Work — Perspective in motion · Fly4MEdia`

### Files touched

- Edit: `src/components/fly4media/Intro.tsx`, `Hero.tsx`, `BrandStatement.tsx`, `Services.tsx`, `CTA.tsx`, `Footer.tsx`, `ContactModal.tsx`, `CaseStudyStory.tsx`
- Edit: `src/pages/Index.tsx` (title only), `About.tsx`, `Services.tsx`, `Work.tsx` (titles only)
- Edit: `src/data/projects.ts` — add `challenge`, `perspectiveShift`, `impact` to all four projects
- Edit: `index.html` — title + description

### Out of scope

- New imagery, video, or motion systems beyond the intro copy swap.
- New routes, new components, backend, payments, analytics.
- Changing the contact button label outside the modal (kept "Start a project" for clarity).
