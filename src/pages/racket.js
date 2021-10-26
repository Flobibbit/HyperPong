export default class Racket {
  constructor(game, location) {
    this.gameHeight = game.gameHeight;

    this.width = 20;
    this.height = 100;

    this.speed = 0;
    this.maxSpeed = 10;

    switch (location) {
      case "l":
        this.position = {
          x: game.gameWidht - game.gameWidht + 40,
          y: game.gameHeight / 2 - this.height / 2
        };
        break;
      case "r":
        this.position = {
          x: game.gameWidht - this.width - 40,
          y: game.gameHeight / 2 - this.height / 2
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
  update() {
    this.position.y += this.speed;

    //Border control
    if (this.position.y < 0) this.position.y = 0;
    if (this.position.y + this.height > this.gameHeight)
      this.position.y = this.gameHeight - this.height;
  }
}
