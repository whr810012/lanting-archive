(function () {
  'use strict';

  var STORAGE_KEY = 'lanting_unlocked';

  function load() {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch (e) { return []; }
  }

  function save(list) { localStorage.setItem(STORAGE_KEY, JSON.stringify(list)); }

  function unlock(path) {
    var list = load();
    if (list.indexOf(path) === -1) { list.push(path); save(list); }
  }

  function isUnlocked(path) {
    return load().indexOf(path) !== -1;
  }

  function getEntries() {
    var list = load();
    var catalog = window.LantingCatalog && window.LantingCatalog.pages;
    if (!catalog) return list.map(function (p) { return { path: p, title: p, id: '?' }; });
    return list
      .filter(function (p) { return catalog[p]; })
      .map(function (p) {
        var m = catalog[p];
        return { path: p, title: m.title, id: m.id };
      })
      .sort(function (a, b) {
        var aid = a.id.replace('EX', '99');
        var bid = b.id.replace('EX', '99');
        return aid.localeCompare(bid, undefined, { numeric: true });
      });
  }

  function getLoginHints() {
    var hints = window.LantingCatalog && window.LantingCatalog.loginHints;
    if (!hints) return [];
    return hints.filter(function (h) { return isUnlocked(h.need); });
  }

  function markCurrentPage() {
    var page = document.body.getAttribute('data-page');
    if (!page || page === '—') return;
    if (page === '09b') {
      unlock('../pages/monitor-log.html');
      return;
    }
    if (page === '04b') {
      unlock('../pages/0313-index.html');
      return;
    }
    unlock('../pages/' + page + '.html');
  }

  window.LantingProgress = {
    unlock: unlock,
    load: load,
    isUnlocked: isUnlocked,
    getEntries: getEntries,
    getLoginHints: getLoginHints
  };

  document.addEventListener('DOMContentLoaded', markCurrentPage);
})();
