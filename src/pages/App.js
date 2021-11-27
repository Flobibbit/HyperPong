import GameMaster from "/src/pages/GameMaster.js";
import { GAME_WIDTH, GAME_HEIGHT } from "/src/pages/constant.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

let lastTime = 0;

//Create and start the game
const game = new GameMaster(ctx);

//runs every frame -- calculates how much time has passed -- clears the screen -- updates the paddle --redraws the racket -- calls gameloop again with the next frames-timestamp
function gameLoop(timeStamp) {
  //let deltaTime = timeStamp - lastTime;.........................???
  lastTime = timeStamp;

  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  2;

  ctx.fillStyle = "#242321";
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  game.draw(ctx);
  game.update(lastTime);

  //when next frame is ready -- every frame --source of the timestamp
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
