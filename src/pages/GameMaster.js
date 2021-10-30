import { GAME_WIDHT, GAME_HEIGHT } from "/src/pages/constant.js";
import Racket from "/src/pages/Racket.js";
import Ball from "/src/pages/Ball.js";
import InputHandler from "/src/pages/Input.js";
import Menu from "/src/pages/Menu.js";
import MenuCanvasEl from "/src/pages/MenuCanvasEl.js";
import Score from "/src/pages/Score.js";

const GAMESTATE = {
  MENU: 0,
  INGAME: 1
};
export default class GameMaster {
  constructor(ctx) {
    this.gamestate = GAMESTATE.MENU;

    //ALL GAMEOBJECTS
    this.menu = new Menu();
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
    };

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
      this.score.draw(ctx);
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

  //einen Färben  oder alle richtig färben wenn ein nach unten geht
  paintMenupoint() {
    //die farbe von dem alten und dem neuen ändern
  }
}
