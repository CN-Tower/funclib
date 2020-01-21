var isArr = require('./isArr');
var isObj = require('./isObj');
var has = require('./has');

/**@function*/

/**
 * [fn.deepCopy] 深拷贝对象或数组
 * @param srcObj : object
 */
function deepCopy(srcObj) {
  var tmpObj;
  if (isArr(srcObj)) {
    tmpObj = [];
    for (var i = 0; i < srcObj.length; i++) {
      tmpObj.push(deepCopy(srcObj[i]));
    }
  } else if (isObj(srcObj)) {
    tmpObj = {};
    for (var key in srcObj) {
      if (has(srcObj, key)) tmpObj[key] = deepCopy(srcObj[key]);
    }
  } else {
    tmpObj = srcObj;
  }
  return tmpObj;
}

/**@function*/
module.exports = deepCopy;