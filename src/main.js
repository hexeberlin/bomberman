var myGame = new GameArea();
var myPlayer = new Player("Bob");
var myBombs = [];
var myAnimation;

function updateEverything() {
  myGame.clear();
  //check if there are any bombs which should explode
  myBombs.forEach(element => {
    element.explode();
  });
  //recalculate wall sides after explosions
  myGame.wallSides();
  //keep counting
  myGame.frame++;
  myPlayer.update();
  myGame.updateTimer();
}

function drawEverything() {
  myGame.drawMap();
  myBombs.forEach(element => {
    element.draw();
  });
  myPlayer.draw();
}

function animation() {
  if (myGame.frame === 12000) {
    endGame("time");
    return;
  }
  if (myPlayer.alive === 0) {
    endGame("dead");
    return;
  }
  updateEverything();
  drawEverything();
  myAnimation = window.requestAnimationFrame(animation);
}

function startGame() {
  myGame.start();
  myGame.drawMap();
  myGame.wallSides();
  myPlayer.draw();
  animation();
}

// end game if something happens
function endGame(reason) {
  window.cancelAnimationFrame(myAnimation);
  myGame.ctx.textAlign = "center";
  myGame.ctx.fillStyle = "red";
  myGame.ctx.font = "bold 50px Arial";
  switch (reason) {
    case "time":
      myGame.ctx.fillText(
        "TIME IS OVER",
        myGame.canvas.width / 2,
        myGame.canvas.width / 2
      );
      break;
    case "dead":
      myGame.ctx.fillText(
        "YOU DIED",
        myGame.canvas.width / 2,
        myGame.canvas.width / 2
      );
      break;
  }
}

window.onload = function() {
    myGame.intro();
    document.onkeydown = function(event) {
    event.preventDefault();
    //start game on Enter
    if (event.keyCode === 13){
        startGame();
    }
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
      })
    )
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
      }
  };
};
