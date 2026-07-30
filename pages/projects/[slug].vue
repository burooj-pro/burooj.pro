<script setup lang="ts">
const { t, locale } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const config = useRuntimeConfig()
const baseURL = config.app.baseURL || '/'

const { getProjectBySlug, getLocalizedProject } = useProjects()

// Get slug from route params - handle both array and string
const projectSlug = Array.isArray(route.params.slug) 
  ? route.params.slug[0] 
  : (route.params.slug as string)

const project = getProjectBySlug(projectSlug)

// --- Strapi fallback: مشاريع جديدة مضافة من سترابي ومو موجودة بالبيانات الثابتة ---
const { data: siteData, pending: siteDataPending } = useSiteData('burooj')
const strapiProjectsList = useStrapiProjects(siteData)
const strapiProject = computed(() => {
  if (project) return null
  return strapiProjectsList.value.find((p: any) => p.slug === projectSlug) ?? null
})

const strapiField = (obj: any, base: string) =>
  obj?.[`${base}_${locale.value}`] ?? obj?.[`${base}_en`] ?? ''

const strapiServices = computed(() => {
  return (strapiProject.value?.services ?? []).map((s: any) => strapiField(s, 'name'))
})

const strapiCards = computed(() => {
  return (strapiProject.value?.cards ?? []).map((card: any) => ({
    description: strapiField(card, 'description'),
    images: (card.images ?? []).map((img: any) => useStrapiImage(img?.url)),
    imagePosition: card.image_position === 'above' ? 'above' : 'below', // من سترابي، تتحكمين فيه يدوياً بكل card
  }))
})

const strapiHeroImage = computed(() =>
  useStrapiImage(strapiProject.value?.background?.url || strapiProject.value?.thumbnail?.url),
)

const strapiGridClass = (count: number) => {
  if (count === 2) return 'grid gap-6 grid-cols-1 md:grid-cols-2'
  if (count === 4) return 'grid gap-6 grid-cols-2'
  return ''
}

const getCategoryLabel = (category: string) => {
  if (category === 'Construction & Engineering') return t('projects.constructionEngineering')
  if (category === 'Property Management') return t('projects.propertyManagement')
  if (category === 'Drone Cleaning') return t('projects.droneCleaning')
  return category
}

const localizedProject = computed(() => (project ? getLocalizedProject(project) : null))
const isProjectOne = computed(() => projectSlug === 'albahar-villas')

const galleryImages = computed(() => {
  const imgs = localizedProject.value?.images ?? []
  // De-dupe while preserving order
  const seen = new Set<string>()
  const unique: string[] = []
  for (const img of imgs) {
    if (!img || seen.has(img)) continue
    seen.add(img)
    unique.push(img)
  }
  return unique
})

const shouldShowFullWidthImage = computed(() => {
  const full = localizedProject.value?.fullWidthImage
  if (!full) return false
  // AlBarghash: 2/14 is shown in project2FinalBlockImages, so don't show again at end
  if (project2FinalBlockImages.value.length === 3) return false
  // Roaya: 9/6 is shown in project9TailPairImages, so don't show again at end
  if (project9TailPairImages.value.length === 2) return false
  return !galleryImages.value.includes(full)
})

const diagramPairImages = computed(() => {
  // Special case: Hay Albahar Villas diagrams should be side-by-side.
  if (projectSlug !== 'albahar-villas') return [] as string[]

  const diagram3 = galleryImages.value.find((img) => img.endsWith('/images/projects/1/3.webp'))
  const diagram9 = galleryImages.value.find((img) => img.endsWith('/images/projects/1/9.webp'))
  if (!diagram3 || !diagram9) return [] as string[]
  return [diagram3, diagram9]
})

const tailPairImages = computed(() => {
  // Special case: keep these two images together for Project 1.
  if (projectSlug !== 'albahar-villas') return [] as string[]

  const img13 = galleryImages.value.find((img) => img.endsWith('/images/projects/1/13.webp'))
  const img14 = galleryImages.value.find((img) => img.endsWith('/images/projects/1/14.webp'))
  if (!img13 || !img14) return [] as string[]
  return [img13, img14]
})

const midPairImages = computed(() => {
  // Special case: keep these two images together for Project 1.
  if (projectSlug !== 'albahar-villas') return [] as string[]

  const img10 = galleryImages.value.find((img) => img.endsWith('/images/projects/1/10.webp'))
  const img12 = galleryImages.value.find((img) => img.endsWith('/images/projects/1/12.webp'))
  if (!img10 || !img12) return [] as string[]
  return [img10, img12]
})

const quadImages = computed(() => {
  // Special case: keep these four images together for Project 1.
  if (projectSlug !== 'albahar-villas') return [] as string[]

  const img4 = galleryImages.value.find((img) => img.endsWith('/images/projects/1/4.webp'))
  const img5 = galleryImages.value.find((img) => img.endsWith('/images/projects/1/5.webp'))
  const img6 = galleryImages.value.find((img) => img.endsWith('/images/projects/1/6.webp'))
  const img7 = galleryImages.value.find((img) => img.endsWith('/images/projects/1/7.webp'))
  if (!img4 || !img5 || !img6 || !img7) return [] as string[]
  return [img4, img5, img6, img7]
})

// GDC (efficiency-center-khobar): 2x2 grid of 6/3, 6/4, 6/5, 6/11
const gdcQuadImages = computed(() => {
  if (projectSlug !== 'efficiency-center-khobar') return [] as string[]

  const img3 = galleryImages.value.find((img) => img.endsWith('/images/projects/6/3.webp'))
  const img4 = galleryImages.value.find((img) => img.endsWith('/images/projects/6/4.webp'))
  const img5 = galleryImages.value.find((img) => img.endsWith('/images/projects/6/5.webp'))
  const img11 = galleryImages.value.find((img) => img.endsWith('/images/projects/6/11.webp'))
  if (!img3 || !img4 || !img5 || !img11) return [] as string[]
  return [img3, img4, img5, img11]
})

// GDC (efficiency-center-khobar): side-by-side pair 6/12, 6/13
const gdcTailPairImages = computed(() => {
  if (projectSlug !== 'efficiency-center-khobar') return [] as string[]

  const img12 = galleryImages.value.find((img) => img.endsWith('/images/projects/6/12.webp'))
  const img13 = galleryImages.value.find((img) => img.endsWith('/images/projects/6/13.webp'))
  if (!img12 || !img13) return [] as string[]
  return [img12, img13]
})

