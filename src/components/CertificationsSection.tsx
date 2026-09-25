import React from 'react';
import {
  Award,
  Building2,
  BookmarkCheck,
} from 'lucide-react';
import { CERTIFICATIONS_LIST } from '../data/portfolioData';
import { CERTIFICATIONS_LIST_EN } from '../data/portfolioDataEn';
import { ScrollReveal } from './ScrollReveal';
import { usePortfolio } from '../context/PortfolioContext';
import { useLanguage } from '../context/LanguageContext';

const STAGGER_CLASSES = [
  'delay-100',
  'delay-200',
  'delay-300',
  'delay-400',
  'delay-500',
  'delay-600',
];

export const CertificationsSection: React.FC = () => {
  const { data, isCustom } = usePortfolio();
  const { isEn, t } = useLanguage();

  // Normalize list of certifications from context or static dataset
  const rawList =
    isCustom && data.certifications && data.certifications.length > 0
      ? data.certifications
      : isEn
      ? CERTIFICATIONS_LIST_EN
      : CERTIFICATIONS_LIST;

  const certifications = rawList.map((item: any, idx: number) => ({
    id: item.id || `cert-${idx + 1}`,
    title: item.title || '',
    issuer: item.issuer || 'MTN Skills Academy',
    type: item.type || item.status || (isEn ? 'Certificate of Completion' : 'Certificat de réussite'),
    date: item.date || item.issuedDate || '5 août 2026',
    domain: item.domain || '',
    description: item.description || '',
  }));

  return (
    <section id="certifications" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-3">
              <BookmarkCheck className="w-3.5 h-3.5 text-blue-700" />
              {t('certifications.badge')}
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
              {t('certifications.title')}
            </h2>
            <p className="text-slate-600 mt-2 text-sm sm:text-base leading-relaxed">
              {isEn
                ? 'Accreditations and certificates of completion awarded by recognized organizations and learning programs.'
                : 'Attestations et certificats de compétences obtenus auprès d’organismes et de programmes de formation reconnus.'}
            </p>
            <div className="w-16 h-1 bg-blue-600 rounded-full mt-4"></div>
          </div>
        </ScrollReveal>

        {/* Empty State */}
        {certifications.length === 0 ? (
          <div className="p-12 text-center bg-white border border-slate-200 rounded-2xl shadow-xs max-w-4xl mx-auto">
            <BookmarkCheck className="w-10 h-10 text-slate-400 mx-auto mb-3" />
            <h3 className="text-base font-semibold text-slate-800">
              {isEn ? 'No certifications listed yet' : 'Aucune certification enregistrée pour le moment'}
            </h3>
            <p className="text-xs text-slate-500 mt-1 max-w-md mx-auto">
              {isEn
                ? 'Certifications added from the administration area will appear here.'
                : 'Les certifications enregistrées dans l’espace d’administration apparaîtront ici.'}
            </p>
          </div>
        ) : (
          /* Textual Professional CV-style List */
          <div className="space-y-5 max-w-4xl">
            {certifications.map((cert, index) => (
              <ScrollReveal
                key={cert.id || index}
                animation="fade-up"
                delay={index * 120}
                duration={700}
                threshold={0.08}
                className={`scroll-reveal ${STAGGER_CLASSES[index] || 'delay-300'}`}
              >
                <div
                  id={`cert-item-${cert.id || index}`}
                  className="bg-white hover:bg-slate-50/70 rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-slate-300/90 shadow-xs hover:shadow-md transition-all duration-300 ease-out group"
                >
                  {/* Top Row: Organisme certificateur */}
                  <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wider mb-3">
                    <Building2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{cert.issuer}</span>
                  </div>

                  {/* Certification Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-heading tracking-tight mb-2">
                    {cert.title}
                  </h3>

                  {/* Type / Statut de certification & Domaine */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-800 border border-blue-100">
                      <Award className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{cert.type}</span>
                    </span>

                    {cert.domain && (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
                        {cert.domain}
                      </span>
                    )}
                  </div>

                  {/* Description textuelle sobre si disponible */}
                  {cert.description && (
                    <p className="text-slate-600 text-sm leading-relaxed pt-3 border-t border-slate-100">
                      {cert.description}
                    </p>
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
