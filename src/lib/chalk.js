var has = require('./has');
var colorList = require('./_config').colorList;

/**@function*/

/**
 * [fn.chalk] 返回带颜色的字符串
 * @param srcStr : string
 * @param color  : 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow' [?]
 */
function chalk(srcStr, color) {
  if (!has(colorList, color)) color = 'default';
  return colorList[color].replace(/%s/, srcStr);
}

/**@function*/
module.exports = chalk;