var myGame = new GameArea();
var myPlayer = new Player("Bob");

function updateEverything() {
  myGame.clear();
  myPlayer.update();
}

function drawEverything() {
  myGame.drawMap();
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

// starting the game immediately
window.onload = function() {
  startGame();
};

// moving player with arrows
document.onkeydown = function(event) {
  event.preventDefault();
  var newPosition = {};
  newPosition.left = myPlayer.left;
  newPosition.right = myPlayer.right;
  newPosition.top = myPlayer.top;
  newPosition.down = myPlayer.down;
  switch (event.keyCode) {
    case 37:
      newPosition.left -= 5;
      break;
    case 38:
      newPosition.top -= 5;
      break;
    case 39:
      newPosition.right += 5;
      break;
    case 40:
      newPosition.down += 5;
      break;
  }
    if (myGame.boundaries.some(wall => {
          return intersectRect(newPosition, wall);
        })
      ) {
        console.log('there is a wall')  
        // myPlayer.stop();
      } else {
          switch(event.keyCode) {
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
        }
    }
};
// document.onkeyup = function() {
//   myPlayer.stop();
// };
