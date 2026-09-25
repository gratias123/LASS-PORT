import {
  SkillCategory,
  PracticalExperience,
  AcademicCurriculumItem,
  AdditionalTrainingItem,
  EducationItem,
  CertificationItem,
  DigitalTool,
} from '../types';
import { CustomProjectItem } from '../types/portfolioBuilder';
import profilePhoto from '../assets/images/profile.jpg';

export const PERSONAL_INFO_EN = {
  name: 'SEMAKO Déo-Gratias',
  brandName: 'GratiaLink',
  mainTitle: 'IT TECHNICIAN · UI/UX DESIGNER · PROMPT ENGINEER',
  fullTitle: 'IT Technician · UI/UX Designer · Prompt Engineer',
  tagline: 'Computer maintenance, UI/UX design, and AI-assisted solution engineering',
  subHeadline:
    'IT technician, UI/UX designer, and prompt engineer: technical rigor, visual clarity, and structured prompt engineering for usable solutions.',
  heroSummary:
    'Versatile professional uniting technical hardware rigor, user-centered UI/UX design, and prompt engineering expertise to build reliable digital solutions, automate workflows, and rapidly prototype actionable results.',
  location: 'Porto-Novo, Benin',
  email: 'semakodeogratias@gmail.com',
  phone: '+229 0164690682',
  phoneFormatted: '+229 01 64 69 06 82',
  availableFor: 'Technical maintenance, visual design & AI solution engineering',
  photoUrl: profilePhoto,
  facebookUrl: 'https://www.facebook.com/profile.php?id=61593525761448',
  whatsappUrl: 'https://wa.me/message/4ZXFCVLLZVL5C1',
};

export const ABOUT_DATA_EN = {
  title: 'About Me',
  presentation: [
    'SEMAKO Déo-Gratias began his secondary education at Lycée Béhanzin, where he earned his BEPC diploma in 2023.',
    'Following this degree, he continued his studies at Lycée Technique et Professionnel de Porto-Novo in a 3-year vocational program in Computer Installation and Maintenance (IMI).',
    'His professional profile is built around three complementary pillars: applied computer hardware maintenance, graphic design and ergonomic UI/UX interfaces, and prompt engineering for AI-assisted digital solutions.',
    'His concrete approach to work combines technical diagnostic rigor and methodical hardware troubleshooting, visual and ergonomic craftsmanship for clear user interfaces, and the ability to formulate structured prompts to design solutions, prototype rapidly, automate repetitive tasks, and deliver directly actionable outputs.',
  ],
  axes: [
    {
      title: 'IT & Hardware Maintenance',
      description:
        'Hardware and software diagnostics, workstation repair, smartphone maintenance (GSM), RJ45 cabling, and IT infrastructure management.',
    },
    {
      title: 'UI/UX & Graphic Design',
      description:
        'Poster and communication design, image processing, and ergonomic UI wireframing and prototyping with Figma.',
    },
    {
      title: 'Prompt Engineering & AI Solutions',
      description:
        'Structured prompt formulation, rapid AI-assisted prototyping, workflow automation, and responsible ethical deployment.',
    },
  ],
};

export const ACADEMIC_CURRICULUM_EN: AcademicCurriculumItem[] = [
  {
    id: 'cursus-cep',
    institution: 'Primary Education',
    degreeOrField: 'Primary School Curriculum',
    durationOrYear: '2019',
    status: 'Diploma earned: CEP',
    description:
      'Primary education successfully completed with the Primary School Certificate (CEP) in 2019.',
  },
  {
    id: 'cursus-behanzin',
    institution: 'Lycée Béhanzin',
    degreeOrField: 'Secondary School Curriculum',
    durationOrYear: '2023',
    status: 'Diploma earned: BEPC',
    description:
      'General secondary education successfully completed with the Junior High School Certificate (BEPC) in 2023.',
  },
  {
    id: 'cursus-ltp-portonovo',
    institution: 'Lycée Technique et Professionnel de Porto-Novo — Benin',
    degreeOrField: 'Computer Installation and Maintenance (IMI)',
    fieldDetails: 'IMI Department',
    durationOrYear: '3 years',
    status: 'Vocational Training in Progress',
    description:
      'Professional vocational training at Lycée Technique et Professionnel de Porto-Novo, specializing in computer maintenance, fault diagnostics, networking, and system configuration.',
  },
];

