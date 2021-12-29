import forEach from './forEach';
import config from './_config';

var deCodes = config.deCodes
  , enCodes = config.enCodes;


/**
 * [fn.escape] 编码HTML字符串
 * @param srcStr : string
 */
function escape(srcStr) {
  forEach(deCodes, function (str, idx) {
    srcStr = srcStr.replace(new RegExp(str, 'g'), enCodes[idx]);
  });
  return srcStr;
}

export default escape;