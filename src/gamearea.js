class GameArea {
    constructor(){
        this.canvas = document.createElement('canvas');
        this.canvas.width = 15*50;
        this.canvas.height = 13*50;
        this.ctx = this.canvas.getContext('2d');
        this.wallsImg = new Image();
        this.wallsImg.src = 'images/backgrounds.png';
        //Define initial map, 0 = empty, 1 = solid wall, 2 = brick wall
        this.map = initialMap;
        this.boundaries = [];
        this.frame = 0;
        this.gameWon = 0;
        this.introSound = new Audio('sounds/intro.mp3');
        this.door = {
            left: 0,
            right: 0,
            top: 0,
            down: 0
        };
    }
    intro(){
        // this.introSound.play();
        document.querySelector('#game-board').appendChild(this.canvas);
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "white";
        this.ctx.strokeStyle = 'green';
        this.ctx.lineWidth = 2;
        this.ctx.font = "bold 100px Times";
        this.ctx.fillText("BOMBERMAN",this.canvas.width/2,200);
        this.ctx.strokeText("BOMBERMAN",this.canvas.width/2,200);
        this.ctx.font = "bold 20px Arial";
        this.ctx.fillText("PRESS ENTER TO START",this.canvas.width/2,500);
    }
    start(){
        this.introSound.pause();
        document.querySelector('#game-board').appendChild(this.canvas);
        this.map = initialMap;
        this.frame = 0;
        this.gameWon = 0;
        //place the door behind a random brick wall
        var brickWalls = [];
        //save coordinates of all brick walls
        for (var i=0; i<this.map.length; i++){
            for (var j=0; j<this.map[i].length; j++){
                if (this.map[i][j] === 2) brickWalls.push([i, j]);
            }
        }
        //pick one wall randomly and place the door behind it
        var randomWall = brickWalls[Math.floor(Math.random()*brickWalls.length)]
        var randomWall0 = randomWall[0]
        var randomWall1 = randomWall[1]
        this.map[randomWall0][randomWall1] = "D";
        //update door properties
        this.door.left = 50*randomWall0 + 20;
        this.door.right = this.door.left + 5;
        this.door.top = 50*randomWall1 + 20;
        this.door.down = this.door.top + 5;
    }
    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
    drawMap(){
        for (var i=0; i<this.map.length; i++){
            for (var j=0; j<this.map[i].length; j++){
                switch(this.map[i][j]){
                    case 0: {
                        this.ctx.fillStyle = '#009900';
                        this.ctx.fillRect(50*i,50*j,50,50);
                        break;
                    }
                    case 1: {
                        this.ctx.drawImage(this.wallsImg, 
                            17,14, //position of the solid wall icon
                            15,15, //size of the solid wall icon
                            50*i,50*j, //where the wall should be in my canvas
                            50, 50) //how big it should be
                        break;
                    }
                    case 2: case "D": {
                        this.ctx.drawImage(this.wallsImg, 
                            0,14, //position of the brick wall icon
                            15,15, //size of the brick wall icon
                            50*i,50*j, //where the wall should be in my canvas
                            50, 50) //how big it should be
                        break;
                    }
                    case "F": {
                        this.ctx.drawImage(this.wallsImg, 
                            86,14, //position of the brick wall icon
                            15,15, //size of the brick wall icon
                            50*i,50*j, //where the wall should be in my canvas
                            50, 50) //how big it should be
                        break;
                    }
                }
            }
        }
    }
    wallSides(){
        this.boundaries = [];
        for (var i=0; i<this.map.length; i++){
            for (var j=0; j<this.map[i].length; j++){
                if(this.map[i][j] === 1 || this.map[i][j] === 2){
                    this.boundaries.push({top: 50*j, 
                                        down: 50*j+50,
                                        left: 50*i,
                                        right: 50*i+50})
                }
            }
        }    
    }
    updateTimer(){
        document.getElementById('timer').innerText = "Time left: "
        + ('0' + parseInt((2-(myGame.frame/6000)))).slice(-2) + ":" //minutes
        + ('0' + parseInt((60-(myGame.frame/100))%60)).slice(-2) + ":" //seconds
        + ('0' + (2000-myGame.frame)%100).slice(-2); //mlseconds
    }
}