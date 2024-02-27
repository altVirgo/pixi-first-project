import { Container, Assets, TilingSprite, Ticker } from "pixi.js";
export default class Background extends Container {
  constructor(config = {}, options = {}, app) {
    super();
    this.app = app;
    this.options = options;
    this.asset = options.asset;
    this.speed = config.speed;
    this.slowSpeed = config.slowSpeed;
    this.hurrySpeed = config.hurrySpeed;
    this.gridWidth = config.gridWidth;
    this.status = "normal";
    this.#init();
    this.#initEventListener();
  }
  async #init() {
    let screenH = this.app.instance.screen.height;
    let screenW = this.app.instance.screen.width;
    // 地面
    let floorH = this.gridWidth * 3;
    const floor = new TilingSprite(this.asset.floor, screenW, floorH);
    floor.y = screenH - this.gridWidth * 3;
    floor.tileScale.y = floorH / this.asset.floor.height;

    // 天空
    let skyH = screenH - floorH;
    const sky = new TilingSprite(this.asset.sky, screenW, screenH - floorH);
    sky.tileScale.y = skyH / this.asset.sky.height;
    // sky.y = 30;

    this.addChild(sky);
    this.addChild(floor);

    // 动画帧
    this.ticker = new Ticker();
    const sceneTicker = () => {
      floor.tilePosition.x -= this.speed;
      sky.tilePosition.x -= this.speed;
    };
    this.ticker.add(sceneTicker);
    // this.start();
  }
  // 开始
  start() {
    this.ticker.start();
  }
  // 结束
  stop() {
    this.ticker.stop();
  }

  #initEventListener() {
    Event.listen("slow", this.slow.bind(this));
    Event.listen("hurry", this.hurry.bind(this));
    Event.listen("resetSpeed", this.resetSpeed.bind(this));
  }

  // 减速
  slow() {
    if (this.status === "normal") {
      this.status = "slow";
      this.speed = this.speed - this.slowSpeed;
    }
  }

  // 加速
  hurry() {
    if (this.status === "normal") {
      this.status = "hurry";
      this.speed = this.speed + this.hurrySpeed;
    }
  }
  // 匀速
  resetSpeed() {
    if (this.status === "slow") {
      this.speed = this.speed + this.slowSpeed;
    } else if (this.status === "hurry") {
      this.speed = this.speed - this.hurrySpeed;
    }
    this.status = "normal";
  }
}
