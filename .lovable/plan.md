## Two parts: media-dedupe fix (CS1 + CS2) + Case Study 3 upgrade (*Above the Lake*)

---

### Part A — Stop the hero from appearing twice/three times

**Root cause:** `CaseStudyPerspective` (the signature middle title-card) reuses `project.heroImage` + `project.heroVideoSources`. CS1's gallery also still contains `canmore1` (same as the hero). Result on CS1: hero video plays at the top, again as the perspective shift, and again in the gallery — three times. CS2: hero photo appears as hero and again in the perspective shift section.

**Fix (data-driven, no new components):**

1. Extend `Project` in `src/data/projects.ts` with optional fields:
   ```ts
   perspectiveImage?: string;
   perspectiveVideoSources?: VideoSource[];
   perspectiveObjectPosition?: string;
   ```
2. Update `CaseStudyPerspective` consumer in `src/pages/CaseStudy.tsx` to prefer `project.perspectiveImage` / `perspectiveVideoSources` and fall back to hero only when not provided.
3. Update `CaseStudyGallery` to **auto-dedupe**: filter out gallery items whose `src` matches `project.heroImage` or `project.perspectiveImage`. Pure presentation logic; no data churn.
4. Wire bespoke perspective assets:
   - **CS1 (Among the Pines)** — perspective uses the second pass: `canmore2Poster` + `canmore2Mp4` (the slow, low traverse through the trunks — actually a stronger "perspective shift" beat than the top-down hero). Gallery then auto-dedupes both → empty gallery section, which is correct (only two clips exist; both are now placed intentionally).
   - **CS2 (Northern Roads)** — perspective uses `csNorthern1` (single vehicle on the snow road — the "road as protagonist" moment). Hero stays `csNorthernHero`. Gallery dedupes `csNorthern1`, leaves `csNorthern2` (glacial lake) as the single closing gallery beat.

After this, every original asset appears exactly once per page, in its strongest narrative slot.

---

### Part B — Case Study 3: *Above the Lake* — full editorial upgrade

Same pattern as CS1/CS2: bespoke `narrative` block + 3 hyper-realistic Nano Banana supporting images, all originals preserved.

#### B1. Three Nano Banana images → `src/assets/cs/lake/`

All hyper-realistic, no people, no faces, no text. Lake Minnewanka / Canadian Rockies alpine-lake universe at first light.

1. `water-surface.jpg` (wide, 1920×1080) — *"Hyper-realistic editorial photograph of a glass-still alpine lake surface at first light, faint concentric ripples from a single drop, soft pastel reflection of distant mountains, no people, no boats, no signage, restrained palette, photographic 35mm look, low contrast."*
2. `dock-detail.jpg` (portrait, 1024×1280) — *"Cinematic editorial detail of weathered cedar dock planks meeting still emerald alpine lake water at dawn, light morning mist, no people, no boats, no text, soft cool light, restrained composition, photographic look, shallow depth of field."*
3. `shoreline-pines.jpg` (wide, 1920×1080) — *"Hyper-realistic editorial photograph of an empty pebble shoreline at a glacial alpine lake in the Canadian Rockies at dawn, dark pine treeline, faint mist on the water, distant ridge, no people, no boats, no signage, restrained pastel palette, photographic 35mm look."*

#### B2. `src/data/projects.ts` — add narrative + supportingImages + perspective wiring to `above-the-lake`

Originals preserved (`csLakeHero`, `csLake1`, `csLake2`).

- **Opportunity** — *"A Morning, Not A Campaign."* — Mountain Co. had compelling product but visuals that looked like every other outdoor brand. The brief: tell the truth about a quiet morning on the water — and let truth do the marketing.
- **Problem** — *"Outdoor Brands All Look The Same."* — Same hero shots, same action sequences, same energy. The category had compressed into a single visual language. Standing inside the convention meant disappearing.
- **Perspective Shift** *(signature)* — *"Remove The Action. Keep The Atmosphere."* — Held the camera still long enough for stillness itself to become the subject. The water did the work. The brand stopped competing on energy and started competing on calm.
- **Execution** — *"One FPV Pass. One Held Frame."* — A single FPV opener and a series of top-down stills shot in the first hour of light. No music swell, no athlete heroics — the morning at the pace of the morning.
- **Outcome** — *"The Brand That Feels Different."* — Customers started describing the company as the one that "feels different" — without being able to say why. Anthology series picked up by three regional outfitters.
- **Takeaway** — *"In a category sold on action, restraint is the loudest thing on the page."*

Supporting image placement:
- `dock-detail.jpg` → `after-opportunity` *(intimate first frame — sets the calm)*
- `water-surface.jpg` → `after-problem` *(visual proof of "what every other brand isn't doing")*
- `shoreline-pines.jpg` → `after-execution` *(atmospheric closer before the outcome statement)*

Perspective Shift section uses bespoke perspective asset: `csLake1` (the kayaker top-down — the literal "removed action / held frame"). Hero stays `csLakeHero`. Gallery auto-dedupes `csLake1`, leaves `csLake2` (dock) as the closing beat.

#### B3. No component changes beyond Part A

Once the data is added, `/work/above-the-lake` automatically renders the full enhanced flow.

---

### Out of scope

CS4 (Field & Frequency) and CS5 (Hauling the Foothills) untouched in this pass.

### Verification

- `/work/canmore-heights` — hero (canmore1) appears once; perspective (canmore2) appears once; gallery dedupes both → no repeats.
- `/work/northern-roads` — hero (csNorthernHero) once; perspective (csNorthern1) once; gallery shows csNorthern2 only.
- `/work/above-the-lake` — full enhanced narrative; hero (csLakeHero) once; perspective (csLake1) once; gallery shows csLake2 only; three new supporting images render lazily with explicit dimensions.
- LCP unchanged on all three. No CLS regressions.
