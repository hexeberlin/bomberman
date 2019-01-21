var myGame = new GameArea();
var myPlayer = new Player('Bob');

function startGame(){
    myGame.drawMap();
    myGame.start();
    myPlayer.draw();
}

// starting the game immediately
window.onload = function(){
        startGame();
};

// moving player with arrows
document.onkeydown = function(event){
    event.preventDefault();
    switch(event.keyCode){
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
};
document.onkeyup = function(){
    myPlayer.stop();
};
