//@flow
var Twitter = require('twitter-node-client').Twitter;
var Promise = require('promise');
const config = require('./data/twitter_config');

var twitter = new Twitter(config);

var error = function(err, response, body) {
  console.log('ERROR [%s]', err);
};


var successUser = function(data) {
  let lastID = "";
  let parsed = JSON.parse(data)

  parsed.forEach(function(tweet, index) {
      console.log("NUMBER: ", index + 1, " ", tweet.text)
      if (index === 199) {
        //console.log("last ID:", tweet.id)
        lastID = tweet.id
      }
    })
    // console.log("LAST: ", lastID)
  return lastID;
}

function userTraverse(user) {
  return new Promise((resolve, reject) => {
    twitter.getUserTimeline({
      screen_name: user,
      count: '200'
    }, error, (data) => successUser(data))
  })
}
/*for(let i=0; i<16; i++){
      twitter.getUserTimeline({ screen_name: user, count: '200', max_id: id}, error, successUser);

  } */



userTraverse('mtthwdvs').then(function(data) {
  console.log("DATA:", data)
})