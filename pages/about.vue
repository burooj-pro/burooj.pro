<script setup lang="ts">
import { nextTick, onUnmounted } from 'vue'

const { t } = useI18n()
const config = useRuntimeConfig()
const baseURL = config.app.baseURL || '/'
useHead({ title: t('about.title') })

const { fadeInUp, fadeInFromSide, scaleIn, staggerFadeIn } = useGsap()
const heroSection = ref<HTMLElement | null>(null)
const aboutSection = ref<HTMLElement | null>(null)
const teamSection = ref<HTMLElement | null>(null)
const btsSection = ref<HTMLElement | null>(null)
const clientsSection = ref<HTMLElement | null>(null)
const teamMembersRefs = ref<HTMLElement[]>([])
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

const teamMembers = [
  {
    name: 'Mohammed F',
    role: 'Role Title',
    image: `${baseURL}images/team/mohammedF.png`,
  },
  {
    name: 'Faisal',
    role: 'Role Title',
    image: `${baseURL}images/team/faisal.png`,
  },
  {
    name: 'Budoo',
    role: 'Role Title',
    image: `${baseURL}images/team/bedoor.png`,
  },
  {
    name: 'Omar',
    role: 'Role Title',
    image: `${baseURL}images/team/omar.png`,
  },
  {
    name: 'Mohammed B',
    role: 'Role Title',
    image: `${baseURL}images/team/mohammedB.png`,
  },
  {
    name: 'Moaen',
    role: 'Role Title',
    image: `${baseURL}images/team/moaen.png`,
  },
]

const btsImages = [
  {
    title: 'Team Collaboration',
    image: `${baseURL}images/project1.png`,
    description: 'Our team working together on innovative solutions',
  },
  {
    title: 'Creative Process',
    image: `${baseURL}images/project2.png`,
    description: 'Brainstorming and ideation sessions',
  },
  {
    title: 'Project Execution',
    image: `${baseURL}images/project3.png`,
    description: 'On-site execution and quality control',
  },
  {
    title: 'Modern Workspace',
    image: `${baseURL}images/project1.png`,
    description: 'Our collaborative workspace environment',
  },
  {
    title: 'Team Meeting',
    image: `${baseURL}images/project2.png`,
    description: 'Strategic planning and team coordination',
  },
]

// Duplicate images for seamless infinite loop
const duplicatedBtsImages = [...btsImages, ...btsImages, ...btsImages]

const clientLogos = Array.from({ length: 12 }, (_, index) => ({
  name: `Client ${index + 1}`,
}))

onMounted(() => {
  if (typeof window === 'undefined') return
  
  // Animate sections on scroll
  fadeInUp(heroSection)
  fadeInUp(aboutSection)
  fadeInFromSide(teamSection, 'left')
  scaleIn(btsSection)
  fadeInUp(clientsSection)
  
  // Stagger animate team members and client logos - wait for refs to populate
  if (import.meta.client) {
    nextTick(() => {
      setTimeout(() => {
        // Stagger animate team members
        if (teamMembersRefs.value.length > 0) {
          staggerFadeIn(teamMembersRefs, { stagger: 0.1 })
        }
        
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
    class="relative isolate flex min-h-[70vh] w-screen items-end justify-center overflow-hidden"
    style="margin-left: calc(-50vw + 50%); margin-right: calc(-50vw + 50%);"
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
    <div class="container px-6 md:px-12 lg:px-16 xl:px-20">
      <div class="max-w-4xl space-y-12">
        <div class="space-y-6">
          <h2 class="text-4xl font-serif leading-tight text-ink md:text-5xl lg:text-6xl">
            {{ t('home.about.title') }}<span class="text-primary">{{ t('home.about.titleHighlight') }}</span>{{ t('home.about.titleSuffix') }}
          </h2>
          <p class="text-base font-serif leading-relaxed text-ink md:text-lg">
            {{ t('home.about.description') }}
          </p>
        </div>

      </div>
    </div>
  </section>

  <!-- Team Section -->
  <section ref="teamSection" class="relative z-10 bg-white py-16 md:py-24">
    <div class="container px-6 md:px-12 lg:px-16 xl:px-20">
      <div class="space-y-12">
        <!-- Heading -->
        <div class="max-w-4xl">
          <h2 class="text-2xl font-normal leading-relaxed text-ink md:text-3xl lg:text-4xl">
            {{ t('about.team.description') }}
          </h2>
        </div>

        <!-- Team Members -->
        <div class="grid gap-8 md:grid-cols-3">
          <div
            v-for="(member, index) in teamMembers"
            :key="index"
            class="group flex flex-col"
          >
            <div class="mb-4 aspect-[4/5] w-full max-w-[500px] overflow-hidden rounded-xl bg-stone-100">
              <img
                :src="member.image"
                :alt="member.name"
                class="h-full w-full object-cover object-center"
              />
            </div>
            <h3 class="text-lg font-semibold text-ink text-left">{{ member.name }}</h3>
            <p class="mt-1 text-left text-sm text-slate-600">{{ member.role }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Behind The Scenes Section -->
  <section ref="btsSection" class="relative z-10 bg-gradient-to-b from-stone-50 to-white py-16 md:py-24">
    <!-- Text Header Section -->
    <div class="container px-6 md:px-12 lg:px-16 xl:px-20 mb-12 md:mb-16">
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
      class="relative w-full overflow-hidden cursor-none"
      style="margin-left: calc(-50vw + 50%); margin-right: calc(-50vw + 50%);"
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
          class="bts-image-item group relative flex-shrink-0 overflow-hidden rounded-xl"
          style="width: 25vw; min-width: 350px; height: 500px;"
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
          class="bts-image-item group relative flex-shrink-0 overflow-hidden rounded-xl"
          style="width: 25vw; min-width: 350px; height: 500px;"
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
          class="bts-image-item group relative flex-shrink-0 overflow-hidden rounded-xl"
          style="width: 25vw; min-width: 350px; height: 500px;"
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
        class="pointer-events-none fixed z-[9999] flex items-center justify-center rounded-full bg-primary/60 px-8 py-3 text-sm font-medium text-white backdrop-blur-md transition-opacity duration-300"
        :style="{ left: cursorPosition.x - 70 + 'px', top: cursorPosition.y - 18 + 'px' }"
      >
        Drag
      </div>
    </div>
  </section>

  <!-- Clients Section -->
  <section ref="clientsSection" class="section-wrapper relative z-10">
    <h2 class="mb-8 text-4xl font-serif leading-tight text-ink md:text-5xl lg:text-6xl">
      {{ t('about.clients.title') }}
    </h2>
    <div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
      <div
        v-for="(logo, index) in clientLogos"
        :key="logo.name"
        :ref="el => { if (el) clientLogosRefs[index] = el as HTMLElement }"
        class="flex items-center justify-center rounded-lg px-8 py-14 transition-colors"
        style="background-color: #F4F2F2;"
      >
        <span class="text-sm font-medium text-slate-700">{{ logo.name }}</span>
      </div>
    </div>
  </section>
</template>