// Project 4 (private-shalet): 2x2 grid of 4/3, 4/4, 4/5, 4/6
const project4QuadImages = computed(() => {
  if (projectSlug !== 'private-shalet') return [] as string[]

  const img3 = galleryImages.value.find((img) => img.endsWith('/images/projects/4/3.webp'))
  const img4 = galleryImages.value.find((img) => img.endsWith('/images/projects/4/4.webp'))
  const img5 = galleryImages.value.find((img) => img.endsWith('/images/projects/4/5.webp'))
  const img6 = galleryImages.value.find((img) => img.endsWith('/images/projects/4/6.webp'))
  if (!img3 || !img4 || !img5 || !img6) return [] as string[]
  return [img3, img4, img5, img6]
})

// Project 4 (private-shalet): side-by-side pair 4/10, 4/11
const project4TailPairImages = computed(() => {
  if (projectSlug !== 'private-shalet') return [] as string[]

  const img10 = galleryImages.value.find((img) => img.endsWith('/images/projects/4/10.webp'))
  const img11 = galleryImages.value.find((img) => img.endsWith('/images/projects/4/11.webp'))
  if (!img10 || !img11) return [] as string[]
  return [img10, img11]
})

// Project 9 (roaya): side-by-side pair 9/5, 9/6
const project9TailPairImages = computed(() => {
  if (projectSlug !== 'roaya') return [] as string[]

  const img5 = galleryImages.value.find((img) => img.endsWith('/images/projects/9/5.webp'))
  const img6 = galleryImages.value.find((img) => img.endsWith('/images/projects/9/6.webp'))
  if (!img5 || !img6) return [] as string[]
  return [img5, img6]
})

// Project 5 (gdc co-working): 2x2 grid of 5/3, 5/4, 5/5, 5/6
const project5QuadImages = computed(() => {
  if (projectSlug !== 'gdc') return [] as string[]

  const img3 = galleryImages.value.find((img) => img.endsWith('/images/projects/5/3.webp'))
  const img4 = galleryImages.value.find((img) => img.endsWith('/images/projects/5/4.webp'))
  const img5 = galleryImages.value.find((img) => img.endsWith('/images/projects/5/5.webp'))
  const img6 = galleryImages.value.find((img) => img.endsWith('/images/projects/5/6.webp'))
  if (!img3 || !img4 || !img5 || !img6) return [] as string[]
  return [img3, img4, img5, img6]
})

// Project 2 (albarghash): 2/1 full width, then 2/2 and 2/3 side by side
const project2CigarRoomImages = computed(() => {
  if (projectSlug !== 'albarghash') return [] as string[]

  const img1 = galleryImages.value.find((img) => img.endsWith('/images/projects/2/1.webp'))
  const img2 = galleryImages.value.find((img) => img.endsWith('/images/projects/2/2.webp'))
  const img3 = galleryImages.value.find((img) => img.endsWith('/images/projects/2/3.webp'))
  if (!img1 || !img2 || !img3) return [] as string[]
  return [img1, img2, img3]
})

// Project 2 (albarghash): 2/9–2/13 and 2/15 showcased together with description below
const project2ShowcaseImages = computed(() => {
  if (projectSlug !== 'albarghash') return [] as string[]

  const imgs = [9, 10, 11, 12, 13, 15].map((n) =>
    galleryImages.value.find((img) => img.endsWith(`/images/projects/2/${n}.webp`))
  )
  if (imgs.some((i) => !i)) return [] as string[]
  return imgs as string[]
})

// Project 2 (albarghash): 2/6, 2/5, 2/8, 2/7 together in 2x2 after showcase section
const project2QuadImages = computed(() => {
  if (projectSlug !== 'albarghash') return [] as string[]

  const img6 = galleryImages.value.find((img) => img.endsWith('/images/projects/2/6.webp'))
  const img5 = galleryImages.value.find((img) => img.endsWith('/images/projects/2/5.webp'))
  const img8 = galleryImages.value.find((img) => img.endsWith('/images/projects/2/8.webp'))
  const img7 = galleryImages.value.find((img) => img.endsWith('/images/projects/2/7.webp'))
  if (!img6 || !img5 || !img8 || !img7) return [] as string[]
  return [img6, img5, img8, img7]
})

// Project 2 (albarghash): 2/14 full width, then 2/16 and 2/17 side by side
const project2FinalBlockImages = computed(() => {
  if (projectSlug !== 'albarghash') return [] as string[]

  const img14 = galleryImages.value.find((img) => img.endsWith('/images/projects/2/14.webp'))
  const img16 = galleryImages.value.find((img) => img.endsWith('/images/projects/2/16.webp'))
  const img17 = galleryImages.value.find((img) => img.endsWith('/images/projects/2/17.webp'))
  if (!img14 || !img16 || !img17) return [] as string[]
  return [img14, img16, img17]
})

// Project 2 (albarghash): 2/4, 2/18–2/22 together after final block
const project2SixImages = computed(() => {
  if (projectSlug !== 'albarghash') return [] as string[]

  const imgs = [4, 18, 19, 20, 21, 22].map((n) =>
    galleryImages.value.find((img) => img.endsWith(`/images/projects/2/${n}.webp`))
  )
  if (imgs.some((i) => !i)) return [] as string[]
  return imgs as string[]
})

// Project 3 (al-fakhreyah-villa-project): 3/1 full width, then 3/2 and 3/3 side by side
const project3HeroImages = computed(() => {
  if (projectSlug !== 'al-fakhreyah-villa-project') return [] as string[]

  const img1 = galleryImages.value.find((img) => img.endsWith('/images/projects/3/1.webp'))
  const img2 = galleryImages.value.find((img) => img.endsWith('/images/projects/3/2.webp'))
  const img3 = galleryImages.value.find((img) => img.endsWith('/images/projects/3/3.webp'))
  if (!img1 || !img2 || !img3) return [] as string[]
  return [img1, img2, img3]
})

// Project 8 (thabat): 8/1 full width, then 8/2 and 8/3 side by side
const project8HeroImages = computed(() => {
  if (projectSlug !== 'thabat') return [] as string[]

  const img1 = galleryImages.value.find((img) => img.endsWith('/images/projects/8/1.webp'))
  const img2 = galleryImages.value.find((img) => img.endsWith('/images/projects/8/2.webp'))
  const img3 = galleryImages.value.find((img) => img.endsWith('/images/projects/8/3.webp'))
  if (!img1 || !img2 || !img3) return [] as string[]
  return [img1, img2, img3]
})

// Project 7 (tulip-spa): 7/3 full width, then 7/1 and 7/2 side by side
const project7HeroImages = computed(() => {
  if (projectSlug !== 'tulip-spa') return [] as string[]

  const img3 = galleryImages.value.find((img) => img.endsWith('/images/projects/7/3.webp'))
  const img1 = galleryImages.value.find((img) => img.endsWith('/images/projects/7/1.webp'))
  const img2 = galleryImages.value.find((img) => img.endsWith('/images/projects/7/2.webp'))
  if (!img1 || !img2 || !img3) return [] as string[]
  return [img3, img1, img2]
})

