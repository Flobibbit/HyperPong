import { GAME_WIDHT, GAME_HEIGHT } from "/src/pages/constant.js";

/*constructor(
  name,
  locationHeight,
  (pxSize = null),
  (color = null),
  (locationWidht = null),
  (StateColor = false),
  (StatePl1 = false),
  (StatePl2 = false),
  (colorActive = null)
);*/
export default class MenuElement {
  constuctor({
    name,
    pxSize = "50",
    color = "white",
    colorActive = "yellow",
    locationHeight,
    locationWidht = GAME_WIDHT / 2,
    StateColor = false,
    StatePl1 = false,
    StatePl2 = false,
    checkBox = null
  } = {}) {
    this.name = name; // String that will be displayed in the menu
    this.pxSize = pxSize; // Font Size of the text
    this.color = color; // default color of the text
    this.colorActive = colorActive; // color of the text, if this menu element is selected by a player

    this.locationWidht = locationWidht; // x coordinate of the menu element (according to screensize)
    this.locationHeight = locationHeight; //y coordinate of the menu element (according to screensize))

    this.StateColor = StateColor; //true | false wether Player1 has this menu element selected ..........................
    this.StatePl1 = StatePl1; // true | false wether Player 1 has this menu element selected
    this.StatePl2 = StatePl2; // true | false wether Player 2 is on start screen & has this menu element selected
    this.textWidht = 0; // Width of the textstring, will be computed via reading it from ctx (render context)

    this.checkBox = checkBox; // receives a checkbox element via new MenuCheckbox(), that then will be rendered next to the text string
  }
  draw(ctx) {
    this.textWidht = ctx.measureText(this.name).width;

    if (this.StateColor == true) {
      ctx.fillStyle = "red"; //color of the triangle
      this.drawTrianglePl1(ctx); //draw triangle next to the menu element selected by player 1
      ctx.fillStyle = this.colorActive;
    } else {
      ctx.fillStyle = this.color;
    }

    if (this.StatePl1 == true) {
      this.drawTrianglePl1(ctx); //draw triangle next to the menu element selected by player 1
    }

    if (this.StatePl2 == true) {
      this.drawTrianglePl2(ctx); //draw triangle next to the menu element selected by player 2
    }

    //draw the menu Element with the following settings
    ctx.font = this.pxSize + "px PressStart2P";
    ctx.textAlign = "center";
    ctx.fillText(this.name, this.locationWidht, this.locationHeight);
  }

  drawTrianglePl1(ctx) {
    ctx.beginPath();
    ctx.moveTo(
      GAME_WIDHT / 2 - this.textWidht / 2 - 30,
      this.locationHeight - this.pxSize / 2 - 5
    );
    ctx.lineTo(
      GAME_WIDHT / 2 - this.textWidht / 2 - 70,
      this.locationHeight - this.pxSize / 2 - 5 + 20
    );
    ctx.lineTo(
      GAME_WIDHT / 2 - this.textWidht / 2 - 70,
      this.locationHeight - this.pxSize / 2 - 5 - 20
    );
    ctx.fill();
  }
  drawTrianglePl2(ctx) {
    ctx.beginPath();
    ctx.moveTo(
      GAME_WIDHT / 2 + this.textWidht / 2 + 30,
      this.locationHeight - this.pxSize / 2 - 5
    );
    ctx.lineTo(
      GAME_WIDHT / 2 + this.textWidht / 2 + 70,
      this.locationHeight - this.pxSize / 2 - 5 + 20
    );
    ctx.lineTo(
      GAME_WIDHT / 2 + this.textWidht / 2 + 70,
      this.locationHeight - this.pxSize / 2 - 5 - 20
    );
    ctx.fill();
  }
}
