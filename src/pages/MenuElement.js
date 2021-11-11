import { GAME_WIDTH, GAME_HEIGHT } from "/src/pages/constant.js";

export default class MenuElement {
  constructor(config = {}) {
    this.name = null; // String that will be displayed in the menu
    this.pxSize = 50; // Font Size of the text
    this.color = "white"; // default color of the text
    this.colorActive = "yellow"; // color of the text, if this menu element is selected by a player

    this.locationWidth = GAME_WIDTH / 2; // x coordinate of the menu element (according to screensize)
    this.locationHeight = 0; //y coordinate of the menu element (according to screensize))

    this.statePl1 = false; // true | false wether Player 1 has this menu element selected
    this.statePl2 = false; // true | false wether Player 2 is on start screen & has this menu element selected
    this.textWidth = 0; // Width of the textstring, will be computed via reading it from ctx (render context)

    this.checkBox = null; // receives a checkbox element via new MenuCheckbox(), that then will be rendered next to the text string
    this.disableColorActive = false; //if not set, defaults to false

    Object.assign(this, config);
  }
  draw(ctx) {
    this.textWidth = ctx.measureText(this.name).width;

    ctx.fillStyle = this.color;
    if (this.statePl1) {
      if (!this.disableColorActive) ctx.fillStyle = this.colorActive;
      this.drawTrianglePl1(ctx);
    }
    if (this.statePl2) {
      // if (!this.disableColorActive) ctx.fillStyle = this.colorActive;
      this.drawTrianglePl2(ctx);
    }

    //draws the menu element with the following settings & based on the ctx fillstyle
    ctx.font = this.pxSize.toString() + "px PressStart2P";
    ctx.textAlign = "center";
    ctx.fillText(this.name, this.locationWidth, this.locationHeight);
  }

  drawTrianglePl1(ctx) {
    ctx.beginPath();
    ctx.moveTo(
      GAME_WIDTH / 2 - this.textWidth / 2 - 30,
      this.locationHeight - this.pxSize / 2 - 5
    );
    ctx.lineTo(
      GAME_WIDTH / 2 - this.textWidth / 2 - 70,
      this.locationHeight - this.pxSize / 2 - 5 + 20
    );
    ctx.lineTo(
      GAME_WIDTH / 2 - this.textWidth / 2 - 70,
      this.locationHeight - this.pxSize / 2 - 5 - 20
    );
    ctx.fill();
  }
  drawTrianglePl2(ctx) {
    ctx.beginPath();
    ctx.moveTo(
      GAME_WIDTH / 2 + this.textWidth / 2 + 30,
      this.locationHeight - this.pxSize / 2 - 5
    );
    ctx.lineTo(
      GAME_WIDTH / 2 + this.textWidth / 2 + 70,
      this.locationHeight - this.pxSize / 2 - 5 + 20
    );
    ctx.lineTo(
      GAME_WIDTH / 2 + this.textWidth / 2 + 70,
      this.locationHeight - this.pxSize / 2 - 5 - 20
    );
    ctx.fill();
  }
}
