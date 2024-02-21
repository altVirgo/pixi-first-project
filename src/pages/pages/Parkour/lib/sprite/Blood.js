import { Container, Graphics, Sprite, Ticker } from "pixi.js";
import gsap from "gsap";

export default class Blood extends Container {
  constructor(options = {}) {
    super();
    this.defaultW = Math.min(window.innerWidth * 0.15, 150);
    this.height = Math.min(window.innerHeight * 0.5, 30);
    this.x = window.innerWidth - this.defaultW - 20;
    this.y = 20;
    this.fullHp = options.defaultHp || 50;
    this.dropHp = options.defaultDropHp || 10;
    this.hp = this.fullHp;
    this.init();
  }
  init() {
    this.width = this.defaultW;
    this.gBorder = new Graphics();
    this.gFill = new Graphics();
    this.gBorder.lineStyle({ color: "#ff7f50", width: 4 });
    this.gBorder.drawRect(0, 0, this.defaultW, 30);
    this.gFill.beginFill(0xff0044);
    this.gFill.drawRect(0, 0, this.defaultW, 30);
    this.addChild(this.gBorder);
    this.addChild(this.gFill);
  }
  // 掉血
  loseBlood() {
    if (this.hp > 0) {
      this.hp -= this.dropHp;
      console.log("掉血了,嘤嘤嘤", this.hp);
      gsap.to(this.gFill, { width: (this.defaultW * this.hp) / this.fullHp, duration: 0.3, ease: "power1.inOut" });
    }
  }
  // 重置
  reset() {
    this.hp = this.fullHp;
    gsap.to(this.gFill, { width: this.defaultW, duration: 0.3, ease: "power1.inOut" });
  }
}
