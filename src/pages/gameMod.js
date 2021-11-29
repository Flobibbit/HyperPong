import MenuElement from "./MenuElement.js";
import { GAME_WIDTH, GAME_HEIGHT } from "/src/pages/constant.js";

export default class GameMod {
  constructor() {
    this.audioPlayer = null;
    //MODS
    this.modTime = 6000.0;
    this.modActive = [false, false, false, false];
    this.modNames = [
      "Random Bounce",
      "Speed Up",
      "Inverted Controlls",
      "Dodgeball"
    ];

    //TIME
    this.timer = 3000.0;
    this.timeLeftInt = 0;
    this.timeLeftStart = 0;

    this.timeLeft = new MenuElement({
      name: "",
      pxSize: 40,
      locationHeight: GAME_HEIGHT / 8,
      locationWidth: GAME_WIDTH / 2,
      color: "#bc42f5"
    });
    
    //MOD & TIME
    this.modStartTime = [0, 0, 0, 0];
    this.modRemainingTime = [0, 0, 0, 0];
    this.modDisplayItems = [];
    this.modDisplayTimes = [];
  }

  draw(ctx) {
    this.timeLeft.draw(ctx);
    for (let i in this.modDisplayItems) {
      this.modDisplayItems[i].draw(ctx);
      this.modDisplayTimes[i].draw(ctx);
    }
  }

  update(timeStamp) {
    if (this.timeLeftStart == 0) {
      this.timeLeftStart = timeStamp;
    }
    this.timeLeftInt = this.timer - (timeStamp - this.timeLeftStart);
    if (this.timeLeftInt <= "0") {
      this.timeLeftStart = timeStamp;
      this.modActivate(Math.floor(Math.random() * 4), timeStamp);
    }
    this.timeLeft.name = Math.ceil(this.timeLeftInt / 1000).toString();
    for (let i in this.modActive) {
      if (this.modActive[i]) {
        if (timeStamp - this.modStartTime[i] >= this.modTime) {
          this.modDeactivate(i);
        }
        this.modRemainingTime[i] =
          Math.floor(
            (this.modTime - (timeStamp - this.modStartTime[i])) / 1000
          ) + 1;
      }
    }
    this.manageModDisplay();
  }

  modDeactivate(mod) {
    this.modActive[mod] = false;
  }
  manageModDisplay() {
    var activeMods = [];
    var activeModTimes = [];
    for (let i in this.modActive) {
      if (this.modActive[i]) {
        activeMods.push(
          new MenuElement({
            name: this.modNames[i],
            pxSize: 20,
            locationHeight: (GAME_HEIGHT / 8) * 7,
            locationWidth: GAME_WIDTH / 2,
            color: "#bc42f5"
          })
        );
        activeModTimes.push(
          new MenuElement({
            name: this.modRemainingTime[i],
            pxSize: 18,
            locationHeight: (GAME_HEIGHT / 8) * 7 + 23,
            locationWidth: GAME_WIDTH / 2,
            color: "#bc42f5"
          })
        );
      }
    }
    var amountOfActiveMods = this.amountOfModsActive();
    for (let i = 0; i < amountOfActiveMods; i++) {
      activeMods[i].locationWidth =
        (GAME_WIDTH / (amountOfActiveMods + 1)) * (i + 1);
      activeModTimes[i].locationWidth = activeMods[i].locationWidth;
    }
    this.modDisplayItems = activeMods;
    this.modDisplayTimes = activeModTimes;
  }

  amountOfModsActive() {
    var amountOfActiveMods = 0;
    for (let i of this.modActive) {
      if (i) {
        amountOfActiveMods += 1;
      }
    }
    return amountOfActiveMods;
  }

  modActivate(mod, timestamp) {
    this.audioPlayer.playNewMod();
    this.modActive[mod] = true;
    this.modStartTime[mod] = timestamp;
    if (this.timer > 3000) this.timer -= 1000;
    if (this.modTime < 6000) this.modTime += 500;
  }

  randomBounce() {
    return this.modActive[0];
  }
  speedUp() {
    return this.modActive[1];
  }
  invertedControlls() {
    return this.modActive[2];
  }
  racketMiss() {
    return this.modActive[3];
  }
}
