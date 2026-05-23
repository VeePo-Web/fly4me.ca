# Replay intro on logo click

Make the header logo (drone mark + "Fly4MEdia" wordmark) re-trigger the cinematic intro animation, similar to the Worship In The Park reference.

## Behavior

- Clicking the logo on any route navigates to `/` and replays the full `Intro` "Threshold" sequence — even if the user has already seen it this session.
- On routes other than `/`, it first routes home, then plays the intro.
- Respects `prefers-reduced-motion` and the `?nointro` query param (still skipped in those cases).
- Keyboard accessible: Enter/Space on the logo link triggers the same behavior.

## Technical changes

**`src/components/fly4media/Intro.tsx`**
- Replace the `useState` initializer's `sessionStorage` gate with a check that also honors a one-shot `"f4m:intro:replay"` flag in `sessionStorage`. If the replay flag is set, the intro mounts regardless of `SESSION_KEY`, then clears the flag.
- Listen for a new `window` event `f4m:intro:replay`. When received (and not currently mounted, no reduced motion), set `mounted = true`, reset `phase` to `"anchor"`, reset `counter`, and reset `finishedRef.current = false` so the existing effect re-runs the timeline cleanly.
- Ensure cleanup of timers/raf when re-mounting mid-sequence.

**`src/components/fly4media/Header.tsx`**
- Change the brand `<Link to="/">` `onClick` so that:
  1. Sets `sessionStorage["f4m:intro:replay"] = "1"`.
  2. If already on `/`: `event.preventDefault()`, scroll to top instantly, dispatch `window.dispatchEvent(new CustomEvent("f4m:intro:replay"))`.
  3. If on another route: let the `Link` navigate to `/`; `Index` mounts `<Intro />`, which reads the replay flag on init and plays.
- Keep existing hover/scale styling untouched.

**No CSS changes.** All keyframes/timeline already exist.

## Notes

- Using a sessionStorage flag (not just the event) covers the cross-route case where `<Intro />` unmounts/mounts during navigation.
- The intro's body-scroll lock, Escape/Enter skip, and Skip button continue to work on replays.
