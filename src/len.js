import isObj from './isObj';
import keys from './keys';
import typeOf from './typeOf';


/**
 * [fn.len] 获取对象自有属性的个数
 * @arg srcObj : any
 */
function len(srcObj) {
  if (isObj(srcObj)) {
    return keys(srcObj).length;
  }
  else if (typeOf(srcObj, 'str', 'arr', 'fun') || (srcObj && srcObj.length)) {
    return srcObj.length;
  }
  else return -1;
}

export default len;