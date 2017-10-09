var tweets = ['Rex Tillerson never threatened to resign. This is Fake News put out by @NBCNews. Low news and reporting standards. No verification from me.',
"Why Isn't the Senate Intel Committee looking into the Fake News Networks in OUR country to see why so much of our news is just made up-FAKE!",
"NBC news is #FakeNews and more dishonest than even CNN. They are a disgrace to good reporting. No wonder their news ratings are way down!",
"Wow, so many Fake News stories today. No matter what I do or say, they will not write or speak truth. The Fake News Media is out of control!",
"A great day in Puerto Rico yesterday. While some of the news coverage is Fake, most showed great warmth and friendship.",
"In analyzing the Alabama Primary race,FAKE NEWS always fails to mention that the candidate I endorsed went up MANY points after endorsement!",
"Because of #FakeNews my people are not getting the credit they deserve for doing a great job. As seen here, they are ALL doing a GREAT JOB!",
"We have done a great job with the almost impossible situation in Puerto Rico. Outside of the Fake News or politically motivated ingrates,...",
"Do not believe the #FakeNews!",
"Fake News CNN and NBC are going out of their way to disparage our great First Responders as a way to 'get Trump.'' Not fair to FR or effort!"
];



function getTweets() {

	// var xhr = createCORSRequest("GET", "https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=realDonaldTrump&callback=?", false);
	// if(!xhr) {
	// 	throw new Error('CORS not supported');
	// }
	// xhr.onload = function() {
 //    	var text = xhr.responseText;
 //    	var title = getTitle(text);
 //    	alert('Response from CORS request to ' + url + ': ' + title);
 //  	};

 //  	xhr.onerror = function() {
 //    	alert('Woops, there was an error making the request.');
 //  	};

 //  	xhr.send();
}

// // Helper method to parse the title tag from the response.
// function getTitle(text) {
//   return text.match('<title>(.*)?</title>')[1];
// }

// function createCORSRequest(method, url) {
//   var xhr = new XMLHttpRequest();
//   if ("withCredentials" in xhr) {
//     // Check if the XMLHttpRequest object has a "withCredentials" property.
//     // "withCredentials" only exists on XMLHTTPRequest2 objects.
//     xhr.open(method, url, true);
//   } else if (typeof XDomainRequest != "undefined") {
//     // Otherwise, check if XDomainRequest.
//     // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
//     xhr = new XDomainRequest();
//     xhr.open(method, url);

//   } else {
//     // Otherwise, CORS is not supported by the browser.
//     xhr = null;

//   }
//   return xhr;
// }