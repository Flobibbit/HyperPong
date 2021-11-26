import { GAME_WIDTH, GAME_HEIGHT } from "/src/pages/constant.js";
export default class Racket {
  constructor(location, color = "#ff0") {
    this.yellowMoveData={
      starttime: 0,
      duration: 1000,
      activated: false
    };
    this.ball=null;
    this.color = color;
    this.starttime = 0;
    this.timestamp = 0;
    this.cooldownLength= 5000;
    this.width = 20;
    this.height = 100;
    this.timePassed;
    this.speed = 0;
    this.maxSpeed = 10;

    switch (location) {
      case "l":
        this.position = {
          x: 40,
          y: GAME_HEIGHT / 2 - this.height / 2
        };
        break;
      case "r":
        this.position = {
          x: GAME_WIDTH - this.width - 40,
          y: GAME_HEIGHT / 2 - this.height / 2
        };
        break;
      default:
        alert("No location passed  L/R etc.");
        break;
    }
  }

  moveUp() {
    this.speed = -this.maxSpeed;
  }

  moveDown() {
    this.speed = this.maxSpeed;
  }
  stop() {
    //reduces shuttering while swichting direction
    this.speed = 0;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.fillStyle = "#DB7093"
    switch (this.color) {
      case "red":
        ctx.fillStyle = "#DB7093"
        break;
      case "yellow":
        ctx.fillStyle = "	#FFFACD"
        break;
      case "blue":
        ctx.fillStyle = "#00FFFF"
        break;
      case "green":
        ctx.fillStyle = "#AAFF00"
        break;
      default:
      ctx.fillStyle ="FFFFFF"
        break;
    }
    ctx.fillRect(this.position.x, this.position.y+this.height, this.width, -this.height*(this.timePassed/this.cooldownLength))
  }
  update(timestamp) {
    this.timestamp = timestamp
    if(this.starttime==0){
      this.starttime=timestamp
    }
    this.timePassed = timestamp-this.starttime
    if(this.timePassed>=this.cooldownLength){
      this.timePassed = this.cooldownLength
    }
    this.position.y += this.speed;
    //Border control
    if (this.position.y < 0) this.position.y = 0;
    if (this.position.y + this.height > GAME_HEIGHT)
      this.position.y = GAME_HEIGHT - this.height;
    if(this.yellowMoveData.activated&&timestamp-this.yellowMoveData.starttime>this.yellowMoveData.duration){
      this.ball.ballColor="#FFFFFF"
      this.yellowMoveData.activated=false
    }
  }

  activateSpecialMove(){
    console.log("Special move")
    if(this.timePassed>=this.cooldownLength){
    this.starttime = this.timestamp
    switch (this.color) {
      case "red":
        this.specialMoveRed()
        break;
      case "yellow":
        this.specialMoveYellow()
        break;
      case "blue":
        this.specialMoveBlue()
        break;
      case "green":
       this.specialMoveGreen()
        break;
      default:
      console.log("Farbe ungülitg")
        break;
    }
    }
  }

  specialMoveRed(){
    console.log("Special move Red getriggert")
    this.ball.yBounce()
  }
  specialMoveYellow(){
    this.ball.ballColor="#242321"
    this.yellowMoveData.activated=true
    this.yellowMoveData.starttime=this.timestamp
  }
  specialMoveBlue(){
    console.log("Special move Blue getriggert")
  }
  specialMoveGreen(){
    console.log("Special move green getriggert")
  }
}

 
