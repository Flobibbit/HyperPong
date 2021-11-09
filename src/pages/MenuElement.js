import { GAME_WIDHT, GAME_HEIGHT } from "/src/pages/constant.js";

constuctor({p1 = 'string',p2 = false, p3, p4} = {}) {
  
}

new MenuElement({p4: false, p1: '', })

export default class MenuElement {
  constructor(
    sName,
    locationHeight,
    pxSize = null,
    color = null,
    locationWidht = null,
    pickedStateColor = false,
    pickedStatePl1 = false,
    pickedStatePl2 = false,
    colorActive = null
  ) {
    this.sName = sName;
    this.locationHeight = locationHeight;
    this.pxSize = pxSize || "50";
    this.color = color || "white";
    this.locationWidht = locationWidht || GAME_WIDHT / 2;
    this.pickedStateColor = pickedStateColor;
    this.pickedStatePl1 = pickedStatePl1;
    this.pickedStatePl2 = pickedStatePl1;
    this.colorActive = colorActive || "yellow";
    this.textWidht = 0;
  }
  draw(ctx) {
    // ctx.rect(0, 0, this.gameWidht, this.gameHeight);
    //ctx.fillStyle = "#000000AA";
    //ctx.fill();
    this.textWidht = ctx.measureText(this.sName).width;
    if (this.pickedStateColor == true) {
      ctx.fillStyle = "red";
      this.drawTrianglePl1(ctx);
      ctx.fillStyle = this.colorActive;
    } else {
      ctx.fillStyle = this.color;
    }
    if (this.pickedStatePl1 == true) {
      this.drawTrianglePl1(ctx);
    }
    if (this.pickedStatePl2 == true) {
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
