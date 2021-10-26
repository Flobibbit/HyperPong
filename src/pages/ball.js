export default class Ball {
  constructor(game) {
    
    this.game=game
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
    //abprallen von den Rackets und Punkt ende
    //linker Racket
    if(this.position.x<=this.game.racketL.position.x+this.game.racketL.width){
      if(this.position.y+this.size/2>=this.game.racketL.position.y&&this.position.y-this.size/2<=this.game.racketL.position.y+this.game.racketL.height){
        //hit
        this.speed.x*=-1
        
      }else{
        //miss
        this.resetSpawn();
        this.speed.x = 5;
      }
    }
    //rechter Racket
    if(this.position.x>=this.game.racketR.position.x-this.game.racketR.width){
      if(this.position.y+this.size/2>=this.game.racketR.position.y&&this.position.y-this.size/2<=this.game.racketR.position.y+this.game.racketR.height){
        //hit
        this.speed.x*=-1
        }else{
        //miss
        this.resetSpawn();
      this.speed.x = -5;
      }
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
