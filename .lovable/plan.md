## Case Study 5 — Add second real drone clip

CS5 narrative, supporting stills, and `perspectiveImage` are already shipped. The user uploaded `DJI_0398-3.MP4` and wants it added as the second real drone clip on `/work/hauling-the-foothills`. The hero (`hauling-1.mp4`) stays untouched.

### 1. Add the uploaded video to the project

- `code--copy user-uploads://DJI_0398-3.MP4 → public/work/hauling/hauling-2.mp4`
- Extract first-frame poster with ffmpeg → `public/work/hauling/hauling-2-poster.jpg` (matches the `hauling-1-poster.jpg` pattern, so it lazy-loads cleanly and gives the gallery a sharp still before the video kicks in).

### 2. `src/data/projects.ts` — wire it into CS5

In the `hauling-the-foothills` entry, replace the existing single gallery item (which currently duplicates the hero and gets filtered out by the auto-dedupe) with the new clip:

```ts
gallery: [
  {
    src: "/work/hauling/hauling-2-poster.jpg",
    alt: "Second aerial pass following the load along the foothills two-lane",
    ratio: "wide",
    videoSources: [{ src: "/work/hauling/hauling-2.mp4", type: "video/mp4" }],
  },
],
```

Hero stays as `hauling-1.mp4`. `perspectiveImage` stays as the `foothills-horizon` Nano Banana still. Net result: two **real** drone clips on the page (hero + closing gallery), each appearing exactly once, plus the three supporting stills.

### 3. Out of scope

No copy changes, no narrative edits, no component changes, no other case studies touched.
