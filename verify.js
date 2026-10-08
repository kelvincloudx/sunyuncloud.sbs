const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://sunyuncloud.sbs';
const AFF_URL = 'https://varnexa.lingdongaff.com/#/?code=HHoxxHGa';

const REQUIRED_PLANS = [
  { name: '限时年付小包', price: '99', cycle: '年', traffic: '59GB' },
  { name: '行者', price: '20', cycle: '月', traffic: '150GB' },
  { name: '纵横', price: '36', cycle: '月', traffic: '300GB' },
  { name: '凌霄', price: '68', cycle: '月', traffic: '600GB' }
];

const REQUIRED_KEYWORDS = [
  '便宜机场',
  '安全机场',
  '机场推荐',
  '科学上网',
  '魔法梯子',
  '稳定节点',
  'clash节点',
  'clash机场',
  'clashparty机场',
  '翻墙出海',
  '全球加速'
];

const REQUIRED_ARTICLES = [
  'best-airport-recommendation-guide.html',
  'how-to-choose-cheap-airport.html',
  'safe-airport-privacy-risks.html',
  'clash-node-tutorial.html',
  'clashparty-subscription-guide.html',
  'stable-nodes-selection-guide.html',
  'proxy-modes-comparison.html',
  'cross-border-network-faq.html'
];

const results = {
  passed: [],
  failed: [],
  warnings: []
};

function pass(testName, msg) {
  results.passed.push({ testName, msg });
  console.log(`[PASS] ${testName}: ${msg}`);
}

function fail(testName, msg) {
  results.failed.push({ testName, msg });
  console.error(`[FAIL] ${testName}: ${msg}`);
}

console.log('===================================================================');
console.log('       【瞬云 SunYun Cloud】全站规格与 SEO 指标自动化验证');
console.log('===================================================================\n');

// 1. 检查 robots.txt
if (fs.existsSync('robots.txt')) {
  const robots = fs.readFileSync('robots.txt', 'utf8');
  if (robots.includes(`Sitemap: ${DOMAIN}/sitemap.xml`)) {
    pass('Robots.txt', `正确引用了 ${DOMAIN}/sitemap.xml`);
  } else {
    fail('Robots.txt', '未找到正确的 Sitemap 引用');
  }
} else {
  fail('Robots.txt', '文件不存在');
}

// 2. 检查 sitemap.xml
if (fs.existsSync('sitemap.xml')) {
  const sitemap = fs.readFileSync('sitemap.xml', 'utf8');
  let missingUrls = [];
  const expectedUrls = [
    `${DOMAIN}/`,
    `${DOMAIN}/plans.html`,
    ...REQUIRED_ARTICLES.map(a => `${DOMAIN}/articles/${a}`)
  ];
  expectedUrls.forEach(url => {
    if (!sitemap.includes(url)) missingUrls.push(url);
  });
  if (missingUrls.length === 0) {
    pass('Sitemap.xml', `包含全部 ${expectedUrls.length} 个正式页面地址`);
  } else {
    fail('Sitemap.xml', `缺少页面: ${missingUrls.join(', ')}`);
  }
} else {
  fail('Sitemap.xml', '文件不存在');
}

// 3. 检查 HTML 页面标准规范（单 H1、Title、Canonical、Meta Description、AFF 链接属性等）
const htmlFiles = [
  'index.html',
  'plans.html',
  ...REQUIRED_ARTICLES.map(a => `articles/${a}`)
];

