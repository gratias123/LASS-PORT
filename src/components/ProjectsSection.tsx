import React, { useState } from 'react';
import {
  FolderGit2,
  ExternalLink,
  Sparkles,
  Star,
  ArrowRight,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useLanguage } from '../context/LanguageContext';
import { ScrollReveal } from './ScrollReveal';
import { getToolName } from '../utils/toolUtils';
import { CustomProjectItem } from '../types/portfolioBuilder';
import { ProjectDetailModal } from './projects/ProjectDetailModal';
import { ParallaxProjectImage } from './projects/ParallaxProjectImage';
import {
  PORTFOLIO_PROJECTS,
  PORTFOLIO_PROJECTS_EN,
} from '../data/portfolioProjects';

// Authentic photorealistic visuals mapped to verified projects
const FALLBACK_PROJECT_IMAGES: Record<string, string> = {
  'proj-1': '/projects/gratialink_branding_mockup.jpg',
  'proj-2': '/projects/portfolio_app_showcase.jpg',
  'proj-3': '/projects/hardware_repair_lab.jpg',
  'proj-4': '/projects/prompt_engineering_workspace.jpg',
};

/**
 * Returns a verified, authentic photorealistic visual for a project card.
 * Never returns empty placeholders or generic strangers.
 */
export const getProjectVisual = (proj: CustomProjectItem, idx?: number): string => {
  if (proj.imageUrl && proj.imageUrl.trim() && !proj.imageUrl.includes('placeholder')) {
    return proj.imageUrl.trim();
  }
  if (proj.id && FALLBACK_PROJECT_IMAGES[proj.id]) {
    return FALLBACK_PROJECT_IMAGES[proj.id];
  }

  const nameLower = (proj.name || '').toLowerCase();
  const roleLower = (proj.role || '').toLowerCase();
  const toolsString = Array.isArray(proj.tools) ? proj.tools.join(' ').toLowerCase() : '';

  if (
    nameLower.includes('gratia') ||
    nameLower.includes('graphi') ||
    nameLower.includes('brand') ||
    nameLower.includes('identit') ||
    roleLower.includes('graph')
  ) {
    return '/projects/gratialink_branding_mockup.jpg';
  }
  if (
    nameLower.includes('portfolio') ||
    nameLower.includes('plateforme') ||
    nameLower.includes('cv') ||
    nameLower.includes('générateur') ||
    toolsString.includes('react') ||
    toolsString.includes('tailwind')
  ) {
    return '/projects/portfolio_app_showcase.jpg';
  }
  if (
    nameLower.includes('gsm') ||
    nameLower.includes('réparation') ||
    nameLower.includes('dépannage') ||
    nameLower.includes('atelier') ||
    nameLower.includes('diagnostic') ||
    toolsString.includes('multimètre') ||
    toolsString.includes('soudure')
  ) {
    return '/projects/hardware_repair_lab.jpg';
  }
  if (
    nameLower.includes('prompt') ||
    nameLower.includes('ia') ||
    nameLower.includes('ai') ||
    roleLower.includes('prompt') ||
    toolsString.includes('chatgpt') ||
    toolsString.includes('gemini') ||
    toolsString.includes('claude')
  ) {
    return '/projects/prompt_engineering_workspace.jpg';
  }

  const fallbackList = [
    '/projects/gratialink_branding_mockup.jpg',
    '/projects/portfolio_app_showcase.jpg',
    '/projects/hardware_repair_lab.jpg',
    '/projects/prompt_engineering_workspace.jpg',
  ];
  if (typeof idx === 'number' && fallbackList[idx % fallbackList.length]) {
    return fallbackList[idx % fallbackList.length];
  }
  return '/projects/gratialink_branding_mockup.jpg';
};

