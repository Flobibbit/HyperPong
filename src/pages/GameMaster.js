import InputHandler from "/src/pages/Input.js";
import Menu from "/src/pages/Menu.js";
import Game from "/src/pages/game.js";
import MusicPlayer from "/src/pages/MusicPLayer.js";

const GAMESTATE = {
  MENU: 0,
  INGAME: 1
};
export default class GameMaster {
  constructor(ctx) {
    this.gamestate = GAMESTATE.MENU;

    this.menu = new Menu();
    this.game = new Game();
    this.musicPl = new MusicPlayer();
this.musicPl.audio.play()
    new InputHandler(this.game.gameObjects, this.menu, this.gamestate);
  }

  start() {
    this.gamestate = GAMESTATE.MENU;
  }

  draw(ctx) {
    if (this.gamestate == GAMESTATE.MENU) {
      //Draw the menu
      this.menu.draw(ctx);
    } else {
      //Draw Game-Elements
      this.game.draw(ctx);
    }
  }

  update() {
    this.game.update();
    this.menu.update();
  }
}
