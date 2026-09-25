import { StrictMode } from 'react';
import { hydrateRoot, createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { registerServiceWorker } from './registerServiceWorker';
import { CustomPortfolioData } from './types/portfolioBuilder';

// Activer la mise en cache et la disponibilité hors-ligne
registerServiceWorker();

// Récupérer les données initiales injectées par le serveur si disponibles
let initialData: CustomPortfolioData | undefined = undefined;
const initialDataEl = document.getElementById('__INITIAL_DATA__');
if (initialDataEl && initialDataEl.textContent) {
  try {
    initialData = JSON.parse(initialDataEl.textContent);
  } catch {
    // Utiliser les données par défaut si parsing échoue
  }
}

const rootElement = document.getElementById('root')!;

// Si le serveur Express a déjà envoyé le HTML complet (SSR), hydrater ; sinon initialiser
if (rootElement.hasChildNodes()) {
  hydrateRoot(
    rootElement,
    <StrictMode>
      <App initialData={initialData} />
    </StrictMode>
  );
} else {
  createRoot(rootElement).render(
    <StrictMode>
      <App initialData={initialData} />
    </StrictMode>
  );
}
