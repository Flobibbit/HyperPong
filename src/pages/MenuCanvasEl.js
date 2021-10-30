import { GAME_WIDHT, GAME_HEIGHT } from "/src/pages/constant.js";
export default class MenuCanvasEl {
  constructor(sName, locationHeight, pxSize = null, color = null,locationWidht=null, picedState = false,colorActive =null) {
    this.sName = sName;
    this.locationHeight=locationHeight
    this.pxSize = pxSize || "60";
    this.color = color || "white"; 
    this.locationWidht=locationWidht || GAME_WIDHT/2
    this.picedState = picedState;
    this.colorActive = colorActive || "red";

    
  }
  draw(ctx) {
    // ctx.rect(0, 0, this.gameWidht, this.gameHeight);
    //ctx.fillStyle = "#000000AA";
    //ctx.fill();
    if (this.picedState == true) {
      ctx.fillStyle = this.colorActive;
    } else {
      ctx.fillStyle = this.color;
    }
    ctx.font = this.pxSize + "px PressStart2P";
    ctx.textAlign = "center";
    ctx.fillText(this.sName, this.locationWidht, this.locationHeight);
  }

  changePicedState() {}
}
