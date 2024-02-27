import { Container, Assets, Texture, Rectangle, Ticker } from "pixi.js";
import GoldItem from "./GoldItem";
import { hitTestRectangle } from "../util/util";
import level1 from "../data/level1";
import level2 from "../data/level2";
import levelOther from "../data/levelOther";
import levelText from "../data/levelText";
export default class Gold extends Container {
  constructor(config, options, instance) {
    super();
    this.config = config;
    this.step = config.gridWidth;
    this.options = options;
    this.instance = instance;
    this.width = instance.instance.screen.width;
    this.height = instance.instance.screen.height - config.gridWidth * 2;
    // this.sprites = [];
  }
  #timer;
  initTimer() {
    this.#timer && clearInterval(this.#timer);
    this.#timer = setInterval(() => {
      // let goldItem = new GoldItem(this.config, this.options, this.instance);
      // this.addChild(goldItem);
      // console.log(this.width,this.children)
      // this.width = this.instance.instance.screen.width;
      console.log('Gold',this.step)
      this.drawFromMatrix(levelText[parseInt(Math.random() * levelText.length)]);
    }, 3000);
  }
  start() {
    this.initTimer();
  }
  stop() {
    this.#timer && clearInterval(this.#timer);
  }
  restart() {
    if (this.children.length > 0) {
      this.removeChildren(0, this.children.length);
    }
    this.start();
  }
  drawFromMatrix(matrix) {
    matrix.map((span) => {
      return span.map(([x, y]) => {
        let goldItem = new GoldItem(
          this.config,
          { ...this.options, position: [parseInt(x * this.step) + this.instance.instance.screen.width, parseInt(y * this.step)] },
          this.instance
        );
        this.addChild(goldItem);
        // return [parseInt(x * this.step), parseInt(y * this.step)];
      });
    });
  }
}
