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

(function(){
  // Screenshots: open the full image in a dialog. Without script, or without <dialog>, the link opens the image.
  var dialog = document.querySelector('.lightbox');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  var img = dialog.querySelector('.lightbox-frame img');
  var caption = dialog.querySelector('#lightbox-caption');
  var close = dialog.querySelector('.lightbox-close');
  var opener = null;
  document.querySelectorAll('a.shot').forEach(function(link){
    link.setAttribute('aria-haspopup', 'dialog');
    link.addEventListener('click', function(e){
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // keep "open in new tab"
      e.preventDefault();
      opener = link;
      var size = (link.getAttribute('data-size') || '').split('x');
      if (size.length === 2) { img.width = +size[0]; img.height = +size[1]; }
      img.alt = link.getAttribute('data-alt') || '';
      img.src = link.getAttribute('href');
      caption.textContent = link.getAttribute('data-caption') || '';
      dialog.showModal();
      dialog.querySelector('.lightbox-frame').scrollTop = 0;
      close.focus();
    });
  });
  close.addEventListener('click', function(){ dialog.close(); });
  // A click on the empty space around the image closes it, as Escape does.
  dialog.addEventListener('click', function(e){
    if (e.target === dialog || e.target.classList.contains('lightbox-frame')) dialog.close();
  });
  dialog.addEventListener('close', function(){ if (opener) opener.focus(); });
})();
