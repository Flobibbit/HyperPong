import Racket from "/src/pages/Racket.js";
import Ball from "/src/pages/ball.js";
import InputHandler from "/src/pages/input.js";
import Menu from "/src/pages/menu.js";

const GAMESTATE = {
  MENU: 0,
  INGAME: 1
};
export default class Game {
  constructor(gameWidht, gameHeight, ctx) {
    this.gameWidht = gameWidht;
    this.gameHeight = gameHeight;
    this.ctx = ctx;

    this.gamestate = GAMESTATE.MENU;

    this.menu = new Menu(this);
  
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
    //Ingame
    new InputHandler(this);
    //Menu
  }
  start() {
    this.gamestate = GAMESTATE.MENU;
  }

  draw(ctx) {
    //Ingame Elemente zeichnen

    if (this.gamestate == GAMESTATE.MENU) {
      //Das Menü zeichnen
      this.menu.draw(ctx);
    } else {
      //draw GAME-EL
      for (const obj of Object.values(this.gameObjects)) {
        obj.draw(ctx);
      }
      //Draw SCORE-plates
      ctx.font = "40px PressStart2P";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      // Score Plates l & r
      ctx.fillText(this.scoreL, this.gameWidht / 4, this.gameHeight / 8);
      ctx.fillText(this.scoreR, (this.gameWidht / 4) * 3, this.gameHeight / 8);
    }
  }

  update() {
    /* if (
      this.gamestate === GAMESTATE.PAUSED ||
      this.gamestate === GAMESTATE.MENU_TITLE||this.gamestate===GAMESTATE.MENU_SETTINGS||
    ) {
      return;
    }**/
    if (this.gamestate === GAMESTATE.INGAME)
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

  //einen Färben  oder alle richtig färben wenn ein nach unten geht
  paintMenupoint() {
    //die farbe von dem alten und dem neuen ändern
  }
}
