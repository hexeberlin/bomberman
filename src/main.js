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
var playersImg = new Image();
playersImg.src = "images/players.png";
var crop1 = {
    up: [72, 21],
    down: [72, 45],
    left: [19, 44],
    right: [122, 48]
}
var crop2 = {
    up: {x: 227, y: 21},
    down: {x: 227, y: 45},
    left: {x: 174, y: 44},
    right: {x: 277, y:48}
}
var maxTimePerLevel = 12000;
var myGame = new GameArea();
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
  //update player position
  myPlayer1.update();
  myPlayer2.update();
  //update timer
  myGame.updateTimer();
}

function drawEverything() {
  //redraw the map, bombs and the player
  myGame.drawMap();
  myBombs.forEach(element => {
    element.draw();
  });
  myPlayer1.draw();
  myPlayer2.draw();
}

function animation() {
  // end the game if the time is over
  if (myGame.frame === maxTimePerLevel) {
    endGame("time");
    return;
  }
  // end the game if the player died
  else if (myPlayer1.alive === 0 && myPlayer2.alive === 0) {
    endGame("dead");
    return;
  }
  // end the game if the player won
  else if (intersectRect(myPlayer1,myGame.door) || intersectRect(myPlayer2,myGame.door)) {
    endGame("win");
    return;
  } else { //if the game continues, continue the animation
    updateEverything();
    drawEverything();
    myAnimation = window.requestAnimationFrame(animation);
  }
}

function startGame() {
  // re-set game and player properties, empty bombs arrat
  myGame.start();
  myPlayer1 = new Player(p1Position.left, p1Position.right, p1Position.top, p1Position.down);
  myPlayer2 = new Player(p2Position.left, p2Position.right, p2Position.top, p2Position.down);
  myBombs = [];
  // draw the map and the player
  myGame.drawMap();
  myPlayer1.draw();
  myPlayer2.draw();
  // print instructions
  document.getElementById("whatToDo").innerText = "Find the hidden portal before the time is over!"
  // start the animation
  animation();
}

// end game if something happens
function endGame(reason) {
  //stop the animation
  window.cancelAnimationFrame(myAnimation);
  //print a message according to the reason why the game stopped
  myGame.ctx.textAlign = "center";
  myGame.ctx.fillStyle = "red";
  myGame.ctx.font = "bold 50px Arial";
  switch (reason) {
    case "time":
        myGame.ctx.fillText("TIME IS OVER", myGame.canvas.width / 2, myGame.canvas.width / 2);
        myGame.ctx.font = "30px Arial";
        myGame.ctx.fillText("PRESS ENTER TO TRY AGAIN", myGame.canvas.width / 2, myGame.canvas.width / 2 + 200);
      break;
    case "dead":
        myGame.ctx.fillText("YOU DIED", myGame.canvas.width / 2, myGame.canvas.width / 2);
        myGame.ctx.font = "30px Arial";
        myGame.ctx.fillText("PRESS ENTER TO TRY AGAIN", myGame.canvas.width / 2, myGame.canvas.width / 2 + 200);
      break;
    case "win":
        myGame.ctx.fillText("YOU WIN!", myGame.canvas.width / 2, myGame.canvas.width / 2);
        myGame.ctx.font = "30px Arial";
        myGame.ctx.fillText("PRESS ENTER TO DO IT AGAIN", myGame.canvas.width / 2, myGame.canvas.width / 2 + 200);
      break;
  }
}

window.onload = function() {
    //start by showing the intro screen
    myGame.intro();
    document.onkeydown = function(event) {
        event.preventDefault();
        switch (event.keyCode) {
            //move player1 with arrows
            case 37: //left arrow
            case 38: //up arrow
            case 39: //right arrow
            case 40: //down arrow
                myPlayer1.move(event.keyCode);
                break;
            //move player2 with WSAD
            case 65: //A
            case 87: //W
            case 68: //D
            case 83: //S
                myPlayer2.move(event.keyCode);
                break;
            //place bomb with player1 using space
            case 32:
                myPlayer1.placeBomb();
                break;
            //place bomb with player1 using space
            case 16:
                myPlayer2.placeBomb();
                break;
            //start game on Enter
            case 13:
                startGame();
                break;
        }
  };
}; 
