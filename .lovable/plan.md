ns: # About page rewrite — Toby in the first person

## The thesis of this page
Right now the About page is the studio talking *about* a philosophy. After this rewrite, it's **Toby talking to one person** — the founder, marketer, or destination lead who's about to hire someone to point a camera at the thing they've spent years building.

The arc is **"I" that becomes "we."** The page opens as a personal letter from Toby, earns trust through story and stance, then widens into the studio at the bottom — so the rest of the site (which stays "we") feels like a natural continuation, not a different brand.

Voice is **50/50 Hormozi × editorial**: short hook lines that name the reader's real problem, then one cinematic line that earns the silence around it. Punchy, but never loud. Persuasive, but never salesy. The slogan — *Perspective changes everything* — is the spine, never the chorus.

---

## Page structure (no layout changes)

The existing five blocks stay in the same order. Only copy changes, plus **one new element**: Toby's portrait + name caption inside the Philosophy section.

```
1. Hero            (existing)   — slogan stays, eyebrow + framing tightened
2. Philosophy      (existing)   — REWRITTEN as Toby's letter, portrait added
3. Process         (existing)   — rewritten in first person ("here's how I work")
4. Capabilities    (existing)   — kept factual, one line of Toby's voice on top
5. CTA             (existing)   — eyebrow + heading retuned to a personal close
```

No new sections. No new components. No layout shifts. The portrait slots into the existing 12-column Philosophy grid where the eyebrow currently sits — it doesn't push anything else around.

---

## Section 1 — Hero

**Keep:** background image, gradient, layout, the slogan as H1.
**Change:** eyebrow only.

- Eyebrow: `Studio — About` → **`A note from Toby — founder, Fly4MEdia`**
- H1 stays: *We believe perspective changes everything.*

Why: signals the shift to first person before they scroll. The slogan stays as the studio's collective belief — which is the bridge from "I" to "we."

---

## Section 2 — Philosophy (the heart of the rewrite)

This is the section that does the work. Same grid, same type scale. Three changes:

**A. Eyebrow column** becomes a **portrait + caption block** (replaces the current `Philosophy` eyebrow).
- Square/portrait crop of the uploaded photo of Toby in the Rockies.
- Below the image: `Toby Rennick` (t-meta) / `Founder & Director, Fly4MEdia` (t-eyebrow muted).
- Image lazy-loaded, explicit width/height, semantic tokens only.

**B. Body copy** rewrites from third-person philosophy → first-person letter. Three beats, matching the existing three-paragraph rhythm so nothing about the layout changes:

1. **Hook + reframe** (replaces the current t-headline-2 paragraph)
   A short, Hormozi-style opener that names the buyer's real fear: that the thing they built deserves better than how it's currently being shown. Lands on the reframe: *the way you're seen is the position you hold.*

2. **Origin** (replaces the current first t-lede)
   *[ORIGIN — needs 2–3 sentences from you. Send me the truest version of why you started flying / why the camera, and I'll write the paragraph around it. Until then I'll draft a placeholder that says: I didn't start this to be a drone guy. I started it because I kept watching beautiful places and beautiful brands get flattened by lazy footage — and I knew the frame could do more.]*

3. **Stance + the turn from "I" to "we"** (replaces the current second t-lede)
   The Alberta-patience line stays in spirit but reframed personally: I learned to wait in the mountains. That's the discipline I built the studio around. Closes on the pivot: *That's why Fly4MEdia exists — and why everywhere else on this site you'll hear "we."*

**C. Section eyebrow** above all of it (small, optional, only if the portrait replacing the eyebrow column feels too quiet): `A letter` in `t-eyebrow text-muted-foreground`, sitting above the portrait.

---

## Section 3 — Process (`ProcessList.tsx`)

Same four steps, same numbers, same headings. Descriptions rewritten in first person — Toby walking the client through how he actually works. Keep them tight (one to two sentences) so the rhythm of the existing list doesn't break.

- **01 Discovery** — "The first call isn't a sales call. I'm listening for the thing under the brief — the reason you actually picked up the phone."
- **02 Creative Direction** — "Before anything flies, you see the film on paper. Storyboards, shot lists, references. Nothing leaves the ground until you've nodded."
- **03 Production** — "Licensed, insured, cinema-grade. And patient. I'd rather lose a day to weather than hand you a shot we both know is *fine*."
- **04 Delivery** — "Master files, channel-ready cuts, and the version your team will actually use on Monday. The job isn't done until the room goes quiet when it plays."

Section H2 stays: *Four steps. Nothing wasted.*

---

## Section 4 — Capabilities (`Capabilities.tsx`)

Stays mostly factual — this is the trust block. Two micro-edits:

- Section H2: *Built for productions that can't miss the shot.* → **`Built for the projects you can't afford to look ordinary.`**
- Keep the six list items as-is. They're already tuned.

---

## Section 5 — Final CTA

Retune the eyebrow + heading to close the letter, not pitch a service.

- Eyebrow: `Reframe what you're showing the world` → **`If you've read this far —`**
- Heading: *Built for brands that understand presentation is positioning.* → **`Let's talk about what you're trying to be seen as.`**

The CTA button copy itself (handled in `CTA.tsx`) is untouched.

---

## What I need from you before I implement

1. **The origin paragraph** — 2–3 honest sentences about why you started. Doesn't have to be polished; I'll shape it. Without this, paragraph 2 of Philosophy stays as a placeholder.
2. **Confirmation on the portrait crop** — the uploaded photo is vertical with you on the right and Grassi/Rockies on the left. I'll crop to a tight portrait (you + the rock face), but if you'd rather I keep more of the lake/mountain in frame, say so.

---

## Technical notes (for the build step)

- Copy uploaded photo to `src/assets/toby-portrait.jpg`, import as ES6 module, lazy-load, explicit width/height.
- Portrait sits in `md:col-span-3` column of the existing Philosophy grid; on mobile it stacks above the text. No new grid, no new section.
- All typography via existing `.t-*` classes. No raw Tailwind type utilities.
- All colors via semantic tokens (`text-muted-foreground`, `bg-background`, etc.).
- No new dependencies. No layout, spacing, or color changes anywhere.
- Update `mem://brand/perspective-slogan.md` only if the slogan's role meaningfully shifts — it doesn't here, so no memory write needed.
