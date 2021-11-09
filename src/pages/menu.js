import MovingElTitle from "/src/pages/movingElTitle.js";
import { GAME_WIDHT, GAME_HEIGHT } from "/src/pages/constant.js";
import MenuElement from "./MenuElement";
import AudioPlayer from "./AudioPlayer";

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
    this.checkBoxsize = 60;

    //AUDIO
    this.audioPlayer = new AudioPlayer();

    //const check = new MenuCheckbox([...params])
    //this.beispiel = new MenuElement(..., check)

    //ALL MENUOBJECTS
    this.titleHeader = new MenuElement("Hyperpong", 90, 80, "yellow");
    this.titleHeaderShader = new MenuElement("Hyperpong", 93, 84, "black");

    this.pause = new MenuElement("Paused", GAME_HEIGHT / 2);

    //mainTitle
    const start = new MenuElement("Start", 230);
    const settings = new MenuElement("Settings", 340);
    const manual = new MenuElement("Manual", 450);
    this.movingElTitle = new MovingElTitle();

    //Start
    const characterBlue = new MenuElement("RED", 230, null, "red");
    const characterRed = new MenuElement("BLUE", 340, null, "blue");
    const characterYellow = new MenuElement("YELLOW", 450, null, "yellow");
    const characterOrange = new MenuElement("GREEN", 560, null, "green");
    const backStart = new MenuElement("Back", 650);

    //Settings
    const music = new MenuElement("Music", 320);
    const sound = new MenuElement("Sound", 430);
    const backSettings = new MenuElement("Back", 540);

    //MANUAL
    const backManual = new MenuElement("Back", 650);

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
      this.gamestate !== GAMESTATE.RUNNING &&
      this.gamestate !== GAMESTATE.PAUSED
    ) {
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
      this.movingElTitle.draw(ctx);
    }
    //START
    if (this.gamestate == GAMESTATE.START) {
    }
    //SETTINGS
    if (this.gamestate == GAMESTATE.MENU_SETTINGS) {
      ctx.beginPath();
      ctx.fillStyle = "orange";
      this.checkBoxsize = 60;

      if (this.currentCursorpositionP1 == 0) {
        this.checkBoxsize = 60;
        ctx.fillRect(
          GAME_WIDHT / 2 + GAME_WIDHT / 5 - 50 - 2,
          260,
          this.checkBoxsize,
          this.checkBoxsize
        ); //big music
        ctx.moveTo(GAME_WIDHT / 2 + GAME_WIDHT / 5 - 50 - 2, 260);
        ctx.lineTo(
          GAME_WIDHT / 2 + GAME_WIDHT / 5 - 50 - 2 + this.checkBoxsize,
          260 + this.checkBoxsize
        );
        ctx.moveTo(
          GAME_WIDHT / 2 + GAME_WIDHT / 5 - 50 - 2 + this.checkBoxsize,
          260
        );
        ctx.lineTo(
          GAME_WIDHT / 2 + GAME_WIDHT / 5 - 50 - 2,
          260 + this.checkBoxsize
        );
      } else {
        this.checkBoxsize = 55;
        ctx.fillRect(
          GAME_WIDHT / 2 + GAME_WIDHT / 5 - 50,
          265,
          this.checkBoxsize,
          this.checkBoxsize
        ); //small music

        ctx.moveTo(GAME_WIDHT / 2 + GAME_WIDHT / 5 - 50, 265);
        ctx.lineTo(
          GAME_WIDHT / 2 + GAME_WIDHT / 5 - 50 + this.checkBoxsize,
          265 + this.checkBoxsize
        );
        ctx.moveTo(
          GAME_WIDHT / 2 + GAME_WIDHT / 5 - 50 + this.checkBoxsize,
          265
        );
        ctx.lineTo(
          GAME_WIDHT / 2 + GAME_WIDHT / 5 - 50,
          265 + this.checkBoxsize
        );
      }
      if (this.currentCursorpositionP1 == 1) {
        this.checkBoxsize = 60;
        ctx.fillRect(GAME_WIDHT / 2 + GAME_WIDHT / 5 - 50 - 2, 365, 60, 60); //big sound
        ctx.moveTo(GAME_WIDHT / 2 + GAME_WIDHT / 5 - 50 - 2, 365);
        ctx.lineTo(
          GAME_WIDHT / 2 + GAME_WIDHT / 5 - 50 - 2 + this.checkBoxsize,
          365 + this.checkBoxsize
        );
        ctx.moveTo(
          GAME_WIDHT / 2 + GAME_WIDHT / 5 - 50 - 2 + this.checkBoxsize,
          365
        );
        ctx.lineTo(
          GAME_WIDHT / 2 + GAME_WIDHT / 5 - 50 - 2,
          365 + this.checkBoxsize
        );
      } else {
        this.checkBoxsize = 55;
        ctx.fillRect(
          GAME_WIDHT / 2 + GAME_WIDHT / 5 - 50,
          370,
          this.checkBoxsize,
          this.checkBoxsize
        ); //small sound
        ctx.moveTo(GAME_WIDHT / 2 + GAME_WIDHT / 5 - 50, 370);
        ctx.lineTo(
          GAME_WIDHT / 2 + GAME_WIDHT / 5 - 50 + this.checkBoxsize,
          370 + this.checkBoxsize
        );
        ctx.moveTo(
          GAME_WIDHT / 2 + GAME_WIDHT / 5 - 50 + this.checkBoxsize,
          370
        );
        ctx.lineTo(
          GAME_WIDHT / 2 + GAME_WIDHT / 5 - 50,
          370 + this.checkBoxsize
        );
      }
      ctx.stroke();
    }
  }

  update() {
    if (this.gamestate == GAMESTATE.MENU_TITLE) {
      this.movingElTitle.update();
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
      } else {
        this.currentCursorpositionP1 = 0;
      }
    }
    if (eventKey == "s") {
      if (
        this.currentCursorpositionP2 <
        this.menuObjects[this.gamestate].length - 1
      ) {
        this.currentCursorpositionP2 += 1;
      } else {
        this.currentCursorpositionP2 = 0;
      }
    }
    this.paintMenuColors();
  }
  curCursorPositionDown(eventKey) {
    if (eventKey == "ArrowUp") {
      if (this.currentCursorpositionP1 > 0) {
        this.currentCursorpositionP1 -= 1;
      } else {
        this.currentCursorpositionP1 =
          this.menuObjects[this.gamestate].length - 1;
      }
    }
    if (eventKey == "w") {
      if (this.currentCursorpositionP2 > 0) {
        this.currentCursorpositionP2 -= 1;
      } else {
        this.currentCursorpositionP2 =
          this.menuObjects[this.gamestate].length - 1;
      }
    }
    this.paintMenuColors();
    console.log("PRESSED: Arrow UP or W");
    //go down with the cursorposition  --> MOVE UP in menu
  }
  paintMenuColors() {
    //first paint all white , normal size
    for (let i = 0; i < this.menuObjects[this.gamestate].length; i++) {
      this.menuObjects[this.gamestate][i].pickedStateColor = false;
      this.menuObjects[this.gamestate][i].pickedStatePl1 = false;
      this.menuObjects[this.gamestate][i].pickedStatePl2 = false;
      this.menuObjects[this.gamestate][i].pxSize = "60";
    }
    if (this.gamestate !== GAMESTATE.START) {
      //then current Menupoint paint yellow and bigger size
      //POSITION PL1
      this.menuObjects[this.gamestate][
        this.currentCursorpositionP1
      ].pickedStateColor = true;
      this.menuObjects[this.gamestate][this.currentCursorpositionP1].pxSize =
        "65";
    } else {
      //POSITION PL1
      this.menuObjects[this.gamestate][
        this.currentCursorpositionP1
      ].pickedStatePl1 = true;
      this.menuObjects[this.gamestate][this.currentCursorpositionP1].pxSize =
        "65";
      //POSITION PL2
      this.menuObjects[this.gamestate][
        this.currentCursorpositionP2
      ].pickedStatePl2 = true;

      this.menuObjects[this.gamestate][this.currentCursorpositionP1].pxSize =
        "65";
      this.menuObjects[this.gamestate][this.currentCursorpositionP2].pxSize =
        "65";
    }
  }
  changeGamestate() {
    //look at the last Element in each list
    if (
      this.gamestate !== "menuTitle" &&
      this.currentCursorpositionP1 ==
        this.menuObjects[this.gamestate].length - 1
    ) {
      //VIEW CLOSE
      //take and set  next-to-last gamestate
      this.gamestate = this.menuPath[this.menuPath.length - 2];
      //delete the last view
      this.menuPath.pop();
      console.log("DELETED:" + this.menuPath);
    } else {
      //not for music and sound // and not for red yellow.. etc
      if (
        this.gamestate !== GAMESTATE.MENU_SETTINGS &&
        this.gamestate !== GAMESTATE.START
      ) {
        this.gamestate =
          this.menuObjects[this.gamestate][this.currentCursorpositionP1].sName;
        this.menuPath.push(this.gamestate);
        console.log("ADDED:" + this.menuPath);
      }
      if (this.gamestate == GAMESTATE.MENU_SETTINGS) {
        this.changeCheckedState();
      }
    }
    //take the first one again
    this.resetCursorPosition();
  }

  changeCheckedState() {}

  resetCursorPosition() {
    //take the first one again
    this.currentCursorpositionP1 = 0;
    this.currentCursorpositionP2 = 0;
    this.paintMenuColors();
    console.log("View changed" + this.currentCursorpositionP1);
  }
}
