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
  diagramText?: string
  diagramTextAr?: string
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
  const rawBaseURL = config.app.baseURL || '/'
  const baseURL = rawBaseURL.endsWith('/') ? rawBaseURL : `${rawBaseURL}/`
  
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
      title: 'Hay Albahar Villas',
      category: 'Construction & Engineering',
      status: 'Completed',
      description: 'Modern design for four villas located in Hay Albahar, Al Khobar.',
      image: '/images/projects/1/1.png',
      images: [
        '/images/projects/1/1.png',
        '/images/projects/1/2.png',
        '/images/projects/1/3.png',
        '/images/projects/1/4.png',
        '/images/projects/1/5.png',
        '/images/projects/1/6.png',
        '/images/projects/1/7.png',
        '/images/projects/1/8.png',
        '/images/projects/1/9.png',
        '/images/projects/1/10.png',
        '/images/projects/1/11.png',
        '/images/projects/1/12.png',
        '/images/projects/1/13.png',
        '/images/projects/1/14.png',
      ],
      fullWidthImage: '/images/projects/1/14.png',
      location: 'Hay Albahar, Al Khobar, Saudi Arabia',
      year: '2023–2024',
      client: 'Private Client',
      services: [
        'Architecture Design',
        'Site Analysis',
        'Interior Design',
        'Landscape Design',
        'Smart Systems',
        'Finishing & Fit-Out',
      ],
      overview:
        'A modern residential development of four villas in Hay Albahar. The design combines clean architectural lines with practical layouts, supported by site analysis and climate/solar orientation studies to optimize comfort and daylight.',
      diagramText:
        'These villa diagrams summarize the overall zoning and circulation strategy across the four units—supporting privacy, daylight access, and smooth movement between living, service, and outdoor areas.',
      challenge:
        'Designing four modern villas with a cohesive identity while responding to site constraints, surrounding context, and solar orientation for long-term comfort and efficiency.',
      solution:
        'We started with detailed site analysis (location context, surrounding buildings, and solar orientation), then developed an integrated architecture and interior concept with coordinated landscape and smart systems.',
      results:
        'A cohesive villa development with a clear modern identity, optimized orientation, and a premium finish standard aligned with the client’s expectations.',
    },
    {
      slug: 'efficiency-center-khobar',
      title: 'GDC',
      category: 'Construction & Engineering',
      status: 'Completed',
      description: 'A modern office and workspace project delivered under our Construction & Engineering services.',
      image: '/images/projects/6/1.png',
      images: [
        '/images/projects/6/1.png',
        '/images/projects/6/2.png',
        '/images/projects/6/3.png',
        '/images/projects/6/4.png',
        '/images/projects/6/5.png',
        '/images/projects/6/6.png',
        '/images/projects/6/7.png',
        '/images/projects/6/8.png',
        '/images/projects/6/9.png',
        '/images/projects/6/10.png',
        '/images/projects/6/11.png',
        '/images/projects/6/12.png',
        '/images/projects/6/13.png',
        '/images/projects/6/14.png',
      ],
      fullWidthImage: '/images/projects/6/14.png',
      location: 'Saudi Arabia',
      year: '2024',
      client: 'GDC',
      services: ['Interior Design', 'Finishing & Fit-Out', 'Smart Systems', 'Electrical Works', 'HVAC Installation'],
      overview:
        'A modern office and workspace project designed to support productivity and day-to-day operations, with a clean material palette, integrated lighting, and coordinated building systems.',
      challenge:
        'Creating a functional workspace layout while coordinating multiple disciplines (interiors, finishing, and MEP) to a consistent quality standard.',
      solution:
        'We aligned space planning with interior detailing early, then delivered coordinated drawings and a finishing package supported by on-site quality control.',
      results:
        'A cohesive, modern workspace with premium finishes and reliable systems—ready for daily use with consistent performance and maintainability.',
    },
    // {
    //   slug: 'mada-tower',
    //   title: 'Mada Tower',
    //   category: 'Construction & Engineering',
    //   status: 'Completed',
    //   description: 'Construction & engineering project delivered by Burooj.',
    //   image: '/images/project3.png',
    // },
    {
      slug: 'private-shalet',
      title: 'Halfmoon Villa',
      category: 'Construction & Engineering',
      status: 'Completed',
      description: 'Villa project delivered under our Construction & Engineering services.',
      image: '/images/projects/4/1.png',
      images: [
        '/images/projects/4/1.png',
        '/images/projects/4/2.png',
        '/images/projects/4/3.png',
        '/images/projects/4/4.png',
        '/images/projects/4/5.png',
        '/images/projects/4/6.png',
        '/images/projects/4/7.png',
        '/images/projects/4/8.png',
        '/images/projects/4/9.png',
        '/images/projects/4/10.png',
        '/images/projects/4/11.png',
        '/images/projects/4/12.png',
      ],
      fullWidthImage: '/images/projects/4/12.png',
      location: 'Saudi Arabia',
      year: '2024',
      client: 'Private Client',
      services: ['Architecture Design', 'Interior Design', 'Finishing & Fit-Out', 'Smart Systems'],
      overview:
        'A contemporary villa project focused on a clean architectural identity, functional spatial planning, and premium finishing details designed for comfort and long-term durability.',
      challenge:
        'Balancing privacy, daylight, and circulation while maintaining a cohesive modern look across the exterior and interior spaces.',
      solution:
        'Aligned the architectural concept with interior detailing early, then executed a coordinated finishing package with clear drawings and on-site quality control.',
      results:
        'A refined villa outcome with consistent design language, premium finishes, and spaces optimized for daily living and maintainability.',
    },
    {
      slug: 'gdc',
      title: 'Co-working Space',
      category: 'Construction & Engineering',
      status: 'Completed',
      description: 'A modern co-working space designed for focus, collaboration, and premium day-to-day usability.',
      image: '/images/projects/5/1.png',
      images: [
        '/images/projects/5/1.png',
        '/images/projects/5/2.png',
        '/images/projects/5/3.png',
        '/images/projects/5/4.png',
        '/images/projects/5/5.png',
        '/images/projects/5/6.png',
        '/images/projects/5/7.png',
        '/images/projects/5/8.png',
        '/images/projects/5/9.png',
        '/images/projects/5/10.png',
        '/images/projects/5/11.png',
        '/images/projects/5/12.png',
        '/images/projects/5/13.png',
        '/images/projects/5/14.png',
        '/images/projects/5/15.png',
        '/images/projects/5/16.png',
        '/images/projects/5/17.png',
        '/images/projects/5/18.png',
      ],
      fullWidthImage: '/images/projects/5/18.png',
      location: 'Saudi Arabia',
      year: '2024',
      client: 'Private Client',
      services: ['Interior Design', 'Finishing & Fit-Out', 'Smart Systems', 'Electrical Works', 'HVAC Installation'],
      overview:
        'A contemporary co-working environment designed to support productive focus and social collaboration. The space balances open areas, meeting zones, and comfortable circulation with a clean material palette and modern lighting.',
      challenge:
        'Creating a flexible layout that serves different work styles while maintaining acoustic comfort, clear wayfinding, and a consistent premium feel across all zones.',
      solution:
        'We developed a clear zoning strategy (focus, collaboration, and support areas), aligned lighting and finishes to each zone, and coordinated smart-ready infrastructure to keep the space adaptable.',
      results:
        'A cohesive co-working destination with a strong modern identity, functional flow, and durable finishes—ready for daily high-traffic use.',
    },
    // {
    //   slug: 'almazroeyah',
    //   title: 'Almazroeyah',
    //   category: 'Construction & Engineering',
    //   status: 'Completed',
    //   description: 'Construction & engineering project delivered by Burooj.',
    //   image: '/images/project3.png',
    // },
    {
      slug: 'albarghash',
      title: 'AlBarghash Business Lounge',
      category: 'Construction & Engineering',
      status: 'Completed',
      description: 'Construction & engineering project delivered by Burooj.',
      image: '/images/projects/2/1.png',
      images: [
        '/images/projects/2/1.png',
        '/images/projects/2/2.png',
        '/images/projects/2/3.png',
        '/images/projects/2/4.png',
        '/images/projects/2/5.png',
        '/images/projects/2/6.png',
        '/images/projects/2/7.png',
        '/images/projects/2/8.png',
        '/images/projects/2/9.png',
        '/images/projects/2/10.png',
        '/images/projects/2/11.png',
        '/images/projects/2/12.png',
        '/images/projects/2/13.png',
        '/images/projects/2/14.png',
        '/images/projects/2/15.png',
        '/images/projects/2/16.png',
        '/images/projects/2/17.png',
        '/images/projects/2/18.png',
        '/images/projects/2/19.png',
        '/images/projects/2/20.png',
        '/images/projects/2/21.png',
        '/images/projects/2/22.png',
      ],
      fullWidthImage: '/images/projects/2/14.png',
      location: 'Al Khobar, Saudi Arabia',
      year: '2024',
      client: 'Private Client',
      services: ['Architecture Design', 'Interior Design', 'Finishing & Fit-Out', 'Smart Systems'],
      overview:
        'A modern residential project delivered under Burooj’s Construction & Engineering division. The scope focused on a clean architectural identity, functional planning, and premium finishes—supported by coordinated interior details and smart-ready infrastructure.',
      challenge:
        'Delivering a consistent modern look while maintaining practical day-to-day living needs, and coordinating multiple disciplines (architecture, interiors, and finishing) to a single quality standard.',
      solution:
        'We aligned architecture and interior details early, then executed finishing packages with clear drawings, material coordination, and on-site quality control to ensure consistency across all spaces.',
      results:
        'A cohesive, modern residential outcome with premium finishes and a layout that balances aesthetics, comfort, and long-term maintainability.',
    },
    {
      slug: 'al-fakhreyah-villa-project',
      title: 'Al-Fakhreyah Villa Project',
      titleAr: 'مشروع فيلا الفخرية',
      category: 'Construction & Engineering',
      status: 'Completed',
      description: 'A modern villa project featuring cohesive architectural design and premium finishing.',
      descriptionAr: 'مشروع فيلا حديثة بتصميم معماري متناسق وتشطيبات عالية الجودة.',
      image: '/images/projects/3/1.png',
      images: [
        '/images/projects/3/1.png',
        '/images/projects/3/2.png',
        '/images/projects/3/3.png',
        '/images/projects/3/4.png',
        '/images/projects/3/5.png',
      ],
      fullWidthImage: '/images/projects/3/5.png',
      location: 'Saudi Arabia',
      locationAr: 'المملكة العربية السعودية',
      year: '2024',
      client: 'Private Client',
      services: ['Architecture Design', 'Interior Design', 'Finishing & Fit-Out'],
      servicesAr: ['التصميم المعماري', 'التصميم الداخلي', 'التشطيب والتجهيز'],
      overview:
        'A residential villa project focused on clean modern lines, practical spatial planning, and a premium material palette that elevates the day-to-day living experience.',
      overviewAr:
        'مشروع فيلا سكنية يركز على خطوط معمارية حديثة، وتخطيط عملي للمساحات، واختيار مواد عالية الجودة لرفع تجربة السكن اليومية.',
      challenge:
        'Maintaining a consistent modern identity while balancing privacy, natural light, and smooth circulation across the villa’s main zones.',
      challengeAr:
        'تحقيق هوية معمارية حديثة ومتناسقة مع موازنة الخصوصية والإضاءة الطبيعية وسلاسة الحركة بين مناطق الفيلا.',
      solution:
        'We developed an integrated concept that aligns architecture and interior details, then documented the finishing packages to ensure consistent execution and high quality on site.',
      solutionAr:
        'طورنا مفهومًا متكاملًا ينسق بين المعمار والتفاصيل الداخلية، ثم وثقنا حزم التشطيب لضمان تنفيذ متناسق وجودة عالية في الموقع.',
      results:
        'A cohesive villa outcome with refined details, high-quality finishes, and a layout that supports comfort, functionality, and long-term maintainability.',
      resultsAr:
        'نتيجة متكاملة بفيلا بتفاصيل دقيقة وتشطيبات عالية الجودة وتخطيط يدعم الراحة والوظيفة وسهولة الصيانة على المدى الطويل.',
    },
    // {
    //   slug: 'omco',
    //   title: 'Omco',
    //   category: 'Construction & Engineering',
    //   status: 'Completed',
    //   description: 'Construction & engineering project delivered by Burooj.',
    //   image: '/images/project2.png',
    // },
    {
      slug: 'roaya',
      title: 'Roaya',
      category: 'Construction & Engineering',
      status: 'Completed',
      description: 'Construction & engineering project delivered by Burooj.',
      image: '/images/projects/9/1.png',
      images: [
        '/images/projects/9/1.png',
        '/images/projects/9/2.png',
        '/images/projects/9/3.png',
        '/images/projects/9/4.png',
        '/images/projects/9/5.png',
        '/images/projects/9/6.png',
      ],
      fullWidthImage: '/images/projects/9/6.png',
      location: 'Saudi Arabia',
      year: '2024',
      client: 'Roaya',
      services: ['Construction', 'Engineering'],
      overview:
        'Construction and engineering project delivered by Burooj, covering design, execution, and delivery to meet the client’s requirements.',
    },
    {
      slug: 'thabat',
      title: 'Thabat Booth',
      category: 'Construction & Engineering',
      status: 'Completed',
      description: 'A branded booth project delivered under our Construction & Engineering services.',
      image: '/images/projects/8/1.png',
      images: [
        '/images/projects/8/1.png',
        '/images/projects/8/2.png',
        '/images/projects/8/3.png',
        '/images/projects/8/4.png',
        '/images/projects/8/5.png',
      ],
      fullWidthImage: '/images/projects/8/5.png',
      location: 'Saudi Arabia',
      year: '2024',
      client: 'Thabat',
      services: ['Interior Design', 'Finishing & Fit-Out', 'Electrical Works'],
      overview:
        'A modern booth design focused on clear branding, clean lines, and an inviting visitor flow—built with durable finishes suitable for high-traffic events.',
      challenge:
        'Delivering a strong brand presence in a compact footprint while keeping circulation smooth and the build details clean and consistent.',
      solution:
        'We designed a simple, high-impact layout and coordinated materials, lighting, and fabrication details to achieve a premium look and reliable on-site execution.',
      results:
        'A cohesive booth outcome with strong visual identity, refined detailing, and a comfortable visitor experience.',
    },
    // {
    //   slug: 'ogo',
    //   title: 'OGO',
    //   category: 'Construction & Engineering',
    //   status: 'Completed',
    //   description: 'Construction & engineering project delivered by Burooj.',
    //   image: '/images/project2.png',
    // },
    {
      slug: 'ec',
      title: 'EC',
      category: 'Construction & Engineering',
      status: 'Completed',
      description: 'Construction & engineering project delivered by Burooj.',
      image: '/images/project3.png',
    },
    {
      slug: 'tulip-spa',
      title: 'Tulip Spa',
      category: 'Construction & Engineering',
      status: 'Completed',
      description: 'A premium spa fit-out project delivered under our Construction & Engineering services.',
      image: '/images/projects/7/1.png',
      images: [
        '/images/projects/7/1.png',
        '/images/projects/7/2.png',
        '/images/projects/7/3.png',
        '/images/projects/7/4.png',
        '/images/projects/7/5.png',
        '/images/projects/7/6.png',
        '/images/projects/7/7.png',
      ],
      fullWidthImage: '/images/projects/7/7.png',
      location: 'Saudi Arabia',
      year: '2024',
      client: 'Tulip Spa',
      services: ['Interior Design', 'Finishing & Fit-Out', 'Electrical Works', 'Plumbing Services', 'HVAC Installation'],
      overview:
        'A modern spa environment designed to feel calm and premium, with cohesive materials, controlled lighting, and practical circulation for guests and staff.',
      challenge:
        'Delivering a high-end guest experience while coordinating MEP requirements, wet-area detailing, and finishing quality across multiple treatment zones.',
      solution:
        'We aligned the interior concept with technical requirements early, then delivered coordinated drawings and finishing packages with close on-site quality control.',
      results:
        'A refined spa fit-out with consistent detailing, durable finishes, and a welcoming atmosphere ready for daily operation.',
    },
    // {
    //   slug: 'aramco-facade-cleaning',
    //   title: 'Aramco Façade Cleaning – Burooj Air',
    //   category: 'Drone Cleaning',
    //   status: 'Completed',
    //   description: 'High-rise façade cleaning using drone technology for a major corporate building.',
    //   image: '/images/project3.png',
    //   images: ['/images/project3.png', '/images/project1.png'],
    //   fullWidthImage: '/images/project2.png',
    //   location: 'Dhahran, Saudi Arabia',
    //   year: '2024',
    //   client: 'Saudi Aramco',
    //   services: ['Façade Cleaning', 'High-Access Cleaning'],
    //   overview: 'A comprehensive drone-powered cleaning service for a major corporate building, demonstrating the efficiency and safety of modern cleaning technology.',
    //   challenge: 'Cleaning high-rise building façades safely and efficiently without disrupting building operations or requiring extensive scaffolding.',
    //   solution: 'Deployed specialized drone cleaning technology that reached all areas of the building façade quickly and safely, eliminating the need for scaffolding.',
    //   results: 'Completed the cleaning project in record time with zero safety incidents and minimal disruption to building operations.',
    // },
    // {
    //   slug: 'jenan-building-cleaning',
    //   title: 'Jenan Building – Drone Cleaning',
    //   category: 'Drone Cleaning',
    //   status: 'Completed',
    //   description: 'Comprehensive drone-powered cleaning service for commercial building.',
    //   image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    //   images: [
    //     'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    //     'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    //   ],
    //   fullWidthImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80',
    //   location: 'Riyadh, Saudi Arabia',
    //   year: '2024',
    //   client: 'Jenan Building Management',
    //   services: ['Façade Cleaning', 'Solar Panel Cleaning'],
    //   overview: 'A complete cleaning solution for a modern commercial building using advanced drone technology.',
    //   challenge: 'Providing thorough cleaning services for hard-to-reach areas including building façades and rooftop solar panels.',
    //   solution: 'Utilized specialized drone cleaning equipment to access all areas efficiently and safely.',
    //   results: 'Delivered exceptional cleaning results while significantly reducing time and costs compared to traditional methods.',
    // },
    // {
    //   slug: 'commercial-tower-management',
    //   title: 'Commercial Tower – Property Management & Reporting',
    //   category: 'Property Management',
    //   status: 'Completed',
    //   description: 'Full property management services including automated reporting and tenant management.',
    //   image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    //   images: [
    //     'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
    //     'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
    //   ],
    //   location: 'Jeddah, Saudi Arabia',
    //   year: '2023',
    //   client: 'Commercial Tower Owners',
    //   services: ['Property Management', 'Automated Reporting', 'Tenant Management', 'Revenue Collection'],
    //   overview: 'Comprehensive property management services for a large commercial tower, implementing automated systems for efficiency and transparency.',
    //   challenge: 'Managing a complex commercial property with multiple tenants while maintaining high service standards and accurate financial reporting.',
    //   solution: 'Implemented our integrated property management platform with automated reporting, tenant portals, and streamlined processes.',
    //   results: 'Improved operational efficiency by 40%, enhanced tenant satisfaction, and provided real-time financial transparency to property owners.',
    // },
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
      diagramText: project.diagramTextAr || project.diagramText,
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

