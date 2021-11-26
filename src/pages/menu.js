import MovingSmiley from "/src/pages/MovingSmiley.js";
import { GAME_WIDTH, GAME_HEIGHT } from "./constant.js";
import MenuElement from "./MenuElement.js";
import AudioPlayer from "./AudioPlayer.js";
import MenuCheckbox from "./MenuCheckbox.js";
import Game from "./game.js";

const GAMESTATE = {
  PAUSED: "Paused",
  INGAME: "Ingame",
  MENU_TITLE: "menuTitle",
  START: "Start",
  MENU_SETTINGS: "Settings",
  MENU_MANUAL: "Manual",
  GAMEOVER: "GameOver"
};

export default class Menu {
  constructor() {
    this.gamestate = GAMESTATE.MENU_TITLE;
    this.currentCursorpositionP1 = 0;
    this.currentCursorpositionP2 = 0;
    this.checkBoxsize = 60;
    this.timeStamp = 0;
    this.timePauseOn = 0;
    //GAME
    this.game = null;
    //AUDIO
    this.audioPlayer = new AudioPlayer();

    //ALL MENUOBJECTS
    this.titleHeader = new MenuElement({
      name: "Hyperpong",
      locationHeight: 80,
      pxSize: 70,
      color: "yellow"
    });

    this.titleHeaderShader = new MenuElement({
      name: "Hyperpong",
      locationHeight: 83,
      pxSize: 74,
      color: "black"
    });

    //mainTitle
    const start = new MenuElement({ name: "Start", locationHeight: 210 });
    const settings = new MenuElement({
      name: "Settings",
      locationHeight: 310
    });
    const manual = new MenuElement({ name: "Manual", locationHeight: 410 });
    this.movingSmiley = new MovingSmiley();

    //Start
    const characterBlue = new MenuElement({
      name: "RED",
      locationHeight: 185,
      color: "red",
      disableColorActive: true
    });
    console.log(characterBlue.pxSize);
    const characterRed = new MenuElement({
      name: "BLUE",
      locationHeight: 285,
      color: "blue",
      disableColorActive: true
    });
    const characterYellow = new MenuElement({
      name: "YELLOW",
      locationHeight: 385,
      color: "yellow",
      disableColorActive: true
    });
    const characterOrange = new MenuElement({
      name: "GREEN",
      locationHeight: 485,
      color: "green",
      disableColorActive: true
    });
    const backStart = new MenuElement({ name: "Back", locationHeight: 580 });

    //Settingss
    const checkBoxMusic = new MenuCheckbox();
    const checkBoxSound = new MenuCheckbox();

    const music = new MenuElement({
      name: "Music",
      locationHeight: 320,
      checkBox: checkBoxMusic
    });
    const sound = new MenuElement({
      name: "Sound",
      locationHeight: 430,
      checkBox: checkBoxSound
    });
    const backSettings = new MenuElement({
      name: "Back",
      locationHeight: 540
    });

    //MANUAL
    const backManual = new MenuElement({ name: "Back", locationHeight: 500 });

    //PAUSED
    this.pause = new MenuElement({
      name: "Paused",
      locationHeight: GAME_HEIGHT / 2
    });

    //GAMEOVER
    this.gameOver = new MenuElement({
      name: "GAME OVER",
      locationHeight: GAME_HEIGHT / 2 - 50
    });

    //hier kommen noch zum zeichnen, die zwei checkboxen music und sound rein | vielleicht auch in die draw von der  MenuElement Klasse
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
    //PAUSED
    if (this.gamestate == GAMESTATE.PAUSED) {
      ctx.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      ctx.fillStyle = "#000000AA";
      ctx.fill();
      //paused
      this.pause.draw(ctx);
    }
    //GAMEOVER
    if (this.gamestate == GAMESTATE.GAMEOVER) {
      ctx.fillStyle = "white";
      ctx.fillRect(GAME_WIDTH / 2 - 5, GAME_HEIGHT / 2, 10, 200);

      //Score Looser
      this.game.score.scoreL.draw(ctx);
      this.game.score.scoreR.draw(ctx);
      //Score winner
      this.gameOver.draw(ctx);

      //GameOver
    }
    //TITLE HEADER and BACKGROUND
    if (
      this.gamestate !== GAMESTATE.RUNNING &&
      this.gamestate !== GAMESTATE.PAUSED &&
      this.gamestate !== GAMESTATE.INGAME
    ) {
      //Title and Shader
      this.titleHeaderShader.draw(ctx);
      this.titleHeader.draw(ctx);
      ctx.fillStyle = "#ff0";
      ctx.fillRect(0, 35, 210, 10);
      ctx.fillRect(GAME_WIDTH - 220, 35, GAME_WIDTH, 10);
    }

    if (
      this.gamestate !== GAMESTATE.INGAME &&
      this.gamestate !== GAMESTATE.PAUSED &&
      this.gamestate !== GAMESTATE.GAMEOVER
    ) {
      //capable of drawing all Objects in the menuObjects list (according to the current Gamestate)
      for (let i = 0; i < this.menuObjects[this.gamestate].length; i++) {
        this.menuObjects[this.gamestate][i].draw(ctx);
      }
    }

    if (this.gamestate == GAMESTATE.MENU_TITLE) {
      this.movingSmiley.draw(ctx);
    }

    //SETTINGS
    if (this.gamestate == GAMESTATE.MENU_SETTINGS) {
      ctx.beginPath();
      ctx.fillStyle = "orange";
      this.checkBoxsize = 60;

      if (this.currentCursorpositionP1 == 0) {
        this.checkBoxsize = 60;
        ctx.fillRect(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50 - 2,
          260,
          this.checkBoxsize,
          this.checkBoxsize
        ); //big music
        ctx.moveTo(GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50 - 2, 260);
        ctx.lineTo(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50 - 2 + this.checkBoxsize,
          260 + this.checkBoxsize
        );
        ctx.moveTo(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50 - 2 + this.checkBoxsize,
          260
        );
        ctx.lineTo(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50 - 2,
          260 + this.checkBoxsize
        );
      } else {
        this.checkBoxsize = 55;
        ctx.fillRect(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50,
          265,
          this.checkBoxsize,
          this.checkBoxsize
        ); //small music

        ctx.moveTo(GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50, 265);
        ctx.lineTo(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50 + this.checkBoxsize,
          265 + this.checkBoxsize
        );
        ctx.moveTo(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50 + this.checkBoxsize,
          265
        );
        ctx.lineTo(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50,
          265 + this.checkBoxsize
        );
      }
      if (this.currentCursorpositionP1 == 1) {
        this.checkBoxsize = 60;
        ctx.fillRect(GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50 - 2, 365, 60, 60); //big sound
        ctx.moveTo(GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50 - 2, 365);
        ctx.lineTo(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50 - 2 + this.checkBoxsize,
          365 + this.checkBoxsize
        );
        ctx.moveTo(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50 - 2 + this.checkBoxsize,
          365
        );
        ctx.lineTo(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50 - 2,
          365 + this.checkBoxsize
        );
      } else {
        this.checkBoxsize = 55;
        ctx.fillRect(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50,
          370,
          this.checkBoxsize,
          this.checkBoxsize
        ); //small sound
        ctx.moveTo(GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50, 370);
        ctx.lineTo(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50 + this.checkBoxsize,
          370 + this.checkBoxsize
        );
        ctx.moveTo(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50 + this.checkBoxsize,
          370
        );
        ctx.lineTo(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50,
          370 + this.checkBoxsize
        );
      }
      ctx.stroke();
    }

    //INGAME
    if (this.gamestate == GAMESTATE.INGAME) {
      this.game.draw(ctx);
    }
  }