// Project EC (efficiency-center): 10/3, 10/4 together as pair
const projectECPairImages = computed(() => {
  if (projectSlug !== 'ec') return [] as string[]

  const img3 = galleryImages.value.find((img) => img.endsWith('/images/projects/10/3.webp'))
  const img4 = galleryImages.value.find((img) => img.endsWith('/images/projects/10/4.webp'))
  if (!img3 || !img4) return [] as string[]
  return [img3, img4]
})

// Project EC: 10/5, 10/9 together as pair
const projectECFinalPairImages = computed(() => {
  if (projectSlug !== 'ec') return [] as string[]

  const img5 = galleryImages.value.find((img) => img.endsWith('/images/projects/10/5.webp'))
  const img9 = galleryImages.value.find((img) => img.endsWith('/images/projects/10/9.webp'))
  if (!img5 || !img9) return [] as string[]
  return [img5, img9]
})

// Mada Tower: Group all images into pairs
const madaTowerImagePairs = computed(() => {
  if (projectSlug !== 'mada-tower') return [] as string[][]
  
  const pairs: string[][] = []
  const images = galleryImages.value.filter(img => 
    img.includes('/images/projects/11/')
  )
  
  // Group images into pairs
  for (let i = 0; i < images.length; i += 2) {
    if (i + 1 < images.length) {
      pairs.push([images[i], images[i + 1]])
    } else {
      // If odd number, last image alone
      pairs.push([images[i]])
    }
  }
  
  return pairs
})

const galleryImagesForLayout = computed(() => {
  const remove = new Set<string>()

  if (projectSlug === 'albahar-villas') {
    if (diagramPairImages.value.length === 2) {
      remove.add('/images/projects/1/3.webp')
      remove.add('/images/projects/1/9.webp')
    }
    if (tailPairImages.value.length === 2) {
      remove.add('/images/projects/1/13.webp')
      remove.add('/images/projects/1/14.webp')
    }
    if (midPairImages.value.length === 2) {
      remove.add('/images/projects/1/10.webp')
      remove.add('/images/projects/1/12.webp')
    }
    if (quadImages.value.length === 4) {
      remove.add('/images/projects/1/4.webp')
      remove.add('/images/projects/1/5.webp')
      remove.add('/images/projects/1/6.webp')
      remove.add('/images/projects/1/7.webp')
    }
  }

  if (projectSlug === 'efficiency-center-khobar') {
    if (gdcQuadImages.value.length === 4) {
      remove.add('/images/projects/6/3.webp')
      remove.add('/images/projects/6/4.webp')
      remove.add('/images/projects/6/5.webp')
      remove.add('/images/projects/6/11.webp')
    }
    if (gdcTailPairImages.value.length === 2) {
      remove.add('/images/projects/6/12.webp')
      remove.add('/images/projects/6/13.webp')
    }
  }

  if (projectSlug === 'private-shalet') {
    if (project4QuadImages.value.length === 4) {
      remove.add('/images/projects/4/3.webp')
      remove.add('/images/projects/4/4.webp')
      remove.add('/images/projects/4/5.webp')
      remove.add('/images/projects/4/6.webp')
    }
    if (project4TailPairImages.value.length === 2) {
      remove.add('/images/projects/4/10.webp')
      remove.add('/images/projects/4/11.webp')
    }
  }

  if (projectSlug === 'gdc' && project5QuadImages.value.length === 4) {
    remove.add('/images/projects/5/3.webp')
    remove.add('/images/projects/5/4.webp')
    remove.add('/images/projects/5/5.webp')
    remove.add('/images/projects/5/6.webp')
  }

  if (projectSlug === 'al-fakhreyah-villa-project' && project3HeroImages.value.length === 3) {
    remove.add('/images/projects/3/1.webp')
    remove.add('/images/projects/3/2.webp')
    remove.add('/images/projects/3/3.webp')
  }

  if (projectSlug === 'roaya' && project9TailPairImages.value.length === 2) {
    remove.add('/images/projects/9/5.webp')
    remove.add('/images/projects/9/6.webp')
  }

  if (projectSlug === 'thabat' && project8HeroImages.value.length === 3) {
    remove.add('/images/projects/8/1.webp')
    remove.add('/images/projects/8/2.webp')
    remove.add('/images/projects/8/3.webp')
  }

  if (projectSlug === 'tulip-spa' && project7HeroImages.value.length === 3) {
    remove.add('/images/projects/7/1.webp')
    remove.add('/images/projects/7/2.webp')
    remove.add('/images/projects/7/3.webp')
  }

  if (projectSlug === 'albarghash') {
    if (project2CigarRoomImages.value.length === 3) {
      remove.add('/images/projects/2/1.webp')
      remove.add('/images/projects/2/2.webp')
      remove.add('/images/projects/2/3.webp')
    }
    if (project2ShowcaseImages.value.length === 6) {
      remove.add('/images/projects/2/9.webp')
      remove.add('/images/projects/2/10.webp')
      remove.add('/images/projects/2/11.webp')
      remove.add('/images/projects/2/12.webp')
      remove.add('/images/projects/2/13.webp')
      remove.add('/images/projects/2/15.webp')
    }
    if (project2QuadImages.value.length === 4) {
      remove.add('/images/projects/2/5.webp')
      remove.add('/images/projects/2/6.webp')
      remove.add('/images/projects/2/7.webp')
      remove.add('/images/projects/2/8.webp')
    }
    if (project2FinalBlockImages.value.length === 3) {
      remove.add('/images/projects/2/14.webp')
      remove.add('/images/projects/2/16.webp')
      remove.add('/images/projects/2/17.webp')
    }
    if (project2SixImages.value.length === 6) {
      remove.add('/images/projects/2/4.webp')
      remove.add('/images/projects/2/18.webp')
      remove.add('/images/projects/2/19.webp')
      remove.add('/images/projects/2/20.webp')
      remove.add('/images/projects/2/21.webp')
      remove.add('/images/projects/2/22.webp')
    }
  }

  if (projectSlug === 'ec') {
    if (projectECPairImages.value.length === 2) {
      remove.add('/images/projects/10/3.webp')
      remove.add('/images/projects/10/4.webp')
    }
    if (projectECFinalPairImages.value.length === 2) {
      remove.add('/images/projects/10/5.webp')
      remove.add('/images/projects/10/9.webp')
    }
  }

  if (remove.size === 0 && projectSlug !== 'mada-tower') return galleryImages.value

  return galleryImages.value.filter((img) => {
    // Mada Tower: exclude all images from project 11
    if (projectSlug === 'mada-tower' && img.includes('/images/projects/11/')) {
      return false
    }
    
    for (const suffix of remove) {
      if (img.endsWith(suffix)) return false
    }
    return true
  })
})

