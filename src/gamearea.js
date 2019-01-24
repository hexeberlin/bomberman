class GameArea {
    constructor(numOfPlayers){
        // canvas related properties
        this.canvas = document.createElement('canvas');
        this.canvas.width = 15*50;
        this.canvas.height = 13*50;
        this.ctx = this.canvas.getContext('2d');
        // game map related properties
        this.wallsImg = new Image();
        this.wallsImg.src = 'images/backgrounds.png';
        this.grid = copyArray(initialMap);
        this.boundaries = [];
        this.door = {
            left: 0,
            right: 0,
            top: 0,
            down: 0
        };
        // basic game properties
        this.frame = 0;
        this.gameStarted = 0;
        this.gameWon = 0;
        this.introSound = new Audio('sounds/intro.mp3');
        this.numOfPlayer = numOfPlayers;
    }
    intro(){
        this.introSound.play();
        document.querySelector('#game-board').appendChild(this.canvas);
        this.ctx.fillStyle = 'black';
        this.ctx.fillRect(0,0,this.canvas.width,this.canvas.height);
        this.ctx.textAlign = "center";
        this.ctx.fillStyle = "white";
        this.ctx.strokeStyle = 'darkred';
        this.ctx.lineWidth = 3;
        this.ctx.font = "bold 100px Times";
        this.ctx.fillText("BOMBERMAN",this.canvas.width/2,200);
        this.ctx.strokeText("BOMBERMAN",this.canvas.width/2,200);
        //for some reason it's not loading the image, will find out later
        // this.ctx.drawImage(this.introImg, 300, 400, 200, 200);
        this.ctx.font = "bold 20px Arial";
        this.ctx.fillStyle = "lightblue";
        this.ctx.fillText("PRESS 1 TO START A SINGLE GAME",this.canvas.width/2,500);
        this.ctx.fillStyle = "lightgreen";
        this.ctx.fillText("PRESS 2 TO START A DOUBLE GAME",this.canvas.width/2,550);
    }
    start(){
        //stop the music and set play properties to default values
        this.gameStarted = 1;
        this.introSound.pause();
        document.querySelector('#game-board').appendChild(this.canvas);
        this.grid = copyArray(initialMap);
        this.frame = 0;
        this.gameWon = 0;
        //place the door behind a random brick wall
        var brickWalls = [];
        //save coordinates of all brick walls
        for (var i=0; i<this.grid.length; i++){
            for (var j=0; j<this.grid[i].length; j++){
                if (this.grid[i][j] === 2) brickWalls.push([i, j]);
            }
        }
        //pick one wall randomly and place the door behind it
        var randomWall = brickWalls[Math.floor(Math.random()*brickWalls.length)]
        var randomWall0 = randomWall[0]
        var randomWall1 = randomWall[1]
        this.grid[randomWall0][randomWall1] = "D";
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
        var xCrop; var yCrop;
        for (var i=0; i<this.grid.length; i++){
            for (var j=0; j<this.grid[i].length; j++){
                switch(this.grid[i][j]){
                    case 0: //green field
                        xCrop = 51;
                        yCrop = 15;
                        break;
                    case 1: // solid walls
                        xCrop = 17;
                        yCrop = 14;
                        break;
                    case 2: case "D": //brick wall and hidden door
                        xCrop = 0;
                        yCrop = 14;
                        break;
                    case "F": //found door
                        xCrop = 86;
                        yCrop = 14;
                        break;
                    case "E": //explosion
                        xCrop = 102;
                        yCrop = 133;
                        break;
                }
                this.ctx.drawImage(this.wallsImg, 
                    xCrop,yCrop, //position in the sprite
                    15,15, //size in the sprite
                    50*i,50*j, //position on the  canvas
                    50, 50) //size on the canvas
            }
        }
    }
    //calculate all the boundaries
    wallSides(){
        this.boundaries = [];
        for (var i=0; i<this.grid.length; i++){
            for (var j=0; j<this.grid[i].length; j++){
                if(this.grid[i][j] === 1 || this.grid[i][j] === 2){
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
        + ('0' + parseInt((maxTimePerLevel-this.frame)/6000)).slice(-2) + ":" //minutes
        + ('0' + parseInt(((maxTimePerLevel-this.frame)/100)%60)).slice(-2) + ":" //seconds
        + ('0' + ((maxTimePerLevel-this.frame)%100)).slice(-2); //mlseconds
    }
}