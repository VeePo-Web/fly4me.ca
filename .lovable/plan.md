
# Nav: fantasy.co register

## The move

Strip the desktop nav of its visible link list. Replace it with the same two anchors fantasy.co uses: **wordmark top-left, "Menu" top-right.** That single edit upgrades the page's silence — the hero is no longer competing with four links for attention.

The page becomes the work. The nav becomes a door.

## Top-left — the brand mark

Keep the logo + "Fly4MEdia" wordmark. Make both legible against the dark hero without lighting up the whole header.

- Logo upgrade: bump from `size-6 md:size-7` to `size-7 md:size-8`, add a soft drop-shadow over media (`drop-shadow: 0 1px 12px rgba(0,0,0,0.35)`) that fades to 0 once the header passes the hero (drive off existing `--nav-progress`)
- Wordmark: same color treatment — text uses a `mix-blend-mode: difference` adjacent layer over hero, or simpler: a CSS variable color that interpolates from `rgba(255,255,255,0.92)` over hero to `hsl(var(--foreground))` after scroll. Drive off `--nav-progress`.
- Result: crisp white wordmark on the video, switches to ink on white once the page scrolls. No background plate, no blur, no chrome.

## Top-right — "Menu"

Replace the three inline links + Contact button with a single word: **Menu**.

- `t-nav` weight, same color logic as wordmark (white over hero → ink after scroll)
- To the left of the word: two stacked 18px hairlines (the same vocabulary as today's mobile hamburger, but desktop-sized). On hover they shift — top line slides right 2px, bottom slides left 2px — a tiny editorial tell.
- Click opens a **full-viewport overlay menu**, not a dropdown. This is the fantasy.co register: the overlay is a moment, not a utility.

## The overlay (the actual fantasy.co feel)

This is what makes it feel like fantasy.co rather than a stripped-down navbar.

- Veil: `bg-[#0a0a0a]` matching the intro veil. Same vocabulary as the cinematic intro — the menu is "the same studio, looked at differently."
- Reveal: 320ms wipe from top, `cubic-bezier(0.22, 1, 0.36, 1)`. Veil arrives first, content cascades second.
- Layout: **left column** — oversized link list (`t-display-2`, ~80–96px), each link on its own line, hover state slides the link 14px right with a hairline drawing under it left-to-right (300ms). **Right column** — small editorial block: Alberta coords, contact email, phone, "Available worldwide". Spatially echoes the bottom-bar of the hero.
- Per-word reveal on each link: same blur-to-sharp cascade as the new hero lede (60ms stagger between links, 1100ms duration). The menu and the hero share one motion language.
- Close: small × top-right, plus Esc key, plus click on veil
- Body scroll lock while open
- Active route gets a thin left rule (2px tall, 16px wide) instead of an underline — quieter, more permanent

## Mobile

Mobile already uses a hamburger → drawer pattern that's close. Upgrade it to use the **same full-viewport overlay** as desktop (one component, one feel). Drop the accordion grid trick — overlay is simpler and more cinematic.

## Scroll behavior (keep)

- Direction-aware hide past 240px stays
- `--nav-progress` continues to drive color interpolation (now drives wordmark/Menu color crossfade, not background opacity)
- Header gets a near-invisible scrim only over media-heavy pages: `linear-gradient(to bottom, rgba(0,0,0,0.18), transparent)` clipped to 88px, fades out as you scroll past hero. No blur, no plate.

## What gets removed

- Inline desktop links (Work / Services / About / Contact)
- Mobile drawer accordion
- The `border-l` divider before Contact
- The `.bg-background/95` plate when mobile menu is open (replaced by full overlay)

## Files touched

- `src/components/fly4media/Header.tsx` — gut the desktop nav, swap mobile drawer for overlay trigger, add color-interp via `--nav-progress`
- `src/components/fly4media/MenuOverlay.tsx` — new component, shared desktop + mobile
- `src/index.css` — small additions: `--nav-ink` interpolated color custom prop driven off `--nav-progress`, scrim utility

## What I want you to confirm

1. Are you OK losing the visible Work / Services / About from the top bar entirely? (This is the fantasy.co move — discoverability moves into the overlay.)
2. Should the overlay show **just the links** (Work, Services, About, Contact) or also include the editorial right-column (coords, email, phone)?
3. Keep the wordmark "Fly4MEdia" beside the logo, or **logo only** top-left (most fantasy.co-like — even more silent)?
