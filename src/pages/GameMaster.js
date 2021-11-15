import InputHandler from "/src/pages/InputHandler.js";
import Menu from "/src/pages/Menu.js";
import Game from "/src/pages/game.js";
import AudioPlayer from "./AudioPlayer.js";

const GAMESTATE = {
  MENU: 0,
  INGAME: 1
};
export default class GameMaster {
  constructor(ctx) {
    this.gamestate = GAMESTATE.INGAME;

    this.menu = new Menu();
    this.game = new Game();
    this.audioPlayer = new AudioPlayer();
    //this.audioPlayer.music.play();
    new InputHandler(
      this.game.gameObjects,
      this.menu,
      this.gamestate,
      this.audioPlayer
    );
  }

  start() {
    this.gamestate = GAMESTATE.INGAME;
  }

  draw(ctx) {
    if (this.gamestate == GAMESTATE.MENU) {
      //Draw Menu-Elements
      this.menu.draw(ctx);
    } else {
      //Draw Game-Elements
      this.game.draw(ctx);
    }
  }

  update(timestamp) {
    this.game.update(timestamp);
    this.menu.update();
  }
}
