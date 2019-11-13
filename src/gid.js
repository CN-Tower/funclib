var isUdf = require('./isUdf');
var random = require('./random');

/**@function*/

/**
 * [fn.gid] 返回一个指定长度的随机ID
 * @param length : number = 12
 */
function gid(length) {
  if (isUdf(length)) length = 12;
  var charSet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ', id = '', i = -1;
  while (++i< length) id += charSet[random(charSet.length)];
  return id;
}

/**@function*/
module.exports = gid;