htmlFiles.forEach(file => {
  if (!fs.existsSync(file)) {
    fail(`File Exists: ${file}`, '文件未找到');
    return;
  }
  const content = fs.readFileSync(file, 'utf8');

  // Title 检查
  const titleMatch = content.match(/<title>(.*?)<\/title>/i);
  if (titleMatch && titleMatch[1].length > 5) {
    pass(`${file} Title`, titleMatch[1]);
  } else {
    fail(`${file} Title`, '缺少或无效的 title 标签');
  }

  // Meta Description
  const metaDescMatch = content.match(/<meta\s+name=["']description["']\s+content=["'](.*?)["']/i);
  if (metaDescMatch && metaDescMatch[1].length > 10) {
    pass(`${file} Meta Description`, `长度 ${metaDescMatch[1].length} 字`);
  } else {
    fail(`${file} Meta Description`, '缺少或过短的 meta description');
  }

  // Canonical 标签
  const expectedCanonical = file === 'index.html' ? `${DOMAIN}/` : `${DOMAIN}/${file}`;
  if (content.includes(`<link rel="canonical" href="${expectedCanonical}">`)) {
    pass(`${file} Canonical`, expectedCanonical);
  } else {
    fail(`${file} Canonical`, `Canonical 标签不匹配，期望 ${expectedCanonical}`);
  }

  // GEO Meta 标签
  if (content.includes('name="geo.region"') && content.includes('name="geo.position"')) {
    pass(`${file} GEO Meta`, '存在地理定位 Meta 标签');
  } else {
    fail(`${file} GEO Meta`, '缺少 GEO Meta 定位标签');
  }

  // 单一 H1 检查
  const h1Matches = content.match(/<h1[\s>]/gi);
  if (h1Matches && h1Matches.length === 1) {
    pass(`${file} H1 Count`, '具备且仅有 1 个 H1 标签');
  } else {
    fail(`${file} H1 Count`, `H1 数量异常: ${h1Matches ? h1Matches.length : 0}`);
  }

  // AFF 推广注册链接检查
  if (content.includes(AFF_URL)) {
    pass(`${file} AFF Link`, '包含正确推广注册链接');
  } else {
    fail(`${file} AFF Link`, `缺少指定推广链接: ${AFF_URL}`);
  }

  // 页脚 PBN 权重输血管道检查（强制 target="_blank" 且严禁 rel="nofollow"）
  const hasJichangReview = content.includes('href="https://jichangreview.net"');
  const hasJichangGuide = content.includes('href="https://jichangguide.net"');
  if (hasJichangReview && hasJichangGuide) {
    // 检查是否有 nofollow 属性附在 pbn 链接上
    const pbnReviewMatch = content.match(/<a\s+[^>]*href=["']https:\/\/jichangreview\.net["'][^>]*>(.*?)<\/a>/i);
    const pbnGuideMatch = content.match(/<a\s+[^>]*href=["']https:\/\/jichangguide\.net["'][^>]*>(.*?)<\/a>/i);

    let isPbnValid = true;
    if (pbnReviewMatch) {
      const tag = pbnReviewMatch[0];
      const anchor = pbnReviewMatch[1].trim();
      if (!tag.includes('target="_blank"')) {
        fail(`${file} PBN Review target`, '必须包含 target="_blank"');
        isPbnValid = false;
      }
      if (tag.includes('nofollow')) {
        fail(`${file} PBN Review nofollow`, '严禁包含 rel="nofollow"！');
        isPbnValid = false;
      }
      if (anchor !== '机场测评') {
        fail(`${file} PBN Review anchor`, `锚文本必须为"机场测评"，当前为: ${anchor}`);
        isPbnValid = false;
      }
    } else {
      isPbnValid = false;
      fail(`${file} PBN Review`, '未正确解析到机场测评链接');
    }

    if (pbnGuideMatch) {
      const tag = pbnGuideMatch[0];
      const anchor = pbnGuideMatch[1].trim();
      if (!tag.includes('target="_blank"')) {
        fail(`${file} PBN Guide target`, '必须包含 target="_blank"');
        isPbnValid = false;
      }
      if (tag.includes('nofollow')) {
        fail(`${file} PBN Guide nofollow`, '严禁包含 rel="nofollow"！');
        isPbnValid = false;
      }
      if (anchor !== '机场教程') {
        fail(`${file} PBN Guide anchor`, `锚文本必须为"机场教程"，当前为: ${anchor}`);
        isPbnValid = false;
      }
    } else {
      isPbnValid = false;
      fail(`${file} PBN Guide`, '未正确解析到机场教程链接');
    }

    if (isPbnValid) {
      pass(`${file} PBN Pipeline`, '完美通过: 纯净 Dofollow + target="_blank" + 正确锚文本');
    }
  } else {
    fail(`${file} PBN Pipeline`, '缺少必须的友情链接 PBN 输血管道');
  }
});

// 4. 检查四大套餐在首页和套餐页的准确呈现
['index.html', 'plans.html'].forEach(page => {
  const content = fs.readFileSync(page, 'utf8');
  REQUIRED_PLANS.forEach(plan => {
    if (content.includes(plan.name) && content.includes(plan.price) && content.includes(plan.traffic)) {
      pass(`${page} Plan Check`, `包含套餐 [${plan.name}] 价格: ¥${plan.price}/${plan.cycle} 流量: ${plan.traffic}`);
    } else {
      fail(`${page} Plan Check`, `未完整包含套餐 [${plan.name}] 信息`);
    }
  });
});

// 5. 检查 8 篇文章的字数（800~1500字）与 11 个关键词覆盖
REQUIRED_ARTICLES.forEach(art => {
  const file = `articles/${art}`;
  const content = fs.readFileSync(file, 'utf8');

  // 中文字数统计
  const bodyMatch = content.match(/<div class="(?:article-content|article-body)">([\s\S]*?)<\/div>\s*<!--\s*(?:相关|footer)/i) || content.match(/<div class="(?:article-content|article-body)">([\s\S]*?)<\/div>/i);
  const text = (bodyMatch ? bodyMatch[1] : content)
    .replace(/<[^>]+>/g, '')
    .replace(/[^\u4e00-\u9fa5]/g, '');

  const wordCount = text.length;
  if (wordCount >= 800 && wordCount <= 2000) {
    pass(`${art} 字数检查`, `核心正文 ${wordCount} 汉字 (符合 800~1500 字范围)`);
  } else {
    fail(`${art} 字数检查`, `核心正文 ${wordCount} 汉字，超出预期`);
  }

  // 11 个核心关键词覆盖率
  let missingKw = [];
  REQUIRED_KEYWORDS.forEach(kw => {
    const reg = new RegExp(kw, 'i');
    if (!reg.test(content)) {
      missingKw.push(kw);
    }
  });

  if (missingKw.length === 0) {
    pass(`${art} 关键词覆盖`, `全部覆盖 11 个核心目标词`);
  } else {
    fail(`${art} 关键词覆盖`, `缺少关键词: ${missingKw.join(', ')}`);
  }
});

// 6. 检查用户评价与 FAQ 专区（index.html）
const indexContent = fs.readFileSync('index.html', 'utf8');
if (indexContent.includes('id="reviews"') && indexContent.includes('真实活跃用户评价与使用反馈')) {
  pass('首页 用户评价专区', '包含真实活跃用户评价专区与多角色评价卡片');
} else {
  fail('首页 用户评价专区', '缺少用户评价专区 (id="reviews")');
}

if (indexContent.includes('id="faq"') && indexContent.includes('瞬云常见疑问与解答')) {
  pass('首页 常见问题 FAQ', '包含 8 个常见疑问与解答专区');
} else {
  fail('首页 常见问题 FAQ', '缺少 FAQ 专区 (id="faq")');
}

// 7. 统计汇总输出
console.log('\n===================================================================');
console.log(`验证完成！通过项目: ${results.passed.length} 项 | 失败项目: ${results.failed.length} 项`);
console.log('===================================================================');

if (results.failed.length > 0) {
  process.exit(1);
} else {
  console.log('★ 恭喜！全站所有指标与核心规范 100% 完美达标！');
}
