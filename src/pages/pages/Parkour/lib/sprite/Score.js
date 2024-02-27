import { Text } from "pixi.js";
export default class Score extends Text {
  constructor() {
    super();
    this.x = 20;
    this.y = 20;
    this.label = "分数";
    this.score = 0;
    this.split = ":";
    this.init();
  }
  init() {
    this.text = this.label + this.split + this.score;
  }
  updateScore(score) {
    this.score += score||1;
    this.text = this.label + this.split + this.score;
  }
  reset(){
    this.score = 0
    this.init()
  }
}
