import { Container, Graphics, Sprite } from "pixi.js";
// import TrapItem from "./TrapItem";
import { hitTestRectangle } from "../util/util";
import GoldItem from "../sprite/GoldItem";
import { Gold } from "../sprite";
let span;
let col;
export default class Grid extends Container {
  constructor(config = {}, options = {}, instance) {
    super();
    this.config = config;
    this.asset = options.asset;
    this.instance = instance;
    this.width = instance.instance.screen.width;
    this.height = instance.instance.screen.height;
    this.gridWidth = this.gridHeight = this.step = parseInt(instance.instance.screen.height / config.gridCount);
    // console.log(parseInt(instance.instance.screen.height / config.gridCount));
    console.log(this.step);
    this.matrix = [];
    this.init();
  }

  init() {
    this.spanLen = Math.round(this.instance.instance.screen.width / this.gridWidth) * 2;
    this.colLen = this.config.gridCount;
    this.initData();
  }

  initData() {
    this.grids = [];
    for (let i = 0; i < this.spanLen; i++) {
      this.matrix[i] = [];
      for (let j = 0; j < this.colLen; j++) {
        this.matrix[i][j] = undefined;
        this.grids.push([i * this.step, j * this.step, this.step, this.step]);
      }
    }
  }

  createToolGrid() {
    return this.grids.map((position) => {
      // let [x, y, width, height] = position;
      let graphics = new Graphics();
      graphics.lineStyle({ color: "#dadbdb", width: 1 });
      graphics.beginFill("#00000011");
      graphics.drawRect(...position);
      graphics.interactive = true;
      graphics.buttonMode = true;
      graphics.onclick = () => {
        this.toggleGold(position);
      };
      // const sprite = new Sprite();
      // sprite.mask = graphics;
      this.addChild(graphics);
      return graphics;
    });
  }

  createGrid() {
    this.grids.map((position) => {
      // let [x, y, width, height] = position;
      let graphics = new Graphics();
      graphics.drawRect(...position);
      graphics.zIndex = 999;
      this.addChild(graphics);
    });
  }

  toggleGold(position) {
    let x = parseInt(position[0] / this.step);
    let y = parseInt(position[1] / this.step);
    let gold = this.matrix[x][y];
    if (gold) {
      this.matrix[x][y] = undefined;
      this.removeChild(gold);
    } else {
      let { gold: assetGold } = this.asset;
      gold = new GoldItem(this.config, { asset: assetGold, position }, this.instance);
      this.addChild(gold);
      this.matrix[x][y] = gold;
    }
  }

  clearGold() {
    if (this.children.length <= this.grids.length - 1) return;
    this.initData();
    this.removeChildren(this.grids.length - 1, this.children.length);
  }

  exportMatrix() {
    return this.matrix
      .filter((spans) => {
        return spans.filter((col) => col).length > 0;
      })
      .map((span) => {
        return span
          .filter((col) => col)
          .map(({ x, y }) => {
            return [parseInt(x / this.step), parseInt(y / this.step)];
          });
      });
  }

  exportArray() {
    let arr = [];
    for (let i = 0; i < this.spanLen; i++) {
      for (let j = 0; j < this.colLen; j++) {
        let { x, y } = this.matrix[i][j] || {};
        x && y && arr.push([parseInt(x / this.step), parseInt(y / this.step)]);
      }
    }
  }

  drawFromMatrix(matrix) {
    matrix.map((span) => {
      span.map(([ x, y] ) => {
        let { gold: assetGold } = this.asset;
        let gold = new GoldItem(
          this.config,
          { asset: assetGold, position: [parseInt(x * this.step), parseInt(y * this.step)] },
          this.instance
        );
        this.addChild(gold);
        this.matrix[x][y] = gold;
      });
    });
  }
  drawFromArray(arr) {
    arr.map(([x, y] ) => {
      let { gold: assetGold } = this.asset;
      let gold = new GoldItem(
        this.config,
        { asset: assetGold, position: [parseInt(x * this.step), parseInt(y * this.step)] },
        this.instance
      );
      this.addChild(gold);
      this.matrix[x][y] = gold;
    });
  }
}