  update(lastTime) {
    this.timeStamp = lastTime;
    if (this.gamestate == GAMESTATE.MENU_TITLE) {
      this.movingSmiley.update(); // move the smiley
    }
    if (this.gamestate == GAMESTATE.INGAME) {
      this.game.update(lastTime);

      if (
        this.game.score.scoreLInt >= this.game.score.gameOverScore ||
        this.game.score.scoreRInt >= this.game.score.gameOverScore
      ) {
        this.game.score.scoreL.locationHeight *= 6;
        this.game.score.scoreR.locationHeight *= 6;
        this.gamestate = GAMESTATE.GAMEOVER;
      }
    }
  }

  togglePause() {
    if (this.gamestate == GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.INGAME;
      this.game.gameObjects.mods.timeLeftStart +=
        this.timeStamp - this.timePauseOn;
      for (let i in this.game.gameObjects.mods.modStartTime)
        [
          (this.game.gameObjects.mods.modStartTime[i] +=
            this.timeStamp - this.timePauseOn)
        ];
      //start zeit
    } else {
      this.gamestate = GAMESTATE.PAUSED;
      this.timePauseOn = this.timeStamp;
      //pause zeit
    }
  }
  toggleMenuTitle() {
    this.gamestate = GAMESTATE.MENU_TITLE;
  }

