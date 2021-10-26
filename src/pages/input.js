export default class InputHandler {
  constructor(game) {
    //Braucht man zwei enventlistener ? pro sparte
    //KeyDown
    const racketL = game.gameObjects.racketL;
    const racketR = game.gameObjects.racketR;

    document.addEventListener("keydown", (event) => {
      if (event.key === "w") racketL.moveUp();
      if (event.key === "s") racketL.moveDown();

      if (event.key === "ArrowDown") racketR.moveDown();
      if (event.key === "ArrowUp") racketR.moveUp();

      if (event.key === "Escape") {
        game.togglePause();
      }
    });

    //KeyUp
    document.addEventListener("keyup", (event) => {
      if (event.key === "w") if (racketL.speed < 0) racketL.stop();
      if (event.key === "s") if (racketL.speed > 0) racketL.stop();

      if (event.key === "ArrowDown") if (racketR.speed > 0) racketR.stop();
      if (event.key === "ArrowUp") if (racketR.speed < 0) racketR.stop();
    });
  }
}
