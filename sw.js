// =========================================================================
// JIWAS STUDIO - RESILIENT SERVICE WORKER (sw.js v4.0)
// Zero-Failure Cache Architecture • Safe Stale-While-Revalidate
// =========================================================================

// Ganti baris ini di sw.js:
const CACHE_NAME = 'jiwas-atelier-v4.1-bot'; // Ubah versi agar cache lama terhapus otomatis

// Aset lokal wajib (harus sukses di-cache)
const CORE_LOCAL_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './data.js',
  './config-pin.js',
  './manifest.json',
  './favicon.ico'
];

// Aset CDN pihak ketiga (ditoleransi jika jaringan lambat / offline saat install)
const OPTIONAL_CDN_ASSETS = [
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Cinzel:wght@600;800;900&family=Plus+Jakarta+Sans:wght@400;600;700;800&display=swap'
];

// Install Event - Cache aset inti tanpa takut gagal karena CDN pihak ketiga
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(async (cache) => {
      // 1. Cache berkas lokal mutlak
      await cache.addAll(CORE_LOCAL_ASSETS);
      // 2. Cache berkas eksternal satu per satu dengan penanganan error mandiri
      for (const url of OPTIONAL_CDN_ASSETS) {
        try {
          await cache.add(url);
        } catch (e) {
          // Lewatkan jika CDN terhalang; jangan batalkan instalasi Service Worker
        }
      }
    })
  );
  self.skipWaiting();
});

// Activate Event - Bersihkan cache lawas secara otomatis
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch Event - Stale-while-revalidate strategy aman
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const requestUrl = new URL(event.request.url);
  // Jangan cache permintaan backend lokal atau API
  if (requestUrl.port === '3000' || requestUrl.port === '4000' || requestUrl.pathname.startsWith('/api/')) {
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      const fetchPromise = fetch(event.request).then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => cachedResponse);

      return cachedResponse || fetchPromise;
    })
  );
});