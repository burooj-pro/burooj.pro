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

// Filters removed - showing all projects
const filteredProjects = computed(() => {
  return projects.value
})

const getCategoryLabel = (category: string) => {
  if (category === 'Construction & Engineering') return t('projects.constructionEngineering')
  if (category === 'Property Management') return t('projects.propertyManagement')
  if (category === 'Drone Cleaning') return t('projects.droneCleaning')
  return category
}
const getStatusLabel = (status: string) => (status === 'Completed' ? t('projects.completed') : status)

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
    <div class="mb-12 space-y-4">
      <h1 class="text-4xl font-serif leading-tight text-ink md:text-5xl lg:text-6xl">
        {{ t('projects.ourWork') }}
      </h1>
      <p class="max-w-3xl text-base leading-relaxed text-slate-600 md:text-lg">
        {{ t('projects.ourWorkDescription') }}
      </p>
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
        <div class="relative z-10 aspect-[4/3] overflow-hidden rounded-xl bg-slate-200">
          <img
            :src="project.image"
            :alt="project.title"
            width="800"
            height="600"
            loading="lazy"
            decoding="async"
            class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div class="relative z-10 mt-4 space-y-3">
          <h2 class="text-xl font-bold leading-tight text-ink md:text-2xl">
            {{ project.title }}
          </h2>
          <p class="text-sm leading-relaxed text-slate-600 md:text-base">
            {{ project.description }}
          </p>
          <!-- Services -->
          <div v-if="project.services && project.services.length > 0" class="flex flex-wrap gap-2 pt-1">
            <span
              v-for="service in project.services"
              :key="service"
              class="rounded-lg bg-primary-light px-3 py-1.5 text-xs font-medium leading-normal text-primary"
            >
              {{ service }}
            </span>
          </div>
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

