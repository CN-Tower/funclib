var isNum = require('./isNum');
var isBol = require('./isBol');

/**@function*/

/**
 * [fn.random] 返回一个指定范围内的随机数
 * @param start : number
 * @param end   : number [?]
 * @param isFlt : boolean = true;
 */
function random(start, end, isFlt) {
  if (!isNum(start)) return Math.random();
  if (isBol(end)) isFlt = end, end = UDF;
  var rdNum, temp;
  if (!isNum(end) || start === end) {
    rdNum = Math.random() * start;
    return isFlt ? rdNum : Math.floor(rdNum);
  } else {
    var isStartGt = start > end
    if (isStartGt) temp = start, start = end, end = temp;
    rdNum = Math.random() * (end - start) + start;
    return isFlt ? rdNum : (isStartGt ? Math.ceil(rdNum) : Math.floor(rdNum));
  }
}

/**@function*/
module.exports = random;