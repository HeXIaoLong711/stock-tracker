// ============================================================================
//  赛道龙头 — 新闻代理 Worker (Cloudflare Worker)
//  功能：服务端抓取 36氪 / Solidot RSS，解析为标准 JSON 并返回（带 CORS）
//  用法：部署到 Cloudflare 后，访问  https://<你的子域>.workers.dev/news
//  应用端用 fetch 请求该地址即可拿到实时新闻（绕开 WAF / 跨域限制）
// ============================================================================

const FEEDS = [
  { name: '36氪', url: 'https://www.36kr.com/feed' },
  { name: 'Solidot', url: 'https://www.solidot.org/index.rss' }
];

function clean(s) {
  if (!s) return '';
  return s.replace(/<!\[CDATA\[|\]\]>/g, '').replace(/\s+/g, ' ').trim();
}

function stripHtml(s) {
  if (!s) return '';
  return s.replace(/<[^>]+>/g, ' ').replace(/&[a-z]+;/gi, ' ').replace(/\s+/g, ' ').trim();
}

// 把 RSS 的 pubDate 转成 Unix 秒级时间戳；无法解析返回 0
function toTs(pub) {
  if (!pub) return 0;
  let s = pub.trim().replace(/\s+/g, ' ');
  // "2026-07-03 10:26:11 +0800" -> "2026-07-03T10:26:11+08:00"
  if (/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}/.test(s)) {
    const m = s.match(/^(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})(?: ([+-]\d{4}))?/);
    if (m) {
      let tz = m[3] || '+0000';
      tz = tz.slice(0, 3) + ':' + tz.slice(3);
      s = m[1] + 'T' + m[2] + tz;
    }
  }
  const t = Date.parse(s);
  return isNaN(t) ? 0 : Math.floor(t / 1000);
}

function parseRSS(xml, sourceName) {
  if (!xml) return [];
  const out = [];
  const re = /<item>([\s\S]*?)<\/item>/g;
  let m;
  while ((m = re.exec(xml))) {
    const b = m[1];
    const title = clean((b.match(/<title>([\s\S]*?)<\/title>/) || [])[1] || '');
    if (!title) continue;
    const link = clean((b.match(/<link>([\s\S]*?)<\/link>/) || [])[1] || '');
    const pub = clean((b.match(/<pubDate>([\s\S]*?)<\/pubDate>/) || [])[1] || '');
    const desc = stripHtml((b.match(/<description>([\s\S]*?)<\/description>/) || [])[1] || '');
    out.push({ title, link, time: toTs(pub), source: sourceName, content: desc.slice(0, 200) });
  }
  return out;
}

async function gather() {
  const results = await Promise.all(FEEDS.map(async (f) => {
    try {
      const r = await fetch(f.url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; RSSProxy/1.0)' },
        cf: { cacheTtl: 300 }
      });
      if (!r.ok) return [];
      const txt = await r.text();
      return parseRSS(txt, f.name);
    } catch (e) {
      return [];
    }
  }));
  let all = results.flat();
  all.sort((a, b) => b.time - a.time);
  return all.slice(0, 80);
}

async function handle(request) {
  const url = new URL(request.url);
  if (url.pathname !== '/news') {
    return new Response('Not Found. Use /news', { status: 404 });
  }
  const items = await gather();
  const body = JSON.stringify({
    source: 'rss',
    updated: Math.floor(Date.now() / 1000),
    count: items.length,
    items
  });
  return new Response(body, {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=180'
    }
  });
}

addEventListener('fetch', (e) => {
  if (e.request.method === 'OPTIONS') {
    return e.respondWith(new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS'
      }
    }));
  }
  e.respondWith(handle(e.request));
});
