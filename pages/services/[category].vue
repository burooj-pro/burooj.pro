<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()
const config = useRuntimeConfig()
const baseURL = config.app.baseURL || '/'

const { fadeInUp, fadeInFromSide, staggerFadeIn, scaleIn } = useGsap()
const heroSection = ref<HTMLElement | null>(null)
const aboutSection = ref<HTMLElement | null>(null)
const subservicesSection = ref<HTMLElement | null>(null)
const processSection = ref<HTMLElement | null>(null)
const processItemsRefs = ref<HTMLElement[]>([])
const experienceSection = ref<HTMLElement | null>(null)
const projectsSection = ref<HTMLElement | null>(null)
const projectItemsRefs = ref<HTMLElement[]>([])
const clientsSection = ref<HTMLElement | null>(null)
const clientLogosRefs = ref<HTMLElement[]>([])
const ctaSection = ref<HTMLElement | null>(null)

// Project hover state
const hoveredProjectIndex = ref<number | null>(null)

const handleProjectEnter = (index: number) => {
  hoveredProjectIndex.value = index
}

const handleProjectLeave = () => {
  hoveredProjectIndex.value = null
}

// Process step expansion state
const expandedStepIndex = ref<number | null>(0) // First step expanded by default

const toggleStep = (index: number) => {
  if (expandedStepIndex.value === index) {
    expandedStepIndex.value = null
  } else {
    expandedStepIndex.value = index
  }
}

// Get category from route
const categorySlug = Array.isArray(route.params.category)
  ? route.params.category[0]
  : (route.params.category as string)

// Map slugs to categories
const categoryMap: Record<string, { key: string; titleKey: string; descriptionKey: string; image: string }> = {
  'construction-engineering': {
    key: 'Construction & Engineering',
    titleKey: 'home.services.construction.titleFull',
    descriptionKey: 'home.services.construction.description',
    image: `${baseURL}images/service1.png`,
  },
  'property-management': {
    key: 'Property Management',
    titleKey: 'home.services.property.titleFull',
    descriptionKey: 'home.services.property.description',
    image: `${baseURL}images/service2.png`,
  },
  'drone-cleaning': {
    key: 'Drone Cleaning',
    titleKey: 'home.services.drone.titleFull',
    descriptionKey: 'home.services.drone.description',
    image: `${baseURL}images/service3.png`,
  },
}

const categoryInfo = categoryMap[categorySlug]

if (!categoryInfo) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Service category not found',
  })
}

const { getServicesByCategory, getLocalizedService } = useServices()
const { projects: allProjects, getLocalizedProject } = useProjects()

// Get projects for this category
const categoryProjects = computed(() => {
  return allProjects
    .filter((project: any) => project.category === categoryInfo.key)
    .map((project: any) => getLocalizedProject(project))
})

const { clientLogos } = useClientLogos({ placeholders: 0 })

// Get services for this category
const categoryServices = computed(() => {
  if (categoryInfo.key === 'Drone Cleaning') {
    // Drone cleaning doesn't have individual services in useServices
    return []
  }
  const services = getServicesByCategory(categoryInfo.key as 'Construction & Engineering' | 'Property Management')
  return services.map(service => getLocalizedService(service))
})

// Get process steps (use first service's process if available, or create default)
const processSteps = computed(() => {
  if (categoryServices.value.length > 0 && categoryServices.value[0].process) {
    return categoryServices.value[0].process
  }
  // Default process for categories without specific process
  return [
    {
      title: 'Consultation',
      description: 'We begin by understanding your needs, requirements, and objectives through detailed consultation.',
    },
    {
      title: 'Planning & Design',
      description: 'Our team develops comprehensive plans and designs tailored to your specific requirements.',
    },
    {
      title: 'Implementation',
      description: 'We execute the project with precision, ensuring quality and adherence to timelines.',
    },
    {
      title: 'Quality Assurance',
      description: 'We conduct thorough quality checks to ensure all deliverables meet our high standards.',
    },
    {
      title: 'Delivery & Support',
      description: 'We deliver the completed project and provide ongoing support as needed.',
    },
  ]
})

