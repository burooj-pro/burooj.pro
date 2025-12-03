<script setup lang="ts">
const { t, locale, locales } = useI18n()
const localePath = useLocalePath()
const switchLocalePath = useSwitchLocalePath()

const navLinks = computed(() => [
  { label: t('nav.home'), to: localePath('/') },
  { label: t('nav.about'), to: '/#about' },
  { label: t('nav.services'), to: '/#services' },
  { label: t('nav.projects'), to: localePath('/projects') },
  { label: t('nav.contact'), to: '/#contact' },
])

const isMenuOpen = ref(false)
const isScrolledPastHero = ref(false)
const isLangMenuOpen = ref(false)

const availableLocales = computed(() => {
  return locales.value.filter((i: any) => i.code !== locale.value)
})

const switchLanguage = async (lang: string) => {
  await navigateTo(switchLocalePath(lang))
  isLangMenuOpen.value = false
}

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
        isLangMenuOpen.value = false
        // Set navbar to dark immediately on pages without hero
        if (isPageWithoutHero()) {
          isScrolledPastHero.value = true
        } else {
          // Reset and check scroll position for pages with hero
          checkScrollPosition()
        }
      }
    )
    
    // Close language menu when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (!target.closest('.relative')) {
        isLangMenuOpen.value = false
      }
    }
    
    document.addEventListener('click', handleClickOutside)
    
    onUnmounted(() => {
      document.removeEventListener('click', handleClickOutside)
    })

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
          <div class="relative">
            <button
              @click="isLangMenuOpen = !isLangMenuOpen"
              class="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm transition-colors duration-300"
              :class="isScrolledPastHero ? 'hover:bg-slate-100 text-ink' : 'hover:bg-white/10 text-white'"
              type="button"
              :aria-expanded="isLangMenuOpen"
              :aria-label="t('nav.language')"
            >
              <span>{{ locale.toUpperCase() }}</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            <div
              v-if="isLangMenuOpen"
              class="absolute end-0 top-full mt-2 min-w-[120px] rounded-lg border shadow-lg backdrop-blur-md"
              :class="isScrolledPastHero ? 'border-slate-200 bg-white' : 'border-white/20 bg-black/80'"
            >
              <button
                v-for="availableLocale in availableLocales"
                :key="availableLocale.code"
                @click="switchLanguage(availableLocale.code)"
                class="block w-full px-4 py-2 text-left text-sm transition-colors duration-300"
                :class="isScrolledPastHero ? 'hover:bg-slate-100 text-ink' : 'hover:bg-white/10 text-white'"
              >
                {{ availableLocale.name }}
              </button>
            </div>
          </div>
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
            <div class="flex items-center gap-2 border-t pt-3">
              <span class="text-xs opacity-70">{{ t('nav.language') || 'Language' }}:</span>
              <div class="flex gap-2">
                <button
                  v-for="availableLocale in availableLocales"
                  :key="availableLocale.code"
                  @click="switchLanguage(availableLocale.code)"
                  class="rounded-lg px-3 py-1.5 text-xs transition-colors duration-300"
                  :class="isScrolledPastHero ? 'bg-slate-100 text-ink hover:bg-slate-200' : 'bg-white/10 text-white hover:bg-white/20'"
                >
                  {{ availableLocale.name }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

