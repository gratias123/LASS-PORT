import React, { useState } from 'react';
import { Download, Smartphone, X, Check } from 'lucide-react';
import { usePWAInstall } from '../../hooks/usePWAInstall';
import { useLanguage } from '../../context/LanguageContext';

interface PWAInstallButtonProps {
  className?: string;
  variant?: 'navbar' | 'prominent' | 'compact';
}

export const PWAInstallButton: React.FC<PWAInstallButtonProps> = ({
  className = '',
  variant = 'navbar',
}) => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const { language } = useLanguage();
  const isEn = language === 'en';

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    if (variant === 'compact') {
      return (
        <button
          type="button"
          onClick={install}
          title={isEn ? 'Install Portfolio App' : 'Installer l’application'}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-blue-300 hover:text-white bg-blue-950/60 hover:bg-blue-900/80 border border-blue-800/80 rounded-lg transition-all cursor-pointer shadow-xs ${className}`}
        >
          <Download className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span>{isEn ? 'Install' : 'Installer'}</span>
        </button>
      );
    }

    return (
      <button
        type="button"
        onClick={install}
        id="btn-pwa-install"
        title={isEn ? 'Install Portfolio as an Application' : 'Installer le portfolio en application'}
        className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 rounded-lg shadow-xs hover:shadow transition-all cursor-pointer whitespace-nowrap focus:outline-none focus:ring-2 focus:ring-blue-400 ${className}`}
      >
        <Download className="w-3.5 h-3.5 text-white shrink-0" />
        <span>{isEn ? 'Install App' : 'Installer l’App'}</span>
      </button>
    );
  }

  // iOS Safari flow
  if (isIOS) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowIOSGuide(true)}
          id="btn-pwa-install-ios"
          title={isEn ? 'Install on iOS' : 'Installer sur iPhone/iPad'}
          className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg transition-all cursor-pointer whitespace-nowrap ${className}`}
        >
          <Smartphone className="w-3.5 h-3.5 text-slate-300 shrink-0" />
          <span>{isEn ? 'Install App' : 'Installer l’App'}</span>
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
            <div className="w-full max-w-sm rounded-xl bg-slate-900 border border-slate-800 p-6 shadow-2xl text-white">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="p-2 rounded-lg bg-blue-600/20 text-blue-400">
                    <Smartphone className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white">
                    {isEn ? 'Install on iPhone / iPad' : 'Installer sur iPhone / iPad'}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowIOSGuide(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed space-y-2">
                {isEn ? (
                  <>
                    <span className="block mb-1 font-semibold text-slate-200">Instructions:</span>
                    1. Tap the <strong>Share</strong> button (square with arrow) in Safari.<br />
                    2. Scroll down and tap <strong>Add to Home Screen</strong>.<br />
                    3. Tap <strong>Add</strong> to access the portfolio offline.
                  </>
                ) : (
                  <>
                    <span className="block mb-1 font-semibold text-slate-200">Pour installer l’application :</span>
                    1. Appuyez sur l’icône de <strong>Partage</strong> (carré avec flèche) dans Safari.<br />
                    2. Faites défiler et sélectionnez <strong>Sur l’écran d’accueil</strong>.<br />
                    3. Validez avec <strong>Ajouter</strong> pour consulter le portfolio même hors-ligne.
                  </>
                )}
              </p>

              <button
                type="button"
                onClick={() => setShowIOSGuide(false)}
                className="mt-5 w-full inline-flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white transition-colors"
              >
                <Check className="w-4 h-4" />
                <span>{isEn ? 'Understood' : 'J’ai compris'}</span>
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
