export default class InputHandler {
  constructor(gameObjects, menu, gamestate1,musicPl) {
    this.racketL = gameObjects.racketL;
    this.racketR = gameObjects.racketR;
    this.gamestate = menu.gamestate;
    this.menu = menu;
    this.gameMasterState = gamestate1;
    this.musicPlayer=musicPl

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
        if (event.key === "w") this.menu.curCursorPositionDown(event.key);
        if (event.key === "s") this.menu.curCursorPositionUp(event.key);
        if (event.key === "ArrowUp") this.menu.curCursorPositionDown(event.key);
        if (event.key === "ArrowDown") this.menu.curCursorPositionUp(event.key);

        if (event.key === "Enter") this.menu.changeGamestate();        
        if (event.key === "Enter") this.musicPlayer.changeGamestate();

        /*   //MenuSteuerung Spieler 1
        if (event.key === "w") CursorPL1.moveUp();
        if (event.key === "s") CursorPL1.moveDown();


        //MenuSteuerung Zweitspieler Spieler 2
        if (event.key === "ArrowDown") CursorPL2.moveDown();
        if (event.key === "ArrowUp") CursorPL2.moveUp();
*/
      }
    });

    //KeyUp
    document.addEventListener("keyup", (event) => {
      if (this.gameMasterState == "1") {
        if (event.key === "w") if (this.racketL.speed < 0) this.racketL.stop();
        if (event.key === "s") if (this.racketL.speed > 0) this.racketL.stop();

        if (event.key === "ArrowDown")
          if (this.racketR.speed > 0) this.racketR.stop();
        if (event.key === "ArrowUp")
          if (this.racketR.speed < 0) this.racketR.stop();
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
