var allTweets = [];

function populateTweets() {
	for(i = 0; i < data.length; i++) {
		// Get all tweets containing Fake News and not containing http or ... (a continuation of a tweet)
		if(data[i].text.includes('Fake News') && !data[i].text.includes('http') && !data[i].text.includes('...')) {
			allTweets.push(data[i].text);
		}
	}
};

function getTweet() {
	var randomNum = Math.floor(Math.random() * allTweets.length);
	console.log(allTweets[randomNum]);
	return allTweets[randomNum];
};

populateTweets();
getTweet();

