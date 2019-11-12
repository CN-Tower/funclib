var isUdf = require('./isUdf');
var isObj = require('./isObj');
var isFun = require('./isFun');
var has = require('./has');
var keys = require('./keys');
var throwErr = require('./_throwErr');

/**@function*/

var MATCH_SYMBOL='__@fnMatch__', MATCH_NEST = '@next';
/**
 * [fn.match] 字符串匹配
 * @param source : any
 * @param cases  ：object
 * @param isExec : boolean = true
 */
function match(source, cases, isExec) {
  if (!isObj(cases)) throwErr('obj');
  if (isUdf(isExec)) isExec = true;
  if (has(cases, source)) {
    MATCH_SYMBOL = source;
  } else if (has(cases, 'default')) {
    MATCH_SYMBOL = 'default';
  }
  var matched = cases[MATCH_SYMBOL];
  if (matched === MATCH_NEST) {
    var ks = keys(cases), i = ks.indexOf(MATCH_SYMBOL) - 1;
    while (++i < ks.length) if (cases[ks[i]] !== MATCH_NEST) {
      matched = cases[ks[i]];
      break;
    }
  }
  if (isExec && isFun(matched)) {
    return len(matched) ? matched(source) : matched();
  } else {
    return matched === MATCH_NEST ? UDF : matched;
  }
}

/**@function*/
module.exports = match;