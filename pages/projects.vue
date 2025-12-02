<script setup lang="ts">
useHead({ title: 'Projects' })

const filters = ['SHOW ALL', 'CONSTRUCTION & ENGINEERING', 'DRONE CLEANING'] as const
const activeFilter = ref<(typeof filters)[number]>('SHOW ALL')

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
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  },
  {
    title: 'Commercial Tower – Property Management & Reporting',
    category: 'Property Management',
    status: 'Completed',
    description: 'Full property management services including automated reporting and tenant management.',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  },
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'SHOW ALL') return projects
  const filterMap: Record<string, string> = {
    'CONSTRUCTION & ENGINEERING': 'Construction & Engineering',
    'DRONE CLEANING': 'Drone Cleaning',
  }
  return projects.filter((project) => project.category === filterMap[activeFilter.value])
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
        OUR WORK
      </h1>
      
      <!-- Filter Navigation -->
      <div class="flex flex-wrap gap-6 text-sm font-medium uppercase tracking-wide">
        <button
          v-for="filter in filters"
          :key="filter"
          class="transition-colors hover:text-primary"
          :class="filter === activeFilter ? 'text-ink underline decoration-2 underline-offset-4' : 'text-slate-500'"
          type="button"
          @click="activeFilter = filter"
        >
          {{ filter }}
        </button>
      </div>
    </div>

    <!-- Projects Grid -->
    <div class="grid gap-8 md:grid-cols-2 lg:gap-12">
      <article
        v-for="(project, projectIndex) in filteredProjects"
        :key="project.title"
        class="group relative cursor-pointer overflow-hidden"
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
              {{ project.status }}
            </span>
          </div>
          <h2 class="text-xl font-bold leading-tight text-ink md:text-2xl">
            {{ project.title }}
          </h2>
          <p class="text-sm leading-relaxed text-slate-600 md:text-base">
            {{ project.description }}
          </p>
        </div>
      </article>
    </div>
  </section>

  <!-- Custom Cursor for Projects -->
  <div
    v-if="isHoveringProject"
    class="pointer-events-none fixed z-[9999] flex items-center justify-center rounded-full bg-primary/60 px-8 py-3 text-sm font-medium text-white backdrop-blur-md transition-opacity duration-300"
    :style="{ left: cursorPosition.x - 70 + 'px', top: cursorPosition.y - 18 + 'px' }"
  >
    View the Project
  </div>
</template>
