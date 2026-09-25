import React, { useEffect, useState, useMemo } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';
import {
  ArrowLeft,
  Printer,
  Download,
  Loader2,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Wrench,
  Palette,
  Bot,
  Briefcase,
  GraduationCap,
  Award,
  Layers,
  FolderGit2,
  Languages,
} from 'lucide-react';
import { CustomPortfolioData } from '../types/portfolioBuilder';
import { SEMAKO_MODEL_DATA } from '../utils/portfolioModelAdapter';

interface PrintResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  customData?: CustomPortfolioData;
  data?: CustomPortfolioData;
}

// Nom de fichier standardisé : CV-SEMAKO-Deo-Gratias.pdf
const getPdfFileName = (fullName: string): string => {
  if (!fullName || fullName.trim() === '') return 'CV-SEMAKO-Deo-Gratias.pdf';
  const clean = fullName
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // suppression des accents
    .replace(/[^a-zA-Z0-9\s-_]/g, '')
    .trim()
    .replace(/\s+/g, '-');
  return `CV-${clean}.pdf`;
};

// Initiales si pas de photo
const getInitials = (name: string): string => {
  if (!name) return 'SD';
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

export const PrintResumeModal: React.FC<PrintResumeModalProps> = ({
  isOpen,
  onClose,
  customData,
  data,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationStep, setGenerationStep] = useState('');
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [downloadedFileName, setDownloadedFileName] = useState<string | null>(null);
  const [downloadBlobUrl, setDownloadBlobUrl] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Données dynamiques ou modèle de référence
  const portfolio = customData || data || SEMAKO_MODEL_DATA;

  // 1. EN-TÊTE : Coordonnées strictes sans liens superflus
  const name = portfolio.identity?.name || 'SEMAKO Déo-Gratias';
  const mainTitle = 'TECHNICIEN INFORMATIQUE | MAINTENANCE & SUPPORT';
  const location = 'Porto-Novo, Bénin';
  const email = 'semakodeogratias@gmail.com';
  const phone = '+229 01 64 69 06 82';
  const photoUrl = portfolio.identity?.photoUrl || '';

  // Nom du fichier PDF à télécharger
  const targetFileName = getPdfFileName(name);

  // 2. PROFIL PROFESSIONNEL (Texte exact)
  const profileSummary =
    'Technicien informatique en formation, spécialisé en maintenance, diagnostic et configuration des équipements informatiques et réseaux. Je développe également des compétences en conception UI/UX, développement web et utilisation des outils d’intelligence artificielle. Curieux, autonome et orienté solutions, je m’intéresse particulièrement au dépannage, à l’optimisation des systèmes et à la conception de solutions numériques adaptées aux besoins des utilisateurs.';

  // 3. COMPÉTENCES TECHNIQUES (3 catégories strictes)
  const skillCategories = useMemo(
    () => [
      {
        id: 'info-maint',
        title: 'INFORMATIQUE & MAINTENANCE',
        icon: Wrench,
        items: [
          'Diagnostic matériel et logiciel',
          'Maintenance préventive et corrective',
          'Installation et configuration des systèmes',
          'Réinstallation et préparation des postes',
          'Windows / Linux',
          'Réseaux et câblage RJ45',
          'Dépannage et assistance aux utilisateurs',
        ],
      },
      {
        id: 'uiux-design',
        title: 'UI/UX & DESIGN',
        icon: Palette,
        items: [
          'Conception d’interfaces utilisateur',
          'Wireframes et prototypes',
          'Mise en page et identité visuelle',
          'Figma',
          'Photoshop',
          'Canva',
          'Adobe XD',
        ],
      },
      {
        id: 'prompt-ia',
        title: 'INTELLIGENCE ARTIFICIELLE',
        icon: Bot,
        items: [
          'Prompt Engineering',
          'Conception et structuration de prompts',
          'Optimisation des requêtes pour outils IA',
          'Workflows assistés par IA',
          'Création de contenus avec l’IA',
        ],
      },
    ],
    []
  );

  // 4. EXPÉRIENCES PROFESSIONNELLES (4 expériences conservées avec leurs 5 puces)
  const experiencesList = useMemo(
    () => [
      {
        id: 'exp-maintenance-postes',
        title: 'INSTALLATION ET MAINTENANCE EN INFORMATIQUE (IMI)',
        organization: 'Lycée Technique et Professionnel de Porto-Novo',
        period: '2023 – Présent',
        missions: [
          'Diagnostic des pannes matérielles et logicielles',
          'Installation et réinstallation des systèmes',
          'Maintenance et configuration des postes informatiques',
          'Intervention sur les équipements et périphériques',
          'Travaux pratiques de câblage et de réseaux RJ45',
        ],
      },
      {
        id: 'exp-maintenance-gsm',
        title: 'MAINTENANCE ET RÉPARATION DE SMARTPHONES (GSM)',
        organization: 'Atelier de maintenance & pratique personnelle',
        period: '2024 – Présent',
        missions: [
          'Diagnostic des pannes courantes',
          'Démontage et remontage des appareils',
          'Identification des composants défectueux',
          'Intervention sur différentes générations de smartphones',
          'Maintenance et réparation de premier niveau',
        ],
      },
      {
        id: 'exp-creation-visuelle',
        title: 'CRÉATION VISUELLE ET DESIGN GRAPHIQUE',
        organization: 'GratiaLink / Travaux personnels et commandes',
        period: '2023 – Présent',
        missions: [
          'Création d’affiches et supports promotionnels',
          'Conception d’identités visuelles',
          'Création de visuels pour particuliers, étudiants et structures locales',
          'Mise en page et préparation des supports graphiques',
          'Utilisation de Photoshop, Canva et Figma',
        ],
      },
      {
        id: 'exp-interfaces-web',
        title: 'CONCEPTION D’INTERFACES WEB ET UI/UX',
        organization: 'Projets personnels et apprentissage continu',
        period: '2024 – Présent',
        missions: [
          'Conception d’interfaces web modernes et responsives',
          'Création de wireframes et prototypes',
          'Intégration de pages web avec HTML, CSS et JavaScript',
          'Développement d’interfaces avec des technologies modernes',
          'Amélioration de l’expérience utilisateur et de l’ergonomie',
        ],
      },
    ],
    []
  );

  // 5. PROJETS & RÉALISATIONS (3 projets conservés)
  const projectsList = useMemo(
    () => [
      {
        id: 'proj-gratialink',
        title: 'GRATIALINK — IDENTITÉ VISUELLE & SOLUTIONS GRAPHIQUES',
        role: 'Designer graphique & créateur de marque',
        description:
          'Conception d’identités visuelles et de supports graphiques pour différents projets et besoins de communication.',
        toolsLabel: 'Outils',
        tools: ['Photoshop', 'Canva', 'Figma', 'Typographie'],
      },
      {
        id: 'proj-portfolio-cv',
        title: 'PLATEFORME PORTFOLIO PROFESSIONNEL & GÉNÉRATEUR DE CV',
        role: 'Développeur Frontend & Concepteur UI',
        description:
          'Conception d’une plateforme web permettant de présenter un profil professionnel et de faciliter la création de CV.',
        toolsLabel: 'Technologies',
        tools: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      },
      {
        id: 'proj-atelier-reparation',
        title: 'ATELIER DE DIAGNOSTIC ET DE RÉPARATION GSM / INFORMATIQUE',
        role: 'Technicien de maintenance',
        description:
          'Mise en pratique des techniques de diagnostic, de maintenance et de réparation sur des équipements informatiques et mobiles.',
        toolsLabel: 'Compétences',
        tools: [
          'Station à air chaud',
          'Multimètre',
          'Câblage RJ45',
          'Tournevis de précision',
        ],
      },
    ],
    []
  );

  // 6. CURSUS ACADÉMIQUE
  const academicItems = useMemo(
    () => [
      {
        id: 'acad-ltp',
        institution: 'LYCÉE TECHNIQUE ET PROFESSIONNEL DE PORTO-NOVO — BÉNIN',
        degree: 'Installations et Maintenance en Informatique (IMI)',
        duration: 'Cursus de 3 ans — En cours',
      },
      {
        id: 'acad-behanzin',
        institution: 'LYCÉE BÉHANZIN',
        degree: 'Brevet d’Études du Premier Cycle (BEPC)',
        duration: '2023',
      },
    ],
    []
  );

  // 7. FORMATIONS & ATTESTATIONS
  const trainingItems = useMemo(
    () => [
      { id: 'train-1', title: 'Formation pratique en maintenance informatique — 1 an' },
      { id: 'train-2', title: 'Formation pratique en maintenance de smartphones (GSM)' },
      { id: 'train-3', title: 'Formation en graphisme et création visuelle' },
    ],
    []
  );

  // 8. CERTIFICATIONS (Organisme : MTN Skills Academy)
  const certList = useMemo(
    () => [
      { id: 'cert-1', title: 'Compétences Internet pour une utilisation quotidienne' },
      { id: 'cert-2', title: 'L’IA responsable' },
      { id: 'cert-3', title: 'L’IA pour tous' },
      { id: 'cert-4', title: 'Recherche sur Internet et au-delà' },
      { id: 'cert-5', title: 'Les fondamentaux d’Internet' },
    ],
    []
  );

  // 9. LANGUES (Section sobre et professionnelle)
  const languagesList = useMemo(
    () => [
      { id: 'lang-fr', name: 'Français' },
      { id: 'lang-en', name: 'Anglais' },
    ],
    []
  );

  // Scroll lock lors de l'affichage modal
  useEffect(() => {
    if (isOpen) {
      setDownloadSuccess(false);
      setStatusMessage(null);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Impression native A4
  const handlePrint = () => {
    window.print();
  };

  // Téléchargement strict en 1 seule page A4
  const generateAndDownloadPdf = async () => {
    if (isGenerating) return;

    setIsGenerating(true);
    setDownloadSuccess(false);
    setStatusMessage(null);
    setGenerationStep('Préparation de la Fiche CV sur 1 page A4...');

    try {
      if (document.fonts && document.fonts.ready) {
        try {
          await document.fonts.ready;
        } catch {
          // ignore font loading error
        }
      }

      const originalEl = document.getElementById('cv-a4-page-single');
      if (!originalEl) {
        throw new Error('Élément de la page CV non trouvé.');
      }

      setGenerationStep('Génération vectorielle haute fidélité (1 page A4)...');

      // Création d'un environnement d'exportation dédié 100% blanc, totalement déconnecté du fond du portfolio
      const exportSandbox = document.createElement('div');
      exportSandbox.id = 'cv-pdf-export-sandbox';
      exportSandbox.style.position = 'fixed';
      exportSandbox.style.top = '-99999px';
      exportSandbox.style.left = '0';
      exportSandbox.style.width = '794px';
      exportSandbox.style.height = '1123px';
      exportSandbox.style.backgroundColor = '#ffffff';
      exportSandbox.style.zIndex = '-99999';
      exportSandbox.style.margin = '0';
      exportSandbox.style.padding = '0';
      exportSandbox.style.overflow = 'hidden';

      const clone = originalEl.cloneNode(true) as HTMLElement;
      clone.id = 'cv-pdf-render-clone';
      clone.style.width = '794px';
      clone.style.minWidth = '794px';
      clone.style.maxWidth = '794px';
      clone.style.height = '1123px';
      clone.style.minHeight = '1123px';
      clone.style.maxHeight = '1123px';
      clone.style.backgroundColor = '#ffffff';
      clone.style.boxShadow = 'none';
      clone.style.border = 'none';
      clone.style.borderRadius = '0';
      clone.style.margin = '0';
      clone.style.overflow = 'hidden';

      exportSandbox.appendChild(clone);
      document.body.appendChild(exportSandbox);

      let canvas: HTMLCanvasElement;
      try {
        await new Promise((resolve) => setTimeout(resolve, 60));

        canvas = await html2canvas(clone, {
          scale: 2,
          useCORS: true,
          allowTaint: false,
          logging: false,
          backgroundColor: '#ffffff',
          width: 794,
          height: 1123,
          windowWidth: 794,
          windowHeight: 1123,
        });
      } finally {
        if (exportSandbox.parentNode) {
          exportSandbox.parentNode.removeChild(exportSandbox);
        }
      }

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      });

      // Fond blanc absolu 210mm x 297mm garanti
      pdf.setFillColor(255, 255, 255);
      pdf.rect(0, 0, 210, 297, 'F');

      const imgData = canvas.toDataURL('image/jpeg', 0.98);

      // Mapping 1:1 exact sur les 210mm x 297mm de la page A4 (794 / 1123 ≈ 210 / 297)
      pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');

      setGenerationStep('Téléchargement du fichier PDF...');
      pdf.save(targetFileName);

      const blob = pdf.output('blob');
      const blobUrl = URL.createObjectURL(blob);
      setDownloadBlobUrl(blobUrl);

      setDownloadSuccess(true);
      setDownloadedFileName(targetFileName);
      setStatusMessage(
        `Le fichier « ${targetFileName} » (1 page A4) a été téléchargé avec succès.`
      );
    } catch (error) {
      console.error('Erreur lors de la génération PDF:', error);
      setStatusMessage(
        'Une erreur est survenue lors de la création du fichier PDF.'
      );
    } finally {
      setIsGenerating(false);
      setGenerationStep('');
    }
  };

  return (
    <div
      id="cv-preview-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/92 backdrop-blur-md flex flex-col text-slate-100 print-modal-backdrop"
      role="dialog"
      aria-modal="true"
      aria-labelledby="cv-header-title"
    >
      {/* ------------------------------------------------------------- */}
      {/* 1. BARRE D'ACTIONS SUPÉRIEURE (Non imprimée)                 */}
      {/* ------------------------------------------------------------- */}
      <header
        id="cv-top-bar"
        className="sticky top-0 z-30 w-full bg-slate-900/95 border-b border-slate-800 px-3 sm:px-8 py-2.5 backdrop-blur-md flex items-center justify-between gap-3 no-print shrink-0 shadow-md"
      >
        {/* Bouton retour au portfolio */}
        <button
          type="button"
          onClick={onClose}
          id="btn-return-portfolio"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-750 border border-slate-700 text-xs font-semibold transition-all cursor-pointer shrink-0"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour</span>
        </button>

        {/* Titre centré */}
        <div className="text-center flex-1 min-w-[140px]">
          <h1
            id="cv-header-title"
            className="text-xs sm:text-sm font-extrabold text-white font-heading tracking-tight uppercase truncate"
          >
            CURRICULUM VITAE • 1 PAGE A4
          </h1>
          <p className="text-[10px] text-blue-400 font-medium truncate">
            TECHNICIEN INFORMATIQUE | MAINTENANCE & SUPPORT
          </p>
        </div>

        {/* Actions : Téléchargement PDF & Impression */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={generateAndDownloadPdf}
            disabled={isGenerating}
            id="btn-download-pdf"
            title={`Télécharger le CV : ${targetFileName}`}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm cursor-pointer disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-500 text-white"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span className="hidden sm:inline">Génération...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Télécharger le CV (1 page)</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handlePrint}
            disabled={isGenerating}
            id="btn-print-cv"
            title="Imprimer le CV"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-750 text-slate-200 hover:text-white rounded-lg text-xs font-semibold border border-slate-700 transition-colors cursor-pointer disabled:opacity-60"
          >
            <Printer className="w-3.5 h-3.5 text-slate-300" />
            <span className="hidden md:inline">Imprimer</span>
          </button>
        </div>
      </header>

      {/* Bannière de chargement */}
      {isGenerating && (
        <div
          id="cv-generation-banner"
          className="w-full bg-blue-950/80 border-b border-blue-800/60 px-4 py-1.5 text-xs text-blue-200 flex items-center justify-center gap-2 no-print shrink-0"
        >
          <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400 shrink-0" />
          <span>{generationStep || 'Préparation du document PDF...'}</span>
        </div>
      )}

      {/* Bannière de notification succès/erreur */}
      {statusMessage && !isGenerating && (
        <div
          id="cv-status-banner"
          className={`w-full px-4 py-1.5 border-b text-xs flex items-center justify-between gap-3 no-print shrink-0 ${
            downloadSuccess
              ? 'bg-emerald-950/70 border-emerald-800 text-emerald-200'
              : 'bg-amber-950/70 border-amber-800 text-amber-200'
          }`}
        >
          <div className="flex items-center gap-2 mx-auto sm:mx-0">
            <CheckCircle2
              className={`w-3.5 h-3.5 shrink-0 ${
                downloadSuccess ? 'text-emerald-400' : 'text-amber-400'
              }`}
            />
            <span>{statusMessage}</span>
          </div>
          {downloadBlobUrl && (
            <a
              href={downloadBlobUrl}
              download={downloadedFileName || targetFileName}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-300 hover:underline shrink-0"
            >
              <span>Ouvrir</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      )}

      {/* ------------------------------------------------------------- */}
      {/* 2. LE DOCUMENT CV A4 STRICTEMENT 1 PAGE                       */}
      {/* ------------------------------------------------------------- */}
      <main
        id="cv-preview-workspace"
        className="flex-1 w-full bg-slate-950/95 py-8 sm:py-12 pb-32 px-3 sm:px-6 flex justify-center items-start overflow-x-auto print:p-0 print:m-0 print:bg-white"
      >
        <div
          id="cv-a4-page-single"
          className="cv-a4-page bg-white text-slate-900 shadow-[0_10px_40px_rgba(0,0,0,0.55)] border border-slate-300 px-8 pt-6 pb-8 flex flex-col justify-start box-border relative print:p-0 print:m-0 print:shadow-none print:border-none print:w-full print:h-full"
          style={{
            width: '794px',
            minWidth: '794px',
            maxWidth: '794px',
            height: '1123px',
            minHeight: '1123px',
            maxHeight: '1123px',
            backgroundColor: '#ffffff',
            boxSizing: 'border-box',
            overflow: 'hidden',
          }}
        >
          {/* CORPS SUPÉRIEUR : EN-TÊTE + PROFIL */}
          <div className="flex flex-col gap-2.5">
            {/* 1. EN-TÊTE : Photo, Nom, Titre, Localisation, Email, Téléphone (liens externes nettoyés) */}
            <header className="border-b border-slate-300 pb-2.5 flex items-center gap-4">
              {/* Photo ou Initiales */}
              <div className="shrink-0">
                {photoUrl ? (
                  <img
                    src={photoUrl}
                    alt={name}
                    className="w-14 h-16 rounded-md object-cover object-top border border-blue-600 shadow-xs"
                  />
                ) : (
                  <div className="w-14 h-16 rounded-md bg-slate-100 border border-blue-600 flex items-center justify-center text-slate-700 font-bold text-base">
                    {getInitials(name)}
                  </div>
                )}
              </div>

              {/* Nom, Titre et Coordonnées strictes */}
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-extrabold text-slate-950 tracking-tight leading-tight uppercase font-heading">
                  {name}
                </h2>
                <p className="text-[12.5px] font-extrabold text-blue-700 tracking-wide uppercase mt-0.5 font-heading">
                  {mainTitle}
                </p>

                {/* Coordonnées essentielles uniquement */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-0.5 text-[11px] text-slate-600 mt-1 font-medium">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{location}</span>
                  </span>
                  <a
                    href={`mailto:${email}`}
                    className="inline-flex items-center gap-1 text-slate-700 hover:text-blue-700 transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{email}</span>
                  </a>
                  <a
                    href={`tel:${phone.replace(/\s+/g, '')}`}
                    className="inline-flex items-center gap-1 text-slate-700 hover:text-blue-700 transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{phone}</span>
                  </a>
                </div>
              </div>
            </header>

            {/* 2. PROFIL PROFESSIONNEL */}
            <section className="bg-slate-50/90 rounded-md p-2.5 border border-slate-200">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 mb-1 flex items-center gap-1.5 font-heading">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600"></span>
                <span>Profil Professionnel</span>
              </h3>
              <p className="text-[10px] text-slate-700 leading-relaxed text-justify">
                {profileSummary}
              </p>
            </section>
          </div>

          {/* GRILLE 2 COLONNES PRINCIPALE (9 sections au total, lisibilité optimisée sur 1 page A4) */}
          <div className="grid grid-cols-12 gap-4 mt-2.5 mb-2 items-start">
            {/* ========================================================= */}
            {/* COLONNE GAUCHE (5 colonnes / 12)                          */}
            {/* 3. Compétences, 7. Formations, 8. Certifications, 9. Langues */}
            {/* ========================================================= */}
            <div className="col-span-5 flex flex-col gap-2.5 pr-2.5 border-r border-slate-200">
              {/* 3. COMPÉTENCES TECHNIQUES */}
              <section>
                <h3 className="text-[11.5px] font-bold text-slate-950 uppercase tracking-wider pb-0.5 border-b border-slate-300 mb-1.5 flex items-center gap-1 font-heading">
                  <Layers className="w-3.5 h-3.5 text-blue-600" />
                  <span>Compétences Techniques</span>
                </h3>

                <div className="space-y-1.5">
                  {skillCategories.map((cat) => {
                    const Icon = cat.icon;
                    return (
                      <div key={cat.id}>
                        <div className="font-bold text-slate-900 flex items-center gap-1 text-[10px] uppercase tracking-wide">
                          <Icon className="w-3 h-3 text-blue-600 shrink-0" />
                          <span>{cat.title}</span>
                        </div>
                        <ul className="mt-0.5 space-y-0.5 text-slate-700 pl-2.5 text-[9.8px]">
                          {cat.items.map((item, idx) => (
                            <li
                              key={idx}
                              className="relative before:content-['•'] before:absolute before:-left-2 before:text-blue-500 leading-snug"
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* 7. FORMATIONS & ATTESTATIONS */}
              <section>
                <h3 className="text-[11.5px] font-bold text-slate-950 uppercase tracking-wider pb-0.5 border-b border-slate-300 mb-1 flex items-center gap-1 font-heading">
                  <Award className="w-3.5 h-3.5 text-blue-600" />
                  <span>Formations & Attestations</span>
                </h3>
                <ul className="space-y-0.5 text-[9.8px] text-slate-700 pl-2.5">
                  {trainingItems.map((item) => (
                    <li
                      key={item.id}
                      className="relative before:content-['•'] before:absolute before:-left-2 before:text-blue-500 font-medium leading-snug"
                    >
                      {item.title}
                    </li>
                  ))}
                </ul>
              </section>

              {/* 8. CERTIFICATIONS (Organisme certificateur : MTN Skills Academy) */}
              <section>
                <div className="pb-0.5 border-b border-slate-300 mb-1 flex items-baseline justify-between gap-1">
                  <h3 className="text-[11.5px] font-bold text-slate-950 uppercase tracking-wider flex items-center gap-1 font-heading">
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>Certifications</span>
                  </h3>
                  <span className="text-[9.5px] text-slate-500 font-semibold">
                    MTN Skills Academy
                  </span>
                </div>
                <ul className="space-y-0.5 text-[9.5px] text-slate-700 pl-2.5">
                  {certList.map((cert) => (
                    <li
                      key={cert.id}
                      className="relative before:content-['•'] before:absolute before:-left-2 before:text-blue-500 leading-snug"
                    >
                      {cert.title}
                    </li>
                  ))}
                </ul>
              </section>

              {/* 9. LANGUES (Section sobre et professionnelle) */}
              <section>
                <h3 className="text-[11.5px] font-bold text-slate-950 uppercase tracking-wider pb-0.5 border-b border-slate-300 mb-1 flex items-center gap-1 font-heading">
                  <Languages className="w-3.5 h-3.5 text-blue-600" />
                  <span>Langues</span>
                </h3>
                <ul className="space-y-0.5 text-[10px] text-slate-700 pl-2.5">
                  {languagesList.map((lang) => (
                    <li
                      key={lang.id}
                      className="relative before:content-['•'] before:absolute before:-left-2 before:text-blue-500 font-medium leading-normal"
                    >
                      {lang.name}
                    </li>
                  ))}
                </ul>
              </section>
            </div>

            {/* ========================================================= */}
            {/* COLONNE DROITE (7 colonnes / 12)                         */}
            {/* 4. Expériences, 5. Projets, 6. Cursus Académique          */}
            {/* ========================================================= */}
            <div className="col-span-7 flex flex-col gap-2.5 pl-0.5">
              {/* 4. EXPÉRIENCES PROFESSIONNELLES */}
              <section>
                <h3 className="text-[11.5px] font-bold text-slate-950 uppercase tracking-wider pb-0.5 border-b border-slate-300 mb-1.5 flex items-center gap-1 font-heading">
                  <Briefcase className="w-3.5 h-3.5 text-blue-600" />
                  <span>Expériences Professionnelles</span>
                </h3>

                <div className="space-y-1.5">
                  {experiencesList.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex items-baseline justify-between gap-1">
                        <h4 className="font-bold text-slate-950 leading-tight text-[10.5px]">
                          {exp.title}
                        </h4>
                        <span className="text-[9.5px] text-blue-700 font-bold shrink-0">
                          {exp.period}
                        </span>
                      </div>
                      <div className="text-[9.5px] text-slate-600 font-medium italic mt-0.5">
                        {exp.organization}
                      </div>
                      <ul className="mt-0.5 space-y-0.5 text-slate-700 pl-2.5">
                        {exp.missions.map((mission, mIdx) => (
                          <li
                            key={mIdx}
                            className="relative before:content-['•'] before:absolute before:-left-2 before:text-slate-400 leading-snug text-[9.5px]"
                          >
                            {mission}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* 5. PROJETS & RÉALISATIONS */}
              <section>
                <h3 className="text-[11.5px] font-bold text-slate-950 uppercase tracking-wider pb-0.5 border-b border-slate-300 mb-1 flex items-center gap-1 font-heading">
                  <FolderGit2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Projets & Réalisations</span>
                </h3>

                <div className="space-y-1">
                  {projectsList.map((proj) => (
                    <div
                      key={proj.id}
                      className="bg-slate-50/90 px-2.5 py-1.5 rounded border border-slate-200"
                    >
                      <div className="flex items-baseline justify-between gap-1">
                        <h4 className="font-bold text-slate-950 leading-tight text-[10px]">
                          {proj.title}
                        </h4>
                        <span className="text-[9px] text-blue-700 font-bold shrink-0">
                          {proj.role}
                        </span>
                      </div>
                      <p className="text-[9.5px] text-slate-700 leading-snug mt-0.5">
                        {proj.description}
                      </p>
                      <div className="text-[9px] text-slate-600 font-medium mt-0.5 flex flex-wrap items-center gap-0.5">
                        <span className="font-semibold text-slate-800">
                          {proj.toolsLabel} :
                        </span>
                        <span>{proj.tools.join(' · ')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 6. CURSUS ACADÉMIQUE */}
              <section>
                <h3 className="text-[11.5px] font-bold text-slate-950 uppercase tracking-wider pb-0.5 border-b border-slate-300 mb-1 flex items-center gap-1 font-heading">
                  <GraduationCap className="w-3.5 h-3.5 text-blue-600" />
                  <span>Cursus Académique</span>
                </h3>

                <div className="space-y-1">
                  {academicItems.map((edu) => (
                    <div key={edu.id}>
                      <div className="flex items-baseline justify-between gap-1">
                        <h4 className="font-bold text-slate-950 leading-tight text-[10px]">
                          {edu.institution}
                        </h4>
                        <span className="text-[9px] text-blue-700 font-bold shrink-0">
                          {edu.duration}
                        </span>
                      </div>
                      <div className="text-[9.5px] text-slate-700 font-medium">
                        {edu.degree}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </div>
      </main>

      {/* ------------------------------------------------------------- */}
      {/* 3. FEUILLE DE STYLE D'IMPRESSION A4 STRICTE                    */}
      {/* ------------------------------------------------------------- */}
      <style>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0mm;
          }
          html, body {
            background-color: #ffffff !important;
            background: #ffffff !important;
            color: #0f172a !important;
            margin: 0 !important;
            padding: 0 !important;
            overflow: visible !important;
            width: 210mm !important;
            height: 297mm !important;
          }
          .no-print,
          #cv-top-bar,
          #cv-generation-banner,
          #cv-status-banner,
          nav,
          header#navbar,
          footer {
            display: none !important;
          }
          #cv-preview-backdrop,
          #cv-preview-workspace,
          main {
            position: static !important;
            background: #ffffff !important;
            padding: 0 !important;
            margin: 0 !important;
            overflow: visible !important;
            display: block !important;
            width: 210mm !important;
            height: 297mm !important;
          }
          .cv-a4-page {
            width: 210mm !important;
            max-width: 210mm !important;
            min-width: 210mm !important;
            height: 297mm !important;
            min-height: 297mm !important;
            max-height: 297mm !important;
            box-shadow: none !important;
            border: none !important;
            border-radius: 0 !important;
            margin: 0 !important;
            padding: 8mm 10mm !important;
            background-color: #ffffff !important;
            background: #ffffff !important;
            color: #0f172a !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}</style>
    </div>
  );
};
