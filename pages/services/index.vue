<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
useHead({ title: t('services.title') })

const { fadeInUp, fadeInFromSide, staggerFadeIn } = useGsap()
const heroSection = ref<HTMLElement | null>(null)
const servicesSection = ref<HTMLElement | null>(null)
const servicesContent = ref<HTMLElement | null>(null)
const serviceItemsRefs = ref<HTMLElement[]>([])

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

const tabKeys = ['Construction & Engineering', 'Property Management', 'Drone Cleaning'] as const
const activeTabKey = ref<(typeof tabKeys)[number]>('Construction & Engineering')

const tabs = computed(() => [
  t('home.services.construction.title'),
  t('home.services.property.title'),
  t('home.services.drone.title'),
])
const activeTab = ref<string>(tabs.value[0])

watch(() => t('home.services.construction.title'), () => {
  activeTab.value = tabs.value[0]
  activeTabKey.value = 'Construction & Engineering'
}, { immediate: true })

const getTabKey = (tab: string) => {
  if (tab.includes('CONSTRUCTION') || tab.includes('البناء')) return 'Construction & Engineering'
  if (tab.includes('PROPERTY') || tab.includes('العقارات')) return 'Property Management'
  if (tab.includes('DRONE') || tab.includes('الطائرات')) return 'Drone Cleaning'
  return 'Construction & Engineering'
}

const tabContent = computed(() => ({
  'Construction & Engineering': {
    title: t('home.services.construction.titleFull'),
    description: t('home.services.construction.description'),
    items: [
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
    ],
  },
  'Property Management': {
    title: t('home.services.property.titleFull'),
    description: t('home.services.property.description'),
    items: [
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
    ],
  },
  'Drone Cleaning': {
    title: t('home.services.drone.titleFull'),
    description: t('home.services.drone.description'),
    items: [
      t('services.drone.services.facade'),
      t('services.drone.services.solar'),
      t('services.drone.services.bridges'),
      t('services.drone.services.tanks'),
      t('services.drone.services.industrial'),
      t('services.drone.services.signage'),
    ],
  },
}))

onMounted(() => {
  if (typeof window === 'undefined') return
  
  window.addEventListener('mousemove', handleMouseMove)
  
  fadeInUp(heroSection)
  fadeInFromSide(servicesSection, 'left')
  fadeInUp(servicesContent)
  
  // Stagger animate service items
  if (import.meta.client) {
    nextTick(() => {
      setTimeout(() => {
        if (serviceItemsRefs.value.length > 0) {
          staggerFadeIn(serviceItemsRefs, { stagger: 0.05 })
        }
      }, 200)
    })
  }
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Hero Section - Three Panel Layout -->
    <section ref="heroSection" class="relative z-10 w-full">
      <!-- Section Title -->
      <div class="section-wrapper py-16 md:py-24">
        <div class="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
          <div>
            <h1 class="text-4xl font-serif leading-tight text-ink md:text-5xl lg:text-6xl">
              {{ t('home.services.title') }}
            </h1>
          </div>
          <div>
            <p class="text-base leading-relaxed text-slate-600 md:text-lg">
              {{ t('services.page.description') }}
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
            style="background-image: url('/images/service1.png');"
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
            style="background-image: url('/images/service2.png');"
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
            style="background-image: url('/images/service3.png');"
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

    <!-- Services Content Section -->
    <section ref="servicesSection" class="section-wrapper relative z-10 py-16 md:py-24">
      <div ref="servicesContent" class="space-y-8">
        <div class="space-y-6">
          <h2 class="text-4xl font-serif leading-tight text-ink md:text-5xl lg:text-6xl">
            {{ tabContent[activeTabKey].title }}
          </h2>
          <p class="text-base leading-relaxed text-slate-600 md:text-lg">
            {{ tabContent[activeTabKey].description }}
          </p>
        </div>

        <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div
            v-for="(item, index) in tabContent[activeTabKey].items"
            :key="item"
            :ref="el => { if (el) serviceItemsRefs[index] = el as HTMLElement }"
            class="rounded-xl border border-slate-100 bg-background px-6 py-4 text-sm text-slate-700 transition-colors hover:border-primary/30 hover:bg-primary-light/30"
          >
            {{ item }}
          </div>
        </div>

        <div v-if="activeTabKey === 'Drone Cleaning'" class="pt-4">
          <a
            href="https://buroojair.com"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark"
          >
            {{ t('services.drone.visitWebsite') }}
            <span class="text-base">→</span>
          </a>
        </div>
      </div>
    </section>

    <!-- Custom Cursor for Services -->
    <div
      v-if="isHoveringService"
      class="pointer-events-none fixed z-[9999] flex items-center justify-center rounded-full bg-primary/60 px-8 py-3 text-sm font-medium text-white backdrop-blur-md transition-opacity duration-300"
      :style="{ left: cursorPosition.x - 70 + 'px', top: cursorPosition.y - 18 + 'px' }"
    >
      {{ hoveredServiceType === 'visit-website' ? t('services.drone.visitWebsite') : t('projects.viewProject') }}
    </div>
  </div>
</template>
