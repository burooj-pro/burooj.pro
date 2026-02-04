<script setup lang="ts">
const { t } = useI18n()
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

if (!project) {
  throw createError({
    statusCode: 404,
    statusMessage: t('errors.projectNotFound'),
  })
}

const getCategoryLabel = (category: string) => {
  if (category === 'Construction & Engineering') return t('projects.constructionEngineering')
  if (category === 'Property Management') return t('projects.propertyManagement')
  if (category === 'Drone Cleaning') return t('projects.droneCleaning')
  return category
}

const localizedProject = computed(() => getLocalizedProject(project))
const isProjectOne = computed(() => projectSlug === 'albahar-villas')

const galleryImages = computed(() => {
  const imgs = localizedProject.value.images ?? []
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
  const full = localizedProject.value.fullWidthImage
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

  const diagram3 = galleryImages.value.find((img) => img.endsWith('/images/projects/1/3.png'))
  const diagram9 = galleryImages.value.find((img) => img.endsWith('/images/projects/1/9.png'))
  if (!diagram3 || !diagram9) return [] as string[]
  return [diagram3, diagram9]
})

const tailPairImages = computed(() => {
  // Special case: keep these two images together for Project 1.
  if (projectSlug !== 'albahar-villas') return [] as string[]

  const img13 = galleryImages.value.find((img) => img.endsWith('/images/projects/1/13.png'))
  const img14 = galleryImages.value.find((img) => img.endsWith('/images/projects/1/14.png'))
  if (!img13 || !img14) return [] as string[]
  return [img13, img14]
})

const midPairImages = computed(() => {
  // Special case: keep these two images together for Project 1.
  if (projectSlug !== 'albahar-villas') return [] as string[]

  const img10 = galleryImages.value.find((img) => img.endsWith('/images/projects/1/10.png'))
  const img12 = galleryImages.value.find((img) => img.endsWith('/images/projects/1/12.png'))
  if (!img10 || !img12) return [] as string[]
  return [img10, img12]
})

const quadImages = computed(() => {
  // Special case: keep these four images together for Project 1.
  if (projectSlug !== 'albahar-villas') return [] as string[]

  const img4 = galleryImages.value.find((img) => img.endsWith('/images/projects/1/4.png'))
  const img5 = galleryImages.value.find((img) => img.endsWith('/images/projects/1/5.png'))
  const img6 = galleryImages.value.find((img) => img.endsWith('/images/projects/1/6.png'))
  const img7 = galleryImages.value.find((img) => img.endsWith('/images/projects/1/7.png'))
  if (!img4 || !img5 || !img6 || !img7) return [] as string[]
  return [img4, img5, img6, img7]
})

// GDC (efficiency-center-khobar): 2x2 grid of 6/3, 6/4, 6/5, 6/11
const gdcQuadImages = computed(() => {
  if (projectSlug !== 'efficiency-center-khobar') return [] as string[]

  const img3 = galleryImages.value.find((img) => img.endsWith('/images/projects/6/3.png'))
  const img4 = galleryImages.value.find((img) => img.endsWith('/images/projects/6/4.png'))
  const img5 = galleryImages.value.find((img) => img.endsWith('/images/projects/6/5.png'))
  const img11 = galleryImages.value.find((img) => img.endsWith('/images/projects/6/11.png'))
  if (!img3 || !img4 || !img5 || !img11) return [] as string[]
  return [img3, img4, img5, img11]
})

// GDC (efficiency-center-khobar): side-by-side pair 6/12, 6/13
const gdcTailPairImages = computed(() => {
  if (projectSlug !== 'efficiency-center-khobar') return [] as string[]

  const img12 = galleryImages.value.find((img) => img.endsWith('/images/projects/6/12.png'))
  const img13 = galleryImages.value.find((img) => img.endsWith('/images/projects/6/13.png'))
  if (!img12 || !img13) return [] as string[]
  return [img12, img13]
})

// Project 4 (private-shalet): 2x2 grid of 4/3, 4/4, 4/5, 4/6
const project4QuadImages = computed(() => {
  if (projectSlug !== 'private-shalet') return [] as string[]

  const img3 = galleryImages.value.find((img) => img.endsWith('/images/projects/4/3.png'))
  const img4 = galleryImages.value.find((img) => img.endsWith('/images/projects/4/4.png'))
  const img5 = galleryImages.value.find((img) => img.endsWith('/images/projects/4/5.png'))
  const img6 = galleryImages.value.find((img) => img.endsWith('/images/projects/4/6.png'))
  if (!img3 || !img4 || !img5 || !img6) return [] as string[]
  return [img3, img4, img5, img6]
})

