			//@flow

			const grabScore = function(user){


			const Twitter = require(`twitter`);
			const client = require('./config');
			const sentiment = require(`sentiment`);
			const tweetArray = [];


			class Tweet{
				constructor(text, id, username, statusCount){
					this.text = text;
					this.id = id;
					this.username = username;
					this.score = sentiment(text).score;
					this.total = statusCount
				}
			}

			function readTweets(tweets,array){
			 	let lastID;
			 	tweets.forEach( function(tweet,index){
			 		if(index ===0){
			 			lastID = tweet.id
			 		}
			 		else if(tweet.id < lastID){
			 			lastID = tweet.id;
			 		}
			 			array.push(new Tweet(tweet.text, tweet.id, tweet.screen_name, tweet.user.statuses_count));

			 		
			 })
			 		  	return Number(lastID)-1;

			}

			const getParams = function(max_id, username){
				if (max_id === null || max_id === undefined){
					return {screen_name:username, count: 200};
				}

				return {screen_name:username, count: 200, max_id: max_id};
			}

			const getTweets = function(params, cb){
				if(!params.hasOwnProperty('max_id')){
					const tweetArray = [];
				}
					client.get(`statuses/user_timeline`, params).then(function(tweets){

							let last = readTweets(tweets,tweetArray);
						if (tweetArray[0] !== undefined){
							if(tweetArray.length >= 1000 || tweetArray.length >= tweetArray[0].total -50){
									cb(tweetArray)
									return;
							}}
							getTweets(getParams(last, params.screen_name), cb)
					}).catch((error) => console.log(error))
				if (tweetArray[0] !== undefined){ 
					if(tweetArray.length >= 1000 || tweetArray.length >= tweetArray[0].total -50){
						cb(tweetArray);
						return;
					}}
				}

				
			const newTweets = new Promise((resolve,reject) => {
				getTweets(getParams(null, user), (tweets) => resolve(tweets))})

			const getScore = function(tweetArray){
				let score = 0;
				tweetArray.forEach((tweet) => {score = score + tweet.score
					console.log(`TWEET ${tweet.text} SCORE: ${tweet.score}`)});
				return Math.floor((score / tweetArray.length) * 3200);
			}

			return newTweets.then(function(newTweets){
				const newScore = getScore(newTweets);
				console.log("this is your score", newScore);
				return newScore
			}).catch((error) => console.log(error))


			}

			module.exports = grabScore;
