import { GAME_WIDHT, GAME_HEIGHT } from "/src/pages/constant.js";
import Racket from "/src/pages/Racket.js";
import Ball from "/src/pages/Ball.js";
import InputHandler from "/src/pages/Input.js";
import Score from "/src/pages/Score.js";

export default class Game {
  constructor() {
    //ALL GAMEOBJECTS
    this.score = new Score();

    const racketL = new Racket("l");
    const racketR = new Racket("r");

    const ball = new Ball(
      racketL,
      racketR,
      this.score.scoreL,
      this.score.scoreR
    );

    this.gameObjects = {
      racketL: racketL,
      racketR: racketR,
      ball: ball
      //scoreL: this.scoreL,
      //scoreR: this.scoreR
    };
  }
  draw(ctx) {
    for (const obj of Object.values(this.gameObjects)) {
      obj.draw(ctx);
    }
  }

  update() {
    for (const obj of Object.values(this.gameObjects)) {
      obj.update();
    }
  }
}