// Project 4 (private-shalet): side-by-side pair 4/10, 4/11
const project4TailPairImages = computed(() => {
  if (projectSlug !== 'private-shalet') return [] as string[]

  const img10 = galleryImages.value.find((img) => img.endsWith('/images/projects/4/10.png'))
  const img11 = galleryImages.value.find((img) => img.endsWith('/images/projects/4/11.png'))
  if (!img10 || !img11) return [] as string[]
  return [img10, img11]
})

// Project 9 (roaya): side-by-side pair 9/5, 9/6
const project9TailPairImages = computed(() => {
  if (projectSlug !== 'roaya') return [] as string[]

  const img5 = galleryImages.value.find((img) => img.endsWith('/images/projects/9/5.png'))
  const img6 = galleryImages.value.find((img) => img.endsWith('/images/projects/9/6.png'))
  if (!img5 || !img6) return [] as string[]
  return [img5, img6]
})

// Project 5 (gdc co-working): 2x2 grid of 5/3, 5/4, 5/5, 5/6
const project5QuadImages = computed(() => {
  if (projectSlug !== 'gdc') return [] as string[]

  const img3 = galleryImages.value.find((img) => img.endsWith('/images/projects/5/3.png'))
  const img4 = galleryImages.value.find((img) => img.endsWith('/images/projects/5/4.png'))
  const img5 = galleryImages.value.find((img) => img.endsWith('/images/projects/5/5.png'))
  const img6 = galleryImages.value.find((img) => img.endsWith('/images/projects/5/6.png'))
  if (!img3 || !img4 || !img5 || !img6) return [] as string[]
  return [img3, img4, img5, img6]
})

// Project 2 (albarghash): 2/1 full width, then 2/2 and 2/3 side by side
const project2CigarRoomImages = computed(() => {
  if (projectSlug !== 'albarghash') return [] as string[]

  const img1 = galleryImages.value.find((img) => img.endsWith('/images/projects/2/1.png'))
  const img2 = galleryImages.value.find((img) => img.endsWith('/images/projects/2/2.png'))
  const img3 = galleryImages.value.find((img) => img.endsWith('/images/projects/2/3.png'))
  if (!img1 || !img2 || !img3) return [] as string[]
  return [img1, img2, img3]
})

// Project 2 (albarghash): 2/9–2/13 and 2/15 showcased together with description below
const project2ShowcaseImages = computed(() => {
  if (projectSlug !== 'albarghash') return [] as string[]

  const imgs = [9, 10, 11, 12, 13, 15].map((n) =>
    galleryImages.value.find((img) => img.endsWith(`/images/projects/2/${n}.png`))
  )
  if (imgs.some((i) => !i)) return [] as string[]
  return imgs as string[]
})

// Project 2 (albarghash): 2/6, 2/5, 2/8, 2/7 together in 2x2 after showcase section
const project2QuadImages = computed(() => {
  if (projectSlug !== 'albarghash') return [] as string[]

  const img6 = galleryImages.value.find((img) => img.endsWith('/images/projects/2/6.png'))
  const img5 = galleryImages.value.find((img) => img.endsWith('/images/projects/2/5.png'))
  const img8 = galleryImages.value.find((img) => img.endsWith('/images/projects/2/8.png'))
  const img7 = galleryImages.value.find((img) => img.endsWith('/images/projects/2/7.png'))
  if (!img6 || !img5 || !img8 || !img7) return [] as string[]
  return [img6, img5, img8, img7]
})

// Project 2 (albarghash): 2/14 full width, then 2/16 and 2/17 side by side
const project2FinalBlockImages = computed(() => {
  if (projectSlug !== 'albarghash') return [] as string[]

  const img14 = galleryImages.value.find((img) => img.endsWith('/images/projects/2/14.png'))
  const img16 = galleryImages.value.find((img) => img.endsWith('/images/projects/2/16.png'))
  const img17 = galleryImages.value.find((img) => img.endsWith('/images/projects/2/17.png'))
  if (!img14 || !img16 || !img17) return [] as string[]
  return [img14, img16, img17]
})

