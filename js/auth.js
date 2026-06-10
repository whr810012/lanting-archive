(function () {
  'use strict';

  var STORAGE_KEY = 'lanting_auth_role';

  var ACCOUNTS = {
    shenyu: { password: 'shenyu', role: 'caregiver', name: '沈屿' },
    gulinchuan: { password: 'GLC2019', role: 'nurse', name: '林晚晴' },
    huiyi: { password: 'HY-visitor', role: 'huiyi', name: '外包顾问' }
  };

  function getRole() {
    return localStorage.getItem(STORAGE_KEY) || '';
  }

  function setRole(role) {
    if (role) localStorage.setItem(STORAGE_KEY, role);
    else localStorage.removeItem(STORAGE_KEY);
  }

  function login(username, password) {
    var user = ACCOUNTS[(username || '').trim().toLowerCase()];
    if (!user || user.password !== password) return false;
    setRole(user.role);
    return user;
  }

  function logout() {
    setRole('');
  }

  function roleLabel(role) {
    return { caregiver: '照护员', nurse: '护士长', huiyi: '外包顾问' }[role] || '未登录';
  }

  window.LantingAuth = { getRole: getRole, setRole: setRole, login: login, logout: logout, roleLabel: roleLabel };

  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('login-form');
    if (!form) return;
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var result = login(document.getElementById('login-user').value, document.getElementById('login-pass').value);
      var msg = document.getElementById('login-msg');
      if (result) {
        if (msg) { msg.textContent = '登录成功：' + result.name; msg.className = 'login-msg ok'; }
        setTimeout(function () { window.location.href = 'hub.html'; }, 800);
      } else if (msg) {
        msg.textContent = '账号或密码错误。';
        msg.className = 'login-msg err';
      }
    });
    var logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) logoutBtn.addEventListener('click', function () { logout(); window.location.reload(); });
  });
})();
