/**
 * @file Frontpage
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Jim-B
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

/**
 *
 * @module Frontpage
 */

var ft = function(string){
  return string.replace(/\n/g, '<br>')
}

module.exports = function(Router) {
  Router.get('/', function(req, res, next) {
    //var latestTweets = Twitter.getLatest()
    res.render('frontpage/Frontpage', {title: 'Jim Bulkowski'})
  })

  return {path: '/', router: Router}
}