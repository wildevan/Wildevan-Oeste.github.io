const CACHE_NAME = 'meu-pwa-cache-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/Styles.css',
    '/app.js',
    '/assets/icon-192x192.png',
    '/assets/icon-512x512.png'
];

// Instala o Service Worker e adiciona arquivos ao cache
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Arquivos adicionados ao cache!');
            return cache.addAll(urlsToCache);
        })
    );
});

// Responde com arquivos do cache ou busca na rede
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});

// Atualiza o cache quando necessário
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Cache antigo removido:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
