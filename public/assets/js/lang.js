(function () {
  var SUPPORTED = { en: '/', ko: '/ko/', ja: '/ja/' };
  var STORAGE_KEY = 'kustody-lang';

  function currentLang() {
    var p = location.pathname;
    if (p.indexOf('/ko') === 0) return 'ko';
    if (p.indexOf('/ja') === 0) return 'ja';
    return 'en';
  }

  function detectLang() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved && SUPPORTED[saved]) return saved;
    var nav = (navigator.language || '').slice(0, 2).toLowerCase();
    if (SUPPORTED[nav]) return nav;
    return 'en';
  }

  // Auto-redirect on first visit (no saved preference yet)
  var saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) {
    var detected = detectLang();
    localStorage.setItem(STORAGE_KEY, detected);
    if (detected !== currentLang()) {
      location.replace(SUPPORTED[detected]);
      return;
    }
  }

  window.switchLang = function (code) {
    if (!SUPPORTED[code]) return;
    localStorage.setItem(STORAGE_KEY, code);
    if (code !== currentLang()) {
      location.href = SUPPORTED[code];
    }
  };
})();
