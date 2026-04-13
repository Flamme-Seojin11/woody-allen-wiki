// ===== 广告与干扰系统（增强版）=====

// ---- 1. 启动弹窗广告 ----
function showWelcomePopup() {
  const overlay = document.createElement('div');
  overlay.id = 'welcome-overlay';
  overlay.innerHTML = `
    <div id="welcome-popup">
      <div class="popup-header">
        <span class="popup-logo">★ 每日推荐</span>
      </div>
      <div class="popup-body">
        <div class="popup-img-placeholder">🎬</div>
        <h2>恭喜您！您是今天第 <span id="lucky-number">1,284,763</span> 位访客！</h2>
        <p>您有资格领取<strong>伍迪·艾伦经典蓝光合集</strong>限时优惠！</p>
        <p class="popup-sub">仅限今日，数量有限！</p>
        <button class="popup-cta-btn">立即领取 →</button>
        <p class="popup-disclaimer">* 需填写个人信息方可兑换</p>
      </div>
      <button class="popup-close-x">✕</button>
    </div>
  `;
  document.body.appendChild(overlay);
  overlay.querySelector('.popup-close-x').onclick = () => overlay.remove();
  overlay.querySelector('.popup-cta-btn').onclick = () => {
    overlay.remove();
    setTimeout(showEmailCapture, 800);
  };
  overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
}

// ---- 2. 邮件订阅弹窗 ----
function showEmailCapture() {
  const modal = document.createElement('div');
  modal.id = 'email-modal';
  modal.innerHTML = `
    <div id="email-popup">
      <button class="popup-close-x" id="email-close">✕</button>
      <div class="email-icon">📧</div>
      <h3>订阅我们的电子报</h3>
      <p>获取最新电影资讯、独家影评，以及<strong>伍迪·艾伦纪录片</strong>免费观看链接！</p>
      <form onsubmit="return false;">
        <input type="email" placeholder="请输入您的邮箱地址" class="email-input" />
        <button type="submit" class="email-submit-btn">免费订阅</button>
      </form>
      <p class="no-thanks" id="no-thanks-link">不了，我不想看免费电影</p>
    </div>
  `;
  document.body.appendChild(modal);
  document.getElementById('email-close').onclick = () => modal.remove();
  document.getElementById('no-thanks-link').onclick = () => modal.remove();
}

// ---- 3. 顶部可关闭横幅 ----
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

// ---- 4. 右下角角落广告 ----
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

// ---- 5. 左侧浮动竖幅广告 ----
function injectSidebarFloatAd() {
  const ad = document.createElement('div');
  ad.id = 'float-side-ad';
  ad.innerHTML = `
    <div class="float-ad-inner">
      <div class="float-ad-close" onclick="this.closest('#float-side-ad').remove()">✕</div>
      <div class="float-ad-tag">赞助</div>
      <div class="float-ad-emoji">🎭</div>
      <div class="float-ad-text">电影学院<br/>在线课程<br/><strong>报名立减50%</strong></div>
      <button class="float-ad-btn">了解详情</button>
    </div>
  `;
  document.body.appendChild(ad);
}

