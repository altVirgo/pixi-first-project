import { Container, Assets, TilingSprite, Ticker } from "pixi.js";
export default class Background extends Container {
  constructor(options) {
    super();
    this.asset = options.asset;
    this.speed = options.speed;
    this.status = "run";
    this.init();
  }
  async init() {
    this.height = window.innerHeight;
    // 地面
    const footer = new TilingSprite(this.asset.floor, window.innerWidth, 130);
    footer.y = window.innerHeight - 130;
    // 天空
    const sky = new TilingSprite(this.asset.sky, window.innerWidth, window.innerHeight - 80);
    sky.tileScale.y = window.innerHeight / 612;
    sky.y = -30;

    this.addChild(sky);
    this.addChild(footer);

    // 动画帧
    this.ticker = new Ticker();
    const sceneTicker = () => {
      footer.tilePosition.x -= this.speed;
      sky.tilePosition.x -= this.speed;
    };
    this.ticker.add(sceneTicker);
    this.start()
  }
  // 开始
  start() {
    this.ticker.start();
  }
  // 结束
  stop() {
    this.ticker.stop();
  }
  // 减速
  slow(slowSpeed) {
    if (this.status === "run") {
      this.status = "slow";
      this.speed = this.speed - slowSpeed;
      this.slowSpeed = slowSpeed;
    }
  }
  // 加速
  hurry(hurrySpeed) {
    if (this.status === "run") {
      this.status = "hurry";
      this.speed = this.speed + hurrySpeed;
      this.hurrySpeed = hurrySpeed;
    }
  }
  // 匀速
  resetSpeed() {
    if (this.status === "slow") {
      this.speed = this.speed + this.slowSpeed;
    } else if (this.status === "hurry") {
      this.speed = this.speed - this.hurrySpeed;
    }
    this.status = "run";
  }
}
