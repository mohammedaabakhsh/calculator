const CACHE = 'calculator-v2';
const APP_FILES = [
  '/calculator/',
  '/calculator/index.html',
  '/calculator/app.js',
  '/calculator/manifest.json',
  '/calculator/icon.svg',
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(c => c.addAll(APP_FILES))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const url = new URL(e.request.url);

  // تجاهل طلبات CDN والخطوط — المتصفح يتعامل معها مباشرة
  if (url.origin !== self.location.origin) return;

  // ملفات التطبيق: cache أولاً، ثم الشبكة
  e.respondWith(
    caches.match(e.request).th