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
var newsImages = ['abc.png', 'cbs.png', 'cnn.png', 'nbc.png', 'nyt.png', 'wp.png', 'wsj.png'];

var velX = 0;
var velY = 0;
var keys = [];
var maxSpeed = 12;



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

function draw() {
    //clear(ctx);
    whatKey();
    move();
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(img, trumpX, trumpY, trumpX_scale, trumpY_scale);
    ctx.strokeRect(trumpX, trumpY, trumpX_scale, trumpY_scale);

    window.requestAnimationFrame(draw);
}

function getImage() {
    var randomNum = Math.floor(Math.random() * newsImages.length);
    console.log(('../images/'+newsImages[randomNum]));
    return ('../images/'+newsImages[randomNum]);
}

window.onload = function() {
    //drawSmile();
    update_scores(); // high score API call
    trumpX = centerX - 50;
    trumpY = height - trumpY_scale;
    window.requestAnimationFrame(draw);

}
