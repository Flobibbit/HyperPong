import { GAME_WIDHT, GAME_HEIGHT } from "/src/pages/constant.js";
import MenuCanvasEl from "/src/pages/MenuCanvasEl.js";
const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU_TITLE: "menuTitle",
  START: "startScreen",
  MENU_SETTINGS: "settings",
  MENU_MANUAL: "manual",
  GAMEOVER: 5
};

export default class Menu {
  constructor() {
    this.gamestate = GAMESTATE.MENU_TITLE;

    //ALL MENUOBJECTS
    this.titleHeader = new MenuCanvasEl("Hyperpong", 90, 80, "yellow");
    this.pause = new MenuCanvasEl("Paused", GAME_HEIGHT / 2);

    const start = new MenuCanvasEl("Start", 320);
    const settings = new MenuCanvasEl("Settings", 430);
    const manual = new MenuCanvasEl("Manual", 540);

    const characterBlue = new MenuCanvasEl("BLUE", 320);
    const characterRed = new MenuCanvasEl("RED", 430);
    const characterYellow = new MenuCanvasEl("YELLOW", 540);
    const characterOrange = new MenuCanvasEl("ORANGE", 650);
    const backStart = new MenuCanvasEl("Back", 760);

    const music = new MenuCanvasEl("Music", 320);
    const sound = new MenuCanvasEl("Sound", 430);
    const backSettings = new MenuCanvasEl("Back", 540);

    const backManual = new MenuCanvasEl("Back", 650);

    this.menuObjects = {
      menuTitle: [start, settings, manual],
      startScreen: [
        characterBlue,
        characterRed,
        characterYellow,
        characterOrange,
        backStart
      ],
      settings: [music, sound, backSettings],
      manual: [backManual]
    };
    console.log(this.menuObjects);
  }

  draw(ctx) {
    for (let i = 0; i < this.menuObjects[this.gamestate].length; i++) {
      this.menuObjects[this.gamestate][i].draw(ctx);
    }
  

    //TITLE HEADER and BACKGROUND
    if (
      this.gamestate != GAMESTATE.RUNNING &&
      this.gamestate != GAMESTATE.PAUSED
    ) {
      ctx.rect(0, 0, GAME_WIDHT, GAME_HEIGHT);
      ctx.fillStyle = "#000000AA";
      ctx.fill();
      //Title
      this.titleHeader.draw(ctx);
    }

    //PAUSED
    if (this.gamestate == GAMESTATE.PAUSED) {
      ctx.rect(0, 0, GAME_WIDHT, GAME_HEIGHT);
      ctx.fillStyle = "#000000AA";
      ctx.fill();

      //paused
      this.pause.draw(ctx);
    }

    //MAIN MENU

    if (this.gamestate == GAMESTATE.MENU_TITLE) {
      //  for (let i = 0; i < this.menuObjects.menuTitle.length; i++) {
      //  this.menuObjects.menuTitle[i].draw(ctx);
      // }
      //Start Settings Manual
    }

    //IN-GAME
    if (this.gamestate == GAMESTATE.RUNNING) {
    }

    //SETTINGS
    if (this.gamestate == GAMESTATE.MENU_SETTINGS) {
      //Music Sounds Back
      ctx.font = "60px PressStart2P";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Music", GAME_WIDHT / 2, 320);
      ctx.fillText("Sounds", GAME_WIDHT / 2, 430);
      ctx.fillText("Back", GAME_WIDHT / 2, 540);
    }

    //MANUAL
    if (this.gamestate == GAMESTATE.MENU_MANUAL) {
      //Back
      ctx.font = "60px PressStart2P";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Back", GAME_WIDHT / 2, 540);
    }
  }

  update() {}

  togglePause() {
    if (this.gamestate == GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
  toggleMenuTitle() {}
  toggleSettings() {}
  changePicedState() {}
}
