export default class InputHandler {
  constructor(gameObjects, gamestate) {
    this.racketL = gameObjects.racketL;
    this.racketR = gameObjects.racketR;
    this.gamestate = gamestate;

    //KeyDown
    document.addEventListener("keydown", (event) => {
      //INGAME

      if (this.gamestate == "running") {
        if (event.key === "w") this.racketL.moveUp();
        if (event.key === "s") this.racketL.moveDown();

        if (event.key === "ArrowDown") this.racketR.moveDown();
        if (event.key === "ArrowUp") this.racketR.moveUp();

        if (event.key === "Escape") {
          game.menu.togglePause();
        }
      } else {
        /*   //MenuSteuerung Spieler 1
        if (event.key === "w") CursorPL1.moveUp();
        if (event.key === "s") CursorPL1.moveDown();


        //MenuSteuerung Zweitspieler Spieler 2
        if (event.key === "ArrowDown") CursorPL2.moveDown();
        if (event.key === "ArrowUp") CursorPL2.moveUp();
*/
        if (event.key === "Escape") {
          game.menu.togglePause();
        }
      }
    });

    //KeyUp
    document.addEventListener("keyup", (event) => {
      if (this.gamestate == "running") {
        if (event.key === "w") if (this.racketL.speed < 0) this.racketL.stop();
        if (event.key === "s") if (this.racketL.speed > 0) this.racketL.stop();

        if (event.key === "ArrowDown")
          if (this.racketR.speed > 0) this.racketR.stop();
        if (event.key === "ArrowUp")
          if (this.racketR.speed < 0) this.racketR.stop();
      }
    });
  }
}
