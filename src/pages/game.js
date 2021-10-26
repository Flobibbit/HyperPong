import Racket from "/src/pages/Racket.js";
import Ball from "/src/pages/ball.js";
import InputHandler from "/src/pages/input.js";
import Particle from "/src/pages/particle.js";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU_TITLE: 2,
  MENU_CONTROLS: 3,
  GAMEOVER: 4
};
export default class Game {
  constructor(gameWidht, gameHeight, ctx) {
    this.gameWidht = gameWidht;
    this.gameHeight = gameHeight;
    this.ctx = ctx;

    this.gamestate = GAMESTATE.RUNNING;

    //ALL GAMEOBJECTS
    const racketL = new Racket(this, "l");
    const racketR = new Racket(this, "r");
    const ball = new Ball(this, ctx);

    this.gameObjects = {
      racketL: racketL,
      racketR: racketR,
      ball: ball
    };
    this.scoreL = 0;
    this.scoreR = 0;
    new InputHandler(this, this.gameObjects.rackets);
  }
  start() {
    this.gamestate = GAMESTATE.RUNNING;
  }

  draw(ctx) {
    for (const obj of Object.values(this.gameObjects)) {
      obj.draw(ctx);
    }

    if (this.gamestate == GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidht, this.gameHeight);
      ctx.fillStyle = "#000000AA";
      ctx.fill();

      //Quit + Pause game screen
      ctx.font = "60px PressStart2P";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidht / 2, this.gameHeight / 2);
    }

    // Score Plates l & r
    ctx.font = "40px PressStart2P";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    ctx.fillText(this.scoreL, this.gameWidht / 4, this.gameHeight / 8);
    ctx.fillText(this.scoreR, (this.gameWidht / 4) * 3, this.gameHeight / 8);
  }

  update() {
    if (this.gamestate == GAMESTATE.PAUSED) {
      return;
    }

    for (const obj of Object.values(this.gameObjects)) {
      obj.update();
    }
  }

  togglePause() {
    if (this.gamestate == GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
}