// ---- 6. 页内横幅广告 ----
function injectInlineAds() {
  const content = document.getElementById('content');
  if (!content) return;
  const h2s = content.querySelectorAll('h2');

  const adTemplates = [
    {
      cls: 'inline-ad',
      html: `<span class="inline-ad-tag">广告</span>
      <div class="inline-ad-content">
        <div class="inline-ad-img">🏆</div>
        <div class="inline-ad-text">
          <strong>【限时赠书】《伍迪·艾伦自传》中文版首发</strong><br/>
          原价 ¥68，活动价 ¥19.9，附赠独家签名明信片一张<br/>
          <a href="#" class="inline-ad-link" onclick="return false;">点击查看详情 »</a>
        </div>
      </div>`
    },
    {
      cls: 'inline-ad inline-ad-wide',
      html: `<span class="inline-ad-tag">赞助内容</span>
      <div class="inline-ad-content">
        <div class="inline-ad-img">🎞️</div>
        <div class="inline-ad-text">
          <strong>高清电影字幕组 · 官方合作平台</strong><br/>
          收录伍迪·艾伦全部 50 部影片高清字幕，支持简繁英三语切换<br/>
          <a href="#" class="inline-ad-link" onclick="return false;">免费下载字幕包 »</a>
        </div>
      </div>`
    },
    {
      cls: 'inline-ad inline-ad-red',
      html: `<span class="inline-ad-tag">热门活动</span>
      <div class="inline-ad-content">
        <div class="inline-ad-img">🎟️</div>
        <div class="inline-ad-text">
          <strong>上海电影节 · 伍迪·艾伦专题回顾展</strong><br/>
          7月限定场次，套票8折优惠，多部经典4K修复版首映<br/>
          <a href="#" class="inline-ad-link" onclick="return false;">抢购门票 →</a>
        </div>
      </div>`
    },
    {
      cls: 'inline-ad inline-ad-green',
      html: `<span class="inline-ad-tag">推广</span>
      <div class="inline-ad-content">
        <div class="inline-ad-img">📚</div>
        <div class="inline-ad-text">
          <strong>豆瓣阅读 · 本月推荐</strong><br/>
          《电影是什么》《谈谈电影》等影评人必读书单，电子版低至 ¥4.99<br/>
          <a href="#" class="inline-ad-link" onclick="return false;">查看书单 »</a>
        </div>
      </div>`
    }
  ];

  h2s.forEach((h2, i) => {
    if (i > 0 && adTemplates[i - 1]) {
      const div = document.createElement('div');
      div.className = adTemplates[i - 1].cls;
      div.innerHTML = adTemplates[i - 1].html;
      h2.parentNode.insertBefore(div, h2);
    }
  });
}

// ---- 7. 退出意图弹窗 ----
let exitPopupShown = false;
function setupExitIntent() {
  document.addEventListener('mouseleave', (e) => {
    if (e.clientY <= 5 && !exitPopupShown) {
      exitPopupShown = true;
      const modal = document.createElement('div');
      modal.id = 'exit-modal';
      modal.innerHTML = `
        <div id="exit-popup">
          <button class="popup-close-x" onclick="document.getElementById('exit-modal').remove()">✕</button>
          <div class="exit-emoji">😢</div>
          <h3>等等，先别走！</h3>
          <p>您还有 <span id="exit-countdown">15</span> 秒可以领取<br/><strong>「伍迪·艾伦经典影评合集 PDF」</strong><br/>完全免费！</p>
          <button class="popup-cta-btn" onclick="document.getElementById('exit-modal').remove()">好的，我留下来 ✓</button>
          <p class="no-thanks" onclick="document.getElementById('exit-modal').remove()">不需要，谢谢</p>
        </div>
      `;
      document.body.appendChild(modal);
      let count = 15;
      const timer = setInterval(() => {
        count--;
        const el = document.getElementById('exit-countdown');
        if (el) el.textContent = count;
        if (count <= 0) { clearInterval(timer); const m = document.getElementById('exit-modal'); if (m) m.remove(); }
      }, 1000);
    }
  });
}

// ---- 8. 底部固定广告条 ----
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

// ---- 9. 插屏广告（20秒后） ----
let interstitialShown = false;
function setupInterstitialAd() {
  setTimeout(() => {
    if (interstitialShown) return;
    interstitialShown = true;
    const overlay = document.createElement('div');
    overlay.id = 'interstitial-overlay';
    let countdown = 5;
    overlay.innerHTML = `
      <div id="interstitial-popup">
        <div class="interstitial-skip-area">
          <span id="interstitial-skip-text">广告将在 <span id="interstitial-count">${countdown}</span> 秒后可关闭</span>
        </div>
        <div class="interstitial-body">
          <div class="interstitial-icon">🎬</div>
          <h2>精彩内容推荐</h2>
          <p>《伍迪·艾伦：人生不折腾》纪录片现已上映</p>
          <p class="interstitial-sub">回顾大师 60 年创作历程，独家幕后花絮</p>
          <button class="popup-cta-btn" onclick="return false;">免费观看预告片</button>
        </div>
        <div class="interstitial-footer">此为广告内容</div>
      </div>
    `;
    document.body.appendChild(overlay);
    const skipText = document.getElementById('interstitial-skip-text');
    const countEl = document.getElementById('interstitial-count');
    const timer = setInterval(() => {
      countdown--;
      if (countEl) countEl.textContent = countdown;
      if (countdown <= 0) {
        clearInterval(timer);
        if (skipText) skipText.innerHTML = '<button class="interstitial-close-btn" onclick="document.getElementById(\'interstitial-overlay\').remove()">✕ 关闭广告</button>';
      }
    }, 1000);
  }, 20000);
}

