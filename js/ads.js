// ===== 广告系统（精简版）=====

// ---- 1. 顶部可关闭横幅 ----
function injectTopBanner() {
  const banner = document.createElement('div');
  banner.id = 'top-banner';
  banner.innerHTML = `
    <span class="banner-text">🔥 限时特惠：订阅「电影百科会员」立享全站去广告体验，仅需 <s>¥99</s> <strong>¥9.9/月</strong>！</span>
    <button class="banner-cta">立即订阅</button>
    <button class="banner-close">✕</button>
  `;
  document.body.insertBefore(banner, document.body.firstChild);
  banner.querySelector('.banner-close').onclick = () => {
    banner.remove();
    document.body.style.paddingTop = '0';
  };
}

// ---- 2. 右下角角落广告 ----
function injectCornerAd() {
  const ad = document.createElement('div');
  ad.id = 'corner-ad';
  ad.innerHTML = `
    <button class="corner-ad-close">✕</button>
    <div class="corner-ad-label">广告</div>
    <div class="corner-ad-img">🎥</div>
    <div class="corner-ad-text">
      <strong>点播平台推荐</strong><br/>
      伍迪·艾伦全集 4K 超清<br/>
      <span class="corner-ad-price">首月 <s>¥30</s> 仅 ¥1</span>
    </div>
    <button class="corner-ad-btn">立即观看</button>
  `;
  document.body.appendChild(ad);
  ad.querySelector('.corner-ad-close').onclick = () => ad.remove();
}

// ---- 3. 页内横幅广告（仅在h2之间插一条） ----
function injectInlineAds() {
  const content = document.getElementById('content');
  if (!content) return;
  const h2s = content.querySelectorAll('h2');
  if (h2s.length < 3) return;

  const div = document.createElement('div');
  div.className = 'inline-ad inline-ad-red';
  div.innerHTML = `<span class="inline-ad-tag">热门活动</span>
    <div class="inline-ad-content">
      <div class="inline-ad-img">🎟️</div>
      <div class="inline-ad-text">
        <strong>上海电影节 · 伍迪·艾伦专题回顾展</strong><br/>
        7月限定场次，套票8折优惠，多部经典4K修复版首映<br/>
        <a href="#" class="inline-ad-link" onclick="return false;">抢购门票 →</a>
      </div>
    </div>`;
  h2s[2].parentNode.insertBefore(div, h2s[2]);
}

// ---- 4. Cookie 同意横幅 ----
function injectCookieBanner() {
  if (localStorage.getItem('cookie-accepted')) return;
  const banner = document.createElement('div');
  banner.id = 'cookie-banner';
  banner.innerHTML = `
    <span class="cookie-icon">🍪</span>
    <span class="cookie-text">本网站使用 Cookie 以改善您的浏览体验，并为您展示个性化广告内容。继续浏览即表示您同意我们的
    <a href="#" onclick="return false;" class="cookie-link">隐私政策</a>和
    <a href="#" onclick="return false;" class="cookie-link">Cookie 政策</a>。</span>
    <button class="cookie-accept" onclick="localStorage.setItem('cookie-accepted','1');document.getElementById('cookie-banner').remove()">接受所有 Cookie</button>
    <button class="cookie-manage" onclick="document.getElementById('cookie-banner').remove()">仅接受必要 Cookie</button>
  `;
  document.body.appendChild(banner);
}

// ---- 5. 弹幕滚动广告 ----
function injectDanmaku() {
  const texts = [
    '🎬 用户 小明 刚刚购买了「伍迪·艾伦全集 4K」',
    '🎟️ 用户 上海观众 已抢购电影节套票 × 2',
    '⭐ 用户 cinephile 已领取新用户专属礼包',
    '📺 用户 woody粉 正在观看纪录片「无论如何去爱」',
  ];
  let i = 0;
  function shoot() {
    const d = document.createElement('div');
    d.className = 'danmaku-item';
    d.textContent = texts[i++ % texts.length];
    d.style.top = (20 + Math.random() * 60) + '%';
    document.body.appendChild(d);
    setTimeout(() => d.remove(), 7000);
    setTimeout(shoot, 6000 + Math.random() * 4000);
  }
  setTimeout(shoot, 8000);
}

// ---- 6. 底部固定广告条 ----
function injectBottomBar() {
  const bar = document.createElement('div');
  bar.id = 'bottom-ad-bar';
  bar.innerHTML = `
    <button class="bottom-bar-close" onclick="document.getElementById('bottom-ad-bar').remove()">✕</button>
    <span class="bottom-bar-icon">📺</span>
    <span class="bottom-bar-text">「电影频道」正在播出：<strong>午夜巴黎</strong> — 伍迪·艾伦最卖座之作，评分 7.9 ★</span>
    <button class="bottom-bar-btn" onclick="return false;">立即收看</button>
    <span class="bottom-bar-disclaimer">此为付费推广</span>
  `;
  document.body.appendChild(bar);
}

// ---- 初始化广告 ----
document.addEventListener('DOMContentLoaded', () => {
  injectTopBanner();
  injectCookieBanner();
  injectBottomBar();
  injectCornerAd();
  injectInlineAds();
  injectDanmaku();

  // wiki-link 点击拦截
  setupLinkHijack();
});

// ---- wiki-link 点击：新标签打开，当前页弹广告 ----
function setupLinkHijack() {
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a.wiki-link');
    if (!a) return;
    e.preventDefault();
    const dest = a.getAttribute('href');
    window.open(dest, '_blank');
    showLinkInterstitial();
  });
}

function showLinkInterstitial() {
  const old = document.getElementById('link-interstitial');
  if (old) old.remove();
  const ads = [
    { icon: '🎬', title: '精彩推荐', body: '《伍迪·艾伦：人生不折腾》纪录片<br/>现已上线，回顾大师60年创作历程', cta: '免费观看' },
    { icon: '📚', title: '限时特惠', body: '《伍迪·艾伦自传》中文版<br/>原价¥68，今日限时 <strong style="color:#e94560">¥19.9</strong>', cta: '立即抢购' },
    { icon: '📺', title: '会员专属', body: '全站去广告体验<br/>订阅会员 <s>¥99</s> <strong style="color:#e94560">¥9.9/月</strong>', cta: '立即订阅' },
  ];
  const ad = ads[Math.floor(Math.random() * ads.length)];
  const overlay = document.createElement('div');
  overlay.id = 'link-interstitial';
  overlay.innerHTML = `
    <div id="link-interstitial-box">
      <div class="li-skip-bar">
        <button class="interstitial-close-btn" onclick="document.getElementById('link-interstitial').remove()">✕ 关闭广告</button>
      </div>
      <div class="li-body">
        <div class="li-icon">${ad.icon}</div>
        <h3>${ad.title}</h3>
        <p>${ad.body}</p>
        <button class="popup-cta-btn" onclick="return false;">${ad.cta}</button>
      </div>
      <div class="li-footer">此为广告内容 · 词条已在新标签页中打开</div>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
}
