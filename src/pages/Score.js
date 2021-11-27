import { GAME_WIDTH, GAME_HEIGHT } from "/src/pages/constant.js";
import MenuElement from "./MenuElement.js";
import GameOver from "./GameOver.js";

export default class Score {
  constructor() {
    this.scoreLInt = 0; //number of the score for player ->left side
    this.scoreRInt = 0; //number of the score for player ->right side
    this.gameOverScore = 3;
    this.scoreL = new MenuElement({
      name: "0",
      pxSize: 40,
      locationHeight: GAME_HEIGHT / 8,
      locationWidth: GAME_WIDTH / 4,
    });

    this.scoreR = new MenuElement({
      name: "0",
      pxSize: 40,
      locationHeight: GAME_HEIGHT / 8,
      locationWidth: (GAME_WIDTH / 4) * 3,
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
    //view GameOver screen when the players score is as high as the gameOverscore
    if (
      this.scoreLInt >= this.gameOverScore ||
      this.scoreRInt >= this.gameOverScore
    ) {
      this.GameOverScreen = new GameOver();
      this.GameOverScreen.GameOverScreen();
    }
  }
  draw(ctx) {
    this.scoreL.draw(ctx);
    this.scoreR.draw(ctx);
  }
}
