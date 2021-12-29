import isArr from './isArr';


/**
 * [fn.toArr] 值数组化
 * @param value : any
 */
function toArr(value) {
  return isArr(value) ? value : [value];
}

export default toArr;