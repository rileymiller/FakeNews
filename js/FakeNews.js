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
    //console.log(e.keyCode);
    if (e.repeat != undefined) {
        allowed = !event.repeat;
    }
    if (!allowed) return;
    allowed = false;
    e.preventDefault();
    keys[e.keyCode] = true;
    e.stopPropagation();
    // console.log(keys);
});
window.addEventListener("keyup", function(e) {
    //console.log(e.keyCode);
    spaceKey();

    keys[e.keyCode] = false;
    allowed = true;
    // console.log(keys);
});


function spaceKey() {
     if (keys[32]) {
        shoot = true;
        fire();
    }
}

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



function draw() {
    //clear(ctx);
    //whatKey();
    move();
    whatKey();

    collision();
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, trumpX, trumpY, trumpX_scale, trumpY_scale);
    ctx.strokeRect(trumpX, trumpY, trumpX_scale, trumpY_scale);

    window.requestAnimationFrame(draw);
}

window.onload = function() {
    //drawSmile();

    trumpX = centerX - 50;
    trumpY = height - trumpY_scale;
    window.requestAnimationFrame(draw);

}