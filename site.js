/* Small Tech LLC: page behaviour. Nothing here animates; the ChannelStrip's solo bar is the only motion, and it lives in CSS. */

(function(){
  // ChannelStrip: solo one practice at a time. Once a visitor picks one, the menu button below follows it.
  var channels = document.querySelectorAll('.channel');
  var menuLink = document.querySelector('.practice-more a');
  var names = { cd: 'Creative Direction', ai: 'AI Training', fin: 'Personal Finance' };
  channels.forEach(function(ch){
    ch.addEventListener('click', function(){
      channels.forEach(function(o){ o.setAttribute('aria-pressed', o === ch ? 'true' : 'false'); });
      var m = ch.className.match(/\bch-(cd|ai|fin)\b/);
      if (menuLink && m) {
        menuLink.href = 'services.html?solo=' + m[1];
        menuLink.textContent = 'See the ' + names[m[1]] + ' services';
      }
    });
  });
})();

(function(){
  // Theme switch: override the system setting, remembered in this browser.
  var root = document.documentElement;
  var btn = document.querySelector('.theme-toggle');
  function current(){
    var t = root.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function label(){
    if (!btn) return;
    var next = current() === 'dark' ? 'light' : 'dark';
    btn.textContent = next === 'dark' ? 'Dark theme' : 'Light theme';
    btn.setAttribute('aria-label', 'Switch to the ' + next + ' theme');
  }
  if (btn) {
    btn.addEventListener('click', function(){
      var next = current() === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      label();
    });
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', label);
    label();
  }
  // Paper is light: print in the light theme, then put the visitor's choice back.
  var printing = false, saved = null;
  window.addEventListener('beforeprint', function(){ printing = true; saved = root.getAttribute('data-theme'); root.setAttribute('data-theme', 'light'); });
  window.addEventListener('afterprint', function(){
    if (!printing) return;
    printing = false;
    if (saved) root.setAttribute('data-theme', saved); else root.removeAttribute('data-theme');
  });
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

(function(){
  // Services page: solo a practice and search the menu. The address keeps the filter, so a filtered menu can be shared.
  var panel = document.querySelector('.menu-console');
  if (!panel) return;
  var services = Array.prototype.slice.call(document.querySelectorAll('.service[data-practice]'));
  var sections = Array.prototype.slice.call(document.querySelectorAll('[data-menu-section]'));
  var buttons = Array.prototype.slice.call(panel.querySelectorAll('[data-solo]'));
  var search = panel.querySelector('#menu-q');
  var count = panel.querySelector('.menu-count');
  var empty = panel.querySelector('.menu-empty');
  var emptyLink = empty ? empty.querySelector('a') : null;
  var print = panel.querySelector('.menu-print');
  var texts = services.map(function(s){ return s.textContent.replace(/\s+/g, ' ').toLowerCase(); });
  // Words match from their start, so "tub" finds "hot tub" but not "YouTube".
  function finds(text, term){ return new RegExp('(^|[^a-z0-9])' + term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(text); }
  var params = new URLSearchParams(location.search);
  var solo = params.get('solo') || 'all';
  if (!buttons.some(function(b){ return b.getAttribute('data-solo') === solo; })) solo = 'all';
  search.value = params.get('q') || '';

  function apply(){
    var raw = search.value.trim();
    var terms = raw.toLowerCase().split(/\s+/).filter(Boolean);
    var shown = 0;
    services.forEach(function(s, i){
      var match = (solo === 'all' || s.getAttribute('data-practice') === solo) &&
        terms.every(function(t){ return finds(texts[i], t); });
      s.hidden = !match;
      if (match) shown++;
    });
    sections.forEach(function(sec){ sec.hidden = !sec.querySelector('.service[data-practice]:not([hidden])'); });
    buttons.forEach(function(b){ b.setAttribute('aria-pressed', b.getAttribute('data-solo') === solo ? 'true' : 'false'); });
    count.textContent = shown === services.length ? services.length + ' services' : 'Showing ' + shown + ' of ' + services.length + ' services';
    if (empty) empty.hidden = shown !== 0;
    if (emptyLink) emptyLink.href = 'index.html' + (raw ? '?q=' + encodeURIComponent(raw) : '') + '#contact';
    var p = new URLSearchParams();
    if (solo !== 'all') p.set('solo', solo);
    if (raw) p.set('q', raw);
    var qs = p.toString();
    try { history.replaceState(null, '', location.pathname + (qs ? '?' + qs : '') + location.hash); } catch (e) {} // sandboxed previews may refuse
  }

  buttons.forEach(function(b){
    b.addEventListener('click', function(){ solo = b.getAttribute('data-solo'); apply(); });
  });
  search.addEventListener('input', apply);
  if (print) print.addEventListener('click', function(){ window.print(); });
  // "/" jumps to the search box; typing in a field is left alone.
  document.addEventListener('keydown', function(e){
    if (e.key !== '/' || e.ctrlKey || e.metaKey || e.altKey) return;
    var t = e.target;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    e.preventDefault();
    search.focus();
  });
  apply();
})();

(function(){
  // Home page: the brief. Choices and two short answers become an email the visitor reads, then sends from their own app.
  // Nothing is sent or stored by the page.
  var form = document.querySelector('.brief');
  if (!form) return;
  var EMAIL = 'pbonaccorsi@gmail.com';
  var PRACTICE = { cd: 'Creative Direction', ai: 'AI Training', fin: 'Personal Finance', unsure: 'Not sure yet' };
  var WHEN = { week: 'This week', month: 'This month', exploring: 'Just exploring' };
  var service = form.querySelector('#brief-service');
  var working = form.querySelector('#brief-working');
  var stuck = form.querySelector('#brief-stuck');
  var subject = form.querySelector('#brief-subject');
  var message = form.querySelector('.brief-message');
  var send = form.querySelector('.brief-send');
  var copy = form.querySelector('.brief-copy');
  var status = form.querySelector('.brief-status');
  var subjectEdited = false;

  function checked(name){ var r = form.querySelector('input[name="' + name + '"]:checked'); return r ? r.value : ''; }
  function check(name, value){
    var r = Array.prototype.filter.call(form.querySelectorAll('input[name="' + name + '"]'), function(i){ return i.value === value; })[0];
    if (r) r.checked = true;
    return !!r;
  }
  function option(){ var o = service.options[service.selectedIndex]; return o && o.value ? o : null; }
  function optionPractice(o){ return o && o.parentNode && o.parentNode.getAttribute ? (o.parentNode.getAttribute('data-practice') || '') : ''; }

  function defaultSubject(){
    var o = option(), p = checked('practice');
    if (o) return 'Small Tech: ' + o.textContent.trim();
    if (p && p !== 'unsure') return 'Small Tech: ' + PRACTICE[p];
    return 'Small Tech: starting a conversation';
  }
  function body(){
    var o = option(), p = checked('practice') || 'unsure';
    var about = [p !== 'unsure' ? PRACTICE[p] : '', o ? o.textContent.trim() : ''].filter(Boolean).join(', ') || PRACTICE.unsure;
    return [
      'Hi Paolo,', '',
      'About: ' + about,
      'Hoping to start: ' + (WHEN[checked('when')] || WHEN.exploring), '',
      "What I'm working on:", working.value.trim() || '(left blank)', '',
      "What's not working about it:", stuck.value.trim() || '(left blank)', '',
      '(Written with the brief on the Small Tech LLC site.)'
    ].join('\n');
  }
  function mailto(){
    return 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject.value.trim() || defaultSubject()) +
      '&body=' + encodeURIComponent(body().replace(/\n/g, '\r\n'));
  }
  function update(){
    if (!subjectEdited) subject.value = defaultSubject();
    message.textContent = body();
    send.href = mailto();
    status.textContent = '';
  }

  // A service picked from the menu sets its practice; a practice that doesn't fit the picked service clears it.
  service.addEventListener('change', function(){ var p = optionPractice(option()); if (p) check('practice', p); update(); });
  form.addEventListener('change', function(e){
    if (e.target.name === 'practice') {
      var p = optionPractice(option());
      if (p && p !== e.target.value) service.value = '';
    }
    update();
  });
  form.addEventListener('input', function(e){
    if (e.target === subject) subjectEdited = subject.value.trim() !== '';
    update();
  });
  form.addEventListener('submit', function(e){ e.preventDefault(); });
  send.addEventListener('click', function(){
    send.href = mailto();
    status.textContent = 'Opening your email app. If nothing opens, copy the message instead.';
  });
  copy.addEventListener('click', function(){
    var text = 'To: ' + EMAIL + '\nSubject: ' + (subject.value.trim() || defaultSubject()) + '\n\n' + body();
    function done(ok){
      status.textContent = ok ? 'Copied. Paste it into an email to ' + EMAIL + '.' : "Copying didn't work here. Select the message and copy it by hand.";
    }
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).then(function(){ done(true); }, function(){ done(false); });
    else done(false);
  });

  // Links can pre-fill the brief: index.html?about=web-presence#contact, ?practice=ai, ?when=month, ?q=words from the menu search.
  var params = new URLSearchParams(location.search);
  var about = params.get('about');
  if (about && Array.prototype.some.call(service.options, function(o){ return o.value === about; })) {
    service.value = about;
    var ap = optionPractice(option());
    if (ap) check('practice', ap);
  }
  if (params.get('practice')) check('practice', params.get('practice'));
  if (params.get('when')) check('when', params.get('when'));
  if (params.get('q')) working.value = "Something I didn't see on the menu: " + params.get('q').slice(0, 200);

  // The same fill, for an AI agent working in the visitor's browser (see the WebMCP block below). It never sends.
  form.fillBrief = function(d){
    d = d || {};
    if (d.service && Array.prototype.some.call(service.options, function(o){ return o.value === d.service; })) {
      service.value = d.service;
      var sp = optionPractice(option());
      if (sp) check('practice', sp);
    }
    if (d.practice) check('practice', d.practice);
    if (d.start) check('when', d.start);
    if (typeof d.working_on === 'string') working.value = d.working_on.slice(0, 500);
    if (typeof d.not_working === 'string') stuck.value = d.not_working.slice(0, 500);
    update();
    return { to: EMAIL, subject: subject.value, body: body(), mailto: mailto(),
      note: 'Nothing was sent. The brief on the page now shows this draft; the person reviews it and sends it from their own email app.' };
  };

  // The plain email button stays for anyone who would rather skip the brief; the brief's button becomes the main one.
  var plain = document.querySelector('.contact-email');
  if (plain) { plain.classList.remove('btn-primary'); plain.classList.add('btn-secondary'); }
  update();

  // On-device subject line: only where Chrome's built-in Summarizer is already on this computer.
  // It never triggers the model download, and the text never leaves the browser.
  var suggest = form.querySelector('.brief-suggest');
  if (!suggest || !('Summarizer' in self)) return;
  var opts = { type: 'headline', length: 'short', format: 'plain-text', expectedInputLanguages: ['en'], outputLanguage: 'en',
    sharedContext: 'A short email from someone asking a one-person consultancy for help.' };
  var suggestBtn = suggest.querySelector('button');
  var note = suggest.querySelector('p');
  Promise.resolve().then(function(){ return self.Summarizer.availability(opts); }).then(function(a){
    if (a !== 'available') return;
    suggest.hidden = false;
    suggestBtn.addEventListener('click', function(){
      var text = (working.value.trim() + '\n' + stuck.value.trim()).trim();
      if (text.length < 20) { note.textContent = 'Write a sentence or two above first.'; return; }
      suggestBtn.disabled = true;
      note.textContent = 'Writing a subject on this device.';
      var s;
      self.Summarizer.create(opts).then(function(summarizer){
        s = summarizer;
        return s.summarize(text, { context: 'Write it as a short email subject line.' });
      }).then(function(out){
        var line = String(out || '').trim().replace(/^["'“]+|["'”]+$/g, '').replace(/\.$/, '');
        if (line) { subject.value = 'Small Tech: ' + line; subjectEdited = true; update(); }
        note.textContent = "Suggested by Chrome's built-in model, on this device. Nothing left your browser. Edit it as you like.";
      }).catch(function(){
        note.textContent = "Couldn't write a suggestion here. The subject above works as it is.";
      }).then(function(){
        suggestBtn.disabled = false;
        if (s && s.destroy) s.destroy();
      });
    });
  }).catch(function(){});
})();

(function(){
  // WebMCP: tools an AI agent in the visitor's own browser can call, instead of guessing at the page.
  // Feature-detected; where the browser has no WebMCP, nothing happens. Read-only except the draft, which never sends.
  var mc = document.modelContext || navigator.modelContext;
  if (!mc || typeof mc.registerTool !== 'function') return;
  var modern = !!document.modelContext; // the current draft takes a plain result; the early preview wanted MCP content blocks
  function out(v){ var text = typeof v === 'string' ? v : JSON.stringify(v, null, 2); return modern ? text : { content: [{ type: 'text', text: text }] }; }
  function register(tool){ try { var r = mc.registerTool(tool); if (r && typeof r.catch === 'function') r.catch(function(){}); } catch (e) {} }
  var base = new URL('.', location.href).href;

  register({
    name: 'small_tech_contact',
    title: 'How to reach Small Tech LLC',
    description: "How to reach Paolo Bonaccorsi at Small Tech LLC, a one-person practice in Fremont, California, and what to put in a first message. Read-only.",
    inputSchema: { type: 'object', properties: {} },
    annotations: { readOnlyHint: true },
    execute: function(){
      return Promise.resolve(out({
        email: 'pbonaccorsi@gmail.com',
        first_message: "Say what you're working on and what's not working about it.",
        brief: base + 'index.html#contact',
        location: 'Fremont, California',
        note: 'The site has no forms that submit anywhere. Inquiries go by email, sent by the person.'
      }));
    }
  });

  function menu(){
    var items = document.querySelectorAll('.service[data-practice]');
    if (items.length) return Array.prototype.map.call(items, function(s){
      var desc = Array.prototype.map.call(s.querySelectorAll('.service-desc, .service-list li, .service-part h4'), function(n){ return n.textContent.trim(); }).join(' ');
      return { id: s.id.replace(/^svc-/, ''), title: s.querySelector('h3').textContent.trim(), practice: s.getAttribute('data-practice'), description: desc, url: base + 'services.html#' + s.id };
    });
    return Array.prototype.map.call(document.querySelectorAll('#brief-service option'), function(o){
      if (!o.value) return null;
      return { id: o.value, title: o.textContent.trim(), practice: o.parentNode.getAttribute('data-practice') || 'other', url: base + 'services.html#svc-' + o.value };
    }).filter(Boolean);
  }
  register({
    name: 'small_tech_services',
    title: 'Search the Small Tech menu',
    description: 'Lists the services Small Tech LLC offers, optionally filtered by practice (cd = Creative Direction, ai = AI Training, fin = Personal Finance, or teams, life, home) or by words to match. Read-only.',
    inputSchema: { type: 'object', properties: {
      practice: { type: 'string', enum: ['cd', 'ai', 'fin', 'teams', 'life', 'home'], description: 'Only services in this practice or group' },
      query: { type: 'string', description: 'Words to look for in a service title or description' }
    } },
    annotations: { readOnlyHint: true },
    execute: function(input){
      input = input || {};
      var terms = String(input.query || '').toLowerCase().split(/\s+/).filter(Boolean);
      var list = menu().filter(function(s){
        if (input.practice && s.practice !== input.practice) return false;
        var hay = (s.title + ' ' + (s.description || '')).toLowerCase();
        return terms.every(function(t){ return new RegExp('(^|[^a-z0-9])' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).test(hay); });
      });
      return Promise.resolve(out({ count: list.length, services: list, menu: base + 'services.html' }));
    }
  });

  var form = document.querySelector('.brief');
  if (form && typeof form.fillBrief === 'function') register({
    name: 'small_tech_draft_inquiry',
    title: 'Draft an email to Small Tech',
    description: 'Fills in the brief on this page and returns the draft email: subject, body and a mailto link. It does not send anything; the person reads it and sends it from their own email app.',
    inputSchema: { type: 'object', properties: {
      practice: { type: 'string', enum: ['cd', 'ai', 'fin', 'unsure'], description: 'cd = Creative Direction, ai = AI Training, fin = Personal Finance' },
      service: { type: 'string', description: 'A service id from small_tech_services, if one fits' },
      working_on: { type: 'string', maxLength: 500, description: 'What the person is working on, in their words' },
      not_working: { type: 'string', maxLength: 500, description: "What isn't working about it" },
      start: { type: 'string', enum: ['week', 'month', 'exploring'], description: 'When they would like to start' }
    }, required: ['working_on'] },
    annotations: { readOnlyHint: false },
    execute: function(input){ return Promise.resolve(out(form.fillBrief(input))); }
  });
})();