export const ADDITIONAL_TRAINING_EN: AdditionalTrainingItem[] = [
  {
    id: 'formation-info-1an',
    title: '1-Year Computer Science Training',
    duration: '1 year',
    description:
      'Learning computer fundamentals, office productivity suites, and operating system environments.',
    validationStatus: 'Course Completed',
  },
  {
    id: 'formation-maintenance-gsm',
    title: 'GSM Smartphone Maintenance Training',
    description:
      'Hands-on diagnostic, hardware and software repair of mobile phones and smartphones.',
    validationStatus: 'Course Completed',
  },
  {
    id: 'formation-graphisme',
    title: 'Graphic Design Training',
    description:
      'Learning visual composition, color theory, layout hierarchy, and media asset creation.',
    validationStatus: 'Course Completed',
  },
  {
    id: 'formation-serigraphie',
    title: 'Screen Printing Training',
    description: 'Practical screen printing workshop on diverse media.',
    validationStatus: 'Certificate Earned',
  },
];

export const EDUCATION_LIST_EN: EducationItem[] = [
  {
    id: 'edu-cep',
    title: 'Primary School Certificate (CEP)',
    institution: 'Primary Education',
    duration: '2019',
    status: 'complete',
    isMain: false,
    description:
      'Primary education successfully completed with the Primary School Certificate (CEP) in 2019.',
    keyLearnings: [
      'Foundational learning skills',
      'Arithmetic, reading and written expression',
      'First state diploma completing primary education',
    ],
  },
  {
    id: 'edu-behanzin',
    title: 'Junior High School Certificate (BEPC)',
    institution: 'Lycée Béhanzin',
    duration: '2023',
    status: 'complete',
    isMain: false,
    description:
      'General secondary education successfully completed with the Junior High School Certificate (BEPC) in 2023, prior to technical specialization.',
    keyLearnings: [
      'General education and scientific reasoning',
      'Study methodology and written expression',
      'Academic foundation preparatory to technical schooling',
    ],
  },
  {
    id: 'edu-ltp-portonovo',
    title: 'Computer Installation and Maintenance (IMI)',
    institution: 'Lycée Technique et Professionnel de Porto-Novo — Benin',
    duration: '3 years',
    status: 'en-cours',
    isMain: true,
    description:
      'Professional vocational training at Lycée Technique et Professionnel de Porto-Novo, specializing in computer maintenance, fault diagnostics, networking, and system configuration.',
    keyLearnings: [
      'Hardware diagnostics and workstation troubleshooting',
      'Operating systems installation and configuration',
      'RJ45 cabling and network cable crimping',
      'Preventive maintenance and IT asset upkeep',
    ],
  },
  {
    id: 'edu-info-1an',
    title: '1-Year Computer Science Training',
    institution: 'Hands-on Training',
    duration: '1 year',
    status: 'complete',
    isMain: false,
    description:
      'Learning computer fundamentals, office productivity suites, and operating system environments.',
    keyLearnings: [
      'In-depth system navigation and file management',
      'Office tools and spreadsheet data processing',
      'Best computing practices and hygiene',
    ],
  },
  {
    id: 'edu-gsm',
    title: 'GSM Smartphone Maintenance Training',
    institution: 'Specialized Practical Workshop',
    duration: 'Hands-on Course',
    status: 'complete',
    isMain: false,
    description:
      'Hands-on diagnostic, hardware and software repair of mobile phones and smartphones.',
    keyLearnings: [
      'Safe disassembly and physical fault analysis',
      'Replacing screens, batteries, and charging ports',
      'Cleaning and deoxidation of electronic circuits',
    ],
  },
  {
    id: 'edu-graphisme',
    title: 'Graphic Design Training',
    institution: 'Visual Design Workshop',
    duration: 'Hands-on Course',
    status: 'complete',
    isMain: false,
    description:
      'Learning visual composition, color theory, layout hierarchy, and media asset creation.',
    keyLearnings: [
      'Designing posters, flyers, and digital marketing banners',
      'Layout structuring, typographic contrast, and readability',
      'Image editing and retouching in Photoshop, Photopea, and Canva',
    ],
  },
  {
    id: 'edu-serigraphie',
    title: 'Screen Printing Training',
    institution: 'Screen Printing Practical Workshop',
    duration: 'Certificate Earned',
    status: 'complete',
    isMain: false,
    description:
      'Hands-on screen printing workshop with certificate awarded, providing complementary visual production skills.',
    keyLearnings: [
      'Screen printing and stenciling techniques',
      'Visual preparation and inking on various substrates',
      'Official practical training certificate earned',
    ],
  },
];

