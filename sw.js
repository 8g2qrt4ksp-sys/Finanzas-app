self.addEventListener("install", e => {
  self.skipWaiting();
  e.waitUntil(
    caches.open("finanzas-v2").then(c =>
      c.addAll(["./","index.html","logo.png"])
    )
  );
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    )
  );
});

self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
