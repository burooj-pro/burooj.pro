# Deploy — Burooj

## GitHub Pages (CI)

Pushing to `main` or `master` triggers the workflow in `.github/workflows/deploy.yml`. It:

1. Installs dependencies (`npm ci`)
2. Runs **image optimization** (`npm run optimize-images`) — generates WebP hero images
3. Runs **static generate** (`npm run generate`) — outputs to `.output/public`
4. Uploads `.output/public` as the GitHub Pages artifact and deploys

**Site URL:** `https://<username>.github.io/burooj.pro/` (or your configured Pages URL).

## Deploy locally (manual)

If you deploy the folder yourself (e.g. to another host):

```bash
npm ci
npm run optimize-images   # optional but recommended for smaller hero images
npm run generate
```

Then upload the contents of **`.output/public`** to your host. The app uses `baseURL: '/burooj.pro/'`; if your site is served at a different path, change `app.baseURL` in `nuxt.config.ts` and rebuild.

## Checklist before deploy

- [ ] `nuxt.config.ts` has the correct `app.baseURL` for your host path
- [ ] WebP hero images are generated (CI runs `optimize-images`; for manual deploy run it yourself)
- [ ] No uncommitted changes you need for this release (or commit and push to trigger CI)
