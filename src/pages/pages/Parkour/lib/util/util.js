// 碰撞检测
export function hitTestRectangle(r1, r2) {
  let hit, combinedHalfWidths, combinedHalfHeights, vx, vy;
  hit = false;
  r1.centerX = r1.x + r1.width / 2;
  r1.centerY = r1.y + r1.height / 2;
  r2.centerX = r2.x + r2.width / 2;
  r2.centerY = r2.y + r2.height / 2;
  r1.halfWidth = r1.width / 2;
  r1.halfHeight = r1.height / 2;
  r2.halfWidth = r2.width / 2;
  r2.halfHeight = r2.height / 2;
  vx = r1.centerX - r2.centerX;
  vy = r1.centerY - r2.centerY;
  combinedHalfWidths = r1.halfWidth + r2.halfWidth;
  combinedHalfHeights = r1.halfHeight + r2.halfHeight;
  if (Math.abs(vx) < combinedHalfWidths - 25) {
    if (Math.abs(vy) < combinedHalfHeights - 20) {
      hit = true;
    } else {
      hit = false;
    }
  } else {
    hit = false;
  }
  return hit;
}

// 合并对象
export function deepMerge(obj1, obj2) {
  if (typeof obj1 !== "object" || typeof obj2 !== "object") return;

  for (const key in obj2) {
    if (!Object.prototype.hasOwnProperty.call(obj2, key)) continue;
    if (typeof obj1[key] === "object" && typeof obj2[key] === "object") {
      obj1[key] = deepMerge(obj1[key], obj2[key]);
    } else {
      obj1[key] = obj2[key];
    }
  }

  return obj1;
}

// 节流
export function throttle(func, wait) {
  let timer;
  return function () {
    let _this = this;
    if (!timer) {
      func.apply(_this, arguments);
      timer = setTimeout(() => {
        timer = null;
      }, wait);
    }
  };
}