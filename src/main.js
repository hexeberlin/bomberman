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
var maxTimePerLevel = 12000;
var myGame = new GameArea();
var myPlayer = new Player("Bob");
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
  myPlayer.update();
  //update timer
  myGame.updateTimer();
}

function drawEverything() {
  //redraw the map, bombs and the player
  myGame.drawMap();
  myBombs.forEach(element => {
    element.draw();
  });
  myPlayer.draw();
}

function animation() {
  // end the game if the time is over
  if (myGame.frame === maxTimePerLevel) {
    endGame("time");
    return;
  }
  // end the game if the player died
  else if (myPlayer.alive === 0) {
    endGame("dead");
    return;
  }
  // end the game if the player won
  else if (intersectRect(myPlayer,myGame.door)) {
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
  myPlayer.start();
  myBombs = [];
  // draw the map and the player
  myGame.drawMap();
  myPlayer.draw();
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
        //move player with the arrows and prevent running through walls
        //save current player position
        var newPosition = {};
        newPosition.left = myPlayer.left;
        newPosition.right = myPlayer.right;
        newPosition.top = myPlayer.top;
        newPosition.down = myPlayer.down;
        //calculate the potential new position
        switch (event.keyCode) {
        case 37:
            newPosition.left -= myPlayer.speed;
            break;
        case 38:
            newPosition.top -= myPlayer.speed;
            break;
        case 39:
            newPosition.right += myPlayer.speed;
            break;
        case 40:
            newPosition.down += myPlayer.speed;
            break;
        }
        // move to new position if there is no wall
        if (!myGame.boundaries.some(wall => {
            return intersectRect(newPosition, wall);
        }))
        switch (event.keyCode) {
            case 37:
                myPlayer.moveLeft();
                break;
            case 38:
                myPlayer.moveUp();
                break;
            case 39:
                myPlayer.moveRight();
                break;
            case 40:
                myPlayer.moveDown();
                break;
            //place bomb using space
            case 32:
                myPlayer.placeBomb();
                break;
            //start game on Enter
            case 13:
                startGame();
                break;
        }
  };
}; 
