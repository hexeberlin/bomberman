var initialMap = [[1,1,1,1,1,1,1,1,1,1,1,1,1],
                [1,0,0,2,2,0,2,2,2,0,0,0,1],
                [1,0,1,2,1,2,1,0,1,2,1,0,1],
                [1,2,2,0,2,2,2,2,2,0,2,2,1],
                [1,2,1,2,1,2,1,0,1,2,1,2,1],
                [1,2,2,0,2,2,2,0,2,2,2,2,1],
                [1,2,1,2,1,2,1,2,1,2,1,2,1],
                [1,2,2,2,2,2,0,2,2,2,2,2,1],
                [1,2,1,2,1,2,1,0,1,2,1,2,1],
                [1,2,2,2,2,0,2,0,2,2,2,2,1],
                [1,2,1,2,1,2,1,2,1,0,1,2,1],
                [1,2,0,2,0,2,0,2,0,0,2,2,1],
                [1,0,1,2,1,2,1,2,1,2,1,0,1],
                [1,0,0,2,0,2,0,2,2,0,0,0,1],
                [1,1,1,1,1,1,1,1,1,1,1,1,1]];
var initialSpeed = 10;
// default starting positions
var p1Position = {
    left: 50 + (15 * (50 / 24)) / 4,
    right: 50 + (15 * (50 / 24)) * 1.25,
    top: 50,
    down: 100
}
var p2Position = {
    left: 650 + (15 * (50 / 24)) / 4,
    right: 650 + (15 * (50 / 24)) * 1.25,
    top: 550,
    down: 600
}
// image with player icons
var playersImg = new Image();
playersImg.src = "images/players.png";
//where to find each player in the stripe
var crop1 = {
    up: [72, 21],
    down: [72, 45],
    left: [19, 44],
    right: [122, 48]
}
var crop2 = {
    up: [227, 21],
    down: [227, 45],
    left: [174, 44],
    right: [277, 48]
}
var maxTimePerLevel = 12000;
var myGame = new GameArea(1);
var myPlayer1 = new Player(p1Position.left, p1Position.right, p1Position.top, p1Position.down, playersImg, crop1);
var myPlayer2 = new Player(p2Position.left, p2Position.right, p2Position.top, p2Position.down, playersImg, crop2);
var myBombs = [];
var myAnimation;


function updateEverything() {
  //clear canvas
  myGame.clear();
  //check if there are any bombs which should explode
  myBombs.forEach(element => {
    element.explode();
  });
  //recalculate wall sides after explosions
  myGame.wallSides();
  //keep counting
  myGame.frame++;
  //update timer
  myGame.updateTimer();
  //update player position
  myPlayer1.update();
  if(myGame.numOfPlayer === 2) myPlayer2.update();
}

function drawEverything() {
  //redraw the map, bombs and the player
  myGame.drawMap();
  myBombs.forEach(element => {
    element.draw();
  });
  myPlayer1.draw();
  if(myGame.numOfPlayer === 2) myPlayer2.draw();
}

function animation() {
  // end the game if the time is over
  if (myGame.frame === maxTimePerLevel) {
    endGame("time");
    return;
  }
  // end the game if the player died
  else if ((myGame.numOfPlayer === 1 && myPlayer1.alive === 0) ||
  (myGame.numOfPlayer === 2 && myPlayer1.alive === 0 && myPlayer2.alive === 0)) {
    endGame("dead");
    return;
  }
  // end the game if one of the players won
  else if (intersectRect(myPlayer1,myGame.door)){
    endGame("winP1");
    return;
  } else if (myGame.numOfPlayer === 2 && intersectRect(myPlayer2,myGame.door)){
    endGame("winP2");
    return;
  } else { //if the game continues, continue the animation
    updateEverything();
    drawEverything();
    myAnimation = window.requestAnimationFrame(animation);
  }
}

function startGame(num) {
  //stop intro music
  document.getElementById("introSound").pause();
  myGame.numOfPlayer = num;
  // re-set game and player properties, empty bombs arrat
  if (num === 2) {myGame.numOfPlayer = 2};
  myGame.start();
  myPlayer1 = new Player(p1Position.left, p1Position.right, p1Position.top, p1Position.down, playersImg, crop1);
  if (myGame.numOfPlayer === 2) {
    myPlayer2 = new Player(p2Position.left, p2Position.right, p2Position.top, p2Position.down, playersImg, crop2);
  }
  myBombs = [];
  // draw the map and the player
  myGame.drawMap();
  myPlayer1.draw();
  if (myGame.numOfPlayer === 2) {
    myPlayer2.draw();
  }
  // print instructions
  document.getElementById("whatToDo").innerText = "Find the hidden portal before the time is over!"
  if(myGame.numOfPlayer === 2){
    document.getElementById("instructions").innerText = "Player 1: ARROWS and SPACE <-----------------------------------------------> Player 2: WSAD and SHIFT"
  }
  // start the animation
  animation();
}

