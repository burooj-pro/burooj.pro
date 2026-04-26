import { writeFileSync } from 'fs'

const BASE = 'https://burooj.pro'
const NOW = new Date().toISOString().split('T')[0]

const staticRoutes = [
  { path: '/', priority: '1.0', changefreq: 'weekly' },
  { path: '/about', priority: '0.8', changefreq: 'monthly' },
  { path: '/projects', priority: '0.9', changefreq: 'weekly' },
  { path: '/services', priority: '0.9', changefreq: 'monthly' },
  { path: '/contact', priority: '0.7', changefreq: 'monthly' },
  { path: '/privacy-policy', priority: '0.3', changefreq: 'yearly' },
  { path: '/terms-and-conditions', priority: '0.3', changefreq: 'yearly' },
]

const projectSlugs = [
  'efficiency-center-khobar',
  'albahar-villas',
  'private-shalet',
  'gdc',
  'albarghash',
  'al-fakhreyah-villa-project',
  'roaya',
  'thabat',
  'ec',
  'tulip-spa',
  'mada-tower',
]

const serviceCategories = [
  'construction-engineering',
  'property-management',
  'drone-cleaning',
]

const allRoutes = [
  ...staticRoutes,
  ...projectSlugs.map((s) => ({ path: `/projects/${s}`, priority: '0.7', changefreq: 'monthly' })),
  ...serviceCategories.map((c) => ({ path: `/services/${c}`, priority: '0.8', changefreq: 'monthly' })),
]

// Include Arabic locale versions for every route
const locales = ['', '/ar']
const urls = locales.flatMap((locale) =>
  allRoutes.map(({ path, priority, changefreq }) => {
    const loc = `${BASE}${locale}${path}`
    return `  <url>
    <loc>${loc}</loc>
    <lastmod>${NOW}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`
  })
)

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join('\n')}
</urlset>
`

writeFileSync('public/sitemap.xml', xml)
console.log(`✔ sitemap.xml generated with ${urls.length} URLs`)
