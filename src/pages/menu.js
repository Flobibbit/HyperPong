import MovingElTitle from "/src/pages/movingElTitle.js";
import { GAME_WIDHT, GAME_HEIGHT } from "/src/pages/constant.js";
import MenuCanvasEl from "/src/pages/MenuCanvasEl.js";
import Triangle from "/src/pages/Triangle.js";
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
    this.currentCursorpositionP1 = 0;
    this.currentCursorpositionP2 = 0;

    //ALL MENUOBJECTS
    this.titleHeader = new MenuCanvasEl("Hyperpong", 90, 80, "yellow");
    this.titleHeaderShader = new MenuCanvasEl("Hyperpong", 93, 84, "black");

    this.pause = new MenuCanvasEl("Paused", GAME_HEIGHT / 2);

    //mainTitle
    const start = new MenuCanvasEl("Start", 230);
    const settings = new MenuCanvasEl("Settings", 340);
    const manual = new MenuCanvasEl("Manual", 450);
    this.movingELTitle = new MovingElTitle();

    //Start
    this.trianglePl1 = new Triangle();
    this.trianglePl2 = new Triangle();
    const characterBlue = new MenuCanvasEl("RED", 230, null, "red");
    const characterRed = new MenuCanvasEl("BLUE", 340, null, "blue");
    const characterYellow = new MenuCanvasEl("YELLOW", 450, null, "yellow");
    const characterOrange = new MenuCanvasEl("GREEN", 560, null, "green");
    const backStart = new MenuCanvasEl("Back", 650);

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
      // ctx.rect(0, 0, GAME_WIDHT, GAME_HEIGHT);
      //ctx.fillStyle = "#000000AA";
      ctx.fill();
      //Title and Shader
      this.titleHeaderShader.draw(ctx);
      this.titleHeader.draw(ctx);
      ctx.fillStyle = "#ff0";
      ctx.fillRect(0, 35, 250, 10);
      ctx.fillRect(GAME_WIDHT - 250, 35, GAME_WIDHT, 10);
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
    if (this.gamestate == GAMESTATE.MENU_TITLE) {
      this.movingELTitle.draw(ctx);
    }
    //START
    if (this.gamestate == GAMESTATE.START) {
      //this.trianglePl1.draw(ctx);
      //this.trianglePl1.draw(ctx);
    }
  }

  update() {
    if (this.gamestate == GAMESTATE.MENU_TITLE) {
      this.movingELTitle.update();
    }
  }

  togglePause() {
    if (this.gamestate == GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }
  toggleMenuTitle() {}

  curCursorPositionUp(eventKey) {
    //go up with the  cursorposition --> MOVE DOWN in menu
    if (eventKey == "ArrowDown") {
      if (
        this.currentCursorpositionP1 <
        this.menuObjects[this.gamestate].length - 1
      ) {
        this.currentCursorpositionP1 += 1;
        this.paintMenuColors();
      } else {
        this.currentCursorpositionP1 = 0;
        this.paintMenuColors();
      }
    }
    if (eventKey == "s") {
      if (
        this.currentCursorpositionP2 <
        this.menuObjects[this.gamestate].length - 1
      ) {
        this.currentCursorpositionP2 += 1;
        this.paintMenuColors();
      } else {
        this.currentCursorpositionP2 = 0;
        this.paintMenuColors();
      }
    }
  }
  curCursorPositionDown(eventKey) {
    if (eventKey == "ArrowUp") {
      if (this.currentCursorpositionP1 > 0) {
        this.currentCursorpositionP1 -= 1;
      } else {
        this.currentCursorpositionP1 =
          this.menuObjects[this.gamestate].length - 1;
      }
      this.paintMenuColors();
      return;
    }
    if (eventKey == "w") {
      if (this.currentCursorpositionP2 > 0) {
        this.currentCursorpositionP2 -= 1;
      } else {
        this.currentCursorpositionP2 =
          this.menuObjects[this.gamestate].length - 1;
      }
      this.paintMenuColors();
    }
    console.log("PRESSED: Arrow UP or W");
    //go down with the cursorposition  --> MOVE UP in menu
  }
  paintMenuColors() {
    //first paint all white , normal size
    for (let i = 0; i < this.menuObjects[this.gamestate].length; i++) {
      this.menuObjects[this.gamestate][i].picedStateColor = false;
      this.menuObjects[this.gamestate][i].picedStatePl1 = false;
      this.menuObjects[this.gamestate][i].picedStatePl2 = false;
      this.menuObjects[this.gamestate][i].pxSize = "60";
    }
    if (this.gamestate != GAMESTATE.START) {
      //then current Menupoint paint yellow and bigger size
      //POSITION PL1
      this.menuObjects[this.gamestate][
        this.currentCursorpositionP1
      ].picedStateColor = true;
      this.menuObjects[this.gamestate][this.currentCursorpositionP1].pxSize =
        "65";
    } else {
      //POSITION PL1
      this.menuObjects[this.gamestate][
        this.currentCursorpositionP1
      ].picedStatePl1 = true;
      this.menuObjects[this.gamestate][this.currentCursorpositionP1].pxSize =
        "65";
      //POSITION PL2
      this.menuObjects[this.gamestate][
        this.currentCursorpositionP2
      ].picedStatePl2 = true;

      this.menuObjects[this.gamestate][this.currentCursorpositionP1].pxSize =
        "65";
      this.menuObjects[this.gamestate][this.currentCursorpositionP2].pxSize =
        "65";
    }
  }
  changeGamestate() {
    //look at the last Element in each list
    if (
      this.gamestate != "menuTitle" &&
      this.currentCursorpositionP1 ==
        this.menuObjects[this.gamestate].length - 1
    ) {
      //VIEW CLOSE
      //take and set  next-to-last gamestate
      this.gamestate = this.menuPath[this.menuPath.length - 2];
      //delete the last view
      this.menuPath.pop();
      console.log("DELETED:" + this.menuPath);
      //take the first one again
      this.resetCursorPosition();
    } else {
      //not for music and sound // and not for red yellow.. etc
      if (this.gamestate != GAMESTATE.MENU_SETTINGS&&this.gamestate!=GAMESTATE.START) {
        this.gamestate =
          this.menuObjects[this.gamestate][this.currentCursorpositionP1].sName;
        this.menuPath.push(this.gamestate);
        console.log("ADDED:" + this.menuPath);
        this.resetCursorPosition();
      }
    }
  }
  resetCursorPosition() {
    //take the first one again
    this.currentCursorpositionP1 = 0;
    this.currentCursorpositionP2=0;
    this.paintMenuColors();
    console.log("View changed" + this.currentCursorpositionP1);
  }


  
}
