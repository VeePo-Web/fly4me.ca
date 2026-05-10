## Case Study 1 — *Among the Pines*: full editorial upgrade

Project 1 is the only one touched in this pass. The other four cases stay exactly as they are. Original media (`canmore-1.mp4`, `canmore-2.mp4`, posters) is preserved — every new visual is additive.

### 1. New narrative model on `Project` (additive, optional)

Extend `src/data/projects.ts` with optional fields so the new layout is opt-in per project. Existing projects without these fields continue to render with the current `CaseStudy.tsx` flow:

```ts
narrative?: {
  opportunity: string;       // The Opportunity
  problem: string;           // The Problem / Perception Gap
  perspectiveShift: string;  // The Perspective Shift (signature)
  execution: string;         // The Execution
  outcome: string;           // The Outcome
  takeaway: string;          // The Takeaway (closing insight)
};
supportingImages?: Array<{
  src: string;               // imported asset
  alt: string;
  caption?: string;          // editorial micro-caption
  ratio: "wide" | "portrait" | "square";
  placement: "after-opportunity" | "after-problem" | "after-shift" | "after-execution" | "after-outcome";
}>;
heroEyebrow?: string;        // "01 — Real Estate · Canmore, Alberta"
```

Populate only `Among the Pines` for now. Copy is rewritten in the Apple/Hormozi/Brunson register described — title-card headlines, no agency clichés, no slogan repetition.

### 2. New page composition for project 1

Update `src/pages/CaseStudy.tsx` to render an enhanced flow when `project.narrative` exists, otherwise fall back to today's layout. New flow:

```text
Hero (existing CaseStudyHero — unchanged)
↓
SnapshotMeta (existing CaseStudyMeta — Client / Location / Services / Year)
↓
NarrativeSection — "The Opportunity"          ← short lede
   [supporting image: bark/needle texture, portrait]
↓
NarrativeSection — "What was missing"         ← Problem / Perception Gap
   [supporting image: a typical real-estate-style ground frame, wide]
↓
PerspectiveShift — signature title-card section, oversized type
   [original canmore-1 video — top-down canopy, full-bleed wide]
↓
Execution — two-column: copy + original canmore-2 video (low traverse)
   [supporting image: gravel access track through pines at dusk, wide]
↓
Outcome — single-line oversized statement (Hormozi clarity), large whitespace
↓
Takeaway — closing insight, small editorial paragraph
↓
NextProject (existing — unchanged)
```

All new sections use the existing `.t-*` typography classes, `.py-section` rhythm, `useReveal` IntersectionObserver, and `media-frame` / `CinematicMedia` primitives. No new motion library, no extra runtime cost.

### 3. New components (small, reusable across all 5 future passes)

- `src/components/fly4media/CaseStudyNarrative.tsx` — generic beat renderer. Takes `eyebrow`, `headline`, `body`, optional `image` block. Two layout variants: `lede` (3/9 grid, restrained) and `statement` (oversized title-card).
- `src/components/fly4media/CaseStudyPerspective.tsx` — the signature "Perspective Shift" section: full-bleed media (image *or* video via `CinematicMedia`), oversized headline overlaid below, single short paragraph.
- `src/components/fly4media/CaseStudyTakeaway.tsx` — final insight: short editorial paragraph, generous whitespace, no CTA chrome.

These replace the current monolithic `CaseStudyStory` *only when* `project.narrative` is set. `CaseStudyStory` stays in the codebase for the four legacy projects.

### 4. Supporting images — Nano Banana, project-specific, no people

Generate three images for *Among the Pines* via `imagegen--generate_image` (model `google/gemini-3.1-flash-image-preview`), saved under `src/assets/cs/canmore/`:

1. `bark-macro.jpg` (portrait, 1024×1280) — *"Hyper-realistic editorial macro photograph of weathered lodgepole pine bark with a single fresh resin bead, soft natural diffused light, shallow depth of field, muted earthen palette, no people, no signage, no text, photographic, 35mm look, Canadian Rockies foothills."*
2. `typical-listing-frame.jpg` (wide, 1920×1080) — *"Ordinary daytime ground-level real-estate photograph of an empty Alberta acreage driveway in flat overcast light, slightly clinical, accurate, neutral colors, no people, no cars, no text, no logos, photographic, 35mm look — feels generic and informational."* (Used in the "what was missing" beat to contrast against the cinematic frames.)
3. `dusk-access-track.jpg` (wide, 1920×1080) — *"Cinematic editorial photograph of a narrow gravel access track curving into a stand of pine and larch on a private Canmore acreage, late blue-hour light, faint snow patches, soft ground mist, distant Bow Valley ridge silhouette, no people, no vehicles, no signage, no text, photographic, anamorphic feel, restrained and quiet."*

All three: `transparent_background: false`, lazy-loaded, explicit width/height, `loading="lazy"`, `decoding="async"`, served via `<img>` (not videos) to keep payload small. Total added weight target: under 600 KB combined at JPG q82.

### 5. Copy — *Among the Pines*

Rewritten in title-card register. No "Perspective Changes Everything" verbatim — proven through structure:

- **Eyebrow:** `01 — Real Estate · Canmore, Alberta · 2026`
- **Tagline (hero, kept):** *"An Alberta acreage shown the way it actually feels — from above the canopy, and from inside the trees."*
- **Opportunity headline:** *"A Place, Not A Parcel."*  Body: one short paragraph framing the property as a *place* a buyer walks into, not a polygon on a map.
- **Problem headline:** *"What Listings Leave Out."*  Body: surveys show shape, listing photos show weather; neither shows what it feels like to stand under the pines.
- **Perspective Shift headline (signature):** *"Two Frames. One Property."*  Body: one vantage from above the canopy registers scale and snowline; one low pass through the trunks registers quiet. Together they give a buyer the *feeling* of the land before they ever drive in.
- **Execution headline:** *"Held Long Enough To Notice."*  Body: a single early-spring evening, two passes, no music swell, no quick cuts — the camera holds long enough for the place to do the work.
- **Outcome headline:** *"Buyers Stopped Asking About Lot Lines."*  Body: showings booked inside the first week; the conversation moved from acreage to atmosphere.
- **Takeaway:** *"A property is sold by the polygon. A place is sold by the feeling. We built the second."*

### 6. Performance

- Three new JPGs, lazy, with explicit dimensions → no CLS, no LCP impact (hero LCP unchanged).
- No new fonts, no new dependencies, no new motion library.
- `CinematicMedia` `IntersectionObserver` already pauses offscreen videos — adding a third on-page video instance is fine because still images, not videos, fill the new beats.
- Existing `useReveal` shared observer covers new sections.

### 7. Out of scope (case studies 2–5)

Not touched in this pass. Their data, components, and pages remain unchanged. They'll be upgraded one at a time in subsequent passes using the same `narrative` + `supportingImages` model already in place — so future passes are pure data + asset additions.

### Verification

- `/work/canmore-heights` shows: hero (existing video), meta strip, Opportunity + bark macro, Problem + listing-frame contrast, Perspective Shift signature with top-down canopy video, Execution with low-traverse video + dusk track image, Outcome statement, Takeaway, Next Project.
- `/work/northern-roads`, `/work/above-the-lake`, `/work/field-and-frequency`, `/work/hauling-the-foothills` render exactly as today (legacy path).
- Lighthouse: LCP unchanged, no new CLS, total transferred bytes for project 1 page +≤600 KB.
