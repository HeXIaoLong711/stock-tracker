// Vercel Serverless Function: api/news.js
// 服务端抓取 36氪 + Solidot RSS，解析为标准 JSON 返回（带 CORS）
// 访问路径： https://<你的vercel项目>.vercel.app/api/news

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
    // 关键：必须先用 clean() 去掉 <![CDATA[ ... ]]> 包裹，否则 stripHtml 的 <[^>]+>
    // 会从首个 '<' 一直吃到 CDATA 结尾的 '>'，把整段正文一起吞掉（快讯条目尤甚）。
    const descRaw = (b.match(/<description>([\s\S]*?)<\/description>/) || [])[1] || '';
    let desc = stripHtml(clean(descRaw));
    // 去掉 "作者 | XXX 编辑 | XXX " 这类中文署名前缀（如 "作者 | 张子怡 编辑 | 袁斯来 硬氪获悉…"）
    desc = desc.replace(/^作者\s*[|｜]\s*[^\s，。、]+?\s+编辑\s*[|｜]\s*[^\s，。、]+?\s+/, '');
    if (!desc) desc = title; // 极端情况：description 仍为空则用标题兜底
    out.push({ title, link, time: toTs(pub), source: sourceName, content: desc.slice(0, 300) });
  }
  return out;
}

async function gather() {
  const results = await Promise.all(FEEDS.map(async (f) => {
    try {
      const r = await fetch(f.url, {
        headers: { 'User-Agent': 'Mozilla/5.0 (compatible; RSSProxy/1.0)' }
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

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  try {
    const items = await gather();
    res.status(200).json({
      source: 'rss',
      updated: Math.floor(Date.now() / 1000),
      count: items.length,
      items
    });
  } catch (e) {
    res.status(200).json({ source: 'rss', updated: Math.floor(Date.now() / 1000), count: 0, items: [] });
  }
}
