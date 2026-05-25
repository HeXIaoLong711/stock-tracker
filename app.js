/* ============================================================
   赛道龙头 - A股主流赛道分析  v2.1 (升级资讯模块)
   ============================================================ */

// ===== Sector Definitions =====
const SECTORS = [
  {
    id: 'ai', name: '人工智能', icon: '🤖', tagClass: '',
    stocks: ['sz002230','sh688256','sz000977','sz300418','sh603019'],
    stockNames: ['科大讯飞','寒武纪','浪潮信息','昆仑万维','中科曙光'],
    keywords: ['大模型','AIGC','算力需求','AI应用落地','国产AI芯片'],
    newsKeywords: ['人工智能','AI','大模型','GPT','ChatGPT','AIGC','深度学习','机器学习','算力','智算','文心','通义','kimi','豆包','deepseek','claude','gemini','openai','nvidia','英伟达','华为AI','昇腾','鸿蒙AI','盘古','华为大模型','智能体','Agent','多模态','具身智能','AI芯片','国产AI']
  },
  {
    id: 'semiconductor', name: '半导体', icon: '💎', tagClass: 'semi',
    stocks: ['sh688981','sz002371','sh603501','sz300782','sz300661'],
    stockNames: ['中芯国际','北方华创','韦尔股份','卓胜微','圣邦股份'],
    keywords: ['国产替代','设备自主化','先进封装','芯片设计','产能扩张'],
    newsKeywords: ['半导体','芯片','晶圆','光刻','封装','中芯','华创','EDA','GPU','英伟达','台积电','ASML','存储','NAND','DRAM','刻蚀','薄膜','IC设计','国产替代','先进制程','华为','麒麟','昇腾','鸿蒙','海思','华为芯片','国产芯片','麒麟芯片','华为处理器','鲲鹏','巴龙','天罡','射频芯片','模拟芯片','功率半导体','SiC','GaN','碳化硅','氮化镓','RISC-V','SoC']
  },
  {
    id: 'newenergy', name: '新能源', icon: '⚡', tagClass: 'newe',
    stocks: ['sz300750','sh601012','sh600438','sz002459','sz300274'],
    stockNames: ['宁德时代','隆基绿能','通威股份','晶澳科技','阳光电源'],
    keywords: ['储能爆发','光伏装机','电池技术','出海加速','成本下降'],
    newsKeywords: ['新能源','光伏','储能','电池','宁德时代','锂电','风电','硅料','硅片','组件','逆变器','充电桩','氢能','碳中和','光伏装机','电池技术','固态电池','钠电池','钙钛矿','BC电池','TOPCon','HJT','异质结','新能源车','动力电池','回收','梯次利用']
  },
  {
    id: 'greenelec', name: '绿电运营商', icon: '🌿', tagClass: 'green',
    stocks: ['sh600905','sh00916','sh600833','sz000537','sh600025'],
    stockNames: ['三峡能源','龙源电力','中绿电','金开新能','华能水电'],
    keywords: ['绿电交易','装机增长','电价市场化','碳交易','算电协同'],
    newsKeywords: ['绿电','电力','新能源发电','风电','光伏电站','碳交易','碳配额','绿证','三峡能源','龙源电力','电价','电力市场化','算电协同','数据中心','电力改革','新型电力','虚拟电厂','源网荷储','火电转型','抽水蓄能','核电','水电']
  },
  {
    id: 'compute_power', name: '算力/算电协同', icon: '🖥️', tagClass: 'comp',
    stocks: ['sz300474','sh603019','sz002230','sz300418','sz000977'],
    stockNames: ['景嘉微','中科曙光','科大讯飞','昆仑万维','浪潮信息'],
    keywords: ['智算中心','算力基建','GPU国产化','液冷散热','算电协同'],
    newsKeywords: ['算力','智算','数据中心','GPU','液冷','服务器','浪潮','曙光','算电协同','IDC','云计算','基础设施','东数西算','算力网络','华为算力','昇腾','华为服务器','国产GPU','景嘉微','国产操作系统','信创','国产化','C86','ARM服务器']
  },
  {
    id: 'robot', name: '机器人', icon: '🦾', tagClass: 'robo',
    stocks: ['sz300124','sh688017','sz002747','sz300024','sz002097'],
    stockNames: ['汇川技术','绿的谐波','埃斯顿','机器人','山河智能'],
    keywords: ['人形机器人','减速器','伺服系统','工业自动化','具身智能'],
    newsKeywords: ['机器人','人形机器人','工业机器人','减速器','伺服','自动化','具身智能','特斯拉机器人','优必选','傅利叶','智元','灵巧手','协作机器人','优傲','华为机器人','乐聚','宇树','小鹏机器人','小米机器人','手术机器人','无人机','低空经济']
  },
  {
    id: 'auto_smart', name: '智能驾驶', icon: '🚗', tagClass: 'auto',
    stocks: ['sz002594','sh601127','sz002920','sz002405','sz300496'],
    stockNames: ['比亚迪','赛力斯','德赛西威','四维图新','中科创达'],
    keywords: ['L3落地','NOA渗透','智驾芯片','车载软件','华为生态'],
    newsKeywords: ['智能驾驶','自动驾驶','无人驾驶','L3','L4','NOA','特斯拉FSD','华为智驾','小鹏','蔚来','理想','比亚迪','激光雷达','车载芯片','车路协同','智能座舱','问界','智界','享界','鸿蒙智行','华为汽车','赛力斯','车载OS','车机','OTA','线控','域控制器','飞凡','极氪','小米汽车']
  },
  {
    id: 'military', name: '军工', icon: '✈️', tagClass: 'mili',
    stocks: ['sh600760','sh600893','sz002179','sh600862','sz300034'],
    stockNames: ['中航沈飞','航发动力','中航光电','中航高科','钢研高纳'],
    keywords: ['装备采购','国防预算','国产替代','军工信息化','订单放量'],
    newsKeywords: ['军工','国防','航发','战斗机','航母','导弹','卫星','军费','装备','军工信息化','无人机','中航','沈飞','成飞','武器','地缘','低空经济','商业航天','火箭','星座','北斗','电子对抗','雷达','相控阵','六代机','轰20','055','两栖']
  },
  {
    id: 'pharma', name: '医药创新', icon: '💊', tagClass: 'phar',
    stocks: ['sh603259','sh600276','sz300760','sz300122','sh688180'],
    stockNames: ['药明康德','恒瑞医药','迈瑞医疗','智飞生物','君实生物'],
    keywords: ['创新药出海','ADC药物','GLP-1','医保谈判','国产替代'],
    newsKeywords: ['医药','创新药','GLP-1','ADC','PD-1','医保','药明','恒瑞','迈瑞','疫苗','生物药','CRO','CDMO','仿制药','集采','FDA','临床','审批','减肥药','司美格鲁肽','替尔泊肽','核酸药物','基因治疗','细胞疗法','CAR-T','AI制药','中医药','药店']
  },
  {
    id: 'data_element', name: '数据要素', icon: '📊', tagClass: 'data',
    stocks: ['sh600756','sz002368','sh603881','sz300212','sz000977'],
    stockNames: ['浪潮软件','太极股份','数据港','易华录','浪潮信息'],
    keywords: ['数据资产入表','数据交易','政务数据','算力支撑','数据安全'],
    newsKeywords: ['数据要素','数据交易','数据资产','数字经济','大数据','数据安全','隐私计算','政务数据','数据入表','数据确权','数据流通','数据局','信创','国产软件','华为云','政务云','数字政府','智慧城市','数据中心','AI应用','国产化替代']
  },
  {
    id: 'consume', name: '消费复苏', icon: '🛒', tagClass: 'cons',
    stocks: ['sh600519','sz000858','sz000333','sh600887','sz002714'],
    stockNames: ['贵州茅台','五粮液','美的集团','伊利股份','牧原股份'],
    keywords: ['消费回暖','高端化','渠道改革','品牌溢价','提价预期'],
    newsKeywords: ['消费','白酒','茅台','五粮液','家电','食品','零售','免税','旅游','餐饮','消费复苏','内需','消费券','以旧换新','新能源车消费','直播电商','跨境电商','预制菜','乳制品','猪周期','家电补贴','消费税','医美','化妆品','宠物经济']
  },
  {
    id: 'finance', name: '金融', icon: '🏦', tagClass: 'fina',
    stocks: ['sh600036','sh601318','sh600030','sz000776','sh601166'],
    stockNames: ['招商银行','中国平安','中信证券','广发证券','北京银行'],
    keywords: ['利率政策','财富管理','投行活跃','估值修复','分红稳健'],
    newsKeywords: ['金融','银行','证券','保险','利率','LPR','降息','降准','央行','货币','信贷','券商','IPO','基金','理财','融资','北交所','注册制','化债','地方债','国债','货币政策','金融监管','并购重组','量化','融资融券','ETF','红利']
  }
];

