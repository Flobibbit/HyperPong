export default class InputHandler {
  constructor(menu, audioPlayer, gameMaster) {
    //Game
    this.racketL = null; //needed to move racket L from the gameObject list
    this.racketR = null; //needed to move racket R from the gameObject list
    this.mods = null;

    //Menu
    this.menu = menu; //needed to handle interactions with Objects in the menu

    //?
    this.audioPlayer = audioPlayer; //handles the audio states-- decides wether music | sound is played or not
    this.gameMaster = gameMaster;
    console.log(gameMaster);

    //KeyDown
    document.addEventListener("keydown", (event) => {
      //INGAME
      if (this.menu.gamestate == "Ingame") {
        if (!this.mods.invertedControlls()) {
          if (event.key === "w") this.racketL.moveUp(); //when w pressed, change -- y position of racketL
          if (event.key === "s") this.racketL.moveDown(); //when s pressed, change ++ y position of racketL

          if (event.key === "ArrowDown") this.racketR.moveDown(); //when ArrowDown pressed, change -- y position of racketR
          if (event.key === "ArrowUp") this.racketR.moveUp(); //when ArrowUp pressed, change ++ y position of racketR
        } else {
          if (event.key === "s") this.racketL.moveUp(); //when w pressed, change -- y position of racketL
          if (event.key === "w") this.racketL.moveDown(); //when s pressed, change ++ y position of racketL

          if (event.key === "ArrowUp") this.racketR.moveDown(); //when ArrowDown pressed, change -- y position of racketR
          if (event.key === "ArrowDown") this.racketR.moveUp(); //when ArrowUp pressed, change ++ y position of racketR
        }
      } else {
        //MENU

        //navigation for PL1->
        if (event.key === "ArrowUp") this.menu.curCursorPositionDown(event.key);
        if (event.key === "ArrowDown") this.menu.curCursorPositionUp(event.key);
        //navigation for PL2->
        if (event.key === "w") this.menu.curCursorPositionDown(event.key);
        if (event.key === "s") this.menu.curCursorPositionUp(event.key);

        if (event.key === "Enter") {
          if (
            this.menu.gamestate === "Start" &&
            this.menu.currentCursorpositionP1 !==
              this.menu.menuObjects[this.menu.gamestate].length - 1 &&
            this.menu.currentCursorpositionP2 !==
              this.menu.menuObjects[this.menu.gamestate].length - 1
          ) {
            this.menu.changeGamestateToIngame();

            //if the game Object is instantiated ...
            this.racketL = this.menu.game.gameObjects.racketL;
            this.racketR = this.menu.game.gameObjects.racketR;
            this.mods = this.menu.game.gameObjects.mods;
          }

          //Open and Close Views --> changemenu.gamestate
          else if (
            this.menu.gamestate == "menuTitle" ||
            this.menu.currentCursorpositionP1 ==
              this.menu.menuObjects[this.menu.gamestate].length - 1
          ) {
            this.menu.changeGamestate();
            console.log("aktueller menu.gamestate: " + this.menu.gamestate);
          } else if (
            this.menu.currentCursorpositionP2 ==
            this.menu.menuObjects[this.menu.gamestate].length - 1
          ) {
            this.menu.changeGamestate();
            console.log(this.menu.gamestate);
          }
        }

        //Audio Changes
        if (this.menu.gamestate == "Settings") {
          switch (this.menu.currentCursorpositionP1) {
            //cursor at Music
            case 0:
              this.menu.audioPlayer.changeMusicState();
              break;
            //cursor at Sound
            case 1:
              this.menu.audioPlayer.changeSoundState();
              break;
            default:
            //  return;
          }
        }
      }

      if (
        this.menu.gamestate === "Paused" ||
        this.menu.gamestate === "Ingame"
      ) {
        if (event.key == "Escape") this.menu.togglePause();
      }
    });

    //KeyUp
    document.addEventListener("keyup", (event) => {
      if (this.menu.gamestate == "Ingame") {
        //key-up event for PL1->
        if (event.key === "ArrowUp") this.racketR.stop(); //to stop racketR moving up
        if (event.key === "ArrowDown") this.racketR.stop(); //to stop racketR moving down

        //key-up event for PL2->
        if (event.key === "w") this.racketL.stop(); //to stop racketL moving up
        if (event.key === "s") this.racketL.stop(); //to stop the racketL moving down
      }
    });

    //Anti scroll logic
    var keys = {};
    window.addEventListener(
      "keydown",
      function (e) {
        keys[e.code] = true;
        switch (e.code) {
          case "ArrowUp":
          case "ArrowDown":
          case "ArrowLeft":
          case "ArrowRight":
          case "Space":
            e.preventDefault();
            break; //block the default action of the event (moving the viewpoint of the browser)
          default:
            break; // do not block other keys
        }
      },
      false
    );
    window.addEventListener(
      "keyup",
      function (e) {
        keys[e.code] = false;
      },
      false
    );
  }
}
