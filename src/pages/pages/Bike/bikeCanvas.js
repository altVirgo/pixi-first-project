import * as PIXI from "pixi.js";
import btn from "@/assets/images/bike/btn.png";
import btn_circle from "@/assets/images/bike/btn_circle.png";
import brake_bike from "@/assets/images/bike/brake_bike.png";
import brake_handlerbar from "@/assets/images/bike/brake_handlerbar.png";
import brake_lever from "@/assets/images/bike/brake_lever.png";
import malu from "@/assets/images/bike/malu.png";
import malu_line from "@/assets/images/bike/malu_line.png";
import gsap from "gsap";
export default class BrakeBanner {
	constructor(dom, options) {
		this.options = options || {};
		// 创建画布
		this.init(dom, options);
		// 加载资源
		this.loadResource().then((res) => {
			this.assets = res;
			this.createSprites();
			console.log(this.sprites.particles)
			this.start();
		});
	}
	speed = 0;
	init(dom, options) {
		// 创建实例
		this.instance = new PIXI.Application({
			width: 1024,
			height: 2024,
			backgroundColor: 0xffffff,
			...options,
		});
		// 创建舞台
		this.stage = this.instance.stage;
		// 渲染到dom
		dom.appendChild(this.instance.view);
	}
	loadResource() {
		PIXI.Assets.addBundle("resource", {
			btn,
			btn_circle,
			brake_bike,
			brake_handlerbar,
			brake_lever,
			malu,
			malu_line,
		});
		return PIXI.Assets.loadBundle("resource");
	}
	createSprites() {
		console.log("资源加载完毕开始创建Sprites");
		this.sprites = {
			road: this.createRoad(),
			bike: this.createBike(),
			btn: this.createBtn(),
			particles: this.createParticles()
		}
	}

	createRoad() {
		//马路
		let maluliney = new PIXI.Container();
		// maluliney.pivot.x = -500;
		// maluliney.pivot.y = 500;
		//位置
		maluliney.x = 400;
		maluliney.y = -1400;
		//旋转
		this.stage.addChild(maluliney);
		maluliney.rotation = (35 * Math.PI) / 180;
		//马路图片
		let malu = new PIXI.Sprite(this.assets["malu"]);
		malu.pivot.x = malu.pivot.y = 0.5;
		maluliney.addChild(malu);
		return maluliney
	}
	createBike() {
		//车
		let bikeContainer = new PIXI.Container();
		this.stage.addChild(bikeContainer);
		bikeContainer.scale.x = bikeContainer.scale.y = 0.5;
		let bikeImage = new PIXI.Sprite(this.assets["brake_bike"]);
		bikeContainer.addChild(bikeImage);
		let bikeLever = new PIXI.Sprite(this.assets["brake_lever"]);
		bikeContainer.addChild(bikeLever);
		bikeLever.pivot.x = 455;
		bikeLever.pivot.y = 455;
		bikeLever.x = 722;
		bikeLever.y = 900;
		let bikeHand = new PIXI.Sprite(this.assets["brake_handlerbar"]);
		bikeContainer.addChild(bikeHand);
		this.bikeLever = bikeLever 
		return bikeContainer;
	}
	createBtn() {
		//创建一个容器，存放按钮
		let actionbtn = new PIXI.Container();
		this.stage.addChild(actionbtn);
		//创建按钮
		let btni = new PIXI.Sprite(this.assets["btn"]);
		//按钮边上的圆
		let btnc = new PIXI.Sprite(this.assets["btn_circle"]);
		let btnc2 = new PIXI.Sprite(this.assets["btn_circle"]);
		//添加到画布渲染
		actionbtn.addChild(btni);
		actionbtn.addChild(btnc);
		actionbtn.addChild(btnc2);
		//调整位置
		btni.pivot.x = btni.pivot.y = btni.width / 2;
		btnc.pivot.x = btnc.pivot.y = btnc.width / 2;
		btnc2.pivot.x = btnc2.pivot.y = btnc2.width / 2;
		//调整大小缩放
		btnc.scale.x = btnc.scale.y = 0.8;
		//动画效果
		gsap.to(btnc.scale, { duration: 1, x: 1.3, y: 1.3, repeat: -1 });
		gsap.to(btnc, { duration: 1, alpha: 0, repeat: -1 });
		// 调整坐上边距
		actionbtn.x = actionbtn.y = 700;
		actionbtn.interactive = true;
		actionbtn.buttonMode = true;

		// 按下效果
		actionbtn.on("mousedown", () => {
			//按下执行刹车把的动画
			gsap.to(this.bikeLever, { duration: 0.6, rotation: (Math.PI / 180) * -30 });
			pause();
		});
		// 松开效果
		actionbtn.on("mouseup", () => {
			//松开执行刹车把松开动画
			gsap.to(this.bikeLever, { duration: 0.6, rotation: 0 });
			start();
		});
		return actionbtn;
	}

