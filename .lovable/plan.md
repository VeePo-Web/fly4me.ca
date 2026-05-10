# KEEP AND ADD AND Swap Toby portrait on /about (Philosophy / "A letter")

The Philosophy section on `/about` already has a dedicated portrait slot — left column, `media-frame aspect-[3/4]`, captioned "Toby Rennick · Founder & Director, Fly4MEdia". The current image (`src/assets/toby-portrait.jpg`) is a stand-in. Swap in the uploaded photo of Toby on the ridge above the alpine lake — it matches the existing alt text *exactly* and reinforces the cinematic-perspective brand on a page literally titled "We believe perspective changes everything." **YOU MUST KEEP THE IMAGE THAT IS THERE RIGHT NOW AS THE HERO ONE. BUT BELOW IN THE WRITING PART ADD IN THE PICTUR OF TOBY ON THE ABOUT. SO THERE IS TWO IMAGES 

No layout changes. No copy changes. World-class is achieved by the right photo in the existing frame, not by adding a second image that competes with the letter.

---

## Changes

1. **Add the asset**
  - `code--copy user-uploads://4037532756235952762_1.JPG` → `src/assets/toby-portrait-ridge.jpg`.
2. **Swap the import** — `src/pages/About.tsx`
  - `import toby from "@/assets/toby-portrait.jpg"` → `import toby from "@/assets/toby-portrait-ridge.jpg"`.
  - Keep `width={1080} height={1920}` accurate for the new source (currently 1080×1440 — update so the browser reserves the correct aspect ratio and prevents CLS).
  - Keep alt copy unchanged — it already describes this exact photo.
3. **Crop polish in the existing frame**
  - Frame stays `aspect-[3/4]` (matches editorial rhythm of the rest of the site).
  - Source is 9:16 (taller than 3:4), so `object-cover` will crop top + bottom. Toby's face sits upper-right and the lake mid-left — a centered cover crop keeps both. Add `object-[center_30%]` to nudge the crop slightly upward so his face lands in the upper third of the frame (classic portrait composition) and the turquoise lake remains visible behind him.
  - Single utility addition on the existing `<img>` — no new wrappers, no `media-frame` change.

---

## What does NOT change

- Section structure, grid, gating, gutters (already refined in the last About pass).
- The letter copy, the headline, the eyebrow, the caption.
- The old asset file — left in place; no deletes (other components could reference it).
- Any other page.

---

## Verification

- 1440 / 1280 / 1024 — portrait reads as a tall editorial frame next to the letter, face in upper third, lake visible.
- 820 (tablet portrait, stacked) — portrait sits at top of the section at 280px, caption beneath, then the manifesto.
- DevTools: no CLS warning for the swapped image (correct width/height attrs).