import MenuElement from "./MenuElement.js";
import { GAME_WIDTH, GAME_HEIGHT } from "/src/pages/constant.js";

export default class gameMods{
  constructor(){
    this.modTime=5000
    this.modActive = [false, false, false, false]
    this.modStartTime = [0,0,0,0]
    //timerStart=
    this.time=20000.0
    this.timeLeftInt=0
    this.timeLeftStart=0
    this.timeLeft = new MenuElement({
      name: "20",
      pxSize: 40,
      locationHeight: GAME_HEIGHT / 8,
      locationWidth: GAME_WIDTH / 2
    });
  }
  update(timeStamp){
    if (this.timeLeftStart==0){
      this.timeLeftStart = timeStamp
      //console.log(this.timeLeftStart)
    }
    this.timeLeftInt=this.time-(timeStamp-this.timeLeftStart)
       this.timeLeft.name = Math.round(this.timeLeftInt/1000).toString()
    //console.log("Zeit:" +timeStamp)
    if(this.timeLeft.name =="-1"){
      this.timeLeftStart=timeStamp
    }
    for (let i in this.modActive){
      if(this.modActive[i]){
        if(timeStamp-this.modStartTime[i]>=this.modTime){
          this.modActive[i]=false
          console.log("Mod" + i +" deaktiviert")
        }
      }
    }
  }
  draw(ctx){
    this.timeLeft.draw(ctx)
  }
  modActivate(mod, timestamp){
    this.modActive[mod] = true
    this.modStartTime[mod] = timestamp
    console.log("Mod " + mod + " akiviert")
  }

}
