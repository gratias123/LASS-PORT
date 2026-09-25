import React from 'react';
import {
  MapPin,
  Mail,
  Phone,
  ArrowDown,
  FileText,
  CheckCircle2,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onExploreClick: () => void;
  onOpenPrint?: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onOpenPrint }) => {
  const portfolio = usePortfolio();
  const { isEn, t } = useLanguage();
  const data = portfolio?.data;
  const isCustom = portfolio?.isCustom ?? false;
  const handleOpenPrint = onOpenPrint || portfolio?.onOpenPrint;

  const [copiedField, setCopiedField] = React.useState<'email' | 'phone' | null>(null);

  // Extraction dynamique des données du profil
  const photoUrl = data?.identity?.photoUrl?.trim() || '/profile.jpg';
  const fullName = data?.identity?.name?.trim() || 'SEMako Déo-Gratias';
  
  // Titre professionnel hiérarchisé selon les directives strictes
  const professionalTitle = 'TECHNICIEN INFORMATIQUE · UI/UX DESIGNER · PROMPT ENGINEER';

  const shortBio =
    data?.about?.heroSummary?.trim() ||
    data?.about?.tagline?.trim() ||
    (isEn
      ? 'Specialized in computer systems maintenance, smartphone diagnostics (GSM), interface design (UI/UX), and operational prompt engineering. Delivering reliable digital solutions.'
      : 'Spécialisé dans la maintenance informatique, le diagnostic smartphone (GSM), la conception d’interfaces UI/UX et le prompt engineering opérationnel. Au service de solutions numériques fiables et rigoureuses.');

  const email = data?.identity?.email?.trim() || 'semakodeogratias2@gmail.com';
  const phone = data?.identity?.phone?.trim() || '+229 01 54 86 58 57';
  const location = data?.identity?.location?.trim() || 'Porto-Novo, Bénin';

  const copyToClipboard = (text: string, field: 'email' | 'phone') => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <section
      id="accueil"
      className="relative bg-[#08111F] text-[#F8FAFC] overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-20 lg:pt-40 lg:pb-24 border-b border-[#0F1B2D]"
    >
      {/* Background subtil technique */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
          backgroundSize: '36px 36px',
        }}
      />
      {/* Léger halo d'ambiance bleu électrique très diffus en arrière-plan */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#2563EB]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="space-y-10 sm:space-y-12 animate-fade-in-up">
          
          {/* ================================================================= */}
          {/* COMPOSITION PRINCIPALE : PHOTO + PRÉSENTATION FORTE               */}
          {/* ================================================================= */}
          <div
            id="hero-profile-container"
            className="w-full md:max-w-[880px] lg:max-w-[1080px] mx-auto box-border"
          >
            <div className="flex flex-col md:grid md:grid-cols-[210px_minmax(0,1fr)] lg:grid-cols-[250px_minmax(0,1fr)] md:items-start gap-6 sm:gap-8 lg:gap-12 w-full">
              
              {/* ------------------------------------------------------------- */}
              {/* 1. COLONNE PHOTO (GAUCHE) : INTÉGRATION HAUT DE GAMME         */}
              {/* Cadrage propre, coins arrondis, bordure fine, léger halo bleu */}
              {/* ------------------------------------------------------------- */}
              <div className="shrink-0 flex flex-col items-center md:items-start justify-start">
                <div
                  id="hero-profile-photo-container"
                  className="relative w-36 h-44 sm:w-44 sm:h-52 md:w-[210px] md:h-[270px] lg:w-[250px] lg:h-[310px] rounded-2xl overflow-hidden bg-[#0F1B2D] border border-[#1E293B] shadow-[0_0_35px_rgba(37,99,235,0.18)] ring-1 ring-[#2563EB]/25 shrink-0 group transition-all duration-300"
                >
                  <img
                    id="hero-profile-photo"
                    src={photoUrl}
                    alt={fullName}
                    className="w-full h-full object-cover object-top filter brightness-[1.02] contrast-[1.04]"
                    referrerPolicy="no-referrer"
                    loading="eager"
                  />
                </div>
              </div>

              {/* ------------------------------------------------------------- */}
              {/* 2. COLONNE DROITE : HIÉRARCHIE FORTE & COORDONNÉES COMPACTES */}
              {/* ------------------------------------------------------------- */}
              <div className="w-full max-w-full min-w-0 flex flex-col justify-start text-center md:text-left">
                
                {/* 2A. Nom principal - Fort et immédiatement identifiable */}
                <h1
                  id="hero-profile-name"
                  className="text-3xl sm:text-4xl md:text-[40px] lg:text-[46px] font-extrabold tracking-tight text-[#F8FAFC] font-heading leading-tight w-full max-w-full break-words"
                >
                  {fullName}
                </h1>

                {/* 2B. Titre professionnel net */}
                <div className="mt-2 sm:mt-2.5">
                  <span
                    id="hero-profile-title"
                    className="inline-block text-xs sm:text-sm md:text-[15px] font-bold text-[#3B82F6] font-heading tracking-wider uppercase"
                  >
                    {professionalTitle}
                  </span>
                </div>

                {/* 2C. Présentation professionnelle claire */}
                <p
                  id="hero-profile-bio"
                  className="text-sm sm:text-base md:text-[15.5px] text-[#CBD5E1] font-normal leading-relaxed w-full max-w-[720px] mt-3.5 sm:mt-4"
                >
                  {shortBio}
                </p>

                {/* 2D. CARTE COORDONNÉES MODERNE ET COMPACTE */}
                <div className="w-full max-w-full mt-5 sm:mt-6 box-border">
                  <div
                    id="hero-contact-card"
                    className="w-full max-w-full bg-[#0F1B2D]/90 border border-[#1E293B] rounded-xl p-3.5 sm:p-4 shadow-sm backdrop-blur-md flex flex-col gap-2.5"
                  >
                    <div className="pb-2 border-b border-[#1E293B]">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#94A3B8] font-heading block">
                        {isEn ? 'Direct Contact' : 'Coordonnées directes'}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left">
                      {/* Email */}
                      <div className="flex items-center justify-between sm:justify-start gap-2.5 p-1.5 rounded-lg hover:bg-[#1A2E4B]/50 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-[#2563EB]/15 border border-[#2563EB]/30 flex items-center justify-center text-[#3B82F6] shrink-0">
                          <Mail className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="block text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider leading-none">
                            Email
                          </span>
                          <a
                            href={`mailto:${email}`}
                            className="text-xs font-medium text-[#F8FAFC] hover:text-[#3B82F6] transition-colors truncate block mt-0.5"
                            title={email}
                          >
                            {email}
                          </a>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(email, 'email')}
                          className="p-1 text-[#94A3B8] hover:text-white transition-colors cursor-pointer shrink-0"
                          title="Copier l'email"
                        >
                          {copiedField === 'email' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Téléphone */}
                      <div className="flex items-center justify-between sm:justify-start gap-2.5 p-1.5 rounded-lg hover:bg-[#1A2E4B]/50 transition-colors">
                        <div className="w-8 h-8 rounded-lg bg-[#2563EB]/15 border border-[#2563EB]/30 flex items-center justify-center text-[#3B82F6] shrink-0">
                          <Phone className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="block text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider leading-none">
                            {isEn ? 'Phone' : 'Téléphone'}
                          </span>
                          <a
                            href={`tel:${phone.replace(/\s+/g, '')}`}
                            className="text-xs font-medium text-[#F8FAFC] hover:text-[#3B82F6] transition-colors truncate block mt-0.5"
                            title={phone}
                          >
                            {phone}
                          </a>
                        </div>
                        <button
                          type="button"
                          onClick={() => copyToClipboard(phone, 'phone')}
                          className="p-1 text-[#94A3B8] hover:text-white transition-colors cursor-pointer shrink-0"
                          title="Copier le numéro"
                        >
                          {copiedField === 'phone' ? (
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Localisation */}
                      <div className="flex items-center gap-2.5 p-1.5 rounded-lg">
                        <div className="w-8 h-8 rounded-lg bg-[#2563EB]/15 border border-[#2563EB]/30 flex items-center justify-center text-[#3B82F6] shrink-0">
                          <MapPin className="w-4 h-4" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <span className="block text-[10px] font-semibold text-[#94A3B8] uppercase tracking-wider leading-none">
                            {isEn ? 'Location' : 'Localisation'}
                          </span>
                          <span className="text-xs font-medium text-[#F8FAFC] block mt-0.5 truncate">
                            {location}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* ================================================================= */}
          {/* LES 3 BOUTONS PRINCIPAUX DEMANDÉS                                 */}
          {/* « Découvrir mon parcours » (Bleu électrique prioritaire)          */}
          {/* « Fiche CV »                                                      */}
          {/* « Me contacter »                                                  */}
          {/* ================================================================= */}
          <div className="w-full md:max-w-[880px] lg:max-w-[1080px] mx-auto pt-6 sm:pt-8 border-t border-[#0F1B2D] flex flex-col sm:flex-row items-center justify-between gap-4">
            
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 w-full sm:w-auto">
              {/* 1. Bouton principal: Découvrir mon parcours */}
              <button
                type="button"
                onClick={onExploreClick}
                id="btn-hero-explore"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] text-white font-bold text-sm transition-all shadow-md shadow-[#2563EB]/30 hover:shadow-lg focus:ring-2 focus:ring-[#3B82F6] focus:outline-none cursor-pointer w-full sm:w-auto"
              >
                <span>{isEn ? 'Explore My Journey' : 'Découvrir mon parcours'}</span>
                <ArrowDown className="w-4 h-4 animate-bounce" />
              </button>

              {/* 2. Bouton secondaire: Fiche CV */}
              {handleOpenPrint && (
                <button
                  type="button"
                  onClick={handleOpenPrint}
                  id="btn-hero-print"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0F1B2D] hover:bg-[#1A2E4B] text-[#F8FAFC] font-semibold text-sm transition-colors border border-[#1E293B] hover:border-[#2563EB]/50 focus:ring-2 focus:ring-[#2563EB] focus:outline-none w-full sm:w-auto cursor-pointer shadow-xs"
                >
                  <FileText className="w-4 h-4 text-[#3B82F6]" />
                  <span>{t('nav.resume')}</span>
                </button>
              )}

              {/* 3. Bouton secondaire: Me contacter */}
              <a
                href="#contact"
                id="btn-hero-contact"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#0F1B2D] hover:bg-[#1A2E4B] text-[#F8FAFC] font-semibold text-sm transition-colors border border-[#1E293B] hover:border-[#2563EB]/50 focus:ring-2 focus:ring-[#2563EB] focus:outline-none w-full sm:w-auto cursor-pointer shadow-xs"
              >
                <Mail className="w-4 h-4 text-[#3B82F6]" />
                <span>{isEn ? 'Contact Me' : 'Me contacter'}</span>
              </a>
            </div>

            {/* Disponibilité professionnelle */}
            <div className="flex items-center gap-2 text-xs text-[#94A3B8] text-center sm:text-right">
              <CheckCircle2 className="w-4 h-4 text-[#3B82F6] shrink-0" />
              <span>
                {isEn
                  ? `Available for technical assignments in ${location}.`
                  : `Disponible pour missions techniques à ${location}.`}
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
