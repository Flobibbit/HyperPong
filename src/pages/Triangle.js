import { GAME_WIDHT, GAME_HEIGHT } from "/src/pages/constant.js";
export default class Triangle{
    constructor(color){


        this.position = {
            x: 200,
            y: 200,
          };



    }
    draw(ctx){
        ctx.beginPath();
        ctx.moveTo(this.position.x, this.position.y);
        ctx.lineTo(this.position.x+50,this.position.y+25);
        ctx.lineTo(this.position.x, this.position.x+50);
        ctx.fill() 

     /*   ctx.beginPath();
        ctx.moveTo(50, 50);
        ctx.lineTo(100, 75);
        ctx.lineTo(50, 100);
        ctx.fill()*/
    }
}