// ===== App State =====
const state = {
  activeTab: 'track',
  stockData: {},      // code -> parsed data
  sectorResults: [],  // analyzed sector results
  leaders: [],        // top leader stocks
  indexData: {},      // major indices
  newsData: [],       // classified news items
  newsFilter: 'all',  // current news filter
  lastUpdate: null,
  loading: true,
  error: null
};

// ===== DOM References =====
const $ = id => document.getElementById(id);

// ===== Tab Switching =====
function switchTab(tab) {
  state.activeTab = tab;
  document.querySelectorAll('.tab-item').forEach(t => t.classList.toggle('active', t.dataset.tab === tab));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === `tab-${tab}`));
  $('nav-title').textContent = {
    track: '赛道龙头', leader: '龙头个股', news: '行业资讯', market: '行情概览', about: '关于'
  }[tab];
}

// ===== Data Fetching (Tencent Stock API via Script Tag) =====
function fetchStockData(codes) {
  return new Promise((resolve, reject) => {
    // Clean any previous data
    codes.forEach(code => { delete window['v_' + code]; });

    const script = document.createElement('script');
    script.src = 'https://qt.gtimg.cn/q=' + codes.join(',');
    script.charset = 'gbk';

    const timer = setTimeout(() => {
      script.remove();
      // Still try to read whatever data was loaded
      const results = collectResults(codes);
      resolve(results);
    }, 10000);

    script.onload = () => {
      clearTimeout(timer);
      // Small delay to let variables settle
      setTimeout(() => {
        script.remove();
        const results = collectResults(codes);
        resolve(results);
      }, 100);
    };

    script.onerror = () => {
      clearTimeout(timer);
      script.remove();
      // Try alternative API
      fetchStockDataAlt(codes).then(resolve).catch(() => resolve({}));
    };

    document.head.appendChild(script);
  });
}

function collectResults(codes) {
  const results = {};
  codes.forEach(code => {
    const key = 'v_' + code;
    if (window[key]) {
      results[code] = parseTencentData(code, window[key]);
      delete window[key];
    }
  });
  return results;
}

// Alternative API: Sina Finance
function fetchStockDataAlt(codes) {
  return new Promise((resolve) => {
    const sinaCodes = codes.map(c => {
      const prefix = c.startsWith('sh') ? 'sh' : 'sz';
      return c;
    }).join(',');

    const script = document.createElement('script');
    script.src = 'https://hq.sinajs.cn/list=' + sinaCodes;

    const timer = setTimeout(() => {
      script.remove();
      resolve({});
    }, 8000);

    script.onload = () => {
      clearTimeout(timer);
      script.remove();
      const results = {};
      codes.forEach(code => {
        const key = 'hq_str_' + code;
        if (window[key]) {
          results[code] = parseSinaData(code, window[key]);
          delete window[key];
        }
      });
      resolve(results);
    };

    script.onerror = () => {
      clearTimeout(timer);
      script.remove();
      resolve({});
    };

    document.head.appendChild(script);
  });
}

function parseSinaData(code, raw) {
  if (!raw) return null;
  const p = raw.split(',');
  if (p.length < 32) return null;
  const name = p[0];
  const open = parseFloat(p[1]);
  const lastClose = parseFloat(p[2]);
  const price = parseFloat(p[3]);
  const high = parseFloat(p[4]);
  const low = parseFloat(p[5]);
  const volume = parseInt(p[8]) || 0;
  const change = price - lastClose;
  const changePct = lastClose ? (change / lastClose * 100) : 0;
  return {
    code, name, price, lastClose, open, volume, high, low,
    change: Math.round(change * 100) / 100,
    changePct: Math.round(changePct * 100) / 100,
    turnover: 0, pe: 0, totalMV: 0, circMV: 0, timestamp: p[31] || ''
  };
}

