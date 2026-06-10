(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var hotspot = document.getElementById('hotspot-302');
    if (hotspot) {
      var timer, done = false;
      function start() { clear(); timer = setTimeout(function () {
        if (done) return; done = true;
        window.LantingLayout && window.LantingLayout.showToast('隐藏档案已解锁…');
        setTimeout(function () { window.location.href = '25.html'; }, 600);
      }, 5000); }
      function clear() { clearTimeout(timer); }
      hotspot.addEventListener('mousedown', start);
      hotspot.addEventListener('touchstart', start, { passive: true });
      hotspot.addEventListener('mouseup', clear);
      hotspot.addEventListener('mouseleave', clear);
      hotspot.addEventListener('touchend', clear);
    }

    var star = document.getElementById('footer-star');
    if (star) {
      var t;
      star.addEventListener('mousedown', function () {
        t = setTimeout(function () { window.location.href = '../external/huiyi-blog/post4.html'; }, 5000);
      });
      ['mouseup', 'mouseleave'].forEach(function (ev) { star.addEventListener(ev, function () { clearTimeout(t); }); });
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
