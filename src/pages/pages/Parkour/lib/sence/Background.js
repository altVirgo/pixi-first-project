import { Container, Assets, TilingSprite, Ticker } from "pixi.js";
export default class Background extends Container {
  constructor(config = {}, options = {}) {
    super();
    this.asset = options.asset;
    this.speed = config.speed;
    this.slowSpeed = config.slowSpeed;
    this.hurrySpeed = config.hurrySpeed;
    this.status = "normal";
    this.#init();
    this.#initEventListener();
  }
  async #init() {
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
    this.start();
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
