import Racket from "/src/pages/Racket.js";
import Ball from "/src/pages/ball.js";
import InputHandler from "/src/pages/input.js";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU_TITLE: 2,
  MENU_CONTROLS: 3,
  GAMEOVER: 4
};
export default class Game {
  constructor(gameWidht, gameHeight) {
    this.gameWidht = gameWidht;
    this.gameHeight = gameHeight;
  }
  start() {
    //ALL GAMEOBJECTS
    this.ball = new Ball(this);

    this.racketL = new Racket(this, "l");
    this.racketR = new Racket(this, "r");
    this.rackets = [this.racketL, this.racketR];

    //LIST for one time draw/update of each OBJ
    this.gameObjects = [this.racketL, this.racketR, this.ball];
    new InputHandler(this.rackets);
  }

  draw(ctx) {
    for (const obj of this.gameObjects) {
      obj.draw(ctx);
    }
  }

  update(deltatime) {
    for (const obj of this.gameObjects) {
      obj.update(deltatime);
    }
  }
}
