import React, { useState, useRef } from 'react';
import {
  Plus,
  Trash2,
  Award,
  Calendar,
  ShieldCheck,
  FileText,
  UploadCloud,
  Eye,
  CheckCircle2,
  AlertCircle,
  FileCheck2,
  Sparkles,
} from 'lucide-react';
import { CustomPortfolioData, CustomCertificationItem } from '../../../types/portfolioBuilder';
import { CertificateViewerModal } from '../../certifications/CertificateViewerModal';
import { CertificationItem } from '../../../types';

interface AdminCertificationsTabProps {
  data: CustomPortfolioData;
  onChange: (newData: CustomPortfolioData) => void;
}

// Predefined official certificates provided for SEMAKO Déo-Gratias
const OFFICIAL_PRESET_CERTIFICATES = [
  {
    title: 'Compétences Internet pour une utilisation quotidienne',
    issuer: 'MTN Skills Academy & GSMA',
    date: '5 août 2026',
    type: 'Certificat de réussite',
    domain: 'Usages Numériques du Quotidien',
    refNumber: 'SKA8473406080520261334',
    documentUrl: '/certificates/Comp_tences_Internet_pour_une__Certificate(1).pdf',
    documentFilename: 'Comp_tences_Internet_pour_une__Certificate(1).pdf',
    thumbnailUrl: '/certificates/thumbnails/Comp_tences_Internet_pour_une__Certificate(1).svg',
  },
  {
    title: 'IA responsable',
    issuer: 'MTN Skills Academy & Microsoft Learn',
    date: '5 août 2026',
    type: 'Certificat de réussite',
    domain: 'Éthique & Société Numérique',
    refNumber: 'SKA9234143080520261255',
    documentUrl: '/certificates/IA_responsable_Certificate(1).pdf',
    documentFilename: 'IA_responsable_Certificate(1).pdf',
    thumbnailUrl: '/certificates/thumbnails/IA_responsable_Certificate(1).svg',
  },
  {
    title: "L'IA pour tous",
    issuer: 'MTN Skills Academy & Microsoft Learn',
    date: '5 août 2026',
    type: 'Certificat de réussite',
    domain: 'Intelligence Artificielle',
    refNumber: 'SKA1256340080520261134',
    documentUrl: '/certificates/L_IA_pour_tous_Certificate(1).pdf',
    documentFilename: 'L_IA_pour_tous_Certificate(1).pdf',
    thumbnailUrl: '/certificates/thumbnails/L_IA_pour_tous_Certificate(1).svg',
  },
  {
    title: 'Recherche sur Internet et au-delà',
    issuer: 'MTN Skills Academy & Microsoft Learn',
    date: '5 août 2026',
    type: 'Certificat de réussite',
    domain: 'Recherche & Évaluation de l’Information',
    refNumber: 'SKA6842409080520261125',
    documentUrl: '/certificates/Recherche_sur_Internet_et_au_d_Certificate(1).pdf',
    documentFilename: 'Recherche_sur_Internet_et_au_d_Certificate(1).pdf',
    thumbnailUrl: '/certificates/thumbnails/Recherche_sur_Internet_et_au_d_Certificate(1).svg',
  },
  {
    title: "Les fondamentaux d'Internet",
    issuer: 'MTN Skills Academy & GSMA',
    date: '5 août 2026',
    type: 'Certificat de réussite',
    domain: 'Culture Réseau & Protocoles',
    refNumber: 'SKA1004772080520261025',
    documentUrl: '/certificates/Les_fondamentaux_d_Internet_Certificate(1).pdf',
    documentFilename: 'Les_fondamentaux_d_Internet_Certificate(1).pdf',
    thumbnailUrl: '/certificates/thumbnails/Les_fondamentaux_d_Internet_Certificate(1).svg',
  },
];

