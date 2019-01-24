class Player {
  constructor(left, right, top, down, img, crop) {
    this.left = left;
    this.right = right;
    this.top = top;
    this.down = down;
    this.direction = "down"; //default starting direction
    this.playersImg = img;
    this.crop = crop;
    this.alive = 1; //player is alive by default
    this.speed = initialSpeed;
    this.bombSound = new Audio("sounds/bombplaced.mp3")
  }
  draw() {
    if(this.alive === 1){
        this.ctx = myGame.ctx;
        // set the position of the icon in the payersImg depending on direction
        var cropX;
        var cropY;
        switch (this.direction) {
        case "up":
            cropX = this.crop.up[0];
            cropY = this.crop.up[1];
            break;
        case "down":
            cropX = this.crop.down[0];
            cropY = this.crop.down[1];
            break;
        case "left":
            cropX = this.crop.left[0];
            cropY = this.crop.left[1];
            break;
        case "right":
            cropX = this.crop.right[0];
            cropY = this.crop.right[1];
            break;
        }
        this.ctx.drawImage(this.playersImg,
        cropX, cropY,
        15, 24, //size of the icon
        this.left, this.top, //where should the player be placed
        15 * (50 / 24), 50 //how big it should be: 50 height and width accordingly scaled
        );
    }
  }
  move(keyCode) {
    //calculate the potential new position
    var newPosition = {};
    newPosition.left = this.left;
    newPosition.right = this.right;
    newPosition.top = this.top;
    newPosition.down = this.down;
    switch (keyCode) {
      case 37:
      case 65:
        newPosition.left -= this.speed;
        break;
      case 38:
      case 87:
        newPosition.top -= this.speed;
        break;
      case 39:
      case 68:
        newPosition.right += this.speed;
        break;
      case 40:
      case 83:
        newPosition.down += this.speed;
        break;
    }
    // move to new position if there is no wall
    if (!myGame.boundaries.some(wall => {
        return intersectRect(newPosition, wall);
    }))
    switch (keyCode) {
        case 37:
        case 65:
            this.left -= this.speed;
            this.direction = "left";
            break;
        case 38:
        case 87:
            this.top -= this.speed;
            this.direction = "up";
            break;
        case 39:
        case 68:
            this.left += this.speed;
            this.direction = "right";
            break;
        case 40:
        case 83:
            this.top += this.speed;
            this.direction = "down";
            break;
    }
  }
  // update all sides
  update() {
    this.right = this.left + 15 * (50 / 23);
    this.down = this.top + 50;
  }
  // place bomb in the cell where most of players icon is in
  placeBomb() {
    var bombX = Math.round(this.left / 50);
    var bombY = Math.round(this.top / 50);
    for (var i = 0; i < myBombs.length; i++){
      if(myBombs[i === [bombX, bombY]]){
        return;
      }
    } 
    myBombs.push(new Bomb([bombX, bombY]));
    this.bombSound.play();
    //add the bomb to the grid to be considered as a boundary
    setTimeout(function(){myGame.grid[bombX][bombY] = "B"},1500);
  }
}
