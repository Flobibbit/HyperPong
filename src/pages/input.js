export default class InputHandler {
  constructor(game) {
    //Braucht man zwei enventlistener ? pro sparte
    //KeyDown
    const racketL = game.gameObjects.racketL;
    const racketR = game.gameObjects.racketR;

    document.addEventListener("keydown", (event) => {
      if (event.key === "a") racketL.moveUp();
      if (event.key === "d") racketL.moveDown();

      if (event.key === "ArrowLeft") racketR.moveDown();
      if (event.key === "ArrowRight") racketR.moveUp();

      if (event.key === "Escape") {
        game.togglePause();
      }
    });

    //KeyUp
    document.addEventListener("keyup", (event) => {
      if (event.key === "a") if (racketL.speed < 0) racketL.stop();
      if (event.key === "d") if (racketL.speed > 0) racketL.stop();

      if (event.key === "ArrowLeft") if (racketR.speed > 0) racketR.stop();
      if (event.key === "ArrowRight") if (racketR.speed < 0) racketR.stop();
    });
  }
}
