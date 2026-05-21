// Service Worker - 36^ Cp Dashboard v3
const CACHE = 'cp36-v3';

self.addEventListener('install', function(e) {
  self.skipWaiting();
});

self.addEventListener('activate', function(e) {
  e.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function(k){ return caches.delete(k); }));
    }).then(function(){ return self.clients.claim(); })
  );
});

self.addEventListener('fetch', function(e) {
  // Always network first - never cache HTML or Supabase calls
  var url = e.request.url;
  if (url.includes('supabase.co') || url.endsWith('.html') || url.endsWith('/')) {
    e.respondWith(fetch(e.request));
    return;
  }
  // For other assets: network first with cache fallback
  e.respondWith(
    fetch(e.request).catch(function() {
      return caches.match(e.request);
    })
  );
});
