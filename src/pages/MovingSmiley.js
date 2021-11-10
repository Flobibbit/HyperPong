import { GAME_WIDHT, GAME_HEIGHT } from "/src/pages/constant.js";
export default class MovingSmiley {
  constructor() {
    this.size = 130;
    this.borderDistance = 200;

    this.position = {
      x: GAME_WIDHT / 2 - this.size / 2,
      y: GAME_HEIGHT - GAME_HEIGHT / 4
    };

    this.speedX = 3;
    this.image = document.getElementById("img_PongSmiley");
  }
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }
  update() {
    this.position.x += this.speedX; //change Element position on x

    //Element Physics
    if (
      this.position.x >= GAME_WIDHT - this.borderDistance - this.size ||
      this.position.x <= this.borderDistance
    ) {
      this.speedX *= -1;
    }
  }
}
