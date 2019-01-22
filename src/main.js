var myGame = new GameArea();
var myPlayer = new Player("Bob");
var myBombs = [];

function updateEverything() {
  myGame.clear();
  //check if there are any bombs which should explode
  myBombs.forEach(element => {
    element.explode();
    });
  //recalculate wall sides after explosions
  myGame.wallSides();
  //keep counting
  myGame.frame ++;
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
  updateEverything();
  drawEverything();
  window.requestAnimationFrame(animation);
}

function startGame() {
  myGame.start();
  myGame.drawMap();
  myGame.wallSides();
  myPlayer.draw();
  animation();
}

// starting the game immediately (will be changed later when there is a start button)
window.onload = function() {
  startGame();
};

// moving player with arrows
document.onkeydown = function(event) {
  event.preventDefault();
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
        })) switch(event.keyCode) {
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
