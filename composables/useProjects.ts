import type { Project } from '~/types'
import { projects as projectData } from '~/data/projects'

export type { Project }

export const useProjects = () => {
  const { locale } = useI18n()
  const { getImagePath } = useImagePath()

  const getProjectBySlug = (slug: string): Project | undefined => {
    return projectData.find((p) => p.slug === slug)
  }

  const getLocalizedProject = (project: Project): Project => {
    const localized = locale.value === 'ar' ? {
      ...project,
      title: project.titleAr || project.title,
      description: project.descriptionAr || project.description,
      location: project.locationAr || project.location,
      client: project.clientAr || project.client,
      overview: project.overviewAr || project.overview,
      exteriorDesign: project.exteriorDesignAr || project.exteriorDesign,
      interiorDesign: project.interiorDesignAr || project.interiorDesign,
      diagramText: project.diagramTextAr || project.diagramText,
      midGalleryText: project.midGalleryTextAr || project.midGalleryText,
      entranceText: project.entranceTextAr || project.entranceText,
      gymText: project.gymTextAr || project.gymText,
      challenge: project.challengeAr || project.challenge,
      solution: project.solutionAr || project.solution,
      results: project.resultsAr || project.results,
      services: project.servicesAr || project.services,
    } : { ...project }

    return {
      ...localized,
      image: getImagePath(localized.image),
      images: localized.images?.map((img) => getImagePath(img)),
      fullWidthImage: localized.fullWidthImage ? getImagePath(localized.fullWidthImage) : undefined,
    }
  }

  const projectOrder: Record<string, number> = {
    'efficiency-center-khobar': 1,
    albarghash: 2,
    'mada-tower': 3,
    gdc: 4,
    ec: 5,
    'albahar-villas': 6,
    'private-shalet': 7,
    'al-fakhreyah-villa-project': 8,
    roaya: 9,
    thabat: 10,
    'tulip-spa': 11,
  }

  const orderedProjects = computed(() => {
    return [...projectData].sort((a, b) => {
      const orderA = projectOrder[a.slug] ?? 999
      const orderB = projectOrder[b.slug] ?? 999
      return orderA - orderB
    })
  })

  return {
    projects: orderedProjects,
    getProjectBySlug,
    getLocalizedProject,
  }
}
