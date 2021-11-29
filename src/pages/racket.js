import { GAME_WIDTH, GAME_HEIGHT } from "/src/pages/constant.js";
export default class Racket {
  constructor(location, color = "#ff0") {
    this.yellowMoveData={
      starttime: 0,
      duration: 800,
      activated: false,
      cooldownLength: 8000
    };
    this.blueMoveData={
      starttime: 0,
      duration: 1200,
      activated: false,
      speed: 6,
      speedUpSpeed: 12,
      cooldownLength: 6000
    };
    this.greenMoveData={
      starttime: 0,
      duration: 2000,
      activated: false,
      height: 150,
      cooldownLength: 6000
    };
    this.redMoveData={
      cooldownLength: 7000
    };
    this.ball=null;
    this.color = color;
    this.starttime = 0;
    this.timestamp = 0;
    this.width = 20;
    this.height = 100;
    this.timePassed;
    this.speed = 0;
    this.maxSpeed = 10;
    this.audioPlayer = null;

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
    ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    ctx.fillStyle = this.color;
    ctx.fillRect(this.position.x, this.position.y+this.height, this.width, -this.height*(this.timePassed/this.getCorrectMoveData().cooldownLength))
  }
  update(timestamp) {
    var correctMoveData=this.getCorrectMoveData()
    this.timestamp = timestamp
    if(this.starttime==0){
      this.starttime=timestamp
    }
    this.timePassed = timestamp-this.starttime
    if(this.timePassed>=correctMoveData.cooldownLength){
      this.timePassed = correctMoveData.cooldownLength
    }
    if(this.yellowMoveData.activated&&timestamp-this.yellowMoveData.starttime>this.yellowMoveData.duration){
      this.ball.ballColor="#FFFFFF"
      this.yellowMoveData.activated=false
    }
    if(this.blueMoveData.activated&&timestamp-this.blueMoveData.starttime>this.blueMoveData.duration){
      this.blueMoveData.activated=false
    }
    if(this.greenMoveData.activated&&timestamp-this.greenMoveData.starttime>this.greenMoveData.duration){
      this.greenMoveData.activated=false
      this.height=100
      this.position.y+=(this.greenMoveData.height-this.height)/2
    }
    this.position.y += this.speed;
    //Border control
    if (this.position.y < 0) this.position.y = 0;
    if (this.position.y + this.height > GAME_HEIGHT)
      this.position.y = GAME_HEIGHT - this.height;
  }

  getCorrectMoveData(){
    switch (this.color) {
      case "red":
        return this.redMoveData
      case "yellow":
        return this.yellowMoveData
      case "blue":
        return this.blueMoveData
      case "green":
        return this.greenMoveData
      default:
      console.log("Farbe ungülitg")
        break;
    }
  }
  correctTimesAfterPause(timeCorrection){
    this.starttime+=timeCorrection
    var correctMoveData=this.getCorrectMoveData()
    if(correctMoveData!=this.redMoveData){
    console.log(this.getCorrectMoveData().starttime)
    correctMoveData.starttime+=timeCorrection
    }
  }
  activateSpecialMove(){
    console.log("Special move")
    if(this.timePassed>=this.getCorrectMoveData().cooldownLength){
    this.starttime = this.timestamp
    switch (this.color) {
      case "red":
        this.specialMoveRed()
        break;
      case "yellow":
        this.specialMoveYellow()
        this.audioPlayer.playInvisible()
        break;
      case "blue":
        this.specialMoveBlue()
        this.audioPlayer.playSlowDown()
        break;
      case "green":
       this.specialMoveGreen()
       this.audioPlayer.playPowerUp()
        break;
      default:
      console.log("Farbe ungülitg")
        break;
    }
    }
  }

  specialMoveRed(){
    this.ball.yBounce()
  }
  specialMoveYellow(){
    this.ball.ballColor="#242321"
    this.yellowMoveData.activated=true
    this.yellowMoveData.starttime=this.timestamp
  }

  specialMoveBlue(){
    this.blueMoveData.activated=true
    this.blueMoveData.starttime=this.timestamp
  }
  specialMoveGreen(){
    this.position.y-=(this.greenMoveData.height-this.height)/2
    this.height=this.greenMoveData.height
    
    this.greenMoveData.activated=true
    this.greenMoveData.starttime=this.timestamp
    this.position.y
    /*this.position.y=this.ball.position.y+this.ball.size/2-this.height/2
    console.log(this.ball.position.y+this.ball.size/2)
    console.log(this.position.y+this.height/2)*/
  }
}

 
