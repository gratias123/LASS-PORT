import React, { useState, useMemo } from 'react';
import {
  Wrench,
  Smartphone,
  Palette,
  Layers,
  Layout,
  Globe,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/portfolioData';
import { SKILL_CATEGORIES_EN } from '../data/portfolioDataEn';
import { ScrollReveal } from './ScrollReveal';
import { usePortfolio } from '../context/PortfolioContext';
import { useLanguage } from '../context/LanguageContext';

interface SkillCategoryDisplay {
  id: string;
  title: string;
  description: string;
  iconName: string;
  skills: Array<{ name: string; levelOrDesc?: string }>;
}

export const SkillsSection: React.FC = () => {
  const { data, isCustom } = usePortfolio();
  const { isEn, t } = useLanguage();

  // Selected category defaults to "Informatique & Maintenance"
  const [activeCategory, setActiveCategory] = useState<string>('Informatique & Maintenance');

  const baseCategories = isEn ? SKILL_CATEGORIES_EN : SKILL_CATEGORIES;

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Wrench':
        return <Wrench className="w-5 h-5 text-blue-600" />;
      case 'Smartphone':
        return <Smartphone className="w-5 h-5 text-blue-600" />;
      case 'Palette':
        return <Palette className="w-5 h-5 text-blue-600" />;
      case 'Layers':
        return <Layers className="w-5 h-5 text-blue-600" />;
      case 'Layout':
        return <Layout className="w-5 h-5 text-blue-600" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-blue-600" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-blue-600" />;
      default:
        return <Wrench className="w-5 h-5 text-blue-600" />;
    }
  };

  // Group custom skills by category
  const customCategories = useMemo<SkillCategoryDisplay[]>(() => {
    if (!isCustom) return [];
    const map = new Map<string, Array<{ name: string; levelOrDesc?: string }>>();
    data.skills.forEach((s) => {
      const cat = s.category || (isEn ? 'General' : 'Général');
      if (!map.has(cat)) {
        map.set(cat, []);
      }
      map.get(cat)!.push({ name: s.name, levelOrDesc: s.levelOrDesc });
    });

    return Array.from(map.entries()).map(([title, skills], idx) => {
      const lower = title.toLowerCase();
      let icon = 'Wrench';
      let description = isEn
        ? `Key skills and proficiencies in ${title}.`
        : `Compétences et savoir-faire clés en ${title}.`;

      if (lower.includes('informatique') || lower.includes('it & maintenance') || lower.includes('computer')) {
        icon = 'Wrench';
        description = isEn
          ? 'Hardware diagnostics, workstation repairs, and operational maintenance of computer networks.'
          : 'Diagnostic, réparation matérielle et maintien opérationnel des postes informatiques et réseaux.';
      } else if (lower.includes('gsm') || lower.includes('mobile') || lower.includes('smartphone') || lower.includes('téléphonie')) {
        icon = 'Smartphone';
        description = isEn
          ? 'Technical troubleshooting and repairs on mobile phones and portable devices.'
          : 'Interventions techniques et réparations sur téléphones portables et appareils mobiles.';
      } else if (lower.includes('design graphique') || lower.includes('graphic design') || (lower.includes('graphique') && !lower.includes('outil'))) {
        icon = 'Palette';
        description = isEn
          ? 'Visual creation, communication media composition, and image editing.'
          : 'Création visuelle, composition de supports de communication et traitement de l’image.';
      } else if (lower.includes('outil') && lower.includes('design')) {
        icon = 'Layers';
        description = isEn
          ? 'Software and digital tools utilized for visual composition and prototyping.'
          : 'Logiciels et plateformes utilisés pour la création visuelle et le maquettage.';
      } else if (lower.includes('web') || lower.includes('logiciel') || lower.includes('réseau') || lower.includes('network') || lower.includes('numérique')) {
        icon = 'Globe';
        description = isEn
          ? 'Front-end development technologies and digital productivity tools.'
          : 'Technologies d’intégration front-end et outils de travail pour le numérique.';
      } else if (lower.includes('prompt') || lower.includes('ia') || lower.includes('intelligence')) {
        icon = 'Sparkles';
        description = isEn
          ? 'Structuring complex prompts, AI-assisted automation, and digital solution prototyping.'
          : 'Conception de requêtes structurées, automatisation assistée par IA et prototypage de solutions numériques.';
      }

      return {
        id: `custom-cat-${idx}`,
        title,
        description,
        iconName: icon,
        skills,
      };
    });
  }, [isCustom, data.skills, isEn]);

  // Base normalized categories if not custom
  const baseNormalizedCategories = useMemo<SkillCategoryDisplay[]>(() => {
    return baseCategories.map((c) => ({
      id: c.id,
      title: c.title,
      description: c.description,
      iconName: c.iconName,
      skills: c.skills.map((s) => ({ name: s })),
    }));
  }, [baseCategories]);

  // Strict Canonical Category Order requested:
  // 1. Informatique & Maintenance
  // 2. Maintenance GSM
  // 3. Design Graphique
  // 4. Outils de Design
  // 5. Outils Web & Logiciels
  // 6. Prompt Engineering
  const getCategorySortIndex = (title: string): number => {
    const t = title.toLowerCase().trim();
    if (t.includes('informatique') || t.includes('it & maintenance') || t.includes('computer')) return 0;
    if (t.includes('gsm') || t.includes('smartphone') || t.includes('téléphonie')) return 1;
    if (t.includes('design graphique') || t.includes('graphic design') || (t.includes('graphique') && !t.includes('outils'))) return 2;
    if (t.includes('outils de design') || t.includes('design tools')) return 3;
    if (t.includes('outils web') || t.includes('logiciels') || t.includes('web & outils') || t.includes('web & digital') || t.includes('web & software')) return 4;
    if (t.includes('prompt') || t.includes('ia') || t.includes('engineering')) return 5;
    return 99;
  };

  const orderedCategories = useMemo(() => {
    const rawList = isCustom ? customCategories : baseNormalizedCategories;
    return rawList.slice().sort((a, b) => getCategorySortIndex(a.title) - getCategorySortIndex(b.title));
  }, [isCustom, customCategories, baseNormalizedCategories]);

  // Determine whether "Toutes" is selected
  const isAllActive =
    activeCategory === 'Toutes' ||
    activeCategory === 'all' ||
    activeCategory === 'All' ||
    activeCategory.startsWith('Toutes') ||
    activeCategory.startsWith('All');

  // Matching helper for category filter selection
  const isCategoryMatch = (catTitle: string, targetCategory: string) => {
    if (isAllActive) return true;
    const cleanCat = catTitle.toLowerCase().trim();
    const cleanTarget = targetCategory.toLowerCase().trim();
    if (cleanCat === cleanTarget) return true;
    if (
      (cleanTarget.includes('informatique') || cleanTarget.includes('it & maintenance')) &&
      (cleanCat.includes('informatique') || cleanCat.includes('it & maintenance'))
    ) {
      return true;
    }
    if (
      (cleanTarget.includes('gsm') || cleanTarget.includes('smartphone')) &&
      (cleanCat.includes('gsm') || cleanCat.includes('smartphone'))
    ) {
      return true;
    }
    if (
      (cleanTarget.includes('design graphique') || cleanTarget.includes('graphic design')) &&
      (cleanCat.includes('design graphique') || cleanCat.includes('graphic design'))
    ) {
      return true;
    }
    if (
      (cleanTarget.includes('outils de design') || cleanTarget.includes('design tools')) &&
      (cleanCat.includes('outils de design') || cleanCat.includes('design tools'))
    ) {
      return true;
    }
    if (
      (cleanTarget.includes('outils web') || cleanTarget.includes('web & outils') || cleanTarget.includes('web & software')) &&
      (cleanCat.includes('outils web') || cleanCat.includes('web & outils') || cleanCat.includes('web & digital') || cleanCat.includes('web & software'))
    ) {
      return true;
    }
    if (cleanTarget.includes('prompt') && cleanCat.includes('prompt')) {
      return true;
    }
    return false;
  };

  // Only the selected category is active in blue; when "Toutes" is selected, only "Toutes" is active
  const isButtonActive = (catTitle: string) => {
    if (isAllActive) return false;
    return isCategoryMatch(catTitle, activeCategory);
  };

  // Categories to display: either all 6 when "Toutes" is clicked, or ONLY the active category
  const categoriesToDisplay = useMemo(() => {
    if (isAllActive) {
      return orderedCategories;
    }
    return orderedCategories.filter((cat) => isCategoryMatch(cat.title, activeCategory));
  }, [orderedCategories, isAllActive, activeCategory]);

  return (
    <section id="competences" className="py-16 sm:py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-100 text-blue-800 text-xs font-semibold uppercase tracking-wider mb-2">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {t('skills.badge')}
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-heading tracking-tight">
                {t('skills.title')}
              </h2>
              <p className="text-slate-600 mt-2 text-sm sm:text-base">
                {isEn
                  ? 'Methodical organization of technical and practical skills, without artificial percentages.'
                  : 'Organisation méthodique des compétences techniques et pratiques, sans pourcentages artificiels.'}
              </p>
              <div className="w-16 h-1 bg-blue-600 rounded-full mt-3"></div>
            </div>

            {/* Filter Pills with Requested Order:
                1. Informatique & Maintenance
                2. Maintenance GSM
                3. Design Graphique
                4. Outils de Design
                5. Outils Web & Logiciels
                6. Prompt Engineering
                7. Toutes (6) - positioned strictly at the end */}
            <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Filtres des compétences">
              {orderedCategories.map((category) => {
                const active = isButtonActive(category.title);
                return (
                  <button
                    key={category.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setActiveCategory(category.title)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                      active
                        ? 'bg-[#2563EB] text-white shadow-sm shadow-[#2563EB]/25 font-semibold ring-1 ring-[#2563EB]'
                        : 'bg-white text-[#334155] hover:bg-[#F8FAFC] border border-[#CBD5E1] hover:border-[#2563EB]/50 hover:text-[#0F172A]'
                    }`}
                  >
                    {category.title}
                  </button>
                );
              })}

              {/* "Toutes (6)" is strictly the LAST button in the list */}
              <button
                type="button"
                role="tab"
                aria-selected={isAllActive}
                onClick={() => setActiveCategory('Toutes')}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
                  isAllActive
                    ? 'bg-[#2563EB] text-white shadow-sm shadow-[#2563EB]/25 font-semibold ring-1 ring-[#2563EB]'
                    : 'bg-white text-[#334155] hover:bg-[#F8FAFC] border border-[#CBD5E1] hover:border-[#2563EB]/50 hover:text-[#0F172A]'
                }`}
              >
                {isEn ? `All (${orderedCategories.length})` : `Toutes (${orderedCategories.length})`}
              </button>
            </div>
          </div>
        </ScrollReveal>

        {/* Skills Cards Grid with smooth transition */}
        <div
          key={activeCategory}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in transition-opacity duration-300"
        >
          {orderedCategories.length === 0 ? (
            <div className="col-span-full p-8 text-center bg-slate-50 border border-slate-200 rounded-2xl">
              <Layers className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <p className="text-sm font-semibold text-slate-700">
                {isEn ? 'No skills added yet' : 'Aucune compétence ajoutée pour le moment'}
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {isEn
                  ? 'Add your technical or general skills in the portfolio builder.'
                  : "Ajoutez vos compétences techniques ou générales dans l'éditeur de portfolio."}
              </p>
            </div>
          ) : (
            categoriesToDisplay.map((category, index) => (
              <ScrollReveal
                key={category.id + '-' + activeCategory}
                animation="fade-up"
                delay={isAllActive ? index * 60 : 0}
                className="h-full"
              >
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                        {getIcon(category.iconName)}
                      </div>
                      <div>
                        <h3 className="text-sm sm:text-base font-bold text-slate-900 font-heading leading-tight">
                          {category.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                      {category.description}
                    </p>

                    <ul className="space-y-2 mb-2">
                      {category.skills.map((skill, sIdx) => {
                        const isSerigraphie = skill.name === 'Sérigraphie' || skill.name === 'Screen Printing';
                        return (
                          <li key={sIdx} className="flex items-start gap-2 text-xs text-slate-700">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                            <div className="leading-snug">
                              <span className={isSerigraphie ? 'font-semibold text-slate-900' : 'font-medium text-slate-900'}>
                                {skill.name}
                              </span>
                              {skill.levelOrDesc ? (
                                <span className="block text-[11px] text-blue-700 font-medium mt-0.5">
                                  {skill.levelOrDesc}
                                </span>
                              ) : isSerigraphie ? (
                                <span className="block text-[11px] text-blue-700 font-medium mt-0.5">
                                  {isEn
                                    ? 'Complementary skill related to graphic design and visual creation'
                                    : 'Compétence complémentaire liée au graphisme et à la création visuelle'}
                                </span>
                              ) : null}
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>
              </ScrollReveal>
            ))
          )}
        </div>

        {/* Note on approach */}
        <ScrollReveal animation="fade-up" delay={150}>
          <div className="mt-8 p-4 rounded-xl bg-white border border-slate-200 flex items-center justify-between flex-wrap gap-3 text-xs text-slate-600">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span>
                <strong>{isEn ? 'Hands-on practice: ' : 'Pratique concrète : '}</strong>
                {isEn
                  ? 'Skills developed through direct lab and workshop manipulation, practical training, and continuous learning.'
                  : "Compétences développées par la manipulation directe en atelier, la formation et l'apprentissage continu."}
              </span>
            </span>
            <a
              href="#experiences"
              className="text-blue-600 font-semibold hover:underline"
            >
              {isEn ? 'View practical experiences →' : 'Consulter les expériences pratiques →'}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
