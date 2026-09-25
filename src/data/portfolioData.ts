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

export const PERSONAL_INFO = {
  name: 'SEMAKO Déo-Gratias',
  brandName: 'GratiaLink',
  mainTitle: 'TECHNICIEN INFORMATIQUE · UI/UX DESIGNER · PROMPT ENGINEER',
  fullTitle: 'Technicien Informatique · UI/UX Designer · Prompt Engineer',
  tagline: 'Maintenance informatique, design UI/UX et création de solutions assistées par IA',
  subHeadline:
    'Technicien informatique, designer UI/UX et prompt engineer : rigueur technique, clarté ergonomique et ingénierie de prompts pour concevoir des solutions exploitables.',
  heroSummary:
    'Profil polyvalent combinant la rigueur de la technique informatique, le sens visuel et ergonomique du design UI/UX et la maîtrise du prompt engineering pour concevoir des solutions numériques fiables, automatiser des processus et prototyper rapidement des résultats exploitables.',
  location: 'Porto-Novo, Bénin',
  email: 'semakodeogratias@gmail.com',
  phone: '+229 0164690682',
  phoneFormatted: '+229 01 64 69 06 82',
  availableFor: 'Interventions techniques, créations visuelles & ingénierie de solutions IA',
  photoUrl: profilePhoto,
  facebookUrl: 'https://www.facebook.com/profile.php?id=61593525761448',
  whatsappUrl: 'https://wa.me/message/4ZXFCVLLZVL5C1',
};

export const ABOUT_DATA = {
  title: 'À propos de moi',
  presentation: [
    'SEMAKO Déo-Gratias a débuté son cursus secondaire au Lycée Béhanzin, où il a obtenu son BEPC en 2023.',
    'Après l’obtention de ce diplôme, il a poursuivi ses études au Lycée Technique et Professionnel de Porto-Novo en intégrant un cursus professionnel de 3 ans dans la filière Installations et Maintenance en Informatique (IMI).',
    'Son profil professionnel s’articule autour de trois axes de compétences complémentaires : la technique informatique appliquée à la maintenance des équipements et des parcs, le design graphique & ergonomique d’interfaces (UI/UX), et le prompt engineering pour la conception de solutions assistées par intelligence artificielle.',
    'Son approche concrète du travail conjugue la rigueur technique dans le diagnostic et la résolution méthodique de pannes, le sens visuel et ergonomique pour concevoir des interfaces claires et intuitives, et la capacité à structurer des requêtes efficaces (prompt engineering) pour concevoir des solutions, prototyper rapidement, automatiser des tâches répétitives et produire des résultats directement exploitables.',
  ],
  axes: [
    {
      title: 'Technique informatique & Maintenance',
      description:
        'Diagnostic matériel et logiciel, dépannage des postes de travail, maintenance GSM, câblage réseau RJ45 et entretien des parcs informatiques.',
    },
    {
      title: 'UI/UX & Design graphique',
      description:
        'Conception d’affiches, supports de communication, traitement d’images et maquettage ergonomique d’interfaces sous Figma.',
    },
    {
      title: 'Prompt Engineering & Solutions IA',
      description:
        'Formulation et optimisation de prompts structurés, prototypage rapide assisté par IA, automatisation de flux de travail et mise en œuvre responsable.',
    },
  ],
};

export const ACADEMIC_CURRICULUM: AcademicCurriculumItem[] = [
  {
    id: 'cursus-behanzin',
    institution: 'Lycée Béhanzin',
    degreeOrField: 'Parcours secondaire',
    durationOrYear: '2023',
    status: 'Diplôme obtenu : BEPC',
    description:
      'Études secondaires sanctionnées avec succès par l’obtention du Brevet d’Études du Premier Cycle (BEPC) en 2023.',
  },
  {
    id: 'cursus-ltp-portonovo',
    institution: 'Lycée Technique et Professionnel de Porto-Novo — Bénin',
    degreeOrField: 'Installations et Maintenance en Informatique (IMI)',
    fieldDetails: 'Filière IMI',
    durationOrYear: '3 ans',
    status: 'Formation professionnelle suivie',
    description:
      'Formation professionnelle suivie au Lycée Technique et Professionnel de Porto-Novo, axée sur la maintenance des ordinateurs, le diagnostic de pannes, les réseaux informatiques et la configuration système.',
  },
];