  curCursorPositionUp(eventKey) {
    //go up with the  cursorposition --> MOVE DOWN in menu
    if (eventKey == "ArrowDown") {
      if (
        this.currentCursorpositionP1 <
        this.menuObjects[this.gamestate].length - 1
      ) {
        this.currentCursorpositionP1 += 1;
      } else {
        this.currentCursorpositionP1 = 0; //go to the 1st element in menuObjects (according to the current Gamestate)
      }
      if (this.audioPlayer.soundState) {
        //play scroll sound
        // this.audioPlayer.soundScroll.play();
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
    console.log("PRESSED: ArrowDown or S");
  }
  curCursorPositionDown(eventKey) {
    //go down with the cursorposition  --> MOVE UP in menu
    if (eventKey == "ArrowUp") {
      if (this.currentCursorpositionP1 > 0) {
        this.currentCursorpositionP1 -= 1;
      } else {
        this.currentCursorpositionP1 =
          this.menuObjects[this.gamestate].length - 1; //go to the last element in menuObjects (according to the current Gamestate)
      }
      if (this.audioPlayer.soundState) {
        //play scroll sound
        //this.audioPlayer.soundScroll.play();
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
  }
  paintMenuColors() {
    //first paint all white , normal size
    for (let i = 0; i < this.menuObjects[this.gamestate].length; i++) {
      this.menuObjects[this.gamestate][i].statePl1 = false;
      this.menuObjects[this.gamestate][i].statePl2 = false;
      this.menuObjects[this.gamestate][i].pxSize = "50";
    }

    //Color & Size bigger... selected element by PL1
    this.menuObjects[this.gamestate][
      this.currentCursorpositionP1
    ].statePl1 = true;
    this.menuObjects[this.gamestate][this.currentCursorpositionP1].pxSize =
      "55";

    if (this.gamestate == GAMESTATE.START) {
      //Color & Size bigger ...selected element by PL2 (only show in Start)
      this.menuObjects[this.gamestate][
        this.currentCursorpositionP2
      ].statePl2 = true;
      this.menuObjects[this.gamestate][this.currentCursorpositionP2].pxSize =
        "55";
    }
  }
  changeGamestate() {
    if (this.gamestate !== "menuTitle") {
      // CLOSE VIEW
      this.gamestate = this.menuPath[this.menuPath.length - 2]; //take and set  next-to-last gamestate
      this.menuPath.pop(); //delete the last view
    } else {
      if (this.gamestate != GAMESTATE.START) {
        //OPEN VIEW
        this.gamestate =
          this.menuObjects[this.gamestate][this.currentCursorpositionP1].name; //to open this view ->set gamestate to the current menuElement name
        this.menuPath.push(this.gamestate); //adds the current view
      }
    }
    this.resetCursorPosition(); //select the first element
    this.paintMenuColors(); //repaint
  }
  changeGamestateToIngame() {
    //Start the game with the choosen colors
    this.game = new Game(
      this.menuObjects[this.gamestate][this.currentCursorpositionP2].color,
      this.menuObjects[this.gamestate][this.currentCursorpositionP1].color
    ); //LeftRacket = Pl2 ......RightRacket = Pl1

    this.gamestate = GAMESTATE.INGAME;
  }
  changeGamestateToTitleScreen() {
    this.gamestate == GAMESTATE.MENU_TITLE;
  }
  changeCheckedState() {}

  resetCursorPosition() {
    //select the first element
    this.currentCursorpositionP1 = 0;
    this.currentCursorpositionP2 = 0;
  }
}
