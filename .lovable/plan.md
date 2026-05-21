# Fix contact modal viewport framing

## Problem
On the `/about` page (and elsewhere), opening the contact modal:
1. Form panel uses `flex items-center` + `lg:min-h-screen` + large `py-16/py-20` padding, so on shorter viewports the heading "Tell us what deserves a new perspective" sits visually **centered** — pushing the Name/Email fields below the fold.
2. User must scroll down to even see the first input.
3. On mobile, the left brand panel (`42vh`, up to `360px`) consumes the initial viewport, so the form starts off-screen.

## Fix (presentation-only, `src/components/fly4media/ContactModal.tsx`)

**Right form panel**
- Replace `flex items-center lg:min-h-screen` with top-aligned layout: `flex items-start` (no forced min-height), so the form anchors to the top of its panel rather than vertically centering.
- Reduce vertical padding so the heading + first fields fit above the fold:
  - `py-16 lg:py-20` → `py-10 lg:py-14`
  - Heading bottom margin `mb-10 lg:mb-14` → `mb-6 lg:mb-10`
- Keep horizontal padding (`px-8 lg:px-16 xl:px-20`) and max-width unchanged.

**Left brand panel (mobile only)**
- Current: `h-[42vh] min-h-[240px] max-h-[360px]` — too tall on short phones.
- New: `h-[28vh] min-h-[180px] max-h-[260px]` on mobile; desktop (`lg:`) layout unchanged (`lg:h-auto lg:min-h-screen`).
- This guarantees the form heading is visible on first paint at 375×667 and up.

**Outer scroll container**
- `overflow-y-auto` stays (form is long), but ensure the modal opens scrolled to top: add a `useEffect` on `open` that resets the scroll container's `scrollTop = 0` after mount (ref on the outer `<div>`).

**Desktop (lg+)**
- Two-column layout preserved. Form panel goes from vertically centered → top-aligned with comfortable top padding (`lg:py-14`). Looks intentional and editorial, not crammed.

## Out of scope
- No copy changes, no field changes, no submit logic changes, no styling tokens added.
- No changes to `PageShell` or any page that opens the modal.

## QA
- 375×667 (iPhone SE): brand strip ~190px, form heading + Name + Email visible without scroll.
- 928×672 (current preview): two-column, form heading at top of right panel, Name field visible.
- 1440×900: heading sits near top with generous whitespace, no awkward centering.
