<script setup lang="ts">
useHead({ title: 'Home' })

const { fadeInUp, animateCounter, fixedHero } = useGsap()
const heroSection = ref<HTMLElement | null>(null)
const aboutSection = ref<HTMLElement | null>(null)
const projectsSection = ref<HTMLElement | null>(null)
const statRefs = [ref<HTMLElement | null>(null), ref<HTMLElement | null>(null), ref<HTMLElement | null>(null)]

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

const aboutStats = [
  { value: 7, prefix: '+', label: 'Delivering Engineering, Management, And Drone-Powered Cleaning Solutions Across The Region.' },
  { value: 120, prefix: '+', label: 'Covering Villas, Commercial Fit-Outs, Smart Systems, And High-Rise Cleaning.' },
  { value: 30, prefix: '+', label: 'End-To-End Property Management With Complete Reporting Automation.' },
]

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
  
  // Initialize fixed hero section
  fadeInUp(heroSection)
  fadeInUp(aboutSection, { delay: 0.1 })
  fixedHero(heroSection)
  
  // Animate counters - wait for DOM to be ready and refs to be assigned
  if (import.meta.client) {
    nextTick(() => {
      // Wait for ScrollTrigger to be ready after hero section pins
      setTimeout(() => {
        import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
          // Initialize counters after ensuring refs are set
          setTimeout(() => {
            if (statRefs[0].value) animateCounter(statRefs[0], 7, { prefix: '+', duration: 2 })
            if (statRefs[1].value) animateCounter(statRefs[1], 120, { prefix: '+', duration: 2 })
            if (statRefs[2].value) animateCounter(statRefs[2], 30, { prefix: '+', duration: 2 })
          
            // Refresh ScrollTrigger after all counters are initialized
            ScrollTrigger.refresh()
          }, 500)
        })
      }, 1200)
    })
  }
})

const constructionServices = [
  'Architecture Design',
  'Interior Design',
  'Landscape Design',
  'Furniture Design',
  'HVAC Installation',
  'Fire Systems',
  'Electrical Works',
  'Plumbing Services',
  'Finishing & Fit-Out',
  'Smart Systems',
]

const propertyServices = [
  'Real Estate Marketing',
  'Real Estate Leasing',
  'Pricing Optimization',
  'Real Estate Listing',
  'Tenant Request Management',
  'LOI Documentation',
  'Legal Affairs',
  'Government Requirements',
  'Contract Documentation',
  'Revenue Collection',
  'Automated Reporting',
  'Real Estate Valuation',
  'Operational Cost Reduction',
  'Cleaning & Maintenance',
  'Security Monitoring & Logs',
  'Improving Operational Efficiency',
  'Zakat & Tax Services',
]

const droneServices = ['Façade Cleaning', 'Solar Panel Cleaning', 'Bridges & Highways', 'Large Water Tanks', 'Industrial Structures', 'High Signage & Billboards']

