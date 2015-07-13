/**
 * @file index
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Jim-B
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

var pom = require('pomegranate');
//var Twitter = require('./lib/TwitterClient');
//var twitter = new Twitter()

var options = {
  basePath: __dirname,
  renderErrors: true,
  address: '0.0.0.0',
  port: 8080,
  templating: 'jade'
}

pom
  .init(options)
  .start(function(err){
    if(err) {
      //process.exit(1)
    }
  })
  //.addDependency('Twitter', twitter)
  .on('log', function(msg) {
    console.log(msg);
  })
  .on('log-request', function(msg, obj) {
    console.log(msg);
  })
  .on('error', function(err) {
    console.log(err);
  })

//twitter.on('ready', pom.start)