import Particle from "/src/pages/Particle.js";
import { GAME_WIDHT, GAME_HEIGHT } from "/src/pages/constant.js";

export default class Ball {
  constructor(racketL, racketR, scoreL, scoreR) {
    this.racketL = racketL;
    this.racketR = racketR;
    this.scoreL = scoreL;
    this.scoreR = scoreR;

    this.image = document.getElementById("img_pongBall");

    this.size = 18;

    this.position = {
      x: GAME_WIDHT / 2 - this.size / 2,
      y: GAME_HEIGHT - 100
    };

    this.speed = { x: 5, y: 5 };

    this.particleObjects = [];
  }

  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
  }

  update() {
    //change Ball position
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    //Bounce of Wall
    if (this.position.y > GAME_HEIGHT - this.size) this.speed.y *= -1;
    if (this.position.y < 0) this.speed.y *= -1;
    //Bounce of rackets und Punkt ende

    //MINE

    //CheckHit with Racket
    //CheckHit with Wall --> Bounce off wall

    //left Racket
    if (this.position.x <= this.racketL.position.x + this.racketL.width) {
      if (
        this.position.y + this.size / 2 >= this.racketL.position.y &&
        this.position.y - this.size / 2 <=
          this.racketL.position.y + this.racketL.height
      ) {
        //hit
        this.speed.x *= -1;
      } else {
        //miss
        this.resetSpawn();
        this.speed.x = 5;
        //this.scoreR.scoreUp();
      }
    }
    //right Racket
    if (this.position.x >= this.racketR.position.x - this.racketR.width) {
      if (
        this.position.y + this.size / 2 >= this.racketR.position.y &&
        this.position.y - this.size / 2 <=
          this.racketR.position.y + this.racketR.height
      ) {
        //hit
        this.speed.x *= -1;
      } else {
        //miss
        this.resetSpawn();
        this.speed.x = -5;
        //this.scoreL.scoreUp();
      }
    }
  }

  resetSpawn() {
    //explode mechanism
    //createParticles();

    /*this.particleObjects.forEach((particle, i) => {
      if (particle.alpha <= 0) {
        this.particleObjects.splice(i, 1);
      } else {
        particle.update(this.game.ctx);
      }
    });*/
    // wait
    //  setTimeout(function () {
    // Code, der erst nach 2 Sekunden ausgeführt wird
    const randomSpawnPoint = Math.floor(
      Math.random() * GAME_HEIGHT - this.size
    );
    this.position.x = GAME_WIDHT / 2 - this.size / 2;
    this.position.y = randomSpawnPoint;

    //}, 2000);
  }

  createParticles() {
    //ist hier der richtige Datentyp beim Zähler ?
    for (let i = 0; i <= 150; i++) {
      let dx = (Math.random() - 0.5) * (Math.random() * 6);
      let dy = (Math.random() - 0.5) * (Math.random() * 6);
      let radius = Math.random() * 3;
      let particle = new Particle(
        this.position.x,
        this.position.y,
        radius,
        dx,
        dy
      );

      /* Adds new items like particle*/
      this.particleObjects.push(particle);
    }
  }

  bounceOff() {
    //change speed -5 ->> Bounce off wall ->> Bounce off racketL
    //change speed +5 ->> Bounce off wall ->> Bounce off racketR
  }
}
