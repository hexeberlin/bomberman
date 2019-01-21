class Player {
    constructor(name){
        this.name = name;
        this.position = [1,1]; //default starting position
        this.speedX = 0;
        this.speedY = 0;
        this.left = (50-15*50/23)/2;
        this.top = this.position[0]*50;
        this.down = this.position[0]*50+50;
        this.right = 50+(50-15*50/23)/2;
        this.playersImg = new Image();
        this.playersImg.src = 'images/players.png';
    }
    draw(){
        this.ctx = myGame.ctx;
        this.ctx.drawImage(this.playersImg, 
            72,47, //position of the first player icon
            15,23, //size of the first player icon
            50*this.position[0]+(50-15*50/23)/2,50*this.position[1], //center it in the cell
            15*(50/23), 50) //how big it should be: 50 height and width accordingly scaled
    }
    moveLeft(){
        console.log(this.left)
        for (var i=0; i<myGame.boundaries.length; i++){
            if(!intersectRect(this, myGame.boundaries[i])){
                this.left = myGame.boundaries[i];
            }
            else {
                console.log('there is a wall')
                this.speedX = 0
            }
        }
    }
    moveRight(){
        this.speedX += 0.05;
    }
    moveDown(){
        this.speedY += 0.05;
    }
    moveUp(){
        this.speedY -= 0.05;
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