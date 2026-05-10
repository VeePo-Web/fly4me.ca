## Add a fifth case study from the uploaded drone clip

The upload is a 40s vertical 720×1280 H.264 clip (~15 MB) — a slow aerial chase of a pickup hauling a flatbed loaded with heavy equipment (skid steer) down a paved foothills road through aspen and pine in summer. It becomes project **05 — Hauling the Foothills**, a working-vehicle / industrial-on-the-move story. No existing card is replaced.

### 1. Asset pipeline

Re-encode once, capture poster, output to `public/work/hauling/`:

- `hauling-1.mp4` — H.264 high, CRF 24, faststart, audio stripped, target ~5 MB
- `hauling-1-poster.jpg` — frame at ~2s, quality 82, 720×1280

Single clip is enough for card + hero + one gallery item (no second/third file uploaded). Gallery gets one wide tile reusing the same source — proven safe pattern; `IntersectionObserver` in `CinematicMedia` ensures only the in-view instance decodes.

### 2. `src/data/projects.ts` — append project 05

Append a new entry (do not touch existing four):

- **slug:** `hauling-the-foothills`
- **number:** `05`
- **title:** `Hauling the Foothills`
- **category:** `Commercial`
- **client:** `Private commission`
- **location:** `Foothills, Alberta`
- **year:** `2026`
- **services:** `Aerial Cinematography`, `Brand Films`, `Operations Storytelling`
- **tagline:** *"A working day, framed at the scale of the country it moves through."*
- **challenge / perspectiveShift / story / impact / outcome:** restrained editorial register matching Canmore + Field & Frequency. Theme: a single load on a single road becomes a portrait of capability, distance, and the country between job sites.
- **cardImage / heroImage:** `/work/hauling/hauling-1-poster.jpg`
- **cardVideoSources / heroVideoSources:** `[{ src: "/work/hauling/hauling-1.mp4", type: "video/mp4" }]`
- **cardObjectPosition:** `"center"` (vertical footage already crops cleanly to the 4:5 card)
- **gallery:** one wide tile — same poster + sources, ratio `"wide"`

### 3. Layout arrays — extend by one entry each

Both `src/pages/Work.tsx` and `src/components/fly4media/FeaturedWork.tsx` ship a 4-entry `LAYOUTS` array. Without a fifth entry the new card falls back to `""` (full bleed). Append one asymmetric entry to each:

- `Work.tsx`: `"lg:col-span-6 lg:col-start-2 lg:mt-24"`
- `FeaturedWork.tsx`: `"md:col-span-7 md:col-start-6 md:mt-16"`

Keeps the editorial rhythm and prevents the new card from breaking the grid.

### 4. No component changes

`CinematicMedia`, `FeaturedWork`, `Work`, `CaseStudyHero`, `CaseStudyGallery`, `CaseStudyStory`, `NextProject` already read everything we need. `getNextProject` cycles automatically — Field & Frequency now points to Hauling, Hauling points back to Among the Pines.

### Verification

- `/work` renders 5 cards in a coherent asymmetric grid; new card poster paints, video fades in once visible.
- `/work/hauling-the-foothills` renders hero + story + 1 gallery tile + next-project link.
- Home `FeaturedWork` shows the 5th tile without overlap.
- Reduced-motion / Save-Data: poster only.
- Network: single ~5 MB MP4; only in-view instance decodes.
- Existing four projects untouched.
