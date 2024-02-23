import { Container, Assets, Texture, Rectangle, Ticker } from "pixi.js";
// import TrapItem from "./TrapItem";
import { hitTestRectangle } from "../util/util";
let span;
let col;
export default class Grid extends Container {
  constructor(config = {}, options = {}, app) {
    super();
    this.config = config;
    this.app = app;

    this.width = app.instance.screen.width;
    this.height = app.instance.screen.height;
    this.gridWidth = this.gridHeight = this.step = parseInt(app.instance.screen.height / config.gridCount);
    console.log(parseInt(app.instance.screen.height / config.gridCount));
    this.init();
  }
  init() {
    let col = this.config.gridCount;
    let span = Math.round(this.app.instance.screen.width / this.gridWidth);
    this.grids = [];
    for (let i = 0; i < col; i++) {
      for (let j = 0; j < span; j++) {
        this.grids.push([i * this.step, j * this.step, this.step, this.step]);
      }
    }
  }
}
