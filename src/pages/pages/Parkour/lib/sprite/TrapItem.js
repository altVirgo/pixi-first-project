import { Sprite, Texture, Rectangle, Ticker } from "pixi.js";
import { hitTestRectangle } from "../util/util";
const TrapTexturePosition = [
  [0, 55, 180, 40],
  [250, 40, 180, 50],
  [0, 280, 180, 60],
];
let textures = [];
let asset;
function createTraps() {
  TrapTexturePosition.forEach((position) => {
    const texture = new Texture(asset, new Rectangle(...position));
    textures.push(texture);
  });
}
export default class TrapItem extends Sprite {
  constructor(config = {}, options = {}, instance) {
    super();
    asset = options.asset;
    this.config = config;
    this.instance = instance;
    this.status = "normal";
    if (textures.length <= 0) {
      createTraps();
    }
    this.width = 80;
    this.x = window.innerWidth;
    this.y = window.innerHeight - 110;
    this.speed = this.config.speed;
    this.slowSpeed = this.config.slowSpeed;
    this.hurrySpeed = this.config.hurrySpeed;
    this.init();
    this.#initTicker();
    this.#initEventListener()
  }
  init() {
    let index = parseInt(Math.random() * 2) + 1;
    this.texture = textures[index];
    this.height = TrapTexturePosition[index][3] * (4 / 9);
  }
  #initTicker() {
    this.ticker = new Ticker();
    function itemTicker() {
      this.x -= this.speed;
      // 人物与障碍物碰撞
      if (this.instance.player && !this.isHit) {
        let isHit = hitTestRectangle(this.instance.player, this);
        this.isHit = isHit;
        if (this.isHit) {
          this.instance.blood && this.instance.blood.loseBlood();
          this.ticker.remove(itemTicker.bind(this));
          this.instance.trap.removeChild(this);
        }
      }
      // 超出屏幕移除
      if (this.x < -this.width) {
        this.ticker.remove(itemTicker.bind(this));
        this.instance.trap.removeChild(this);
      }
    }
    this.ticker.add(itemTicker.bind(this));
    this.ticker.start();
  }
  #initEventListener(){
    Event.listen('slow',this.slow.bind(this));
    Event.listen('hurry', this.hurry.bind(this));
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
