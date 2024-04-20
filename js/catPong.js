// -------------VARIABLES---------------- //

//canvas
const canvas = document.getElementById("catPong");
const ctx = canvas.getContext("2d");

//ball information
var ballX = canvas.width / 2;
var ballY = canvas.height - 30;
var ballSpeedX = -2;
var ballSpeedY = 2;
var ballRadius = 25;
var ballLeft = ballX - ballRadius;
var ballRight = ballX + ballRadius;

//player information
const playerHeight = 80;
const playerWidth = 60;

var player1Y = (canvas.height - playerHeight) / 2;
var player2Y = (canvas.height - playerHeight) / 2;

//scores
var player1Score = 0;
var player2Score = 0;
var winningScore = 5;

//controls
var rightKey = false;
var leftKey = false;
var upKey = false;
var downKey = false;

var aKey = false;
var wKey = false;
var sKey = false;
var dKey = false;

var spacebar = false;

// -------------EVENT LISTENERS---------------- //
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
//when key is pressed down
function keyDownHandler(e) {
    if (e.key === 37 || e.key === "ArrowRight") {
        rightKey = true;
    }
    if (e.key === 39 || e.key === "ArrowLeft") {
        leftKey = true;
    }
    if (e.key === 38 || e.key === "ArrowUp") {
        upKey = true;
    }
    if (e.key === 40 || e.key === "ArrowDown") {
        downKey = true;
    }

    // -- ADD CONTROLS FOR TESTING RIGHT PADDLE -- //
    if (e.code === "KeyD") {
        dKey = true;
    }
    if (e.code === "KeyA") {
        aKey = true;
    }
    if (e.code === "KeyW") {
        wKey = true;
    }
    if (e.code === "KeyS") {
        sKey = true;
    }

    //CONTROL FOR SPACEBAR
    if (e.key === 32 || e.code === "Space") {
        spacebar = true;
    }
}
//when key is lifted up
function keyUpHandler(e) {
    if (e.key === 37 || e.key === "ArrowRight") {
        rightKey = false;
    }
    if (e.key === 39 || e.key === "ArrowLeft") {
        leftKey = false;
    }
    if (e.key === 38 || e.key === "ArrowUp") {
        upKey = false;
    }
    if (e.key === 40 || e.key === "ArrowDown") {
        downKey = false;
    }

    // -- ADD CONTROLS FOR TESTING RIGHT PADDLE -- //
    if (e.code === "KeyD") {
        dKey = false;
    }
    if (e.code === "KeyA") {
        aKey = false;
    }
    if (e.code === "KeyW") {
        wKey = false;
    }
    if (e.code === "KeyS") {
        sKey = false;
    }

    //CONTROL FOR SPACEBAR
    if (e.key === 32 || e.code === "Space") {
        spacebar = false;
    }
}

//DEFINE COMPONENTS (create images, score text)
function component(width, height, color, x, y, type) {
    this.type = type;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
    }
    //dimensions of object
    this.width = width;
    this.height = height;
    //location on canvas
    this.x = x;
    this.y = y;

    //ctx.drawGame();
    this.update = function () {
        //ctx = drawGame.context;
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
}
// -------------CREATE COMPONENTS---------------- //

function drawBall() {
    var yarnBall = new component(ballRadius, ballRadius, "media/yarn.png", ballX, ballY, "image");
    yarnBall.update();
}

function drawPlayer1() {
    //player left
    // ctx.beginPath();
    // ctx.rect(0, player1Y, playerWidth, playerHeight);
    // ctx.fillStyle = "#0b6623";
    // ctx.fill();
    // ctx.closePath();
    var player1 = new component(playerWidth, playerHeight, "media/catOne.png", 0, player1Y, "image");
    player1.update();
}
function drawPlayer2() {
    //player right
    // ctx.beginPath();
    // ctx.rect(canvas.width - playerWidth, player2Y, playerWidth, playerHeight);
    // ctx.fillStyle = "#0095DD";
    // ctx.fill();
    // ctx.closePath();
    var player2 = new component(playerWidth, playerHeight, "media/catTwo.png", 740, player2Y, "image");
    player2.update();
}

function drawScores() {
    ctx.font = "20px Courier";
    ctx.fillStyle = "black";
    ctx.fillText(player1Score, canvas.width / 2 - 60, 40);
    ctx.fillText(player2Score, canvas.width / 2 + 60, 40);
}

// -------------BALL MOVEMENT/BEHAVIOR---------------- //

