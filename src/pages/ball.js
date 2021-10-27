import Particle from "/src/pages/particle.js";

export default class Ball {
  constructor(game) {
    this.game = game;

    this.image = document.getElementById("img_pongBall");

    this.size = 18;
    this.gameHeight = game.gameHeight;
    this.gameWidht = game.gameWidht;

    this.position = {
      x: game.gameWidht / 2 - this.size / 2,
      y: game.gameHeight - 100
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
    const racketL = this.game.gameObjects.racketL;
    const racketR = this.game.gameObjects.racketR;
    //change Ball position
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    //Bounce of Wall
    if (this.position.y > this.gameHeight - this.size) this.speed.y *= -1;
    if (this.position.y < 0) this.speed.y *= -1;
    //Bounce of rackets und Punkt ende

    //MINE

    //CheckHit with Racket
    //CheckHit with Wall --> Bounce off wall

    //left Racket
    if (this.position.x <= racketL.position.x + racketL.width) {
      if (
        this.position.y + this.size / 2 >= racketL.position.y &&
        this.position.y - this.size / 2 <= racketL.position.y + racketL.height
      ) {
        //hit
        this.speed.x *= -1;
      } else {
        //miss
        this.resetSpawn();
        this.speed.x = 5;
        this.game.scoreR += 1;
        console.log("ScoreR:");
        console.log(this.game.scoreR);
      }
    }
    //right Racket
    if (this.position.x >= racketR.position.x - racketR.width) {
      if (
        this.position.y + this.size / 2 >= racketR.position.y &&
        this.position.y - this.size / 2 <= racketR.position.y + racketR.height
      ) {
        //hit
        this.speed.x *= -1;
      } else {
        //miss
        this.resetSpawn();
        this.speed.x = -5;
        this.game.scoreL += 1;
        console.log("ScoreL:");
        console.log(this.game.scoreL);
      }
    }
  }

  resetSpawn() {
    //explode mechanism
    this.createParticles();

    this.particleObjects.forEach((particle, i) => {
      if (particle.alpha <= 0) {
        this.particleObjects.splice(i, 1);
      } else {
        particle.update(this.game.ctx);
      }
    });
    // wait
    //  setTimeout(function () {
    // Code, der erst nach 2 Sekunden ausgeführt wird
    const randomSpawnPoint = Math.floor(
      Math.random() * this.gameHeight - this.size
    );
    this.position.x = this.gameWidht / 2 - this.size / 2;
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
