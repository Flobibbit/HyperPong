import Game from "/src/pages/game.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDHT = 1400;
const GAME_HEIGHT = 900;

let lastTime = 0;

const game = new Game(GAME_WIDHT, GAME_HEIGHT, ctx);
game.start();

//runs every frame -- calculates how much time has passed -- clears the screen -- updates the paddle --redraws the racket -- calls gameloop again with the next frames-timestamp
function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  ctx.clearRect(0, 0, GAME_WIDHT, GAME_HEIGHT);

  ctx.fillStyle = "#242321";
  ctx.fillRect(0, 0, GAME_WIDHT, GAME_HEIGHT);

  game.draw(ctx);
  game.update();

  //when next frame is ready -- every frame --source of the timestamp
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
