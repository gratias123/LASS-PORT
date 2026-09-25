import React from 'react';
import { BookMarked, Clock, CheckCircle2, Wrench, Smartphone, Palette, Printer } from 'lucide-react';
import { ADDITIONAL_TRAINING } from '../data/portfolioData';
import { ADDITIONAL_TRAINING_EN } from '../data/portfolioDataEn';
import { ScrollReveal } from './ScrollReveal';
import { usePortfolio } from '../context/PortfolioContext';
import { useLanguage } from '../context/LanguageContext';

export const AdditionalTraining: React.FC = () => {
  const { data, isCustom } = usePortfolio();
  const { isEn, t } = useLanguage();

  const trainingList = isEn ? ADDITIONAL_TRAINING_EN : ADDITIONAL_TRAINING;

  const getTrainingIcon = (id: string) => {
    switch (id) {
      case 'formation-info-1an':
        return <Wrench className="w-5 h-5 text-[#2563EB]" />;
      case 'formation-maintenance-gsm':
        return <Smartphone className="w-5 h-5 text-[#2563EB]" />;
      case 'formation-graphisme':
        return <Palette className="w-5 h-5 text-[#2563EB]" />;
      case 'formation-serigraphie':
        return <Printer className="w-5 h-5 text-[#2563EB]" />;
      default:
        return <BookMarked className="w-5 h-5 text-[#2563EB]" />;
    }
  };

  return (
    <section id="formations" className="py-16 sm:py-20 bg-white border-b border-[#CBD5E1]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="max-w-3xl mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2563EB]/10 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-3 border border-[#2563EB]/20">
              <BookMarked className="w-3.5 h-3.5" />
              <span>{t('training.badge')}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-heading tracking-tight">
              {t('training.title')}
            </h2>
            <p className="text-[#475569] mt-2 text-sm sm:text-base font-normal">
              {isCustom
                ? (isEn
                    ? 'Practical workshops and technical training completed to deepen targeted expertise.'
                    : 'Formations pratiques et ateliers techniques suivis pour approfondir des compétences ciblées.')
                : (isEn
                    ? 'Hands-on training completed to develop specialized skills in IT, phone servicing, graphic design, and screen printing.'
                    : 'Formations pratiques réellement suivies pour développer des compétences spécifiques en informatique, téléphonie, graphisme et sérigraphie.')}
            </p>
            <div className="w-16 h-1 bg-[#2563EB] rounded-full mt-4" />
          </div>
        </ScrollReveal>

        {/* Training Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl">
          {isCustom && data.formations.length === 0 ? (
            <div className="col-span-full p-8 text-center bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl">
              <BookMarked className="w-8 h-8 text-[#94A3B8] mx-auto mb-2" />
              <p className="text-sm font-semibold text-[#0F172A]">
                {isEn ? 'No additional training recorded yet' : 'Aucune formation complémentaire enregistrée pour le moment'}
              </p>
            </div>
          ) : isCustom ? (
            data.formations.map((item, index) => (
              <ScrollReveal
                key={item.id || index}
                animation="fade-up"
                delay={index * 80}
                className="h-full"
              >
                <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-[#E2E8F0] shadow-xs hover:border-[#2563EB]/40 hover:shadow-md transition-all flex flex-col justify-between h-full">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#CBD5E1]/60 flex items-center justify-center mb-4 text-[#2563EB] shadow-2xs">
                      <BookMarked className="w-5 h-5 text-[#2563EB]" />
                    </div>

                    <h3 className="text-base font-bold text-[#0F172A] font-heading mb-2">
                      {item.title}
                    </h3>

                    {item.institution && (
                      <p className="text-xs text-[#2563EB] font-semibold mb-2">
                        {item.institution}
                      </p>
                    )}

                    <p className="text-xs text-[#475569] leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E2E8F0] flex flex-col gap-1.5 text-xs">
                    {item.duration && (
                      <div className="flex items-center gap-1.5 text-[#64748B]">
                        <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
                        <span>{item.duration}</span>
                      </div>
                    )}
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>{item.status || (isEn ? 'Completed' : 'Terminé')}</span>
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))
          ) : (
            trainingList.map((item, index) => (
              <ScrollReveal
                key={item.id}
                animation="fade-up"
                delay={index * 80}
                className="h-full"
              >
                <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-[#E2E8F0] shadow-xs hover:border-[#2563EB]/40 hover:shadow-md transition-all flex flex-col justify-between h-full">
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#CBD5E1]/60 flex items-center justify-center mb-4 shadow-2xs">
                      {getTrainingIcon(item.id)}
                    </div>

                    <h3 className="text-base font-bold text-[#0F172A] font-heading mb-2">
                      {item.title}
                    </h3>

                    <p className="text-xs text-[#475569] leading-relaxed mb-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#E2E8F0] flex flex-col gap-1.5 text-xs">
                    {item.duration && (
                      <div className="flex items-center gap-1.5 text-[#64748B]">
                        <Clock className="w-3.5 h-3.5 text-[#2563EB]" />
                        <span>{item.duration}</span>
                      </div>
                    )}
                    <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                      <span>{item.validationStatus}</span>
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))
          )}
        </div>
      </div>
    </section>
  );
};
