import jsPDF from 'jspdf';
import html2canvas from 'html2canvas-pro';

/**
 * Formats a clean, safe, cross-platform filename for the CV PDF export.
 * Example: "SEMAKO Déo-Gratias" -> "CV-SEMAKO-Deo-Gratias.pdf"
 */
export function formatCvFileName(rawName?: string): string {
  if (!rawName || !rawName.trim()) {
    return 'CV-SEMAKO-Deo-Gratias.pdf';
  }

  const clean = rawName
    .trim()
    // Normalize diacritics / accents (e.g. é -> e, à -> a, ô -> o)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    // Replace spaces and special characters with a hyphen
    .replace(/[^a-zA-Z0-9-]+/g, '-')
    // Collapse consecutive hyphens
    .replace(/-+/g, '-')
    // Trim hyphens from edges
    .replace(/^-+|-+$/g, '');

  return `CV-${clean || 'SEMAKO-Deo-Gratias'}.pdf`;
}

export interface PdfExportResult {
  success: boolean;
  fileName: string;
  error?: string;
  blobUrl?: string;
  usedFallback?: boolean;
}

/**
 * Generates and triggers automatic download of the CV as a high-definition PDF file.
 * Handles desktop, Android, iOS Safari, Chrome, and modern mobile browsers.
 */
export async function downloadCvPdf(
  element: HTMLElement,
  rawName: string,
  onProgress?: (step: string) => void
): Promise<PdfExportResult> {
  const fileName = formatCvFileName(rawName);

  try {
    onProgress?.('Préparation du document haute définition...');

    // Wait for fonts if supported
    if (document.fonts && document.fonts.ready) {
      try {
        await document.fonts.ready;
      } catch {
        // Continue if fonts check is not supported
      }
    }

    // Création d'un environnement d'exportation dédié 100% blanc, totalement déconnecté du fond du portfolio
    const exportSandbox = document.createElement('div');
    exportSandbox.id = 'cv-pdf-export-sandbox';
    exportSandbox.style.position = 'fixed';
    exportSandbox.style.top = '-99999px';
    exportSandbox.style.left = '0';
    exportSandbox.style.width = '794px';
    exportSandbox.style.height = '1123px';
    exportSandbox.style.backgroundColor = '#ffffff';
    exportSandbox.style.zIndex = '-99999';
    exportSandbox.style.margin = '0';
    exportSandbox.style.padding = '0';
    exportSandbox.style.overflow = 'hidden';

    const clone = element.cloneNode(true) as HTMLElement;
    clone.id = 'cv-pdf-render-clone';
    clone.style.width = '794px';
    clone.style.minWidth = '794px';
    clone.style.maxWidth = '794px';
    clone.style.height = '1123px';
    clone.style.minHeight = '1123px';
    clone.style.maxHeight = '1123px';
    clone.style.backgroundColor = '#ffffff';
    clone.style.color = '#0f172a';
    clone.style.boxShadow = 'none';
    clone.style.border = 'none';
    clone.style.borderRadius = '0';
    clone.style.margin = '0';
    clone.style.overflow = 'hidden';

    exportSandbox.appendChild(clone);
    document.body.appendChild(exportSandbox);

    let canvas: HTMLCanvasElement;
    try {
      await new Promise((resolve) => setTimeout(resolve, 60));

      onProgress?.('Rendu vectoriel et capture HD...');

      // Render HD canvas at scale: 2 (crisp print-grade resolution)
      canvas = await html2canvas(clone, {
        scale: 2,
        useCORS: true,
        allowTaint: false,
        logging: false,
        backgroundColor: '#ffffff',
        width: 794,
        height: 1123,
        windowWidth: 794,
        windowHeight: 1123,
      });
    } finally {
      if (exportSandbox.parentNode) {
        exportSandbox.parentNode.removeChild(exportSandbox);
      }
    }

    onProgress?.('Assemblage et compression du fichier PDF...');

    // Standard A4 dimensions in mm (210 x 297 mm)
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
    });

    // Fond blanc absolu 210mm x 297mm garanti
    pdf.setFillColor(255, 255, 255);
    pdf.rect(0, 0, 210, 297, 'F');

    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    // Exactement 1 page A4 210mm x 297mm
    pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297, undefined, 'FAST');

    onProgress?.('Téléchargement automatique...');

    // Generate blob and trigger automatic download
    const blob = pdf.output('blob');
    const blobUrl = URL.createObjectURL(blob);

    // Create anchor link to trigger native browser download (compatible with desktop, Android, iOS Safari)
    const link = document.createElement('a');
    link.href = blobUrl;
    link.download = fileName;
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      try {
        if (link.parentNode) {
          link.parentNode.removeChild(link);
        }
      } catch {
        // Safe ignore
      }
    }, 2000);

    return {
      success: true,
      fileName,
      blobUrl,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : 'Erreur lors de la création du PDF';
    console.warn('Génération PDF directe indisponible, bascule sur impression système:', err);

    return {
      success: false,
      fileName,
      error: errorMsg,
      usedFallback: true,
    };
  }
}
