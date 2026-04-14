// ===== 影片页交互增强 =====
// 功能：
//   1. 将影片页的主演表替换为 Tab 面板（基本信息 / 主要演员 / 获奖记录）
//   2. 演员表带分页（每页3条），通过 JS 动态渲染
//   3. 每行演员详情通过"展开"折叠，且详细备注通过 JS 注入（HTML 中用数据属性存储）
//   4. 演员姓名字段用 CSS 伪元素拼接，防止直接文本抓取

(function () {
  'use strict';

  // ---------- 工具：把字符串拆成 span 防直抓 ----------
  function obfuscateText(str) {
    // 将每个字符包在 <span> 里，同时加一个 CSS 隐藏的假字符
    return str.split('').map(function (ch) {
      return '<span>' + ch + '</span>';
    }).join('<i style="display:none;font-style:normal">*</i>');
  }

  // ---------- 每个影片页面的演员数据 ----------
  var CAST_DATA = {
    'annie-hall': {
      tab_title: '安妮·霍尔',
      cast: [
        { name: '伍迪·艾伦', role: '艾尔维·辛格', detail: '编剧兼导演，同时饰演神经质的纽约喜剧作家男主角' },
        { name: '黛安·基顿', role: '安妮·霍尔', detail: '奥斯卡最佳女主角得主；与艾伦有真实情感渊源，原名黛安·霍尔' },
        { name: '托尼·罗伯茨', role: '罗布', detail: '艾尔维的好友，连接纽约与洛杉矶两种生活方式的人物' },
        { name: '卡罗尔·凯恩', role: '艾尔维前妻', detail: '仅出现于闪回场景，展示艾尔维早年婚姻失败的根源' },
        { name: '保罗·西蒙', role: '托尼·雷西', detail: '著名音乐人友情客串，饰演安妮在洛杉矶结识的唱片制作人' },
      ],
      awards: [
        '奥斯卡最佳影片（第50届，1978年）',
        '奥斯卡最佳导演：伍迪·艾伦',
        '奥斯卡最佳女主角：黛安·基顿',
        '奥斯卡最佳原创剧本：伍迪·艾伦、马歇尔·布里克曼',
        '英国电影学院奖最佳影片',
      ]
    },
    'manhattan-film': {
      tab_title: '曼哈顿',
      cast: [
        { name: '伍迪·艾伦', role: '艾萨克·戴维斯', detail: '编剧兼导演，42岁的电视作家，对城市与爱情充满理想化执念' },
        { name: '黛安·基顿', role: '玛丽', detail: '充满知识分子气质的新闻记者，与艾萨克及耶鲁之间形成三角关系' },
        { name: '梅丽尔·斯特里普', role: '吉儿', detail: '艾萨克的前妻，正在撰写揭露性回忆录，后成为公开的女同性恋' },
        { name: '马里尔·海明威', role: '特蕾西', detail: '17岁的高中女生，艾萨克的年轻女友；获奥斯卡最佳女配角提名' },
        { name: '麦克尔·墨菲', role: '耶鲁', detail: '艾萨克的已婚好友，暗中与玛丽相恋，展示知识分子道德困境' },
      ],
      awards: [
        '英国电影学院奖最佳影片提名',
        'AFI百大美国电影第86位',
        '美国国家电影保护局注册保存',
        '金球奖最佳音乐/喜剧类影片提名',
      ]
    },
    'midnight-paris': {
      tab_title: '午夜巴黎',
      cast: [
        { name: '欧文·威尔逊', role: '吉尔·庞德', detail: '男主角，好莱坞剧本作家，深陷对1920年代的浪漫乡愁' },
        { name: '蕾切尔·麦克亚当斯', role: '伊内兹', detail: '吉尔的未婚妻，务实功利，代表现代消费主义价值观' },
        { name: '玛丽昂·歌迪亚', role: '阿德里阿纳', detail: '1920年代巴黎女子，毕加索与布拉克的情人，吉尔的精神伴侣' },
        { name: '科迪·斯密特-麦菲', role: '海明威', detail: '客串历史人物，台词充满海明威式的硬汉哲学宣言' },
        { name: '阿德里安·布洛迪', role: '萨尔瓦多·达利', detail: '客串超现实主义大师，仅数分钟戏份却成全片最受赞誉的片段' },
        { name: '卡西·莫斯', role: '葛特鲁德·斯坦因', detail: '1920年代文学沙龙的女主人，连接各路文艺名人的核心人物' },
      ],
      awards: [
        '奥斯卡最佳原创剧本（第84届，2012年）',
        '英国电影学院奖最佳原创剧本提名',
        '金球奖最佳音乐/喜剧类影片提名',
        '美国作家工会奖最佳原创剧本',
        '洛杉矶影评人协会奖最佳影片提名',
      ]
    },
    'vicky-cristina': {
      tab_title: '午夜巴塞罗那',
      cast: [
        { name: '哈维尔·巴登', role: '胡安·安东尼奥', detail: '西班牙画家，充满魅力而内心复杂，游走于多段感情之间' },
        { name: '斯嘉丽·约翰逊', role: '克里斯蒂娜', detail: '自由洒脱的美国女孩，胡安·安东尼奥的同居伴侣，最终选择离开' },
        { name: '佩内洛普·克鲁兹', role: '玛莉亚·埃莱娜', detail: '奥斯卡最佳女配角；胡安·安东尼奥的疯狂前妻，以西班牙语完成大量台词' },
        { name: '丽贝卡·豪尔', role: '薇姬', detail: '理性务实的美国研究生，对胡安·安东尼奥暗生情愫又无法放弃安全感' },
      ],
      awards: [
        '奥斯卡最佳女配角：佩内洛普·克鲁兹（第81届，2009年）',
        '金球奖最佳音乐/喜剧类影片（2009年）',
        '西班牙戈雅奖最佳欧洲电影',
        '美国国家评论协会年度十大影片',
      ]
    },
    'blue-jasmine': {
      tab_title: '蓝色茉莉',
      cast: [
        { name: '凯特·布兰切特', role: '茉莉·弗朗西斯', detail: '奥斯卡、金球、BAFTA三料影后；饰演从上流名媛沦为精神崩溃者的茉莉' },
        { name: '鲍比·坎纳瓦尔', role: '吉格', detail: '金杰的男友，务实的蓝领工人，与茉莉的价值观形成尖锐对立' },
        { name: '莎莉·霍金斯', role: '金杰', detail: '茉莉的妹妹，普通工薪阶层；获奥斯卡最佳女配角提名' },
        { name: '彼得·萨斯加德', role: '德怀特', detail: '出身优越的外交官，茉莉试图依附重返上流社会的最后希望' },
        { name: '亚历克·鲍德温', role: '哈尔·弗朗西斯', detail: '茉莉的骗子丈夫，仅出现于回忆段落，在狱中自杀' },
      ],
      awards: [
        '奥斯卡最佳女主角：凯特·布兰切特（第86届，2014年）',
        '金球奖最佳女主角（戏剧类）：凯特·布兰切特',
        '英国电影学院奖最佳女主角：凯特·布兰切特',
        '奥斯卡最佳女配角提名：莎莉·霍金斯',
        '美国国家评论协会年度最佳影片',
        '纽约影评人协会最佳女主角',
      ]
    },
    'hannah-sisters': {
      tab_title: '汉娜姐妹',
      cast: [
        { name: '米亚·法罗', role: '汉娜', detail: '三姐妹中最稳定的一位，丈夫和前夫都爱上她妹妹' },
        { name: '黛安·韦斯特', role: '霍莉', detail: '三妹，事业不顺的演员兼美食家；奥斯卡最佳女配角' },
        { name: '芭芭拉·赫尔希', role: '李', detail: '二妹，与汉娜的现任丈夫发展婚外情' },
        { name: '伍迪·艾伦', role: '迪斯蒂·利维', detail: '汉娜的前夫，经历恐癌危机后追寻人生意义的喜剧制作人' },
        { name: '迈克尔·凯恩', role: '艾略特', detail: '汉娜的丈夫，却暗恋小姨子李；奥斯卡最佳男配角' },
      ],
      awards: [
        '奥斯卡最佳原创剧本：伍迪·艾伦（第59届，1987年）',
        '奥斯卡最佳男配角：迈克尔·凯恩',
        '奥斯卡最佳女配角：黛安·韦斯特',
        '英国电影学院奖最佳原创剧本',
        '金球奖最佳音乐/喜剧类影片',
      ]
    },
    'crimes-misdemeanors': {
      tab_title: '罪与错',
      cast: [
        { name: '马丁·兰多', role: '朱迪·罗森塔尔', detail: '成功眼科医生，为摆脱外遇而雇人杀死情人，陷入道德与罪责的深渊' },
        { name: '伍迪·艾伦', role: '克利福德·斯特恩', detail: '纪录片导演，爱上嫂子哈利，代表影片中失败的道德理想主义者' },
        { name: '安吉丽卡·休斯顿', role: '多洛蕾丝', detail: '朱迪的情人，威胁要揭发他，最终被杀' },
        { name: '米亚·法罗', role: '哈利', detail: '克利福德爱慕的对象，最终嫁给了他鄙视的成功制作人' },
        { name: '艾伦·阿尔达', role: '莱斯特', detail: '克利福德的大舅，肤浅而成功的电视制作人' },
      ],
      awards: [
        '奥斯卡最佳导演提名：伍迪·艾伦（第62届）',
        '奥斯卡最佳原创剧本提名：伍迪·艾伦',
        '奥斯卡最佳男配角提名：马丁·兰多',
        '美国国家评论协会年度十佳影片',
      ]
    }
  };

  // ---------- 识别当前页面 ----------
  var pageKey = null;
  var path = window.location.pathname;
  var filename = path.split('/').pop().replace('.html', '');
  if (CAST_DATA[filename]) pageKey = filename;

  if (!pageKey) return; // 非影片详情页，不执行

  var data = CAST_DATA[pageKey];

  // ---------- 找到主演 section ----------
  var castSection = document.getElementById('cast');
  if (!castSection) return;

  // ---------- 找到紧随 #cast 之后的 <table> 和后续 <p> ----------
  var castTable = castSection.nextElementSibling;
  while (castTable && castTable.tagName !== 'TABLE') {
    castTable = castTable.nextElementSibling;
  }
  if (!castTable) return;

  // 可能有一段紧跟的描述 <p>
  var castDescP = castTable.nextElementSibling;
  var hasDescP = castDescP && castDescP.tagName === 'P';

  // ---------- 找到获奖章节 ----------
  var awardsSection = document.getElementById('awards');

  // ========================
  //  构建 Tab 容器
  // ========================
  var tabContainer = document.createElement('div');
  tabContainer.id = 'film-tabs';
  tabContainer.innerHTML = `
    <div class="tab-bar" role="tablist">
      <button class="tab-btn active" data-tab="cast" role="tab" aria-selected="true">主要演员</button>
      <button class="tab-btn" data-tab="info" role="tab" aria-selected="false">影片信息</button>
      <button class="tab-btn" data-tab="awards" role="tab" aria-selected="false">获奖记录</button>
    </div>
    <div class="tab-panels">
      <div class="tab-panel active" id="tab-panel-cast"></div>
      <div class="tab-panel" id="tab-panel-info">
        <p class="tab-tip">请在侧边栏的影片信息框查看详细参数。</p>
      </div>
      <div class="tab-panel" id="tab-panel-awards"></div>
    </div>
  `;

  // 插入到 #cast h2 之前（替换原来的演员表区域）
  castSection.parentNode.insertBefore(tabContainer, castSection);
  // 把 h2#cast 移到 tab 容器内部标题处（保持 TOC 锚点有效）
  tabContainer.insertBefore(castSection, tabContainer.firstChild);
  // 移除原始演员表
  castTable.remove();
  if (hasDescP) castDescP.remove();

  // ========================
  //  构建演员分页面板
  // ========================
  var castPanel = document.getElementById('tab-panel-cast');
  var PAGE_SIZE = 3;
  var currentPage = 0;
  var totalPages = Math.ceil(data.cast.length / PAGE_SIZE);

  function renderCastPage(page) {
    currentPage = page;
    var start = page * PAGE_SIZE;
    var slice = data.cast.slice(start, start + PAGE_SIZE);

    var html = '<table class="film-table cast-paged-table"><thead><tr><th>演员</th><th>角色</th><th>操作</th></tr></thead><tbody>';

    slice.forEach(function (actor, idx) {
      var globalIdx = start + idx;
      // 演员姓名：拆成 span 防直接文本提取
      var nameHtml = obfuscateText(actor.name);
      var roleHtml = obfuscateText(actor.role);
      html += `
        <tr class="cast-row" id="cast-row-${globalIdx}">
          <td class="cast-name-cell">${nameHtml}</td>
          <td class="cast-role-cell">${roleHtml}</td>
          <td><button class="cast-expand-btn" data-idx="${globalIdx}" onclick="toggleCastDetail(${globalIdx})">展开详情 ▼</button></td>
        </tr>
        <tr class="cast-detail-row" id="cast-detail-${globalIdx}" style="display:none">
          <td colspan="3" class="cast-detail-cell">
            <div class="cast-detail-inner" id="cast-detail-inner-${globalIdx}"></div>
          </td>
        </tr>`;
    });

    html += '</tbody></table>';

    // 分页控制条
    html += `<div class="cast-pagination">`;
    if (page > 0) {
      html += `<button class="page-btn" onclick="goToPage(${page - 1})">◀ 上一页</button>`;
    } else {
      html += `<button class="page-btn" disabled>◀ 上一页</button>`;
    }
    html += `<span class="page-indicator">第 ${page + 1} 页 / 共 ${totalPages} 页</span>`;
    if (page < totalPages - 1) {
      html += `<button class="page-btn" onclick="goToPage(${page + 1})">下一页 ▶</button>`;
    } else {
      html += `<button class="page-btn" disabled>下一页 ▶</button>`;
    }
    html += `</div>`;

    castPanel.innerHTML = html;
  }

  // goToPage 暴露到全局
  window.goToPage = function (page) {
    renderCastPage(page);
  };

  // 展开/折叠演员详情（详情内容通过 JS 注入）
  window.toggleCastDetail = function (globalIdx) {
    var detailRow = document.getElementById('cast-detail-' + globalIdx);
    var btn = document.querySelector('[data-idx="' + globalIdx + '"]');
    var isOpen = detailRow.style.display !== 'none';
    if (isOpen) {
      detailRow.style.display = 'none';
      btn.textContent = '展开详情 ▼';
    } else {
      // 懒注入详情文字
      var inner = document.getElementById('cast-detail-inner-' + globalIdx);
      if (!inner.hasAttribute('data-loaded')) {
        inner.setAttribute('data-loaded', '1');
        // 将详情文字也做混淆渲染
        inner.innerHTML = '<span class="detail-label">角色备注：</span>' + obfuscateText(data.cast[globalIdx].detail);
      }
      detailRow.style.display = '';
      btn.textContent = '收起 ▲';
    }
  };

  // ========================
  //  构建获奖面板
  // ========================
  function renderAwardsPanel() {
    var awardsPanel = document.getElementById('tab-panel-awards');
    if (!data.awards || data.awards.length === 0) {
      awardsPanel.innerHTML = '<p class="tab-tip">暂无记录。</p>';
      return;
    }
    var html = '<ul class="awards-list">';
    // 获奖条目也做 obfuscate
    data.awards.forEach(function (aw) {
      html += '<li>' + obfuscateText(aw) + '</li>';
    });
    html += '</ul>';
    awardsPanel.innerHTML = html;
  }

  // ========================
  //  Tab 切换逻辑
  // ========================
  tabContainer.querySelectorAll('.tab-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var target = btn.getAttribute('data-tab');
      tabContainer.querySelectorAll('.tab-btn').forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      tabContainer.querySelectorAll('.tab-panel').forEach(function (p) {
        p.classList.remove('active');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      document.getElementById('tab-panel-' + target).classList.add('active');

      // 懒加载获奖面板
      if (target === 'awards') {
        var ap = document.getElementById('tab-panel-awards');
        if (!ap.hasAttribute('data-loaded')) {
          ap.setAttribute('data-loaded', '1');
          renderAwardsPanel();
        }
      }
    });
  });

  // 初始渲染第一页演员
  renderCastPage(0);

  // ========================
  //  隐藏原始获奖 section（内容已迁移到 Tab）
  // ========================
  // 只隐藏 awards section 下面的 <ul>/<p>，保留 h2 锚点
  if (awardsSection) {
    var sibling = awardsSection.nextElementSibling;
    while (sibling && sibling.tagName !== 'H2') {
      sibling.style.display = 'none';
      sibling = sibling.nextElementSibling;
    }
    // 在原 h2 旁添加提示
    var tip = document.createElement('p');
    tip.className = 'awards-moved-tip';
    tip.innerHTML = '← 请切换至上方「<strong>获奖记录</strong>」标签页查看。';
    awardsSection.parentNode.insertBefore(tip, awardsSection.nextElementSibling);
  }

})();
