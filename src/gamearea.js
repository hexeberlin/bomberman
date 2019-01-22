class GameArea {
    constructor(){
        this.canvas = document.createElement('canvas');
        this.canvas.width = 15*50;
        this.canvas.height = 13*50;
        this.ctx = this.canvas.getContext('2d');
        this.wallsImg = new Image();
        this.wallsImg.src = 'images/backgrounds.png';
        //Define initial map, 0 = empty, 1 = solid wall, 2 = brick wall
        this.map = [[1,1,1,1,1,1,1,1,1,1,1,1,1],
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
                    [1,1,1,1,1,1,1,1,1,1,1,1,1]]
        this.boundaries = [];
        this.frame = 0;
    }
    start(){
        document.querySelector('#game-board').appendChild(this.canvas);
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
                    case 2: {
                        this.ctx.drawImage(this.wallsImg, 
                            0,14, //position of the brick wall icon
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
        document.getElementById('timer').innerText = "Time spent: "
        + ('0' + parseInt(myGame.frame/6000)).slice(-2) + ":" //minutes
        + ('0' + parseInt(myGame.frame/100)).slice(-2) + ":" //seconds
        + myGame.frame%100; //mlseconds
    }
}