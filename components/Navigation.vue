<script setup lang="ts">
const { t, locale, locales } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()
const { getImagePath } = useImagePath()
const config = useRuntimeConfig()
const baseURL = config.app.baseURL || '/'

const navLinks = computed(() => [
  { label: t('nav.home'), to: localePath('/') },
  { label: t('nav.about'), to: localePath('/about') },
  { label: t('nav.services'), to: '/#services' },
  { label: t('nav.projects'), to: localePath('/projects') },
  { label: t('nav.contact'), to: '/#contact' },
])

const isMenuOpen = ref(false)
const isScrolledPastHero = ref(false)

      const availableLocales = computed(() => {
        // Show only the opposite language
        if (locale.value === 'en') {
          return locales.value.filter((i: any) => i.code === 'ar')
        } else {
          return locales.value.filter((i: any) => i.code === 'en')
        }
      })

const switchLanguage = async (lang: string) => {
  await navigateTo(switchLocalePath(lang))
}

// Only watch route changes on client side
if (import.meta.client) {
  onMounted(() => {
    // Get route on client side only
    const clientRoute = useRoute()
  
  // Helper function to check if current page has a hero section
  const isPageWithoutHero = () => {
    if (!clientRoute?.path) return false
    const path = clientRoute.path
    // Pages with hero sections: /, /about, /projects/[slug] (project detail pages have hero sections)
    // Pages without hero sections: /projects (list only), /contact, /privacy-policy, /terms-and-conditions
    return (
      path === '/projects' ||
      path === '/contact' ||
      path.startsWith('/contact') ||
      path === '/privacy-policy' ||
      path.startsWith('/privacy-policy') ||
      path === '/terms-and-conditions' ||
      path.startsWith('/terms-and-conditions')
    )
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
        <div class="flex items-center justify-between px-6 py-4 md:px-12 lg:px-16 xl:px-20 md:py-5">
        <NuxtLink to="/" class="flex items-center" prefetch>
          <img 
            :src="isScrolledPastHero ? `${baseURL}images/Burroj-dark-logo.png` : `${baseURL}images/Burooj-logo.png`" 
            alt="Burooj" 
            class="h-8 w-auto transition-all duration-300 md:h-10"
            :class="isScrolledPastHero ? '' : 'brightness-0 invert'"
          />
        </NuxtLink>

        <nav class="hidden items-center gap-6 text-sm font-medium transition-colors duration-300 lg:flex" :class="isScrolledPastHero ? 'text-ink' : 'text-white'">
          <NuxtLink
            v-for="link in navLinks"
            :key="link.to"
            :to="link.to"
            class="transition-colors duration-300"
            :class="isScrolledPastHero ? 'hover:text-primary' : 'hover:text-primary-light'"
          >
            {{ link.label }}
          </NuxtLink>
          <NuxtLink
            :to="localePath('/contact')"
            class="rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors duration-300"
            :class="isScrolledPastHero ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-white text-ink hover:bg-white/90'"
          >
            {{ t('nav.bookConsultation') }}
          </NuxtLink>
          
          <!-- Language Switcher -->
          <button
            v-if="availableLocales.length > 0"
            @click="switchLanguage(availableLocales[0].code)"
            class="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-colors duration-300"
            :class="isScrolledPastHero ? 'hover:bg-slate-100 text-ink' : 'hover:bg-white/10 text-white'"
            type="button"
            :aria-label="t('nav.language')"
          >
            <span>{{ availableLocales[0].name }}</span>
          </button>
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
              v-for="link in navLinks"
              :key="link.to"
              :to="link.to"
              class="block rounded-lg px-4 py-2 transition-colors duration-300"
              :class="isScrolledPastHero ? 'hover:bg-slate-100' : 'hover:bg-white/10'"
            >
              {{ link.label }}
            </NuxtLink>
            <NuxtLink
              :to="localePath('/contact')"
              class="block rounded-lg px-4 py-2 text-center font-semibold transition-colors duration-300"
              :class="isScrolledPastHero ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-white text-ink hover:bg-white/90'"
            >
              {{ t('nav.bookConsultation') }}
            </NuxtLink>
            
            <!-- Mobile Language Switcher -->
            <div class="flex justify-center border-t pt-3" v-if="availableLocales.length > 0">
              <button
                @click="switchLanguage(availableLocales[0].code)"
                class="rounded-lg px-4 py-2 text-sm font-semibold transition-colors duration-300"
                :class="isScrolledPastHero ? 'bg-primary text-white hover:bg-primary-dark' : 'bg-white text-ink hover:bg-white/90'"
              >
                {{ availableLocales[0].name }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

