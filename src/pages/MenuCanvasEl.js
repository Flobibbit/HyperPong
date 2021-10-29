import { GAME_WIDHT, GAME_HEIGHT } from "/src/pages/constant.js";
export default class MenuCanvasEl {
  constructor(sName,pxSize =null, colourGrading = null) {
    this.activeState = false;
    this.colorActive = "red";

    this.pxSize = pxSize || "60"
    this.sName = sName;
    this.colourGrading = colourGrading || "red";
  }
  draw(ctx) {
    // ctx.rect(0, 0, this.gameWidht, this.gameHeight);
    //ctx.fillStyle = "#000000AA";
    //ctx.fill();

    ctx.font = this.pxSize + "px PressStart2P";
    ctx.fillStyle = this.colourGrading;
    ctx.textAlign = "center";
    ctx.fillText(this.sName, GAME_WIDHT / 2, GAME_HEIGHT / 2);
  }
}
