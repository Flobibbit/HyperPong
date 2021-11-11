export default class InputHandler {
  constructor(gameObjects, menu, gamestate1, audioPlayer) {
    this.racketL = gameObjects.racketL; //racket L from the gameObject list
    this.racketR = gameObjects.racketR; //racket R from the gameObject list

    this.menu = menu;

    this.gameMasterState = gamestate1;
    this.audioPlayer = audioPlayer;

    //KeyDown
    document.addEventListener("keydown", (event) => {
      //INGAME
      if (this.gameMasterState == "1") {
        if (event.key === "w") this.racketL.moveUp();
        if (event.key === "s") this.racketL.moveDown();

        if (event.key === "ArrowDown") this.racketR.moveDown();
        if (event.key === "ArrowUp") this.racketR.moveUp();

        if (event.key === "Escape") {
          this.menu.togglePause();
        }
      } else {
        //MENU

        //navigation for PL1->
        if (event.key === "ArrowUp") this.menu.curCursorPositionDown(event.key);
        if (event.key === "ArrowDown") this.menu.curCursorPositionUp(event.key);
        //navigation for PL2->
        if (event.key === "w") this.menu.curCursorPositionDown(event.key);
        if (event.key === "s") this.menu.curCursorPositionUp(event.key);

        //Audio Changes
        if (this.menu.gamestate == "Settings") {
          //cursor at Music
          if (this.menu.currentCursorpositionP1 == 0) {
            if (event.key === "Enter") this.menu.audioPlayer.changeMusicState();
          }
          //cursor at Sound
          if (this.menu.currentCursorpositionP1 == 1) {
            if (event.key === "Enter") this.menu.audioPlayer.changeSoundState();
          }
        }
        //Open and Close Views --> changeGameState
        if (
          this.menu.gamestate == "menuTitle" ||
          this.menu.currentCursorpositionP1 ==
            this.menu.menuObjects[this.menu.gamestate].length - 1 //cursorposition is at the last Element (Back) in the current list of menuOjects
        ) {
          if (event.key === "Enter") this.menu.changeGamestate();
        }
      }
    });

    //KeyUp
    document.addEventListener("keyup", (event) => {
      if (this.gameMasterState == "1") {
        //key-up event for PL1->
        if (event.key === "ArrowUp")
          if (this.racketR.speed < 0) this.racketR.stop(); //to stop racketL moving up
        if (event.key === "ArrowDown")
          if (this.racketR.speed > 0) this.racketR.stop(); //to stop racketL moving down
      }
      //key-up event for PL2->
      if (event.key === "w") if (this.racketL.speed < 0) this.racketL.stop(); //to stop racketL moving up
      if (event.key === "s") if (this.racketL.speed > 0) this.racketL.stop(); //to stop the racketL moving down
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
