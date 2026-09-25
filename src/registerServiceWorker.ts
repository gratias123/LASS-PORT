/**
 * Initialisation et enregistrement du Service Worker
 * Assure la mise en cache des ressources principales, le fonctionnement hors-ligne
 * et le rechargement transparent dès qu'une nouvelle version est déployée.
 */

export function registerServiceWorker() {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  // Enregistrement au chargement complet de la page pour ne pas retarder le premier rendu
  window.addEventListener('load', () => {
    const swUrl = '/sw.js';

    let refreshing = false;
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (!refreshing) {
        refreshing = true;
        console.log('[PWA] Nouvelle version activée, rechargement transparent.');
        window.location.reload();
      }
    });

    navigator.serviceWorker
      .register(swUrl, { scope: '/' })
      .then((registration) => {
        console.log('[PWA] Service Worker actif, scope :', registration.scope);

        // Forcer immédiatement la vérification des mises à jour
        registration.update().catch(() => {});

        // Si un nouveau worker attend déjà, lui ordonner de prendre le relais
        if (registration.waiting) {
          registration.waiting.postMessage({ type: 'SKIP_WAITING' });
        }

        // Détection des mises à jour du Service Worker
        registration.addEventListener('updatefound', () => {
          const installingWorker = registration.installing;
          if (installingWorker) {
            installingWorker.addEventListener('statechange', () => {
              if (installingWorker.state === 'installed') {
                if (navigator.serviceWorker.controller) {
                  console.log('[PWA] Nouvelle version installée, activation en cours...');
                  installingWorker.postMessage({ type: 'SKIP_WAITING' });
                } else {
                  console.log('[PWA] Contenu initial pré-mis en cache pour consultation hors-ligne.');
                }
              }
            });
          }
        });
      })
      .catch((error) => {
        console.warn('[PWA] Échec de l’enregistrement du Service Worker :', error);
      });
  });
}
