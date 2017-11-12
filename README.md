# Attitudes Online
This is a fully functional 21st century highly scalable sentiment analysis tool for twitter. The src folder contains everything you need to run a sentiment analysis on the most recent tweets of any Twitter user. The GUI on [attitudes.online](https://attitudes.online) fetches the most recent 600 tweets and runs a sentiment analysis on those. The reason for the 600 tweet search is that the twitter API only allows for 200 tweets to be searched at once, and the nature of the request means any additional requests after the first 200 are synchronous. Meaning it could take over 10 seconds to load the most recent 3200 tweets of any user. This project uses Node with Flow for type annotations.

___ 
# Attitudes front end
The front end for attitudes online is written in React with styled components from [Material-UI](http://www.material-ui.com/#/). I plan on cleaning up some of the inline styling and making the App.js file a little less cluttered.