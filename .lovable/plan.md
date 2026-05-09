## Goal
Replace the static hero photo (`heroAerial`) on the homepage Hero with the uploaded DJI drone clip, treated as a cinematic, color-graded background video. Keep every other element (text, animations, overlays, scroll behavior) untouched.

## Approach

### 1. Encode the source `.mov` for the web (performance-first)
The uploaded file is a DJI ProRes/H.264 `.mov` — far too heavy to ship directly. We'll transcode it once into two web-optimized variants placed in `public/hero/`:

- `hero-aerial.mp4` — H.264 High, yuv420p, ~1920px wide, CRF ~23, `+faststart`, no audio. Universal fallback.
- `hero-aerial.webm` — VP9, same dims, target ~2–3 Mbps, no audio. Smaller for Chromium/Firefox.
- `hero-aerial-poster.jpg` — first usable frame, ~1920px, mozjpeg q80. Shown instantly while video loads and used as `poster`.

Targets: MP4 ~4–8 MB, WebM ~3–6 MB, poster ~150–250 KB. Done via `ffmpeg` in one exec call; no runtime cost.

### 2. Color grade in-encode (world-class look, zero runtime cost)
Bake the grade into the encoded files using an ffmpeg filter chain instead of CSS filters (CSS filters on a full-screen video are expensive on mobile). Chain:

- `eq=contrast=1.08:saturation=1.12:gamma=0.97` — gentle contrast lift, richer color, subtle midtone deepening.
- `curves=preset=increase_contrast` (light S-curve) — filmic falloff in highlights/shadows.
- `colorbalance=rs=0.04:gs=-0.01:bs=-0.05:rm=0.02:bm=-0.03` — warm shadows/midtones, cool-pulled blues for golden-hour Cochrane tone that matches the existing warm haze overlay.
- `unsharp=5:5:0.4:5:5:0.0` — micro-sharpen for editorial crispness without halos.
- `vignette=PI/5` — subtle cinematic edge darkening that complements the existing radial vignette.

This gives the "world class" graded look while keeping the rendered DOM cheap.

### 3. Hero component swap (`src/components/sections/Hero.tsx`)
Replace the single `<img>` inside the parallax `motion.div` with a `<video>` element. Only the media element changes — the wrapping `motion.div` (parallax y/scale), all overlays, gradients, grain, lens flare, cross watermark, content, and scroll cue stay exactly as-is.

Video element behavior:
- `autoPlay`, `muted`, `playsInline`, `loop`, `preload="metadata"`, `disablePictureInPicture`, `disableRemotePlayback`.
- `poster={heroPoster}` so the first paint matches a graded still — no flash of unstyled background.
- Two `<source>` tags: WebM first, MP4 fallback.
- `aria-hidden="true"` (decorative); keep descriptive alt context via the existing surrounding copy.
- Same classes as the old `<img>`: `w-full h-full object-cover`.
- Honor `prefers-reduced-motion`: if set, render the poster `<img>` instead of the video (no autoplay).
- On very slow connections (`navigator.connection.saveData` or `effectiveType` `2g`/`slow-2g`), also fall back to the poster image.

### 4. Keep everything else untouched
No changes to: hero copy, TextReveal, separators, scripture block, date/time/location row, scroll cue, VeilIntro coordination, parallax math, overlay z-index stack, or any other section/page.

## Technical details

**Files touched**
- `public/hero/hero-aerial.mp4` (new)
- `public/hero/hero-aerial.webm` (new)
- `public/hero/hero-aerial-poster.jpg` (new)
- `src/components/sections/Hero.tsx` (swap `<img>` → `<video>`; add reduced-motion + saveData fallback; remove `heroAerial` import)
- Old `src/assets/hero-aerial.jpg` left in place (still imported elsewhere? — will verify and only delete if unused)

**ffmpeg command (executed once during the build pass)**
```text
ffmpeg -i /tmp/source.mov -vf "scale=1920:-2,eq=contrast=1.08:saturation=1.12:gamma=0.97,curves=preset=increase_contrast,colorbalance=rs=0.04:gs=-0.01:bs=-0.05:rm=0.02:bm=-0.03,unsharp=5:5:0.4:5:5:0.0,vignette=PI/5" -c:v libx264 -profile:v high -pix_fmt yuv420p -crf 23 -preset slow -an -movflags +faststart public/hero/hero-aerial.mp4
```
(Plus parallel WebM encode and a `-frames:v 1` poster extraction.)

**Loading behavior**
- `preload="metadata"` keeps initial JS/network budget small; poster shows instantly.
- No `<link rel="preload" as="video">` — video is large; we want LCP to be the poster image, not a 5 MB stream.
- Trim source to the most cinematic ~12–20 seconds so the loop is short, file size stays small, and the loop point is clean.

**Accessibility & motion**
- Reduced-motion users see only the graded poster JPG (no video, no autoplay).
- Video is muted + `playsInline` for iOS Safari compliance and to avoid any audio surprise.

## Out of scope
Anything beyond the hero media: copy, layout, other sections, color tokens, header, animations elsewhere.
