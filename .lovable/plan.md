## Case Study 2 — *Northern Roads*: editorial upgrade

Project 1's narrative model and components (`CaseStudyNarrative`, `CaseStudyPerspective`, `CaseStudyTakeaway`, `OutcomeStatement`) are already shipped. This pass is **purely additive data + 3 generated images** — no new components, no `CaseStudy.tsx` changes.

### 1. Three Nano Banana supporting images → `src/assets/cs/northern/`

All hyper-realistic, no people, no signage with text, project-specific to the Icefields Parkway in late-winter pre-dawn light. Generated via `imagegen--generate_image` (model `standard`):

1. `mile-marker.jpg` (portrait, 1024×1280) — *"Hyper-realistic editorial photograph of a frosted, plain unbranded green metal road sign post on the Icefields Parkway in Alberta at first light, snow on the ground, no text, no logos, no people, no vehicles, soft pre-dawn diffused light, distant pine silhouettes, muted blue-grey palette, photographic 35mm look."*
2. `empty-shoulder.jpg` (wide, 1920×1080) — *"Cinematic editorial photograph of an empty Icefields Parkway shoulder before sunrise in early spring, fresh tire tracks in light snow on black asphalt curving toward distant Canadian Rockies, no people, no vehicles, no signage, soft cool blue-grey light, restrained composition, photographic anamorphic feel."*
3. `glacial-reflection.jpg` (wide, 1920×1080) — *"Hyper-realistic editorial photograph of a still turquoise glacial lake at dawn in the Canadian Rockies, faint ice floes near the shoreline, mountain reflection in the water, no people, no boats, no signage, no text, soft pastel pre-sunrise light, restrained palette, photographic 35mm look."*

Lazy-loaded, explicit width/height, served via `<img>`. Combined target ≤600 KB.

### 2. `src/data/projects.ts` — add `narrative` + `supportingImages` to project 02

Append after the existing `gallery` array on `northern-roads`. Original media (`csNorthernHero`, `csNorthern1`, `csNorthern2`) untouched.

- **Opportunity** — *"A Road, Not A Postcard."* — Travel Alberta wanted a tourism film that didn't oversell. The Icefields Parkway already sells itself; the work was to honor it.
- **Problem** — *"Tourism Films Got Loud."* — Quick cuts, hero music, postcards in motion. Audiences had stopped trusting the genre. The parkway deserved quieter.
- **Perspective Shift** *(signature)* — *"The Road As The Protagonist."* — One vehicle. One line of light. Two pre-dawn shoots. The destination becomes the country between the destinations.
- **Execution** — *"No Music Swell. No Hard Sell."* — Lake Louise to Jasper, single vehicle, single line. Held altitude, held pace, held silence — the film became a meditation, not a brochure.
- **Outcome** — *"Conversation Changed From Place To Feeling."* — The parkway started reading less like a place to visit and more like a feeling people wanted to chase. Featured across the 2025 destination campaign and short-film circuit.
- **Takeaway** — *"Tourism is sold by spectacle. Travel is sold by atmosphere. We chose the second — and so did the audience."*

Supporting image placement:
- `mile-marker.jpg` → `after-opportunity` *(detail study, sets the tone — frost, quiet, scale)*
- `empty-shoulder.jpg` → `after-problem` *(the road without a campaign on top of it — what the genre forgot)*
- `glacial-reflection.jpg` → `after-execution` *(the country between destinations — proof of the "atmosphere over spectacle" thesis)*

Perspective Shift section reuses `project.heroImage` (`csNorthernHero`) full-bleed — original media, no replacement.

### 3. No component / page changes

`CaseStudy.tsx` already branches on `project.narrative`. Once the data is added, `/work/northern-roads` automatically renders Hero → Meta → Opportunity (mile-marker) → Perception Gap (empty shoulder, flipped) → Perspective Shift (full-bleed hero) → Execution (glacial reflection) → Outcome statement → Takeaway → Gallery (originals preserved) → Next Project.

### 4. Out of scope

Cases 03, 04, 05 untouched. Project 01 untouched.

### Verification

- `/work/northern-roads` renders the full enhanced flow with three new images and rewritten copy.
- `/work/canmore-heights` unchanged from previous pass.
- `/work/above-the-lake`, `/work/field-and-frequency`, `/work/hauling-the-foothills` still on legacy layout.
- LCP unchanged (hero is the original `csNorthernHero`); new JPGs lazy-loaded with explicit dimensions → no CLS.
