import React, { useState, useMemo } from 'react';
import {
  Layers,
  Code,
  FileCode,
  Palette,
  Terminal,
  Grid,
  GitBranch,
  Sparkles,
  Layout,
  Image as ImageIcon,
  Cpu,
  Wrench,
  Zap,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { DIGITAL_TOOLS } from '../data/portfolioData';
import { DIGITAL_TOOLS_EN } from '../data/portfolioDataEn';
import { ScrollReveal } from './ScrollReveal';
import { usePortfolio } from '../context/PortfolioContext';
import { useLanguage } from '../context/LanguageContext';

interface NormalizedTool {
  id: string;
  name: string;
  categoryGroup: 'INFORMATIQUE' | 'DESIGN' | 'WEB' | 'IA' | 'MAINTENANCE';
  rawCategory: string;
  description: string;
  level: string;
  icon?: string;
}

export const ToolsSection: React.FC = () => {
  const { data, isCustom } = usePortfolio();
  const { isEn, t } = useLanguage();
  const [selectedGroup, setSelectedGroup] = useState<string>('all');
  const [showAll, setShowAll] = useState<boolean>(false);

  const handleSelectGroup = (groupId: string) => {
    setSelectedGroup(groupId);
    setShowAll(false);
  };

  const groups = [
    { id: 'all', label: isEn ? 'All' : 'Tous' },
    { id: 'INFORMATIQUE', label: 'INFORMATIQUE' },
    { id: 'DESIGN', label: 'DESIGN' },
    { id: 'WEB', label: 'WEB' },
    { id: 'IA', label: 'IA' },
    { id: 'MAINTENANCE', label: 'MAINTENANCE' },
  ];

  const assignGroup = (name: string, category: string): 'INFORMATIQUE' | 'DESIGN' | 'WEB' | 'IA' | 'MAINTENANCE' => {
    const combined = `${name} ${category}`.toLowerCase();
    if (combined.includes('chatgpt') || combined.includes('gemini') || combined.includes('claude') || combined.includes('ia') || combined.includes('ai') || combined.includes('prompt')) {
      return 'IA';
    }
    if (combined.includes('gsm') || combined.includes('soudure') || combined.includes('multimètre') || combined.includes('station') || combined.includes('dépannage') || combined.includes('réparation')) {
      return 'MAINTENANCE';
    }
    if (combined.includes('photoshop') || combined.includes('figma') || combined.includes('xd') || combined.includes('canva') || combined.includes('photopea') || combined.includes('design') || combined.includes('ui/ux')) {
      return 'DESIGN';
    }
    if (combined.includes('html') || combined.includes('css') || combined.includes('javascript') || combined.includes('js') || combined.includes('bootstrap') || combined.includes('git') || combined.includes('web')) {
      return 'WEB';
    }
    return 'INFORMATIQUE';
  };

  const getToolIcon = (toolName: string) => {
    const normalized = toolName.toLowerCase().trim();
    if (normalized.includes('photoshop') || normalized.includes('photopea')) {
      return <ImageIcon className="w-5 h-5 text-[#2563EB]" />;
    }
    if (normalized.includes('figma') || normalized.includes('adobe xd') || normalized.includes('xd')) {
      return <Layout className="w-5 h-5 text-[#2563EB]" />;
    }
    if (
      normalized.includes('canva') ||
      normalized.includes('chatgpt') ||
      normalized.includes('gemini') ||
      normalized.includes('claude') ||
      normalized.includes('ia') ||
      normalized.includes('ai')
    ) {
      return <Sparkles className="w-5 h-5 text-[#2563EB]" />;
    }
    if (normalized.includes('vscode') || normalized.includes('visual studio') || normalized.includes('code')) {
      return <Code className="w-5 h-5 text-[#2563EB]" />;
    }
    if (normalized.includes('html')) {
      return <FileCode className="w-5 h-5 text-[#2563EB]" />;
    }
    if (normalized.includes('css')) {
      return <Palette className="w-5 h-5 text-[#2563EB]" />;
    }
    if (normalized.includes('javascript') || normalized === 'js') {
      return <Terminal className="w-5 h-5 text-[#2563EB]" />;
    }
    if (normalized.includes('bootstrap')) {
      return <Grid className="w-5 h-5 text-[#2563EB]" />;
    }
    if (normalized.includes('git')) {
      return <GitBranch className="w-5 h-5 text-[#2563EB]" />;
    }
    if (normalized.includes('station') || normalized.includes('soudure') || normalized.includes('gsm')) {
      return <Wrench className="w-5 h-5 text-[#2563EB]" />;
    }
    if (normalized.includes('multimètre') || normalized.includes('multimetre') || normalized.includes('câblage')) {
      return <Zap className="w-5 h-5 text-[#2563EB]" />;
    }
    return <Cpu className="w-5 h-5 text-[#2563EB]" />;
  };

  const rawTools = isEn ? DIGITAL_TOOLS_EN : DIGITAL_TOOLS;

  const allTools: NormalizedTool[] = useMemo(() => {
    if (isCustom && data.tools) {
      return data.tools.map((item, idx) => {
        const name = typeof item === 'string' ? item : item.name;
        const rawCat = typeof item === 'string' ? '' : (item.category || '');
        const desc = typeof item === 'string' ? '' : (item.description || '');
        const level = typeof item === 'string' ? (isEn ? 'Practiced' : 'Pratiqué') : (item.level || (isEn ? 'Practiced' : 'Pratiqué'));
        return {
          id: `custom-tool-${idx}`,
          name,
          categoryGroup: assignGroup(name, rawCat),
          rawCategory: rawCat,
          description: desc,
          level,
        };
      });
    }

    return rawTools.map((t, idx) => ({
      id: `tool-${idx}`,
      name: t.name,
      categoryGroup: assignGroup(t.name, t.category),
      rawCategory: t.category,
      description: t.description,
      level: isEn ? 'Operational' : 'Opérationnel',
      icon: t.icon,
    }));
  }, [isCustom, data.tools, rawTools, isEn]);

  const filteredTools = useMemo(() => {
    if (selectedGroup === 'all') return allTools;
    return allTools.filter((tool) => tool.categoryGroup === selectedGroup);
  }, [allTools, selectedGroup]);

  // Display only the first 4 tools by default, or all tools when showAll is true
  const displayedTools = useMemo(() => {
    if (showAll) return filteredTools;
    return filteredTools.slice(0, 4);
  }, [filteredTools, showAll]);

  const hasMoreTools = filteredTools.length > 4;

  return (
    <section id="outils" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-[#CBD5E1]/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <ScrollReveal animation="fade-up">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#2563EB]/10 text-[#2563EB] text-xs font-bold uppercase tracking-wider mb-3 border border-[#2563EB]/20">
                <Code className="w-3.5 h-3.5" />
                <span>{t('tools.badge')}</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] font-heading tracking-tight">
                {t('tools.title')}
              </h2>
              <p className="text-[#475569] mt-2 text-sm sm:text-base font-normal">
                {isEn
                  ? 'Software suites, development stacks, diagnostic lab tools, and AI environments.'
                  : 'Logiciels de création, technologies web, outillage de diagnostic matériel et environnements IA.'}
              </p>
              <div className="w-16 h-1 bg-[#2563EB] rounded-full mt-4" />
            </div>

            {/* Filter Pills: INFORMATIQUE, DESIGN, WEB, IA, MAINTENANCE */}
            <div className="flex flex-wrap items-center gap-1.5" role="tablist">
              {groups.map((grp) => {
                const active = selectedGroup === grp.id;
                return (
                  <button
                    key={grp.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => handleSelectGroup(grp.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 cursor-pointer ${
                      active
                        ? 'bg-[#2563EB] text-white shadow-sm shadow-[#2563EB]/25 ring-1 ring-[#2563EB]'
                        : 'bg-white text-[#475569] hover:bg-[#F8FAFC] border border-[#CBD5E1] hover:border-[#2563EB]/50 hover:text-[#0F172A]'
                    }`}
                  >
                    {grp.label}
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* Tools Cards Grid - Responsive: 4 tools initially on desktop & mobile, all when expanded */}
        <div className={`grid gap-3.5 sm:gap-4 transition-all duration-300 ${
          showAll
            ? 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6'
            : 'grid-cols-2 sm:grid-cols-2 md:grid-cols-4'
        }`}>
          {displayedTools.map((tool, idx) => (
            <ScrollReveal
              key={tool.id || idx}
              animation="fade-up"
              delay={(idx % 6) * 50}
            >
              <div
                id={`tool-card-${tool.id || idx}`}
                className="bg-[#F8FAFC] rounded-xl p-3.5 sm:p-4 border border-[#E2E8F0] shadow-xs hover:border-[#2563EB]/50 hover:shadow-md hover:bg-white transition-all duration-200 flex flex-col justify-between h-full group"
              >
                <div>
                  <div className="w-9 h-9 rounded-lg bg-white border border-[#CBD5E1]/60 flex items-center justify-center mb-3 group-hover:scale-105 transition-transform shadow-2xs">
                    {getToolIcon(tool.name)}
                  </div>

                  <h3 className="text-xs sm:text-sm font-bold text-[#0F172A] font-heading leading-tight mb-1">
                    {tool.name}
                  </h3>

                  <span className="inline-block text-[10px] font-bold text-[#2563EB] uppercase tracking-wider mb-1.5">
                    {tool.categoryGroup}
                  </span>

                  {tool.description && (
                    <p className="text-[11px] text-[#64748B] leading-snug line-clamp-2">
                      {tool.description}
                    </p>
                  )}
                </div>

                <div className="mt-3 pt-2 border-t border-[#E2E8F0] flex items-center justify-between text-[10px] text-[#475569]">
                  <span className="font-medium">{tool.level}</span>
                  <CheckCircle2 className="w-3 h-3 text-[#2563EB]" />
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Bouton "Voir plus" / "Voir moins" sobre, professionnel et cohérent */}
        {hasMoreTools && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              id="tools-toggle-expand-btn"
              onClick={() => setShowAll((prev) => !prev)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs sm:text-sm font-semibold text-[#0F172A] bg-white border border-[#CBD5E1] hover:border-[#2563EB] hover:text-[#2563EB] hover:bg-[#F8FAFC] shadow-2xs transition-all duration-200 cursor-pointer group"
            >
              <span>
                {showAll
                  ? (isEn ? 'Show less' : 'Voir moins')
                  : (isEn ? `Show more (${filteredTools.length})` : `Voir plus (${filteredTools.length})`)}
              </span>
              {showAll ? (
                <ChevronUp className="w-4 h-4 text-[#64748B] group-hover:text-[#2563EB] transition-colors" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#64748B] group-hover:text-[#2563EB] transition-colors" />
              )}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
