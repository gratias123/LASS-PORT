import React from 'react';
import { CustomProjectItem } from '../../types/portfolioBuilder';

interface NeutralProjectPlaceholderProps {
  project: CustomProjectItem;
  isEn?: boolean;
  size?: 'card' | 'modal';
}

const FALLBACK_PROJECT_IMAGES: Record<string, string> = {
  'proj-1': '/projects/gratialink_branding_mockup.jpg',
  'proj-2': '/projects/portfolio_app_showcase.jpg',
  'proj-3': '/projects/hardware_repair_lab.jpg',
  'proj-4': '/projects/prompt_engineering_workspace.jpg',
};

export const NeutralProjectPlaceholder: React.FC<NeutralProjectPlaceholderProps> = ({
  project,
  size = 'card',
}) => {
  const nameLower = (project.name || '').toLowerCase();
  const roleLower = (project.role || '').toLowerCase();
  const toolsString = Array.isArray(project.tools) ? project.tools.join(' ').toLowerCase() : '';

  let visualUrl = (project.id && FALLBACK_PROJECT_IMAGES[project.id]) || '';

  if (!visualUrl) {
    if (
      nameLower.includes('gratia') ||
      nameLower.includes('graphi') ||
      nameLower.includes('brand') ||
      nameLower.includes('identit') ||
      roleLower.includes('graph')
    ) {
      visualUrl = '/projects/gratialink_branding_mockup.jpg';
    } else if (
      nameLower.includes('portfolio') ||
      nameLower.includes('plateforme') ||
      nameLower.includes('cv') ||
      nameLower.includes('générateur') ||
      toolsString.includes('react') ||
      toolsString.includes('tailwind')
    ) {
      visualUrl = '/projects/portfolio_app_showcase.jpg';
    } else if (
      nameLower.includes('gsm') ||
      nameLower.includes('réparation') ||
      nameLower.includes('dépannage') ||
      nameLower.includes('atelier') ||
      nameLower.includes('diagnostic') ||
      toolsString.includes('multimètre') ||
      toolsString.includes('soudure')
    ) {
      visualUrl = '/projects/hardware_repair_lab.jpg';
    } else if (
      nameLower.includes('prompt') ||
      nameLower.includes('ia') ||
      nameLower.includes('ai') ||
      roleLower.includes('prompt') ||
      toolsString.includes('chatgpt') ||
      toolsString.includes('gemini') ||
      toolsString.includes('claude')
    ) {
      visualUrl = '/projects/prompt_engineering_workspace.jpg';
    } else {
      visualUrl = '/projects/gratialink_branding_mockup.jpg';
    }
  }

  return (
    <div
      className={`w-full h-full relative overflow-hidden select-none bg-slate-900/5 ${
        size === 'modal' ? 'rounded-2xl' : 'rounded-t-2xl'
      }`}
    >
      <img
        src={visualUrl}
        alt={project.name}
        width={640}
        height={360}
        className="w-full h-full object-cover object-center"
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
      />
    </div>
  );
};
