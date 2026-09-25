import React from 'react';
import {
  Briefcase,
  Calendar,
  Building2,
  CheckCircle2,
  Wrench,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { PRACTICAL_EXPERIENCES } from '../data/portfolioData';
import { PRACTICAL_EXPERIENCES_EN } from '../data/portfolioDataEn';
import { ScrollReveal } from './ScrollReveal';
import { usePortfolio } from '../context/PortfolioContext';
import { useLanguage } from '../context/LanguageContext';

export const PracticalExperiences: React.FC = () => {
  const { data, isCustom } = usePortfolio();
  const { isEn, t } = useLanguage();

  const experiencesList = React.useMemo(() => {
    if (!isCustom) return isEn ? PRACTICAL_EXPERIENCES_EN : PRACTICAL_EXPERIENCES;
    if (data.experiences && data.experiences.length > 0) {
      return data.experiences.map((exp, idx) => ({
        id: exp.id || `custom-exp-${idx}`,
        title: exp.title || (isEn ? 'Experience' : 'Expérience'),
        category: exp.organization || (isEn ? 'Hands-on' : 'Pratique'),
        period: exp.period || (isEn ? 'Completed' : 'Validée'),
        description: exp.description || '',
        activities:
          exp.missions && exp.missions.length > 0
            ? exp.missions
            : [isEn ? 'Associated practical tasks' : 'Missions pratiques associées'],
        tools:
          exp.tools && exp.tools.length > 0
            ? exp.tools
            : [isEn ? 'Technical tools' : 'Outils techniques'],
        location: exp.location,
      }));
    }
    return [];
  }, [isCustom, data.experiences, isEn]);

  return (
    <section
      id="experiences"
      className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#CBD5E1]/60 relative"
    >
      <div id="experiences-pratiques" className="absolute -top-24 left-0" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2563EB]/10 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-3 border border-[#2563EB]/20">
              <Briefcase className="w-3.5 h-3.5" />
              <span>{isEn ? 'CAREER TIMELINE' : 'PARCOURS & EXPÉRIENCES'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-heading tracking-tight">
              {t('experiences.title')}
            </h2>
            <p className="text-[#475569] mt-2 text-sm sm:text-base font-normal">
              {isCustom
                ? (isEn
                    ? 'Chronology of verified practical assignments, professional interventions, and field experience.'
                    : 'Chronologie des missions concrètes, interventions professionnelles et pratiques sur le terrain.')
                : (isEn
                    ? 'Chronology of hands-on technical missions and practical engagements carried out on the ground.'
                    : 'Chronologie des missions techniques et des engagements concrets réalisés sur le terrain.')}
            </p>
            <div className="w-16 h-1 bg-[#2563EB] rounded-full mt-4" />
          </div>
        </ScrollReveal>

        {/* Timeline moderne chronologique */}
        {experiencesList.length === 0 ? (
          <div className="p-8 text-center bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl">
            <Briefcase className="w-8 h-8 text-[#94A3B8] mx-auto mb-2" />
            <p className="text-sm font-semibold text-[#0F172A]">
              {isEn ? 'No experiences recorded yet' : 'Aucune expérience enregistrée pour le moment'}
            </p>
          </div>
        ) : (
          <div className="relative pl-6 sm:pl-8 md:pl-10 space-y-8 before:absolute before:left-2.5 sm:before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-[#E2E8F0]">
            {experiencesList.map((exp, idx) => (
              <ScrollReveal
                key={exp.id || idx}
                animation="fade-up"
                delay={idx * 80}
              >
                <div className="relative group">
                  {/* Timeline indicator node */}
                  <div className="absolute -left-6 sm:-left-8 md:-left-10 top-1.5 w-5 h-5 sm:w-7 sm:h-7 rounded-full bg-white border-2 border-[#2563EB] shadow-xs flex items-center justify-center transition-transform group-hover:scale-110">
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#2563EB]" />
                  </div>

                  {/* Card Container */}
                  <div className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-5 sm:p-7 hover:border-[#2563EB]/40 hover:shadow-md transition-all duration-300">
                    
                    {/* Header: Period, Role, Structure */}
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2.5 pb-4 border-b border-[#E2E8F0]">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          {/* Structure / Organisation */}
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#2563EB]/10 text-[#2563EB] text-xs font-bold font-heading">
                            <Building2 className="w-3.5 h-3.5" />
                            <span>{exp.category}</span>
                          </span>

                          {/* Period */}
                          {exp.period && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#64748B]">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{exp.period}</span>
                            </span>
                          )}
                        </div>

                        {/* Role / Titre */}
                        <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] font-heading leading-snug">
                          {exp.title}
                        </h3>
                      </div>

                      {/* Verified Badge */}
                      <span className="self-start inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                        <span>{isEn ? 'Validated' : 'Réalisé'}</span>
                      </span>
                    </div>

                    {/* Description */}
                    {exp.description && (
                      <p className="py-3.5 text-sm sm:text-[14.5px] text-[#334155] leading-relaxed">
                        {exp.description}
                      </p>
                    )}

                    {/* Missions concrètes */}
                    {exp.activities && exp.activities.length > 0 && (
                      <div className="pt-2 pb-3.5 space-y-2">
                        <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A] font-heading block">
                          {isEn ? 'Key Missions & Outputs:' : 'Missions concrètes & Réalisations :'}
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {exp.activities.map((act, aIdx) => (
                            <div
                              key={aIdx}
                              className="flex items-start gap-2 text-xs sm:text-[13px] text-[#475569] leading-snug"
                            >
                              <ChevronRight className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                              <span>{act}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Outils & Technologies mobilisés */}
                    {exp.tools && exp.tools.length > 0 && (
                      <div className="pt-3 border-t border-[#E2E8F0] flex flex-wrap items-center gap-1.5">
                        <span className="text-xs font-semibold text-[#0F172A] mr-1 flex items-center gap-1">
                          <Wrench className="w-3 h-3 text-[#2563EB]" />
                          <span>{isEn ? 'Tools used:' : 'Outils mobilisés :'}</span>
                        </span>
                        {exp.tools.map((tool, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2.5 py-0.5 rounded-md bg-white border border-[#CBD5E1] text-[#334155] text-xs font-medium shadow-2xs"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    )}

                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
