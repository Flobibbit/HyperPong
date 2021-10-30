import { GAME_WIDHT, GAME_HEIGHT } from "/src/pages/constant.js";
import MenuCanvasEl from "/src/pages/MenuCanvasEl.js";

export default class Score {
  constructor() {
    this.score = 0;

    this.scoreL = new MenuCanvasEl(
      this.score,
      GAME_HEIGHT / 8,
      40,
      null,
      GAME_WIDHT / 4
    );

    this.scoreR = new MenuCanvasEl(
        this.score,
        GAME_HEIGHT / 8,
        40,
        null,
        (GAME_WIDHT / 4) * 3
      );


  }

  scoreUp() {
    this.score += 1;
  }
  draw(ctx) {
this.scoreL.draw(ctx)
this.scoreR.draw(ctx)

  }
  update() {}
}
