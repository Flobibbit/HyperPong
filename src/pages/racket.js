import { GAME_WIDTH, GAME_HEIGHT } from "/src/pages/constant.js";
export default class Racket {
  constructor(location, color = "#ff0") {
    this.color = color;

    this.width = 20;
    this.height = 100;

    this.speed = 0;
    this.maxSpeed = 10;

    switch (location) {
      case "l":
        this.position = {
          x: 40,
          y: GAME_HEIGHT / 2 - this.height / 2
        };
        break;
      case "r":
        this.position = {
          x: GAME_WIDTH - this.width - 40,
          y: GAME_HEIGHT / 2 - this.height / 2
        };
        break;
      default:
        alert("No location passed  L/R etc.");
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
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
  }
  update() {
    this.position.y += this.speed;

    //Border control
    if (this.position.y < 0) this.position.y = 0;
    if (this.position.y + this.height > GAME_HEIGHT)
      this.position.y = GAME_HEIGHT - this.height;
  }
}
