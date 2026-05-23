## Enlarge intro logo 1.8×

In `src/components/fly4media/Intro.tsx`, change the `<img>` mark from 28px → 50px (28 × 1.8 = 50.4, rounded):

- `width={28}` → `width={50}`
- `height={28}` → `height={50}`
- `className="intro-mark h-7 w-7"` → `className="intro-mark h-[50px] w-[50px]"`

No other changes — hairline spacing, animation, and slogan stay as-is.