import { GAME_WIDHT, GAME_HEIGHT } from "/src/pages/constant.js";
import MenuCanvasEl from "/src/pages/MenuCanvasEl.js";
const GAMESTATE = {
  PAUSED: 0,
  RUNNING: "running",
  MENU_TITLE: "menuTitle",
  START: "Start",
  MENU_SETTINGS: "Settings",
  MENU_MANUAL: "Manual",
  GAMEOVER: 5
};

export default class Menu {
  constructor() {
    this.gamestate = GAMESTATE.MENU_TITLE;
    this.currentCursorposition = 0;

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
      Start: [
        characterBlue,
        characterRed,
        characterYellow,
        characterOrange,
        backStart
      ],
      Settings: [music, sound, backSettings],
      Manual: [backManual]
    };

    this.menuPath = [this.gamestate];
    this.paintMenuColors();
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
      this.titleHeader.draw(ctx);
    }

    for (let i = 0; i < this.menuObjects[this.gamestate].length; i++) {
      this.menuObjects[this.gamestate][i].draw(ctx);
    }

    //PAUSED
    if (this.gamestate == GAMESTATE.PAUSED) {
      ctx.rect(0, 0, GAME_WIDHT, GAME_HEIGHT);
      ctx.fillStyle = "#000000AA";
      ctx.fill();

      //paused
      this.pause.draw(ctx);
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

  curCursorPositionUp() {
    //go up with the  cursorposition --> MOVE DOWN in menu
    if (
      this.currentCursorposition <
      this.menuObjects[this.gamestate].length - 1
    ) {
      this.currentCursorposition += 1;
      this.paintMenuColors();
    } else {
      this.currentCursorposition = 0;
      this.paintMenuColors();
    }
  }
  curCursorPositionDown() {
    console.log("PRESSED: W");
    //go down with the cursorposition  --> MOVE UP in menu
    if (this.currentCursorposition > 0) {
      this.currentCursorposition -= 1;
      this.paintMenuColors();
    } else {
      this.currentCursorposition = this.menuObjects[this.gamestate].length - 1;
      this.paintMenuColors();
    }
  }
  paintMenuColors() {
    //first paint all white , normal size
    for (let i = 0; i < this.menuObjects[this.gamestate].length; i++) {
      this.menuObjects[this.gamestate][i].picedState = false;
      this.menuObjects[this.gamestate][i].pxSize = "60";
    }
    //then current Menupoint paint red and bigger size
    this.menuObjects[this.gamestate][
      this.currentCursorposition
    ].picedState = true;
    this.menuObjects[this.gamestate][this.currentCursorposition].pxSize = "65";
  }
  changeGamestate() {
    //look at the last Element in each list
    if (
      this.gamestate != "menuTitle" &&
      this.currentCursorposition == this.menuObjects[this.gamestate].length - 1
    ) {
      //VIEW CLOSE
      console.log(this.currentCursorposition);
      //take and set  next-to-last gamestate
      this.gamestate = this.menuPath[this.menuPath.length - 2];
      //delete the last view
      this.menuPath.pop();
      console.log("DELETED:" + this.menuPath);
    } else {
      //VIEW OPEN
      this.gamestate =
        this.menuObjects[this.gamestate][this.currentCursorposition].sName;
      this.menuPath.push(this.gamestate);
      console.log("ADDED:" + this.menuPath);
    }
    //take the first one again
    this.currentCursorposition = 0;
    this.paintMenuColors();
    console.log("View gewechselt" + this.currentCursorposition);
  }
}