export const ADDITIONAL_TRAINING: AdditionalTrainingItem[] = [
  {
    id: 'formation-info-1an',
    title: 'Formation en informatique — 1 an',
    duration: '1 an',
    description:
      'Apprentissage des bases informatiques, de la bureautique et de l’environnement des systèmes d’exploitation.',
    validationStatus: 'Formation suivie',
  },
  {
    id: 'formation-maintenance-gsm',
    title: 'Formation en maintenance GSM',
    description:
      'Pratique du diagnostic, de l’entretien et de la réparation matérielle et logicielle des téléphones portables et smartphones.',
    validationStatus: 'Formation suivie',
  },
  {
    id: 'formation-graphisme',
    title: 'Formation en graphisme',
    description:
      'Apprentissage de la composition visuelle, de l’harmonie des couleurs et de la création de supports de communication.',
    validationStatus: 'Formation suivie',
  },
  {
    id: 'formation-serigraphie',
    title: 'Formation en Sérigraphie',
    description: 'Formation pratique en sérigraphie',
    validationStatus: 'Attestation obtenue',
  },
];

export const EDUCATION_LIST: EducationItem[] = [
  {
    id: 'edu-ltp-portonovo',
    title: 'Installations et Maintenance en Informatique (IMI)',
    institution: 'Lycée Technique et Professionnel de Porto-Novo — Bénin',
    duration: '3 ans',
    status: 'en-cours',
    isMain: true,
    description:
      'Formation professionnelle suivie au Lycée Technique et Professionnel de Porto-Novo, axée sur la maintenance des ordinateurs, le diagnostic de pannes, les réseaux informatiques et la configuration système.',
    keyLearnings: [
      'Diagnostic matériel et dépannage des postes de travail',
      'Installation et configuration des systèmes d’exploitation',
      'Câblage RJ45 et sertissage de câbles réseau',
      'Maintenance préventive et entretien des équipements informatiques',
    ],
  },
  {
    id: 'edu-behanzin',
    title: 'Brevet d’Études du Premier Cycle (BEPC)',
    institution: 'Lycée Béhanzin',
    duration: '2023',
    status: 'complete',
    isMain: false,
    description:
      'Cursus secondaire général sanctionné avec succès par l’obtention du diplôme du BEPC en 2023, préalable à l’orientation technique.',
    keyLearnings: [
      'Formation générale et raisonnement scientifique',
      'Méthodologie de travail et expression écrite',
      'Socle académique préparatoire à l’enseignement professionnel',
    ],
  },
  {
    id: 'edu-info-1an',
    title: 'Formation en informatique — 1 an',
    institution: 'Formation pratique',
    duration: '1 an',
    status: 'complete',
    isMain: false,
    description:
      'Apprentissage des bases informatiques, de la bureautique et de l’environnement des systèmes d’exploitation.',
    keyLearnings: [
      'Prise en main approfondie des systèmes et fichiers',
      'Bureautique et traitement de données',
      'Bonnes pratiques d’utilisation informatique',
    ],
  },
  {
    id: 'edu-gsm',
    title: 'Formation en maintenance GSM',
    institution: 'Formation pratique spécialisée',
    duration: 'Formation pratique',
    status: 'complete',
    isMain: false,
    description:
      'Pratique du diagnostic, de l’entretien et de la réparation matérielle et logicielle des téléphones portables et smartphones.',
    keyLearnings: [
      'Démontage sécurisé et analyse des pannes matérielles',
      'Remplacement d’écrans, batteries et connecteurs de charge',
      'Nettoyage et désoxydation des circuits électroniques',
    ],
  },
  {
    id: 'edu-graphisme',
    title: 'Formation en graphisme',
    institution: 'Formation pratique en création visuelle',
    duration: 'Formation pratique',
    status: 'complete',
    isMain: false,
    description:
      'Apprentissage de la composition visuelle, de l’harmonie des couleurs et de la création de supports de communication.',
    keyLearnings: [
      'Conception d’affiches, flyers et bannières numériques',
      'Mise en page, contrastes et typographie',
      'Retouche et traitement d’images sous Photoshop, Photopea et Canva',
    ],
  },
  {
    id: 'edu-serigraphie',
    title: 'Formation en Sérigraphie',
    institution: 'Formation pratique en sérigraphie',
    duration: 'Attestation obtenue',
    status: 'complete',
    isMain: false,
    description:
      'Formation pratique en sérigraphie sanctionnée par une attestation obtenue, compétence complémentaire liée au graphisme et à la création visuelle.',
    keyLearnings: [
      'Techniques d’impression sérigraphique',
      'Préparation des visuels et encrage sur supports variés',
      'Attestation de formation pratique obtenue',
    ],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'info-maintenance',
    title: 'INFORMATIQUE & MAINTENANCE',
    iconName: 'Wrench',
    description: 'Diagnostic, réparation matérielle et maintien opérationnel des postes informatiques et réseaux.',
    skills: [
      'Installation et maintenance informatique',
      'Diagnostic et dépannage informatique',
      'Maintenance des équipements informatiques',
      'Administration élémentaire des postes de travail',
      'Installation et configuration de logiciels',
      'Réseaux informatiques',
      'Câblage RJ45',
      'Sertissage de câbles réseau',
    ],
  },
  {
    id: 'maintenance-gsm',
    title: 'MAINTENANCE GSM',
    iconName: 'Smartphone',
    description: 'Interventions techniques et réparations sur téléphones portables et appareils mobiles.',
    skills: [
      'Diagnostic de pannes',
      'Maintenance des téléphones mobiles',
      'Entretien et réparation des appareils mobiles',
    ],
  },
  {
    id: 'design-graphique',
    title: 'DESIGN GRAPHIQUE',
    iconName: 'Palette',
    description: 'Création visuelle, composition de supports de communication et traitement de l’image.',
    skills: [
      'Conception graphique',
      'Création de supports visuels',
      'Mise en page',
      'Communication visuelle',
      'Retouche et traitement d’images',
      'Sérigraphie',
    ],
  },
  {
    id: 'outils-design',
    title: 'OUTILS DE DESIGN',
    iconName: 'Layers',
    description: 'Logiciels et plateformes utilisés pour la création visuelle et le maquettage.',
    skills: ['Photoshop', 'Photopea', 'Canva', 'Adobe XD', 'Figma'],
  },
  {
    id: 'ui-ux',
    title: 'UI/UX',
    iconName: 'Layout',
    description: 'Conception d’expériences numériques centrées sur l’utilisateur et clarté des interfaces.',
    skills: [
      'Conception d’interfaces',
      'Wireframes',
      'Maquettage',
      'Organisation visuelle d’interfaces',
      'Principes d’ergonomie',
    ],
  },
  {
    id: 'web-outils-numeriques',
    title: 'WEB & OUTILS NUMÉRIQUES',
    iconName: 'Globe',
    description: 'Technologies d’intégration front-end et outils de travail pour le numérique.',
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
    description: 'Conception de requêtes structurées, automatisation assistée par IA et prototypage de solutions numériques.',
    skills: [
      'Formulation et optimisation de prompts',
      'Structuration de contextes et d’instructions complexes',
      'Génération et adaptation de contenus textuels et visuels',
      'Automatisation de tâches répétitives assistée par IA',
      'Prototypage rapide de solutions numériques assisté par IA',
      'Utilisation raisonnée et responsable des outils d’IA',
    ],
  },
];

