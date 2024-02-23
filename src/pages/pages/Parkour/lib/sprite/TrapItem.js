import { Sprite, Texture, Rectangle, Ticker } from "pixi.js";
import { hitTestRectangle, deepMerge } from "../util/util";
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
    this.config = deepMerge(config, config.trap);
    this.instance = instance;
    this.status = "normal";
    if (textures.length <= 0) {
      createTraps();
    }
    this.width = 80;
    this.x = instance.instance.screen.width;
    this.y = instance.instance.screen.height - 110;

    this.speed = this.config.speed;
    this.slowSpeed = this.config.slowSpeed;
    this.hurrySpeed = this.config.hurrySpeed;

    this.fullHp = this.config.fullHp;
    this.hp = this.fullHp;
    this.dropHp = this.config.dropHp;
    this.fireSpeed = 0;
    this.attackCount = 0;
    this.attackers = [];

    this.init();
    this.#initTicker();
    this.#initEventListener();
  }
  #itemTicker;
  init() {
    let index = parseInt(Math.random() * 2) + 1;
    this.texture = textures[index];
    this.height = TrapTexturePosition[index][3] * (4 / 9);
  }
  #initTicker() {
    this.ticker = new Ticker();
    this.#itemTicker = () => {
      this.x -= this.speed;
      if (this.fireSpeed >= 0) {
        this.hp -= this.fireSpeed;
      }
      // 人物与障碍物碰撞
      if (this.instance.player && !this.isHit) {
        let isHit = hitTestRectangle(this.instance.player, this);
        this.isHit = isHit;
        if (this.isHit) {
          this.instance.blood && this.instance.blood.loseBlood();
          this.destroy();
        }
      }
      // 超出屏幕移除
      if (this.x < -this.width) {
        this.destroy();
      }
      // 障碍物燃烧完
      if (this.hp <= 0) {
        this.destroy();
        this.attackers.forEach((fire) => {
          this.instance.container.removeChild(fire);
        });
      }
    };
    this.ticker.add(this.#itemTicker.bind(this));
    this.ticker.start();
  }
  #initEventListener() {
    Event.listen("slow", this.slow.bind(this));
    Event.listen("hurry", this.hurry.bind(this));
    Event.listen("resetSpeed", this.resetSpeed.bind(this));
  }
  destroy() {
    this.ticker.stop()
    this.ticker.remove(this.#itemTicker.bind(this));
    this.instance.trap.removeChild(this);
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
  // 遭受攻击
  attack(fire) {
    this.attackers.push(fire);
    this.attackCount++;
    this.fireSpeed = this.attackCount * this.dropHp;
  }
}
