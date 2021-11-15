import Particle from "/src/pages/Particle.js";
import { GAME_WIDTH, GAME_HEIGHT } from "/src/pages/constant.js";
//test
export default class Ball {
  constructor(racketL, racketR, score) {
    this.racketL = racketL; //take care of collisions  via position of racketL
    this.racketR = racketR; //take care of collisions via position of racketR
    this.score = score; //to change the correct score, if the ball hits the target/score area

    this.image = document.getElementById("img_pongBall"); //recieves an image from the index.html

    this.size = 18; //size of the ball in px

    //current position of the ball on the canvas x & y
    this.position = {
      x: GAME_WIDTH / 2 - this.size / 2,
      y: GAME_HEIGHT - 100
    };

    this.speed = { x: 5, y: 5 }; //the px lenght that the ball moves with each update into x & y

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
        this.score.scoreUp("r");
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
        this.score.scoreUp("l");
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
      Math.random() * (GAME_HEIGHT - this.size)
    );
    this.position.x = GAME_WIDTH / 2 - this.size / 2;
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
