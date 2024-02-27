import { Container } from "pixi.js";
import { Floor } from "./sence";
import Parkour from ".";

export default class ParkourTool extends Parkour {
  constructor(dom, config = {}) {
    super(dom,config);
    this.instance = this.getInstance();
    this.stage = this.getStage();
    this.loadResource().then(() => {
      this.#init();
      console.log(this)
    });
  }
  #init() {
    this.grids = this.grid.createToolGrid();
    this.sence = this.#createSence();
  }
  #createSence() {
    let { floor } = this.assets;
    let sence = new Floor(this.config, { asset: { floor } }, this.instance);
    this.stage.addChild(sence);
    return sence;
  }
  reset() {
    this.grid.clearGold();
  }
  exportMatrix(){
    return this.grid.exportMatrix()
  }
  importMatrix(positions){
    this.grid.clearGold()
    this.grid.drawFromMatrix(positions)
  }
  exporArray(){
    return this.grid.exportArray()
  }
  importArray(positions){
    this.grid.clearGold()
    this.grid.drawFromArray(positions)
  }
}
