# Performance

## What’s already in place

- **LCP preload:** Hero fallback image is preloaded for faster First Contentful Paint / LCP.
- **Image loading:** Below-the-fold images use `loading="lazy"` and `decoding="async"`; project hero images use `fetchpriority="high"` where they are the LCP.
- **Image dimensions:** `width` and `height` are set on images to reduce layout shift and reflow.
- **Forced reflow:** Counter animation in GSAP runs the layout read (`getBoundingClientRect`) inside `requestAnimationFrame` to avoid layout thrashing.
- **JS dedupe:** Vite `resolve.dedupe` is set for `vue`, `vue-i18n`, and `gsap` to avoid duplicate chunks.

## Improve image delivery (~28 MB potential savings)

Lighthouse’s “Improve image delivery” mainly comes from **large, unoptimized images** (e.g. big PNGs in `public/images/projects/`). To capture most of that savings:

1. **Compress and convert to WebP**
   - Use [Squoosh](https://squoosh.app/), or a script/tool that:
     - Converts PNG/JPEG to WebP (quality ~80–85).
     - Optionally resizes to max width 1920 (or 1200 for cards) so you don’t ship 4K assets when not needed.
   - Keep originals and add a build step that outputs WebP (and optionally resized) under e.g. `public/images/` and point the app to those.

2. **Responsive images**
   - For critical images (e.g. hero, first project image), consider `srcset` with 1x/2x or different widths so mobile doesn’t download desktop-sized files. You can generate these in the same build step as above.

3. **CDN / image service (optional)**
   - For more automation, you can use a CDN or image API (e.g. Cloudinary, imgix) that serves WebP and resized images by URL params, and point your `<img src>` (or `<NuxtImg>` if you add `@nuxt/image`) to those URLs.

## DOM size

If “Optimize DOM size” still appears:

- Avoid rendering huge lists (e.g. hundreds of nodes) at once; use virtualization or pagination if you add long lists later.
- Keep project gallery markup lean; the current lazy loading and dimensions already help.

## Re-running audits

- Use Chrome DevTools **Lighthouse** (Performance) and **Performance** panel (record a trace) to re-check after changes.
- Re-test on a throttled connection and mobile device to validate LCP and TBT.