export const ProjectsSection: React.FC = () => {
  const { data } = usePortfolio();
  const { isEn, t } = useLanguage();
  const { projects } = data;

  const [selectedProject, setSelectedProject] = useState<CustomProjectItem | null>(null);

  if (projects && projects.enabled === false) {
    return null;
  }

  // Source dédiée et isolée pour le portfolio (indépendante de la Fiche CV)
  const projectItems: CustomProjectItem[] = isEn
    ? PORTFOLIO_PROJECTS_EN
    : PORTFOLIO_PROJECTS;

  if (projectItems.length === 0) {
    return null;
  }

  const sectionTitle = isEn ? 'Projects & Accomplishments' : 'Projets & Réalisations';
  const sectionBadge = isEn ? 'TECHNICAL & DESIGN WORKS' : 'RÉALISATIONS MAJEURES';
  const sectionSubtitle = isEn
    ? 'A selection of concrete accomplishments in branding, frontend architecture, hardware diagnostics, and AI prompt engineering.'
    : 'Une sélection de réalisations concrètes en identité de marque, développement frontend, diagnostic matériel et ingénierie de prompts IA.';

  const viewProjectText = isEn ? 'Live Demo' : 'Démo';
  const viewDetailsText = isEn ? 'Voir le projet' : 'Voir le projet';

  return (
    <section
      id="projets"
      className="py-16 sm:py-20 lg:py-24 bg-[#F8FAFC] border-b border-[#CBD5E1]/60 relative overflow-hidden"
    >
      {/* Background subtil */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#08111F 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-[#2563EB]/10 text-[#2563EB] mb-3 border border-[#2563EB]/20">
              <FolderGit2 className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>{sectionBadge}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-heading tracking-tight">
              {sectionTitle}
            </h2>

            <p className="text-[#475569] mt-3 text-sm sm:text-base font-normal max-w-2xl mx-auto leading-relaxed">
              {sectionSubtitle}
            </p>

            <div className="w-16 h-1 bg-[#2563EB] rounded-full mx-auto mt-4" />
          </div>
        </ScrollReveal>

        {/* 2x2 Balanced Projects Grid (Desktop: 2 cols, Tablet/Mobile: 1 col) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-5xl mx-auto items-stretch">
          {projectItems.map((proj, idx) => {
            const visualSrc = getProjectVisual(proj, idx);

            return (
              <ScrollReveal
                key={proj.id || idx}
                delay={idx * 80}
                className="h-full flex flex-col"
              >
                <article
                  id={`project-card-${proj.id || idx}`}
                  className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-xl hover:border-blue-500/40 hover:-translate-y-0.5 transition-all duration-300 flex flex-col h-full group"
                >
                  {/* 1. VISUEL MAJEUR DU PROJET AVEC EFFET DE PARALLAXE SUBTILE AU DÉFILEMENT */}
                  <ParallaxProjectImage
                    src={visualSrc}
                    alt={`${proj.name} - ${proj.role || 'Projet'}`}
                    featured={Boolean(proj.featured)}
                    featuredLabel={t('projects.featured') || 'À la une'}
                  />

                  {/* 2. ZONE D'INFORMATIONS & ACTION */}
                  <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-white">
                    <div>
                      {/* 2A. CATÉGORIE / RÔLE */}
                      {proj.role && (
                        <div className="flex items-center gap-1.5 text-xs font-extrabold text-blue-600 uppercase tracking-wider mb-2">
                          <Sparkles className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                          <span>{proj.role}</span>
                        </div>
                      )}

                      {/* 2B. TITRE DU PROJET */}
                      <h3
                        className="text-lg sm:text-xl font-bold text-slate-950 font-heading leading-snug group-hover:text-blue-600 transition-colors mb-2.5"
                        title={proj.name}
                      >
                        {proj.name}
                      </h3>

                      {/* 2C. DESCRIPTION COURTE */}
                      <p className="text-xs sm:text-sm text-slate-600 mb-4 leading-relaxed font-normal">
                        {proj.description}
                      </p>
                    </div>

                    {/* 2D. TECHNOLOGIES & ACTION BAR */}
                    <div className="pt-2 mt-auto">
                      {proj.tools && proj.tools.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mb-5">
                          {proj.tools.map((tItem, tIdx) => {
                            const name = getToolName(tItem);
                            if (!name) return null;
                            return (
                              <span
                                key={tIdx}
                                className="px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200/80"
                              >
                                {name}
                              </span>
                            );
                          })}
                        </div>
                      )}

                      {/* 2E. SÉPARATEUR ET BOUTON « VOIR LE PROJET → » */}
                      <div className="pt-3.5 border-t border-slate-200/80 flex items-center justify-between gap-3">
                        <button
                          type="button"
                          id={`btn-details-${proj.id || idx}`}
                          onClick={() => setSelectedProject({ ...proj, imageUrl: visualSrc })}
                          className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors py-1 cursor-pointer group/btn"
                        >
                          <span>{isEn ? 'View project' : 'Voir le projet'}</span>
                          <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </button>

                        {proj.link && (
                          <a
                            href={proj.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-blue-600 transition-colors py-1 group/link cursor-pointer"
                          >
                            <span>{viewProjectText}</span>
                            <ExternalLink className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
