export default class Ball {
  constructor(game) {
    
    this.game=game
    console.log(this.game)
    this.image = document.getElementById("img_pongBall");

    this.position = { x: 200, y: 20 };
    this.speed = { x: 3, y: -3 };

    this.size = 18;
    this.gameHeight = game.gameHeight;
    this.gameWidht = game.gameWidht;
    this.racketL = game.racketL;
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
    //abprallen von Wand
    if (this.position.y > this.gameHeight - this.size) this.speed.y = -5;
    if (this.position.y < 0) this.speed.y = 5;
    //console.log(this.game.racketL.position)
    //console.log(this.game.racketL.height)
    //console.log(this.position.x)
    //abprallen von den Rackets
    if(this.position.x<this.game.racketL.position.x+this.game.racketL.width){
      console.log(this.position.y)
      console.log(this.game.racketL.position.y)
      console.log(this.game.racketL.position.y+this.game.racketL.height)
      if(this.position.y>=this.game.racketL.position.y&&this.position.y<=this.game.racketL.position.y+this.game.racketL.height){
        this.speed.x*=-1
        console.log("hit L")
      }else{
        console.log("miss L")
        this.resetSpawn();
        this.speed.x = 5;
      }
    }
    if(this.position.x>this.game.racketR.position.x-this.game.racketR.width){
      console.log(this.position.y)
      console.log(this.game.racketR.position.y)
      console.log(this.game.racketR.position.y+this.game.racketL.height)
      if(this.position.y>=this.game.racketR.position.y&&this.position.y<=this.game.racketR.position.y+this.game.racketR.height){
        this.speed.x*=-1
        console.log("hit R")
      }else{
        console.log("miss R")
        this.resetSpawn();
      this.speed.x = -5;
      }
      //if(this.position.y)
    }
    
  }

  resetSpawn() {
    const randomSpawnPoint = Math.floor(
      Math.random() * this.gameHeight - this.size
    );
    this.position.x = this.gameWidht / 2 - this.size / 2;
    this.position.y = randomSpawnPoint;
  }
}
