<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const config = useRuntimeConfig()
const baseURL = config.app.baseURL || '/'
useHead({ title: t('nav.home') })

const { fadeInUp, fadeInFromSide, scaleIn, staggerFadeIn, animateCounter, fixedHero } = useGsap()
const heroSection = ref<HTMLElement | null>(null)
const aboutSection = ref<HTMLElement | null>(null)
const servicesSection = ref<HTMLElement | null>(null)
const projectsSection = ref<HTMLElement | null>(null)
const clientsSection = ref<HTMLElement | null>(null)
const ctaSection = ref<HTMLElement | null>(null)
const statsSection = ref<HTMLElement | null>(null)
const statRefs = ref<HTMLElement[]>([])
const projectItems = ref<HTMLElement[]>([])
const clientLogosRefs = ref<HTMLElement[]>([])

// Custom cursor for service items
const cursorPosition = ref({ x: 0, y: 0 })
const isHoveringService = ref(false)
const hoveredServiceType = ref<'read-more' | 'visit-website'>('read-more')

const handleMouseMove = (e: MouseEvent) => {
  cursorPosition.value = { x: e.clientX, y: e.clientY }
}

const handleServiceEnter = (serviceType: 'read-more' | 'visit-website' = 'read-more') => {
  isHoveringService.value = true
  hoveredServiceType.value = serviceType
}

const handleServiceLeave = () => {
  isHoveringService.value = false
}

// Custom cursor for project items
const isHoveringProject = ref(false)
const hoveredProjectIndex = ref<number | null>(null)

const handleProjectEnter = (index: number) => {
  isHoveringProject.value = true
  hoveredProjectIndex.value = index
}

const handleProjectLeave = () => {
  isHoveringProject.value = false
  hoveredProjectIndex.value = null
}


onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})

const aboutStats = computed(() => [
  { value: 150, prefix: '+', label: { title: t('stats.stat1.title'), description: t('stats.stat1.description') } },
  { value: 500, prefix: '+', label: { title: t('stats.stat2.title'), description: t('stats.stat2.description') } },
  { value: 20000, prefix: '+', suffix: ' m²', label: { title: t('stats.stat3.title'), description: t('stats.stat3.description') } },
  { value: 7, prefix: '+', label: { title: 'Years of Excellence', description: t('about.stats.stat4.description') } },
])

onMounted(() => {
  if (typeof window === 'undefined') return
  
  window.addEventListener('mousemove', handleMouseMove)
  
  // Initialize fixed hero section
  fixedHero(heroSection)
  
  // Animate sections on scroll - these will be triggered by ScrollTrigger
  fadeInUp(heroSection)
  fadeInUp(aboutSection)
  fadeInUp(statsSection)
  fadeInFromSide(servicesSection, 'left')
  fadeInUp(projectsSection)
  scaleIn(clientsSection)
  fadeInUp(ctaSection)
  
  // Animate counters - wait for DOM to be ready and refs to be assigned
  if (import.meta.client) {
    nextTick(() => {
      // Wait for ScrollTrigger to be ready after hero section pins
      setTimeout(() => {
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          // Initialize counters after ensuring refs are set
          setTimeout(() => {
            if (statRefs.value[0]) animateCounter(statRefs.value[0], 150, { prefix: '+', duration: 2 })
            if (statRefs.value[1]) animateCounter(statRefs.value[1], 500, { prefix: '+', duration: 2 })
            if (statRefs.value[2]) animateCounter(statRefs.value[2], 20000, { prefix: '+', suffix: ' m²', duration: 2 })
            if (statRefs.value[3]) animateCounter(statRefs.value[3], 7, { prefix: '+', duration: 2 })
          
            // Stagger animate project items - wait a bit more for refs to populate
            setTimeout(() => {
              if (projectItems.value.length > 0) {
                staggerFadeIn(projectItems, { stagger: 0.15 })
              }
              
              // Stagger animate client logos
              if (clientLogosRefs.value.length > 0) {
                staggerFadeIn(clientLogosRefs, { stagger: 0.05 })
              }
            }, 200)
          
            // Refresh ScrollTrigger after all animations are initialized
            ScrollTrigger.refresh()
          }, 500)
        })
      }, 1200)
    })
  }
})

