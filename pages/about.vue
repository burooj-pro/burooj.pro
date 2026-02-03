<script setup lang="ts">
import { nextTick, onUnmounted } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}

const { t } = useI18n()
const localePath = useLocalePath()
const config = useRuntimeConfig()
const baseURL = config.app.baseURL || '/'
useHead({ title: t('about.title') })

const { fadeInUp, fadeInFromSide, scaleIn, staggerFadeIn, animateCounter } = useGsap()
const heroSection = ref<HTMLElement | null>(null)
const aboutSection = ref<HTMLElement | null>(null)
const statsSection = ref<HTMLElement | null>(null)
const statRefs = ref<HTMLElement[]>([])
const founderSection = ref<HTMLElement | null>(null)
const btsSection = ref<HTMLElement | null>(null)
const clientsSection = ref<HTMLElement | null>(null)
const clientLogosRefs = ref<HTMLElement[]>([])

const btsContainer = ref<HTMLElement | null>(null)
const btsWrapper = ref<HTMLElement | null>(null)

const isDragging = ref(false)
const startX = ref(0)
const scrollLeft = ref(0)
const currentX = ref(0)
const cursorPosition = ref({ x: 0, y: 0 })
const isHoveringBts = ref(false)

const handleBtsMouseMove = (e: MouseEvent) => {
  cursorPosition.value = { x: e.clientX, y: e.clientY }
}


const btsImages = [
  {
    title: 'Behind The Scenes',
    image: `${baseURL}images/bts/bts1.png`,
    description: 'Our team working together on innovative solutions',
  },
  {
    title: 'Behind The Scenes',
    image: `${baseURL}images/bts/bts2.png`,
    description: 'Brainstorming and ideation sessions',
  },
  {
    title: 'Behind The Scenes',
    image: `${baseURL}images/bts/bts3.png`,
    description: 'On-site execution and quality control',
  },
  {
    title: 'Behind The Scenes',
    image: `${baseURL}images/bts/bts4.png`,
    description: 'Our collaborative workspace environment',
  },
]

// Duplicate images for seamless infinite loop
const duplicatedBtsImages = [...btsImages, ...btsImages, ...btsImages]

const { clientLogos } = useClientLogos({ placeholders: 0 })

