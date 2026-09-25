import React from 'react';
import { Facebook, MessageCircle, FileText, ArrowUp, Shield } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { ScrollReveal } from './ScrollReveal';
import { usePortfolio } from '../context/PortfolioContext';
import { useLanguage } from '../context/LanguageContext';
import semakoLogo from '../assets/images/semako_logo_1789639914967.jpg';

interface FooterProps {
  onOpenGuide?: () => void;
  onOpenPrint: () => void;
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenPrint, onNavigate }) => {
  const { data, isCustom } = usePortfolio();
  const { isEn } = useLanguage();

  const currentName = isCustom ? (data.identity.name || '') : PERSONAL_INFO.name;
  const currentTitle = 'Technicien informatique · UI/UX Designer · Prompt Engineer';
  const currentEmail = isCustom ? (data.identity.email || '') : PERSONAL_INFO.email;
  const currentPhone = isCustom ? (data.identity.phone || '') : PERSONAL_INFO.phone;
  const currentLocation = isCustom
    ? (data.identity.location || '')
    : (isEn ? 'Porto-Novo, Benin' : PERSONAL_INFO.location);

  const facebookUrl = isCustom
    ? (data.links?.facebook || PERSONAL_INFO.facebookUrl)
    : PERSONAL_INFO.facebookUrl;

  const whatsappUrl = isCustom
    ? (data.links?.whatsapp || PERSONAL_INFO.whatsappUrl)
    : PERSONAL_INFO.whatsappUrl;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050B14] text-[#F8FAFC] border-t border-[#0F1B2D] py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal animation="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 pb-10 border-b border-[#0F1B2D] items-start">
            
            {/* 1. Colonne Identité (bloc de gauche - 7 à 8 colonnes) */}
            <div className="md:col-span-7 lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={semakoLogo}
                  alt={currentName}
                  className="w-10 h-10 rounded-xl object-cover ring-1 ring-[#2563EB]/40 shadow-sm shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <span className="text-lg sm:text-xl font-extrabold text-[#F8FAFC] font-heading block leading-tight">
                    {currentName}
                  </span>
                  <span className="text-xs text-[#3B82F6] font-medium block">
                    {currentTitle}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#94A3B8] max-w-xl leading-relaxed">
                {isEn
                  ? 'Professional portfolio dedicated to IT hardware maintenance, smartphone diagnostics (GSM), user interface design (UI/UX), and operational prompt engineering.'
                  : 'Portfolio professionnel dédié à la maintenance informatique, au diagnostic smartphone (GSM), au design d’interfaces (UI/UX) et au prompt engineering opérationnel.'}
              </p>

              {currentLocation && (
                <div className="flex items-center gap-2 text-xs text-[#CBD5E1]">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  <span>{currentLocation}</span>
                </div>
              )}
            </div>

            {/* 2. Accès rapides & Réseaux (bloc de droite - 5 à 4 colonnes) */}
            <div className="md:col-span-5 lg:col-span-4 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#CBD5E1] block font-heading">
                {isEn ? 'Direct Access' : 'Accès & Réseaux'}
              </span>

              <div className="space-y-2 text-xs sm:text-sm">
                <button
                  type="button"
                  onClick={onOpenPrint}
                  id="footer-btn-print"
                  className="flex items-center gap-2 text-[#3B82F6] hover:text-[#60A5FA] font-medium transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4" />
                  <span>{isEn ? 'Resume PDF / Sheet' : 'Fiche CV (Imprimer / PDF)'}</span>
                </button>

                {currentEmail && (
                  <a
                    href={`mailto:${currentEmail}`}
                    className="block text-[#94A3B8] hover:text-white transition-colors truncate"
                  >
                    {currentEmail}
                  </a>
                )}

                {currentPhone && (
                  <a
                    href={`tel:${currentPhone.replace(/\s+/g, '')}`}
                    className="block text-[#94A3B8] hover:text-white transition-colors"
                  >
                    {currentPhone}
                  </a>
                )}

                {/* Réseaux sociaux réels */}
                {(facebookUrl || whatsappUrl) && (
                  <div className="pt-2 flex items-center gap-2">
                    {facebookUrl && (
                      <a
                        href={facebookUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0F1B2D] hover:bg-[#1E293B] text-[#CBD5E1] hover:text-[#3B82F6] border border-[#1E293B] text-xs transition-colors"
                        title="Facebook"
                      >
                        <Facebook className="w-3.5 h-3.5 text-[#3B82F6]" />
                        <span>Facebook</span>
                      </a>
                    )}
                    {whatsappUrl && (
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#0F1B2D] hover:bg-[#1E293B] text-[#CBD5E1] hover:text-emerald-400 border border-[#1E293B] text-xs transition-colors"
                        title="WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
                        <span>WhatsApp</span>
                      </a>
                    )}
                  </div>
                )}

                {/* Lien espace d'administration / gestion */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => onNavigate?.('/admin')}
                    id="footer-admin-link"
                    className="text-[11px] text-[#64748B] hover:text-[#94A3B8] transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <Shield className="w-3 h-3" />
                    <span>{isEn ? 'Administration portal' : 'Espace administration'}</span>
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Ligne de copyright et retour haut de page */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#64748B]">
            <p>
              © {new Date().getFullYear()} SEMako Déo-Gratias. Tous droits réservés.
            </p>

            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[#94A3B8] hover:text-[#F8FAFC] transition-colors cursor-pointer"
            >
              <span>{isEn ? 'Back to top' : 'Haut de page'}</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
};
