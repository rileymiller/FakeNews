var allTweets = [];

function populateTweets() {
	for(i = 0; i < data.length; i++) {
		if(data[i].text.includes('Fake News') && !data[i].text.includes('http')) {
			allTweets.push(data[i].text);
		}
		
	}
}

function configure() {
	populateTweets();
	for(i=0;i<allTweets.length;i++) {
		console.log(allTweets[i]);
	}
};

configure();


