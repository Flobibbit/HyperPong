import InputHandler from "/src/pages/InputHandler.js";
import Menu from "/src/pages/Menu.js";

import AudioPlayer from "./AudioPlayer.js";

const GAMESTATE = {
  MENU: 0,
  INGAME: 1
};
export default class GameMaster {
  constructor(ctx) {
    this.gamestate = GAMESTATE.MENU;

    this.menu = new Menu();
    this.audioPlayer = new AudioPlayer();

    //this.audioPlayer.music.play();
    new InputHandler(
      this.menu,
      this.gamestate,
      this.audioPlayer
    );
    this.start();
  }

  start() {
    /*
    delete this.game;
    console.log(this.game);

    this.gamestate = GAMESTATE.INGAME;

    //neu erstellen
    //this.game = new Game("#ff1", "#ff3");
    //console.log(this.game);*/
  }

  draw(ctx) {
    //Draw Menu-Elements
    this.menu.draw(ctx);

    //Draw Game-Elements

    /*if (typeof this.game != "undefined") {
        this.game.draw(ctx);
        console.log("Test");
      }*/
  }

  update(timestamp) {
    this.menu.update(timestamp);
  }
}