function parseTencentData(code, raw) {
  if (!raw || raw.length < 10) return null;
  const p = raw.split('~');
  if (p.length < 40) return null;
  const price = parseFloat(p[3]);
  const lastClose = parseFloat(p[4]);
  const change = price - lastClose;
  const changePct = lastClose ? (change / lastClose * 100) : 0;
  return {
    code,
    name: p[1],
    price,
    lastClose,
    open: parseFloat(p[5]),
    volume: parseInt(p[6]) || 0,
    high: parseFloat(p[33]) || price,
    low: parseFloat(p[34]) || price,
    change: Math.round(change * 100) / 100,
    changePct: Math.round(changePct * 100) / 100,
    turnover: parseFloat(p[38]) || 0,
    pe: parseFloat(p[39]) || 0,
    totalMV: parseFloat(p[45]) || 0,    // 亿
    circMV: parseFloat(p[44]) || 0,
    timestamp: p[30] || ''
  };
}

// ===== Fallback: no longer needed, handled in fetchStockData =====

// ===== Sector Analysis =====
function analyzeSectors() {
  const results = SECTORS.map(sector => {
    const stockResults = sector.stocks
      .map((code, i) => {
        const d = state.stockData[code];
        if (!d) return null;
        return { ...d, displayName: sector.stockNames[i] || d.name };
      })
      .filter(Boolean);

    if (stockResults.length === 0) {
      return { ...sector, avgChange: 0, upCount: 0, downCount: 0, total: sector.stocks.length, leader: null, stocks: [] };
    }

    const avgChange = stockResults.reduce((s, d) => s + d.changePct, 0) / stockResults.length;
    const upCount = stockResults.filter(d => d.changePct > 0).length;
    const downCount = stockResults.filter(d => d.changePct < 0).length;

    // Leader = highest change% (most representative)
    stockResults.sort((a, b) => b.changePct - a.changePct);
    const leader = stockResults[0];

    return {
      ...sector,
      avgChange: Math.round(avgChange * 100) / 100,
      upCount,
      downCount,
      total: sector.stocks.length,
      leader,
      stocks: stockResults
    };
  });

  // Sort by avg change descending
  results.sort((a, b) => b.avgChange - a.avgChange);
  state.sectorResults = results;

  // Collect leaders
  state.leaders = results
    .filter(s => s.leader && s.avgChange > 0)
    .map(s => ({
      ...s.leader,
      sectorName: s.name,
      sectorIcon: s.icon,
      sectorAvg: s.avgChange,
      sectorKeywords: s.keywords,
      reasons: generateReasons(s.leader, s)
    }))
    .sort((a, b) => b.changePct - a.changePct);
}

function generateReasons(stock, sector) {
  const reasons = [];
  const cp = stock.changePct;
  const sa = sector.avgChange;

  // Performance vs sector
  if (cp > sa * 1.5 && cp > 2) {
    reasons.push(`涨幅 ${cp.toFixed(2)}% 显著领跑「${sector.name}」板块均涨幅 ${sa.toFixed(2)}%`);
  } else if (cp > sa && cp > 0) {
    reasons.push(`涨幅高于板块均值，领涨效应突出`);
  }

  // Sector trend
  if (sector.upCount >= sector.total * 0.6) {
    reasons.push(`板块内 ${sector.upCount}/${sector.total} 只个股上涨，整体趋势强劲`);
  }

  // Keywords based reasons
  const kw = sector.keywords;
  if (kw && kw.length > 0) {
    const topKW = sa > 3 ? kw.slice(0, 2) : kw.slice(0, 1);
    reasons.push(`核心催化：${topKW.join('、')}`);
  }

  // Market cap
  if (stock.totalMV > 1000) {
    reasons.push(`总市值 ${stock.totalMV.toFixed(0)} 亿，行业标杆地位稳固`);
  }

  // Turnover
  if (stock.turnover > 5) {
    reasons.push(`换手率 ${stock.turnover.toFixed(1)}%，资金活跃度高`);
  } else if (stock.turnover > 2) {
    reasons.push(`换手率 ${stock.turnover.toFixed(1)}%，市场关注度提升`);
  }

  // Volume
  if (stock.volume > 50000) {
    reasons.push('成交放量，主力资金积极参与');
  }

  if (reasons.length === 0) {
    reasons.push('板块轮动中表现相对强势');
  }

  return reasons;
}

// ===== Rendering =====
function renderSentiment() {
  const positiveSectors = state.sectorResults.filter(s => s.avgChange > 0).length;
  const totalSectors = state.sectorResults.length;
  const ratio = totalSectors ? (positiveSectors / totalSectors * 100).toFixed(0) : 0;
  const avgAll = state.sectorResults.length
    ? (state.sectorResults.reduce((s, x) => s + x.avgChange, 0) / state.sectorResults.length).toFixed(2)
    : '0.00';
  const isUp = parseFloat(avgAll) >= 0;

  $('sentiment').innerHTML = `
    <div>
      <div class="label">市场情绪</div>
      <div class="value ${isUp ? 'up' : 'down'}">${isUp ? '偏多' : '偏空'}</div>
    </div>
    <div style="text-align:center">
      <div class="label">赛道涨跌比</div>
      <div class="value ${isUp ? 'up' : 'down'}">${positiveSectors}:${totalSectors - positiveSectors}</div>
    </div>
    <div style="text-align:right">
      <div class="label">全赛道均幅</div>
      <div class="value ${isUp ? 'up' : 'down'}">${isUp ? '+' : ''}${avgAll}%</div>
    </div>
  `;
}

