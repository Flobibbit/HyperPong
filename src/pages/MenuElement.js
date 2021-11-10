import { GAME_WIDTH, GAME_HEIGHT } from "/src/pages/constant.js";

export default class MenuElement {
  constuctor({
    name,
    pxSize = "50",
    color = "white",
    colorActive = "yellow",
    locationHeight,
    locationWidth = GAME_WIDTH / 2,
    statePl1 = false,
    statePl2 = false,
    checkBox = null
  } = {}) {
    this.name = name; // String that will be displayed in the menu
    this.pxSize = pxSize; // Font Size of the text
    this.color = color; // default color of the text
    this.colorActive = colorActive; // color of the text, if this menu element is selected by a player

    this.locationWidth = locationWidth; // x coordinate of the menu element (according to screensize)
    this.locationHeight = locationHeight; //y coordinate of the menu element (according to screensize))

    this.statePl1 = statePl1; // true | false wether Player 1 has this menu element selected
    this.statePl2 = statePl2; // true | false wether Player 2 is on start screen & has this menu element selected
    this.textWidth = 0; // Width of the textstring, will be computed via reading it from ctx (render context)

    this.checkBox = checkBox; // receives a checkbox element via new MenuCheckbox(), that then will be rendered next to the text string
  }
  draw(ctx) {
    this.textWidth = ctx.measureText(this.name).width;

    if (this.statePl1 == true) {
      ctx.fillStyle = this.colorActive;
      this.drawTrianglePl1(ctx); //draws triangle next to the menu element selected by player 1
    } else {
      ctx.fillStyle = this.color;
      this.drawTrianglePl1(ctx); //draws triangle next to the menu element selected by player 1
    }

    if (this.statePl2 == true) {
      this.drawTrianglePl2(ctx); //draws triangle next to the menu element selected by player 2
    }

    //draws the menu element with the following settings & based on the ctx fillstyle
    ctx.font = this.pxSize + "px PressStart2P";
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
