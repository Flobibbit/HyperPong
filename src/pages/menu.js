import MovingSmiley from "/src/pages/MovingSmiley.js";
import { GAME_WIDTH, GAME_HEIGHT } from "./constant.js";
import MenuElement from "./MenuElement.js";
import AudioPlayer from "./AudioPlayer.js";
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
    this.gamestate = GAMESTATE.MENU_TITLE; //active gamstate when loading the page for the 1st time
    this.currentCursorpositionP1 = 0;
    this.currentCursorpositionP2 = 0;
    this.checkBoxsize = 60;
    this.timeStamp = 0; //?
    this.timePauseOn = 0; //?

    this.imageControl = document.getElementById("control.png");
    this.imageControlWS = document.getElementById("controlWs.png");

    //GAME
    this.game = null; //gets value when the view/gamestate turns Ingame
    //AUDIO
    this.audioPlayer = new AudioPlayer(); //handles audio and decides wether sound || music is played or not

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

    const redSpecialSkillText = "Make the ball bounce at any place";
    const greenSpecialSkillText = "Makes himself bigger";
    const yellowSpecialSkillText = "Makes the ball invisible";
    const blueSpecialSkillText = "Make the ball slow down";

    this.leftSpecialSkill = new MenuElement({
      name: "",
      locationHeight: 150,
      locationWidth: 20,
      color: "yellow"
    });

    this.rightSpecialSkill = new MenuElement({
      name: "",
      locationHeight: 150,
      locationWidth: 500,
      color: "yellow"
    });

    //Settingss
    const music = new MenuElement({
      name: "Music",
      locationHeight: 220
    });
    const sound = new MenuElement({
      name: "Sound",
      locationHeight: 350
    });
    const backSettings = new MenuElement({
      name: "Back",
      locationHeight: 540
    });

    //Manual
    const backManual = new MenuElement({ name: "Back", locationHeight: 580 });

    //Paused
    this.pause = new MenuElement({
      name: "Paused",
      locationHeight: GAME_HEIGHT / 2
    });

    //GameOver
    this.gameOver = new MenuElement({
      name: "GAME OVER",
      locationHeight: GAME_HEIGHT / 2 - 110
    });

    this.overPressEnter = new MenuElement({
      name: "Press ENTER to return to MENU",
      locationHeight: GAME_HEIGHT - 70,
      pxSize: 20
    });

    //hier kommen noch zum zeichnen, die zwei checkboxen music und sound rein | vielleicht auch in die draw von der MenuElement Klasse
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

    this.menuPath = [this.gamestate]; //keeps track of the open views
    this.paintMenuColors();
  }

  draw(ctx) {
    //PAUSED
    if (this.gamestate == GAMESTATE.PAUSED) {
      this.game.draw(ctx);

      ctx.rect(0, 0, GAME_WIDTH, GAME_HEIGHT);
      ctx.fillStyle = "#000000AA";
      ctx.fill();

      this.pause.draw(ctx); //paused
    }
    //GAMEOVER
    if (this.gamestate == GAMESTATE.GAMEOVER) {
      ctx.fillStyle = "white";
      ctx.fillRect(GAME_WIDTH / 2 - 5, GAME_HEIGHT / 2 - 50, 10, 200);

      this.game.score.scoreL.draw(ctx);
      this.game.score.scoreR.draw(ctx);
      this.gameOver.draw(ctx);
      this.overPressEnter.draw(ctx);

      this.drawBorder3(ctx);
    }
    //TITLE HEADER and BACKGROUND
    if (
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
    //MENUTITLE
    if (this.gamestate == GAMESTATE.MENU_TITLE) {
      this.movingSmiley.draw(ctx);
    }

    //SETTINGS
    if (this.gamestate == GAMESTATE.MENU_SETTINGS) {
      this.drawCheckBox(ctx);
    }

    //INGAME
    if (this.gamestate == GAMESTATE.INGAME) {
      this.game.draw(ctx);
    }
    //Start
    if (this.gamestate == GAMESTATE.START) {
      this.drawSpecialSkillsRect(ctx);
      this.leftSpecialSkill.draw(ctx);
      this.rightSpecialSkill.draw(ctx);

      if (this.currentCursorpositionP1 !== 4) {
        ctx.drawImage(this.imageControl, 70, 360, 150, 150);
      }
      if (this.currentCursorpositionP2 !== 4) {
        ctx.drawImage(this.imageControlWS, 870, 360, 150, 150);
      }
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
        this.game.score.scoreL.locationHeight =
          this.game.score.scoreL.locationHeight * 6 - 65;
        this.game.score.scoreR.locationHeight =
          this.game.score.scoreR.locationHeight * 6 - 65;

        this.game.score.scoreL.locationWidth += 50;
        this.game.score.scoreR.locationWidth -= 50;

        if (this.game.score.scoreLInt > this.game.score.scoreRInt) {
          this.game.score.scoreL.color = "Green";
          this.game.score.scoreR.color = "Red";
        } else {
          this.game.score.scoreL.color = "Red";
          this.game.score.scoreR.color = "Green";
        }
        this.gamestate = GAMESTATE.GAMEOVER;
        this.audioPlayer.playGameOver();
      }
    }
  }

  togglePause() {
    if (this.gamestate == GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.INGAME;
      this.game.gameObjects.mods.timeLeftStart +=
        this.timeStamp - this.timePauseOn;
      this.game.gameObjects.racketL.correctTimesAfterPause(
        this.timeStamp - this.timePauseOn
      );
      this.game.gameObjects.racketR.correctTimesAfterPause(
        this.timeStamp - this.timePauseOn
      );
      for (let i in this.game.gameObjects.mods.modStartTime)
        [
          (this.game.gameObjects.mods.modStartTime[i] +=
            this.timeStamp - this.timePauseOn)
        ];
      //start zeit
    } else {
      this.audioPlayer.playPause();
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
    this.audioPlayer.playScrollUp();
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
    this.audioPlayer.playScrollUp();
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
      this.menuObjects[this.gamestate][this.currentCursorpositionP1].color,
      this.gamestate
    ); //LeftRacket = Pl2 ......RightRacket = Pl1
    this.game.gameObjects.ball.audioPlayer = this.audioPlayer;
    this.game.gameObjects.racketL.audioPlayer = this.audioPlayer;
    this.game.gameObjects.racketR.audioPlayer = this.audioPlayer;
    this.game.gameObjects.mods.audioPlayer = this.audioPlayer;
    this.gamestate = GAMESTATE.INGAME;
  }
  changeGamestateToTitleScreen() {
    delete this.game;
    console.log(this.game);
    this.gamestate == GAMESTATE.MENU_TITLE;
  }

  resetCursorPosition() {
    //select the first element
    this.currentCursorpositionP1 = 0;
    this.currentCursorpositionP2 = 0;
  }

  drawCheckBox(ctx) {
    ctx.beginPath();
    ctx.fillStyle = "orange";
    this.checkBoxsize = 60;

    if (this.currentCursorpositionP1 == 0) {
      this.checkBoxsize = 60;
      ctx.fillRect(
        GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50 - 2,
        this.menuObjects.Settings[0].locationHeight - this.checkBoxsize,
        this.checkBoxsize,
        this.checkBoxsize
      ); //big music
      if (this.audioPlayer.musicState) {
        ctx.moveTo(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50 - 2,
          this.menuObjects.Settings[0].locationHeight - this.checkBoxsize
        );
        ctx.lineTo(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50 - 2 + this.checkBoxsize,
          this.menuObjects.Settings[0].locationHeight
        );
        ctx.moveTo(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50 - 2 + this.checkBoxsize,
          this.menuObjects.Settings[0].locationHeight - this.checkBoxsize
        );
        ctx.lineTo(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50 - 2,
          this.menuObjects.Settings[0].locationHeight
        );
      }
    } else {
      this.checkBoxsize = 55;
      ctx.fillRect(
        GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50,
        this.menuObjects.Settings[0].locationHeight - this.checkBoxsize,
        this.checkBoxsize,
        this.checkBoxsize
      ); //small music
      if (this.audioPlayer.musicState) {
        ctx.moveTo(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50,
          this.menuObjects.Settings[0].locationHeight - this.checkBoxsize
        );
        ctx.lineTo(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50 + this.checkBoxsize,
          this.menuObjects.Settings[0].locationHeight
        );
        ctx.moveTo(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50 + this.checkBoxsize,
          this.menuObjects.Settings[0].locationHeight - this.checkBoxsize
        );
        ctx.lineTo(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50,
          this.menuObjects.Settings[0].locationHeight
        );
      }
    }
    if (this.currentCursorpositionP1 == 1) {
      this.checkBoxsize = 60;
      ctx.fillRect(
        GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50 - 2,
        this.menuObjects.Settings[1].locationHeight - this.checkBoxsize,
        this.checkBoxsize,
        this.checkBoxsize
      ); //big sound
      if (this.audioPlayer.soundState) {
        ctx.moveTo(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50 - 2,
          this.menuObjects.Settings[1].locationHeight - this.checkBoxsize
        );
        ctx.lineTo(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50 - 2 + this.checkBoxsize,
          this.menuObjects.Settings[1].locationHeight
        );
        ctx.moveTo(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50 - 2 + this.checkBoxsize,
          this.menuObjects.Settings[1].locationHeight - this.checkBoxsize
        );
        ctx.lineTo(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50 - 2,
          this.menuObjects.Settings[1].locationHeight
        );
      }
    } else {
      this.checkBoxsize = 55;
      ctx.fillRect(
        GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50,
        this.menuObjects.Settings[1].locationHeight - this.checkBoxsize,
        this.checkBoxsize,
        this.checkBoxsize
      ); //small sound
      if (this.audioPlayer.soundState) {
        ctx.moveTo(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50,
          this.menuObjects.Settings[1].locationHeight - this.checkBoxsize
        );
        ctx.lineTo(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50 + this.checkBoxsize,
          this.menuObjects.Settings[1].locationHeight
        );
        ctx.moveTo(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50 + this.checkBoxsize,
          this.menuObjects.Settings[1].locationHeight - this.checkBoxsize
        );
        ctx.lineTo(
          GAME_WIDTH / 2 + GAME_WIDTH / 5 - 50,
          this.menuObjects.Settings[1].locationHeight
        );
      }
    }
    ctx.stroke();
  }
  drawBorder3(ctx) {
    ctx.beginPath();
    // ctx.lineWidth = "3";
    ctx.strokeStyle = "Yellow";

    ctx.rect(10, 40, 0.1, 550); //1.Left Rectangle || line
    ctx.rect(GAME_WIDTH - 11, 40, 0.1, 550); //2.right Rectangle|| line
    ctx.rect(11, 590, GAME_WIDTH - 10 - 12, 0.1); //3.bottom Rectangle || line

    ctx.stroke();
  }
  drawSpecialSkillsRect(ctx) {
    if (this.currentCursorpositionP1 !== 4) {
      //Left Rectangle
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle =
        this.menuObjects[this.gamestate][this.currentCursorpositionP1].color;
      ctx.rect(20, 120, 285, 400);
      ctx.stroke();
    }
    if (this.currentCursorpositionP2 !== 4) {
      //right Rectangle
      ctx.beginPath();
      ctx.lineWidth = "2";
      ctx.strokeStyle =
        this.menuObjects[this.gamestate][this.currentCursorpositionP2].color;
      ctx.rect(GAME_WIDTH - 20 - 285, 120, 285, 400);
      ctx.stroke();
    }
  }
  drawSpecialSkillsText(ctx, specialSkill, height, width) {
    for (let index = 0; index < array.length; index++) {
      ctx.fillText(specialSkill[index], width, height);
    }
  }
}
