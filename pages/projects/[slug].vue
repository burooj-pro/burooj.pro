<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
const route = useRoute()

const { getProjectBySlug, getLocalizedProject } = useProjects()

// Get slug from route params - handle both array and string
const projectSlug = Array.isArray(route.params.slug) 
  ? route.params.slug[0] 
  : (route.params.slug as string)

const project = getProjectBySlug(projectSlug)

if (!project) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Project not found',
  })
}

const localizedProject = computed(() => getLocalizedProject(project))

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

onMounted(() => {
  if (import.meta.client) {
    import('gsap/ScrollTrigger').then(({ ScrollTrigger, gsap }) => {
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
        if (section) {
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
        }
      })
    })
  }
})
</script>

<template>
  <div v-if="localizedProject" class="min-h-screen bg-white">
    <!-- Hero Section -->
    <section
      ref="heroImage"
      class="relative isolate flex min-h-screen w-screen items-end justify-center overflow-hidden"
      style="margin-left: calc(-50vw + 50%); margin-right: calc(-50vw + 50%);"
    >
      <img
        :src="localizedProject.image"
        :alt="localizedProject.title"
        class="absolute inset-0 h-full w-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/20" />
    </section>

    <!-- About Section -->
    <section ref="el => { if (el) contentSections.push(el as HTMLElement) }" class="section-wrapper relative z-10 py-16 md:py-24">
      <div class="grid gap-12 md:grid-cols-2 md:items-start lg:gap-16">
        <!-- Left Column: Category, Title, Description -->
        <div class="space-y-6">
          <p class="text-xs font-semibold uppercase tracking-[0.35em] text-slate-500">
            {{ localizedProject.category }}
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
          <div v-if="localizedProject.location" class="grid grid-cols-[120px_1fr] gap-4">
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">{{ t('projectDetail.location') }}</p>
            <p class="text-sm text-ink">{{ localizedProject.location }}</p>
          </div>
          <div v-if="localizedProject.year" class="grid grid-cols-[120px_1fr] gap-4">
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">{{ t('projectDetail.year') }}</p>
            <p class="text-sm text-ink">{{ localizedProject.year }}</p>
          </div>
          <div v-if="localizedProject.client" class="grid grid-cols-[120px_1fr] gap-4">
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">{{ t('projectDetail.client') }}</p>
            <p class="text-sm text-ink">{{ localizedProject.client }}</p>
          </div>
          <div v-if="localizedProject.services && localizedProject.services.length > 0" class="grid grid-cols-[120px_1fr] gap-4">
            <p class="text-xs font-semibold uppercase tracking-wide text-slate-500">{{ t('projectDetail.services') }}</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="service in localizedProject.services"
                :key="service"
                class="text-sm text-ink"
              >
                {{ service }}<span v-if="service !== localizedProject.services[localizedProject.services.length - 1]">,</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Images Grid Section -->
    <section v-if="localizedProject.images && localizedProject.images.length > 0" ref="el => { if (el) contentSections.push(el as HTMLElement) }" class="section-wrapper relative z-10 py-16 md:py-24">
      <div class="space-y-6">
        <!-- Two Column Grid -->
        <div class="grid gap-6 md:grid-cols-2">
          <div
            v-for="(image, index) in localizedProject.images"
            :key="index"
            class="aspect-[4/3] overflow-hidden rounded-xl"
          >
            <img
              :src="image"
              :alt="`${localizedProject.title} - Image ${index + 1}`"
              class="h-full w-full object-cover"
            />
          </div>
        </div>
        
        <!-- Full Width Image -->
        <div v-if="localizedProject.fullWidthImage" class="w-full overflow-hidden rounded-xl">
          <img
            :src="localizedProject.fullWidthImage"
            :alt="`${localizedProject.title} - Full Width`"
            class="h-full w-full object-cover"
          />
        </div>
      </div>
    </section>
  </div>
</template>

