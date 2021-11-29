import { GAME_WIDTH, GAME_HEIGHT } from "/src/pages/constant.js";
//test
export default class Ball {
  constructor(racketL, racketR, score, mod) {
    this.racketL = racketL; //take care of collisions  via position of racketL
    this.racketL.ball = this;
    this.racketR = racketR; //take care of collisions via position of racketR
    this.racketR.ball = this;
    this.score = score; //to change the correct score, if the ball hits the target/score area
    this.image = document.getElementById("img_pongBall"); //recieves an image from the index.html
    this.size = 18; //size of the ball in px
    this.mod = mod;
    this.lMissed = false;
    this.rMissed = false;
    this.lastPoint = "/";
    this.ballColor = "#FFFFFF";
    this.audioPlayer = null;
    //current position of the ball on the canvas x & y
    this.position = {
      x: GAME_WIDTH / 2 - this.size / 2,
      y: GAME_HEIGHT - 100
    };

    this.ballSpeedSum = 10; //the sum of the speed for the x and y
    this.speed = { x: this.ballSpeedSum / 2, y: this.ballSpeedSum / 2 }; //the px lenght that the ball moves with each update into x & y
  }

  draw(ctx) {
    ctx.fillStyle = this.ballColor;
    ctx.fillRect(this.position.x, this.position.y, this.size, this.size);
  }

  update() {
    if (this.mod.speedUp()) {
      if (
        this.racketL.blueMoveData.activated ||
        this.racketR.blueMoveData.activated
      ) {
        this.ballSpeedSum = this.racketL.blueMoveData.speedUpSpeed;
      } else {
        this.ballSpeedSum = 16;
      }
      var oldSum = Math.abs(this.speed.x) + Math.abs(this.speed.y);
      this.speed.x = Math.round(this.speed.x * (this.ballSpeedSum / oldSum));
      this.speed.y = Math.round(this.speed.y * (this.ballSpeedSum / oldSum));
    } else {
      if (
        this.racketL.blueMoveData.activated ||
        this.racketR.blueMoveData.activated
      ) {
        this.ballSpeedSum = this.racketL.blueMoveData.speed;
      } else {
        this.ballSpeedSum = 10;
      }
      var oldSum = Math.abs(this.speed.x) + Math.abs(this.speed.y);
      this.speed.x = Math.round(this.speed.x * (this.ballSpeedSum / oldSum));
      this.speed.y = Math.round(this.speed.y * (this.ballSpeedSum / oldSum));
    }
    //change Ball position
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;
    //Bounce of Walls
    if (
      (this.position.y > GAME_HEIGHT - this.size && this.speed.y > 0) ||
      (this.position.y < 0 && this.speed.y < 0)
    ) {
      this.yBounce();
    }

    //left Racket
    if (
      this.position.x <= this.racketL.position.x + this.racketL.width &&
      this.lMissed == false
    ) {
      if (
        (this.position.y + this.size < this.racketL.position.y ||
          this.position.y > this.racketL.position.y + this.racketL.height) ==
        this.mod.racketMiss()
      ) {
        //hit
        this.speed.x *= -1;
        this.audioPlayer.playHitLeft();
        if (this.mod.randomBounce()) {
          this.speed.x = Math.floor(
            Math.random() * (this.ballSpeedSum / 2) + 1
          );
          if (Math.floor(Math.random() * 2) == 0) {
            this.speed.y = this.ballSpeedSum - Math.abs(this.speed.x);
          } else {
            this.speed.y = (this.ballSpeedSum - Math.abs(this.speed.x)) * -1;
          }
        }
      } else {
        //miss
        this.lMissed = true;
        this.lastPoint = "right";
      }
    }
    //right Racket
    if (
      this.position.x + this.size >= this.racketR.position.x &&
      this.rMissed == false
    ) {
      if (
        (this.position.y + this.size < this.racketR.position.y ||
          this.position.y > this.racketR.position.y + this.racketR.height) ==
        this.mod.racketMiss()
      ) {
        //hit
        this.speed.x *= -1;
        this.audioPlayer.playHitRight();
        if (this.mod.randomBounce()) {
          this.speed.x =
            Math.floor(Math.random() * (this.ballSpeedSum / 2) + 1) * -1;
          if (Math.floor(Math.random() * 2) == 0) {
            this.speed.y = this.ballSpeedSum - Math.abs(this.speed.x);
          } else {
            this.speed.y = (this.ballSpeedSum - Math.abs(this.speed.x)) * -1;
          }
        }
      } else {
        //miss
        this.rMissed = true;
        this.lastPoint = "left";
      }
    }
    if (this.position.x + this.size <= 0 || this.position.x >= GAME_WIDTH) {
      this.lMissed = false;
      this.rMissed = false;
      this.resetSpawn();
      this.speed.x = Math.floor(Math.random() * (this.ballSpeedSum / 2) + 3);
      this.speed.y = this.ballSpeedSum - Math.abs(this.speed.x);
      if (this.lastPoint == "left") {
        this.score.scoreUp("l");
        this.speed.x *= -1;
      } else {
        this.score.scoreUp("r");
      }
    }
  }

  yBounce() {
    this.audioPlayer.playScrollDown();
    this.speed.y *= -1;
    if (this.mod.randomBounce()) {
      if (this.speed.y > 0) {
        this.speed.y = Math.floor(Math.random() * (this.ballSpeedSum / 2) + 1);
      } else {
        this.speed.y = Math.floor(Math.random() * -(this.ballSpeedSum / 2) - 1);
      }
      if (this.speed.x > 0) {
        this.speed.x = this.ballSpeedSum - Math.abs(this.speed.y);
      } else {
        this.speed.x = (this.ballSpeedSum - Math.abs(this.speed.y)) * -1;
      }
    }
  }

  resetSpawn() {
    const randomSpawnPoint = Math.floor(
      Math.random() * (GAME_HEIGHT - this.size)
    );
    this.position.x = GAME_WIDTH / 2 - this.size / 2;
    this.position.y = randomSpawnPoint;
  }

  bounceOff() {
    //change speed -5 ->> Bounce off wall ->> Bounce off racketL
    //change speed +5 ->> Bounce off wall ->> Bounce off racketR
  }
}
