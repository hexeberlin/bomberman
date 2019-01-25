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
    left: 55,
    right: 100,
    top: 50,
    down: 100
}
var p2Position = {
    left: 655,
    right: 700,
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
  else if (myGame.numOfPlayer === 1 &&intersectRect(myPlayer1,myGame.door)){
    endGame("win");
    return;
  }
  else if (myGame.numOfPlayer === 2 &&intersectRect(myPlayer1,myGame.door)){
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
  document.getElementById("whatToDo").innerHTML = "Stay away from the <b>bombs</b> and find the hidden <b>portal</b> before the <b>time</b> is over!"
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
  myGame.ctx.globalAlpha = 0.5;
  myGame.ctx.fillStyle = "black";
  myGame.ctx.fillRect(100, 300, 550, 300);
  myGame.ctx.globalAlpha = 1;
  myGame.ctx.textAlign = "center";
  myGame.ctx.fillStyle = "red";
  myGame.ctx.font = "bold 50px Arial";
  switch (reason) {
    case "time":
        alert.play();
        myGame.ctx.fillText("TIME IS OVER", myGame.canvas.width / 2, myGame.canvas.width / 2);
        break;
    case "dead":
        myGame.ctx.fillText("YOU DIED", myGame.canvas.width / 2, myGame.canvas.width / 2);
        break;
    case "win":
        wow.play();
        myGame.ctx.fillText("YOU WIN!", myGame.canvas.width / 2, myGame.canvas.width / 2);
        break;
    case "winP1":
        wow.play();
        myGame.ctx.fillText("PLAYER ONE WINS!", myGame.canvas.width / 2, myGame.canvas.width / 2);
        break;
    case "winP2":
        wow.play();
        myGame.ctx.fillText("PLAYER TWO WINS!", myGame.canvas.width / 2, myGame.canvas.width / 2);
        break;
  }
  myGame.ctx.font = "bold 30px Arial";
  myGame.ctx.fillStyle = "white";
  myGame.ctx.fillText("PRESS 1 TO START A SINGLE GAME",myGame.canvas.width/2,500);     
  myGame.ctx.fillText("PRESS 2 TO START A DOUBLE GAME",myGame.canvas.width/2,550);
  
}
var keysActions = {
  left: {
    state: false,
    action(){myPlayer1.move("left")}
  },
  right: {
    state: false,
    action(){myPlayer1.move("right")}
  },
  down: {
    state: false,
    action(){myPlayer1.move("down")}
  },
  up: {
    state: false,
    action(){myPlayer1.move("up")}
  },
  space: {
    state: false,
    action(){myPlayer1.placeBomb()}
  },
  W: {
    state: false,
    action(){myPlayer2.move("up")}
  },
  D: {
    state: false,
    action(){myPlayer2.move("right")}
  },
  S: {
    state: false,
    action(){myPlayer2.move("down")}
  },
  A: {
    state: false,
    action(){myPlayer2.move("left")}
  },
  shift: {
    state: false,
    action(){ myPlayer2.placeBomb()}
  }
}
window.onload = function() {
    myGame.intro();
    //define key actions depending on the state of the game
    document.onkeydown = function(event) {
        event.preventDefault();
        //change status of the pressed key in the keysAction object
        if(myGame.gameStarted === 1 && myPlayer1.alive === 1){
          switch (event.keyCode) {
            case 37: //left arrow
              keysActions.left.state = true; break;
            case 38: //up arrow
              keysActions.up.state = true; break;
            case 39: //right arrow
              keysActions.right.state = true; break;
            case 40: //down arrow
              keysActions.down.state = true; break;
            case 32: //space
              keysActions.space.state = true; break;
          }
        }
        if(myGame.gameStarted === 1 && myGame.numOfPlayer === 2 && myPlayer2.alive === 1){
          switch (event.keyCode) {
            //move player2 with WSAD
            case 65: //A
              keysActions.A.state = true; break;
            case 87: //W
              keysActions.W.state = true; break;
            case 68: //D
              keysActions.D.state = true; break;
            case 83: //S
              keysActions.S.state = true; break;
            case 16: //shift
              keysActions.shift.state = true; break;
          }
        }
        switch(event.keyCode){
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
        switch (event.keyCode) {
          case 37: //left arrow
          case 38: //up arrow
          case 39: //right arrow
          case 40: //down arrow
          case 32: //space
          case 65: //A
          case 87: //W
          case 68: //D
          case 83: //S
          case 16: //shift
          for (var key in keysActions){
            if (keysActions.hasOwnProperty(key)){
              if (keysActions[key].state === true){
                keysActions[key].action();
              }
            }
          }
        }
  };
  document.onkeyup = function(){
    switch (event.keyCode) {
      case 37: //left arrow
        keysActions.left.state = false; break;
      case 38: //up arrow
        keysActions.up.state = false; break;
      case 39: //right arrow
        keysActions.right.state = false; break;
      case 40: //down arrow
        keysActions.down.state = false; break;
      case 32: //space
        keysActions.space.state = false; break;
      case 65: //A
        keysActions.A.state = false; break;
      case 87: //W
        keysActions.W.state = false; break;
      case 68: //D
        keysActions.D.state = false; break;
      case 83: //S
        keysActions.S.state = false; break;
      case 16: //shift
        keysActions.shift.state = false; break;
    }
  };
}; 
