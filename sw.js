const CACHE_NAME = 'workout-app-v1';
const ASSETS_TO_CACHE = [
    './',
    './index.html',
    // Add your CSS, JS, and audio/image assets here as needed
    './manifest.json',
    './liftingpeanutsicon.jpg',
    './liftingpeanutsicon.jpg'
];

// Install event - caching assets
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
        })
    );
    self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// Fetch event - serve from cache, fall back to network
self.addEventListener('fetch', (event) => {
    event.asyncResponse = true;
    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            return cachedResponse || fetch(event.request).catch(() => {
                // Optional: Fallback to a offline page if needed
            });
        })
    );
});