// Remaining images after the first block (first 2 + quad or next 3): GDC, project 4, project 5 show quad then rest from index 2
const remainingGalleryImages = computed(() => {
  const list = galleryImagesForLayout.value
  if (gdcQuadImages.value.length === 4 || project4QuadImages.value.length === 4 || project5QuadImages.value.length === 4) return list.slice(2)
  return list.slice(5)
})

// Group remaining images into pairs
const remainingImagePairs = computed(() => {
  const images = remainingGalleryImages.value
  const pairs: string[][] = []
  
  // Group images into pairs
  for (let i = 0; i < images.length; i += 2) {
    if (i + 1 < images.length) {
      pairs.push([images[i], images[i + 1]])
    } else {
      // If odd number, last image alone
      pairs.push([images[i]])
    }
  }
  
  return pairs
})

const pageTitle = localizedProject.value
  ? `${localizedProject.value.title} · ${t('projects.title')}`
  : strapiProject.value
    ? `${strapiField(strapiProject.value, 'title')} · ${t('projects.title')}`
    : t('projects.title')
const pageDescription = localizedProject.value
  ? localizedProject.value.description
  : strapiField(strapiProject.value, 'description')
const pageImage = localizedProject.value ? localizedProject.value.image : strapiHeroImage.value

useHead({
  title: pageTitle,
  meta: [
    { name: 'description', content: pageDescription },
    { property: 'og:title', content: pageTitle },
    { property: 'og:description', content: pageDescription },
    { property: 'og:image', content: pageImage },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:image', content: pageImage },
  ],
})

// GSAP animations
const heroImage = ref<HTMLElement | null>(null)
const contentSections = ref<HTMLElement[]>([])

// CTA section background video (deferred)
const enableCtaVideo = ref(false)
const ctaVideoFailed = ref(false)
const ctaVideoEl = ref<HTMLVideoElement | null>(null)

const registerContentSection = (el: any) => {
  const node = (el as any)?.$el ?? el
  if (!node || (node as any).nodeType !== 1) return
  const element = node as HTMLElement
  if (!contentSections.value.includes(element)) contentSections.value.push(element)
}

onMounted(async () => {
  if (!import.meta.client) return

  const { gsap } = await import('gsap')
  const { ScrollTrigger } = await import('gsap/ScrollTrigger')
  gsap.registerPlugin(ScrollTrigger)

  // Hero image fade in
  if (heroImage.value) {
    gsap.from(heroImage.value, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power2.out',
    })
  }

  // Defer loading of CTA background video until after first paint
  const defer = (cb: () => void) => {
    if ('requestIdleCallback' in window) {
      ;(window as any).requestIdleCallback(cb, { timeout: 2000 })
    } else {
      setTimeout(cb, 1200)
    }
  }

  defer(() => {
    enableCtaVideo.value = true
    nextTick(() => {
      const video = ctaVideoEl.value
      if (video && !ctaVideoFailed.value) {
        video.muted = true
        video.play().catch(() => {})
      }
    })
  })

  // Content sections fade in on scroll
  contentSections.value.forEach((section, index) => {
    if (!section) return
    gsap.from(section, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      delay: index * 0.1,
    })
  })
})
</script>

