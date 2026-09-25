import { CustomProjectItem } from '../types/portfolioBuilder';

/**
 * SOURCE DE DONNÉES DÉDIÉE ET INDÉPENDANTE POUR LES PROJETS DU PORTFOLIO.
 * 
 * IMPORTANT : Cette source est STRICTEMENT ISOLÉE du générateur de CV (Fiche CV).
 * Toute modification apportée ici n'impacte en aucun cas les données ou le rendu du CV.
 */
export const PORTFOLIO_PROJECTS: CustomProjectItem[] = [
  {
    id: 'proj-1',
    name: 'GratiaLink — Identité visuelle & Solutions graphiques',
    description:
      'Conception complète de l\'identité visuelle GratiaLink : création du logo, élaboration de la charte graphique et production de supports de communication pour les réseaux sociaux.',
    fullDescription:
      'Conception globale de l’univers de marque GratiaLink : création du logotype vectoriel, définition de la palette chromatique, sélection des typographies et déclinaison des gabarits graphiques pour l’ensemble des réseaux sociaux.',
    role: 'DESIGNER GRAPHIQUE & CRÉATEUR DE MARQUE',
    period: '2023 - 2024',
    imageUrl: '/projects/gratialink_branding_mockup.jpg',
    tools: ['Photoshop', 'Canva', 'Figma', 'Typographie'],
    results:
      'Identité visuelle cohérente et finalisée, supports de communication déployés avec succès.',
    featured: false,
  },
  {
    id: 'proj-2',
    name: 'Plateforme Portfolio Professionnel & Générateur de CV',
    description:
      'Développement d’une application web moderne de portfolio bilingue (FR/EN) avec éditeur dynamique complet, gestion des contenus et générateur de Fiche CV paginée conforme aux standards de présentation professionnelle.',
    fullDescription:
      'Architecture frontend complète d’un portfolio interactif avec gestion autonome des données (compétences, expériences, attestations certifiées), internationalisation FR/EN et moteur d’impression paginée au format CV A4.',
    role: 'DÉVELOPPEUR FRONTEND & CONCEPTEUR UI',
    period: '2024',
    imageUrl: '/projects/portfolio_app_showcase.jpg',
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    results:
      'Application fluide, accessible sur mobile, tablette et desktop avec synchronisation dynamique des contenus.',
    featured: false,
  },
  {
    id: 'proj-3',
    name: 'Atelier de diagnostic et de réparation GSM / Informatique',
    description:
      'Organisation d’un espace de diagnostic matériel et logiciel pour le dépannage rapide d’unités centrales et de téléphones portables.',
    fullDescription:
      'Mise en place d’un protocole de diagnostic méthodique : tests électroniques au multimètre, remplacement de blocs d’affichage et batteries, micro-soudure de connecteurs, maintenance préventive logicielle et confection de câblages RJ45.',
    role: 'Technicien de maintenance',
    period: '2024',
    imageUrl: '/projects/hardware_repair_lab.jpg',
    tools: [
      'Station à air chaud',
      'Multimètre',
      'Câblage RJ45',
      'Tournevis de précision',
    ],
    results:
      'Diagnostics précis, interventions matérielles menées à bien et réhabilitation d’équipements informatiques et mobiles.',
    featured: false,
  },
  {
    id: 'proj-4',
    name: 'Prompt Engineering & Solutions IA',
    description:
      'Conception d’un ensemble de prompts structurés et réutilisables pour accélérer la rédaction technique, concevoir des scénarios d’interfaces et assister la production de contenus numériques.',
    fullDescription:
      'Élaboration de structures de requêtes avancées (définition de personas, contraintes de formatage, chaînes de raisonnement) pour exploiter les modèles d’IA générative dans des cas d’usage concrets : aide à la documentation, rédaction technique et scénarisation d’interfaces.',
    role: 'PROMPT ENGINEER',
    period: '2024',
    imageUrl: '/projects/prompt_engineering_workspace.jpg',
    tools: [
      'Prompt Engineering',
      'IA générative',
      'AI Workflow',
      'ChatGPT',
      'Gemini',
    ],
    results:
      'Standardisation des requêtes, gain de temps mesurable et conformité aux règles d’IA responsable.',
    featured: false,
  },
];

export const PORTFOLIO_PROJECTS_EN: CustomProjectItem[] = [
  {
    id: 'proj-1',
    name: 'GratiaLink — Visual Identity & Graphic Solutions',
    description:
      'Complete brand identity design for GratiaLink: logo creation, brand style guidelines, and visual communication assets for social media platforms.',
    fullDescription:
      'Complete brand identity design for GratiaLink: vector logotype creation, chromatic palette specification, typography pairing, and visual assets production for social media channels.',
    role: 'GRAPHIC DESIGNER & BRAND CREATOR',
    period: '2023 - 2024',
    imageUrl: '/projects/gratialink_branding_mockup.jpg',
    tools: ['Photoshop', 'Canva', 'Figma', 'Typography'],
    results:
      'Consistent and completed brand identity, communication materials successfully deployed.',
    featured: false,
  },
  {
    id: 'proj-2',
    name: 'Professional Portfolio Platform & Resume Generator',
    description:
      'Development of a modern bilingual (FR/EN) web portfolio application with full dynamic content editor and recruiter-ready paginated A4 resume generator.',
    fullDescription:
      'Complete frontend architecture for an interactive portfolio with autonomous data management (skills, experiences, certified credentials), FR/EN internationalization, and a paginated A4 print engine.',
    role: 'FRONTEND DEVELOPER & UI DESIGNER',
    period: '2024',
    imageUrl: '/projects/portfolio_app_showcase.jpg',
    tools: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
    results:
      'Smooth, accessible application across mobile, tablet, and desktop with real-time content synchronization.',
    featured: false,
  },
  {
    id: 'proj-3',
    name: 'Atelier de diagnostic et de réparation GSM / Informatique',
    description:
      'Organisation d’un espace de diagnostic matériel et logiciel pour le dépannage rapide d’unités centrales et de téléphones portables.',
    fullDescription:
      'Mise en place d’un protocole de diagnostic méthodique : tests électroniques au multimètre, remplacement de blocs d’affichage et batteries, micro-soudure de connecteurs, maintenance préventive logicielle et confection de câblages RJ45.',
    role: 'Technicien de maintenance',
    period: '2024',
    imageUrl: '/projects/hardware_repair_lab.jpg',
    tools: [
      'Station à air chaud',
      'Multimètre',
      'Câblage RJ45',
      'Tournevis de précision',
    ],
    results:
      'Diagnostics précis, interventions matérielles menées à bien et réhabilitation d’équipements informatiques et mobiles.',
    featured: false,
  },
  {
    id: 'proj-4',
    name: 'Prompt Engineering & AI Solutions',
    description:
      'Design of structured and reusable prompts to accelerate technical writing, conceptualize UI interaction flows, and streamline digital content creation.',
    fullDescription:
      'Advanced prompt architecture engineering (role personas, schema formatting constraints, chain-of-thought logic) to leverage generative AI models for practical use cases: documentation drafting, UI flow prototyping, and editorial automation under responsible AI principles.',
    role: 'PROMPT ENGINEER',
    period: '2024',
    imageUrl: '/projects/prompt_engineering_workspace.jpg',
    tools: [
      'Prompt Engineering',
      'Generative AI',
      'AI Workflow',
      'ChatGPT',
      'Gemini',
    ],
    results:
      'Standardized prompt templates, measurable productivity gains, and responsible AI compliance.',
    featured: false,
  },
];
