import React, { useState, useEffect } from 'react';
import { FileText, Sparkles, User as UserIcon, Menu, X, Mail, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from '../context/RouterContext';
import { usePortfolio } from '../context/PortfolioContext';
import { useLanguage } from '../context/LanguageContext';
import { PERSONAL_INFO } from '../data/portfolioData';
import semakoLogo from '../assets/images/semako_logo_1789639914967.jpg';
import { PWAInstallButton } from './pwa/PWAInstallButton';

interface NavbarProps {
  onOpenPrint: () => void;
  onNavigate?: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPrint, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const { isEn, t } = useLanguage();
  const router = useRouter();

  let currentName = PERSONAL_INFO.name;
  try {
    const portfolio = usePortfolio();
    if (portfolio?.isCustom && portfolio?.data?.identity?.name) {
      currentName = portfolio.data.identity.name;
    }
  } catch {
    currentName = PERSONAL_INFO.name;
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;

      // 1. Toujours visible tout en haut de la page (scrollY proche de 0)
      if (scrollY <= 30) {
        setIsHeroVisible(true);
        setIsScrolled(false);
        return;
      }

      // 2. Détection dynamique de la section hero (#accueil)
      const heroEl = document.getElementById('accueil');
      if (heroEl) {
        const heroRect = heroEl.getBoundingClientRect();
        // Visible tant que l'utilisateur est dans la première section (hero)
        // Disparaît dès qu'on quitte le hero pour entrer dans les sections suivantes
        const inHero = heroRect.bottom > 60;
        setIsHeroVisible(inHero);
      } else {
        // Repli sécurisé si l'élément hero n'est pas trouvé
        setIsHeroVisible(scrollY < 500);
      }

      setIsScrolled(scrollY > 15);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  // Fermer le menu mobile lorsque le header est masqué
  useEffect(() => {
    if (!isHeroVisible) {
      setIsMobileMenuOpen(false);
    }
  }, [isHeroVisible]);

  const handleCreatePortfolioClick = () => {
    setIsMobileMenuOpen(false);
    if (onNavigate) {
      if (isAuthenticated) {
        onNavigate('/mon-espace');
      } else {
        onNavigate('/connexion');
      }
    } else {
      if (isAuthenticated) {
        router.navigate('/mon-espace');
      } else {
        router.navigate('/connexion');
      }
    }
  };

  const displayName = user?.fullName ? user.fullName.split(' ')[0] : 'Profil';

  const navLinks = [
    { href: '#accueil', label: isEn ? 'Home' : 'Accueil' },
    { href: '#a-propos', label: isEn ? 'About' : 'À propos' },
    { href: '#competences', label: isEn ? 'Skills' : 'Compétences' },
    { href: '#projets', label: isEn ? 'Projects' : 'Projets' },
    { href: '#experiences', label: isEn ? 'Journey' : 'Parcours' },
    { href: '#contact', label: isEn ? 'Contact' : 'Contact' },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out w-full max-w-[100vw] overflow-x-hidden ${
        isHeroVisible
          ? 'translate-y-0 opacity-100 visible pointer-events-auto'
          : '-translate-y-full opacity-0 invisible pointer-events-none'
      } ${
        isScrolled
          ? 'bg-[#08111F]/95 backdrop-blur-md border-b border-[#0F1B2D] shadow-lg shadow-black/20 py-2.5 sm:py-3'
          : 'bg-[#08111F]/85 backdrop-blur-sm border-b border-[#0F1B2D]/80 py-3 sm:py-4'
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          
          {/* 1. GAUCHE: IDENTITÉ & LOGO */}
          <a
            href="#accueil"
            className="flex items-center gap-2.5 text-white font-bold text-sm tracking-tight hover:text-[#3B82F6] transition-colors group shrink-0 min-w-0"
            title={`${currentName} - ${t('nav.home')}`}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <div className="relative">
              <img
                src={semakoLogo}
                alt="Logo SEMAKO"
                className="w-8 h-8 rounded-lg object-cover ring-1 ring-[#2563EB]/40 group-hover:ring-[#3B82F6] shadow-sm transition-all"
                referrerPolicy="no-referrer"
              />
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-[#08111F]" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-heading font-extrabold text-white text-sm sm:text-base leading-tight truncate">
                {currentName}
              </span>
              <span className="text-[10px] text-[#94A3B8] font-medium tracking-wide uppercase leading-none hidden sm:block">
                IT · UI/UX · PROMPT ENG.
              </span>
            </div>
          </a>

          {/* 2. CENTRE: NAVIGATION CLAIRE (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-xs xl:text-sm font-medium text-[#CBD5E1] hover:text-white hover:bg-[#0F1B2D] transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* 3. DROITE: BOUTONS D'ACTIONS (Desktop & Mobile) */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* PWA Button */}
            <div className="hidden sm:block">
              <PWAInstallButton variant="navbar" />
            </div>

            {/* Bouton Fiche CV (toujours accessible) */}
            <button
              type="button"
              onClick={onOpenPrint}
              id="btn-nav-print"
              title={t('nav.resume')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 text-xs font-semibold text-[#F8FAFC] bg-[#0F1B2D] hover:bg-[#1A2E4B] rounded-lg border border-[#1E293B] hover:border-[#2563EB]/50 transition-all shadow-xs cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            >
              <FileText className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
              <span>{t('nav.resume')}</span>
            </button>

            {/* Bouton d'action principal: Me contacter (Desktop) */}
            <a
              href="#contact"
              id="btn-nav-contact"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] active:bg-[#1E40AF] rounded-lg shadow-sm shadow-[#2563EB]/25 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#3B82F6]"
            >
              <Mail className="w-3.5 h-3.5 shrink-0" />
              <span>{isEn ? 'Get in Touch' : 'Me contacter'}</span>
            </a>

            {/* Bouton: Créer mon portfolio / Mon espace (Desktop) */}
            <button
              type="button"
              onClick={handleCreatePortfolioClick}
              id="btn-nav-create-portfolio"
              title={isAuthenticated ? t('nav.mySpace') : t('nav.createPortfolio')}
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#94A3B8] hover:text-[#CBD5E1] hover:bg-[#0F1B2D] rounded-lg transition-colors cursor-pointer"
            >
              {isAuthenticated ? (
                <>
                  <UserIcon className="w-3.5 h-3.5 text-[#3B82F6] shrink-0" />
                  <span>{displayName}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{t('nav.createPortfolio')}</span>
                </>
              )}
            </button>

            {/* Bouton Hamburger Menu (Mobile / Tablette) */}
            <button
              type="button"
              id="btn-mobile-menu-toggle"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-[#CBD5E1] hover:text-white bg-[#0F1B2D] border border-[#1E293B] focus:outline-none focus:ring-2 focus:ring-[#2563EB] transition-colors"
              aria-label={isMobileMenuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-[#CBD5E1]" />
              )}
            </button>
          </div>

        </div>
      </div>

      {/* 4. MENU DÉROULANT MOBILE (Élégant, sobre, sans débordement) */}
      {isMobileMenuOpen && (
        <div
          id="mobile-nav-menu"
          className="lg:hidden bg-[#08111F]/98 border-b border-[#0F1B2D] shadow-2xl px-4 py-4 backdrop-blur-xl animate-fade-in"
        >
          <div className="flex flex-col space-y-1 pb-3 border-b border-[#0F1B2D]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium text-[#CBD5E1] hover:text-white hover:bg-[#0F1B2D] transition-colors"
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 text-[#94A3B8]" />
              </a>
            ))}
          </div>

          <div className="pt-3 flex flex-col gap-2">
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-semibold text-white bg-[#2563EB] hover:bg-[#1D4ED8] rounded-lg shadow-sm transition-all"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{isEn ? 'Get in Touch' : 'Me contacter'}</span>
            </a>

            <button
              type="button"
              onClick={handleCreatePortfolioClick}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-[#CBD5E1] bg-[#0F1B2D] hover:bg-[#1A2E4B] rounded-lg border border-[#1E293B] transition-colors"
            >
              {isAuthenticated ? (
                <>
                  <UserIcon className="w-3.5 h-3.5 text-[#3B82F6]" />
                  <span>{t('nav.mySpace')} ({displayName})</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t('nav.createPortfolio')}</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
