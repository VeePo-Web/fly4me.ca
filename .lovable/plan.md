## Home page — copy upgrade plan

**Page-level theme:** The Home page is the 5-second proof of the perception thesis. By the time a CMO, founder, or DMO director scrolls past the fold, they should feel: *this studio thinks about my brand the way I do, not the way a vendor does.* Every block reinforces a single idea — **how something is seen decides what it's worth** — without ever saying it twice the same way.

Surgical copy edits only. No design, layout, or component structure changes.

---

### 1. `Hero.tsx` (lines 32–46)

- **Eyebrow** (l.32–34): keep "A cinematic perspective studio" — it's the one place this label belongs.
- **H1** (l.35–41): tighten from a list of three nouns to a sharper claim aimed at decision-makers.
  - Current: "We make brands, places, and stories worth looking up at."
  - Proposed: "We make the brands, places, and stories the world actually looks up at."
  - (One word shift — "actually" — names the unspoken anxiety: *most aerial work doesn't get looked at twice.*)
- **Lede** (l.43–46): rewrite to speak to the buyer's reality, not describe the service.
  - Current: "Aerial cinematography for the brands and destinations that understand presentation is positioning."
  - Proposed: "For the founders, marketers, and destinations who already know — the way you're presented is the position you hold. We just make sure the frame deserves it."

### 2. `BrandStatement.tsx` (lines 8–15)

- **Eyebrow**: keep "Studio — Philosophy".
- **Statement** (l.12–15): currently good but a touch corporate ("we build the perspective"). Tighten to make the slogan feel earned rather than stated.
  - Current: "How something is seen changes how it is valued. We build the perspective that changes the perception."
  - Proposed: "How something is seen decides what it's worth. Our work is the difference between being shown and being remembered."

### 3. `FeaturedWork.tsx` (lines 22–26)

- **H2**: lift from descriptive to thesis.
  - Current: "Visual stories from above."
  - Proposed: "Proof, not portfolio."
  - Eyebrow stays "Featured Work"; CTA stays "View all projects".

### 4. `Services.tsx` (Home block — lines 22–26)

- **H2** is already strong ("Tools for shifting perception."). Leave it.
- **Service descriptions** (l.5–10): tighten for the Home preview — these are different from the full Services page cards. Make each row name a *use-case anxiety* in one breath.
  - 01 Aerial Cinematography → "For the brand that's tired of looking like every other drone reel."
  - 02 FPV Drone Filming → "Movement the cut can't fake. The shot people rewind."
  - 03 Aerial Photography → "One frame that repositions a place — and the deck it lives in."
  - 04 Real Estate Media → "When the listing has to feel like the destination, not the address."
  - 05 Tourism & Lifestyle → "Films that turn a landscape into a reason to book the flight."

### 5. `CaseStudyTeaser.tsx` (line 11)

- **Eyebrow**: change "Featured Case Study" → "Proof of perspective." (Reinforces the thesis without naming the slogan.)
- Title and tagline are pulled from `projects.ts` — leave dynamic content alone.

### 6. `CTA.tsx` (Home default — lines 27–31)

- **Eyebrow** (l.13 default): change "Start a project" → "Before the brief".
- **Heading**: keep "Some stories deserve / to be seen from above." — it's the right closing note for Home and the only place this exact metaphor lands.
- **CTA button** (l.15 default): keep "Begin a conversation".

---

### Out of scope

- No edits to `Intro` veil (slogan placement is sanctioned there).
- No edits to `Header`, `Footer`, `ContactModal`, floating button, project data, or images.
- No layout, spacing, color, type-scale, or component-prop changes.
- Other pages (Work index, Case Study, Services page body, About) untouched in this pass.

### Recommended next pass after Home

`FeaturedWork` card data in `src/data/projects.ts` (taglines + categories) — the one place Home/Work/Case Study all pull from. A single sweep there sharpens three pages at once.
