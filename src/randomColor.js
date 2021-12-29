import random from './random';


/**
 * [fn.randomColor] 返回一个随机颜色色值
 */
function randomColor() {
  return '#' + ('00000' + (random(0x1000000) << 0).toString(16)).slice(-6);
}

export default randomColor;