export const PRACTICAL_EXPERIENCES: PracticalExperience[] = [
  {
    id: 'exp-maintenance-info',
    title: 'EXPÉRIENCE EN MAINTENANCE INFORMATIQUE',
    category: 'Informatique & Systèmes',
    badge: 'Atelier & Équipements',
    description:
      'Pratique régulière du diagnostic, de l’entretien et de la maintenance des équipements informatiques.',
    activities: [
      'Dépoussiérage et révision physique des unités centrales et circuits de ventilation.',
      'Diagnostic méthodique des pannes d’allumage, d’affichage et de surchauffe.',
      'Remplacement et vérification de composants matériels : RAM, disques de stockage, blocs d’alimentation.',
      'Installation propre et paramétrage de systèmes d’exploitation et logiciels utilitaires.',
      'Réalisation et test de câblages réseau RJ45 (sertissage droit et croisé).',
    ],
    tools: ['Tournevis de précision', 'Pince à sertir RJ45', 'Testeur de câble', 'Images système bootables'],
  },
  {
    id: 'exp-maintenance-gsm',
    title: 'EXPÉRIENCE EN MAINTENANCE GSM',
    category: 'Appareils Mobiles',
    badge: 'Intervention mobile',
    description:
      'Pratique du diagnostic et de la maintenance des téléphones mobiles et appareils portables.',
    activities: [
      'Analyse des dysfonctionnements matériels (défaut de charge, écran noir, perte de tactile).',
      'Démontage ordonné et sécurisé des coques, nappes et composants internes.',
      'Remplacement d’écrans cassés, de batteries défectueuses et de connecteurs de charge.',
      'Nettoyage et désoxydation minutieuse des circuits électroniques.',
    ],
    tools: ['Spatules d’ouverture', 'Pistolet à air chaud', 'Multimètre', 'Pinceaux antistatiques'],
  },
  {
    id: 'exp-graphisme',
    title: 'EXPÉRIENCE EN GRAPHISME',
    category: 'Création Visuelle',
    badge: 'Supports visuels',
    description:
      'Conception de visuels, supports graphiques et contenus numériques adaptés aux besoins de communication.',
    activities: [
      'Création d’affiches, de flyers informatifs et de bannières pour les réseaux sociaux.',
      'Mise en page équilibrée respectant la hiérarchie typographique et les contrastes.',
      'Détourage, retouches colorimétriques et traitement d’images numériques.',
      'Déclinaison de maquettes visuelles adaptées à l’impression et aux formats web.',
    ],
    tools: ['Photoshop', 'Photopea', 'Canva'],
  },
  {
    id: 'exp-uiux',
    title: 'EXPÉRIENCE EN UI/UX',
    category: 'Design d’Interfaces',
    badge: 'Ergonomie & Maquettes',
    description:
      'Pratique du maquettage et de la conception d’interfaces utilisateur claires et intuitives.',
    activities: [
      'Structuration des écrans et élaboration de wireframes pour organiser les informations.',
      'Réalisation de maquettes interactives pour applications et pages web.',
      'Application des principes d’ergonomie pour faciliter la navigation sur smartphone et ordinateur.',
      'Sélection de palettes de couleurs lisibles et d’éléments de navigation cohérents.',
    ],
    tools: ['Figma', 'Adobe XD'],
  },
  {
    id: 'exp-wikimedia',
    title: 'CONTRIBUTION NUMÉRIQUE / WIKIMEDIA',
    category: 'Culture Libre',
    badge: 'Partage de connaissances',
    description:
      'Implication active dans l’écosystème Wikimedia pour documenter, fiabiliser et partager la connaissance libre.',
    activities: [
      'Contribution à la rédaction et à la relecture d’articles encyclopédiques sur Wikipédia.',
      'Recherche et vérification rigoureuse des sources documentaires.',
      'Structuration et mise à jour de données ouvertes sur Wikidata.',
      'Sensibilisation au partage du savoir libre et à la valorisation des informations vérifiées.',
    ],
    tools: ['Wikipédia', 'Wikidata', 'Ressources documentaires'],
  },
  {
    id: 'exp-prompt-ia',
    title: 'Prompt Engineer & Créateur de solutions IA',
    category: 'Intelligence Artificielle',
    badge: 'Pratique personnelle & projets appliqués',
    description:
      'Conception de requêtes structurées, automatisation de flux de travail et prototypage assisté par les modèles d’intelligence artificielle générative.',
    activities: [
      'Conception de prompts structurés pour l’optimisation de contenus, le prototypage rapide et l’automatisation légère.',
      'Expérimentation et création de cas d’usage concrets assistés par IA.',
      'Intégration de l’IA dans les flux de travail en design, en rédaction technique et en organisation de données.',
      'Application des principes d’IA responsable, d’évaluation critique des réponses et de protection des données sensibles.',
    ],
    tools: ['ChatGPT', 'Claude', 'Gemini', 'Figma', 'Visual Studio Code'],
  },
];

