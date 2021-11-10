export default class AudioPlayer {
  constructor() {
    this.music = document.getElementById("music");

    this.soundScroll = document.getElementById("scroll");
    this.soundEnter = document.getElementById("enter");

    this.musicTracks = [this.music];
    this.sounds = [this.soundScroll, this.soundEnter];

    this.musicState = true;
    this.soundState = true;
  }
  changeMusicState() {
    if (this.musicState) {
      this.musicState = false;
      this.musicStop();
    } else {
      this.musicState = true;
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
      obj.stop();
    }
  }
  soundStop() {
    for (const obj of Object.values(this.sounds)) {
      obj.stop();
    }
  }
}
