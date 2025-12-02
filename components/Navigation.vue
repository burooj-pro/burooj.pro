<script setup lang="ts">
const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/#about' },
  { label: 'Services', to: '/#services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/#contact' },
]

const isMenuOpen = ref(false)
const isScrolledPastHero = ref(false)

// Only watch route changes on client side
if (import.meta.client) {
  onMounted(() => {
    // Get route on client side only
    const clientRoute = useRoute()
  
  // Helper function to check if current page has a hero section
  const isPageWithoutHero = () => {
    if (!clientRoute?.path) return false
    return clientRoute.path === '/projects' || clientRoute.path.startsWith('/projects') || clientRoute.path === '/contact' || clientRoute.path.startsWith('/contact')
  }
  
  // Set initial state based on route
  isScrolledPastHero.value = isPageWithoutHero()
    
    watch(
      () => clientRoute.fullPath,
      () => {
        isMenuOpen.value = false
        // Set navbar to dark immediately on pages without hero
        if (isPageWithoutHero()) {
          isScrolledPastHero.value = true
        } else {
          // Reset and check scroll position for pages with hero
          checkScrollPosition()
        }
      }
    )

    // Check scroll position to determine if past hero section
    const checkScrollPosition = () => {
      // If on a page without hero, always show dark navbar
      if (isPageWithoutHero()) {
        isScrolledPastHero.value = true
        return
      }
      
      // Find the hero section (first section with min-h-screen)
      const heroSection = document.querySelector('section.min-h-screen')
      if (heroSection) {
        const rect = heroSection.getBoundingClientRect()
        // Check if hero section bottom is above the viewport (scrolled past)
        isScrolledPastHero.value = rect.bottom <= 0
      } else {
        // Fallback: check scroll position
        isScrolledPastHero.value = window.scrollY > window.innerHeight * 0.8
      }
    }

    // Initial check
    checkScrollPosition()

    // Listen to scroll events
    window.addEventListener('scroll', checkScrollPosition, { passive: true })

    onUnmounted(() => {
      window.removeEventListener('scroll', checkScrollPosition)
    })
  })
}
</script>

<template>
  <header class="fixed inset-x-0 top-0 z-50 w-full">
    <div class="w-full bg-transparent backdrop-blur-md" :class="{ 'bg-white/95': isScrolledPastHero }">
      <div class="container">
        <div class="flex items-center justify-between px-6 py-4 md:px-8 md:py-5">
        <NuxtLink to="/" class="flex items-center" prefetch>
          <img 
            :src="isScrolledPastHero ? '/images/Burroj-dark-logo.png' : '/images/Burooj-logo.png'" 
            alt="Burooj" 
            class="h-8 w-auto transition-all duration-300 md:h-10"
            :class="isScrolledPastHero ? '' : 'brightness-0 invert'"
          />
        </NuxtLink>

        <nav class="hidden items-center gap-8 text-sm font-medium transition-colors duration-300 lg:flex" :class="isScrolledPastHero ? 'text-ink' : 'text-white'">
          <NuxtLink
            to="/"
            class="transition-colors duration-300"
            :class="isScrolledPastHero ? 'hover:text-primary' : 'hover:text-primary-light'"
          >
            Home
          </NuxtLink>
          <a
            href="/#about"
            class="transition-colors duration-300"
            :class="isScrolledPastHero ? 'hover:text-primary' : 'hover:text-primary-light'"
          >
            About
          </a>
          <a
            href="/#services"
            class="transition-colors duration-300"
            :class="isScrolledPastHero ? 'hover:text-primary' : 'hover:text-primary-light'"
          >
            Services
          </a>
          <NuxtLink
            to="/projects"
            class="transition-colors duration-300"
            :class="isScrolledPastHero ? 'hover:text-primary' : 'hover:text-primary-light'"
          >
            Projects
          </NuxtLink>
          <a
            href="/#contact"
            class="transition-colors duration-300"
            :class="isScrolledPastHero ? 'hover:text-primary' : 'hover:text-primary-light'"
          >
            Contact
          </a>
          <NuxtLink
            to="/contact"
            class="rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors duration-300"
            :class="isScrolledPastHero ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-white text-ink hover:bg-white/90'"
          >
            Book a Consultation
          </NuxtLink>
        </nav>

        <button
          class="rounded-lg border p-2 backdrop-blur-sm transition-colors duration-300 lg:hidden"
          :class="isScrolledPastHero ? 'border-slate-300 bg-white/80 text-ink' : 'border-white/30 bg-white/10 text-white'"
          type="button"
          :aria-expanded="isMenuOpen"
          @click="isMenuOpen = !isMenuOpen"
        >
          <span class="sr-only">Toggle navigation</span>
          <svg v-if="!isMenuOpen" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="m6 6 12 12M6 18 18 6" />
          </svg>
        </button>
        </div>

        <div 
          v-if="isMenuOpen" 
          class="border-t px-6 py-4 backdrop-blur-md transition-colors duration-300 lg:hidden"
          :class="isScrolledPastHero ? 'border-slate-200 bg-white/95' : 'border-white/20 bg-black/60'"
        >
          <div class="space-y-3 text-sm font-medium transition-colors duration-300" :class="isScrolledPastHero ? 'text-ink' : 'text-white'">
            <NuxtLink
              to="/"
              class="block rounded-lg px-4 py-2 transition-colors duration-300"
              :class="isScrolledPastHero ? 'hover:bg-slate-100' : 'hover:bg-white/10'"
            >
              Home
            </NuxtLink>
            <a
              href="/#about"
              class="block rounded-lg px-4 py-2 transition-colors duration-300"
              :class="isScrolledPastHero ? 'hover:bg-slate-100' : 'hover:bg-white/10'"
            >
              About
            </a>
            <a
              href="/#services"
              class="block rounded-lg px-4 py-2 transition-colors duration-300"
              :class="isScrolledPastHero ? 'hover:bg-slate-100' : 'hover:bg-white/10'"
            >
              Services
            </a>
            <NuxtLink
              to="/projects"
              class="block rounded-lg px-4 py-2 transition-colors duration-300"
              :class="isScrolledPastHero ? 'hover:bg-slate-100' : 'hover:bg-white/10'"
            >
              Projects
            </NuxtLink>
            <a
              href="/#contact"
              class="block rounded-lg px-4 py-2 transition-colors duration-300"
              :class="isScrolledPastHero ? 'hover:bg-slate-100' : 'hover:bg-white/10'"
            >
              Contact
            </a>
            <NuxtLink
              to="/contact"
              class="block rounded-lg px-4 py-2 text-center font-semibold transition-colors duration-300"
              :class="isScrolledPastHero ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-white text-ink hover:bg-white/90'"
            >
              Book a Consultation
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

