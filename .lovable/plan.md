# Cinematic Hero Video — DJI_0723

Use the uploaded drone clip (`DJI_0723.mp4`, 7s, 1280×720, H.264, 2.2 MB) as the home hero background. The site already has the right plumbing — `HeroMedia` accepts `videoSrc`, and there's a `public/hero/` folder. We extend it into a true cinematic, performance-first video layer without changing the typography or layout.

## What changes

1. **Encode optimized variants** of the uploaded clip (under `public/hero/`):
   - `hero-drone.mp4` — H.264, 1920-wide, ~3–4 Mbps, faststart, no audio
   - `hero-drone.webm` — VP9, ~2 Mbps (smaller, modern browsers)
   - `hero-drone-mobile.mp4` — H.264, 960-wide, ~1.2 Mbps (served on small viewports / Save-Data)
   - `hero-drone-poster.jpg` — first-frame poster, blurred-edge variant for instant paint
   
   The existing `hero-aerial.*` files stay (used elsewhere or as fallback) — we add new ones rather than overwrite.

2. **Upgrade `HeroMedia`** into a true cinematic video layer:
   - Multiple `<source>` (WebM → MP4), `<picture>`-style poster as the LCP image so paint is instant
   - `playsInline muted autoPlay loop preload="metadata"` + `disableRemotePlayback` + `disablePictureInPicture`
   - Mobile source swap via `<source media="(max-width: 768px)">`
   - Respects `prefers-reduced-motion` → renders the still poster only
   - Respects `navigator.connection.saveData` / `effectiveType === '2g'` → poster only
   - IntersectionObserver pauses playback when hero scrolls offscreen (saves battery / GPU)
   - Fades the `<video>` from 0 → 1 opacity over ~600ms on `canplay`, layered above the poster — no black flash, no layout shift
   - GPU-friendly: `transform: translateZ(0)`, `will-change: opacity`, `object-fit: cover`

3. **Wire it into `Hero.tsx`** by passing the new sources. Layout, gradient overlay, and typography stay exactly as they are — the only visible change is the still becomes a slow cinematic loop.

4. **Preload hint** in `index.html` for the poster only (not the video — we never want video to compete with LCP).

## Out of scope (this pass)

- Background-loop videos in case study cards, dividers, or project teasers — those wait for additional clips.
- New `BackgroundLoopVideo` / `CinematicCardVideo` components — we'll introduce them when the second/third clip arrives so the abstraction is informed by real footage.
- Copy, color, type, or layout changes.

## Technical notes

- Encoding via `ffmpeg` in `code--exec`:
  - MP4: `-c:v libx264 -preset slow -crf 22 -pix_fmt yuv420p -movflags +faststart -an -vf scale=1920:-2`
  - WebM: `-c:v libvpx-vp9 -b:v 2M -row-mt 1 -an -vf scale=1920:-2`
  - Mobile MP4: same as MP4 but `scale=960:-2 -crf 26`
  - Poster: `-vframes 1 -q:v 3` from frame ~0.5s
- Source clip is only 7s — perfect for a seamless ambient loop. We won't trim, but we'll verify the loop point visually with a still at frame 0 vs last frame.
- Estimated final asset weight: ~3.5 MB MP4 + ~2 MB WebM + ~1 MB mobile MP4 + ~120 KB poster. Browser picks one; only poster is on the critical path.

## Verification

- `ls -lh public/hero/` to confirm sizes
- Render hero in preview, watch network tab: poster paints first, video swaps in with fade
- Throttle to Slow 3G in mind: poster alone is enough; video is progressive
- Check mobile viewport (390px) — mobile MP4 served, no jank