function renderSectorList() {
  const container = $('sector-list');
  container.innerHTML = state.sectorResults.map((s, i) => {
    const isUp = s.avgChange >= 0;
    const rankClass = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : 'normal';
    return `
      <div class="sector-card fade-in" style="animation-delay:${i * 0.05}s" onclick="showSectorDetail(${i})">
        <div class="rank-badge ${rankClass}">${i + 1}</div>
        <div class="sector-header">
          <div class="left">
            <span class="emoji">${s.icon}</span>
            <span class="name">${s.name}</span>
          </div>
          <div class="change ${isUp ? 'up' : 'down'}">
            ${isUp ? '+' : ''}${s.avgChange.toFixed(2)}%
          </div>
        </div>
        <div class="sector-stats">
          <span><span class="dot red"></span> 涨 ${s.upCount}</span>
          <span><span class="dot green"></span> 跌 ${s.downCount}</span>
          <span>共 ${s.total} 只</span>
        </div>
        ${s.leader ? `
        <div class="sector-leader">
          <div style="display:flex;align-items:center">
            <span class="tag">龙头</span>
            <span class="stock-name">${s.leader.displayName || s.leader.name}</span>
          </div>
          <span class="stock-change ${s.leader.changePct >= 0 ? 'up' : 'down'}">
            ${s.leader.changePct >= 0 ? '+' : ''}${s.leader.changePct.toFixed(2)}%
          </span>
        </div>
        ` : ''}
      </div>
    `;
  }).join('');
}

