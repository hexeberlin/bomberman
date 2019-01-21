class Player {
  constructor(name) {
    this.name = name;
    // this.speedX = 0;
    // this.speedY = 0;
    this.left = 50 + (15 * (50 / 23)) / 4; //default starting position
    this.top = 50;
    this.down = this.top + 50;
    this.right = this.left + 15 * (50 / 23);
    this.playersImg = new Image();
    this.playersImg.src = "images/players.png";
  }
  draw() {
    this.ctx = myGame.ctx;
    this.ctx.drawImage(
      this.playersImg,
      72,
      47, //position of the first player icon
      15,
      23, //size of the first player icon
      this.left,
      this.top, //where should the player be placed
      15 * (50 / 23),
      50
    ); //how big it should be: 50 height and width accordingly scaled
  }
  moveLeft() {
    // this.speedX -= 0.3;
    this.left -= 5;
  }
  moveRight() {
    this.left += 5;
    // this.speedX += 0.3;
  }
  moveDown() {
      this.top +=5;
    // this.speedY += 0.3;
  }
  moveUp() {
      this.top -=5;
    // this.speedY -= 0.3;
  }
//   stop() {
//     this.speedX = 0;
//     this.speedY = 0;
//   }
  update() {
    // this.left += this.speedX;
    this.right = this.left + 15 * (50 / 23);
    // this.top += this.speedY;
    this.down = this.top + 50;
  }
}
