class Player {
  constructor(name) {
    this.name = name;
    this.left = 50 + (15 * (50 / 24)) / 4; //default starting position
    this.right = this.left + 15 * (50 / 24);
    this.top = 50;
    this.down = 100;
    this.direction = "down"; //default starting direction
    this.playersImg = new Image();
    this.playersImg.src = "images/players.png";
    this.alive = 1; //player is alive by default
    this.speed = initialSpeed;
  }
  draw() {
    this.ctx = myGame.ctx;
    // set the position of the icon in the payersImg depending on direction
    var cropX; var cropY;
    switch(this.direction) {
        case 'up':
            cropX = 72;
            cropY = 21;
            break;
        case 'down':
            cropX = 72;
            cropY = 45;
            break;
        case 'left':
            cropX = 19;
            cropY = 44;
            break;
        case 'right':
            cropX = 122;
            cropY = 48;
            break;
    }
    this.ctx.drawImage(this.playersImg,
            cropX, cropY,
            15, 24, //size of the icon
            this.left, this.top, //where should the player be placed
            15 * (50 / 24), 50 //how big it should be: 50 height and width accordingly scaled
            ); 
  }
  moveLeft() {
    this.left -= this.speed;
    this.direction = 'left';
  }
  moveRight() {
    this.left += this.speed; 
    this.direction = 'right';
  }
  moveDown() {
      this.top += this.speed;
      this.direction = 'down';
  }
  moveUp() {
      this.top -= this.speed;
      this.direction = 'up';
  }
  update() {
    this.right = this.left + 15 * (50 / 23);
    this.down = this.top + 50;
  }
  // place bomb in the cell where most of players icon is in
  placeBomb() { 
    myBombs.push(new Bomb([Math.round(this.left/50),Math.round(this.top/50)]));
  }
  // re-set all changable properties to default values
  start(){
    this.alive = 1;
    this.left = 50 + (15 * (50 / 24)) / 4; //default starting position
    this.right = this.left + 15 * (50 / 24);
    this.top = 50;
    this.down = 100;
    this.speed = initialSpeed;
  }
}
