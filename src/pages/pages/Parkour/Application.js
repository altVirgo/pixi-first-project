import Parkour from "./lib";
export default class ParkourService {
  constructor(dom, options) {
    this.options = options || {};
    this.status = "readying"; // 'readying' | 'playing' | 'failure'
    this.speed = options?.defaultSpeed || 5;
    this.slowSpeed = options?.slowSpeed || 1;
    this.hurrySpeed = options?.hurrySpeed || 1;
    this.instance = this.#initApp(dom, options);
    this.#loadResource().then((assets) => {
      this.assets = assets;
      this.sence = this.#initSence(this.instance, assets);
      this.#watchKey();
      this.#watchHp();
      if (options.auto) {
        this.gameStart();
      }
    });
  }
  // 创建实例
  #initApp(dom, options) {
    this.instance = new Application({
      width: window.innerWidth,
      height: window.innerHeight,
      backgroundColor: 0xffffff,
      resizeTo: window,
      ...options,
    });
    dom.appendChild(this.instance.view);
    return this.instance;
  }
  // 加载资源
  #loadResource() {
    Assets.addBundle("resource", { sky, floor, player, trap, start, restart });
    return Assets.loadBundle("resource");
  }
  // 创建场景
  #initSence(instance) {
    let { sky, floor, player, trap, start } = this.assets;
    this.container = new Container();
    instance.stage.addChild(this.container);
    this.bg = new Background({ speed: this.speed, asset: { sky, floor } });
    this.player = new Player({ asset: player });
    this.blood = new Blood();
    this.score = new Score();
    this.trap = new Trap({ speed: this.speed, asset: trap });
    this.startBtn = new StartBtn({ asset: start, handClick: this.gameStart.bind(this) });
    this.trap.watchHit(this.player, this.blood);

    this.container.addChild(this.bg);
    this.container.addChild(this.player);
    this.container.addChild(this.trap);
    this.container.addChild(this.blood);
    this.container.addChild(this.score);
    this.container.addChild(this.startBtn);
    return this.container;
  }
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
    console.log("keydown");
    if (e.code === "ArrowUp" || e.code === "Space") {
      this.player.jump();
    } else if (e.code === "ArrowDown") {
      this.player.slide();
    } else if (e.code === "ArrowLeft") {
      this.player.slow();
      this.trap.slow(this.slowSpeed);
      this.bg.slow(this.slowSpeed);
    } else if (e.code === "ArrowRight") {
      this.player.hurry();
      this.trap.hurry(this.hurrySpeed);
      this.bg.hurry(this.hurrySpeed);
    }
  }
  // 按键抬起事件
  #keyup() {
    console.log("keyup");
    this.player.run();
    this.trap.resetSpeed();
    this.bg.resetSpeed();
  }
  // 监听血条
  #watchHp() {
    this.ticker = new Ticker();
    function itemTicker() {
      if (this.blood.hp <= 0) {
        console.log(this.blood.hp);
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
    this.trap.start();
    this.player.start();
    this.status = "playing";
  }
  // 游戏结束
  gameOver() {
    console.log("游戏结束");
    this.ticker.stop();
    this.trap.stop();
    this.player.stop();
    this.showRestart();
    this.#clearWatchKey();
    this.status = "failure";
  }
  // 重新开始
  gameRestart() {
    console.log("再玩一次");
    this.blood.reset();
    this.score.reset();
    this.trap.restart();
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
}
