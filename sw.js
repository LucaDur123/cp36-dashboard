// Service Worker - 36^ Cp Dashboard
const CACHE = 'cp36-v1';

self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(CACHE).then(function(cache) {
      return cache.addAll(['/', '/cp36-dashboard/', '/cp36-dashboard/index.html']);
    }).catch(function(){})
  );
});

self.addEventListener('fetch', function(e) {
  // Network first - always get fresh data (Supabase calls must go through)
  e.respondWith(
    fetch(e.request).catch(function() {
      return caches.match(e.request);
    })
  );
});