export const PROJECTS_LIST: CustomProjectItem[] = [
  {
    id: 'proj-1',
    name: 'GratiaLink - Identité visuelle & Solutions graphiques',
    description: 'Conception complète de la marque visuelle GratiaLink : création du logo, élaboration de la charte graphique et production des supports de communication pour les réseaux sociaux.',
    fullDescription: 'Conception globale de l’univers de marque GratiaLink : création du logotype vectoriel, définition de la palette chromatique, sélection des typographies et déclinaison des gabarits graphiques pour l’ensemble des réseaux sociaux.',
    role: 'Designer graphique & créateur de marque',
    period: '2023 - 2024',
    imageUrl: '/projects/gratialink_branding.jpg',
    tools: ['Photoshop', 'Canva', 'Figma', 'Typographie'],
    results: 'Identité visuelle cohérente et finalisée, supports de communication déployés avec succès.',
    featured: false,
  },
  {
    id: 'proj-2',
    name: 'Plateforme Portfolio Professionnel & Générateur de CV',
    description: 'Développement d’une application web moderne de portfolio bilingue (FR/EN) avec éditeur dynamique complet (Base Admin) et générateur de Fiche CV paginée conforme aux standards recruteurs.',
    fullDescription: 'Architecture frontend complète d’un portfolio interactif avec gestion autonome des données (compétences, expériences, attestations certifiées), internationalisation FR/EN et moteur d’impression paginée au format CV A4.',
    role: 'Développeur Frontend & Concepteur UI',
    period: '2024',
    imageUrl: '/projects/portfolio_platform.jpg',
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    results: 'Application fluide, accessible sur mobile, tablette et desktop avec synchronisation dynamique des contenus.',
    featured: false,
  },
  {
    id: 'proj-3',
    name: 'Atelier de diagnostic et de réparation GSM / Informatique',
    description: 'Organisation d’un espace de diagnostic matériel et logiciel pour le dépannage rapide d’unités centrales et de téléphones portables.',
    fullDescription: 'Mise en place d’un protocole de diagnostic méthodique : tests électroniques au multimètre, remplacement de blocs d’affichage et batteries, micro-soudure de connecteurs, maintenance préventive logicielle et confection de câblages RJ45.',
    role: 'Technicien de maintenance',
    period: '2024',
    imageUrl: '/projects/hardware_repair_lab.jpg',
    tools: ['Station à air chaud', 'Multimètre', 'Câblage RJ45', 'Tournevis de précision'],
    results: 'Diagnostics précis, interventions matérielles menées à bien et réhabilitation d’équipements informatiques et mobiles.',
    featured: false,
  },
  {
    id: 'proj-4',
    name: 'Prompt Engineering & Solutions IA',
    description: 'Conception d’un ensemble de prompts structurés et réutilisables pour accélérer la rédaction technique, concevoir des scénarios d’interfaces et assister la production de contenus numériques.',
    fullDescription: 'Élaboration de structures de requêtes avancées (définition de personas, contraintes de formatage, chaînes de raisonnement) pour exploiter les modèles d’IA générative dans des cas d’usage concrets : aide à la documentation, rédaction technique et scénarisation d’interfaces.',
    role: 'Prompt Engineer',
    period: '2024',
    imageUrl: '/projects/prompt_engineering.jpg',
    tools: ['Prompt Engineering', 'IA générative', 'AI Workflow', 'ChatGPT', 'Gemini'],
    results: 'Standardisation des requêtes, gain de temps mesurable et conformité aux règles d’IA responsable.',
    featured: false,
  },
];

