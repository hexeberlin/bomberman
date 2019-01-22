class Player {
  constructor(name) {
    this.name = name;
    this.left = 50 + (15 * (50 / 23)) / 4; //default starting position
    this.top = 50;
    this.down = this.top + 50;
    this.right = this.left + 15 * (50 / 23);
    this.speed = 5;
    this.playersImg = new Image();
    this.playersImg.src = "images/players.png";
    this.alive = 1; //player is alive by default
  }
  draw() {
    this.ctx = myGame.ctx;
    this.ctx.drawImage(
      this.playersImg,
      72, 47, //position of the first player icon
      15, 23, //size of the first player icon
      this.left, this.top, //where should the player be placed
      15 * (50 / 23), 50 //how big it should be: 50 height and width accordingly scaled
    ); 
  }
  moveLeft() {
    this.left -= this.speed;
  }
  moveRight() {
    this.left += this.speed; 
  }
  moveDown() {
      this.top += this.speed;
  }
  moveUp() {
      this.top -= this.speed;
  }
  update() {
    this.right = this.left + 15 * (50 / 23);
    this.down = this.top + 50;
  }
  placeBomb() { //place bomb in the cell where most of players icon is in
    myBombs.push(new Bomb([Math.round(this.left/50),Math.round(this.top/50)]));
  }
}