// end game if something happens
function endGame(reason) {
  myGame.gameStarted = 0;
  //stop the animation
  window.cancelAnimationFrame(myAnimation);
  //print a message and play a sound according to the reason why the game stopped
  var alert = new Audio("sounds/alert.mp3");
  var wow = new Audio("sounds/wow.mp3")
  myGame.ctx.textAlign = "center";
  myGame.ctx.fillStyle = "red";
  myGame.ctx.font = "bold 50px Arial";
  switch (reason) {
    case "time":
        alert.play();
        myGame.ctx.fillText("TIME IS OVER", myGame.canvas.width / 2, myGame.canvas.width / 2);
        myGame.ctx.font = "bold 30px Arial";
        myGame.ctx.fillText("PRESS 1 TO START A SINGLE GAME",myGame.canvas.width/2,500);     
        myGame.ctx.fillText("PRESS 2 TO START A DOUBLE GAME",myGame.canvas.width/2,550);
        break;
    case "dead":
        myGame.ctx.fillText("YOU DIED", myGame.canvas.width / 2, myGame.canvas.width / 2);
        myGame.ctx.font = "bold 30px Arial";
        myGame.ctx.fillText("PRESS 1 TO START A SINGLE GAME",myGame.canvas.width/2,500);     
        myGame.ctx.fillText("PRESS 2 TO START A DOUBLE GAME",myGame.canvas.width/2,550);
        break;
    case "winP1":
        wow.play();
        myGame.ctx.fillText("PLAYER ONE WINS!", myGame.canvas.width / 2, myGame.canvas.width / 2);
        myGame.ctx.font = "bold 30px Arial";
        myGame.ctx.fillText("PRESS 1 TO START A SINGLE GAME",myGame.canvas.width/2,500);     
        myGame.ctx.fillText("PRESS 2 TO START A DOUBLE GAME",myGame.canvas.width/2,550);
        break;
    case "winP2":
        wow.play();
        myGame.ctx.fillText("PLAYER TWO WINS!", myGame.canvas.width / 2, myGame.canvas.width / 2);
        myGame.ctx.font = "bold 30px Arial";
        myGame.ctx.fillText("PRESS 1 TO START A SINGLE GAME",myGame.canvas.width/2,500);     
        myGame.ctx.fillText("PRESS 2 TO START A DOUBLE GAME",myGame.canvas.width/2,550);
        break;
  }
}
window.onload = function() {
    //play intro music
    document.getElementById("introSound").play()
    //start by showing the intro screen
    myGame.intro();
    //define key actions depending on the state of the game
    document.onkeydown = function(event) {
        event.preventDefault();
        switch (event.keyCode) {
            //move player1 with arrows
            case 37: //left arrow
            case 38: //up arrow
            case 39: //right arrow
            case 40: //down arrow
                if(myGame.gameStarted === 1 && myPlayer1.alive === 1)
                myPlayer1.move(event.keyCode);
                break;
            //move player2 with WSAD
            case 65: //A
            case 87: //W
            case 68: //D
            case 83: //S
                if(myGame.gameStarted === 1 && myGame.numOfPlayer === 2 && myPlayer2.alive === 1)
                myPlayer2.move(event.keyCode);
                break;
            //place bomb with player1 using space
            case 32:
                if(myGame.gameStarted === 1 && myPlayer1.alive === 1)
                myPlayer1.placeBomb();
                break;
            //place bomb with player2 using shift
            case 16:
                if(myGame.gameStarted === 1 && myGame.numOfPlayer === 2 && myPlayer2.alive === 1)
                myPlayer2.placeBomb();
                break;
            //start single game by pressing 1
            case 49:
                if(myGame.gameStarted === 0)
                startGame(1);
                break;
            //start double game by pressing 2
            case 50:
                if(myGame.gameStarted === 0)
                startGame(2);
                break;
        }
  };
}; 