export const CERTIFICATIONS_LIST: CertificationItem[] = [
  {
    id: 'cert-1',
    title: 'Compétences Internet pour une utilisation quotidienne',
    issuedDate: '5 août 2026',
    status: 'Certificat de réussite',
    domain: 'Usages Numériques du Quotidien',
    issuer: 'MTN Skills Academy & GSMA',
    refNumber: 'SKA8473406080520261334',
    documentUrl: '/certificates/Comp_tences_Internet_pour_une__Certificate(1).pdf',
    documentFilename: 'Comp_tences_Internet_pour_une__Certificate(1).pdf',
    thumbnailUrl: '/certificates/thumbnails/Comp_tences_Internet_pour_une__Certificate(1).svg',
    showVerifyButton: true,
    description:
      'Maîtrise des pratiques quotidiennes sur le web : navigation sécurisée, outils en ligne courants et gestion des informations personnelles.',
  },
  {
    id: 'cert-2',
    title: 'IA responsable',
    issuedDate: '5 août 2026',
    status: 'Certificat de réussite',
    domain: 'Éthique & Société Numérique',
    issuer: 'MTN Skills Academy & Microsoft Learn',
    refNumber: 'SKA9234143080520261255',
    documentUrl: '/certificates/IA_responsable_Certificate(1).pdf',
    documentFilename: 'IA_responsable_Certificate(1).pdf',
    thumbnailUrl: '/certificates/thumbnails/IA_responsable_Certificate(1).svg',
    showVerifyButton: true,
    description:
      'Sensibilisation aux principes éthiques de l’IA : équité des algorithmes, transparence, protection de la vie privée et utilisation raisonnée.',
  },
  {
    id: 'cert-3',
    title: "L'IA pour tous",
    issuedDate: '5 août 2026',
    status: 'Certificat de réussite',
    domain: 'Intelligence Artificielle',
    issuer: 'MTN Skills Academy & Microsoft Learn',
    refNumber: 'SKA1256340080520261134',
    documentUrl: '/certificates/L_IA_pour_tous_Certificate(1).pdf',
    documentFilename: 'L_IA_pour_tous_Certificate(1).pdf',
    thumbnailUrl: '/certificates/thumbnails/L_IA_pour_tous_Certificate(1).svg',
    showVerifyButton: true,
    description:
      'Compréhension des notions fondamentales de l’intelligence artificielle, de ses mécanismes généraux et de ses applications concrètes.',
  },
  {
    id: 'cert-4',
    title: 'Recherche sur Internet et au-delà',
    issuedDate: '5 août 2026',
    status: 'Certificat de réussite',
    domain: 'Recherche & Évaluation de l’Information',
    issuer: 'MTN Skills Academy & Microsoft Learn',
    refNumber: 'SKA6842409080520261125',
    documentUrl: '/certificates/Recherche_sur_Internet_et_au_d_Certificate(1).pdf',
    documentFilename: 'Recherche_sur_Internet_et_au_d_Certificate(1).pdf',
    thumbnailUrl: '/certificates/thumbnails/Recherche_sur_Internet_et_au_d_Certificate(1).svg',
    showVerifyButton: true,
    description:
      'Méthodes de recherche documentaire efficace, validation des sources en ligne et analyse critique des contenus trouvés sur le web.',
  },
  {
    id: 'cert-5',
    title: "Les fondamentaux d'Internet",
    issuedDate: '5 août 2026',
    status: 'Certificat de réussite',
    domain: 'Culture Réseau & Protocoles',
    issuer: 'MTN Skills Academy & GSMA',
    refNumber: 'SKA1004772080520261025',
    documentUrl: '/certificates/Les_fondamentaux_d_Internet_Certificate(1).pdf',
    documentFilename: 'Les_fondamentaux_d_Internet_Certificate(1).pdf',
    thumbnailUrl: '/certificates/thumbnails/Les_fondamentaux_d_Internet_Certificate(1).svg',
    showVerifyButton: true,
    description:
      'Connaissance des principes de fonctionnement d’Internet, de l’acheminement des données et des architectures réseau de base.',
  },
];

