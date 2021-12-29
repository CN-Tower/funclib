import isStr from './isStr';
import isReg from './isReg';
import isObj from './isObj';
import forIn from './forIn';
import throwErr from './_throwErr';
var patterns = require('./_config').patterns;


/**
 * [fn.setPattern]设置一个正则表达式
 * @param ptnMap  : string|object
 * @param pattern : regexp [?]
 */
function setPattern(ptnMap, pattern) {
  if (ptnMap && isStr(ptnMap)) {
    isReg(pattern) ? patterns[ptnMap] = pattern : throwErr('reg');
  } else if (isObj(ptnMap)) {
    forIn(ptnMap, function (ptn, ptnVal) {
      isReg(ptnVal) ? patterns[ptn] = ptnVal : throwErr('reg');
    });
  };
}

export default setPattern;