// Project 2 (albarghash): 2/4, 2/18–2/22 together after final block
const project2SixImages = computed(() => {
  if (projectSlug !== 'albarghash') return [] as string[]

  const imgs = [4, 18, 19, 20, 21, 22].map((n) =>
    galleryImages.value.find((img) => img.endsWith(`/images/projects/2/${n}.png`))
  )
  if (imgs.some((i) => !i)) return [] as string[]
  return imgs as string[]
})

// Project 3 (al-fakhreyah-villa-project): 3/1 full width, then 3/2 and 3/3 side by side
const project3HeroImages = computed(() => {
  if (projectSlug !== 'al-fakhreyah-villa-project') return [] as string[]

  const img1 = galleryImages.value.find((img) => img.endsWith('/images/projects/3/1.png'))
  const img2 = galleryImages.value.find((img) => img.endsWith('/images/projects/3/2.png'))
  const img3 = galleryImages.value.find((img) => img.endsWith('/images/projects/3/3.png'))
  if (!img1 || !img2 || !img3) return [] as string[]
  return [img1, img2, img3]
})

// Project 8 (thabat): 8/1 full width, then 8/2 and 8/3 side by side
const project8HeroImages = computed(() => {
  if (projectSlug !== 'thabat') return [] as string[]

  const img1 = galleryImages.value.find((img) => img.endsWith('/images/projects/8/1.png'))
  const img2 = galleryImages.value.find((img) => img.endsWith('/images/projects/8/2.png'))
  const img3 = galleryImages.value.find((img) => img.endsWith('/images/projects/8/3.png'))
  if (!img1 || !img2 || !img3) return [] as string[]
  return [img1, img2, img3]
})

// Project 7 (tulip-spa): 7/3 full width, then 7/1 and 7/2 side by side
const project7HeroImages = computed(() => {
  if (projectSlug !== 'tulip-spa') return [] as string[]

  const img3 = galleryImages.value.find((img) => img.endsWith('/images/projects/7/3.png'))
  const img1 = galleryImages.value.find((img) => img.endsWith('/images/projects/7/1.png'))
  const img2 = galleryImages.value.find((img) => img.endsWith('/images/projects/7/2.png'))
  if (!img1 || !img2 || !img3) return [] as string[]
  return [img3, img1, img2]
})

