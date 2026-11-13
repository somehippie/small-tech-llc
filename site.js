(function(){
  // ChannelStrip: solo one practice at a time.
  var channels = document.querySelectorAll('.channel');
  channels.forEach(function(ch){
    ch.addEventListener('click', function(){
      channels.forEach(function(o){ o.setAttribute('aria-pressed', o === ch ? 'true' : 'false'); });
    });
  });
})();

(function(){
  // Theme switch: override the system setting, remembered in this browser.
  var btn = document.querySelector('.theme-toggle');
  if (!btn) return;
  var root = document.documentElement;
  function current(){
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function label(){
    var next = current() === 'dark' ? 'light' : 'dark';
    btn.textContent = next === 'dark' ? 'Dark theme' : 'Light theme';
    btn.setAttribute('aria-label', 'Switch to the ' + next + ' theme');
  }
  btn.addEventListener('click', function(){
    var next = current() === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('theme', next); } catch (e) {}
    label();
  });
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', label);
  label();
})();