export const SKILL_CATEGORIES_EN: SkillCategory[] = [
  {
    id: 'info-maintenance',
    title: 'IT & MAINTENANCE',
    iconName: 'Wrench',
    description: 'Hardware diagnostics, workstation repairs, and operational maintenance of computer networks.',
    skills: [
      'Computer installation and maintenance',
      'Hardware diagnostics & troubleshooting',
      'IT equipment maintenance',
      'Basic workstation administration',
      'Software installation & setup',
      'Computer networking',
      'RJ45 cabling',
      'Network cable crimping',
    ],
  },
  {
    id: 'maintenance-gsm',
    title: 'GSM SMARTPHONE REPAIR',
    iconName: 'Smartphone',
    description: 'Technical troubleshooting and repairs on mobile phones and portable devices.',
    skills: [
      'Fault diagnosis & inspection',
      'Mobile phone maintenance',
      'Hardware repairs on mobile devices',
    ],
  },
  {
    id: 'design-graphique',
    title: 'GRAPHIC DESIGN',
    iconName: 'Palette',
    description: 'Visual creation, communication media composition, and image editing.',
    skills: [
      'Graphic design & art direction',
      'Visual marketing assets',
      'Layout & typesetting',
      'Visual communication',
      'Image retouching & clipping',
      'Screen printing',
    ],
  },
  {
    id: 'outils-design',
    title: 'DESIGN TOOLS',
    iconName: 'Layers',
    description: 'Software and digital tools utilized for visual composition and prototyping.',
    skills: ['Photoshop', 'Photopea', 'Canva', 'Adobe XD', 'Figma'],
  },
  {
    id: 'ui-ux',
    title: 'UI/UX DESIGN',
    iconName: 'Layout',
    description: 'Designing user-centered digital experiences with focus on interface clarity.',
    skills: [
      'Interface design',
      'Wireframing',
      'Prototyping',
      'Visual layout hierarchy',
      'Ergonomics & usability principles',
    ],
  },
  {
    id: 'web-outils-numeriques',
    title: 'WEB & DIGITAL TOOLS',
    iconName: 'Globe',
    description: 'Front-end development technologies and digital productivity tools.',
    skills: [
      'HTML',
      'CSS',
      'JavaScript',
      'Bootstrap',
      'Visual Studio Code',
      'GitHub',
      'GitHub Pages',
    ],
  },
  {
    id: 'prompt-engineering',
    title: 'PROMPT ENGINEERING',
    iconName: 'Sparkles',
    description: 'Structured prompt design, AI-assisted workflow automation, and rapid solution prototyping.',
    skills: [
      'Prompt formulation & optimization',
      'Structuring complex contexts & instructions',
      'Generating & adapting textual and visual content',
      'AI-assisted repetitive task automation',
      'Rapid digital solution prototyping with AI',
      'Ethical and responsible AI utilization',
    ],
  },
];

