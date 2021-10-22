export default class Racket {
  constructor(gameWidht, gameHeight, location) {
    this.gameHeight = gameHeight;

    this.width = 20;
    this.height = 100;

    this.speed = 0;
    this.maxSpeed = 10;

    switch (location) {
      case "l":
        this.position = {
          x: gameWidht - gameWidht + 40,
          y: gameHeight / 2 - this.height / 2
        };
        break;
      case "r":
        this.position = {
          x: gameWidht - this.width - 40,
          y: gameHeight / 2 - this.height / 2
        };
        break;
      default:
        alert("Keine Location angegeben L/R etc.");
        break;
    }
  }

  moveUp() {
    this.speed = -this.maxSpeed;
  }

  moveDown() {
    this.speed = this.maxSpeed;
  }
  stop() {
    //reduces shuttering while swichting direction
    this.speed = 0;
  }

  draw(ctx) {
    ctx.fillStyle = "#ff0";
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update(deltaTime) {
    this.position.y += this.speed;

    if (this.position.y < 0) this.position.y = 0;
    if (this.position.y + this.height > this.gameHeight)
      this.position.y = this.gameHeight - this.height;
  }
}
