import Racket from "./Racket";
import Ball from "./ball";
import InputHandler from "./input";

export default class Game {
  constructor() {}
  start() {
    const ball = new Ball(this);

    const racketL = new Racket();
    const racketR = new Racket();
    const rackets = [racketL, racketR];
    new InputHandler(rackets);
  }

  draw() {}

  update() {}
}