useHead({
  title: `${t(categoryInfo.titleKey)} · ${t('services.title')}`,
  meta: [
    {
      name: 'description',
      content: t(categoryInfo.descriptionKey),
    },
  ],
})

onMounted(() => {
  if (typeof window === 'undefined') return

  fadeInUp(heroSection)
  fadeInUp(aboutSection)
  fadeInFromSide(subservicesSection, 'left')
  fadeInUp(processSection)
  fadeInUp(experienceSection)
  fadeInUp(projectsSection)
  scaleIn(clientsSection)
  fadeInUp(ctaSection)
  
  // Stagger animate process items, project items, and client logos
  if (import.meta.client) {
    nextTick(() => {
      setTimeout(() => {
        if (processItemsRefs.value.length > 0) {
          staggerFadeIn(processItemsRefs, { stagger: 0.1 })
        }
        if (projectItemsRefs.value.length > 0) {
          staggerFadeIn(projectItemsRefs, { stagger: 0.15 })
        }
        if (clientLogosRefs.value.length > 0) {
          staggerFadeIn(clientLogosRefs, { stagger: 0.05 })
        }
      }, 200)
    })
  }
})

</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section - Same design as About page -->
    <section
      ref="heroSection"
      data-hero
      class="relative isolate flex min-h-[70vh] w-full items-end justify-center overflow-hidden"
    >
      <img
        :src="categoryInfo.image"
        :alt="t(categoryInfo.titleKey)"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
      <div class="relative z-10 w-full pb-8 text-left text-white md:pb-12 lg:pb-16">
        <div class="container w-full px-6 md:px-12 lg:px-16 xl:px-20">
          <div class="max-w-7xl space-y-6">
            <h1 class="w-full text-4xl font-normal leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
              {{ t(categoryInfo.titleKey) }}
            </h1>
            <p class="max-w-4xl text-base font-normal leading-relaxed text-white/95 md:text-lg lg:text-xl">
              {{ t(categoryInfo.descriptionKey) }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- About Section - Same style as Home page about section -->
    <section ref="aboutSection" class="relative z-10 bg-white py-16 md:py-24">
      <div class="container px-6 md:px-12 lg:px-16 xl:px-20">
        <div class="max-w-4xl space-y-8">
          <h2 class="text-4xl font-serif leading-tight text-ink md:text-5xl lg:text-6xl">
            {{ t('home.about.title') }}<span class="text-primary">{{ t('home.about.titleHighlight') }}</span>{{ t('home.about.titleSuffix') }}
          </h2>

          <p class="text-base font-serif leading-relaxed text-ink md:text-lg">
            {{ t(categoryInfo.descriptionKey) }}
          </p>
        </div>
      </div>
    </section>

    <!-- Subservices Section - Exact same as Home page services -->
    <section v-if="categoryServices.length > 0" ref="subservicesSection" class="relative z-10 w-full">
      <!-- Section Title - Same as home page -->
      <div class="section-wrapper py-16 md:py-24">
        <div class="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
          <div>
            <h2 class="text-4xl font-serif leading-tight text-ink md:text-5xl lg:text-6xl">
              {{ t('home.services.title') }}
            </h2>
          </div>
          <div>
            <p class="text-base leading-relaxed text-slate-600 md:text-lg">
              {{ t(categoryInfo.descriptionKey) }}
            </p>
          </div>
        </div>
      </div>

      <!-- Horizontal Scrollable Grid - Same design as home page, no gaps -->
      <div class="overflow-x-auto scrollbar-hide -mx-6 md:-mx-12 lg:-mx-16 xl:-mx-20">
        <div class="flex gap-0 px-6 md:px-12 lg:px-16 xl:px-20" style="width: max-content;">
          <div
            v-for="service in categoryServices"
            :key="service.slug"
            class="group relative flex min-h-[420px] w-[100vw] flex-none items-end overflow-hidden sm:min-h-[520px] md:min-h-[700px] md:w-[33.333333vw] lg:min-h-[800px]"
          >
            <div
              v-if="service.image"
              class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
              :style="`background-image: url('${service.image}');`"
            ></div>
            <div
              v-else
              class="absolute inset-0 bg-gradient-to-br from-primary/80 to-primary-dark/80"
            ></div>
            <!-- Gradient Overlay - Dark from bottom to light at top -->
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
            <!-- Text Overlay -->
            <div class="relative z-10 w-full p-8 pb-12 md:p-12 md:pb-16">
              <h3 class="text-3xl font-bold uppercase tracking-wide text-white md:text-4xl lg:text-5xl">
                {{ service.title }}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Process Section -->
    <section v-if="processSteps.length > 0" ref="processSection" class="section-wrapper relative z-10 py-16 md:py-24">
      <div class="space-y-12">
        <!-- Section Title -->
        <div class="space-y-4">
          <h2 class="text-4xl font-serif leading-tight text-ink md:text-5xl lg:text-6xl">
            {{ t('services.process.title') }}
          </h2>
          <p class="text-base font-serif leading-relaxed text-slate-600 md:text-lg">
            {{ t('services.process.subtitle') }}
          </p>
        </div>

        <!-- Process Steps Grid -->
        <div class="grid grid-cols-1 border-t border-l border-primary/30 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(step, index) in processSteps"
            :key="step.title"
            :ref="(el) => { const node = (el as any)?.$el ?? el; if (node && (node as any).nodeType === 1) processItemsRefs[index] = node as HTMLElement }"
            class="group relative border-b border-r border-primary/30 bg-white transition-colors"
            :class="{ 'bg-slate-50': expandedStepIndex === index }"
          >
            <!-- Clickable Header -->
            <button
              type="button"
              class="w-full p-6 text-left"
              @click="toggleStep(index)"
            >
              <!-- Large Light Grey Number -->
              <div class="mb-4 text-7xl font-light leading-none text-primary/20 md:text-8xl">
                {{ String(index + 1).padStart(2, '0') }}
              </div>
              
              <!-- Step Title -->
              <h3 class="mb-4 text-base font-normal leading-relaxed text-ink md:text-lg">
                {{ step.title }}
              </h3>
              
              <!-- Divider Line with Plus/Minus Icon Centered -->
              <div class="flex items-center">
                <div class="h-px flex-1 bg-primary/30"></div>
                <button
                  type="button"
                  class="mx-4 flex h-6 w-6 items-center justify-center text-ink transition-colors hover:text-primary"
                  @click.stop="toggleStep(index)"
                >
                  <svg v-if="expandedStepIndex === index" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                  </svg>
                  <svg v-else class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <div class="h-px flex-1 bg-primary/30"></div>
              </div>
            </button>
            
            <!-- Expandable Content -->
            <transition name="expand">
              <div v-if="expandedStepIndex === index" class="px-6 pb-6">
                <p class="pt-6 text-sm leading-relaxed text-slate-600 md:text-base">
                  {{ step.description }}
                </p>
              </div>
            </transition>
          </div>
        </div>
      </div>
    </section>

    <!-- Related Projects Section -->
    <section v-if="categoryProjects.length > 0" ref="projectsSection" class="section-wrapper relative z-10 py-16 md:py-24">
      <!-- Header -->
      <div class="mb-12 flex items-center justify-between border-b border-primary/30 pb-6">
        <h2 class="text-4xl font-serif leading-tight text-ink md:text-5xl lg:text-6xl">
          {{ t('projects.title') }}
        </h2>
        <NuxtLink
          :to="localePath('/projects')"
          class="flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-700"
        >
          {{ t('projects.viewAll') }}
          <span class="text-base">→</span>
        </NuxtLink>
      </div>

      <!-- Projects List -->
      <div>
        <NuxtLink
          v-for="(project, index) in categoryProjects"
          :key="project.slug"
          :to="localePath(`/projects/${project.slug}`)"
          :ref="(el) => { const node = (el as any)?.$el ?? el; if (node && (node as any).nodeType === 1) projectItemsRefs[index] = node as HTMLElement }"
          class="group relative grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.3fr] md:items-start"
          :class="{ 'gradient-border-top pt-20': index > 0, 'pb-20': index < categoryProjects.length - 1 }"
          @mouseenter="handleProjectEnter(index)"
          @mouseleave="handleProjectLeave"
        >
          <!-- Background Overlay for This Project -->
          <transition name="fade">
            <div
              v-if="hoveredProjectIndex === index"
              class="pointer-events-none absolute inset-0 z-[1] bg-overlay-transition"
              :style="{
                backgroundImage: `url(${project.image})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                filter: 'blur(40px) brightness(1.3)',
                opacity: 0.3,
              }"
            />
          </transition>

          <!-- Left Column: Text Content -->
          <div class="relative z-10 space-y-4">
            <h3 class="text-2xl font-bold leading-tight tracking-tight text-ink md:text-3xl lg:text-4xl">
              {{ project.title }}
            </h3>
            <p class="text-sm leading-relaxed text-slate-600 md:text-base">
              {{ project.description }}
            </p>
            <!-- Tags -->
            <div class="flex flex-wrap gap-2 pt-1">
              <span class="rounded-lg bg-primary-light px-3 py-1.5 text-xs font-medium leading-normal text-primary">
                {{ project.category }}
              </span>
              <span class="rounded-lg bg-primary-light px-3 py-1.5 text-xs font-medium leading-normal text-primary">
                {{ project.status }}
              </span>
            </div>
          </div>

          <!-- Right Column: Visual -->
          <div class="relative z-10 aspect-[16/9] overflow-hidden rounded-xl group">
            <img
              :src="project.image"
              :alt="project.title"
              class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
        </NuxtLink>
      </div>
    </section>

    <!-- Clients Section -->
    <section ref="clientsSection" class="section-wrapper relative z-10 py-16 md:py-24">
      <h2 class="mb-8 text-4xl font-serif leading-tight text-ink md:text-5xl lg:text-6xl">
        {{ t('about.clients.title') }}
      </h2>
      <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        <div
          v-for="(logo, index) in clientLogos"
          :key="`${logo.name}-${index}`"
          :ref="(el) => { const node = (el as any)?.$el ?? el; if (node && (node as any).nodeType === 1) clientLogosRefs[index] = node as HTMLElement }"
          class="group flex min-h-0 min-w-0 items-center justify-center overflow-hidden rounded-lg px-3 py-6 transition-colors sm:px-4 sm:py-8 md:px-6 md:py-10"
          style="background-color: #F4F2F2;"
        >
          <img
            v-if="'image' in logo && logo.image"
            :src="logo.image"
            :alt="logo.name"
            class="max-h-full max-w-full object-contain opacity-80 grayscale transition group-hover:opacity-100"
            :class="(logo.name === 'Thabat' || logo.name === 'GDC' || logo.name === 'Qiddiya' || logo.name === 'Barghash') ? 'h-12 max-h-14 w-auto sm:h-14 sm:max-h-16 md:h-16 md:max-h-20' : 'h-8 max-h-10 w-auto sm:h-10 sm:max-h-12 md:h-12 md:max-h-14'"
            loading="lazy"
          />
          <span v-else class="text-xs font-medium text-slate-500">Client placeholder</span>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section ref="ctaSection" class="relative z-10 w-full overflow-hidden">
      <div
        class="relative min-h-[500px] overflow-hidden"
      >
        <img
          :src="`${baseURL}images/hero-image.png`"
          alt=""
          class="absolute inset-0 h-full w-full object-cover"
        />
        <!-- Same gradient overlay as hero section -->
        <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20"></div>
        <div class="section-wrapper relative z-10 flex min-h-[500px] flex-col items-center justify-center py-16 text-center">
          <h3 class="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
            {{ t('cta.title') }}
          </h3>
          <div class="mt-8">
            <NuxtLink
              :to="localePath('/contact')"
              class="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-white/90"
            >
              {{ t('nav.bookConsultation') }}
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>
