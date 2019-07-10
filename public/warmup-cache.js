self.addEventListener('install', (event) => {
    const urls = [
        'https://api.tvmaze.com/search/shows?q=batman'
    ]
    const cacheName = workbox.core.cacheNames.runtime
    event.waitUntil(caches.open(cacheName).then((cache) => cache.addAll(urls)))
});