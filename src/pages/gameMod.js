import MenuElement from "./MenuElement.js";
import { GAME_WIDTH, GAME_HEIGHT } from "/src/pages/constant.js";

export default class gameMods{
  constructor(){
    this.modTime=7000.0
    this.modActive = [false, false, false, false]
    this.modNames = ["Random Bounce", "Speed Up", "Inverted Controlls"]
    this.modStartTime = [0,0,0,0]
    //timerStart=
    this.timer=5000.0
    this.timeLeftInt=0
    this.timeLeftStart=0
    this.timeLeft = new MenuElement({
      name: "20",
      pxSize: 40,
      locationHeight: GAME_HEIGHT / 8,
      locationWidth: GAME_WIDTH / 2
    });
    this.modDisplayItems = []
  }
  update(timeStamp){
    if (this.timeLeftStart==0){
      this.timeLeftStart = timeStamp
      //console.log(this.timeLeftStart)
    }
    this.timeLeftInt=this.timer-(timeStamp-this.timeLeftStart)
       this.timeLeft.name = Math.round(this.timeLeftInt/1000).toString()
    //console.log("Zeit:" +timeStamp)
    if(this.timeLeftInt <="-1"){
      this.timeLeftStart=timeStamp
      this.modActivate(Math.floor(Math.random()*3), timeStamp)
    }
    for (let i in this.modActive){
      if(this.modActive[i]){
        if(timeStamp-this.modStartTime[i]>=this.modTime){
          this.modDeactivate(i)
          console.log("Mod" + i +" deaktiviert")
        }
      }
    }

  }
  modDeactivate(mod){
    this.modActive[mod]=false
    this.manageModDisplay()
  }
  manageModDisplay(){
    var activeMods = []
    for (let i in this.modActive){
      if(this.modActive[i]){
        console.log("Dranhängen: " + i)
        activeMods.push(
          new MenuElement({
            name: this.modNames[i],
            pxSize: 20,
            locationHeight: GAME_HEIGHT / 8*7,
            locationWidth: GAME_WIDTH / 2,
            color: "#bc42f5"
          })
        )
      }
    }
    var amountOfActiveMods = this.amountOfModsActive()
    for(let i = 0; i<amountOfActiveMods; i++){
      activeMods[i].locationWidth = GAME_WIDTH / (amountOfActiveMods+1)*(i+1)
    }
    this.modDisplayItems = activeMods
    console.log(this.modDisplayItems)
  }

  amountOfModsActive(){
    var amountOfActiveMods = 0
    for(let i of this.modActive){
      if(i){
        amountOfActiveMods += 1
      }
    }
    return amountOfActiveMods
  }
  draw(ctx){
    this.timeLeft.draw(ctx)
    for(let i of this.modDisplayItems){
      console.log(i)
      i.draw(ctx)
    }
    
  }
  modActivate(mod, timestamp){
    this.modActive[mod] = true
    this.modStartTime[mod] = timestamp
    this.manageModDisplay()
  }

  randomBounce() {
    return this.modActive[0]
  }
  speedUp(){
    return this.modActive[1]
  }
  invertedControlls(){
    return this.modActive[2]
  }

}
