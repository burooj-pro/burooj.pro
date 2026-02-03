// Workaround for Nuxt dev + Vite resolving `#app-manifest`.
// Nuxt includes a dead-code dynamic import in `nuxt/dist/app/composables/manifest.js`,
// but Vite still tries to resolve it during import analysis.
//
// This module should never be executed at runtime (the import is behind `if (false)`),
// but it must exist to keep Vite's pre-transform step happy.
export default {}

