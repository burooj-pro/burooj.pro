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
  services?: string[]
  servicesAr?: string[]
  overview?: string
  overviewAr?: string
  challenge?: string
  challengeAr?: string
  solution?: string
  solutionAr?: string
  results?: string
  resultsAr?: string
}

export const useProjects = () => {
  const { t, locale } = useI18n()
  const config = useRuntimeConfig()
  const baseURL = config.app.baseURL || '/'
  
  // Helper function to add baseURL to image paths
  const addBaseURL = (path: string): string => {
    if (!path) return path
    // If it's already a full URL (http/https), return as is
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path
    }
    // Remove leading slash and add baseURL
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `${baseURL}${cleanPath}`
  }

  const projects: Project[] = [
    {
      slug: 'albahar-villas',
      title: 'Albahar Villas – Modern Architectural Design & Residential Development',
      category: 'Construction & Engineering',
      status: 'Completed',
      description: 'A contemporary residential villa project featuring minimalist architecture, thoughtful zoning, and a fully modernized layout designed to elevate everyday living.',
      image: '/images/project1.png',
      images: ['/images/project1.png', '/images/project2.png'],
      fullWidthImage: '/images/project3.png',
      location: 'Khobar, Saudi Arabia',
      year: '2023',
      client: 'Private Client',
      services: ['Architecture Design', 'Interior Design', 'Landscape Design', 'Smart Systems'],
      overview: 'This project represents a complete transformation of residential living through innovative design and modern technology. The villas feature open-plan layouts, premium finishes, and integrated smart home systems.',
      challenge: 'Creating a design that balances modern aesthetics with functional living spaces while incorporating advanced smart systems seamlessly.',
      solution: 'We developed a comprehensive design approach that integrated architecture, interior design, and smart technology from the initial concept phase, ensuring all systems work harmoniously.',
      results: 'Successfully delivered a modern residential development that exceeds client expectations, featuring cutting-edge design and technology integration.',
    },
    {
      slug: 'efficiency-center-khobar',
      title: 'Efficiency Center Khobar branch',
      category: 'Construction & Engineering',
      status: 'Completed',
      description: 'Modern office space with integrated smart systems and premium finishing.',
      image: '/images/project2.png',
      images: ['/images/project2.png', '/images/project3.png'],
      fullWidthImage: '/images/project1.png',
      location: 'Khobar, Saudi Arabia',
      year: '2024',
      client: 'Efficiency Center',
      services: ['Interior Design', 'Smart Systems', 'Finishing & Fit-Out', 'HVAC Installation'],
      overview: 'A state-of-the-art office facility designed to maximize productivity and employee comfort through intelligent space planning and advanced building systems.',
      challenge: 'Delivering a modern workspace that supports both individual focus and collaborative work while maintaining energy efficiency.',
      solution: 'Implemented a flexible design with smart lighting, climate control, and modular workspaces that adapt to different work styles and needs.',
      results: 'Created an efficient, comfortable workspace that enhances productivity and reduces operational costs through smart building management.',
    },
    {
      slug: 'aramco-facade-cleaning',
      title: 'Aramco Façade Cleaning – Burooj Air',
      category: 'Drone Cleaning',
      status: 'Completed',
      description: 'High-rise façade cleaning using drone technology for a major corporate building.',
      image: '/images/project3.png',
      images: ['/images/project3.png', '/images/project1.png'],
      fullWidthImage: '/images/project2.png',
      location: 'Dhahran, Saudi Arabia',
      year: '2024',
      client: 'Saudi Aramco',
      services: ['Façade Cleaning', 'High-Access Cleaning'],
      overview: 'A comprehensive drone-powered cleaning service for a major corporate building, demonstrating the efficiency and safety of modern cleaning technology.',
      challenge: 'Cleaning high-rise building façades safely and efficiently without disrupting building operations or requiring extensive scaffolding.',
      solution: 'Deployed specialized drone cleaning technology that reached all areas of the building façade quickly and safely, eliminating the need for scaffolding.',
      results: 'Completed the cleaning project in record time with zero safety incidents and minimal disruption to building operations.',
    },
    {
      slug: 'jenan-building-cleaning',
      title: 'Jenan Building – Drone Cleaning',
      category: 'Drone Cleaning',
      status: 'Completed',
      description: 'Comprehensive drone-powered cleaning service for commercial building.',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      ],
      fullWidthImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80',
      location: 'Riyadh, Saudi Arabia',
      year: '2024',
      client: 'Jenan Building Management',
      services: ['Façade Cleaning', 'Solar Panel Cleaning'],
      overview: 'A complete cleaning solution for a modern commercial building using advanced drone technology.',
      challenge: 'Providing thorough cleaning services for hard-to-reach areas including building façades and rooftop solar panels.',
      solution: 'Utilized specialized drone cleaning equipment to access all areas efficiently and safely.',
      results: 'Delivered exceptional cleaning results while significantly reducing time and costs compared to traditional methods.',
    },
    {
      slug: 'commercial-tower-management',
      title: 'Commercial Tower – Property Management & Reporting',
      category: 'Property Management',
      status: 'Completed',
      description: 'Full property management services including automated reporting and tenant management.',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
      images: [
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
      ],
      location: 'Jeddah, Saudi Arabia',
      year: '2023',
      client: 'Commercial Tower Owners',
      services: ['Property Management', 'Automated Reporting', 'Tenant Management', 'Revenue Collection'],
      overview: 'Comprehensive property management services for a large commercial tower, implementing automated systems for efficiency and transparency.',
      challenge: 'Managing a complex commercial property with multiple tenants while maintaining high service standards and accurate financial reporting.',
      solution: 'Implemented our integrated property management platform with automated reporting, tenant portals, and streamlined processes.',
      results: 'Improved operational efficiency by 40%, enhanced tenant satisfaction, and provided real-time financial transparency to property owners.',
    },
  ]

  const getProjectBySlug = (slug: string): Project | undefined => {
    return projects.find((p) => p.slug === slug)
  }

  const getLocalizedProject = (project: Project): Project => {
    const localized = locale.value === 'ar' ? {
      ...project,
      title: project.titleAr || project.title,
      description: project.descriptionAr || project.description,
      location: project.locationAr || project.location,
      overview: project.overviewAr || project.overview,
      challenge: project.challengeAr || project.challenge,
      solution: project.solutionAr || project.solution,
      results: project.resultsAr || project.results,
      services: project.servicesAr || project.services,
    } : { ...project }
    
    // Add baseURL to all image paths
    return {
      ...localized,
      image: addBaseURL(localized.image),
      images: localized.images?.map(img => addBaseURL(img)),
      fullWidthImage: localized.fullWidthImage ? addBaseURL(localized.fullWidthImage) : undefined,
    }
  }

  return {
    projects,
    getProjectBySlug,
    getLocalizedProject,
  }
}

