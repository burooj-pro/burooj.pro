<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
useHead({ title: t('projects.title') })

const { fadeInUp, staggerFadeIn } = useGsap()
const projectsSection = ref<HTMLElement | null>(null)
const projectItems = ref<HTMLElement[]>([])

const { projects: allProjects, getLocalizedProject } = useProjects()

// Localize projects to get correct image paths with baseURL
const projects = computed(() => {
  return allProjects.map((project: any) => getLocalizedProject(project))
})

onMounted(() => {
  fadeInUp(projectsSection)
  
  // Stagger animate project items
  if (import.meta.client) {
    nextTick(() => {
      setTimeout(() => {
        if (projectItems.value.length > 0) {
          staggerFadeIn(projectItems, { stagger: 0.1 })
        }
      }, 100)
    })
  }
})

const filters = computed(() => [
  t('projects.showAll'),
  t('projects.constructionEngineering'),
  t('projects.droneCleaning'),
])
const activeFilter = ref<string>(filters.value[0])

const filterKeys = ['SHOW ALL', 'CONSTRUCTION & ENGINEERING', 'DRONE CLEANING'] as const
const activeFilterKey = ref<(typeof filterKeys)[number]>('SHOW ALL')

const getFilterKey = (filter: string) => {
  if (filter.includes('ALL') || filter.includes('الكل')) return 'SHOW ALL'
  if (filter.includes('CONSTRUCTION') || filter.includes('البناء')) return 'CONSTRUCTION & ENGINEERING'
  if (filter.includes('DRONE') || filter.includes('الطائرات')) return 'DRONE CLEANING'
  return 'SHOW ALL'
}

const filteredProjects = computed(() => {
  if (activeFilterKey.value === 'SHOW ALL') return projects.value
  const filterMap: Record<string, string> = {
    'CONSTRUCTION & ENGINEERING': 'Construction & Engineering',
    'DRONE CLEANING': 'Drone Cleaning',
  }
  return projects.value.filter((project: any) => project.category === filterMap[activeFilterKey.value])
})

// Custom cursor for project items
const cursorPosition = ref({ x: 0, y: 0 })
const isHoveringProject = ref(false)
const hoveredProjectIndex = ref<number | null>(null)

const handleMouseMove = (e: MouseEvent) => {
  cursorPosition.value = { x: e.clientX, y: e.clientY }
}

const handleProjectEnter = (index: number) => {
  isHoveringProject.value = true
  hoveredProjectIndex.value = index
}

const handleProjectLeave = () => {
  isHoveringProject.value = false
  hoveredProjectIndex.value = null
}

onMounted(() => {
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<template>
  <section ref="projectsSection" class="section-wrapper py-16 md:py-24">
    <!-- Header Section -->
    <div class="mb-12 space-y-6">
      <h1 class="text-4xl font-serif leading-tight text-ink md:text-5xl lg:text-6xl">
        {{ t('projects.ourWork') }}
      </h1>
      
      <!-- Filter Navigation -->
      <div class="flex flex-wrap gap-6 text-sm font-medium uppercase tracking-wide">
        <button
          v-for="filter in filters"
          :key="filter"
          class="transition-colors hover:text-primary"
          :class="filter === activeFilter ? 'text-ink underline decoration-2 underline-offset-4' : 'text-slate-500'"
          type="button"
          @click="activeFilter = filter; activeFilterKey = getFilterKey(filter)"
        >
          {{ filter }}
        </button>
      </div>
    </div>

    <!-- Projects Grid -->
    <div class="grid gap-8 md:grid-cols-2 lg:gap-12">
      <NuxtLink
        v-for="(project, projectIndex) in filteredProjects"
        :key="project.slug"
        :ref="el => { if (el) projectItems[projectIndex] = el as HTMLElement }"
        :to="localePath(`/projects/${project.slug}`)"
        class="group relative block cursor-pointer overflow-hidden"
        @mouseenter="handleProjectEnter(projectIndex)"
        @mouseleave="handleProjectLeave"
      >
        <!-- Background Overlay for This Project -->
        <transition name="fade">
          <div
            v-if="hoveredProjectIndex === projectIndex"
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

        <div class="relative z-10 aspect-[4/3] overflow-hidden rounded-xl">
          <img
            :src="project.image"
            :alt="project.title"
            class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div class="relative z-10 mt-4 space-y-3">
          <div class="flex flex-wrap gap-2">
            <span class="rounded-lg bg-primary-light px-3 py-1.5 text-xs font-medium leading-normal text-primary">
              {{ project.category }}
            </span>
            <span class="rounded-lg bg-primary-light px-3 py-1.5 text-xs font-medium leading-normal text-primary">
              {{ t('projects.completed') }}
            </span>
          </div>
          <h2 class="text-xl font-bold leading-tight text-ink md:text-2xl">
            {{ project.title }}
          </h2>
          <p class="text-sm leading-relaxed text-slate-600 md:text-base">
            {{ project.description }}
          </p>
        </div>
      </NuxtLink>
    </div>
  </section>

  <!-- Custom Cursor for Projects -->
  <div
    v-if="isHoveringProject"
    class="pointer-events-none fixed z-[9999] flex items-center justify-center rounded-full bg-primary/60 px-8 py-3 text-sm font-medium text-white backdrop-blur-md transition-opacity duration-300"
    :style="{ left: cursorPosition.x - 70 + 'px', top: cursorPosition.y - 18 + 'px' }"
  >
    {{ t('projects.viewProject') }}
  </div>
</template>

