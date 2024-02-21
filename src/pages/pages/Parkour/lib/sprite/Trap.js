import { Container, Assets, Texture, Rectangle, Ticker } from "pixi.js";
import TrapItem from "./TrapItem";
import { hitTestRectangle } from "../util";
export default class Trap extends Container {
  constructor(options) {
    super();
    this.options = options;
    this.status = "run";
    this.speed = options.speed;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.sprites = [];
    this.ticker = new Ticker();
    this.initTicker();
  }
  #timer;
  initTicker() {
    this.#timer && clearInterval(this.#timer);
    this.#timer = setInterval(() => {
      let trapItem = new TrapItem({ asset: this.options.asset });
      this.sprites.push(trapItem);
      this.addChild(trapItem);
      this.#addTicker(trapItem);
    }, 1000);
  }
  start() {
    this.ticker.start();
  }
  restart() {
    if (this.children.length > 0) {
      this.removeChildren(0,this.children.length);
    }
    this.initTicker()
    // this.ticker.start();
  }
  stop() {
    this.#timer && clearInterval(this.#timer);
    // this.ticker.stop();
  }
  #addTicker(item) {
    function itemTicker() {
      item.x -= this.speed;
      // 人物与障碍物碰撞
      if (this.player && !item.isHit) {
        let isHit = hitTestRectangle(this.player, item);
        item.isHit = isHit;
        if (item.isHit) {
          this.blood && this.blood.loseBlood();
          this.ticker.remove(itemTicker.bind(this));
          this.removeChild(item);
        }
      }
      // 超出屏幕移除
      if (item.x < -item.width) {
        this.ticker.remove(itemTicker.bind(this));
        this.removeChild(item);
      }
    }
    this.ticker.add(itemTicker.bind(this));
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
  // 碰撞检测
  watchHit(player, blood) {
    this.player = player;
    this.blood = blood;
  }
}
