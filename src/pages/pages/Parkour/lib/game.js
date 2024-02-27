import { Container, Application, Ticker, Assets } from "pixi.js";
import { Trap, Gold, Player, Blood, Score, Fire } from "./sprite";
import { Background, StartBtn, RestartBtn } from "./sence";
import { Grid } from "./container";
import defaultConfig from "./config";
import { deepMerge, throttle } from "./util/util";
export default class Tool {
  constructor(dom, config = {}) {
    this.config = deepMerge(defaultConfig, config);
    this.speed = this.config?.defaultSpeed || 5;
    this.instance = this.#initApp(dom, this.config);
    this.grid = this.#initGrid(this.config);
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
  initGame() {
    this.grid.createGrid();
    this.sence = this.initSence(this.instance);
    this.#watchKey();
    this.#watchHp();
    if (this.config.autoPlay) {
      this.gameStart();
    }
  }
  initTool() {
    this.bg = new Floor()
    this.sence = this.#initToolSence(this.instance);
    this.grid.createGrid(true);
  }
  // 加载资源
  loadResource() {
    return new Promise((resolve, reject) => {
      Assets.addBundle("resource", { sky, floor, player, trap, start, restart, gold });
      Assets.loadBundle("resource").then((assets) => {
        this.assets = assets;
        resolve();
      });
    });
    return;
  }
  #initGrid() {
    let grid = new Grid(this.config, {}, this);
    this.config.gridWidth = grid.gridWidth;
    this.instance.stage.addChild(grid);
    return grid;
  }
  #initToolSence(instance){
    let { sky, floor } = this.assets;

    let container = new Container();
    instance.stage.addChild(container);
    this.bg = new Background(this.config, { asset: { sky, floor },autoPlay:false }, this);
    container.addChild(this.bg);
    return container;
  }
  // 创建场景
  #initGameSence(instance) {
    let { sky, floor, player, trap, gold, start } = this.assets;

    let container = new Container();
    instance.stage.addChild(container);
    this.bg = new Background(this.config, { asset: { sky, floor } }, this);
    this.player = new Player(this.config, { asset: player }, this);
    this.blood = new Blood();
    this.score = new Score();
    // this.trap = new Trap(this.config, { asset: trap }, this);
    this.gold = new Gold(this.config, { asset: gold }, this);

    container.addChild(this.bg);
    container.addChild(this.player);
    // container.addChild(this.trap);
    container.addChild(this.gold);
    container.addChild(this.blood);
    container.addChild(this.score);
    if (!this.config.autoPlay) {
      this.startBtn = new StartBtn({ asset: start, handClick: this.gameStart.bind(this) });
      container.addChild(this.startBtn);
    }
    this.shootFuc = throttle(this.shoot, this.config.attackFreezeTime);
    return container;
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
    } else if (e.code === "ArrowRight") {
      Event.publish("hurry");
    } else if (e.code === "Space") {
      this.shoot();
    }
    this.keydown = true;
  }
  // 按键抬起事件
  #keyup() {
    // console.log("keyup");
    this.keydown = false;
    if (this.player.status === "slow" || this.player.status === "hurry" || this.player.status === "slide") {
      Event.publish("resetSpeed");
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
