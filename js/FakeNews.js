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

var newsArr = []; // holds the position of the news agencies

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

// Initialize gameplay variables
var score = 0;
var lives = 3;

function news(x) {
	this.x =  x;
	this.y = 0;
	this.speedY = 0;
    this.image = getImage();
	
	this.newPos = function() {
		this.y += 5;     // make news fall
	}
}

function generatenews() {
	var newsInst = new news(Math.floor(Math.random() * (width)));
	newsArr.push(newsInst);
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

function moveRockets() {
    for(i = 0; i < rockets.length; i++) {
        rockets[i].y -= 5;
    }
}

/*
 *   Shoot
 * Call getTweet()
 */
function fire() {
    if (shoot) {
        var text = getTweet();
        shoot = false;
        rocketNum++;
        var rocket = {
            x: trumpX,
            y: trumpY,
            vel: rocketVel,
            msg: text,
            num: rocketNum
        }
        rockets.push(rocket);
    }
}

function collision() {
    for(i = 0; i < newsArr.length; i++) {
        var currNews = newsArr[i];
        if(currNews.y+tweetYScale == height) {
            lives--;
            $("#lives").html("Lives: " + lives);
        }
        for(j = 0; j < rockets.length; j++) {
            var currRocket = rockets[j];
            if((currNews.y+2*tweetYScale >= currRocket.y && currNews.y-tweetYScale <= currRocket.y) && 
                (currRocket.x >= currNews.x-tweetXScale && currRocket.x <= currNews.x+tweetXScale)) {
                newsArr.splice(i,1);
                rockets.splice(j,1);
                score++;
                $("#score").html("Score: " + score);
            }
        }
    }
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
        }
    }

    if (keys[39]) {
        if (velX < maxSpeed) {
            velX += 0.5;
        }
    } 
}

setInterval(function() {	
	generatenews();
}, 1500);

function draw() {
    //whatKey();
    move();
    moveRockets();
    whatKey();
    collision();
    if(lives == 0) {
        
        gameOver();
        // make call to the Highscore API
        highscore(score);
        return;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, trumpX, trumpY, trumpX_scale, trumpY_scale);
    ctx.strokeRect(trumpX, trumpY, trumpX_scale, trumpY_scale);


	for (i = 0; i < newsArr.length; i++) {
		newsArr[i].newPos();
	}
	whatKey();
	move();
	ctx.clearRect(0, 0, width, height);
	ctx.drawImage(img, trumpX, trumpY, trumpX_scale, trumpY_scale);
	ctx.strokeRect(trumpX, trumpY, trumpX_scale, trumpY_scale);

	//draw box representing news
	for (i = 0; i < newsArr.length; i++) {
        var image = new Image(60, 45);   
        image.src = newsArr[i].image; // gets the image at the index of the news object
        ctx.drawImage(image, newsArr[i].x, newsArr[i].y, tweetXScale, tweetYScale);
	    ctx.strokeRect(newsArr[i].x, newsArr[i].y, tweetXScale, tweetYScale);
	}

    //draw box representing tweet
	for (i = 0; i < rockets.length; i++) {
        var maxWidth = tweetXScale;
        var maxHeight = tweetYScale;
        var image = new Image(25,25);
        image.src = "images/rocket.jpg";
        ctx.drawImage(image, rockets[i].x, rockets[i].y, tweetXScale, tweetYScale);
        wrapText(ctx, rockets[i].msg, rockets[i].x+50, rockets[i].y-80, maxWidth+25, 12);
    }	
    
    if(lives > 0) {
       window.requestAnimationFrame(draw); 
    } else {
        window.clear();
    }
}

function wrapText(context, text, x, y, maxWidth, lineHeight) {
    var words = text.split(' ');
    var line = '';
    var wholeTweet = '';
    ctx.font = "12px Arial";
    ctx.textAlign = "center";
    for(var n = 0; n < words.length; n++) {
      var testLine = line + words[n] + ' ';
      var metrics = context.measureText(testLine);
      var testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        context.fillText(line, x, y);
        line = words[n] + ' ';
        y += lineHeight;
      }
      else {
        line = testLine;
      }
    }
    context.fillText(line, x, y);
}

function gameOver () {
    // clear screen and don't draw anything if the game is over
    ctx.clearRect(0,0,width,height);
    var image = new Image();
    image.src = "images/flag.png";
    image.onload = function() {
        ctx.globalAlpha = 0.4;
        ctx.drawImage(image, 0, 0, width, height);
        ctx.globalAlpha = 1.0;
        ctx.font = "bold 48px Arial";
        ctx.textAlign = "center";
        ctx.fillText("GAME OVER", width/2, height/3);
        ctx.fillText("SCORE: " + score, width/2, height/3+ 75);
        ctx.font = "normal 24px Arial";
        ctx.fillText("Refresh the page to play again...", width/2, height - 25);
    }
}

window.onload = function() {
    //drawSmile();
    update_scores(); // high score API call
    trumpX = centerX - 50;
    trumpY = height - trumpY_scale;

    window.requestAnimationFrame(draw);
	
}
