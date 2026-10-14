// Service worker wersji PWA: wszystko w pamięci podręcznej, działa offline.
// Strona (index.html) idzie najpierw z sieci, więc poprawki dochodzą same; reszta z pamięci.
// Po zmianie fontów albo ikon podbij numer wersji.
const CACHE = "zegar-krokow-v1";
const FILES = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icons/icon-192.png",
  "icons/icon-512.png",
  "icons/maskable-512.png",
  "fonts/archivo-latin-var.woff2",
  "fonts/archivo-latin-ext-var.woff2",
  "fonts/figtree-latin-400.woff2",
  "fonts/figtree-latin-500.woff2",
  "fonts/figtree-latin-600.woff2",
  "fonts/figtree-latin-ext-400.woff2",
  "fonts/figtree-latin-ext-500.woff2",
  "fonts/figtree-latin-ext-600.woff2",
  "fonts/plexmono-latin-500.woff2",
  "fonts/plexmono-latin-600.woff2",
  "fonts/plexmono-latin-ext-500.woff2",
  "fonts/plexmono-latin-ext-600.woff2",
];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req)
        .then((res) => { const copy = res.clone(); caches.open(CACHE).then((c) => c.put("index.html", copy)); return res; })
        .catch(() => caches.match("index.html"))
    );
    return;
  }
  e.respondWith(caches.match(req).then((hit) => hit || fetch(req)));
});