// ---- 10. 聊天气泡 ----
function injectChatBubble() {
  const bubble = document.createElement('div');
  bubble.id = 'chat-bubble';
  bubble.innerHTML = `
    <div id="chat-bubble-badge">1</div>
    <div id="chat-tooltip">
      💬 有问题？<strong>在线客服</strong>随时为您解答！
      <br/><small onclick="document.getElementById('chat-bubble').remove()" style="cursor:pointer;text-decoration:underline">关闭</small>
    </div>
    <div id="chat-bubble-icon">💬</div>
  `;
  document.body.appendChild(bubble);
  bubble.querySelector('#chat-bubble-icon').onclick = () => {
    const tip = document.getElementById('chat-tooltip');
    tip.style.display = tip.style.display === 'none' ? 'block' : 'none';
  };
  // 3秒后自动显示 tooltip
  setTimeout(() => {
    const tip = document.getElementById('chat-tooltip');
    if (tip) tip.style.display = 'block';
  }, 3000);
}

// ---- 11. Cookie 同意横幅 ----
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

// ---- 12. 右侧滚动广告 ----
function injectScrollAd() {
  const ad = document.createElement('div');
  ad.id = 'scroll-ad';
  ad.innerHTML = `
    <div class="scroll-ad-inner">
      <button class="scroll-ad-close" onclick="document.getElementById('scroll-ad').remove()">✕</button>
      <p class="scroll-ad-label">热门推荐</p>
      <p>🔥 豆瓣年度影单<br/>「必看的20部<br/>伍迪艾伦电影」</p>
      <button class="scroll-ad-btn" onclick="return false;">查看榜单</button>
    </div>
  `;
  document.body.appendChild(ad);
}

// ---- 13. 抖动通知提醒（右上角系统风格） ----
function injectNotificationToast() {
  const toasts = [
    { icon: '🎁', title: '限时礼包', msg: '您有一个未领取的新用户礼包' },
    { icon: '🔔', title: '活动提醒', msg: '「双十一」影视会员折扣即将开始' },
    { icon: '👁️', title: '热门内容', msg: '「午夜巴黎」正在被 2,341 人观看' },
    { icon: '📢', title: '系统通知', msg: '您的账号有一条未读消息' },
  ];
  let idx = 0;
  function showToast() {
    if (idx >= toasts.length) return;
    const t = toasts[idx++];
    const toast = document.createElement('div');
    toast.className = 'notif-toast';
    toast.innerHTML = `
      <div class="notif-icon">${t.icon}</div>
      <div class="notif-body"><strong>${t.title}</strong><br/><span>${t.msg}</span></div>
      <button class="notif-close" onclick="this.closest('.notif-toast').remove()">✕</button>
    `;
    document.getElementById('notif-container').appendChild(toast);
    setTimeout(() => toast.classList.add('notif-show'), 50);
    setTimeout(() => { toast.classList.remove('notif-show'); setTimeout(() => toast.remove(), 400); }, 5000);
    setTimeout(showToast, 3500);
  }
  const container = document.createElement('div');
  container.id = 'notif-container';
  document.body.appendChild(container);
  setTimeout(showToast, 4000);
}

// ---- 14. 页面顶部进度条假加载 ----
function injectFakeProgressBar() {
  const bar = document.createElement('div');
  bar.id = 'fake-progress';
  bar.innerHTML = '<div id="fake-progress-fill"></div>';
  document.body.appendChild(bar);
  const fill = document.getElementById('fake-progress-fill');
  let w = 0;
  const go = () => {
    w += Math.random() * 15;
    if (w >= 100) { w = 100; fill.style.width = '100%'; setTimeout(() => bar.remove(), 400); return; }
    fill.style.width = w + '%';
    setTimeout(go, 150 + Math.random() * 200);
  };
  go();
}

// ---- 15. 随机弹出「优惠券」气泡（从底部飞入） ----
function injectCouponBubble() {
  setTimeout(() => {
    const b = document.createElement('div');
    b.id = 'coupon-bubble';
    b.innerHTML = `
      <button class="coupon-close" onclick="document.getElementById('coupon-bubble').remove()">✕</button>
      <div class="coupon-inner">
        <div class="coupon-left">
          <div class="coupon-amount">¥<span>50</span></div>
          <div class="coupon-type">无门槛券</div>
        </div>
        <div class="coupon-right">
          <div class="coupon-title">专属优惠券</div>
          <div class="coupon-desc">可用于购买全站会员<br/>有效期 24 小时</div>
          <button class="coupon-btn" onclick="return false;">立即使用</button>
        </div>
      </div>
    `;
    document.body.appendChild(b);
    setTimeout(() => b.classList.add('coupon-show'), 50);
  }, 8000);
}

