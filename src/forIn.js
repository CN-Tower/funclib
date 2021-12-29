import isFun from './isFun';
import forEach from './forEach';
import throwErr from './_throwErr';


/**
 * [fn.forIn] 遍历对象的可数自有属性
 * @arg srcObj   : object
 * @arg iteratee : function
 */
function forIn(srcObj, iteratee) {
  if (!isFun(iteratee)) throwErr('fun');
  return forEach(srcObj, function (val, key) {
    iteratee(key, val);
  });
}

export default forIn;