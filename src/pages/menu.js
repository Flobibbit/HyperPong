const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU_TITLE: 2,
  MENU_SETTINGS: 3,
  MENU_MANUAL: 4,
  GAMEOVER: 5
};

export default class Menu {
  constructor(game) {
    this.gamestate = GAMESTATE.MENU_TITLE;

   
    this.gameHeight = game.gameHeight;
    this.gameWidht = game.gameWidht;
  }

  draw(ctx) {
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

  update() {}
}
