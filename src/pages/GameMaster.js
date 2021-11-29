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

    new InputHandler(
      this.menu,
      this.audioPlayer
    );
  
  }

  draw(ctx) {
    //Draw Menu-Elements
    this.menu.draw(ctx);
  }

  update(timestamp) {
    this.menu.update(timestamp);
  }
}
