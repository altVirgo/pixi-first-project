import { Sprite, Texture, Rectangle, Ticker } from "pixi.js";
import { hitTestRectangle } from "../util/util";
const GoldframePosition = [
  [0, 0, 82, 82],
  [82, 0, 82, 82],
  [164, 0, 82, 82],
  [246, 0, 82, 82],
  [328, 0, 82, 82],
  [410, 0, 82, 82],
  [492, 0, 82, 82],
  [574, 0, 82, 82],
];
let frames = [];
let asset;
function createFrames() {
  GoldframePosition.forEach((position) => {
    let frame = new Rectangle(...position);
    frames.push(frame);
  });
}
export default class GoldItem extends Sprite {
  constructor(config = {}, options = {}, instance) {
    super();
    asset = options.asset;
    this.config = config;
    this.instance = instance;
    this.status = "normal";
    if (frames.length <= 0) {
      createFrames();
    }

    this.width = 40;
    this.height = 40
    this.x = instance.instance.screen.width;
    this.y = instance.instance.screen.height - 110;
    this.speed = this.config.speed;
    this.init()
  }
  init() {
    this.ticker = new Ticker();
    this.texture = new Texture(asset,frames[0]);
    this.#addTicker();
    this.#initEventListener()
  }
  #addTicker() {
    function itemTicker() {
      this.x -= this.speed; // 向左移动
      // console.log(this.x,this.speed);
      let index = Math.floor(Date.now() / 100) % 8
      this.texture.frame = frames[Math.floor(Date.now() / 100) % 8];
      // 人物与金币碰撞
      if (this.instance.player && !this.isHit) {
        let isHit = hitTestRectangle(this.instance.player, this);
        this.isHit = isHit;
        if (this.isHit) {
          // this.instance.blood && this.instance.blood.loseBlood();
          this.ticker.remove(itemTicker.bind(this));
          this.instance.gold.removeChild(this);
        }
      }
      // 超出屏幕移除
      if (this.x < - this.width) {
        this.ticker.remove(itemTicker.bind(this));
        this.instance.gold.removeChild(this);
      }
    }
    this.ticker.add(itemTicker.bind(this));
    this.ticker.start();
  }
  #initEventListener(){
    Event.listen('slow',this.slow.bind(this));
    Event.listen('hurry', this.hurry.bind(this));
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
