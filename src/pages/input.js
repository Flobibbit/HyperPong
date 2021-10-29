export default class InputHandler {
  constructor(game) {
    //Braucht man zwei enventlistener ? pro sparte
    //KeyDown
    const racketL = game.gameObjects.racketL;
    const racketR = game.gameObjects.racketR;

    document.addEventListener("keydown", (event) => {
      //INGAMExc
      if (game.gamestate == 1) {
        if (event.key === "w") racketL.moveUp();
        if (event.key === "s") racketL.moveDown();

        if (event.key === "ArrowDown") racketR.moveDown();
        if (event.key === "ArrowUp") racketR.moveUp();

        if (event.key === "Escape") {
          game.togglePause();
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
          game.togglePause();
        }
      }
    });

    //KeyUp
    document.addEventListener("keyup", (event) => {
      if (game.gamestate == 1) {
        if (event.key === "w") if (racketL.speed < 0) racketL.stop();
        if (event.key === "s") if (racketL.speed > 0) racketL.stop();

        if (event.key === "ArrowDown") if (racketR.speed > 0) racketR.stop();
        if (event.key === "ArrowUp") if (racketR.speed < 0) racketR.stop();
      }
    });
  }
}
