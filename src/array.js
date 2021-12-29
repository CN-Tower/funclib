import isUdf from './isUdf';
import isFun from './isFun';

/**
 * 生成一个指定长度和填充的数组
 * @param length 长度
 * @param value 填充值或填充函数
 *
 * @example
 * array();              // => []
 * array(5);             // => [0, 1, 2, 3, 4]
 * array(5, '');         // => ['', '', '', '', '']
 * array(5, i => i * i); // => [0, 1, 4, 9, 16]
 */
function array(length, value) {
  let arr = [],
    val = 0,
    i = -1;
  while (++i < length) {
    if (isUdf(value)) {
      arr.push(val++);
    } else if (isFun(value)) {
      arr.push(value(i));
    } else {
      arr.push(value);
    }
  }
  return arr;
}
export default array;
