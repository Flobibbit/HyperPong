import InputHandler from "/src/pages/Input.js";
import Menu from "/src/pages/Menu.js";
import Game from "/src/pages/game.js";

const GAMESTATE = {
  MENU: 0,
  INGAME: 1
};
export default class GameMaster {
  constructor(ctx) {
    this.gamestate = GAMESTATE.INGAME;

    this.menu = new Menu();
    this.game = new Game();

    new InputHandler(this.game.gameObjects, this.menu);
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
  }
}
