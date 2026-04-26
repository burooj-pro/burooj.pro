export interface ProcessStep {
  title: string
  titleAr?: string
  description: string
  descriptionAr?: string
}

export interface Project {
  slug: string
  title: string
  titleAr?: string
  category: string
  status: string
  description: string
  descriptionAr?: string
  image: string
  images?: string[]
  fullWidthImage?: string
  location?: string
  locationAr?: string
  year?: string
  client?: string
  clientAr?: string
  services?: string[]
  servicesAr?: string[]
  overview?: string
  overviewAr?: string
  exteriorDesign?: string
  exteriorDesignAr?: string
  interiorDesign?: string
  interiorDesignAr?: string
  diagramText?: string
  diagramTextAr?: string
  midGalleryText?: string
  midGalleryTextAr?: string
  entranceText?: string
  entranceTextAr?: string
  gymText?: string
  gymTextAr?: string
  challenge?: string
  challengeAr?: string
  solution?: string
  solutionAr?: string
  results?: string
  resultsAr?: string
}

export interface Service {
  slug: string
  title: string
  titleAr?: string
  category: 'Construction & Engineering' | 'Property Management'
  description: string
  descriptionAr?: string
  overview?: string
  overviewAr?: string
  features?: string[]
  featuresAr?: string[]
  benefits?: string[]
  benefitsAr?: string[]
  subServices?: string[]
  subServicesAr?: string[]
  process?: ProcessStep[]
  processAr?: ProcessStep[]
  image?: string
  images?: string[]
}
