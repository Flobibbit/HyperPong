export default class AudioPlayer {
  constructor() {
    this.music = document.getElementById("music"); //recieves an audio included into the index.html
    //interact with the document

    //this.soundScroll = document.getElementById("scroll");//recieves an audio included into the index.html
    //this.soundEnter = document.getElementById("enter");//recieves an audio included into the index.html

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
    console.log("Music: " + this.musicState);
  }
  changeSoundState() {
    if (this.soundState) {
      this.soundState = false;
      this.soundStop();
    } else {
      this.soundState = true;
    }
    console.log("Sound: " + this.soundState);
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
}
