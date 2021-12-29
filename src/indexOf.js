import isObj from './isObj';
import isFun from './isFun';
import keys from './keys';


/**
 * [fn.indexOf] 寻找值在数组中的索引
 * @param srcArr    : array|string
 * @param predicate : object|function|any
 */
function indexOf(srcArr, predicate) {
  for (var i = 0; i < srcArr.length; i++) {
    if (isObj(predicate)) {
      if (keys(predicate).every(
        function (k) { return srcArr[i][k] === predicate[k]; })
      ) return i;
    } else if (isFun(predicate)) {
      if (predicate(srcArr[i])) return i;
    }
  }
  return srcArr.indexOf(predicate);
}

export default indexOf;