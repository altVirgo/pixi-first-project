import { Container, Assets, Texture, Rectangle, Ticker } from "pixi.js";
import TrapItem from "./TrapItem";
import { hitTestRectangle } from "../util/util";
export default class Gold extends Container {
  constructor(config, options, instance) {
    super();
    this.config = config;
    this.options = options;
    this.instance = instance;
    this.width = instance.instance.screen.width;
    this.height = instance.instance.screen.height;
    // this.sprites = [];
  }
  #timer;
  initTimer() {
    this.#timer && clearInterval(this.#timer);
    this.#timer = setInterval(() => {
      let trapItem = new TrapItem(this.config, this.options, this.instance);
      // this.sprites.push(trapItem);
      // console.log(this.sprites);
      this.addChild(trapItem);
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
}
