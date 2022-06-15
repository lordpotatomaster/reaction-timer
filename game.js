/*
Contains a Game Area
*/

function Game() {
    this.lastTime = 0;
    this.startTime = 0
    this.handleToAnimation 
    this.canvas =  document.getElementById("myCanvas");
    this.ctx    =  this.canvas.getContext("2d"); 
    this.isCancelled = false;

    this.start = function() {
        this.countDownStarted = false
        console.log("started")
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.fillStyle = "black";
        this.ctx.fill();
        this.ctx.closePath();
        
        this.ctx.fillStyle = "green";
        this.ctx.font = "30px Arial";
        this.ctx.textAlign = "center"
        this.ctx.fillText("Click the button", this.canvas.width/2, this.canvas.height/2) 
    }

    this.startCountdown = function () {
        //start timer
        this.countDownStarted = true;
        console.log("countdown started");
        setTimeout(()=>this.timerHandler(), getRandomArbitrary(3,7)*1000);
        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "red";
        this.ctx.fill();
        this.ctx.closePath();
        
        this.ctx.fillStyle = "black";
        this.ctx.font = "30px Arial";
        this.ctx.textAlign = "center"
        this.ctx.fillText("Click or press spacebar when the", this.canvas.width/2, this.canvas.height/2) 
        this.ctx.fillText("screen turns green", this.canvas.width/2, this.canvas.height/2 + 50) 
    }

    //fires when settimeout is called
    this.timerHandler = function () {
        if (this.isCancelled === false) {
            console.log("not cancelled");
            window.requestAnimationFrame(this.updateReactionTimer.bind(this));
        }
    }

    this.updateReactionTimer = function (time) {
        //capture start time (date)
        if (this.startTime === 0) {
            this.startTime = time;
        }
        let cTime = (time - this.startTime)/1000
        //console.log('called updateReactionTimer '+ time+" : "+this.cTime)

        //start timer and check for click and spacebar on the window
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.beginPath();
        this.ctx.rect(0, 0, this.canvas.width, this.canvas.height)
        this.ctx.fillStyle = "green";
        this.ctx.fill();
        this.ctx.closePath();

        this.ctx.fillStyle = "black";
        this.ctx.font = "30px Arial";
        this.ctx.textAlign = "left"
        this.ctx.fillText(Math.round(cTime*1000)/1000,  this.canvas.width/2, this.canvas.height/2) 

        this.handleToAnimation = window.requestAnimationFrame(this.updateReactionTimer.bind(this))
    }

    this.cheaterPig = function()    {
        if (this.countDownStarted)   {
            this.isCancelled = true;
            window.cancelAnimationFrame(this.handleToAnimation);
            //start timer and check for click and spacebar on the window
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.beginPath();
            this.ctx.rect(0, 0, this.canvas.width, this.canvas.height)
            this.ctx.fillStyle = "pink";
            this.ctx.fill();
            this.ctx.closePath();

            this.ctx.fillStyle = "black";
            this.ctx.font = "30px Arial";
            this.ctx.textAlign = "center"
            this.ctx.fillText("Too early!", this.canvas.width/2, this.canvas.height/2 - 50); 
            this.startTime = 0;
            this.cTime = 0;
            this.countDownStarted = false;
            console.log("redrawn button");
            drawButton(startButton, "#00BFFF");
        }
    }

    this.stopAnimation = function ()    {
        window.cancelAnimationFrame(this.handleToAnimation);
        this.startTime = 0;
        this.cTime = 0;
        this.countDownStarted = false;
        console.log("redrawn button");
        drawButton(startButton, "#00BFFF");
    }
}

//----------------utility standalone functions------------------
function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

document.addEventListener('keydown', spaceHit);
document.addEventListener("mousemove", updateMousePosition, true);
document.addEventListener("mousedown", mouseClicked, false);
document.addEventListener("mouseup", mouseUp, false);

function spaceHit (event) {
        if (event.code === 'Space') {
            console.log('Space pressed')
            if (game.startTime  > 0) {
                game.stopAnimation();
            } else  {
                //cancel updateReactionTimer and show error screen to the evil pigs who want to cheat
                game.cheaterPig();
            }
        }
}

let mouseX = 264;
let mouseY = 240;
let mouseRelease = false;
function updateMousePosition(event)   {
    mouseX = event.clientX - game.canvas.offsetLeft;
    mouseY = event.clientY - game.canvas.offsetTop;
    if (game.countDownStarted === false) {
        if (mouseX < startButton.x + startButton.width && mouseX > startButton.x && mouseY > startButton.y && mouseY < startButton.y + startButton.height) {
            drawButton(startButton, "#1E90FF");
        } else{
            drawButton(startButton, "#00BFFF");
        }
    }

    // game.ctx.clearRect(0, 20, 110, 50);
    // game.ctx.fillText(mouseX+":"+mouseY, 50, 50);
}

function mouseUp(event)  {
    if (game.countDownStarted === false) {
        if (mouseRelease === false)  {
            if (mouseX < startButton.x + startButton.width && mouseX > startButton.x && mouseY > startButton.y && mouseY < startButton.y + startButton.height) {
                console.log("Button pressed");
                game.isCancelled = false;
                game.startCountdown();
            } 
        }
    }
    mouseRelease = false;
}

function mouseClicked(event) {
    console.log("mouse clicked")

    if (game.countDownStarted === true) {
        if (game.startTime  > 0) {
            game.stopAnimation();
            mouseRelease = true;
        } else  {
            //cancel updateReactionTimer and show error screen to the evil pigs who want to cheat
            game.cheaterPig();
            mouseRelease = true;
        }
    }
}

function drawButton(type, color)   {
    game.ctx.beginPath();
    game.ctx.clearRect(type.x, type.y, type.width, type.height)
    game.ctx.rect(type.x, type.y, type.width, type.height);
    game.ctx.fillStyle = color;
    game.ctx.fill();
    game.ctx.closePath();
    game.ctx.font = "30px Arial";
    game.ctx.textAlign = "center";
    game.ctx.fillStyle = "black";
    game.ctx.fillText("CLICK!!!", type.x + type.width/2, type.y + type.height/2 + 10);

 
} 


    

//------------MAIN-----------------
let game = new Game();
game.start();

//--------Button-----------------
// I want a button that starts the countdown
function Button(x, y, width, height)    {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
}


var startButton = new Button(150, 200, 160, 80);
drawButton(startButton, "#00BFFF");

