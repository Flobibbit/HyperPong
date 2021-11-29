import Racket from "/src/pages/Racket.js";
import Ball from "/src/pages/Ball.js";
import InputHandler from "/src/pages/InputHandler.js";
import Score from "/src/pages/Score.js";
import GameMod from "/src/pages/gameMod.js";

export default class Game {
  constructor(racketColorL, racketColorR) {
    //ALL GAMEOBJECTS
    const mods = new GameMod();

    const ball = new Ball(racketL, racketR, this.score, mods);
    const racketL = new Racket("l", racketColorL);
    const racketR = new Racket("r", racketColorR);

    this.gameObjects = {
      racketL: racketL,
      racketR: racketR,
      ball: ball,
      mods: mods
    };
    this.score = new Score();//können wir den als const deklarieren?
  }
  //capable of drawing all Objects in the gameObjects list
  draw(ctx) {
    for (const obj of Object.values(this.gameObjects)) {
      obj.draw(ctx);
    }
    this.score.draw(ctx);
  }

  update(timestamp) {
    for (const obj of Object.values(this.gameObjects)) {
      obj.update(timestamp);
    }
  }
}
