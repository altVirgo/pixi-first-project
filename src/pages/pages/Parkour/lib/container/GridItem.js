import { Container, Assets, Texture, Rectangle, Ticker } from "pixi.js";
// import TrapItem from "./TrapItem";
import { hitTestRectangle } from "../util/util";
export default class GridItem extends Container {
  constructor(config) {
    super();
    this.config = config;
    this.width = this.height = parseInt(window.innerHeight / config.gridCount);
    
  }
  static width=this.width
  static height = this.height
}
