import Racket from "/src/pages/Racket.js";
import Ball from "/src/pages/Ball.js";
import InputHandler from "/src/pages/InputHandler.js";
import Score from "/src/pages/Score.js";

export default class Game {
  constructor() {
    //ALL GAMEOBJECTS
    this.score = new Score();

    const racketL = new Racket("l");
    const racketR = new Racket("r");

    const ball = new Ball(racketL, racketR, this.score);

    this.gameObjects = {
      racketL: racketL,
      racketR: racketR,
      ball: ball
    };
  }
  //capable of drawing all Objects in the gameObjects list
  draw(ctx) {
    for (const obj of Object.values(this.gameObjects)) {
      obj.draw(ctx);
    }
    this.score.draw(ctx);
  }

  update() {
    for (const obj of Object.values(this.gameObjects)) {
      obj.update();
    }
  }
}
