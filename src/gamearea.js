class GameArea {
    constructor(){
        this.canvas = document.createElement('canvas');
        this.canvas.width = 15*50;
        this.canvas.height = 13*50;
        this.ctx = this.canvas.getContext('2d');
        this.wallsImg = new Image();
        this.wallsImg.src = 'images/backgrounds.png';
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
    }
    start(){
        document.querySelector('#game-board').appendChild(this.canvas);
    }
    drawMap(){
        for (var i=0; i<this.map.length; i++){
            for (var j=0; j<this.map[i].length; j++){
                switch(this.map[i][j]){
                    case 0: {
                        this.ctx.fillStyle = 'green';
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
}