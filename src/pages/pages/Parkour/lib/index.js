import { Container, Application, Ticker, Assets } from "pixi.js";
import { Trap, Gold,Player, Blood, Score, Fire } from "./sprite";
import { Background, StartBtn, RestartBtn } from "./sence";
import defaultConfig from "./config";
import { deepMerge, throttle } from "./util/util";
import sky from "@/assets/images/parkour/sky.png";
import floor from "@/assets/images/parkour/floor.png";
import player from "@/assets/images/parkour/player.png";
import trap from "@/assets/images/parkour/trap.png";
import start from "@/assets/images/parkour/start.png";
import restart from "@/assets/images/parkour/restart.png";
// import gold from "@/assets/audio/get_glod.mp3";
// import readyGo from "@/assets/audio/ready_go.mp3";
// import fire from "@/assets/audio/fire.mp3";
import gold from "@/assets/images/parkour/gold.png";
import Event from "./util/event";
export default class Parkour {
  constructor(dom, config = {}) {
    this.config = deepMerge(defaultConfig, config);
    this.status = "readying"; // 'readying' | 'playing' | 'end'
    this.speed = this.config?.defaultSpeed || 5;
    this.instance = this.#initApp(dom, this.config);
    this.#loadResource().then((assets) => {
      this.assets = assets;
      this.sence = this.#initSence(this.instance, assets);
      this.#watchKey();
      this.#watchHp();
      if (this.config.autoPlay) {
        this.gameStart();
      }
    });
  }
  // 创建实例
  #initApp(dom, config) {
    this.instance = new Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xffffff,
      resizeTo: window,
      ...config,
    });
    dom.appendChild(this.instance.view);
    return this.instance;
  }
  // 加载资源
  #loadResource() {
    Assets.addBundle("resource", { sky, floor, player, trap, start, restart, gold });
    return Assets.loadBundle("resource");
  }
  // 创建场景
  #initSence(instance) {
    let { sky, floor, player, trap,gold, start } = this.assets;
    this.container = new Container();
    instance.stage.addChild(this.container);
    this.bg = new Background(this.config, { asset: { sky, floor } });
    this.player = new Player({ asset: player }, this);
    this.blood = new Blood();
    this.score = new Score();
    // this.trap = new Trap(this.config, { asset: trap }, this);
    this.gold = new Gold(this.config, { asset: gold },this);

    this.container.addChild(this.bg);
    this.container.addChild(this.player);
    // this.container.addChild(this.trap);
    this.container.addChild(this.gold);
    this.container.addChild(this.blood);
    this.container.addChild(this.score);
    if (!this.config.autoPlay) {
      this.startBtn = new StartBtn({ asset: start, handClick: this.gameStart.bind(this) });
      this.container.addChild(this.startBtn);
    }
    this.shootFuc = throttle(this.shoot, this.config.attackFreezeTime);
    return this.container;
  }
  #initSprite() {}
  // 按键监听
  #watchKey() {
    document.addEventListener("keydown", this.#keydown.bind(this));
    document.addEventListener("keyup", this.#keyup.bind(this));
  }
  // 取消按键监听
  #clearWatchKey() {
    document.removeEventListener("keyup", this.#keydown.bind(this));
    document.removeEventListener("keydown", this.#keyup.bind(this));
  }
  // 按键按下事件
  #keydown(e) {
    // console.log("keydown");
    if (this.keydown) return;
    if (this.status !== "playing") return;
    if (e.code === "ArrowUp") {
      this.player.jump();
    } else if (e.code === "ArrowDown") {
      this.player.slide();
    } else if (e.code === "ArrowLeft") {
      Event.publish("slow");
      this.status = "slow";
    } else if (e.code === "ArrowRight") {
      Event.publish("hurry");
      this.status = "hurry";
    } else if (e.code === "Space") {
      this.shoot();
    }
    this.keydown = true;
  }
  // 按键抬起事件
  #keyup() {
    // console.log("keyup");
    this.keydown = false;
    if (this.status === "slow" || this.status === "hurry") {
      Event.publish("resetSpeed");
      this.status = "playing";
    }
    console.log(this.status);
  }
  // 监听血条
  #watchHp() {
    this.ticker = new Ticker();
    function itemTicker() {
      if (this.blood.hp <= 0) {
        this.ticker.stop();
        this.gameOver();
      } else {
        this.score.updateScore();
      }
    }
    this.ticker.add(itemTicker.bind(this));
  }
  // 游戏开始
  gameStart() {
    console.log("游戏开始");
    this.ticker.start();
    // this.trap.start();
    this.gold.start();
    this.player.start();
    this.status = "playing";
  }
  // 游戏结束
  gameOver() {
    console.log("游戏结束");
    this.ticker.stop();
    // this.trap.stop();
    this.gold.stop();
    this.player.stop();
    this.showRestart();
    this.#clearWatchKey();
    this.status = "end";
  }
  // 重新开始
  gameRestart() {
    console.log("再玩一次");
    this.blood.reset();
    this.score.reset();
    // this.trap.restart();
    this.gold.restart();
    this.player.start();
    this.ticker.start();
    this.#watchKey();
    this.status = "playing";
  }
  // 显示重置按钮
  showRestart() {
    let { restart } = this.assets;
    this.restartBtn = new RestartBtn({ asset: restart, handClick: this.gameRestart.bind(this) });
    this.container.addChild(this.restartBtn);
  }
  // 发射
  shootFuc() {
    let { player } = this.assets;
    let fire = new Fire(this.config, { asset: player }, this);
    this.container.addChild(fire);
  }
}
