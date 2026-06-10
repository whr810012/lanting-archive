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

  function markCurrentPage() {
    var page = document.body.getAttribute('data-page');
    if (!page) return;
    unlock('../pages/' + page + '.html');
  }

  window.LantingProgress = { unlock: unlock, load: load };
  document.addEventListener('DOMContentLoaded', markCurrentPage);
})();
