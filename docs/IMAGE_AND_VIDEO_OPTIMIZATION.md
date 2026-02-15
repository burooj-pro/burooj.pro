# Image and video optimization

## Images

### 1. Make files smaller

- **Format:** Use WebP (and optionally AVIF) for much smaller size than PNG/JPEG.
- **Don’t overserve:** Avoid shipping a 4000px image into a 600px container.
- **Responsive sizes:** Use `srcset` so the browser can choose the right width.

**Script (recommended):** Run before deploy:

```bash
npm run optimize-images
```

This uses [sharp](https://sharp.pixelplumbing.com/) to generate WebP at 400, 800, 1200, 1920px from `public/images/hero-image.png` and writes `hero-image-400w.webp`, etc. The site uses these in `<picture>` + `srcset` for hero/CTA images.

**Targets:**

- Section images: ~100–250 KB
- Hero image: ~250–500 KB (quality 82, multiple widths)

To add more source images, edit `scripts/optimize-images.mjs` and add entries to the `PRESETS` array.

### 2. Load only what’s needed

- **Above-the-fold hero:** `fetchpriority="high"`, `loading="eager"`, and a **poster** (or placeholder) so the browser reserves space and shows something immediately.
- **Below-the-fold:** `loading="lazy"`, `decoding="async"`.

The app already does this:

- Hero (home, about): priority image when video is off/failed; video has `poster` so there’s no blank space.
- CTA and other images: lazy.

---

## Video

### 1. Prefer WebM (VP9/AV1) + MP4 fallback

- Use `<video>` with `<source type="video/webm">` first and `<source type="video/mp4">` as fallback so modern browsers get smaller WebM.
- Keep hero loops **short (3–6 s)** and aim for **&lt; 2–4 MB** per file if possible.

**Example FFmpeg for WebM (VP9):**

```bash
ffmpeg -i hero.MOV -c:v libvpx-vp9 -crf 35 -b:v 0 -an -y hero.webm
```

Then in the template:

```html
<source :src="`${baseURL}videos/hero.webm`" type="video/webm" />
<source :src="`${baseURL}videos/hero.mp4`" type="video/mp4" />
```

### 2. CRF-based encoding

- **CRF** gives a better quality/size balance than fixed bitrate. The existing `npm run convert-hero-video` script uses **CRF 28** for the MP4.
- For WebM (VP9), CRF 30–35 is a good range.

### 3. Poster and reserved space

- Every hero/CTA `<video>` uses a **poster** (`:poster="…hero-image.png"`) so the first frame (or poster image) shows before the file loads.
- The video container has a fixed aspect (full-bleed) so layout doesn’t jump.

---

## Checklist

- [ ] Run `npm run optimize-images` before deploy so WebP srcset files exist.
- [ ] Hero/CTA videos have `poster` and short loops; consider adding WebM next to MP4.
- [ ] Hero images use priority; everything else uses lazy.
- [ ] All images have width/height (or aspect-ratio) and a placeholder (e.g. `bg-slate-200`) where used.
