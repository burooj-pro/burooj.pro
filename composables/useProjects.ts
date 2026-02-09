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
      title: 'Hay Albahr Villas',
      titleAr: 'فلل حي البحر',
      category: 'Construction & Engineering',
      status: 'Completed',
      description: 'A high-end residential development redefining modern villa living through architectural elegance, smart technology, and functional comfort.',
      descriptionAr: 'تطوير سكني فاخر يعيد تعريف الحياة الفيلية العصرية عبر الأناقة المعمارية والتكنولوجيا الذكية والراحة الوظيفية.',
      image: '/images/projects/1/1.png',
      images: [
        '/images/projects/1/1.png',
        '/images/projects/1/2.png',
        '/images/projects/1/4.png',
        '/images/projects/1/5.png',
        '/images/projects/1/6.png',
        '/images/projects/1/7.png',
        '/images/projects/1/8.png',
        '/images/projects/1/10.png',
        '/images/projects/1/11.png',
        '/images/projects/1/12.png',
        '/images/projects/1/13.png',
        '/images/projects/1/14.png',
      ],
      fullWidthImage: '/images/projects/1/14.png',
      location: 'Hay Albahar, Al Khobar, Saudi Arabia',
      locationAr: 'حي البحر، الخبر، المملكة العربية السعودية',
      year: '2023–2024',
      client: 'Private Client',
      clientAr: 'عميل خاص',
      services: [
        'Architecture Design',
        'Site Analysis',
        'Site Supervision',
        'Interior Design',
        'Landscape Design',
        'Smart Systems',
        'Finishing & Fit-Out',
      ],
      servicesAr: ['التصميم المعماري', 'تحليل الموقع', 'الإشراف على الموقع', 'التصميم الداخلي', 'تصميم المناظر الطبيعية', 'الأنظمة الذكية', 'التشطيب والتجهيز'],
      overview:
        'Our scope of work covered the full design and execution of the project, including architectural development, spatial planning, and technical coordination. We translated the initial vision into a cohesive residential solution by aligning architectural form with functional layouts, climate-responsive strategies, and smart system integration. Detailed site analysis and solar orientation studies were conducted to optimize daylight, comfort, and energy efficiency, ensuring a well-balanced outcome across design intent and on-site execution.',
      overviewAr:
        'شمل نطاق أعمالنا التصميم الكامل والتنفيذ للمشروع، بما في ذلك التطوير المعماري وتخطيط المساحات والتنسيق الفني. حوّلنا الرؤية الأولية إلى حل سكني متسق من خلال مواءمة الشكل المعماري مع التخطيطات الوظيفية واستراتيجيات الاستجابة للمناخ ودمج الأنظمة الذكية. أُجريت دراسات تفصيلية للموقع وتوجه الشمس لتحسين الإضاءة النهارية والراحة وكفاءة الطاقة، مما يضمن نتيجة متوازنة بين نية التصميم والتنفيذ في الموقع.',
      exteriorDesign:
        'The exterior design reflects a contemporary architectural language defined by clean lines, balanced proportions, and a refined material palette. Each villa was carefully composed to achieve visual harmony while maintaining individuality, with façades designed to enhance privacy, natural light, and thermal performance. Shading elements and façade orientation were thoughtfully considered to respond to the local climate, resulting in an exterior that is both elegant and functional, and seamlessly integrated within the Hay Albahr urban context.',
      exteriorDesignAr:
        'يعكس التصميم الخارجي لغة معمارية معاصرة تتميز بخطوط نظيفة ونسب متوازنة ولوحة مواد راقية. تم تأليف كل فيلا بعناية لتحقيق انسجام بصري مع الحفاظ على الهوية الفردية، مع واجهات مصممة لتعزيز الخصوصية والإضاءة الطبيعية والأداء الحراري. تم النظر بعناية في عناصر التظليل وتوجيه الواجهات للاستجابة للمناخ المحلي، مما أدى إلى خارج أنيق وعملي ومتكامل بسلاسة مع السياق الحضري لحي البحر.',
      interiorDesign:
        'The interior design was developed to deliver a modern, comfortable living experience through well-planned spaces and a clear spatial flow. Layouts were carefully designed to balance openness and privacy, with an emphasis on natural light, functionality, and ease of movement. High-quality finishes and a neutral material palette were selected to create a warm and refined atmosphere, while integrated smart systems enhance everyday comfort and allow for intuitive control of lighting, climate, and key home functions.',
      interiorDesignAr:
        'تم تطوير التصميم الداخلي لتقديم تجربة معيشة عصرية ومريحة من خلال مساحات مُخططة جيداً وتدفق مكاني واضح. صُممت التخطيطات بعناية لموازنة الانفتاح والخصوصية، مع التركيز على الإضاءة الطبيعية والوظيفة وسهولة الحركة. تم اختيار تشطيبات عالية الجودة ولوحة ألوان محايدة لخلق أجواء دافئة وراقية، بينما تعزز الأنظمة الذكية المتكاملة الراحة اليومية وتتيح التحكم البديهي بالإضاءة والمناخ ووظائف المنزل الرئيسية.',
      diagramText:
        'These villa diagrams summarize the overall zoning and circulation strategy across the four units—supporting privacy, daylight access, and smooth movement between living, service, and outdoor areas.',
      diagramTextAr:
        'تلخص مخططات الفلل هذه استراتيجية التقسيم والحركة عبر الوحدات الأربع—داعمة للخصوصية والإضاءة النهارية والانتقال السلس بين مناطق المعيشة والخدمة والمساحات الخارجية.',
      challenge:
        'Designing four modern villas with a cohesive identity while responding to site constraints, surrounding context, and solar orientation for long-term comfort and efficiency.',
      challengeAr:
        'تصميم أربع فلل حديثة بهوية متسقة مع الاستجابة لقيود الموقع والسياق المحيط والاتجاه الشمسي للراحة والكفاءة على المدى الطويل.',
      solution:
        'We started with detailed site analysis (location context, surrounding buildings, and solar orientation), then developed an integrated architecture and interior concept with coordinated landscape and smart systems.',
      solutionAr:
        'بدأنا بتحليل مفصل للموقع (سياق الموقع والمباني المحيطة والاتجاه الشمسي)، ثم طورنا مفهوماً متكاملاً للعمارة والديكور الداخلي مع تنسيق المناظر الطبيعية والأنظمة الذكية.',
      results:
        'A cohesive villa development with a clear modern identity, optimized orientation, and a premium finish standard aligned with the client’s expectations.',
      resultsAr:
        'تطوير فلل متكامل بهوية حديثة واضحة وتوجيه محسّن ومعيار تشطيب عالي يتوافق مع توقعات العميل.',
    },
    {
      slug: 'efficiency-center-khobar',
      title: 'GDC Middle East – Riyadh Office Fit-Out',
      titleAr: 'تشطيب مكتب جي دي سي الشرق الأوسط – الرياض',
      category: 'Construction & Engineering',
      status: 'Completed',
      description: 'A modern office and workspace project delivered under our Construction & Engineering services.',
      descriptionAr: 'مشروع مكتب ومساحة عمل حديث نفذ ضمن خدمات البناء والهندسة.',
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
      location: 'Riyadh, Saudi Arabia',
      locationAr: 'الرياض، المملكة العربية السعودية',
      year: '2024',
      client: 'GDC Middle East',
      clientAr: 'جي دي سي الشرق الأوسط',
      services: [
        'Interior Design',
        'Finishing & Fit-Out',
        'Custom Furniture Design & Installation',
        'Smart Systems & Building Automation',
        'IT Infrastructure',
        'Electrical Works',
        'HVAC Installation',
        'Access Control Systems',
        'Project Management',
        'Site Supervision',
      ],
      servicesAr: [
        'التصميم الداخلي',
        'التشطيب والتجهيز',
        'تصميم وتركيب الأثاث المخصص',
        'الأنظمة الذكية وأتمتة المباني',
        'البنية التحتية لتقنية المعلومات',
        'الأعمال الكهربائية',
        'تركيب أنظمة التكييف',
        'أنظمة التحكم في الوصول',
        'إدارة المشاريع',
        'الإشراف على الموقع',
      ],
      overview:
        'Our work involved the end-to-end delivery of a comprehensive office fit-out for GDC Middle East\'s Riyadh headquarters, covering a total area of 2,437 sqm. We managed the project from design development through execution, ensuring a seamless translation of concept into a functional and refined workspace. The fit-out was completed within an accelerated timeline of 16 weeks, reflecting a high level of coordination, precision, and execution efficiency.',
      overviewAr:
        'شمل عملنا التسليم المتكامل لتشطيب مكتبي شامل لمقر جي دي سي الشرق الأوسط في الرياض، بمساحة إجمالية 2,437 متراً مربعاً. أدارنا المشروع من تطوير التصميم حتى التنفيذ، مع ضمان ترجمة سلسة للمفهوم إلى مساحة عمل وظيفية وراقية. اكتمل التشطيب خلال جدول زمني مُسرّع قدره 16 أسبوعاً، مما يعكس مستوى عالٍ من التنسيق والدقة وكفاءة التنفيذ.',
      midGalleryText:
        'The conference room was designed as a focused collaboration space, combining ergonomic planning with integrated lighting, ceiling features, and acoustic considerations. Custom architectural elements and controlled lighting create a balanced environment that supports productivity while maintaining a strong industrial-modern character.',
      midGalleryTextAr:
        'صُممت غرفة الاجتماعات كمساحة تعاون مركزة، تجمع بين التخطيط المريح والإضاءة المتكاملة وميزات السقف والاعتبارات الصوتية. عناصر معمارية مخصصة وإضاءة مضبوطة تخلق بيئة متوازنة تدعم الإنتاجية مع الحفاظ على طابع صناعي-حديث واضح.',
      challenge:
        'Creating a functional workspace layout while coordinating multiple disciplines (interiors, finishing, and MEP) to a consistent quality standard.',
      challengeAr:
        'إنشاء تخطيط مساحة عمل وظيفي مع تنسيق عدة تخصصات (الديكور الداخلي والتشطيب والأنظمة الميكانيكية والكهربائية والسباكة) وفق معيار جودة متسق.',
      solution:
        'We aligned space planning with interior detailing early, then delivered coordinated drawings and a finishing package supported by on-site quality control.',
      solutionAr:
        'نسقنا تخطيط المساحة مع تفاصيل الديكور الداخلي مبكراً، ثم قدمنا رسومات منسقة وحزمة تشطيب مدعومة بمراقبة الجودة في الموقع.',
      results:
        'A cohesive, modern workspace with premium finishes and reliable systems—ready for daily use with consistent performance and maintainability.',
      resultsAr:
        'مساحة عمل حديثة متكاملة بتشطيبات عالية وأنظمة موثوقة—جاهزة للاستخدام اليومي بأداء متسق وسهولة صيانة.',
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
      title: 'Beachfront Najdi Villas',
      titleAr: 'فلل نجدية على الواجهة البحرية',
      category: 'Construction & Engineering',
      status: 'Completed',
      description: 'Interior design development for nine private beachfront villas in traditional Najdi style with a contemporary Saudi identity.',
      descriptionAr: 'تطوير التصميم الداخلي لتسع فلل سكنية خاصة على الواجهة البحرية بأسلوب نجدي تقليدي وهوية سعودية معاصرة.',
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
      locationAr: 'المملكة العربية السعودية',
      year: '2026',
      client: 'Private Client',
      clientAr: 'عميل خاص',
      services: [
        'Interior Design',
        'Concept Development',
        'Material & Finish Selection',
        'Custom Furniture Design',
        'Interior Detailing & Specifications',
      ],
      servicesAr: [
        'التصميم الداخلي',
        'تطوير المفهوم',
        'اختيار المواد والتشطيبات',
        'تصميم الأثاث المخصص',
        'التفاصيل الداخلية والمواصفات',
      ],
      overview:
        'Our scope of work focused exclusively on the interior design development of a private beachfront residential project consisting of nine villas. The interiors were designed in a traditional Najdi style with a contemporary Saudi identity, carefully reinterpreted to suit modern living while preserving cultural authenticity.\n\nThe design approach emphasized warmth, craftsmanship, and spatial balance, creating interiors that feel rooted in heritage yet refined and comfortable for a coastal lifestyle.',
      overviewAr:
        'ركز نطاق أعمالنا حصرياً على تطوير التصميم الداخلي لمشروع سكني خاص على الواجهة البحرية يتألف من تسع فلل. صُممت الدواخل بأسلوب نجدي تقليدي وهوية سعودية معاصرة، مع إعادة تفسير مدروسة تلائم العيش الحديث مع الحفاظ على الأصالة الثقافية.\n\nركّز نهج التصميم على الدفء والحرفية والتوازن المكاني، مخلّفاً دواخل متجذرة في التراث وراقية ومريحة لنمط الحياة الساحلي.',
      midGalleryText:
        'The kitchen was designed as a light, simple space tailored for holiday living, combining functional layouts with natural materials and subtle Najdi detailing. Open shelving and natural daylight create an informal, comfortable environment suited for relaxed daily use.',
      midGalleryTextAr:
        'صُممت المطبخ كمساحة مضيئة وبسيطة ملائمة للحياة العطلية، تجمع بين تخطيطات وظيفية ومواد طبيعية وتفاصيل نجدية رفيعة. الرفوف المفتوحة والإضاءة النهارية الطبيعية تخلق بيئة غير رسمية ومريحة مناسبة للاستخدام اليومي المريح.',
      challenge:
        'Balancing privacy, daylight, and circulation while maintaining a cohesive modern look across the exterior and interior spaces.',
      challengeAr:
        'موازنة الخصوصية والإضاءة النهارية والحركة مع الحفاظ على مظهر حديث متسق في المساحات الخارجية والداخلية.',
      solution:
        'Aligned the architectural concept with interior detailing early, then executed a coordinated finishing package with clear drawings and on-site quality control.',
      solutionAr:
        'تم تنسيق المفهوم المعماري مع تفاصيل الديكور الداخلي مبكراً، ثم تنفيذ حزمة تشطيب منسقة برسومات واضحة ومراقبة جودة في الموقع.',
      results:
        'A refined villa outcome with consistent design language, premium finishes, and spaces optimized for daily living and maintainability.',
      resultsAr:
        'نتيجة فيلا منسقة بلغة تصميم متسقة وتشطيبات عالية ومساحات محسّنة للمعيشة اليومية وسهولة الصيانة.',
    },
    {
      slug: 'gdc',
      title: 'Co-Working Space – Riyadh',
      titleAr: 'مساحة العمل المشترك – الرياض',
      category: 'Construction & Engineering',
      status: 'Completed',
      description: 'Interior design development of a large-scale co-working space in Riyadh, 2,666.6 sqm across five floors, supporting flexible working and collaboration.',
      descriptionAr: 'تطوير التصميم الداخلي لمساحة عمل مشترك واسعة النطاق في الرياض، 2,666.6 متر مربع على خمسة طوابق، لدعم العمل المرن والتعاون.',
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
      location: 'Riyadh, Saudi Arabia',
      locationAr: 'الرياض، المملكة العربية السعودية',
      year: '2024',
      client: 'Co-Working Operator',
      clientAr: 'مشغل مساحة العمل المشترك',
      services: [
        'Interior Design',
        'Concept Development',
        'Space Planning & Zoning',
        'Material & Finish Selection',
        'Custom Interior Elements',
        'Interior Detailing & Specifications',
      ],
      servicesAr: [
        'التصميم الداخلي',
        'تطوير المفهوم',
        'تخطيط المساحة والتقسيم',
        'اختيار المواد والتشطيبات',
        'عناصر داخلية مخصصة',
        'التفاصيل الداخلية والمواصفات',
      ],
      overview:
        'Our scope of work focused on the interior design development of a large-scale co-working space in Riyadh, spanning a total area of 2,666.6 sqm across five floors. The project was designed to support flexible working styles, collaboration, and individual productivity through a cohesive industrial interior concept.\n\nOur approach translated the functional requirements of a modern co-working environment into a clear spatial language that balances openness, structure, and visual identity.',
      overviewAr:
        'ركز نطاق أعمالنا على تطوير التصميم الداخلي لمساحة عمل مشترك واسعة النطاق في الرياض، بمساحة إجمالية 2,666.6 متر مربع موزعة على خمسة طوابق. صُمم المشروع لدعم أنماط العمل المرنة والتعاون والإنتاجية الفردية من خلال مفهوم داخلي صناعي متسق.\n\nترجم نهجنا متطلبات بيئة العمل المشترك الحديث الوظيفية إلى لغة مكانية واضحة توازن بين الانفتاح والهيكلة والهوية البصرية.',
      midGalleryText:
        'The interior concept was inspired by industrial architecture, expressed through exposed concrete finishes, visible services, metal elements, and a restrained material palette. These elements were refined to create a professional yet welcoming environment suitable for long working hours and diverse user needs.\n\nEach floor was designed to maintain visual continuity while offering varied spatial experiences, ensuring the workspace feels dynamic rather than repetitive.',
      midGalleryTextAr:
        'استُلهم المفهوم الداخلي من العمارة الصناعية، معبّراً عنه بتشطيبات خرسانية مكشوفة وخدمات ظاهرة وعناصر معدنية ولوحة مواد محتشمة. عُدّلت هذه العناصر لخلق بيئة احترافية ومرحّبة تلائم ساعات العمل الطويلة واحتياجات المستخدمين المتنوعة.\n\nصُمم كل طابق للحفاظ على الاستمرارية البصرية مع تقديم تجارب مكانية متنوعة، مما يضمن أن تشعر مساحة العمل بالديناميكية بدلاً من التكرار.',
      challenge:
        'Creating a flexible layout that serves different work styles while maintaining acoustic comfort, clear wayfinding, and a consistent premium feel across all zones.',
      challengeAr:
        'إنشاء تخطيط مرن يخدم أنماط عمل مختلفة مع الحفاظ على راحة صوتية ووضوح التوجيه وشعور راقٍ متسق في جميع المناطق.',
      solution:
        'We developed a clear zoning strategy (focus, collaboration, and support areas), aligned lighting and finishes to each zone, and coordinated smart-ready infrastructure to keep the space adaptable.',
      solutionAr:
        'طورنا استراتيجية تقسيم واضحة (مناطق تركيز وتعاون ودعم)، ونسقنا الإضاءة والتشطيبات لكل منطقة، ونسقنا البنية التحتية الجاهزة للذكاء لجعل المساحة قابلة للتكيف.',
      results:
        'A cohesive co-working destination with a strong modern identity, functional flow, and durable finishes—ready for daily high-traffic use.',
      resultsAr:
        'وجهة عمل مشترك متكاملة بهوية حديثة قوية وتدفق وظيفي وتشطيبات متينة—جاهزة للاستخدام اليومي العالي الازدحام.',
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
      title: 'Albargash Tower – Executive Lounge',
      titleAr: 'برج البرغش – الصالة التنفيذية',
      category: 'Construction & Engineering',
      status: 'Completed',
      description: 'Design and execution of an executive lounge on the 10th floor of Albargash Tower, refined for executive use with flexibility for large-scale events.',
      descriptionAr: 'التصميم والتنفيذ لصالة تنفيذية في الطابق العاشر من برج البرغش، راقية للاستخدام التنفيذي مع مرونة لفعاليات واسعة النطاق.',
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
      locationAr: 'الخبر، المملكة العربية السعودية',
      year: '2026',
      client: 'Albargash Tower',
      clientAr: 'برج البرغش',
      services: [
        'Interior Design',
        'Concept Development',
        'Space Planning & Zoning',
        'Flexible Layout Design',
        'Entrance Design',
        'Finishing & Fit-Out',
        'Site Supervision & Execution',
      ],
      servicesAr: [
        'التصميم الداخلي',
        'تطوير المفهوم',
        'تخطيط المساحة والتقسيم',
        'تصميم التخطيط المرن',
        'تصميم المدخل',
        'التشطيب والتجهيز',
        'الإشراف على الموقع والتنفيذ',
      ],
      overview:
        'Our work covered the design and execution of an executive lounge located on the 10th floor of Albargash Tower. The project was developed to provide a refined, functional environment tailored for executive use, while also offering high spatial flexibility to accommodate large-scale events.\n\nThe scope included the full development of the lounge area, starting from the entrance experience through to the main seating and functional zones, ensuring all client requirements were met with precision and clarity.',
      overviewAr:
        'شمل عملنا التصميم والتنفيذ لصالة تنفيذية تقع في الطابق العاشر من برج البرغش. طُوّر المشروع لتوفير بيئة راقية ووظيفية مصممة للاستخدام التنفيذي، مع تقديم مرونة مكانية عالية لاستيعاب الفعاليات واسعة النطاق.\n\nتضمن النطاق التطوير الكامل لمنطقة الصالة، من تجربة المدخل وصولاً إلى مناطق الجلوس الرئيسية والمناطق الوظيفية، مع ضمان تلبية جميع متطلبات العميل بدقة ووضوح.',
      midGalleryText:
        'The cigar lounge area was designed to combine luxury and comfort within an open and welcoming setting. The space features rich materials, warm tones, and carefully selected seating to create a relaxed yet sophisticated atmosphere that complements the overall flow of the executive lounge.\n\nA key design focus was placed on the ceiling, where specialized insulation and ventilation solutions were integrated to effectively contain smoke and prevent odors from spreading to surrounding areas. This allowed the cigar lounge to remain visually and spatially connected to the rest of the floor, while ensuring comfort and air quality for all users.',
      midGalleryTextAr:
        'صُممت منطقة صالة السيجار لدمج الفخامة والراحة في إعداد مفتوح ومرحّب. تتميز المساحة بمواد غنية وألوان دافئة ومقاعد مُختارة بعناية لخلق أجواء مريحة وراقية تتماشى مع التدفق العام للصالة التنفيذية.\n\nوُضع تركيز تصميمي رئيسي على السقف، حيث دُمجت حلول عزل وتهوية متخصصة لاحتواء الدخان بفعالية ومنع انتشار الروائح إلى المناطق المحيطة. وهذا أتاح لصالة السيجار أن تبقى متصلة بصرياً ومكانياً ببقية الطابق، مع ضمان الراحة وجودة الهواء لجميع المستخدمين.',
      challenge:
        'The executive lounge includes three meeting rooms, each designed to accommodate different capacities and meeting formats, ensuring flexibility for various business needs. While unified by a consistent design language, each room offers a distinct spatial experience tailored to its function.\n\nThe meeting rooms feature clean architectural lines, warm material palettes, and refined finishes, creating a professional yet welcoming environment. Large tables, ergonomically selected seating, and integrated technology support efficient meetings, presentations, and collaborative discussions.\n\nGlass partitions were strategically used to maintain visual openness and allow natural light to flow throughout the lounge, while still ensuring acoustic comfort and privacy when required.',
      challengeAr:
        'تتضمن الصالة التنفيذية ثلاث قاعات اجتماعات، صُمم كل منها لاستيعاب سعات وتنسيقات اجتماعات مختلفة، مما يضمن مرونة لمختلف الاحتياجات التجارية. ومع توحيدها بلغة تصميم متسقة، تقدم كل غرفة تجربة مكانية متميزة ملائمة لوظيفتها.\n\nتتميز قاعات الاجتماعات بخطوط معمارية نظيفة ولوحات مواد دافئة وتشطيبات راقية، مخلّفة بيئة احترافية ومرحّبة. طاولات كبيرة ومقاعد مُختارة من حيث ارتياح الاستخدام وتقنية متكاملة تدعم الاجتماعات والعروض التقديمية والنقاشات التعاونية بكفاءة.\n\nاستُخدمت فواصل زجاجية بشكل استراتيجي للحفاظ على الانفتاح البصري والسماح للضوء الطبيعي بالتدفق في أنحاء الصالة، مع ضمان الراحة الصوتية والخصوصية عند الحاجة.',
      solution:
        'Located at the heart of the executive floor, the central lounge was designed as a key gathering point that seamlessly connects all surrounding areas. The space features organic-shaped furniture with soft, flowing forms that emphasize comfort, smoothness, and visual harmony. These sculptural elements create an inviting environment that encourages informal interaction, relaxation, and moments of pause between meetings.\n\nNatural materials, warm tones, and integrated greenery were carefully selected to enhance the sense of calm and balance within the lounge. The design achieves a refined atmosphere that feels both contemporary and welcoming, making the central lounge a focal point that supports social engagement while maintaining the elegance expected in an executive setting.',
      solutionAr:
        'تقع الصالة المركزية في قلب الطابق التنفيذي، وصُممت كنقطة تجمع رئيسية تربط بسلاسة جميع المناطق المحيطة. تتميز المساحة بأثاث ذي أشكال عضوية ذات هيئات ناعمة ومتدفقة تؤكد على الراحة والسلاسة والانسجام البصري. هذه العناصر النحتية تخلق بيئة مرحّبة تشجع على التفاعل غير الرسمي والاسترخاء ولحظات التوقف بين الاجتماعات.\n\nاخْتُيرت مواد طبيعية وألوان دافئة ومساحات خضراء متكاملة بعناية لتعزيز الإحساس بالهدوء والتوازن داخل الصالة. يحقق التصميم أجواء راقية تبدو معاصرة ومرحّبة في آن، مما يجعل الصالة المركزية نقطة تركيز تدعم التواصل الاجتماعي مع الحفاظ على الأناقة المتوقعة في إعداد تنفيذي.',
      entranceText:
        'The entrance to the Executive Lounge was designed with a simple yet luxurious approach, creating a strong first impression while maintaining a sense of calm and refinement. Travertine finishes were used as a key material, paired with warm neutral tones and soft, indirect lighting to enhance the sense of elegance and timelessness.\n\nThe reception desk acts as a sculptural focal point, while the integrated lighting and curated display elements add depth and warmth to the space. The overall design achieves a balance between prestige and subtlety, ensuring the entrance feels welcoming, sophisticated, and representative of the executive character of the lounge.',
      entranceTextAr:
        'صُمم مدخل الصالة التنفيذية بنهج بسيط وراقٍ، مخلّفاً انطباعاً أولاً قوياً مع الحفاظ على إحساس بالهدوء والأناقة. استُخدمت تشطيبات الترافرتين كمادة رئيسية، مزدوجة بألوان محايدة دافئة وإضاءة ناعمة غير مباشرة لتعزيز الإحساس بالأناقة والخلود.\n\nيعمل مكتب الاستقبال كنقطة تركيز نحتية، بينما تضيف الإضاءة المتكاملة وعناصر العرض المُنتقاة عمقاً ودفئاً للمساحة. يحقق التصميم العام توازناً بين الهيبة واللباقة، مما يضمن أن يشعر المدخل بالترحيب والرقي وتمثيل الطابع التنفيذي للصالة.',
      gymText:
        'The gym area was designed as a premium fitness zone that complements the overall executive character of the lounge. The space features a modern, performance-driven layout with clearly defined training zones, combining strength, cardio, and functional workout areas. Dark, muted finishes are balanced with warm wood accents and subtle lighting to create a focused yet inviting atmosphere.',
      gymTextAr:
        'صُممت منطقة الجيم كمنطقة لياقة راقية تتماشى مع الطابع التنفيذي العام للصالة. تتميز المساحة بتخطيط حديث قائم على الأداء مع مناطق تدريب محددة بوضوح، تجمع بين مناطق القوة والكارديو والتمارين الوظيفية. تتوازن التشطيبات الداكنة الهادئة مع لمسات خشبية دافئة وإضاءة خفيفة لخلق أجواء مركزة ومرحّبة.',
      results:
        'A cohesive, modern residential outcome with premium finishes and a layout that balances aesthetics, comfort, and long-term maintainability.',
      resultsAr:
        'نتيجة سكنية حديثة متكاملة بتشطيبات عالية الجودة وتخطيط يوازن بين الجمال والراحة وسهولة الصيانة على المدى الطويل.',
    },
    {
      slug: 'al-fakhreyah-villa-project',
      title: 'Diwaniya Cinema Lounge',
      titleAr: 'صالة ديوانية السينما',
      category: 'Construction & Engineering',
      status: 'Completed',
      description: 'This project was designed for a private client in Dammam in 2023. The space features full-height glass walls, allowing it to function as an open and inviting lounge during the day.',
      descriptionAr: 'صُمم هذا المشروع لعميل خاص في الدمام عام 2023. تتميز المساحة بجدران زجاجية كاملة الارتفاع، مما يسمح لها أن تعمل كصالة مفتوحة ومرحّبة خلال النهار.',
      image: '/images/projects/3/1.png',
      images: [
        '/images/projects/3/1.png',
        '/images/projects/3/2.png',
        '/images/projects/3/3.png',
        '/images/projects/3/4.png',
        '/images/projects/3/5.png',
      ],
      fullWidthImage: '/images/projects/3/5.png',
      location: 'Dammam, Saudi Arabia',
      locationAr: 'الدمام، المملكة العربية السعودية',
      year: '2023',
      client: 'Private Client',
      clientAr: 'عميل خاص',
      services: ['Interior Design', 'Custom Furniture & Lighting', 'Audio-Visual Integration'],
      servicesAr: ['التصميم الداخلي', 'الأثاث والإضاءة المخصصان', 'دمج الصوت والصورة'],
      overview:
        'In the evening, the diwaniya seamlessly transforms into a cinema room through the integration of a ceiling-mounted projector. The window areas were designed as open seating zones, enhancing comfort while preserving the openness of the space. The design focuses on flexibility, atmosphere, and a smooth transition between daytime and nighttime use.',
      overviewAr:
        'في المساء، تتحول الديوانية بسلاسة إلى غرفة سينما من خلال دمج جهاز إسقاط مثبت في السقف. صُممت مناطق النوافذ كمناطق جلوس مفتوحة، معززة الراحة مع الحفاظ على انفتاح المساحة. يركز التصميم على المرونة والأجواء والانتقال السلس بين الاستخدام النهاري والليلي.',
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
      title: 'Roaya Waiting Area',
      titleAr: 'منطقة انتظار رواية',
      category: 'Construction & Engineering',
      status: 'Completed',
      description: 'This project focuses on the design of a refined and welcoming waiting area for Roaya, where comfort, calmness, and functionality come together in a cohesive interior concept. The space was carefully designed to create a warm first impression while maintaining a modern and elegant atmosphere suitable for daily visitors.',
      descriptionAr: 'يركز هذا المشروع على تصميم منطقة انتظار راقية ومرحّبة لرواية، حيث تلتقي الراحة والهدوء والوظيفة في مفهوم داخلي متسق. صُممت المساحة بعناية لخلق انطباع أول دافئ مع الحفاظ على أجواء عصرية وأنيقة مناسبة للزوار اليوميين.',
      image: '/images/projects/9/4.png',
      images: [
        '/images/projects/9/3.png',
        '/images/projects/9/4.png',
        '/images/projects/9/5.png',
        '/images/projects/9/6.png',
      ],
      fullWidthImage: '/images/projects/9/6.png',
      location: 'Saudi Arabia',
      locationAr: 'المملكة العربية السعودية',
      year: '2024',
      client: 'Roaya',
      clientAr: 'رواية',
      services: ['Interior Design', 'Finishing & Fit-Out'],
      servicesAr: ['التصميم الداخلي', 'التشطيب والتأثيث'],
      overview:
        'This project focuses on the design of a refined and welcoming waiting area for Roaya, where comfort, calmness, and functionality come together in a cohesive interior concept. The space was carefully designed to create a warm first impression while maintaining a modern and elegant atmosphere suitable for daily visitors.',
      overviewAr:
        'يركز هذا المشروع على تصميم منطقة انتظار راقية ومرحّبة لرواية، حيث تلتقي الراحة والهدوء والوظيفة في مفهوم داخلي متسق. صُممت المساحة بعناية لخلق انطباع أول دافئ مع الحفاظ على أجواء عصرية وأنيقة مناسبة للزوار اليوميين.',
    },
    {
      slug: 'thabat',
      title: 'Thabat Reception & Display Space',
      titleAr: 'مساحة استقبال وعرض ثابت',
      category: 'Construction & Engineering',
      status: 'Completed',
      description: 'This project involved the interior design of a two-floor space for Thabat, created to reflect a refined and luxurious identity while supporting both hospitality and presentation needs.\n\nThe design was planned to deliver a strong first impression, with carefully curated spaces that balance elegance, functionality, and brand presence.',
      descriptionAr: 'تضمن هذا المشروع التصميم الداخلي لمساحة من طابقين لثابت، تم إنشاؤها لتعكس هوية راقية وفاخرة مع دعم احتياجات الضيافة والعرض.\n\nتم تخطيط التصميم لتقديم انطباع أول قوي، مع مساحات مختارة بعناية توازن بين الأناقة والوظيفة والحضور العلامة التجارية.',
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
      locationAr: 'المملكة العربية السعودية',
      year: '2024',
      client: 'Thabat',
      clientAr: 'ثابت',
      services: ['Interior Design'],
      servicesAr: ['التصميم الداخلي'],
      overview:
        'This project involved the interior design of a two-floor space for Thabat, created to reflect a refined and luxurious identity while supporting both hospitality and presentation needs.\n\nThe design was planned to deliver a strong first impression, with carefully curated spaces that balance elegance, functionality, and brand presence.',
      overviewAr:
        'تضمن هذا المشروع التصميم الداخلي لمساحة من طابقين لثابت، تم إنشاؤها لتعكس هوية راقية وفاخرة مع دعم احتياجات الضيافة والعرض.\n\nتم تخطيط التصميم لتقديم انطباع أول قوي، مع مساحات مختارة بعناية توازن بين الأناقة والوظيفة والحضور العلامة التجارية.',
      challenge:
        'Delivering a strong brand presence in a compact footprint while keeping circulation smooth and the build details clean and consistent.',
      challengeAr:
        'تقديم حضور علامة تجارية قوي في مساحة مدمجة مع الحفاظ على حركة سلسة وتفاصيل بناء نظيفة ومتسقة.',
      solution:
        'We designed a simple, high-impact layout and coordinated materials, lighting, and fabrication details to achieve a premium look and reliable on-site execution.',
      solutionAr:
        'صممنا تخطيطاً بسيطاً عالي التأثير ونسقنا المواد والإضاءة وتفاصيل التصنيع لتحقيق مظهر راقٍ وتنفيذ موثوق في الموقع.',
      results:
        'A cohesive booth outcome with strong visual identity, refined detailing, and a comfortable visitor experience.',
      resultsAr:
        'نتيجة كشك متكاملة بهوية بصرية قوية وتفاصيل منسقة وتجربة زائر مريحة.',
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
      title: 'Efficiency Center – Co-Working Space',
      titleAr: 'مركز الكفاءة – مساحة العمل المشترك',
      category: 'Construction & Engineering',
      status: 'Ongoing',
      description: 'This project is a co-working space located in Al Khobar, developed for Efficiency Center to support a modern, flexible, and efficient work environment. Our scope of work covered the finishing and fit-out of the entire facility, with a strong focus on functionality, adaptability, and user experience.',
      descriptionAr: 'هذا المشروع هو مساحة عمل مشترك تقع في الخبر، طُوّرت لمركز الكفاءة لدعم بيئة عمل عصرية ومرنة وفعالة. شمل نطاق أعمالنا التشطيب والتجهيز للمنشأة بأكملها، مع تركيز قوي على الوظيفة والقابلية للتكيف وتجربة المستخدم.',
      image: '/images/projects/10/1.png',
      images: [
        '/images/projects/10/1.png',
        '/images/projects/10/2.png',
        '/images/projects/10/3.png',
        '/images/projects/10/4.png',
        '/images/projects/10/5.png',
        '/images/projects/10/6.png',
        '/images/projects/10/7.png',
        '/images/projects/10/9.png',
      ],
      location: 'Al Khobar, Saudi Arabia',
      locationAr: 'الخبر، المملكة العربية السعودية',
      year: '2020 – Ongoing',
      client: 'Efficiency Center',
      clientAr: 'مركز الكفاءة',
      services: [
        'Finishing & Fit-Out',
        'HVAC Installation',
        'Smart Systems',
        'Maintenance & Technical Support',
      ],
      servicesAr: [
        'التشطيب والتجهيز',
        'تركيب أنظمة التكييف',
        'الأنظمة الذكية',
        'الصيانة والدعم الفني',
      ],
      overview:
        'The design follows an industrial-style concept, emphasizing natural lighting as a core design element. The building features full-height glass façades, while internal office partitions are also designed using glass, allowing daylight to flow throughout the space and enhancing visual openness.',
      overviewAr:
        'يتبع التصميم مفهوماً على الطراز الصناعي، مع التركيز على الإضاءة الطبيعية كعنصر تصميمي أساسي. تتميز المبنى بواجهات زجاجية كاملة الارتفاع، بينما صُممت الفواصل الداخلية للمكاتب أيضاً باستخدام الزجاج، مما يسمح للضوء النهاري بالتدفق في أنحاء المساحة ويعزز الانفتاح البصري.',
      results:
        'The space includes 31 private offices, open-plan workstations, balconies, one conference room, one meeting room, and a business lounge, all thoughtfully planned to encourage collaboration while maintaining comfort and productivity.',
      resultsAr:
        'تشمل المساحة 31 مكتباً خاصاً ومحطات عمل مفتوحة التخطيط وشرفات وقاعة مؤتمرات واحدة وغرفة اجتماعات واحدة وصالة أعمال، جميعها مُخططة بعناية لتشجيع التعاون مع الحفاظ على الراحة والإنتاجية.',
    },
    {
      slug: 'tulip-spa',
      title: 'Tulip Spa & Salon',
      titleAr: 'توليب سبا وصالون',
      category: 'Construction & Engineering',
      status: 'Completed',
      description: 'This project involved the interior design of Tulip Spa, a spa and salon located in Dhahran, completed in 2025.\n\nThe design concept was carefully planned to enhance privacy, calmness, and comfort for visitors. The salon area was designed on the ground floor, allowing easy access and an open, welcoming atmosphere, while the mezzanine floor was dedicated entirely to the spa, creating a quieter and more private experience away from the main circulation.',
      descriptionAr: 'تضمن هذا المشروع التصميم الداخلي لتوليب سبا، وهو سبا وصالون يقع في الظهران، اكتمل في عام 2025.\n\nتم تخطيط مفهوم التصميم بعناية لتعزيز الخصوصية والهدوء والراحة للزوار. تم تصميم منطقة الصالون في الطابق الأرضي، مما يسمح بالوصول السهل وجو مفتوح ومرحب، بينما خُصص الطابق المتوسط بالكامل للسبا، مما يخلق تجربة أكثر هدوءًا وخصوصية بعيدًا عن الحركة الرئيسية.',
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
      location: 'Dhahran, Saudi Arabia',
      locationAr: 'الظهران، المملكة العربية السعودية',
      year: '2025',
      client: 'Tulip Spa',
      clientAr: 'توليب سبا',
      services: ['Interior Design', 'Finishing & Fit-Out', 'Electrical Works', 'Plumbing Services', 'HVAC Installation'],
      servicesAr: ['التصميم الداخلي', 'التشطيب والتجهيز', 'الأعمال الكهربائية', 'خدمات السباكة', 'تركيب أنظمة التكييف'],
      overview:
        'This project involved the interior design of Tulip Spa, a spa and salon located in Dhahran, completed in 2025.\n\nThe design concept was carefully planned to enhance privacy, calmness, and comfort for visitors. The salon area was designed on the ground floor, allowing easy access and an open, welcoming atmosphere, while the mezzanine floor was dedicated entirely to the spa, creating a quieter and more private experience away from the main circulation.',
      overviewAr:
        'تضمن هذا المشروع التصميم الداخلي لتوليب سبا، وهو سبا وصالون يقع في الظهران، اكتمل في عام 2025.\n\nتم تخطيط مفهوم التصميم بعناية لتعزيز الخصوصية والهدوء والراحة للزوار. تم تصميم منطقة الصالون في الطابق الأرضي، مما يسمح بالوصول السهل وجو مفتوح ومرحب، بينما خُصص الطابق المتوسط بالكامل للسبا، مما يخلق تجربة أكثر هدوءًا وخصوصية بعيدًا عن الحركة الرئيسية.',
      challenge:
        'Delivering a high-end guest experience while coordinating MEP requirements, wet-area detailing, and finishing quality across multiple treatment zones.',
      challengeAr:
        'تقديم تجربة ضيوف فاخرة مع تنسيق متطلبات الأنظمة الميكانيكية والكهربائية والسباكة وتفاصيل المناطق الرطبة وجودة التشطيب في مناطق المعالجة المتعددة.',
      solution:
        'We aligned the interior concept with technical requirements early, then delivered coordinated drawings and finishing packages with close on-site quality control.',
      solutionAr:
        'نسقنا مفهوم الديكور الداخلي مع المتطلبات التقنية مبكراً، ثم قدمنا رسومات منسقة وحزم تشطيب مع مراقبة جودة دقيقة في الموقع.',
      results:
        'A refined spa fit-out with consistent detailing, durable finishes, and a welcoming atmosphere ready for daily operation.',
      resultsAr:
        'تجهيز سبا منسق بتفاصيل متسقة وتشطيبات متينة وأجواء ترحيبية جاهزة للتشغيل اليومي.',
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