const projects = [
  {
    title: 'Albahar Villas – Modern Architectural Design & Residential Development',
    category: 'Construction & Engineering',
    status: 'Completed',
    description: 'A contemporary residential villa project featuring minimalist architecture, thoughtful zoning, and a fully modernized layout designed to elevate everyday living.',
    image: '/images/project1.png',
  },
  {
    title: 'Efficiency Center Khobar branch',
    category: 'Construction & Engineering',
    status: 'Completed',
    description: 'Modern office space with integrated smart systems and premium finishing.',
    image: '/images/project2.png',
  },
  {
    title: 'Aramco Façade Cleaning – Burooj Air',
    category: 'Drone Cleaning',
    status: 'Completed',
    description: 'High-rise façade cleaning using drone technology for a major corporate building.',
    image: '/images/project3.png',
  },
  {
    title: 'Jenan Building – Drone Cleaning',
    category: 'Drone Cleaning',
    status: 'Completed',
    description: 'Comprehensive drone-powered cleaning service for commercial building.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800&q=80',
  },
  {
    title: 'Commercial Tower – Property Management & Reporting',
    category: 'Property Management',
    status: 'Completed',
    description: 'Full property management services including automated reporting and tenant management.',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  },
]

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
      src="/images/hero-image.png"
      alt="Burooj modern development"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
    <div class="relative z-10 w-full pb-8 text-left text-white md:pb-12 lg:pb-16">
      <div class="container w-full">
        <div class="max-w-7xl space-y-6">
        <h1 class="w-full text-4xl font-normal leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
          BUILT SMARTER. MANAGED BETTER. CLEANED WITH INNOVATION.
        </h1>
        <p class="max-w-4xl text-base font-normal leading-relaxed text-white/95 md:text-lg lg:text-xl">
          Burooj Delivers Integrated Engineering, Property Management, And Drone-Powered Cleaning Solutions That Elevate Every Building We Touch.
        </p>
        </div>
      </div>
    </div>
  </section>

  <section id="about" ref="aboutSection" class="relative z-10 bg-white py-16 md:py-24">
    <div class="container">
      <div class="max-w-4xl space-y-8">
        <h2 class="text-4xl font-serif leading-tight text-ink md:text-5xl lg:text-6xl">
          A multi-<span class="text-primary">disciplinary</span> Saudi company
        </h2>

        <p class="text-base font-serif leading-relaxed text-ink md:text-lg">
          Burooj is a multi-disciplinary Saudi company offering comprehensive solutions across engineering, construction, property management, and drone cleaning. With a commitment to quality, speed, and technology-driven efficiency, we support buildings and properties throughout their entire lifecycle—from design and development to operation and maintenance.
        </p>
      </div>
    </div>

    <!-- Full Width Statistics Section -->
    <div class="gradient-border-top gradient-border-bottom w-full py-12 mt-16 md:mt-24">
      <div class="container">
        <div class="grid gap-0 sm:grid-cols-3">
          <div v-for="(stat, index) in aboutStats" :key="index" class="space-y-4 px-4 pb-8 pt-4 sm:pr-8 lg:px-8">
            <p :ref="(el) => { if (el) { statRefs[index].value = el as HTMLElement } }" class="text-7xl font-light leading-none text-ink md:text-8xl lg:text-9xl">0</p>
            <p class="text-sm leading-relaxed text-slate-600 md:text-base">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="services" class="relative z-10 w-full">
    <!-- Section Title -->
    <div class="section-wrapper py-16 md:py-24">
      <div class="grid gap-8 md:grid-cols-2 md:items-center md:gap-12">
        <div>
          <h2 class="text-4xl font-serif leading-tight text-ink md:text-5xl lg:text-6xl">
            <span class="block">Our</span>
            <span class="block">Services</span>
          </h2>
        </div>
        <div>
          <p class="text-base leading-relaxed text-slate-600 md:text-lg">
            Comprehensive solutions across engineering, construction, property management, and drone cleaning.
          </p>
        </div>
      </div>
    </div>

    <!-- Three Panel Layout -->
    <div class="grid grid-cols-1 md:grid-cols-3">
      <!-- Service 01: Construction & Engineering -->
      <div
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
            Construction & Engineering
          </h3>
        </div>
      </div>

      <!-- Service 02: Property Management -->
      <div
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
            Property Management
          </h3>
        </div>
      </div>

      <!-- Service 03: Drone Cleaning -->
      <div
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
            Drone Cleaning
          </h3>
        </div>
      </div>
    </div>
  </section>

  <section ref="projectsSection" class="section-wrapper relative z-10">
    <!-- Header -->
    <div class="mb-12 flex items-center justify-between border-b border-primary/30 pb-6">
      <h2 class="text-4xl font-serif leading-tight text-ink md:text-5xl lg:text-6xl">
        Our work, from petal to planet
      </h2>
      <NuxtLink
        to="/projects"
        class="flex items-center gap-2 text-sm font-medium text-slate-500 transition-colors hover:text-slate-700"
      >
        See all
        <span class="text-base">→</span>
      </NuxtLink>
    </div>

    <!-- Projects List -->
    <div>
      <article
        v-for="(project, index) in projects"
        :key="project.title"
        class="group relative cursor-none grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.5fr] md:items-start"
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
            <div class="relative z-10 aspect-[4/3] overflow-hidden rounded-xl group">
              <img
                :src="project.image"
                :alt="project.title"
                class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>
      </article>
    </div>
  </section>

  <section class="section-wrapper relative z-10">
    <h2 class="mb-8 text-4xl font-serif leading-tight text-ink md:text-5xl lg:text-6xl">
      Our trusted partners, from bold startups to global icons
    </h2>
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      <div
        v-for="logo in clientLogos"
        :key="logo.name"
        class="flex items-center justify-center rounded-lg px-8 py-14 transition-colors"
        style="background-color: #F4F2F2;"
      >
        <span class="text-sm font-medium text-slate-700">{{ logo.name }}</span>
      </div>
    </div>
  </section>

  <section id="contact" class="relative z-10 w-full overflow-hidden">
    <div
      class="relative min-h-[500px] bg-cover bg-center bg-no-repeat"
      style="background-image: url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80');"
    >
      <!-- Gradient overlay from black at bottom to transparent at top -->
      <div class="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
      <div class="section-wrapper relative z-10 flex min-h-[500px] flex-col items-center justify-center py-16 text-center">
        <h3 class="text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl">
          Let's build, manage, and maintain your property better.
        </h3>
        <div class="mt-8">
          <NuxtLink
            to="/contact"
            class="inline-flex items-center gap-2 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-ink transition hover:bg-white/90"
          >
            Book a Consultation
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