export const DIGITAL_TOOLS: DigitalTool[] = [
  {
    name: 'Visual Studio Code',
    category: 'Éditeur & Versioning',
    icon: 'Code',
    description: 'Éditeur de code principal avec configuration d’extensions.',
  },
  {
    name: 'HTML5',
    category: 'Développement Web',
    icon: 'FileCode',
    description: 'Structuration sémantique de pages web conformes aux standards.',
  },
  {
    name: 'CSS3',
    category: 'Développement Web',
    icon: 'Palette',
    description: 'Mise en page moderne avec Flexbox, Grid et animations fluides.',
  },
  {
    name: 'JavaScript',
    category: 'Développement Web',
    icon: 'Terminal',
    description: 'Dynamisme, manipulation du DOM et appels API asynchrones.',
  },
  {
    name: 'Bootstrap',
    category: 'Développement Web',
    icon: 'Grid',
    description: 'Intégration rapide de maquettes réactives et ordonnées.',
  },
  {
    name: 'GitHub / Pages',
    category: 'Éditeur & Versioning',
    icon: 'GitBranch',
    description: 'Versionnement de code et publication de sites en ligne.',
  },
  {
    name: 'Adobe Photoshop',
    category: 'Design & UI/UX',
    icon: 'Image',
    description: 'Retouche d’images, affiches et montages graphiques avancés.',
  },
  {
    name: 'Photopea',
    category: 'Design & UI/UX',
    icon: 'Layers',
    description: 'Édition graphique matricielle en ligne compatible PSD.',
  },
  {
    name: 'Canva Pro',
    category: 'Design & UI/UX',
    icon: 'Sparkles',
    description: 'Création rapide de visuels événementiels et réseaux sociaux.',
  },
  {
    name: 'Adobe XD',
    category: 'Design & UI/UX',
    icon: 'Layout',
    description: 'Conception de wireframes et maquettes d’interfaces.',
  },
  {
    name: 'Figma',
    category: 'Design & UI/UX',
    icon: 'Layout',
    description: 'Prototypage UI/UX interactif et design systems.',
  },
  {
    name: 'Câblage RJ45 & Réseau',
    category: 'Maintenance & Réseau',
    icon: 'Cpu',
    description: 'Sertissage aux normes T568A/B et tests de connectivité.',
  },
  {
    name: 'Station GSM & Micro-soudure',
    category: 'Maintenance & Réseau',
    icon: 'Wrench',
    description: 'Remplacement de connecteurs et dalles sous station à air chaud.',
  },
  {
    name: 'Multimètre digital',
    category: 'Maintenance & Réseau',
    icon: 'Zap',
    description: 'Mesure de continuités, tensions et résistances de circuits.',
  },
  {
    name: 'ChatGPT & Gemini',
    category: 'Intelligence Artificielle',
    icon: 'Sparkles',
    description: 'Ingénierie de requêtes avancée, assistance à la conception et synthèse textuelle.',
  },
  {
    name: 'Claude',
    category: 'Intelligence Artificielle',
    icon: 'Sparkles',
    description: 'Raisonnement contextuel étendu, rédaction technique et structuration de données.',
  },
];
