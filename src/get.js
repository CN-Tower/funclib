var UDF = undefined;
import rest from './rest';
import isStr from './isStr';
import typeVal from './typeVal';
import getPaths from './_getPaths';


/**
 * [fn.get] 返回对象或子孙对象的属性，可判断类型
 * @param srcObj  : object
 * @param pathStr : string
 * @param types   : ...string[]
 */
var get = rest(function (srcObj, pathStr, types) {
  if (!srcObj || !isStr(pathStr)) return UDF;
  var paths = getPaths(pathStr), prop = paths.shift();
  if (!prop) {
    return types.length ? typeVal.apply(void 0, [srcObj].concat(types)) : srcObj;
  }
  if (paths.length) {
    if (!typeVal(srcObj[prop], 'object', 'fun')) return UDF;
    return get.apply(void 0, [srcObj[prop], paths.join('/')].concat(types));
  } else {
    return types.length ? typeVal.apply(void 0, [srcObj[prop]].concat(types)) : srcObj[prop];
  }
});

export default get;