export const PRACTICAL_EXPERIENCES_EN: PracticalExperience[] = [
  {
    id: 'exp-maintenance-info',
    title: 'COMPUTER MAINTENANCE EXPERIENCE',
    category: 'IT & Systems',
    badge: 'Workshop & Equipment',
    description:
      'Regular practice in diagnostics, servicing, and maintenance of computer systems.',
    activities: [
      'Dust removal and physical overhaul of CPU towers and cooling ventilation systems.',
      'Methodical diagnostics of power-up, display, and thermal overheating issues.',
      'Replacement and verification of hardware components: RAM, storage drives, power supplies.',
      'Clean installation and configuration of operating systems and utility software.',
      'Assembly and testing of RJ45 network cabling (straight-through and crossover crimping).',
    ],
    tools: ['Precision Screwdrivers', 'RJ45 Crimping Tool', 'Cable Tester', 'Bootable OS Drives'],
  },
  {
    id: 'exp-maintenance-gsm',
    title: 'GSM SMARTPHONE REPAIR EXPERIENCE',
    category: 'Mobile Devices',
    badge: 'Mobile Hardware',
    description:
      'Diagnostic practice and technical servicing of smartphones and mobile devices.',
    activities: [
      'Analysis of hardware malfunctions (charging faults, black screens, unresponsive touchscreens).',
      'Safe and orderly disassembly of casings, flex cables, and internal components.',
      'Replacement of broken screens, defective batteries, and USB-C / micro-USB charging ports.',
      'Careful cleaning and deoxidation of motherboard circuits.',
    ],
    tools: ['Opening Spudgers', 'Hot Air Gun', 'Digital Multimeter', 'Anti-static Brushes'],
  },
  {
    id: 'exp-graphisme',
    title: 'GRAPHIC DESIGN EXPERIENCE',
    category: 'Visual Creation',
    badge: 'Visual Media',
    description:
      'Creation of visual designs, graphic assets, and digital media tailored for communication needs.',
    activities: [
      'Creation of event posters, informational flyers, and social media promotional banners.',
      'Balanced layouts respecting typographic hierarchy, contrast, and visual rhythm.',
      'Clipping, color grading, and digital photo editing.',
      'Visual mockups prepared and optimized for both physical print and digital web formats.',
    ],
    tools: ['Photoshop', 'Photopea', 'Canva'],
  },
  {
    id: 'exp-uiux',
    title: 'UI/UX DESIGN EXPERIENCE',
    category: 'Interface Design',
    badge: 'Ergonomics & Mockups',
    description:
      'Prototyping and designing clean, intuitive, and user-friendly digital interfaces.',
    activities: [
      'Screen structure planning and wireframe drafting to organize information logically.',
      'Building interactive prototypes for web pages and mobile applications.',
      'Applying usability principles to streamline navigation across smartphones and desktops.',
      'Selecting high-contrast, accessible color palettes and consistent navigation elements.',
    ],
    tools: ['Figma', 'Adobe XD'],
  },
  {
    id: 'exp-wikimedia',
    title: 'DIGITAL CONTRIBUTIONS / WIKIMEDIA',
    category: 'Open Knowledge',
    badge: 'Knowledge Sharing',
    description:
      'Active engagement within the Wikimedia ecosystem to document, verify, and share free knowledge.',
    activities: [
      'Contributing to drafting and proofreading encyclopedic articles on Wikipedia.',
      'Rigorous research and fact-checking of reliable documentary sources.',
      'Structuring and updating open linked data entries on Wikidata.',
      'Promoting open knowledge sharing and highlighting verified cultural information.',
    ],
    tools: ['Wikipedia', 'Wikidata', 'Documentary Archives'],
  },
  {
    id: 'exp-prompt-ia',
    title: 'Prompt Engineer & AI Solutions Creator',
    category: 'Artificial Intelligence',
    badge: 'Applied Projects & Hands-on Practice',
    description:
      'Designing structured prompts, automating workflows, and prototyping solutions assisted by generative AI models.',
    activities: [
      'Designing structured prompts for content optimization, rapid prototyping, and workflow automation.',
      'Experimenting and implementing concrete practical use cases powered by AI.',
      'Integrating AI into design, technical documentation, and structured data workflows.',
      'Applying responsible AI guidelines, critical evaluation of outputs, and data privacy principles.',
    ],
    tools: ['ChatGPT', 'Claude', 'Gemini', 'Figma', 'Visual Studio Code'],
  },
];

