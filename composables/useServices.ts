import type { Service, ProcessStep } from '~/types'
import { services as serviceData } from '~/data/services'

export type { Service, ProcessStep }

export const useServices = () => {
  const { t, locale } = useI18n()
  const { getImagePath } = useImagePath()

  const getServiceBySlug = (slug: string): Service | undefined => {
    return serviceData.find((s) => s.slug === slug)
  }

  const getLocalizedService = (service: Service): Service => {
    const localized = locale.value === 'ar' ? {
      ...service,
      title: service.titleAr || service.title,
      description: service.descriptionAr || service.description,
      overview: service.overviewAr || service.overview,
      features: service.featuresAr || service.features,
      benefits: service.benefitsAr || service.benefits,
      subServices: service.subServicesAr || service.subServices,
      process: service.processAr || service.process,
    } : { ...service }

    return {
      ...localized,
      image: localized.image ? getImagePath(localized.image) : undefined,
      images: localized.images?.map((img) => getImagePath(img)).filter((img): img is string => !!img),
    }
  }

  const getServicesByCategory = (category: 'Construction & Engineering' | 'Property Management'): Service[] => {
    return serviceData.filter((s) => s.category === category)
  }

  const getServiceSlugFromTitle = (title: string): string => {
    const service = serviceData.find(
      (s) => s.title === title || t(`services.construction.items.${title.toLowerCase().replace(/\s+/g, '')}`) === title,
    )
    return service?.slug || ''
  }

  return {
    services: serviceData,
    getServiceBySlug,
    getLocalizedService,
    getServicesByCategory,
    getServiceSlugFromTitle,
  }
}
