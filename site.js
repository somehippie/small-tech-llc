(function(){
  // ChannelStrip: solo one practice at a time.
  var channels = document.querySelectorAll('.channel');
  channels.forEach(function(ch){
    ch.addEventListener('click', function(){
      channels.forEach(function(o){ o.setAttribute('aria-pressed', o === ch ? 'true' : 'false'); });
    });
  });
})();
