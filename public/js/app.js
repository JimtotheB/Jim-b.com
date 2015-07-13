/**
 * @file app
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Jim-B
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

$(document).foundation();

$(function(){
  var teaserText = $('#teaserText');
  var teasers = _.shuffle([
    'Understands bind, call and apply.',
    'Thinks golang is ok.',
    'Liked AngularJs 1.x.',
    'Gets exited for build tools.',
    'Prefers Webstorm.',
    'Has never water-skied.',
    'Prefers recursion.'

  ]);

  (function tease(){
    var index = teasers.pop()
    teasers.unshift(index)
    teaserText.text(" " + index)
    return setTimeout(tease, 30000)
  })()

  !function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],p=/^http:/.test(d.location)?'http':'https';if(!d.getElementById(id)){js=d.createElement(s);js.id=id;js.src=p+"://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);}}(document,"script","twitter-wjs");

});