// Service Worker pour SEMAKO Déo-Gratias - Portfolio Numérique
// Gestion du cache hors-ligne avec stratégie Network-First pour le code et les données fraîches

const CACHE_NAME = 'semako-portfolio-cache-v6';

// Ressources fondamentales à pré-mettre en cache pour une disponibilité hors-ligne
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/icon.svg',
  '/semako_logo.jpg',
  '/profile.jpg',
  '/profile.png',
  '/semako-deo-gratias.jpg',
  '/semako_official.png',
  '/apple-touch-icon.png',
  '/pwa-192x192.png',
  '/pwa-512x512.png',
  '/pwa-maskable-512x512.png',
  '/projects/gratialink_branding.jpg',
  '/projects/portfolio_platform.jpg',
  '/projects/hardware_repair_lab.jpg',
  '/projects/prompt_engineering.jpg',
  '/api/public/owner-portfolio',
];

// Installation immédiate du Service Worker
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        return Promise.allSettled(
          PRECACHE_ASSETS.map((url) =>
            fetch(url, { cache: 'no-cache' })
              .then((response) => {
                if (response.ok) {
                  return cache.put(url, response);
                }
              })
              .catch((err) => {
                console.warn('[SW] Pré-cache ignoré pour :', url, err);
              })
          )
        );
      })
  );
});

// Activation du Service Worker : purge radicale des anciens caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Nettoyage ancien cache :', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// Écoute des messages (ex: forcer skipWaiting)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// Interception des requêtes réseau : priorité constante au réseau (Network-First)
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Ignorer les requêtes non-GET et les requêtes WebSocket (HMR / Vite)
  if (request.method !== 'GET' || url.protocol.startsWith('ws')) {
    return;
  }

  // 1. Requêtes de navigation (pages HTML) : Toujours Network-First pour charger la dernière version
  if (request.mode === 'navigate') {
    event.respondWith(
      fetch(request, { cache: 'no-cache' })
        .then((networkResponse) => {
          if (networkResponse && networkResponse.ok) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedPage = await caches.match(request);
          if (cachedPage) return cachedPage;
          const fallback = await caches.match('/index.html');
          return fallback || new Response('Application hors-ligne', { status: 503, statusText: 'Offline' });
        })
    );
    return;
  }

  // 2. Requêtes API : Network-First pour toujours refléter les dernières modifications en direct
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(request, { cache: 'no-cache' })
        .then((networkResponse) => {
          if (networkResponse && networkResponse.ok && url.pathname.startsWith('/api/public/')) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        })
        .catch(async () => {
          const cachedApiResponse = await caches.match(request);
          if (cachedApiResponse) {
            return cachedApiResponse;
          }
          return new Response(JSON.stringify({ offline: true, error: 'Réseau indisponible' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          });
        })
    );
    return;
  }

  // 3. Scripts JS, styles CSS et modules Vite : Network-First obligatoire
  const isCodeOrStyle =
    url.pathname.match(/\.(?:js|mjs|cjs|css|ts|tsx|jsx|json)$/i) ||
    url.pathname.startsWith('/@') ||
    url.pathname.startsWith('/src/');

  if (isCodeOrStyle) {
    event.respondWith(
      fetch(request, { cache: 'no-cache' })
        .then((networkResponse) => {
          if (networkResponse && networkResponse.ok) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
          }
          return networkResponse;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // 4. Médias & images : Cache-First avec repli réseau et mise à jour en tâche de fond
  const isMediaAsset =
    url.pathname.match(/\.(?:png|jpg|jpeg|svg|webp|woff2?|ico)$/i) ||
    url.hostname.includes('googleapis.com') ||
    url.hostname.includes('gstatic.com');

  if (isMediaAsset) {
    event.respondWith(
      caches.match(request).then((cachedResponse) => {
        if (cachedResponse) {
          // Rafraîchissement opportuniste en tâche de fond
          fetch(request)
            .then((networkResponse) => {
              if (networkResponse && networkResponse.ok) {
                caches.open(CACHE_NAME).then((cache) => cache.put(request, networkResponse));
              }
            })
            .catch(() => {});
          return cachedResponse;
        }

        return fetch(request)
          .then((networkResponse) => {
            if (networkResponse && networkResponse.ok) {
              const clone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(request, clone));
            }
            return networkResponse;
          })
          .catch(() => {
            if (url.pathname.match(/\.(?:png|jpg|jpeg|webp)$/i)) {
              return caches.match('/semako_logo.jpg');
            }
            return new Response('', { status: 408, statusText: 'Request timed out' });
          });
      })
    );
    return;
  }

  // 5. Par défaut : Réseau prioritaire
  event.respondWith(
    fetch(request)
      .catch(() => caches.match(request))
  );
});
