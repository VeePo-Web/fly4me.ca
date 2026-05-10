## Audit results

- **No "Mitford/Worship" branding exists anywhere** in the codebase (searched all source, configs, public assets — zero matches). All meta titles, OG/Twitter cards, manifest values, and copy are already Fly4MEdia. Nothing to strip.
- **Old favicon assets in `public/`:** just `favicon.png` and `og-image-v2.png`. Single `<link rel="icon">` in `index.html` points at `/favicon.png`. No `.ico`, no Apple touch icon, no `site.webmanifest`.

## Plan

### 1. Generate new drone artwork
- **Favicon mark** (`public/favicon.png`, 512×512, transparent): minimalist top-down monochrome drone silhouette — four arms, central body, near-black on transparent. Editorial, geometric, instantly readable at 16×16. Premium quality.
- **Apple touch icon** (`public/apple-touch-icon.png`, 180×180): same mark on white background (iOS rejects transparency).
- **OG social card** (`public/og-image-v2.png`, 1200×630, overwrite): drone mark top-left, large "Fly4MEdia" wordmark + "Perspective Changes Everything." underneath, monochrome on white, generous whitespace. Premium model for legible typography.

### 2. Wire it up in `index.html`
Replace the single icon link with a complete favicon stack:
```html
<link rel="icon" type="image/png" sizes="any" href="/favicon.png" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```
Keep existing OG/Twitter tags; they already point at `/og-image-v2.png` (no change needed since we overwrite in place).

### 3. Cleanup
- No files to delete — only `favicon.png` and `og-image-v2.png` exist and both get overwritten.
- Verify no lingering references: `rg "favicon|og-image|apple-touch" -n` after the swap.

### Out of scope
- Logo component changes inside the app (header wordmark stays text-based per design system).
- Renaming `og-image-v2.png` → `og-image.png` (would require updating any cached social previews; safer to overwrite in place).

### Verification
- Hard-refresh preview, confirm new favicon appears in browser tab.
- View `/og-image-v2.png` directly — confirm new artwork.
- `rg -i "mitford|worship"` → still zero matches.
