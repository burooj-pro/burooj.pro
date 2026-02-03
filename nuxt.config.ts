export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  typescript: {
    tsConfig: {
      compilerOptions: {
        // Ensure Node.js types exist for config-time imports (cross-platform).
        types: ['node'],
      },
    },
  },
  devServer: {
    port: 3001,
  },
  ssr: false, // Enable static site generation for GitHub Pages
  css: ['~/assets/css/tailwind.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n'],
  tailwindcss: {
    exposeConfig: false,
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  runtimeConfig: {
    public: {
      siteUrl: 'https://burooj.pro',
    },
  },
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json',
        dir: 'ltr',
      },
      {
        code: 'ar',
        iso: 'ar-SA',
        name: 'العربية',
        file: 'ar.json',
        dir: 'rtl',
      },
    ],
    langDir: 'locales',
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
      alwaysRedirect: false,
    },
    vueI18n: './i18n.config.ts',
  },
  app: {
    baseURL: '/burooj.pro/', // Match GitHub Pages subdirectory
    buildAssetsDir: '/_nuxt/',
    head: {
      titleTemplate: '%s · Burooj',
      title: 'Burooj — Design. Manage. Clean.',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Burooj delivers integrated construction, property management, and drone-powered cleaning solutions across Saudi Arabia.',
        },
        { name: 'theme-color', content: '#050915' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/burooj.pro/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/burooj.pro/favicon.ico' },
      ],
    },
  },
  vite: {
    resolve: {
      alias: {
        // Cross-platform file URL -> path without Node typings.
        // Windows URL.pathname includes a leading slash before the drive letter (e.g. /C:/...).
        '#app-manifest': decodeURIComponent(
          new URL('./app-manifest.stub.ts', import.meta.url).pathname.replace(/^\/([A-Za-z]:\/)/, '$1'),
        ),
      },
    },
  },
})
