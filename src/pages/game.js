import Racket from "/src/pages/Racket.js";
import Ball from "/src/pages/Ball.js";
import InputHandler from "/src/pages/Input.js";
import Score from "/src/pages/Score.js";

export default class Game {
  constructor() {
    //ALL GAMEOBJECTS
    this.score = new Score();
    this.scoreL=new Score()
    this.scoreR=new Score();

    const racketL = new Racket("l");
    const racketR = new Racket("r");

    const ball = new Ball(
      racketL,
      racketR,
      this.score
    );

    this.gameObjects = {
      racketL: racketL,
      racketR: racketR,
      ball: ball
    };
  }
  draw(ctx) {
    for (const obj of Object.values(this.gameObjects)) {
      obj.draw(ctx);
    }
    //Scoreboards
    this.score.scoreL.draw(ctx);
    this.score.scoreR.draw(ctx);
  }

  update() {
    for (const obj of Object.values(this.gameObjects)) {
      obj.update();
    }
  }
}
