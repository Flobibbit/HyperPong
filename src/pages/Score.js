import { GAME_WIDHT, GAME_HEIGHT } from "/src/pages/constant.js";
import MenuElement from "/src/pages/MenuElement.js";

export default class Score {
  constructor() {
    this.score = 0;

    this.scoreL = new MenuElement(
      this.score,
      GAME_HEIGHT / 8,
      40,
      null,
      GAME_WIDHT / 4
    );

    this.scoreR = new MenuElement(
      this.score,
      GAME_HEIGHT / 8,
      40,
      null,
      (GAME_WIDHT / 4) * 3
    );
  }

  scoreUp(scoreBoard) {
    scoreBoard.sName += 1;
  }
  draw(ctx) {
    this.scoreL.draw(ctx);
    this.scoreR.draw(ctx);
  }
  update(ctx) {}
}
