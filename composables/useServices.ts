export interface ProcessStep {
  title: string
  titleAr?: string
  description: string
  descriptionAr?: string
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

export const useServices = () => {
  const { t, locale } = useI18n()
  const config = useRuntimeConfig()
  const baseURL = config.app.baseURL || '/'
  
  // Helper function to add baseURL to image paths
  const addBaseURL = (path: string | undefined): string | undefined => {
    if (!path) return path
    // If it's already a full URL (http/https), return as is
    if (path.startsWith('http://') || path.startsWith('https://')) {
      return path
    }
    // Remove leading slash and add baseURL
    const cleanPath = path.startsWith('/') ? path.slice(1) : path
    return `${baseURL}${cleanPath}`
  }

  const services: Service[] = [
    // Construction & Engineering Services
    {
      slug: 'architecture-design',
      title: 'Architecture Design',
      category: 'Construction & Engineering',
      description: 'Innovative architectural solutions combining creativity, functionality, and compliance—supported by detailed drawings, 3D models, and visual presentations.',
      overview: 'Our architecture design services deliver comprehensive solutions that blend aesthetic excellence with practical functionality. We create spaces that not only look stunning but also meet all regulatory requirements and client needs. From initial concept to final construction documents, we guide you through every step of the design process.',
      features: [
        'Detailed architectural drawings and blueprints',
        '3D modeling and visualization',
        'Regulatory compliance and permit support',
        'Sustainable design principles',
        'Client collaboration and iterative design process',
      ],
      benefits: [
        'Clear visual representation before construction',
        'Reduced design errors and revisions',
        'Faster approval processes',
        'Optimized space utilization',
        'Future-ready designs',
      ],
      subServices: [
        'Conceptual Design',
        'Schematic Design',
        'Design Development',
        'Construction Documents',
        'Permit Applications',
        '3D Visualization',
      ],
      process: [
        {
          title: 'Discovery & Consultation',
          description: 'We begin by understanding your vision, requirements, budget, and site constraints.',
        },
        {
          title: 'Concept & Mood Board Development',
          description: 'We translate insights into concepts and mood boards that set the direction for materials, palettes, and experience.',
        },
        {
          title: 'Design Development',
          description: 'We refine layouts, details, and specifications into a cohesive design ready for execution.',
        },
        {
          title: 'Execution & Fit-Out',
          description: 'Our team coordinates and oversees build and fit-out activities to deliver precisely as designed.',
        },
        {
          title: 'Handover & After-Service',
          description: 'We complete final walkthroughs, address snags, and provide post-handover support.',
        },
      ],
      image: '/images/service1.png',
    },
    {
      slug: 'interior-design',
      title: 'Interior Design',
      category: 'Construction & Engineering',
      description: 'Practical, beautiful, and personalized interiors designed for lifestyle, brand identity, and function.',
      overview: 'We create interior spaces that reflect your personality, brand, or lifestyle while maximizing functionality and comfort. Our designs balance aesthetics with practical considerations, ensuring every space is both beautiful and functional.',
      features: [
        'Space planning and layout optimization',
        'Material and finish selection',
        'Furniture and fixture design',
        'Color schemes and lighting design',
        'Brand identity integration',
      ],
      benefits: [
        'Personalized spaces that reflect your style',
        'Improved functionality and flow',
        'Enhanced property value',
        'Cohesive design throughout',
        'Professional finish and quality',
      ],
      subServices: [
        'Space Planning',
        'Color Consultation',
        'Furniture Selection',
        'Lighting Design',
        'Material Specification',
        'Custom Millwork Design',
      ],
      process: [
        {
          title: 'Initial Consultation',
          description: 'We meet with you to understand your style preferences, functional needs, and project goals.',
        },
        {
          title: 'Space Analysis',
          description: 'We analyze your space, taking measurements and assessing lighting, flow, and structural elements.',
        },
        {
          title: 'Design Concept',
          description: 'We develop a comprehensive design concept including layouts, color palettes, and material selections.',
        },
        {
          title: 'Design Refinement',
          description: 'We refine the design based on your feedback, ensuring every detail aligns with your vision.',
        },
        {
          title: 'Procurement & Coordination',
          description: 'We coordinate with vendors, order materials and furnishings, and manage the procurement process.',
        },
        {
          title: 'Installation & Styling',
          description: 'We oversee installation and add final styling touches to bring your space to life.',
        },
      ],
      image: '/images/service1.png',
    },
    {
      slug: 'finishing-fit-out',
      title: 'Finishing & Fit-Out',
      category: 'Construction & Engineering',
      description: 'Premium finishing, including painting, flooring, plastering, and full interior fit-out.',
      overview: 'We deliver premium finishing and fit-out services that transform spaces with high-quality materials, expert craftsmanship, and attention to detail.',
      features: [
        'Painting and wall finishes',
        'Flooring installation (tiles, wood, carpet)',
        'Plastering and drywall work',
        'Ceiling treatments',
        'Complete interior fit-out services',
      ],
      benefits: [
        'Premium finish quality',
        'Durable, long-lasting materials',
        'Professional craftsmanship',
        'Timely project completion',
        'Comprehensive service coverage',
      ],
      image: '/images/service1.png',
    },
    // Property Management Services
    {
      slug: 'real-estate-marketing',
      title: 'Real Estate Marketing',
      category: 'Property Management',
      description: 'Comprehensive marketing strategies to attract quality tenants and maximize property visibility.',
      overview: 'We develop and execute targeted marketing campaigns that showcase your property effectively, attract qualified tenants, and minimize vacancy periods. Our comprehensive approach ensures maximum visibility across all relevant channels.',
      features: [
        'Professional photography and videography',
        'Multi-channel marketing campaigns',
        'Online listings and advertising',
        'Property staging and presentation',
        'Market analysis and pricing strategies',
      ],
      benefits: [
        'Faster tenant acquisition',
        'Higher quality tenants',
        'Reduced vacancy periods',
        'Optimized rental rates',
        'Professional property presentation',
      ],
      subServices: [
        'Property Photography',
        'Virtual Tours',
        'Listing Creation',
        'Social Media Marketing',
        'Print Advertising',
        'Open House Coordination',
      ],
      process: [
        {
          title: 'Property Assessment',
          description: 'We assess your property to identify its unique selling points and determine the best marketing approach.',
        },
        {
          title: 'Marketing Strategy',
          description: 'We develop a comprehensive marketing strategy tailored to your property and target tenant demographic.',
        },
        {
          title: 'Content Creation',
          description: 'We create professional photography, videography, and written content that showcases your property effectively.',
        },
        {
          title: 'Multi-Channel Distribution',
          description: 'We distribute your property listing across multiple platforms including online portals, social media, and print media.',
        },
        {
          title: 'Lead Management',
          description: 'We manage all inquiries, schedule viewings, and qualify potential tenants.',
        },
        {
          title: 'Performance Tracking',
          description: 'We monitor campaign performance and adjust strategies to optimize results.',
        },
      ],
      image: '/images/service2.png',
    },
    {
      slug: 'real-estate-leasing',
      title: 'Real Estate Leasing',
      category: 'Property Management',
      description: 'Streamlined leasing processes from tenant screening to lease execution.',
      overview: 'We handle the entire leasing process professionally, ensuring you find the right tenants quickly while protecting your interests through thorough screening and proper documentation. Our comprehensive approach minimizes vacancies and maximizes tenant satisfaction.',
      features: [
        'Tenant screening and background checks',
        'Lease negotiation and preparation',
        'Property showings and tours',
        'Application processing',
        'Lease execution and documentation',
      ],
      benefits: [
        'Quality tenant selection',
        'Faster lease execution',
        'Reduced risk of defaults',
        'Professional tenant relations',
        'Comprehensive documentation',
      ],
      subServices: [
        'Tenant Screening',
        'Background Checks',
        'Credit Verification',
        'Lease Preparation',
        'Property Showings',
        'Application Processing',
      ],
      process: [
        {
          title: 'Property Preparation',
          description: 'We prepare your property for showings, ensuring it presents well to potential tenants.',
        },
        {
          title: 'Marketing & Promotion',
          description: 'We market your property across multiple channels to attract qualified applicants.',
        },
        {
          title: 'Application Collection',
          description: 'We collect and organize all tenant applications, ensuring complete documentation.',
        },
        {
          title: 'Tenant Screening',
          description: 'We conduct thorough background checks, credit verification, and reference checks.',
        },
        {
          title: 'Lease Negotiation',
          description: 'We negotiate lease terms on your behalf, protecting your interests while securing quality tenants.',
        },
        {
          title: 'Lease Execution',
          description: 'We finalize all documentation, collect deposits, and complete the lease signing process.',
        },
      ],
      image: '/images/service2.png',
    },
    {
      slug: 'pricing-optimization',
      title: 'Pricing Optimization',
      category: 'Property Management',
      description: 'Data-driven rental pricing strategies to maximize revenue while maintaining competitiveness.',
      overview: 'We analyze market conditions, property features, and comparable properties to set optimal rental rates that maximize your revenue while remaining competitive.',
      features: [
        'Market analysis and research',
        'Competitive property analysis',
        'Dynamic pricing strategies',
        'Revenue optimization recommendations',
        'Regular pricing reviews and adjustments',
      ],
      benefits: [
        'Maximized rental income',
        'Competitive market positioning',
        'Data-driven decisions',
        'Reduced vacancy risk',
        'Optimized return on investment',
      ],
      image: '/images/service2.png',
    },
    {
      slug: 'real-estate-listing',
      title: 'Real Estate Listing',
      category: 'Property Management',
      description: 'Professional property listings across multiple platforms to maximize exposure.',
      overview: 'We create compelling property listings and distribute them across relevant platforms to ensure maximum visibility and attract the right tenants.',
      features: [
        'Professional listing creation',
        'Multi-platform distribution',
        'SEO-optimized descriptions',
        'Regular listing updates',
        'Performance tracking and optimization',
      ],
      benefits: [
        'Maximum property exposure',
        'Attract quality leads',
        'Faster tenant acquisition',
        'Professional presentation',
        'Optimized listing performance',
      ],
      image: '/images/service2.png',
    },
    {
      slug: 'tenant-request-management',
      title: 'Tenant Request Management',
      category: 'Property Management',
      description: 'Efficient handling of tenant requests, maintenance issues, and service inquiries.',
      overview: 'We provide responsive, professional tenant support through streamlined request management systems that ensure quick resolution and high tenant satisfaction.',
      features: [
        '24/7 request portal access',
        'Priority-based request handling',
        'Automated request tracking',
        'Vendor coordination and dispatch',
        'Tenant communication and updates',
      ],
      benefits: [
        'Improved tenant satisfaction',
        'Faster issue resolution',
        'Reduced tenant turnover',
        'Organized request tracking',
        'Professional tenant relations',
      ],
      image: '/images/service2.png',
    },
    {
      slug: 'loi-documentation',
      title: 'LOI Documentation',
      category: 'Property Management',
      description: 'Professional preparation and management of Letters of Intent for property transactions.',
      overview: 'We handle all aspects of LOI documentation, ensuring accuracy, compliance, and smooth transaction processes.',
      features: [
        'LOI preparation and drafting',
        'Terms negotiation support',
        'Legal compliance review',
        'Document management and storage',
        'Transaction coordination',
      ],
      benefits: [
        'Accurate documentation',
        'Legal compliance',
        'Smooth transactions',
        'Professional representation',
        'Reduced legal risks',
      ],
      image: '/images/service2.png',
    },
    {
      slug: 'legal-affairs',
      title: 'Legal Affairs',
      category: 'Property Management',
      description: 'Comprehensive legal support for property management, contracts, and compliance.',
      overview: 'We provide expert legal support for all property management matters, ensuring compliance and protecting your interests.',
      features: [
        'Contract review and preparation',
        'Legal compliance monitoring',
        'Dispute resolution support',
        'Regulatory guidance',
        'Legal documentation management',
      ],
      benefits: [
        'Legal protection',
        'Regulatory compliance',
        'Reduced legal risks',
        'Expert legal guidance',
        'Peace of mind',
      ],
      image: '/images/service2.png',
    },
    {
      slug: 'government-requirements',
      title: 'Government Requirements',
      category: 'Property Management',
      description: 'Handling all government-related documentation, permits, and regulatory compliance.',
      overview: 'We manage all government requirements and regulatory compliance on your behalf, ensuring your property operations remain fully compliant.',
      features: [
        'Permit applications and renewals',
        'Regulatory compliance monitoring',
        'Government documentation management',
        'License maintenance',
        'Compliance reporting',
      ],
      benefits: [
        'Full regulatory compliance',
        'Reduced administrative burden',
        'Avoidance of penalties',
        'Professional handling',
        'Peace of mind',
      ],
      image: '/images/service2.png',
    },
    {
      slug: 'contract-documentation',
      title: 'Contract Documentation',
      category: 'Property Management',
      description: 'Professional preparation, review, and management of all property-related contracts.',
      overview: 'We ensure all contracts are properly prepared, reviewed, and managed, protecting your interests and ensuring clarity for all parties.',
      features: [
        'Contract preparation and drafting',
        'Contract review and negotiation',
        'Document management and storage',
        'Renewal tracking and management',
        'Compliance monitoring',
      ],
      benefits: [
        'Protected interests',
        'Clear terms and conditions',
        'Organized documentation',
        'Reduced disputes',
        'Professional management',
      ],
      image: '/images/service2.png',
    },
    {
      slug: 'revenue-collection',
      title: 'Revenue Collection',
      category: 'Property Management',
      description: 'Efficient and reliable collection of rental payments and other property revenues.',
      overview: 'We handle all aspects of revenue collection professionally, ensuring timely payments and maintaining positive tenant relationships.',
      features: [
        'Automated payment processing',
        'Payment tracking and reminders',
        'Late payment management',
        'Financial reporting',
        'Multiple payment methods',
      ],
      benefits: [
        'Improved cash flow',
        'Reduced payment delays',
        'Automated processes',
        'Financial transparency',
        'Professional tenant relations',
      ],
      image: '/images/service2.png',
    },
    {
      slug: 'automated-reporting',
      title: 'Automated Reporting',
      category: 'Property Management',
      description: 'Comprehensive, automated reporting on property performance, finances, and operations.',
      overview: 'We provide detailed, automated reports that give you complete visibility into your property\'s performance, finances, and operations.',
      features: [
        'Financial performance reports',
        'Occupancy and vacancy reports',
        'Maintenance and service reports',
        'Revenue and expense tracking',
        'Custom report generation',
      ],
      benefits: [
        'Complete visibility',
        'Data-driven decisions',
        'Time savings',
        'Financial transparency',
        'Performance insights',
      ],
      image: '/images/service2.png',
    },
    {
      slug: 'real-estate-valuation',
      title: 'Real Estate Valuation',
      category: 'Property Management',
      description: 'Professional property valuation services for sales, purchases, and investment analysis.',
      overview: 'We provide accurate, professional property valuations based on comprehensive market analysis and property assessment.',
      features: [
        'Market analysis and research',
        'Property condition assessment',
        'Comparative market analysis',
        'Investment analysis',
        'Valuation reports and documentation',
      ],
      benefits: [
        'Accurate property values',
        'Informed decision-making',
        'Investment insights',
        'Professional documentation',
        'Market expertise',
      ],
      image: '/images/service2.png',
    },
    {
      slug: 'operational-cost-reduction',
      title: 'Operational Cost Reduction',
      category: 'Property Management',
      description: 'Strategic cost optimization to improve property profitability and efficiency.',
      overview: 'We analyze your property operations and identify opportunities to reduce costs while maintaining or improving service quality.',
      features: [
        'Cost analysis and auditing',
        'Vendor negotiation and management',
        'Energy efficiency optimization',
        'Process improvement recommendations',
        'Budget optimization strategies',
      ],
      benefits: [
        'Reduced operating costs',
        'Improved profitability',
        'Optimized budgets',
        'Better vendor relationships',
        'Enhanced efficiency',
      ],
      image: '/images/service2.png',
    },
    {
      slug: 'cleaning-maintenance',
      title: 'Cleaning & Maintenance',
      category: 'Property Management',
      description: 'Comprehensive cleaning and maintenance services to keep properties in optimal condition.',
      overview: 'We provide regular cleaning and maintenance services that keep your property looking its best and functioning properly.',
      features: [
        'Regular cleaning schedules',
        'Preventive maintenance programs',
        'Vendor coordination',
        'Quality inspections',
        'Emergency maintenance response',
      ],
      benefits: [
        'Well-maintained properties',
        'Extended asset lifespan',
        'Improved tenant satisfaction',
        'Reduced major repairs',
        'Professional service delivery',
      ],
      image: '/images/service2.png',
    },
    {
      slug: 'security-monitoring-logs',
      title: 'Security Monitoring & Logs',
      category: 'Property Management',
      description: 'Comprehensive security monitoring and detailed activity logging for property safety.',
      overview: 'We provide advanced security monitoring and logging services that protect your property and provide detailed activity records.',
      features: [
        '24/7 security monitoring',
        'Access control systems',
        'Activity logging and reporting',
        'Incident response',
        'Security system maintenance',
      ],
      benefits: [
        'Enhanced property security',
        'Detailed activity records',
        'Quick incident response',
        'Peace of mind',
        'Professional security management',
      ],
      image: '/images/service2.png',
    },
    {
      slug: 'improving-operational-efficiency',
      title: 'Improving Operational Efficiency',
      category: 'Property Management',
      description: 'Strategic improvements to streamline operations and enhance property management effectiveness.',
      overview: 'We analyze your property operations and implement improvements that enhance efficiency, reduce waste, and improve overall performance.',
      features: [
        'Process analysis and optimization',
        'Technology integration',
        'Workflow improvements',
        'Performance metrics and KPIs',
        'Continuous improvement programs',
      ],
      benefits: [
        'Streamlined operations',
        'Reduced waste and inefficiency',
        'Improved performance',
        'Cost savings',
        'Enhanced productivity',
      ],
      image: '/images/service2.png',
    },
    {
      slug: 'zakat-tax-services',
      title: 'Zakat & Tax Services',
      category: 'Property Management',
      description: 'Professional Zakat and tax calculation, filing, and compliance services.',
      overview: 'We handle all Zakat and tax-related matters for your property, ensuring accurate calculations, timely filings, and full compliance.',
      features: [
        'Zakat calculation and filing',
        'Tax preparation and filing',
        'Compliance monitoring',
        'Regulatory updates and guidance',
        'Documentation and record-keeping',
      ],
      benefits: [
        'Accurate tax compliance',
        'Reduced administrative burden',
        'Avoidance of penalties',
        'Expert guidance',
        'Peace of mind',
      ],
      image: '/images/service2.png',
    },
  ]

  const getServiceBySlug = (slug: string): Service | undefined => {
    return services.find((s) => s.slug === slug)
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
    
    // Add baseURL to all image paths
    return {
      ...localized,
      image: addBaseURL(localized.image),
      images: localized.images?.map(img => addBaseURL(img)).filter((img): img is string => !!img),
    }
  }

  const getServicesByCategory = (category: 'Construction & Engineering' | 'Property Management'): Service[] => {
    return services.filter((s) => s.category === category)
  }

  const getServiceSlugFromTitle = (title: string): string => {
    const service = services.find((s) => s.title === title || t(`services.construction.items.${title.toLowerCase().replace(/\s+/g, '')}`) === title)
    return service?.slug || ''
  }

  return {
    services,
    getServiceBySlug,
    getLocalizedService,
    getServicesByCategory,
    getServiceSlugFromTitle,
  }
}

