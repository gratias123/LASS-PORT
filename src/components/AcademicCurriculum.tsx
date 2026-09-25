import React from 'react';
import { GraduationCap, Calendar, Award, Building2 } from 'lucide-react';
import { ACADEMIC_CURRICULUM } from '../data/portfolioData';
import { ACADEMIC_CURRICULUM_EN } from '../data/portfolioDataEn';
import { ScrollReveal } from './ScrollReveal';
import { usePortfolio } from '../context/PortfolioContext';
import { useLanguage } from '../context/LanguageContext';

export const AcademicCurriculum: React.FC = () => {
  const { data, isCustom } = usePortfolio();
  const { isEn, t } = useLanguage();

  const curriculumList = isEn ? ACADEMIC_CURRICULUM_EN : ACADEMIC_CURRICULUM;

  return (
    <section id="cursus" className="py-16 sm:py-20 bg-[#F8FAFC] border-b border-[#CBD5E1]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2563EB]/10 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-3 border border-[#2563EB]/20">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{t('curriculum.badge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-heading tracking-tight">
              {t('curriculum.title')}
            </h2>
            <p className="text-[#475569] mt-2 text-sm sm:text-base font-normal">
              {isEn
                ? 'Chronology of formal studies and recognized educational programs.'
                : 'Chronologie des études et des formations certifiantes.'}
            </p>
            <div className="w-16 h-1 bg-[#2563EB] rounded-full mt-4" />
          </div>
        </ScrollReveal>

        {/* Chronological List of Academic Milestones */}
        <div className="space-y-6 max-w-4xl">
          {isCustom && data.education.length === 0 ? (
            <div className="p-8 text-center bg-white border border-[#E2E8F0] rounded-2xl">
              <GraduationCap className="w-8 h-8 text-[#94A3B8] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#0F172A]">
                {isEn ? 'No education records added yet' : 'Aucun cursus académique enregistré pour le moment'}
              </p>
            </div>
          ) : isCustom ? (
            data.education.map((item, index) => (
              <ScrollReveal
                key={item.id || index}
                animation="fade-up"
                delay={index * 100}
              >
                <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E2E8F0] shadow-xs hover:border-[#2563EB]/40 hover:shadow-md transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20">
                          <GraduationCap className="w-3.5 h-3.5 text-[#2563EB]" />
                          <span>{item.degree}</span>
                        </span>
                      </div>
                      <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] font-heading flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-[#64748B] shrink-0" />
                        <span>{item.institution}</span>
                      </h3>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#475569] bg-[#F1F5F9] px-3 py-1.5 rounded-lg border border-[#CBD5E1]/60 shrink-0">
                      <Calendar className="w-3.5 h-3.5 text-[#2563EB]" />
                      <span>{item.period}</span>
                    </div>
                  </div>

                  {item.description && (
                    <p className="text-[#475569] text-xs sm:text-sm leading-relaxed">
                      {item.description}
                    </p>
                  )}
                </div>
              </ScrollReveal>
            ))
          ) : (
            curriculumList.map((item, index) => {
              const isBehanzin = item.id === 'cursus-behanzin';
              return (
                <ScrollReveal
                  key={item.id}
                  animation="fade-up"
                  delay={index * 100}
                >
                  <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#E2E8F0] shadow-xs hover:border-[#2563EB]/40 hover:shadow-md transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          {isBehanzin ? (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <Award className="w-3.5 h-3.5 text-emerald-600" />
                              <span>{isEn ? 'State Diploma Awarded' : "Diplôme d'État obtenu"}</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-xs font-bold bg-[#2563EB]/10 text-[#2563EB] border border-[#2563EB]/20">
                              <GraduationCap className="w-3.5 h-3.5 text-[#2563EB]" />
                              <span>{isEn ? 'Technical & Vocational Education' : 'Enseignement Technique & Professionnel'}</span>
                            </span>
                          )}
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#0F172A] font-heading flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-[#64748B] shrink-0" />
                          <span>{item.institution}</span>
                        </h3>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-semibold text-[#475569] bg-[#F1F5F9] px-3 py-1.5 rounded-lg border border-[#CBD5E1]/60 shrink-0">
                        <Calendar className="w-3.5 h-3.5 text-[#2563EB]" />
                        <span>{item.durationOrYear}</span>
                      </div>
                    </div>

                    <p className="text-[#475569] text-xs sm:text-sm leading-relaxed mb-4">
                      {item.description}
                    </p>

                    <div className="pt-3 border-t border-[#E2E8F0] flex flex-wrap items-center justify-between gap-2 text-xs">
                      <span className="font-semibold text-[#0F172A] flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-[#2563EB]" />
                        <span>{item.status}</span>
                      </span>
                      <span className="text-[#64748B] font-medium">
                        {item.degreeOrField}
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};
