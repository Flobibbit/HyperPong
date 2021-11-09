export default class AudioPlayer {
  constructor() {
    this.music = document.getElementById("music");

    this.soundScroll = document.getElementById("scroll");
    this.soundEnter = document.getElementById("enter");

    this.musicTracks = [this.music];
    this.sounds = [this.soundScroll, this.soundEnter];
  }
  changeAudioState() {}
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
