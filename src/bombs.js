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
    }
    draw(){
        this.ctx.drawImage(myGame.wallsImg, 
            17,48,
            15,15,
            50*this.position[0], 50*this.position[1],
            50,50);
    }
    explode(){
        //let the bomb explode after 600 ms
        if(myGame.frame - this.startingTime === 200 && myBombs.length > 0){
            //destroy all 2's (brick walls) which the bomb power can reach
            var bRow = this.position[0];
            var bCol = this.position[1];
            var rows = myGame.map.length;
            var cols = myGame.map[0].length;
            for(var row = 0; row < rows; row ++){
                for(var col = 0; col < cols; col++){
                    if((Math.abs(row - bRow) <= this.power && col === bCol)
                    || (Math.abs(col - bCol) <= this.power && row === bRow)) {
                        if(myGame.map[row][col] === 2){
                            myGame.map[row][col] = 0;
                        } else if (myGame.map[row][col] === "D") {
                            myGame.map[row][col] = "F" //found the door
                        }
                    }
                }
            }
            this.sound.play();
            //bomb should kill player if he is too close
            if((((Math.abs(myPlayer.left-this.right) < 50 ||
                Math.abs(myPlayer.right-this.left) < 50) &&
                myPlayer.top === this.top) ||
                (Math.abs(myPlayer.top-this.down) < 50 ||
                Math.abs(myPlayer.down-this.top) < 50)) &&
                Math.abs(myPlayer.left-this.left) <25){
                    myPlayer.alive = 0;
                }
            //remove the exploded bomb from myBombs array
            myBombs.shift();
        }
    }
}