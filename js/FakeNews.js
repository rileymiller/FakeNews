/*$(document).ready(function() {
    resize();
    draw();
    $(window).on("resize", function() {
        resize();
    });
});

function resize() {
    $("#canvas").outerHeight($(window).height() - $("#canvas").offset().top - Math.abs($("#canvas").outerHeight(true) - $("#canvas").outerHeight()) - $(".face").outerHeight() - 10);
}*/

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext('2d');
var width = canvas.width;
var height = canvas.height;
var centerX = width / 2;
var centerY = height / 2;
var radius = 200;
var movement = 25;
var trumpX;
var trumpY;
var img = document.getElementById('trump');
var trumpX_scale = 100;
var trumpY_scale = 100;

var tweets = [];

var velX = 0;
var velY = 0;
var keys = [];
var maxSpeed = 12;

var tweetXScale = 100;
var tweetYScale = 100; 

function tweet(x) {
	this.x =  x;
	this.y = 0;
	this.speedY = 0;
	
	this.newPos = function() {
		this.y += 5;     // make tweet fall
	}
}

function generateTweets() {
	var tweetInst = new tweet(Math.floor(Math.random() * (width)));
	tweets.push(tweetInst);
}

function move() {

    if (velX > 0) {
        if ((trumpX + velX) <= width - trumpX_scale) {
            trumpX += velX;
        }
    } else {
        if ((trumpX - velX - 20) >= 0) {
            trumpX += velX;
        }
    }

}

window.addEventListener("keydown", function(e) {
    console.log(e.keyCode);
    e.preventDefault();
    keys[e.keyCode] = true;
    console.log(keys);
});
window.addEventListener("keyup", function(e) {
    console.log(e.keyCode);
    keys[e.keyCode] = false;
    console.log(keys);
});




function whatKey() {
    if (keys[37]) {
        //velX = -10;
        if (velX > -maxSpeed) {
            velX -= 0.5;
            console.log('left velX: ' + velX);
        }
        // move();
    }

    if (keys[39]) {
        //velX = 10;
        if (velX < maxSpeed) {
            velX += 0.5;
            console.log('left velX: ' + velX);
        }
        //  move();
    }
}

setInterval(function() {	
		generateTweets();
		}, 2000);

function draw() {
    //clear(ctx);

		for (i = 0; i < tweets.length; i++) {
			tweets[i].newPos();
		}
		whatKey();
		move();
		ctx.clearRect(0, 0, width, height);
		ctx.drawImage(img, trumpX, trumpY, trumpX_scale, trumpY_scale);
		ctx.strokeRect(trumpX, trumpY, trumpX_scale, trumpY_scale);
	
		// draw box representing tweet
		console.log(tweets.length);
		for (i = 0; i < tweets.length; i++) {
		    ctx.strokeRect(tweets[i].x, tweets[i].y, tweetXScale, tweetYScale);
		}
		
	window.requestAnimationFrame(draw);
	
}

window.onload = function() {
    //drawSmile();

    trumpX = centerX - 50;
    trumpY = height - trumpY_scale;

    window.requestAnimationFrame(draw);
	
}
