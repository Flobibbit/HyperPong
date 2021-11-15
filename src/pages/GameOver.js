
export default class GameOver {
  constructor(scoreL, scoreR){
    this.scoreR=scoreR
    this.scoreL=scoreL
    if(scoreR>scoreL){
      this.winner="Right"
    }else{
      this.winner="Left"
    }
  }
  GameOverScreen(){
    console.log("Game Over")
    console.log("Winner:" + this.winner)
  }
}