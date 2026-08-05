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
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'https://sixdegreescms-production.up.railway.app',
      siteUrl: 'https://burooj.pro',
      pipedriveFormUrl:
        'https://webforms.pipedrive.com/f/6W8B7uZHws18uQtXpbXhoS7DhXv8sUTQlw9zzy8SYAESjOJ1MNxMfXt9X4ZqryjL2j',
      pipedriveLoaderSrc: 'https://webforms.pipedrive.com/f/loader',
    },
  },
  devServer: {
    port: 3001,
  },
  ssr: false, // Enable static site generation for GitHub Pages
  css: ['~/assets/css/tailwind.css'],
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/i18n', '@nuxt/eslint'],
  tailwindcss: {
    exposeConfig: false,
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
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
    baseURL: '/', // Custom domain burooj.pro — served from root
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
        {
          'http-equiv': 'Content-Security-Policy',
          content: [
            "default-src 'self'",
            "script-src 'self' 'unsafe-inline' https://webforms.pipedrive.com",
            "style-src 'self' 'unsafe-inline'",
            "img-src 'self' data: blob: https: http://localhost:1337 https://sixdegreescms-production.up.railway.app",
            "font-src 'self'",
            "media-src 'self'",
            "frame-src https://webforms.pipedrive.com",
            "connect-src 'self' https://*.pipedrive.com http://localhost:1337 https://sixdegreescms-production.up.railway.app",
          ].join('; '),
        },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', href: '/favicon.ico' },
        // Preload LCP: hero video (or fallback image) for faster First Contentful Paint / LCP
        { rel: 'preload', as: 'image', href: '/images/hero-image.webp', fetchpriority: 'high' },
        // Preconnect to Pipedrive CDN to reduce DNS + TCP delay on contact page
        { rel: 'preconnect', href: 'https://webforms.pipedrive.com' },
      ],
      script: [
        // Synchronously set dir/lang before first paint to avoid RTL FOUC on Arabic routes
        {
          innerHTML:
            "(function(){var p=window.location.pathname;if(p.includes('/ar/')||p.endsWith('/ar')){document.documentElement.setAttribute('dir','rtl');document.documentElement.setAttribute('lang','ar');}})();",
          type: 'text/javascript',
        },
        // schema.org LocalBusiness + Organization structured data
        {
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'Organization',
                '@id': 'https://burooj.pro/#organization',
                name: 'Burooj',
                url: 'https://burooj.pro',
                logo: 'https://burooj.pro/favicon.ico',
                sameAs: [
                  'https://www.instagram.com/buroojsa',
                  'https://x.com/buroojsa',
                ],
                contactPoint: {
                  '@type': 'ContactPoint',
                  telephone: '+966-54-836-6111',
                  contactType: 'customer service',
                  areaServed: 'SA',
                  availableLanguage: ['Arabic', 'English'],
                },
              },
              {
                '@type': 'LocalBusiness',
                '@id': 'https://burooj.pro/#localbusiness',
                name: 'Burooj',
                description:
                  'Burooj delivers integrated construction, property management, and drone-powered cleaning solutions across Saudi Arabia.',
                url: 'https://burooj.pro',
                telephone: '+966-54-836-6111',
                address: {
                  '@type': 'PostalAddress',
                  addressCountry: 'SA',
                  addressRegion: 'Eastern Province',
                },
                geo: {
                  '@type': 'GeoCoordinates',
                  latitude: '26.4207',
                  longitude: '50.0888',
                },
                priceRange: '$$',
                hasMap: 'https://maps.google.com/?q=Al+Khobar,+Saudi+Arabia',
              },
            ],
          }),
        },
      ],
    },
  },
  vite: {
    build: {
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    resolve: {
      dedupe: ['vue', 'vue-i18n', 'gsap'],
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