const constructionServices = computed(() => [
  t('services.construction.items.architecture'),
  t('services.construction.items.interior'),
  t('services.construction.items.landscape'),
  t('services.construction.items.furniture'),
  t('services.construction.items.hvac'),
  t('services.construction.items.fire'),
  t('services.construction.items.electrical'),
  t('services.construction.items.plumbing'),
  t('services.construction.items.finishing'),
  t('services.construction.items.smart'),
])

const propertyServices = computed(() => [
  t('services.property.items.marketing'),
  t('services.property.items.leasing'),
  t('services.property.items.pricing'),
  t('services.property.items.listing'),
  t('services.property.items.tenant'),
  t('services.property.items.loi'),
  t('services.property.items.legal'),
  t('services.property.items.government'),
  t('services.property.items.contract'),
  t('services.property.items.revenue'),
  t('services.property.items.reporting'),
  t('services.property.items.valuation'),
  t('services.property.items.cost'),
  t('services.property.items.cleaning'),
  t('services.property.items.security'),
  t('services.property.items.efficiency'),
  t('services.property.items.zakat'),
])

const droneServices = computed(() => [
  t('services.drone.services.facade'),
  t('services.drone.services.solar'),
  t('services.drone.services.bridges'),
  t('services.drone.services.tanks'),
  t('services.drone.services.industrial'),
  t('services.drone.services.signage'),
])

const { projects: allProjects, getLocalizedProject } = useProjects()

// Localize projects to get correct image paths with baseURL
const projects = computed(() => {
  return allProjects.map((project: any) => getLocalizedProject(project))
})

const clientLogos = Array.from({ length: 12 }, (_, index) => ({
  name: `Client ${index + 1}`,
}))
</script>

