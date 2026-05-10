# Hero video sequence — current clip → new uploaded clip (loop)

The user wants the existing hero video to play through once, then seamlessly hand off to the new uploaded clip (`DJI_0398.MP4`), which then loops. Today, `<HeroMedia>` plays a single set of `<source>` tags with `loop` always on. We need a sequence.

**Note on the upload**: it's a vertical 720×1280 / 40s / 15MB H.264 file. In a landscape hero with `object-cover`, the sides will be cropped heavily and only a narrow center slice will be visible. That's a product decision — flagging once, then proceeding as requested.

One file change + one new asset. No animation libraries, no design changes.

---

## Changes

### 1. Add the asset
- `code--copy user-uploads://DJI_0398.MP4` → `public/hero/dji-0398.mp4`.
- Stays in `public/` (referenced as a static URL like the other hero clips).

### 2. `src/components/fly4media/HeroMedia.tsx` — add a queued second clip
- New optional prop `nextSources?: VideoSource[]`. When present:
  - First clip plays with `loop={false}`.
  - On the video's `onEnded`, swap the `<source>` list to `nextSources`, set `loop=true`, call `videoEl.load()` then `videoEl.play()`.
  - Track which clip is active in `useState<'first' | 'next'>('first')` so the `key` on `<video>` flips, React rerenders the source children cleanly, and we attach a one-shot `onEnded` only when `phase === 'first'`.
- When `nextSources` is absent (every other hero on the site — case studies etc.), behavior is unchanged: single clip, `loop={true}`. Backward compatible.
- Keep all existing behavior: poster paints first as LCP, fade-in on `canPlay`, IntersectionObserver pause/play, reduced-motion + Save-Data bail-outs, `playsInline`, `muted`, `disableRemotePlayback`, `disablePictureInPicture`.
- Crossfade polish: when phase swaps to `next`, briefly drop opacity to 0 and let the existing 700ms `canPlay` opacity transition fade the second clip back in. No new CSS — reuse the existing `ready` state path by resetting it on swap.

### 3. `src/components/fly4media/Hero.tsx` — wire the second clip
- Add `nextSources={[{ src: "/hero/dji-0398.mp4", type: "video/mp4" }]}` to the existing `<HeroMedia>` invocation. Existing `sources` array (mobile mp4 / webm / mp4) untouched.

---

## What does NOT change

- The Intro veil component (`src/components/fly4media/Intro.tsx`) — untouched. The user's brief was about the hero video sequence, not the text intro.
- All other hero/usage sites of `HeroMedia` (case studies, About hero) — `nextSources` is opt-in.
- Hero copy, layout, gradients, CTAs.
- The poster image — same `hero` asset stays as the LCP painter and as the swap-state poster.

---

## Verification

- Hard reload `/` — first hero clip plays through, then visibly hands off to the new clip with a soft crossfade; new clip then loops indefinitely.
- DevTools Network — second clip fetched (lazy is fine; `preload="metadata"` keeps initial weight low).
- Reduced-motion / Save-Data — both clips suppressed, poster only (existing behavior preserved).
- Tab away and back — IntersectionObserver still pauses/plays the active clip.
- Other pages with `<HeroMedia>` (no `nextSources`) — behavior unchanged.
