import { Sprite, Texture, Rectangle } from "pixi.js";
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
  constructor(options = {}) {
    super();
    asset = options.asset;
    if (textures.length <= 0) {
      createTraps();
    }
    this.width = 80;
    this.x = window.innerWidth;
    this.y = window.innerHeight - 110;
    this.init();
  }
  init() {
    let index = parseInt(Math.random() * 2) + 1;
    this.texture = textures[index];
    this.height = TrapTexturePosition[index][3] * (4 / 9);
  }
}
