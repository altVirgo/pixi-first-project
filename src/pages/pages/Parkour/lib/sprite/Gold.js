import { Container, Assets, Texture, Rectangle, Ticker } from "pixi.js";
import GoldItem from "./GoldItem";
import { hitTestRectangle } from "../util/util";
export default class Gold extends Container {
  constructor(config, options, instance) {
    super();
    this.config = config;
    this.options = options;
    this.instance = instance;
    this.width = instance.instance.screen.width;
    this.height = instance.instance.screen.height - config.grisWidth*2;
    // this.sprites = [];
  }
  #timer;
  initTimer() {
    this.#timer && clearInterval(this.#timer);
    this.#timer = setInterval(() => {
      let goldItem = new GoldItem(this.config, this.options, this.instance);
      // console.log(goldItem)
      // this.sprites.push(goldItem);
      // console.log(this.sprites);
      this.addChild(goldItem);
    }, 1000);
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
  drawFromMatrix(data){
    data.map((span) => {
        return span
          .filter((col) => col)
          .map(({ x, y }) => {
            this.addChild(goldItem);
            return [parseInt(x / this.step), parseInt(y / this.step)];
          });
      });
  }
}
