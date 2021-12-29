import rest from './rest';
import typeOf from './typeOf';


/**
 * [fn.has] 判断对象是否存在某自有属性
 * @param srcObj   : object
 * @param property : string
 * @param types    : ...string[]
 */
var has = rest(function (srcObj, property, types) {
  var isHas = srcObj && srcObj.hasOwnProperty(property);
  return types.length ? isHas && typeOf(srcObj[property], types) : isHas;
});

export default has;