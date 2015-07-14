var teaserText = $('#teaserText');
var cursor = $('#blinkyCursor');

var timer, typeTimer, unTypeTimer;

var teasers = [
  'Understands bind, call and apply.',
  'Has an ESXi server at home.',
  'Thinks golang is ok.',
  'Liked AngularJs 1.x.',
  'Gets exited for build tools.',
  'Uses Webstorm.',
  'Has never water-skied.',
  'Prefers recursion.'
  ].sort(function(){return 0.5 - Math.random()});


var getRandom = function(max, min){
  if(min == null){
    min = 0;
  }
  return Math.floor( Math.random() * (max - min) ) + min

}

var untype = function(done){
  var words = teaserText.html().split(' ');
  var sliceLength = words.length;

  var deleteBlock = function(){
    if(sliceLength > 0){
      teaserText.text(words.slice(0, sliceLength--).join(' '));
      unTypeTimer = setTimeout(deleteBlock, getRandom(250, 175));
    }
    else {
      done();
    }
  }
  deleteBlock();
}

var type = function(words){
  var index = 0;
  var strLen = words.length;
  var str = " ";

  var putChar = function(){
    teaserText.text(" " + words.substr(0, ++index));
    if(index <= strLen){
      typeTimer = setTimeout(putChar , getRandom(80, 60));
    }
  };

  untype(putChar);
}


//What is this 2005?
$(function() {

  ~function animateCursor(){
    cursor
      .show()
      .animate({
        opacity: 0
      }, 'slow', 'swing')
      .animate({
        opacity: 1
      }, 'slow', 'swing');

    setTimeout(animateCursor, 750);
  }();

  var tease = function t() {
    [timer, typeTimer, unTypeTimer].forEach(function(theTimer){
      clearTimeout(theTimer)
    });
    var index = teasers.pop()
    teasers.unshift(index)

    type(index)
    timer = setTimeout(t, 7500)
    return t
  }()

  teaserText.click(tease)
  $("img").error(function() {
    $(this).hide();
  });

});


window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
      t = window.twttr || {};
  if(d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);
  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };
  return t;
}(document, "script", "twitter-wjs"));

twttr.ready(function() {
  twttr.events.bind('loaded', function() {
    $(document).foundation();
  });
});