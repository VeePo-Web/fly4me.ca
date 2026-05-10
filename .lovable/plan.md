## Replace "Field & Frequency" with cinematic drone videos

Three uploaded clips are all vertical (720×1280 / 404×720, 19–24s each, ~8–10MB raw H.264). Same project, three angles. They will replace the static `Field & Frequency` (project 04) card image, hero, and gallery — using the same `CinematicMedia` component already proven on the Canmore card. No layout, type, or grid changes.

### 1. Asset pipeline (videos + posters)

Re-encode each clip into a web-optimized MP4 (H.264 high profile, CRF 24, faststart, audio stripped, ~4–6 MB each) and capture a poster JPG at ~1s in. Output to `public/work/field/`:

- `field-1.mp4` + `field-1-poster.jpg`  ← from `DJI_0397.MP4` (primary — used on card + hero)
- `field-2.mp4` + `field-2-poster.jpg`  ← from `DJI_20260108113014_0019_D.MP4`
- `field-3.mp4` + `field-3-poster.jpg`  ← from `DJI_20260108103806_0003_D.MP4`

Posters are LCP-eligible; videos lazy-mount via the existing `CinematicMedia` IntersectionObserver, respect `prefers-reduced-motion` and `Save-Data`. Cards keep their current dimensions, radius, hover, and grid alignment.

### 2. `src/data/projects.ts` — rewrite project 04

Rewrite the project (preserve `slug: "field-and-frequency"` to keep URLs stable; preserve `number: "04"`):

- **title:** `Field & Frequency`  *(retained — still fits the new footage)*
- **category:** `Industrial`
- **client:** `Private commission`
- **location:** `Southern Alberta`
- **year:** `2026`
- **services:** `Aerial Cinematography`, `Industrial Documentation`, `Brand Films`
- **tagline:** *"A working landscape, framed at the scale it actually operates at."*
- **challenge / perspectiveShift / story / impact / outcome:** rewritten in the same restrained editorial register as Canmore — focused on perception of scale, repetition, and the quiet geometry of working land. No drone-company clichés, no slogan repetition.
- **cardImage / heroImage:** `field-1-poster.jpg`
- **cardVideoSources / heroVideoSources:** `[{ src: "/work/field/field-1.mp4", type: "video/mp4" }]`
- **cardObjectPosition:** `"center"`
- **gallery:** two items, both video-backed
  - `{ src: field-2-poster, ratio: "wide",     videoSources: [field-2.mp4] }`
  - `{ src: field-3-poster, ratio: "portrait", videoSources: [field-3.mp4] }`

Old `csField*` / `work4` imports stay (suppressed) so other refs don't break, then removed if fully unused.

### 3. No component changes required

`CinematicMedia`, `FeaturedWork`, `Work`, `CaseStudyHero`, and `CaseStudyGallery` already read `cardVideoSources` / `heroVideoSources` / `gallery[].videoSources` — proven on Canmore. Nothing else is touched.

### Verification

- Hard reload `/work` and `/work/field-and-frequency`: card, hero, and both gallery tiles show the new footage; posters appear instantly, video fades in once visible.
- Network: each clip is ~4–6 MB; only the in-view clip decodes at a time (IntersectionObserver pauses offscreen).
- Reduced-motion / Save-Data: posters only, no autoplay.
- Other three projects unchanged.
