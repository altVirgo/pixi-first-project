import { Container, Assets, TilingSprite, Ticker } from "pixi.js";
export default class Floor extends Container {
  constructor(config = {}, options = {}, instance) {
    super();
    this.instance = instance;
    this.options = options;
    this.asset = options.asset;
    this.gridWidth = config.gridWidth;
    this.#init();
  }
  async #init() {
    let screenH = this.instance.screen.height;
    let screenW = this.instance.screen.width;
    // 地面
    let floorH = this.gridWidth * 3;
    const floor = new TilingSprite(this.asset.floor, screenW, floorH);
    floor.y = screenH - this.gridWidth * 3;
    floor.tileScale.y = floorH / this.asset.floor.height;
    this.addChild(floor);
  }
}
