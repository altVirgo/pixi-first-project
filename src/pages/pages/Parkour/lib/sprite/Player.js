import { Sprite, Texture, Assets, Rectangle, Ticker } from "pixi.js";
import player from "@/assets/images/parkour/player.png";
import gsap from "gsap";
const PlayerTexturePosition = [
  // run
  [0, 0, 105, 115],
  [106, 0, 104, 115],
  [211, 0, 104, 115],
  [316, 0, 104, 115],
  [316, 0, 104, 115],
  [423, 0, 109, 115],
  [534, 0, 114, 115],
  [650, 0, 114, 115],
  [766, 0, 104, 115],
  [873, 0, 130, 113],
  // slide
  [862, 113, 130, 120],
  // jump
  [370, 115, 100, 115],
  [670, 115, 100, 115],
  [470, 115, 100, 115],
  [570, 115, 100, 115],
  [772, 115, 92, 115],
];

export default class Player extends Sprite {
  constructor(options = {}) {
    super();

    this.asset = options.asset;
    this.status = "run"; // "ready"  "run" | "jump" | "slide" | "slow" | "hurry"
    this.width = 80;
    this.height = 80;
    this.defaultY = window.innerHeight - 160;
    this.x = -120;
    this.y = this.defaultY;
    this.textures = [];
    this.init();
    this.initTicker();
    this.#initEventListener();
  }
  init() {
    PlayerTexturePosition.forEach((position, i) => {
      const texture = new Texture(this.asset, new Rectangle(...position));
      this.textures.push(texture);
    });
    this.texture = this.textures[1];
  }
  initTicker() {
    this.ticker = new Ticker();
    const runTicker = () => {
      this.down();
      if (this.status === "run") {
        this.texture = this.textures[Math.floor(Date.now() / 100) % 8];
      } else if (this.status === "jump") {
        this.texture = this.textures[(Math.floor(Date.now() / 100) % 5) + 11];
      } else if (this.status === "slide") {
        this.texture = this.textures[10];
      } else if (this.status === "slow") {
        this.texture = this.textures[Math.floor(Date.now() / 200) % 8];
      } else if (this.status === "hurry") {
        this.texture = this.textures[Math.floor(Date.now() / 50) % 8];
      }
    };
    this.ticker.add(runTicker);
  }
  // 下落
  down() {
    if (this.y < this.defaultY) {
      this.status = "jump";
      this.y += 5;
    } else if (this.status === "jump") {
      this.status = "run";
    }
  }
  // 入场
  start() {
    this.ticker.start();
    if (this.x < 120 && this.status != "slow") {
      gsap.to(this, { x: 120, duration: 0.6, ease: "strong.inOut" });
    }
    this.status = "run";
  }
  // 出场
  stop() {
    if (this.x > 0) {
      gsap.to(this, { x: -120, duration: 0.3, ease: "strong.inOut" });
    }
    this.status = "readying";
  }
  // 跑
  run() {
    if (this.x !== 120) {
      gsap.to(this, { x: 120, duration: 0.6, ease: "strong.inOut" });
    }
    this.status = "run";
  }
  // 跳
  jump() {
    if (this.y === this.defaultY) {
      gsap.to(this, { y: this.y - 120, duration: 0.3, ease: "strong.inOut" });
    }
    this.status = "jump";
  }
  // 滑行
  slide() {
    this.status = "slide";
  }
  #initEventListener() {
    Event.listen("slow", this.slow.bind(this));
    Event.listen("hurry", this.hurry.bind(this));
    Event.listen("resetSpeed", this.run.bind(this));
  }
  // 减速
  slow() {
    if (this.x !== 60) {
      gsap.to(this, { x: 60, duration: 0.6, ease: "strong.inOut" });
    }
    this.status = "slow";
  }
  // 加速
  hurry() {
    if (this.x !== 180) {
      gsap.to(this, { x: 180, duration: 0.3, ease: "strong.inOut" });
    }
    this.status = "hurry";
  }
}