<template>
  <div v-if="localizedProject" class="min-h-screen bg-white">
    <!-- Hero Section -->
    <ProjectHero ref="heroImage" :src="localizedProject.image" :alt="localizedProject.title" />

    <!-- About Section -->
    <section :ref="registerContentSection" class="section-wrapper relative z-10 py-16 md:py-24">
      <div class="grid gap-12 md:grid-cols-2 md:items-start lg:gap-16">
        <!-- Left Column: Category, Title, Description -->
        <div class="space-y-6">
          <p class="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            {{ getCategoryLabel(localizedProject.category) }}
          </p>
          <h1 class="text-4xl font-serif leading-tight text-ink md:text-5xl lg:text-6xl">
            {{ localizedProject.title }}
          </h1>
          <p
            v-if="(projectSlug === 'ec' || projectSlug === 'al-fakhreyah-villa-project') && localizedProject.description"
            class="text-base leading-relaxed text-slate-600 md:text-lg"
          >
            {{ localizedProject.description }}
          </p>
          <p v-else-if="localizedProject.overview" class="text-base leading-relaxed text-slate-600 md:text-lg">
            {{ localizedProject.overview }}
          </p>
          <p v-else class="text-base leading-relaxed text-slate-600 md:text-lg">
            {{ localizedProject.description }}
          </p>
        </div>

        <!-- Right Column: Project Details -->
        <ProjectMeta
          :location="localizedProject.location"
          :year="localizedProject.year"
          :client="localizedProject.client"
          :services="localizedProject.services"
        />
      </div>
    </section>

    <!-- Images Grid Section -->
    <section
      v-if="galleryImagesForLayout.length > 0 || madaTowerImagePairs.length > 0 || project2CigarRoomImages.length === 3 || project2ShowcaseImages.length === 6 || project2QuadImages.length === 4 || project2FinalBlockImages.length === 3 || project2SixImages.length === 6 || project3HeroImages.length === 3 || project8HeroImages.length === 3 || project7HeroImages.length === 3 || projectECPairImages.length === 2 || projectECFinalPairImages.length === 2 || diagramPairImages.length === 2 || quadImages.length === 4 || gdcQuadImages.length === 4 || project4QuadImages.length === 4 || project5QuadImages.length === 4 || project4TailPairImages.length === 2 || project9TailPairImages.length === 2 || gdcTailPairImages.length === 2 || midPairImages.length === 2 || tailPairImages.length === 2"
      :ref="registerContentSection"
      class="section-wrapper relative z-10 py-16 md:py-24"
    >
      <div class="space-y-6">
        <!-- Project 3 (Al-Fakhreyah): 3/1 full width, then 3/2 and 3/3 side by side -->
        <div v-if="project3HeroImages.length === 3" class="space-y-6">
          <div class="aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-200">
            <ResponsiveImg
              :src="project3HeroImages[0]"
              :alt="`${localizedProject.title} - Image 1`"
              width="800"
              height="450"
              loading="lazy"
              decoding="async"
              class="h-full w-full object-cover"
            />
          </div>
          <div class="grid gap-6 grid-cols-1 md:grid-cols-2">
            <div
              v-for="(image, index) in project3HeroImages.slice(1, 3)"
              :key="`project3-hero-${index}`"
              class="aspect-[4/3] overflow-hidden rounded-xl bg-slate-200"
            >
              <ResponsiveImg
                :src="image"
                :alt="`${localizedProject.title} - Image ${index + 2}`"
                width="800"
                height="600"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <!-- Project 8 (Thabat): 8/1 full width, then 8/2 and 8/3 side by side -->
        <div v-if="project8HeroImages.length === 3" class="space-y-6">
          <div class="aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-200">
            <ResponsiveImg
              :src="project8HeroImages[0]"
              :alt="`${localizedProject.title} - Image 1`"
              width="800"
              height="450"
              loading="lazy"
              decoding="async"
              class="h-full w-full object-cover"
            />
          </div>
          <div class="grid gap-6 grid-cols-1 md:grid-cols-2">
            <div
              v-for="(image, index) in project8HeroImages.slice(1, 3)"
              :key="`project8-hero-${index}`"
              class="aspect-[4/3] overflow-hidden rounded-xl bg-slate-200"
            >
              <ResponsiveImg
                :src="image"
                :alt="`${localizedProject.title} - Image ${index + 2}`"
                width="800"
                height="600"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <!-- Project 7 (Tulip Spa): 7/3 full width, then 7/1 and 7/2 side by side -->
        <div v-if="project7HeroImages.length === 3" class="space-y-6">
          <div class="aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-200">
            <ResponsiveImg
              :src="project7HeroImages[0]"
              :alt="`${localizedProject.title} - Image 3`"
              width="800"
              height="450"
              loading="lazy"
              decoding="async"
              class="h-full w-full object-cover"
            />
          </div>
          <div class="grid gap-6 grid-cols-1 md:grid-cols-2">
            <div
              v-for="(image, index) in project7HeroImages.slice(1, 3)"
              :key="`project7-hero-${index}`"
              class="aspect-[4/3] overflow-hidden rounded-xl bg-slate-200"
            >
              <ResponsiveImg
                :src="image"
                :alt="`${localizedProject.title} - Image ${index + 1}`"
                width="800"
                height="600"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>

        <!-- Project 2 (AlBarghash): Entrance block (2/14 full width, then 2/16 and 2/17 side by side) -->
        <div v-if="project2FinalBlockImages.length === 3" class="space-y-6">
          <div class="aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-200">
            <ResponsiveImg
              :src="project2FinalBlockImages[0]"
              :alt="`${localizedProject.title} - Image 14`"
              width="800"
              height="450"
              loading="lazy"
              decoding="async"
              class="h-full w-full object-cover"
            />
          </div>
          <div class="grid gap-6 grid-cols-1 md:grid-cols-2">
            <div
              v-for="(image, index) in project2FinalBlockImages.slice(1, 3)"
              :key="`project2-final-${index}`"
              class="aspect-[4/3] overflow-hidden rounded-xl bg-slate-200"
            >
              <ResponsiveImg
                :src="image"
                :alt="`${localizedProject.title} - Image ${index === 0 ? 16 : 17}`"
                width="800"
                height="450"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover"
              />
            </div>
          </div>
          <div
            v-if="(projectSlug === 'albarghash' && localizedProject.entranceText) || (projectSlug !== 'albarghash' && projectSlug !== 'mada-tower' && (localizedProject.challenge || localizedProject.solution || localizedProject.results))"
            class="py-6 md:py-8"
          >
            <p class="text-base leading-relaxed text-slate-600 md:text-lg lg:text-xl">
              {{ projectSlug === 'albarghash' ? localizedProject.entranceText : (localizedProject.challenge || localizedProject.solution || localizedProject.results) }}
            </p>
          </div>
        </div>

        <!-- Project 2 (AlBarghash): Central lounge block (2/6, 2/5, 2/8, 2/7 in 2x2) -->
        <div v-if="project2QuadImages.length === 4" class="space-y-6">
          <div class="grid gap-6 grid-cols-2">
            <div
              v-for="(image, index) in project2QuadImages"
              :key="`project2-quad-${index}`"
              class="aspect-[4/3] overflow-hidden rounded-xl bg-slate-200"
            >
              <ResponsiveImg
                :src="image"
                :alt="`${localizedProject.title} - Image ${index + 5}`"
                width="800"
                height="450"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover"
              />
            </div>
          </div>
          <div
            v-if="(projectSlug === 'albarghash' && localizedProject.solution) || (projectSlug !== 'albarghash' && projectSlug !== 'mada-tower' && (localizedProject.challenge || localizedProject.solution || localizedProject.results))"
            class="py-6 md:py-8"
          >
            <p class="text-base leading-relaxed text-slate-600 md:text-lg lg:text-xl">
              {{ projectSlug === 'albarghash' ? localizedProject.solution : (localizedProject.challenge || localizedProject.solution || localizedProject.results) }}
            </p>
          </div>
        </div>

        <!-- Project 2 (AlBarghash): 2/1 full width, then 2/2 and 2/3 side by side, then cigar lounge description -->
        <div v-if="project2CigarRoomImages.length === 3" class="space-y-6">
          <div class="aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-200">
            <ResponsiveImg
              :src="project2CigarRoomImages[0]"
              :alt="`${localizedProject.title} - Image 1`"
              width="800"
              height="450"
              loading="lazy"
              decoding="async"
              class="h-full w-full object-cover"
            />
          </div>
          <div class="grid gap-6 grid-cols-1 md:grid-cols-2">
            <div
              v-for="(image, index) in project2CigarRoomImages.slice(1, 3)"
              :key="`cigar-room-${index + 1}`"
              class="aspect-[4/3] overflow-hidden rounded-xl bg-slate-200"
            >
              <ResponsiveImg
                :src="image"
                :alt="`${localizedProject.title} - Image ${index + 2}`"
                width="800"
                height="600"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover"
              />
            </div>
          </div>
          <div v-if="(projectSlug === 'albarghash' && localizedProject.midGalleryText) || (projectSlug !== 'albarghash' && projectSlug !== 'mada-tower' && (localizedProject.overview || localizedProject.description))" class="py-6 md:py-8">
            <p class="text-base leading-relaxed text-slate-600 md:text-lg lg:text-xl">
              {{ projectSlug === 'albarghash' && localizedProject.midGalleryText ? localizedProject.midGalleryText : (localizedProject.overview || localizedProject.description) }}
            </p>
          </div>
        </div>

        <!-- Project 2 (AlBarghash): 2/9–2/13 in pairs (two together), then descriptive text below -->
        <div v-if="project2ShowcaseImages.length === 6" class="space-y-6">
          <div class="grid gap-6 grid-cols-2">
            <div
              v-for="(image, index) in project2ShowcaseImages"
              :key="`showcase-${index}`"
              class="aspect-[4/3] overflow-hidden rounded-xl bg-slate-200"
            >
              <ResponsiveImg
                :src="image"
                :alt="`${localizedProject.title} - Showcase image ${index + 1}`"
                width="800"
                height="450"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover"
              />
            </div>
          </div>
          <div v-if="(projectSlug === 'albarghash' && localizedProject.challenge) || (projectSlug !== 'albarghash' && projectSlug !== 'mada-tower' && projectSlug !== 'thabat' && projectSlug !== 'tulip-spa' && (localizedProject.challenge || localizedProject.solution || localizedProject.results))" class="py-6 md:py-8">
            <p class="text-base leading-relaxed text-slate-600 md:text-lg lg:text-xl">
              {{ projectSlug === 'albarghash' ? localizedProject.challenge : (localizedProject.challenge || localizedProject.solution || localizedProject.results) }}
            </p>
          </div>
        </div>

        <!-- Project 2 (AlBarghash): 2/4, 2/18–2/22 together -->
        <div v-if="project2SixImages.length === 6" class="space-y-6">
          <div class="grid gap-6 grid-cols-2 md:grid-cols-3">
            <div
              v-for="(image, index) in project2SixImages"
              :key="`project2-six-${index}`"
              class="aspect-[4/3] overflow-hidden rounded-xl bg-slate-200"
            >
              <ResponsiveImg
                :src="image"
                :alt="`${localizedProject.title} - Image ${index + 1}`"
                width="800"
                height="600"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover"
              />
            </div>
          </div>
          <div v-if="projectSlug === 'albarghash' && localizedProject.gymText" class="py-6 md:py-8">
            <p class="text-base leading-relaxed text-slate-600 md:text-lg lg:text-xl">
              {{ localizedProject.gymText }}
            </p>
          </div>
        </div>

        <!-- Mada Tower: All images in pairs -->
        <template v-if="projectSlug === 'mada-tower'">
          <div
            v-for="(pair, pairIndex) in madaTowerImagePairs"
            :key="`mada-pair-${pairIndex}`"
            class="md:col-span-2"
          >
            <div class="grid gap-6 md:grid-cols-2">
              <div
                v-for="(image, imgIndex) in pair"
                :key="`mada-img-${pairIndex}-${imgIndex}`"
                class="aspect-[4/3] overflow-hidden rounded-xl bg-slate-200"
              >
                <ResponsiveImg
                  :src="image"
                  :alt="`${localizedProject.title} - Image ${pairIndex * 2 + imgIndex + 1}`"
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                  class="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </template>

        <!-- Default gallery layout for all other projects -->
        <template v-else>
          <div class="grid gap-6 md:grid-cols-2">
            <div
              v-for="(image, index) in galleryImagesForLayout.slice(0, 2)"
              :key="`img-top-${index}`"
              class="aspect-[4/3] overflow-hidden rounded-xl bg-slate-200"
            >
              <ResponsiveImg
                :src="image"
                :alt="`${localizedProject.title} - Image ${index + 1}`"
                width="800"
                height="600"
                loading="lazy"
                decoding="async"
                class="h-full w-full object-cover"
              />
            </div>
          </div>

          <!-- Efficiency Center Khobar: midGalleryText right after first two images -->
          <div
            v-if="projectSlug === 'efficiency-center-khobar' && localizedProject.midGalleryText"
            class="md:col-span-2 py-6 md:py-8"
          >
            <p class="text-base leading-relaxed text-slate-600 md:text-lg lg:text-xl">
              {{ localizedProject.midGalleryText }}
            </p>
          </div>

          <div
            v-if="diagramPairImages.length === 2"
            class="md:col-span-2"
          >
            <div class="grid gap-6 md:grid-cols-2">
              <div
                v-for="(img, i) in diagramPairImages"
                :key="`diagram-${i}`"
                class="aspect-[4/3] overflow-hidden rounded-xl bg-slate-200"
              >
                <ResponsiveImg
                  :src="img"
                  :alt="`${localizedProject.title} - Diagram ${i + 1}`"
                  width="800"
                  height="450"
                  loading="lazy"
                  decoding="async"
                  class="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <div
            v-if="galleryImagesForLayout.length >= 3"
            class="md:col-span-2"
          >
            <!-- Next images: Project 1 uses a 2x2 grid for 4,5,6,7 -->
            <div v-if="quadImages.length === 4" class="grid gap-6 md:grid-cols-2">
              <div
                v-for="(image, index) in quadImages"
                :key="`img-quad-${index}`"
                :class="isProjectOne ? 'aspect-[16/10]' : 'aspect-[4/3]'"
                class="overflow-hidden rounded-xl"
              >
                <ResponsiveImg
                  :src="image"
                  :alt="`${localizedProject.title} - Image ${index + 4}`"
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                  class="h-full w-full object-cover"
                />
              </div>
            </div>

            <!-- GDC: 2x2 grid for 6/3, 6/4, 6/5, 6/11 -->
            <div v-else-if="gdcQuadImages.length === 4" class="grid gap-6 md:grid-cols-2">
              <div
                v-for="(image, index) in gdcQuadImages"
                :key="`img-gdc-quad-${index}`"
                class="aspect-[4/3] overflow-hidden rounded-xl bg-slate-200"
              >
                <ResponsiveImg
                  :src="image"
                  :alt="`${localizedProject.title} - Image ${index + 1}`"
                  class="h-full w-full object-cover"
                />
              </div>
            </div>

            <!-- Project 4 (private-shalet): 2x2 grid for 4/3, 4/4, 4/5, 4/6 -->
            <div v-else-if="project4QuadImages.length === 4" class="grid gap-6 md:grid-cols-2">
              <div
                v-for="(image, index) in project4QuadImages"
                :key="`img-project4-quad-${index}`"
                class="aspect-[4/3] overflow-hidden rounded-xl bg-slate-200"
              >
                <ResponsiveImg
                  :src="image"
                  :alt="`${localizedProject.title} - Image ${index + 3}`"
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                  class="h-full w-full object-cover"
                />
              </div>
            </div>

            <!-- Project 5 (gdc co-working): 2x2 grid for 5/3, 5/4, 5/5, 5/6 -->
            <div v-else-if="project5QuadImages.length === 4" class="grid gap-6 md:grid-cols-2">
              <div
                v-for="(image, index) in project5QuadImages"
                :key="`img-project5-quad-${index}`"
                class="aspect-[4/3] overflow-hidden rounded-xl bg-slate-200"
              >
                <ResponsiveImg
                  :src="image"
                  :alt="`${localizedProject.title} - Image ${index + 3}`"
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                  class="h-full w-full object-cover"
                />
              </div>
            </div>

            <!-- Default: show next 3 images in a 2-column grid -->
            <div v-else class="grid gap-6 md:grid-cols-2">
              <div
                v-for="(image, index) in galleryImagesForLayout.slice(2, 5)"
                :key="`img-mid-${index}`"
                :class="isProjectOne ? 'aspect-[16/10]' : 'aspect-[4/3]'"
                class="overflow-hidden rounded-xl"
              >
                <ResponsiveImg
                  :src="image"
                  :alt="`${localizedProject.title} - Image ${index + 3}`"
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                  class="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <!-- Mid-gallery paragraph: for Burooj Villas only exterior design; for others (except albarghash, roaya, thabat, tulip-spa, efficiency-center-khobar, and mada-tower – has its own blocks) midGalleryText, overview, or exterior -->
          <div
            v-if="projectSlug !== 'mada-tower' && projectSlug !== 'efficiency-center-khobar' && ((projectSlug === 'albahar-villas' && localizedProject.exteriorDesign) || (projectSlug !== 'albahar-villas' && projectSlug !== 'albarghash' && projectSlug !== 'roaya' && projectSlug !== 'thabat' && projectSlug !== 'tulip-spa' && (localizedProject.midGalleryText || localizedProject.overview || localizedProject.description || localizedProject.exteriorDesign)))"
            class="md:col-span-2 py-10 md:py-14 space-y-6"
          >
            <p
              v-if="projectSlug !== 'albahar-villas' && projectSlug !== 'albarghash' && projectSlug !== 'roaya' && projectSlug !== 'thabat' && projectSlug !== 'tulip-spa' && projectSlug !== 'mada-tower' && projectSlug !== 'efficiency-center-khobar' && (localizedProject.midGalleryText || localizedProject.overview || localizedProject.description)"
              class="text-base leading-relaxed text-slate-600 md:text-lg lg:text-xl"
            >
              {{ localizedProject.midGalleryText || localizedProject.overview || localizedProject.description }}
            </p>
            <p
              v-if="localizedProject.exteriorDesign && projectSlug !== 'mada-tower'"
              class="text-base leading-relaxed text-slate-600 md:text-lg lg:text-xl"
            >
              {{ localizedProject.exteriorDesign }}
            </p>
          </div>

          <!-- Remaining images (after first 2 + quad or first 5) - displayed in pairs -->
          <div
            v-for="(pair, pairIndex) in remainingImagePairs"
            :key="`remaining-pair-${pairIndex}`"
            class="md:col-span-2"
          >
            <div class="grid gap-6 md:grid-cols-2">
              <div
                v-for="(image, imgIndex) in pair"
                :key="`remaining-img-${pairIndex}-${imgIndex}`"
                :class="isProjectOne ? 'aspect-[16/10]' : 'aspect-[4/3]'"
                class="overflow-hidden rounded-xl"
              >
                <ResponsiveImg
                  :src="image"
                  :alt="`${localizedProject.title} - Image ${pairIndex * 2 + imgIndex + (gdcQuadImages.length === 4 || project4QuadImages.length === 4 || project5QuadImages.length === 4 ? 3 : 6)}`"
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                  class="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <!-- Project 1: keep 10 & 12 together -->
          <div v-if="midPairImages.length === 2" class="md:col-span-2">
            <div class="grid gap-6 md:grid-cols-2">
              <div
                v-for="(img, i) in midPairImages"
                :key="`mid-pair-${i}`"
                :class="isProjectOne ? 'aspect-[3/4]' : 'aspect-[4/3]'"
                class="overflow-hidden rounded-xl"
              >
                <ResponsiveImg
                  :src="img"
                  :alt="`${localizedProject.title} - Image ${i === 0 ? 10 : 12}`"
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                  class="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <!-- GDC: keep 12 & 13 side-by-side -->
          <div v-if="gdcTailPairImages.length === 2" class="md:col-span-2">
            <div class="grid gap-6 md:grid-cols-2">
              <div
                v-for="(img, i) in gdcTailPairImages"
                :key="`gdc-tail-pair-${i}`"
                class="aspect-[4/3] overflow-hidden rounded-xl bg-slate-200"
              >
                <ResponsiveImg
                  :src="img"
                  :alt="`${localizedProject.title} - Image ${i === 0 ? 12 : 13}`"
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                  class="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <!-- Project 4 (private-shalet): keep 10 & 11 side-by-side (taller) -->
          <div v-if="project4TailPairImages.length === 2" class="md:col-span-2">
            <div class="grid gap-6 md:grid-cols-2">
              <div
                v-for="(img, i) in project4TailPairImages"
                :key="`project4-tail-pair-${i}`"
                class="aspect-[3/4] overflow-hidden rounded-xl"
              >
                <ResponsiveImg
                  :src="img"
                  :alt="`${localizedProject.title} - Image ${i === 0 ? 10 : 11}`"
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                  class="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <!-- Project 9 (roaya): keep 5 & 6 side-by-side -->
          <div v-if="project9TailPairImages.length === 2" class="md:col-span-2">
            <div class="grid gap-6 md:grid-cols-2">
              <div
                v-for="(img, i) in project9TailPairImages"
                :key="`project9-tail-pair-${i}`"
                class="aspect-[4/3] overflow-hidden rounded-xl bg-slate-200"
              >
                <ResponsiveImg
                  :src="img"
                  :alt="`${localizedProject.title} - Image ${i === 0 ? 5 : 6}`"
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                  class="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <!-- Project 1: keep 13 & 14 together -->
          <div v-if="tailPairImages.length === 2" class="md:col-span-2">
            <div class="grid gap-6 md:grid-cols-2">
              <div
                v-for="(img, i) in tailPairImages"
                :key="`tail-pair-${i}`"
                :class="isProjectOne ? 'aspect-[16/10]' : 'aspect-[4/3]'"
                class="overflow-hidden rounded-xl"
              >
                <ResponsiveImg
                  :src="img"
                  :alt="`${localizedProject.title} - Image ${i === 0 ? 13 : 14}`"
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                  class="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <!-- Project EC: 10/3, 10/4 together as pair -->
          <div v-if="projectECPairImages.length === 2" class="md:col-span-2">
            <div class="grid gap-6 md:grid-cols-2">
              <div
                v-for="(image, index) in projectECPairImages"
                :key="`ec-pair-${index}`"
                class="aspect-[4/3] overflow-hidden rounded-xl bg-slate-200"
              >
                <ResponsiveImg
                  :src="image"
                  :alt="`${localizedProject.title} - Image ${index + 3}`"
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                  class="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>

          <!-- Project EC: 10/5, 10/9 together as pair -->
          <div v-if="projectECFinalPairImages.length === 2" class="md:col-span-2">
            <div class="grid gap-6 md:grid-cols-2">
              <div
                v-for="(image, index) in projectECFinalPairImages"
                :key="`ec-final-pair-${index}`"
                class="aspect-[4/3] overflow-hidden rounded-xl bg-slate-200"
              >
                <ResponsiveImg
                  :src="image"
                  :alt="`${localizedProject.title} - Image ${index === 0 ? 5 : 9}`"
                  width="800"
                  height="600"
                  loading="lazy"
                  decoding="async"
                  class="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </template>
        
        <!-- Full Width Image -->
        <div v-if="shouldShowFullWidthImage && projectSlug !== 'ec'" class="aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-200">
          <ResponsiveImg
            :src="localizedProject.fullWidthImage"
            :alt="`${localizedProject.title} - Full Width`"
            width="1200"
            height="675"
            loading="lazy"
            decoding="async"
            class="h-full w-full object-cover"
          />
        </div>

        <!-- Interior design (after last images, e.g. Burooj Villas) -->
        <div
          v-if="projectSlug !== 'mada-tower' && localizedProject.interiorDesign && projectSlug !== 'thabat' && projectSlug !== 'tulip-spa'"
          class="w-full py-10 md:py-14"
        >
          <p class="text-base leading-relaxed text-slate-600 md:text-lg lg:text-xl">
            {{ localizedProject.interiorDesign }}
          </p>
        </div>

        <!-- Results (after last images, e.g. Efficiency Center) -->
        <div
          v-if="projectSlug !== 'mada-tower' && localizedProject.results && projectSlug !== 'thabat' && projectSlug !== 'tulip-spa'"
          class="w-full py-10 md:py-14"
        >
          <p class="text-base leading-relaxed text-slate-600 md:text-lg lg:text-xl">
            {{ localizedProject.results }}
          </p>
        </div>

      </div>
    </section>

    <!-- Project CTA -->
    <section :ref="registerContentSection" class="relative z-10 w-full overflow-hidden">
      <div class="relative min-h-[600px] overflow-hidden bg-slate-200">
        <video
          v-if="enableCtaVideo && !ctaVideoFailed"
          ref="ctaVideoEl"
          :poster="`${baseURL}images/hero-image.webp`"
          class="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
          autoplay
          muted
          loop
          playsinline
          aria-hidden="true"
          @error="ctaVideoFailed = true"
        >
          <source :src="`${baseURL}videos/cta.mp4`" type="video/mp4" />
        </video>
        <OptimizedHeroImage
          v-if="!enableCtaVideo || ctaVideoFailed"
          lazy
          class="absolute inset-0"
        />
        <!-- Gradient overlay: dark at bottom, transparent toward top -->
        <div class="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>
        <div class="section-wrapper relative z-10 flex min-h-[600px] flex-col items-center justify-center py-16 text-center">
          <h2 class="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            <span>{{ t('cta.title') }}</span><br />
            <span>{{ t('cta.titleLine2') }}</span>
          </h2>
          <div class="mt-8">
            <NuxtLink
              :to="localePath('/contact')"
              class="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-white/90"
            >
              {{ t('cta.button') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- مشروع جديد من سترابي، مو موجود بالبيانات الثابتة -->
  <div v-else-if="strapiProject" class="min-h-screen bg-white">
    <div class="aspect-[16/9] w-full overflow-hidden bg-slate-200">
      <ResponsiveImg
        :src="strapiHeroImage"
        :alt="strapiField(strapiProject, 'title')"
        class="h-full w-full object-cover"
      />
    </div>

    <section class="section-wrapper relative z-10 py-16 md:py-24">
      <div class="grid gap-12 md:grid-cols-2 md:items-start lg:gap-16">
        <div class="space-y-6">
          <p class="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            {{ strapiField(strapiProject, 'category') }}
          </p>
          <h1 class="text-4xl font-serif leading-tight text-ink md:text-5xl lg:text-6xl">
            {{ strapiField(strapiProject, 'title') }}
          </h1>
          <p class="text-base leading-relaxed text-slate-600 md:text-lg">
            {{ strapiField(strapiProject, 'description') }}
          </p>
        </div>

        <ProjectMeta
          :location="strapiField(strapiProject, 'location')"
          :year="strapiProject.year"
          :client="strapiField(strapiProject, 'client')"
          :services="strapiServices"
        />
      </div>
    </section>

<section v-if="strapiCards.length" :ref="registerContentSection" class="section-wrapper relative z-10 space-y-16 pb-16 md:pb-24">
  <div v-for="(card, ci) in strapiCards" :key="`strapi-card-${ci}`" class="space-y-6">
    <!-- النص فوق الصور -->
    <p
      v-if="card.description && card.imagePosition === 'above'"
      class="text-base leading-relaxed text-slate-600 md:text-lg"
    >
      {{ card.description }}
    </p>

    <div
      v-if="card.images.length === 1"
      class="aspect-[16/9] w-full overflow-hidden rounded-xl bg-slate-200"
    >
      <ResponsiveImg
        :src="card.images[0]"
        :alt="`${strapiField(strapiProject, 'title')} - ${ci + 1}`"
        class="h-full w-full object-cover"
      />
    </div>
    <div v-else-if="card.images.length" :class="strapiGridClass(card.images.length)">
      <div
        v-for="(img, ii) in card.images"
        :key="`strapi-card-${ci}-img-${ii}`"
        class="aspect-[4/3] overflow-hidden rounded-xl bg-slate-200"
      >
        <ResponsiveImg
          :src="img"
          :alt="`${strapiField(strapiProject, 'title')} - ${ci + 1}.${ii + 1}`"
          class="h-full w-full object-cover"
        />
      </div>
    </div>

    <!-- النص تحت الصور (الافتراضي) -->
    <p
      v-if="card.description && card.imagePosition !== 'above'"
      class="text-base leading-relaxed text-slate-600 md:text-lg"
    >
      {{ card.description }}
    </p>
  </div>
</section>

    <section class="relative z-10 w-full overflow-hidden">
      <div class="relative min-h-[400px] overflow-hidden bg-slate-900">
        <div class="section-wrapper relative z-10 flex min-h-[400px] flex-col items-center justify-center py-16 text-center">
          <h2 class="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            <span>{{ t('cta.title') }}</span><br />
            <span>{{ t('cta.titleLine2') }}</span>
          </h2>
          <div class="mt-8">
            <NuxtLink
              :to="localePath('/contact')"
              class="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-white/90"
            >
              {{ t('cta.button') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- ما لقيناه لا محلياً ولا بسترابي -->
  <div v-else-if="!siteDataPending" class="flex min-h-screen items-center justify-center">
    <p class="text-slate-500">{{ t('errors.projectNotFound') }}</p>
  </div>
</template>