export const AdminCertificationsTab: React.FC<AdminCertificationsTabProps> = ({ data, onChange }) => {
  const [uploadingCertId, setUploadingCertId] = useState<string | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [previewCert, setPreviewCert] = useState<CertificationItem | null>(null);
  const fileInputRefs = useRef<{ [key: string]: HTMLInputElement | null }>({});

  const addCertification = () => {
    const newCert: CustomCertificationItem = {
      id: `cert-${Date.now()}`,
      title: 'Nouvelle Certification',
      issuer: 'MTN Skills Academy & Microsoft Learn',
      date: '5 août 2026',
      type: 'Certificat de réussite',
      domain: 'Compétences Numériques',
      refNumber: '',
      verifyUrl: '',
      documentUrl: '',
      documentFilename: '',
      thumbnailUrl: '',
      showVerifyButton: true,
      availableOnDemand: false,
    };
    onChange({
      ...data,
      certifications: [...data.certifications, newCert],
    });
  };

  const removeCertification = (id: string) => {
    onChange({
      ...data,
      certifications: data.certifications.filter((c) => c.id !== id),
    });
  };

  const updateCertification = (id: string, updates: Partial<CustomCertificationItem>) => {
    onChange({
      ...data,
      certifications: data.certifications.map((c) => (c.id === id ? { ...c, ...updates } : c)),
    });
  };

  const handleFileUpload = async (certId: string, file: File) => {
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.pdf') && !file.type.includes('pdf')) {
      setUploadError('Veuillez sélectionner un fichier au format PDF.');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setUploadError('Le fichier PDF est trop volumineux (limite max: 15 Mo).');
      return;
    }

    try {
      setUploadingCertId(certId);
      setUploadError(null);

      // Convert file to base64
      const reader = new FileReader();
      reader.onload = async () => {
        const base64Data = reader.result as string;

        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            file: base64Data,
            filename: file.name,
          }),
        });

        const resData = await response.json();
        if (response.ok && resData.success && resData.url) {
          updateCertification(certId, {
            documentUrl: resData.url,
            documentFilename: resData.filename || file.name,
            showVerifyButton: true,
          });
        } else {
          setUploadError(resData.error || 'Erreur lors de l’envoi du document.');
        }
        setUploadingCertId(null);
      };

      reader.onerror = () => {
        setUploadError('Erreur de lecture du fichier PDF.');
        setUploadingCertId(null);
      };

      reader.readAsDataURL(file);
    } catch (err: any) {
      setUploadError(err.message || 'Échec du téléversement.');
      setUploadingCertId(null);
    }
  };

  const applyPresetCert = (certId: string, preset: typeof OFFICIAL_PRESET_CERTIFICATES[0]) => {
    updateCertification(certId, {
      title: preset.title,
      issuer: preset.issuer,
      date: preset.date,
      type: preset.type,
      domain: preset.domain,
      refNumber: preset.refNumber,
      documentUrl: preset.documentUrl,
      documentFilename: preset.documentFilename,
      thumbnailUrl: preset.thumbnailUrl,
      showVerifyButton: true,
    });
  };

  const handleOpenPreview = (cert: CustomCertificationItem) => {
    const certItem: CertificationItem = {
      id: cert.id,
      title: cert.title,
      issuedDate: cert.date || '5 août 2026',
      status: cert.type || 'Certificat de réussite',
      domain: cert.domain || '',
      issuer: cert.issuer || 'MTN Skills Academy',
      refNumber: cert.refNumber,
      documentUrl: cert.documentUrl,
      documentFilename: cert.documentFilename,
      thumbnailUrl: cert.thumbnailUrl,
      showVerifyButton: cert.showVerifyButton !== false,
      availableOnDemand: cert.availableOnDemand,
      description: cert.description || '',
    };
    setPreviewCert(certItem);
  };

  return (
    <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 space-y-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-400" />
            <span>Certifications & Attestations ({data.certifications.length})</span>
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Associez à chaque certification son fichier PDF authentique pour permettre la vérification individuelle par les recruteurs.
          </p>
        </div>

        <button
          type="button"
          onClick={addCertification}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white shadow-sm transition-all cursor-pointer shrink-0"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Ajouter une certification</span>
        </button>
      </div>

      {uploadError && (
        <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-xs text-red-300 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* QUICK PRESET BAR */}
      <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80">
        <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-blue-300">
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>Certificats officiels disponibles pour SEMAKO Déo-Gratias :</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {OFFICIAL_PRESET_CERTIFICATES.map((preset, idx) => {
            const isAlreadyLinked = data.certifications.some(
              (c) => c.documentFilename === preset.documentFilename || c.refNumber === preset.refNumber
            );
            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  const newCert: CustomCertificationItem = {
                    id: `cert-${Date.now()}-${idx}`,
                    ...preset,
                    showVerifyButton: true,
                  };
                  onChange({
                    ...data,
                    certifications: [...data.certifications, newCert],
                  });
                }}
                disabled={isAlreadyLinked}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition-colors flex items-center gap-1.5 ${
                  isAlreadyLinked
                    ? 'bg-slate-900 border-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-slate-900/90 hover:bg-blue-600 hover:text-white border-slate-700 text-slate-300 cursor-pointer'
                }`}
                title={preset.title}
              >
                <FileCheck2 className="w-3 h-3 text-blue-400" />
                <span className="truncate max-w-[200px]">{preset.title}</span>
                {isAlreadyLinked && <span className="text-[10px] text-emerald-400 font-bold">✓ lié</span>}
              </button>
            );
          })}
        </div>
      </div>

      {/* CERTIFICATIONS LIST */}
      <div className="space-y-4">
        {data.certifications.length === 0 ? (
          <div className="p-8 text-center bg-slate-950/50 rounded-xl border border-dashed border-slate-800 text-xs text-slate-500">
            Aucune certification enregistrée. Cliquez sur « Ajouter une certification » ou utilisez les certificats officiels ci-dessus.
          </div>
        ) : (
          data.certifications.map((cert, index) => {
            const hasDocument = Boolean(cert.documentUrl && cert.documentUrl.trim() !== '');

            return (
              <div
                key={cert.id || index}
                className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 hover:border-slate-700 transition-colors space-y-4"
              >
                {/* Upper row: Title, Date, Delete */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="sm:col-span-2">
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                        Intitulé officiel de la certification *
                      </label>
                      <input
                        type="text"
                        value={cert.title}
                        onChange={(e) => updateCertification(cert.id, { title: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                        placeholder="Ex: IA responsable"
                      />
                    </div>

                    <div>
                      <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                        Date d'obtention *
                      </label>
                      <input
                        type="text"
                        value={cert.date || ''}
                        onChange={(e) => updateCertification(cert.id, { date: e.target.value })}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500"
                        placeholder="Ex: 5 août 2026"
                      />
                    </div>
                  </div>

                  <button
                    type="button"
                    title="Supprimer la certification"
                    onClick={() => removeCertification(cert.id)}
                    className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-900 rounded-lg transition-colors cursor-pointer shrink-0 ml-1 mt-5"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Second row: Organisme, Type/Statut, N° certificat */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                      Organisme certificateur *
                    </label>
                    <input
                      type="text"
                      value={cert.issuer}
                      onChange={(e) => updateCertification(cert.id, { issuer: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-blue-300 focus:outline-none focus:border-blue-500"
                      placeholder="Ex: MTN Skills Academy & Microsoft Learn"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                      Statut / Type
                    </label>
                    <input
                      type="text"
                      value={cert.type || 'Certificat de réussite'}
                      onChange={(e) => updateCertification(cert.id, { type: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
                      placeholder="Ex: Certificat de réussite"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-400 block mb-1">
                      Numéro officiel de certificat *
                    </label>
                    <input
                      type="text"
                      value={cert.refNumber || ''}
                      onChange={(e) => updateCertification(cert.id, { refNumber: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500 font-mono"
                      placeholder="Ex: SKA9234143080520261255"
                    />
                  </div>
                </div>

                {/* DOCUMENT ASSOCIATION CARD (The Core Requirement) */}
                <div className="p-3.5 bg-slate-900/90 rounded-xl border border-blue-900/30 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-400" />
                      <span className="text-xs font-bold text-white">
                        Document officiel associé (Fichier PDF)
                      </span>
                      {hasDocument ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Document lié
                        </span>
                      ) : (
                        <span className="text-[10px] text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-full">
                          Aucun document
                        </span>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                      {hasDocument && (
                        <button
                          type="button"
                          onClick={() => handleOpenPreview(cert)}
                          className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
                          title="Tester la visionneuse"
                        >
                          <Eye className="w-3.5 h-3.5 text-blue-400" />
                          <span>Prévisualiser</span>
                        </button>
                      )}

                      {/* Hidden File Input */}
                      <input
                        type="file"
                        accept="application/pdf"
                        ref={(el) => (fileInputRefs.current[cert.id] = el)}
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFileUpload(cert.id, file);
                        }}
                        className="hidden"
                      />

                      <button
                        type="button"
                        onClick={() => fileInputRefs.current[cert.id]?.click()}
                        disabled={uploadingCertId === cert.id}
                        className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:bg-blue-800 rounded-lg transition-colors cursor-pointer"
                      >
                        <UploadCloud className="w-3.5 h-3.5" />
                        <span>
                          {uploadingCertId === cert.id
                            ? 'Téléversement...'
                            : hasDocument
                            ? 'Remplacer le PDF'
                            : 'Téléverser le PDF'}
                        </span>
                      </button>

                      {hasDocument && (
                        <button
                          type="button"
                          onClick={() =>
                            updateCertification(cert.id, {
                              documentUrl: '',
                              documentFilename: '',
                              thumbnailUrl: '',
                            })
                          }
                          className="p-1 text-slate-500 hover:text-red-400 rounded transition-colors"
                          title="Dissocier le document"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Document Path/URL and Filename */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-1">
                        Chemin / URL du document PDF
                      </label>
                      <input
                        type="text"
                        value={cert.documentUrl || ''}
                        onChange={(e) => updateCertification(cert.id, { documentUrl: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-blue-300 font-mono focus:outline-none focus:border-blue-500"
                        placeholder="Ex: /certificates/IA_responsable_Certificate(1).pdf"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] font-semibold text-slate-400 block mb-1">
                        Nom d'affichage du fichier
                      </label>
                      <input
                        type="text"
                        value={cert.documentFilename || ''}
                        onChange={(e) => updateCertification(cert.id, { documentFilename: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1 text-xs text-slate-300 font-mono focus:outline-none focus:border-blue-500"
                        placeholder="Ex: IA_responsable_Certificate(1).pdf"
                      />
                    </div>
                  </div>

                  {/* Settings toggles */}
                  <div className="flex flex-wrap items-center gap-4 pt-2 border-t border-slate-800/80 text-xs">
                    <label className="inline-flex items-center gap-2 cursor-pointer text-slate-300">
                      <input
                        type="checkbox"
                        checked={cert.showVerifyButton !== false}
                        onChange={(e) =>
                          updateCertification(cert.id, { showVerifyButton: e.target.checked })
                        }
                        className="rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <span>Afficher le bouton « Vérifier le certificat »</span>
                    </label>

                    <label className="inline-flex items-center gap-2 cursor-pointer text-slate-400">
                      <input
                        type="checkbox"
                        checked={Boolean(cert.availableOnDemand)}
                        onChange={(e) =>
                          updateCertification(cert.id, { availableOnDemand: e.target.checked })
                        }
                        className="rounded border-slate-700 bg-slate-800 text-blue-600 focus:ring-blue-500 w-4 h-4"
                      />
                      <span>Indiquer « Document disponible sur demande » si aucun PDF</span>
                    </label>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* In-Admin Certificate Viewer Modal for test */}
      <CertificateViewerModal
        isOpen={Boolean(previewCert)}
        onClose={() => setPreviewCert(null)}
        certificate={previewCert}
        language="fr"
      />
    </div>
  );
};
