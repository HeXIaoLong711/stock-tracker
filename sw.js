const CACHE_NAME = 'stock-tracker-v2';
const ASSETS_TO_CACHE = [
  './index.html',
  './style.css',
  './app.js',
  './manifest.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// 跨域 API 请求（行情/新闻）不走缓存，直接走网络
const API_HOSTS = ['qt.gtimg.cn', 'cls.cn', 'eastmoney', 'qq.com', 'sina.com.cn', 'crypto-js'];
function isApiRequest(url) {
  return API_HOSTS.some(h => url.includes(h));
}

self.addEventListener('fetch', event => {
  const url = event.request.url;

  // API 请求：network-only，不使用缓存
  if (isApiRequest(url)) {
    event.respondWith(
      fetch(event.request).catch(() => new Response('', { status: 503 }))
    );
    return;
  }

  // 本地静态资源：network-first
  // 先尝试网络，成功则更新缓存并返回；失败则回退到缓存（离线可用）
  event.respondWith(
    fetch(event.request).then(response => {
      const clone = response.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
      return response;
    }).catch(() => {
      return caches.match(event.request);
    })
  );
});
