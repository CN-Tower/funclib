import typeOf from './typeOf';


/**
 * [fn.pretty] 转换成格式化字符串
 * @param srcObj : any
 */
function pretty(srcObj) {
  return typeOf(srcObj, 'arr', 'obj') ? JSON.stringify(srcObj, null, 2) : String(srcObj);
}

export default pretty;