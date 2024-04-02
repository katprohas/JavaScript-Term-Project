//---VARIABLES---//
//players
var player1;
var player2; //computer

//scores
var player1Score = 0;
var player2Score = 0;
const winningScore = 5;
var gameOver = "";

//ball
var ball;
var ballSpeedX;
var ballSpeedY;
var ballXaxis;
var ballYaxis;

var myObstacles = [];


function startGame() {

    player1 = new component(60, 80, "media/catOne.png", 20, 220, "image");
    player2 = new component(60, 80, "media/catTwo.png", 720, 220, "image");
    ball = new component(50, 50, "media/yarn.png", 50, 50, "image")
    // if (myGameArea.key && myGameArea.key == 39) { player1.speedX = 1; }
    if (myGameArea.key && myGameArea.key == 38) { player1.speedY = -1; }
    if (myGameArea.key && myGameArea.key == 40) { player1.speedY = 1; }
    player1Score = new component("30px", "Consolas", "black", 280, 40, "text");
    player2Score = new component("30px", "Consolas", "black", 280, 40, "text");
    myGameArea.start(); //start() creates canvas element
}

//build canvas area
var myGameArea = { //object
    canvas: document.createElement("canvas"),
    start: function () {
        this.canvas.width = 800;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[4]);
        this.frameNo = 0;
        this.interval = setInterval(updateGameArea, 20);
        window.addEventListener('keydown', function (e) {
            myGameArea.keys = (myGameArea.keys || []);
            myGameArea.keys[e.keyCode] = true;
        })
        window.addEventListener('keyup', function (e) {
            myGameArea.keys[e.keyCode] = false;
        })

    },
    clear: function () {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    stop: function () {
        clearInterval(this.interval);
    }
}

function ball() {
    ballXaxis += ballSpeedX;
    ballYaxis += ballSpeedY;

    if (player1Score == winningScore) {
        gameOver = "Player 1 wins";
    } else {
        gameOver = "Player 2 wins";
    }
    if (ballX > canvas.width && ballSpeedX > 0) {

    }
}

//build components (load images, score text)
function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speedX = 0;
    this.speedY = 0;
    this.update = function () {
        ctx = myGameArea.context;
        if (this.type == "text") {
            ctx.font = this.width + " " + this.height;
            ctx.fillStyle = color;
            ctx.fillText(this.text, this.x, this.y);
        } else if (type == "image") {
            ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } else {
            ctx.fillStyle = color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }

    }
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    // this.crashWith = function (otherobj) {
    //     var myleft = this.x;
    //     var myright = this.x + (this.width);
    //     var mytop = this.y;
    //     var mybottom = this.y + (this.height);
    //     var otherleft = otherobj.x;
    //     var otherright = otherobj.x + (otherobj.width);
    //     var othertop = otherobj.y;
    //     var otherbottom = otherobj.y + (otherobj.height);
    //     var crash = true;
    //     if ((mybottom < othertop) ||
    //         (mytop > otherbottom) ||
    //         (myright < otherleft) ||
    //         (myleft > otherright)) {
    //         crash = false;
    //     }
    //     return crash;
    // }
}

//what happens when the game ends
function gameOver() {

}

function updateGameArea() {

    var x, height, gap, minHeight, maxHeight, minGap, minHeight;
    for (i = 0; i < myObstacles.length; i += 1) {
        if (player1.crashWith(myObstacles[i])) {
            myGameArea.stop();
            return;
        }
    }
    myGameArea.clear();
    myGameArea.frameNo += 1;
    // if (myGameArea.frameNo == 1 || everyinterval(150)) {
    //     x = myGameArea.canvas.width;
    //     minHeight = 60;
    //     maxHeight = 200;
    //     height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
    //     minGap = 50;
    //     maxGap = 200;
    //     gap = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
    //     myObstacles.push(new component(10, height, "blue", x, 0));
    //     myObstacles.push(new component(10, x - height - gap, "blue", x, height + gap));
    // }

    // for (i = 0; i < myObstacles.length; i += 1) {
    //     myObstacles[i].x += -1;
    //     myObstacles[i].update();
    // }
    //update scores
    player1Score.text = "Player 1 SCORE: " + myGameArea.frameNo;
    player1Score.update();

    player2Score.text = "Player 1 SCORE: " + myGameArea.frameNo;
    player2Score.update();

    player1.newPos();
    player1.update();
    // player1.speedX = 0;
    player1.speedY = 0;

    player2.newPos();
    player2.update();
    // player2.speedX = 0;
    player2.speedY = 0;
    // if (myGameArea.keys && myGameArea.keys[37]) { player1.speedX = -1; }
    // if (myGameArea.keys && myGameArea.keys[39]) { player1.speedX = 1; }
    if (myGameArea.keys && myGameArea.keys[38]) { player1.speedY = -2; }
    if (myGameArea.keys && myGameArea.keys[40]) { player1.speedY = 2; }

}

function everyinterval(n) {
    if ((myGameArea.frameNo / n) % 1 == 0) { return true; }
    return false;
}
function moveup() {
    player1.speedY -= 1;
}

function movedown() {
    player1.speedY += 1;
}

// function moveleft() {
//     player1.speedX -= 1;
// }

// function moveright() {
//     player1.speedX += 1;
// }

function stopMoving() {
    player1.speedX = 0;
    player1.speedY = 0;
}



