import { GAME_WIDTH, GAME_HEIGHT } from "/src/pages/constant.js";
import MenuElement from "./MenuElement.js";

export default class Score {
  constructor() {
    this.scoreLInt = 0; //number of the score for player ->left side
    this.scoreRInt = 0; //number of the score for player ->right side
    this.gameOverScore = 20;

    this.scoreL = new MenuElement({
      name: "0",
      pxSize: 40,
      locationHeight: GAME_HEIGHT / 8,
      locationWidth: GAME_WIDTH / 4
    });
    this.scoreR = new MenuElement({
      name: "0",
      pxSize: 40,
      locationHeight: GAME_HEIGHT / 8,
      locationWidth: (GAME_WIDTH / 4) * 3
    });
  }

  scoreUp(playerSide) {
    if (playerSide === "r") {
      this.scoreRInt += 1;
      this.scoreR.name = this.scoreRInt.toString();
    } else {
      this.scoreLInt += 1;
      this.scoreL.name = this.scoreLInt.toString();
    }
  }
  draw(ctx) {
    this.scoreL.draw(ctx);
    this.scoreR.draw(ctx);
  }
}
