(function () {
  'use strict';

  function showToast(text) {
    var el = document.getElementById('lanting-toast');
    if (!el) { el = document.createElement('div'); el.id = 'lanting-toast'; document.body.appendChild(el); }
    el.textContent = text;
    el.className = 'toast show';
    clearTimeout(el._t);
    el._t = setTimeout(function () { el.className = 'toast'; }, 3200);
  }

  function basePrefix() {
    var path = window.location.pathname.replace(/\\/g, '/');
    if (path.indexOf('/pages/') !== -1 || path.indexOf('/archive/') !== -1) return '../';
    if (path.indexOf('/external/') !== -1) return '../../';
    return '';
  }

  function injectChrome() {
    if (document.body.getAttribute('data-no-chrome') === 'true') return;
    var prefix = basePrefix();
    var page = document.body.getAttribute('data-page') || '—';
    var total = document.body.getAttribute('data-total') || '45';
    var role = window.LantingAuth ? window.LantingAuth.roleLabel(window.LantingAuth.getRole()) : '未登录';

    var header = document.createElement('header');
    header.className = 'site-header';
    header.innerHTML =
      '<div class="header-top"><a class="brand" href="' + prefix + 'index.html">澜庭照护档案系统</a><span class="role-tag">' + role + '</span></div>' +
      '<form id="search-form" class="search-bar"><input id="search-input" type="text" placeholder="输入关键词检索档案…" autocomplete="off" /><button type="submit">检索</button></form>' +
      '<nav class="header-nav"><a href="' + prefix + 'archive/hub.html">首页</a><a href="' + prefix + 'archive/shelf.html">已解锁</a><a href="' + prefix + 'archive/timetower.html">时光塔</a><a href="' + prefix + 'archive/login.html">登录</a><a href="' + prefix + 'archive/contact.html">联系</a></nav>';

    var footer = document.createElement('footer');
    footer.className = 'site-footer';
    footer.innerHTML = '<p>档案片段 <strong>' + page + '/' + total + '</strong> · 澜庭照护系统</p><p class="fiction">纯属虚构</p>';

    document.body.insertBefore(header, document.body.firstChild);
    document.body.appendChild(footer);
    if (document.body.getAttribute('data-cold') === 'true') document.body.classList.add('cold-floor');
    if (window.LantingSearch && window.LantingSearch.bindForm) window.LantingSearch.bindForm();
  }

  window.LantingLayout = { showToast: showToast, injectChrome: injectChrome };
  document.addEventListener('DOMContentLoaded', injectChrome);
})();
