import { GAME_WIDHT, GAME_HEIGHT } from "/src/pages/constant.js";
const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU_TITLE: 2,
  MENU_SETTINGS: 3,
  MENU_MANUAL: 4,
  GAMEOVER: 5
};

export default class Menu {
  constructor() {
    this.gamestate = GAMESTATE.MENU_TITLE;
  }

  draw(ctx) {
    //TITLE HEADER and BACKGROUND

    if (
      this.gamestate != GAMESTATE.RUNNING &&
      this.gamestate != GAMESTATE.PAUSED
    ) {
      ctx.rect(0, 0, GAME_WIDHT, GAME_HEIGHT);
      ctx.fillStyle = "#000000AA";
      ctx.fill();

      //Title
      ctx.font = "80px PressStart2P";
      ctx.fillStyle = "Yellow";
      ctx.textAlign = "center";
      ctx.fillText("Hyperpong", GAME_WIDHT / 2, 90);
    }

    //PAUSED
    if (this.gamestate == GAMESTATE.PAUSED) {
      ctx.rect(0, 0, GAME_WIDHT, GAME_HEIGHT);
      ctx.fillStyle = "#000000AA";
      ctx.fill();

      //paused
      ctx.font = "60px PressStart2P";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", GAME_WIDHT / 2, GAME_HEIGHT / 2);
    }

    //MAIN MENU

    if (this.gamestate == GAMESTATE.MENU_TITLE) {
      //Start Settings Manual
      ctx.font = "60px PressStart2P";
      ctx.fillStyle = "white";

      ctx.fillText("Start", GAME_WIDHT / 2, 320);
      ctx.fillText("Settings", GAME_WIDHT / 2, 430);
      ctx.fillText("Manual", GAME_WIDHT / 2, 550);
    }

    //IN-GAME
    if (this.gamestate == GAMESTATE.RUNNING) {
      ctx.font = "40px PressStart2P";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      // Score Plates l & r
      ctx.fillText(this.scoreL, GAME_WIDHT / 4, GAME_HEIGHT / 8);
      ctx.fillText(this.scoreR, (GAME_WIDHT / 4) * 3, GAME_HEIGHT / 8);
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
}
