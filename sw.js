const CACHE_NAME = 'dm-compass-v1';
const URLS_TO_CACHE = [
  '/',
  '/index.html',
  '/manifest.json',
];

// Service Worker インストール
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching app shell');
      return cache.addAll(URLS_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Service Worker アクティベーション
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// Service Worker フェッチ
self.addEventListener('fetch', (event) => {
  const { request } = event;

  // GETリクエストのみキャッシュ
  if (request.method !== 'GET') {
    return;
  }

  // tRPC APIリクエストはネットワークファーストで処理
  if (request.url.includes('/api/trpc')) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // 成功したレスポンスはキャッシュに保存
          if (response.ok) {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // ネットワークエラーの場合、キャッシュから取得
          return caches.match(request).then((cachedResponse) => {
            if (cachedResponse) {
              return cachedResponse;
            }
            // キャッシュもない場合はオフラインページを返す
            return new Response(
              JSON.stringify({
                error: 'オフラインです。ネットワーク接続を確認してください。',
              }),
              {
                status: 503,
                statusText: 'Service Unavailable',
                headers: new Headers({
                  'Content-Type': 'application/json',
                }),
              }
            );
          });
        })
    );
    return;
  }

  // その他のリクエストはキャッシュファーストで処理
  event.respondWith(
    caches.match(request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }

      return fetch(request)
        .then((response) => {
          // 成功したレスポンスはキャッシュに保存
          if (response.ok && request.method === 'GET') {
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(request, responseToCache);
            });
          }
          return response;
        })
        .catch(() => {
          // ネットワークエラーの場合、キャッシュから取得
          return caches.match(request);
        });
    })
  );
});

// バックグラウンド同期（オプション）
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-data') {
    event.waitUntil(
      // オフラインで実行されたアクションをサーバーに同期
      fetch('/api/sync', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      }).catch(() => {
        console.log('[Service Worker] Sync failed, will retry later');
      })
    );
  }
});
