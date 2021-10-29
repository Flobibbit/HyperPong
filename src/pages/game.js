import { GAME_WIDHT, GAME_HEIGHT } from "/src/pages/constant.js";
import Racket from "/src/pages/Racket.js";
import Ball from "/src/pages/Ball.js";
import InputHandler from "/src/pages/Input.js";
import Menu from "/src/pages/Menu.js";
import MenuCanvasEl from "/src/pages/MenuCanvasEl.js";

const GAMESTATE = {
  MENU: 0,
  INGAME: 1
};
export default class Game {
  constructor(ctx) {
    this.ctx = ctx;

    this.gamestate = GAMESTATE.MENU;

    this.menu = new Menu();

    //ALL GAMEOBJECTS
    const racketL = new Racket("l");
    const racketR = new Racket("r");
    const ball = new Ball(this);

    //ALL MENUOBJECTS
    const start = new MenuCanvasEl(60, "Start");
    const settings = new MenuCanvasEl(60, "Settings");
    const manual = new MenuCanvasEl(60, "Manual");

    const characterBlue = new MenuCanvasEl(60, "BLUE");
    const characterRed = new MenuCanvasEl(60, "RED");
    const characterYellow = new MenuCanvasEl(60, "RED");
    const characterOrange = new MenuCanvasEl(60, "Orange");
    const backStart = new MenuCanvasEl(60, "Back");

    const music = new MenuCanvasEl(60, "Music");
    const sound = new MenuCanvasEl(60, "Sound");
    const backSettings = new MenuCanvasEl(60, "Back");

    const backManual = new MenuCanvasEl(60, "Back");

    this.gameObjects = {
      racketL: racketL,
      racketR: racketR,
      ball: ball
    };

    //will über den index auf die view zugreifen
    /*   this.menuObjects={
      menuTitle: [start,settings,manual],
      startScreen:[]
      settings :[music,sound,backSettings],
      manual :[backManual],

    };*/

    this.scoreL = 0;
    this.scoreR = 0;
    //Ingame
    new InputHandler(this);
    //Menu
  }
  start() {
    this.gamestate = GAMESTATE.INGAME;
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
      ctx.fillText(this.scoreL, GAME_HEIGHT / 4, GAME_WIDHT / 8);
      ctx.fillText(this.scoreR, (GAME_WIDHT / 4) * 3, GAME_HEIGHT / 8);
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
