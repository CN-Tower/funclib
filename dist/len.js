var isObj = require('./isObj');
var keys = require('./keys');
var get = require('./get');
var typeOf = require('./typeOf');

/**@function*/

/**
 * [fn.len] 获取对象自有属性的个数
 * @arg srcObj : any
 */
function len(srcObj) {
  if (isObj(srcObj)) {
    return keys(srcObj).length;
  }
  else if (typeOf(srcObj, 'str', 'arr', 'fun') || get(srcObj, 'length', 'num')) {
    return srcObj.length;
  }
  else return -1;
}

/**@function*/
module.exports = len;