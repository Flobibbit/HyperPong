export default class Ball {
  constructor(widht, height) {
    this.image = document.getElementById("img_pongBall");

    this.position = { x: 200, y: 20 };
    this.speed = { x: 5, y: -5 };

    this.size = 18;
    this.height = height;
    this.widht = widht;
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

  update(deltaTime) {
    this.position.x += this.speed.x;
    this.position.y += this.speed.y;

    if (this.position.y > this.height - this.size) this.speed.y = -5;
    if (this.position.y < 0) this.speed.y = 5;

    //Ball score right
    if (this.position.x > this.widht - this.size) {
      //spawn towards left
      this.resetSpawn();
      this.speed.x = -5;
    }

    //Ball scored left
    if (this.position.x < this.size) {
      //spawn towards right
      this.resetSpawn();

      this.speed.x = 5;
    }
  }

  resetSpawn() {
    const randomSpawnPoint = Math.floor(
      Math.random() * this.height - this.size
    );
    this.position.x = this.widht / 2 - this.size / 2;
    this.position.y = randomSpawnPoint;
  }
}
