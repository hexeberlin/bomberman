class Player {
    constructor(name){
        this.name = name;
        this.position = [1,1]; //default starting position
        this.speedX = 0;
        this.speedY = 0;
        this.playersImg = new Image();
        this.playersImg.src = 'images/players.png';
    }
    draw(){
        this.ctx = myGame.ctx;
        this.ctx.drawImage(this.playersImg, 
            72,47, //position of the first player icon
            15,23, //size of the first player icon
            50*this.position[0] + (50-15*50/23)/2,50*this.position[1], //center it in the cell
            15*(50/23), 50) //how big it should be: 50 height and width accordingly scaled
    }
    moveLeft(){
        this.speedX -= 0.1;
    }
    moveRight(){
        this.speedX += 0.1;
    }
    moveDown(){
        this.speedY += 0.1;
    }
    moveUp(){
        this.speedY -= 0.1;
    }
    stop(){
        this.speedX = 0;
        this.speedY = 0;
    }
    update(){
        this.position[0] += this.speedX;
        this.position[1] += this.speedY;
    }
}