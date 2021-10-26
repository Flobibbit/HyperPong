import Particle from "/src/pages/particle.js";

export default class Ball {
  constructor(game) {
    this.game = game;

    this.image = document.getElementById("img_pongBall");

    this.position = { x: 200, y: 20 };
    this.speed = { x: 3, y: -3 };

    this.size = 18;
    this.gameHeight = game.gameHeight;
    this.gameWidht = game.gameWidht;

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
    if (this.position.y > this.gameHeight - this.size) this.speed.y = -5;
    if (this.position.y < 0) this.speed.y = 5;
    //Bounce of rackets und Punkt ende
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
        particles.splice(i, 1);
      } else {
        particle.draw(this.game.ctx);
        particle.update();
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
}