function ballMovement() {
    // Moved position code to simplify logic in following if-else statements
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    // update left and right sides of ball
    ballLeft = ballX - ballRadius;
    ballRight = ballX + ballRadius;

    //if player 1 wins
    if (player1Score == winningScore) {
        ctx.font = "50px Courier";
        ctx.fillStyle = "black";
        ctx.fillText("Player 1 Wins!", 200, canvas.height / 2);
        gameOver();
    }
    //if player 2 wins
    if (player2Score == winningScore) {
        ctx.font = "50px Courier";
        ctx.fillStyle = "black";
        ctx.fillText("Player 2 Wins!", 200, canvas.height / 2);
        gameOver();
    }

    //ball hits bottom of screen OR top of screen --OK--
    if (ballY > canvas.height - ballRadius || ballY < ballRadius) {
        ballSpeedY = -ballSpeedY;
    }

    //ball hits left OR right screen edge -- reset game
    if (ballLeft <= 0) { //ball hits left side
        player2Score++;
        ballReset();
    }

    //ball hits left OR right screen edge -- reset game
    if (ballRight >= canvas.width) {
        player1Score++;
        ballReset();
    }

    // left paddle contact
    if (
        ballLeft <= playerWidth &&
        ballY > player1Y && //top of paddle
        ballY < player1Y + playerHeight //bottom of paddle
    ) {
        ballSpeedX = 4;
    }
    // right paddle contact
    if (
        ballRight >= canvas.width - playerWidth &&
        ballY > player2Y && //top of paddle
        ballY < player2Y + playerHeight //bottom of paddle
    ) {
        ballSpeedX = -4;
    }
}
// ---------------------------------------------------- //

function ballReset() {
    ballX = canvas.width / 2;
    ballY = canvas.height - 30;
    ballSpeedX = 2;
    ballSpeedY = 2;
    ballSpeedX = -ballSpeedX;
}
// -------------PLAYER 1 MODE COMPUTER HANDLING---------------- //
function computerHandling() {
    var player2YCenter = player2Y + (playerHeight / 2);
    //var computerSpeed = 3;
    if (player2YCenter < ballY - ballRadius) {
        player2Y += 1;
    } else if (player2YCenter > ballY + ballRadius) {
        player2Y -= 1;
    }
}

// -------------WHEN GAME ENDS---------------- //
function gameOver() {
    ballSpeedX = 0;
    ballSpeedY = 0;
    ctx.font = "30px Courier";
    ctx.fillStyle = "black";
    ctx.fillText("Press the spacebar to reset", 150, canvas.height - 100);
}
// -------------DRAW GAME FUNCTIONS FOR 1-PLAYER MODE TO CANVAS---------------- //
function drawGame1P() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clears whole canvas area

    //load in functions to create board and components

    drawPlayer1();
    drawPlayer2();
    computerHandling();
    drawBall();
    ballMovement();
    drawScores();

    // ------------  LEFT PADDLE CONTROL ------------- //
    if (rightKey) {
        player1Y = Math.min(player1Y + 7, canvas.height - playerHeight);
    }
    if (leftKey) {
        player1Y -= 7;
        if (player1Y < 0) {
            player1Y = 0;
        }
    }
    if (upKey) {
        player1Y = Math.max(player1Y - 7, 0);
    }
    if (downKey) {
        player1Y = Math.min(player1Y + 7, canvas.height - playerHeight);
    }

    // ------------  WHEN SPACEBAR IS PRESSED ------------- //
    if (spacebar) {
        console.log("Spacebar detected");
        document.location.reload();
        //clearInterval(interval);
        startGame1P();
    }
}

// -------------DRAW GAME FUNCTIONS FOR 2-PLAYER MODE TO CANVAS---------------- //
function drawGame2P() {
    ctx.clearRect(0, 0, canvas.width, canvas.height); //clears whole canvas area

    //load in functions to create board and components

    drawPlayer1();
    drawPlayer2();
    drawBall();
    ballMovement();
    drawScores();

    // ------------  LEFT PADDLE CONTROL ------------- //
    if (dKey) {
        player1Y = Math.min(player1Y + 7, canvas.height - playerHeight);
    }
    if (aKey) {
        player1Y -= 7;
        if (player1Y < 0) {
            player1Y = 0;
        }
    }
    if (wKey) {
        player1Y = Math.max(player1Y - 7, 0);
    }
    if (sKey) {
        player1Y = Math.min(player1Y + 7, canvas.height - playerHeight);
    }

    // ------------  RIGHT PADDLE CONTROL ------------- //
    if (rightKey) {
        player2Y = Math.min(player2Y + 7, canvas.height - playerHeight);
    }
    if (leftKey) {
        player2Y -= 7;
        if (player2Y < 0) {
            player2Y = 0;
        }
    }
    if (upKey) {
        player2Y = Math.max(player2Y - 7, 0);
    }
    if (downKey) {
        player2Y = Math.min(player2Y + 7, canvas.height - playerHeight);
    }
    // ------------  WHEN SPACEBAR IS PRESSED ------------- //
    if (spacebar) {
        console.log("Spacebar detected");
        document.location.reload();
        //clearInterval(interval);
        startGame2P();
    }
}

function startGame1P() {
    var interval = setInterval(drawGame1P, 10);
}

function startGame2P() {
    var interval = setInterval(drawGame2P, 10);
}

document.getElementById("runButton1P").addEventListener("click", function () {
    startGame1P();
    this.disabled = true;
});
document.getElementById("runButton2P").addEventListener("click", function () {
    startGame2P();
    this.disabled = true;
});
