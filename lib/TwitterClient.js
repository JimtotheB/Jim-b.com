/**
 * @file TwitterClient
 * @author Jim Bulkowski <jim.b@paperelectron.com>
 * @project Jim-B
 * @license MIT {@link http://opensource.org/licenses/MIT}
 */

var Twitter = require('twitter');
var twttrText = require('twitter-text');
var Events = require('events').EventEmitter;
var _ = require('lodash');

function TwitterClient(){
  Events.call(this);
  this.twitter = new Twitter({
    consumer_key: '',
    consumer_secret: '',
    access_token_key: '',
    access_token_secret: ''
  });
  this.started = false;
  this.tweets = null;
  this.parsedTweets = [];
  this.updateTweets();
  return this
}

TwitterClient.prototype = _.create(Events.prototype, {
  constructor: TwitterClient
});

TwitterClient.prototype.buildParsedArray = function() {
  this.parsedTweets = _.map(this.tweets, function(tweet){
    return {
      user: {
        name: tweet.user.name,
        screen_name: tweet.user.screen_name
      },
      linkedText: twttrText.autoLink(tweet.text, {urlEntities:tweet.entities.urls}).replace(/\n/g, '<br>')
    }
  })
};

TwitterClient.prototype.updateTweets = function(){
  this.twitter.get('statuses/user_timeline', {count: 25}, function(err, tweets){
    if(!err){
      this.tweets = tweets;
      console.log('Twitter: Fetching tweets');
      if(!this.started){
        this.started = true;
        this.emit('ready');
      }
      this.buildParsedArray();
      return setTimeout(this.updateTweets.bind(this), 60 * 5 * 1000);
    }
    console.log(err)
  }.bind(this))
};

TwitterClient.prototype.getLatest = function() {
  return this.parsedTweets;
};

/**
 * Gets tweets on interval to pre render html.
 * @module TwitterClient
 */

module.exports = TwitterClient;