	createParticles() {
		//新建点的容器
		let particle = new PIXI.Container();
		this.stage.addChild(particle);
		//调整中心点
		particle.pivot.x = window.innerWidth / 2;
		particle.pivot.y = window.innerHeight / 2;
		//调整位置
		particle.x = window.innerWidth / 2;
		particle.y = window.innerHeight / 2;
		//调整角度（旋转）
		particle.rotation = (35 * Math.PI) / 180;
		//新建一个数组存储点位
		let particlelist = [];
		// 循环创建点
		for (let i = 0; i < 10; i++) {
			let gr = new PIXI.Graphics();
			// 取色
			gr.beginFill(this.setColor4());
			gr.drawCircle(0, 0, 6);
			gr.endFill();
			// 位置随机取
			let pitem = {
				sx: Math.random() * window.innerWidth,
				sy: Math.random() * window.innerHeight,
				gr: gr,
			};
			gr.x = pitem.sx;
			gr.y = pitem.sy;
			particle.addChild(gr);
			particlelist.push(pitem);
		}
		return particlelist;
	}

	start() {
		console.log('开始运动')
		this.status = true;
		gsap.ticker.remove(this.loop);
		gsap.to(this.sprites.bike, {
			duration: 0.6,
			x: window.innerWidth - this.sprites.bike.width,
			y: window.innerHeight - this.sprites.bike.height,
		});
		gsap.ticker.add(this.loop.bind(this));
	}

	pause() {
		this.status = false;
		for (let i = 0; i < this.sprites.particles.length; i++) {
			const pitem = this.sprites.particles[i];
			pitem.gr.scale.y = 1;
			pitem.gr.scale.x = 1;
			gsap.to(pitem.gr, { duration: 0.6, x: pitem.sx, y: pitem.sy, case: "elastic.out" });
		}
		gsap.to(this.sprites.bike, {
			duration: 0.6,
			x: window.innerWidth - this.sprites.bike.width - 50,
			y: window.innerHeight - this.sprites.bike.height + 50,
		});
	}
	setColor4() {
		var str = '0123456789abcdef';
		var colorStr = '';
		for (var i = 1; i <= 6; i++) {
			colorStr += str[parseInt(Math.random() * str.length)];
		}
		return '0x' + colorStr;
	}

	// 运动
	loop() {
		//如果是开始，则加速慢点
		if (this.status) {
			this.speed += 0.2;
		} else {
			//如果是结束，则停止的动画快点
			this.speed -= 0.4;
		}
		//设置加速最大值
		this.speed = Math.min(this.speed, 20);
		//设置减速最小值
		this.speed = Math.max(this.speed, 0);
		//循环改变点的位置
		for (let i = 0; i < this.sprites.particles.length || 0; i++) {
			const pitem = this.sprites.particles[i];
			pitem.gr.y += this.speed;
			pitem.sy = pitem.gr.y;
			//当速度大于20时，以固定速度移动并拉伸点，看起来像一条线
			if (this.speed >= 20) {
				pitem.gr.scale.y = 40;
				pitem.gr.scale.x = 0.03;
			}
			//超出屏幕重置位置
			if (pitem.gr.y > window.innerHeight) pitem.gr.y = 0;
		}
		//计算改变Y
		this.sprites.road.y += Math.cos((35 * Math.PI) / 180) * this.speed;
		//计算改变X
		this.sprites.road.x -= Math.sin((35 * Math.PI) / 180) * this.speed;
		//超出重置
		console.log(this.sprites.road.x,this.sprites.road.y)
		if (this.sprites.road.y > -900) {
			console.log('重置',this.sprites.road.x,this.sprites.road.y)
			this.sprites.road.y = -1200;
			this.sprites.road.x = 260;
		}
	}
}