onMounted(() => {
  if (typeof window === 'undefined') return
  
  // Animate sections on scroll
  fadeInUp(heroSection)
  fadeInUp(aboutSection)
  fadeInUp(statsSection)
  
  // Animate counters for stats
  if (import.meta.client) {
    nextTick(() => {
      setTimeout(() => {
        // Parse and animate each stat number
        // stat1: "150+" -> 150
        if (statRefs.value[0]) animateCounter(statRefs.value[0], 150, { prefix: '+', duration: 2 })
        // stat2: "500+" -> 500
        if (statRefs.value[1]) animateCounter(statRefs.value[1], 500, { prefix: '+', duration: 2 })
        // stat3: "20,000+" -> 20000
        if (statRefs.value[2]) animateCounter(statRefs.value[2], 20000, { prefix: '+', suffix: ' m²', duration: 2 })
        // stat4: "7+" -> 7
        if (statRefs.value[3]) animateCounter(statRefs.value[3], 7, { prefix: '+', duration: 2 })
      }, 200)
    })
  }
  
  fadeInFromSide(founderSection, 'left')
  scaleIn(btsSection)
  fadeInUp(clientsSection)

  
  // Stagger animate client logos - wait for refs to populate
  if (import.meta.client) {
    nextTick(() => {
      setTimeout(() => {
        // Stagger animate client logos
        if (clientLogosRefs.value.length > 0) {
          staggerFadeIn(clientLogosRefs, { stagger: 0.05 })
        }
      }, 200)
    })
    
    // Setup infinite loop drag functionality for BTS section
    nextTick(() => {
      if (btsWrapper.value) {
        const wrapper = btsWrapper.value
        const images = wrapper.querySelectorAll('.bts-image-item')
        
        if (images.length === 0) return
        
        // Get the width of one image (including gap)
        const firstImage = images[0] as HTMLElement
        const imageWidth = firstImage.offsetWidth + 16 // 16px gap (gap-4)
        const totalImages = btsImages.length
        const totalWidth = imageWidth * totalImages
        
        // Set initial scroll position to middle (second set)
        wrapper.scrollLeft = totalWidth
        
        const handleScroll = () => {
          const scrollLeft = wrapper.scrollLeft
          
          // If scrolled to the end (third set), jump to middle (second set)
          if (scrollLeft >= totalWidth * 2) {
            wrapper.scrollLeft = totalWidth
          }
          // If scrolled to the beginning (first set), jump to middle (second set)
          else if (scrollLeft <= 0) {
            wrapper.scrollLeft = totalWidth
          }
        }
        
        const handleMouseDown = (e: MouseEvent) => {
          isDragging.value = true
          startX.value = e.pageX - wrapper.offsetLeft
          scrollLeft.value = wrapper.scrollLeft
          wrapper.style.cursor = 'grabbing'
          wrapper.style.scrollBehavior = 'auto'
          e.preventDefault()
        }

        const handleMouseLeave = () => {
          isDragging.value = false
          wrapper.style.cursor = 'grab'
          wrapper.style.scrollBehavior = 'smooth'
        }

        const handleMouseUp = () => {
          isDragging.value = false
          wrapper.style.cursor = 'grab'
          wrapper.style.scrollBehavior = 'smooth'
          handleScroll()
        }

        const handleMouseMove = (e: MouseEvent) => {
          if (!isDragging.value) return
          e.preventDefault()
          const x = e.pageX - wrapper.offsetLeft
          const walk = (x - startX.value) * 2 // Scroll speed multiplier
          wrapper.scrollLeft = scrollLeft.value - walk
        }

        // Touch events for mobile
        const handleTouchStart = (e: TouchEvent) => {
          isDragging.value = true
          startX.value = e.touches[0].pageX - wrapper.offsetLeft
          scrollLeft.value = wrapper.scrollLeft
          wrapper.style.scrollBehavior = 'auto'
        }

        const handleTouchMove = (e: TouchEvent) => {
          if (!isDragging.value) return
          const x = e.touches[0].pageX - wrapper.offsetLeft
          const walk = (x - startX.value) * 2
          wrapper.scrollLeft = scrollLeft.value - walk
        }

        const handleTouchEnd = () => {
          isDragging.value = false
          wrapper.style.scrollBehavior = 'smooth'
          handleScroll()
        }

        wrapper.addEventListener('scroll', handleScroll)
        wrapper.addEventListener('mousedown', handleMouseDown)
        wrapper.addEventListener('mouseleave', handleMouseLeave)
        wrapper.addEventListener('mouseup', handleMouseUp)
        wrapper.addEventListener('mousemove', handleMouseMove)
        wrapper.addEventListener('touchstart', handleTouchStart)
        wrapper.addEventListener('touchmove', handleTouchMove)
        wrapper.addEventListener('touchend', handleTouchEnd)

        wrapper.style.cursor = 'grab'
        wrapper.style.userSelect = 'none'

        onUnmounted(() => {
          wrapper.removeEventListener('scroll', handleScroll)
          wrapper.removeEventListener('mousedown', handleMouseDown)
          wrapper.removeEventListener('mouseleave', handleMouseLeave)
          wrapper.removeEventListener('mouseup', handleMouseUp)
          wrapper.removeEventListener('mousemove', handleMouseMove)
          wrapper.removeEventListener('touchstart', handleTouchStart)
          wrapper.removeEventListener('touchmove', handleTouchMove)
          wrapper.removeEventListener('touchend', handleTouchEnd)
        })
      }
    })
  }
})
</script>

