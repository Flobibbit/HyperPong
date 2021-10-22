import Racket from "/src/pages/racket.js";
import InputHandler from "/src/pages/input.js";
import Ball from "/src/pages/ball.js";

let canvas = document.getElementById("gameScreen");
let ctx = canvas.getContext("2d");

const GAME_WIDHT = 1400;
const GAME_HEIGHT = 900;

//Objects in the game
const racketR = new Racket(GAME_WIDHT, GAME_HEIGHT, "r");
const racketL = new Racket(GAME_WIDHT, GAME_HEIGHT, "l");
const rackets = [racketL, racketR];

const ball = new Ball(GAME_WIDHT, GAME_HEIGHT);

let lastTime = 0;

new InputHandler(rackets);
//gameLoop(lastTime);

//runs every frame -- calculates how much time has passed -- clears the screen -- updates the paddle --redraws the racket -- calls gameloop again with the next frames-timestamp
function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  ctx.clearRect(0, 0, GAME_WIDHT, GAME_HEIGHT);

  ctx.fillStyle = "#242321";
  ctx.fillRect(0, 0, GAME_WIDHT, GAME_HEIGHT);

  ball.draw(ctx);
  ball.update(deltaTime);
  for (const racket of rackets) {
    racket.draw(ctx);
    racket.update(deltaTime);
  }
  //when next frame is ready -- every frame --source of the timestamp
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);
