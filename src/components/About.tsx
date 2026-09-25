import React from 'react';
import {
  User,
  CheckCircle2,
} from 'lucide-react';
import { ABOUT_DATA } from '../data/portfolioData';
import { ABOUT_DATA_EN } from '../data/portfolioDataEn';
import { ScrollReveal } from './ScrollReveal';
import { usePortfolio } from '../context/PortfolioContext';
import { useLanguage } from '../context/LanguageContext';

// Helper to filter out any internal technical messages
const isInternalTechnicalMessage = (text?: string): boolean => {
  if (!text) return false;
  const lower = text.toLowerCase();
  return (
    lower.includes('dynamiquement depuis') ||
    lower.includes('administration privée') ||
    lower.includes('mise à jour dynamiquement') ||
    lower.includes('base de données') ||
    lower.includes('synchronisation')
  );
};

export const About: React.FC = () => {
  const { data, isCustom } = usePortfolio();
  const { isEn, t } = useLanguage();

  // 1. Resolve professional presentation paragraphs
  const rawPresentation = data.about?.presentation;
  const hasValidCustomPresentation =
    isCustom &&
    typeof rawPresentation === 'string' &&
    rawPresentation.trim().length > 0 &&
    !isInternalTechnicalMessage(rawPresentation);

  const presentationParagraphs: string[] = hasValidCustomPresentation
    ? rawPresentation
        .split(/\n{2,}/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0 && !isInternalTechnicalMessage(p))
    : isEn
    ? ABOUT_DATA_EN.presentation
    : ABOUT_DATA.presentation;

  return (
    <section
      id="a-propos"
      className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#CBD5E1]/60 relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* En-tête de section */}
        <ScrollReveal animation="fade-up">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2563EB]/10 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-3 border border-[#2563EB]/20">
              <User className="w-3.5 h-3.5" />
              <span>{isEn ? 'PROFILE & VALUES' : 'PRÉSENTATION ÉDITORIALE'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-heading tracking-tight">
              {t('about.title')}
            </h2>
            <p className="text-[#94A3B8] mt-2 text-sm sm:text-base font-normal">
              {data.about?.tagline || (isEn ? 'Technical rigor, creative design, and practical execution.' : 'Rigueur technique, créativité graphique et efficacité opérationnelle.')}
            </p>
            <div className="w-16 h-1 bg-[#2563EB] rounded-full mt-4" />
          </div>
        </ScrollReveal>

        {/* Parcours éditorial en une seule colonne pleine largeur */}
        <div className="w-full max-w-4xl">
          <ScrollReveal animation="fade-up">
            <div className="space-y-4 text-[#334155] text-sm sm:text-[15px] sm:leading-relaxed">
              {presentationParagraphs.map((paragraph, idx) => (
                <p key={idx} className="whitespace-pre-line">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Principes de travail vérifiés */}
            <div className="pt-6 mt-6 border-t border-[#CBD5E1]/60 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A] font-heading block">
                {isEn ? 'Work Principles' : 'Principes de travail'}
              </span>
              <div className="space-y-2.5">
                <div className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                  <span>{isEn ? 'Methodical diagnostic before any hardware intervention' : 'Diagnostic méthodique avant toute intervention matérielle'}</span>
                </div>
                <div className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                  <span>{isEn ? 'Rigorous user-centric UI prototyping and design systems' : 'Conception d’interfaces ergonomiques orientées utilisateur'}</span>
                </div>
                <div className="flex items-start gap-2 text-xs sm:text-sm text-[#475569]">
                  <CheckCircle2 className="w-4 h-4 text-[#2563EB] shrink-0 mt-0.5" />
                  <span>{isEn ? 'Critical, structured, and responsible use of AI tools' : 'Usage raisonné, vérifié et responsable des technologies d’IA'}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

      </div>
    </section>
  );
};
