import React from 'react';
import { WifiOff } from 'lucide-react';
import { useOnlineStatus } from '../../hooks/useOnlineStatus';
import { useLanguage } from '../../context/LanguageContext';

export const OfflineIndicator: React.FC = () => {
  const isOnline = useOnlineStatus();
  const { language } = useLanguage();
  const isEn = language === 'en';

  if (isOnline) {
    return null;
  }

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed bottom-4 left-4 z-50 flex items-center gap-2.5 rounded-lg bg-amber-600/95 backdrop-blur-md px-3.5 py-2 text-xs font-medium text-white shadow-xl border border-amber-400/30 animate-in fade-in slide-in-from-bottom-2 duration-200"
    >
      <div className="relative flex items-center justify-center">
        <span className="absolute h-2.5 w-2.5 rounded-full bg-white opacity-75 animate-ping" />
        <WifiOff className="w-3.5 h-3.5 relative z-10 text-white shrink-0" />
      </div>
      <span>
        {isEn
          ? 'Offline Mode — Cached portfolio data is active'
          : 'Mode hors-ligne — Ressources du portfolio servies depuis le cache'}
      </span>
    </div>
  );
};
