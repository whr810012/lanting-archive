(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    function bindLongPress(el, onDone, ms) {
      var timer, pressedAt = 0;
      function start() {
        clear();
        pressedAt = Date.now();
        timer = setTimeout(onDone, ms || 5000);
      }
      function end() {
        if (Date.now() - pressedAt < (ms || 5000)) clear();
      }
      function clear() { clearTimeout(timer); timer = null; }
      el.addEventListener('mousedown', start);
      el.addEventListener('mouseup', end);
      el.addEventListener('mouseleave', clear);
      el.addEventListener('touchstart', start, { passive: true });
      el.addEventListener('touchend', end);
      el.addEventListener('touchcancel', clear);
    }

    var hotspot = document.getElementById('hotspot-302');
    if (hotspot) {
      var done = false;
      bindLongPress(hotspot, function () {
        if (done) return;
        done = true;
        window.LantingLayout && window.LantingLayout.showToast('隐藏档案已解锁…');
        setTimeout(function () { window.location.href = '25.html'; }, 600);
      });
    }

    var star = document.getElementById('footer-star');
    if (star) {
      bindLongPress(star, function () {
        window.location.href = '../external/huiyi-blog/post4.html';
      });
    }

    var choiceForm = document.getElementById('choice-form');
    if (choiceForm) {
      choiceForm.addEventListener('submit', function (e) {
        e.preventDefault();
        window.LantingSearch.handleSearch(document.getElementById('choice-input').value, true);
      });
    }
  });
})();
