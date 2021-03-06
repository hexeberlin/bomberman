class Bomb {
    constructor(position){
        this.position = position;
        this.startingTime = myGame.frame;
        this.power = 1;
        this.ctx = myGame.ctx;
        this.left = 50*this.position[0];
        this.right = 50*this.position[0] + 50;
        this.top = 50*this.position[1];
        this.down = 50*this.position[1] + 50;
        this.sound = new Audio('sounds/bomb.mp3');
        this.found = new Audio('sounds/whoopie.mp3');
    }
    draw(){
        this.ctx.drawImage(myGame.wallsImg, 
            0,48,
            15,15,
            50*this.position[0], 50*this.position[1],
            50,50);
    }
    explode(){
        //let the bomb explode after 600 ms
        if(myGame.frame - this.startingTime >= 200 && myBombs.length > 0){
            //destroy all 2's (brick walls) which the bomb power can reach
            var bRow = this.position[0];
            var bCol = this.position[1];
            var rows = myGame.grid.length;
            var cols = myGame.grid[0].length;
            myGame.grid[bRow][bCol] = "E"; //show explosion first
            setTimeout(()=>{myGame.grid[bRow][bCol] = 0;}, 500);
            for(let row = 0; row < rows; row ++){
                for(let col = 0; col < cols; col++){
                    if((Math.abs(row - bRow) <= this.power && col === bCol)
                    || (Math.abs(col - bCol) <= this.power && row === bRow)) {
                        if(myGame.grid[row][col] === 0){ 
                            myGame.grid[row][col] = "E"; //show explosion first
                            setTimeout(()=>{myGame.grid[row][col] = 0;}, 500)
                        } else if(myGame.grid[row][col] === 2){
                            myGame.grid[row][col] = "E"; //show explosion first
                            setTimeout(()=>{myGame.grid[row][col] = 0;}, 500);
                        } else if (myGame.grid[row][col] === "D") {
                            myGame.grid[row][col] = "E"; //show explosion first
                            setTimeout(()=>{
                                myGame.grid[row][col] = "F";
                                this.found.play();
                            }, 500); //found the door
                        }
                    }
                }
            }
            this.sound.play();
            //bomb should kill player if he is too close
            var deadSound = new Audio("sounds/uh_oh.mp3");
            if((((Math.abs(myPlayer1.left-this.right) < 50 ||
                Math.abs(myPlayer1.right-this.left) < 50) &&
                myPlayer1.top === this.top) ||
                ((Math.abs(myPlayer1.top-this.down) < 50 ||
                Math.abs(myPlayer1.down-this.top) < 50) &&
                Math.abs(myPlayer1.left-this.left) < 25))) {
                    deadSound.play();
                    myPlayer1.alive = 0;
                }
            if(myGame.numOfPlayer === 2 && 
                (((Math.abs(myPlayer2.left-this.right) < 50 ||
                Math.abs(myPlayer2.right-this.left) < 50) &&
                myPlayer2.top === this.top) ||
                ((Math.abs(myPlayer2.top-this.down) < 50 ||
                Math.abs(myPlayer2.down-this.top) < 50) &&
                Math.abs(myPlayer2.left-this.left) < 25))) {
                    deadSound.play();
                    myPlayer2.alive = 0;
                }
            //remove the exploded bomb from myBombs array
            myBombs.shift();
        }
    }
}