<template>
  <section
    ref="heroSection"
    class="relative isolate flex min-h-screen w-screen items-end justify-center overflow-hidden"
    style="margin-left: calc(-50vw + 50%); margin-right: calc(-50vw + 50%);"
  >
    <img
      :src="`${baseURL}images/hero-image.png`"
      alt="Burooj modern development"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
    <div class="relative z-10 w-full pb-8 text-left text-white md:pb-12 lg:pb-16">
      <div class="container w-full px-6 md:px-12 lg:px-16 xl:px-20">
        <div class="max-w-7xl space-y-6">
        <h1 class="w-full text-4xl font-normal leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
          {{ t('home.hero.headline') }}
        </h1>
        <p class="max-w-4xl text-base font-normal leading-relaxed text-white/95 md:text-lg lg:text-xl">
          {{ t('home.hero.subheadline') }}
        </p>
        </div>
      </div>
    </div>
  </section>

  <section id="about" ref="aboutSection" class="relative z-10 bg-white py-16 md:py-24">
    <div class="container px-6 md:px-12 lg:px-16 xl:px-20">
      <div class="max-w-6xl space-y-8">
        <h2 class="text-4xl font-serif leading-tight text-ink md:text-5xl lg:text-6xl">
          <span>{{ t('home.about.title') }}<span class="text-primary">{{ t('home.about.titleHighlight') }}</span>{{ t('home.about.titleSuffix') }}</span><br />
          <span>{{ t('home.about.titleLine2') }}</span>
        </h2>

        <p class="whitespace-pre-line text-base font-serif leading-relaxed text-ink md:text-lg">
          {{ t('home.about.description') }}
        </p>
      </div>
    </div>

    <!-- Statistics Section -->
    <section ref="statsSection" class="relative z-10 bg-white py-16 md:py-24">
      <div class="w-full px-6 md:px-12 lg:px-16 xl:px-20">
        <div class="max-w-[1600px]">
          <div class="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
            <!-- Left Column - Title (Sticky) -->
            <div class="flex items-start">
              <div class="sticky top-24 md:top-32">
                <h2 class="text-4xl font-normal leading-tight text-ink md:text-5xl lg:text-6xl xl:text-7xl">
                  {{ t('about.stats.title') }}<br />
                  {{ t('about.stats.titleLine2') }}
                </h2>
              </div>
            </div>

            <!-- Right Column - Statistics (Scrollable) -->
            <div class="flex flex-col space-y-8">
              <div
                v-for="(stat, index) in aboutStats"
                :key="index"
                class="relative"
              >
                <!-- Divider with dot - extends to end of page -->
                <div v-if="index > 0" class="absolute -top-4 left-0 -right-6 md:-right-12 lg:-right-16 xl:-right-20 flex items-center">
                  <div class="h-px flex-1 bg-primary/30"></div>
                  <div class="h-1.5 w-1.5 rounded-full bg-primary"></div>
                  <div class="h-px flex-1 bg-primary/30"></div>
                </div>
                
                <!-- Stat Content -->
                <div class="space-y-2 pt-4">
                  <p 
                    :ref="(el: HTMLElement | null) => { if (el) statRefs[index] = el }" 
                    class="text-4xl font-light leading-none text-ink md:text-5xl lg:text-6xl xl:text-7xl"
                  >
                    0
                  </p>
                  <p class="max-w-lg space-y-1 text-sm leading-relaxed text-slate-600 md:text-base">
                    <span class="block text-lg font-bold text-primary md:text-xl lg:text-2xl">{{ stat.label.title }}</span>
                    <span class="block text-slate-600">{{ stat.label.description }}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </section>

  <section id="services" ref="servicesSection" class="relative z-10 w-full">
    <!-- Section Title -->
    <div class="section-wrapper py-16 md:py-24">
      <div class="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
        <div>
          <h2 class="text-4xl font-serif leading-tight text-ink md:text-5xl lg:text-6xl">
            {{ t('home.services.title') }}
          </h2>
        </div>
        <div>
          <p class="text-base leading-relaxed text-slate-600 md:text-lg">
            {{ t('home.services.subtitle') }}
          </p>
        </div>
      </div>
    </div>

    <!-- Three Panel Layout -->
    <div class="grid grid-cols-1 md:grid-cols-3">
      <!-- Service 01: Construction & Engineering -->
      <NuxtLink
        :to="localePath('/services/construction-engineering')"
        class="service-item group relative flex min-h-[600px] items-end overflow-hidden md:min-h-[700px] lg:min-h-[800px]"
        @mouseenter="handleServiceEnter('read-more')"
        @mouseleave="handleServiceLeave"
      >
        <div
          class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                :style="`background-image: url('${baseURL}images/service1.png');`"
        ></div>
        <!-- Gradient Overlay - Dark from bottom to light at top -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <!-- Text Overlay -->
        <div class="relative z-10 w-full p-8 pb-12 md:p-12 md:pb-16">
          <h3 class="text-3xl font-bold uppercase tracking-wide text-white md:text-4xl lg:text-5xl">
            {{ t('home.services.construction.title') }}
          </h3>
        </div>
      </NuxtLink>

      <!-- Service 02: Property Management -->
      <NuxtLink
        :to="localePath('/services/property-management')"
        class="service-item group relative flex min-h-[600px] items-end overflow-hidden md:min-h-[700px] lg:min-h-[800px]"
        @mouseenter="handleServiceEnter('read-more')"
        @mouseleave="handleServiceLeave"
      >
        <div
          class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                :style="`background-image: url('${baseURL}images/service2.png');`"
        ></div>
        <!-- Gradient Overlay - Dark from bottom to light at top -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <!-- Text Overlay -->
        <div class="relative z-10 w-full p-8 pb-12 md:p-12 md:pb-16">
          <h3 class="text-3xl font-bold uppercase tracking-wide text-white md:text-4xl lg:text-5xl">
            {{ t('home.services.property.title') }}
          </h3>
        </div>
      </NuxtLink>

      <!-- Service 03: Drone Cleaning -->
      <a
        href="https://buroojair.com"
        target="_blank"
        rel="noopener noreferrer"
        class="service-item group relative flex min-h-[600px] items-end overflow-hidden md:min-h-[700px] lg:min-h-[800px]"
        @mouseenter="handleServiceEnter('visit-website')"
        @mouseleave="handleServiceLeave"
      >
        <div
          class="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-110"
                :style="`background-image: url('${baseURL}images/service3.png');`"
        ></div>
        <!-- Gradient Overlay - Dark from bottom to light at top -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        <!-- Text Overlay -->
        <div class="relative z-10 w-full p-8 pb-12 md:p-12 md:pb-16">
          <h3 class="text-3xl font-bold uppercase tracking-wide text-white md:text-4xl lg:text-5xl">
            {{ t('home.services.drone.title') }}
          </h3>
        </div>
      </a>
    </div>
  </section>

  <section ref="projectsSection" class="section-wrapper relative z-10">
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
        v-for="(project, index) in projects"
        :key="project.slug"
        :ref="(el: HTMLElement | null) => { if (el) projectItems[index] = el }"
        :to="localePath(`/projects/${project.slug}`)"
        class="group relative cursor-none grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.3fr] md:items-start"
        :class="{ 'gradient-border-top pt-20': index > 0, 'pb-20': index < projects.length - 1 }"
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

  <section ref="clientsSection" class="section-wrapper relative z-10">
    <h2 class="mb-8 text-4xl font-serif leading-tight text-ink md:text-5xl lg:text-6xl">
      {{ t('clients.title') }}
    </h2>
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      <div
        v-for="(logo, index) in clientLogos"
        :key="logo.name"
        :ref="(el: HTMLElement | null) => { if (el) clientLogosRefs[index] = el }"
        class="flex items-center justify-center rounded-lg px-8 py-14 transition-colors"
        style="background-color: #F4F2F2;"
      >
        <span class="text-sm font-medium text-slate-700">{{ logo.name }}</span>
      </div>
    </div>
  </section>

  <section id="contact" ref="ctaSection" class="relative z-10 w-full overflow-hidden">
    <div
      class="relative min-h-[500px] bg-cover bg-center bg-no-repeat"
      style="background-image: url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80');"
    >
      <!-- Gradient overlay from black at bottom to transparent at top -->
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      <div class="section-wrapper relative z-10 flex min-h-[500px] flex-col items-center justify-center py-16 text-center">
        <h3 class="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
          <span>{{ t('cta.title') }}</span><br />
          <span>{{ t('cta.titleLine2') }}</span>
        </h3>
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

  <!-- Custom Cursor for Services -->
  <div
    v-if="isHoveringService"
    class="pointer-events-none fixed z-[9999] flex items-center justify-center rounded-full bg-primary/60 px-8 py-3 text-sm font-medium text-white backdrop-blur-md transition-opacity duration-300"
    :style="{ left: cursorPosition.x - 70 + 'px', top: cursorPosition.y - 18 + 'px' }"
  >
    {{ hoveredServiceType === 'visit-website' ? 'Visit the website' : 'Read More' }}
  </div>

  <!-- Custom Cursor for Projects -->
  <div
    v-if="isHoveringProject"
    class="pointer-events-none fixed z-[9999] flex items-center justify-center rounded-full bg-primary/60 px-8 py-3 text-sm font-medium text-white backdrop-blur-md transition-opacity duration-300"
    :style="{ left: cursorPosition.x - 70 + 'px', top: cursorPosition.y - 18 + 'px' }"
  >
    View the Project
  </div>
</template>

