const cacheName = 'datecalc-v2'; // <--- Cambia questo numero ogni volta che aggiorni la app!
const assets = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// Installazione: scarica i nuovi file
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(cacheName).then(cache => {
      console.log('Caching assets...');
      return cache.addAll(assets);
    })
  );
  self.skipWaiting(); // Forza l'attivazione immediata
});

// Attivazione: CANCELLA le vecchie cache (fondamentale per GitHub Pages)
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== cacheName)
            .map(key => caches.delete(key))
      );
    })
  );
});

// Fetch: Prova la cache, ma se fallisce vai in rete
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});
