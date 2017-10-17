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
    statusCount: number;
    score: number;
    total: number;
    URL: string;
    constructor(text: string, id: number, username: string, statusCount, url) {
      this.text = text;
      this.id = id;
      this.username = username;
      this.score = sentiment(text).score;
      this.total = statusCount;
      this.URL = url;
    }
  }

  function readTweets(tweets, array) {
    let lastID;
    tweets.forEach(function(tweet, index) {
      if (index === 0 || tweet.id < lastID) {
        lastID = tweet.id;
      }
      array.push(
        new Tweet(
          tweet.text,
          tweet.id,
          tweet.screen_name,
          tweet.user.statuses_count,
          "empty string"
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
      .catch(error => console.log(error));
    /* (if (tweetArray[0] !== undefined) {
      if (
        tweetArray.length >= 1000 ||
        tweetArray.length >= tweetArray[0].total - 50
      ) {
        cb(tweetArray);
        return;
      }
    }  */
  };

  const newTweets = new Promise((resolve, reject) => {
    getTweets(getParams(null, user), resolve);
  });

  const getData = function(tweetArray: ?Array<Tweet>): Object {
    let data = {};
    if (tweetArray !== null && tweetArray !== undefined) {
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
      data.min = minTweet.text;
      data.max = maxTweet.text;
      return data;
    }
  };
  return newTweets.then(getData).catch(error => console.log(error));
};

module.exports = grabScore;
