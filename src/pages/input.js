export default class InputHandler {
  constructor(rackets) {
    //KeyDown
    document.addEventListener("keydown", (event) => {
      if (event.key === "a") rackets[0].moveUp();
      if (event.key === "d") rackets[0].moveDown();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft") rackets[1].moveDown();
      if (event.key === "ArrowRight") rackets[1].moveUp();
    });

    //KeyUp
    document.addEventListener("keyup", (event) => {
      if (event.key === "a") if (rackets[0].speed < 0) rackets[0].stop();
      if (event.key === "d") if (rackets[0].speed > 0) rackets[0].stop();
    });

    document.addEventListener("keyup", (event) => {
      if (event.key === "ArrowLeft")
        if (rackets[1].speed > 0) rackets[1].stop();
      if (event.key === "ArrowRight")
        if (rackets[1].speed < 0) rackets[1].stop();
    });
  }
}