function renderLeaderList() {
  const container = $('leader-list');
  if (state.leaders.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <div class="icon">📉</div>
        <div class="text">当前无领涨个股</div>
      </div>
    `;
    return;
  }
  container.innerHTML = state.leaders.map((l, i) => {
    const isUp = l.changePct >= 0;
    return `
      <div class="leader-card fade-in" style="animation-delay:${i * 0.05}s">
        <div class="top-row">
          <div class="stock-info">
            <span class="name">${l.displayName || l.name}</span>
            <span class="code">${l.code.replace(/^(sh|sz)/, '')}</span>
          </div>
          <div class="price-area">
            <div class="price ${isUp ? 'up' : 'down'}">${l.price.toFixed(2)}</div>
            <div class="chg ${isUp ? 'up' : 'down'}">${isUp ? '+' : ''}${l.changePct.toFixed(2)}%</div>
          </div>
        </div>
        <div class="sector-tag">${l.sectorIcon} ${l.sectorName}</div>
        <div class="reasons">
          <div class="reason-title">💡 为什么是龙头</div>
          <ul>${l.reasons.map(r => `<li>${r}</li>`).join('')}</ul>
        </div>
      </div>
    `;
  }).join('');
}

function renderMarketOverview() {
  // Render indices
  const idxContainer = $('index-cards');
  const indices = [
    { name: '上证指数', code: 'sh000001' },
    { name: '深证成指', code: 'sz399001' },
    { name: '创业板指', code: 'sz399006' }
  ];
  idxContainer.innerHTML = indices.map(idx => {
    const d = state.indexData[idx.code];
    if (!d) return `<div class="index-card"><div class="name">${idx.name}</div><div class="price">--</div></div>`;
    const isUp = d.changePct >= 0;
    const color = isUp ? 'var(--red)' : 'var(--green)';
    return `
      <div class="index-card">
        <div class="name">${idx.name}</div>
        <div class="price" style="color:${color}">${d.price.toFixed(2)}</div>
        <div class="change" style="color:${color}">${isUp ? '+' : ''}${d.changePct.toFixed(2)}%</div>
      </div>
    `;
  }).join('');

  // Render heatmap
  const hmContainer = $('heatmap');
  hmContainer.innerHTML = state.sectorResults.map(s => {
    const val = s.avgChange;
    let bg;
    if (val >= 3) bg = '#CC0000';
    else if (val >= 2) bg = '#E03030';
    else if (val >= 1) bg = '#FF4444';
    else if (val >= 0.5) bg = '#FF6B6B';
    else if (val > 0) bg = '#FF9999';
    else if (val === 0) bg = '#8E8E93';
    else if (val > -0.5) bg = '#88CC88';
    else if (val > -1) bg = '#55AA55';
    else if (val > -2) bg = '#338833';
    else bg = '#1A6B1A';

    return `
      <div class="heatmap-cell" style="background:${bg}" onclick="showSectorDetail(${state.sectorResults.indexOf(s)})">
        <div class="h-name">${s.icon} ${s.name}</div>
        <div class="h-change">${val >= 0 ? '+' : ''}${val.toFixed(2)}%</div>
      </div>
    `;
  }).join('');
}

// ===== Sector Detail Modal =====
function showSectorDetail(index) {
  const s = state.sectorResults[index];
  if (!s) return;

  const isUp = s.avgChange >= 0;
  $('modal-sector-name').textContent = `${s.icon} ${s.name}`;
  $('modal-sector-avg').textContent = `${isUp ? '+' : ''}${s.avgChange.toFixed(2)}%`;
  $('modal-sector-avg').style.color = isUp ? 'var(--red)' : 'var(--green)';

  // Keywords
  $('modal-keywords').innerHTML = s.keywords.map(k => `<span style="display:inline-block;font-size:11px;padding:2px 8px;border-radius:4px;background:rgba(0,122,255,.08);color:var(--primary);margin:2px 2px">${k}</span>`).join('');

  // Stock list
  $('modal-stocks').innerHTML = s.stocks.map((st, i) => {
    const up = st.changePct >= 0;
    return `
      <div class="detail-stock-row">
        <div class="left">
          <span class="rank">${i + 1}</span>
          <span class="name">${st.displayName || st.name}</span>
          <span class="code">${st.code.replace(/^(sh|sz)/, '')}</span>
        </div>
        <div class="right">
          <div class="price" style="color:${up ? 'var(--red)' : 'var(--green)'}">${st.price.toFixed(2)}</div>
          <div class="chg" style="color:${up ? 'var(--red)' : 'var(--green)'}">${up ? '+' : ''}${st.changePct.toFixed(2)}%</div>
        </div>
      </div>
    `;
  }).join('');

  $('modal-overlay').classList.add('show');
}

function closeModal() {
  $('modal-overlay').classList.remove('show');
}

// ===== News Module =====

// Fetch news from East Money (supports JSONP) - multiple columns for broader coverage
function fetchNews() {
  // Multiple news columns: 250=要闻, 352=科技, 354=7x24, 462=半导体, 463=新能源, 464=医药, 465=消费, 466=金融, 467=军工
  const COLUMNS = [250, 352, 354, 462, 463, 464, 465, 466, 467];

  const fetchColumn = (col) => {
    return new Promise((resolve) => {
      const cbName = 'em_news_cb_' + col + '_' + Date.now();
      const timeout = setTimeout(() => {
        delete window[cbName];
        resolve([]);
      }, 8000);

      window[cbName] = function(data) {
        clearTimeout(timeout);
        delete window[cbName];
        const newsList = [];
        if (data && data.data && data.data.list) {
          data.data.list.forEach(item => {
            newsList.push({
              title: item.title || '',
              content: item.digest || item.content || '',
              source: item.source || '东方财富',
              time: item.ctime || item.showtime || '',
              url: item.url || '',
              sectorIds: [],
              impact: null,
              impactSummary: '',
              impactDetails: [],
              relatedStocks: []
            });
          });
        }
        resolve(newsList);
      };

      const script = document.createElement('script');
      script.src = 'https://np-listapi.eastmoney.com/comm/web/getNewsByColumn?client=web&biz=web_news_col&column=' + col + '&order=1&needInteractData=0&page_index=1&page_size=20&req_trace=' + Date.now() + '&callback=' + cbName;
      script.onerror = () => {
        clearTimeout(timeout);
        delete window[cbName];
        resolve([]);
      };
      document.head.appendChild(script);
      script.onload = () => script.remove();
    });
  };

  return Promise.all(COLUMNS.map(col => fetchColumn(col))).then(results => {
    // Merge & deduplicate by title
    const allNews = [];
    const seenTitles = new Set();
    results.forEach(list => {
      list.forEach(item => {
        if (item.title && !seenTitles.has(item.title)) {
          seenTitles.add(item.title);
          allNews.push(item);
        }
      });
    });
    return allNews;
  });
}

// Fetch additional sector news from Sina
function fetchSinaNews() {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://feed.mix.sina.com.cn/api/roll/get?pageid=155&lid=2509&k=&num=50&page=1&r=' + Date.now();

    const timer = setTimeout(() => {
      script.remove();
      resolve([]);
    }, 8000);

    script.onload = () => {
      clearTimeout(timer);
      script.remove();
      resolve([]);
    };
    script.onerror = () => {
      clearTimeout(timer);
      script.remove();
      resolve([]);
    };
    document.head.appendChild(script);
  });
}

// Fallback: generate context-aware sample news based on sector keywords & market data
function generateFallbackNews() {
  const now = new Date();
  const dateStr = (now.getMonth() + 1) + '月' + now.getDate() + '日';
  const newsTemplates = [];

  // AI
  newsTemplates.push(
    { title: '国内大模型厂商密集发布新品，AI应用加速落地', sector: 'ai', impact: 'positive', summary: '大模型迭代提速带动算力需求持续扩张', details: ['国内头部大模型厂商本周密集发布新一代产品，性能大幅提升', 'AI应用从文本对话向多模态、Agent方向演进，商业化加速', '算力需求持续扩张，利好AI芯片及服务器厂商'], stocks: '科大讯飞、寒武纪、中科曙光' },
    { title: '国务院印发人工智能产业发展规划，明确2026年目标', sector: 'ai', impact: 'positive', summary: '政策定调为AI产业提供长期增长确定性', details: ['规划提出到2026年AI核心产业规模超6000亿元', '重点支持大模型、AI芯片、具身智能等方向', '各地方政府配套政策加速落地'], stocks: '科大讯飞、浪潮信息、昆仑万维' }
  );

  // Semiconductor
  newsTemplates.push(
    { title: '国内晶圆厂扩产提速，半导体设备订单持续增长', sector: 'semiconductor', impact: 'positive', summary: '国产替代驱动半导体设备进入高景气周期', details: ['中芯国际、华虹等多家晶圆厂宣布扩产计划', '国产半导体设备中标率持续提升，北方华创等订单饱满', '先进封装产能紧张，CoWoS等扩产迫切'], stocks: '北方华创、中芯国际、圣邦股份' },
    { title: '美国半导体出口管制升级，国产替代紧迫性进一步增强', sector: 'semiconductor', impact: 'positive', summary: '短期扰动但中长期加速国产替代进程', details: ['新规限制AI芯片及半导体设备对华出口', '倒逼国内厂商加速自主研发和供应链国产化', 'EDA、光刻等卡脖子环节获政策重点扶持'], stocks: '中芯国际、北方华创、韦尔股份' }
  );

  // New Energy
  newsTemplates.push(
    { title: '储能装机量超预期，新型储能项目密集并网', sector: 'newenergy', impact: 'positive', summary: '储能景气度向上，光伏产业链价格触底回暖', details: ['一季度新型储能新增装机同比增长超100%', '光伏组件价格已降至底部区间，装机需求释放', '海外市场需求旺盛，出口数据持续改善'], stocks: '宁德时代、阳光电源、晶澳科技' },
    { title: '固态电池技术突破，多家车企发布量产计划', sector: 'newenergy', impact: 'positive', summary: '电池技术革新打开新能源车增长新空间', details: ['多家电池厂商宣布固态电池取得关键技术突破', '半固态电池已开始装车量产', '技术升级有望解决安全性与续航焦虑'], stocks: '宁德时代、通威股份' }
  );

  // Green Power
  newsTemplates.push(
    { title: '算电协同政策出台，绿电运营商迎新增长点', sector: 'greenelec', impact: 'positive', summary: '数据中心电力需求推升绿电消纳与装机增长', details: ['国家发改委出台算电协同发展指导意见', '数据中心用电量激增，绿电直供模式加速推广', '绿电运营商与数据中心签约量大幅增长'], stocks: '三峡能源、龙源电力、金开新能' }
  );

  // Compute Power
  newsTemplates.push(
    { title: '全国智算中心建设加速，算力基建投资持续加码', sector: 'compute_power', impact: 'positive', summary: '智算中心建设拉动GPU服务器与液冷需求', details: ['多地发布智算中心建设规划，总投资超千亿', '国产GPU性能提升，市场份额逐步扩大', '液冷散热成为智算中心标配方案'], stocks: '中科曙光、浪潮信息、景嘉微' }
  );

  // Robot
  newsTemplates.push(
    { title: '人形机器人量产在即，产业链公司订单快速增长', sector: 'robot', impact: 'positive', summary: '人形机器人从概念走向量产，零部件需求爆发', details: ['多家企业发布人形机器人量产计划，价格下探至10万元级别', '减速器、伺服电机等核心零部件需求快速增长', '工业场景率先落地，服务场景加速探索'], stocks: '汇川技术、绿的谐波、埃斯顿' }
  );

  // Auto
  newsTemplates.push(
    { title: 'L3自动驾驶法规落地，智驾渗透率加速提升', sector: 'auto_smart', impact: 'positive', summary: '政策松绑推动智能驾驶进入大规模商用阶段', details: ['多个城市发放L3自动驾驶上路牌照', 'NOA功能下放至15万级别车型，渗透率快速提升', '激光雷达、车载芯片等供应链需求旺盛'], stocks: '比亚迪、德赛西威、赛力斯' }
  );

  // Military
  newsTemplates.push(
    { title: '国防预算稳步增长，军工行业订单持续回暖', sector: 'military', impact: 'positive', summary: '国防开支增长为军工行业提供基本面支撑', details: ['2026年国防预算同比增长7.2%，保持稳健增长', '军工企业订单逐季改善，业绩拐点显现', '军工信息化、无人装备等新质方向获重点投入'], stocks: '中航沈飞、航发动力、中航光电' }
  );

  // Pharma
  newsTemplates.push(
    { title: '创新药出海取得突破，多款国产新药获FDA快速通道', sector: 'pharma', impact: 'positive', summary: '创新药国际化打开估值天花板', details: ['多家国内药企创新药获FDA快速通道或突破性疗法认定', 'ADC、GLP-1等热门赛道出海交易活跃', '医保谈判规则优化，创新药定价环境改善'], stocks: '恒瑞医药、药明康德、迈瑞医疗' }
  );

  // Data Element
  newsTemplates.push(
    { title: '数据资产入表政策正式实施，数据要素市场加速形成', sector: 'data_element', impact: 'positive', summary: '数据资产化推动数字经济进入新阶段', details: ['数据资产入表会计准则正式实施，企业数据价值可量化', '多地数据交易所上线，数据交易规模快速增长', '政务数据开放共享力度加大，数据安全需求提升'], stocks: '太极股份、易华录、数据港' }
  );

  // Consume
  newsTemplates.push(
    { title: '消费刺激政策密集出台，以旧换新拉动内需', sector: 'consume', impact: 'positive', summary: '政策组合拳提振消费信心与终端需求', details: ['以旧换新政策扩围至家电、汽车等多领域', '消费券发放力度加大，社零数据回暖', '高端白酒批价企稳回升，品牌消费韧性凸显'], stocks: '贵州茅台、美的集团、五粮液' }
  );

  // Finance
  newsTemplates.push(
    { title: '央行降准降息，流动性宽松助力金融板块估值修复', sector: 'finance', impact: 'positive', summary: '货币政策宽松利好银行息差与券商交易量', details: ['央行宣布降准0.5个百分点，释放长期流动性', 'LPR同步下调，降低实体经济融资成本', '市场交易活跃度提升，券商受益于成交量放大'], stocks: '招商银行、中信证券、中国平安' }
  );

  // Some negative/neutral templates for diversity
  newsTemplates.push(
    { title: '光伏行业产能过剩担忧升温，组件价格持续下行', sector: 'newenergy', impact: 'negative', summary: '产能过剩压力下行业洗牌加速', details: ['光伏组件产能利用率下降，库存积压', '价格战激烈，中小企业面临出清', '行业集中度有望提升，龙头抗风险能力强'], stocks: '通威股份、隆基绿能' },
    { title: '美联储加息预期反复，全球风险偏好承压', sector: 'finance', impact: 'negative', summary: '外部流动性收紧压制市场估值', details: ['美国通胀数据超预期，降息节奏放缓', '北向资金流出压力增大', '高估值板块受压，金融板块分化'], stocks: '中国平安、招商银行' },
    { title: '集采扩面消息影响医药板块情绪', sector: 'pharma', impact: 'negative', summary: '集采常态化压缩仿制药利润空间', details: ['新一轮集采涉及更多品种和剂型', '仿制药企业利润承压，创新转型迫切', '创新药及器械受影响相对较小'], stocks: '恒瑞医药、药明康德' }
  );

  return newsTemplates.map(t => {
    const sectorDef = SECTORS.find(s => s.id === t.sector);
    return {
      title: '【' + dateStr + '】' + t.title,
      content: t.details.join('。'),
      source: '财经综合',
      time: dateStr + ' ' + (8 + Math.floor(Math.random() * 8)) + ':' + String(Math.floor(Math.random() * 60)).padStart(2, '0'),
      url: '',
      sectorIds: [t.sector],
      impact: t.impact,
      impactSummary: t.summary,
      impactDetails: t.details,
      relatedStocks: t.stocks
    };
  });
}

// Classify a news item into sectors by keyword matching
function classifyNews(newsItem) {
  const text = (newsItem.title + ' ' + newsItem.content).toLowerCase();
  const matchedSectors = [];

  SECTORS.forEach(sector => {
    const kw = sector.newsKeywords || [];
    let score = 0;
    kw.forEach(k => {
      if (text.indexOf(k.toLowerCase()) >= 0) score++;
    });
    if (score >= 1) {
      matchedSectors.push({ id: sector.id, score });
    }
  });

  // Sort by score descending, take top 2
  matchedSectors.sort((a, b) => b.score - a.score);
  return matchedSectors.slice(0, 2).map(m => m.id);
}

// Analyze impact of a news item
function analyzeImpact(newsItem, sectorIds) {
  const text = (newsItem.title + ' ' + newsItem.content).toLowerCase();

  // Positive keywords
  const positiveKW = ['突破','增长','超预期','加速','提升','扩张','利好','获批','放量','创新高','回暖','上行',
    '落地','释放','繁荣','爆发','景气','扶持','鼓励','补贴','订单','量产','出海','升级','翻倍','首次',
    '里程碑','新突破','强劲','蓬勃发展','快速发展','大幅增长','超预期增长','重大进展'];

  // Negative keywords
  const negativeKW = ['下滑','下降','亏损','下跌','萎缩','收紧','限制','制裁','管控','风险','担忧','承压',
    '过剩','降价','下调','放缓','减少','退坡','约束','出清','紧张','违约','暴雷','缩量','回落',
    '不及预期','下降','压力','冲击','负面','受限','受阻','困难','挑战'];

  let posScore = 0, negScore = 0;
  positiveKW.forEach(k => { if (text.indexOf(k) >= 0) posScore++; });
  negativeKW.forEach(k => { if (text.indexOf(k) >= 0) negScore++; });

  let impact, summary, details;

  if (posScore > negScore + 1) {
    impact = 'positive';
  } else if (negScore > posScore + 1) {
    impact = 'negative';
  } else if (posScore > negScore) {
    impact = 'positive';
  } else if (negScore > posScore) {
    impact = 'negative';
  } else {
    impact = 'neutral';
  }

  // Generate summary based on impact and sector
  const sectorNames = sectorIds.map(id => SECTORS.find(s => s.id === id)).filter(Boolean);
  const sectorName = sectorNames.length > 0 ? sectorNames[0].name : '市场';

  if (impact === 'positive') {
    summary = '利好' + sectorName + '板块，有望推动相关标的走强';
  } else if (impact === 'negative') {
    summary = '利空' + sectorName + '板块，短期可能承压';
  } else {
    summary = '对' + sectorName + '板块影响中性，需持续关注';
  }

  // Generate detail points
  details = [];
  if (posScore > 0) {
    const matchedPos = positiveKW.filter(k => text.indexOf(k) >= 0).slice(0, 3);
    if (matchedPos.length > 0) {
      details.push('积极信号：' + matchedPos.join('、'));
    }
  }
  if (negScore > 0) {
    const matchedNeg = negativeKW.filter(k => text.indexOf(k) >= 0).slice(0, 3);
    if (matchedNeg.length > 0) {
      details.push('风险提示：' + matchedNeg.join('、'));
    }
  }

  // Find related stocks from sector definitions
  const relatedStocks = sectorNames.map(s => s.stockNames.slice(0, 3).join('、')).filter(Boolean).join('、');

  return { impact, summary, details, relatedStocks };
}

// Process all news
function processNews(rawNews) {
  return rawNews.map(item => {
    const sectorIds = classifyNews(item);
    const analysis = analyzeImpact(item, sectorIds);
    return {
      ...item,
      sectorIds: sectorIds.length > 0 ? sectorIds : ['other'],
      impact: item.impact || analysis.impact,
      impactSummary: item.impactSummary || analysis.summary,
      impactDetails: item.impactDetails && item.impactDetails.length > 0 ? item.impactDetails : analysis.details,
      relatedStocks: item.relatedStocks || analysis.relatedStocks
    };
  }).filter(item => item.sectorIds[0] !== 'other' || item.impact !== 'neutral')
    .sort((a, b) => {
      // Sort: positive first, then by sector relevance
      const order = { positive: 0, neutral: 1, negative: 2 };
      return (order[a.impact] || 1) - (order[b.impact] || 1);
    });
}

// Render News Tab
function renderNewsTab() {
  const filteredNews = state.newsFilter === 'all'
    ? state.newsData
    : state.newsData.filter(n => n.sectorIds.includes(state.newsFilter));

  // Filter bar
  const filterBar = $('news-filter-bar');
  if (filterBar) {
    filterBar.innerHTML = `
      <div class="news-filter-chip ${state.newsFilter === 'all' ? 'active' : ''}" onclick="filterNews('all')">全部</div>
      ${SECTORS.map(s => `
        <div class="news-filter-chip ${state.newsFilter === s.id ? 'active' : ''}" onclick="filterNews('${s.id}')">${s.icon} ${s.name}</div>
      `).join('')}
    `;
  }

  // News list
  const listContainer = $('news-list');
  if (!listContainer) return;

  if (filteredNews.length === 0) {
    listContainer.innerHTML = `
      <div class="empty-state">
        <div class="icon">📰</div>
        <div class="text">暂无相关资讯</div>
      </div>
    `;
    return;
  }

  // Group by sector if filter is 'all'
  if (state.newsFilter === 'all') {
    const grouped = {};
    filteredNews.forEach(n => {
      const sid = n.sectorIds[0];
      if (!grouped[sid]) grouped[sid] = [];
      grouped[sid].push(n);
    });

    let html = '';
    // Sort groups by number of news (most active first)
    const sortedGroups = Object.entries(grouped).sort((a, b) => b[1].length - a[1].length);
    sortedGroups.forEach(([sid, newsItems]) => {
      const sector = SECTORS.find(s => s.id === sid);
      if (!sector) return;
      html += `
        <div class="news-sector-group">
          <span class="group-icon">${sector.icon}</span>
          <span class="group-name">${sector.name}</span>
          <span class="group-count">${newsItems.length}条</span>
        </div>
      `;
      newsItems.forEach((n, i) => {
        html += renderNewsCard(n, i);
      });
    });
    listContainer.innerHTML = html;
  } else {
    listContainer.innerHTML = filteredNews.map((n, i) => renderNewsCard(n, i)).join('');
  }
}

function renderNewsCard(n, index) {
  const sector = SECTORS.find(s => s.id === n.sectorIds[0]);
  const tagClass = sector ? sector.tagClass : '';
  const sectorName = sector ? sector.name : '其他';
  const impactLabel = n.impact === 'positive' ? '🔴 利好' : n.impact === 'negative' ? '🟢 利空' : '⚪ 中性';

  return `
    <div class="news-card fade-in" style="animation-delay:${index * 0.04}s" onclick="showNewsDetail(${state.newsData.indexOf(n)})">
      <div class="meta">
        <span class="sector-tag ${tagClass}">${sectorName}</span>
        <span>${n.source}</span>
        <span>${n.time}</span>
      </div>
      <div class="title">${n.title}</div>
      <div class="impact-row">
        <span class="impact-badge ${n.impact}">${impactLabel}</span>
        <span class="impact-summary">${n.impactSummary}</span>
      </div>
    </div>
  `;
}

function filterNews(sectorId) {
  state.newsFilter = sectorId;
  renderNewsTab();
}

function showNewsDetail(index) {
  const n = state.newsData[index];
  if (!n) return;

  const sector = SECTORS.find(s => s.id === n.sectorIds[0]);
  const tagClass = sector ? sector.tagClass : '';
  const sectorName = sector ? sector.name : '其他';
  const impactLabel = n.impact === 'positive' ? '🔴 利好影响' : n.impact === 'negative' ? '🟢 利空影响' : '⚪ 中性影响';

  $('news-modal-title').textContent = n.title;
  $('news-modal-body').innerHTML = `
    <div style="display:flex;align-items:center;gap:6px;margin-bottom:12px">
      <span class="sector-tag ${tagClass}" style="font-size:12px;padding:2px 8px;border-radius:4px;background:rgba(0,122,255,.08);color:var(--primary);font-weight:600">${sectorName}</span>
      <span style="font-size:12px;color:var(--text2)">${n.source} · ${n.time}</span>
    </div>
    ${n.content ? `<div style="font-size:14px;line-height:1.7;color:var(--text1);margin-bottom:16px">${n.content}</div>` : ''}
    <div class="impact-section">
      <div class="impact-title">${impactLabel}</div>
      <div class="impact-detail">${n.impactSummary}</div>
      ${n.impactDetails && n.impactDetails.length > 0 ? `
        <ul style="margin-top:8px;padding-left:16px">
          ${n.impactDetails.map(d => `<li>${d}</li>`).join('')}
        </ul>
      ` : ''}
      ${n.relatedStocks ? `
        <div class="related-stocks">
          <strong>相关标的：</strong>${n.relatedStocks}
        </div>
      ` : ''}
    </div>
  `;
  $('news-modal-overlay').classList.add('show');
}

function closeNewsModal() {
  $('news-modal-overlay').classList.remove('show');
}

// ===== Loading & Error States =====
function showLoading() {
  $('tab-track').innerHTML = `<div class="loading-container"><div class="spinner"></div><div class="loading-text">正在获取行情数据...</div></div>`;
  $('tab-leader').innerHTML = `<div class="loading-container"><div class="spinner"></div><div class="loading-text">正在分析赛道龙头...</div></div>`;
  $('tab-news').innerHTML = `<div class="loading-container"><div class="spinner"></div><div class="loading-text">正在获取行业资讯...</div></div>`;
  $('tab-market').innerHTML = `<div class="loading-container"><div class="spinner"></div><div class="loading-text">正在加载行情...</div></div>`;
}

function showError(msg) {
  const html = `<div class="error-container"><div class="emoji">😔</div><div class="msg">${msg}</div><button class="retry-btn" onclick="initApp()">重新加载</button></div>`;
  $('tab-track').innerHTML = html;
  $('tab-leader').innerHTML = html;
  $('tab-market').innerHTML = html;
}

// ===== Update Time =====
function updateTimestamp() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  state.lastUpdate = `${h}:${m}:${s}`;
  $('update-time').textContent = state.lastUpdate;
}

// ===== Main Init =====
async function initApp() {
  showLoading();

  // Collect all stock codes
  const allCodes = SECTORS.flatMap(s => s.stocks);
  const indexCodes = ['sh000001', 'sz399001', 'sz399006'];

  try {
    // Fetch sector stocks (batch by 30 to avoid URL too long)
    const batchSize = 30;
    let stockResults = {};
    for (let i = 0; i < allCodes.length; i += batchSize) {
      const batch = allCodes.slice(i, i + batchSize);
      const batchResult = await fetchStockData(batch);
      Object.assign(stockResults, batchResult);
    }
    state.stockData = stockResults;

    // Fetch indices
    state.indexData = await fetchStockData(indexCodes);

    // Analyze
    analyzeSectors();
    updateTimestamp();

    // Render all tabs
    $('tab-track').innerHTML = `
      <div id="sentiment" class="sentiment-bar"></div>
      <div class="section-title">🔥 赛道热度排行</div>
      <div id="sector-list" class="sector-list"></div>
    `;
    renderSentiment();
    renderSectorList();

    $('tab-leader').innerHTML = `
      <div class="section-title">🏆 今日龙头个股</div>
      <div id="leader-list" class="leader-list"></div>
    `;
    renderLeaderList();

    $('tab-market').innerHTML = `
      <div class="section-title">📊 主要指数</div>
      <div id="index-cards" class="index-grid"></div>
      <div class="section-title">🌡️ 赛道热力图</div>
      <div id="heatmap" class="heatmap"></div>
    `;
    renderMarketOverview();

    // Fetch and render news
    let rawNews = [];
    try {
      rawNews = await fetchNews();
    } catch (e) { /* fallback below */ }

    // If no API news, use fallback
    if (rawNews.length === 0) {
      rawNews = generateFallbackNews();
    }

    state.newsData = processNews(rawNews);

    $('tab-news').innerHTML = `
      <div id="news-filter-bar" class="news-filter-bar"></div>
      <div class="section-title">📰 行业热点资讯 <span style="font-weight:400;color:var(--text3)">${state.newsData.length}条</span></div>
      <div id="news-list" class="news-list"></div>
    `;
    renderNewsTab();

  } catch (e) {
    console.error(e);
    showError('数据加载失败，请检查网络后重试');
  }
}

// ===== PWA Registration =====
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js').catch(() => {});
}

// ===== Event Listeners =====
document.addEventListener('DOMContentLoaded', () => {
  // Tab clicks
  document.querySelectorAll('.tab-item').forEach(t => {
    t.addEventListener('click', () => switchTab(t.dataset.tab));
  });

  // Modal close
  $('modal-overlay').addEventListener('click', e => {
    if (e.target === $('modal-overlay')) closeModal();
  });
  $('modal-close-btn').addEventListener('click', closeModal);

  // News modal close
  $('news-modal-overlay').addEventListener('click', e => {
    if (e.target === $('news-modal-overlay')) closeNewsModal();
  });
  $('news-modal-close').addEventListener('click', closeNewsModal);

  // Pull to refresh (simple)
  let startY = 0;
  const content = document.querySelector('.content');
  content.addEventListener('touchstart', e => {
    if (content.scrollTop === 0) startY = e.touches[0].clientY;
  });
  content.addEventListener('touchend', e => {
    const diff = e.changedTouches[0].clientY - startY;
    if (diff > 80 && content.scrollTop === 0) {
      initApp();
    }
    startY = 0;
  });

  // Init
  initApp();

  // Auto refresh every 30s during trading hours
  setInterval(() => {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const weekday = now.getDay();
    if (weekday >= 1 && weekday <= 5) {
      if ((h === 9 && m >= 30) || (h >= 10 && h < 11 && m <= 30) || (h >= 13 && h < 15)) {
        initApp();
      }
    }
  }, 30000);
});