export const PROJECTS_LIST_EN: CustomProjectItem[] = [
  {
    id: 'proj-1',
    name: 'GratiaLink - Visual Identity & Graphic Solutions',
    description: 'Comprehensive brand design for GratiaLink: logo design, brand style guidelines, and visual communication assets for digital platforms and social channels.',
    fullDescription: 'Complete brand identity design for GratiaLink: vector logotype creation, chromatic palette specification, typography pairing, and visual assets production for social media channels.',
    role: 'Graphic Designer & Brand Creator',
    period: '2023 - 2024',
    imageUrl: '/projects/gratialink_branding.jpg',
    tools: ['Photoshop', 'Canva', 'Figma', 'Typography'],
    results: 'Consistent and completed brand identity, communication materials successfully deployed.',
    featured: false,
  },
  {
    id: 'proj-2',
    name: 'Professional Portfolio Platform & Resume Generator',
    description: 'Development of a modern bilingual (FR/EN) web application featuring a dynamic portfolio editor and a recruiter-ready paginated PDF CV generator.',
    fullDescription: 'Complete frontend architecture for an interactive portfolio with autonomous data management (skills, experiences, certified credentials), FR/EN internationalization, and a paginated A4 print engine.',
    role: 'Frontend Developer & UI Designer',
    period: '2024',
    imageUrl: '/projects/portfolio_platform.jpg',
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    results: 'Smooth, accessible application across mobile, tablet, and desktop with real-time content synchronization.',
    featured: false,
  },
  {
    id: 'proj-3',
    name: 'GSM & Computer Diagnostic and Repair Workshop',
    description: 'Hands-on hardware and software repair workshop setup for fast troubleshooting of PC towers, laptops, and smartphones.',
    fullDescription: 'Methodical diagnostic workflow implementation: electronic testing with multimeter, display and battery replacements, SMD connector micro-soldering, preventive OS maintenance, and RJ45 network cabling.',
    role: 'Maintenance Technician',
    period: '2024',
    imageUrl: '/projects/hardware_repair_lab.jpg',
    tools: ['Hot air station', 'Multimeter', 'RJ45 Cabling', 'Precision screwdrivers'],
    results: 'Accurate diagnostics, hardware repairs completed, and computing/mobile devices restored.',
    featured: false,
  },
  {
    id: 'proj-4',
    name: 'Prompt Engineering & AI Solutions',
    description: 'Design of structured and reusable prompts to accelerate technical writing, conceptualize UI interaction flows, and streamline multimodal content generation in real-world workflows.',
    fullDescription: 'Advanced prompt architecture engineering (role personas, schema formatting constraints, chain-of-thought logic) to leverage generative AI models for practical use cases: documentation drafting, UI flow prototyping, and editorial automation under responsible AI principles.',
    role: 'Prompt Engineer',
    period: '2024',
    imageUrl: '/projects/prompt_engineering.jpg',
    tools: ['Prompt Engineering', 'Generative AI', 'AI Workflow', 'ChatGPT', 'Gemini'],
    results: 'Standardized prompt templates, measurable productivity gains, and responsible AI compliance.',
    featured: false,
  },
];

export const CERTIFICATIONS_LIST_EN: CertificationItem[] = [
  {
    id: 'cert-1',
    title: 'Everyday Internet Skills',
    issuedDate: 'August 5, 2026',
    status: 'Certificate of Completion',
    domain: 'Daily Digital Literacy',
    issuer: 'MTN Skills Academy & GSMA',
    refNumber: 'SKA8473406080520261334',
    documentUrl: '/certificates/Comp_tences_Internet_pour_une__Certificate(1).pdf',
    documentFilename: 'Comp_tences_Internet_pour_une__Certificate(1).pdf',
    thumbnailUrl: '/certificates/thumbnails/Comp_tences_Internet_pour_une__Certificate(1).svg',
    showVerifyButton: true,
    description:
      'Mastery of essential everyday online practices: secure web browsing, cloud tools, and privacy hygiene.',
  },
  {
    id: 'cert-2',
    title: 'Responsible AI',
    issuedDate: 'August 5, 2026',
    status: 'Certificate of Completion',
    domain: 'Ethics & Digital Society',
    issuer: 'MTN Skills Academy & Microsoft Learn',
    refNumber: 'SKA9234143080520261255',
    documentUrl: '/certificates/IA_responsable_Certificate(1).pdf',
    documentFilename: 'IA_responsable_Certificate(1).pdf',
    thumbnailUrl: '/certificates/thumbnails/IA_responsable_Certificate(1).svg',
    showVerifyButton: true,
    description:
      'Awareness of ethical AI guidelines: algorithmic fairness, transparency, privacy protection, and accountable usage.',
  },
  {
    id: 'cert-3',
    title: 'AI for Everyone',
    issuedDate: 'August 5, 2026',
    status: 'Certificate of Completion',
    domain: 'Artificial Intelligence',
    issuer: 'MTN Skills Academy & Microsoft Learn',
    refNumber: 'SKA1256340080520261134',
    documentUrl: '/certificates/L_IA_pour_tous_Certificate(1).pdf',
    documentFilename: 'L_IA_pour_tous_Certificate(1).pdf',
    thumbnailUrl: '/certificates/thumbnails/L_IA_pour_tous_Certificate(1).svg',
    showVerifyButton: true,
    description:
      'Understanding foundational artificial intelligence principles, core mechanics, and concrete real-world applications.',
  },
  {
    id: 'cert-4',
    title: 'Searching the Web and Beyond',
    issuedDate: 'August 5, 2026',
    status: 'Certificate of Completion',
    domain: 'Information Retrieval & Fact-Checking',
    issuer: 'MTN Skills Academy & Microsoft Learn',
    refNumber: 'SKA6842409080520261125',
    documentUrl: '/certificates/Recherche_sur_Internet_et_au_d_Certificate(1).pdf',
    documentFilename: 'Recherche_sur_Internet_et_au_d_Certificate(1).pdf',
    thumbnailUrl: '/certificates/thumbnails/Recherche_sur_Internet_et_au_d_Certificate(1).svg',
    showVerifyButton: true,
    description:
      'Effective documentary research methods, online source validation, and critical assessment of web information.',
  },
  {
    id: 'cert-5',
    title: 'Internet Fundamentals',
    issuedDate: 'August 5, 2026',
    status: 'Certificate of Completion',
    domain: 'Networking & Protocols',
    issuer: 'MTN Skills Academy & GSMA',
    refNumber: 'SKA1004772080520261025',
    documentUrl: '/certificates/Les_fondamentaux_d_Internet_Certificate(1).pdf',
    documentFilename: 'Les_fondamentaux_d_Internet_Certificate(1).pdf',
    thumbnailUrl: '/certificates/thumbnails/Les_fondamentaux_d_Internet_Certificate(1).svg',
    showVerifyButton: true,
    description:
      'Knowledge of core Internet architecture, data packet routing, and fundamental network topology.',
  },
];

