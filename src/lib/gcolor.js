var random = require('./random');

/**@function*/

/**
 * [fn.gcolor] 返回一个随机颜色色值
 */
function gcolor() {
  return '#' + ('00000' + (random(0x1000000) << 0).toString(16)).slice(-6);
}

/**@function*/
module.exports = gcolor;