// ---- 16. 弹幕滚动广告（屏幕中部横向滚动文字） ----
function injectDanmaku() {
  const texts = [
    '🎬 用户 小明 刚刚购买了「伍迪·艾伦全集 4K」',
    '📖 用户 电影爱好者 刚刚下单了《伍迪·艾伦自传》',
    '🏆 用户 Danny 正在观看「Annie Hall 4K修复版」',
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
    setTimeout(shoot, 4000 + Math.random() * 3000);
  }
  setTimeout(shoot, 6000);
}

// ---- 17. 悬浮视频预告广告（右下，可最小化） ----
function injectFloatVideoAd() {
  setTimeout(() => {
    const ad = document.createElement('div');
    ad.id = 'float-video-ad';
    ad.innerHTML = `
      <div class="fva-header">
        <span class="fva-tag">赞助</span>
        <span class="fva-title">精选预告片</span>
        <button class="fva-min" onclick="document.getElementById('float-video-ad').classList.toggle('fva-minimized')">—</button>
        <button class="fva-close" onclick="document.getElementById('float-video-ad').remove()">✕</button>
      </div>
      <div class="fva-body">
        <div class="fva-screen">
          <div class="fva-play">▶</div>
          <div class="fva-overlay-text">午夜巴黎 4K 预告</div>
        </div>
        <div class="fva-info">
          <strong>午夜巴黎 · 4K修复版</strong><br/>
          <span>现已上线全平台，首月免费观看</span>
        </div>
        <button class="fva-cta" onclick="return false;">免费观看</button>
      </div>
    `;
    document.body.appendChild(ad);
    setTimeout(() => ad.classList.add('fva-show'), 50);
  }, 12000);
}

// ---- 18. 「您可能感兴趣」相关推荐区块 ----
function injectRelatedAds() {
  const footer = document.getElementById('footer');
  if (!footer) return;
  const section = document.createElement('div');
  section.id = 'related-ads';
  section.innerHTML = `
    <div class="related-ads-title">🔍 猜你喜欢 <span class="related-ads-tag">赞助</span></div>
    <div class="related-ads-grid">
      <div class="related-ad-card" onclick="return false;">
        <div class="rac-img">🎭</div>
        <div class="rac-text"><strong>费里尼百科全书</strong><br/><span>意大利电影大师专题</span></div>
        <div class="rac-badge">广告</div>
      </div>
      <div class="related-ad-card" onclick="return false;">
        <div class="rac-img">📽️</div>
        <div class="rac-text"><strong>黑泽明全集4K</strong><br/><span>限时首月0元看</span></div>
        <div class="rac-badge">广告</div>
      </div>
      <div class="related-ad-card" onclick="return false;">
        <div class="rac-img">🏅</div>
        <div class="rac-text"><strong>戛纳金棕榈合集</strong><br/><span>60年获奖影片全收录</span></div>
        <div class="rac-badge">广告</div>
      </div>
      <div class="related-ad-card" onclick="return false;">
        <div class="rac-img">🎓</div>
        <div class="rac-text"><strong>电影编剧大师班</strong><br/><span>名师授课·在线报名</span></div>
        <div class="rac-badge">广告</div>
      </div>
    </div>
  `;
  footer.parentNode.insertBefore(section, footer);
}

// ---- 19. 滚动触发侧边弹窗 ----
let scrollAdShown = false;
function setupScrollTriggerAd() {
  window.addEventListener('scroll', () => {
    if (scrollAdShown) return;
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    if (pct > 0.4) {
      scrollAdShown = true;
      const modal = document.createElement('div');
      modal.id = 'scroll-trigger-modal';
      modal.innerHTML = `
        <div id="scroll-trigger-popup">
          <button class="popup-close-x" onclick="document.getElementById('scroll-trigger-modal').remove()">✕</button>
          <div class="scroll-trigger-icon">📊</div>
          <h3>您已阅读 40% 的内容</h3>
          <p>喜欢这篇文章吗？<br/>注册会员即可解锁<strong>更多导演专题</strong>！</p>
          <button class="popup-cta-btn" onclick="document.getElementById('scroll-trigger-modal').remove()">免费注册</button>
          <p class="no-thanks" onclick="document.getElementById('scroll-trigger-modal').remove()">继续免费阅读</p>
        </div>
      `;
      document.body.appendChild(modal);
    }
  });
}

