import Racket from "/src/pages/Racket.js";
import Ball from "/src/pages/ball.js";
import InputHandler from "/src/pages/input.js";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU_TITLE: 2,
  MENU_SETTINGS: 3,
  MENU_MANUAL: 4,
  GAMEOVER: 5
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
    this.gamestate = GAMESTATE.MENU_TITLE;
  }

  draw(ctx) {
    for (const obj of Object.values(this.gameObjects)) {
      obj.draw(ctx);
    }

    //TITLE HEADER and BACKGROUND
    if (
      this.gamestate != GAMESTATE.RUNNING &&
      this.gamestate != GAMESTATE.PAUSED
    ) {
      ctx.rect(0, 0, this.gameWidht, this.gameHeight);
      ctx.fillStyle = "#000000AA";
      ctx.fill();
      //Title
      ctx.font = "80px PressStart2P";
      ctx.fillStyle = "Yellow";
      ctx.textAlign = "center";
      ctx.fillText("Hyperpong", this.gameWidht / 2, 90);
    }

    //PAUSED
    if (this.gamestate == GAMESTATE.PAUSED) {
      ctx.rect(0, 0, this.gameWidht, this.gameHeight);
      ctx.fillStyle = "#000000AA";
      ctx.fill();

      //paused
      ctx.font = "60px PressStart2P";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidht / 2, this.gameHeight / 2);
    }

    //MAIN MENU
    if (this.gamestate == GAMESTATE.MENU_TITLE) {
      //Start Settings Manual
      ctx.font = "60px PressStart2P";
      ctx.fillStyle = "white";
      ctx.fillText("Start", this.gameWidht / 2, 320);
      ctx.fillText("Settings", this.gameWidht / 2, 430);
      ctx.fillText("Manual", this.gameWidht / 2, 550);
    }

    //IN-GAME
    if (this.gamestate == GAMESTATE.RUNNING) {
      ctx.font = "40px PressStart2P";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      // Score Plates l & r
      ctx.fillText(this.scoreL, this.gameWidht / 4, this.gameHeight / 8);
      ctx.fillText(this.scoreR, (this.gameWidht / 4) * 3, this.gameHeight / 8);
    }

    //SETTINGS
    if (this.gamestate == GAMESTATE.MENU_SETTINGS) {
      //Music Sounds Back
      ctx.font = "60px PressStart2P";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Music", this.gameWidht / 2, 320);
      ctx.fillText("Sounds", this.gameWidht / 2, 430);
      ctx.fillText("Back", this.gameWidht / 2, 540);
    }

    //MANUAL
    if (this.gamestate == GAMESTATE.MENU_MANUAL) {
      //Back
      ctx.font = "60px PressStart2P";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Back", this.gameWidht / 2, 540);
    }
  }

  update() {
    /* if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU_TITLE||this.gamestate===GAMESTATE.MENU_SETTINGS||
    ) {
      return;
    }**/
    if (this.gamestate === GAMESTATE.RUNNING)
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
