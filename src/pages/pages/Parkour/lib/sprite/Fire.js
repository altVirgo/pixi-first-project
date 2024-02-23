import { Sprite, Texture, Rectangle, Ticker } from "pixi.js";
import { hitTestRectangle } from "../util/util";
import gsap from "gsap";
import fire from "@/assets/audio/fire.mp3";
const FireTexturePosition = [
  [810, 420, 40, 80],
  [850, 420, 40, 80],
  [890, 420, 40, 80],
  [930, 420, 40, 80],
  [970, 420, 40, 80],
];
export default class Fire extends Sprite {
  constructor(config = {}, options = {}, instance) {
    super();
    this.asset = options.asset;
    this.config = config;
    this.instance = instance;
    this.width = 40;
    this.height = 80;
    this.textures = [];
    this.speed = config.speed;
    this.x = instance.player.x + instance.player.width;
    this.y = instance.player.y;
    this.init();
    this.#initAudio();
    this.#initTicker();
    this.#initEventListener();
  }
  init() {
    FireTexturePosition.forEach((position, i) => {
      const texture = new Texture(this.asset, new Rectangle(...position));
      this.textures.push(texture);
    });
    this.texture = this.textures[0];
  }
  #initTicker() {
    this.ticker = new Ticker();
    let shootGsap = gsap.to(this, { x: this.x + 500, duration: 0.6 });

    function itemTicker() {
      this.texture = this.textures[Math.floor(Date.now() / 100) % 4];
      // 火和障碍物碰撞
      this.instance.trap.children.forEach((trapItem) => {
        if (hitTestRectangle(trapItem, this)) {
          this.x = trapItem.x + trapItem.width / 4;
          shootGsap.kill();
          trapItem.attack(this);
        }
      });
      this.x -= this.speed;
      // 超出屏幕移除
      if (this.y >= this.instance.instance.screen.width + this.width || this.x < -this.width) {
        this.ticker.remove(itemTicker.bind(this));
        this.instance.container.removeChild(this);
      }
    }
    this.ticker.add(itemTicker.bind(this));
    this.ticker.start();
  }
  #initAudio() {
    let audio = document.createElement("audio");
    audio.src = fire;
    audio.autoplay = true;
    audio.loop = false;
    setTimeout(() => {
      document.body.removeChild(audio);
    }, 2000);
    document.body.appendChild(audio);
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