const galleryImagesForLayout = computed(() => {
  const remove = new Set<string>()

  if (projectSlug === 'albahar-villas') {
    if (diagramPairImages.value.length === 2) {
      remove.add('/images/projects/1/3.png')
      remove.add('/images/projects/1/9.png')
    }
    if (tailPairImages.value.length === 2) {
      remove.add('/images/projects/1/13.png')
      remove.add('/images/projects/1/14.png')
    }
    if (midPairImages.value.length === 2) {
      remove.add('/images/projects/1/10.png')
      remove.add('/images/projects/1/12.png')
    }
    if (quadImages.value.length === 4) {
      remove.add('/images/projects/1/4.png')
      remove.add('/images/projects/1/5.png')
      remove.add('/images/projects/1/6.png')
      remove.add('/images/projects/1/7.png')
    }
  }

  if (projectSlug === 'efficiency-center-khobar') {
    if (gdcQuadImages.value.length === 4) {
      remove.add('/images/projects/6/3.png')
      remove.add('/images/projects/6/4.png')
      remove.add('/images/projects/6/5.png')
      remove.add('/images/projects/6/11.png')
    }
    if (gdcTailPairImages.value.length === 2) {
      remove.add('/images/projects/6/12.png')
      remove.add('/images/projects/6/13.png')
    }
  }

  if (projectSlug === 'private-shalet') {
    if (project4QuadImages.value.length === 4) {
      remove.add('/images/projects/4/3.png')
      remove.add('/images/projects/4/4.png')
      remove.add('/images/projects/4/5.png')
      remove.add('/images/projects/4/6.png')
    }
    if (project4TailPairImages.value.length === 2) {
      remove.add('/images/projects/4/10.png')
      remove.add('/images/projects/4/11.png')
    }
  }

  if (projectSlug === 'gdc' && project5QuadImages.value.length === 4) {
    remove.add('/images/projects/5/3.png')
    remove.add('/images/projects/5/4.png')
    remove.add('/images/projects/5/5.png')
    remove.add('/images/projects/5/6.png')
  }

  if (projectSlug === 'al-fakhreyah-villa-project' && project3HeroImages.value.length === 3) {
    remove.add('/images/projects/3/1.png')
    remove.add('/images/projects/3/2.png')
    remove.add('/images/projects/3/3.png')
  }

  if (projectSlug === 'roaya' && project9TailPairImages.value.length === 2) {
    remove.add('/images/projects/9/5.png')
    remove.add('/images/projects/9/6.png')
  }

  if (projectSlug === 'thabat' && project8HeroImages.value.length === 3) {
    remove.add('/images/projects/8/1.png')
    remove.add('/images/projects/8/2.png')
    remove.add('/images/projects/8/3.png')
  }

  if (projectSlug === 'tulip-spa' && project7HeroImages.value.length === 3) {
    remove.add('/images/projects/7/1.png')
    remove.add('/images/projects/7/2.png')
    remove.add('/images/projects/7/3.png')
  }

  if (projectSlug === 'albarghash') {
    if (project2CigarRoomImages.value.length === 3) {
      remove.add('/images/projects/2/1.png')
      remove.add('/images/projects/2/2.png')
      remove.add('/images/projects/2/3.png')
    }
    if (project2ShowcaseImages.value.length === 6) {
      remove.add('/images/projects/2/9.png')
      remove.add('/images/projects/2/10.png')
      remove.add('/images/projects/2/11.png')
      remove.add('/images/projects/2/12.png')
      remove.add('/images/projects/2/13.png')
      remove.add('/images/projects/2/15.png')
    }
    if (project2QuadImages.value.length === 4) {
      remove.add('/images/projects/2/5.png')
      remove.add('/images/projects/2/6.png')
      remove.add('/images/projects/2/7.png')
      remove.add('/images/projects/2/8.png')
    }
    if (project2FinalBlockImages.value.length === 3) {
      remove.add('/images/projects/2/14.png')
      remove.add('/images/projects/2/16.png')
      remove.add('/images/projects/2/17.png')
    }
    if (project2SixImages.value.length === 6) {
      remove.add('/images/projects/2/4.png')
      remove.add('/images/projects/2/18.png')
      remove.add('/images/projects/2/19.png')
      remove.add('/images/projects/2/20.png')
      remove.add('/images/projects/2/21.png')
      remove.add('/images/projects/2/22.png')
    }
  }

  if (remove.size === 0) return galleryImages.value

  return galleryImages.value.filter((img) => {
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

useHead({
  title: `${localizedProject.value.title} · ${t('projects.title')}`,
  meta: [
    {
      name: 'description',
      content: localizedProject.value.description,
    },
  ],
})

// GSAP animations
const heroImage = ref<HTMLElement | null>(null)
const contentSections = ref<HTMLElement[]>([])

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
    <section
      ref="heroImage"
      data-hero
      class="relative isolate flex min-h-screen w-full items-end justify-center overflow-hidden"
    >
      <img
        :src="localizedProject.image"
        :alt="localizedProject.title"
        width="1920"
        height="1080"
        fetchpriority="high"
        decoding="async"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
    </section>

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
          <p v-if="localizedProject.overview" class="text-base leading-relaxed text-slate-600 md:text-lg">
            {{ localizedProject.overview }}
          </p>
          <p v-else class="text-base leading-relaxed text-slate-600 md:text-lg">
            {{ localizedProject.description }}
          </p>
        </div>

        <!-- Right Column: Project Details -->
        <div class="space-y-6">
          <div v-if="localizedProject.location" class="grid grid-cols-1 gap-1 sm:grid-cols-[120px_1fr] sm:gap-4">
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">{{ t('projectDetail.location') }}</p>
            <p class="text-sm text-ink break-words">{{ localizedProject.location }}</p>
          </div>
          <div v-if="localizedProject.year" class="grid grid-cols-1 gap-1 sm:grid-cols-[120px_1fr] sm:gap-4">
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">{{ t('projectDetail.year') }}</p>
            <p class="text-sm text-ink break-words">{{ localizedProject.year }}</p>
          </div>
          <div v-if="localizedProject.client" class="grid grid-cols-1 gap-1 sm:grid-cols-[120px_1fr] sm:gap-4">
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">{{ t('projectDetail.client') }}</p>
            <p class="text-sm text-ink break-words">{{ localizedProject.client }}</p>
          </div>
          <div v-if="localizedProject.services && localizedProject.services.length > 0" class="grid grid-cols-1 gap-1 sm:grid-cols-[120px_1fr] sm:gap-4">
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">{{ t('projectDetail.services') }}</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="service in localizedProject.services"
                :key="service"
                class="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700"
              >
                {{ service }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Images Grid Section -->
    <section
      v-if="galleryImagesForLayout.length > 0 || project2CigarRoomImages.length === 3 || project2ShowcaseImages.length === 6 || project2QuadImages.length === 4 || project2FinalBlockImages.length === 3 || project2SixImages.length === 6 || project3HeroImages.length === 3 || project8HeroImages.length === 3 || project7HeroImages.length === 3 || diagramPairImages.length === 2 || quadImages.length === 4 || gdcQuadImages.length === 4 || project4QuadImages.length === 4 || project5QuadImages.length === 4 || project4TailPairImages.length === 2 || project9TailPairImages.length === 2 || gdcTailPairImages.length === 2 || midPairImages.length === 2 || tailPairImages.length === 2"
      :ref="registerContentSection"
      class="section-wrapper relative z-10 py-16 md:py-24"
    >
      <div class="space-y-6">
        <!-- Project 3 (Al-Fakhreyah): 3/1 full width, then 3/2 and 3/3 side by side -->
        <div v-if="project3HeroImages.length === 3" class="space-y-6">
          <div class="aspect-[16/9] w-full overflow-hidden rounded-xl">
            <img
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
              class="aspect-[4/3] overflow-hidden rounded-xl"
            >
              <img
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
          <p
            v-if="localizedProject.overview"
            class="text-base leading-relaxed text-slate-600 md:text-lg lg:text-xl"
          >
            {{ localizedProject.overview }}
          </p>
        </div>

        <!-- Project 8 (Thabat): 8/1 full width, then 8/2 and 8/3 side by side -->
        <div v-if="project8HeroImages.length === 3" class="space-y-6">
          <div class="aspect-[16/9] w-full overflow-hidden rounded-xl">
            <img
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
              class="aspect-[4/3] overflow-hidden rounded-xl"
            >
              <img
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
          <div class="aspect-[16/9] w-full overflow-hidden rounded-xl">
            <img
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
              class="aspect-[4/3] overflow-hidden rounded-xl"
            >
              <img
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

        <!-- Project 2 (AlBarghash): 2/1 full width, then 2/2 and 2/3 side by side, then description -->
        <div v-if="project2CigarRoomImages.length === 3" class="space-y-6">
          <div class="aspect-[16/9] w-full overflow-hidden rounded-xl">
            <img
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
              class="aspect-[4/3] overflow-hidden rounded-xl"
            >
              <img
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
          <div v-if="localizedProject.overview || localizedProject.description" class="py-6 md:py-8">
            <p class="text-base leading-relaxed text-slate-600 md:text-lg lg:text-xl">
              {{ localizedProject.overview || localizedProject.description }}
            </p>
          </div>
        </div>

        <!-- Project 2 (AlBarghash): 2/9–2/13 in pairs (two together), then description below -->
        <div v-if="project2ShowcaseImages.length === 6" class="space-y-6">
          <div class="grid gap-6 grid-cols-2">
            <div
              v-for="(image, index) in project2ShowcaseImages"
              :key="`showcase-${index}`"
              class="aspect-[4/3] overflow-hidden rounded-xl"
            >
              <img
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
          <div v-if="localizedProject.challenge || localizedProject.solution || localizedProject.results" class="py-6 md:py-8">
            <p class="text-base leading-relaxed text-slate-600 md:text-lg lg:text-xl">
              {{ localizedProject.challenge || localizedProject.solution || localizedProject.results }}
            </p>
          </div>
        </div>

        <!-- Project 2 (AlBarghash): 2/6, 2/5, 2/8, 2/7 in 2x2 after showcase, then text -->
        <div v-if="project2QuadImages.length === 4" class="space-y-6">
          <div class="grid gap-6 grid-cols-2">
            <div
              v-for="(image, index) in project2QuadImages"
              :key="`project2-quad-${index}`"
              class="aspect-[4/3] overflow-hidden rounded-xl"
            >
              <img
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
          <div v-if="localizedProject.challenge || localizedProject.solution || localizedProject.results" class="py-6 md:py-8">
            <p class="text-base leading-relaxed text-slate-600 md:text-lg lg:text-xl">
              {{ localizedProject.challenge || localizedProject.solution || localizedProject.results }}
            </p>
          </div>
        </div>

        <!-- Project 2 (AlBarghash): 2/14 full width, then 2/16 and 2/17 side by side -->
        <div v-if="project2FinalBlockImages.length === 3" class="space-y-6">
          <div class="aspect-[16/9] w-full overflow-hidden rounded-xl">
            <img
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
              class="aspect-[4/3] overflow-hidden rounded-xl"
            >
              <img
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
          <div v-if="localizedProject.challenge || localizedProject.solution || localizedProject.results" class="py-6 md:py-8">
            <p class="text-base leading-relaxed text-slate-600 md:text-lg lg:text-xl">
              {{ localizedProject.challenge || localizedProject.solution || localizedProject.results }}
            </p>
          </div>
        </div>

        <!-- Project 2 (AlBarghash): 2/4, 2/18–2/22 together -->
        <div v-if="project2SixImages.length === 6" class="grid gap-6 grid-cols-2 md:grid-cols-3">
          <div
            v-for="(image, index) in project2SixImages"
            :key="`project2-six-${index}`"
            class="aspect-[4/3] overflow-hidden rounded-xl"
          >
            <img
              :src="image"
              :alt="`${localizedProject.title} - Image ${index + 1}`"
              class="h-full w-full object-cover"
            />
          </div>
        </div>

        <!-- Two Column Grid -->
        <div class="grid gap-6 md:grid-cols-2">
          <div
            v-for="(image, index) in galleryImagesForLayout.slice(0, 2)"
            :key="`img-top-${index}`"
            class="aspect-[4/3] overflow-hidden rounded-xl"
          >
            <img
              :src="image"
              :alt="`${localizedProject.title} - Image ${index + 1}`"
              class="h-full w-full object-cover"
            />
          </div>

          <!-- Mid-gallery paragraph -->
          <div
            v-if="localizedProject.overview || localizedProject.description"
            class="md:col-span-2 py-10 md:py-14"
          >
            <p class="text-base leading-relaxed text-slate-600 md:text-lg lg:text-xl">
              {{ localizedProject.overview || localizedProject.description }}
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
                class="aspect-[4/3] overflow-hidden rounded-xl"
              >
                <img
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
                <img
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
                class="aspect-[4/3] overflow-hidden rounded-xl"
              >
                <img
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
                class="aspect-[4/3] overflow-hidden rounded-xl"
              >
                <img
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
                class="aspect-[4/3] overflow-hidden rounded-xl"
              >
                <img
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
                <img
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

          <!-- Remaining images (after first 2 + quad or first 5) -->
          <div
            v-for="(image, index) in remainingGalleryImages"
            :key="`img-rest-${index}`"
            :class="isProjectOne ? 'aspect-[16/10]' : 'aspect-[4/3]'"
            class="overflow-hidden rounded-xl"
          >
            <img
              :src="image"
              :alt="`${localizedProject.title} - Image ${index + (gdcQuadImages.length === 4 || project4QuadImages.length === 4 || project5QuadImages.length === 4 ? 3 : 6)}`"
              width="800"
              height="600"
              loading="lazy"
              decoding="async"
              class="h-full w-full object-cover"
            />
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
                <img
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
                class="aspect-[4/3] overflow-hidden rounded-xl"
              >
                <img
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
                <img
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
                class="aspect-[4/3] overflow-hidden rounded-xl"
              >
                <img
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
                <img
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
        </div>
        
        <!-- Full Width Image -->
        <div v-if="shouldShowFullWidthImage" class="aspect-[16/9] w-full overflow-hidden rounded-xl">
          <img
            :src="localizedProject.fullWidthImage"
            :alt="`${localizedProject.title} - Full Width`"
            width="1200"
            height="675"
            loading="lazy"
            decoding="async"
            class="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>

    <!-- Project CTA -->
    <section :ref="registerContentSection" class="relative z-10 w-full overflow-hidden">
      <div class="relative min-h-[500px] overflow-hidden">
        <img
          :src="`${baseURL}images/hero-image.png`"
          alt=""
          width="1920"
          height="1080"
          loading="lazy"
          decoding="async"
          class="absolute inset-0 h-full w-full object-cover"
        />
        <!-- Same gradient overlay as hero section -->
        <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20"></div>
        <div class="section-wrapper relative z-10 flex min-h-[500px] flex-col items-center justify-center py-16 text-center">
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
</template>