<template>
  <!-- Hero Section -->
  <section
    ref="heroSection"
    data-hero
    class="relative isolate flex min-h-[70vh] w-full items-end justify-center overflow-hidden"
  >
    <img
      :src="`${baseURL}images/hero-image.png`"
      :alt="t('about.hero.headline')"
      class="absolute inset-0 h-full w-full object-cover"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
    <div class="relative z-10 w-full pb-8 text-left text-white md:pb-12 lg:pb-16">
      <div class="container w-full px-6 md:px-12 lg:px-16 xl:px-20">
        <div class="max-w-7xl space-y-6">
          <h1 class="w-full text-4xl font-normal leading-[1.1] tracking-tight text-white md:text-5xl lg:text-6xl xl:text-7xl">
            {{ t('about.hero.headline') }}
          </h1>
          <p class="max-w-4xl text-base font-normal leading-relaxed text-white/95 md:text-lg lg:text-xl">
            {{ t('about.hero.subheadline') }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section id="about-content" ref="aboutSection" class="relative z-10 bg-white py-16 md:py-24">
    <div class="w-full px-6 md:px-12 lg:px-16 xl:px-20">
      <div class="max-w-6xl space-y-8">
        <div class="space-y-6">
          <h2 class="text-4xl font-serif leading-tight text-ink md:text-5xl lg:text-6xl">
            <span>{{ t('home.about.title') }}<span class="text-primary">{{ t('home.about.titleHighlight') }}</span>{{ t('home.about.titleSuffix') }}</span><br />
            <span>{{ t('home.about.titleLine2') }}</span>
          </h2>
          <p class="whitespace-pre-line text-base font-serif leading-relaxed text-ink md:text-lg">
            {{ t('home.about.description') }}
          </p>
        </div>

      </div>
    </div>
  </section>

  <!-- Stats Section -->
  <section ref="statsSection" class="relative z-10 bg-white py-16 md:py-24">
    <div class="w-full px-6 md:px-12 lg:px-16 xl:px-20">
      <div class="max-w-[1600px]">
        <div class="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
          <!-- Left Column - Title (Sticky) -->
          <div class="flex items-start">
            <div class="md:sticky md:top-32">
              <h2 class="text-4xl font-normal leading-tight text-ink md:text-5xl lg:text-6xl xl:text-7xl">
                {{ t('about.stats.title') }}<br />
                {{ t('about.stats.titleLine2') }}
              </h2>
            </div>
          </div>

          <!-- Right Column - Statistics (Scrollable) -->
          <div class="flex flex-col space-y-8">
            <div
              v-for="(stat, index) in [
                { number: t('about.stats.stat1.number'), title: 'Projects delivered', description: t('about.stats.stat1.description').replace(/^Projects delivered, /, '') },
                { number: t('about.stats.stat2.number'), title: 'Managed units & assets', description: t('about.stats.stat2.description').replace(/^Managed units & assets — /, '') },
                { number: t('about.stats.stat3.number'), title: 'Square meters cleaned by drones', description: t('about.stats.stat3.description').replace(/^Square meters cleaned by drones — /, '') },
                { number: t('about.stats.stat4.number'), title: 'Years of excellence', description: t('about.stats.stat4.description').replace(/^Years of excellence — /, '') },
              ]"
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
                    :ref="(el) => { const node = (el as any)?.$el ?? el; if (node && (node as any).nodeType === 1) statRefs[index] = node as HTMLElement }"
                  class="text-4xl font-light leading-none text-ink md:text-5xl lg:text-6xl xl:text-7xl"
                >
                  0
                </p>
                <p class="max-w-lg space-y-1 text-sm leading-relaxed text-slate-600 md:text-base">
                  <span class="block text-lg font-bold text-primary md:text-xl lg:text-2xl">{{ stat.title }}</span>
                  <span class="block text-slate-600">{{ stat.description }}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Founder Section -->
  <section ref="founderSection" class="relative z-10 bg-white py-16 md:py-24">
    <div class="w-full px-6 md:px-12 lg:px-16 xl:px-20">
      <div class="max-w-[1600px]">
        <div class="grid gap-12 md:grid-cols-2 md:gap-16 lg:gap-20">
          <!-- Left Content (Sticky) -->
          <div class="flex items-start">
            <div class="md:sticky md:top-32">
              <div class="flex flex-col justify-start space-y-6">
                <p class="text-sm font-medium uppercase tracking-wider text-primary md:text-base">
                  {{ t('about.founder.sectionTitle') }}
                </p>
                <div class="space-y-2">
                  <h3 class="text-2xl font-semibold text-ink md:text-3xl lg:text-4xl">
                    {{ t('about.founder.name') }}
                  </h3>
                  <p class="text-base font-medium text-primary md:text-lg">
                    {{ t('about.founder.title') }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Content (Scrollable) -->
          <div class="flex flex-col space-y-8">
            <!-- Visual Element with Founder Photo -->
            <div class="relative overflow-hidden rounded-lg bg-stone-50">
              <div class="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                <img
                  :src="`${baseURL}images/team/mohammedF.png`"
                  :alt="t('about.founder.name')"
                  class="h-full w-full object-cover object-center"
                />
              </div>
            </div>

            <!-- Main Message -->
            <p class="text-base leading-relaxed text-slate-600 md:text-lg">
              {{ t('about.founder.messagePart1') }}
            </p>

            <!-- Two-Column Text -->
            <div class="grid gap-8 md:grid-cols-2 md:gap-12">
              <p class="text-sm leading-relaxed text-slate-600 md:text-base">
                {{ t('about.founder.messagePart2') }}
              </p>
              <p class="text-sm leading-relaxed text-slate-600 md:text-base">
                {{ t('about.founder.messagePart3') }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Behind The Scenes Section -->
  <section ref="btsSection" class="relative z-10 bg-gradient-to-b from-stone-50 to-white py-16 md:py-24">
    <!-- Text Header Section -->
    <div class="w-full px-6 md:px-12 lg:px-16 xl:px-20 mb-12 md:mb-16">
      <div class="mx-auto max-w-4xl text-center">
        <h2 class="mb-6 text-4xl font-serif leading-tight text-ink md:text-5xl lg:text-6xl">
          {{ t('about.bts.title') }}
        </h2>
        <p class="mx-auto max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
          {{ t('about.bts.description') }}
        </p>
      </div>
    </div>

    <!-- Full-Width Horizontal Drag Gallery -->
    <div
      ref="btsContainer"
      class="relative w-full overflow-hidden cursor-none -mx-6 md:-mx-12 lg:-mx-16 xl:-mx-20"
      @mouseenter="isHoveringBts = true"
      @mouseleave="isHoveringBts = false"
      @mousemove="handleBtsMouseMove"
    >
      <div
        ref="btsWrapper"
        class="flex gap-4 overflow-x-auto scrollbar-hide"
        style="scroll-behavior: smooth; -webkit-overflow-scrolling: touch;"
      >
        <!-- First set of images (for seamless loop) -->
        <div
          v-for="(item, index) in btsImages"
          :key="`set1-${index}`"
          class="bts-image-item group relative flex-shrink-0 overflow-hidden rounded-xl w-[85vw] min-w-[260px] h-[320px] sm:w-[70vw] sm:min-w-[300px] sm:h-[380px] md:w-[45vw] md:h-[460px] lg:w-[28vw] lg:min-w-[350px] lg:h-[500px]"
        >
          <img
            :src="item.image"
            :alt="item.title"
            class="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
          />
        </div>
        <!-- Second set (middle - starting position) -->
        <div
          v-for="(item, index) in btsImages"
          :key="`set2-${index}`"
          class="bts-image-item group relative flex-shrink-0 overflow-hidden rounded-xl w-[85vw] min-w-[260px] h-[320px] sm:w-[70vw] sm:min-w-[300px] sm:h-[380px] md:w-[45vw] md:h-[460px] lg:w-[28vw] lg:min-w-[350px] lg:h-[500px]"
        >
          <img
            :src="item.image"
            :alt="item.title"
            class="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
          />
        </div>
        <!-- Third set (for seamless loop) -->
        <div
          v-for="(item, index) in btsImages"
          :key="`set3-${index}`"
          class="bts-image-item group relative flex-shrink-0 overflow-hidden rounded-xl w-[85vw] min-w-[260px] h-[320px] sm:w-[70vw] sm:min-w-[300px] sm:h-[380px] md:w-[45vw] md:h-[460px] lg:w-[28vw] lg:min-w-[350px] lg:h-[500px]"
        >
          <img
            :src="item.image"
            :alt="item.title"
            class="h-full w-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
          />
        </div>
      </div>

      <!-- Custom Cursor for BTS Section -->
      <div
        v-if="isHoveringBts"
        class="pointer-events-none fixed z-[100] flex items-center justify-center rounded-full bg-primary/60 px-8 py-3 text-sm font-medium text-white backdrop-blur-md transition-opacity duration-300"
        :style="{ left: cursorPosition.x - 70 + 'px', top: cursorPosition.y - 18 + 'px' }"
      >
        Drag
      </div>
    </div>
  </section>

  <!-- Clients Section -->
  <section ref="clientsSection" class="section-wrapper relative z-10">
    <h2 class="mb-8 text-4xl font-serif leading-tight text-ink md:text-5xl lg:text-6xl">
      {{ t('clients.title') }}
    </h2>
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      <div
        v-for="(logo, index) in clientLogos"
        :key="`${logo.name}-${index}`"
        :ref="(el) => { const node = (el as any)?.$el ?? el; if (node && (node as any).nodeType === 1) clientLogosRefs[index] = node as HTMLElement }"
        class="group flex items-center justify-center rounded-lg px-4 py-10 transition-colors sm:px-6 sm:py-12"
        style="background-color: #F4F2F2;"
      >
        <img
          v-if="'image' in logo && logo.image"
          :src="logo.image"
          :alt="logo.name"
          class="w-auto max-w-full object-contain opacity-80 grayscale transition group-hover:opacity-100"
          :class="(logo.name === 'Thabat' || logo.name === 'GDC' || logo.name === 'Qiddiya') ? 'h-14 sm:h-16 md:h-20 max-w-[220px] sm:max-w-[260px] md:max-w-[320px]' : 'h-10 sm:h-12 md:h-14 max-w-[160px] sm:max-w-[190px] md:max-w-[220px]'"
          loading="lazy"
        />
        <span v-else class="text-xs font-medium text-slate-500">Client placeholder</span>
      </div>
    </div>
  </section>
</template>