// ---- 20. 网页标题闪烁（切换标签时） ----
function setupTitleFlash() {
  const origTitle = document.title;
  let flashInterval = null;
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      let on = true;
      flashInterval = setInterval(() => {
        document.title = on ? '🔔 您有新消息！' : origTitle;
        on = !on;
      }, 1000);
    } else {
      clearInterval(flashInterval);
      document.title = origTitle;
    }
  });
}

// ---- 21. 假「正在阅读」人数悬浮条 ----
function injectReaderCount() {
  const bar = document.createElement('div');
  bar.id = 'reader-count-bar';
  let n = 847 + Math.floor(Math.random() * 200);
  bar.innerHTML = `<span class="rcb-dot"></span> 当前 <strong id="rcb-num">${n}</strong> 人正在阅读本页面`;
  document.body.appendChild(bar);
  setInterval(() => {
    n += Math.floor(Math.random() * 7) - 3;
    if (n < 500) n = 500;
    const el = document.getElementById('rcb-num');
    if (el) el.textContent = n;
  }, 3000);
}

// ---- 22. 页面左上角「突发新闻」角标 ----
function injectBreakingBadge() {
  const badge = document.createElement('div');
  badge.id = 'breaking-badge';
  badge.innerHTML = `
    <button class="breaking-close" onclick="document.getElementById('breaking-badge').remove()">✕</button>
    <span class="breaking-label">突发</span>
    <span class="breaking-text">伍迪·艾伦宣布新片将于明年开机拍摄！</span>
    <a href="#" class="breaking-link" onclick="return false;">查看详情 »</a>
  `;
  document.body.appendChild(badge);
}

// ---- 23. 音频提醒（需要用户交互后播放）假提示 ----
function injectAudioPrompt() {
  setTimeout(() => {
    const prompt = document.createElement('div');
    prompt.id = 'audio-prompt';
    prompt.innerHTML = `
      <span class="audio-icon">🔊</span>
      <span class="audio-text">本页面含有视频内容，<strong>点击开启声音</strong>获得最佳体验</span>
      <button class="audio-enable-btn" onclick="document.getElementById('audio-prompt').remove()">开启</button>
      <button class="audio-dismiss-btn" onclick="document.getElementById('audio-prompt').remove()">忽略</button>
    `;
    document.body.appendChild(prompt);
    setTimeout(() => {
      const el = document.getElementById('audio-prompt');
      if (el) el.remove();
    }, 8000);
  }, 5000);
}

// ---- 24. 假「网络不稳定」重试横幅 ----
function injectNetworkWarnBanner() {
  setTimeout(() => {
    const bar = document.createElement('div');
    bar.id = 'network-warn';
    bar.innerHTML = `
      <span class="nw-icon">⚠️</span>
      <span class="nw-text">检测到您的网络连接不稳定，部分图片内容可能未能完全加载</span>
      <button class="nw-retry" onclick="document.getElementById('network-warn').remove()">重试</button>
      <button class="nw-close" onclick="document.getElementById('network-warn').remove()">✕</button>
    `;
    document.body.appendChild(bar);
    setTimeout(() => { const el = document.getElementById('network-warn'); if (el) el.remove(); }, 10000);
  }, 15000);
}

// ---- 初始化所有广告 ----
document.addEventListener('DOMContentLoaded', () => {
  injectFakeProgressBar();
  injectTopBanner();
  injectCookieBanner();
  injectBottomBar();
  injectChatBubble();
  injectCornerAd();
  injectSidebarFloatAd();
  injectScrollAd();
  injectInlineAds();
  injectRelatedAds();
  injectReaderCount();
  injectBreakingBadge();
  setupExitIntent();
  setupInterstitialAd();
  setupScrollTriggerAd();
  setupTitleFlash();
  injectNotificationToast();
  injectCouponBubble();
  injectDanmaku();
  injectFloatVideoAd();
  injectAudioPrompt();
  injectNetworkWarnBanner();

  // 欢迎弹窗
  setTimeout(showWelcomePopup, 1500);
});
