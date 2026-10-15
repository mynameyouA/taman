// Tâm An AI - Progressive Web App Service Worker (v2.0)
const CACHE_NAME = "tam-an-ai-cache-v2";

const STATIC_ASSETS = [
  "/",
  "/manifest.json",
  "/icon-192x192.png",
  "/icon-512x512.png",
  "/apple-touch-icon.png",
  "/favicon.ico",
  "/thay_sinh_portrait.jpg",
  "/thay_sinh_speaking.jpg",
  "/thay_sinh_gesturing.jpg",
  "/thay_sinh_transcending.jpg"
];

// Cài đặt Service Worker và lưu trước tài nguyên cốt lõi
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("[PWA Service Worker] Đang lưu trước tài nguyên tĩnh...");
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Kích hoạt Service Worker và dọn dẹp cache cũ
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Chiến lược xử lý truy vấn mạng:
// - API routes & Chat: Network only
// - Static assets (ảnh, font, icon): Cache-first
// - HTML Pages: Network-first, fallback to cache
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Không cache API calls
  if (url.pathname.startsWith("/api/")) {
    return;
  }

  // Tài nguyên tĩnh: Cache-first
  if (
    url.pathname.endsWith(".png") ||
    url.pathname.endsWith(".jpg") ||
    url.pathname.endsWith(".svg") ||
    url.pathname.endsWith(".ico") ||
    url.pathname.endsWith(".woff2")
  ) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const clone = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Các trang giao diện: Network-first
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const clone = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return caches.match("/");
        });
      })
  );
});
