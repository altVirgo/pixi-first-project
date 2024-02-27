import { Container, Application, Ticker, Assets } from "pixi.js";
import { Trap, Gold, Player, Blood, Score, Fire } from "./sprite";
import { Background, StartBtn, RestartBtn } from "./sence";
import { Grid } from "./container";
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
export default class Parkour {
  constructor(dom, config = {}) {
    this.config = deepMerge(defaultConfig, config);
    this.instance = this.#init(dom, this.config);
  }
  getStage() {
    return this.instance.stage;
  }
  getInstance() {
    return this.instance;
  }
  // 创建实例
  #init(dom, config) {
    this.instance = new Application({
      width: dom.offsetWidth,
      height: dom.offsetHeight,
      backgroundColor: 0xffffff,
      resizeTo: dom,
      ...config,
    });
    dom.appendChild(this.instance.view);
    this.instance.stage.sortableChildren = true;
    return this.instance;
  }
  // 加载资源
  loadResource() {
    return new Promise((resolve) => {
      Assets.addBundle("resource", { sky, floor, player, trap, start, restart, gold });
      Assets.loadBundle("resource").then((assets) => {
        this.assets = assets;
        this.grid = this.#initGrid();
        resolve();
      });
    });
  }
  #initGrid() {
    let { gold } = this.assets;
    let grid = new Grid(this.config, { asset: {gold} }, this);
    grid.zIndex = 9999;
    this.config.gridWidth = grid.gridWidth;
    this.instance.stage.addChild(grid);
    return grid;
  }
}
