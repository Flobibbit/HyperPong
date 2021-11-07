import { GAME_WIDHT, GAME_HEIGHT } from "/src/pages/constant.js";
export default class MenuCanvasEl {
  constructor(
    sName,
    locationHeight,
    pxSize = null,
    color = null,
    locationWidht = null,
    picedStateColor = false,
    picedStatePl1 = false,
    picedStatePl2 = false,
    colorActive = null
  ) {
    this.sName = sName;
    this.locationHeight = locationHeight;
    this.pxSize = pxSize || "50";
    this.color = color || "white";
    this.locationWidht = locationWidht || GAME_WIDHT / 2;
    this.picedStateColor = picedStateColor;
    this.picedStatePl1 = picedStatePl1;
    this.picedStatePl2 = picedStatePl1;
    this.colorActive = colorActive || "yellow";
    this.textWidht = 0;
  }
  draw(ctx) {
    // ctx.rect(0, 0, this.gameWidht, this.gameHeight);
    //ctx.fillStyle = "#000000AA";
    //ctx.fill();
    if (this.picedStateColor == true) {
      ctx.fillStyle = this.colorActive;
      this.textWidht = ctx.measureText(this.sName).width;
      this.drawTrianglePl1(ctx);
    } else {
      ctx.fillStyle = this.color;
    }
    if (this.picedStatePl1 == true) {
      this.textWidht = ctx.measureText(this.sName).width;
      this.drawTrianglePl1(ctx);
      /* ctx.lineWidth = "9";
      ctx.strokeStyle = "red";
      2;
      ctx.strokeRect(
        this.locationWidht - 30 - this.textWidht / 2,
        this.locationHeight - 7 - this.pxSize,
        this.textWidht + 50,
        70
      );*/

      
    }
    if (this.picedStatePl2 == true) {
      this.textWidht = ctx.measureText(this.sName).width;
        this.drawTrianglePl2(ctx);
      }

    ctx.font = this.pxSize + "px PressStart2P";
    ctx.textAlign = "center";
    ctx.fillText(this.sName, this.locationWidht, this.locationHeight);
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
      GAME_WIDHT / 2 + this.textWidht / 2 +30,
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
