//@flow
const grabScore = function(user: String) {
  const Twitter = require('twitter');
  const client = require('./config');
  const sentiment = require('sentiment');
  const tweetArray = [];

  class Tweet {
    text: string;
    id: number;
    username: string;
    score: number;
    total: number;
    url: string;
    avi: string;
    name: string;
    constructor(text: string, id: number, username: string, statusCount: number, url: string, avi: string, name: string) {
      this.text = text;
      this.id = id;
      this.username = username;
      this.score = sentiment(text).score;
      this.total = statusCount;
      this.url = url;
      this.avi = avi;
      this.name = name;
    }
  }

  function readTweets(tweets, array): number {
    let lastID;
    tweets.forEach(function(tweet, index) {
      if (index === 0 || tweet.id < lastID) {
        lastID = tweet.id;
      }
      array.push(
        new Tweet(
          tweet.text,
          tweet.id,
          tweet.user.screen_name,
          tweet.user.statuses_count,
          `https://www.twitter.com/${tweet.user.screen_name}/statuses/${tweet.id_str}`,
          tweet.user.profile_image_url_https,
          tweet.user.name
        )
      );
    });
    return Number(lastID) - 1;
  }

  const getParams = function(max_id, username: String) {
    if (max_id === null || max_id === undefined) {
      return {
        screen_name: username,
        count: 200
      };
    }

    return {
      screen_name: username,
      count: 200,
      max_id: max_id
    };
  };

  const getTweets = function(params, cb) {
    if (!params.hasOwnProperty('max_id')) {
      const tweetArray = [];
    }
    client
      .get(`statuses/user_timeline`, params)
      .then(function(tweets) {
        let last = readTweets(tweets, tweetArray);
        if (tweetArray[0] === undefined) {
          cb(null);
        } else if (
          tweetArray.length >= 1000 ||
          tweetArray.length >= tweetArray[0].total - 50
        ) {
          cb(tweetArray);
        } else {
          getTweets(getParams(last, params.screen_name), cb);
        }
      })
      .catch(function(error){
        console.log(error + " uh oh!");
        tweetArray.push(new Tweet());
      });
    

  };

  const newTweets = new Promise((resolve, reject) => {
    getTweets(getParams(null, user), resolve);
  });

  const getData = function(tweetArray: ?Array<Tweet>) {
    let data = {};
    
    if (tweetArray !== null && tweetArray !== undefined) {
      if(tweetArray.length ===0 || tweetArray === null || tweetArray === undefined){
        data.min="https://twitter.com/realdonaldtrump/status/332308211321425920?";
        data.max = "https://twitter.com/hillaryclinton/status/791263939015376902?lang=en";
        data.avi="https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png";
        data.name="Whoa! it looks like you typed in a name that doesn't have a twitter account associated with it"
        data.score = 0;
      }
      const score = tweetArray.reduce((a, b) => a + b.score, 0);
      data.score = Math.floor(score / tweetArray.length * 3200);
      let minTweet: Tweet = tweetArray[0];
      let maxTweet: Tweet = tweetArray[0];
      tweetArray.forEach(function(tweet) {
        if (tweet.score < minTweet.score) {
          minTweet = tweet;
        }
        if (tweet.score > maxTweet.score) {
          maxTweet = tweet;
        }
      });
      data.min = minTweet.url;
      data.max = maxTweet.url;
      data.avi = tweetArray[0].avi;
      data.name = tweetArray[0].name;
      return data;
    }
  };
  return newTweets.then(getData).catch(error => console.log(error));
};

module.exports = grabScore;
