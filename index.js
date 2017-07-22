//@flow
const Twitter = require(`twitter`);
const client = require(`./config`);
const sentiment = require(`sentiment`);

function readTweets(tweets, array){
 	let lastID;
 	tweets.forEach( function(tweet,index){
 		if(index ===0){
 			lastID = tweet.id
 		}
 		else if(tweet.id < lastID){
 			lastID = tweet.id;
 		}
 			tweetArray.push(tweet)
 			//console.log(tweetArray.length, tweet.text)

 		
 })
 		  	return Number(lastID)-1;

}

const getParams = function(max_id, username){
	if (max_id === null || max_id === undefined){
		return {screen_name:username, count: 200};
	}

	return {screen_name:username, count: 200, max_id: max_id};
}

	const getTweets = function(params){
		client.get(`statuses/user_timeline`, params).then(function(tweets){
			new Promise(reject, resolve) =>


				let last = readTweets(tweets, []);
				getTweets(getParams(last, params.screen_name))
				resolve(tweets)
		}).catch((error) => console.log(error))

	}

getTweets(getParams(null, `mtthwdvs`))

const getSentiment = function(tweets){
	let score = 0;
	tweets.forEach(function(tweet, index){
		score = score + sentiment(tweet).score
		console.log(index)
	})
	console.log("this is your score: ", score)
}


