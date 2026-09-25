import React, { useState, useEffect } from 'react';
import {
  X,
  ExternalLink,
  Download,
  ShieldCheck,
  CheckCircle2,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  FileText,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Award,
  Hash,
  Building2,
  User,
} from 'lucide-react';
import { CertificationItem } from '../../types';

interface CertificateViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  certificate: CertificationItem | null;
  allCertificates?: CertificationItem[];
  onSelectCertificate?: (cert: CertificationItem) => void;
  language?: 'fr' | 'en';
}

export const CertificateViewerModal: React.FC<CertificateViewerModalProps> = ({
  isOpen,
  onClose,
  certificate,
  allCertificates = [],
  onSelectCertificate,
  language = 'fr',
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [copiedNumber, setCopiedNumber] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<'document' | 'preview'>('document');
  const [iframeError, setIframeError] = useState<boolean>(false);

  const isFr = language === 'fr';

  useEffect(() => {
    // Reset zoom and error state when certificate changes
    setZoomLevel(100);
    setIframeError(false);
    setCopiedNumber(false);
  }, [certificate?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && allCertificates.length > 1) {
        navigateNext();
      } else if (e.key === 'ArrowLeft' && allCertificates.length > 1) {
        navigatePrev();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, certificate, allCertificates]);

  if (!isOpen || !certificate) return null;

  const currentIndex = allCertificates.findIndex((c) => c.id === certificate.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex >= 0 && currentIndex < allCertificates.length - 1;

  const navigatePrev = () => {
    if (hasPrev && onSelectCertificate) {
      onSelectCertificate(allCertificates[currentIndex - 1]);
    }
  };

  const navigateNext = () => {
    if (hasNext && onSelectCertificate) {
      onSelectCertificate(allCertificates[currentIndex + 1]);
    }
  };

  const handleCopyNumber = () => {
    if (!certificate.refNumber) return;
    navigator.clipboard.writeText(certificate.refNumber).then(() => {
      setCopiedNumber(true);
      setTimeout(() => setCopiedNumber(false), 2200);
    });
  };

  const documentUrl = certificate.documentUrl || '';
  const isPdf = documentUrl.toLowerCase().endsWith('.pdf');
  const filename = certificate.documentFilename || (isPdf ? 'Certificat.pdf' : 'Certificat');
  const thumbnailUrl = certificate.thumbnailUrl || (isPdf ? documentUrl.replace(/\.pdf$/i, '.svg') : '');

  return (
    <div
      id="certificate-viewer-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cert-modal-title"
    >
      <div
        id="certificate-viewer-modal-card"
        className="relative flex flex-col w-full max-w-6xl h-[92vh] max-h-[850px] bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden"
      >
        {/* MODAL HEADER */}
        <div
          id="cert-modal-header"
          className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 sm:px-6 bg-slate-900/95 border-b border-slate-800 z-10"
        >
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-blue-600/20 text-blue-400 border border-blue-500/30 flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-0.5 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  {isFr ? 'Certificat vérifié' : 'Verified Certificate'}
                </span>
                {allCertificates.length > 1 && (
                  <span className="text-xs text-slate-400 hidden sm:inline">
                    ({currentIndex + 1} / {allCertificates.length})
                  </span>
                )}
              </div>
              <h2
                id="cert-modal-title"
                className="text-base sm:text-lg font-bold text-white truncate max-w-[280px] sm:max-w-md lg:max-w-xl"
                title={certificate.title}
              >
                {certificate.title}
              </h2>
            </div>
          </div>

          {/* Action Tools */}
          <div className="flex items-center gap-1.5 sm:gap-2 ml-auto">
            {/* Zoom Controls */}
            <div className="hidden md:flex items-center bg-slate-800/80 rounded-lg p-0.5 border border-slate-700">
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.max(50, z - 15))}
                className="p-1.5 text-slate-400 hover:text-white rounded transition-colors"
                title={isFr ? 'Zoom arrière' : 'Zoom out'}
                aria-label="Zoom out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <span className="px-2 text-xs font-mono text-slate-300 min-w-[48px] text-center">
                {zoomLevel}%
              </span>
              <button
                type="button"
                onClick={() => setZoomLevel((z) => Math.min(175, z + 15))}
                className="p-1.5 text-slate-400 hover:text-white rounded transition-colors"
                title={isFr ? 'Zoom avant' : 'Zoom in'}
                aria-label="Zoom in"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setZoomLevel(100)}
                className="p-1.5 text-slate-400 hover:text-white rounded transition-colors"
                title={isFr ? 'Réinitialiser le zoom' : 'Reset zoom'}
                aria-label="Reset zoom"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Open in new tab */}
            {documentUrl && (
              <a
                href={documentUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-750 hover:text-white border border-slate-700 rounded-lg transition-colors"
                title={isFr ? 'Ouvrir dans un nouvel onglet' : 'Open in new tab'}
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isFr ? 'Plein écran' : 'Full screen'}</span>
              </a>
            )}

            {/* Download PDF button */}
            {documentUrl && (
              <a
                href={documentUrl}
                download={filename}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors shadow-sm"
                title={isFr ? 'Télécharger le certificat' : 'Download certificate'}
              >
                <Download className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{isFr ? 'Télécharger' : 'Download'}</span>
              </a>
            )}

            {/* Close button */}
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors ml-1"
              title={isFr ? 'Fermer (Échap)' : 'Close (Esc)'}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* MODAL BODY (Grid: Document Viewer + Authenticity Pane) */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden bg-slate-950">
          {/* LEFT: CERTIFICATE VIEWER STAGE */}
          <div className="flex-1 flex flex-col relative overflow-hidden bg-slate-950/60 min-h-[300px]">
            {/* View Mode Toggle (PDF Embed vs SVG High-Res Preview) */}
            <div className="flex items-center justify-between px-4 py-2 bg-slate-900/60 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('document')}
                  className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                    activeTab === 'document'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  <span className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    {isFr ? 'Document PDF officiel' : 'Official PDF Document'}
                  </span>
                </button>
                {thumbnailUrl && (
                  <button
                    type="button"
                    onClick={() => setActiveTab('preview')}
                    className={`px-2.5 py-1 rounded-md font-medium transition-colors ${
                      activeTab === 'preview'
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                    }`}
                  >
                    {isFr ? 'Aperçu haute fidélité' : 'Hi-Res Preview'}
                  </button>
                )}
              </div>

              {/* Prev / Next buttons for keyboard or click navigation */}
              {allCertificates.length > 1 && (
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={navigatePrev}
                    disabled={!hasPrev}
                    className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400"
                    title={isFr ? 'Certificat précédent' : 'Previous certificate'}
                    aria-label="Previous certificate"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="text-[11px] text-slate-400 px-1 font-mono">
                    {currentIndex + 1} / {allCertificates.length}
                  </span>
                  <button
                    type="button"
                    onClick={navigateNext}
                    disabled={!hasNext}
                    className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400"
                    title={isFr ? 'Certificat suivant' : 'Next certificate'}
                    aria-label="Next certificate"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>

            {/* Display Area */}
            <div className="flex-1 relative overflow-auto flex items-center justify-center p-2 sm:p-4 bg-slate-950">
              {activeTab === 'document' && documentUrl ? (
                <div
                  className="w-full h-full flex items-center justify-center transition-transform duration-150"
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center center' }}
                >
                  <iframe
                    src={`${documentUrl}#toolbar=0&navpanes=0&scrollbar=1`}
                    title={certificate.title}
                    className="w-full h-full min-h-[380px] sm:min-h-[480px] rounded-lg bg-white shadow-xl border border-slate-700"
                    onError={() => setIframeError(true)}
                  />
                </div>
              ) : (
                <div
                  className="w-full max-w-4xl max-h-full flex items-center justify-center p-2 transition-transform duration-150"
                  style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'center center' }}
                >
                  {thumbnailUrl ? (
                    <img
                      src={thumbnailUrl}
                      alt={certificate.title}
                      className="max-w-full max-h-[70vh] rounded-lg shadow-2xl border border-slate-700 object-contain bg-white"
                    />
                  ) : (
                    <div className="text-center p-8 bg-slate-900 border border-slate-800 rounded-xl">
                      <FileText className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                      <p className="text-sm text-slate-300 font-medium">{certificate.title}</p>
                      <p className="text-xs text-slate-500 mt-1">{filename}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Direct Link Banner if PDF viewer fails or on mobile browsers */}
              {iframeError && (
                <div className="absolute inset-x-4 bottom-4 p-3 bg-slate-900/90 border border-amber-500/40 rounded-xl text-xs text-amber-200 flex items-center justify-between">
                  <span>
                    {isFr
                      ? 'L’affichage intégré dépend du navigateur. Vous pouvez ouvrir le PDF directement.'
                      : 'Inline viewer depends on your browser. You can open the PDF directly.'}
                  </span>
                  <a
                    href={documentUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-2.5 py-1 bg-amber-500 text-slate-950 font-semibold rounded"
                  >
                    {isFr ? 'Ouvrir' : 'Open'}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT: AUTHENTICITY & METADATA PANE */}
          <div
            id="cert-authenticity-pane"
            className="w-full lg:w-96 flex flex-col justify-between bg-slate-900/95 border-t lg:border-t-0 lg:border-l border-slate-800 p-4 sm:p-6 overflow-y-auto"
          >
            <div className="space-y-5">
              {/* Authenticity Seal Header */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300">
                <ShieldCheck className="w-6 h-6 text-emerald-400 flex-shrink-0" />
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                    {isFr ? 'Authenticité vérifiée' : 'Verified Authenticity'}
                  </h3>
                  <p className="text-xs text-emerald-300/90 leading-relaxed">
                    {isFr
                      ? 'Document officiel délivré par les organismes partenaires.'
                      : 'Official document issued by partner certification bodies.'}
                  </p>
                </div>
              </div>

              {/* Detail fields */}
              <div className="space-y-3.5 text-sm">
                {/* Holder */}
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
                    <User className="w-3.5 h-3.5 text-blue-400" />
                    <span>{isFr ? 'Titulaire certifié' : 'Certified Holder'}</span>
                  </div>
                  <p className="font-semibold text-white">SEMAKO Déo-Gratias</p>
                </div>

                {/* Course Name */}
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
                    <Award className="w-3.5 h-3.5 text-blue-400" />
                    <span>{isFr ? 'Intitulé de la certification' : 'Certification Title'}</span>
                  </div>
                  <p className="font-semibold text-white leading-snug">{certificate.title}</p>
                  <p className="text-xs text-blue-400 mt-1 font-medium">{certificate.status}</p>
                </div>

                {/* Issuer */}
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
                    <Building2 className="w-3.5 h-3.5 text-blue-400" />
                    <span>{isFr ? 'Organisme certificateur' : 'Issuing Body'}</span>
                  </div>
                  <p className="font-semibold text-white">
                    {certificate.issuer || 'MTN Skills Academy'}
                  </p>
                </div>

                {/* Date */}
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>{isFr ? 'Date d’obtention officielle' : 'Official Issue Date'}</span>
                  </div>
                  <p className="font-semibold text-white">{certificate.issuedDate}</p>
                </div>

                {/* Official Certificate Number with Copy feature */}
                {certificate.refNumber && (
                  <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-800">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-400 mb-1">
                      <span className="flex items-center gap-1.5">
                        <Hash className="w-3.5 h-3.5 text-blue-400" />
                        {isFr ? 'Numéro officiel de certificat' : 'Official Certificate Number'}
                      </span>
                      <button
                        type="button"
                        onClick={handleCopyNumber}
                        className="inline-flex items-center gap-1 text-[11px] text-blue-400 hover:text-blue-300 transition-colors"
                        title={isFr ? 'Copier le numéro' : 'Copy number'}
                      >
                        {copiedNumber ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">{isFr ? 'Copié !' : 'Copied!'}</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>{isFr ? 'Copier' : 'Copy'}</span>
                          </>
                        )}
                      </button>
                    </div>
                    <p className="font-mono text-xs text-blue-300 font-semibold break-all bg-slate-950/70 p-2 rounded-lg border border-slate-800">
                      {certificate.refNumber}
                    </p>
                  </div>
                )}

                {/* Associated Document File */}
                <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 text-xs font-medium text-slate-400 mb-1">
                    <FileText className="w-3.5 h-3.5 text-blue-400" />
                    <span>{isFr ? 'Fichier PDF associé' : 'Associated PDF File'}</span>
                  </div>
                  <p className="font-mono text-xs text-slate-300 truncate" title={filename}>
                    {filename}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 mt-4 border-t border-slate-800 space-y-2">
              {documentUrl && (
                <a
                  href={documentUrl}
                  download={filename}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-600/20 transition-all"
                >
                  <Download className="w-4 h-4" />
                  {isFr ? 'Télécharger le document original' : 'Download Original Document'}
                </a>
              )}
              <button
                type="button"
                onClick={onClose}
                className="w-full py-2 bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white rounded-xl text-xs font-medium transition-colors"
              >
                {isFr ? 'Fermer la vue' : 'Close Viewer'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
