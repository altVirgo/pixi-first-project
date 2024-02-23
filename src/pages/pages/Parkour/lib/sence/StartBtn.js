import { Container, Graphics, Sprite, Ticker } from "pixi.js";
import gsap from "gsap";

export default class StartBtn extends Container {
  constructor(options = {}) {
    super();
    this.asset = options.asset;
    this.handClick = options.handClick;
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.init();
  }
  init() {
    let btn = new Sprite(this.asset);
    btn.width = 200;
    btn.height = 100;
    btn.x = (window.innerWidth - btn.width) / 2;
    btn.y = (window.innerHeight - btn.height) / 2;
    btn.interactive = true;
    btn.buttonMode = true;
    btn.zIndex = 999;
    btn.on("click", () => {
      this.handClick();
      gsap.to(this, {
        opacity: 0,
        duration: 0.3,
        ease: "bounce.inOut",
        onComplete: () => {
          this.removeChild(btn);
        },
      });
    });
    this.addChild(btn);
  }
}
