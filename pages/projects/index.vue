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

type FilterKey = 'ALL' | 'CONSTRUCTION' | 'PROPERTY' | 'DRONE'

const filters = computed(() => [
  { key: 'ALL' as const, label: t('projects.showAll') },
  { key: 'CONSTRUCTION' as const, label: t('projects.constructionEngineering') },
  { key: 'PROPERTY' as const, label: t('projects.propertyManagement') },
  { key: 'DRONE' as const, label: t('projects.droneCleaning') },
])

const activeFilterKey = ref<FilterKey>('ALL')

const filteredProjects = computed(() => {
  if (activeFilterKey.value === 'ALL') return projects.value
  if (activeFilterKey.value === 'CONSTRUCTION') {
    return projects.value.filter((project: any) => project.category === 'Construction & Engineering')
  }
  if (activeFilterKey.value === 'PROPERTY') {
    return projects.value.filter((project: any) => project.category === 'Property Management')
  }
  if (activeFilterKey.value === 'DRONE') {
    return projects.value.filter((project: any) => project.category === 'Drone Cleaning')
  }
  return projects.value
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
          :key="filter.key"
          class="transition-colors hover:text-primary"
          :class="filter.key === activeFilterKey ? 'text-ink underline decoration-2 underline-offset-4' : 'text-slate-500'"
          type="button"
          @click="activeFilterKey = filter.key"
        >
          {{ filter.label }}
        </button>
      </div>
    </div>

    <!-- Projects Grid -->
    <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
      <NuxtLink
        v-for="(project, projectIndex) in filteredProjects"
        :key="project.slug"
        :ref="(el) => { const node = (el as any)?.$el ?? el; if (node && (node as any).nodeType === 1) projectItems[projectIndex] = node as HTMLElement }"
        :to="localePath(`/projects/${project.slug}`)"
        class="group relative block cursor-pointer overflow-hidden"
        @mouseenter="handleProjectEnter(projectIndex)"
        @mouseleave="handleProjectLeave"
      >
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
    class="pointer-events-none fixed z-[100] flex items-center justify-center rounded-full bg-primary/60 px-8 py-3 text-sm font-medium text-white backdrop-blur-md transition-opacity duration-300"
    :style="{ left: cursorPosition.x - 70 + 'px', top: cursorPosition.y - 18 + 'px' }"
  >
    {{ t('projects.viewProject') }}
  </div>
</template>

