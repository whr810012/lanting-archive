(function () {
  'use strict';

  var CLUES = {
    '沈屿': '../pages/03.html',
    '澜庭': '../pages/01.html',
    '顾临川': '../pages/09.html',
    '20260314': '../pages/04.html',
    '20260313': '../pages/0313-index.html',
    '夜班日志': '../pages/05.html',
    '访客登记': '../pages/08.html',
    'm-027': '../pages/06.html',
    'm027': '../pages/06.html',
    '样本冲突': '../pages/07.html',
    '许文兰': '../pages/07.html',
    '20260316': '../pages/13.html',
    '醒酒': '../pages/13.html',
    '程帆': '../pages/26.html',
    '监控': '../pages/monitor-log.html',
    '监控室': '../pages/23.html',
    '监控转录': '../pages/24.html',
    '未知卡号': '../pages/24.html',
    '管理员账号': '../pages/10.html',
    '20190801': '../pages/11.html',
    '守望者': '../pages/12.html',
    '林晚晴': '../pages/17.html',
    '7号楼': '../pages/22.html',
    '北门': '../pages/21.html',
    '平面图': '../pages/22.html',
    '虚拟巡房': '../pages/16.html',
    '代班': '../pages/16.html',
    '周德明': '../pages/19.html',
    '302': '../pages/22.html',
    'cb-3': '../pages/18.html',
    '慧忆汤': '../pages/18.html',
    '慧忆冷链': '../pages/25.html',
    '慧忆生物': '../pages/28.html',
    '慧忆': '../pages/28.html',
    '北门仓库': '../pages/36.html',
    '盛庭慧忆': '../pages/36.html',
    '澜庭慧忆北门': '../pages/36.html',
    'beimen1998': '../pages/34.html',
    '夜班真相': '../pages/40.html',
    '我该怎么办': '../pages/43.html',
    '记忆守护': '../pages/29.html',
    '方案b': '../pages/32.html',
    '笔迹不符': '../pages/36.html',
    '杜姐': '../pages/ex03.html',
    '马慧珍': '../pages/ex04.html',
    '手机': '../pages/27.html',
    'u盘': '../pages/27.html',
    '样本链': '../pages/31.html',
    '出库单': '../pages/36.html',
    '合并': '../pages/41.html',
    '拒绝': '../pages/41.html',
    '帆影': '../external/huiyi-blog/index.html',
    '20230412': '../external/huiyi-blog/post1.html',
    '归档': '../external/huiyi-blog/post2.html',
    '31415926': '../external/huiyi-blog/post3.html',
    '贴吧': '../external/tieba-mirror.html',
    'lanting': '../pages/ex01.html',
    '源码': '../pages/ex01.html'
  };

  var ROLE_REQUIRED = {
    '../pages/16.html': 'nurse',
    '../pages/17.html': 'nurse',
    '../pages/18.html': 'nurse',
    '../pages/19.html': 'nurse',
    '../pages/20.html': 'nurse',
    '../pages/21.html': 'nurse',
    '../pages/22.html': 'nurse',
    '../pages/23.html': 'nurse',
    '../pages/24.html': 'nurse',
    '../pages/25.html': 'nurse',
    '../pages/26.html': 'nurse',
    '../pages/27.html': 'nurse',
    '../pages/28.html': 'nurse',
    '../pages/29.html': 'huiyi',
    '../pages/30.html': 'huiyi',
    '../pages/31.html': 'huiyi',
    '../pages/32.html': 'huiyi',
    '../pages/33.html': 'huiyi',
    '../pages/34.html': 'huiyi',
    '../pages/35.html': 'huiyi',
    '../pages/36.html': 'huiyi',
    '../pages/37.html': 'huiyi',
    '../pages/38.html': 'huiyi'
  };

  function normalize(raw) {
    return (raw || '').trim().replace(/\s+/g, '');
  }

  function lookup(keyword) {
    var key = normalize(keyword).toLowerCase();
    if (!key) return null;
    if (CLUES[key] !== undefined) return CLUES[key];
    var upper = normalize(keyword);
    for (var k in CLUES) {
      if (k.toLowerCase() === key) return CLUES[k];
      if (k === upper) return CLUES[k];
    }
    return null;
  }

  function resolvePath(target) {
    if (!target) return null;
    try {
      return new URL(target, window.location.href).href;
    } catch (e) {
      return target;
    }
  }

  function canAccess(target) {
    var role = window.LantingAuth && window.LantingAuth.getRole();
    var need = ROLE_REQUIRED[target];
    if (!need) return true;
    if (need === 'nurse' && (role === 'nurse' || role === 'huiyi')) return true;
    if (need === 'huiyi' && role === 'huiyi') return true;
    return false;
  }

  function denyMessage(need) {
    if (need === 'nurse') {
      return '【访问拒绝】需要护士长或更高权限。请先在登录页使用备案账号。';
    }
    return '【访问拒绝】需要慧忆生物外包顾问权限。';
  }

  function handleSearch(keyword, fromChoice) {
    var norm = normalize(keyword);
    if (!norm) return false;

    if (fromChoice) {
      if (norm === '公开') {
        window.location.href = resolvePath('../pages/44.html');
        return true;
      }
      if (norm === '烧掉') {
        window.location.href = resolvePath('../pages/45.html');
        return true;
      }
      if (norm === '守望者夜班' || norm === '守望者') {
        window.location.href = resolvePath('../pages/ex05.html');
        return true;
      }
      window.LantingLayout && window.LantingLayout.showToast('无效指令。请输入：公开 / 烧掉 / 守望者夜班');
      return false;
    }

    var target = lookup(norm);
    if (!target) {
      window.LantingLayout && window.LantingLayout.showToast('未找到相关档案。请尝试其他关键词。');
      return false;
    }

    if (!canAccess(target)) {
      window.LantingLayout && window.LantingLayout.showToast(denyMessage(ROLE_REQUIRED[target]));
      return false;
    }

    if (window.LantingProgress) window.LantingProgress.unlock(target);
    window.location.href = resolvePath(target);
    return true;
  }

  function bindForm() {
    var form = document.getElementById('search-form');
    if (!form || form.dataset.lantingBound === '1') return;
    form.dataset.lantingBound = '1';
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      handleSearch(document.getElementById('search-input').value, false);
    });
  }

  window.LantingSearch = { handleSearch: handleSearch, lookup: lookup, bindForm: bindForm };

  document.addEventListener('DOMContentLoaded', bindForm);
})();