export const DIGITAL_TOOLS_EN: DigitalTool[] = [
  {
    name: 'Visual Studio Code',
    category: 'Editor & Versioning',
    icon: 'Code',
    description: 'Main code editor customized with web development extensions.',
  },
  {
    name: 'HTML5',
    category: 'Web Development',
    icon: 'FileCode',
    description: 'Semantic markup and accessible web pages compliant with web standards.',
  },
  {
    name: 'CSS3',
    category: 'Web Development',
    icon: 'Palette',
    description: 'Modern styling with Flexbox, CSS Grid, and fluid responsive design.',
  },
  {
    name: 'JavaScript',
    category: 'Web Development',
    icon: 'Terminal',
    description: 'Interactivity, DOM manipulation, and asynchronous API integration.',
  },
  {
    name: 'Bootstrap',
    category: 'Web Development',
    icon: 'Grid',
    description: 'CSS framework for rapid, orderly, and responsive UI layouts.',
  },
  {
    name: 'GitHub / Pages',
    category: 'Editor & Versioning',
    icon: 'GitBranch',
    description: 'Distributed version control and instant static website hosting.',
  },
  {
    name: 'Adobe Photoshop',
    category: 'Design & UI/UX',
    icon: 'Image',
    description: 'Pixel-level photo editing, precision clipping, and poster composition.',
  },
  {
    name: 'Photopea',
    category: 'Design & UI/UX',
    icon: 'Layers',
    description: 'Convenient browser-based graphic editing compatible with PSD files.',
  },
  {
    name: 'Canva Pro',
    category: 'Design & UI/UX',
    icon: 'Sparkles',
    description: 'Rapid design of marketing assets and multi-channel social templates.',
  },
  {
    name: 'Adobe XD',
    category: 'Design & UI/UX',
    icon: 'Layout',
    description: 'Wireframing and interactive prototyping for desktop and mobile interfaces.',
  },
  {
    name: 'Figma',
    category: 'Design & UI/UX',
    icon: 'Layout',
    description: 'Interactive UI/UX prototyping, design systems, and screen mockups.',
  },
  {
    name: 'Câblage RJ45 & Réseau',
    category: 'Maintenance & Networking',
    icon: 'Cpu',
    description: 'RJ45 crimping per T568A/B standards and network connectivity testing.',
  },
  {
    name: 'Station GSM & Micro-soudure',
    category: 'Maintenance & Networking',
    icon: 'Wrench',
    description: 'Connector and screen replacements using hot air rework stations.',
  },
  {
    name: 'Multimètre digital',
    category: 'Maintenance & Networking',
    icon: 'Zap',
    description: 'Continuity, voltage, and circuit resistance diagnostic measurements.',
  },
  {
    name: 'ChatGPT & Gemini',
    category: 'Artificial Intelligence',
    icon: 'Sparkles',
    description: 'Advanced prompt engineering, design assistance, and text synthesis.',
  },
  {
    name: 'Claude',
    category: 'Artificial Intelligence',
    icon: 'Sparkles',
    description: 'Extended contextual reasoning, technical writing, and structured data synthesis.',
  },
];
