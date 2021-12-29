import has from './has';
import config from './_config';

var colorEnd = config.colorEnd
  , colorList = config.colorList;


/**
 * [fn.chalk] 返回带颜色的字符串
 * @param srcStr : string
 * @param color  : 'grey'|'blue'|'cyan'|'green'|'magenta'|'red'|'yellow' [?]
 */
function chalk(srcStr, color) {
  return colorList[has(colorList, color) ? color : 'default'] + srcStr + colorEnd;
}

export default chalk;