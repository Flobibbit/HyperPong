import Racket from "/src/pages/Racket.js";
import Ball from "/src/pages/ball.js";
import InputHandler from "/src/pages/input.js";
import Particle from "/src/pages/particle.js";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU_TITLE: 2,
  MENU_CONTROLS: 3,
  GAMEOVER: 4
};
export default class Game {
  constructor(gameWidht, gameHeight) {
    this.gameWidht = gameWidht;
    this.gameHeight = gameHeight;

    this.gamestate = GAMESTATE.RUNNING;

    //ALL GAMEOBJECTS
    const ball = new Ball(this);
    const racketL = new Racket(this, "l");
    const racketR = new Racket(this, "r");

    //wenn das nicht funktioniert  mit particle einfach auskommentieren
    const particle = new Particle(this, 10, 6, -6);

    this.particleObjects = {};

    this.gameObjects = {
      racketL: racketL,
      racketR: racketR,
      ball: ball
    };

    new InputHandler(this, this.gameObjects.rackets);
  }
  start() {
    this.gamestate = GAMESTATE.RUNNING;
  }

  draw(ctx) {
    for (const obj of Object.values(this.gameObjects)) {
      obj.draw(ctx);
    }

    if (this.gamestate == GAMESTATE.PAUSED) {
      ctx.fillStyle = "#000000AA";
      ctx.fill();

      //Quit + Pause game screen
      ctx.font = "60px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidht / 2, this.gameHeight / 2);
    }
  }

  update() {
    if (this.gamestate == GAMESTATE.PAUSED) {
      return;
    }

    for (const obj of Object.values(this.gameObjects)) {
      obj.update();
    }
  }

  togglePause() {
    if (this.gamestate == GAMESTATE.PAUSED) {
      this.gamestate = GAMESTATE.RUNNING;
    } else {
      this.gamestate = GAMESTATE.PAUSED;
    }
  }

  createParticles() {
    //ist hier der richtige Datentyp beim Zähler ?
    for (let i = 0; i <= 150; i++) {
      let dx = (Math.random() - 0.5) * (Math.random() * 6);
      let dy = (Math.random() - 0.5) * (Math.random() * 6);
      let radius = Math.random() * 3;
      let particle = new Particle(
        this.gameWidht,
        this.gameHeight,
        radius,
        dx,
        dy
      );

      /* Adds new items like particle*/
      this.particleObjects.appendChild(particle);
    }
  }
}
