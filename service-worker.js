const CACHE_NAME = 'sanctus-v1';
const ASSETS = [
  './',
  './SanctusWithicon.html',
  './manifest.json',
  './service-worker.js',
  './icons/app-icon.svg',
  './icons/chirho.png',
  './icons/christ crucified.jpg',
  './icons/nativity.jpg',
  './icons/pantocrator.jpg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) =>
      cached || fetch(event.request).catch(() => caches.match('./SanctusWithicon.html'))
    )
  );
});
