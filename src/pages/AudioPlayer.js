export default class AudioPlayer {
  constructor() {
    this.music = document.getElementById("music"); //recieves an audio included into the index.html
    this.music.loop = true
    //MENU
    this.scrollDown = document.getElementById("scrollDown");
    this.scrollUp = document.getElementById("scrollUp");
    this.enterSound = document.getElementById("enter");
    this.pauseSound = document.getElementById("pause");
    this.gameOverSound = document.getElementById("gameOver");

    //INGAME
    this.hitLeft = document.getElementById("hitLeft");
    this.hitRight = document.getElementById("hitRight");
    this.powerUp = document.getElementById("powerUp");
    this.invisible = document.getElementById("invisible");
    this.slowDown = document.getElementById("slowDown");
    this.newMod = document.getElementById("newMod");

    this.musicTracks = [this.music];
    this.sounds = [this.soundScroll, this.soundEnter];

    this.musicState = false;
    this.soundState = true;
  }
  changeMusicState() {
    if (this.musicState) {
      this.musicState = false;
      this.music.pause();
    } else {
      this.musicState = true;
      this.music.play();
    }
  }
  changeSoundState() {
    if (this.soundState) {
      this.soundState = false;
      this.soundStop();
    } else {
      this.soundState = true;
    }
  }
  musicStop() {
    for (const obj of Object.values(this.musicTracks)) {
      // obj.stop();
    }
  }
  soundStop() {
    for (const obj of Object.values(this.sounds)) {
      //obj.stop();
    }
  }

  playScrollDown() {
    if (this.soundState) this.scrollDown.play();
  }
  playScrollUp() {
    if (this.soundState) this.scrollUp.play();
  }
  playHitLeft() {
    if (this.soundState) this.hitLeft.play();
  }
  playHitRight() {
    if (this.soundState) this.hitRight.play();
  }
  playEnter() {
    if (this.soundState) this.enterSound.play();
  }
  playPause() {
    if (this.soundState) this.pauseSound.play();
  }
  playGameOver() {
    if (this.soundState) this.gameOverSound.play();
  }
  playPowerUp() {
    if (this.soundState) this.powerUp.play();
  }
  playInvisible() {
    if (this.soundState) this.invisible.play();
  }
  playSlowDown() {
    if (this.soundState) this.slowDown.play();
  }
  playNewMod() {
    if (this.soundState) this.newMod.play();
  }
}
