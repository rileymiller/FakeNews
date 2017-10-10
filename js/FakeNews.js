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
var images = ['abc.png', 'cbs.png', 'cnn.png', 'nbc.png', 'nyt.png', 'wp.png', 'wsj.png'];

// holds the position of the news agencies
var news = [];
// holds the image of the news agencies - same index as the position.
var newsImages = [];

var velX = 0;
var velY = 0;
var keys = [];
var maxSpeed = 12;


var shoot = false;
var rocketY = 0;
var rocketVel = 0;

var rockets = [];
var rocketNum = 0;

var allowed = false;


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

function generatenews() {
	var tweetInst = new tweet(Math.floor(Math.random() * (width)));
	news.push(tweetInst);
    newsImages.push(getImage());
}

function getImage() {
    var randomNum = Math.floor(Math.random() * images.length);
    return ('images/'+images[randomNum]);
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

/*
 *   Shoot
 * Call getTweet()
 */
function fire() {
    if (shoot) {
        var text = getTweet();
        console.log('inside tweet()');
        console.log(text);
        shoot = false;
        rocketNum++;
        var rocket = {
            x: trumpX,
            vel: rocketVel,
            msg: text,
            num: rocketNum
        }
        rockets.push(rocket);
    }
}

function collision() {

}

window.addEventListener("keydown", function(e) {
    if (e.repeat != undefined) {
        allowed = !event.repeat;
    }
    if (!allowed) return;
    allowed = false;
    e.preventDefault();
    keys[e.keyCode] = true;
    e.stopPropagation();
});
window.addEventListener("keyup", function(e) {
    spaceKey();

    keys[e.keyCode] = false;
    allowed = true;
});


function spaceKey() {
     if (keys[32]) {
        shoot = true;
        fire();
    }
}

function whatKey() {
    if (keys[37]) {
        if (velX > -maxSpeed) {
            velX -= 0.5;
            console.log('left velX: ' + velX);
        }
    }

    if (keys[39]) {
        if (velX < maxSpeed) {
            velX += 0.5;
            console.log('left velX: ' + velX);
        }
    } 
}

setInterval(function() {	
	generatenews();
}, 2000);

function draw() {
    //clear(ctx);
    //whatKey();
    move();
    whatKey();
    collision();

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, trumpX, trumpY, trumpX_scale, trumpY_scale);
    ctx.strokeRect(trumpX, trumpY, trumpX_scale, trumpY_scale);

    //clear(ctx);

	for (i = 0; i < news.length; i++) {
		news[i].newPos();
	}
	whatKey();
	move();
	ctx.clearRect(0, 0, width, height);
	ctx.drawImage(img, trumpX, trumpY, trumpX_scale, trumpY_scale);
	ctx.strokeRect(trumpX, trumpY, trumpX_scale, trumpY_scale);

	//draw box representing tweet
	for (i = 0; i < news.length; i++) {
        var image = new Image(60, 45);   
        image.src = newsImages[i]; // gets the image at the index of the news object
        ctx.drawImage(image, news[i].x, news[i].y, tweetXScale, tweetYScale);
	    ctx.strokeRect(news[i].x, news[i].y, tweetXScale, tweetYScale);
	}
		
	window.requestAnimationFrame(draw);
	
}

window.onload = function() {
    //drawSmile();
    update_scores(); // high score API call
    trumpX = centerX - 50;
    trumpY = height - trumpY_scale;

    window.requestAnimationFrame(draw);
	
}
